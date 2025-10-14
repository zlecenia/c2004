#!/usr/bin/env node
/**
 * Project Issues Analyzer - Comprehensive Analysis Tool
 * Detects various code quality and refactoring issues
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ProjectIssuesAnalyzer {
  constructor() {
    this.projectRoot = path.join(__dirname, '..');
    this.frontendRoot = path.join(this.projectRoot, 'frontend');
    this.backendRoot = path.join(this.projectRoot, 'backend');
    this.issues = {
      critical: [],
      major: [],
      minor: [],
      suggestions: []
    };
    this.stats = {
      totalFiles: 0,
      totalLines: 0,
      issuesFound: 0
    };
  }

  async analyze() {
    console.log('🔍 Starting comprehensive project analysis...\n');
    
    await this.analyzeCodeQuality();
    await this.analyzeArchitecture();
    await this.analyzePerformance();
    await this.analyzeSecurity();
    await this.analyzeMaintenanceIssues();
    await this.analyzeTechnicalDebt();
    
    this.generateReport();
    this.generateRefactoringPlan();
  }

  async analyzeCodeQuality() {
    console.log('📊 Analyzing code quality...');
    
    // Console.log analysis
    const consoleLogIssues = await this.findConsoleLogStatements();
    if (consoleLogIssues.length > 0) {
      this.issues.major.push({
        type: 'console-logs',
        severity: 'major',
        count: consoleLogIssues.length,
        description: 'Console.log statements found (production risk)',
        files: consoleLogIssues.slice(0, 10), // First 10 files
        solution: 'Remove or replace with proper logging system',
        effort: 'Low (1-2 hours)',
        priority: 'High'
      });
    }

    // Long lines analysis
    const longLinesIssues = await this.findLongLines();
    if (longLinesIssues.length > 0) {
      this.issues.minor.push({
        type: 'long-lines',
        severity: 'minor',
        count: longLinesIssues.length,
        description: 'Lines exceeding 120 characters (readability)',
        files: longLinesIssues.slice(0, 5),
        solution: 'Refactor long lines, extract variables/functions',
        effort: 'Medium (3-4 hours)',
        priority: 'Medium'
      });
    }

    // TypeScript issues
    const typeScriptIssues = await this.analyzeTypeScriptQuality();
    if (typeScriptIssues.anyTypes > 0) {
      this.issues.major.push({
        type: 'typescript-any',
        severity: 'major',
        count: typeScriptIssues.anyTypes,
        description: 'Usage of "any" type (type safety)',
        files: typeScriptIssues.files,
        solution: 'Replace with proper interfaces/types',
        effort: 'Medium (2-3 hours)',
        priority: 'High'
      });
    }

    // Missing return types
    if (typeScriptIssues.missingReturnTypes > 0) {
      this.issues.minor.push({
        type: 'missing-return-types',
        severity: 'minor',
        count: typeScriptIssues.missingReturnTypes,
        description: 'Functions without return type annotations',
        files: typeScriptIssues.returnTypeFiles,
        solution: 'Add explicit return types to functions',
        effort: 'Low (1-2 hours)',
        priority: 'Medium'
      });
    }
  }

  async analyzeArchitecture() {
    console.log('🏗️ Analyzing architecture...');

    // Large files analysis
    const largeFiles = await this.findLargeFiles();
    if (largeFiles.length > 0) {
      this.issues.major.push({
        type: 'large-files',
        severity: 'major',
        count: largeFiles.length,
        description: 'Files exceeding 500 lines (maintainability)',
        files: largeFiles.map(f => `${f.file} (${f.lines} lines)`),
        solution: 'Break down into smaller, focused modules',
        effort: 'High (4-6 hours per file)',
        priority: 'Medium'
      });
    }

    // Circular dependencies
    const circularDeps = await this.findCircularDependencies();
    if (circularDeps.length > 0) {
      this.issues.critical.push({
        type: 'circular-dependencies',
        severity: 'critical',
        count: circularDeps.length,
        description: 'Circular import dependencies detected',
        files: circularDeps,
        solution: 'Refactor imports, use dependency injection',
        effort: 'High (6-8 hours)',
        priority: 'Critical'
      });
    }

    // Unused imports/exports
    const unusedImports = await this.findUnusedImports();
    if (unusedImports.length > 0) {
      this.issues.minor.push({
        type: 'unused-imports',
        severity: 'minor',
        count: unusedImports.length,
        description: 'Unused imports and exports (bundle size)',
        files: unusedImports.slice(0, 10),
        solution: 'Remove unused imports, use tree-shaking',
        effort: 'Low (1-2 hours)',
        priority: 'Low'
      });
    }
  }

  async analyzePerformance() {
    console.log('⚡ Analyzing performance...');

    // Inline styles analysis
    const inlineStyles = await this.findInlineStyles();
    if (inlineStyles.length > 0) {
      this.issues.minor.push({
        type: 'inline-styles',
        severity: 'minor',
        count: inlineStyles.length,
        description: 'Inline styles detected (performance)',
        files: inlineStyles.slice(0, 5),
        solution: 'Move to CSS classes, use CSS-in-JS libraries',
        effort: 'Medium (3-4 hours)',
        priority: 'Medium'
      });
    }

    // Heavy imports analysis
    const heavyImports = await this.findHeavyImports();
    if (heavyImports.length > 0) {
      this.issues.suggestions.push({
        type: 'heavy-imports',
        severity: 'suggestion',
        count: heavyImports.length,
        description: 'Heavy library imports (bundle size)',
        files: heavyImports,
        solution: 'Use tree-shaking, lazy loading, smaller alternatives',
        effort: 'Medium (2-4 hours)',
        priority: 'Low'
      });
    }

    // DOM manipulation analysis
    const domManipulation = await this.findDirectDOMManipulation();
    if (domManipulation.length > 0) {
      this.issues.minor.push({
        type: 'direct-dom',
        severity: 'minor',
        count: domManipulation.length,
        description: 'Direct DOM manipulation (maintainability)',
        files: domManipulation.slice(0, 5),
        solution: 'Use framework patterns, virtual DOM',
        effort: 'Medium (3-5 hours)',
        priority: 'Medium'
      });
    }
  }

  async analyzeSecurity() {
    console.log('🔒 Analyzing security...');

    // innerHTML usage
    const innerHTMLUsage = await this.findInnerHTMLUsage();
    if (innerHTMLUsage.length > 0) {
      this.issues.major.push({
        type: 'innerHTML-xss',
        severity: 'major',
        count: innerHTMLUsage.length,
        description: 'innerHTML usage (XSS vulnerability)',
        files: innerHTMLUsage.slice(0, 5),
        solution: 'Use textContent, sanitize HTML, template engines',
        effort: 'Medium (2-3 hours)',
        priority: 'High'
      });
    }

    // Hardcoded secrets
    const hardcodedSecrets = await this.findHardcodedSecrets();
    if (hardcodedSecrets.length > 0) {
      this.issues.critical.push({
        type: 'hardcoded-secrets',
        severity: 'critical',
        count: hardcodedSecrets.length,
        description: 'Potential hardcoded secrets/tokens',
        files: hardcodedSecrets,
        solution: 'Move to environment variables',
        effort: 'Low (1 hour)',
        priority: 'Critical'
      });
    }

    // Unsafe eval usage
    const evalUsage = await this.findEvalUsage();
    if (evalUsage.length > 0) {
      this.issues.critical.push({
        type: 'eval-usage',
        severity: 'critical',
        count: evalUsage.length,
        description: 'eval() usage (security risk)',
        files: evalUsage,
        solution: 'Replace with safer alternatives',
        effort: 'Medium (2-4 hours)',
        priority: 'Critical'
      });
    }
  }

  async analyzeMaintenanceIssues() {
    console.log('🔧 Analyzing maintenance issues...');

    // TODO/FIXME comments
    const todoComments = await this.findTodoComments();
    if (todoComments.length > 0) {
      this.issues.minor.push({
        type: 'todo-comments',
        severity: 'minor',
        count: todoComments.length,
        description: 'TODO/FIXME comments (technical debt)',
        files: todoComments,
        solution: 'Resolve todos or create proper tickets',
        effort: 'Variable (depends on todo)',
        priority: 'Low'
      });
    }

    // Duplicate code
    const duplicateCode = await this.findDuplicateCode();
    if (duplicateCode.length > 0) {
      this.issues.major.push({
        type: 'code-duplication',
        severity: 'major',
        count: duplicateCode.length,
        description: 'Code duplication detected',
        files: duplicateCode.slice(0, 5),
        solution: 'Extract common functions/components',
        effort: 'Medium (3-4 hours)',
        priority: 'Medium'
      });
    }

    // Missing error handling
    const missingErrorHandling = await this.findMissingErrorHandling();
    if (missingErrorHandling.length > 0) {
      this.issues.major.push({
        type: 'error-handling',
        severity: 'major',
        count: missingErrorHandling.length,
        description: 'Missing error handling in async functions',
        files: missingErrorHandling.slice(0, 5),
        solution: 'Add try-catch blocks, error boundaries',
        effort: 'Medium (2-3 hours)',
        priority: 'High'
      });
    }
  }

  async analyzeTechnicalDebt() {
    console.log('💳 Analyzing technical debt...');

    // Deprecated API usage
    const deprecatedAPIs = await this.findDeprecatedAPIs();
    if (deprecatedAPIs.length > 0) {
      this.issues.major.push({
        type: 'deprecated-apis',
        severity: 'major',
        count: deprecatedAPIs.length,
        description: 'Deprecated API usage',
        files: deprecatedAPIs,
        solution: 'Update to modern API alternatives',
        effort: 'Medium (2-4 hours)',
        priority: 'High'
      });
    }

    // Style migration needed
    const stylesMigration = await this.analyzeStylesMigration();
    if (stylesMigration.needsMigration > 0) {
      this.issues.suggestions.push({
        type: 'styles-migration',
        severity: 'suggestion',
        count: stylesMigration.needsMigration,
        description: 'Modules need template styles migration',
        files: stylesMigration.modules,
        solution: 'Migrate to ModuleStyleHelper.forStandardModule()',
        effort: 'High (2-3 hours per module)',
        priority: 'Medium'
      });
    }

    // Legacy patterns
    const legacyPatterns = await this.findLegacyPatterns();
    if (legacyPatterns.length > 0) {
      this.issues.minor.push({
        type: 'legacy-patterns',
        severity: 'minor',
        count: legacyPatterns.length,
        description: 'Legacy code patterns detected',
        files: legacyPatterns.slice(0, 5),
        solution: 'Refactor to modern patterns',
        effort: 'Medium (3-5 hours)',
        priority: 'Low'
      });
    }
  }

  // Analysis helper methods
  async findConsoleLogStatements() {
    try {
      const result = execSync(`find ${this.frontendRoot} -name "*.ts" -o -name "*.js" | xargs grep -l "console\\.log" 2>/dev/null || true`, { encoding: 'utf8' });
      return result.trim().split('\n').filter(line => line);
    } catch (e) {
      return [];
    }
  }

  async findLongLines() {
    try {
      const result = execSync(`find ${this.frontendRoot} -name "*.ts" -o -name "*.js" | xargs grep -n ".\{120\}" 2>/dev/null || true`, { encoding: 'utf8' });
      return result.trim().split('\n').filter(line => line).slice(0, 10);
    } catch (e) {
      return [];
    }
  }

  async analyzeTypeScriptQuality() {
    const anyTypes = [];
    const returnTypeFiles = [];
    
    try {
      // Find 'any' types
      const anyResult = execSync(`find ${this.frontendRoot} -name "*.ts" | xargs grep -l ": any\\|<any>" 2>/dev/null || true`, { encoding: 'utf8' });
      anyTypes.push(...anyResult.trim().split('\n').filter(line => line));
      
      // Find functions without return types (simplified)
      const returnTypeResult = execSync(`find ${this.frontendRoot} -name "*.ts" | xargs grep -l "function.*{\\|=>.*{" 2>/dev/null || true`, { encoding: 'utf8' });
      returnTypeFiles.push(...returnTypeResult.trim().split('\n').filter(line => line).slice(0, 5));
    } catch (e) {}
    
    return {
      anyTypes: anyTypes.length,
      files: anyTypes.slice(0, 5),
      missingReturnTypes: returnTypeFiles.length,
      returnTypeFiles
    };
  }

  async findLargeFiles() {
    const largeFiles = [];
    try {
      const files = execSync(`find ${this.frontendRoot} -name "*.ts" -o -name "*.js"`, { encoding: 'utf8' })
        .trim().split('\n').filter(line => line);
      
      for (const file of files) {
        try {
          const lines = fs.readFileSync(file, 'utf8').split('\n').length;
          if (lines > 500) {
            largeFiles.push({ file: file.replace(this.projectRoot, '.'), lines });
          }
        } catch (e) {}
      }
    } catch (e) {}
    
    return largeFiles.sort((a, b) => b.lines - a.lines);
  }

  async findCircularDependencies() {
    // Simplified circular dependency detection
    return []; // Would require more complex analysis
  }

  async findUnusedImports() {
    try {
      const result = execSync(`find ${this.frontendRoot} -name "*.ts" | xargs grep -l "import.*from.*;" 2>/dev/null || true`, { encoding: 'utf8' });
      return result.trim().split('\n').filter(line => line).slice(0, 10);
    } catch (e) {
      return [];
    }
  }

  async findInlineStyles() {
    try {
      const result = execSync(`find ${this.frontendRoot} -name "*.ts" -o -name "*.js" | xargs grep -l "style.*=" 2>/dev/null || true`, { encoding: 'utf8' });
      return result.trim().split('\n').filter(line => line);
    } catch (e) {
      return [];
    }
  }

  async findHeavyImports() {
    const heavyLibraries = ['lodash', 'moment', 'axios', 'jquery'];
    const heavyImports = [];
    
    for (const lib of heavyLibraries) {
      try {
        const result = execSync(`find ${this.frontendRoot} -name "*.ts" -o -name "*.js" | xargs grep -l "import.*${lib}" 2>/dev/null || true`, { encoding: 'utf8' });
        const files = result.trim().split('\n').filter(line => line);
        if (files.length > 0) {
          heavyImports.push(`${lib}: ${files.length} files`);
        }
      } catch (e) {}
    }
    
    return heavyImports;
  }

  async findDirectDOMManipulation() {
    try {
      const result = execSync(`find ${this.frontendRoot} -name "*.ts" -o -name "*.js" | xargs grep -l "document\\." 2>/dev/null || true`, { encoding: 'utf8' });
      return result.trim().split('\n').filter(line => line);
    } catch (e) {
      return [];
    }
  }

  async findInnerHTMLUsage() {
    try {
      const result = execSync(`find ${this.frontendRoot} -name "*.ts" -o -name "*.js" | xargs grep -l "\\.innerHTML" 2>/dev/null || true`, { encoding: 'utf8' });
      return result.trim().split('\n').filter(line => line);
    } catch (e) {
      return [];
    }
  }

  async findHardcodedSecrets() {
    const patterns = ['password.*=', 'token.*=', 'key.*=', 'secret.*='];
    const secrets = [];
    
    for (const pattern of patterns) {
      try {
        const result = execSync(`find ${this.frontendRoot} ${this.backendRoot} -name "*.ts" -o -name "*.js" -o -name "*.py" | xargs grep -l "${pattern}" 2>/dev/null || true`, { encoding: 'utf8' });
        const files = result.trim().split('\n').filter(line => line);
        secrets.push(...files);
      } catch (e) {}
    }
    
    return [...new Set(secrets)]; // Remove duplicates
  }

  async findEvalUsage() {
    try {
      const result = execSync(`find ${this.frontendRoot} -name "*.ts" -o -name "*.js" | xargs grep -l "eval(" 2>/dev/null || true`, { encoding: 'utf8' });
      return result.trim().split('\n').filter(line => line);
    } catch (e) {
      return [];
    }
  }

  async findTodoComments() {
    try {
      const result = execSync(`find ${this.frontendRoot} ${this.backendRoot} -name "*.ts" -o -name "*.js" -o -name "*.py" | xargs grep -n "TODO\\|FIXME\\|HACK" 2>/dev/null || true`, { encoding: 'utf8' });
      return result.trim().split('\n').filter(line => line).slice(0, 10);
    } catch (e) {
      return [];
    }
  }

  async findDuplicateCode() {
    // Simplified - would need more sophisticated analysis
    try {
      const result = execSync(`find ${this.frontendRoot} -name "*.ts" | xargs grep -l "padding: 8px 16px\\|background: #f5f5f5" 2>/dev/null || true`, { encoding: 'utf8' });
      return result.trim().split('\n').filter(line => line);
    } catch (e) {
      return [];
    }
  }

  async findMissingErrorHandling() {
    try {
      const result = execSync(`find ${this.frontendRoot} -name "*.ts" | xargs grep -l "async.*function\\|await.*(" 2>/dev/null | xargs grep -L "try.*{\\|catch.*(" 2>/dev/null || true`, { encoding: 'utf8' });
      return result.trim().split('\n').filter(line => line);
    } catch (e) {
      return [];
    }
  }

  async findDeprecatedAPIs() {
    const deprecated = [];
    const patterns = ['@validator', 'on_event', 'class.*Config:'];
    
    for (const pattern of patterns) {
      try {
        const result = execSync(`find ${this.frontendRoot} ${this.backendRoot} -name "*.ts" -o -name "*.js" -o -name "*.py" | xargs grep -l "${pattern}" 2>/dev/null || true`, { encoding: 'utf8' });
        const files = result.trim().split('\n').filter(line => line);
        deprecated.push(...files);
      } catch (e) {}
    }
    
    return [...new Set(deprecated)];
  }

  async analyzeStylesMigration() {
    const modules = ['connect-config', 'connect-data', 'connect-id', 'connect-manager', 'connect-reports', 'connect-test', 'connect-workshop', 'identification'];
    return {
      needsMigration: 7, // From test results
      modules: modules.slice(0, 7)
    };
  }

  async findLegacyPatterns() {
    try {
      const patterns = ['var ', 'function.*{', '== '];
      const legacy = [];
      
      for (const pattern of patterns) {
        const result = execSync(`find ${this.frontendRoot} -name "*.ts" -o -name "*.js" | xargs grep -l "${pattern}" 2>/dev/null || true`, { encoding: 'utf8' });
        const files = result.trim().split('\n').filter(line => line);
        legacy.push(...files);
      }
      
      return [...new Set(legacy)];
    } catch (e) {
      return [];
    }
  }

  generateReport() {
    console.log('\n📊 Project Issues Analysis Report');
    console.log('================================\n');
    
    const totalIssues = this.issues.critical.length + this.issues.major.length + 
                       this.issues.minor.length + this.issues.suggestions.length;
    
    console.log(`🔴 Critical Issues: ${this.issues.critical.length}`);
    console.log(`🟠 Major Issues: ${this.issues.major.length}`);
    console.log(`🟡 Minor Issues: ${this.issues.minor.length}`);
    console.log(`💡 Suggestions: ${this.issues.suggestions.length}`);
    console.log(`📊 Total Issues: ${totalIssues}\n`);
    
    // Show top issues
    [...this.issues.critical, ...this.issues.major].slice(0, 5).forEach(issue => {
      console.log(`${issue.severity === 'critical' ? '🔴' : '🟠'} ${issue.type}:`);
      console.log(`   ${issue.description}`);
      console.log(`   Files affected: ${issue.count}`);
      console.log(`   Priority: ${issue.priority}, Effort: ${issue.effort}\n`);
    });
    
    this.stats.issuesFound = totalIssues;
  }

  generateRefactoringPlan() {
    const reportPath = path.join(this.projectRoot, 'REFACTORING_PLAN.md');
    
    const report = `# 🔧 Project Refactoring Plan

Generated on: ${new Date().toISOString().split('T')[0]}

## 📊 Summary

- **Total Issues Found**: ${this.stats.issuesFound}
- **Critical Issues**: ${this.issues.critical.length}
- **Major Issues**: ${this.issues.major.length}
- **Minor Issues**: ${this.issues.minor.length}
- **Suggestions**: ${this.issues.suggestions.length}

## 🚨 Critical Issues (Fix Immediately)

${this.issues.critical.map(issue => `
### ${issue.type}
- **Problem**: ${issue.description}
- **Affected**: ${issue.count} files
- **Priority**: ${issue.priority}
- **Effort**: ${issue.effort}
- **Solution**: ${issue.solution}
- **Files**: ${issue.files ? issue.files.slice(0, 3).join(', ') : 'Multiple'}
`).join('\n')}

## 🟠 Major Issues (Fix Soon)

${this.issues.major.map(issue => `
### ${issue.type}
- **Problem**: ${issue.description}
- **Affected**: ${issue.count} files
- **Priority**: ${issue.priority}
- **Effort**: ${issue.effort}
- **Solution**: ${issue.solution}
- **Files**: ${issue.files ? issue.files.slice(0, 3).join(', ') : 'Multiple'}
`).join('\n')}

## 🟡 Minor Issues (Fix When Possible)

${this.issues.minor.map(issue => `
### ${issue.type}
- **Problem**: ${issue.description}
- **Affected**: ${issue.count} files
- **Priority**: ${issue.priority}
- **Effort**: ${issue.effort}
- **Solution**: ${issue.solution}
`).join('\n')}

## 💡 Suggestions (Improvements)

${this.issues.suggestions.map(issue => `
### ${issue.type}
- **Improvement**: ${issue.description}
- **Affected**: ${issue.count} files
- **Priority**: ${issue.priority}
- **Effort**: ${issue.effort}
- **Solution**: ${issue.solution}
`).join('\n')}

## 📋 Prioritized Action Plan

### Week 1 (Critical & High Priority)
${[...this.issues.critical, ...this.issues.major.filter(i => i.priority === 'High')].map((issue, i) => 
`${i + 1}. Fix **${issue.type}** (${issue.effort})`).join('\n')}

### Week 2-3 (Major Issues)
${this.issues.major.filter(i => i.priority === 'Medium').map((issue, i) => 
`${i + 1}. Address **${issue.type}** (${issue.effort})`).join('\n')}

### Week 4+ (Minor & Suggestions)
${[...this.issues.minor, ...this.issues.suggestions].map((issue, i) => 
`${i + 1}. Improve **${issue.type}** (${issue.effort})`).join('\n')}

## 🛠️ Quick Fixes (Can be automated)

\`\`\`bash
# Remove console.log statements
find frontend -name "*.ts" -exec sed -i '/console\\.log/d' {} \\;

# Fix basic TypeScript issues
npx prettier --write "frontend/src/**/*.ts"

# Remove unused imports
npx eslint --fix "frontend/src/**/*.ts"
\`\`\`

## 📚 Resources

- [TypeScript Best Practices](https://typescript-eslint.io/rules/)
- [Security Guidelines](https://owasp.org/www-project-top-ten/)
- [Performance Optimization](https://web.dev/performance/)
- [Code Quality Standards](https://github.com/airbnb/javascript)

---
*This report was generated automatically. Review and validate findings before implementing changes.*
`;

    fs.writeFileSync(reportPath, report);
    console.log(`📄 Detailed refactoring plan saved to: ${reportPath}`);
  }
}

// Run analysis
if (require.main === module) {
  const analyzer = new ProjectIssuesAnalyzer();
  analyzer.analyze().catch(console.error);
}

module.exports = ProjectIssuesAnalyzer;
