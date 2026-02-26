---
title: "Internet Language"
imgUrl: "/css/img/NdP/KleinsBottle-Game-22.png"
youtubeId: ""
publishedAt: "2025-11-20"
updatedAt: "2025-11-20"
summary: "Before Unicode, the digital world was a mess of incompatible character encodings like ASCII (English), ISO-8859-1 (Western Europe), Shift-JIS (Japan), and KOI-8-R (Russia). A document created in one encoding would appear as gibberish on a system using another. There was no way to represent multiple writing systems in a single document."
---

# The history of PDF, DJvu, Latex, Markdown, Unicodes

Of course. This is a fascinating journey through the evolution of digital text, formatting, and encoding. Here is a detailed history of each, showing how they are interconnected and solved different problems.

### 1. Unicode: The Foundation of Universal Text

**The Problem:** Before Unicode, the digital world was a mess of incompatible character encodings like ASCII (English), ISO-8859-1 (Western Europe), Shift-JIS (Japan), and KOI-8-R (Russia). A document created in one encoding would appear as gibberish on a system using another. There was no way to represent multiple writing systems in a single document.

**The History:**

- **1987-1988:** The idea for a universal character set was conceived by engineers from Xerox (Joe Becker) and Apple (Lee Collins and Mark Davis). They aimed to create a "unique, unified, universal" encoding.
- **1991:** The **Unicode Consortium** was founded, and **Unicode 1.0** was released. It initially aimed to be a 16-bit encoding, capable of representing about 65,000 characters, which was thought to be sufficient for all modern languages.
- **The Expansion:** It quickly became clear that 65,000 characters were not enough to cover all historical scripts, mathematical symbols, emoji, and rare Han characters. The standard was expanded beyond the original 16-bit model.
- **UTF-8 (1993):** A brilliant solution emerged: **UTF-8** (Unicode Transformation Format - 8-bit). It's a variable-width encoding that is backward-compatible with ASCII. This made adoption incredibly easy, as all existing ASCII text was already valid UTF-8. It is now the dominant character encoding on the web and in most operating systems.
- **Modern Day:** Unicode continues to evolve, adding new scripts, emoji, and symbols with each version. It forms the foundational layer that allows all the other technologies listed below to handle text from any language.

**Key Idea:** **Unicode provides a unique number for every character, no matter the platform, program, or language.**

---

### 2. LaTeX: Precision Typesetting for Academia

**The Problem:** In the 1970s and 80s, typesetting complex mathematical formulas and scientific documents on early computers was extremely difficult. Word processors were WYSIWYG ("What You See Is What You Get") but offered little control over layout, spacing, and cross-referencing for large documents.

**The History:**

- **1978:** Donald Knuth, a renowned computer scientist, was frustrated with the declining quality of typesetting for the second edition of his book _The Art of Computer Programming_. He decided to create his own digital typesetting system, which he named **TeX**.
- **1980s:** Leslie Lamport built upon TeX, creating a collection of macros that made the system much easier to use. This system was called **LaTeX** (pronounced "Lay-tech" or "Lah-tech").
- **The Philosophy:** LaTeX is a **markup language**. Instead of a WYSIWYG editor, you write plain text with commands (e.g., `\section{Introduction}` or `$E=mc^2$` to create an equation). You then "compile" this source file into a final output, typically a PDF. This separates content from formatting.
- **Legacy:** LaTeX became the undisputed standard for publishing in mathematics, computer science, physics, and many other technical fields. It excels at handling complex equations, bibliographies, cross-references, and producing consistently beautiful, professional-looking documents.

**Key Idea:** **LaTeX is a powerful, programmatic system for high-quality typesetting, especially for technical and scientific documents.**

---

### 3. PDF: The Digital Printout

**The Problem:** In the early 1990s, sharing documents electronically was unreliable. Fonts, images, and layout would often change depending on the computer, software, or printer used. There was no way to guarantee that what you saw on your screen was what others would see.

**The History:**

- **1990:** The "Camelot" project was initiated at Adobe Systems by co-founder John Warnock. The goal was "to capture documents from any application, send electronic versions of these documents anywhere, and view and print them on any machine."
- **1993:** Camelot was released as the **Portable Document Format (PDF)** along with Acrobat Reader (free) and Acrobat Distiller (commercial).
- **The Philosophy:** A PDF file encapsulates a complete description of a fixed-layout document, including all text, fonts, vector graphics, raster images, and formatting information. It is essentially a **digital piece of paper**.
- **Rise to Dominance:** Adoption was slow initially, but it exploded with the rise of the internet as a way to share documents that looked identical for everyone. It became an open standard (ISO 32000) in 2008, cementing its role as a universal format.

**Key Idea:** **PDF preserves the exact visual appearance of a document, independent of software, hardware, or operating system.**

---

### 4. DjVu: The Scanner's Companion

**The Problem:** In the late 1990s, scanning high-resolution, image-heavy documents like old books, manuscripts, and magazines resulted in massive file sizes. PDFs at the time were not efficient at compressing such content, making online distribution impractical.

**The History:**

- **1996-1999:** Developed primarily by Yann Le Cun, Léon Bottou, and Patrick Haffner at AT&T Labs, **DjVu** (pronounced "déjà vu") was designed specifically for this purpose.
- **The Technology:** DjVu uses a sophisticated technology that separates a scanned page into multiple layers: a high-resolution background layer (for the paper texture and pictures) and a foreground layer (for the text and line art). Each layer is compressed with the most efficient algorithm (e.g., IW44 for the background, JB2 for the foreground).
- **The Result:** DjVu can achieve compression ratios 5-10 times better than PDF for scanned color documents, while maintaining high visual fidelity.
- **Legacy:** While it never achieved the mainstream popularity of PDF, DjVu remains a gold standard in digital libraries (like the Internet Archive) for distributing high-quality scans of historical books and documents with very small file sizes.

**Key Idea:** **DjVu is a highly specialized format for compressing scanned documents, especially those with color images and text, to very small file sizes.**

---

### 5. Markdown: Readable Simplicity for the Web

**The Problem:** In the early 2000s, writing content for the web required knowledge of verbose and complex HTML. This was a barrier for bloggers, forum users, and technical writers who wanted to focus on content, not markup tags.

**The History:**

- **2004:** John Gruber, with significant contributions from Aaron Swartz, created **Markdown** with the goal of enabling people "to write using an easy-to-read, easy-to-write plain text format, and optionally convert it to structurally valid XHTML (or HTML)."
- **The Philosophy:** Markdown's syntax is designed to be intuitive and readable even in its raw form. For example, `#` creates a heading, `**bold**` creates bold text, and `[link](url)` creates a hyperlink.
- **Proliferation:** Its simplicity led to massive adoption in blogs (WordPress), documentation (GitHub, GitLab), forums (Reddit), and note-taking apps (Obsidian, Notion). It became the _de facto_ standard for README files in software projects.
- **Flavors:** Due to its popularity, many "flavors" of Markdown emerged (like GitHub Flavored Markdown, CommonMark) that added features like tables, syntax highlighting for code, and footnotes.

**Key Idea:** **Markdown is a lightweight markup language for creating formatted text using a plain text editor, prioritizing human readability and ease of writing.**

---

### Summary: How They Fit Together

These technologies represent different layers and philosophies in the digital document ecosystem:

- **Unicode** is the **alphabet**: It ensures the characters themselves are universal.
- **LaTeX** is the **typesetting engine**: It focuses on precision and beauty for complex layouts.
- **Markdown** is the **lightweight writer**: It focuses on simplicity and readability for web-centric content.
- **PDF** is the **final, fixed product**: It ensures the visual result is preserved exactly.
- **DjVu** is the **specialized archiver**: It optimizes the storage and sharing of scanned image-documents.

A typical modern workflow might involve: Writing a document in **Markdown** (using **Unicode**), converting it to **LaTeX** for fine-tuned formatting, and finally compiling it into a **PDF** for distribution. Meanwhile, a library might use **DjVu** to put a scanned 19th-century biology textbook online. They are all complementary pieces of the puzzle of digital communication.

# The issues with converting PDF to Latex

Of course. Converting from PDF to LaTeX is a classic problem in digital document processing, and it's notoriously difficult. The core issue is that you're attempting to reverse-engineer a complex, presentational format back into a semantic, structural one.

Here are the primary issues, categorized from fundamental to practical.

### 1. The Fundamental Philosophical Mismatch

- **PDF is for Presentation, LaTeX is for Structure and Content.**
  - A **PDF** describes _where_ to put ink on a page. It's a set of instructions: "Draw this character glyph in this font at this (x,y) position." It has no inherent concept of a "section," "caption," or "equation"—it's just a collection of graphical elements.
  - **LaTeX** is a _source code_ that describes the _logical structure_ and _content_ of a document. You declare `\section{Introduction}`, and the system decides how to format it. The content and the styling are separate.

Converting from PDF to LaTeX is like trying to convert a compiled machine code binary (the PDF) back into human-readable source code in C++ or Python (the LaTeX). A lot of the original intent and structure is lost in the compilation process.

### 2. The "Text Extraction" Problem

This is the first and most common hurdle. Simply getting the text out in the correct order is non-trivial.

- **Non-Linear Text Flow:** Text in a PDF is not necessarily stored in reading order. A two-column document might have the text stored as: [Column1 Line1, Column2 Line1, Column1 Line2, Column2 Line2...]. A simple text extractor will produce gibberish.
- **Invisible or Zero-Width Characters:** These are sometimes used for precise layout control and can confuse extraction algorithms.
- **Custom Encoding and "ToUnicode" Maps:** If a PDF uses a non-standard font and its "ToUnicode" map (the table that tells a PDF reader which character code corresponds to which Unicode value) is missing or incorrect, the extracted text will be complete nonsense. This is a common issue with older PDFs created by non-standard software.

### 3. The "Layout Analysis" Problem (The "AI" Part)

Once you have the raw text, the converter must guess the document's structure. This is an Artificial Intelligence problem and is error-prone.

- **Distinguishing Body Text from Floats:** Is this block of text at the top of the page the start of a new section, or a figure/table that was placed there?
- **Identifying Headers and Sections:** The converter must use heuristics like font size, boldness, and positioning to guess what is a `\chapter`, `\section`, or `\subsection`. It often gets the nesting level wrong.
- **Handling Floats (Figures and Tables):** Re-associating a floating figure with its `\caption` and its in-text `\label` and `\ref` is incredibly difficult. The converter typically just places the image and caption in-line where it happens to appear in that particular PDF, destroying the original LaTeX float logic.
- **Footnotes and Marginalia:** Extracting footnotes and correctly re-linking them to their reference mark in the text is a complex task.

### 4. The "Mathematical Formula" Problem

This is one of the biggest pain points for academic users.

- **Formulas as Graphics:** In many PDFs, especially those scanned or created from non-LaTeX sources, mathematical formulas are not text at all but _raster images_ (pictures). You cannot extract what isn't text.
- **Custom Fonts for Math:** Even if the formula is made of text, it often uses special mathematical fonts where, for example, the glyph for "a" is actually the mathematical italic 'a'. The extractor sees a standard "a" and has no idea it's part of a formula.
- **Spatial, Not Semantic, Layout:** A fraction like `½` might be represented by a "1", then a movement down and left, then a horizontal line, then a movement down and right, then a "2". The converter must recognize this spatial arrangement and reconstruct the semantic LaTeX code `\frac{1}{2}`. This is very hard to do perfectly for complex expressions like integrals and matrices.

### 5. The "Formatting and Styles" Problem

- **Explicit vs. Implicit Formatting:** A PDF might just show a line of text in a large, bold font. LaTeX needs to know if that was declared as `\title`, `\section`, or just `{\Large \bfseries Some Text}`. The converter has to guess.
- **Tables:** Reconstructing a table from a PDF is a nightmare. What appears as a grid to the human eye is just a set of lines and text at specific coordinates. Rebuilding the logical cell structure and row/column relationships is a major challenge.
- **Lists:** Distinguishing between numbered and bulleted lists and understanding their nesting levels is done heuristically and often fails.

### 6. Loss of Semantic Information

All the meta-information that makes a LaTeX document powerful is gone in the PDF:

- **Cross-references:** The `\label{fig:my_graph}` and `\ref{fig:my_graph}` system is completely lost. The PDF just shows a static number like "Figure 3".
- **Bibliographies:** The `\cite{smith2020}` command is lost. The PDF just shows "(Smith et al., 2020)". Converting this back requires a separate reference parsing step, which is another complex problem.
- **Macros and Custom Commands:** Any user-defined `\newcommand` is, of course, long gone.

### Practical Consequences and Workflow

Because of these issues, a direct PDF-to-LaTeX conversion is never perfect. The output is typically:

1.  A mess of hard-coded font sizes and manual spacing commands (`\vspace{5pt}`, `\hspace{1cm}`) instead of using LaTeX's logical commands.
2.  Full of errors in mathematical formulas, tables, and sectioning.
3.  A "write-only" document that is very difficult to edit or maintain.

The resulting LaTeX file often requires so much manual cleanup that it's frequently faster to **retype the document from scratch** in LaTeX, using the PDF as a visual reference. For simple, well-structured, text-heavy documents, conversion tools can provide a useful starting point, but for any technical or academic paper, they are more of a headache than a solution.
