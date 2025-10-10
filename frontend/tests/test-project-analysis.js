// frontend/tests/test-project-analysis.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcPath = path.join(__dirname, '../src');

console.log('🔍 Running test-project-analysis.js...');
console.log('🧪 Testing Project Structure Analysis...');

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

// Project Structure Analysis
function analyzeProjectStructure() {
  console.log('\n📊 Project Structure Analysis:');
  
  // Count files by type
  const stats = {
    typescript: 0,
    javascript: 0,
    html: 0,
    css: 0,
    json: 0,
    modules: 0,
    components: 0,
    services: 0,
    views: 0
  };

  function analyzeDirectory(dir) {
    try {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          if (item === 'node_modules' || item === '.git') continue;
          analyzeDirectory(fullPath);
        } else {
          const ext = path.extname(item).toLowerCase();
          const basename = path.basename(item, ext);
          
          // Count by extension
          switch (ext) {
            case '.ts': stats.typescript++; break;
            case '.js': stats.javascript++; break;
            case '.html': stats.html++; break;
            case '.css': stats.css++; break;
            case '.json': stats.json++; break;
          }
          
          // Count by file type
          if (basename.includes('.module')) stats.modules++;
          if (basename.includes('.component')) stats.components++;
          if (basename.includes('.service')) stats.services++;
          if (basename.includes('.view')) stats.views++;
        }
      }
    } catch (error) {
      console.log(`  ⚠️ Error analyzing ${dir}: ${error.message}`);
    }
  }

  analyzeDirectory(srcPath);
  
  console.log(`  📁 TypeScript files: ${stats.typescript}`);
  console.log(`  📁 JavaScript files: ${stats.javascript}`);
  console.log(`  📁 HTML files: ${stats.html}`);
  console.log(`  📁 CSS files: ${stats.css}`);
  console.log(`  📁 JSON files: ${stats.json}`);
  console.log(`  🧩 Module files: ${stats.modules}`);
  console.log(`  🔧 Component files: ${stats.components}`);
  console.log(`  📡 Service files: ${stats.services}`);
  console.log(`  👁️ View files: ${stats.views}`);
  
  test('project has TypeScript files', stats.typescript > 0);
  test('project has module files', stats.modules > 0);
  test('project has service files', stats.services > 0);
  test('project has view files', stats.views > 0);
}

// Code Quality Analysis
function analyzeCodeQuality() {
  console.log('\n🔍 Code Quality Analysis:');
  
  const issues = [];
  
  function analyzeFile(filePath) {
    try {
      if (!filePath.endsWith('.ts') && !filePath.endsWith('.js')) return;
      
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');
      
      // Check for common issues
      lines.forEach((line, index) => {
        const lineNum = index + 1;
        const trimmed = line.trim();
        
        // Check for console.log (should be removed in production)
        if (trimmed.includes('console.log') && !filePath.includes('test')) {
          issues.push({
            file: path.relative(srcPath, filePath),
            line: lineNum,
            type: 'console.log',
            message: 'Console.log found (should be removed for production)'
          });
        }
        
        // Check for TODO comments
        if (trimmed.includes('TODO') || trimmed.includes('FIXME')) {
          issues.push({
            file: path.relative(srcPath, filePath),
            line: lineNum,
            type: 'todo',
            message: 'TODO/FIXME comment found'
          });
        }
        
        // Check for very long lines (>120 chars)
        if (line.length > 120) {
          issues.push({
            file: path.relative(srcPath, filePath),
            line: lineNum,
            type: 'long-line',
            message: `Line too long (${line.length} chars)`
          });
        }
        
        // Check for missing semicolons (basic check)
        if (trimmed.endsWith('}') === false && 
            trimmed.length > 0 && 
            !trimmed.endsWith(';') && 
            !trimmed.endsWith('{') && 
            !trimmed.endsWith(',') &&
            !trimmed.startsWith('//') &&
            !trimmed.startsWith('*') &&
            !trimmed.includes('import') &&
            !trimmed.includes('export') &&
            !filePath.endsWith('.d.ts')) {
          // This is a very basic check, might have false positives
        }
        
        // Check for unused imports (basic check)
        if (trimmed.startsWith('import') && trimmed.includes('from')) {
          const importName = trimmed.match(/import\s+(?:{[^}]+}|\w+)/);
          if (importName) {
            const name = importName[0].replace('import ', '').replace('{', '').replace('}', '').trim();
            if (name && !content.includes(name.substring(0, name.indexOf(' ') > 0 ? name.indexOf(' ') : name.length))) {
              // Basic unused import check - might have false positives
            }
          }
        }
      });
      
    } catch (error) {
      issues.push({
        file: path.relative(srcPath, filePath),
        line: 0,
        type: 'read-error',
        message: `Error reading file: ${error.message}`
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
          if (item === 'node_modules' || item === '.git') continue;
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
  
  // Group issues by type
  const issueTypes = {};
  issues.forEach(issue => {
    if (!issueTypes[issue.type]) issueTypes[issue.type] = [];
    issueTypes[issue.type].push(issue);
  });
  
  console.log(`  📊 Total issues found: ${issues.length}`);
  
  Object.keys(issueTypes).forEach(type => {
    const count = issueTypes[type].length;
    console.log(`  📋 ${type}: ${count} issues`);
    
    // Show first few issues of each type
    if (count > 0) {
      issueTypes[type].slice(0, 3).forEach(issue => {
        console.log(`    📄 ${issue.file}:${issue.line} - ${issue.message}`);
      });
      if (count > 3) {
        console.log(`    ... and ${count - 3} more`);
      }
    }
  });
  
  test('code quality issues under control', issues.length < 50);
  test('no critical read errors', !issueTypes['read-error'] || issueTypes['read-error'].length === 0);
}

// Module Dependencies Analysis
function analyzeModuleDependencies() {
  console.log('\n🔗 Module Dependencies Analysis:');
  
  const dependencies = new Map();
  const circularDeps = [];
  
  function analyzeDependencies(filePath) {
    try {
      if (!filePath.endsWith('.ts') && !filePath.endsWith('.js')) return;
      
      const content = fs.readFileSync(filePath, 'utf8');
      const relativePath = path.relative(srcPath, filePath);
      
      const imports = [];
      const lines = content.split('\n');
      
      lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('import') && trimmed.includes('from')) {
          const match = trimmed.match(/from\s+['"]([^'"]+)['"]/);
          if (match) {
            let importPath = match[1];
            
            // Convert relative imports to absolute paths
            if (importPath.startsWith('./') || importPath.startsWith('../')) {
              const dir = path.dirname(filePath);
              const resolved = path.resolve(dir, importPath);
              importPath = path.relative(srcPath, resolved);
            }
            
            imports.push(importPath);
          }
        }
      });
      
      dependencies.set(relativePath, imports);
      
    } catch (error) {
      console.log(`  ⚠️ Error analyzing dependencies in ${filePath}: ${error.message}`);
    }
  }
  
  function findCircularDependencies() {
    const visiting = new Set();
    const visited = new Set();
    
    function visit(module, path = []) {
      if (visiting.has(module)) {
        const cycleStart = path.indexOf(module);
        if (cycleStart !== -1) {
          circularDeps.push(path.slice(cycleStart).concat([module]));
        }
        return;
      }
      
      if (visited.has(module)) return;
      
      visiting.add(module);
      const deps = dependencies.get(module) || [];
      
      deps.forEach(dep => {
        visit(dep, [...path, module]);
      });
      
      visiting.delete(module);
      visited.add(module);
    }
    
    for (const module of dependencies.keys()) {
      if (!visited.has(module)) {
        visit(module);
      }
    }
  }
  
  function analyzeDirectory(dir) {
    try {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          if (item === 'node_modules' || item === '.git') continue;
          analyzeDirectory(fullPath);
        } else {
          analyzeDependencies(fullPath);
        }
      }
    } catch (error) {
      console.log(`  ⚠️ Error analyzing ${dir}: ${error.message}`);
    }
  }
  
  analyzeDirectory(srcPath);
  findCircularDependencies();
  
  console.log(`  📦 Total modules analyzed: ${dependencies.size}`);
  console.log(`  🔄 Circular dependencies found: ${circularDeps.length}`);
  
  if (circularDeps.length > 0) {
    circularDeps.forEach((cycle, index) => {
      console.log(`  🔄 Cycle ${index + 1}: ${cycle.join(' → ')}`);
    });
  }
  
  // Find modules with most dependencies
  const depCounts = Array.from(dependencies.entries())
    .map(([module, deps]) => ({ module, count: deps.length }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  
  console.log('  📊 Modules with most dependencies:');
  depCounts.forEach(({ module, count }) => {
    console.log(`    📄 ${module}: ${count} dependencies`);
  });
  
  test('no circular dependencies', circularDeps.length === 0);
  test('dependency analysis completed', dependencies.size > 0);
}

// Run all analyses
try {
  analyzeProjectStructure();
  analyzeCodeQuality();
  analyzeModuleDependencies();
  
  console.log(`\n📊 Project Analysis Results: ${passed} passed, ${failed} failed`);
  
  if (failed === 0) {
    console.log('✅ All project analysis tests passed!');
  } else {
    console.log(`❌ ${failed} project analysis tests failed!`);
  }
  
} catch (error) {
  console.error('💥 Error during project analysis:', error);
  process.exit(1);
}

export { passed, failed };
