// frontend/tests/fix-broken-console.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcPath = path.join(__dirname, '../src');

console.log('🔧 Fixing Broken Console Statements...');

let fixedFiles = 0;
let totalFixes = 0;

function fixBrokenConsoleStatements(filePath) {
  if (!filePath.endsWith('.ts') && !filePath.endsWith('.js')) return;
  
  try {
    const originalContent = fs.readFileSync(filePath, 'utf8');
    let content = originalContent;
    let fileModified = false;
    const relativePath = path.relative(srcPath, filePath);
    
    console.log(`🔍 Fixing ${relativePath}...`);
    
    // Fix broken console.log statements - pattern 1: // // console\n\s*.log(
    const brokenPattern1 = /\/\/ \/\/ console\s*\n\s*\.log\([^)]*\);?\s*\/\/ Auto[^;]*;?/gm;
    const matches1 = content.match(brokenPattern1);
    if (matches1) {
      content = content.replace(brokenPattern1, '// console.log() // Auto-commented by lint-fix');
      totalFixes += matches1.length;
      fileModified = true;
      console.log(`  🔧 Fixed ${matches1.length} broken console patterns (type 1)`);
    }
    
    // Fix broken console.log statements - pattern 2: // console\n\s*.log(
    const brokenPattern2 = /\/\/ console\s*\n\s*\.log\([^)]*\);?\s*\/\/ Auto[^;]*;?/gm;
    const matches2 = content.match(brokenPattern2);
    if (matches2) {
      content = content.replace(brokenPattern2, '// console.log() // Auto-commented by lint-fix');
      totalFixes += matches2.length;
      fileModified = true;
      console.log(`  🔧 Fixed ${matches2.length} broken console patterns (type 2)`);
    }
    
    // Fix broken multiline console statements - pattern 3
    const brokenPattern3 = /\/\/ \/\/ console\s*\n[^}]*?\.log\([^}]*?\);?[^}]*?\/\/ Auto[^}]*?;?/gm;
    const matches3 = content.match(brokenPattern3);
    if (matches3) {
      content = content.replace(brokenPattern3, '// console.log() // Auto-commented by lint-fix');
      totalFixes += matches3.length;
      fileModified = true;
      console.log(`  🔧 Fixed ${matches3.length} broken console patterns (type 3)`);
    }
    
    // Fix any remaining malformed console patterns
    const brokenPattern4 = /\/\/ console\s*\n[^}]*?\.log[^}]*?\/\/ Auto[^}]*?;?/gm;
    const matches4 = content.match(brokenPattern4);
    if (matches4) {
      content = content.replace(brokenPattern4, '// console.log() // Auto-commented by lint-fix');
      totalFixes += matches4.length;
      fileModified = true;
      console.log(`  🔧 Fixed ${matches4.length} broken console patterns (type 4)`);
    }
    
    // Fix standalone broken lines like ".log('message')"
    const brokenPattern5 = /^\s*\.log\([^)]*\);?\s*$/gm;
    const matches5 = content.match(brokenPattern5);
    if (matches5) {
      content = content.replace(brokenPattern5, '// Removed broken console statement');
      totalFixes += matches5.length;
      fileModified = true;
      console.log(`  🔧 Fixed ${matches5.length} standalone broken log statements`);
    }
    
    // Fix incomplete console statements that cause syntax errors
    const brokenPattern6 = /\/\/ \/\/ console[^;]*?\n\s*\.[^;]*?\n\s*\.[^;]*?\n/gm;
    const matches6 = content.match(brokenPattern6);
    if (matches6) {
      content = content.replace(brokenPattern6, '// console.log() // Auto-commented by lint-fix\n');
      totalFixes += matches6.length;
      fileModified = true;
      console.log(`  🔧 Fixed ${matches6.length} incomplete console patterns`);
    }

    // Write file only if modified
    if (fileModified) {
      fs.writeFileSync(filePath, content, 'utf8');
      fixedFiles++;
      console.log(`  ✅ Fixed file ${relativePath}`);
    } else {
      console.log(`  ✨ No broken console statements in ${relativePath}`);
    }
    
  } catch (error) {
    console.log(`  ❌ Error fixing ${path.relative(srcPath, filePath)}: ${error.message}`);
  }
}

function processDirectory(dir) {
  try {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        if (['node_modules', '.git', 'dist', 'build'].includes(item)) continue;
        processDirectory(fullPath);
      } else {
        fixBrokenConsoleStatements(fullPath);
      }
    }
  } catch (error) {
    console.log(`⚠️ Error processing directory ${dir}: ${error.message}`);
  }
}

console.log('🚀 Starting broken console fix process...\n');
processDirectory(srcPath);

console.log('\n📊 Console Fix Summary:');
console.log(`  📁 Files processed: ${fixedFiles}`);
console.log(`  🔧 Total fixes applied: ${totalFixes}`);

if (totalFixes > 0) {
  console.log(`\n✅ Fixed ${totalFixes} broken console statements in ${fixedFiles} files!`);
} else {
  console.log('\n✨ No broken console statements found!');
}
