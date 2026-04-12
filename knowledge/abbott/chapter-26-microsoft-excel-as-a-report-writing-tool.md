# Chapter 26: MICROSOFT EXCEL AS A REPORT WRITING TOOL

Source: https://www.abbottaerospace.com/aa-sb-001/26-microsoft-excel-as-a-report-writing-tool/

## 26. MICROSOFT EXCEL AS A REPORT WRITING TOOL

Source URL: https://www.abbottaerospace.com/aa-sb-001/26-microsoft-excel-as-a-report-writing-tool/

[Reference:  Abbott, Richard. Analysis and Design of Composite and Metallic Flight Vehicle Structures 3 Edition, 2019](https://www.abbottaerospace.com/downloads/analysis-and-design/)

## 26.1. Introduction

Source URL: https://www.abbottaerospace.com/aa-sb-001/26-microsoft-excel-as-a-report-writing-tool/26-1-introduction/

[Reference:  Abbott, Richard. Analysis and Design of Composite and Metallic Flight Vehicle Structures 3 Edition, 2019](https://www.abbottaerospace.com/downloads/analysis-and-design/)

![](https://www.abbottaerospace.com/wp-content/uploads/2019/09/271.png)

In writing this book I had to make what I consider to be a huge personal and professional concession. I had to use Microsoft Word. I started out writing this book in Excel but the problems with page formatting and section numbering and referencing issues were too great.

Word is great for writing resumes, letters and engineering textbooks. For engineering reports, it has several significant drawbacks. These problems include:

1.  Word tries to do too much and can end up creating very large unstable files that get ‘corrupted’. i.e. Word ends up doing something that even Word rejects and you end up losing data and time.
2.  Word does not let you keep calculations ‘live’. This results in time spent creating report updates for new loading, geometry or materials that take a significant amount of time as every numerical value must be updated manually.

We still use Word for writing reports when we have no choice. When a client has an internal reporting system that flows down to us and we must use Word, the whole team just has to knuckle down and live with the inefficiency and frustration.

To be fair, Microsoft Excel is a spreadsheet tool that was initially optimized for accounting. Excel has significant limitations:

1.  Excel is not WYSIWYG and looks different at different screen magnifications and needs to be tailored for each different printer the report may be printed out on.
2.  Excel has limitations on how subscript and superscript characters are processed (more on this later).
3.  Excel is not a word processor or a graphics tool.

To use Microsoft Excel as an efficient technical reporting tool you must adopt a code of ‘best practice’. Our ‘best practice’ is informed by our experience and the experience of other senior level technical people we have worked with.

Why not use Mathcad? Mathcad is a great tool, but it has several drawbacks:

1.  It is expensive
2.  It is not universally used
3.  Mathcad is great a presenting math. My experience of work created and presented in Mathcad is that the user gets carried away with the beautiful mathematics and you end up with a report that consists of page after page of mystifying math with few diagrams and little commentary.

Having listed the main reasons why we do not use any other package and the negative points about Excel, let me list the positive aspects.

1.  Excel is a universally used – almost everyone has an Excel license. Analysis files are easily shared and edited.
2.  Excel is the most stable of the Microsoft Office suite of programs.
3.  Excel is a _general_ tool – it does many things moderately well.

_Reports written in Word tend to have a lot of prose and not enough math. Report written in Mathcad tend to have a lot of math and not enough prose. Reports written in Excel tend to naturally strike a balance between prose and math because it is equally good (and bad) at both._

Excel can also be used as a database for FE output for storage and processing. We also use Excel to create input loads files for Finite Element models in the correct _.bdf_ or _.dat_ format. See [section 26.2.6](https://www.abbottaerospace.com/aa-sb-001/26-microsoft-excel-as-a-report-writing-tool/26-2-excel-as-a-reporting-tool-the-basics/26-2-6-creating-nastran-input-files-using-microsoft-excel/) for more information.

We also use Excel to create simple engineering drawings and for creating commercial logos and graphics for most of our company needs.

Excel mirrors good practical engineering traits:

_Jack of all trades and master of none, **But oft times better than a master of one**._

Important Terms:

**Workbook** – a discrete Excel file, usually has .xlsx extension.

**Worksheet** – a sheet tab within a workbook, a workbook can contain hundreds of individual worksheets.

**Cell** – an individual referenceable item of data within a worksheet, cells are shown as a grid of rectangles on the worksheet..

**Print Area** – the area of the worksheet that is printed.

## 26.2.1. Choosing your Font

Source URL: https://www.abbottaerospace.com/aa-sb-001/26-microsoft-excel-as-a-report-writing-tool/26-2-excel-as-a-reporting-tool-the-basics/26-2-1-choosing-your-font/

[Reference:  Abbott, Richard. Analysis and Design of Composite and Metallic Flight Vehicle Structures 3 Edition, 2019](https://www.abbottaerospace.com/downloads/analysis-and-design/)

Font selection is important. It is important to select a font that looks clear on the screen and when printed out. It is preferable to select a font that is part of the windows native font package, so it need not be specially installed by everyone who wants to use your file. The font must be fully populated with the extended character set (more on this later). The font must have minimal scaling problems with Excel’s display when you use different magnification levels.

We have settled on using Calibri and have been using it for the last 5 years and we are very happy with it. This document is written in Calibri and it is a clean, san-serif font that looks good in bold and italic.

We have developed a [custom font](http://www.xl-viking.com/free-engineering-analysis-font/) that is part of the [XL-Viking package](http://www.xl-viking.com/). This font is given away for free without having to make any purchase. We have populated this font with a set of superscript and subscript characters in the native font format that are not usually available.

It is important that attention is paid to the little things. Legibility, transferability and clarity are all key aspects of a technical report.

## 26.2.2. Page Break Preview and Print Area

Source URL: https://www.abbottaerospace.com/aa-sb-001/26-microsoft-excel-as-a-report-writing-tool/26-2-excel-as-a-reporting-tool-the-basics/26-2-2-page-break-preview-and-print-area/

[Reference:  Abbott, Richard. Analysis and Design of Composite and Metallic Flight Vehicle Structures 3 Edition, 2019](https://www.abbottaerospace.com/downloads/analysis-and-design/)

Excel was created without consideration for authoring Letter or A4 page size reports in mind. Nevertheless, there are some useful tools built in that help you do this.

![](https://www.abbottaerospace.com/wp-content/uploads/2019/09/image-3.png)

**Figure 26.2.2‑1: Excel When First Started**

Figure 26.2.2‑1 above is what you see when you start excel. In the lower RH corner there are 3 icons.

![](https://www.abbottaerospace.com/wp-content/uploads/2019/09/image-4.png)

**Figure 26.2.2‑2: Page Layout Icons**

For the report sheets (More on the use of sheets later) we only work in Page Break Preview.

If you click that icon your screen will change and will look like this:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/09/image-5.png)

**Figure 26.2.2‑3: Excel Startup Page Break Preview**

All the cells are ‘greyed-out’. This is because there is no defined _Print Area_. To define a _Print Area,_ select a range of cells and go to the Page layout menu.

![](https://www.abbottaerospace.com/wp-content/uploads/2019/09/image-6.png)

**Figure 26.2.2‑4: Selecting Cells to Define a Print Area**

And click on the Print Area button:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/09/image-7.png)

**Figure 26.2.2‑5: Print Area Button**

And click ‘Set Print Area’. The screen will now look like this:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/09/image-8.png)

**Figure 26.2.2‑6: Print Area Defined**

When Excel is used in this way only the area of the white cells is printed. The grey area is not printed. When the term ‘Printed’ is used it also applies to the creation of pdf files. When a pdf file is created, the pdf will only show the _Print Area_ of the page.

This is very useful and allows you to display only the results of an analysis on the printed part of the report. We use this concept extensively in many of our [standard spreadsheets](https://www.abbottaerospace.com/tag/spreadsheets). The way you arrange and use your analysis within this framework is key and is covered in the next section.

## 26.2.3. Printing, Columns and Rules

Source URL: https://www.abbottaerospace.com/aa-sb-001/26-microsoft-excel-as-a-report-writing-tool/26-2-excel-as-a-reporting-tool-the-basics/26-2-3-printing-columns-and-rules/

[Reference:  Abbott, Richard. Analysis and Design of Composite and Metallic Flight Vehicle Structures 3 Edition, 2019](https://www.abbottaerospace.com/downloads/analysis-and-design/)

Excel does not cope well with different printers and is bad at adapting page breaks and scaling from one printer to another. An important rule to adopt is to set up all your report spreadsheets printer to ‘Microsoft Print to PDF’. This is done in the file menu. Select print from the menu on the left hand side.

It is best to avoid printing your report directly from Excel to a printer. It is better to create a .pdf file and then print the .pdf file or the part of the file that you want.

![](https://www.abbottaerospace.com/wp-content/uploads/2019/09/image-9.png)

**Figure 26.2.3‑1: Changing your Printer to ‘Microsoft Print to PDF’**

Column width should be set so when using the font and the size of font that works for your report you can display large numbers in individual cells.

The body text of our reports is 10 point Calibri and we base our page width on 11 columns. Each column is 81 pixels wide and an individual cell can display numbers up to 8 digits long.

![](https://www.abbottaerospace.com/wp-content/uploads/2019/09/image-10.png)

**Figure 26.2.3‑2: Abbott Aerospace Standard Column Sizing and Arrangement**

Note that numeric values will not spread over to the neighboring cells like text does. A numeric value must fit all in a single cell. If a n umber is too large to fit in a single cell you can merge cells to display numbers with higher character counts.

In Figure 26.2.3‑2 above you can see that to the right of the print area there are several columns that are narrower and marked with vertical border lines.

We use these columns to create figure and section numbering similar to Microsoft word.

We also reserve the first few rows of the sheet to contain sheet or document data. Note that both regions – the columns to the left of the page and the rows above the page – are not printed and are only visible to the analyst who is using the spreadsheet to create the report.

Other rules that we follow:

1.  **Cell text color rule:** All cells that contain numerical input data for the analysis in the sheet have blue text. This way everyone who uses the spreadsheet knows which cells are ‘input’ values.
2.  **Page Header Rule:** The top 4 or 5 rows of your page is the page header and contains the company information, report, subsection and page numbering information.
3.  **Analysis off the page Rule:** The non-displayed analysis for each page is kept within the same rows as the page.
4.  **Column widths Rule:** If you need to a numerical value too large for your column width, merge cells across multiple columns.
5.  **Do not use Visual Basic:** Visual basic is not recommended for use in report spreadsheets.
6.  **Do not use Named Ranges:**   Names ranges in excel can cause problems when copying sections between reports, duplicating sheets within a report and copying from standard methods into reports. We have ceased use of all named ranges. See later section for workarounds.
7.  **Avoid Using the Solver:** Any process that must be triggered by the user that they cannot be intuitively aware of should be avoided. The Solver is the most common feature like this.

**26.2.3.1. Cell Text Color Rule and Managing Input Data**

It is important that you track which cells have input data that is typed in. This is for two reasons.

1.  In a large report, up to hundreds pf pages long, it is easy to forget which cells contain raw data and which cells reference other cells. When it comes time to do changes or updates to the reports it is important to know which cells should be manually updated with the change in the analysis parameters.
2.  When you pass the report on to your client or co-worker they should also know which cells have to be manually updated.

To get the most out of Excel as a report writing tool the author and the reader have to know what parts of the report are raw data and what parts are linked to the raw data.

For some reports, we will import finite element model output into one sheet, process it in another and write the report in a separate sheet. If the finite element model output data is kept in native format, updated runs of the finite element model can be written over the existing data and the report can update to the new input values automatically (with some judicious checking to ensure nothing went wrong along the way).

This kind of approach takes some forethought and careful setting up of how the imported finite element model output data is searched by the spreadsheet (using the INDEX and MATCH functions). When it is done properly is can save hours or days of time when inevitable loads or design updates occur.

We use blue text to denote inputs on the pages of the report section of the workbook.

![](https://www.abbottaerospace.com/wp-content/uploads/2019/09/image-11.png)

**Figure 26.2.3‑3: Example of Blue Input Cells for Analysis Spreadsheet**

**26.2.3.2. Page Header (and Footer) Rule**

We use the first few rows at the top of each page to create the page header:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/09/image-12.png)

**Figure 26.2.3‑4: Page Header Definition**

The page header can be formatted to suit any company report standard. Care must be taken to preserve this region of each page. It can easily be reconstituted by copying from an intact example, but it is good practice to consider this region of the page ‘out of bounds’.

For our in-house templates we do not use a page footer. On the [standard analysis spreadsheets](https://www.abbottaerospace.com/tag/spreadsheets) on the [Abbott Aerospace website](https://www.abbottaerospace.com/) we do have the footer advertisement for [XL-Viking](http://www.xl-viking.com/), but this is an extra page element to manage so we avoid this where we can.

If you avoid the use of a footer on the worksheet then you can terminate pages early without having the footer change its position – a footer shown on the spreadsheet page will change position with the length of the page.

**26.2.3.3. Analysis off the Page Rule**

The art of creating a good report is to show only what you need to on the page of the report – and to show that information appropriately referenced and to the correct level of detail.

The area off to the right of the page is a region where you can place the workings of the analysis if it is not appropriate to show it on the page of the report. The area off to the right of the printed report page can be used as an area for rough calculations, to store a picture or scanned reference, or to place hyperlinks to on-line references. It can also be used to pass on notes to other people using the spreadsheet.

![](https://www.abbottaerospace.com/wp-content/uploads/2019/09/272.png)

**Figure 26.2.3‑5: Analysis Sheet Example Showing Data off the Printed Area of the Page**

However, the cardinal rule is to keep all of the off-page work in line with the analysis shown on the page. This makes it possible to copy a complete discrete analysis, all the working out and all of the references by copying complete rows to another place in the report, or into another report/excel workbook file.

**26.2.3.4. Column Widths Rule**

Once you set your column width and font size (see previous note) for general text you must keep all of your pages the same number of columns wide, keep all of your columns the same width and use the same font throughout.

This is essential to create trouble-free copying between worksheets or reports.

This approach also means that you will encounter the same problems associated with your choice of column width and will develop and use the same work arounds for the common problems you will encounter.

**25.2.3.5. Do not use Visual Basic Rule**

This is a difficult rule to follow and involves lateral thinking for complex analysis problems. Visual basic is a very powerful tool and can be used to add some very useful functionality. But, we have a rule – do not use visual basic.

This is a rule with a caveat – we do use it in a particular way that is very limited and discourages ‘everyday’ use of visual basic.

Let’s first cover why you would not use visual basic. We try to make everything we do transportable. i.e. you can copy a section out of one spreadsheet into any other spreadsheet and it will work without any further changes.

If your analysis method relies on visual basic that is attached to the workbook or worksheet when you copy a set of cells or rows out into another workbook the visual basic code is left behind. When this happens, the analysis will not work.

We have found that you can force native Excel functions, singly or in combination, to perform very complex and powerful analyses.

We do use visual basic in our project office in a very particular way. We will only use it in the form of user defined functions. When we develop a useful user defined function we add it to our in-house Excel add-in and make it available on all our machines. This makes it possible to share spreadsheets and standard methods within our office.

This approach works fine for sharing material and methods in house but makes it hard to share your spreadsheets with the rest of the world – unless you share your excel add-ins with the rest of the world.

To effectively share your work with the rest of the world it is best practice to avoid all use of visual basic.

You may note that our standard spreadsheets use a visual basic add-in to help display mathematics. We developed this add-in to create critical additional functionality that Excel does not have, and to keep functionality constant for all users.

**26.2.3.6. Do not use Named Ranges Rule**

We have stopped using named ranges. This functionality in excel allows you to give a single cell or a range of cells a name rather than a cell reference. The problem with using this is that if you copy from multiple excel workbooks to a single excel workbook several problems will occur.

-   Common names can often be used across multiple excel sources. For example, ‘F’ for force. Excel will automatically rename these to avoid name duplicates in a single workbook.
-   If you define a name and don’t use it, it still exists in excel and persists as you copy the source material to multiple new workbooks. We have found that over time a workbook that has been developed from multiple excel sources using names can accumulate hundreds of unused names and eventually this will reduce stability and encourage crashes to occur.

If you do use named ranges in your workbooks these is an excellent free excel add-in that improves Excel’s native name management. It is available from JKP Application Development Services and is free. You can download it here: [http://www.jkp-ads.com/officemarketplacenm-en.asp](http://www.jkp-ads.com/officemarketplacenm-en.asp)

**26.2.3.7. Avoid Using the Solver**

The solver is a useful tool. However, every time the analysis input data is updated the solver had to be manually triggered. If the user does not know that the result of the analysis depends on the solver being used then the answer produced by the spreadsheet will be incorrect.

There are some work-arounds. Where an iterative solution is required this can be set up in a series of cells with a simple check for convergence built in.

Our [Beam-Column Analysis spreadsheet](https://www.abbottaerospace.com/wpdm-package/aa-sm-018-005) uses a simple iteration solver to solve the expression for the modification to the column allowable for eccentricity.

![](https://www.abbottaerospace.com/wp-content/uploads/2019/09/image-13.png)

**Figure 26.2.3‑6: Example of Work-around for Solver Alternative**

We have stopped using the solver (or the goal seek) and we have found an alternative and functioning solution every time where we would have used the solver.

## 26.2.4. Advanced Excel Methods

Source URL: https://www.abbottaerospace.com/aa-sb-001/26-microsoft-excel-as-a-report-writing-tool/26-2-excel-as-a-reporting-tool-the-basics/26-2-4-advanced-excel-methods/

[Reference:  Abbott, Richard. Analysis and Design of Composite and Metallic Flight Vehicle Structures 3 Edition, 2019](https://www.abbottaerospace.com/downloads/analysis-and-design/)

Reserved.

## 26.2.6. Creating NASTRAN Input Files Using Microsoft Excel

Source URL: https://www.abbottaerospace.com/aa-sb-001/26-microsoft-excel-as-a-report-writing-tool/26-2-excel-as-a-reporting-tool-the-basics/26-2-6-creating-nastran-input-files-using-microsoft-excel/

[Reference:  Abbott, Richard. Analysis and Design of Composite and Metallic Flight Vehicle Structures 3 Edition, 2019](https://www.abbottaerospace.com/downloads/analysis-and-design/)

This is one of my favorite and unexpected ways to integrate Excel with other analysis tools.

We typically use this method to process loads data from our loads analysis spreadsheets. But once the Bulk Data File format is known, any part of a finite element model can be created in excel, exported as a text file and imported into any NASTRAN pre-processor.

We use Excel to perform the loads analysis and generate the loads data at discrete points along the aircraft loads reference axes. We use excel again to generate aircraft loads envelopes and identify the critical loads cases. For most part 23 programs this is a set of 50-60 critical cases taken from an overall load set of 600-700 cases.

We use excel to generate the .bdf format file to be read into our NASTRAN preprocessor defined at the reference node locations.

The correct format can be created using the & operator. For example, this excel expression:

\=’NODE NUMBERS’!B3&”,”&’NODE NUMBERS’!C3&”,”&’NODE NUMBERS’!D3&”,”&’NODE NUMBERS’!G3&”,”&’NODE NUMBERS’!H3&”.,”&ROUND(‘NODE NUMBERS’!M3,3)&”,”&ROUND(‘NODE NUMBERS’!N3,3)&”,”&ROUND(‘NODE NUMBERS’!O3,3)

Becomes the following

FORCE,1,531037,0,1.,0,0,0

NASTRAN Force cards can be created in the correct format. Any applied loads can be done like this. With planning of the individual load application node numbers in the finite element model entire input decks can be created:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/09/image-14.png)

**Figure 26.2.6‑1: BDF Format Cell Entry in Excel**

The input deck should be created so it looks exactly as the .bdf file should look on the screen.

The input deck should exist in a worksheet tab of its own and that worksheet should include no other data.

This individual worksheet can be saved as a text format file. However, first you should save the whole workbook as a spreadsheet.

Once the workbook has been saved, with the worksheet with the bdf input deck selected, you should select “Save As” and then choose “Text (MS-DOS)”.

![](https://www.abbottaerospace.com/wp-content/uploads/2019/09/image-15.png)

**Figure 26.2.6‑2: Save as Text File**

Choose a file name and save slick save.

The following Dialog box will appear:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/09/image-16.png)

**Figure 26.2.6‑3: First Dialog Box**

Click “OK”, then this Dialog box will appear:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/09/image-17.png)

**Figure 26.2.6‑4: Second Dialog Box**

Click “Yes”.

When you open up the text file that has been created it will look something like this:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/09/image-18.png)

**Figure 26.2.6‑5: Raw Text File Output from Excel**

Note that each individual line of text is surrounded by quotation marks. These can be removed from the entire file by the ‘find and replace’ operation in Notepad, the Windows default text editor:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/09/image-19.png)

**Figure 26.2.6‑6: Replace Dialog Box in Notepad**

When this operation is complete the file will have the correct syntax:

![](https://www.abbottaerospace.com/wp-content/uploads/2019/09/image-20.png)

**Figure 26.2.6‑7: Excel Created BDF File – Correct Syntax**

The text file can be saved and the file extension can be changed to .dat or .bdf to aid importing into a NASTRAN preprocessor.

This example is limited to generating load input decks but any type of FE model data can be created in the same way.
