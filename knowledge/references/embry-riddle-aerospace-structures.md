# Embry-Riddle — Aerospace Structures

Source: https://eaglepubs.erau.edu/introductiontoaerospaceflightvehicles/chapter/aerospace-structures/
Page title: 10 Aerospace Structures
Retrieved: 2026-04-12T01:37:27.767Z

---

# Introduction\[1\]

Now that some understanding of the anatomy of flight vehicles has been gained, it is logical to examine their structural design characteristics in greater depth. While aerodynamics provides the foundation for atmospheric flight, an aircraft must also possess a suitably shaped structure capable of withstanding all imposed loads, whether aerodynamic, engine-induced, or undercarriage loads during landing, including vertical and lateral loads. Therefore, any aerospace structure must be not only strong and lightweight, but also robust and durable. A clear understanding of the available structural design options and their inherent limitations is essential to achieving these objectives.

Many structural design goals and engineering challenges for spacecraft are similar to those for aircraft, particularly the need for optimally shaped structures made from high-strength, lightweight materials. However, spacecraft often require specialized materials capable of withstanding extreme thermal environments, particularly during atmospheric re-entry, when kinetic heating is severe. Likewise, supersonic aircraft may require structural features that enable controlled expansion under aerodynamic heating, thereby preventing excessive internal stresses from accumulating.

-   Appreciate the history and evolution of aerospace flight structures.
-   Understand the primary loads on an airframe, such as tension, compression, bending, torsion, and shear.
-   Know how aerospace structures are constructed, including spars, ribs, stringers, skin, etc.
-   Be able to calculate the stresses and strains in elementary structures such as spars, struts, and trusses.
-   Understand the principles behind the finite element method (FEM) and why it is used in designing structurally efficient aerospace structures.
-   Be aware of the challenges in airframe design, including avoiding buckling and fatigue, and incorporating structural redundancy to enhance safety and reliability.

# Brief History of Aerospace Structures

[George Cayley](https://en.wikipedia.org/wiki/George_Cayley)

, often referred to as the “Father of Aeronautics,” recognized the importance of constructing airplanes from lightweight materials. Cayley proposed using stacked wings, in the form of biplanes and triplanes, to provide a collective structural stiffness and strength. [Otto Lilienthal](https://en.wikipedia.org/wiki/Otto_Lilienthal) built on Cayley’s ideas about flight and lightweight structures, designing several types of gliders that resembled the wings of birds and bats. [Octave Chanute](https://en.wikipedia.org/wiki/Octave_Chanute) built gliders similar to Lilienthal’s, but incorporated external bracing wires to increase the wing’s structural strength and stiffness. In early 1903, [Samuel Langley](https://en.wikipedia.org/wiki/Samuel_Langley) attempted to launch his tandem monoplane from a catapult, but it crashed after its frail wooden structure failed catastrophically.

By the end of 1907, the [Wright brothers](https://en.wikipedia.org/wiki/Wright_brothers) had successfully flown several other versions of their original [Flyer](https://en.wikipedia.org/wiki/Wright_Flyer), a biplane with a more robust wooden skeleton covered with fabric. Their wing design used spanwise spars and chordwise ribs braced with struts and wires. The main advantage of the biplane is that its upper and lower wings are connected by vertical struts and bracing wires, forming a strong, box-like structure, as shown in Figure 1. This type of design is much more resistant to bending and twisting than a single wooden wing. The skeleton is then covered in cotton fabric, which is tightened and sealed by brushing on cellulose dope. However, a biplane wing design also exhibits high aerodynamic drag, a significant overall disadvantage. Nevertheless, this type of wing-and-airframe construction continued into the 1930s, and many successful biplane and triplane aircraft were built.

![](https://eaglepubs.erau.edu/app/uploads/sites/4/2021/07/640px-Replica_Sopwith_Camel_G-BZSC_12243203404.jpg)

Replica of a [Sopwith Camel](https://en.wikipedia.org/wiki/Sopwith_Camel) showing its wooden skeletal construction. The structure is covered with fabric and sealed using cellulose dope.

In 1909, [Louis Bleriot](https://en.wikipedia.org/wiki/Louis_Bl%C3%A9riot) of France built and flew a wooden-and-fabric monoplane, although it was extremely fragile. One significant advantage of a monoplane is its reduced aerodynamic drag compared to the braced wings of biplanes or triplanes. Bleriot followed [Octave Chanute](https://en.wikipedia.org/wiki/Octave_Chanute)‘s approach, where steel wires supported the single wings from a tall mast extending above the fuselage. However, the cables still created significant aerodynamic drag on the airplane, reducing its performance. Bleriot also used a welded truss-type fuselage that was lightweight yet strong, and this method became a standard for early airframe construction.

By the 1920s, aluminum alloys suitable for airplane construction had become increasingly available, so wooden and fabric airplanes were increasingly relegated to history. In addition, the years leading up to WWII saw many advances in aircraft construction, and riveted aluminum “stressed skin” construction became the standard for almost all new aircraft. In 1925, Ford Motor Co. entered the aviation industry with the [4-AT Trimotor](https://en.wikipedia.org/wiki/Ford_Trimotor), a three-engine, all-metal aircraft with corrugated aluminum skin. Dubbed “The Tin Goose,” it quickly became successful and was used by over 100 airlines worldwide.

By the mid-1930s, airplanes were becoming larger and heavier and were almost entirely constructed of [stressed-skin aluminum](https://en.wikipedia.org/wiki/Stressed_skin), with components riveted together. Other construction methods were developed to achieve the required structural strength and stiffness of the wings, including multi-spar and box-beam designs, one of which is illustrated in Figure 2. Box beam designs use multiple spar caps, webs, and shear panels to achieve high bending and torsional stiffness, efficient use of materials, and overall structural redundancy.

![](https://eaglepubs.erau.edu/app/uploads/sites/4/2024/05/boxbeam_annotated.png)

A box beam wing section that uses riveted aluminum-stressed skin construction.

Over the last 50 years, there has been a steady increase in the use of honeycomb and foam-core [sandwich components](https://www.rockwestcomposites.com/shop/plates-panels-angles/sandwich-panels/honeycomb-core-sandwich-panels) made from composite materials such as glass and carbon fiber. Bonded aluminum honeycomb sandwich panels, developed in the 1960s, offer exceptional stiffness and strength for their weight. These sandwich structures were increasingly used for wing skins, flight control surfaces, cabin floors, launch vehicles, satellites, propeller blades, and many other applications. Sandwich construction is widely used in the manufacturing of [helicopter rotor blades](https://www.faa.gov/sites/faa.gov/files/regulations_policies/handbooks_manuals/aviation/helicopter_flying_handbook/hfh_ch04.pdf), as illustrated in Figure 3. The rotor blades must be extremely strong but also lightweight. The dominant loads on the blade are centrifugal forces from its rotation, which produce a tensile load along its length. The blades are also subjected to cyclic lift forces, which cause bending and torsion. Early rotor blades were made of aluminum or steel, perhaps with a metal honeycomb core.

![](https://eaglepubs.erau.edu/app/uploads/sites/4/2023/02/Helicopter_rotorblade.png)

Sandwich construction is used extensively in the manufacture of helicopter rotor blades.

Over the last few decades, advanced materials and manufacturing techniques have enabled a transition from primarily aluminum-based airframe structures to primarily composite structures, such as [carbon fiber-reinforced polymer (CFRP)](https://en.wikipedia.org/wiki/Carbon-fiber_reinforced_polymer). CFRP offers several advantages over traditional aluminum. Its higher strength-to-weight ratio means that CFRP structures can achieve the same or greater strength while using less material. This reduction in material volume reduces the overall structure’s weight, thereby improving fuel efficiency per unit of payload. For example, the fuselage barrel shown in Figure 4 is approximately 30% lighter than it would be if made using aluminum stressed-skin construction.

![](https://eaglepubs.erau.edu/app/uploads/sites/4/2024/05/composite_materials01.jpg)

A fuselage “barrel” section for an airliner made of carbon-fiber-reinforced polymer (CFRP).

Modern aerospace structures can be tailored using advanced computational techniques, such as the finite element method (FEM). FEM enables engineers to simulate and analyze the structural performance of complex shapes and materials under various conditions. This tailoring ensures that every component is optimized for maximum structural efficiency, balancing strength, stiffness, and weight. Additionally, CFRP’s resistance to fatigue and corrosion, combined with its superior mechanical properties, yields a longer service life and lower maintenance costs compared to traditional materials. Consequently, the shift toward composites, such as carbon fiber-reinforced polymer (CFRP), in aerospace engineering represents a significant leap toward lighter, stronger, and more efficient airframes that meet the stringent demands of modern aviation.

The history of spacecraft structures spans from the simple stainless steel shells of early satellites to the complex modular designs of the International Space Station (ISS). Key milestones include the Apollo Lunar Module’s lightweight aluminum-and-titanium construction and the Space Shuttle’s intricate aluminum airframe, which is covered with reinforced carbon-carbon tiles. Modern 3D-printed and inflatable structures enable cost-effective, adaptable designs. At the same time, projects such as SpaceX’s Starship push boundaries by employing lightweight stainless-steel structures, reflecting the ongoing evolution of spacecraft structures in response to technological advancements and evolving exploration goals.

# Types of Structural Loads & Stresses

The aerodynamic and other loads or forces imposed on a flight vehicle cause internal stresses in the material(s) from which the flight vehicle is made. _Stress_ is the internal force per unit area that opposes deformation of a material under load. The deformation of a material under load is called _strain_. Therefore, when a material is subjected to external loading, it becomes stressed and deformed; that is, it always exhibits some strain, regardless of its stiffness or strength.

As shown in Figure 5, five types of stress and strain can occur in aerospace structures: compression (pushing or squeezing), tension (pulling), shear, torsion (twisting), and bending. These stresses and strains can be produced individually in a structural component or in combination with other loads.

![](https://eaglepubs.erau.edu/app/uploads/sites/4/2021/07/Structure_typesofloading-1024x491.png)

The five basic types of stresses and strains that can be produced in aircraft structures are compression, tension, shear, torsion, and bending.

The five basic types of stresses and strains that can be produced in aircraft structures are compression, tension, shear, torsion, and bending.

-   _Compression_ is the stress that causes a strain, squeezing and shortening the part. A component’s compressive stiffness is its resistance to compression forces.
-   _Tension_ is the stress that resists the force pulling on a part and causes a strain that tends to extend the part. A component’s tensile stiffness is its resistance to tensile forces.
-   _Shear_ is the stress that resists the forces acting in opposition, tending to cause one material layer to move relative to the adjacent layer. For example, most fasteners used in aerospace structures are subjected to shear.
-   _Torsion_ is the stress produced by torque that causes a twisting strain. Torque is a moment, so it is the product of a force and a distance, or “arm.” Therefore, a component’s torsional stiffness is its resistance to twisting.
-   _Bending_ stresses arise from a combination of compressive and tensile stresses in the material. A beam-like spar or other component subjected to a bending moment will cause a compressive strain on one side and a stretching strain on the other. In most cases, the individual structural members of aerospace structures are designed to carry mostly tension or compression rather than pure bending.

# Structural Stress & Strain Relationships

Stress, denoted by ![\\sigma](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-fd17c22453482fe9c139c343a300f5e4_l3.svg "Rendered by QuickLaTeX.com"), is a measure of the internal forces that develop within a structure under external loads. It is defined as the force per unit area acting on a cross-sectional area of the structure, i.e.,

(1)   ![\\begin{equation\*} \\sigma = \\frac{F}{A\_c} \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-13cda710b5202da2ad5f532d56e34775_l3.svg "Rendered by QuickLaTeX.com")

where ![F](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-0ee83b71b9496307a10991a958f9e607_l3.svg "Rendered by QuickLaTeX.com") is the applied force and ![A\_c](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-b27a8254925eb6cce581bbb772d1165f_l3.svg "Rendered by QuickLaTeX.com") is the cross-sectional area over which the force acts. Stress is measured in units of force per unit area and is analogous to internal pressure within a solid. A force that tends to elongate a structural member produces _tensile stress_, whereas a force that shortens a member produces _compressive stress_. When a structure is subjected to equal normal stresses in all directions, it is said to be under _bulk stress_.

Strain, usually denoted by ![\\epsilon](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-214cd0e5b7351ab83fb1e3436eb6a5e6_l3.svg "Rendered by QuickLaTeX.com") (or ![\\gamma](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-00906d3cccde6a2029aff501b6c7f698_l3.svg "Rendered by QuickLaTeX.com") in some texts), is a kinematic measure of _deformation_ that describes how much a material line element changes length when the body is loaded. For a uniaxial deformation in the small-strain (linearized) regime, the normal strain is defined as the change in length per unit original length, i.e.,

(2)   ![\\begin{equation\*} \\epsilon = \\frac{\\Delta L}{L} \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-94fb0b966dd0aed1830424b0f4dbf69c_l3.svg "Rendered by QuickLaTeX.com")

where ![L](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-98eac87a0278698f73590e66c82b393b_l3.svg "Rendered by QuickLaTeX.com") is the original (undeformed) length and ![\\Delta L](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-365e6b3ab2668d4ae4f72d8d4c0953f7_l3.svg "Rendered by QuickLaTeX.com") is the change in length produced by the applied loads, as shown in Figure 6. In addition to the axial change in length, Figure 6 also shows that a prismatic bar loaded in tension becomes slightly thinner, while a bar loaded in compression becomes slightly thicker, indicating that deformation occurs simultaneously in the transverse directions as well. Strain is a purely geometric, dimensionless quantity and does not depend on the material itself; the material response enters only through the constitutive relationship between stress and strain.

![](https://eaglepubs.erau.edu/app/uploads/sites/4/2024/05/structures_strain-1.png)

Strain is the ratio of the change in length to the original length; lateral thinning occurs in tension, and lateral thickening occurs in compression.

While the applied loads and geometry determine stress, the resulting strain depends on the material’s stiffness. Many engineering materials exhibit a linear elastic relationship between stress and strain, as shown in Figure 7, at least up to the proportional limit, indicated by the dashed line. Beyond this limit, the material response becomes nonlinear as permanent deformation develops, and continued loading eventually leads to failure.

![](https://eaglepubs.erau.edu/app/uploads/sites/4/2024/05/StuctureStressStrainLinear-2.png)

Typical linear stress–strain behavior of stiff and soft materials.

The elastic nature of materials means that when the load is removed and the stress is released, the material returns to its original undeformed state. This linear stress–strain relationship is known as [Hooke’s Law](https://en.wikipedia.org/wiki/Hooke%27s_law). The slope of the stress–strain curve is called the _modulus of elasticity_, denoted by ![E](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-1febe16825da555859d1c96590603137_l3.svg "Rendered by QuickLaTeX.com") and usually referred to as [Young’s modulus](https://en.wikipedia.org/wiki/Young%27s_modulus), i.e.,

(3)   ![\\begin{equation\*} E = \\frac{\\sigma}{\\epsilon} \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-4b50fbdf1fd4b6a848a298be0d87e529_l3.svg "Rendered by QuickLaTeX.com")

Materials with a high Young’s modulus are stiff and deform only slightly under load, while materials with a low Young’s modulus are more compliant and undergo larger strains for the same applied stress.

Young’s modulus relates normal stress to normal strain in the direction of the applied load. In a real three-dimensional solid, however, an axial deformation cannot occur in isolation. When a prismatic cylindrical bar is loaded in uniaxial tension, it not only elongates in the loading direction but simultaneously contracts in the two transverse directions, so that its diameter decreases from an original value ![d](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-8a5156dfa957c2175bd69cedb1b73679_l3.svg "Rendered by QuickLaTeX.com") to ![d-\\Delta d](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-f5f8bd3a62ca085b993411383562987d_l3.svg "Rendered by QuickLaTeX.com"). Conversely, when the bar is loaded in uniaxial compression, it shortens axially and expands laterally, and its diameter increases from ![d](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-8a5156dfa957c2175bd69cedb1b73679_l3.svg "Rendered by QuickLaTeX.com") to ![d+\\Delta d](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-b067fd6acf27a5b9e5cbbf591c9b31e6_l3.svg "Rendered by QuickLaTeX.com"). This coupled axial and lateral deformation is a fundamental kinematic consequence of material continuity and occurs even when the material response remains fully elastic.

The corresponding axial and transverse strains may be written, for small deformations, as

(4)   ![\\begin{equation\*} \\varepsilon\_{\\text{axial}}=\\frac{\\Delta L}{L} \\qquad \\text{and} \\qquad \\varepsilon\_{\\text{transverse}}=\\frac{\\Delta d}{d} \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-af47e7bfa6023b602a2fbf71ad13c7d4_l3.svg "Rendered by QuickLaTeX.com")

The ratio between these two strains is characterized by Poisson’s ratio, denoted by ![\\nu](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-89a53a6c62201cf622ee19dc9a0d673d_l3.svg "Rendered by QuickLaTeX.com"), which is defined as the negative ratio of transverse strain to axial strain, i.e.,

(5)   ![\\begin{equation\*} \\nu=-\\,\\frac{\\varepsilon\_{\\text{transverse}}}{\\varepsilon\_{\\text{axial}}} =-\\,\\frac{(\\Delta d/d)}{(\\Delta L/L)} \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-b91ae8697ba565f1b8f3f2f51a78f65f_l3.svg "Rendered by QuickLaTeX.com")

For most structural materials, Poisson’s ratio lies between about 0.2 and 0.35. Together, Young’s modulus ![E](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-1febe16825da555859d1c96590603137_l3.svg "Rendered by QuickLaTeX.com") and Poisson’s ratio ![\\nu](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-89a53a6c62201cf622ee19dc9a0d673d_l3.svg "Rendered by QuickLaTeX.com") completely characterize the linear elastic response of an isotropic material under small strains. While ![E](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-1febe16825da555859d1c96590603137_l3.svg "Rendered by QuickLaTeX.com") governs the resistance to axial deformation, ![\\nu](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-89a53a6c62201cf622ee19dc9a0d673d_l3.svg "Rendered by QuickLaTeX.com") governs how strongly deformation in the loading direction is coupled to the accompanying lateral thinning or thickening of the material. This coupling is fundamental to the analysis of plane stress and plane strain, and it plays a central role in plate bending, shell behavior, pressure loading, and torsion.

| Material (typical aerospace grade) | Young’s modulus, ![E](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-1febe16825da555859d1c96590603137_l3.svg "Rendered by QuickLaTeX.com") (GPa) | Poisson’s ratio, ![\\nu](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-89a53a6c62201cf622ee19dc9a0d673d_l3.svg "Rendered by QuickLaTeX.com") |
| --- | --- | --- |
| Aluminum alloy 2024-T3 | 73 | 0.33 |
| Aluminum alloy 7075-T6 | 71–72 | 0.33 |
| Titanium alloy Ti-6Al-4V | 110–114 | 0.34 |
| Steel 4130 (normalized) | 200–205 | 0.29 |
| Magnesium alloy AZ31B | 44–45 | 0.35 |
| Carbon-fiber composite (quasi-isotropic laminate) | 55–75 | 0.04–0.10 |
| Glass-fiber composite (quasi-isotropic laminate) | 20–30 | 0.20–0.30 |

A structural member in an airframe has a cross-sectional area of 3.2 cm^2^ and a length of 1.3 m. A tensile force of 0.51 kN is applied to the member, causing it to elongate by 0.21 mm. Assuming the material is perfectly elastic, determine the stress and strain in the member.

Show solution/hide solution.

The stress is given by

    ![\\\[ \\sigma = \\frac{F}{A\_c} \\\]](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-a222486a2efc78dbad1836d4bd87a317_l3.svg "Rendered by QuickLaTeX.com")

where ![F](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-0ee83b71b9496307a10991a958f9e607_l3.svg "Rendered by QuickLaTeX.com") is the force, and ![A\_c](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-b27a8254925eb6cce581bbb772d1165f_l3.svg "Rendered by QuickLaTeX.com") is the area of the cross-section. Inserting the known values for this problem gives

    ![\\\[ \\sigma = \\frac{F}{A\_c} = \\frac{0.51 \\times 10^3}{3.2\\times 10^{-4}} = .594~\\mbox{MN m$^{-2}$} = 1.594~\\mbox{MPa} \\\]](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-f16f23b859f5ea72541cad97ce728f94_l3.svg "Rendered by QuickLaTeX.com")

Note that stress is measured in units of Pascals (Pa) in SI units, i.e., 1 N m![^{-2}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-2e519ab245537dfe26a71cbf26ff13b5_l3.svg "Rendered by QuickLaTeX.com") = 1 Pa. The corresponding strain is defined as

    ![\\\[ \\gamma \\equiv \\epsilon = \\frac{\\Delta L}{L} \\\]](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-152be9eec5d9c4b2af29bdee7092d1d8_l3.svg "Rendered by QuickLaTeX.com")

Inserting the known values gives

    ![\\\[ \\gamma \\equiv \\epsilon = \\frac{\\Delta L}{L} = \\frac{0.21 \\times 10^{-3}}{1.3} = 0.000162 \\\]](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-9c8df3d8235566e7273fa0b4fd8d00be_l3.svg "Rendered by QuickLaTeX.com")

Notice that strain is dimensionless (i.e., it has no units).

# Trusses & Shear Webs

The development of aircraft structural concepts paralleled advances in aerodynamics, materials, and flight performance. In the earliest aircraft, such as the Wright Flyer and many WWI biplanes, a significant portion of the airframe consisted of trusses made from rods and cables, as illustrated in Figure 8. These frameworks consisted of a series of triangular elements, typically constructed from wood or steel tubes, with tensioned wires providing bracing and contributing to the structural stiffness. By judiciously combining rods and wires, designers achieved a lightweight, mechanically efficient structure. A fabric skin covered the truss to create an aerodynamically smooth surface, although the fabric itself was not load-bearing. Although these truss structures were relatively easy to fabricate, the use of diagonal wires limited their capacity to carry tensile loads. Hence, any member in compression had to be a rigid rod.

![](https://eaglepubs.erau.edu/app/uploads/sites/4/2024/05/Structures_truss-scaled.png)

Early aircraft structures were made of trusses comprised of rods and/or cables.

While truss frameworks are relatively simple, they lack redundancy. Consequently, the failure of a single rod or wire can lead to the catastrophic collapse of the entire structure. To address this vulnerability, engineers began incorporating fail-safe design principles. Unlike safe-life structures, in which each component must survive the entire design life without failure, fail-safe systems are designed to tolerate the failure of individual elements by redistributing loads through alternate structural paths. A truss composed entirely of rigid rods, rather than a combination of rods and tension-only cables, offers greater strength and inherent redundancy. This design philosophy became increasingly crucial as aircraft structures evolved toward more integrated and continuous load-bearing configurations.

Subsequently, engineers moved away from discrete structural members and began constructing frameworks using continuous elements, including thin plates known as shear webs, as illustrated in Figure 9. The upper and lower members served as flanges, carrying axial tension and compression resulting from bending moments and other loads. The shear webs connected these flanges along their lengths, completing the load paths and enabling the structure to resist both bending and shear. Early designs still featured internal frames and spars covered with non-load-bearing fabric skin. However, as aircraft grew larger and faster and encountered greater aerodynamic loads, designers increasingly replaced diagonal truss members with continuous shear-carrying plates. They adopted stressed-skin construction with aluminum sheets, which significantly enhanced the airframe’s structural integrity.

![](https://eaglepubs.erau.edu/app/uploads/sites/4/2024/05/Structures_webs-scaled.png)

The addition of shear webs connected the various members, enabling them to carry tension and compression. Mild elastic buckling does not reduce the ability to carry compression loads.

This transition introduced a new design challenge, namely the wrinkling or buckling of thin webs. Sheets subjected to compressive stress are prone to elastic instability, commonly referred to as [buckling](https://en.wikipedia.org/wiki/Buckling). Although buckling does not always lead to structural failure, it reduces effective stiffness and diminishes the structure’s ultimate load-carrying capacity, often necessitating reinforcement or redesign. While increasing the web thickness is one solution, a more weight-efficient approach is to incorporate supporting members, called stiffeners or stringers, attached to the thin web to prevent local buckling.

As aircraft performance demands increased, particularly for speed, maneuverability, and payload capacity, designers adopted fully stressed-skin and semi-monocoque structures. In these configurations, the external skin was no longer a passive aerodynamic fairing but became an active, load-bearing element of the airframe. The skin carried a substantial portion of the shear and bending loads, particularly under torsion, resulting in strong, lightweight, and inherently redundant structures.

# Wing Structures

The wings generate lift to overcome the aircraft’s weight and are typically the most significant and heaviest structural components of the airframe. As such, they must be designed to be both extremely strong and as lightweight as possible. Wing geometry varies widely, and any particular design reflects a balance among structural strength, weight, and aerodynamic efficiency. In some aircraft, notably smaller or slower ones, wings may be externally braced with struts or wires to support aerodynamic loads. While this approach allows for a lighter internal wing structure, it increases drag from the exposed bracing elements.

In the 1930s, the transition to widespread monoplane use, which offered inherently lower aerodynamic drag than biplanes, created a growing demand for stronger, lighter wing structures. The increased flight speeds and wing loadings necessitated more advanced structural solutions beyond the trussed spars and externally braced wings commonly found in earlier designs. To address these demands, engineers introduced thin shear webs between the upper and lower flanges of the main spar, allowing the spar to function as an I-beam. This design efficiently distributed bending loads through the flanges, while the shear web carried transverse shear forces. In some aircraft, particularly those requiring higher torsional stiffness or longer spans, the I-beam configuration was replaced by, or supplemented with, a closed-section box beam, further improving shear and torsional resistance. These innovations marked a fundamental shift toward semi-monocoque construction, paving the way for stressed-skin designs that enabled cleaner aerodynamic profiles, reduced structural weight, and higher overall performance.

Today, wings are designed as complete cantilever beams to reduce drag, i.e., without any external bracing. Most wings have various internal structural members covered by a thin aluminum sheet skin; i.e., they are of a typical semi-monocoque stressed-skin design, as shown in Figure 10. The internal structures of wings are made up of a lattice of _spar_s and _stringer_s that run spanwise and _ribs_ or other types of _formers_ that are placed chordwise. The main spar is the primary structural member of a wing, carrying most of the applied bending and shear loads. The skin carries most of the torsional loads and transmits these stresses to the wing ribs.

![](https://eaglepubs.erau.edu/app/uploads/sites/4/2022/07/wingstructure.png)

A typical wing structure comprises spanwise running spars and chordwise ribs, all covered with a thin skin riveted to the underlying structure.

The ribs give the wing its aerodynamic (airfoil) shape and transmit the skin loads and stringers to the spars. The lightweight ribs are stamped from a flat aluminum sheet, and flanged holes are cut to reduce the assembly’s overall weight. Flanging the holes increases the resistance to buckling. The rib has a cap along its periphery, often in the form of a “T” or “L” shape, which stiffens and strengthens it before it is riveted to the wing skin. Ribs can extend from the wing’s leading edge to the rear spar or the wing’s trailing edge. Similar ribs are also used to construct the ailerons, elevators, rudders, and other components.

## Spars & Bending Moments

Depending on a specific aircraft’s design criteria, spars may be made of metal, wood, or composite materials. Bolts typically attach the spars to the fuselage, using various fittings to distribute the loads. Wing main spars are variations of [I-beam](https://en.wikipedia.org/wiki/I-beam) structures made of solid extruded aluminum or several aluminum extrusions riveted together, as shown in Figure 11. The I-beam’s top and bottom flanges, or _spar caps_, carry the bending-induced compressive and tensile loads. The vertical section, commonly called the _web_, carries vertical shear loads. The web forms the spar’s principal depth portion, to which the caps are attached.

![](https://eaglepubs.erau.edu/app/uploads/sites/4/2024/05/SparTypes-1-1024x415.png)

Examples of aluminum wing spars, which are usually made of one or more extrusions built into the form of an I-beam to carry wing bending and shear loads.

The stress, ![\\sigma](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-fd17c22453482fe9c139c343a300f5e4_l3.svg "Rendered by QuickLaTeX.com"), in a wing spar can be calculated using the bending stress equation as given by

(6)   ![\\begin{equation\*} \\sigma = \\dfrac{M \\, y}{I} \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-daeaca2c15af14a060e81dabcdd3eab5_l3.svg "Rendered by QuickLaTeX.com")

where ![M](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-a5b2cc88db6bf679a2ea8c84203455a5_l3.svg "Rendered by QuickLaTeX.com") is the bending moment, ![I](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-9ff2447a542c544aced5910af03637ae_l3.svg "Rendered by QuickLaTeX.com") is the second moment of area of the cross-section, and ![{y}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-9d8d4f8093f81f3547306fafd3a40b9d_l3.svg "Rendered by QuickLaTeX.com") is the distance from the neutral axis to the point where the stress is being calculated, as shown in Figure 12. The highest stresses will occur in the spar caps, with the lower cap in tension and the upper cap in compression. For a symmetric cross-section, the neutral axis will be located halfway between the top and bottom of the section. The second moment of area ![I](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-9ff2447a542c544aced5910af03637ae_l3.svg "Rendered by QuickLaTeX.com") for the cross-section of the spar (or the wing as a whole) depends on the geometry of the cross-section. Values for common shapes are [available](https://www.engineeringtoolbox.com/area-moment-inertia-d_1328.html), including rectangles, L-shapes, T-sections, U-sections, and I-beams. For example, a rectangular section of width ![b](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-9e7fa97561a7653031d17e935c159b69_l3.svg "Rendered by QuickLaTeX.com") and height ![h](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-cdf2a44d0b66665d96751b4fab58d96f_l3.svg "Rendered by QuickLaTeX.com") has a second moment of area of

(7)   ![\\begin{equation\*} I = \\frac{b\\,h^{3}}{12} \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-161727d466d353f6ef377d0fd0a4ba96_l3.svg "Rendered by QuickLaTeX.com")

For a standard symmetric I-beam with flange width ![b\_f](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-b567bc240183fec6110d575510736936_l3.svg "Rendered by QuickLaTeX.com"), flange thickness ![t\_f](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-239a3614ff1f7c64da5ba13f503221c5_l3.svg "Rendered by QuickLaTeX.com"), web thickness ![t\_w](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-066288af0eb9c530920d733c85afaf7c_l3.svg "Rendered by QuickLaTeX.com"), and total depth ![h](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-cdf2a44d0b66665d96751b4fab58d96f_l3.svg "Rendered by QuickLaTeX.com"), then

(8)   ![\\begin{equation\*} I = \\frac{b\_f\\,h^{3}}{12} - \\frac{(b\_f - t\_w)\\,(h - 2t\_f)^{3}}{12} \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-35d112c64e7bbe82e1510a198c814b3d_l3.svg "Rendered by QuickLaTeX.com")

![](https://eaglepubs.erau.edu/app/uploads/sites/4/2024/05/structures_sparmomarea-1.png)

Spar cross-sectional shapes to illustrate the calculation of the second moment of area.

For thin-walled wing structures, a closed rectangular wing box of width ![b](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-9e7fa97561a7653031d17e935c159b69_l3.svg "Rendered by QuickLaTeX.com"), height ![h](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-cdf2a44d0b66665d96751b4fab58d96f_l3.svg "Rendered by QuickLaTeX.com"), skin thickness ![t\_s](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-d9ccdc324b0d850eca7b8c5cb6bbce1d_l3.svg "Rendered by QuickLaTeX.com"), and spar thickness ![t\_w](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-066288af0eb9c530920d733c85afaf7c_l3.svg "Rendered by QuickLaTeX.com") has the approximate second moment of area

(9)   ![\\begin{equation\*} I \\approx \\frac{b\\,h^{3}}{12} - \\frac{(b - 2t\_w)\\,(h - 2t\_s)^{3}}{12} \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-8f356898bdbc127496c1487cd0e16b1e_l3.svg "Rendered by QuickLaTeX.com")

For cases where the walls are very thin relative to the box dimensions, this result reduces to the thin-walled form given by

(10)   ![\\begin{equation\*} I \\approx t\_s\\,b\\,h^{2} + t\_w\\,h\\,b^{2} \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-3089f6c49edfb968aa9497f565f99343_l3.svg "Rendered by QuickLaTeX.com")

In a typical light-aircraft wing, the primary load-carrying members are the spars and the skins; the ribs define the cross-sectional shape. Figure 13 shows a structural cross-section through a relatively simple wing, highlighting the locations of the main spar and a secondary rear spar. The main spar is placed close to the quarter-chord, where the aerodynamic lift is concentrated, and is sized to resist most of the wing’s bending moment. It usually has upper and lower caps (or flanges) connected by a vertical web, forming an I-beam or box-beam; the caps carry the dominant bending stresses in tension and compression, while the web transmits the associated shear. The caps may have different thicknesses, depending on the application.

![](https://eaglepubs.erau.edu/app/uploads/sites/4/2024/05/Wing_sparsection.png)

Structural cross-section of a relatively simple wing showing the location of the main spar and the secondary rear spar.

Further aft, typically around 55–65% of the chord, a lighter rear spar, often a C-section, is installed primarily to carry shear and to support the trailing-edge structure, including flaps and ailerons. Together with the ribs and skins, the main spar and rear spar form a closed torque box, so that torsional loads from aerodynamic pitching moments and control surface deflections are carried efficiently by shear in the skins and spar webs. The region between the spars, or between the front spar and the leading edge, is commonly used as a fuel bay or as a location for systems and control linkages. However, it remains part of the structural wing box, which provides both bending and torsional stiffness.

The upper and lower wing skins are bonded or fastened to the spar caps and ribs so that they participate fully in carrying bending loads, turning the entire cross-section into a built-up box beam. Under positive lift, the upper skin and upper spar caps experience compression, whereas the lower skin and lower caps experience tension. Local stiffeners and ribs distribute these loads to the skins, maintain the airfoil shape, and prevent local buckling of the thin-sheet elements.

## Multi-Spar Box Beams

Larger aircraft have multiple spars that can be integrated into a box beam, as shown in Figure 14, a standard structural design for commercial airliners. It uses two or three main longitudinal spars to connect ribs and bulkheads, forming a box-shaped structure with substantial bending and torsional strength. The interior of the wings may also be used for _fuel tanks_. The wing joints are sealed with a special fuel-resistant sealant, allowing fuel to be stored directly inside the structure, a design known as a _wet wing_. Alternatively, a separate fuel bladder or tank can be fitted inside the wing, a more typical implementation on smaller aircraft.

![](https://eaglepubs.erau.edu/app/uploads/sites/4/2024/05/Wing_boxsparsection.png)

A box-beam wing structure is a standard design for commercial airliners because it provides substantial bending and torsional strength, as well as structural redundancy.

Secondary spars and stringers may be used to enhance strength, prevent buckling, and provide structural redundancy, helping make the wing fail-safe. In this context, fail-safe means that, if a critical wing component fails, sufficient remaining structural redundancy and alternative load paths exist to prevent catastrophic failure. The FAA’s accepted definition of fail-safe is: “The attribute of the structure that permits it to retain its required residual strength for a period of unrepaired use after the failure or partial failure of a principal structural element.”

Today, composite materials are also used to manufacture fail-safe wing spars because of their excellent strength-to-weight ratio and resistance to fatigue cracking. Fatigue is the weakening of a material caused by repeated cyclic loading, which can result in a catastrophic failure of a wing spar or other structural component if a fatigue crack grows too much. Sharp corners are a common source of fatigue cracks, so rounded holes and smooth geometric transitions are used to enhance fatigue resistance.

An engineer needs to calculate the maximum stress in the lower cap of a cantilevered wing spar. The material is an aluminum alloy with a maximum allowable stress of 276 MPa. The spar is 3 m long and 0.1 m high. The spar must carry an in-flight load of 20 kN with a factor of safety of 5, which can be considered to act at the mid-length of the spar. The second moment of area of the spar is ![I = 4.167 \\times 10^{-5}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-79d3e8e492ee29a98a51d0f4ed21246a_l3.svg "Rendered by QuickLaTeX.com") m![^4](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-01ea002220d3928fa25462e3136cd890_l3.svg "Rendered by QuickLaTeX.com"). The spar can be considered as encastré at the root, i.e., rigidly fixed.

![](https://eaglepubs.erau.edu/app/uploads/sites/4/2024/05/Spar_example.png)

Show solution/hide solution.

The bending moment, ![M](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-a5b2cc88db6bf679a2ea8c84203455a5_l3.svg "Rendered by QuickLaTeX.com"), on a cantilevered beam of length ![L](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-98eac87a0278698f73590e66c82b393b_l3.svg "Rendered by QuickLaTeX.com") with a point load, ![P](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-a7774ce14328ec765e7de2bd377694e1_l3.svg "Rendered by QuickLaTeX.com"), acting at its mid-span is

    ![\\\[ M  = n P \\left( \\frac{L}{2} \\right) \\\]](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-ad788fba7d2f3a86d2ac25dccf786613_l3.svg "Rendered by QuickLaTeX.com")

where ![n](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-5d24612f2f4f7336ff915cd0191a5340_l3.svg "Rendered by QuickLaTeX.com") is the factor of safety. The maximum bending stress in the beam will be in the spar caps at a distance ![h/2](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-938f9ac9a1d14f20a02efb490fae2ece_l3.svg "Rendered by QuickLaTeX.com") from the neutral axis, so that at the root of the spar in the lower cap, the tensile stress will be

    ![\\\[ \\sigma\_{\\rm max} = \\frac{M}{I} \\left( \\frac{h}{2} \\right) = \\frac{n \\, P \\, L}{2 \\, L \\, I} \\left( \\frac{h}{2} \\right) = \\frac{n \\, P \\, L \\, h}{4 \\, I} \\\]](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-bbea413647ce6d486753670085d3793c_l3.svg "Rendered by QuickLaTeX.com")

Substituting the numerical values gives

    ![\\\[ \\sigma\_{\\rm max} = \\frac{5.0 \\times 20,000 \\times 0.3}{4.0 \\times 4.167 \\times 10^{-5}} = 180~\\mbox{MPa} \\\]](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-7ece9dbee253551d3b4cddf95af7ec5c_l3.svg "Rendered by QuickLaTeX.com")

This stress value is well below the aluminum alloy’s ultimate strength (276 MPa), so the spar will readily carry the required load, with a significant margin.

## Torsion & Shear Flow

When a wing is loaded in flight, it bends, and it also twists under the action of aerodynamic pitching moments and trailing-edge control loads. As previously discussed, this twisting moment is known as torsion. The wing naturally twists about its _elastic axis_ because that axis defines the direction along the span where bending and torsion are uncoupled. In a thin-walled wing box, torsion is resisted by shear stresses in the skins and spar webs. These shear stresses form a continuous distribution, called _shear flow_, denoted by ![q](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-b382d6583356a94c08436952f521c28c_l3.svg "Rendered by QuickLaTeX.com"), as shown in Figure 15. For a thin sheet of thickness ![t\_s](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-d9ccdc324b0d850eca7b8c5cb6bbce1d_l3.svg "Rendered by QuickLaTeX.com"), the shear flow is defined as

(11)   ![\\begin{equation\*} q = \\tau \\, t\_s \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-37ec6520d16d25a6aa06da3f4222c836_l3.svg "Rendered by QuickLaTeX.com")

where ![\\tau](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-fd9b87aaa62f87b5ba812d254ecdbe78_l3.svg "Rendered by QuickLaTeX.com") is the shear stress. Notice that shear flow has units of force per unit length.

![](https://eaglepubs.erau.edu/app/uploads/sites/4/2024/05/Wing_torsion-1.png)

The concept of shear flow in a two-cell wing box.

The torsion in a closed wing box is carried by a circulating shear flow around each closed cell, showing how the skins and spars share the torsional loads. The spars carry much of the vertical shear from bending, while the skins and webs together carry the shear associated with torsion. A multi-cell wing box provides greater torsional stiffness than a single-cell configuration. It creates two closed regions that can efficiently carry torsion. The circulating shear flows in these cells interact with aerodynamic pitching moments, control-surface hinge moments, and inertial torques that arise in flight.

This example of a two-cell wing box has two shear flows, one in each cell.  Consider a thin-walled cell with a tangential shear flow ![q\_i](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-7f953fa19d1f96b896e6b4cca523fe4d_l3.svg "Rendered by QuickLaTeX.com") along its perimeter. An element of wall of length ![{ds}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-b69f614ba5759728dfb55aa56d9f7c55_l3.svg "Rendered by QuickLaTeX.com") produces an elemental twisting moment ![dQ\_i = q\_i \\, r\_\\perp \\, ds](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-7ae88b1170a62c93b8afd20c5eb40ef8_l3.svg "Rendered by QuickLaTeX.com"),  where ![r\_\\perp](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-06a7f723406a5156fc3c1bba1f35efbd_l3.svg "Rendered by QuickLaTeX.com") is the perpendicular distance from the centroid of the cell to the wall segment. Integrating around the entire closed co tour gives the total torque carried by that cell as

(12)   ![\\begin{equation\*} Q\_i = \\oint q\_i \\, r\_\\perp \\, ds \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-256a77989aed61b3cccda826713e7479_l3.svg "Rendered by QuickLaTeX.com")

For any thin-walled closed contour, the line integral ![\\oint r\_\\perp ds](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-6a066aa421d9fe432588c17a235cb4da_l3.svg "Rendered by QuickLaTeX.com") is a geometric quantity equal to twice the area enclosed by the cell, i.e., ![\\displaystyle{\\oint r\_\\perp ds = 2 A\_i}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-b09ea7c9d124d56d453cb25b659cf5ec_l3.svg "Rendered by QuickLaTeX.com").  Substituting this result gives

(13)   ![\\begin{equation\*} Q\_i = 2 \\, A\_i \\, q\_i \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-b9e8e2c15d7d9b3a2ff1dcb80ebeaba8_l3.svg "Rendered by QuickLaTeX.com")

If the enclosed areas are ![{A\_1}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-8fe722a79bd890001b18902b8550cdbc_l3.svg "Rendered by QuickLaTeX.com") and ![{A\_2}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-9701429e7540cb9ba14b3b11c46bb9c3_l3.svg "Rendered by QuickLaTeX.com"), with corresponding shear flows ![q\_1](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-05b1bd58099c8062146aa30613f492bf_l3.svg "Rendered by QuickLaTeX.com") and ![q\_2](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-f2fafb76845fe5c8e92d692cf48253c6_l3.svg "Rendered by QuickLaTeX.com"), with an applied torque ![Q](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-cd35e00322ccfa12054394fcb0854e63_l3.svg "Rendered by QuickLaTeX.com"), then torsional equilibrium requires that

(14)   ![\\begin{equation\*} Q = 2 \\, A\_1 \\, q\_1 + 2 \\, A\_2 \\, q\_2 \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-37d37c7fa85043cf6be8401172a6d615_l3.svg "Rendered by QuickLaTeX.com")

A second equation comes from compatibility. The twist per unit length must be the same in both cells. For a thin-walled closed section, the twist rate in cell ![i](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-8f4484c453f9d341a5b74d69b190cd75_l3.svg "Rendered by QuickLaTeX.com") is

(15)   ![\\begin{equation\*} \\theta'\_{(i)} = \\frac{1}{2 \\, A\_i \\, G} \\oint\_{i} \\frac{q\_i}{t\_s}\\, ds \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-008cfe4cb04dfe600577f748f8449a15_l3.svg "Rendered by QuickLaTeX.com")

Applying this to the two cells gives

(16)   ![\\begin{equation\*} \\theta'\_{(1)} = \\frac{1}{2 \\, A\_1 \\,G} \\oint\_{1} \\frac{q\_1}{t\_s}\\, ds \\qquad \\text{and} \\qquad \\theta'\_{(2)} = \\frac{1}{2 \\, A\_2 \\, G} \\oint\_{2} \\frac{q\_2}{t\_s}\\, ds \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-aaee8aa59f7ff86ef0bf631c20ac4288_l3.svg "Rendered by QuickLaTeX.com")

where ![G](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-555c20537888622ed0ef64b2b74e5f15_l3.svg "Rendered by QuickLaTeX.com") is the shear modulus and the line integrals run once around each cell. Because the entire wing box must twist as a single component, the compatibility condition requires ![\\theta'\_{(1)} = \\theta'\_{(2)}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-f1fe8f768f932041c1497cfe835405d6_l3.svg "Rendered by QuickLaTeX.com"). This condition can be used to solve for ![q\_1](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-05b1bd58099c8062146aa30613f492bf_l3.svg "Rendered by QuickLaTeX.com") and ![q\_2](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-f2fafb76845fe5c8e92d692cf48253c6_l3.svg "Rendered by QuickLaTeX.com"). Once the shear flows are known, the shear stresses follow from ![\\tau = q/t\_s](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-a5d14878d71c26658732911beeded1a9_l3.svg "Rendered by QuickLaTeX.com").

The concept of the _shear center_ follows directly from these ideas. The shear center is the point on a cross-section of a spar or beam where a transverse force must be applied so that the beam bends without twisting. For example, when a load is applied to a spar in the form of an I-beam, as shown in Figure 16, the vertical shear is carried mainly by the web and transferred into the caps through shear flows along the web-cap junctions. These internal forces act at different locations around the section and, in general, can produce both bending and twisting.

![](https://eaglepubs.erau.edu/app/uploads/sites/4/2024/05/Shear_center.png)

Bending of an I-beam with the load applied at the shear center (left) and away from the shear center (right).

If the load is applied at the shear center, the twisting effects of the internal shear forces cancel, and the beam bends without any tendency to rotate. If the load is applied away from this point, the internal shear forces no longer balance, and the beam both bends and twists. For a symmetric I-beam, the shear flows are symmetrically distributed in the top and bottom flanges, so their twisting moments cancel at the web centerline. Therefore, the shear center lies on the web’s centerline, midway between the flanges.

# Braced Wing Structures

A strut-braced wing is a typical structural configuration in light aircraft, in which an external diagonal strut connects the wing panel to a lower fuselage joint, as shown in Figure 17. The purpose of the strut is to relieve bending loads in the wing root by transmitting a portion of the aerodynamic lift through axial forces rather than internal bending alone. Although aerodynamically less clean than a cantilever wing and has higher drag, the strut-braced arrangement offers significant structural efficiency, permitting lighter spars and reduced wing weight for the same load-carrying capacity. The [Cessna 172](https://en.wikipedia.org/wiki/Cessna_172) series exemplifies the effectiveness and durability of the strut-braced wing configuration, which has remained essentially unchanged throughout decades of production.

![](https://eaglepubs.erau.edu/app/uploads/sites/4/2024/05/structures_pinjointedwing_pt1-1.png)

Braced wing structures are commonly used on smaller airplanes to save weight, albeit at the expense of a minor increase in drag.

To study the internal forces in such a structure, the wing and its bracing elements can be idealized as a pin-jointed framework composed of the wing panels, the upper and lower carry-through members in the fuselage, and the left and right diagonal struts. Under steady-level flight, the wing panels carry a distributed aerodynamic lift, and the combined structure transfers this load to the fuselage through a system of axial forces in the struts and carry-throughs, as well as shear and bending in the wing beams.

Consider the left half of a strut-braced wing, idealized as shown in Figure 18. The wing panel extends from the root pin at ![A](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-ecb8c67cb42340c626cec798a9c17d1b_l3.svg "Rendered by QuickLaTeX.com") to the free tip at ![x = L](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-670fac183d64e38435acb7f87ba21790_l3.svg "Rendered by QuickLaTeX.com"), and the strut attaches to the wing at point ![B](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-8ba79514a583d8c9e34bf36653b9645d_l3.svg "Rendered by QuickLaTeX.com") located at ![x = a](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-e7f315e1a636da3a18d61fd6c261988f_l3.svg "Rendered by QuickLaTeX.com"). The distributed aerodynamic lift acting on one wing panel is

(17)   ![\\begin{equation\*} w = \\frac{W}{2\\,L} \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-9441ba1c749146baf907068edfb8551e_l3.svg "Rendered by QuickLaTeX.com")

so the total upward load on the left wing is ![w\\, L = W/2](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-393215ecedf1a562af5d7c7525ddfccd_l3.svg "Rendered by QuickLaTeX.com"). The root at ![A](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-ecb8c67cb42340c626cec798a9c17d1b_l3.svg "Rendered by QuickLaTeX.com") is a pin support, and the strut attaches through a pin joint at ![B](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-8ba79514a583d8c9e34bf36653b9645d_l3.svg "Rendered by QuickLaTeX.com"). Because all joints are frictionless pins, the only vertical forces acting directly on the wing panel are the root reaction ![V\_A](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-1179d7a308c2dcfcb1a6e93a02cf8a0f_l3.svg "Rendered by QuickLaTeX.com"), the distributed lift ![w](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-7741aa25b9b0bb9c335c38584300da92_l3.svg "Rendered by QuickLaTeX.com"), and the downward vertical component ![V\_s](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-a18260fa2c9e7c578f85865e9935d17f_l3.svg "Rendered by QuickLaTeX.com") of the strut force. The lower carry-through and fuselage joint at ![C](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-bd5323ad377b4559d3399eb598e159db_l3.svg "Rendered by QuickLaTeX.com") reacts the remaining components of the strut load but does not apply distributed loads to the wing panel.

![](https://eaglepubs.erau.edu/app/uploads/sites/4/2024/05/structures_pinjointedwing_pt2-2.png)

Idealized loading on a strut-braced wing structure.

Summing vertical forces on the wing panel gives

(18)   ![\\begin{equation\*} V\_A + w\\,L - V\_s = 0 \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-6e7f45372ae5bd72ed2384b5ded875fa_l3.svg "Rendered by QuickLaTeX.com")

Taking moments about the root pin at ![A](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-ecb8c67cb42340c626cec798a9c17d1b_l3.svg "Rendered by QuickLaTeX.com") eliminates ![V\_A](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-1179d7a308c2dcfcb1a6e93a02cf8a0f_l3.svg "Rendered by QuickLaTeX.com") and gives

(19)   ![\\begin{equation\*} w\\,L\\left(\\frac{L}{2}\\right) - V\_s\\,a = 0 \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-3a63e9b6482b6abcab30989def773603_l3.svg "Rendered by QuickLaTeX.com")

from which

(20)   ![\\begin{equation\*} V\_s = \\frac{w\\,L^2}{2\\,a} = \\frac{W\\,L}{4\\,a} \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-176bcd96746df2388e74f4386ff6febc_l3.svg "Rendered by QuickLaTeX.com")

and, therefore, the root reaction is

(21)   ![\\begin{equation\*} V\_A = V\_s - w\\,L = W\\!\\left(\\frac{L}{4\\,a} - \\frac12\\right) \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-043b8569a73ba1d11d2f2bc588bc9ad1_l3.svg "Rendered by QuickLaTeX.com")

To determine the internal shear in the wing panel, take shear upward as positive. For the inboard region ![0 < x < a](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-7f699d702cca3e3382f6fb6479510634_l3.svg "Rendered by QuickLaTeX.com") (between the root and the strut attachment), then

(22)   ![\\begin{equation\*} V(x) = V\_A + w\\,x \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-9c35412e18b096e30bda9f06aa020aed_l3.svg "Rendered by QuickLaTeX.com")

For the outboard region ![a < x < L](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-beb70e5384fc38b0250ca64ebf663edc_l3.svg "Rendered by QuickLaTeX.com"), the left segment of the beam also contains the downward strut force, i.e.,

(23)   ![\\begin{equation\*} V(x) = V\_A + w\\,x - V\_s = \\frac{W}{2\\,L}(x - L) \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-66d23303dba7eb47f4af75854db392ad_l3.svg "Rendered by QuickLaTeX.com")

This expression satisfies ![V(L)=0](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-cff6dd6fd39507d677a6d33ced115ec5_l3.svg "Rendered by QuickLaTeX.com") at the free tip, as expected, and shows that the maximum internal shear occurs at the root pin, i.e.,

(24)   ![\\begin{equation\*} V\_{\\max} = |V\_A| = W\\left|\\frac{L}{4\\,a} - \\frac12\\right| \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-53a6bb38d003eb19b84a845e44a0bd7a_l3.svg "Rendered by QuickLaTeX.com")

The bending moment satisfies ![dM/dx = V(x)](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-378d0ca7ce6b3e6373ff90881da276c7_l3.svg "Rendered by QuickLaTeX.com"), with ![M(0) = 0](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-f80947ced1697a96a94127b47fd2d73b_l3.svg "Rendered by QuickLaTeX.com") at the pin support. For the inboard region ![0 < x < a](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-7f699d702cca3e3382f6fb6479510634_l3.svg "Rendered by QuickLaTeX.com")

(25)   ![\\begin{equation\*} M(x) = V\_A\\,x + \\tfrac12 w\\,x^2 \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-ae12a2272000c3ed1a15aa86bd44d475_l3.svg "Rendered by QuickLaTeX.com")

For the outboard region ![a < x < L](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-beb70e5384fc38b0250ca64ebf663edc_l3.svg "Rendered by QuickLaTeX.com"), using ![M(L) = 0](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-e5478fe74e176c05b9ec3405dca75540_l3.svg "Rendered by QuickLaTeX.com") at the free tip, then

(26)   ![\\begin{equation\*} M(x) = \\frac{W\\,(L - x)^2}{4\\,L} \\qquad \\text{and} \\qquad M(a) \\equiv  M\_B = \\frac{W\\,(L - a)^2}{4\\,L} \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-fc1fbe05f6518142394d477bada7b8d2_l3.svg "Rendered by QuickLaTeX.com")

which is the resultant bending moment from the outer wing panel. The maximum bending moment occurs at the point where the shear passes through zero. Solving ![V\_A + w\\,x = 0](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-f4b780bd3418cac52400ffdbe26b5ac7_l3.svg "Rendered by QuickLaTeX.com") for ![x](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-a4502c79450abe79f54688b996cf81bd_l3.svg "Rendered by QuickLaTeX.com") gives the station of zero shear in the inboard portion of the wing, i.e.,

(27)   ![\\begin{equation\*} x^\\ast = L - \\frac{L^2}{2\\,a} \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-05af821f5c988a643adf3c34f22ffdc9_l3.svg "Rendered by QuickLaTeX.com")

For typical strut geometries, this point lies between the root and the strut attachment, so the maximum bending moment occurs in this inboard bay of the wing panel, which needs to be particularly strong and stiff to carry the loads.

The support strut itself is a two-force member\[2\] carrying only axial load. Its vertical component on the wing is ![V\_s](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-a18260fa2c9e7c578f85865e9935d17f_l3.svg "Rendered by QuickLaTeX.com"), so the axial tension in the strut is

(28)   ![\\begin{equation\*} T = \\frac{V\_s}{\\sin\\theta} = \\frac{W\\,L}{4\\,a\\,\\sin\\theta} \\ , \\qquad \\text{where the strut angle is} \\quad \\theta = \\tan^{-1}\\!\\left(\\frac{h}{a}\\right) \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-317b1f77bfef326cffb2548968257b80_l3.svg "Rendered by QuickLaTeX.com")

Each strut has a horizontal component ![T\\cos\\theta = V\_s\\cot\\theta](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-ff293326b122def75d8cdc5bf3773089_l3.svg "Rendered by QuickLaTeX.com"), and the two symmetric struts together transmit this horizontal load into the lower carry-through. The resulting axial force in the lower carry-through is, therefore,

(29)   ![\\begin{equation\*} N\_\\ell = 2\\,V\_s\\cot\\theta = \\frac{W\\,L}{2\\,a}\\cot\\theta \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-0f22402c4af6720d4b30dc0b46c8ab8e_l3.svg "Rendered by QuickLaTeX.com")

The lower carry-through structure must also be sufficiently strong to withstand landing-gear loads transmitted through this part.

Consider the left-wing strut of a light aircraft in steady 1g level flight. The axial force in the strut from the preceding analysis is

    ![\\\[ T = \\frac{W L}{4 a \\sin\\theta} \\\]](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-61f50a98a9a1e3c0b91653383ef96bd1_l3.svg "Rendered by QuickLaTeX.com")

Use the following representative values: Airplane weight ![W](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-9f11b08f939cc3c30c302e8fb20c9ad1_l3.svg "Rendered by QuickLaTeX.com") = 10,000 N, half-span ![L](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-98eac87a0278698f73590e66c82b393b_l3.svg "Rendered by QuickLaTeX.com") = 5.5 m, strut attach point ![a](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-31da1615bc1002e92a9f7d3101399eb9_l3.svg "Rendered by QuickLaTeX.com") = 3.0 m, vertical drop ![h](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-cdf2a44d0b66665d96751b4fab58d96f_l3.svg "Rendered by QuickLaTeX.com") = 1.2 m. Assume a circular strut with diameter ![d\_s](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-b8e64d09a7adc9aa0d92c4b27bde400b_l3.svg "Rendered by QuickLaTeX.com") = 35 mm and wall thickness ![t\_s](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-d9ccdc324b0d850eca7b8c5cb6bbce1d_l3.svg "Rendered by QuickLaTeX.com") = 2 mm, made of aluminium with Young’s modulus ![E\_s](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-284cc5259da0d72c9357ee3739317b79_l3.svg "Rendered by QuickLaTeX.com") = 70 GPa. Determine: (1) the axial force ![T](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-5853d74b615ce95a8df937e988801f1c_l3.svg "Rendered by QuickLaTeX.com") in the strut; (2) the axial stress ![\\sigma\_s](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-44a94657189b8c69c944a88336b0dc93_l3.svg "Rendered by QuickLaTeX.com"); (3) the axial strain ![\\varepsilon\_s](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-20db5df4dab49fdcfa9280c1050186f7_l3.svg "Rendered by QuickLaTeX.com").

Show solution/hide solution.

The strut angle is

    ![\\\[ \\theta = \\tan^{-1}\\!\\left(\\frac{h}{a}\\right) = \\tan^{-1}\\!\\left(\\frac{1.2}{3.0}\\right) = 21.8^\\circ \\\]](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-ccad71cc6a1813b26e265ee10ef409f2_l3.svg "Rendered by QuickLaTeX.com")

The axial force in the strut is

    ![\\\[ T = \\frac{W L}{4 a \\sin\\theta} = \\frac{10{,}000 \\times 5.5}{4 \\times 3.0 \\times \\sin 21.8^\\circ} = 1.23 \\times 10^4~\\text{N} \\\]](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-b5199cb9d5e6ce41e604c019be0cee78_l3.svg "Rendered by QuickLaTeX.com")

The cross-sectional area of a thin-walled circular tube is approximated by

    ![\\\[ A\_s \\approx \\pi d\_s t\_s \\\]](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-7e1dcb233146b64cf29e75e975b684b0_l3.svg "Rendered by QuickLaTeX.com")

so

    ![\\\[ A\_s = \\pi (0.035)(0.002) = 2.20 \\times 10^{-4}~\\text{m}^2 \\\]](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-7b6965dd318533328a4632eebfb0e5c1_l3.svg "Rendered by QuickLaTeX.com")

The axial stress in the strut is

    ![\\\[ \\sigma\_s = \\frac{T}{A\_s} = \\frac{1.23\\times10^4}{2.20\\times10^{-4}} = 5.6\\times10^7~\\text{Pa} = 56~\\text{MPa} \\\]](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-31da80ff74e33fc923c29dd0fea39bee_l3.svg "Rendered by QuickLaTeX.com")

and the axial strain is

    ![\\\[ \\varepsilon\_s = \\frac{\\sigma\_s}{E\_s} = \\frac{5.6\\times10^7}{7.0\\times10^{10}} = 8.0\\times10^{-4} \\\]](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-9900cb509eef1ad354a698b0474b7c08_l3.svg "Rendered by QuickLaTeX.com")

Because strain is dimensionless, this corresponds to an extension of 0.8 mm per meter of strut length.

# Fuselage Structures

The fuselage is the primary structure, or “body,” of the aircraft. It provides space for the aircrew, passengers, cargo, and other equipment. There are two basic types of fuselage construction: the truss type and the monocoque/semi-monocoque type. In single-engine aircraft, the fuselage also usually houses the engine. In multi-engine aircraft, the engines may be located in the fuselage, attached to it, suspended from or contained within the wings.

A truss-type fuselage is a lightweight framework of steel-alloy tubes that provides stiffness and resists deformation under applied loads. As shown in Figure 19, this type of structure is sometimes called a space-frame design. Diagonal web members provide most of the truss’s bending and torsional stiffness. The truss-type fuselage frame is typically constructed from lightweight steel-alloy tubing, which is welded together, allowing all truss members to carry primarily tension and compression loads.

![](https://eaglepubs.erau.edu/app/uploads/sites/4/2022/07/truss.jpg)

A truss-type fuselage is a lightweight framework typically constructed from wood or welded steel-alloy tubes.

In some aircraft, truss fuselage frames may consist of aluminum alloy rods riveted or bolted at their ends using gusset plates. The truss-type fuselage is typically covered with fabric, although thin plywood or aluminum sheets may be added to provide additional stiffness and improve durability. Although it is often used on smaller general aviation aircraft, the design does not scale well for larger aircraft because it becomes too heavy compared to other designs.

The most common type of fuselage construction for aircraft is the monocoque or semi-monocoque design. As shown in Figure 20, the monocoque (i.e., single-shell) fuselage relies primarily on the skin’s strength to carry the loads. In this case, the skin must be sufficiently thick to prevent large compressive deformations or buckling, thereby increasing the structure’s weight. Because the skin is designed to carry significant loads, it is considered a _stressed-skin_ design. Skin buckling is likely to occur under bending, compression, or torsion loads in a monocoque structure.

![](https://eaglepubs.erau.edu/app/uploads/sites/4/2022/07/monocoque.jpg)

The monocoque, or shell, airframe type relies primarily on the skin’s strength to carry the primary loads. Skin buckling is a concern with this type of structure.

Most modern aircraft utilize semi-monocoque construction, as illustrated in Figure 21. This construction combines a lightweight skin with internal reinforcements, such as frames, longerons, and stringers, to form a strong, rigid structure. The skin, made thinner and lighter, is supported by these components, which help distribute loads and prevent buckling. Longerons, typically aluminum-alloy extrusions in “U” or “T” sections, span multiple frames, providing significant stiffness and supporting primary bending, torsion, and compressive loads. These elements are joined using rivets and other fasteners, ensuring durability while optimizing the strength-to-weight ratio. This design is well-suited to modern aircraft, offering superior resistance to aerodynamic and structural stresses.

![](https://eaglepubs.erau.edu/app/uploads/sites/4/2022/07/semimonocoque.jpg)

The semi-monocoque airframe is internally reinforced with longerons and stringers, providing considerable stiffness and strength.

In a semi-monocoque structure, shorter but more numerous stringers are also used to increase rigidity by supporting the skin and preventing skin buckling. Attached beneath the skin, they help maintain its shape and may be riveted directly without always connecting to frames or ribs. Both stringers and longerons primarily work in tension and compression, distributing loads efficiently across the fuselage to ensure its structural integrity.

For many purposes, the fuselage can be idealized as a beam that carries loads from bending, shear, and torsion. Under a bending moment ![M(x)](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-f5323effb62b82befd13d7c5dbe1b8c1_l3.svg "Rendered by QuickLaTeX.com"), the normal stress in a thin-walled fuselage section is

(30)   ![\\begin{equation\*} \\sigma\_x = \\frac{M\\,y}{I} \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-e5a927b5d7c51a25f460d051eea0372f_l3.svg "Rendered by QuickLaTeX.com")

where ![y](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-2861ad12ac59b11585f120e07995f2a5_l3.svg "Rendered by QuickLaTeX.com") is the distance from the neutral axis and ![I](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-9ff2447a542c544aced5910af03637ae_l3.svg "Rendered by QuickLaTeX.com") is the second moment of area. In a truss-type fuselage, this bending is resisted by axial forces in the individual tubes. In contrast, in a semi-monocoque structure, the bending load is shared between the longerons, stringers, and skin.

Each truss member, or longeron, behaves as a two-force member and carries only an axial load ![N](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-f20c2fd0e019446914d9bb495f71764d_l3.svg "Rendered by QuickLaTeX.com"). Its average stress is

(31)   ![\\begin{equation\*} \\sigma = \\frac{N}{A} \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-cb42b959983875e6da891150de3e1db6_l3.svg "Rendered by QuickLaTeX.com")

where ![A](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-ecb8c67cb42340c626cec798a9c17d1b_l3.svg "Rendered by QuickLaTeX.com") is the cross-sectional area of the member. In a truss fuselage, the pattern of tension and compression among the members provides the airframe’s overall bending and torsional stiffness.

In a monocoque or semi-monocoque fuselage, the thin skin is also part of the load-carrying system. The skin primarily carries shear, while the longerons and stringers carry the majority of the normal (bending) stresses. For torsion, a thin-walled closed fuselage acts like a tube, with an average shear stress of the form

(32)   ![\\begin{equation\*} \\tau \\, \\propto \\, \\frac{Q}{t\\,A\_m} \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-6d1a82e7d93833607449755ef1c42f4a_l3.svg "Rendered by QuickLaTeX.com")

where ![Q](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-cd35e00322ccfa12054394fcb0854e63_l3.svg "Rendered by QuickLaTeX.com") is the applied torque, ![t](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-b3c258e655432866865212506e5f103c_l3.svg "Rendered by QuickLaTeX.com") is the skin thickness, and ![A\_m](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-777452f14ac3e0e01099726babea9eff_l3.svg "Rendered by QuickLaTeX.com") is the enclosed area. This thin-walled “tube behavior’’ explains the high torsional stiffness and strength of semi-monocoque construction even when the skin is relatively thin and light.

**How to drive a rivet!**

A solid rivet is the most common type of fastener used in aircraft structures. The principle of [driving a rivet](https://www.eaa.org/eaa/news-and-publications/eaa-news-and-aviation-news/bits-and-pieces-newsletter/09-2015-setting-or-driving-solid-rivets) is relatively simple.

-   Drill several matching holes in the two pieces to be joined.
-   Hold the components together with clamps or [clecos](https://en.wikipedia.org/wiki/Cleco_\(fastener\)).
-   Slide in one solid rivet until the head of the rivet is firmly against the outer part of the structure.
-   Hold the rivet head in place, then drive or _buck_ the rivet tail from the other side with a bucking bar until the rivet is squeezed (deformed) to hold the pieces together tightly.

Rivets are strong because they fill the entire hole with a solid aluminum plug. They are also very light and inexpensive. However, setting rivets requires skill, and sometimes more than one person is needed to install them. The use of a pneumatic hammer (with a _set_ shaped to the rivet head) and a bucking bar (for the rivet tail) accelerates the installation process, which can involve hundreds or thousands of rivets, even on a modest-sized structure. Riveting can be labor-intensive, but it yields a strong, lightweight, and durable structure.

Most, if not all, commercial aircraft have pressurized fuselages, meaning the cabin pressure is increased to create a differential pressure between the cabin and the outside atmosphere. Pressurization is achieved by designing an airtight fuselage that is pressurized with a compressed-air source, typically engine bleed air. In most pressurized aircraft, cabin pressure is maintained at an altitude of approximately 6,000 ft to 8,000 ft (about 2,000 m to 2,500 m) to ensure passenger comfort. Nevertheless, some passengers may still exhibit mild hypoxia symptoms (oxygen deprivation) during long-haul flights, contributing to the all-too-frequent malady known as [_jet lag_](https://www.mayoclinic.org/diseases-conditions/jet-lag/symptoms-causes/syc-20374027).

Structurally, pressurization induces significant tensile and hoop stresses in the fuselage, as shown in Figure 22, thereby increasing the complexity of its design and its structural weight. The fuselage is an enormous pressure vessel that expands like a balloon as the aircraft climbs to altitude. The ceiling for most commercial transport airplanes is often limited by cabin pressurization requirements, which set a structural stress limit on the fuselage. Naturally, increasing the thickness of the fuselage skin can reduce stresses; however, this approach also significantly increases the airframe’s weight.

![](https://eaglepubs.erau.edu/app/uploads/sites/4/2024/05/fuselage_hoopstress.png)

Pressurized fuselage structures can generate significant hoop and tensile stresses.

The hoop stress ![\\sigma\_{\\theta}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-cb00037ec85d12d17d8d4326e5810554_l3.svg "Rendered by QuickLaTeX.com") in a cylindrical pressure vessel is generally the dominant tensile stress and is given by

(33)   ![\\begin{equation\*} \\sigma\_{\\theta} = \\frac{\\Delta p \\, r}{t} \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-e548318392176af00fd989a651a61579_l3.svg "Rendered by QuickLaTeX.com")

where ![\\Delta p](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-7969be26d2b21a184fdf8e67f765efed_l3.svg "Rendered by QuickLaTeX.com") is the differential pressure across the skin, ![r](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-a5843f3cd949bcc65e49f4b56a147bdf_l3.svg "Rendered by QuickLaTeX.com") is the mean radius of the fuselage, and ![t](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-b3c258e655432866865212506e5f103c_l3.svg "Rendered by QuickLaTeX.com") is the wall (skin) thickness. The longitudinal or axial stress ![\\sigma\_{x}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-525df9c9ad55862f2f834ff461dffb3a_l3.svg "Rendered by QuickLaTeX.com") is approximately half the hoop stress and is given by

(34)   ![\\begin{equation\*} \\sigma\_{x} = \\frac{\\Delta p \\, r}{2t} \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-4fcd93e804720e75598293c7be140d6a_l3.svg "Rendered by QuickLaTeX.com")

These stress limits impose critical constraints on fuselage design. The maximum allowable cabin differential pressure, and hence the maximum cruise altitude, is bounded by the material strength and thickness of the fuselage skin. Although increasing skin thickness reduces stress levels, it also adds structural weight, diminishing payload capacity and fuel efficiency. Therefore, optimizing fuselage design involves balancing structural strength, weight efficiency, and operational ceiling.

Another type of semi-monocoque structure is the geodesic design, pioneered by the British aeronautical engineer [Barnes Wallis](https://en.wikipedia.org/wiki/Barnes_Wallis) in the 1930s. The famous [Vickers Wellington](https://en.wikipedia.org/wiki/Vickers_Wellington) bomber, depicted in Figure 23, was built with a geodesic structure and retained structural integrity despite significant combat damage. In a geodesic construction, the longitudinal and diagonal members follow helical paths around the fuselage or wing, intersecting to form a network of diamond-shaped cells. Loads applied at any point on the structure are transmitted through this network and distributed among multiple paths, thereby reducing stress in any individual member. This load sharing produces a structure with excellent strength-to-weight characteristics and inherent redundancy. A local failure does not cause a catastrophic collapse because the surrounding members continue to carry the load.

![](https://eaglepubs.erau.edu/app/uploads/sites/4/2022/07/Vickers_wellington_frame-scaled-1.jpg)

The geodesic construction has structural members arranged as a lattice. It offers a robust, lightweight airframe, but is more expensive to build and maintain.

The efficiency of the geodesic design relies on the use of a fabric or thin non-structural covering. The skin does not carry primary loads; instead, it transmits aerodynamic loads into the underlying lattice. When fabric is used, the overall structure remains very light. However, if the aircraft requires a pressurized fuselage, the skin must become a load-carrying member. Replacing the fabric with stressed metal skin adds substantial weight and removes many of the weight savings that make the geodesic system attractive.

Although variants of this design have been used in spacecraft structures and other specialized applications, the geodesic approach is generally less practical for modern aircraft. Manufacturing and repairing the lattice is labor-intensive, and the weight penalties associated with metal skins make the more conventional semi-monocoque design preferable for pressurized or high-performance airframes. Nonetheless, the geodesic construction remains an important milestone in structural design. It is an excellent illustrative example of how geometry and load-path redundancy can be used to create efficient lightweight structures.

# Empennage Structures

The tail assembly of an aircraft is called the _empennage_, as shown in Figure 24. The structure of the vertical (fin) and horizontal stabilizers is very similar to that used in wing construction, including spars, ribs, and stringers, all of which are covered with a thin skin. They perform the same functions: shaping and supporting the structures and transferring stresses to the fuselage. However, the stabilators also have control surfaces, which means that additional structural requirements exist from the airloads produced by control deflections. For example, a rudder application alters the force on the fin, resulting in torsion. These loads, in turn, are applied to the fuselage as both bending and torsional moments.

![](https://eaglepubs.erau.edu/app/uploads/sites/4/2022/07/rudder.png)

Part of the empennage of an aircraft, showing the interior structure of the vertical fin and rudder.

# Flight Control Structures

An airplane’s primary flight control surfaces are the _ailerons_, _elevators_, and _rudder_. Other movable surfaces include flaps and spoilers. The ailerons are attached to the trailing edge of both wings and are used for roll control. The elevator, located on the trailing edge of the horizontal stabilizer, controls the aircraft’s pitch. The rudder, hinged to the trailing edge of the vertical stabilizer, provides yaw (directional) control.

Control surfaces are typically constructed from an aluminum-alloy structure around a single spar member or torque tube, to which ribs are fitted, and skin is attached. Primary control surfaces and flaps can also be constructed from composite honeycomb materials, a method used primarily on larger commercial airliners where excessive weight growth is a concern. Other sandwich-structured components may include cabin floors, nose cones, and engine cowlings.

# Winglets

A winglet is a vertical upturn of the wing tip, as shown in Figure 25. Winglets are used to improve an aircraft’s aerodynamic efficiency by modifying the airflow near the wing tip. As air moves around the wing, the high-pressure air from the lower surface tends to curl upward around the tip and mix with the lower-pressure air above. This curling motion produces a swirling flow pattern, called a wing-tip vortex, that dissipates energy and increases drag whenever the wing produces lift. By adding a small, carefully shaped surface at the tip, the winglet helps control and reduce this swirling motion, thereby reducing energy loss.

![](https://eaglepubs.erau.edu/app/uploads/sites/4/2022/07/wingletstructure.jpeg)

Winglets can often be retrofitted to existing aircraft to reduce drag, as on legacy commercial airliners such as the Boeing 757.

Winglets are made from aluminum or composite materials and are often retrofitted to existing wings to improve an airplane’s performance. Although they may appear small, winglets carry significant aerodynamic loads. Therefore, a winglet must be structurally tied into the main wing box at the tip, where the structure is strong enough to resist the bending and twisting forces generated in flight. This reinforcement ensures the winglet fully integrates with the wing.

# Stress Analyses

A structural stress analysis involves determining aerodynamic and other loads and evaluating the resulting stresses imposed on the structural components. While a stress analysis may be conducted on separate components or assemblies, any single structural member may be subjected to a combination of stresses from multiple loading paths. Therefore, a thorough stress analysis must generally account for the entire airplane structure to ensure that it is sufficiently strong and stiff to carry all flight and ground loads.

This type of stress analysis is performed using the [_finite-element method_](https://www.comsol.com/multiphysics/finite-element-method) (FEM). The FEM is a numerical method in which the aircraft structure is modeled as a set of finite blocks, or lattice elements, interconnected at discrete points called _nodes; an_ example of a lattice used for an entire aircraft is shown in Figure 26. The process begins with creating a geometric model of the aircraft and its detailed components using Computer-Aided Design (CAD) software. Each block or finite element may have different properties, such as thickness and material properties, reflecting the characteristics of aerospace materials, such as composites and metal alloys, which give the FEM tremendous design optimization capabilities. Regions between the fuselage, engine nacelles, and wings, as well as cutouts such as cockpit windows, require particular attention in FEM to avoid local stress concentrations.

![](https://eaglepubs.erau.edu/app/uploads/sites/4/2021/07/AR-99-Coarse-FEM-Figure-4-illustrates-elastic-models-of-the-MK-82-and-OPHER-stores.jpg)

The FEM is a numerical method in which a set of interconnected lattice elements models the aircraft structure.

Material properties, such as Young’s modulus, Poisson’s ratio, and density, are assigned to each element. Boundary conditions, including constraints, loads, and thermal effects, are applied to the model to represent the operating environment and mission requirements. The assembly of system equations involves forming the stiffness matrix by summing the contributions of individual finite elements and assembling the load vector to account for applied loads and environmental conditions. For linear systems, the displacement vector ![\[ u \]](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-6390e12d67bd11e712fb7d2746ccc6ca_l3.svg "Rendered by QuickLaTeX.com") is determined by solving the equation

(35)   ![\\begin{equation\*} \[ K \] \\{ u \\} = \\{ F \\} \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-cf676e94c4f545783a20cab07bef2791_l3.svg "Rendered by QuickLaTeX.com")

where ![\[ K \]](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-46eb26690412aa8e89f55c2fd589e981_l3.svg "Rendered by QuickLaTeX.com") represents the stiffness matrix and ![\\{ F \\}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-6d854209faf44ff2aa19928d19b941e3_l3.svg "Rendered by QuickLaTeX.com") is the load vector comprising of forces and moments. This equation describes the relationship between the loads acting on all nodes in the mesh and the displacements and rotations at those nodes. The nodal displacements and rotations of the structure are the unknowns in the FEM.

Solution techniques in the FEM encompass a variety of numerical methods. One approach is to invert the stiffness matrix to find ![K^{-1}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-b886256dd27f720788ab423e631ff12c_l3.svg "Rendered by QuickLaTeX.com") and solve for ![\\{U\\}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-77c552dd5d57b301046737da20add171_l3.svg "Rendered by QuickLaTeX.com"). However, directly inverting a large matrix is not numerically efficient. Instead, preferred methods iteratively approximate the displacement vector to converge to a solution. Post-processing tools are then employed to visualize and interpret the results, as shown in Figure 27 for a spar lug, which is color-coded by stress level (blue indicating the lowest). Notice the higher stresses around the bolt holes. The idea is to distribute the stresses so that they “flow” smoothly into the primary attachment points without large concentrations.

![](https://eaglepubs.erau.edu/app/uploads/sites/4/2024/05/Spar_lug.png)

Example of a FEM analysis of a structural component of a wing.

From FEM results, engineers can assess the flight vehicle’s structural integrity by analyzing stresses, strains, and overall deformations to ensure the vehicle and its components meet safety, performance, and certification requirements. In this regard, designing an aircraft or spacecraft may involve identifying the strongest, most durable structure with the minimum possible weight, while also ensuring good fatigue and corrosion resistance, along with other desirable characteristics.

## Simple Application of the FEM

The complete FEM workflow can be illustrated with a single structural component. The FEM process encompasses element formulation, assembly, application of boundary conditions, solution of the equation ![\[K\]\\{u\\}=\\{F\\}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-908e629c7b01c801d50ba395bfbb8610_l3.svg "Rendered by QuickLaTeX.com"), and post-processing to obtain stresses and strains. Consider a straight aluminum tie bar of length ![L](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-98eac87a0278698f73590e66c82b393b_l3.svg "Rendered by QuickLaTeX.com") = 1.0 m and constant cross-sectional area ![A](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-ecb8c67cb42340c626cec798a9c17d1b_l3.svg "Rendered by QuickLaTeX.com") = 400 mm![^{2}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-5ec1dc4a8eafac80808a696c0224c320_l3.svg "Rendered by QuickLaTeX.com"). One end of the bar is fixed (encastré), and the other end is subjected to a tensile force ![P](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-a7774ce14328ec765e7de2bd377694e1_l3.svg "Rendered by QuickLaTeX.com") = 20 kN. The material has Young’s modulus ![E](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-1febe16825da555859d1c96590603137_l3.svg "Rendered by QuickLaTeX.com") = 70 GPa. In the FEM analysis, the bar is discretized into two equal finite elements, each of length ![L\_e](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-7d812ce09dd5083eec7260f255b82cb5_l3.svg "Rendered by QuickLaTeX.com") = ![L/2](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-9d1c934f940202050f8ede19c93bebbe_l3.svg "Rendered by QuickLaTeX.com") = 0.5 m, so that there are three nodes with axial displacements ![u\_1, u\_2, u\_3](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-ff9a9382549c12468deaa629fcd3d4f8_l3.svg "Rendered by QuickLaTeX.com"), as shown in Figure 28.

![](https://eaglepubs.erau.edu/app/uploads/sites/4/2024/05/Structure_FEM_bar.png)

Finite-element discretization of a 1-dimensional bar.

For a 1-dimensional axial bar, the element stiffness matrix is

(36)   ![\\begin{equation\*} \[ k^{(e)} \] = \\frac{EA}{L\_e} \\begin{bmatrix} 1 & -1 \\\\ -1 & 1 \\end{bmatrix} \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-85e0448b06b704f66bffcc0559f975ff_l3.svg "Rendered by QuickLaTeX.com")

This expression follows directly from the axial behavior of a bar element. For a 1-dimensional element with nodal displacements ![u\_1](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-217dde592a53bafaa1c895520cd22266_l3.svg "Rendered by QuickLaTeX.com") and ![u\_2](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-e81ec1d63db8345a7ae36c30ef2b1137_l3.svg "Rendered by QuickLaTeX.com"), the axial strain is

(37)   ![\\begin{equation\*} \\varepsilon=\\frac{u\_2-u\_1}{L\_e} \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-0bcf48421a3bb31285b20998311d5dc9_l3.svg "Rendered by QuickLaTeX.com")

and Hooke’s law gives the corresponding stress ![\\sigma = E\\,\\varepsilon](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-20b44976034c5fd477aee669a3da50c1_l3.svg "Rendered by QuickLaTeX.com"). The internal axial force, ![F](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-0ee83b71b9496307a10991a958f9e607_l3.svg "Rendered by QuickLaTeX.com"), in the element is then

(38)   ![\\begin{equation\*} F = \\sigma A = EA\\left( \\frac{u\_2-u\_1}{L\_e} \\right) \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-5abeb1d38c0f190caa6e53231330ccc5_l3.svg "Rendered by QuickLaTeX.com")

A positive extension ![u\_2 > u\_1](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-30c3d1ee53aeec34081acc599914c658_l3.svg "Rendered by QuickLaTeX.com") pulls node 1 to the right and node 2 to the left, so the nodal forces are

(39)   ![\\begin{equation\*} F\_1 = -F \\qquad \\text{and} \\quad F\_2 = F \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-3ba2607ccab2bdb673165e10cadb1b8a_l3.svg "Rendered by QuickLaTeX.com")

Substituting for ![F](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-0ee83b71b9496307a10991a958f9e607_l3.svg "Rendered by QuickLaTeX.com") and writing the result in matrix form gives

(40)   ![\\begin{equation\*} \\begin{Bmatrix} F\_1 \\\\\[8pt\]  F\_2 \\end{Bmatrix} = \\frac{EA}{L\_e} \\begin{bmatrix} 1 & -1 \\\\ -1 & 1 \\end{bmatrix} \\begin{Bmatrix} u\_1 \\\\ u\_2 \\end{Bmatrix} \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-71a6284cafeefd97022d0c1ed78aa95e_l3.svg "Rendered by QuickLaTeX.com")

which is exactly the element stiffness relation ![\\{F^{(e)}\\}=\[k^{(e)}\]\\{u^{(e)}\\}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-01d1c3808306ad6a82627b03b658db19_l3.svg "Rendered by QuickLaTeX.com").

In this example, substituting ![E = 70\\times 10^9](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-8ed4bd9c06601a19fd072a84b63ee30e_l3.svg "Rendered by QuickLaTeX.com") Pa, ![A = 4.0\\times 10^{-4}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-b24479b9c65bb94879188cb0368fef60_l3.svg "Rendered by QuickLaTeX.com") m![^{2}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-5ec1dc4a8eafac80808a696c0224c320_l3.svg "Rendered by QuickLaTeX.com"), and ![L\_e](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-7d812ce09dd5083eec7260f255b82cb5_l3.svg "Rendered by QuickLaTeX.com") = 0.5 m gives ![\\dfrac{EA}{L\_e} = 56\\times 10^9](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-b4a4ca320fca0786f609aadde8d95d88_l3.svg "Rendered by QuickLaTeX.com") N/m. The global stiffness matrix assembled from the two elements is then

(41)   ![\\begin{equation\*} \[ K \] = 56\\times 10^9 \\begin{bmatrix} 1 & -1 & 0 \\\\ -1 & 2 & -1 \\\\ 0 & -1 & 1 \\end{bmatrix} \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-a55711cb3d3019baf350bee33357baba_l3.svg "Rendered by QuickLaTeX.com")

The applied load vector is

(42)   ![\\begin{equation\*} \\{ F \\} = \\begin{Bmatrix} 0 \\\\ 0 \\\\ P \\end{Bmatrix} = \\begin{Bmatrix} 0 \\\\ 0 \\\\ 20{,}000 \\end{Bmatrix}~\\text{N} \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-07e79e4cb630de6aeb4c14e9d0d62b04_l3.svg "Rendered by QuickLaTeX.com")

because a load is only applied at node 3. The only given boundary condition is that node 1 is fixed, so ![u\_1 = 0](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-9138927bdca4b0a7241064ce0c7abe46_l3.svg "Rendered by QuickLaTeX.com"). Solving the reduced system gives

(43)   ![\\begin{equation\*} \\begin{bmatrix} 2 & -1 \\\\ -1 & 1 \\end{bmatrix} \\begin{Bmatrix} u\_2 \\\\ u\_3 \\end{Bmatrix} = \\begin{Bmatrix} 0 \\\\\[8pt\] \\dfrac{20{,}000}{56\\times 10^7} \\end{Bmatrix} \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-e66e0e49cfccec8f3deaaab8cff1971d_l3.svg "Rendered by QuickLaTeX.com")

Therefore, the nodal displacements are

(44)   ![\\begin{equation\*} u\_2 \\approx 3.57\\times 10^{-7}~\\text{m} \\qquad \\text{and} \\quad u\_3 \\approx 7.14\\times 10^{-7}~\\text{m} \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-5833c603f50b6033a047be241489b760_l3.svg "Rendered by QuickLaTeX.com")

The element strains are

(45)   ![\\begin{equation\*} \\varepsilon\_1 = \\frac{u\_2 - u\_1}{L\_e} \\approx 7.14\\times 10^{-7} \\qquad \\text{and} \\quad \\varepsilon\_2 = \\frac{u\_3 - u\_2}{L\_e} \\approx 7.14\\times 10^{-7} \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-1160e784a7dc8132722c9ca5ae75b7a0_l3.svg "Rendered by QuickLaTeX.com")

and the corresponding stresses are

(46)   ![\\begin{equation\*} \\sigma\_1 = E\\varepsilon\_1 \\approx 50~\\text{MPa} \\qquad \\text{and} \\quad \\sigma\_2 = E\\varepsilon\_2 \\approx 50~\\text{MPa} \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-706dacc4a968902639f0fca595d7924e_l3.svg "Rendered by QuickLaTeX.com")

This simple example illustrates all the essential steps of the FEM using only two elements and three nodes. However, in a real structure, the same procedures extend directly to dozens, hundreds, or even millions of elements. Each additional element contributes a small stiffness matrix to the global system, and each new node adds additional unknown displacements to the global displacement vector.

The entire assembly process repeats this pattern, with element equations stacked and merged into a large matrix via shared nodes. Boundary conditions are then applied to the selected degrees of freedom, and the resulting global matrix equation is solved for all nodal displacements. In this way, the FEM naturally scales to more complex structures, such as spars, ribs, fuselage frames, landing-gear fittings, and complete wing-fuselage assemblies.

# Fail-Safe & Safe-Life Structural Designs

Aerospace engineers have developed safe-life and fail-safe design philosophies for structural design. _[Fail-safe](https://en.wikipedia.org/wiki/Fail-safe) designs_ incorporate techniques such as structural redundancy and multiple load paths to prevent catastrophic failure of a single component. [_Safe life design_](https://en.wikipedia.org/wiki/Safe-life_design) is the philosophy that a component or system is designed not to fail during its intended operational life. This period may be defined by the number of flight hours, takeoffs and landings, years of operation, or some combination of these. Testing and analysis can estimate a component or system’s expected life and incorporate a margin of safety. The part or component must be removed from operational service and scrapped at the end of its expected life.

The decision between a safe-life and a fail-safe structural design depends on a cost-benefit analysis of the likelihood and potential consequences of failures. The benefit of a safe-life design is the freedom from specific inspection processes and maintenance cycles, which can save an operator significant time and money. However, fail-safe designs are usually heavier and more expensive. Safe-life designs are often simpler and lighter, aiming to minimize unplanned maintenance and the possibility of failure by designing components to last for a specific period.

An example of a safe-life versus failsafe structure is illustrated in Figure 29 for a wing spar, a critical component of an aircraft. The upper spar cap will be in compression, and the lower cap will be in tension; the lower cap is more critical for fatigue failure. Notice that in the event of a failure of the lower spar cap, the fail-safe structure has sufficient redundancy because of an alternative load path that can carry the bending moment loads. Unless the fatigue cracking of a safe-life structure is identified before progressing too far, the spar will fail catastrophically under load.

![](https://eaglepubs.erau.edu/app/uploads/sites/4/2021/07/Structure_redundancy-1024x859.png)

A “fail-safe” structure, as opposed to a “safe-life” structure, provides structural redundancy in the event of a critical component’s failure. A fail-safe structure is generally preferred.

The final decision on which design philosophy to employ must be made on a case-by-case basis, and the specific application of the parts or systems to different types of airframes must be determined. For example, commercial airliners and military airplanes are designed using fail-safe principles. The use of a fail-safe design philosophy in the aircraft industry provides structural redundancy against damage that may occur during an aircraft’s service life. By incorporating fail-safe design features that add extra weight to the airframe, the consequences of a single component failure can be minimized, thereby ensuring the safety of the aircraft and its passengers.

A small general aviation (GA) airplane may be designed using safe-life principles to reduce weight and cost, recognizing that it will likely be flown much less frequently and will accumulate significantly fewer loading cycles over its life. This approach assumes that components will not undergo a critical number of cycles during their service life and so do not require the same level of durability and safety factors as those in commercial or military aircraft. Nevertheless, catastrophic structural failures occur on aging GA aircraft, increasing the burden on the owner/operator to conduct more frequent inspections.

# Buckling

Aerospace structures have relatively thin structural members, including thin external skins. Buckling may occur when an aerospace structural component is subjected to high _compressive_ stresses. [Buckling](https://en.wikipedia.org/wiki/Buckling) is characterized by a sudden out-of-plane deflection of the structural member with increasing compressive loading, as illustrated in Figure 30. Different types of buckling may occur depending on the kind of structure and the applied loads.

![](https://eaglepubs.erau.edu/app/uploads/sites/4/2022/07/Buckling-1.png)

Design must account for the possibility of buckling in structural members. While some temporary local buckling of thin skin is acceptable under loading, significant buckling can significantly reduce the structure’s strength.

The thin skins on aerospace structures must be designed to prevent buckling under normally expected flight loads. This is done by supporting and stabilizing the skin from below using stringers or a substrate such as a honeycomb sublayer. However, stringers may also buckle when carrying high compressive loads, as shown in Figure 31. Under load, a certain degree of skin wrinkling is generally expected in aerospace structures. Larger unsupported areas of the skin often form mild waves or wrinkles, typically between frames and stiffeners, even under normal flight loads, as shown in the photograph below. Under these conditions, the skin undergoes mild elastic buckling and carries the normal compressive loads for which it was designed; it returns to its undistorted shape when the load is removed. Repeated elastic buckling at higher stress levels, however, tends to increase the likelihood of fatigue cracking in thin skins.

![](https://eaglepubs.erau.edu/app/uploads/sites/4/2024/05/elastic_buckling.png)

An example of mild elastic buckling on an upper wing skin, which is normal.

An aerospace structure may buckle, and its skins may wrinkle, even though the stresses are well below those needed to cause material failure. However, if sufficiently severe, buckling can result in permanent material deformation, as shown in Figure 32, significantly reducing the structure’s load-carrying capacity, and further loading on a structure after severe buckling can lead to structural failure. The example shown in the image below is from a NASA test on a representative spacecraft structure, in which the stringers have undergone permanent (plastic) buckling, substantially reducing the component’s strength.

![](https://eaglepubs.erau.edu/app/uploads/sites/4/2022/07/buckling.jpeg)

Buckling may cause permanent, non-elastic structural deformations, accompanied by a commensurate reduction in load-carrying capability. (NASA image.)

The onset of buckling can be predicted using theoretical methods first developed by [Leonhard Euler](https://en.wikipedia.org/wiki/Leonhard_Euler). The [Euler buckling formula](https://www.engineeringtoolbox.com/euler-column-formula-d_1813.html) allows a prediction of the maximum axial load an “ideal” structural member in the form of a column can carry before buckling. An ideal component is perfectly straight, made of a uniform, homogeneous material, and free of initial stress.

When the applied load reaches a critical value, the column is in a state of unstable equilibrium. In this condition, even a small lateral load can cause the structure to buckle. The buckling force or critical force, ![F\_c](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-9ae8147cfc232e3b58a5f236d5047803_l3.svg "Rendered by QuickLaTeX.com"), can be written as

(47)   ![\\begin{equation\*} F\_c = \\frac {\\pi^{2} \\, E \\, I}{(K \\, L)^{2}} \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-3b465959459fc04a0c8fb6265be958a7_l3.svg "Rendered by QuickLaTeX.com")

where ![E](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-1febe16825da555859d1c96590603137_l3.svg "Rendered by QuickLaTeX.com") is Young’s modulus of elasticity, ![I](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-9ff2447a542c544aced5910af03637ae_l3.svg "Rendered by QuickLaTeX.com") is the second moment of area of the cross-section of the column, and ![L](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-98eac87a0278698f73590e66c82b393b_l3.svg "Rendered by QuickLaTeX.com") is the unsupported length. The value of ![K](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-23a3ab5e33d531843826037cf2e3b834_l3.svg "Rendered by QuickLaTeX.com"), the effective length factor, depends on the end conditions of the column. For example, if both ends are pin-jointed (i.e., fixed but free to rotate), then ![K = 1.0](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-ac3bdbaf30c20f2710fdf99f6ae03381_l3.svg "Rendered by QuickLaTeX.com"). If both ends are rigidly fixed to prevent rotational movement (i.e., encastré), then ![K = 0.5](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-4e516eda1ce5a26b431409020645e576_l3.svg "Rendered by QuickLaTeX.com"), and the buckling force is twice as high. There are similar buckling formulae for plates and shells.

A structural member in a wing structure is an unsupported aluminum alloy column measuring 2.1 m in length. The member can be considered fully encastré at both ends and has a second moment of area of 0.18 cm![^{4}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-c01d379203831b68d72fd3d4d25a035a_l3.svg "Rendered by QuickLaTeX.com"). Find the force required to produce compressive buckling. Young’s modulus for the aluminum alloy material is 69.0 GPa.

Show solution/hide solution.

The Euler buckling load ![F\_c](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-9ae8147cfc232e3b58a5f236d5047803_l3.svg "Rendered by QuickLaTeX.com") can be calculated using

    ![\\\[ F\_c = \\frac {\\pi^{2} \\, E \\, I}{(K \\, L)^{2}} \\\]](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-3b3a951397ad1eec15b1b7371ee3f663_l3.svg "Rendered by QuickLaTeX.com")

In this case, the member is encastré at both ends, so ![K](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-23a3ab5e33d531843826037cf2e3b834_l3.svg "Rendered by QuickLaTeX.com") = 0.5. Inserting the known values and being careful to convert quantities to base SI units gives

    ![\\\[ F\_c = \\frac {\\pi^{2} \\, E \\, I}{(K \\, L)^{2}} = \\frac{ \\pi^2 \\, 69.0 \\times 10^9 \\times 0.18 \\times 10^{-4}} { (0.5 \\times 2.1)^2} = 1,112~\\mbox{kN} \\\]](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-26f7917d387d020fb4535cfa9948af59_l3.svg "Rendered by QuickLaTeX.com")    

# Thermal Considerations

Thermal expansion issues in aerospace structures may be a necessary consideration in airframe design. Spacecraft and aircraft structures can encounter wide swings in temperature, ranging from the cold of high altitudes or space to the kinetic heating in supersonic flight to the intense heat of atmospheric re-entry. When materials expand or contract in response to temperature changes, they can lead to significant structural stresses and potential failures if not properly managed.

Different materials expand at different rates, a property quantified by the coefficient of thermal expansion (CTE). In aerospace structures, materials with mismatched coefficients of thermal expansion (CTEs) can cause differential expansion or contraction, leading to stress concentrations at interfaces. For example, composites and metals in the same structure may expand or contract at different rates with temperature changes, potentially leading to delamination or cracking.

Engineers address these thermal issues through careful material selection, the design of joints and interfaces that accommodate movement, and the incorporation of thermal isolation or control techniques to minimize temperature gradients. A good example is the wing ribs used on Concorde, as shown in Figure 33. Some of the webs were made of pin-jointed rods, allowing the structure to expand thermally from kinetic heating in supersonic flight without creating high stresses; some stringers in the wing skins fitted in sliding joints in the ribs for the same reason. The Concorde also employed high-temperature stainless-steel honeycomb structural components. Today, advanced materials like carbon composites and thermal barrier coatings can mitigate thermal effects and enhance the durability of aerospace structures.

![](https://eaglepubs.erau.edu/app/uploads/sites/4/2024/05/Concorde_wingspar.png)

The Concorde’s wings were designed with pin-jointed and sliding joints to accommodate the airframe’s thermal expansion during supersonic flight.

Launch and re-entry vehicles are subject to high aerodynamic loads and severe kinetic heating, which pose additional challenges for structural design and material selection. Aerodynamic heating can significantly soften and weaken all materials at high temperatures. In addition to designing for strength and stiffness, additional measures may be required to protect the structure, such as [silica tiles on the Space Shuttle](https://en.wikipedia.org/wiki/Space_Shuttle_thermal_protection_system), to shield the airframe from kinetic heating during re-entry.

An example of a state-of-the-art spacecraft thermal protection system, based on an inflatable concept, is illustrated in Figure 34. A further engineering challenge is that these re-entry environments cannot be easily simulated on Earth or fully modeled analytically under the expected combined mechanical and thermal loads. Hence, the design risks are higher than for an aircraft.

A thermal protection system, also known as a heat shield, is a barrier that protects a spacecraft during atmospheric re-entry. It is usually made of an ablative material.

# Airframe Weight Estimation

A key goal in flight vehicle design is to achieve maximum performance while minimizing structural weight and cost. For a given aircraft type, its price is roughly proportional to its empty weight. However, this goal is not always so readily obtained in practice. In this regard, “cost” includes both the vehicle’s acquisition cost (i.e., its “price”) and its operational costs. A flight vehicle comprises many parts, generally grouped into major components or subassemblies, such as wings, fuselage, tail, undercarriage, and propulsion system. Of course, the weight of a new aircraft design is never known _a priori_ and must be obtained iteratively as an integral part of the design process.

For preliminary airframe design, weight estimates can be derived from historical data on existing aircraft, such as the approaches discussed by [Ramer](https://arc.aiaa.org/doi/book/10.2514/4.104909) and the related approaches documented by [Torenbeek](https://en.wikipedia.org/wiki/Egbert_Torenbeek) and [Roskam](https://en.wikipedia.org/wiki/Jan_Roskam). As the design process is refined, which will inevitably include computer-aided design (CAD), finite element methods (FEM), and computational fluid dynamics (CFD), the estimated weight of components and sub-assemblies can be obtained with greater accuracy. The effects of weight on performance and cost can then be reassessed, and the structural design can be iteratively refined toward closure. It should be recognized that the weight of an airframe design generally increases disproportionately with size (i.e., the so-called “[square-cube law](https://en.wikipedia.org/wiki/Square%E2%80%93cube_law)“), posing a significant design challenge, particularly for commercial aircraft.

Advanced materials and sophisticated manufacturing techniques may reduce material requirements and lower airframe weight. The additional design time and tooling investments required to achieve significant airframe weight savings may result in a higher airplane useful weight (i.e., more fuel load and/or payload), but not necessarily a lower acquisition cost. Nevertheless, the long-term economics of higher payloads and lower operational costs for airliners are very attractive to an aircraft operator such as an airline.

**What is the payload?**

Payload refers to the weight, ![W\_P](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-30870ec1c30168091abcd2e1326195c6_l3.svg "Rendered by QuickLaTeX.com"), carried on the aircraft that pays the bills. The payload comprises the passengers, their baggage, and cargo. The useful load, ![W\_{U}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-3301bc05d21eec4fbacb657cd2f3d67e_l3.svg "Rendered by QuickLaTeX.com"), comprises all on-board cargo and passengers that are not part of the aircraft’s empty weight, ![W \_ {E}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-4e93b3d36822ede61b4607ba9cae2976_l3.svg "Rendered by QuickLaTeX.com"). The empty weight comprises the airframe, engines, and all necessary flight systems. Fuel is not a payload; it is part of the useful load. Therefore, the useful weight, ![W\_{U}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-3301bc05d21eec4fbacb657cd2f3d67e_l3.svg "Rendered by QuickLaTeX.com"), is the sum of the payload weight, ![W\_P](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-30870ec1c30168091abcd2e1326195c6_l3.svg "Rendered by QuickLaTeX.com"), and the fuel weight, ![W\_F](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-653a247bb299b6ab44f9c72ba3be8330_l3.svg "Rendered by QuickLaTeX.com"), i.e.,

    ![\\\[ W\_{U} = W\_P + W\_F \\\]](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-13529fe1dcc5e66f2406a4184beb8c87_l3.svg "Rendered by QuickLaTeX.com")

The useful load and, hence, the payload weight can vary with aircraft type, intended flight or mission profile, operating altitude, and flight distance. For most aircraft, the payload and fuel load can be traded off against each other, allowing for more payload to be carried with a lower fuel load. Payload is an essential consideration for airlines because they need to have as much payload as possible but also ensure that they take sufficient fuel for the flight and do not exceed the maximum certified gross takeoff weight, ![W\_{\\rm \\scriptsize MGTOW}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-d03105f21427a0f70da58ebf5e007594_l3.svg "Rendered by QuickLaTeX.com"), for any given aircraft, i.e.,

    ![\\\[ W\_{E} + W\_{U} = W\_E + W\_P + W\_F  \\le W\_{\\rm \\scriptsize MGTOW} \\\]](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-a2739a1cdbde35083434c3eb7bc64db2_l3.svg "Rendered by QuickLaTeX.com")

# Square-Cube Law in Structural Design

The square-cube law provides a fundamental constraint on how structures behave when scaled to different sizes. Consider any structural member that is enlarged or reduced uniformly by a linear factor ![\\lambda](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-a5affa005706c3d1de297db37a4f491c_l3.svg "Rendered by QuickLaTeX.com"). If the original component has a characteristic length ![L](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-98eac87a0278698f73590e66c82b393b_l3.svg "Rendered by QuickLaTeX.com"), then the scaled version has length ![\\lambda L](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-7c8b862e3eed00b8aa5dd045c2010270_l3.svg "Rendered by QuickLaTeX.com"). Cross-sectional areas scale with ![\\lambda^2](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-bc24e049224e8ce6ba66ed766c6ce2a9_l3.svg "Rendered by QuickLaTeX.com"), while volumes and masses scale with ![\\lambda^3](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-19b590c200d7ff5838ceef97cdaa1a01_l3.svg "Rendered by QuickLaTeX.com"). Because structural loads typically scale with weight or inertia, they also increase with ![\\lambda^3](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-19b590c200d7ff5838ceef97cdaa1a01_l3.svg "Rendered by QuickLaTeX.com"). This reasoning is the origin of the so-called “square-cube” law in that the weight of a given design increases with the cube of its size as it is scaled up.

The square-cube law also applies to stresses. Let an original structural member have a cross-sectional area ![A\_0](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-465f45c74185dc74e93d6d9a1bdf03dc_l3.svg "Rendered by QuickLaTeX.com") and be subjected to a load ![P\_0](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-ea8b8e369d890aa6b6dd78771ca9ae29_l3.svg "Rendered by QuickLaTeX.com"). After scaling, the area becomes

(48)   ![\\begin{equation\*} A=\\lambda^2 \\, A\_0 \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-9650a0fc9eaecd09cda35129d9098619_l3.svg "Rendered by QuickLaTeX.com")

but the load becomes

(49)   ![\\begin{equation\*} P=\\lambda^3 \\, P\_0 \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-797794e09a63492a1dd963b4f4e65972_l3.svg "Rendered by QuickLaTeX.com")

and the resulting nominal stress scales as

(50)   ![\\begin{equation\*} \\sigma=\\frac{P}{A}=\\frac{\\lambda^3 \\, P\_0}{\\lambda^2 \\, A\_0}=\\lambda\\,\\sigma\_0 \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-3ef8d473d151c2c1e2a4defb571c2501_l3.svg "Rendered by QuickLaTeX.com")

Therefore, a geometrically similar structure becomes increasingly stressed as it grows, because stresses scale directly with size while material strength remains constant. Consequently, large structures must be proportionally thicker or differently proportioned; otherwise, they will fail under the loads.

Buckling follows directly from the same law. The buckling load of a column scales as ![P\_{\\mathrm{cr}}\\propto EI/L^2](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-22b1c25ef5f9b631614d2ce3a424f923_l3.svg "Rendered by QuickLaTeX.com"). Because ![I\\sim\\lambda^4](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-28aa1a5c58a61df7dae4f7106b3d1295_l3.svg "Rendered by QuickLaTeX.com") and ![L\\sim\\lambda](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-e2718eab4b137a89902cbc48c0531e72_l3.svg "Rendered by QuickLaTeX.com"), the critical load scales as ![\\lambda^2](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-bc24e049224e8ce6ba66ed766c6ce2a9_l3.svg "Rendered by QuickLaTeX.com"), yet the axial load from weight scales as ![\\lambda^3](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-19b590c200d7ff5838ceef97cdaa1a01_l3.svg "Rendered by QuickLaTeX.com"). Consequently, the safety margin against buckling decreases as the structure grows larger. Slender members that work well in small models often require significant stiffening, tapering, or material changes at larger scales. These scaling relationships explain why larger airplanes and longer-span wings cannot maintain geometric similarity, both external and internal, with their smaller counterparts; see Figure 35. Increased thickness, nonuniform reinforcement, and redesigned load paths are inevitable. Therefore, the square-cube law is a governing principle in structural engineering because the internal stress state does not scale with the geometric dimensions.

![](https://eaglepubs.erau.edu/app/uploads/sites/4/2024/05/structures_square-cube.png)

Scaling up an aircraft design poses challenges associated with the square-cube law.

A practical illustration of the square-cube law in aircraft design occurred when Boeing scaled up the 707 into the far larger 747. The wing of the 747, for example, experienced bending moments that increased much faster than its geometric proportions would suggest, and the fuselage frames similarly faced rapidly growing loads. The designers could not simply increase the thickness of every component by the same proportion; otherwise, the airplane would have been far too heavy to fly. Entire load paths had to be redesigned to achieve higher strength-to-weight ratios, and sandwich construction materials were used for the first time. Therefore, the transition from the 707 to the 747 demonstrated that large aircraft cannot be created by simply scaling up existing designs.

# Spacecraft Structures

Many of the structural design challenges for spacecraft are similar to those for aircraft, including the need for high-strength-to-weight materials, thin-walled construction, and reliable, low-cost manufacturing. However, spacecraft must also withstand distinct loading environments. The primary structural design issues occur during launch, where the vehicle is subjected to intense acoustic loading, high accelerations, broadband engine-induced vibration, and short-duration applied shocks.

These conditions are usually represented through equivalent mechanical loads applied to the spacecraft’s structure. For example, the quasi-static portion of the launch environment is modeled as an effective inertial force, i.e.,

(51)   ![\\begin{equation\*} F\_{\\text{qs}} = m\\,a\_{\\text{eff}} \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-2fc049069c963c15fd2041d2c2b4ea54_l3.svg "Rendered by QuickLaTeX.com")

where ![m](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-c0abc8dfdc87fbcb8eae841be74cc120_l3.svg "Rendered by QuickLaTeX.com") is the component mass and ![a\_{\\text{eff}}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-e77291cdb7bfa397bd5cb24e9cbb7a48_l3.svg "Rendered by QuickLaTeX.com") is the design acceleration level specified by the launch vehicle. The fluctuating acoustic field is treated as a spatially distributed pressure with an effective root-mean-square value of

(52)   ![\\begin{equation\*} p\_{\\text{RMS}} = \\sqrt{\\int\_{f\_1}^{f\_2} S\_{\\rm pp}(f)\\, df} \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-51025b8c5bda115080781248c3841f93_l3.svg "Rendered by QuickLaTeX.com")

where ![S\_{\\rm pp}(f)](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-156d09f5d7a52368881fb1c3b0f05e90_l3.svg "Rendered by QuickLaTeX.com") is the acoustic pressure spectral density over the frequency band ![f\_1](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-afa72176a829b1c699bb400b457da5b3_l3.svg "Rendered by QuickLaTeX.com") to ![f\_2](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-c2fca83652233eefdd58509b2d271917_l3.svg "Rendered by QuickLaTeX.com"). This pressure excites skin panels and internal components through broadband loading. Vibration from engines and aerodynamic forcing is represented through a base-acceleration spectrum ![a(f)](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-24f4dea11d1afaf87b942146383cfd67_l3.svg "Rendered by QuickLaTeX.com"), which produces modal inertial forces proportional to the effective modal mass ![m\_{\\text{eff}}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-74b8bdd42099f1493894232111117f7a_l3.svg "Rendered by QuickLaTeX.com") of each structural mode. Stage separation events are quantified using a [Shock Response Spectrum](https://en.wikipedia.org/wiki/Shock_response_spectrum), which provides the peak transient acceleration transmitted into brackets, mounts, and sensitive equipment. Together, these simplified representations capture the combined mechanical environment that typically governs the sizing of the primary spacecraft structure.

Once in orbit, the spacecraft experiences almost no aerodynamic loading but must endure extreme thermal gradients, long-duration creep (the slow, time-dependent deformation of materials under sustained stress), stress relaxation in structural and polymeric materials, and exposure to micrometeoroid and orbital debris impacts. Consequently, spacecraft structures require a combination of high stiffness, good buckling performance, dimensional stability, and damage tolerance.

Most spacecraft are constructed from metallic materials such as aluminum-lithium alloys, titanium, and stainless steel, along with composite sandwich panels for decks, equipment bays, and solar array substrates. These materials combine high specific stiffness with predictable thermal-cycling behavior. As with airplanes, semi-monocoque construction is widely used for spacecraft, with skins, stringers, and frames arranged to resist axial, bending, and shear loads through efficient load paths. Figure 36 below shows a machined aluminum shell with a triangular isogrid pattern. Isogrid and orthogrid patterns are commonly used in launch vehicle interstages, satellite cylinders, and fairings because they provide excellent buckling resistance and stiffness while minimizing structural mass.

![](https://eaglepubs.erau.edu/app/uploads/sites/4/2022/07/pressure_vessel.jpg)

This spacecraft’s structure employs a machined triangular isogrid pattern to enhance stiffness and buckling resistance.

A significant challenge in designing launch vehicles is the structural design of the propellant tanks, which must operate as large pressure vessels, often filled with cryogenic liquids. For a thin-walled cylindrical tank under internal pressure ![p](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-2418c813fdf0f4f92a9d29ca5a393f68_l3.svg "Rendered by QuickLaTeX.com"), the dominant membrane stresses depend on the tank radius ![R\_{\\text{tank}}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-83e860e8a88889cc636405f89471f649_l3.svg "Rendered by QuickLaTeX.com") and the wall thickness ![t\_{\\text{wall}}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-474cc0f6bbee8f5b4692112b3bf81c8a_l3.svg "Rendered by QuickLaTeX.com"). The hoop and longitudinal membrane stresses are

(53)   ![\\begin{equation\*} \\sigma\_{\\text{hoop}} = \\frac{p\\,R\_{\\text{tank}}}{t\_{\\text{wall}}} \\qquad \\text{and} \\qquad \\sigma\_{\\text{long}} = \\frac{p\\,R\_{\\text{tank}}}{2\\,t\_{\\text{wall}}} \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-c8eb70f4816a6e6f796dc703e023012b_l3.svg "Rendered by QuickLaTeX.com")

These relationships help explain why tank mass and structural strength demands grow with both radius and pressure. Cryogenic temperatures introduce additional structural issues, including thermal contraction and the embrittlement of some alloys. The thermal strain associated with a temperature change ![\\Delta T](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-45023598ebcc4aaa9498149d9256651b_l3.svg "Rendered by QuickLaTeX.com") can be modeled using

(54)   ![\\begin{equation\*} \\varepsilon\_{T} = \\alpha \\,\\Delta T \\end{equation\*}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-21295c4ca5f6e5c8dfd65444031a2f06_l3.svg "Rendered by QuickLaTeX.com")

where ![\\alpha](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-4bff83c0558a477fc87178d609989b31_l3.svg "Rendered by QuickLaTeX.com") is the coefficient of thermal expansion, so differential temperatures between tanks, feed lines, and supporting structures can cause large internal stresses. The most common cryogenic propellants include liquid hydrogen (LH2), liquid oxygen (LOX), and liquid methane (LCH4). Their storage tanks are fabricated from lightweight materials such as aluminum alloys, stainless steels, and advanced composites, and are equipped with multilayer insulation and vacuum jackets to minimize heat transfer. Hemispherical and cylindrical tank geometries promote uniform membrane stresses and delay buckling under internal pressure and bending loads.

Cryogenic tanks are essential components of major launch vehicles, including SpaceX’s Falcon 9 and NASA’s Space Launch System (SLS), as well as spacecraft intended for deep-space missions that require long-term propellant storage. An example of the liquid hydrogen tank used on NASA’s SLS rocket is shown in Figure 37. This tank uses friction welding, a solid-state joining process in which a rotating tool softens the material without melting it. The stirred material forms a high-quality weld with low distortion and excellent mechanical properties, improving reliability in critical load-carrying joints. Composite-overwrapped and all-composite cryogenic tanks are also being developed, although challenges remain in permeability, microcracking under thermal cycling, and long-term material compatibility with cryogenic propellants.

![](https://eaglepubs.erau.edu/app/uploads/sites/4/2024/05/rocket_LH_tanks.png)

The cryogenic liquid hydrogen fuel tank on NASA’s SLS is made of welded aluminum. (NASA images.)

Managing boil-off gases and maintaining the low temperatures of cryogenic propellants are continuing engineering challenges. These are addressed through combinations of passive insulation and active cooling systems. Tanks incorporate feed lines, valves, vent systems, and health-monitoring sensors to maintain a controlled propellant supply to the engines. Pressure relief devices prevent over-pressurization, and internal baffles help reduce propellant slosh loads during ascent. In addition to structural strength, designers must ensure compatibility with vacuum environments, outgassing limits, and long-term dimensional stability under repeated thermal cycles.

A rectangular equipment panel on a small spacecraft measures 0.40 m × 0.30 m and is supported along all four edges. The panel is made from an aluminum alloy with a thickness of 2.0 mm and a yield strength of 250 MPa. An 18 kg avionics box is mounted near the center of the panel. During launch, the specified quasi-static acceleration is 5g, and the acoustic environment produces an RMS pressure of 3.0 kPa on the panel’s exposed face. Using g = 9.81 m/s![^{2}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-5ec1dc4a8eafac80808a696c0224c320_l3.svg "Rendered by QuickLaTeX.com"), estimate: 1. The inertial load transmitted by the avionics box under the quasi-static acceleration; 2. The net acoustic force acting on the panel; 3. The maximum bending stress in the panel from the acoustic pressure, if modeled as a supported beam spanning 0.40 m; 4. Whether the acoustic loading is likely to cause the material holding the panel to reach its yield stress.

Show solution/hide solution.

(a) The quasi-static inertial load from the avionics box is

    ![\\\[ F\_{\\text{qs}} = m\\,a\_{\\text{eff}} = 18 \\times 5g \\approx 8.8 \\times 10^{2} \\text{ N} \\\]](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-721c8b403c5391ce6f78c843b9f1cacd_l3.svg "Rendered by QuickLaTeX.com")

(b) The panel area is

    ![\\\[ A = 0.40 \\times 0.30 = 0.12 \\text{ m}^2 \\\]](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-be16ee5c10f53f98f2e93454829aed8f_l3.svg "Rendered by QuickLaTeX.com")

The net acoustic force is

    ![\\\[ F\_{\\text{ac}} = p\_{\\text{RMS}}\\,A = 3.0 \\times 10^{3} \\times 0.12 \\approx 3.6 \\times 10^{2} \\text{ N} \\\]](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-1f8fbd41d9ca93aea697bf23eaae6c81_l3.svg "Rendered by QuickLaTeX.com")

(c) To estimate the stress, treat the panel as a supported beam of span ![L = 0.40 \\text{ m}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-6aabbf5fa1863ad8e5fe09ca7ba38d88_l3.svg "Rendered by QuickLaTeX.com"), width ![b = 0.30 \\text{ m}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-2ff8afe0e245abeb92cbf587886f62e0_l3.svg "Rendered by QuickLaTeX.com"), and thickness ![t = 0.002 \\text{ m}](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-bd781678e26f3b72e76dce902a53e556_l3.svg "Rendered by QuickLaTeX.com"). The distributed load is

    ![\\\[ q = p\_{\\text{RMS}}\\,b = 3.0 \\times 10^{3} \\times 0.30 = 9.0 \\times 10^{2} \\text{ N/m} \\\]](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-f6afec0cc6a3f12d46378171bfa9a445_l3.svg "Rendered by QuickLaTeX.com")

The maximum bending moment is

    ![\\\[ M\_{\\max} = \\frac{q L^{2}}{8} \\approx 18 \\text{ N m} \\\]](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-997bb041cb7774961a159c9423601ed0_l3.svg "Rendered by QuickLaTeX.com")

The second moment of area is

    ![\\\[ I = \\frac{b t^{3}}{12} = \\frac{0.30 \\times (0.002)^{3}}{12} = 2.0 \\times 10^{-10} \\text{ m}^{4} \\\]](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-7d77507d19e7e5b5dcc966d586181c65_l3.svg "Rendered by QuickLaTeX.com")

The bending stress is

    ![\\\[ \\sigma\_{\\max} = \\frac{M\_{\\max} (t/2)}{I} \\approx 9.0 \\times 10^{7} \\text{ Pa} = 90 \\text{ MPa} \\\]](https://eaglepubs.erau.edu/app/uploads/quicklatex/quicklatex.com-35ddb94cdf61425e0e4b1a29a21410f1_l3.svg "Rendered by QuickLaTeX.com")

(d) Because 90 MPa is well below the yield strength of 250 MPa, the panel does not yield under the acoustic loading. The inertial load from the mounted equipment is larger than the net acoustic force, while the panel’s stress response is governed by bending stiffness.

# Summary & Closure

Aerospace structures require a unique combination of strength and lightness. The finite element method (FEM) is widely used to design structures that meet specific requirements while minimizing weight. Stressed skin structures made of aluminum alloys have long been the dominant material in aerospace applications, providing the necessary strength and durability for most aircraft and spacecraft. However, composite materials, such as carbon fiber-reinforced polymers, have gained increasing popularity in recent years, particularly for primary structures like wings and fuselages. Using composites offers improved strength-to-weight ratios and greater structural design flexibility, making them an excellent alternative to aluminum alloys in many aerospace applications.

The design of spacecraft structures parallels that of aircraft in many ways. Advanced materials and fabrication techniques, such as carbon fiber composites and friction-stir welding, are used to achieve high strength-to-weight ratios. Spacecraft structures designed for cryogenic applications pose unique technical challenges because they must store and manage cryogenic propellants at extremely low temperatures, such as liquid hydrogen and oxygen. The design and engineering of spacecraft structures are critical to mission success, ensuring reliability and durability while optimizing for weight and efficiency.

-   List some of the relative advantages of wood and fabric airplane construction versus stressed metallic skin construction.
-   Research the manufacturing methods of making airplanes using conventional riveted construction.
-   What are the primary potential failure modes in aerospace structures, and how are they mitigated in design and manufacturing?
-   What are the fundamental differences between aerospace structures and structures in other engineering disciplines?
-   Discuss the challenges and considerations in designing flight vehicle structures for supersonic and hypersonic flight.

To learn more about flight vehicle structures, try some of these online resources:

-   [Video](https://www.youtube.com/watch?v=JltYcdVvzXE) lecture on aircraft structures and loads applied to an airframe.
-   A short [video](https://www.youtube.com/watch?v=pjLoM9bjWSo) explaining wooden airframe structures and the selection of the wood.
-   Great [video](https://www.youtube.com/watch?v=zhcxe_uG_Wo) lecture on aerospace structures: Airframe Basics.
-   Test your knowledge of the construction of an aircraft: [Engineering a Jetliner.](https://d3tt741pwxqwm0.cloudfront.net/WGBH/aeroeng/aeroeng-int-engdesign/index.html)
-   Lecture series on advanced aircraft structures by [Dr. Goyal](https://www.youtube.com/playlist?list=PLREHQnoFMsHABAKSvrSrei2Is2CWNbAOK).
-   [Learn how to buck a solid rivet](https://www.youtube.com/watch?v=1hB3rIECtxM) for an airplane structure.
-   Aircraft conversion XXL – [A cargo plane is born](https://www.youtube.com/watch?v=pMILhFItbSM).

---

1.  The author is grateful to his structures teacher, Professor Henry Wong. He was an engineer for the [Armstrong Siddeley Company](https://en.wikipedia.org/wiki/Armstrong_Siddeley), the [Hunting Percival Aircraft Company](https://en.wikipedia.org/wiki/Hunting_Aircraft), and the de Havilland Aircraft Company. Dr. Wong worked on investigations into the De Havilland Comet airliner crashes, during which significant advances were made in understanding metal fatigue. He was a Professor of Aeronautics and Fluid Mechanics at the University of Glasgow from 1960 to 1987. ↵
2.  A two-force member is a structural element in which the applied loads act only at its two ends, with no intermediate loads. Under these conditions, the member can carry only a single axial force, either tension or compression, and the internal force is constant along its entire length. Bending moments and shear forces _cannot_ exist in a two-force member. ↵

## License

![Icon for the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License](https://eaglepubs.erau.edu/app/themes/pressbooks-book/packages/buckram/assets/images/cc-by-nc-nd.svg)

[Introduction to Aerospace Flight Vehicles](https://eaglepubs.erau.edu/introductiontoaerospaceflightvehicles) Copyright © 2022–2026 by J. Gordon Leishman is licensed under a [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License](https://creativecommons.org/licenses/by-nc-nd/4.0/), except where otherwise noted.

## Share This Book
