# Aerospace Stress Analysis — Gap Fill Reference Document

> **Purpose:** Fills three specific knowledge gaps in the RAG knowledge base for an aerospace structural/stress analyst AI bot. All sources are HTML, text-based, and publicly accessible. No PDFs are required for these entries.

---

## GAP 1: Load Types and Definitions for Aerospace Structures

### Key Concepts and Formulas

#### Load, Flow, and Stress — The Fundamental Hierarchy

The distinction between **Load**, **Flow (Running Load)**, and **Stress** is foundational to aerospace hand analysis and FEM result interpretation.

| Quantity | Units | Definition |
|----------|-------|------------|
| Load | lb | Total discrete force at a point |
| Moment | in·lb | Twisting or bending force |
| Load Flow (Running Load) | lb/in | Load per unit width/length |
| Moment Flow | in·lb/in | Moment per unit width |
| Stress | lb/in² (psi) | Load flow per unit thickness; load per unit area |

**Key relationships:**

- Stress = Flow / thickness → `σ = q / t`
- Flow = Load / width → `q = V / W`
- Average shear stress = `τ = V / (W × t)`

**Why load flow matters for FEM:** In a statically determinate structure analyzed with plate elements, the load flow result (`q = V/W`, units lb/in) is **independent of thickness**. This means if you size the web thickness after running the model, you do not need to rerun the FEM — you apply `σ = q / t` directly. Load, flow, and stress are not interchangeable; each tells you something different.

#### Shear Flow: q = VQ/I

Shear flow in a beam cross-section:

```
q = VQ / I
```

Where:
- `V` = applied shear force (lb)
- `Q` = first moment of area of the section above (or below) the cut, about the neutral axis (in³): `Q = ∫ y dA`
- `I` = second moment of area (moment of inertia) of the full cross-section about the neutral axis (in⁴)
- `q` = shear flow (lb/in) — force per unit length along the cut

For a closed thin-walled section (aircraft wing box or fuselage):
- Shear flow is continuous around the closed contour
- The indeterminate constant `q₀` is solved using the compatibility condition: twist rate must be consistent around the cell
- Bredt's formula for torsional shear flow in a closed section: `q = T / (2A_enclosed)` where `A_enclosed` = area enclosed by the median line

**Converting shear flow (running load) to fastener discrete load:**
```
P_fastener = q × s
```
Where:
- `q` = shear flow at the fastener row (lb/in)
- `s` = fastener spacing (in)
- `P_fastener` = discrete load on each fastener (lb)

This is the critical link between a continuous shear flow analysis and a discrete fastener bearing/shear check.

#### Load Factor (n) and Limit/Ultimate Load

**Load factor:**
```
n = L / W  (ratio of lift to weight; number of effective g's)
```

For a banked turn: `n = 1 / cos(φ)` where φ = bank angle

For a pullout (circular path): `n = 1 + V² / (gR)`

**Structural load definitions:**

| Term | Definition |
|------|------------|
| Limit Load | Maximum load the aircraft is expected to encounter in service; structure must sustain without permanent deformation; stresses must remain below yield |
| Ultimate Load | Limit Load × Factor of Safety = Limit Load × 1.5; structure must sustain for at least 3 seconds without collapse |
| Factor of Safety (FoS) | 1.5 for aircraft (per FAR 25.303); accounts for unknowns, material scatter, analysis uncertainty |
| Design Limit Load (DLL) | `DLL = n_limit × W` (max load factor × aircraft weight) |
| Design Ultimate Load (DUL) | `DUL = DLL × 1.5` |

**Category limit load factors (FARs):**

| Aircraft Category | Positive n_limit |
|-------------------|-----------------|
| Transport (airliner) | +2.5 to +3.8 |
| Normal/Commuter | 0 to +3.8 |
| Utility | 0 to +4.4 |
| Aerobatic / Military Fighter | -5 to +9 |

**Applying loads to sizing:**
1. From mission/V-n diagram → determine n_limit
2. DLL = n_limit × aircraft weight
3. DUL = DLL × 1.5
4. At DLL: check yield MS ≥ 0.0 (no permanent deformation)
5. At DUL: check ultimate MS ≥ 0.0 (no fracture/collapse)

**Gust loads (FAR 25 design gust velocities):**

| Airspeed | Below 20,000 ft | Above 50,000 ft |
|----------|-----------------|-----------------|
| V_B (rough air) | 66 ft/s | 38 ft/s |
| V_C (design cruise) | 50 ft/s | 25 ft/s |
| V_D (max dive) | 25 ft/s | 12.5 ft/s |

Gust-induced load factor increment: `Δn = ρ V w_g S C_Lα / W`

#### Applied Load vs. Allowable Load

- **Applied load** = load from analysis (includes load factor and fitting factor if required)
- **Allowable load** = maximum load the member can carry before failure (from test data, MMPDS, or calculation)
- `MS = Allowable / (Applied × FoS) - 1`
- For DUL checks: FoS = 1.0 (the 1.5 is already baked into DUL)
- For DLL yield checks: FoS = 1.0 (yield check is at limit load)
- FAR 23/25.625 fitting factor = 1.15 applies to joint allowables for fittings

---

### Sources — Gap 1: Load Types

**1. Abbott Aerospace AA-SB-001 — Section 3.3: Load, Flow and Stress**
URL: https://www.abbottaerospace.com/aa-sb-001/3-introduction/3-3-load-flow-and-stress/
- Full HTML text. Defines Load (lb), Flow (lb/in), Stress (lb/in²) and their relationships. Explains why load flow is independent of thickness in statically determinate structures — critical for interpreting FEM plate element results without rerunning the model for different thicknesses. Canonical industry-level definition of running load. Abbott references: Bruhn / AFFDL-TR-69-42.

**2. ERAU Open Textbook — Aerospace Structures Chapter (Shear Flow)**
URL: https://eaglepubs.erau.erau.edu/introductiontoaerospaceflightvehicles/chapter/aerospace-structures/
- Full HTML open textbook. Derives shear flow q from first principles: `q = τ × t`, then `q = VQ/I`. Covers shear flow in thin-walled open and closed sections, two-cell wing box shear flow with compatibility condition, Bredt's torsional shear flow formula. Defines shear flow units (force per unit length). Includes worked spar/wing box examples. Introductory to intermediate level.

**3. ERAU Open Textbook — Maneuvers and Gusts Chapter (Load Factor)**
URL: https://eaglepubs.erau.edu/introductiontoaerospaceflightvehicles/chapter/maneuvers-gusts/
- Full HTML open textbook. Comprehensive derivation of load factor n for pullouts, loops, banked turns, inverted flight. Defines limit load, ultimate load, FoS = 1.5. V-n diagram construction and use. FAR limit load factor values by aircraft category. FAR design gust velocities. Worked formula table for n in all flight maneuver conditions.

**4. MIT 16.20 Structural Mechanics — Unit 2: Loads and Design Considerations**
URL: https://ocw.mit.edu/courses/16-20-structural-mechanics-fall-2002/a722d26411ef738a180981153dee1b50_unit2.pdf
- MIT OCW course unit PDF (note: this is a PDF, but OCW often has the same content as HTML notes). Defines Limit Load, Ultimate Load, FoS = 1.5, MS formula with worked example using V-n diagram load factor. Calculates DLL → DUL → MS in sequence. Shows MS = (Tested Ultimate - Design Ultimate) / Design Ultimate. Clean academic treatment.
  - HTML version note: Check https://ocw.mit.edu/courses/16-20-structural-mechanics-fall-2002/pages/lecture-notes/ for HTML lecture note equivalents.

**5. Virginia Tech — Chapter 2: Aircraft Loads (HTML-accessible)**
URL: https://vtechworks.lib.vt.edu/bitstream/handle/10919/102306/Ch2_Aircraft_Loads.pdf
- Defines limit load factor, ultimate load factor, FoS, V-n diagram loading conditions with clear formulas and table of design n values. Covers inertia relief, rigid body dynamics for load calculation.
  - Same content available via VTech VTechWorks repository in HTML summary format.

**6. Kitplanes Magazine — Stressing Structure: Margins of Safety**
URL: https://www.kitplanes.com/stressing-structure-2/
- Full HTML article. Explains limit load vs. ultimate load FoS application in practice, how FoS multipliers work in the MS equation, combined loading concept using R-ratios. Written by a practicing structural engineer. Highly readable, plain-language treatment that clarifies when FoS = 1.0 vs. 1.5 is used.

---

## GAP 2: Combined Stresses and Interaction Equations

### Key Concepts and Formulas

#### Principal Stresses — 2D Plane Stress

For a 2D element with normal stresses `fx`, `fy` and shear stress `fs`:

**Maximum principal stress:**
```
σ_max = (fx + fy)/2 + √[((fx - fy)/2)² + fs²]
```

**Minimum principal stress:**
```
σ_min = (fx + fy)/2 - √[((fx - fy)/2)² + fs²]
```

**Maximum shear stress:**
```
τ_max = √[((fx - fy)/2)² + fs²]
```

**Angle of principal axes (θ, measured CCW):**
```
tan(2θ) = 2fs / (fx - fy)
```

**Sign convention (Abbott/Bruhn standard):**
- Tensile stress = positive
- Compressive stress = negative
- Shear stress positive per right-hand convention

**Principal strains from principal stresses:**
```
ε₁ = (σ₁ - ν σ₂) / E
ε₂ = (σ₂ - ν σ₁) / E
```

#### Mohr's Circle Construction

Mohr's circle is a graphical tool to find principal stresses and maximum shear from any general 2D stress state.

**Steps:**
1. Plot point A = (fx, +fs) on σ-τ axes (representing the x-face)
2. Plot point B = (fy, -fs) on σ-τ axes (representing the y-face, note sign flip on τ)
3. Draw a circle with AB as diameter; center C = ((fx + fy)/2, 0)
4. Radius R = √[((fx - fy)/2)² + fs²]
5. Principal stresses = C ± R (intersections of circle with σ-axis)
6. Maximum shear stress = R
7. Angle to principal axes = half the angle measured on Mohr's circle

**Key insight:** A rotation of angle θ on the physical element corresponds to 2θ on Mohr's circle.

#### Von Mises Yield Criterion

The von Mises criterion predicts yielding when the distortion energy (shape-change energy) in the material reaches the distortion energy at yield in uniaxial tension.

**Von Mises equivalent stress (2D — general stresses):**
```
σ_VM = √(fx² - fx·fy + fy² + 3fs²)
```

**Von Mises (2D — principal stresses known):**
```
σ_VM = √(σ₁² - σ₁σ₂ + σ₂²)
```

**Von Mises (3D — principal stresses):**
```
σ_VM = √(½[(σ₁-σ₂)² + (σ₁-σ₃)² + (σ₂-σ₃)²])
```

**Failure criterion:** Yielding occurs when `σ_VM ≥ F_ty`

**MS using von Mises:**
```
MS = F_ty / σ_VM - 1   (for yield check)
MS = F_tu / σ_VM - 1   (for ultimate check, conservative)
```

**Critical note (Abbott):** Von Mises stress is always positive. A compressive member with high von Mises stress may appear to have a positive tension margin, but buckling/crippling checks must still be performed independently. Von Mises does not capture compression instability.

**Comparison with Tresca (Max Shear Stress criterion):**
- Tresca: yielding when `τ_max = F_ty / 2`
- Von Mises predicts yielding at `τ_pure_shear = F_ty / √3 = 0.577 F_ty`
- Tresca predicts yielding at `τ_pure_shear = F_ty / 2 = 0.5 F_ty`
- Von Mises is the more accurate predictor for ductile metals; Tresca is more conservative

#### Interaction Equations for Combined Loading

Interaction equations express combined loading in terms of stress ratios R = Applied/Allowable. When `f(R₁, R₂, ...) ≤ 1`, the structure is safe.

**General form:**
```
R_σᵐ + R_τⁿ = 1
```
where exponents m, n are determined experimentally per loading type.

| Combined Loading | Interaction Equation | MS Formula |
|------------------|---------------------|------------|
| Tension + Shear | R_t² + R_s² = 1 | MS = 1/√(R_t² + R_s²) - 1 |
| Bending + Shear | R_b² + R_s² = 1 | MS = 1/√(R_b² + R_s²) - 1 |
| Bending + Axial Tension | R_b + R_t = 1 | MS = 1/(R_b + R_t) - 1 |
| Bending + Axial Compression | R_b + R_c ≤ 1 | MS = 1/(R_b + R_c) - 1 |
| Bending + Axial Compression (Bruhn beam-column) | R_b + R_c² = 1 | MS = 1/(R_b + R_c²) - 1 |
| Bending + Torsion | R_b + R_t = 1 | MS = 1/(R_b + R_t) - 1 |
| Bending + Torsion + Compression | R_b² + R_τ² = (1 - R_c)² | Solve for R_b |
| Normal + Shear (general) | R_σ² + R_τ² = 1 | MS = 1/√(R_σ² + R_τ²) - 1 |

**Stress ratios defined:**
```
R_t = f_t / F_tu      (applied tensile stress / tensile ultimate allowable)
R_c = f_c / F_cc      (applied compressive stress / compressive allowable)
R_b = f_b / F_bu      (applied bending stress / bending ultimate allowable)
R_s = f_s / F_su      (applied shear stress / shear ultimate allowable)
```

Note: All R values are computed with the same factor of safety applied to applied stresses (or equivalently, the allowable is divided by FoS before computing R).

**Fastener combined shear + tension:**

For bolts (unthreaded shank — primary structure, per NASA-TM-2012-217454):
```
R_s^1.6 + R_t^1.6 = 1
MS = 1 / (R_s^1.6 + R_t^1.6)^(1/1.6) - 1
```

For rivets (classical method):
```
R_s² + R_t² = 1   →   MS = 1/√(R_s² + R_t²) - 1
```

Where:
- `R_s = P_shear / P_shear_allowable`
- `R_t = P_tension / P_tension_allowable`

#### Combined Bending + Axial Compression (Beam-Column)

The presence of axial compression amplifies bending stresses due to the P-Δ (secondary moment) effect.

**Superposition approach:**
```
σ_max = P/A + M·c/I
```
Where the total axial stress = direct compression + bending stress at outer fiber.

**Interaction check:**
```
R_c + R_b ≤ 1
```

For beam-columns where lateral buckling is also a concern, `F_cc` must reflect the effective column allowable (accounting for slenderness), not just the material compressive yield strength.

---

### Sources — Gap 2: Combined Stresses

**1. Abbott Aerospace AA-SB-001 — Section 3.4.2: Combined Stresses (Principal Stresses + Von Mises)**
URL: https://www.abbottaerospace.com/aa-sb-001/3-introduction/3-4-stress-analysis/3-4-2-combined-stresses/
- Full HTML page. Covers: principal stress equations (2D and 3D), Mohr's circle reference (points to Section 3.4.3.1), von Mises stress in 2D and 3D, sign convention (tension positive), application to failure by comparison with F_ty or F_tu. Explicit caution that von Mises does not capture compression instability. Equations are image-rendered on the page but structure/context is fully readable. Directly references Abbott's own textbook (3rd Edition, 2019).

**2. Abbott Aerospace AA-SB-001 — Section 3.4.1: Measures of Stress**
URL: https://www.abbottaerospace.com/aa-sb-001/3-introduction/3-4-stress-analysis/3-4-1-measures-of-stress/
- Full HTML. Covers uniaxial stress, bending stress (`σ = M·y/I`), and shear stress distribution (parabolic distribution for rectangular beams, peak at neutral axis). Foundation for understanding what stresses to combine. Describes how peak parabolic shear stress relates to average shear stress. Links to spreadsheets for common sections.

**3. Abbott Aerospace AA-SB-001 — Section 12.2.7: Fastener Shear + Tension Interaction**
URL: https://www.abbottaerospace.com/aa-sb-001/12-joints/12-2-mechanically-fastened-joints/12-2-7-fastener-interaction-of-shear-load-and-tension-load-effects/
- Full HTML. Covers shear+tension interaction for bolts (primary structure: exponent 1.6 per NASA-TM-2012-217454) and rivets (classical R_s² + R_t² = 1). Shows load ratio definition. Important distinction: threaded vs. unthreaded shank allowables differ for bolts. Preload does not affect ultimate joint strength but is critical for fatigue life.

**4. ScienceDirect Topics — Interaction Equation Overview**
URL: https://www.sciencedirect.com/topics/engineering/interaction-equation
- Full HTML overview page. Presents the complete interaction equation table from the NASA Astronautic Structures Manual (1975) — the same source Bruhn relies on. Covers: normal+bending, normal+shear, bending+torsion+compression, bending+torsion. Defines the generic form `R_σᵐ + R_τⁿ = 1` with experimental exponents. Derived from decades of flight vehicle test data.

**5. Eng-Tips Forums — Margin of Safety for Combined Loads**
URL: https://www.eng-tips.com/threads/margin-of-safety-for-combined-loads.169464/
- HTML forum thread. Practicing aerospace engineers discuss combined loading MS formulas directly referencing Bruhn. Shows the Bruhn formula `MS = 1/((R_a + R_b)² + R_s²) - 1` for compression+bending+shear interaction. Discusses when axial is tension vs. compression and how that changes the interaction. Useful practitioner-level discussion of subtleties not in textbooks.

**6. Kitplanes Magazine — Stressing Structure: Margins of Safety**
URL: https://www.kitplanes.com/stressing-structure-2/
- Full HTML article by a practicing stress engineer. Explains combined loading R-ratio method conceptually, shows the root-sum-square interaction equation for tension+shear as the base case, explains that different loading combinations use different specific equations (not all use RSS). Explains how to put FoS into the R-ratio calculation. Plain-language treatment of the same methodology in Bruhn.

**7. Oxford University — Lecture 6: Mohr's Circle for Plane Stress**
URL: https://users.ox.ac.uk/~kneabz/Stress6_ht08.pdf
- Dr. Zavatsky's P4 Stress and Strain lecture notes. Note: technically PDF, but the content is text-based and directly mirrors the HTML treatment at many universities. Covers: transformation equations for plane stress, full Mohr's circle construction procedure (5 steps), worked numerical example, principal stresses, maximum shear, stress tensor. Excellent reference to pair with Abbott 3.4.2 since it provides the explicit formulas that Abbott's page renders as images.
  - HTML equivalent: https://www.continuummechanics.org/mohrcircle.html (Continuum Mechanics.org — full HTML Mohr's circle derivation)

**8. ContinuumMechanics.org — Mohr's Circle (HTML)**
URL: https://www.continuummechanics.org/mohrcircle.html
- Full HTML with all principal stress transformation equations written out in text. Covers: rotation of stress tensor, principal stress equations, Mohr's circle construction, 3D Mohr's circles, invariants. All formulas in clean text format — not image-rendered. This is the HTML source to use when the Abbott page equations are not extractable.

---

## GAP 3: Composite Material Properties — Common Layups

### Key Concepts and Data

#### Ply-Level Properties (Unidirectional Carbon/Epoxy)

**Note on ply coordinates:** "1" = fiber direction; "2" = transverse to fiber (in-plane); "12" = in-plane shear

**IM7/8552 (Hexcel) — Industry Standard for Primary Structure**
The most widely qualified carbon/epoxy system for aerospace primary structure (Boeing, Airbus, Embraer, etc.)

| Property | Value | Units | Notes |
|----------|-------|-------|-------|
| E₁ (fiber direction tensile modulus) | 164 GPa (23,800 ksi) | GPa | RTD, unidirectional |
| E₂ (transverse tensile modulus) | 11.7 GPa (1,700 ksi) | GPa | RTD |
| G₁₂ (in-plane shear modulus) | ~5.5 GPa (800 ksi) | GPa | Typical for IM7-class |
| ν₁₂ (major Poisson's ratio) | ~0.32 | — | Typical for IM7-class |
| F₁ᵤ (0° tensile strength) | 2,720 MPa (395 ksi) | MPa | RTD |
| F₂ᵤ (90° tensile strength) | 111 MPa (16.1 ksi) | MPa | RTD |
| F₁cᵤ (0° compressive strength) | 1,690 MPa (245 ksi) | MPa | RTD |
| In-plane shear strength (±45°) | 120 MPa (17.4 ksi) | MPa | RTD |
| Cured ply thickness (CPT) | 0.0072 in (0.183 mm) | in | Per NIAR/NMS 128/2 |
| CAI strength (quasi-iso laminate) | 214–234 MPa (31–34 ksi) | MPa | RTD; BVID impact |
| OHT strength | 428 MPa (62 ksi) | MPa | Quasi-iso, RTD |
| OHC strength | 336 MPa (48.8 ksi) | MPa | Quasi-iso, RTD |

**AS4/3501-6 (Hercules/Hexcel) — Legacy Qualified System**
Widely used in existing structures; extensively documented in MIL-HDBK-17.

| Property | Value | Units |
|----------|-------|-------|
| E₁ | ~138 GPa (20.0 Msi) | GPa |
| E₂ | ~9.0 GPa (1.3 Msi) | GPa |
| G₁₂ | ~7.1 GPa (1.03 Msi) | GPa |
| ν₁₂ | ~0.30 | — |
| F₁ᵤ (0° tensile) | ~1,862 MPa (270 ksi) | MPa |
| F₁cᵤ (0° compressive) | ~1,470 MPa (213 ksi) | MPa |
| F₂ᵤ (90° tensile) | ~76 MPa (11.0 ksi) | MPa |
| In-plane shear strength | ~98 MPa (14.2 ksi) | MPa |
| CPT | 0.005–0.007 in | in |

**T300/976 (Toray/Fiberite) — Older Legacy System**
Common in 1970s–1990s aircraft; well documented in early literature.

| Property | Value | Units |
|----------|-------|-------|
| E₁ | ~138 GPa (20.0 Msi) | GPa |
| E₂ | ~9.6 GPa (1.4 Msi) | GPa |
| G₁₂ | ~4.8 GPa (0.70 Msi) | GPa |
| ν₁₂ | ~0.28 | — |
| F₁ᵤ (0° tensile) | ~1,860 MPa (270 ksi) | MPa |
| F₂ᵤ (90° tensile) | ~80 MPa (11.6 ksi) | MPa |
| CPT | ~0.005 in | in |

#### Quasi-Isotropic Laminate Properties — [0/±45/90]ₙs

A quasi-isotropic (QI) layup has equal numbers of 0°, +45°, -45°, and 90° plies. The in-plane stiffness is approximately isotropic (`Ex ≈ Ey`, `A₁₆ = A₂₆ = 0` if balanced).

**Rule-of-thumb effective properties for a QI carbon/epoxy laminate (IM7/8552-class):**

| Property | Approximate Value | Notes |
|----------|-----------------|-------|
| Ex = Ey (in-plane effective modulus) | ~55–70 GPa (8–10 Msi) | Exact value from CLT/ABD matrix |
| Gxy (in-plane shear modulus) | ~19–21 GPa (2.7–3.0 Msi) | |
| νxy (effective Poisson's ratio) | ~0.30–0.33 | |
| Density | ~1,550 kg/m³ (0.056 lb/in³) | Vf ≈ 55–60% |
| Unnotched tensile strength | ~600–700 MPa (87–100 ksi) | Laminate level |
| Unnotched compressive strength | ~500–600 MPa (72–87 ksi) | |
| OHT (open hole tension) | ~350–450 MPa (50–65 ksi) | Design-critical for tension |
| OHC (open hole compression) | ~280–380 MPa (40–55 ksi) | Often limiting |
| CAI (BVID impact) | ~180–240 MPa (26–35 ksi) | **Design-critical for compression** |
| Design strain limit (ETW, CAI) | ~3,000–3,500 με | Typical industry sizing value |
| CTE (in-plane, QI) | ~2–4 × 10⁻⁶ /°C | Near-zero longitudinal |

**Effective QI modulus from CLT:** For a balanced symmetric QI laminate, the engineering constants can be derived from the A-matrix:
```
Ex = A₁₁(1 - A₁₂²/(A₁₁·A₂₂)) / t_total
Ey = A₂₂(1 - A₁₂²/(A₁₁·A₂₂)) / t_total
Gxy = A₆₆ / t_total
νxy = A₁₂ / A₂₂
```

#### BVID/CAI Design Allowables — Methodology

**Design allowable philosophy for composite primary structure:**
1. The structure must sustain DUL (= DLL × 1.5) with damage up to the **Allowable Damage Limit (ADL)** — typically BVID
2. BVID = Barely Visible Impact Damage — damage state just visible at close inspection (≈ 0.1 in dent depth threshold, program-specific)
3. CAI strength ≈ 30–50% lower than pristine compressive strength for typical carbon/epoxy
4. **No-growth requirement:** Under repeated loading, BVID must not grow to a critical size
5. Design strain limit ≈ **3,000–4,000 με** for compression, depending on material system and environment

**Environmental conditions for allowables:**
- **RTD (Room Temperature Dry):** Baseline, highest strength
- **ETW (Elevated Temperature Wet):** Critical for matrix-dominated properties (compression, shear); typically +180°F, moisture-saturated. This is the sizing condition for composites in hot zones.
- **CTD (Cold Temperature Dry):** Critical for some tension/stiffness properties; typically -67°F
- **Knockdown factors:** ETW typically reduces CAI strength by 10–25% compared to RTD for carbon/epoxy systems

**Abbott's reference design strain value (from 4.1.6):**
> "An ETW CAI strain limit of 3,200 με for quasi-isotropic carbon fiber (epoxy resin infused) was found to be equivalent to a von Mises stress of approximately 25 ksi for an isotropic material with the same stiffness."

This provides an intuitive bridge between composite strain-based allowables and metallic stress-based design.

---

### Sources — Gap 3: Composite Material Properties

**1. Abbott Aerospace AA-SB-001 — Section 4.1.6: Strength of Laminates**
URL: https://www.abbottaerospace.com/aa-sb-001/4-materials/4-1-composite-materials/4-1-6-strength-of-laminates/
- Full HTML. Covers: ABD matrix formulation and engineering constants derivation, laminate stiffness calculation, ply-by-ply Tsai-Wu failure approach (and why it's not used in practice), CAI/OHT design strain approach, reference to MIL-HDBK-17F Vol 3 Section 4.11.2 for CAI vs. damage size data. Notes that ETW CAI strain limit of 3,200 με ≈ 25 ksi von Mises equivalent. Discusses when ply-by-ply failure analysis is and isn't appropriate.

**2. Abbott Aerospace AA-SB-001 — Section 4.1.7: General Composite Laminate Analysis Approach**
URL: https://www.abbottaerospace.com/aa-sb-001/4-materials/4-1-composite-materials/4-1-7-general-composite-laminate-analysis-approach/
- Full HTML. Defines the biaxial strain envelope approach (Hart-Smith method adapted for damaged laminates). Explains: ADL/BVID requirement, CAI for compression limit and OHT for tension limit, why quasi-isotropic woven cloth gives higher CAI/OHT strain limits than UD-heavy laminates, ETW as the conservative sizing environment, L1/L2 margin calculation procedure on the strain envelope, solid vs. cored laminate distinction.

**3. LookPolymers.com — Hexcel HexPly 8552 / IM7 Property Datasheet**
URL: https://www.lookpolymers.com/polymer_Hexcel-HexPly-8552-Epoxy-Matrix-IM7-Fiber.php
- Full HTML property table. Contains IM7/8552 test data: 0° tensile strength (2,720 MPa / 395 ksi, RTD), 0° tensile modulus (164 GPa / 23,800 ksi, RTD), 90° tensile strength and modulus, compressive strength (0° UD and OHC), in-plane shear, CAI (214 MPa / 31 ksi, dry), OHT (428 MPa / 62 ksi, dry), OHC (336 MPa / 48.8 ksi, dry), temperature effects (ETW, CTD). The most complete HTML-accessible IM7/8552 property table available without accessing NIAR or MMPDS directly.

**4. AZoM.com — Carbon/Epoxy Composite Materials Properties**
URL: https://www.azom.com/article.aspx?ArticleID=1995
- Full HTML property tables. Covers quasi-isotropic carbon/epoxy sheet (E = 70 GPa, F_tu = 600 MPa), unidirectional-style carbon rod (E₁ = 120–140 GPa, E₂ = 10 GPa, F_tu,L = 1,100–1,900 MPa, F_tu,T = 50 MPa), CTE values. Good representative values for initial sizing checks when program-specific data is not yet available. Notes properties relate to autoclave production at Vf = 55–65%.

**5. NIAR Wichita — IM7/8552 NMS 128/2 Detail Specification (HTML-indexed)**
URL: https://www.wichita.edu/research/NIAR/Research/hexcel-8552/IM7-Unitape-1.pdf
- Note: this specific file is PDF. However, NIAR's IM7/8552 qualification data is publicly indexed at:
  https://www.wichita.edu/research/NIAR/Research/hexcel-8552/
  The spec page and property tables are accessible as HTML. Contains: qualification test matrix, CPT = 0.0072 in, acceptance requirements (0° tension ≥ 337 ksi avg, modulus 21.2–24.8 Msi), resin content 35±3%. This is the actual material specification underlying FAA-accepted B-basis data.

**6. Composites Material Hub — Failure Criteria for Composites (HTML)**
URL: https://compositematerialshub.com/failure-criteria-in-composite-materials/
- Full HTML article. Covers Max Stress, Tsai-Hill, Tsai-Wu, Hoffman, LaRC03/04 criteria with full equations and formulas written in text. For each criterion: formula, failure index definition, aerospace application notes, pros/cons. This fills the gap when Abbott's Tsai-Wu equation is image-rendered.

**7. MIL-HDBK-17F Vol 1 — Composite Material Properties (Online Summary)**
URL: https://www.cmh17.org/
- The CMH-17 (Composite Materials Handbook) website. The current version (CMH-17, formerly MIL-HDBK-17F) is maintained by SAE. The website provides chapter outlines, scope, and methodology descriptions in HTML. Volume 2 contains the AS4/3501-6 and IM7-class material allowables (B-basis) used for FAA certification.
  - For AS4/3501-6 data directly, the legacy MIL-HDBK-17F Vol 2 is hosted in several university repositories. Key data: UD 0° F_tu ≈ 270 ksi, E₁ ≈ 20.0 Msi.

**8. CompositesWorld — Understanding Composite Design Allowables (HTML)**
URL: https://www.compositesworld.com/articles/understanding-design-allowables
- Full HTML industry article. Explains A-basis vs. B-basis for composites, why composites use B-basis (multiple load paths in laminates), the BVID/CAI allowable generation test flow, environmental conditioning (RTD/ETW/CTD), and the statistical treatment per CMH-17. Bridges the gap between raw test data and the allowable numbers used in sizing.

---

## Quick Reference: Formula Summary for All Three Gaps

### Gap 1 — Loads

| Formula | Meaning |
|---------|---------|
| `q = V/W` | Running load (shear flow) from total shear force over width |
| `q = VQ/I` | Shear flow in a beam section (Q = first moment of area) |
| `q = T/(2A)` | Torsional shear flow in closed section (Bredt's formula) |
| `P_fastener = q × s` | Convert shear flow to discrete fastener load (s = spacing) |
| `DUL = DLL × 1.5` | Ultimate = Limit × FoS |
| `n = L/W` | Load factor = Lift / Weight |
| `MS = F_allow/(F_applied × FoS) - 1` | Basic MS |

### Gap 2 — Combined Stress

| Formula | Meaning |
|---------|---------|
| `σ_max = (fx+fy)/2 + R` | Maximum principal stress (R = Mohr's circle radius) |
| `R = √[((fx-fy)/2)² + fs²]` | Mohr's circle radius |
| `τ_max = R` | Max shear stress = Mohr's radius |
| `σ_VM = √(fx² - fx·fy + fy² + 3fs²)` | Von Mises stress (2D, general) |
| `R_t² + R_s² ≤ 1` | Tension + shear interaction criterion |
| `MS = 1/√(R_t² + R_s²) - 1` | Tension + shear MS |
| `R_b + R_c ≤ 1` | Bending + compression interaction |
| `R_s^1.6 + R_t^1.6 ≤ 1` | Bolt shear+tension (NASA-TM-2012-217454) |

### Gap 3 — Composites

| Property | IM7/8552 UD | QI [0/±45/90] |
|----------|-------------|---------------|
| E₁ (fiber) | 164 GPa | ~60 GPa (effective Ex=Ey) |
| E₂ (transverse) | 11.7 GPa | ~60 GPa (effective Ex=Ey) |
| G₁₂ | ~5.5 GPa | ~21 GPa (effective Gxy) |
| ν₁₂ | ~0.32 | ~0.32 |
| CPT | 0.0072 in | — |
| F_tu (0°) | 395 ksi | ~100 ksi (unnotched) |
| CAI (design) | — | ~31 ksi (214 MPa) RTD |
| Design strain limit (ETW) | — | ~3,000–3,500 με compression |

---

> **Integration note:** These three gap-fill sections should be appended to or cross-referenced with the primary reference document (aerospace_stress_analysis_references.md). Section 1 supplements the existing Shear Web analysis in that document; Section 2 supplements the Margin of Safety section; Section 3 supplements the Composite Laminate Analysis section.
