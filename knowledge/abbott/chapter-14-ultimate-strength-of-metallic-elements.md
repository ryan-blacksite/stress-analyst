# Chapter 14: ULTIMATE STRENGTH OF METALLIC ELEMENTS

Source: https://www.abbottaerospace.com/aa-sb-001/14-ultimate-strength-of-metallic-elements/

## 14. ULTIMATE STRENGTH OF METALLIC ELEMENTS

Source URL: https://www.abbottaerospace.com/aa-sb-001/14-ultimate-strength-of-metallic-elements/

[Reference: Abbott, Richard. Analysis and Design of Composite and Metallic Flight Vehicle Structures 3 Edition, 2019](https://www.abbottaerospace.com/downloads/analysis-and-design/)

## 14.1. Introduction

Source URL: https://www.abbottaerospace.com/aa-sb-001/14-ultimate-strength-of-metallic-elements/14-1-introduction/

[Reference: Abbott, Richard. Analysis and Design of Composite and Metallic Flight Vehicle Structures 3 Edition, 2019](https://www.abbottaerospace.com/downloads/analysis-and-design/)

Most common metallic alloys used in aircraft structures can seemingly exceed the ultimate strength of the material.

This illusion depends on stresses derived using an elastic analysis. The material cannot exceed its ultimate stress but as the material is stressed beyond the proportional limit the local load can be redistributed.

This redistribution relies on local material at a lower strain (and therefore stiffer) for the load to locally transfer to.

Local regions of high strain, beyond the elastic limit, are generally caused by two situations: a) Significant bending and b) Geometric features causing stress concentrations.

## 14.1.1. Plastic Bending

Source URL: https://www.abbottaerospace.com/aa-sb-001/14-ultimate-strength-of-metallic-elements/14-1-introduction/14-1-1-plastic-bending/

[Reference: Abbott, Richard. Analysis and Design of Composite and Metallic Flight Vehicle Structures 3 Edition, 2019](https://www.abbottaerospace.com/downloads/analysis-and-design/)

These two different situations are dealt with by two different methods:

The classic bending hand analysis (or linear finite analysis) assumes a linear distribution of bending stress and strain through the thickness. Considering a rectangular section:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/07/515.png)

**Figure 14.1.1‑1: Linear Bending Stress and Strain Distribution Through the Thickness of a Rectangular Section**

For ductile materials, almost all metals, stress and strain are not linear up to the point of failure. As the proportional limit is exceeded the young’s modulus of the material reduces.  As the peak stress regions at the surface of the bending member exceed yield, the strain and the stress does not increase at the same rate. The outer fiber does not reach ultimate strength until material closer to the neutral axis sees an increased level of stress.

![](https://www.abbottaerospace.com/wp-content/uploads/2019/07/516.png)

**Figure 14.1.1‑2: Bending Stress Distribution Through the Thickness of a Rectangular Section Including Material Plasticity Effects.**

The plastic stress distribution can be approximated with the following stress distribution:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/07/517.png)

**Figure 14.1.1‑3: Assumed Trapezoidal Plastic Bending Stress Distribution Through the Thickness of a Rectangular Section.**

![](https://www.abbottaerospace.com/wp-content/uploads/2019/07/518.png)

**Figure 14.1.1‑4: Pictorial Representation of f**~**0**~  [(](https://www.abbottaerospace.com/wpdm-package/nasa-tm-x-73305-astronautics-structures-manual-volume-i)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[NASA TM X-73305, 1975)](https://www.abbottaerospace.com/wpdm-package/nasa-tm-x-73305-astronautics-structures-manual-volume-i)

f~m~ can be assumed to be equal to the ultimate strength (F~tu~) of the material. From Section 4.2.2.1 the stress-strain curve can be modelled in the following way:

f~0~ is the fictional stress which is assumed to exist at the neutral axis or at zero strain. The value of f~0~ is determined by making the requirement that the internal moment of the true stress variation must equal the moment of the assumed trapezoidal stress variation.

The total strain at failure can be expressed as the elastic strain added to the plastic strain. This is called the Ramberg-Osgood relationship  [(](https://www.abbottaerospace.com/wpdm-package/mil-hdbk-5h)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[MIL-HNDBK-5H, 1998)](https://www.abbottaerospace.com/wpdm-package/mil-hdbk-5h) Section 9.3.2.4 and  [(](https://www.abbottaerospace.com/wpdm-package/naca-tn-902-description-of-stress-strain-curve-by-three-parameters-ramberg-osgood)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[NACA-TN-902, 1943)](https://www.abbottaerospace.com/wpdm-package/naca-tn-902-description-of-stress-strain-curve-by-three-parameters-ramberg-osgood):

![](https://www.abbottaerospace.com/wp-content/uploads/2019/07/519.png)

The Ramberg-Osgood shape factor can be derived using the following relationship:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/07/520.png)

Where the plastic component of the total strain at failure is given by:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/07/521.png)

The ratio between f~0~ and a reference stress level f~m~ is given by the following expression:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/07/522.png)

When f~m~ is set to F~tu~, the f~0~ for ultimate plastic material strength can be found.

Once f~0~ has been found it can be used in the following expression to give the value of the ultimate bending strength:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/07/523.png)

Where F~b~ is the ultimate bending strength and k is a factor between 1.0 and 2.0 that depends on the geometry of the cross section.

A spreadsheet of this analysis method is given at the link below:

<table class=""><tbody><tr><td><img loading="lazy" decoding="async" width="30" height="30" class="wp-image-57936" style="width: 30px;" src="https://www.abbottaerospace.com/wp-content/uploads/2019/04/SPERADSHEET.png" alt=""> <strong><a rel="noreferrer noopener" aria-label="          &nbsp;     &nbsp;     AA-SM-025-001 Cozzone Theory of Plastic Bending     &nbsp;     &nbsp;     (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-025-001/" target="_blank">AA-SM-025-001 Cozzone Theory of Plastic Bending</a></strong></td></tr></tbody></table>

Note that in some references K _(capital ‘k’)_ = k – 1 _(lowercase ‘k’)_

The shape factor k (lowercase) is calculated by dividing the plastic section modulus by the elastic section modulus. This can also be expressed as:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/07/524.png)

![](https://www.abbottaerospace.com/wp-content/uploads/2019/07/525.png)

The shape factor calculations methods for common shapes is now included in [Section 6](https://www.abbottaerospace.com/aa-sb-001/6-section-properties/) of this book.

The following spreadsheet calculates ‘k’ for common cross sections:

<table class=""><tbody><tr><td><img loading="lazy" decoding="async" width="30" height="30" class="wp-image-57936" style="width: 30px;" src="https://www.abbottaerospace.com/wp-content/uploads/2019/04/SPERADSHEET.png" alt=""> <strong><a rel="noreferrer noopener" aria-label="          &nbsp;     &nbsp;     AA-SM-001-000 Section Properties           (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-001-000/" target="_blank">AA-SM-001-000 Section Properties</a></strong></td></tr></tbody></table>

The following spreadsheet calculates shape factor, ‘k’, of compound sections made up of rectangles as well as basic section properties:

<table class=""><tbody><tr><td><img loading="lazy" decoding="async" width="30" height="30" class="wp-image-57936" style="width: 30px;" src="https://www.abbottaerospace.com/wp-content/uploads/2019/04/SPERADSHEET.png" alt=""> <strong><a rel="noreferrer noopener" aria-label="          &nbsp; AA-SM-001-008 Section Properties - Cozzone Shape Factor 'k'     &nbsp;     (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-001-008/" target="_blank">AA-SM-001-008 Section Properties – Cozzone Shape Factor ‘k’</a></strong></td></tr></tbody></table>

## 14.1.2. Neuber Plastic Strain Method

Source URL: https://www.abbottaerospace.com/aa-sb-001/14-ultimate-strength-of-metallic-elements/14-1-introduction/14-1-2-neuber-plastic-strain-method/

[Reference: Abbott, Richard. Analysis and Design of Composite and Metallic Flight Vehicle Structures 3 Edition, 2019](https://www.abbottaerospace.com/downloads/analysis-and-design/)

The Neuber method for plasticity is based on the idea that the stress levels produced by finite element models that use a linear material model, in some circumstances, when they exceed the proportional limit, or yield stress, will be conservative and unrealistic.

This method is applicable to the stresses caused by stress concentrations created by geometric features and for the method to be applicable the following must be true:

1.  The finite element mesh should be fine enough to accurately predict the actual peak stress at the features.
2.  The material should be ductile enough to allow for local redistribution.
3.  There must be enough local material at a lower stress level to allow for local redistribution.
4.  The stress field should be largely linear, or uniaxial in nature.

The strain energy at the peak elastic stress should be calculated. The strain energy is the area under the linear stress-strain curve:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/07/526.png)

The intercept where the line of constant strain energy crosses the elasto-plastic stress-strain curve is taken to be the corrected plastic stress/strain state that will occur in the actual material, such that:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/07/527.png)

![](https://www.abbottaerospace.com/wp-content/uploads/2019/07/528.png)

**Figure 14.1.2‑1: Neuber Method for Correction of Plastic Stress from Linear Models**

It can be seen that the actual area under the elasto-plastic stress-strain curve is greater than the triangle given by the Neuber stress level and so this method is potentially conservative.

A spreadsheet of this analysis method is given at the link below:

<table class=""><tbody><tr><td><img loading="lazy" decoding="async" width="30" height="30" class="wp-image-57936" style="width: 30px;" src="https://www.abbottaerospace.com/wp-content/uploads/2019/04/SPERADSHEET.png" alt=""> <strong><a rel="noreferrer noopener" aria-label="          &nbsp;     &nbsp;     AA-SM-030 Neuber Elastic Stress Correction     &nbsp;     &nbsp;     &nbsp;     &nbsp;           (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-030/" target="_blank">AA-SM-030 Neuber Elastic Stress Correction</a></strong></td></tr></tbody></table>
