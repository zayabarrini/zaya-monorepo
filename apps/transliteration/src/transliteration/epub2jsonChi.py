#!/usr/bin/env python3
"""
epub2jsonChi.py - Convert EPUB with Chinese/English parallel text to JSON for ChineseReader
"""

import argparse
import html
import json
import os
import re
import sys
from pathlib import Path

from bs4 import BeautifulSoup


def extract_text_from_xhtml(file_path):
    """Extract Chinese and English text pairs from an XHTML file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        soup = BeautifulSoup(content, 'html.parser')
        paragraphs = []
        
        # Find all <p> tags with class="author" (based on your EPUB structure)
        author_paragraphs = soup.find_all('p', class_='author')
        
        i = 0
        while i < len(author_paragraphs) - 1:
            p1 = author_paragraphs[i]
            p2 = author_paragraphs[i + 1]
            
            # Check language attributes
            p1_lang = p1.get('lang', '')
            p2_lang = p2.get('lang', '')
            
            p1_text = p1.get_text().strip()
            p2_text = p2.get_text().strip()
            
            # Skip empty paragraphs
            if not p1_text or not p2_text:
                i += 1
                continue
            
            # Case 1: First is Chinese, second is English
            if p1_lang == 'zh' and p2_lang != 'zh':
                # Check if Chinese text contains Chinese characters
                if re.search(r'[\u4e00-\u9fff]', p1_text):
                    paragraphs.append({
                        'zh': p1_text,
                        'en': p2_text
                    })
                    i += 2
                    continue
            
            # Case 2: First is English, second is Chinese
            elif p1_lang != 'zh' and p2_lang == 'zh':
                if re.search(r'[\u4e00-\u9fff]', p2_text):
                    paragraphs.append({
                        'zh': p2_text,
                        'en': p1_text
                    })
                    i += 2
                    continue
            
            # If no language attribute, try character detection
            else:
                p1_has_chinese = bool(re.search(r'[\u4e00-\u9fff]', p1_text))
                p2_has_chinese = bool(re.search(r'[\u4e00-\u9fff]', p2_text))
                
                if p1_has_chinese and not p2_has_chinese:
                    paragraphs.append({
                        'zh': p1_text,
                        'en': p2_text
                    })
                    i += 2
                    continue
                elif p2_has_chinese and not p1_has_chinese:
                    paragraphs.append({
                        'zh': p2_text,
                        'en': p1_text
                    })
                    i += 2
                    continue
            
            i += 1
        
        return paragraphs
    
    except Exception as e:
        print(f"Error processing {file_path}: {e}", file=sys.stderr)
        return []

def extract_title_from_xhtml(file_path):
    """Extract title from XHTML file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        soup = BeautifulSoup(content, 'html.parser')
        
        # Look for h1 with lang="zh"
        h1 = soup.find('h1', lang='zh')
        if h1:
            return h1.get_text().strip()
        
        # Fallback to any h1
        h1 = soup.find('h1')
        if h1:
            return h1.get_text().strip()
        
        return None
    except Exception:
        return None

def get_section_id_from_filename(filename):
    """Extract section ID from filename"""
    base = os.path.splitext(filename)[0]
    
    # Handle patterns like ch001_split_000.xhtml
    match = re.search(r'(ch\d+)_split_\d+', base)
    if match:
        return match.group(1)
    
    # Handle title_page splits
    match = re.search(r'(title_page)_split_\d+', base)
    if match:
        return match.group(1)
    
    return base

def process_epub_directory(epub_dir, output_file=None):
    """Process an EPUB directory and convert to JSON"""
    epub_path = Path(epub_dir)
    text_dir = epub_path / 'EPUB' / 'text'
    
    if not text_dir.exists():
        text_dir = epub_path / 'text'
    
    if not text_dir.exists():
        print(f"Error: Could not find text directory in {epub_dir}", file=sys.stderr)
        return []
    
    # Find all XHTML files
    xhtml_files = sorted(text_dir.glob('*.xhtml'))
    
    if not xhtml_files:
        print(f"Error: No XHTML files found in {text_dir}", file=sys.stderr)
        return []
    
    print(f"Found {len(xhtml_files)} XHTML files to process")
    
    # Group files by section
    sections_dict = {}
    
    for xhtml_file in xhtml_files:
        filename = xhtml_file.name
        section_id = get_section_id_from_filename(filename)
        
        if filename == 'cover.xhtml' or 'nav' in filename:
            continue
        
        paragraphs = extract_text_from_xhtml(xhtml_file)
        
        if paragraphs:
            if section_id not in sections_dict:
                title = extract_title_from_xhtml(xhtml_file)
                
                sections_dict[section_id] = {
                    'id': section_id,
                    'filename': filename,
                    'title': {'zh': title} if title else None,
                    'paragraphs': paragraphs
                }
            else:
                sections_dict[section_id]['paragraphs'].extend(paragraphs)
    
    # Convert to list and sort
    sections = []
    for section_id in sorted(sections_dict.keys()):
        section = sections_dict[section_id]
        
        # Remove duplicates
        unique_paragraphs = []
        seen_pairs = set()
        
        for para in section['paragraphs']:
            pair_key = (para['zh'], para['en'])
            if pair_key not in seen_pairs:
                seen_pairs.add(pair_key)
                unique_paragraphs.append(para)
        
        section['paragraphs'] = unique_paragraphs
        sections.append(section)
    
    print(f"Created {len(sections)} sections with paragraph pairs")
    
    # Save to JSON
    if output_file:
        output_path = Path(output_file)
        output_path.parent.mkdir(parents=True, exist_ok=True)
        
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(sections, f, ensure_ascii=False, indent=2)
        
        print(f"Saved JSON to {output_path}")
    
    return sections

def main():
    # Configuration
    epub_dir = "/home/zaya/Downloads/Zayas/ZayasBooks/t/Downton-Abbey_-Cinema-Screenplays-db-ch"
    output_dir = "/home/zaya/Downloads/Zayas/zaya-monorepo/apps/signflow/static/json/zh"
    output_file = output_dir + "/epub_content_web-downton-db.json"
    
    # Create output directory
    Path(output_dir).mkdir(parents=True, exist_ok=True)
    
    print(f"Processing EPUB directory: {epub_dir}")
    print(f"Output will be saved to: {output_file}")
    
    sections = process_epub_directory(epub_dir, output_file=output_file)
    
    # Print summary
    total_paragraphs = sum(len(section['paragraphs']) for section in sections)
    print(f"\nSummary:")
    print(f"  Sections: {len(sections)}")
    print(f"  Total paragraphs: {total_paragraphs}")
    
    if sections and sections[0]['paragraphs']:
        print(f"\nSample paragraph:")
        sample = sections[0]['paragraphs'][0]
        print(f"  ZH: {sample['zh'][:50]}...")
        print(f"  EN: {sample['en'][:50]}...")

if __name__ == '__main__':
    main()