# Chapter 1: SCOPE

Source: https://www.abbottaerospace.com/aa-sb-001/1-scope/

## 1. SCOPE

Source URL: https://www.abbottaerospace.com/aa-sb-001/1-scope/

[Reference: Abbott, Richard. Analysis and Design of Composite and Metallic Flight Vehicle Structures 3 Edition, 2019.](https://www.abbottaerospace.com/downloads/analysis-and-design/)

This document is intended to provide general structural engineering guidance for the development of metallic and fiber composite aircraft parts.

This book is not an academic textbook and does not show the mathematical theory used to derive the methods unless they add utility to the method shown. There are many fine books that provide that information. This book is a collection of practical stress analysis methods and tools; the aim is to give useful numerical methods for basic sizing that will give an engineer the means to carry out an analysis with confidence.

All methods in this document have been either cited from public domain sources or derived from first principles. Every effort has been made to cite sources and the reader is encouraged to use the links to examine the sources for a broader understanding and potential limitations of the particular method.

There are direct links to spreadsheet analysis files throughout the text. The spreadsheets have been developed by myself and others who work for and with me. Special thanks are due to Jerzy Krolikowski. Jerzy developed a set of analysis sheets for me while we both worked at Diamond Aircraft in London, Ontario, Canada. Jerzy’s approach to analysis spreadsheets provided some of the inspiration for the analysis tools we produce. Sometimes the best teaching method is just to show that something can be done.

## 1.1. Applicability

Source URL: https://www.abbottaerospace.com/aa-sb-001/1-scope/1-1-applicability/

[Reference: Abbott, Richard. Analysis and Design of Composite and Metallic Flight Vehicle Structures 3 Edition, 2019](https://www.abbottaerospace.com/downloads/analysis-and-design/)

This document is generally applicable for LSA, FARS part 23, part 25 and part 27 primary and secondary structures. However, there are varying airworthiness standards and interpretation of standards across different jurisdictions and consultation with the relevant local certification agency is essential.

When working for an OEM, if there is an OEM analysis method that is approved in the context of their compliance activities, that method should always be used.

## 1.2. Note to the Reader

Source URL: https://www.abbottaerospace.com/aa-sb-001/1-scope/1-2-note-to-the-reader/

[Reference: Abbott, Richard. Analysis and Design of Composite and Metallic Flight Vehicle Structures 3 Edition, 2019](https://www.abbottaerospace.com/downloads/analysis-and-design/)

In writing this text I am standing on the shoulders of giants. Very little of the original theory in this document originates with the author. This document is a collection of the best public domain sources regarding analysis and design of composite and metallic structures that I have found over the last 25 years.

**Note on source material: Attribution:** Where I have lifted passages from source material directly I have given attribution. I have also tried to give reference to the origin of the methodology. In some circumstances, I have lifted some explanations from internet miscellanea which cannot be attributed to any author. If you recognize any of your work in this text please let me know, provide me with a copy of your original work and I will gladly give you attribution.

**Note on source material: Copyright:** I have made every effort to ensure that all the referenced material or direct use material is in the public domain. If this is not the case and I have used copyrighted or restricted materials, please contact me to resolve any copyright issue.

**Note on source material: Credits:** I have had correspondence with many engineers over the years and been given some extremely useful pointers and derivations. If you recognize any of the methods in this text as something you assisted me with and I have not credited you, please contact me and I will gladly give you credit.

We are all lucky to work in an environment where so much great material is in the public domain, by far the largest contributors to this store of public knowledge are the US state-funded aerospace bodies, NASA and (now defunct) NACA and the UK ARC organization. Credit and thanks are due to the generosity and public spirit of the American and the British peoples. It is a privilege to have access to this body of knowledge that stretches back almost 100 years. All the errors in this document and the accompanying products are mine and mine alone and if the reader finds any errors please contact me: [\[email protected\]](https://www.abbottaerospace.com/cdn-cgi/l/email-protection).

I would like to especially thank my wife Anna and progeny Sophia and Carl, my reasons for getting up in the morning. I would also like to thank my parents Margaret and Barrie Abbott who gave me the engineering genes and an interest in engineering that – as much as I tried to avoid it in early life – has ended up bringing me much pleasure and satisfaction.

Much gratitude for mentoring and inspiration is due to (in no particular order): Ken Whitworth, Dominique Zeoli, Paul Barrow, Paul Carter, Paul Whittle, Graham Woolley, Clayton Fox, John Vieger, Peter Maurer, Johnny Doo, Sjoerd Verhof, Hasib Nematpoor, Phil Gent, Jerzy Krolikowski, the Otto family of Otto Aviation, Carsten Sundin of Stratos Aircraft and my trusty cohorts at Abbott Aerospace, Past and Present, Knut Gjelsvik, Nirav Shukla, Peter Lebeidowicz, Santiago Perez, Tomas Chlumecky, Anthony Barr, Andrew Leibrecht and Nikola Kozina. Gratitude is also due to all the companies I have worked for as well as all the engineers I have worked with over the years. Engineering is a continual process of learning on the job and that experience comes thanks to the intelligence and patience of our co-workers.

A question I am commonly asked is ‘Am I allowed to print out this document’. The answer to this question is ‘Yes’.

## 1.3. How to Help

Source URL: https://www.abbottaerospace.com/aa-sb-001/1-scope/1-3-how-to-help/

[Reference: Abbott, Richard. Analysis and Design of Composite and Metallic Flight Vehicle Structures 3 Edition, 2019](https://www.abbottaerospace.com/downloads/analysis-and-design/) ﻿

Engineers understand the value of working as a team towards a common goal and that is how this book (and the connected resources) came about. When I started my engineering consultancy business, I considered monetizing the analysis tools that I had at that point. Instead, I made them available for free online. The free spreadsheets generated a surprising amount of goodwill and useful technical feedback and it confirmed the good-natured and generous nature of the global engineering community.

That experience inspired the creation of the Abbott Aerospace Technical Library. The Library aims to make useful engineering tools and texts freely. If you have found the material that we host and the tools we create to be useful and would like to help; you can volunteer some of your own time, work or tools, or you can donate to help maintain and expand our engineering resources. You can donate from our technical library homepage:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/paypal.png)

**[Click Here to Donate](https://www.abbottaerospace.com/technical-library/)**

## 1.4. A Note on the Analysis Spreadsheets

Source URL: https://www.abbottaerospace.com/aa-sb-001/1-scope/1-4-a-note-on-the-analysis-spreadsheets/

[Reference: Abbott, Richard. Analysis and Design of Composite and Metallic Flight Vehicle Structures 3 Edition, 2019](https://www.abbottaerospace.com/downloads/analysis-and-design/)

![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/spread.jpg)

  
**[Click Here to the Spreadsheet Library](https://www.abbottaerospace.com/tag/spreadsheets)**  

Where we have a spreadsheet available for the analysis methods in this book we have provided a link to the spreadsheet in our library. You are welcome to download these spreadsheets to use, modify and redistribute them as you wish. We just ask that you provide a credit and if possible a link to the Abbott Aerospace Technical Library. These spreadsheets replace the worked examples that you would expect to find in a similar textbook so there are no worked examples shown in this book.

The spreadsheets are provided free of charge, ‘as-is’ with no guarantee. We have made every effort to make sure they are accurate and correct, but we are human and despite our best efforts we are as prone to error as anyone else. If you do find an error, please inform us so we can correct and share the corrected version with the rest of the library users.

Most of the spreadsheets use the XL-Viking add-in, this is available as a commercial download at this location: [XL-Viking.com](http://www.xl-viking.com/). This add-in displays the math in the spreadsheets in an interactive way and updates real time with the values in the spreadsheet.

If you wish to contribute an analysis spreadsheet to the library, we will gladly review any submission. If we add your sheet to the library, we will give you a permanent credit in the library and on the face of the spreadsheet.

We, like many other people and companies, have developed a way of using Microsoft Excel™ as a technical report creation tool. All spreadsheets are created (as far as possible) in what we consider to be a final report format. All of our sheets conform to the same format and layout.

The spreadsheet tools are updated on a regular basis with corrections and improvements. The user is recommended to check the [Abbott Aerospace website](https://www.abbottaerospace.com/) regularly to ensure they are using the latest and best version available.

## 1.5. Note on Document Links

Source URL: https://www.abbottaerospace.com/aa-sb-001/1-scope/1-5-note-on-document-links/

[Reference: Abbott, Richard. Analysis and Design of Composite and Metallic Flight Vehicle Structures 3 Edition, 2019](https://www.abbottaerospace.com/aa-sb-001/www.abbottaerospace.com/downloads/analysis-and-design/)

This document is meant to be used only as an electronic document. It is filled with links to the source material and the analysis spreadsheets that are useful tools but also serve as worked examples.

You are welcome to print this book to make physical copies, but you will lose this important functionality.

By default, most PDF readers do not allow the use of external links from within a document. You may have to change the settings in your PDF reader.

## 1.5.1. Using External Links in Adobe PDF Reader

Source URL: https://www.abbottaerospace.com/aa-sb-001/1-scope/1-5-note-on-document-links/1-5-1-using-external-links-in-adobe-pdf-reader/

[Reference: Abbott, Richard. Analysis and Design of Composite and Metallic Flight Vehicle Structures 3 Edition, 2019](https://www.abbottaerospace.com/downloads/analysis-and-design/) ﻿

If you are using Adobe reader, you can allow the reader to access websites by going to the ‘Edit’ menu and selecting ‘Preferences’ (or just pressing ‘control-k’). Select the ‘Trust Manager’ menu item on the left-hand side and click the ‘Change Settings’ button in the main window. In the window that pops up, you can choose to allow the document to access all websites or you can add [www.abbottaerospace.com](https://www.abbottaerospace.com/) to the list of allowed sites.

![](https://www.abbottaerospace.com/wp-content/uploads/2019/04/image-57.png)

**Figure 1.5.1‑1: Adobe PDF Settings to Allow use of Links**

Other PDF readers have similar settings that can be altered similarly.

## 1.6. Updates to this Book

Source URL: https://www.abbottaerospace.com/aa-sb-001/1-scope/1-6-updates-to-this-book/

[Reference: Abbott, Richard. Analysis and Design of Composite and Metallic Flight Vehicle Structures 3 Edition, 2019](https://www.abbottaerospace.com/downloads/analysis-and-design/)

Corrections, updates and new editions to this book will be posted on [www.abbottaerospace.com](https://www.abbottaerospace.com/). Subscribers to the Abbott Aerospace mailing list will receive notification of any updates automatically. Click **[here](https://www.abbottaerospace.com/subscribe)** to subscribe to our mailing list.

## 1.7. About the Author

Source URL: https://www.abbottaerospace.com/aa-sb-001/1-scope/1-7-about-the-author/

[Reference: Abbott, Richard. Analysis and Design of Composite and Metallic Flight Vehicle Structures 3 Edition, 2019](https://www.abbottaerospace.com/downloads/analysis-and-design/)

Richard Abbott graduated from Manchester Polytechnic (now the Metropolitan University of Manchester) in the UK in 1992. He worked as a stress engineer on multiple civil and military aircraft projects in the UK including multiple versions of the BAe Hawk, the Bombardier CRJ Aircraft and the Saab Gripen. Richard and family moved between San Antonio, Texas, USA (Sino Swearingen Aircraft Corporation), Gossellies, Belgium (Sonaca SA, the Dassault F7X program) and London, Ontario Canada (Diamond Aircraft D-Jet Program). In 2008 Richard left Diamond Aircraft and founded Abbott Aerospace with his partner Anna.

Since 2008, the Abbott Aerospace team has contributed to many projects at startup companies and established OEMs: Stratos Aircraft, Kestrel (One Aviation), Mooney, Boom, Piper, Bombardier, Solarship, CRI, PV Labs, Kopter (Marenco Swisshelicopter), ITPS, Wave Aircraft, Gore Design, Glasair, Knovel, Ampaire, M7, DeLorean Aerospace, Warrior Aircraft, Samad Aerospace, Cynergy Composites and ALP.

At the time of writing Richard holds the position of acting structures manager on the Stratos 714 program, head of structures and mechanical systems for the Otto Celera 500L program and is the acting CTO for Samad Aerospace. Richard also teaches classes on structures engineering and engineering management at the University College of the Cayman Islands.

## 1.8. Acknowledgements

Source URL: https://www.abbottaerospace.com/aa-sb-001/1-scope/1-8-acknowledgements/

[Reference: Abbott, Richard. Analysis and Design of Composite and Metallic Flight Vehicle Structures 3 Edition, 2019](https://www.abbottaerospace.com/downloads/analysis-and-design/)

Of particular help in the compilation and checking of this book, the following individuals deserve special recognition – in no particular order.

-   Peter Lebiedowicz
-   Michael Prystie
-   Knut Gjelsvik
-   Nirav Shukla
-   Santiago Perez – Checker Extraordinaire
-   Kenan Stewart
-   Charles Lee
-   Anna Abbott
-   Mike Sharpe
-   Sophia Abbott

Many thanks to the following readers of the first edition of the book who have spotted errors and provided useful feedback

-   Roey Epshtein of Elbit Systems
-   Stephen Rigden  of Cobham Mission Systems
-   Martin Zahoruyko of Altitude Aerospace
-   Steve Marsan of Innoviator Flight Science
-   Andrew Butcher of Pratt and Whitney
-   Surya Batchu of MD Helicopters
