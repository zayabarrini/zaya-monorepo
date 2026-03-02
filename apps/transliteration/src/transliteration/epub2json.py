#!/usr/bin/env python3
"""
epub2json.py - Convert EPUB with parallel text to JSON for language learning readers

The script detects the language code from the EPUB title (e.g., title-ar, title-es, title-zh)
and uses that as the target language, with English as the source language.
"""

import argparse
import html
import json
import os
import re
import sys
from pathlib import Path

from bs4 import BeautifulSoup

# Supported language codes
SUPPORTED_LANGUAGES = [
    "ar",
    "de",
    "el",
    "es",
    "fr",
    "he",
    "id",
    "it",
    "ja",
    "ko",
    "la",
    "pl",
    "pt",
    "sw",
    "tr",
    "zh",
]


def detect_language_from_filename(filename):
    """
    Detect the target language from the EPUB filename.
    Looks for patterns like title-ar, title-es, title-zh at the end of the filename.
    """
    stem = Path(filename).stem

    # Check for language code at the end with a hyphen
    for lang in SUPPORTED_LANGUAGES:
        if stem.endswith(f"-{lang}"):
            return lang

    # Check for language code after an underscore
    for lang in SUPPORTED_LANGUAGES:
        if stem.endswith(f"_{lang}"):
            return lang

    return None


def get_language_unicode_ranges(lang_code):
    """Get Unicode ranges for character detection for the specified language"""
    ranges = {
        "zh": r"[\u4e00-\u9fff]",  # Chinese
        "ja": r"[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]",  # Japanese (Hiragana, Katakana, Kanji)
        "ko": r"[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]",  # Korean (Hangul)
        "ar": r"[\u0600-\u06FF\u0750-\u077F]",  # Arabic
        "he": r"[\u0590-\u05FF]",  # Hebrew
        "ru": r"[\u0400-\u04FF]",  # Russian Cyrillic
        "el": r"[\u0370-\u03FF]",  # Greek
        "th": r"[\u0E00-\u0E7F]",  # Thai
        "vi": r"[\u1EA0-\u1EF9]",  # Vietnamese
    }

    # Return the range for the language, or a generic non-Latin range as fallback
    return ranges.get(lang_code, r"[^\u0000-\u007F]")  # Any non-ASCII as fallback


def extract_text_from_xhtml(file_path, target_lang):
    """Extract target language and English text pairs from an XHTML file"""
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        soup = BeautifulSoup(content, "html.parser")
        paragraphs = []

        # Get Unicode range for target language detection
        lang_range = get_language_unicode_ranges(target_lang)

        # Find all <p> tags (focus on class="author" as in the examples)
        # But also look for any paragraphs that might contain the language pair
        author_paragraphs = soup.find_all("p", class_="author")

        if not author_paragraphs:
            # If no author paragraphs, try all paragraphs
            author_paragraphs = soup.find_all("p")

        i = 0
        while i < len(author_paragraphs) - 1:
            p1 = author_paragraphs[i]
            p2 = author_paragraphs[i + 1]

            # Check language attributes
            p1_lang = p1.get("lang", "")
            p2_lang = p2.get("lang", "")

            p1_text = p1.get_text().strip()
            p2_text = p2.get_text().strip()

            # Skip empty paragraphs
            if not p1_text or not p2_text:
                i += 1
                continue

            # Case 1: First is target language, second is English
            if p1_lang == target_lang and p2_lang != target_lang:
                # Verify with character detection
                if re.search(lang_range, p1_text):
                    paragraphs.append({target_lang: p1_text, "en": p2_text})
                    i += 2
                    continue

            # Case 2: First is English, second is target language
            elif p1_lang != target_lang and p2_lang == target_lang:
                if re.search(lang_range, p2_text):
                    paragraphs.append({target_lang: p2_text, "en": p1_text})
                    i += 2
                    continue

            # If no language attribute, try character detection
            else:
                p1_has_target = bool(re.search(lang_range, p1_text))
                p2_has_target = bool(re.search(lang_range, p2_text))

                # Check if one has target language and the other appears to be English
                # (English is mostly ASCII with possible punctuation)
                p1_is_english = bool(re.match(r'^[A-Za-z0-9\s\.,!?\'"-]+$', p1_text))
                p2_is_english = bool(re.match(r'^[A-Za-z0-9\s\.,!?\'"-]+$', p2_text))

                if p1_has_target and p2_is_english:
                    paragraphs.append({target_lang: p1_text, "en": p2_text})
                    i += 2
                    continue
                elif p2_has_target and p1_is_english:
                    paragraphs.append({target_lang: p2_text, "en": p1_text})
                    i += 2
                    continue

            i += 1

        return paragraphs

    except Exception as e:
        print(f"Error processing {file_path}: {e}", file=sys.stderr)
        return []


def extract_title_from_xhtml(file_path, target_lang):
    """Extract title from XHTML file, preferring the target language"""
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        soup = BeautifulSoup(content, "html.parser")

        # Look for h1 with target language
        h1 = soup.find("h1", lang=target_lang)
        if h1:
            return h1.get_text().strip()

        # Look for any h1 that might be in the target language (by character detection)
        lang_range = get_language_unicode_ranges(target_lang)
        for h1 in soup.find_all("h1"):
            text = h1.get_text().strip()
            if re.search(lang_range, text):
                return text

        # Fallback to any h1
        h1 = soup.find("h1")
        if h1:
            return h1.get_text().strip()

        return None
    except Exception:
        return None


def get_section_id_from_filename(filename):
    """Extract section ID from filename"""
    base = os.path.splitext(filename)[0]

    # Handle patterns like ch001_split_000.xhtml
    match = re.search(r"(ch\d+)_split_\d+", base)
    if match:
        return match.group(1)

    # Handle title_page splits
    match = re.search(r"(title_page)_split_\d+", base)
    if match:
        return match.group(1)

    return base


def process_epub_directory(epub_dir, target_lang, output_file=None):
    """Process an EPUB directory and convert to JSON"""
    epub_path = Path(epub_dir)

    # Try different possible text directory structures
    text_dirs = [
        epub_path / "EPUB" / "text",
        epub_path / "text",
        epub_path / "EPUB",
        epub_path,
    ]

    text_dir = None
    for dir_path in text_dirs:
        if dir_path.exists() and any(dir_path.glob("*.xhtml")):
            text_dir = dir_path
            break

    if not text_dir:
        print(
            f"Error: Could not find directory with XHTML files in {epub_dir}",
            file=sys.stderr,
        )
        return []

    # Find all XHTML files
    xhtml_files = sorted(text_dir.glob("*.xhtml"))

    if not xhtml_files:
        print(f"Error: No XHTML files found in {text_dir}", file=sys.stderr)
        return []

    print(f"Found {len(xhtml_files)} XHTML files to process")
    print(f"Target language: {target_lang}")

    # Group files by section
    sections_dict = {}

    for xhtml_file in xhtml_files:
        filename = xhtml_file.name

        # Skip navigation and cover files
        if (
            "nav" in filename.lower()
            or "cover" in filename.lower()
            or "toc" in filename.lower()
        ):
            continue

        section_id = get_section_id_from_filename(filename)

        paragraphs = extract_text_from_xhtml(xhtml_file, target_lang)

        if paragraphs:
            if section_id not in sections_dict:
                title = extract_title_from_xhtml(xhtml_file, target_lang)

                sections_dict[section_id] = {
                    "id": section_id,
                    "filename": filename,
                    "title": {target_lang: title} if title else None,
                    "paragraphs": paragraphs,
                }
            else:
                sections_dict[section_id]["paragraphs"].extend(paragraphs)

    # Convert to list and sort
    sections = []
    for section_id in sorted(sections_dict.keys()):
        section = sections_dict[section_id]

        # Remove duplicates
        unique_paragraphs = []
        seen_pairs = set()

        for para in section["paragraphs"]:
            pair_key = (para[target_lang], para["en"])
            if pair_key not in seen_pairs:
                seen_pairs.add(pair_key)
                unique_paragraphs.append(para)

        section["paragraphs"] = unique_paragraphs
        sections.append(section)

    print(f"Created {len(sections)} sections with paragraph pairs")

    # Save to JSON if output file specified
    if output_file:
        output_path = Path(output_file)
        output_path.parent.mkdir(parents=True, exist_ok=True)

        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(sections, f, ensure_ascii=False, indent=2)

        print(f"Saved JSON to {output_path}")

    return sections


def main():
    parser = argparse.ArgumentParser(
        description="Convert EPUB with parallel text to JSON"
    )
    parser.add_argument("epub_dir", help="Path to the extracted EPUB directory")
    parser.add_argument(
        "-o",
        "--output",
        help="Output JSON file path (default: auto-generated from input)",
    )
    parser.add_argument(
        "-l",
        "--lang",
        help="Target language code (e.g., zh, ja, es). If not provided, detected from filename",
    )

    args = parser.parse_args()

    # Detect language from directory name if not provided
    target_lang = args.lang
    if not target_lang:
        target_lang = detect_language_from_filename(args.epub_dir)
        if not target_lang:
            print(
                "Error: Could not detect language from directory name. Please specify with --lang",
                file=sys.stderr,
            )
            print(
                f"Supported languages: {', '.join(SUPPORTED_LANGUAGES)}",
                file=sys.stderr,
            )
            sys.exit(1)

    # Generate output filename if not provided
    if not args.output:
        input_path = Path(args.epub_dir)
        output_dir = Path.cwd()
        output_file = output_dir / f"epub_content_{input_path.stem}.json"
    else:
        output_file = args.output

    print(f"Processing EPUB directory: {args.epub_dir}")
    print(f"Target language: {target_lang}")
    print(f"Output will be saved to: {output_file}")

    sections = process_epub_directory(
        args.epub_dir, target_lang, output_file=output_file
    )

    # Print summary
    total_paragraphs = sum(len(section["paragraphs"]) for section in sections)
    print(f"\nSummary:")
    print(f"  Sections: {len(sections)}")
    print(f"  Total paragraphs: {total_paragraphs}")

    if sections and sections[0]["paragraphs"]:
        print(f"\nSample paragraph:")
        sample = sections[0]["paragraphs"][0]
        print(f"  {target_lang.upper()}: {sample[target_lang][:50]}...")
        print(f"  EN: {sample['en'][:50]}...")


if __name__ == "__main__":

    main()
