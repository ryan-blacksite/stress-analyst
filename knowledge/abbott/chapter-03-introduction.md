# Chapter 3: INTRODUCTION

Source: https://www.abbottaerospace.com/aa-sb-001/3-introduction/

## 3. INTRODUCTION

Source URL: https://www.abbottaerospace.com/aa-sb-001/3-introduction/

[Reference: Abbott, Richard. Analysis and Design of Composite and Metallic Flight Vehicle Structures 3 Edition, 2019](https://www.abbottaerospace.com/downloads/analysis-and-design/)

## 3.1. The Third Edition

Source URL: https://www.abbottaerospace.com/aa-sb-001/3-introduction/3-1-the-third-edition/

[Reference: Abbott, Richard. Analysis and Design of Composite and Metallic Flight Vehicle Structures 3 Edition, 2019](https://www.abbottaerospace.com/downloads/analysis-and-design/)

This book will always be a work in progress and the Third Edition builds on the foundations laid by the First and Second Editions. We have added chapters covering advanced beam analysis, torsion, general aircraft design, corrosion prevention more information on composite processes and material selection.

## 3.2. General Approach

Source URL: https://www.abbottaerospace.com/aa-sb-001/3-introduction/3-2-general-approach/

[Reference: Abbott, Richard. Analysis and Design of Composite and Metallic Flight Vehicle Structures 3 Edition, 2019](https://www.abbottaerospace.com/downloads/analysis-and-design/)

The aim of this document is to provide guidance to designers and stress engineers. The directions and recommendations in this document reflect the airworthiness regulations, industry best practices and the general experience of the author across several FAR part 23 & 25 metallic and composite aircraft programs.

The general approach for all analyses is shown below:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/image-140.png)

  

![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/image-300.png)

**Figure 1.5.1‑1: General Analysis Approach**

It must be noted and understood that all analysis methods, whether a simple or a complex hand analysis or simple or a complex finite element solution, are just mathematical models of the real world. All analysis results require checking and correlation to representative testing prior to the engineered product being used for any critical application. All analysis methods should be applied with skepticism and caution.

The applicability of all analysis methods must be understood before an assessment of their likely accuracy is made. Where reference is made back to testing in the cited source material, does the tested range cover the configuration you are analyzing? If the testing is not directly applicable to your engineering problem is it reasonable to assume the method is applicable? Do you have access to any other specific company, proprietary or public domain test results to confirm the suitability of the method? Is there a subject matter expert available to consult and advise? We supply the original references so that you can check on the range of applicable situations the method does applies to. Do not take anything for granted!

If the method you have chosen for the analysis is applicable, have you applied the method correctly? Is it error free? Sanity checking of your own work and peer review is essential. Just because you have a result you expect or wanted it does not mean that it is correct. An applicable modified idiom could be “The road to hell is paved with wishful thinking”. In the author’s experience, it is important to trust your instincts, if you obtain an analysis result that gives you cause for suspicion or is too good to be true, trust your instincts and go back and check, reanalyze and be sure you are correct.

In the end, the analyst must have confidence in the accuracy and applicability of their selected methods. In this document, we have tried to give cited sources for all critical aspects. We encourage everyone who uses this document to go to the original sources and understand the specific limitations of each analysis method. If you think that we have misinterpreted or misrepresented any of the source material, please let us know. If we make a change to a subsequent issue of the book we will give you footnote credit for helping us all better understand the analysis method.

## 3.3. Load, Flow and Stress

Source URL: https://www.abbottaerospace.com/aa-sb-001/3-introduction/3-3-load-flow-and-stress/

[Reference: Abbott, Richard. Analysis and Design of Composite and Metallic Flight Vehicle Structures 3 Edition, 2019](https://www.abbottaerospace.com/downloads/analysis-and-design/)

Fundamental to structures analysis are the ideas of load, flow and stress.

-   **Load** is a measure of force, a moment (which is regarded as a type of applied load) is a measure of twisting or bending force.
    
    -   lb (Load)
    
    -   inlb (Moment)
-   **Flow** is a measure of load or moment per length or width
    
    -   lb/in (Load Flow)
    
    -   inlb/in (Moment Flow)
-   **Stress** is a measure of load per area – or stress can be thought of as flow per thickness.
    -   lb/in^2^

The assessment of the effect of loads and moments on a structure, the derivation of relevant flows and stresses, and comparing these with appropriate failure criteria is the process of structures analysis.

The difference between load flow and stress is a useful distinction when interpreting hand analysis and finite element model results.

Using a cantilever shear beam as an example:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/09/329.png)

Consider a shear beam loaded with ‘V’. The beam has a width (or depth) of ‘W’ and a thickness of ‘t’.

Note that this example is statically determinate. i.e. the load transfer through the structure is not affected by stiffness.

The reaction load, _V_ is not changed by either _W_ or _t_ .

The Shear Load Flow _V/W_  is affected by the width of the beam but not the thickness.

And finally, the average shear stress:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/09/330.png)

 is affected by both the width and the thickness.

Conversely:

-   The reaction load is unaffected by changes in both the width and the thickness
-   The Flow is unaffected by the thickness

This is particularly important when the engineer is dealing with a finite element model using plate elements. If the engineer uses plate elements (and the model is ‘reasonably’ statically determinate) the model need not be re-run to consider webs of different thicknesses if load flow results are used from the model – _because the load flow is unaffected by the thickness_.

## 3.4.1. Measures of Stress

Source URL: https://www.abbottaerospace.com/aa-sb-001/3-introduction/3-4-stress-analysis/3-4-1-measures-of-stress/

[Reference: Abbott, Richard. Analysis and Design of Composite and Metallic Flight Vehicle Structures 3 Edition, 2019](https://www.abbottaerospace.com/downloads/analysis-and-design/)

**3.4.1.1. Uniaxial Stress**

Uniaxial Stress is a measure of the average axial load over the cross-sectional area of a structural member. Axial stress is achieved by an axial load applied along the axis of a straight member.

![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/image-11-1.png)

![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/image-12-1.png)

![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/image-130.png)

**Figure** **3.4.1‑1: Axial Stress**

Note that in this text we are using the symbol _f_ for axial stress. The Greek letter σ (sigma) is also often used for axial stress.

For the purposes of most analyses, the change in area of the cross-section caused by Poisson’s effect is not accounted for in the calculation of the value of stress.

This is in part due to the fact that most material strength data is calculated from test failure loads using the original cross section of the test article used to develop the strength data.

Ref  [(](https://www.abbottaerospace.com/wpdm-package/mil-hdbk-5h-metallic-materials-and-elements-for-aerospace-vehicle-structures)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT.png)[MIL-HNDBK-5H, 1998)](https://www.abbottaerospace.com/wpdm-package/mil-hdbk-5h-metallic-materials-and-elements-for-aerospace-vehicle-structures) Section 1.4.4.5 _“It should be noted that all stresses are based on the original cross-sectional area of the test specimen, without regard to the lateral contraction of the specimen, which actually occurs during the test.”_

**3.4.1.2. Bending Stress**

Bending stress occurs whenever a member is loaded ‘off axis’. Bending stress occurs around the neutral axis of the section. The neutral axis of the section experiences no bending stress effects and lies on the centroid of the cross section. The neutral axis, or plane, stays at a constant length under bending effects as it experiences zero strain.

The outer fiber of the cross section experiences the highest bending stress. The maximum bending stress is usually calculated at the outer fiber, at a distance ‘y’ from the neutral axis.

![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/image-14-1.png)

![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/image-16-1.png)

![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/image-17-1.png)

**Figure** **3.4.1‑2: Bending Stress – Cantilever Example with Point Load**

In the figure above, the example of a cantilevers is used. In a cantilever beam, the moment is developed over the length of the beam. The moment at any point along the cantilever beam is calculated by multiplying the load by the distance from the applied load to the point along the beam of interest.

It follows that the maximum moment occurs at the furthest point (towards the support) from the applied load.

You can download a spreadsheet that calculates the shear force and bending moment for a cantilever beam with a point load applied at the free end here:

<table class=""><tbody><tr><td><img loading="lazy" decoding="async" width="30" height="30" class="wp-image-57936" style="width: 30px;" src="https://www.abbottaerospace.com/wp-content/uploads/2019/04/SPERADSHEET.png" alt=""><a rel="noreferrer noopener" aria-label=" (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-026-001/" target="_blank"> </a><strong><a rel="noreferrer noopener" aria-label=" (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-026-001/" target="_blank">AA-SM-026-001 Beam Analysis – Cantilever – Point Load at End</a></strong><a rel="noreferrer noopener" aria-label=" (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-026-001/" target="_blank"></a></td></tr></tbody></table>

A comprehensive set of beam analysis methods is defined in [Section 8](https://www.abbottaerospace.com/aa-sb-001/8-beam-analysis/) of this book.

![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/image-19-1.png)

**Figure** **3.4.1‑3: Bending Stress – Cantilever Example with Applied Moment**

Note that the triangular distribution of bending stress through the thickness of the cantilever beam depends on material elasticity. In the case where the stress exceeds the proportional limit of the material plastic bending, see [section 14.1.1](https://www.abbottaerospace.com/aa-sb-001/14-ultimate-strength-of-metallic-elements/14-1-introduction/14-1-1-plastic-bending/).

For an initial assessment, it is conservative to assume the material remains perfectly elastic for predicted stress values.

**3.4.1.3. Shear Stress**

Shear Stress is the component of stress coplanar with the material cross section. In the case of a cantilever beam, the shear stress is constant along the length of the beam. This type of shear is called transverse shear.

Note that in this text we are using the symbol _f_ s for shear stress. The Greek letter τ (tau) is also often used to denote shear stress.

The distribution of shear stress in a beam does not affect the bending or axial stress distribution.

It is common to assume that the shear stress is constant across a cross section.

![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/image-20-1.png)

![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/image-21-1.png)

**Figure** **3.4.1‑4: Average Shear Stress Distribution**

Note that the use of the letter ‘V’ is used to denote a load that results in a shear reaction from the structure it is applied to. The nature of the applied load is the same whether ‘P’ or ‘V’ is used. The type of load induced in the structure from the applied load is different.

In reality, the shear stress varies across the cross section according to the following relationship:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/image-24-2.png)

The shear stress distribution for a rectangular cross section beam is shown below:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/image-25-1.png)

**Figure** **3.4.1‑5: Actual Shear Stress Distribution**

We have created several spreadsheets that calculate the parabolic shear distribution for common cross sections. These spreadsheets also calculate the average shear stress and compares the average shear stress with the peak parabolic shear stress:

<table class=""><tbody><tr><td><img loading="lazy" decoding="async" width="30" height="30" class="wp-image-57936" style="width: 30px;" src="https://www.abbottaerospace.com/wp-content/uploads/2019/04/SPERADSHEET.png" alt=""><a rel="noreferrer noopener" aria-label=" (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-041-011/" target="_blank"> </a><strong><a rel="noreferrer noopener" aria-label=" (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-041-011/" target="_blank">AA-SM-041-011 Stress Analysis – Shear Stress in an I-Beam</a></strong><a rel="noreferrer noopener" aria-label=" (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-041-011/" target="_blank"></a></td></tr></tbody></table>

<table class=""><tbody><tr><td><img loading="lazy" decoding="async" width="30" height="30" class="wp-image-57936" style="width: 30px;" src="https://www.abbottaerospace.com/wp-content/uploads/2019/04/SPERADSHEET.png" alt=""><a rel="noreferrer noopener" aria-label=" (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-041-012/" target="_blank"> </a><strong><a rel="noreferrer noopener" aria-label=" (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-041-012/" target="_blank">AA-SM-041-012 Stress Analysis – Shear Stress in a T-Beam</a></strong><a rel="noreferrer noopener" aria-label=" (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-041-012/" target="_blank"></a></td></tr></tbody></table>

<table class=""><tbody><tr><td><img loading="lazy" decoding="async" width="30" height="30" class="wp-image-57936" style="width: 30px;" src="https://www.abbottaerospace.com/wp-content/uploads/2019/04/SPERADSHEET.png" alt=""><a rel="noreferrer noopener" aria-label=" (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-041-013/" target="_blank"> </a><strong><a rel="noreferrer noopener" aria-label=" (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-041-013/" target="_blank">AA-SM-041-013 Stress Analysis – Shear Stress in a Circular Bar</a></strong><a rel="noreferrer noopener" aria-label=" (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-041-013/" target="_blank"></a></td></tr></tbody></table>

<table class=""><tbody><tr><td><img loading="lazy" decoding="async" width="30" height="30" class="wp-image-57936" style="width: 30px;" src="https://www.abbottaerospace.com/wp-content/uploads/2019/04/SPERADSHEET.png" alt=""><a rel="noreferrer noopener" aria-label=" (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-041-014/" target="_blank"> </a><strong><a rel="noreferrer noopener" aria-label=" (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-041-014/" target="_blank">AA-SM-041-014 Stress Analysis – Shear Stress in a Rectangular Bar</a></strong><a rel="noreferrer noopener" aria-label=" (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-041-014/" target="_blank"></a></td></tr></tbody></table>

## 3.4.2. Combined Stresses

Source URL: https://www.abbottaerospace.com/aa-sb-001/3-introduction/3-4-stress-analysis/3-4-2-combined-stresses/

[Reference: Abbott, Richard. Analysis and Design of Composite and Metallic Flight Vehicle Structures 3 Edition, 2019](https://www.abbottaerospace.com/downloads/analysis-and-design/)

If all structure were only loaded in one manner, or mode, failure would be relatively simple to accurately predict. In practice, a single applied point load can result in complex stress states in complex structure, and complex loading can result in complex stress states in simple structure.

There are many ways to interact stresses. In this text, the most commonly used are covered.

Note that the analyst rarely analyses three-dimensional stress states by hand. Most aircraft structures can be adequately analyzed if the structure is planar and the magnitude of stress or load in the third dimension is not significant.

Where the structure and internal loads are such that the stress state is significantly three dimensional, it is preferable to use finite element analysis to predict stresses.

Three-dimensional calculations for stress tensors are presented for information and interest only.

It is worth noting that these criteria are directly applicable to isotropic materials only.

**3.4.2.1. Principle Stresses**

The solution may be attained using equations or the graphical construction of Mohr’s circle.

When an element of the structure is subjected to combined stresses such as tension, compression and shear, it is often necessary to determine resultant maximum stress values and their respective principal axes.

Relative Orientation and Equations of Combined Stresses. Where:

-   f~x~ and f~y~ are applied normal stresses
-   f~s~ is applied shear stress
-   f~max~ and f~min~ are the resulting principal normal stresses
-   f~smax~ is the resulting principal shear stress
-   θ is the angle of the principal axes

Sign Convention:

-   Tensile Stress is positive
-   Compression Stress is negative
-   Shear Stress is positive as shown
-   Positive θ is counter clockwise as shown

**Principal Stresses in Two Dimensions**

The relationship between general and principal stresses on a plane element is shown in the following figure:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/image-26-1.png)

**Figure** **3.4.2‑1: Geometric Relationship of Applied Stresses to Principal Stresses**

Maximum principal stress:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/image-27-1.png)

Minimum Principal Stress:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/image-28-1.png)

The Angle of the principal stress field:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/image-29-1.png)

Maximum Shear Stress:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/image-30-1.png)

The relationship between the applied and principal stresses can be visualized using Mohr’s circle. See Section 3.4.3.1.

<table class=""><tbody><tr><td><img loading="lazy" decoding="async" width="30" height="30" class="wp-image-57936" style="width: 30px;" src="https://www.abbottaerospace.com/wp-content/uploads/2019/04/SPERADSHEET.png" alt=""><a rel="noreferrer noopener" aria-label=" (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-041-000/" target="_blank"> </a><strong><a rel="noreferrer noopener" aria-label=" (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-041-000/" target="_blank">AA-SM-041-000 Stress Analysis – 2D Principal Stresses</a></strong><a rel="noreferrer noopener" aria-label=" (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-041-000/" target="_blank"></a></td></tr></tbody></table>

Note. The principal strains are related to the principal stresses by the following expressions:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/image-32-1.png)

**Principal Stresses in Three Dimensions**

The principal stresses in 3 dimensions can be calculated using the following expression. It should be noted that these are rarely used in hand calculations and are given here for reference only

![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/image-33-1.png)

Where:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/image-34-1.png)

There is a spreadsheet you can download for this method at this link:

<table class=""><tbody><tr><td><img loading="lazy" decoding="async" width="30" height="30" class="wp-image-57936" style="width: 30px;" src="https://www.abbottaerospace.com/wp-content/uploads/2019/04/SPERADSHEET.png" alt=""><a rel="noreferrer noopener" aria-label=" (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-041-001/" target="_blank"> </a><strong><a rel="noreferrer noopener" aria-label=" (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-041-001/" target="_blank">AA-SM-041-001 Stress Analysis – 3D Principal Stresses</a></strong><a rel="noreferrer noopener" aria-label=" (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-041-001/" target="_blank"></a></td></tr></tbody></table>

**3.4.2.2. Von-Mises Stresses**

The Von-Mises stress is a resultant stress criterion that was initially developed to predict the point of yielding. In this case, the Von Mises stress is calculated and compared to the material yield stress allowable _Fty._

It is also acceptable to use the Von Mises stress to predict failure by comparison with the material ultimate stress allowable _Ftu_ .

It should be noted that because Von Mises stress is a resultant stress it is always positive regardless of the nature of the stress under examination, tension or compression.

Therefore, care must be taken when the Von Mises stress is used that compression stress effects (buckling, crippling) are not ignored because the stress appears positive (or tension).

**Von Mises Stress in Two Dimensions**

For general stresses:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/image-35-1.png)

Where the principal stresses are known

![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/image-36-1.png)

<table class=""><tbody><tr><td><img loading="lazy" decoding="async" width="30" height="30" class="wp-image-57936" style="width: 30px;" src="https://www.abbottaerospace.com/wp-content/uploads/2019/04/SPERADSHEET.png" alt=""><a rel="noreferrer noopener" aria-label="          &nbsp;     &nbsp;     AA-SM-041-020 Stress Analysis - 2D Von Mises Stress           (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-041-020/" target="_blank"> </a><strong><a rel="noreferrer noopener" aria-label="          &nbsp;     &nbsp;     AA-SM-041-020 Stress Analysis - 2D Von Mises Stress           (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-041-020/" target="_blank">AA-SM-041-020 Stress Analysis – 2D Von Mises Stress</a></strong><a rel="noreferrer noopener" aria-label="          &nbsp;     &nbsp;     AA-SM-041-020 Stress Analysis - 2D Von Mises Stress           (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-041-020/" target="_blank"></a></td></tr></tbody></table>

**Von Mises Stress in Three Dimensions**

For general stresses:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/09/331.png)

Where the principal stresses are known:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/09/332.png)

<table class=""><tbody><tr><td><img loading="lazy" decoding="async" width="30" height="30" class="wp-image-57936" style="width: 30px;" src="https://www.abbottaerospace.com/wp-content/uploads/2019/04/SPERADSHEET.png" alt=""> <strong><a rel="noreferrer noopener" aria-label="          &nbsp;     &nbsp;     AA-SM-041-021 Stress Analysis - 3D Von Mises Stress           (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-041-021/" target="_blank">AA-SM-041-021 Stress Analysis – 3D Von Mises Stress</a></strong><a rel="noreferrer noopener" aria-label="          &nbsp;     &nbsp;     AA-SM-041-021 Stress Analysis - 3D Von Mises Stress           (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-041-021/" target="_blank"></a></td></tr></tbody></table>

The two-dimensional Von Mises Stresses are generated for common cross-sections in the following spreadsheets:

<table class=""><tbody><tr><td><img loading="lazy" decoding="async" width="30" height="30" class="wp-image-57936" style="width: 30px;" src="https://www.abbottaerospace.com/wp-content/uploads/2019/04/SPERADSHEET.png" alt=""> <strong><a rel="noreferrer noopener" aria-label="AA SM 041 025 Stress Analysis Von Mises Stress Rectangular section                          No Torsion           (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-041-025/" target="_blank">AA SM 041 025 Stress Analysis Von Mises Stress Rectangular section No Torsion</a></strong><a rel="noreferrer noopener" aria-label="AA SM 041 025 Stress Analysis Von Mises Stress Rectangular section                          No Torsion           (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-041-025/" target="_blank"></a></td></tr></tbody></table>

<table class=""><tbody><tr><td><img loading="lazy" decoding="async" width="30" height="30" class="wp-image-57936" style="width: 30px;" src="https://www.abbottaerospace.com/wp-content/uploads/2019/04/SPERADSHEET.png" alt=""> <strong><a rel="noreferrer noopener" aria-label="AA SM 041 026 Stress Analysis Von Mises Stress Rectangular section    Incl Torsion           (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-041-026/" target="_blank">AA SM 041 026 Stress Analysis Von Mises Stress Rectangular section Incl Torsion</a></strong><a rel="noreferrer noopener" aria-label="AA SM 041 026 Stress Analysis Von Mises Stress Rectangular section    Incl Torsion           (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-041-026/" target="_blank"></a></td></tr></tbody></table>

<table class=""><tbody><tr><td><img loading="lazy" decoding="async" width="30" height="30" class="wp-image-57936" style="width: 30px;" src="https://www.abbottaerospace.com/wp-content/uploads/2019/04/SPERADSHEET.png" alt=""> <strong><a rel="noreferrer noopener" aria-label="AA SM 041 027 Stress Analysis Von Mises Stress Circular Tube section Incl Torsion           (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-041-027/" target="_blank">AA SM 041 027 Stress Analysis Von Mises Stress Circular Tube section Incl Torsion</a></strong><a rel="noreferrer noopener" aria-label="AA SM 041 027 Stress Analysis Von Mises Stress Circular Tube section Incl Torsion           (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-041-027/" target="_blank"></a></td></tr></tbody></table>

## 3.4.3. Failure Criteria

Source URL: https://www.abbottaerospace.com/aa-sb-001/3-introduction/3-4-stress-analysis/3-4-3-failure-criteria/

[Reference: Abbott, Richard. Analysis and Design of Composite and Metallic Flight Vehicle Structures 3 Edition, 2019](https://www.abbottaerospace.com/downloads/analysis-and-design/)

General use of failure envelopes; resulting stresses inside the envelope show adequate strength, those outside show inadequate strength:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/image-41-1.png)

**Figure 3.4.3‑1: General Application of Two-Dimensional Failure Envelopes**

The regions of the 2D principal stress plane correspond to the various possible modes of loading as follows (the Tresca Envelope is shown in this diagram for reference only):

![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/image-42-1.png)

**Figure 3.4.3‑2: Regions of 2D Principal Stress Field**

Most failure envelopes are plotted on a two-dimensional principal stress graph. This simplifies the approach as the shear stress is zero in the principal directions.

**3.4.3.1. Mohr’s Circle**

The definition of Mohr’s Circle is in part taken from  [(](https://www.abbottaerospace.com/wpdm-package/nasa-tm-x-73305-astronautics-structures-manual-volume-i)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT.png)[NASA TM X-73305, 1975).](https://www.abbottaerospace.com/wpdm-package/nasa-tm-x-73305-astronautics-structures-manual-volume-i)

![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/image-43-1.png)

**Figure 3.4.3‑3: Mohr’s Circle Definition**

The following text is taken directly from  [(](https://www.abbottaerospace.com/wpdm-package/nasa-tm-x-73305-astronautics-structures-manual-volume-i)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT.png)[NASA TM X-73305, 1975)](https://www.abbottaerospace.com/wpdm-package/nasa-tm-x-73305-astronautics-structures-manual-volume-i):

1.  Make a sketch of an element for which the normal and shearing stresses are known and indicate on it the proper sense of those stresses.
2.  Set up a rectangular coordinate system of axes where the horizontal axis is the normal stress axis, and the vertical axis is the shearing stress axis. Directions of positive axes are taken as usual, upwards and to the right.
3.  Locate the center of the circle which is on the horizontal axis at a distance of _(fx + fy)/_ 2 from the origin. Tensile stresses are positive, compressive stresses are negative
4.  From the right-hand face of the element prepared in step (1), read off the values for the f~x~ and f~s~ and plot the controlling point “a”. The coordinate distances to this point are measured from the origin. The sign of f~x~ is positive if tensile, negative if compressive; that of f~s~ is positive if upwards, negative if downward.
5.  Draw the circle with the center found in step (3) through controlling point “a” found in step (4). The two points of intersection of the circle with the normal-stress axis given the magnitudes and sing of the two principal stresses. If an intercept is found to be positive, the principal stress is tensile, and conversely.
6.  To find the direction of the principal stresses, connect point “a” located in step (4) with the intercepts found in step (5). The principal stress is given by the particular intercept found in step (5) acts normal to the line connecting this intercept point with the point “A” found in step (4)
7.  The solution of the problem may then be reached by orienting an element with the sides parallel to the lines found in step (6) and by indicating the principal stresses on this element.

To determine the maximum or the principal shearing stress and the associated normal stress:

1.  Determine the principal stresses and the planes on which they act per the previous procedure.
2.  Prepare a sketch of an element with its corners located on the principal axes. The diagonals of this element will this coincide with the directions of the principal stresses.
3.  The magnitude of the maximum (principal) shearing stresses acting on mutually perpendicular planes is equal to the radius of the circle. There shearing stresses act along the faces of the element prepared in step (2) towards the diagonal, which coincides with the direction of the algebraically normal stress.
4.  The normal stresses acting on all the faces of the element are equal to the average of the principal stresses, considered algebraically. The magnitude and sign of these stresses are also given by the distance from the origin of the coordinate system to the center of Mohr’s circle.

<table class=""><tbody><tr><td><img loading="lazy" decoding="async" width="30" height="30" class="wp-image-57936" style="width: 30px;" src="https://www.abbottaerospace.com/wp-content/uploads/2019/04/SPERADSHEET.png" alt=""><a rel="noreferrer noopener" aria-label="          &nbsp;     &nbsp;     AA-SM-041-030 Stress Analysis - Mohrs Circle           (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-041-030/" target="_blank"> </a><strong><a rel="noreferrer noopener" aria-label="          &nbsp;     &nbsp;     AA-SM-041-030 Stress Analysis - Mohrs Circle           (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-041-030/" target="_blank">AA-SM-041-030 Stress Analysis – Mohrs Circle</a></strong><a rel="noreferrer noopener" aria-label="          &nbsp;     &nbsp;     AA-SM-041-030 Stress Analysis - Mohrs Circle           (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-041-030/" target="_blank"></a></td></tr></tbody></table>

**3.4.3.2. Maximum Principal Stress Envelope**

The maximum principal stress envelope assumes that both the maximum and minimum principal stresses can occur at the same point simultaneously. This is likely to be optimistic and fail to predict material failure when it is likely to occur. For this reason, this envelope is not used for analysis purposes and is included here for information only.

![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/image-44-1.png)

**Figure 3.4.3‑4: Maximum Principal Stress Envelope**

In this envelope, the 45-degree line that illustrates the pure shear condition extends into a region beyond the typical shear strength of most materials.

**3.4.3.3. Tresca Criterion**

The Tresca Criterion is also called the maximum shear stress criteria.

![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/image-45-1.png)

**Figure 3.4.3‑5: Tresca Envelope**

For the Tresca Criterion, the allowable shear stress = the allowable tensile stress divided by two:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/image-46-1.png)

Or, assuming linear material behavior up to ultimate failure level:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/image-47-1.png)

This criterion regarding  shear stress is conservative for almost all metals as the shear strength is greater than half of the tensile strength.

The Tresca stress tensor (or the effective stress) should be compared to the allowable material strength. The Tresca stress tensor can be calculated from the principal stresses in the following way:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/image-48-1.png)

<table class=""><tbody><tr><td><img loading="lazy" decoding="async" width="30" height="30" class="wp-image-57936" style="width: 30px;" src="https://www.abbottaerospace.com/wp-content/uploads/2019/04/SPERADSHEET.png" alt=""><a rel="noreferrer noopener" aria-label="          &nbsp;     &nbsp;     AA-SM-041-031 Stress Analysis - Tresca           (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-041-031/" target="_blank"> </a><strong><a rel="noreferrer noopener" aria-label="          &nbsp;     &nbsp;     AA-SM-041-031 Stress Analysis - Tresca           (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-041-031/" target="_blank">AA-SM-041-031 Stress Analysis – Tresca</a></strong><a rel="noreferrer noopener" aria-label="          &nbsp;     &nbsp;     AA-SM-041-031 Stress Analysis - Tresca           (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-041-031/" target="_blank"></a></td></tr></tbody></table>

The Tresca criterion is conservative compared to the more realistic Von Mises Criterion.

**3.4.3.4. Von Mises Criterion**

The Von Mises criterion is also called the octahedral shear stress criterion. When plotted for plane stress states the Von Mises stress envelope is an ellipse.

![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/image-49-1.png)

For the Von Mises Criterion, the allowable shear stress = the allowable tensile stress divided by the square root of three.

![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/image-50-1.png)

Or, assuming linear material behavior up to ultimate failure level.

![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/image-51-1.png)

![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/image-52-1.png)

**Figure 3.4.3‑6: Von Mises Envelope**

<table class=""><tbody><tr><td><img loading="lazy" decoding="async" width="30" height="30" class="wp-image-57936" style="width: 30px;" src="https://www.abbottaerospace.com/wp-content/uploads/2019/04/SPERADSHEET.png" alt=""><a rel="noreferrer noopener" aria-label="          &nbsp;     &nbsp;     AA-SM-041-020 Stress Analysis - 2D Von Mises Stress           (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-041-020/" target="_blank"> </a><strong><a rel="noreferrer noopener" aria-label="          &nbsp;     &nbsp;     AA-SM-041-020 Stress Analysis - 2D Von Mises Stress           (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-041-020/" target="_blank">AA-SM-041-020 Stress Analysis – 2D Von Mises Stress</a></strong><a rel="noreferrer noopener" aria-label="          &nbsp;     &nbsp;     AA-SM-041-020 Stress Analysis - 2D Von Mises Stress           (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-041-020/" target="_blank"></a></td></tr></tbody></table>

The Von Mises criterion is considered generally representative for ductile materials and the relationship between _Fsu/Fsy_ and _Ftu/Fty_ is close enough for most analysis purposes.

## 3.4.4. Note on Practical Stress Analysis

Source URL: https://www.abbottaerospace.com/aa-sb-001/3-introduction/3-4-stress-analysis/3-4-4-note-on-practical-stress-analysis/

[Reference: Abbott, Richard. Analysis and Design of Composite and Metallic Flight Vehicle Structures 3 Edition, 2019](https://www.abbottaerospace.com/downloads/analysis-and-design/) ﻿

The various material failure criteria defined in this chapter are used for different reasons in a range of different situations. General stress analysis should not always reach for these solutions. Where the stress is predominantly uniaxial a simple comparison to _Fty_ or _Ftu_  is sufficient, or where the stress is predominantly shear, a comparison to _Fsy_  or _Fsu_ is sufficient.

The need to go to a plane stress criterion is dependent on the complexity of the stress field and the general magnitude of the stress, and is at the discretion of the engineer.
