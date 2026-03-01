#!/usr/bin/env python3
"""
epub2jsonJa.py - Convert EPUB with Japanese/English parallel text to JSON for JapaneseReader
"""

import os
import re
import json
import sys
import argparse
from pathlib import Path
from bs4 import BeautifulSoup
import html


def extract_text_from_xhtml(file_path):
    """Extract Japanese and English text pairs from an XHTML file"""
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        soup = BeautifulSoup(content, "html.parser")

        # Find all paragraph elements with lang="ja" or class="author"
        # Based on the structure shown, Japanese text is in <p class="author" lang="ja"> or similar
        # English text is in <p class="author"> without lang="ja"

        paragraphs = []

        # Find all <p> tags with class="author"
        author_paragraphs = soup.find_all("p", class_="author")

        i = 0
        while i < len(author_paragraphs) - 1:
            p1 = author_paragraphs[i]
            p2 = author_paragraphs[i + 1]

            # Check if first is Japanese and second is English (or vice versa)
            p1_lang = p1.get("lang", "")
            p2_lang = p2.get("lang", "")

            p1_text = p1.get_text().strip()
            p2_text = p2.get_text().strip()

            # Skip empty paragraphs
            if not p1_text or not p2_text:
                i += 1
                continue

            # Case 1: First is Japanese, second is English
            if p1_lang == "ja" and p2_lang != "ja":
                # Check if Japanese text contains Japanese characters
                if re.search(r"[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]", p1_text):
                    paragraphs.append({"ja": p1_text, "en": p2_text})
                    i += 2
                    continue

            # Case 2: First is English, second is Japanese
            elif p1_lang != "ja" and p2_lang == "ja":
                if re.search(r"[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]", p2_text):
                    paragraphs.append({"ja": p2_text, "en": p1_text})
                    i += 2
                    continue

            # If no match, try to find Japanese text by character detection
            else:
                # Try to detect which one is Japanese
                p1_has_japanese = bool(
                    re.search(r"[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]", p1_text)
                )
                p2_has_japanese = bool(
                    re.search(r"[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]", p2_text)
                )

                if p1_has_japanese and not p2_has_japanese:
                    paragraphs.append({"ja": p1_text, "en": p2_text})
                    i += 2
                    continue
                elif p2_has_japanese and not p1_has_japanese:
                    paragraphs.append({"ja": p2_text, "en": p1_text})
                    i += 2
                    continue

            # If we can't determine, move forward one
            i += 1

        # Also check for paragraphs that might be in different structures
        # Look for any paragraphs with Japanese text and their following English counterpart
        all_paragraphs = soup.find_all("p")
        for i in range(len(all_paragraphs) - 1):
            p1 = all_paragraphs[i]
            p2 = all_paragraphs[i + 1]

            p1_text = p1.get_text().strip()
            p2_text = p2.get_text().strip()

            if not p1_text or not p2_text:
                continue

            # Check if we already have this pair
            already_exists = any(
                (para["ja"] == p1_text and para["en"] == p2_text)
                or (para["ja"] == p2_text and para["en"] == p1_text)
                for para in paragraphs
            )

            if already_exists:
                continue

            # Detect Japanese in first paragraph
            p1_has_japanese = bool(
                re.search(r"[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]", p1_text)
            )
            p2_has_japanese = bool(
                re.search(r"[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]", p2_text)
            )

            # If one has Japanese and the other doesn't, it's likely a pair
            if p1_has_japanese and not p2_has_japanese:
                # Make sure we don't add duplicate pairs
                if not any(para["ja"] == p1_text for para in paragraphs):
                    paragraphs.append({"ja": p1_text, "en": p2_text})
            elif p2_has_japanese and not p1_has_japanese:
                if not any(para["ja"] == p2_text for para in paragraphs):
                    paragraphs.append({"ja": p2_text, "en": p1_text})

        return paragraphs

    except Exception as e:
        print(f"Error processing {file_path}: {e}", file=sys.stderr)
        return []


def extract_title_from_xhtml(file_path):
    """Extract title from XHTML file"""
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        soup = BeautifulSoup(content, "html.parser")

        # Look for h1 or title elements
        h1 = soup.find("h1")
        if h1:
            return h1.get_text().strip()

        title = soup.find("title")
        if title:
            return title.get_text().strip()

        return None

    except Exception:
        return None


def get_section_id_from_filename(filename):
    """Extract section ID from filename"""
    # Remove extension and split by underscore
    base = os.path.splitext(filename)[0]

    # Handle patterns like ch001_split_000.xhtml
    match = re.search(r"(ch\d+)_split_\d+", base)
    if match:
        return match.group(1)

    # Handle title_page splits
    match = re.search(r"(title_page)_split_\d+", base)
    if match:
        return match.group(1)

    # Handle nav splits
    match = re.search(r"(nav)_split_\d+", base)
    if match:
        return match.group(1)

    return base


def process_epub_directory(epub_dir, output_file=None):
    """
    Process an EPUB directory structure and convert to JSON

    Args:
        epub_dir: Path to the extracted EPUB directory
        output_file: Output JSON file path (optional)

    Returns:
        List of sections with paragraphs
    """
    epub_path = Path(epub_dir)
    text_dir = epub_path / "EPUB" / "text"

    if not text_dir.exists():
        # Try alternative path structure
        text_dir = epub_path / "text"

    if not text_dir.exists():
        print(f"Error: Could not find text directory in {epub_dir}", file=sys.stderr)
        print(
            f"Searched in: {epub_path / 'EPUB' / 'text'} and {epub_path / 'text'}",
            file=sys.stderr,
        )
        return []

    # Find all XHTML files in the text directory
    xhtml_files = sorted(text_dir.glob("*.xhtml"))

    if not xhtml_files:
        print(f"Error: No XHTML files found in {text_dir}", file=sys.stderr)
        return []

    print(f"Found {len(xhtml_files)} XHTML files to process")

    # Group files by section
    sections_dict = {}

    for xhtml_file in xhtml_files:
        filename = xhtml_file.name
        section_id = get_section_id_from_filename(filename)

        # Skip cover and nav files if they don't contain paragraph pairs
        if filename == "cover.xhtml" or "nav" in filename:
            continue

        # Extract paragraphs from this file
        paragraphs = extract_text_from_xhtml(xhtml_file)

        if paragraphs:
            if section_id not in sections_dict:
                # Try to extract title from the first file of this section
                title = extract_title_from_xhtml(xhtml_file)

                sections_dict[section_id] = {
                    "id": section_id,
                    "filename": filename,
                    "title": {"ja": title} if title else None,
                    "paragraphs": paragraphs,
                }
            else:
                # Append paragraphs to existing section
                sections_dict[section_id]["paragraphs"].extend(paragraphs)
                # Keep the first filename as reference
                if "filenames" not in sections_dict[section_id]:
                    sections_dict[section_id]["filenames"] = [
                        sections_dict[section_id]["filename"]
                    ]
                    sections_dict[section_id]["filenames"].append(filename)
                else:
                    sections_dict[section_id]["filenames"].append(filename)

    # Convert to list and sort by section ID
    sections = []
    for section_id in sorted(sections_dict.keys()):
        section = sections_dict[section_id]

        # Remove any duplicate paragraphs within the same section
        unique_paragraphs = []
        seen_pairs = set()

        for para in section["paragraphs"]:
            pair_key = (para["ja"], para["en"])
            if pair_key not in seen_pairs:
                seen_pairs.add(pair_key)
                unique_paragraphs.append(para)

        section["paragraphs"] = unique_paragraphs

        # Clean up temporary fields
        if "filenames" in section:
            del section["filenames"]

        sections.append(section)

    print(f"Created {len(sections)} sections with paragraph pairs")

    # Save to JSON if output file specified
    if output_file:
        output_path = Path(output_file)

        # Create parent directories if they don't exist
        try:
            output_path.parent.mkdir(parents=True, exist_ok=True)
        except PermissionError:
            # If we don't have permission, try to save in current directory
            print(
                f"Warning: Cannot create directory {output_path.parent}. Saving to current directory instead."
            )
            output_path = Path.cwd() / output_path.name

        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(sections, f, ensure_ascii=False, indent=2)

        print(f"Saved JSON to {output_path}")

    return sections


def process_epub_directory_with_analysis(
    epub_dir, analyzer_script=None, output_file=None
):
    """
    Process EPUB directory and optionally run through Japanese analyzer

    Args:
        epub_dir: Path to the extracted EPUB directory
        analyzer_script: Path to the Japanese analyzer script (optional)
        output_file: Output JSON file path

    Returns:
        List of sections with analyzed paragraphs
    """
    # First, get the basic sections with paragraphs
    sections = process_epub_directory(epub_dir, output_file=None)

    if not sections:
        return []

    # If analyzer script is provided, run the analysis
    if analyzer_script and os.path.exists(analyzer_script):
        print(f"Running Japanese analysis using {analyzer_script}...")

        try:
            # Import the analyzer module
            import importlib.util

            spec = importlib.util.spec_from_file_location(
                "japanese_analyzer", analyzer_script
            )
            analyzer_module = importlib.util.module_from_spec(spec)
            spec.loader.exec_module(analyzer_module)

            # Check if the module has the expected class
            if hasattr(analyzer_module, "JapaneseSentenceAnalyzer"):
                analyzer = analyzer_module.JapaneseSentenceAnalyzer()

                # Process each paragraph in each section
                total_paragraphs = sum(
                    len(section["paragraphs"]) for section in sections
                )
                processed = 0

                for section_idx, section in enumerate(sections):
                    for para_idx, para in enumerate(section["paragraphs"]):
                        processed += 1
                        print(
                            f"Analyzing paragraph {processed}/{total_paragraphs}...",
                            end="\r",
                        )

                        # Analyze the Japanese text
                        try:
                            analysis = analyzer.analyze_sentence(para["ja"])
                            para["analysis"] = analysis
                        except Exception as e:
                            print(f"\nError analyzing paragraph: {e}")
                            para["analysis"] = []

                print(f"\nCompleted analysis of {processed} paragraphs")

            elif hasattr(analyzer_module, "process_japanese"):
                # Alternative function-based API
                for section_idx, section in enumerate(sections):
                    for para_idx, para in enumerate(section["paragraphs"]):
                        try:
                            sentences, full_translation = (
                                analyzer_module.process_japanese(para["ja"])
                            )
                            # Flatten sentences into words
                            analysis = []
                            for sentence in sentences:
                                analysis.extend(sentence)
                            para["analysis"] = analysis
                        except Exception as e:
                            print(f"Error analyzing paragraph: {e}")
                            para["analysis"] = []

        except Exception as e:
            print(f"Error loading analyzer script: {e}")
            print("Proceeding without analysis...")

    # Save to JSON if output file specified
    if output_file:
        output_path = Path(output_file)

        # Create parent directories if they don't exist
        try:
            output_path.parent.mkdir(parents=True, exist_ok=True)
        except PermissionError:
            # If we don't have permission, try to save in current directory
            print(
                f"Warning: Cannot create directory {output_path.parent}. Saving to current directory instead."
            )
            output_path = Path.cwd() / output_path.name

        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(sections, f, ensure_ascii=False, indent=2)

        print(f"Saved JSON to {output_path}")

    return sections


def main():
    # Configuration - EDIT THESE VALUES
    epub_file = (
        "/home/zaya/Downloads/Zayas/ZayasBooks/t/Downton-Abbey_Cinema-Screenplays-db-ja"
    )
    output_directory = (
        "/home/zaya/Downloads/Zayas/zaya-monorepo/apps/transliteration/public/json/ja"
    )
    with_analysis = False  # Set to True if you want to run analysis

    # Create output directory if it doesn't exist
    output_path = Path(output_directory)
    output_path.mkdir(parents=True, exist_ok=True)

    # Set output filename
    output_file = output_path / "epub_content_web-Downton-abbey.json"

    print(f"Processing EPUB directory: {epub_file}")
    print(f"Output will be saved to: {output_file}")
    print(f"Analysis enabled: {with_analysis}")

    if with_analysis:
        # You would need to specify the analyzer script path here
        analyzer_script = "/path/to/your/analyzer.py"  # Update this path
        sections = process_epub_directory_with_analysis(
            epub_file, analyzer_script=analyzer_script, output_file=output_file
        )
    else:
        sections = process_epub_directory(epub_file, output_file=output_file)

    # Print summary
    total_paragraphs = sum(len(section["paragraphs"]) for section in sections)
    print(f"\nSummary:")
    print(f"  Sections: {len(sections)}")
    print(f"  Total paragraphs: {total_paragraphs}")

    if sections and sections[0]["paragraphs"]:
        print(f"\nSample paragraph:")
        sample = sections[0]["paragraphs"][0]
        print(f"  JA: {sample['ja'][:50]}...")
        print(f"  EN: {sample['en'][:50]}...")
        if "analysis" in sample:
            print(f"  Analysis: {len(sample['analysis'])} words")


if __name__ == "__main__":
    main()
