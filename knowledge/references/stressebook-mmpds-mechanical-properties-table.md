# StressEbook — MMPDS Mechanical Properties Table Guide

Source: https://www.stressebook.com/mmpds-mechanical-properties-table/
Page title: Generic MMPDS Mechanical Properties Table
Retrieved: 2026-04-12T01:37:34.488Z

---

### Generic MMPDS Mechanical Properties Table – Decipher the Terms

In this post I will try to explain how to read and understand a generic MMPDS mechanical properties table. The material we will consider is Aluminum Alloy 2024-T351. It is one of the most commonly used materials in the aerospace industry. T351 here refers to the ‘Temper’ produced using heat treatment.

But first, let us look at the material grain directions L, LT and ST. In this case, we are looking at a rolled raw material plate of a big chunk of this metal alloy. Click the image below to learn more about the material and heat treat labels.

 **Grain Directions:**

We can see three different grain directions above:

1.  L Direction: This is the strongest ‘Long’ (L) direction along the dominant grain direction shown in blue in the figure above
2.  LT Direction: This is the orthogonal ‘Long Transverse’ (LT) grain direction in the plane of the plate, shown in red above
3.  ST Direction: Finally we have the ‘Short Transverse’ (ST) grain direction, the weakest grain direction shown in green above

So why did we first discuss the grain directions? Because these directions have a significant impact on the mechanical properties. If a part is manufactured using this rolled plate, the properties depend on the grain direction that the critical part feature lies along. A common example would be lugs or fittings machined from this plate. Now let us dig into the properties table itself. Shown below is an extract from the MMPDS document.

#### Al 2024-T351, Specification and Form:

We can see from the table above, the title at the top lists the name of the material and the raw material form (sheet and plate). Sheet forms are generally thinner, and plate forms are a bit thicker. Then come the material alloy procurement specifications (AMS specifications), raw material form (plate), the heat treat temper (T351), plate thickness (from 0.25″ thru 4.0″) and the statistical basis (A-Basis or B-Basis allowables).

**A-Basis:**

A-Basis allowable is the lower of either the statistically calculated number, or the specification minimum (S-Basis). The statistically calculated number indicates that at least 99% of the population values is expected to equal or exceed the A-Basis mechanical design property, with 95% confidence.

This value is generally lower than the B-Basis value. Without getting into too much detail, A-Basis is required when there is no redundant (or alternative) load path available to transfer the load in case of a primary load path member failure. For example, the lug of a fitting at the critical joint along the load path would require A-Basis allowable.

**B-Basis:**

B-Basis means at least 90% of the population of values is expected to equal or exceed the B-Basis mechanical design property allowables, with a confidence of 95% percent.

Again without getting into too much detail, B-Basis can be used with the approval of the approving authorities. It can be used when there is a redundant (or alternative) load path in case of a primary load path member failure. For example, a panel pin in a composite sandwich panel joint made from many panel pins has a redundant load path if one pin fails.

The T99 and T90 values are the one-sided lower 95% confidence bounds on the 1st and 10th percentiles. There is no difference in the statistical stringency.

(Credit for the above definitions: Mr. Doug Hall)

#### Al 2024-T351 Properties: Units in ksi (x10^3 psi)

**Ftu:** First mechanical property is Ftu, ultimate tensile strength. This is the value used in the most tensile section margin of safety calculations.

**Fty:** Then comes Fty, yield strength. This value must not be exceeded for limit loads (ultimate loads/1.5).

**Fcy:** Then comes Fcy, compressive yield strength. However the critical compressive stress is calculated using standard methods found in literature such as Bruhn and Niu.

**Fsu:** Then comes Fsu, ultimate shear strength. This value is used in shear margin of safety, or in interactive (tensile and shear interaction) margin of safety calculations.

**Fbru and Fbry:** Then we have Fbru and Fbry, ultimate and yield bearing strength values. These values are used in checking the material in bearing, such as a fastener bearing against the fastener hole. The selection of these values also depends on what is called e/D (edge distance ratio: hole center to edge distance ‘e’ over bolt hole diameter ‘D’).

**e%:** Then we have % elongation, this is the total strain percent at ultimate failure of the test coupon. Typically used to evaluate how much compliance the material has before failure.

### [Be Confident in Your Job & Interviews, Enroll Today…](https://www.stressebook.com/checkout/ "Finite Element Analysis Course")

[Become a MemberAerospace Engineering Courses!](https://www.stressebook.com/checkout/)

**Elastic Constants:** Finally we have the elastic constants, E, G and nu - Young's Modulus (x10^3 ksi) in this case is 10.7x10^6 psi, Shear Modulus (x10^3 ksi) in this case is 10.9x10^6 psi and Poisson's ratio of 0.33.

**Weight Density:** Finally at the bottom we see the material density (weight density not mass density), in this case it is 0.1 lbf/in^3. This value is critical when defining the material in the **[FEM Program](https://www.stressebook.com/finite-element-analysis/ "FEM Program")** for inertia loading and center of gravity, so make sure you get this right.

We generally do not worry about the thermal stuff.

ALRIGHT, I hope this gives you at least an idea of what the Generic MMPDS Mechanical Properties Table is all about, how to read and use it in real life.
