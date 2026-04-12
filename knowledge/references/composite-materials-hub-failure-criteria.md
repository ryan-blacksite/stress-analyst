# Composite Materials Hub — Failure Criteria

Source: https://compositematerialshub.com/failure-criteria-in-composite-materials/
Page title: Failure criteria in composite materials
Retrieved: 2026-04-12T01:40:08.850Z

---

## Which type of failure are used to analysis composite materials?

Composite materials design is performed comparing stresses due to applied loads. In the case of isotropic materials, they have yielding. Maximum shear stress theory or von Mises yield criterion are commonly used for design against yielding. However, in the case of composite materials, they do not present yielding, as they are considered as brittle material. Many failure criteria in composite materials have been developed for metals, but are not applicable to fiber-reinforced polymers, as they have a large amount of error. New theories have been created to solve this problem, however, as it is shown below, they are not quite exact and do not present the same certainty as in isotropic materials due to the behaviour of composite materials.

The main goal of the failure criteria is to help designers to understand how the composite materials work and predict its durability. However, there is not a general agreement about the composite material failure criteria accepted by designers. Currently, there are mainly two groups of failure criteria: the not dependent and dependent failure modes.

## **Dependent failure criteria** in composite materials

The expressions on these criteria are adjusted in a curve obtained by experimental tests.

Popular well-known quadratic failure criteria are: [Tsai-Wu](https://compositematerialshub.com/failure-criteria/), Tsai Hill, Azzi-Tsai, Hoffman, Chamis.

About the drawback of this type of criteria, they do not consider the different damage mechanisms that promote laminate failure. These criteria consider the lack of isotropy in terms of macromechanical variables, but do not account for the lack of homogeneity of these materials, which govern the type of failure. Another drawback is that when the laminate is under biaxial tensile stress the predicted failure depends on the compressive strength.

### TSAI-WU failure criteria for composite materials

The Tsai-Wu failure criterion is a polynomial-based theory that considers the interaction between different stress components. It extends the classical failure theories to handle the anisotropy of composite materials. Used extensively in aerospace applications to predict the failure of laminated composite wings and fuselages.

 F\_1 \\sigma\_1 + F\_2 \\sigma\_2 + F\_{11} \\sigma\_1^2 + F\_{22} \\sigma\_2^2 + F\_{66} \\tau\_{12}^2 + 2F\_{12} \\sigma\_1 \\sigma\_2 \\leq 1 

**Pros:**

– Accounts for interaction between different stress components.

– Suitable for various loading conditions.

**Cons:**

– Requires determination of multiple material parameters.

– Can be complex to implement compared to simpler criteria.

### Azzi-Tsai-Hill Failure Criterion

This criterion is a modification of the Hill criterion to suit orthotropic composite materials. It provides a simpler form than Tsai-Wu, focusing on a quadratic relationship among the stress components. Applied in the design of composite pressure vessels where quick and reasonably accurate failure predictions are needed.

 \\left( \\frac{\\sigma\_1}{X} \\right)^2 + \\left( \\frac{\\sigma\_2}{Y} \\right)^2 - \\frac{\\sigma\_1 \\sigma\_2}{XY} + \\left( \\frac{\\tau\_{12}}{S} \\right)^2 \\leq 1 

**Pros:**

– Simpler than Tsai-Wu.

– Suitable for quick assessments of composite materials.

**Cons:**

– Less accurate for complex stress states.

– Does not differentiate between tensile and compressive strengths.

### Hoffman Failure Criterion

The Hoffman criterion is an extension of the Tsai-Wu criterion and is based on a quadratic interaction between the stress components. It includes separate terms for tensile and compressive strengths. Used in the design of high-stress composite structures such as aerospace components where detailed failure prediction is crucial.

F\_1 \\sigma\_1 + F\_2 \\sigma\_2 + F\_{11} \\sigma\_1^2 + F\_{22} \\sigma\_2^2 + F\_{66} \\tau\_{12}^2 + 2F\_{12} \\sigma\_1 \\sigma\_2 \\leq 1 

**Pros:**

– Accounts for the distinction between tensile and compressive strengths.

– Provides a more detailed interaction between stresses.

**Cons:**

– More complex than simpler criteria.

– Requires additional material parameters compared to Tsai-Wu.

## **Not dependent failure criteria** in composite materials

These criteria establish different failure modes of the constituents. The main advantage is that it can predict the failure modes and, for instance, adequate to be used in a progressive damage analysis. Non dependent failure modes criteria allow to identify the following failure modes:

-   [Fibre fracture](https://compositematerialshub.com/defects-composite-materials/)
-   Transverse matrix cracking
-   Shear matrix cracking.

There are two sub-groups of types of failure criteria for analysing the failure in composite materials:

### **Non-interactive failure criteria**

In this group, it is not considered the interaction between stresses/strain acting on a lamina. That’s why these criteria are not optimum when multiaxial states of stress are applied in a structure as the error is significantly. Typical examples of non-interactive criteria are:

### Maximum stress criteria

The maximum stress criterion states that failure occurs when any of the stress components exceeds its corresponding allowable strength. Used in preliminary design phases to quickly assess the feasibility of composite structures.

\\frac{\\sigma\_1}{X\_t}, \\frac{\\sigma\_1}{X\_c}, \\frac{\\sigma\_2}{Y\_t}, \\frac{\\sigma\_2}{Y\_c}, \\frac{\\tau\_{12}}{S} \\leq 1 

**Pros**:

– Simple and easy to implement.

– Requires minimal material data.

**Cons**:

– Does not consider interaction between different stress components.

– Can be overly conservative.

### Maximum strain criteria

Similar to the maximum stress criterion, the maximum strain criterion states that failure occurs when any of the strain components exceeds its corresponding allowable strain. Applicable in the design of sports equipment, such as composite tennis rackets, where quick strain assessments are needed.

\\frac{\\epsilon\_1}{\\epsilon\_{1t}}, \\frac{\\epsilon\_1}{\\epsilon\_{1c}}, \\frac{\\epsilon\_2}{\\epsilon\_{2t}}, \\frac{\\epsilon\_2}{\\epsilon\_{2c}}, \\frac{\\gamma\_{12}}{\\gamma\_{12}} \\leq 1 

**Pros:**

– Straightforward and simple to apply.

– Suitable for materials with well-defined strain limits.

**Cons:**

– Ignores interaction between different strain components.

– Less accurate for complex loading conditions.

### **Interactive failure criteria**

In this case, they consider the interaction between stresses/strains acting on a lamina. Some examples of these criteria are:

-   Hashin
-   Puck
-   Cuntze
-   Hart-Smith

### Hashin Failure Criterion

Hashin’s criterion differentiates between different modes of failure such as fibre tension, fibre compression, matrix tension, and matrix compression, making it particularly useful for capturing the distinct failure mechanisms in composites. Commonly used in the design of composite automotive components to ensure reliability under different loading scenarios.

**Pros**:

– Provides more accurate predictions by distinguishing between different failure modes.

– Easier to interpret the failure mechanism.

**Cons**:

– More complex due to multiple failure mode checks.

– Requires detailed material characterization.

### Puck Failure Criterion

The Puck criterion is designed specifically for fibre-reinforced composites and focuses on distinguishing between different types of matrix failure and fibre failure. Used in the design of high-performance composite structures like wind turbine blades, where precise failure predictions are critical.

Includes detailed equations for different failure modes, particularly focusing on inter-fibre failure (IFF).

**Pros:**

– Highly accurate for predicting inter-fibre failures.

– Detailed and comprehensive.

**Cons:**

– Requires extensive material testing and parameter determination.

– Complex implementation.

### LaRC Failure Criteria (LaRC03, LaRC04)

Developed by NASA Langley Research Center, these criteria are designed to predict both fibre and matrix failures in composite materials. LaRC03 focuses on fibre-dominated failure, while LaRC04 includes matrix-dominated failure modes. Utilized in the design and analysis of space structures and high-performance aircraft components, where precise failure prediction is essential.

Includes different equations for fibre and matrix failures, incorporating factors like shear nonlinearity and ply-level stress-strain responses.

**Pros**:

– Highly accurate for aerospace-grade composites.

– Detailed and comprehensive, covering multiple failure modes.

**Cons:**

– Very complex and requires extensive material testing.

– Implementation is computationally intensive.

## Conclusion

Selecting the appropriate failure criterion for composite materials depends on the specific application, the loading conditions, and the desired balance between simplicity and accuracy. Each criterion has its advantages and limitations, and often, a combination of criteria may be used to achieve the best results. Understanding these criteria helps engineers design safer and more efficient composite structures.
