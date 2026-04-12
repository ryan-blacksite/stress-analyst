# Chapter 16: LOCAL STABILITY – COMPOSITE MATERIALS

Source: https://www.abbottaerospace.com/aa-sb-001/16-local-stability-composite-materials/

## 16. LOCAL STABILITY – COMPOSITE MATERIALS

Source URL: https://www.abbottaerospace.com/aa-sb-001/16-local-stability-composite-materials/

[Reference: Abbott, Richard. Analysis and Design of Composite and Metallic Flight Vehicle Structures 3 Edition, 2019.](https://www.abbottaerospace.com/downloads/analysis-and-design/)

## 16.2. Buckling of Laminates

Source URL: https://www.abbottaerospace.com/aa-sb-001/16-local-stability-composite-materials/16-2-buckling-of-laminates/

[Reference: Abbott, Richard. Analysis and Design of Composite and Metallic Flight Vehicle Structures 3 Edition, 2019.](https://www.abbottaerospace.com/downloads/analysis-and-design/)

Once the basic integrity of the laminate to withstand the internal strains created by the external loads is established other forms of failure mode must be considered.

Panel buckling is a criterion that can be considered either as a critical failure mode or a change of state that allows residual strength beyond the onset of buckling.

A buckle forces a load redistribution and secondary in-plane and out-of-plane load effects. These secondary effects that occur at the time of buckling and the effect that they have on especially adhesively bonded structure can propagate wider structural failure.

For this reason, many composite aircraft projects consider local buckling to be an ultimate level failure and design for no buckling up to ultimate load.

To search the [Abbott Aerospace Technical Library](https://www.abbottaerospace.com/technical-library/) for ‘Laminate Buckling’ click on the link below:

<table class="wp-block-table aligncenter"><tbody><tr><td><strong><a href="https://www.abbottaerospace.com/search/Laminate+Buckling" target="_blank" rel="noreferrer noopener" aria-label="Library Subject Search: Laminate Buckling (opens in a new tab)">Library Subject Search: Laminate Buckling</a></strong></td></tr></tbody></table>

## 16.2.1. Buckling of Un-Cored Laminates

Source URL: https://www.abbottaerospace.com/aa-sb-001/16-local-stability-composite-materials/16-2-buckling-of-laminates/16-2-1-buckling-of-un-cored-laminates/

[Reference: Abbott, Richard. Analysis and Design of Composite and Metallic Flight Vehicle Structures 3 Edition, 2019.](https://www.abbottaerospace.com/downloads/analysis-and-design/)

The methods below are taken from  [(](https://www.abbottaerospace.com/wpdm-package/mil-hdbk-17f)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[MIL-HDBK-17F Vol 3, 2002)](https://www.abbottaerospace.com/wpdm-package/mil-hdbk-17f) Section 5.7 and  [(](https://www.abbottaerospace.com/wpdm-package/nasa-tn-d-7996-buckling-of-composite-orthotropic-panels)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[NASA-TN-D-7996, 1975).](https://www.abbottaerospace.com/wpdm-package/nasa-tn-d-7996-buckling-of-composite-orthotropic-panels) The following caveats apply to the applicability of this analysis method:

_……._ _the closed form solutions of laminated orthotropic Panels are appropriate only when the lay-ups are **symmetrical and balanced**. Symmetrical implies identical corresponding plies about the Panel mid-surface. Balanced refers to having a minus \_ ply for every plus \_ ply on each side of the mid-surface. Symmetrical and balanced laminated Panels have B terms vanish and the D~16~ and D~26~ terms virtually vanish……._

Note that the buckling performance of a panel depends on the panel size, the rigidity of the panel edge constraints and the out-of-plane stiffness of the panel. The out-of-plane stiffness of the panel is expressed using the D matrix component of the laminate ABD matrix, see [section 4.1.6.1](https://www.abbottaerospace.com/aa-sb-001/4-materials/4-1-composite-materials/4-1-6-strength-of-laminates/) of this document for more information.

Note that these methods are not specifically limited to uncored laminates but the effect of the presence of core on the buckling solution can be significant depending on the characteristics of the core panel.

_Classical Panel theory is based up on the Kirchhoff hypothesis: “Normals to the mid-plane of the un-deformed Panel remain straight and normal to the mid-plane during deformation”. This assumption therefore ignores the transverse shear deformation. Consideration of the shear deformation results in added flexibility which becomes significant as the Panel thickness increases relative to the length and width. [(](https://www.abbottaerospace.com/wpdm-package/afwal-tr-85-3069)_![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)_[AFWAL-TR-85-3069, 1985)](https://www.abbottaerospace.com/wpdm-package/afwal-tr-85-3069)_

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/13-1.png)

**Figure 16.2.1‑1: The effect of Panel size to Thickness Ratio (a/h) on the Transverse Shear Influence of the Uniaxial Compression Buckling Allowable**  [**(**](https://www.abbottaerospace.com/wpdm-package/afwal-tr-85-3069)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**AFWAL-TR-85-3069, 1985)**](https://www.abbottaerospace.com/wpdm-package/afwal-tr-85-3069)

However, there are buckling predictions specifically for cored laminate panels and these are examined in section 16.2.2 of this document.

It is recommended that the analyst uses multiple methods, if they are available, so the results can be compared and correlated. It is also useful when the opportunity comes to test structures that have been designed using these methods as the test results can be used to help select the ‘best fit’ analysis for future work.

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/14-1.png)

Notes:

All of the following methods are for large aspect ratio panels. Note that for short aspect ratio panels these solutions will give conservative results.

These methods correlate well with test for b/t ratios greater than 35 – see figure on next page:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/15-1.png)

**Figure 16.2.1‑2: Predicted Classical Buckling Loads Compared to Experimental Data**  [**(**](https://www.abbottaerospace.com/wpdm-package/mil-hdbk-17f)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**MIL-HDBK-17F Vol 3, 2002)**](https://www.abbottaerospace.com/wpdm-package/mil-hdbk-17f)

For b/t ratios lower than 35, the N^cr^~x,I~ / N^cr^~x,cl~ ratio shows that the following methods will be significantly optimistic.

For this method to be accurate for a laminate panel of 0.040in thickness the b dimension would have to be greater than 0.040 x 35 = 1.4in.

This correlates to the difference in the predicted buckling performance between methods that account for transverse shear and those that do not, as shown in Figure 16.2.1‑1. The inaccuracy in this methodology is strongly influenced by the out-of-plane shear effect.

**16.2.1.1. Uniaxial Loading, Long Panel, All Sides Simply Supported**

(Aspect ratio >4)

For long plates the loaded edges can also be clamped and the allowable buckling stress will not be affected.

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/16-1.png)

**Figure 16.2.1‑3: Uniaxial Loaded Panel, SS all sides, Compression Bucking**  [**(**](https://www.abbottaerospace.com/wpdm-package/mil-hdbk-17f)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**MIL-HDBK-17F Vol 3, 2002)**](https://www.abbottaerospace.com/wpdm-package/mil-hdbk-17f)

The end load flow (lb/in) for the point of initial buckling is given by the following expression:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/17-1.png)

This method is available in the following spreadsheet:

<table class=""><tbody><tr><td><img loading="lazy" decoding="async" width="30" height="30" class="wp-image-57936" style="width: 30px;" src="https://www.abbottaerospace.com/wp-content/uploads/2019/04/SPERADSHEET.png" alt=""> <strong><a rel="noreferrer noopener" aria-label="AA-SM-103-002-001 Composites - Buckling of Laminates - Uniaxial 
 (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-103-002-001/" target="_blank">AA-SM-103-002-001 Composites – Buckling of Laminates – Uniaxial</a></strong> <strong><a rel="noreferrer noopener" aria-label="Long Plate SS  (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-103-002-001/" target="_blank">Long Plate SS</a></strong><a rel="noreferrer noopener" aria-label="Long Plate SS  (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-103-002-001/" target="_blank"> </a>&nbsp;</td></tr></tbody></table>

**16.2.1.2. Effect of Central Circular Hole on Simply Supported Compression Buckling Allowable** [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-tp-2528-approximate-buckling-analysis-for-ortho-rect-panels-with-central-cutouts)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA-TP-2528, 1986)**](https://www.abbottaerospace.com/wpdm-package/nasa-tp-2528-approximate-buckling-analysis-for-ortho-rect-panels-with-central-cutouts)**:**

An approximate solution for the effect of a circular hole on the compression buckling performance of a square panel is given by the following method. This method is defined by the reduction in K, the compression buckling coefficient. The value of K for the panel without a hole can be generated from the calculated compression buckling allowable using the following expression:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/18-1.png)

Where W is the width of the loaded edge of the panel – ‘b’ in standard nomenclature.

The effect on the compression buckling allowable for a simply supported Panel is given by this figure:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/19-1.png)

**Figure 16.2.1‑4: Effect of a Central Circular Hole on Axial Compression Buckling of a Simply Supported Orthotropic Panel**  [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-tp-2528-approximate-buckling-analysis-for-ortho-rect-panels-with-central-cutouts)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA-TP-2528, 1986)**](https://www.abbottaerospace.com/wpdm-package/nasa-tp-2528-approximate-buckling-analysis-for-ortho-rect-panels-with-central-cutouts)

The graph shows various results for different methods. The greatest overall reduction in K from all the curves will be used to generate a reduction factor that can be used to modify the K value or the compression buckling allowable directly.

This is expressed in the following figure:

(note that this reduction factor graph is in broad agreement with

  [(](https://www.abbottaerospace.com/wpdm-package/afwal-tr-85-3069)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[AFWAL-TR-85-3069, 1985)](https://www.abbottaerospace.com/wpdm-package/afwal-tr-85-3069) Figure 7.2.

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/20-1.png)

**Figure 16.2.1‑5: Effect of a Central Circular Hole on Axial Compression Buckling of a Simply Supported Orthotropic Panel**

The end load flow for the point of initial buckling for a panel with a central circular hole becomes:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/21-1.png)

This method is available in the following spreadsheet:

<table class=""><tbody><tr><td><img loading="lazy" decoding="async" width="30" height="30" class="wp-image-57936" style="width: 30px;" src="https://www.abbottaerospace.com/wp-content/uploads/2019/04/SPERADSHEET.png" alt=""> <strong><a rel="noreferrer noopener" aria-label="AA-SM-103-002-001 Composites - Buckling of Laminates - Uniaxial
 (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-103-002-001/" target="_blank">AA-SM-103-002-001 Composites – Buckling of Laminates – Uniaxia</a></strong><a rel="noreferrer noopener" aria-label="AA-SM-103-002-001 Composites - Buckling of Laminates - Uniaxial
 (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-103-002-001/" target="_blank">l</a> <strong><a rel="noreferrer noopener" aria-label="Long Plate SS with hole (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-103-002-001/" target="_blank">Long Plate SS with hole</a></strong> &nbsp;</td></tr></tbody></table>

**16.2.1.3. Uniaxial Loading, long Panel, all sides Fixed**

(Aspect ratio >4)

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/22-1.png)

**Figure 16.2.1‑6: Uniaxial loaded Panel, SS all sides, Compression Bucking**  [**(**](https://www.abbottaerospace.com/wpdm-package/mil-hdbk-17f)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**MIL-HDBK-17F Vol 3, 2002)**](https://www.abbottaerospace.com/wpdm-package/mil-hdbk-17f)

The end load flow for the point of initial buckling is given by this expression:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/23-1.png)

This method is available in the following spreadsheet:

<table class=""><tbody><tr><td><img loading="lazy" decoding="async" width="30" height="30" class="wp-image-57936" style="width: 30px;" src="https://www.abbottaerospace.com/wp-content/uploads/2019/04/SPERADSHEET.png" alt=""> <strong><a rel="noreferrer noopener" aria-label="AA-SM-103-002-002 Composites - Buckling of Laminates - Uniaxial
 (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-103-002-002/" target="_blank">AA-SM-103-002-002 Composites – Buckling of Laminates – Uniaxial</a></strong> <strong><a href="https://www.abbottaerospace.com/downloads/aa-sm-103-002-002/">Long Plate FF</a></strong> &nbsp;</td></tr></tbody></table>

**16.2.1.4. Effect of Central Circular Hole on Fully Fixed Compression Buckling Allowable**

An approximate solution for the effect of a circular hole on the compression buckling performance of a square panel with fully fixed edges is given by the following method:

The effect on the compression buckling allowable for a fully fixed Panel is given by this figure:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/24-1.png)

**Figure 16.2.1‑7: Effect of a Central Circular Hole on Axial Compression Buckling of Fully Fixed Orthotropic Panel**  [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-tp-2528-approximate-buckling-analysis-for-ortho-rect-panels-with-central-cutouts)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA-TP-2528, 1986)**](https://www.abbottaerospace.com/wpdm-package/nasa-tp-2528-approximate-buckling-analysis-for-ortho-rect-panels-with-central-cutouts)

The graph shows various results for different methods. It is recommended that the trace showing the greatest reduction is used. As there are a range of results comparing analysis and test methods, a conservative approximation over the critical data sets has been used with a cubic line of best fit:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/25-1.png)

**Figure 16.2.1‑8: Effect of a Central Circular Hole on Axial Compression Buckling of a Fully Fixed Orthotropic Panel**

The end load flow for the point of initial buckling for a panel with a central circular hole becomes:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/26-1.png)

This method is available in the following spreadsheet.

<table class=""><tbody><tr><td><img loading="lazy" decoding="async" width="30" height="30" class="wp-image-57936" style="width: 30px;" src="https://www.abbottaerospace.com/wp-content/uploads/2019/04/SPERADSHEET.png" alt=""> <strong><a rel="noreferrer noopener" aria-label=" AA-SM-103-002-002 Composites - Buckling of Laminates - Uniaxial
 (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-103-002-002/" target="_blank">AA-SM-103-002-002 Composites – Buckling of Laminates – Uniaxia</a></strong><a rel="noreferrer noopener" aria-label=" AA-SM-103-002-002 Composites - Buckling of Laminates - Uniaxial
 (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-103-002-002/" target="_blank">l</a> <strong><a rel="noreferrer noopener" aria-label=" Long Plate FF with hole (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-103-002-002/" target="_blank">Long Plate FF with hole</a></strong></td></tr></tbody></table>

**16.2.1.5. Uniaxial Loading, Long Panel, Three Sides Simply Supported and One Unloaded Edge Free**

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/27-1.png)

**Figure 16.2.1‑9: Uniaxial loaded Panel, SS three sides, Compression Bucking** [**(**](https://www.abbottaerospace.com/wpdm-package/mil-hdbk-17f)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**MIL-HDBK-17F Vol 3, 2002)**](https://www.abbottaerospace.com/wpdm-package/mil-hdbk-17f)

The end load flow for the point of initial buckling:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/28-1.png)

This method is available in the following spreadsheet:

<table class=""><tbody><tr><td><img loading="lazy" decoding="async" width="30" height="30" class="wp-image-57936" style="width: 30px;" src="https://www.abbottaerospace.com/wp-content/uploads/2019/04/SPERADSHEET.png" alt=""> <strong><a rel="noreferrer noopener" aria-label="AA-SM-103-002-003 Composites - Buckling of Laminates - Uniaxial
 (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-103-002-003/" target="_blank">AA-SM-103-002-003 Composites – Buckling of Laminates – Uniaxia</a></strong><a rel="noreferrer noopener" aria-label="AA-SM-103-002-003 Composites - Buckling of Laminates - Uniaxial
 (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-103-002-003/" target="_blank">l</a> <strong><a rel="noreferrer noopener" aria-label="Fixed-Free Edge  (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-103-002-003/" target="_blank">Fixed-Free Edge</a></strong><a rel="noreferrer noopener" aria-label="Fixed-Free Edge  (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-103-002-003/" target="_blank"> </a>&nbsp;</td></tr></tbody></table>

The following methods for shear buckling are more refined and give solutions for finite length panels covering a range of panel aspect ratios.

**16.2.1.6. Shear Loading, Panel with all sides simply supported**

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/29-1.png)

**Figure 16.2.1‑10: Shear Loaded Panel with Shear Buckle**  [**(**](https://www.abbottaerospace.com/wpdm-package/afwal-tr-85-3069)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**AFWAL-TR-85-3069, 1985)**](https://www.abbottaerospace.com/wpdm-package/afwal-tr-85-3069)

The shear buckling analysis method is taken from  [(](https://www.abbottaerospace.com/wpdm-package/nasa-tn-d-7996-buckling-of-composite-orthotropic-panels)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[NASA-TN-D-7996, 1975)](https://www.abbottaerospace.com/wpdm-package/nasa-tn-d-7996-buckling-of-composite-orthotropic-panels) which gives buckling solutions for shear and compression combinations. This paper gives the basic solution for shear buckling of a finite panel so we have used this as the best available reference. The general solution of the shear buckling equations can be expressed using the following parameter:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/30-1.png)

The parameter k~s~ is a function of only two variables:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/31-1.png)

Where: D~3~ = D~12~ + 2D~66~

And:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/32-1.png)

To find the k~s~ for panel with simply supported edges see Figure 16.2.1‑11:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/33-1.png)

**Figure 16.2.1‑11: Graphical Solution for k**~**s**~ **– Shear Buckling of Simply Supported Panels**  [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-tn-d-7996-buckling-of-composite-orthotropic-panels)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA-TN-D-7996, 1975)**](https://www.abbottaerospace.com/wpdm-package/nasa-tn-d-7996-buckling-of-composite-orthotropic-panels)

Therefore:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/34-1.png)

This method is available in the following spreadsheet:

<table class=""><tbody><tr><td><img loading="lazy" decoding="async" width="30" height="30" class="wp-image-57936" style="width: 30px;" src="https://www.abbottaerospace.com/wp-content/uploads/2019/04/SPERADSHEET.png" alt=""> <strong><a rel="noreferrer noopener" aria-label="AA-SM-103-002-006 Composites - Buckling of Laminates - Shear Finite 
 (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-103-002-006/" target="_blank">AA-SM-103-002-006 Composites – Buckling of Laminates – Shear Finite Plate SS</a></strong></td></tr></tbody></table>

To find the k~s~ for panel with fully fixed edges see Figure 16.2.1‑12:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/35-1.png)

**Figure 16.2.1‑12: Graphical Solution for k**~**s**~ **– Shear Buckling of Fully Fixed Panels**  [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-tn-d-7996-buckling-of-composite-orthotropic-panels)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA-TN-D-7996, 1975)**](https://www.abbottaerospace.com/wpdm-package/nasa-tn-d-7996-buckling-of-composite-orthotropic-panels)

For a panel with edges fixed in rotation the spreadsheet method is available here:

<table class=""><tbody><tr><td><img loading="lazy" decoding="async" width="30" height="30" class="wp-image-57936" style="width: 30px;" src="https://www.abbottaerospace.com/wp-content/uploads/2019/04/SPERADSHEET.png" alt=""> <strong><a rel="noreferrer noopener" aria-label="AA-SM-103-002-007  Composites - Buckling of Laminates - Shear Finite 
 (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-103-002-007/" target="_blank">AA-SM-103-002-007 Composites – Buckling of Laminates – Shear Finite Plate FF</a></strong> &nbsp;</td></tr></tbody></table>

Once Ks has been found graphically the equation for k~s~ can easily be rearranged to give the solution for N~xy~:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/36-1.png)

Note that this equation is a similar form to the buckling equation for isotropic Panel buckling from [(](https://www.abbottaerospace.com/download/reference_data/bruhn_naca_papers/naca-tn-3781.pdf)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[NACA-TN-3781, 1957)](https://www.abbottaerospace.com/download/reference_data/bruhn_naca_papers/naca-tn-3781.pdf), shown in its general form below:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/37-1.png)

The equivalent terms that express the out-of-plane stiffness of the Panel are:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/38-1.png)

**16.2.1.7. Interaction of Compression and Shear Buckling Effects**

Ref [(](https://www.abbottaerospace.com/wpdm-package/nasa-tn-d-7996-buckling-of-composite-orthotropic-panels)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[NASA-TN-D-7996, 1975)](https://www.abbottaerospace.com/wpdm-package/nasa-tn-d-7996-buckling-of-composite-orthotropic-panels) shows comparison between a set of analyses and a linear/squared interaction. This demonstrates that using the mathematical approximation of the compression buckling reserve factor and the square of the shear buckling reserve factor is conservative.

This approach is confirmed in [(](https://www.abbottaerospace.com/wpdm-package/nasa-cr-2330-elastic-stability-of-laminated-flat-and-curved-plates)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[NASA CR-2330, 1974)](https://www.abbottaerospace.com/wpdm-package/nasa-cr-2330-elastic-stability-of-laminated-flat-and-curved-plates).

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/39-1.png)

**Figure 16.2.1‑13: Graphical Comparison of Analysis vs Mathematical Solution for Compression and Shear Buckling Effects**  [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-tn-d-7996-buckling-of-composite-orthotropic-panels)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA-TN-D-7996, 1975)**](https://www.abbottaerospace.com/wpdm-package/nasa-tn-d-7996-buckling-of-composite-orthotropic-panels)

This interaction method is available as a spreadsheet solution here:

<table class=""><tbody><tr><td><img loading="lazy" decoding="async" width="30" height="30" class="wp-image-57936" style="width: 30px;" src="https://www.abbottaerospace.com/wp-content/uploads/2019/04/SPERADSHEET.png" alt=""> <strong><a rel="noreferrer noopener" aria-label="AA-SM-103-002-008 Composites - Buckling of Laminates - Shear
 (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-103-002-008/" target="_blank">AA-SM-103-002-008 Composites – Buckling of Laminates – Shear</a></strong> <strong><a rel="noreferrer noopener" aria-label="Compression Buckling Interaction (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-103-002-008/" target="_blank">Compression Buckling Interaction</a></strong> &nbsp;</td></tr></tbody></table>

**16.2.1.8. Note on Post-Buckling and Crippling**

As noted at the start of this chapter it is common to keep composite structure non-buckling up to ultimate load. Post buckling effects will not be covered in this edition. Crippling is a post buckling failure mode thus it will not be covered.

**It is recommended that all composite primary structure be kept non-buckling up to ultimate load.**

## 16.2.2. Stability of Cored Laminates

Source URL: https://www.abbottaerospace.com/aa-sb-001/16-local-stability-composite-materials/16-2-buckling-of-laminates/16-2-2-stability-of-cored-laminates/

[Reference: Abbott, Richard. Analysis and Design of Composite and Metallic Flight Vehicle Structures 3 Edition, 2019.](https://www.abbottaerospace.com/downloads/analysis-and-design/)

**15.2.2.1. Introduction**

The fundamental purpose of cored laminate is to achieve a disproportionate increase in out-of-plane stiffness when compared to the weight increase. This particular increase in property makes cored panels more resistant to panel buckling effects.

Panel buckling is just one of a set of stability failure modes that cored laminates can experience. The critical failure mode depends on the type of core (honeycomb or foam), the thickness and material properties of the core, the material and thickness of the face sheets and the overall panel dimensions.

The failure modes that will be covered in this section are:

**Global Mode: (Panel) Buckling**

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/40-1.png)

**Figure 16.2.2‑1: Sandwich Panel Buckling**  [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-208994-facesheet-wrinkling-in-sandwich-structures)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA/CR-1999-208994, 1999)**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-208994-facesheet-wrinkling-in-sandwich-structures)

**Global Mode: Shear Crimping**

Shear crimping appears to be a local mode of failure but is actually a form of general overall buckling in which the wavelength of the buckles is very small because of low core shear modulus. The crimping of the sandwich occurs suddenly and usually causes the core to fail in shear at the crimp. It may also cause shear failure in the bond between the facing and  core.

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/41-1.png)

**Figure 16.2.2‑2: Sandwich Panel Shear Crimping**  [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-208994-facesheet-wrinkling-in-sandwich-structures)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA/CR-1999-208994, 1999)**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-208994-facesheet-wrinkling-in-sandwich-structures)

Crimping may also occur in cases where the overall buckle begins to appear and then the crimp occurs suddenly because of severe local shear stresses at the ends of the overall buckle. A**s** soon as the crimp appears, the overall buckle may disappear. Therefore, although examination of the failed sandwich indicates crimping or shear instability, failure may have begun by overall buckling that finally caused crimping.

**Local Mode: Facesheet Dimpling**

If the core is of cellular (honeycomb) or corrugated material, it is possible for the facings to buckle or dimple into the spaces between core walls or corrugations as shown below:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/42-1.png)

**Figure 16.2.2‑3: Sandwich Panel Facesheet Dimpling**  [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-208994-facesheet-wrinkling-in-sandwich-structures)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA/CR-1999-208994, 1999)**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-208994-facesheet-wrinkling-in-sandwich-structures)

Dimpling may be severe enough so that the amplitude of the dimples may be large enough to cause the dimples to grow across the core cell walls and result in a wrinkling of the facings.

**Local Mode: Facesheet Wrinkling**

Wrinkling may occur if a sandwich facing subjected to edgewise compression buckles as a panel on an elastic foundation. The facing may buckle inward or outward, depending on the flatwise compressive strength of the core relative to the flatwise tensile strength of the bond between the facing and core. If the bond between facing and core is strong, facings can wrinkle and cause tension failure in the core. Thus, the wrinkling load depends upon the elasticity and strength of the foundation system; namely, the core and the bond between facing and core. Since the facing is never perfectly flat, the wrinkling load will also depend upon the initial eccentricity of the facing or original waviness.

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/43-1.png)

**Figure 16.2.2‑4: Sandwich panel Facesheet Wrinkling**  [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-208994-facesheet-wrinkling-in-sandwich-structures)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA/CR-1999-208994, 1999)**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-208994-facesheet-wrinkling-in-sandwich-structures)

**Other Local Failure modes:**

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/44-1.png)

**Figure 16.2.2‑5: Core Crushing**  [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels-2)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA CR-1457, 1969)**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels-2)

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/45-1.png)

**Figure 16.2.2‑6: Tensile Rupture of Bond** [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels-2)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA CR-1457, 1969)**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels-2)

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/46-1.png)

**Figure 16.2.2‑7: Tensile Rupture of Core Proper**  [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels-2)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA CR-1457, 1969)**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels-2)

**Note:**

It is important to note that all of these failure modes can result in catastrophic global failure of the panel. A sandwich panel is dependent on the cohesion of the face sheets and the core and the local failure modes can initiate global failure modes. Because of the out-of-plane stiffness of the sandwich panel, the secondary loads generated by the buckling failure modes are often significant and catastrophic.

**General Panel Nomenclature:**

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/113-1.png)

**Figure 16.2.2‑8: Sandwich Panel Nomenclature and Thickness Notation**  [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels-2)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA CR-1457, 1969)**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels-2)

**16.2.2.2. Global Mode: Panel Buckling**

The panel buckling methods are taken from [(](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels-2)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[NASA CR-1457, 1969)](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels-2). This reference gives solutions for orthotropic and isotropic facings. Much of the work on buckling of sandwich panels, and the work on sandwich panels in general, originate in the US Forest Product Laboratory reports and their pioneering work done in the 1950s and 1960s. We have collected the relevant reports and host them on our website, they can be found **[here](https://www.abbottaerospace.com/).**

**16.2.2.3. Sandwich Panel Compression Buckling**

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/114-1.png)

**Figure 16.2.2‑9: Shear Buckling Load Application and Nomenclature**  [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels-2)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA CR-1457, 1969)**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels-2)

The load per unit panel width at which buckling of a sandwich panel will occur is given by the theoretical formula:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/115-1.png)

Where N~cr~ is the allowable load flow (lb/in).

The D~11~ term from the D matrix of the laminate can be used for ‘D’ in the expression above.

Solved for face sheet stresses:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/116-1.png)

For sandwich panels with equal face sheets:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/118-1.png)

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/119.png)

As noted above the buckling coefficient for the panel under this loading condition is given by the equation:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/120.png)

Where:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/121.png)

K~M0~ is given by the following figure:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/122.png)

**Figure 16.2.2‑10: K**~**M0**~ **for Sandwich Panels with Isotropic Facings in Edgewise Compression**  [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels-2)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA CR-1457, 1969)**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels-2)

The values of K~F~ are generally small relative to K~M~. As safe first approximation is to assume K~F~ is equal to zero unless the margin of safety is low.

For sizing it is safe to assume K = K~M~.

K~M0~ = K~M~ when V = 0, see definition of V below, and when a/b > 1.0 it can be assumed K~F~ = 0.

The value of K~M~ is related to the bending shear rigidity parameter V:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/123.png)

Where

U = Sandwich transverse shears stiffness, defined as:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/124.png)

V can also be defined in terms of the geometry and properties of the face sheets and core:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/125.png)

Where:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/126.png)

Having the necessary physical properties of the panel defined, the K value and the buckling allowable can be derived.

The basic cored panel physical properties can be calculated using this spreadsheet:

<table class=""><tbody><tr><td><img loading="lazy" decoding="async" width="30" height="30" class="wp-image-57936" style="width: 30px;" src="https://www.abbottaerospace.com/wp-content/uploads/2019/04/SPERADSHEET.png" alt=""> <strong><a rel="noreferrer noopener" aria-label="AA-SM-102-001 Composites - Cored Laminate Basic Stiffness
 (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-102-001/" target="_blank">AA-SM-102-001 Composites – Cored Laminate Basic Stiffness</a></strong> <strong><a rel="noreferrer noopener" aria-label="Properties (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-102-001/" target="_blank">Properties</a></strong></td></tr></tbody></table>

**Derivation of K~M~ for cored panels in compression**

 [(](https://www.abbottaerospace.com/wpdm-package/fpl-070)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[FPL-070, 1964)](https://www.abbottaerospace.com/wpdm-package/fpl-070) gives a mathematical derivation of compression buckling coefficients for cored panels. The full derivation will not be given in this text but the math is implemented in the spreadsheet below. The curves for K~M~ have been developed using this reference and reference curves for isotropic core for α= 1.00, β= 1.00 and γ = 0.375 are given in this spreadsheet:

<table class=""><tbody><tr><td><img loading="lazy" decoding="async" width="30" height="30" class="wp-image-57936" style="width: 30px;" src="https://www.abbottaerospace.com/wp-content/uploads/2019/04/SPERADSHEET.png" alt=""> <strong><a rel="noreferrer noopener" aria-label="AA-SM-102-092 Composites - Derivation of Cored Panel Compression
 (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-102-092/" target="_blank">AA-SM-102-092 Composites – Derivation of Cored Panel Compression</a></strong> <strong><a rel="noreferrer noopener" aria-label="Buckling Coefficients (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-102-092/" target="_blank">Buckling Coefficients</a></strong></td></tr></tbody></table>

The reference curves for cored panel compression buckling from

  [(](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels-2)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[NASA CR-1457, 1969)](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels-2) are shown below. The general solution, mathematically derived per  [(](https://www.abbottaerospace.com/wpdm-package/fpl-070)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[FPL-070, 1964)](https://www.abbottaerospace.com/wpdm-package/fpl-070) for all panels is given in the following spreadsheet:

<table class=""><tbody><tr><td><img loading="lazy" decoding="async" width="30" height="30" class="wp-image-57936" style="width: 30px;" src="https://www.abbottaerospace.com/wp-content/uploads/2019/04/SPERADSHEET.png" alt=""> <strong><a rel="noreferrer noopener" aria-label="AA-SM-102-003 Composites - Determination of KM for Cored Panel
 (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-102-003/" target="_blank">AA-SM-102-003 Composites – Determination of KM for Cored Pane</a></strong><a rel="noreferrer noopener" aria-label="AA-SM-102-003 Composites - Determination of KM for Cored Panel
 (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-102-003/" target="_blank">l</a> <strong><a href="https://www.abbottaerospace.com/downloads/aa-sm-102-003/">Compression Buckling</a></strong></td></tr></tbody></table>

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/image-4.png)

**Figure 16.2.2‑11: Spreadsheet for General Solution of K**~**M**~ **for Cored Panel Compression Buckling**

The sandwich panel compression buckling coefficient figures are given below, it is recommended that the spreadsheet method is used to determine the compression buckling coefficient. The following figures should be used for comparison and checking.

In the following figures the term ‘R’ is used, this is the degree of core shear modulus orthotropicity (G~ca~/G~cb~).

**16.2.2.4. Sandwich Panel Compression Buckling Coefficients for Panels with Isotropic Facings and Isotropic Core**

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/127.png)

**Figure 16.2.2‑12: Sandwich Panel Compression Buckling, Isotropic Facings, Isotropic Core, All Sides Simply Supported**  [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels-2)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA CR-1457, 1969)**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels-2)

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/128.png)

**Figure 16.2.2‑13: Sandwich Panel Compression Buckling, Isotropic Facings, Isotropic Core, Ends Simply Supported, Sides Clamped**  [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels-2)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA CR-1457, 1969)**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels-2)

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/129.png)

**Figure 16.2.2‑14: Sandwich Panel Compression Buckling, Isotropic Facings, Isotropic Core, Sides Simply Supported, Ends Clamped**  [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels-2)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA CR-1457, 1969)**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels-2)

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/130.png)

**Figure 16.2.2‑15: Sandwich Panel Compression Buckling, Isotropic Facings, Isotropic Core, All Sides Clamped** [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA CR-1457, 1969)**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)

**16.2.2.5. Sandwich Panel Compression Buckling Coefficients for Panels with Isotropic Facings and Orthotropic Core (R=0.40):**

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/131.png)

**Figure 16.2.2‑16: Sandwich Panel Compression Buckling, Isotropic Facings, Orthotropic Core (R=0.40), All Sides Simply Supported** [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA CR-1457, 1969)**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/132.png)

**Figure 16.2.2‑17: Sandwich Panel Compression Buckling, Isotropic Facings, Orthotropic Core (R=0.40), Ends Simply Supported, Sides Clamped**  [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA CR-1457, 1969)**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/133.png)

**Figure 16.2.2‑18: Sandwich Panel Compression Buckling, Isotropic Facings, Orthotropic Core (R=0.40),  Sides Simply Supported, Ends Clamped**  [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA CR-1457, 1969)**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/134.png)

**Figure 16.2.2‑19: Sandwich Panel Compression Buckling, Isotropic Facings, Orthotropic Core (R=0.40), All Sides Clamped** [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA CR-1457, 1969)**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)

**16.2.2.6. Sandwich Panel Compression Buckling Coefficients for Panels with Isotropic Facings and Orthotropic Core (R=2.50):**

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/135.png)

**Figure 16.2.2‑20: Sandwich Panel Compression Buckling, Isotropic Facings, Orthotropic Core (R=2.50), All Sides Simply Supported** [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA CR-1457, 1969)**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/136.png)

**Figure 16.2.2‑21: Sandwich Panel Compression Buckling, Isotropic Facings, Orthotropic Core (R=2.50), Ends Simply Supported, Sides Clamped** [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA CR-1457, 1969)**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/137.png)

**Figure 16.2.2‑22: Sandwich Panel Compression Buckling, Isotropic Facings, Orthotropic Core (R=2.50),  Sides Simply Supported, Ends Clamped** [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA CR-1457, 1969)**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/138.png)

**Figure 16.2.2‑23: Sandwich Panel Compression Buckling, Isotropic Facings, Orthotropic Core (R=2.50), All Sides Clamped** [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA CR-1457, 1969)**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)

**16.2.2.7. Sandwich Panel Shear Buckling**

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/139.png)

**Figure 16.2.2‑24: Shear Buckling Load Application and Nomenclature** [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA CR-1457, 1969)**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)

The base theory for the expression for buckling is the same as defined for the compression buckle in section 16.2.2.3.

The load per unit panel width at which shear buckling of a sandwich panel will occur is given by the theoretical formula:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/140.png)

Where: N~cr~ is the allowable load flow (lb/in).

The D~11~ term from the D matrix of the laminate can be used.

Solved for face sheet stresses:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/141.png)

For isotropic face sheets this formula solved for the facing stress becomes:

Where:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/142.png)

As noted above the buckling coefficient for the panel under this loading condition is given by the equation:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/143.png)

Where:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/144.png)

And:

_K_~_MO_~_\= K_~_FM_~  _when V= 0_  – This is the upper line from each of the curves.

As for compression buckling of cored panels, the values of K~F~ are generally small relative to K~M~. As safe first approximation is to assume it is equal to zero unless the margin of safety is low.

For sizing it is safe to assume K = K~M~, however for greater accuracy K~F~ can be calculated by taking the K~M0~ values from the curves on the following pages.

**16.2.2.8. Sandwich Panel Shear Buckling Coefficients for Panels with Isotropic Facings and Isotropic Core:**

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/145-707x1024.png)

**Figure 16.2.2‑25: Sandwich Panel Shear Buckling, Isotropic Facings, Isotropic Core, All Sides Simply Supported**  [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA CR-1457, 1969)**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/146-761x1024.png)

**Figure 16.2.2‑26: Sandwich Panel Shear Buckling, Isotropic Facings, Isotropic Core, All Sides Clamped**  [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA CR-1457, 1969)**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)

**16.2.2.9. Sandwich Panel Shear Buckling Coefficients for Panels with Isotropic Facings and Orthotropic Core (R=0.40):**

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/147-712x1024.png)

**Figure 16.2.2‑27: Sandwich Panel Shear Buckling, Isotropic Facings, Orthotropic Core (R=0.40), All Sides Simply Supported** [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA CR-1457, 1969)**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/148-749x1024.png)

**Figure 16.2.2‑28: Sandwich Panel Shear Buckling, Isotropic Facings, Orthotropic Core (R=0.40), All Sides Clamped** [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA CR-1457, 1969)**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)

**16.2.2.10. Sandwich Panel Shear Buckling Coefficients for Panels with Isotropic Facings and Orthotropic Core (R=2.50):**

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/149-710x1024.png)

**Figure 16.2.2‑29: Sandwich Panel Shear Buckling, Isotropic Facings, Orthotropic Core (R=2.50), All Sides Simply Supported**  [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA CR-1457, 1969)**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/150-753x1024.png)

**Figure 16.2.2‑30: Sandwich Panel Shear Buckling, Isotropic Facings, Orthotropic Core (R=2.50), All Sides Clamped** [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA CR-1457, 1969)**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)

**16.2.2.11. Sandwich Panel Bending Buckling**

An in-plane bending load applied to a panel is generally less critical than the same panel in compression as the panel is stabilized by the half of the panel that is loaded in tension.

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/151.png)

**Figure 16.2.2‑31: Bending Buckling Load Application and Nomenclature** [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA CR-1457, 1969)**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)

The load per unit panel width at which bending buckling of a sandwich panel will occur is given by the theoretical formula:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/152.png)

Where: N~cr~ is the allowable load flow (lb/in).

The D~11~ term from the D matrix of the laminate can be used.

Solved for face sheet stresses:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/153.png)

For isotropic face sheets this formula solved for the facing stress becomes:

Where:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/154.png)

As noted above the buckling coefficient for the panel under this loading condition is given by the equation:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/155.png)

Where:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/156.png)

And:

K~MO~\= K~M~  when V= 0  – This is the upper line from each of the curves.

**16.2.2.12. Sandwich Panel Shear Buckling Coefficients for Panels with Isotropic Facings:**

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/157-716x1024.png)

**Figure 16.2.2‑32: Sandwich Panel Bending Buckling, Isotropic Facings, Isotropic Core, All Sides Simply Supported**  [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA CR-1457, 1969)**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/158-704x1024.png)

**Figure 16.2.2‑33: Sandwich Panel Bending Buckling, Isotropic Facings, Orthotropic Core (R=0.40), All Sides Simply Supported** [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA CR-1457, 1969)**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/159-681x1024.png)

**Figure 16.2.2‑34: Sandwich Panel Bending Buckling, Isotropic Facings, Orthotropic Core (R=2.50), All Sides Simply Supported** [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA CR-1457, 1969)**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)

**16.2.2.13. Combined Loading Conditions for Sandwich Panels**

The reference  [(](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[NASA CR-1457, 1969)](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels) states that these interaction methods are for honeycomb cored panel. These methods can be assumed to apply for panels with isotropic cores.

**Biaxial Compression:**

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/160.png)

Where:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/161.png)

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/162.png)

This method is correct for square panels for which V=0, it is generally conservative for panels with larger aspect ratios and larger values of V (weaker core).

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/163.png)

**Figure 16.2.2‑35: Interaction curve for Sandwich panel – Biaxial Compression**  [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA CR-1457, 1969)**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)

**Bending and Compression:**

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/164.png)

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/165.png)

**Figure 16.2.2‑36: Interaction curve for Sandwich panel – Bending and Compression**  [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA CR-1457, 1969)**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)

**Compression and Shear:**

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/166.png)

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/167.png)

**Figure 16.2.2‑37: Interaction curve for Sandwich panel – Shear and Compression**  [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA CR-1457, 1969)**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)

**Bending and Shear:**

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/168.png)

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/169.png)

**Figure 16.2.2‑38: Interaction curve for Sandwich panel – Shear and Bending** [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA CR-1457, 1969)**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)

**All of these interaction effects are available in the spreadsheet linked below:**

<table class=""><tbody><tr><td><img loading="lazy" decoding="async" width="30" height="30" class="wp-image-57936" style="width: 30px;" src="https://www.abbottaerospace.com/wp-content/uploads/2019/04/SPERADSHEET.png" alt=""> <strong><a rel="noreferrer noopener" aria-label="AA-SM-102-081 Interaction of Cored Panel Buckling Effects (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-102-081/" target="_blank">AA-SM-102-081 Interaction of Cored Panel Buckling Effects</a></strong></td></tr></tbody></table>

**16.2.2.14. Global Mode: Shear Crimping**

The shear crimping mode of failure can occur because of insufficient shear stiffness of the core.

For uniaxial compression acting co-planar with the facings:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/170.png)

Where G~ij~ is the core shear modulus of the plane perpendicular to the face sheets and parallel to the direction of loading.

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/171.png)

**Figure 16.2.2‑39: Shear Crimping Terminology for Uniaxial load**  [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA CR-1457, 1969)**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)

For pure shear acting co-planar with the facings:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/172.png)

Where G~xz~ and G~yz~ are the core shear moduli of the plane perpendicular to the face sheets (z) and parallel to the direction of loading (x,y).

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/173.png)

**Figure 16.2.2‑40: Shear Crimping Terminology for Shear load** [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA CR-1457, 1969)**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)

This method is available in the following spreadsheet:

<table class=""><tbody><tr><td><img loading="lazy" decoding="async" width="30" height="30" class="wp-image-57936" style="width: 30px;" src="https://www.abbottaerospace.com/wp-content/uploads/2019/04/SPERADSHEET.png" alt=""> <strong><a rel="noreferrer noopener" aria-label="AA-SM-102-010 Composites - Cored Panel Shear Crimping (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-102-010/" target="_blank">AA-SM-102-010 Composites – Cored Panel Shear Crimping</a></strong></td></tr></tbody></table>

**16.2.2.15. Local Mode: Facesheet Dimpling (Intracellular Buckling)**

From a practical viewpoint intracellular buckling can be regarded as flat Panel behavior. Even where curvature is present, as in the cases of cylinders and spheres, the honeycomb core size will usually be sufficiently small to justify such an assumption.

As noted from  [(](https://www.abbottaerospace.com/wpdm-package/naca-tn-3781-handbook-of-structural-stability-part-i-buckling-of-flat-plates)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[NACA-TN-3781, 1957)](https://www.abbottaerospace.com/wpdm-package/naca-tn-3781-handbook-of-structural-stability-part-i-buckling-of-flat-plates), the critical stress for flat Panels can be expressed in the form (note that this is for isotropic face sheets).

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/174.png)

For elastic cases and composite face sheets it can be assumed that _η_ = 1.

 [(](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[NASA CR-1457, 1969)](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels) recommends that a K value of 2.0 is used. However, it is noted that this value has been shown to be optimistic in some cases. A review of the experimental data shows that this may be particularly optimistic for honeycomb core. **It is therefore recommended that a K value of 1.5 is used**.

The dimension ‘s’ is related to the cell size of the core. The recommended value of s is determined as follows:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/175.png)

**Figure 16.2.2‑41: Definition of Dimension ‘s’**  [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA CR-1457, 1969)**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)

The term for intracellular buckling therefore becomes:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/176.png)

This method is available in the following spreadsheet:

<table class=""><tbody><tr><td><img loading="lazy" decoding="async" width="30" height="30" class="wp-image-57936" style="width: 30px;" src="https://www.abbottaerospace.com/wp-content/uploads/2019/04/SPERADSHEET.png" alt=""> <strong><a rel="noreferrer noopener" aria-label="AA-SM-102-011 Composites - Cored Panel Intracellular Buckling (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-102-011/" target="_blank">AA-SM-102-011 Composites – Cored Panel Intracellular Buckling</a></strong></td></tr></tbody></table>

**16.2.2.16. Local Mode: Facesheet Wrinkling**

**Antisymmetric Wrinkling:** Typical facesheet wrinkling failure mode in solid/foam cores  [(](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[NASA CR-1457, 1969)](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels).

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/177.png)

The stress in the face sheet at which face wrinkling will occur in sandwich constructions having solid or foam cores is given by:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/178.png)

 [(](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[NASA CR-1457, 1969)](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels) gives guidance that in the absence of any other information the value of Q can be conservatively assumed to be 0.50. This is based on the results shown below.

For elastic cases it can be assumed that _η_ = 1, in almost all cases for composite laminate face sheets they must remain elastic and therefore _η_ = 1.

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/179.png)

**Figure 16.2.2‑42: Survey of Analysis vs Test for Sandwich Panels having Solid or Foam Cores**  [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA CR-1457, 1969)**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)

The precise value of Q can be calculated of the amplitude of the initial waviness in the facings is known. This is expanded on and explained in [(](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[NASA CR-1457, 1969).](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)

It is recommended that unless the user has significant experience with this subject that a Q of 0.5 is used. Therefore, the expression becomes:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/180.png)

For elastic cases and composite face sheets it can be assumed that _η_ = 1. It is noted in the source material that this method is approximate and therefore should be used for initial sizing only.

**Symmetric Wrinkling:** Typical facesheet wrinkling failure mode _in honeycomb cores only_  [(](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[NASA CR-1457, 1969)](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels).

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/181.png)

For unknown initial waviness and for preliminary design use the following expression:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/182.png)

For elastic cases and composite face sheets it can be assumed that _η_ = 1. It is noted in the source material that this method is approximate and conservative and therefore should be used for initial sizing only.

![](https://www.abbottaerospace.com/wp-content/uploads/2019/08/183.png)

**Figure 16.2.2‑43: Comparison of Honeycomb Core Face Wrinkling test data with the Analytical Method**  [**(**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/DOCUMENT-e1572009841677.png)[**NASA CR-1457, 1969)**](https://www.abbottaerospace.com/wpdm-package/nasa-cr-1457-manual-for-structural-stability-analysis-of-sandwich-panels)

This method is available in the following spreadsheet:

<table class=""><tbody><tr><td><img loading="lazy" decoding="async" width="30" height="30" class="wp-image-57936" style="width: 30px;" src="https://www.abbottaerospace.com/wp-content/uploads/2019/04/SPERADSHEET.png" alt=""> <strong><a rel="noreferrer noopener" aria-label="AA-SM-102-012 Composites - Cored Panel Facesheet Wrinkling (opens in a new tab)" href="https://www.abbottaerospace.com/downloads/aa-sm-102-012/" target="_blank">AA-SM-102-012 Composites – Cored Panel Facesheet Wrinkling</a></strong></td></tr></tbody></table>
