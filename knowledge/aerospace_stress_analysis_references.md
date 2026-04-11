# Aerospace Stress Analysis Reference Document

> **Purpose:** This document serves as a RAG knowledge base for an aerospace structural/stress analyst AI bot. It organizes publicly available online references by analysis type, providing key methods, formulas, and curated source lists with detailed descriptions. All URLs point to openly accessible resources.

---

## 1. Buckling Analysis (Column, Local, Crippling)

Buckling is a critical failure mode in lightweight aerospace structures where thin members can fail by instability well below material yield strength. Three regimes must be checked: global column buckling, local plate buckling, and crippling of thin-walled cross-sections.

### 1.1 Column Buckling (Euler / Johnson)

**Euler Formula (Elastic Long-Column Buckling):**

- Critical load: P_cr = π²EI / (L_eff)², where L_eff = KL
- Critical stress: σ_cr = π²E / (L_eff / ρ)², where ρ = √(I/A) is the radius of gyration
- Effective length factor K:
  - Pinned–pinned: K = 1.0
  - Fixed–fixed: K = 0.5
  - Fixed–free (cantilever): K = 2.0
  - Fixed–pinned: K = 0.7

The slenderness ratio (L/ρ) determines whether the column fails in the elastic (Euler) or inelastic regime. The transition slenderness ratio is:

- (L/ρ)_c = √(2π²E / σ_y)

**Johnson Formula (Inelastic Short-Column Buckling, L/ρ < (L/ρ)_c):**

- σ_cr = σ_y [1 − σ_y(L_eff/ρ)² / (4π²E)]

For columns in the inelastic range, the tangent modulus method replaces E with E_t (the slope of the stress-strain curve at the applied stress level). The Ramberg-Osgood equation is commonly used to model the nonlinear stress-strain curve for aerospace metals.

**Three Column Failure Regimes:**
1. Long columns (high L/ρ): Euler elastic buckling governs
2. Short columns (intermediate L/ρ): Johnson or tangent modulus method governs
3. Very short / block compression (very low L/ρ): Material yield or crippling governs

### 1.2 Plate Buckling (Local Buckling)

- Critical buckling stress: F_cr = kπ²E / [12(1 − ν²)] × (t/b)²
- k = plate buckling coefficient, dependent on edge boundary conditions and loading type:
  - Simply supported plate under uniaxial compression: k = 4.0
  - Long plate under shear (simply supported edges): k ≈ 5.35
- Post-buckling strength: Thin aircraft skin panels can carry significant load beyond initial buckling. The effective width concept accounts for post-buckled load redistribution into adjacent stiffeners.

### 1.3 Crippling

Crippling is the maximum average stress a thin-walled section can sustain after local buckling. It governs the compressive strength of formed and extruded stiffener sections.

**Calculation Procedure:**
1. Divide the cross-section into flange segments
2. Classify each segment as NEF (No Edge Free — both edges supported) or OEF (One Edge Free — one edge unsupported)
3. Compute segment crippling stress: F_cc / F_cy = C(b/t)^n, where n ≈ −0.8 and C depends on NEF vs. OEF classification and material
4. Section crippling stress (area-weighted average): F_cc = Σ(F_ccn × A_n) / ΣA_n

### 1.4 Diagonal Tension (Shear Webs)

Aircraft spar webs operate in one of three regimes:
- **Shear-resistant:** Web does not buckle; pure shear stress state
- **Pure diagonal tension:** Web fully buckled; load carried entirely by diagonal tension field
- **Incomplete diagonal tension:** Most real aircraft webs; partially buckled web carries load through a combination of shear and diagonal tension

The Wagner diagonal tension method (documented in NACA TN 2661) provides engineering methods for calculating web stresses, stiffener loads, and rivet loads in the incomplete diagonal tension regime.

### Sources

1. **[Abbott Aerospace — Crippling (AA-SB-001 §15.5)](https://www.abbottaerospace.com/aa-sb-001/15-local-stability-isotropic-materials/15-5-crippling/)** — Full HTML text on crippling methodology per AFFDL-TR-69-42. Covers NEF/OEF equations, section crippling calculation procedure, and worked examples for typical stiffener cross-sections.

2. **[Collier Aerospace — Buckling & Crippling PDF](https://cdn.collieraerospace.com/wp-content/uploads/2023/04/Buckling-Crippling.pdf)** — Comprehensive slide deck from the HyperX developers. Covers Euler buckling, effective lengths, tangent modulus, local plate buckling (coefficient k), post-buckling strength, crippling NEF/OEF equations, and worked examples. Excellent visual reference reflecting industry practice.

3. **[Purdue ME323 — Column Buckling Lecture Notes](https://www.purdue.edu/freeform/me323/wp-content/uploads/sites/2/2022/04/week16.pdf)** — PDF lecture notes with clean mathematical derivation of Euler formula for all four boundary conditions, Johnson formula, and slenderness ratio transition criteria.

4. **[NASA SP-8068 — Buckling Strength of Structural Plates](https://ntrs.nasa.gov/api/citations/19710023855/downloads/19710023855.pdf)** — Official NASA design criteria monograph. Covers unstiffened, corrugated, stringer-stiffened, waffle-stiffened, sandwich, and fiber-reinforced composite plates. Includes thermal effects on plate stability.

5. **[Abbott Aerospace — NACA TN 2661 (Diagonal Tension)](https://www.abbottaerospace.com/downloads/naca-tn-2661-a-summary-of-diagonal-tension-part-i-methods-of-analysis/)** — Download page for the foundational diagonal tension reference. Part I covers methods for calculating web stresses, stiffener loads, and rivet loads in incomplete diagonal tension webs using the Wagner method.

6. **[Sarath SRI Aerospace — Diagonal Tension Training PDF](http://sarathsri.com/pdf/aerospace_diagonal%20tension_concept.pdf)** — Clean textbook-style presentation covering shear-resistant beams, pure diagonal tension theory, incomplete diagonal tension engineering method, design procedures, and a numerical example.

7. **[iMechanica — Euler Buckling Discussion](https://imechanica.egr.uh.edu/node/4426)** — Forum discussion referencing Bruhn directly. Explains the three column failure regimes (long, short, block compression) and when each formula applies.

8. **[Vaia — Buckling Analysis in Aerospace](https://www.vaia.com/en-us/explanations/engineering/aerospace-engineering/buckling-analysis/)** — Introductory explainer covering Euler formula, eigenvalue buckling, FEM buckling methods, and applications in aircraft structural design.

---

## 2. Fastener / Joint Analysis (Bearing, Shear, Tear-out)

Mechanically fastened joints are the primary load transfer method in airframe structures. Every fastener must be checked for shear, bearing, tension, and combined loading. Joint behavior — bearing-critical vs. shear-critical — drives design philosophy.

### 2.1 Fastener Strength Checks

**Shear Check:**
- MS = P_su / (P_applied × FoS) − 1
- P_su = fastener ultimate shear allowable (from MMPDS Chapter 8 or manufacturer data)

**Bearing Check:**
- MS = P_bru / (P_applied × FoS) − 1
- P_bru = F_bru × D × t, where F_bru = bearing ultimate strength of sheet material, D = fastener diameter, t = sheet thickness

**Tension Check:**
- MS = P_tu / (P_applied × FoS) − 1

**Combined Shear + Tension Interaction:**
- R_s² + R_t² ≤ 1, where R_s = applied shear / shear allowable, R_t = applied tension / tension allowable
- MS = 1/√(R_s² + R_t²) − 1
- **Bearing is always checked independently** and is not included in the shear-tension interaction equation.

### 2.2 Bearing-Critical vs. Shear-Critical Joints

- **Bearing-critical:** Preferred for single-load-path structure. Bearing failure is progressive — load redistributes to adjacent fasteners, preventing catastrophic "zipper" failure.
- **Shear-critical:** Fastener shear failure is sudden and can propagate sequentially through the joint (zipper effect).
- **Rule of thumb:** Rivet diameter ≈ 3× thinnest sheet thickness promotes bearing-critical behavior.

### 2.3 Multi-Fastener Load Distribution

- At ultimate load for bearing-critical joints: assume uniform load distribution across all fasteners.
- At limit load: check peaking factor at end fasteners (end fasteners carry more load due to compliance mismatch).
- Bearing-bypass analysis evaluates the combined bearing load and bypass (net section) load at each fastener location.

### 2.4 Fitting Factor and Lug Analysis

- **FAR 23.625 / 25.625:** An additional 1.15 fitting factor is applied to all fitting and joint allowables.
- **Lug bearing:** P = F_bru × D × t (bearing area = pin diameter × lug thickness)
- **Lug failure modes:** Net section tension, shear tear-out, and bearing — all three must be checked.

### Sources

1. **[AircraftStress.com — Fastener Analysis Part 1](https://aircraftstress.com/2019/01/10/fastener-analysis-part-1/)** — Practical blog post covering fastener shear and bearing analysis, shear-critical vs. bearing-critical joint behavior, the zipper effect, a worked example with MMPDS-09 reference values, and limit vs. ultimate load distinctions.

2. **[Abbott Aerospace — Mechanical Joint Strength (AA-SB-001 §12.2.2)](https://www.abbottaerospace.com/aa-sb-001/12-joints/12-2-mechanically-fastened-joints/12-2-2-mechanical-joint-strength/)** — Covers in-plane shear and out-of-plane tension strength, FAR 23.625/25.625 fitting factor, bearing strength formula, combined shear + tension interaction, and guidance on when to apply each check.

3. **[NASA TM-19960012183 — Preloaded Joint Analysis for Space Flight Systems](https://ntrs.nasa.gov/api/citations/19960012183/downloads/19960012183.pdf)** — Full treatment of shear allowable calculation, shear area definitions, combined loading methodology, and margin of safety formulas for space-rated fastener joints.

4. **[Embry-Riddle Open Textbook — Aerospace Structures](https://eaglepubs.erau.edu/introductiontoaerospaceflightvehicles/chapter/aerospace-structures/)** — Explains fastener shear fundamentals, shear web theory, spar cap/web interaction, and shear flow in built-up structures. Fully open-access HTML with complete text and formulas.

5. **[Abbott Aerospace — NASA TM-89153 (Bearing/Bypass on Composites)](https://www.abbottaerospace.com/downloads/nasa-tm-89153-bearing-bypass-loading-on-bolted-composite-joints/)** — Download page for the NASA reference on bearing/bypass interaction in graphite/epoxy composite bolted joints. Critical for composite joint analysis.

---

## 3. Margin of Safety (Tension, Compression, Combined Loading)

The margin of safety (MS) is the fundamental metric in aerospace stress analysis. Every structural element must demonstrate positive MS under all applicable load cases.

### 3.1 Basic Margin of Safety Formula

- **MS = (Allowable / (Applied Load × FoS)) − 1**
- MS ≥ 0.0 required (positive margin)
- General aviation ultimate factor of safety: FoS = 1.5
- Yield factor of safety: FoS = 1.0 (limit load check); 1.1 to 1.2 is recommended conservative practice

### 3.2 Load Ratios and Combined Loading

Load ratios express the fraction of available strength consumed:
- R = (Applied stress × FoS) / Allowable stress
- R_t = tensile ratio, R_s = shear ratio, R_b = bending ratio

**Shear + Tension Interaction:**
- R_t² + R_s² ≤ 1
- MS = 1/√(R_t² + R_s²) − 1

### 3.3 Material Allowables

| Property | Symbol | Description |
|----------|--------|-------------|
| Ultimate tensile strength | F_tu | Maximum tensile stress before fracture |
| Tensile yield strength | F_ty | 0.2% offset tensile yield |
| Compressive yield strength | F_cy | 0.2% offset compressive yield |
| Ultimate shear strength | F_su | ≈ 0.577 F_tu for metals (von Mises) |
| Bearing ultimate | F_bru | From MMPDS at e/D = 2.0 and 1.5 |
| Bearing yield | F_bry | Bearing yield at 4% hole deformation |

**Statistical Basis:**
- **A-basis:** 99% of population meets or exceeds the value, with 95% confidence — required for single load path structure
- **B-basis:** 90% of population meets or exceeds the value, with 95% confidence — permitted for redundant structure

### 3.4 Common Aerospace Alloy Properties (Typical MMPDS Values)

**Al 2024-T3 Clad Sheet:**
- F_tu = 62 ksi, F_ty = 50 ksi, F_cy = 39 ksi, F_su = 40 ksi
- E = 10.7 × 10⁶ psi, G = 4.0 × 10⁶ psi, ν = 0.33

**Al 7075-T6:**
- F_tu = 73–78 ksi, F_ty = 63–67 ksi, F_cy = 63–67 ksi
- E = 10.4 × 10⁶ psi

### Sources

1. **[Kitplanes — Stressing Structure: Margins of Safety](https://www.kitplanes.com/stressing-structure-2/)** — Written by a practicing stress engineer. Covers the MS formula, factor of safety definitions, yield vs. ultimate MS, combined loading via R-ratios, and interaction equations. Excellent practical treatment.

2. **[NASA TM-2019-220153 — Factors of Safety and Margins from Interaction Equations](https://ntrs.nasa.gov/api/citations/20190032150/downloads/TM-2019-220153.pdf)** — Official NASA methodology. Derives closed-form margin of safety expressions from interaction equations, addresses dual FS definition, and covers tensile, shear, yield, and ultimate conditions. Authoritative reference.

3. **[Sandia JAS Toolbox — Margins of Safety](https://jastoolbox.sandia.gov/topic/mechanical-specification/design-constraints/structural-integrity/margins-of-safety/)** — Defines MS = 1/R − 1, requires failure theory citation, and addresses yield and ultimate requirements for metals (composites checked at ultimate only).

4. **[StressEbook — MMPDS Mechanical Properties Table Guide](https://www.stressebook.com/mmpds-mechanical-properties-table/)** — Explains how to read MMPDS mechanical properties tables. Walks through F_tu, F_ty, F_cy, F_su, F_bru, F_bry, and elastic constants using Al 2024-T351 as an example. Essential for new analysts.

5. **[MMPDS Official Overview Presentation](https://www.mmpds.org/wp-content/uploads/2015/03/mmpds_2015_2007aeromat_presentation.pdf)** — Explains A-basis/B-basis statistics, FAA acceptance per AC 25.613-1, MMPDS content overview (Chapters 1–9: aluminum, steel, titanium, fasteners), and the relationship to MIL-HDBK-5.

6. **[MIL-HDBK-5H — Full Text PDF (University of Arkansas)](https://ssrl-uark.com/MILHDBK5H.pdf)** — The complete December 1998 edition of MIL-HDBK-5H, the predecessor to MMPDS. Contains aluminum (Chapter 3), steel (Chapter 2), titanium (Chapter 5), magnesium (Chapter 4), and fastener/joint allowables (Chapter 8). Fully indexed.

---

## 4. Fatigue Analysis Basics

Fatigue failure is the dominant structural failure mode in service for aircraft. Analysis methods range from S-N curve approaches for safe-life design to fracture mechanics methods for damage tolerance evaluation.

### 4.1 S-N Curve Method (High Cycle Fatigue)

The S-N curve plots stress amplitude (σ_a) vs. cycles to failure (N):
- **Low cycle fatigue:** N = 1 to 10³ cycles; plastic strain dominant
- **High cycle fatigue:** N = 10³ to 10⁷+ cycles; elastic strain dominant
- **Steel:** Exhibits a true endurance limit at approximately 10⁷ cycles
- **Aluminum:** No true endurance limit — fatigue strength continues to decrease with increasing cycles

### 4.2 Goodman Diagram (Mean Stress Effects)

The Modified Goodman equation accounts for the effect of mean stress on fatigue life:

- σ_a / S_e + σ_m / S_u = 1 (failure boundary line)
- Rearranged: σ_a = σ_N [1 − (σ_m / σ_u)]
- Stress ratio: R = σ_min / σ_max (fully reversed loading: R = −1)
- Safe design zone lies below the Goodman line on the σ_a vs. σ_m diagram

### 4.3 Miner's Rule (Cumulative Damage)

For variable amplitude loading spectra:

- D = Σ(n_i / N_i) ≤ 1.0
- n_i = applied cycles at stress level i
- N_i = life at stress level i (from S-N curve)
- Failure predicted when D = 1.0 (actual failure often occurs at D = 0.7 to 1.5 due to load sequence effects)

### 4.4 Damage Tolerance (Fracture Mechanics)

**Linear Elastic Fracture Mechanics (LEFM):**
- Stress intensity factor: K = Yσ√(πa), where a = crack half-length, Y = geometry factor
- Fracture toughness: K_Ic = critical K for unstable fracture (material property, units: MPa√m or ksi√in)
- Critical crack size: a_cr = (1/π)(K_Ic / σ)²

**Crack Growth (Paris Law):**
- da/dN = C(ΔK)^m, where C and m are material constants, ΔK = K_max − K_min
- Inspection intervals are derived from the crack growth curve: time from initial assumed flaw to critical crack size

### 4.5 FAA Regulatory Requirements (FAR 25.571)

- **Safe-life:** Structure retired before fatigue cracks initiate; no in-service cracking permitted
- **Fail-safe:** Multiple load paths ensure single member failure does not cause catastrophic failure
- **Damage tolerance:** Structure with assumed initial damage must maintain residual strength above limit load until damage is detected through scheduled inspections

### Sources

1. **[US Naval Academy EN380 — Chapter 12: Fatigue](https://www.usna.edu/NAOE/_files/documents/Courses/EN380/Course_Notes/Ch12_Fatigue.pdf)** — Course notes PDF covering S-N curves, Goodman and Soderberg relations, mean stress effects, endurance limit concepts, and Miner's rule. Clean academic treatment with worked example problems.

2. **[TU Delft OpenCourseWare — Fatigue in Aerospace Engineering](https://ocw.tudelft.nl/course-lectures/fatigue-aerospace-engineering/)** — Video lecture with supporting content on cyclic loading, fatigue life prediction methods, and an aviation structural failure case study.

3. **[FAA AC 23-13A — Fatigue, Fail-Safe, and Damage Tolerance Evaluation](https://www.faa.gov/documentlibrary/media/advisory_circular/ac_23-13a.pdf)** — Official FAA advisory circular. Covers safe-life, fail-safe, and damage tolerance evaluation methods; mission spectrum development; test substantiation requirements; and inspection interval determination. Essential regulatory reference.

4. **[NASA — Fatigue Crack Growth Database (NASGRO)](https://ntrs.nasa.gov/citations/20050232857)** — NASA/FAA-sponsored report on fatigue crack growth data for damage tolerance analysis. Covers the NASGRO database, Walker equation parameters, and tabular data for aluminum, titanium, and steel aircraft alloys.

5. **[Fairfield University ME311 — Goodman Diagram Lecture Notes](http://www.faculty.fairfield.edu/wdornfeld/ME311/MEEG3311MachineDesignNotes06.pdf)** — Covers S-N curve construction, modified Goodman diagram, stress amplitude and mean stress interaction, and fatigue life calculation with derating factors (surface finish, size, reliability).

6. **[NASA Astronautic Structures Manual — Volume I (Fatigue Section)](https://ntrs.nasa.gov/citations/19760071125)** — Section E covers fatigue and fracture mechanics. Comprehensive NASA methodology for aerospace structures including crack growth analysis procedures.

---

## 5. Composite Laminate Analysis

Composite materials (primarily CFRP) are increasingly used in aerospace primary structure. Analysis requires understanding of classical lamination theory, ply-level failure criteria, and aerospace-specific design practices.

### 5.1 Classical Lamination Theory (CLT)

**Lamina Constitutive Relations:**
- [σ] = [Q][ε], where [Q] is the reduced stiffness matrix:
  - Q₁₁ = E₁ / (1 − ν₁₂ν₂₁)
  - Q₂₂ = E₂ / (1 − ν₁₂ν₂₁)
  - Q₁₂ = ν₁₂E₂ / (1 − ν₁₂ν₂₁)
  - Q₆₆ = G₁₂
- Transform to global laminate axes using rotation matrix T(θ) for each ply angle

**ABD Matrix (Laminate Stiffness):**
- {N, M} = [A, B; B, D]{ε⁰, κ}
  - A_ij = Σ Q̄_ij(k) (z_k − z_{k−1}) — extensional (in-plane) stiffness
  - B_ij = ½ Σ Q̄_ij(k) (z_k² − z_{k−1}²) — coupling stiffness
  - D_ij = ⅓ Σ Q̄_ij(k) (z_k³ − z_{k−1}³) — bending stiffness
- **Symmetric laminates:** B = 0 (no membrane-bending coupling) — strongly preferred in aerospace design
- **Balanced laminates:** A₁₆ = A₂₆ = 0 (no shear-extension coupling)

### 5.2 Failure Criteria

**Max Stress Criterion:** Each ply stress component compared individually to the corresponding strength:
- σ₁ < X_t (tension) or |σ₁| < X_c (compression), σ₂ < Y_t or |σ₂| < Y_c, |τ₁₂| < S

**Tsai-Hill Criterion:**
- (σ₁/X)² − σ₁σ₂/X² + (σ₂/Y)² + (τ₁₂/S)² ≤ 1

**Tsai-Wu Criterion:**
- F₁σ₁ + F₂σ₂ + F₁₁σ₁² + F₂₂σ₂² + F₆₆τ₁₂² + 2F₁₂σ₁σ₂ ≤ 1
- More general than Tsai-Hill; distinguishes between tensile and compressive strengths

### 5.3 Aerospace Composite Design Practice

In practice, aerospace primary structure uses **strain allowables** derived from CAI (Compression After Impact) testing rather than pure ply-by-ply failure criteria:
- **BVID (Barely Visible Impact Damage):** Design strain levels set by CAI test results
- **ETW (Extended Temperature Wet):** Critical environment for matrix-dominated properties — hot/wet condition typically governs
- **CTD (Cold Temperature Dry):** Can govern fiber-dominated properties
- **DUL = DLL × 1.5** (ultimate factor of safety)
- **FAR 25.573 / CS 25.573:** Composite structural strength and damage tolerance requirements

### Sources

1. **[TU Delft OpenCourseWare — Classical Laminate Theory](https://ocw.tudelft.nl/course-lectures/classical-laminate-theory-clt/)** — Lecture by Dr. Kassapoglou covering full CLT derivation, ABD matrix construction, symmetric and balanced laminate properties, first-ply failure criteria, failure mode identification, and real-world composite structural examples.

2. **[Abbott Aerospace — Laminate Strength (AA-SB-001 §4.1.6)](https://www.abbottaerospace.com/aa-sb-001/4-materials/4-1-composite-materials/4-1-6-strength-of-laminates/)** — Covers Tsai-Wu failure criterion with full formula, lamina stress vs. strain approach, BVID/CAI methodology, ETW/CTD/RTD environmental knockdowns, and FAR 25.573 compliance. Emphasizes industry practice.

3. **[NASA RP-1351 — Basic Mechanics of Laminated Composite Plates](https://ntrs.nasa.gov/api/citations/19950009349/downloads/19950009349.pdf)** — Full NASA reference publication. Complete derivation of classical lamination theory, ABD matrix, and elastic response of laminates. Authoritative source for foundational composite mechanics.

4. **[Composite Materials Hub — Failure Criteria](https://compositematerialshub.com/failure-criteria-in-composite-materials/)** — Covers all major composite failure criteria: Max Stress, Tsai-Hill, Tsai-Wu, Hoffman, and LaRC03/04. Includes formulas, advantages and disadvantages, and aerospace application guidance for each criterion.

5. **[CAE Assistant — Tsai-Hill vs. Tsai-Wu](https://caeassistant.com/blog/tsai-hill-failure-criterion-tsai-wu-criterion/)** — Detailed comparison with full equations, failure index calculation procedures, and practical guidance on when to use each criterion.

---

## 6. Pressure Vessel Analysis

Pressurized aircraft fuselages, hydraulic reservoirs, and pneumatic systems all require pressure vessel stress analysis. Thin-wall theory covers the vast majority of aircraft applications.

### 6.1 Thin-Wall Pressure Vessel (t ≤ r/10)

**Cylindrical Vessel:**
- Hoop (circumferential) stress: σ_θ = Pr/t
- Longitudinal (axial) stress: σ_L = Pr/2t
- The hoop-to-longitudinal stress ratio is always 2:1; hoop stress governs design
- Maximum shear stress (through wall at 45°): τ_max = σ_θ/2 = Pr/2t
- Circumferential strain: ε_θ = (1/E)(σ_θ − νσ_L) = (Pr/Et)(1 − ν/2)

**Spherical Vessel:**
- σ = Pr/2t (equal biaxial stress state — structurally more efficient than a cylinder)

### 6.2 Thick-Wall Pressure Vessel (Lamé Equations, t > r/10)

- Radial stress: σ_r = A − B/r²
- Hoop stress: σ_θ = A + B/r²
- Constants: A = p_i r_i² / (r_o² − r_i²), B = p_i r_i² r_o² / (r_o² − r_i²)
- Maximum hoop stress occurs at the inner radius: σ_θ,max = p_i(r_o² + r_i²) / (r_o² − r_i²)

### 6.3 Aircraft Fuselage Pressurization

- Typical design case: cabin altitude 6,000 ft with ambient at 40,000 ft → ΔP ≈ 9.06 psi
- Fuselage skin longitudinal stress from pressure: σ_L = PR/2t
- Total skin stress: σ_total = σ_bending ± σ_pressure (bending from flight loads superimposed on pressure hoop and longitudinal stresses)
- Semi-monocoque fuselage: pressure loads carried by skin panels, frames, and stringers together

### Sources

1. **[SCIRP — Stress Analysis of Thin-Walled Pressure Vessels](https://www.scirp.org/journal/paperinformation?paperid=53766)** — Open-access paper with full derivations of hoop stress, longitudinal stress, free body diagram approach, biaxial stress state, principal stresses, and maximum shear stress. Includes worked examples.

2. **[Abbott Aerospace — Pressure Vessels (AA-SB-001 §11)](https://www.abbottaerospace.com/aa-sb-001/)** — Chapter 11 of the AA-SB-001 online textbook. Dedicated to pressure vessel analysis for aerospace applications. Access via the main table of contents.

3. **[Longdom Open Access — Aircraft Fuselage Stress Analysis with Pressurization](https://www.longdom.org/open-access-pdfs/stress-analysis-of-an-aircraft-fuselage-with-and-without-portholes-usingcadcae-process-2168-9792-1000138.pdf)** — Applies thin-wall pressure vessel theory to real fuselage structures. Covers the σ_L formula, internal pressure load application in FEM, and combined bending + pressure stress analysis.

4. **[IJERT — Fuselage Cabin Pressure Bulkhead Stress Analysis](https://www.ijert.org/research/stress-analysis-of-the-fuselage-cabin-pressure-bulkhead-and-evaluation-of-different-geometrical-configurations-IJERTV4IS120530.pdf)** — Covers 6 psi design limit pressure, structural optimization of bulkhead geometry, FEM analysis, and practical aerospace pressure analysis workflow.

---

## 7. Thermal Stress Analysis

Thermal stresses arise whenever structural members are constrained from free thermal expansion or when adjacent materials have different coefficients of thermal expansion (CTE). Aerospace structures experience significant temperature ranges from ground operations to cruise altitude.

### 7.1 Fundamental Thermal Stress Relations

- **Free thermal strain:** ε_T = α × ΔT
- **Fully constrained thermal stress:** σ = −Eα ΔT (compressive for heating with full constraint)
- **Partially constrained:** σ = −Eα ΔT × (restraint factor), where restraint factor ranges 0 to 1
- **CTE mismatch at joints (biaxial):** σ = E(α₁ − α₂)ΔT / (1 − ν)

### 7.2 Typical Aerospace CTE Values

| Material | α (10⁻⁶ /°F) | α (10⁻⁶ /°C) |
|----------|---------------|---------------|
| Al 2024 | 12.9 | 23.2 |
| Ti-6Al-4V | 4.9 | 8.8 |
| Steel (4130) | 6.3 | 11.3 |
| CFRP (quasi-isotropic) | ≈ 0–2 | ≈ 0–3.6 |

The near-zero CTE of CFRP relative to metals creates significant thermal mismatch stresses at composite-to-metal interfaces.

### 7.3 Thermal Stress Analysis Workflow

1. Determine temperature distribution (from thermal analysis or flight envelope)
2. Calculate ΔT = T_operating − T_ref (stress-free assembly temperature, typically room temperature)
3. Compute thermal strains: ε_T = α × ΔT for each material
4. Superimpose mechanical loads on thermal loads
5. Calculate combined stress state and determine MS

### 7.4 Material Property Temperature Effects

F_tu, F_ty, and E all degrade at elevated temperatures. MMPDS/MIL-HDBK-5 Chapter 1 provides temperature correction factors (as percentages of room temperature values) for aluminum, titanium, and steel alloys across the expected service temperature range.

### Sources

1. **[NASA Astronautic Structures Manual — Volume I (Thermal Stresses)](https://ntrs.nasa.gov/citations/19760071125)** — Section D specifically covers thermal stresses in aerospace structures. Provides the industry-standard methodology for thermal stress analysis.

2. **[ANSYS Innovation Courses — Thermal Stress Analysis](https://innovationspace.ansys.com/courses/courses/structural-boundary-conditions/lessons/performing-a-thermal-stress-analysis-lesson-6/)** — Free lesson covering the thermal strain equation ε = α × ΔT, constrained vs. unconstrained expansion, material properties needed (CTE, E, ν), and a step-by-step FEM thermal stress workflow.

3. **[NASA SP-8068 — Buckling Strength of Structural Plates (Thermal Effects)](https://ntrs.nasa.gov/api/citations/19710023855/downloads/19710023855.pdf)** — Includes a section on thermal effects on plate buckling. Discusses combined mechanical + thermal loading for plate stability analysis.

---

## 8. MIL-HDBK-5 / MMPDS — Material Properties and Allowables

MMPDS (Metallic Materials Properties Development and Standardization) and its predecessor MIL-HDBK-5 are the authoritative sources for metallic material design allowables accepted by the FAA, DoD, and international aviation authorities.

### 8.1 MMPDS Content Structure

| Chapter | Coverage |
|---------|----------|
| 1 | General information, statistical methods, temperature effects |
| 2 | Steel alloys (4130, 4340, 300M, 17-4PH, PH13-8, etc.) |
| 3 | Aluminum alloys (2024, 7075, 7050, 6061, etc.) |
| 4 | Magnesium alloys |
| 5 | Titanium alloys (Ti-6Al-4V, Ti-3Al-2.5V, etc.) |
| 6 | Heat-resistant alloys (Inconel 718, etc.) |
| 7 | Copper and miscellaneous alloys |
| 8 | Fastener and joint allowables |
| 9 | Special topics (wire, bearings, etc.) |

**Properties tabulated:** F_tu, F_ty, F_cy, F_su, F_bru (at e/D = 2.0 and 1.5), F_bry, E, E_c, G, ν, elongation (ε), CTE (α). Also includes stress-strain curves, tangent modulus curves, temperature effect curves, and selected fatigue S-N data.

### 8.2 How to Use MMPDS Allowables

- **A-basis:** Required for single load path structure (99% of population meets or exceeds, 95% confidence)
- **B-basis:** Permitted for redundant / multiple load path structure (90% of population meets or exceeds, 95% confidence)
- **S-basis:** Minimum specification value — used only when A or B values are not established
- Section numbering example: 3.2.3.1.1 = Aluminum / 2xxx series / 2024 / specific product form / tensile properties

### Sources

1. **[MIL-HDBK-5H — Full Text PDF (University of Arkansas)](https://ssrl-uark.com/MILHDBK5H.pdf)** — Complete December 1998 edition. Contains all material allowables for aluminum (Chapter 3), steel (Chapter 2), titanium (Chapter 5), magnesium (Chapter 4), and fastener/joint allowables (Chapter 8). Fully indexed and publicly available.

2. **[MMPDS Official Overview Presentation](https://www.mmpds.org/wp-content/uploads/2015/03/mmpds_2015_2007aeromat_presentation.pdf)** — Explains how A-basis and B-basis allowables are generated, FAA recognition and acceptance procedures, SAE AMS specifications relationship, and content overview of all chapters.

3. **[DLA ASSIST — MIL-HDBK-5 Entry](https://quicksearch.dla.mil/qsDocDetails.aspx?ident_number=53876)** — Official Defense Logistics Agency database entry. Provides scope statement and documents the transition from MIL-HDBK-5 to MMPDS.

4. **[StressEbook — MMPDS Mechanical Properties Table Guide](https://www.stressebook.com/mmpds-mechanical-properties-table/)** — Practical guide to reading MMPDS tables. Explains each property row (F_tu, F_ty, F_cy, F_su, F_bru, E, G, ν) using Al 2024-T351 as an example. Essential for analysts learning to navigate the handbook.

5. **[Embry-Riddle Open Textbook — Aerospace Materials](https://eaglepubs.erau.edu/introductiontoaerospaceflightvehicles/chapter/aerospace-materials/)** — Open-access chapter with material property tables for Al 7075-T6, Ti-6Al-4V, steel, CFRP, and GFRP. Compares Young's modulus, yield stress, and density. Good supplementary reference.

6. **[NASA — Aerospace Materials Characteristics (Chapter 2)](https://ntrs.nasa.gov/api/citations/20180001137/downloads/20180001137.pdf)** — Covers aluminum alloys (2xxx, 7xxx series), titanium, steel, and superalloys. Includes A-basis/B-basis explanation and damage tolerance considerations for material selection.

---

## 9. MRB / Repair Analysis Methodology

Material Review Board (MRB) dispositions and structural repair analysis are essential activities in aerospace manufacturing and in-service support. Every nonconformance and repair must be substantiated by engineering analysis.

### 9.1 MRB Process

The MRB is triggered when a manufactured part does not conform to drawing or specification requirements. Dispositions include:
- **Use As-Is (UAI):** Engineering analysis proves the nonconformance does not impair structural integrity
- **Rework:** Part is reworked to meet drawing requirements
- **Repair:** Part is repaired to an acceptable condition (may not meet original drawing)
- **Return to Supplier (RTS):** Part returned for supplier corrective action
- **Scrap:** Part is rejected and destroyed

### 9.2 Engineering Analysis for UAI Disposition

1. Define the nonconformance precisely (dimensional deviation, material substitution, process deviation)
2. Identify affected load paths and governing load cases
3. Calculate reduced allowables for as-built condition (e.g., thinner material → lower P_bru = F_bru × D × t)
4. Recalculate MS with as-built dimensions and properties
5. Assess fatigue life and damage tolerance impact if applicable
6. Document with complete engineering rationale and supporting calculations

### 9.3 Structural Repair Categories

Repairs are classified per the OEM Structural Repair Manual (SRM):
- **Category A:** Permanent repair requiring no supplemental inspection
- **Category B:** Permanent repair with additional required inspection intervals
- **Category C:** Temporary repair with defined time limitation

Non-SRM repairs require FAA Designated Engineering Representative (DER) approval or direct FAA engineering approval (Form 8100-9 for major repairs). Boeing uses the Repair Deviation Record (RDR) process; Airbus uses RDAS or Technical Adaptation.

### 9.4 Repair Analysis Approach

- Restore original load path capability: repaired section must demonstrate MS ≥ 0.0 at ultimate load
- **Fastener pattern analysis:** Check bearing, shear, and bypass loads for all repair fasteners
- **Doubler analysis:** Verify doubler bearing, net section of original structure beneath doubler, and splice efficiency
- **Damage tolerance (FAR/CS 25.571):** All repairs to primary structure must comply with damage tolerance requirements. Inspection threshold and recurring intervals derived from crack growth analysis of the repaired configuration.

### Sources

1. **[AFGROW — Damage Tolerance Design Handbook §9.1 (Structural Repairs)](https://www.afgrow.net/applications/dtdhandbook/sections/page9_1.aspx)** — Full HTML text covering required analysis intensity vs. structural criticality, damage tolerance methodology for repairs, initial flaw size assumptions, residual strength requirements, and inspection interval derivation.

2. **[FAA AC 43-214A — Repairs to Composite and Bonded Structure](https://www.faa.gov/documentLibrary/media/Advisory_Circular/AC_43-214A.pdf)** — Official FAA advisory circular. Covers repair classification (major/minor), damage assessment methodology, repair size limits, substantiating data requirements, and SRM applicability for composite repairs.

3. **[FAA — Structural Repairs Airworthiness Assurance Working Group Report](https://www.faa.gov/media/31411)** — Covers structural repair assessment for transport category aircraft, Category A/B/C repair definitions, OEM repair assessment documents, and maintenance program requirements.

4. **[SG Systems Global — Material Review Board (MRB) Process Overview](https://sgsystemsglobal.com/glossary/material-review-board-mrb/)** — Comprehensive MRB workflow description from detection through disposition. Covers documentation requirements, CAPA linkage, risk assessment tools (FMEA/HAZOP), and acceptance criteria.

5. **[LinkedIn — Structural Damage/Repair Assessment in Aerospace](https://www.linkedin.com/pulse/importance-structural-damage-repair-assessment-its-recording-kumar)** — Covers repair classification (Major/Minor), OEM approved data sources, Categories A/B/C, damage tolerance compliance per CS/FAR 25.571, and Boeing RDR vs. Airbus RDAS processes.

6. **[AIAA Journal of Aircraft — Repair Tolerance Analysis for Composite Structures](https://arc.aiaa.org/doi/10.2514/1.C032635)** — Academic paper defining repair/replacement thresholds using a probabilistic approach to repair policy and simulation of structural strength lifecycle.

---

## 10. Foundational References (Multi-Topic)

These are comprehensive references that span multiple analysis types and serve as the backbone of aerospace stress analysis practice.

### 10.1 Abbott Aerospace AA-SB-001 (Complete Online Textbook)

**The single most comprehensive openly accessible aerospace stress analysis textbook,** available chapter-by-chapter in HTML format. Covers the same ground as Bruhn and Niu in an accessible online format.

**Base URL:** [https://www.abbottaerospace.com/aa-sb-001/](https://www.abbottaerospace.com/aa-sb-001/)

| Chapter | Topic |
|---------|-------|
| 4 | Materials (composite laminate strength, environmental knockdowns) |
| 5 | Loads (aircraft load cases, load factor envelope) |
| 6 | Section Properties (I, J, centroid, shear center) |
| 7 | Stiffness |
| 8 | Beam Analysis (bending, shear flow, unsymmetric sections) |
| 9 | Torsion (open and closed sections, Bredt's formula) |
| 10 | Plate Strength Analysis |
| 11 | Pressure Vessels |
| 12 | Joints (mechanically fastened, bonded) |
| 13 | Combined Stresses |
| 14 | Ultimate Strength of Metallic Elements (lug analysis, etc.) |
| 15 | Local Stability — Isotropic (buckling, crippling, diagonal tension) |
| 16 | Local Stability — Composite |
| 22 | Aircraft Specific Design Features |

### 10.2 NASA Astronautic Structures Manual (3 Volumes)

- **Download portal:** [Abbott Aerospace Reference Data](https://www.abbottaerospace.com/reference-data/nasa-astronautic-structures-manual-volumes-i-ii-iii/)
- **NTRS citation:** [NASA NTRS 19760071125](https://ntrs.nasa.gov/citations/19760071125)
- **Volume I:** Stress and strain, loads, combined stresses, strength analysis methods
- **Volume II:** Structural stability (buckling)
- **Volume III:** Thermal stresses, fatigue, composites, statistics

Offers the same scope as Bruhn with greater theoretical depth and NASA-specific methodology.

### 10.3 Embry-Riddle Open Textbook (ERAU)

[Introduction to Aerospace Flight Vehicles — Aerospace Structures](https://eaglepubs.erau.edu/introductiontoaerospaceflightvehicles/chapter/aerospace-structures/)

Full HTML chapter covering: stress types, Hooke's Law, Young's modulus table for common aerospace materials, semi-monocoque structure theory, spar/web/stringer/skin functions, shear center, bending stress formula (σ = My/I), shear flow in built-up structures, and FEM introduction. Fully open access.

### 10.4 NACA TN 2661 — Diagonal Tension (Shear Web Analysis)

- **Via Abbott Aerospace:** [NACA TN 2661 Download](https://www.abbottaerospace.com/downloads/naca-tn-2661-a-summary-of-diagonal-tension-part-i-methods-of-analysis/)
- **Via NTRS:** [NASA NTRS 19930083335](https://ntrs.nasa.gov/citations/19930083335)

The definitive reference for shear web analysis in aircraft structures. Documents the Wagner diagonal tension method for incomplete diagonal tension. Required for any spar web sizing analysis.

### 10.5 Collier Aerospace Buckling/Crippling Course Material

[Collier Aerospace — Buckling & Crippling PDF](https://cdn.collieraerospace.com/wp-content/uploads/2023/04/Buckling-Crippling.pdf)

Industry-level training material from the developers of HyperX structural sizing software. Covers column buckling through crippling with worked examples reflecting actual industry practice.

---

## 11. Key Formulas Quick Reference

A compact summary of the most frequently used formulas in aerospace stress analysis.

### Column Buckling

| Formula | Expression |
|---------|------------|
| Euler critical load | P_cr = π²EI / (KL)² |
| Euler critical stress | σ_cr = π²E / (KL/ρ)² |
| Johnson (inelastic) | σ_cr = σ_y[1 − σ_y(L_eff/ρ)² / (4π²E)] |
| Transition slenderness | (L/ρ)_c = √(2π²E/σ_y) |

### Plate Buckling

| Formula | Expression |
|---------|------------|
| Critical stress | F_cr = kπ²E / [12(1−ν²)(b/t)²] |

### Beam Bending and Shear

| Formula | Expression |
|---------|------------|
| Bending stress | σ = My/I |
| Euler-Bernoulli | M/I = σ/y = E/R |
| Shear flow (open section) | q = VQ/I |

### Pressure Vessel

| Formula | Expression |
|---------|------------|
| Hoop stress (cylinder) | σ_θ = Pr/t |
| Longitudinal stress | σ_L = Pr/2t |
| Spherical vessel | σ = Pr/2t |

### Fastener and Joint

| Formula | Expression |
|---------|------------|
| Bearing allowable load | P_bru = F_bru × D × t |
| Shear-tension interaction | R_s² + R_t² ≤ 1 |
| Combined MS | MS = 1/√(R_s² + R_t²) − 1 |

### Margin of Safety

| Formula | Expression |
|---------|------------|
| General MS | MS = Allowable / (Applied × FoS) − 1 |

### Thermal Stress

| Formula | Expression |
|---------|------------|
| Free thermal strain | ε_T = αΔT |
| Fully constrained | σ = −EαΔT |

### Composite Failure

| Criterion | Expression |
|-----------|------------|
| Tsai-Hill | (σ₁/X)² − σ₁σ₂/X² + (σ₂/Y)² + (τ₁₂/S)² ≤ 1 |
| Tsai-Wu | F₁σ₁ + F₂σ₂ + F₁₁σ₁² + F₂₂σ₂² + F₆₆τ₁₂² + 2F₁₂σ₁σ₂ ≤ 1 |

### Fatigue and Fracture

| Formula | Expression |
|---------|------------|
| Modified Goodman | σ_a/S_e + σ_m/S_u = 1 |
| Miner's rule | D = Σ(n_i/N_i) ≤ 1.0 |
| Stress intensity factor | K = Yσ√(πa) |
| Paris Law (crack growth) | da/dN = C(ΔK)^m |
| Critical crack size | a_cr = (1/π)(K_Ic/σ)² |

---

*Document compiled for use as a RAG knowledge base for aerospace structural analysis. All URLs point to publicly accessible resources as of the date of compilation. For official design work, always verify allowables against the current edition of MMPDS and applicable regulatory requirements (14 CFR Part 23/25, CS-23/25).*
