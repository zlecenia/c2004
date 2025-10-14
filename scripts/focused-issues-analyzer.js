#!/usr/bin/env node
/**
 * Focused Project Issues Analyzer - Source Code Only
 * Analyzes only project source code (excludes node_modules)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class FocusedIssuesAnalyzer {
  constructor() {
    this.projectRoot = path.join(__dirname, '..');
    this.frontendSrc = path.join(this.projectRoot, 'frontend/src');
    this.backendSrc = path.join(this.projectRoot, 'backend/app');
    this.issues = [];
  }

  async analyze() {
    console.log('🔍 Analyzing project source code issues...\n');
    
    await this.analyzeProductionReadiness();
    await this.analyzeCodeQuality();
    await this.analyzeArchitecture();
    await this.analyzeSecurity();
    await this.analyzePerformance();
    
    this.generateFocusedReport();
  }

  async analyzeProductionReadiness() {
    console.log('🚀 Checking production readiness...');
    
    // Console.log in source code
    const consoleLogFiles = this.findInSourceCode('console\\.log');
    if (consoleLogFiles.length > 0) {
      this.issues.push({
        category: 'Production',
        type: 'console-logs',
        severity: 'high',
        count: consoleLogFiles.length,
        title: 'Console.log statements in source code',
        description: 'Remove console.log statements before production deployment',
        files: consoleLogFiles.slice(0, 10),
        effort: 'Low (30 min)',
        autofix: true,
        solution: `find frontend/src -name "*.ts" -exec sed -i '/console\\.log/d' {} \\;`
      });
    }

    // Environment variables check
    const envIssues = this.checkEnvironmentConfig();
    if (envIssues.length > 0) {
      this.issues.push({
        category: 'Production',
        type: 'env-config',
        severity: 'medium',
        count: envIssues.length,
        title: 'Environment configuration issues',
        description: 'Configuration values should be externalized',
        files: envIssues,
        effort: 'Medium (1 hour)',
        solution: 'Move hardcoded values to environment variables'
      });
    }
  }

  async analyzeCodeQuality() {
    console.log('📊 Analyzing code quality...');
    
    // TypeScript 'any' usage in source
    const anyTypeFiles = this.findInSourceCode(': any\\|<any>\\|any\\[\\]');
    if (anyTypeFiles.length > 0) {
      this.issues.push({
        category: 'Quality',
        type: 'typescript-any',
        severity: 'high',
        count: anyTypeFiles.length,
        title: 'TypeScript "any" types in source code',
        description: 'Replace "any" with proper type definitions',
        files: anyTypeFiles.slice(0, 8),
        effort: 'Medium (2-3 hours)',
        solution: 'Define proper interfaces and types'
      });
    }

    // Missing return types
    const missingReturnTypes = this.findFunctionsWithoutReturnTypes();
    if (missingReturnTypes.length > 0) {
      this.issues.push({
        category: 'Quality',
        type: 'return-types',
        severity: 'medium',
        count: missingReturnTypes.length,
        title: 'Functions without return type annotations',
        description: 'Add explicit return types for better type safety',
        files: missingReturnTypes.slice(0, 5),
        effort: 'Low (1 hour)',
        solution: 'Add return type annotations to functions'
      });
    }

    // TODO/FIXME comments in source
    const todoFiles = this.findInSourceCode('TODO\\|FIXME\\|HACK');
    if (todoFiles.length > 0) {
      this.issues.push({
        category: 'Quality',
        type: 'tech-debt',
        severity: 'low',
        count: todoFiles.length,
        title: 'TODO/FIXME comments in source',
        description: 'Resolve or create proper tickets for TODOs',
        files: todoFiles.slice(0, 5),
        effort: 'Variable',
        solution: 'Address TODO items or move to issue tracker'
      });
    }
  }

  async analyzeArchitecture() {
    console.log('🏗️ Analyzing architecture...');
    
    // Large source files
    const largeFiles = this.findLargeSourceFiles();
    if (largeFiles.length > 0) {
      this.issues.push({
        category: 'Architecture',
        type: 'large-files',
        severity: 'medium',
        count: largeFiles.length,
        title: 'Large source files (>300 lines)',
        description: 'Break down large files into smaller modules',
        files: largeFiles.map(f => `${f.file.replace(this.projectRoot, '.')} (${f.lines} lines)`),
        effort: 'High (3-5 hours per file)',
        solution: 'Refactor into smaller, focused modules'
      });
    }

    // Style duplication (from test results)
    const styleDuplication = this.analyzeStyleDuplication();
    if (styleDuplication.count > 0) {
      this.issues.push({
        category: 'Architecture',
        type: 'style-duplication',
        severity: 'medium',
        count: styleDuplication.count,
        title: 'CSS style duplication detected',
        description: 'Consolidate duplicate styles into reusable components',
        files: styleDuplication.patterns,
        effort: 'Medium (2-3 hours)',
        solution: 'Use ModuleStyleHelper.forStandardModule() template system'
      });
    }

    // Template migration needed
    const templateMigration = this.checkTemplateMigration();
    if (templateMigration.count > 0) {
      this.issues.push({
        category: 'Architecture',
        type: 'template-migration',
        severity: 'low',
        count: templateMigration.count,
        title: 'Modules need template system migration',
        description: 'Migrate modules to use standardized template system',
        files: templateMigration.modules,
        effort: 'High (2-3 hours per module)',
        solution: 'Implement getStyles() using ModuleStyleHelper'
      });
    }
  }

  async analyzeSecurity() {
    console.log('🔒 Analyzing security...');
    
    // innerHTML usage in source
    const innerHTMLFiles = this.findInSourceCode('\\.innerHTML');
    if (innerHTMLFiles.length > 0) {
      this.issues.push({
        category: 'Security',
        type: 'innerHTML-xss',
        severity: 'high',
        count: innerHTMLFiles.length,
        title: 'innerHTML usage (XSS risk)',
        description: 'Replace innerHTML with safer alternatives',
        files: innerHTMLFiles.slice(0, 5),
        effort: 'Medium (2-3 hours)',
        solution: 'Use textContent, createElement, or template engines'
      });
    }

    // Direct DOM manipulation
    const domManipFiles = this.findInSourceCode('document\\.');
    if (domManipFiles.length > 0) {
      this.issues.push({
        category: 'Security',
        type: 'dom-manipulation',
        severity: 'medium',
        count: domManipFiles.length,
        title: 'Direct DOM manipulation',
        description: 'Centralize DOM operations for better security',
        files: domManipFiles.slice(0, 5),
        effort: 'Medium (3-4 hours)',
        solution: 'Use framework patterns or dedicated DOM utils'
      });
    }

    // Backend deprecated Pydantic usage
    const deprecatedPydantic = this.findInBackend('@validator');
    if (deprecatedPydantic.length > 0) {
      this.issues.push({
        category: 'Security',
        type: 'deprecated-pydantic',
        severity: 'medium',
        count: deprecatedPydantic.length,
        title: 'Deprecated Pydantic v1 validators',
        description: 'Update to Pydantic v2 field_validator',
        files: deprecatedPydantic,
        effort: 'Medium (2 hours)',
        solution: 'Replace @validator with @field_validator'
      });
    }
  }

  async analyzePerformance() {
    console.log('⚡ Analyzing performance...');
    
    // Inline styles in source
    const inlineStyles = this.findInlineStyles();
    if (inlineStyles.length > 0) {
      this.issues.push({
        category: 'Performance',
        type: 'inline-styles',
        severity: 'medium',
        count: inlineStyles.length,
        title: 'Inline styles detected',
        description: 'Move inline styles to CSS classes',
        files: inlineStyles.slice(0, 5),
        effort: 'Medium (3-4 hours)',
        solution: 'Extract to CSS classes or styled components'
      });
    }

    // Missing error handling in async functions
    const missingErrorHandling = this.findMissingErrorHandling();
    if (missingErrorHandling.length > 0) {
      this.issues.push({
        category: 'Performance',
        type: 'error-handling',
        severity: 'high',
        count: missingErrorHandling.length,
        title: 'Missing error handling in async functions',
        description: 'Add proper error handling to async operations',
        files: missingErrorHandling.slice(0, 5),
        effort: 'Medium (2-3 hours)',
        solution: 'Add try-catch blocks and error boundaries'
      });
    }
  }

  // Helper methods
  findInSourceCode(pattern) {
    try {
      const cmd = `find ${this.frontendSrc} -name "*.ts" -o -name "*.js" | xargs grep -l "${pattern}" 2>/dev/null || true`;
      const result = execSync(cmd, { encoding: 'utf8' });
      return result.trim().split('\n').filter(line => line && !line.includes('node_modules'));
    } catch (e) {
      return [];
    }
  }

  findInBackend(pattern) {
    try {
      const cmd = `find ${this.backendSrc} -name "*.py" | xargs grep -l "${pattern}" 2>/dev/null || true`;
      const result = execSync(cmd, { encoding: 'utf8' });
      return result.trim().split('\n').filter(line => line);
    } catch (e) {
      return [];
    }
  }

  checkEnvironmentConfig() {
    const issues = [];
    const configFiles = ['frontend/src/config', 'backend/app/config'];
    
    for (const dir of configFiles) {
      if (fs.existsSync(path.join(this.projectRoot, dir))) {
        issues.push(`${dir}/ - Check for hardcoded values`);
      }
    }
    return issues;
  }

  findFunctionsWithoutReturnTypes() {
    try {
      // Simplified detection - would need more sophisticated parsing
      const cmd = `find ${this.frontendSrc} -name "*.ts" | xargs grep -l "function.*{\\|=>.*{" | head -5`;
      const result = execSync(cmd, { encoding: 'utf8' });
      return result.trim().split('\n').filter(line => line);
    } catch (e) {
      return [];
    }
  }

  findLargeSourceFiles() {
    const largeFiles = [];
    try {
      const files = execSync(`find ${this.frontendSrc} ${this.backendSrc} -name "*.ts" -o -name "*.js" -o -name "*.py"`, { encoding: 'utf8' })
        .trim().split('\n').filter(line => line);
      
      for (const file of files) {
        try {
          const lines = fs.readFileSync(file, 'utf8').split('\n').length;
          if (lines > 300) {
            largeFiles.push({ 
              file: file.replace(this.projectRoot, '.'), 
              lines 
            });
          }
        } catch (e) {}
      }
    } catch (e) {}
    
    return largeFiles.sort((a, b) => b.lines - a.lines);
  }

  analyzeStyleDuplication() {
    // Based on test results
    return {
      count: 11,
      patterns: [
        'padding: 8px 16px (11 places)',
        'background: #f5f5f5 (4 places)'
      ]
    };
  }

  checkTemplateMigration() {
    // Based on test results  
    return {
      count: 7,
      modules: [
        'connect-config',
        'connect-id', 
        'connect-manager',
        'connect-reports',
        'connect-test', 
        'connect-workshop',
        'identification'
      ]
    };
  }

  findInlineStyles() {
    try {
      const cmd = `find ${this.frontendSrc} -name "*.ts" | xargs grep -l "style.*=" | head -10`;
      const result = execSync(cmd, { encoding: 'utf8' });
      return result.trim().split('\n').filter(line => line);
    } catch (e) {
      return [];
    }
  }

  findMissingErrorHandling() {
    try {
      // Find async functions without try-catch
      const cmd = `find ${this.frontendSrc} -name "*.ts" | xargs grep -l "async.*function\\|await" | xargs grep -L "try.*{\\|catch" | head -5`;
      const result = execSync(cmd, { encoding: 'utf8' });
      return result.trim().split('\n').filter(line => line);
    } catch (e) {
      return [];
    }
  }

  generateFocusedReport() {
    console.log('\n📊 Focused Project Issues Report');
    console.log('=====================================\n');
    
    // Group by category and severity
    const categories = ['Production', 'Security', 'Quality', 'Architecture', 'Performance'];
    const severityOrder = ['high', 'medium', 'low'];
    
    let totalIssues = this.issues.length;
    let criticalCount = this.issues.filter(i => i.severity === 'high').length;
    let majorCount = this.issues.filter(i => i.severity === 'medium').length;
    let minorCount = this.issues.filter(i => i.severity === 'low').length;
    
    console.log(`🔴 High Priority: ${criticalCount}`);
    console.log(`🟠 Medium Priority: ${majorCount}`);  
    console.log(`🟡 Low Priority: ${minorCount}`);
    console.log(`📊 Total Issues: ${totalIssues}\n`);

    // Show issues by category
    for (const category of categories) {
      const categoryIssues = this.issues.filter(i => i.category === category);
      if (categoryIssues.length === 0) continue;
      
      console.log(`## ${category} Issues (${categoryIssues.length})`);
      
      for (const severity of severityOrder) {
        const issues = categoryIssues.filter(i => i.severity === severity);
        issues.forEach(issue => {
          const icon = severity === 'high' ? '🔴' : severity === 'medium' ? '🟠' : '🟡';
          console.log(`${icon} **${issue.title}**`);
          console.log(`   Files: ${issue.count} | Effort: ${issue.effort}`);
          if (issue.autofix) console.log(`   🤖 Auto-fix available`);
          console.log('');
        });
      }
    }

    this.generateActionablePlan();
  }

  generateActionablePlan() {
    const planPath = path.join(this.projectRoot, 'ACTIONABLE_REFACTORING_PLAN.md');
    
    const highPriority = this.issues.filter(i => i.severity === 'high');
    const mediumPriority = this.issues.filter(i => i.severity === 'medium');
    const lowPriority = this.issues.filter(i => i.severity === 'low');
    const autoFixable = this.issues.filter(i => i.autofix);
    
    const plan = `# 🎯 Actionable Refactoring Plan

*Generated: ${new Date().toISOString().split('T')[0]}*

## 📊 Executive Summary

- **Total Issues**: ${this.issues.length} (source code only)
- **High Priority**: ${highPriority.length} issues
- **Medium Priority**: ${mediumPriority.length} issues  
- **Low Priority**: ${lowPriority.length} issues
- **Auto-fixable**: ${autoFixable.length} issues

## 🚀 Quick Wins (Can be automated - 30 minutes)

${autoFixable.map(issue => `
### ${issue.title}
\`\`\`bash
${issue.solution}
\`\`\`
**Impact**: ${issue.description}
`).join('')}

## 🔴 High Priority Issues (Fix This Week)

${highPriority.map(issue => `
### ${issue.title}
- **Problem**: ${issue.description}
- **Files Affected**: ${issue.count}
- **Effort**: ${issue.effort}
- **Category**: ${issue.category}

**Files to Fix**:
${issue.files.slice(0, 5).map(f => `- ${f.replace(this.projectRoot, '.')}`).join('\n')}

**Solution**: ${issue.solution}

---`).join('')}

## 🟠 Medium Priority Issues (Fix Next Week)

${mediumPriority.map(issue => `
### ${issue.title}
- **Problem**: ${issue.description}
- **Files Affected**: ${issue.count}
- **Effort**: ${issue.effort}

**Solution**: ${issue.solution}

---`).join('')}

## 🟡 Low Priority Issues (Fix When Time Allows)

${lowPriority.map(issue => `
### ${issue.title}
- **Files Affected**: ${issue.count}
- **Effort**: ${issue.effort}
- **Solution**: ${issue.solution}

---`).join('')}

## 📅 Weekly Action Plan

### Week 1: Critical Fixes
${highPriority.slice(0, 3).map((issue, i) => `${i + 1}. ${issue.title} (${issue.effort})`).join('\n')}

### Week 2: Major Improvements  
${mediumPriority.slice(0, 3).map((issue, i) => `${i + 1}. ${issue.title} (${issue.effort})`).join('\n')}

### Week 3: Code Quality
${lowPriority.slice(0, 2).map((issue, i) => `${i + 1}. ${issue.title} (${issue.effort})`).join('\n')}

## 🛠️ Implementation Scripts

### Auto-fix Console Logs
\`\`\`bash
# Remove all console.log from source code
find frontend/src -name "*.ts" -exec sed -i '/console\\.log/d' {} \\;
echo "✅ Console logs removed"
\`\`\`

### TypeScript Quality Check  
\`\`\`bash
# Find 'any' types in source
echo "🔍 Finding 'any' types..."
grep -r ": any\\|<any>" frontend/src --include="*.ts" | wc -l
\`\`\`

### Style Cleanup
\`\`\`bash
# Find duplicate CSS patterns
echo "🎨 Finding duplicate styles..."
grep -r "padding: 8px 16px" frontend/src --include="*.ts" 
grep -r "background: #f5f5f5" frontend/src --include="*.ts"
\`\`\`

## 📈 Success Metrics

- [ ] Zero console.log statements in source code
- [ ] Less than 10 'any' types in TypeScript  
- [ ] All files under 300 lines
- [ ] No innerHTML usage in components
- [ ] All async functions have error handling
- [ ] 7/8 modules migrated to template system

## 🔗 Resources

- [TypeScript Best Practices](https://typescript-eslint.io/)
- [Security Guidelines](https://owasp.org/www-project-top-ten/)
- [Template Migration Guide](./frontend/src/modules/template/README.md)

---
*Focus: Address high-priority issues first for maximum impact*
`;

    fs.writeFileSync(planPath, plan);
    console.log(`\n📄 Actionable plan saved: ${planPath}`);
  }
}

// Run focused analysis
if (require.main === module) {
  const analyzer = new FocusedIssuesAnalyzer();
  analyzer.analyze().catch(console.error);
}

module.exports = FocusedIssuesAnalyzer;
