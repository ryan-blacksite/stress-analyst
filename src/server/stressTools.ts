import { getKnowledgeDocumentText, retrieveRelevantAnalysisReferences } from './knowledgeBase';
import type {
  CalculationStep,
  MarginOfSafetyResult,
  MaterialProperties,
  ToolDefinition,
  ToolExecutionResult,
} from './types';

type JsonRecord = Record<string, unknown>;

const DEFAULT_FOS = 1.5;

function fmt(value: number, decimals = 3): string {
  if (!Number.isFinite(value)) return String(value);
  const absValue = Math.abs(value);
  if (absValue !== 0 && (absValue >= 1e6 || absValue < 1e-3)) {
    return value.toExponential(3);
  }
  return value.toLocaleString('en-US', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: 0,
  });
}

function signed(value: number, decimals = 3): string {
  const formatted = fmt(Math.abs(value), decimals);
  return value >= 0 ? `+${formatted}` : `-${formatted}`;
}

const MATERIAL_DATABASE: Record<string, MaterialProperties> = {
  '2024-t3': {
    material: 'Al 2024-T3 clad sheet',
    basis: 'typical',
    units: 'ksi',
    source: 'Aerospace Stress Analysis Reference Document §3.4',
    properties: {
      ftu_ksi: 62,
      fty_ksi: 50,
      fcy_ksi: 39,
      fsu_ksi: 40,
      e_msi: 10.7,
      g_msi: 4.0,
      nu: 0.33,
      cte_microstrain_per_f: 12.9,
    },
    notes: 'Typical MMPDS-style values for clad sheet.',
  },
  '2024-t351': {
    material: 'Al 2024-T351',
    basis: 'reference',
    units: 'ksi',
    source: 'Knowledge document references to MMPDS guidance',
    properties: {
      ftu_ksi: 64,
      fty_ksi: 42,
      fcy_ksi: 39,
      fsu_ksi: 41,
      e_msi: 10.6,
      g_msi: 3.9,
      nu: 0.33,
      cte_microstrain_per_f: 12.8,
    },
  },
  '7075-t6': {
    material: 'Al 7075-T6',
    basis: 'typical',
    units: 'ksi',
    source: 'Aerospace Stress Analysis Reference Document §3.4',
    properties: {
      ftu_ksi: 76,
      fty_ksi: 65,
      fcy_ksi: 65,
      fsu_ksi: 44,
      e_msi: 10.4,
      nu: 0.33,
      cte_microstrain_per_f: 13,
    },
    notes: 'Reference document cites a typical range of 73-78 ksi ultimate and 63-67 ksi yield.',
  },
  'ti-6al-4v': {
    material: 'Ti-6Al-4V',
    basis: 'reference',
    units: 'ksi',
    source: 'Knowledge document §8 supplementary aerospace materials reference',
    properties: {
      ftu_ksi: 138,
      fty_ksi: 128,
      fcy_ksi: 128,
      fsu_ksi: 79,
      e_msi: 16.5,
      nu: 0.34,
      cte_microstrain_per_f: 4.9,
    },
  },
  '4130': {
    material: '4130 steel',
    basis: 'reference',
    units: 'ksi',
    source: 'Knowledge document §7.2 / §8',
    properties: {
      ftu_ksi: 97,
      fty_ksi: 63,
      fsu_ksi: 56,
      e_msi: 29.5,
      nu: 0.29,
      cte_microstrain_per_f: 6.3,
    },
  },
};

function asNumber(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}

function asString(value: unknown): string | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed || undefined;
}

function normalizeMaterialKey(input: string): string {
  return input.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function classifyMargin(margin: number): 'PASS' | 'MARGINAL' | 'FAIL' {
  if (margin < 0) {
    return 'FAIL';
  }
  if (margin < 0.08) {
    return 'MARGINAL';
  }
  return 'PASS';
}

function calculateMarginOfSafety(applied: number, allowable: number, factorOfSafety = DEFAULT_FOS): MarginOfSafetyResult {
  const reserveFactor = allowable / (applied * factorOfSafety);
  const marginOfSafety = reserveFactor - 1;
  return {
    applied,
    allowable,
    factorOfSafety,
    reserveFactor,
    marginOfSafety,
    status: classifyMargin(marginOfSafety),
  };
}

async function getMaterialProperties(args: JsonRecord): Promise<ToolExecutionResult> {
  const query = asString(args.material) ?? asString(args.alloy) ?? asString(args.material_name);
  if (!query) {
    return {
      toolName: 'get_material_properties',
      summary: 'Material lookup needs a material, alloy, or material_name field.',
      status: 'INFO',
      data: { error: 'Missing material identifier.' },
    };
  }

  const normalized = normalizeMaterialKey(query);
  const directHit = MATERIAL_DATABASE[normalized];
  if (directHit) {
    return {
      toolName: 'get_material_properties',
      summary: `Retrieved reference properties for ${directHit.material}.`,
      status: 'INFO',
      data: directHit as unknown as JsonRecord,
    };
  }

  const retrieved = await retrieveRelevantAnalysisReferences(`material properties for ${query}`, 2);
  return {
    toolName: 'get_material_properties',
    summary: `No hardcoded alloy match for "${query}". Returned the most relevant knowledge-base references instead.`,
    status: 'INFO',
    data: {
      material: query,
      source: 'knowledge-base-rag',
      references: retrieved.chunks.map((chunk) => ({
        heading: chunk.heading,
        excerpt: chunk.text.slice(0, 1200),
        score: chunk.score,
      })),
    },
  };
}

async function getMarginOfSafety(args: JsonRecord): Promise<ToolExecutionResult> {
  const applied = asNumber(args.applied_load) ?? asNumber(args.applied_stress);
  const allowable = asNumber(args.allowable_load) ?? asNumber(args.allowable_stress) ?? asNumber(args.allowable);
  const factorOfSafety = asNumber(args.factor_of_safety) ?? DEFAULT_FOS;

  if (applied === undefined || allowable === undefined) {
    return {
      toolName: 'get_margin_of_safety',
      summary: 'Margin-of-safety calculation needs applied and allowable values.',
      status: 'INFO',
      data: {
        error: 'Provide applied_load/applied_stress and allowable_load/allowable_stress/allowable.',
      },
    };
  }

  const result = calculateMarginOfSafety(applied, allowable, factorOfSafety);
  const calculationSteps: CalculationStep[] = [
    {
      step: 'Reserve factor',
      formula: 'RF = F_allow / (F_applied × FoS)',
      values: `RF = ${fmt(allowable)} / (${fmt(applied)} × ${fmt(factorOfSafety)})`,
      result: `RF = ${fmt(result.reserveFactor)}`,
    },
    {
      step: 'Margin of safety',
      formula: 'MS = RF − 1',
      values: `MS = ${fmt(result.reserveFactor)} − 1`,
      result: `MS = ${signed(result.marginOfSafety)}`,
    },
  ];
  return {
    toolName: 'get_margin_of_safety',
    summary: `Margin of safety: ${signed(result.marginOfSafety)} (${result.status}).`,
    status: result.status,
    governingMargin: result.marginOfSafety,
    data: result as unknown as JsonRecord,
    calculationSteps,
  };
}

async function runBucklingCheck(args: JsonRecord): Promise<ToolExecutionResult> {
  const component = asString(args.component_name) ?? 'Unnamed component';
  const eMsi = asNumber(args.elastic_modulus_msi);
  const ePsi = asNumber(args.elastic_modulus_psi) ?? (eMsi !== undefined ? eMsi * 1_000_000 : undefined);
  const yieldKsi = asNumber(args.yield_strength_ksi);
  const yieldPsi = asNumber(args.yield_strength_psi) ?? (yieldKsi !== undefined ? yieldKsi * 1000 : undefined);
  const appliedStress = asNumber(args.applied_compressive_stress_psi);
  const slenderness = asNumber(args.slenderness_ratio);
  const effectiveLength = asNumber(args.effective_length_in) ?? asNumber(args.length_in);
  const radiusOfGyration = asNumber(args.radius_of_gyration_in);
  const kFactor = asNumber(args.k_factor) ?? 1;
  const poisson = asNumber(args.poisson_ratio) ?? 0.33;
  const plateWidth = asNumber(args.plate_width_in);
  const thickness = asNumber(args.thickness_in);
  const bucklingCoefficient = asNumber(args.buckling_coefficient) ?? 4;
  const cripplingCoefficient = asNumber(args.crippling_coefficient);
  const bOverT = asNumber(args.b_over_t)
    ?? (plateWidth !== undefined && thickness !== undefined && thickness > 0 ? plateWidth / thickness : undefined);

  const results: Array<{ mode: string; margin: number; criticalStressPsi: number }> = [];
  const calculationSteps: CalculationStep[] = [];

  if (ePsi !== undefined) {
    const slendernessRatio = slenderness
      ?? (effectiveLength !== undefined && radiusOfGyration !== undefined && radiusOfGyration > 0
        ? (kFactor * effectiveLength) / radiusOfGyration
        : undefined);

    if (slendernessRatio !== undefined && slendernessRatio > 0) {
      if (slenderness === undefined && effectiveLength !== undefined && radiusOfGyration !== undefined) {
        calculationSteps.push({
          step: 'Slenderness ratio',
          formula: 'λ = (K × L) / r',
          values: `λ = (${fmt(kFactor)} × ${fmt(effectiveLength)}) / ${fmt(radiusOfGyration)}`,
          result: `λ = ${fmt(slendernessRatio)}`,
        });
      }

      const eulerStress = (Math.PI ** 2 * ePsi) / (slendernessRatio ** 2);
      calculationSteps.push({
        step: 'Euler column stress',
        formula: 'F_e = π² × E / λ²',
        values: `F_e = π² × ${fmt(ePsi)} / ${fmt(slendernessRatio)}²`,
        result: `F_e = ${fmt(eulerStress)} psi`,
      });

      let criticalStress = eulerStress;

      if (yieldPsi !== undefined) {
        const transition = Math.sqrt((2 * Math.PI ** 2 * ePsi) / yieldPsi);
        calculationSteps.push({
          step: 'Short-column transition',
          formula: 'λ_t = √(2π² × E / F_cy)',
          values: `λ_t = √(2π² × ${fmt(ePsi)} / ${fmt(yieldPsi)})`,
          result: `λ_t = ${fmt(transition)}`,
        });
        if (slendernessRatio < transition) {
          criticalStress = yieldPsi * (1 - ((yieldPsi * slendernessRatio ** 2) / (4 * Math.PI ** 2 * ePsi)));
          calculationSteps.push({
            step: 'Johnson short-column stress',
            formula: 'F_cr = F_cy × [1 − (F_cy × λ²) / (4π² × E)]',
            values: `F_cr = ${fmt(yieldPsi)} × [1 − (${fmt(yieldPsi)} × ${fmt(slendernessRatio)}²) / (4π² × ${fmt(ePsi)})]`,
            result: `F_cr = ${fmt(criticalStress)} psi`,
          });
        } else {
          calculationSteps.push({
            step: 'Long-column governs (λ ≥ λ_t)',
            formula: 'F_cr = F_e',
            values: `F_cr = ${fmt(eulerStress)}`,
            result: `F_cr = ${fmt(criticalStress)} psi`,
          });
        }
      }

      if (appliedStress !== undefined && criticalStress > 0) {
        const ms = calculateMarginOfSafety(appliedStress, criticalStress, 1);
        calculationSteps.push({
          step: 'Column margin of safety',
          formula: 'MS = F_cr / σ − 1',
          values: `MS = ${fmt(criticalStress)} / ${fmt(appliedStress)} − 1`,
          result: `MS = ${signed(ms.marginOfSafety)}`,
        });
        results.push({
          mode: 'column buckling',
          margin: ms.marginOfSafety,
          criticalStressPsi: criticalStress,
        });
      }
    }
  }

  if (ePsi !== undefined && plateWidth !== undefined && thickness !== undefined && thickness > 0) {
    const plateCriticalStress =
      (bucklingCoefficient * Math.PI ** 2 * ePsi * (thickness / plateWidth) ** 2) /
      (12 * (1 - poisson ** 2));

    calculationSteps.push({
      step: 'Plate buckling stress',
      formula: 'F_cr = k × π² × E / [12(1 − ν²) × (b/t)²]',
      values: `F_cr = ${fmt(bucklingCoefficient)} × π² × ${fmt(ePsi)} / [12(1 − ${fmt(poisson)}²) × (${fmt(plateWidth)}/${fmt(thickness)})²]`,
      result: `F_cr = ${fmt(plateCriticalStress)} psi`,
    });

    if (appliedStress !== undefined && plateCriticalStress > 0) {
      const ms = calculateMarginOfSafety(appliedStress, plateCriticalStress, 1);
      calculationSteps.push({
        step: 'Plate margin of safety',
        formula: 'MS = F_cr / σ − 1',
        values: `MS = ${fmt(plateCriticalStress)} / ${fmt(appliedStress)} − 1`,
        result: `MS = ${signed(ms.marginOfSafety)}`,
      });
      results.push({
        mode: 'plate buckling',
        margin: ms.marginOfSafety,
        criticalStressPsi: plateCriticalStress,
      });
    }
  }

  if (yieldPsi !== undefined && cripplingCoefficient !== undefined && bOverT !== undefined && bOverT > 0) {
    const cripplingStress = yieldPsi * cripplingCoefficient * bOverT ** -0.8;
    calculationSteps.push({
      step: 'Crippling stress',
      formula: 'F_cc = F_cy × C × (b/t)^(−0.8)',
      values: `F_cc = ${fmt(yieldPsi)} × ${fmt(cripplingCoefficient)} × ${fmt(bOverT)}^(−0.8)`,
      result: `F_cc = ${fmt(cripplingStress)} psi`,
    });
    if (appliedStress !== undefined && cripplingStress > 0) {
      const ms = calculateMarginOfSafety(appliedStress, cripplingStress, 1);
      calculationSteps.push({
        step: 'Crippling margin of safety',
        formula: 'MS = F_cc / σ − 1',
        values: `MS = ${fmt(cripplingStress)} / ${fmt(appliedStress)} − 1`,
        result: `MS = ${signed(ms.marginOfSafety)}`,
      });
      results.push({
        mode: 'crippling',
        margin: ms.marginOfSafety,
        criticalStressPsi: cripplingStress,
      });
    }
  }

  if (results.length === 0) {
    return {
      toolName: 'run_buckling_check',
      summary: 'Buckling check needs geometric and material inputs such as E, slenderness or L/r, plus applied stress.',
      status: 'INFO',
      data: {
        component,
        expectedInputs: [
          'elastic_modulus_psi or elastic_modulus_msi',
          'applied_compressive_stress_psi',
          'slenderness_ratio or effective_length_in + radius_of_gyration_in',
          'optional: yield_strength_psi, plate_width_in, thickness_in, buckling_coefficient',
        ],
      },
    };
  }

  results.sort((left, right) => left.margin - right.margin);
  const governing = results[0];
  return {
    toolName: 'run_buckling_check',
    summary: `${component}: governing buckling mode is ${governing.mode} with MS ${signed(governing.margin)}.`,
    status: classifyMargin(governing.margin),
    governingMargin: governing.margin,
    data: {
      component,
      governingMode: governing.mode,
      checks: results,
    },
    calculationSteps,
  };
}

async function runBearingAnalysis(args: JsonRecord): Promise<ToolExecutionResult> {
  const joint = asString(args.joint_description) ?? asString(args.component_name) ?? 'Joint';
  const diameter = asNumber(args.fastener_diameter_in) ?? asNumber(args.diameter_in);
  const thickness = asNumber(args.thickness_in);
  const appliedLoad = asNumber(args.applied_load_lbf);
  const fos = asNumber(args.factor_of_safety) ?? DEFAULT_FOS;
  const bearingStrengthKsi = asNumber(args.bearing_ultimate_strength_ksi);
  const bearingStrengthPsi = asNumber(args.bearing_ultimate_strength_psi)
    ?? (bearingStrengthKsi !== undefined ? bearingStrengthKsi * 1000 : undefined);

  if (
    diameter === undefined ||
    thickness === undefined ||
    appliedLoad === undefined ||
    bearingStrengthPsi === undefined
  ) {
    return {
      toolName: 'run_bearing_analysis',
      summary: 'Bearing analysis needs diameter, thickness, applied load, and bearing ultimate strength.',
      status: 'INFO',
      data: {
        joint,
        expectedInputs: [
          'fastener_diameter_in or diameter_in',
          'thickness_in',
          'applied_load_lbf',
          'bearing_ultimate_strength_psi or bearing_ultimate_strength_ksi',
        ],
      },
    };
  }

  const allowableLoad = bearingStrengthPsi * diameter * thickness;
  const result = calculateMarginOfSafety(appliedLoad, allowableLoad, fos);

  const calculationSteps: CalculationStep[] = [
    {
      step: 'Bearing allowable load',
      formula: 'P_bru = F_bru × D × t',
      values: `P_bru = ${fmt(bearingStrengthPsi)} × ${fmt(diameter)} × ${fmt(thickness)}`,
      result: `P_bru = ${fmt(allowableLoad)} lbf`,
    },
    {
      step: 'Reserve factor',
      formula: 'RF = P_bru / (P_applied × FoS)',
      values: `RF = ${fmt(allowableLoad)} / (${fmt(appliedLoad)} × ${fmt(fos)})`,
      result: `RF = ${fmt(result.reserveFactor)}`,
    },
    {
      step: 'Bearing margin of safety',
      formula: 'MS = RF − 1',
      values: `MS = ${fmt(result.reserveFactor)} − 1`,
      result: `MS = ${signed(result.marginOfSafety)}`,
    },
  ];

  return {
    toolName: 'run_bearing_analysis',
    summary: `${joint}: bearing allowable ${fmt(allowableLoad)} lbf, MS ${signed(result.marginOfSafety)} (${result.status}).`,
    status: result.status,
    governingMargin: result.marginOfSafety,
    data: {
      joint,
      bearingAllowableLoadLbf: allowableLoad,
      ...result,
    },
    calculationSteps,
  };
}

async function runShearAnalysis(args: JsonRecord): Promise<ToolExecutionResult> {
  const component = asString(args.component_name) ?? 'Shear feature';
  const appliedLoad = asNumber(args.applied_load_lbf);
  const shearArea = asNumber(args.shear_area_in2)
    ?? (() => {
      const width = asNumber(args.width_in);
      const thickness = asNumber(args.thickness_in);
      if (width !== undefined && thickness !== undefined) {
        return width * thickness;
      }
      return undefined;
    })();
  const shearStrengthKsi = asNumber(args.shear_strength_ksi);
  const shearStrengthPsi = asNumber(args.shear_strength_psi)
    ?? (shearStrengthKsi !== undefined ? shearStrengthKsi * 1000 : undefined);
  const fos = asNumber(args.factor_of_safety) ?? DEFAULT_FOS;
  const fastenerCount = asNumber(args.fastener_count);
  const fastenerAllowable = asNumber(args.fastener_shear_allowable_lbf);
  const edgeDistance = asNumber(args.edge_distance_in);
  const thickness = asNumber(args.thickness_in);

  const modes: Array<{ mode: string; allowable: number; margin: number }> = [];
  const calculationSteps: CalculationStep[] = [];

  if (appliedLoad !== undefined && shearArea !== undefined && shearStrengthPsi !== undefined) {
    const allowable = shearStrengthPsi * shearArea;
    const result = calculateMarginOfSafety(appliedLoad, allowable, fos);
    calculationSteps.push({
      step: 'Web/direct shear allowable',
      formula: 'P_s = F_su × A_s',
      values: `P_s = ${fmt(shearStrengthPsi)} × ${fmt(shearArea)}`,
      result: `P_s = ${fmt(allowable)} lbf`,
    });
    calculationSteps.push({
      step: 'Web/direct shear MS',
      formula: 'MS = P_s / (P × FoS) − 1',
      values: `MS = ${fmt(allowable)} / (${fmt(appliedLoad)} × ${fmt(fos)}) − 1`,
      result: `MS = ${signed(result.marginOfSafety)}`,
    });
    modes.push({
      mode: 'web/direct shear',
      allowable,
      margin: result.marginOfSafety,
    });
  }

  if (appliedLoad !== undefined && fastenerCount !== undefined && fastenerAllowable !== undefined) {
    const allowable = fastenerCount * fastenerAllowable;
    const result = calculateMarginOfSafety(appliedLoad, allowable, fos);
    calculationSteps.push({
      step: 'Fastener group shear allowable',
      formula: 'P_group = n × P_s_single',
      values: `P_group = ${fmt(fastenerCount)} × ${fmt(fastenerAllowable)}`,
      result: `P_group = ${fmt(allowable)} lbf`,
    });
    calculationSteps.push({
      step: 'Fastener shear MS',
      formula: 'MS = P_group / (P × FoS) − 1',
      values: `MS = ${fmt(allowable)} / (${fmt(appliedLoad)} × ${fmt(fos)}) − 1`,
      result: `MS = ${signed(result.marginOfSafety)}`,
    });
    modes.push({
      mode: 'fastener shear',
      allowable,
      margin: result.marginOfSafety,
    });
  }

  if (
    appliedLoad !== undefined &&
    edgeDistance !== undefined &&
    thickness !== undefined &&
    shearStrengthPsi !== undefined
  ) {
    const allowable = 2 * edgeDistance * thickness * shearStrengthPsi;
    const result = calculateMarginOfSafety(appliedLoad, allowable, fos);
    calculationSteps.push({
      step: 'Shear-out allowable',
      formula: 'P_so = 2 × e × t × F_su',
      values: `P_so = 2 × ${fmt(edgeDistance)} × ${fmt(thickness)} × ${fmt(shearStrengthPsi)}`,
      result: `P_so = ${fmt(allowable)} lbf`,
    });
    calculationSteps.push({
      step: 'Shear-out MS',
      formula: 'MS = P_so / (P × FoS) − 1',
      values: `MS = ${fmt(allowable)} / (${fmt(appliedLoad)} × ${fmt(fos)}) − 1`,
      result: `MS = ${signed(result.marginOfSafety)}`,
    });
    modes.push({
      mode: 'shear-out',
      allowable,
      margin: result.marginOfSafety,
    });
  }

  if (modes.length === 0) {
    return {
      toolName: 'run_shear_analysis',
      summary: 'Shear analysis needs applied load plus either web area + shear strength, fastener allowables, or shear-out geometry.',
      status: 'INFO',
      data: {
        component,
        expectedInputs: [
          'applied_load_lbf',
          'shear_area_in2 + shear_strength_psi/ksi, or',
          'fastener_count + fastener_shear_allowable_lbf, or',
          'edge_distance_in + thickness_in + shear_strength_psi/ksi',
        ],
      },
    };
  }

  modes.sort((left, right) => left.margin - right.margin);
  const governing = modes[0];
  return {
    toolName: 'run_shear_analysis',
    summary: `${component}: governing shear mode is ${governing.mode} with MS ${signed(governing.margin)}.`,
    status: classifyMargin(governing.margin),
    governingMargin: governing.margin,
    data: {
      component,
      governingMode: governing.mode,
      checks: modes,
    },
    calculationSteps,
  };
}

async function runFullAnalysis(args: JsonRecord): Promise<ToolExecutionResult> {
  const [buckling, bearing, shear] = await Promise.all([
    runBucklingCheck(args),
    runBearingAnalysis(args),
    runShearAnalysis(args),
  ]);

  const checks = [buckling, bearing, shear].filter((result) => result.status !== 'INFO');
  if (checks.length === 0) {
    return {
      toolName: 'run_full_analysis',
      summary: 'Full analysis could not run because the inputs are too sparse for buckling, bearing, or shear calculations.',
      status: 'INFO',
      data: {
        buckling: buckling.data,
        bearing: bearing.data,
        shear: shear.data,
      },
    };
  }

  const governing = checks
    .filter((result) => typeof result.governingMargin === 'number')
    .sort((left, right) => (left.governingMargin ?? 0) - (right.governingMargin ?? 0))[0];

  const sectionLabel = (tool: string): string => {
    if (tool === 'run_buckling_check') return 'BUCKLING';
    if (tool === 'run_bearing_analysis') return 'BEARING';
    if (tool === 'run_shear_analysis') return 'SHEAR';
    return tool.toUpperCase();
  };

  const calculationSteps: CalculationStep[] = [];
  for (const sub of [buckling, bearing, shear]) {
    const subSteps = sub.calculationSteps ?? [];
    if (subSteps.length === 0) continue;
    const label = sectionLabel(sub.toolName);
    for (const entry of subSteps) {
      calculationSteps.push({
        step: `[${label}] ${entry.step}`,
        formula: entry.formula,
        values: entry.values,
        result: entry.result,
      });
    }
  }

  if (governing && typeof governing.governingMargin === 'number') {
    calculationSteps.push({
      step: 'Governing failure mode',
      formula: 'min(MS across checks)',
      values: `min(buckling, bearing, shear) → ${governing.toolName}`,
      result: `MS_governing = ${signed(governing.governingMargin)}`,
    });
  }

  return {
    toolName: 'run_full_analysis',
    summary: governing
      ? `Integrated check complete. Governing mode is ${governing.toolName} at MS ${signed(governing.governingMargin ?? 0)}.`
      : 'Integrated check complete.',
    status: governing ? classifyMargin(governing.governingMargin ?? 0) : 'INFO',
    governingMargin: governing?.governingMargin,
    data: {
      buckling,
      bearing,
      shear,
    },
    calculationSteps,
  };
}

export const STRESS_ANALYST_TOOL_DEFINITIONS: ToolDefinition[] = [
  {
    type: 'function',
    function: {
      name: 'run_buckling_check',
      description: 'Run column, plate, and crippling buckling screens when geometry, stiffness, and applied stress are available.',
      parameters: {
        type: 'object',
        properties: {
          component_name: { type: 'string' },
          elastic_modulus_psi: { type: 'number' },
          elastic_modulus_msi: { type: 'number' },
          yield_strength_psi: { type: 'number' },
          yield_strength_ksi: { type: 'number' },
          applied_compressive_stress_psi: { type: 'number' },
          slenderness_ratio: { type: 'number' },
          effective_length_in: { type: 'number' },
          radius_of_gyration_in: { type: 'number' },
          k_factor: { type: 'number' },
          plate_width_in: { type: 'number' },
          thickness_in: { type: 'number' },
          buckling_coefficient: { type: 'number' },
          poisson_ratio: { type: 'number' },
          crippling_coefficient: { type: 'number' },
          b_over_t: { type: 'number' },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'run_bearing_analysis',
      description: 'Run a fastener-hole or lug bearing check using bearing allowable P_bru = F_bru * D * t.',
      parameters: {
        type: 'object',
        properties: {
          joint_description: { type: 'string' },
          component_name: { type: 'string' },
          fastener_diameter_in: { type: 'number' },
          diameter_in: { type: 'number' },
          thickness_in: { type: 'number' },
          applied_load_lbf: { type: 'number' },
          factor_of_safety: { type: 'number' },
          bearing_ultimate_strength_psi: { type: 'number' },
          bearing_ultimate_strength_ksi: { type: 'number' },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'run_shear_analysis',
      description: 'Run web shear, fastener shear, and shear-out screens depending on the provided inputs.',
      parameters: {
        type: 'object',
        properties: {
          component_name: { type: 'string' },
          applied_load_lbf: { type: 'number' },
          shear_area_in2: { type: 'number' },
          width_in: { type: 'number' },
          thickness_in: { type: 'number' },
          shear_strength_psi: { type: 'number' },
          shear_strength_ksi: { type: 'number' },
          factor_of_safety: { type: 'number' },
          fastener_count: { type: 'number' },
          fastener_shear_allowable_lbf: { type: 'number' },
          edge_distance_in: { type: 'number' },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'run_full_analysis',
      description: 'Run all applicable stress screens and identify the governing mode and margin.',
      parameters: {
        type: 'object',
        properties: {
          component_name: { type: 'string' },
          material: { type: 'string' },
          geometry_summary: { type: 'string' },
          load_case_summary: { type: 'string' },
          elastic_modulus_psi: { type: 'number' },
          elastic_modulus_msi: { type: 'number' },
          yield_strength_psi: { type: 'number' },
          yield_strength_ksi: { type: 'number' },
          applied_compressive_stress_psi: { type: 'number' },
          slenderness_ratio: { type: 'number' },
          effective_length_in: { type: 'number' },
          radius_of_gyration_in: { type: 'number' },
          plate_width_in: { type: 'number' },
          thickness_in: { type: 'number' },
          fastener_diameter_in: { type: 'number' },
          applied_load_lbf: { type: 'number' },
          bearing_ultimate_strength_psi: { type: 'number' },
          shear_strength_psi: { type: 'number' },
          shear_area_in2: { type: 'number' },
          edge_distance_in: { type: 'number' },
          fastener_count: { type: 'number' },
          fastener_shear_allowable_lbf: { type: 'number' },
          factor_of_safety: { type: 'number' },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_material_properties',
      description: 'Look up common aerospace alloy properties from the knowledge base or hardcoded reference values.',
      parameters: {
        type: 'object',
        properties: {
          material: { type: 'string' },
          alloy: { type: 'string' },
          material_name: { type: 'string' },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_margin_of_safety',
      description: 'Calculate margin of safety from applied and allowable load or stress values.',
      parameters: {
        type: 'object',
        properties: {
          applied_load: { type: 'number' },
          applied_stress: { type: 'number' },
          allowable_load: { type: 'number' },
          allowable_stress: { type: 'number' },
          allowable: { type: 'number' },
          factor_of_safety: { type: 'number' },
        },
      },
    },
  },
];

export async function executeStressTool(name: string, args: JsonRecord): Promise<ToolExecutionResult> {
  switch (name) {
    case 'run_buckling_check':
      return runBucklingCheck(args);
    case 'run_bearing_analysis':
      return runBearingAnalysis(args);
    case 'run_shear_analysis':
      return runShearAnalysis(args);
    case 'run_full_analysis':
      return runFullAnalysis(args);
    case 'get_material_properties':
      return getMaterialProperties(args);
    case 'get_margin_of_safety':
      return getMarginOfSafety(args);
    default:
      return {
        toolName: name,
        summary: `Unknown tool: ${name}`,
        status: 'INFO',
        data: { error: `Unknown tool: ${name}` },
      };
  }
}

export async function getKnowledgeBackedMaterialSummary(material: string): Promise<string> {
  const normalized = normalizeMaterialKey(material);
  const direct = MATERIAL_DATABASE[normalized];
  if (direct) {
    return JSON.stringify(direct);
  }

  const knowledge = await getKnowledgeDocumentText();
  return knowledge.slice(0, 2000);
}
