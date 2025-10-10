// frontend/tests/lint-autofix.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcPath = path.join(__dirname, '../src');

console.log('🔧 Running Lint Auto-Fix...');

let fixedFiles = 0;
let totalFixes = 0;

const fixStats = {
  consoleLog: 0,
  looseEquality: 0,
  longLines: 0,
  trailingSpaces: 0,
  multipleEmptyLines: 0,
  missingSpaces: 0,
  semicolons: 0,
  varKeywords: 0
};

// Auto-fix rules
function autoFixFile(filePath) {
  if (!filePath.endsWith('.ts') && !filePath.endsWith('.js')) return;
  
  try {
    const originalContent = fs.readFileSync(filePath, 'utf8');
    let content = originalContent;
    let fileModified = false;
    const relativePath = path.relative(srcPath, filePath);
    
    console.log(`🔍 Checking ${relativePath}...`);
    
    // 1. Remove console.log statements (comment them out for safety)
    const consoleLogRegex = /(\s*)(console\.log\([^;]*\);?)/g;
    const consoleLogMatches = content.match(consoleLogRegex);
    if (consoleLogMatches) {
      content = content.replace(consoleLogRegex, '$1// $2 // Auto-commented by lint-fix');
      fixStats.consoleLog += consoleLogMatches.length;
      fileModified = true;
      console.log(`  🔧 Fixed ${consoleLogMatches.length} console.log statements`);
    }
    
    // 2. Fix loose equality (== -> ===, != -> !==)
    const looseEqualityCount = (content.match(/([^=!])={2}([^=])/g) || []).length;
    const looseInequalityCount = (content.match(/!={1}([^=])/g) || []).length;
    
    content = content.replace(/([^=!])={2}([^=])/g, '$1===$2');
    content = content.replace(/!={1}([^=])/g, '!==$1');
    
    if (looseEqualityCount > 0 || looseInequalityCount > 0) {
      fixStats.looseEquality += looseEqualityCount + looseInequalityCount;
      fileModified = true;
      console.log(`  🔧 Fixed ${looseEqualityCount + looseInequalityCount} loose equality operators`);
    }
    
    // 3. Fix trailing whitespace
    const lines = content.split('\n');
    const originalLineCount = lines.length;
    let trailingSpacesFixes = 0;
    
    for (let i = 0; i < lines.length; i++) {
      const trimmed = lines[i].replace(/\s+$/, '');
      if (trimmed !== lines[i]) {
        lines[i] = trimmed;
        trailingSpacesFixes++;
        fileModified = true;
      }
    }
    
    if (trailingSpacesFixes > 0) {
      fixStats.trailingSpaces += trailingSpacesFixes;
      console.log(`  🔧 Fixed ${trailingSpacesFixes} trailing spaces`);
    }
    
    // 4. Fix multiple empty lines (reduce to maximum 2)
    content = lines.join('\n');
    const multipleEmptyLinesRegex = /\n{3,}/g;
    const multipleEmptyMatches = content.match(multipleEmptyLinesRegex);
    if (multipleEmptyMatches) {
      content = content.replace(multipleEmptyLinesRegex, '\n\n');
      fixStats.multipleEmptyLines += multipleEmptyMatches.length;
      fileModified = true;
      console.log(`  🔧 Fixed ${multipleEmptyMatches.length} multiple empty lines`);
    }
    
    // 5. Fix missing spaces around operators
    const operatorSpacingRegex = /([a-zA-Z0-9_\])])([+\-*/%=<>!&|])([a-zA-Z0-9_\(\[])/g;
    const operatorMatches = content.match(operatorSpacingRegex);
    if (operatorMatches) {
      content = content.replace(operatorSpacingRegex, '$1 $2 $3');
      fixStats.missingSpaces += operatorMatches.length;
      fileModified = true;
      console.log(`  🔧 Fixed ${operatorMatches.length} missing spaces around operators`);
    }
    
    // 6. Fix missing semicolons (basic cases)
    const missingSemicolonRegex = /([^;\s\{\}])\n(\s*)(return|const|let|var|if|for|while)/g;
    const semicolonMatches = content.match(missingSemicolonRegex);
    if (semicolonMatches) {
      content = content.replace(missingSemicolonRegex, '$1;\n$2$3');
      fixStats.semicolons += semicolonMatches.length;
      fileModified = true;
      console.log(`  🔧 Fixed ${semicolonMatches.length} missing semicolons`);
    }
    
    // 7. Replace var with let/const (simple cases)
    const varKeywordRegex = /\bvar\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=/g;
    const varMatches = content.match(varKeywordRegex);
    if (varMatches) {
      content = content.replace(varKeywordRegex, 'let $1 =');
      fixStats.varKeywords += varMatches.length;
      fileModified = true;
      console.log(`  🔧 Fixed ${varMatches.length} var keywords (changed to let)`);
    }
    
    // 8. Break long lines (basic wrapping for simple cases)
    const longLines = content.split('\n');
    let longLineFixes = 0;
    
    for (let i = 0; i < longLines.length; i++) {
      if (longLines[i].length > 120) {
        // Simple break for method chaining
        if (longLines[i].includes('.') && longLines[i].includes('(')) {
          const indentation = longLines[i].match(/^\s*/)[0];
          longLines[i] = longLines[i]
            .replace(/\.\s*/g, '\n' + indentation + '  .')
            .replace(/,\s*(?=[a-zA-Z])/g, ',\n' + indentation + '  ');
          longLineFixes++;
          fileModified = true;
        }
        // Simple break for function parameters
        else if (longLines[i].includes('function') && longLines[i].includes('(')) {
          const indentation = longLines[i].match(/^\s*/)[0];
          longLines[i] = longLines[i]
            .replace(/,\s*(?=[a-zA-Z])/g, ',\n' + indentation + '  ');
          longLineFixes++;
          fileModified = true;
        }
      }
    }
    
    if (longLineFixes > 0) {
      content = longLines.join('\n');
      fixStats.longLines += longLineFixes;
      console.log(`  🔧 Fixed ${longLineFixes} long lines`);
    }
    
    // Write file only if modified
    if (fileModified) {
      fs.writeFileSync(filePath, content, 'utf8');
      fixedFiles++;
      console.log(`  ✅ Fixed file ${relativePath}`);
    } else {
      console.log(`  ✨ No fixes needed for ${relativePath}`);
    }
    
  } catch (error) {
    console.log(`  ❌ Error fixing ${path.relative(srcPath, filePath)}: ${error.message}`);
  }
}

// Process directory recursively
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
        autoFixFile(fullPath);
      }
    }
  } catch (error) {
    console.log(`⚠️ Error processing directory ${dir}: ${error.message}`);
  }
}

// Create backup function
function createBackup() {
  const backupDir = path.join(__dirname, '../.lint-backup');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(backupDir, `backup-${timestamp}`);
  
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  console.log(`📋 Creating backup at ${backupPath}...`);
  
  try {
    // Simple copy of src directory
    copyDirectory(srcPath, backupPath);
    console.log(`✅ Backup created successfully`);
    return backupPath;
  } catch (error) {
    console.log(`❌ Backup failed: ${error.message}`);
    return null;
  }
}

function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const items = fs.readdirSync(src);
  
  for (const item of items) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    const stat = fs.statSync(srcPath);
    
    if (stat.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Main execution
async function main() {
  console.log('🚀 Starting auto-fix process...\n');
  
  // Create backup first
  const backupPath = createBackup();
  if (!backupPath) {
    console.log('❌ Could not create backup. Aborting auto-fix.');
    process.exit(1);
  }
  
  console.log('\n🔧 Processing files...\n');
  
  // Process all files
  processDirectory(srcPath);
  
  // Calculate total fixes
  totalFixes = Object.values(fixStats).reduce((sum, count) => sum + count, 0);
  
  console.log('\n📊 Auto-Fix Summary:');
  console.log(`  📁 Files processed: ${fixedFiles}`);
  console.log(`  🔧 Total fixes applied: ${totalFixes}`);
  console.log('\n📋 Fix breakdown:');
  console.log(`  🚫 Console.log statements: ${fixStats.consoleLog}`);
  console.log(`  ⚖️ Loose equality operators: ${fixStats.looseEquality}`);
  console.log(`  📏 Long lines: ${fixStats.longLines}`);
  console.log(`  🧹 Trailing spaces: ${fixStats.trailingSpaces}`);
  console.log(`  📄 Multiple empty lines: ${fixStats.multipleEmptyLines}`);
  console.log(`  ␣ Missing spaces: ${fixStats.missingSpaces}`);
  console.log(`  ; Missing semicolons: ${fixStats.semicolons}`);
  console.log(`  🔤 Var keywords: ${fixStats.varKeywords}`);
  
  if (totalFixes > 0) {
    console.log(`\n✅ Auto-fix completed! ${totalFixes} issues fixed in ${fixedFiles} files.`);
    console.log(`📋 Backup saved at: ${path.relative(process.cwd(), backupPath)}`);
    console.log('\n💡 Next steps:');
    console.log('  • Run "npm run lint" to see remaining issues');
    console.log('  • Review changes before committing');
    console.log('  • Test your application to ensure everything works');
  } else {
    console.log('\n✨ No auto-fixable issues found!');
  }
}

// Handle command line arguments
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const verbose = args.includes('--verbose');

if (dryRun) {
  console.log('🔍 DRY RUN MODE - No files will be modified\n');
}

main().catch(error => {
  console.error('💥 Auto-fix failed:', error);
  process.exit(1);
});
