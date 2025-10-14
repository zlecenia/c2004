#!/usr/bin/env python3
"""
Script to remove inline styles from HTML in TypeScript files
"""

import re
import sys

def remove_inline_styles(content):
    """Remove all style='...' and style="..." attributes from HTML"""
    # Remove style="..."
    content = re.sub(r'\s+style="[^"]*"', '', content)
    # Remove style='...'
    content = re.sub(r"\s+style='[^']*'", '', content)
    return content

def process_file(filepath):
    """Process a TypeScript file and remove inline styles"""
    print(f"Processing: {filepath}")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_length = len(content)
    cleaned_content = remove_inline_styles(content)
    removed_bytes = original_length - len(cleaned_content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(cleaned_content)
    
    print(f"✅ Removed {removed_bytes} bytes of inline styles")
    return removed_bytes

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python remove-inline-styles.py <file1.ts> [file2.ts...]")
        sys.exit(1)
    
    total_removed = 0
    for filepath in sys.argv[1:]:
        try:
            removed = process_file(filepath)
            total_removed += removed
        except Exception as e:
            print(f"❌ Error processing {filepath}: {e}")
    
    print(f"\n🎉 Total removed: {total_removed} bytes of inline styles")
