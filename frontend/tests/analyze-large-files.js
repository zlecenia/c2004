// frontend/tests/analyze-large-files.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcPath = path.join(__dirname, '../src');

console.log('📊 Analyzing Large Files for Refactoring...');
console.log('===========================================\n');

const largeFiles = [];
const REFACTOR_THRESHOLD = 600; // lines

function analyzeFile(filePath) {
  if (!filePath.endsWith('.ts') && !filePath.endsWith('.js')) return;
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const relativePath = path.relative(srcPath, filePath);
    
    if (lines.length >= REFACTOR_THRESHOLD) {
      // Analyze file structure
      const analysis = analyzeFileStructure(content, relativePath);
      
      largeFiles.push({
        path: relativePath,
        lines: lines.length,
        ...analysis
      });
    }
    
  } catch (error) {
    console.log(`⚠️ Error analyzing ${path.relative(srcPath, filePath)}: ${error.message}`);
  }
}

function analyzeFileStructure(content, filePath) {
  const lines = content.split('\n');
  
  // Count different types of content
  const functions = (content.match(/function\s+\w+|=>\s*{|\w+\s*\([^)]*\)\s*{/g) || []).length;
  const classes = (content.match(/class\s+\w+/g) || []).length;
  const interfaces = (content.match(/interface\s+\w+/g) || []).length;
  const imports = (content.match(/import\s+.*from/g) || []).length;
  const exports = (content.match(/export\s+(class|function|const|interface)/g) || []).length;
  
  // Count HTML content (for view files)
  const htmlContent = content.match(/`[\s\S]*?<[^>]+>[\s\S]*?`/g) || [];
  const htmlLines = htmlContent.reduce((sum, html) => sum + html.split('\n').length, 0);
  
  // Count CSS content
  const cssContent = content.match(/`[\s\S]*?(\.[\w-]+\s*{|#[\w-]+\s*{)[\s\S]*?`/g) || [];
  const cssLines = cssContent.reduce((sum, css) => sum + css.split('\n').length, 0);
  
  // Identify refactoring opportunities
  const refactorOpportunities = [];
  
  if (functions > 10) {
    refactorOpportunities.push(`${functions} functions - consider splitting into multiple modules`);
  }
  
  if (htmlLines > 200) {
    refactorOpportunities.push(`${htmlLines} HTML lines - extract templates to separate files`);
  }
  
  if (cssLines > 150) {
    refactorOpportunities.push(`${cssLines} CSS lines - extract styles to separate CSS files`);
  }
  
  if (classes > 3) {
    refactorOpportunities.push(`${classes} classes - consider splitting into separate files`);
  }
  
  // Detect large methods/functions
  const largeFunctions = [];
  const functionPattern = /(function\s+\w+|\w+\s*\([^)]*\)\s*{|=>\s*{)/g;
  let match;
  
  while ((match = functionPattern.exec(content)) !== null) {
    const startIndex = match.index;
    const functionContent = extractFunctionContent(content, startIndex);
    const functionLines = functionContent.split('\n').length;
    
    if (functionLines > 50) {
      largeFunctions.push({
        name: match[0].replace(/[{=>\s]/g, '').slice(0, 30),
        lines: functionLines
      });
    }
  }
  
  if (largeFunctions.length > 0) {
    refactorOpportunities.push(`Large functions: ${largeFunctions.map(f => `${f.name}(${f.lines}L)`).join(', ')}`);
  }
  
  return {
    functions,
    classes,
    interfaces,
    imports,
    exports,
    htmlLines,
    cssLines,
    refactorOpportunities,
    complexity: calculateComplexity(content)
  };
}

function extractFunctionContent(content, startIndex) {
  let braceCount = 0;
  let i = startIndex;
  let started = false;
  
  while (i < content.length) {
    const char = content[i];
    
    if (char === '{') {
      braceCount++;
      started = true;
    } else if (char === '}') {
      braceCount--;
      if (started && braceCount === 0) {
        return content.slice(startIndex, i + 1);
      }
    }
    
    i++;
    
    // Safety break
    if (i - startIndex > 10000) break;
  }
  
  return content.slice(startIndex, Math.min(startIndex + 2000, content.length));
}

function calculateComplexity(content) {
  // Simple complexity calculation based on decision points
  const complexityPatterns = [
    /if\s*\(/g,
    /for\s*\(/g,
    /while\s*\(/g,
    /case\s+/g,
    /catch\s*\(/g,
    /\?\s*/g,
    /&&/g,
    /\|\|/g
  ];
  
  let complexity = 0;
  complexityPatterns.forEach(pattern => {
    const matches = content.match(pattern) || [];
    complexity += matches.length;
  });
  
  return complexity;
}

function analyzeDirectory(dir) {
  try {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        if (['node_modules', '.git', 'dist', 'build', 'tests'].includes(item)) continue;
        analyzeDirectory(fullPath);
      } else {
        analyzeFile(fullPath);
      }
    }
  } catch (error) {
    console.log(`⚠️ Error processing directory ${dir}: ${error.message}`);
  }
}

// Analyze all files
analyzeDirectory(srcPath);

// Sort by file size
largeFiles.sort((a, b) => b.lines - a.lines);

console.log(`📊 Found ${largeFiles.length} files requiring refactoring (>${REFACTOR_THRESHOLD} lines):\n`);

largeFiles.forEach((file, index) => {
  console.log(`${index + 1}. 📄 ${file.path}`);
  console.log(`   📏 Lines: ${file.lines}`);
  console.log(`   🔧 Functions: ${file.functions}`);
  console.log(`   📦 Classes: ${file.classes}`);
  console.log(`   🎨 HTML Lines: ${file.htmlLines}`);
  console.log(`   💎 CSS Lines: ${file.cssLines}`);
  console.log(`   🔀 Complexity: ${file.complexity}`);
  
  if (file.refactorOpportunities.length > 0) {
    console.log(`   💡 Refactor Opportunities:`);
    file.refactorOpportunities.forEach(opp => {
      console.log(`      • ${opp}`);
    });
  }
  
  console.log('');
});

if (largeFiles.length === 0) {
  console.log('✅ No files require refactoring! All files are under 600 lines.');
} else {
  console.log('📋 Refactoring Priority:');
  console.log('  1. Files with >1000 lines - Split into multiple modules');
  console.log('  2. Files with large HTML/CSS - Extract templates and styles');
  console.log('  3. Files with many functions - Group related functionality');
  console.log('  4. Files with high complexity - Simplify logic');
}

export { largeFiles };
