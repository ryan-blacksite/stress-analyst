# AircraftStress.com — Fastener Analysis Part 1

Source: https://aircraftstress.com/2019/01/10/fastener-analysis-part-1/
Page title: Aircraft Fastener Analysis – Part 1
Retrieved: 2026-04-12T01:37:17.939Z

---

## Joint analysis

Even to this date, most aircraft (metallic and composite) are assembled using some type of fasteners. Those fasteners could be solid rivets, blind rivets, screws or bolts.  
In fastener analysis, there are two things that you have to check for:

1.  Fastener strength (shear, tension, bending)
2.  Bearing strength in the involved connected parts.

That is why usually we prefer calling that analysis a “joint” analysis rather than a “fastener” analysis since the joint check covers both shear and bearing. In addition, quite often, joint allowables are readily available and those are the ones to use in the Margin of Safety calculation as they are usually based on tests.

There is no point in having a very strong fastener installed in a thin sheet since the later will be the weak link. On the opposite, having a small fastener installed in thick parts triggers me to think that the fastener is most likely under-sized and should be bigger/stronger. As a rule of thumb, the rivet diameter should be about 3 times the thinnest sheet thickness. So for an 0.050 in. thick aircraft Aluminum sheet, a 5/32 in. rivet should be used. But a 1/8 in. or a 3/16 in. could also be used if need be.

In aerospace in general, no rivets should be installed in material thicknesses greater than ¼ in. (0.25 in.). Based on my experience, I would say that, any assembly with parts thicker than 1/8 in. should not be using rivets. I would rather go with Hi-Lites, Hi-Loks, screws or bolts.

## Bearing vs Shear critical

It is always more desirable to have a joint critical in bearing than in shear. The reason being that, when a joint is critical in bearing (the Margin of Safety is smaller in bearing than in shear), then, in a multiple fasteners joint, the total ultimate load will tend to redistribute (spread) evenly among the fastener group.

Take a simple splice for example as shown in Figure 1 below. As the load in the most critical fastener (1) reaches a value that causes some small yielding in the hole, then the stiffness (thus the load) of that fastener reaches a maximum value equal to its ultimate bearing allowable so the adjacent rivet (2) will start picking up more load, and so on.

![](https://aircraftstress.com/wp-content/uploads/Aircraft-Stress-Fastener-sketch_1.png "Figure 1")

This phenomenon continues as necessary until all fasteners are loaded evenly at their maximum ultimate bearing allowable (P~bru~). Only after all of the fasteners have reached their ultimate bearing allowable that the joint will fail. Note that this is not applicable at **limit** load where the peaking effect must be considered as no yielding is allowed.

However, in a shear critical joint, the load in the most critical fastener (1) will go up until that fastener reaches its shear allowable (P~su~) and fails. At that point, the total load from fastener (1) would thus be dumped to the adjacent fastener (2) and added to its existing load. That fastener would then fail in shear and its total load from (1) and (2) dumped to fastener (3) etc. That is called the “Zipper” effect. It is a catastrophic failure that happens very fast. So not recommended for single load path critical joints.

Using a typical example of a lap joint having sheets of Aluminum Alloy 2024-T3 Clad, 0.050 in. thick and 5/32″ MS20470AD5 solid rivets,  we get the following values for the shear and the bearing allowables:

Ultimate Shear allowable: Psu = 596 lbs (Ref. MMPDS-09 Table 8.1.2(b))  
Ultimate Bearing allowable: for Fbru (e/D = 2) = 121 ksi (Ref. MMPDS-09 Table 3.2.4.0( e1))  
hence Pbru = Fbru \* D \* t = 121,000 \* 0.156 \* 0.050 = 944 lbs.

So as we can see, the joint is critical in shear. To make the joint critical in bearing, the sheets would have to be either half as thick or, the rivets should be changed to something like Hi-Lites having a shear strength of 95 ksi and a shear allowable of 2,005 lbs.

However, using Hi-Lites in every joint would be prohibitively expansive as they cost many times more. In general, even if a joint is shear critical, the assumption of distributing the total applied ultimate load evenly across the rivets is usually recognized and accepted. Just make sure that, at limit load, the peaking at the end-fasteners doesn’t exceed the yield bearing allowable (Pbry) and the yield shear allowable (Psy). The yield shear allowable is calculated as Psy = Fsy \* A. Where A is the rivet shank cross section Area and Fsy is the yield shear stress allowable calculated from Ref. MMPDS-09 eq. 9.8.4.6.2. See below:

![](https://aircraftstress.com/wp-content/uploads/Aircraft-Stress-Fsy-Equation.png)

## Conclusion

For the fastener Margin of Safety calculation , always use the joint allowables when available or calculate the fastener Margin of Safety based on the weakest allowable between shear and bearing.

Try to design a bearing critical joint in critical single load path locations. In the case of an extremely high and short flight maneuver loading condition for example, that peak load would then be “absorbed” by a bearing critical joint without (hopefully) causing any damage.

Rivets have been around for a very long time and until a better process to connect two aircraft parts together is developed, rivets are still one of our best option. It allows the removal and replacement of a damaged part fairly quickly using minimal tools. Contrarily to welds where the material gets significantly weaker in the heat affected zone, the material strength of riveted sheets is not altered. The main draw back of using fasteners is that you need to drill holes in otherwise perfectly smooth components, which are one of the major cause of crack initiation in the connected parts.

Parting message:

“_Always try to do your stress analysis in a stress-free environment”._

Please visit my website for more information at [aircraftstress.com](https://aircraftstress.com/)

Cheers

87 in stock

[Link to Lulu for purchasing the Paper book](https://www.lulu.com/shop/stephane-couture-and-elisabeth-couture/becoming-an-aircraft-stress-engineer/hardcover/product-rme5yvm.html?q=becoming+an+aircraft&page=1&pageSize=4)

[Link to Amazon for purchasing Paper book.](https://www.amazon.com/Becoming-Aircraft-Stress-Engineer-university/dp/1778245005/ref=sr_1_1?crid=3GXXLSHC98OHY&keywords=becoming+an+aircraft+stress+engineer&qid=1704143417&sprefix=%2Caps%2C87&sr=8-1)
