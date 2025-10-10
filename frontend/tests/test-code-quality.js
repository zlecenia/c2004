// frontend/tests/test-code-quality.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcPath = path.join(__dirname, '../src');

console.log('🔍 Running test-code-quality.js...');
console.log('🧪 Testing Code Quality & Linting...');

let passed = 0;
let failed = 0;

function test(description, condition) {
  if (condition) {
    console.log(`  ✅ ${description}`);
    passed++;
  } else {
    console.log(`  ❌ ${description}`);
    failed++;
  }
}

// Code Quality Rules
const QUALITY_RULES = {
  MAX_LINE_LENGTH: 120,
  MAX_FUNCTION_LENGTH: 50,
  MAX_FILE_SIZE: 1000, // lines
  MAX_CYCLOMATIC_COMPLEXITY: 10,
  FORBIDDEN_PATTERNS: [
    { pattern: /console\.log\(/g, message: 'console.log found (use logger instead)' },
    { pattern: /debugger;/g, message: 'debugger statement found' },
    { pattern: /var\s+/g, message: 'var keyword found (use let/const)' },
    { pattern: /==\s*[^=]/g, message: 'loose equality found (use ===)' },
    { pattern: /!=\s*[^=]/g, message: 'loose inequality found (use !==)' }
  ],
  REQUIRED_PATTERNS: [
    { pattern: /export\s+(class|function|const|interface)/g, message: 'Missing exports' },
    { pattern: /import\s+.*from/g, message: 'Missing imports' }
  ]
};

// Lint Issues Storage
const lintIssues = {
  critical: [],
  major: [],
  minor: [],
  style: []
};

// Comprehensive Code Quality Analysis
function analyzeCodeQuality() {
  console.log('\n🔍 Code Quality & Linting Analysis:');
  
  function analyzeFile(filePath) {
    try {
      if (!filePath.endsWith('.ts') && !filePath.endsWith('.js')) return;
      
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');
      const relativePath = path.relative(srcPath, filePath);
      
      // File size check
      if (lines.length > QUALITY_RULES.MAX_FILE_SIZE) {
        lintIssues.major.push({
          file: relativePath,
          line: 0,
          rule: 'file-size',
          message: `File too large (${lines.length} lines, max ${QUALITY_RULES.MAX_FILE_SIZE})`
        });
      }
      
      // Line by line analysis
      lines.forEach((line, index) => {
        const lineNum = index + 1;
        const trimmed = line.trim();
        
        // Line length check
        if (line.length > QUALITY_RULES.MAX_LINE_LENGTH) {
          lintIssues.style.push({
            file: relativePath,
            line: lineNum,
            rule: 'line-length',
            message: `Line too long (${line.length} chars, max ${QUALITY_RULES.MAX_LINE_LENGTH})`
          });
        }
        
        // Forbidden patterns
        QUALITY_RULES.FORBIDDEN_PATTERNS.forEach(rule => {
          if (rule.pattern.test(line)) {
            const severity = rule.pattern.source.includes('console.log') ? 'minor' : 'major';
            lintIssues[severity].push({
              file: relativePath,
              line: lineNum,
              rule: rule.pattern.source,
              message: rule.message
            });
          }
        });
        
        // Empty catch blocks
        if (trimmed === '} catch (error) {' || trimmed === '} catch {') {
          const nextLine = lines[index + 1];
          if (nextLine && nextLine.trim() === '}') {
            lintIssues.major.push({
              file: relativePath,
              line: lineNum,
              rule: 'empty-catch',
              message: 'Empty catch block found'
            });
          }
        }
        
        // TODO/FIXME comments
        if (trimmed.includes('TODO') || trimmed.includes('FIXME') || trimmed.includes('HACK')) {
          lintIssues.minor.push({
            file: relativePath,
            line: lineNum,
            rule: 'todo-comment',
            message: 'TODO/FIXME/HACK comment found'
          });
        }
        
        // Magic numbers (basic check)
        const magicNumberPattern = /\b(?!0|1|2|100|1000)\d{3,}\b/g;
        if (magicNumberPattern.test(line) && !line.includes('font-size') && !line.includes('width') && !line.includes('height')) {
          lintIssues.minor.push({
            file: relativePath,
            line: lineNum,
            rule: 'magic-number',
            message: 'Magic number found (consider using constant)'
          });
        }
      });
      
      // Function complexity analysis
      analyzeFunctionComplexity(content, relativePath);
      
      // Import/Export analysis
      analyzeImportsExports(content, relativePath);
      
    } catch (error) {
      lintIssues.critical.push({
        file: path.relative(srcPath, filePath),
        line: 0,
        rule: 'file-read-error',
        message: `Error reading file: ${error.message}`
      });
    }
  }
  
  function analyzeFunctionComplexity(content, filePath) {
    // Simple function detection
    const functionPattern = /(function\s+\w+|=>\s*{|\w+\s*\([^)]*\)\s*{)/g;
    const matches = content.match(functionPattern) || [];
    
    // Count decision points (if, for, while, case, etc.)
    const complexityPattern = /(if\s*\(|for\s*\(|while\s*\(|case\s+|catch\s*\(|\?\s*|&&|\|\|)/g;
    const complexityMatches = content.match(complexityPattern) || [];
    
    if (matches.length > 0) {
      const avgComplexity = complexityMatches.length / matches.length;
      if (avgComplexity > QUALITY_RULES.MAX_CYCLOMATIC_COMPLEXITY) {
        lintIssues.major.push({
          file: filePath,
          line: 0,
          rule: 'cyclomatic-complexity',
          message: `High cyclomatic complexity (${avgComplexity.toFixed(1)}, max ${QUALITY_RULES.MAX_CYCLOMATIC_COMPLEXITY})`
        });
      }
    }
  }
  
  function analyzeImportsExports(content, filePath) {
    const hasImports = /import\s+.*from/.test(content);
    const hasExports = /export\s+(class|function|const|interface|default)/.test(content);
    
    // Skip test files and main.ts
    if (filePath.includes('test') || filePath.includes('main.ts')) return;
    
    if (!hasExports && content.trim().length > 100) {
      lintIssues.minor.push({
        file: filePath,
        line: 0,
        rule: 'no-exports',
        message: 'File has no exports (might be unused)'
      });
    }
  }
  
  function analyzeDirectory(dir) {
    try {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          if (item === 'node_modules' || item === '.git' || item === 'dist') continue;
          analyzeDirectory(fullPath);
        } else {
          analyzeFile(fullPath);
        }
      }
    } catch (error) {
      console.log(`  ⚠️ Error analyzing ${dir}: ${error.message}`);
    }
  }
  
  analyzeDirectory(srcPath);
  
  // Report results by severity
  const totalIssues = Object.values(lintIssues).reduce((sum, arr) => sum + arr.length, 0);
  
  console.log(`  📊 Total issues found: ${totalIssues}`);
  console.log(`  🔴 Critical: ${lintIssues.critical.length}`);
  console.log(`  🟠 Major: ${lintIssues.major.length}`);
  console.log(`  🟡 Minor: ${lintIssues.minor.length}`);
  console.log(`  🔵 Style: ${lintIssues.style.length}`);
  
  // Show worst offenders
  if (lintIssues.critical.length > 0) {
    console.log('\n  🔴 Critical Issues:');
    lintIssues.critical.slice(0, 5).forEach(issue => {
      console.log(`    📄 ${issue.file}:${issue.line} - ${issue.message}`);
    });
  }
  
  if (lintIssues.major.length > 0) {
    console.log('\n  🟠 Major Issues (first 5):');
    lintIssues.major.slice(0, 5).forEach(issue => {
      console.log(`    📄 ${issue.file}:${issue.line} - ${issue.message}`);
    });
  }
  
  // Quality gates
  test('no critical issues', lintIssues.critical.length === 0);
  test('major issues under control', lintIssues.major.length < 10);
  test('total issues reasonable', totalIssues < 200);
  test('no empty catch blocks', lintIssues.major.filter(i => i.rule === 'empty-catch').length === 0);
}

// TypeScript-specific Analysis
function analyzeTypeScriptQuality() {
  console.log('\n🔷 TypeScript Quality Analysis:');
  
  const tsIssues = [];
  
  function analyzeTsFile(filePath) {
    if (!filePath.endsWith('.ts')) return;
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const relativePath = path.relative(srcPath, filePath);
      
      // Any type usage
      const anyTypePattern = /:\s*any\b/g;
      const anyMatches = content.match(anyTypePattern) || [];
      if (anyMatches.length > 0) {
        tsIssues.push({
          file: relativePath,
          type: 'any-type',
          count: anyMatches.length,
          message: `${anyMatches.length} 'any' types found (consider specific types)`
        });
      }
      
      // Missing return types on functions
      const functionPattern = /function\s+\w+\s*\([^)]*\)\s*{/g;
      const functionMatches = content.match(functionPattern) || [];
      const returnTypePattern = /function\s+\w+\s*\([^)]*\)\s*:\s*\w+/g;
      const returnTypeMatches = content.match(returnTypePattern) || [];
      
      if (functionMatches.length > returnTypeMatches.length) {
        tsIssues.push({
          file: relativePath,
          type: 'missing-return-type',
          count: functionMatches.length - returnTypeMatches.length,
          message: `${functionMatches.length - returnTypeMatches.length} functions missing return types`
        });
      }
      
      // Non-null assertions (!.)
      const nonNullPattern = /!\./g;
      const nonNullMatches = content.match(nonNullPattern) || [];
      if (nonNullMatches.length > 5) {
        tsIssues.push({
          file: relativePath,
          type: 'non-null-assertion',
          count: nonNullMatches.length,
          message: `${nonNullMatches.length} non-null assertions (might indicate type issues)`
        });
      }
      
    } catch (error) {
      // Skip files that can't be read
    }
  }
  
  function analyzeDirectory(dir) {
    try {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          if (['node_modules', '.git', 'dist'].includes(item)) continue;
          analyzeDirectory(fullPath);
        } else {
          analyzeTsFile(fullPath);
        }
      }
    } catch (error) {
      // Skip directories that can't be read
    }
  }
  
  analyzeDirectory(srcPath);
  
  console.log(`  📊 TypeScript issues found: ${tsIssues.length}`);
  
  if (tsIssues.length > 0) {
    tsIssues.slice(0, 5).forEach(issue => {
      console.log(`    📄 ${issue.file} - ${issue.message}`);
    });
    if (tsIssues.length > 5) {
      console.log(`    ... and ${tsIssues.length - 5} more`);
    }
  }
  
  test('TypeScript quality acceptable', tsIssues.length < 20);
  test('any types under control', tsIssues.filter(i => i.type === 'any-type').length < 10);
}

// Performance Analysis
function analyzePerformance() {
  console.log('\n⚡ Performance Analysis:');
  
  const perfIssues = [];
  
  function analyzeFile(filePath) {
    if (!filePath.endsWith('.ts') && !filePath.endsWith('.js')) return;
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const relativePath = path.relative(srcPath, filePath);
      
      // Large files
      const lines = content.split('\n');
      if (lines.length > 500) {
        perfIssues.push({
          file: relativePath,
          type: 'large-file',
          value: lines.length,
          message: `Large file (${lines.length} lines)`
        });
      }
      
      // Inline styles (performance issue)
      const inlineStylePattern = /style\s*=\s*["`]/g;
      const styleMatches = content.match(inlineStylePattern) || [];
      if (styleMatches.length > 10) {
        perfIssues.push({
          file: relativePath,
          type: 'inline-styles',
          value: styleMatches.length,
          message: `${styleMatches.length} inline styles (consider CSS classes)`
        });
      }
      
      // Deep nesting
      lines.forEach((line, index) => {
        const indentation = line.match(/^\s*/)[0].length;
        if (indentation > 32) { // More than 8 levels of nesting
          perfIssues.push({
            file: relativePath,
            type: 'deep-nesting',
            line: index + 1,
            message: `Deep nesting at line ${index + 1} (${Math.floor(indentation/4)} levels)`
          });
        }
      });
      
    } catch (error) {
      // Skip files that can't be read
    }
  }
  
  function analyzeDirectory(dir) {
    try {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          if (['node_modules', '.git', 'dist'].includes(item)) continue;
          analyzeDirectory(fullPath);
        } else {
          analyzeFile(fullPath);
        }
      }
    } catch (error) {
      // Skip directories that can't be read
    }
  }
  
  analyzeDirectory(srcPath);
  
  console.log(`  📊 Performance issues found: ${perfIssues.length}`);
  
  const groupedIssues = {};
  perfIssues.forEach(issue => {
    if (!groupedIssues[issue.type]) groupedIssues[issue.type] = [];
    groupedIssues[issue.type].push(issue);
  });
  
  Object.keys(groupedIssues).forEach(type => {
    const issues = groupedIssues[type];
    console.log(`  📋 ${type}: ${issues.length} issues`);
    issues.slice(0, 3).forEach(issue => {
      console.log(`    📄 ${issue.file} - ${issue.message}`);
    });
  });
  
  test('performance issues under control', perfIssues.length < 50);
  test('no extremely large files', perfIssues.filter(i => i.type === 'large-file' && i.value > 1000).length === 0);
}

// Run all quality checks
try {
  analyzeCodeQuality();
  analyzeTypeScriptQuality();
  analyzePerformance();
  
  console.log(`\n📊 Code Quality Results: ${passed} passed, ${failed} failed`);
  
  if (failed === 0) {
    console.log('✅ All code quality tests passed!');
  } else {
    console.log(`❌ ${failed} code quality tests failed!`);
    console.log('\n💡 Recommendations:');
    console.log('  • Remove console.log statements for production');
    console.log('  • Break down large files and functions');
    console.log('  • Add proper TypeScript types');
    console.log('  • Use CSS classes instead of inline styles');
    console.log('  • Resolve TODO/FIXME comments');
  }
  
} catch (error) {
  console.error('💥 Error during code quality analysis:', error);
  process.exit(1);
}

export { passed, failed, lintIssues };
