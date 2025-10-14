# 🔧 Project Refactoring Plan

Generated on: 2025-10-13

## 📊 Summary

- **Total Issues Found**: 16
- **Critical Issues**: 2
- **Major Issues**: 7
- **Minor Issues**: 6
- **Suggestions**: 1

## 🚨 Critical Issues (Fix Immediately)


### hardcoded-secrets
- **Problem**: Potential hardcoded secrets/tokens
- **Affected**: 251 files
- **Priority**: Critical
- **Effort**: Low (1 hour)
- **Solution**: Move to environment variables
- **Files**: /home/tom/github/zlecenia/c2004/frontend/node_modules/zod/src/v3/tests/error.test.ts, /home/tom/github/zlecenia/c2004/frontend/node_modules/zod/src/v3/tests/refine.test.ts, /home/tom/github/zlecenia/c2004/frontend/node_modules/zod/src/v4/classic/tests/error.test.ts


### eval-usage
- **Problem**: eval() usage (security risk)
- **Affected**: 4 files
- **Priority**: Critical
- **Effort**: Medium (2-4 hours)
- **Solution**: Replace with safer alternatives
- **Files**: /home/tom/github/zlecenia/c2004/frontend/node_modules/typescript/lib/lib.es5.d.ts, /home/tom/github/zlecenia/c2004/frontend/node_modules/vite/dist/node/chunks/dep-Chhhsdoe.js, /home/tom/github/zlecenia/c2004/frontend/node_modules/@types/node/repl.d.ts


## 🟠 Major Issues (Fix Soon)


### console-logs
- **Problem**: Console.log statements found (production risk)
- **Affected**: 218 files
- **Priority**: High
- **Effort**: Low (1-2 hours)
- **Solution**: Remove or replace with proper logging system
- **Files**: /home/tom/github/zlecenia/c2004/frontend/node_modules/picomatch/lib/picomatch.js, /home/tom/github/zlecenia/c2004/frontend/node_modules/picomatch/lib/scan.js, /home/tom/github/zlecenia/c2004/frontend/node_modules/zod/src/v3/benchmarks/primitives.ts


### typescript-any
- **Problem**: Usage of "any" type (type safety)
- **Affected**: 240 files
- **Priority**: High
- **Effort**: Medium (2-3 hours)
- **Solution**: Replace with proper interfaces/types
- **Files**: /home/tom/github/zlecenia/c2004/frontend/node_modules/undici-types/patch.d.ts, /home/tom/github/zlecenia/c2004/frontend/node_modules/undici-types/websocket.d.ts, /home/tom/github/zlecenia/c2004/frontend/node_modules/undici-types/webidl.d.ts


### large-files
- **Problem**: Files exceeding 500 lines (maintainability)
- **Affected**: 138 files
- **Priority**: Medium
- **Effort**: High (4-6 hours per file)
- **Solution**: Break down into smaller, focused modules
- **Files**: ./frontend/node_modules/typescript/lib/typescript.js (200277 lines), ./frontend/node_modules/typescript/lib/_tsc.js (133819 lines), ./frontend/node_modules/typescript/lib/lib.dom.d.ts (39430 lines)


### innerHTML-xss
- **Problem**: innerHTML usage (XSS vulnerability)
- **Affected**: 81 files
- **Priority**: High
- **Effort**: Medium (2-3 hours)
- **Solution**: Use textContent, sanitize HTML, template engines
- **Files**: /home/tom/github/zlecenia/c2004/frontend/src/main.ts, /home/tom/github/zlecenia/c2004/frontend/src/components/virtual-keyboard.component.ts, /home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/connect-menu.component.ts


### code-duplication
- **Problem**: Code duplication detected
- **Affected**: 41 files
- **Priority**: Medium
- **Effort**: Medium (3-4 hours)
- **Solution**: Extract common functions/components
- **Files**: /home/tom/github/zlecenia/c2004/frontend/src/main.ts, /home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/menu.styles.ts, /home/tom/github/zlecenia/c2004/frontend/src/modules/connect-workshop/connect-workshop.styles.ts


### error-handling
- **Problem**: Missing error handling in async functions
- **Affected**: 71 files
- **Priority**: High
- **Effort**: Medium (2-3 hours)
- **Solution**: Add try-catch blocks, error boundaries
- **Files**: /home/tom/github/zlecenia/c2004/frontend/node_modules/undici-types/fetch.d.ts, /home/tom/github/zlecenia/c2004/frontend/node_modules/zod/src/v3/tests/custom.test.ts, /home/tom/github/zlecenia/c2004/frontend/node_modules/zod/src/v3/tests/async-parsing.test.ts


### deprecated-apis
- **Problem**: Deprecated API usage
- **Affected**: 6 files
- **Priority**: High
- **Effort**: Medium (2-4 hours)
- **Solution**: Update to modern API alternatives
- **Files**: /home/tom/github/zlecenia/c2004/backend/app/models/identification.py, /home/tom/github/zlecenia/c2004/backend/app/config/settings.py, /home/tom/github/zlecenia/c2004/frontend/node_modules/typescript/lib/lib.dom.d.ts


## 🟡 Minor Issues (Fix When Possible)


### missing-return-types
- **Problem**: Functions without return type annotations
- **Affected**: 5 files
- **Priority**: Medium
- **Effort**: Low (1-2 hours)
- **Solution**: Add explicit return types to functions


### unused-imports
- **Problem**: Unused imports and exports (bundle size)
- **Affected**: 10 files
- **Priority**: Low
- **Effort**: Low (1-2 hours)
- **Solution**: Remove unused imports, use tree-shaking


### inline-styles
- **Problem**: Inline styles detected (performance)
- **Affected**: 90 files
- **Priority**: Medium
- **Effort**: Medium (3-4 hours)
- **Solution**: Move to CSS classes, use CSS-in-JS libraries


### direct-dom
- **Problem**: Direct DOM manipulation (maintainability)
- **Affected**: 97 files
- **Priority**: Medium
- **Effort**: Medium (3-5 hours)
- **Solution**: Use framework patterns, virtual DOM


### todo-comments
- **Problem**: TODO/FIXME comments (technical debt)
- **Affected**: 10 files
- **Priority**: Low
- **Effort**: Variable (depends on todo)
- **Solution**: Resolve todos or create proper tickets


### legacy-patterns
- **Problem**: Legacy code patterns detected
- **Affected**: 533 files
- **Priority**: Low
- **Effort**: Medium (3-5 hours)
- **Solution**: Refactor to modern patterns


## 💡 Suggestions (Improvements)


### styles-migration
- **Improvement**: Modules need template styles migration
- **Affected**: 7 files
- **Priority**: Medium
- **Effort**: High (2-3 hours per module)
- **Solution**: Migrate to ModuleStyleHelper.forStandardModule()


## 📋 Prioritized Action Plan

### Week 1 (Critical & High Priority)
1. Fix **hardcoded-secrets** (Low (1 hour))
2. Fix **eval-usage** (Medium (2-4 hours))
3. Fix **console-logs** (Low (1-2 hours))
4. Fix **typescript-any** (Medium (2-3 hours))
5. Fix **innerHTML-xss** (Medium (2-3 hours))
6. Fix **error-handling** (Medium (2-3 hours))
7. Fix **deprecated-apis** (Medium (2-4 hours))

### Week 2-3 (Major Issues)
1. Address **large-files** (High (4-6 hours per file))
2. Address **code-duplication** (Medium (3-4 hours))

### Week 4+ (Minor & Suggestions)
1. Improve **missing-return-types** (Low (1-2 hours))
2. Improve **unused-imports** (Low (1-2 hours))
3. Improve **inline-styles** (Medium (3-4 hours))
4. Improve **direct-dom** (Medium (3-5 hours))
5. Improve **todo-comments** (Variable (depends on todo))
6. Improve **legacy-patterns** (Medium (3-5 hours))
7. Improve **styles-migration** (High (2-3 hours per module))

## 🛠️ Quick Fixes (Can be automated)

```bash
# Remove console.log statements
find frontend -name "*.ts" -exec sed -i '/console\.log/d' {} \;

# Fix basic TypeScript issues
npx prettier --write "frontend/src/**/*.ts"

# Remove unused imports
npx eslint --fix "frontend/src/**/*.ts"
```

## 📚 Resources

- [TypeScript Best Practices](https://typescript-eslint.io/rules/)
- [Security Guidelines](https://owasp.org/www-project-top-ten/)
- [Performance Optimization](https://web.dev/performance/)
- [Code Quality Standards](https://github.com/airbnb/javascript)

---
*This report was generated automatically. Review and validate findings before implementing changes.*
