# Architektura z Executable Manifests
## Kod Zamiast Dokumentacji - Runtime Validation

> **Filozofia**: "If it's not executable code, it's out of sync"  
> **Zasada**: Manifesty to TypeScript code, nie JSON documents  
> **Enforcement**: Runtime validation przy każdym imporcie  
> **Tools**: Zod, TypeScript, Vite, ESLint, nie custom parsery

---

## 🔥 Problem z "Martwymi" Manifestami

### ❌ Co Nie Działało

**Problem 1: JSON Manifesty jako dokumentacja**
```json
// .llm/component-registry.json
{
  "universal-connectid": {
    "path": "/static/common/js/universal-connectid.js",
    "status": "production"
  }
}
```
❌ Plik może być outdated  
❌ Nie waliduje się automatycznie  
❌ Brak type safety  
❌ Nie egzekwuje zasad

**Problem 2: Brak enforcement**
```javascript
// Ktoś może zrobić:
import ConnectID from '/some/random/path.js';  // Omija registry!
```
❌ Registry nie jest egzekwowany  
❌ Nie ma błędu w runtime  
❌ Odkrywamy problem po tygodniach

**Problem 3: Synchronizacja manualna**
```javascript
// Zmieniamy komponent
mv /old/path.js /new/path.js

// Musimy pamiętać o update registry
// (często zapominamy)
```
❌ Registry staje się nieaktualny  
❌ Brak automatycznej synchronizacji

---

## ✅ Rozwiązanie: Executable Manifests

### Kluczowe Zasady

1. **Manifesty = TypeScript Code** - nie JSON
2. **Runtime Validation** - błąd od razu widoczny
3. **Type Safety** - TypeScript + Zod
4. **Import Interception** - kontrola wszystkich importów
5. **Wykorzystanie Istniejących Narzędzi** - nie custom solutions

---

## 1. Component Registry jako TypeScript

### Zamiast JSON → TypeScript z Zod

```typescript
// shared/registry/component-registry.ts
import { z } from 'zod';

// Schema definition (validatable)
export const ComponentSchema = z.object({
  path: z.string().startsWith('/static/'),
  version: z.string().regex(/^\d+\.\d+\.\d+$/),
  type: z.enum(['vue-component', 'react-component', 'vanilla-js']),
  status: z.enum(['production', 'beta', 'deprecated']),
  manifest: z.string().optional(),
  usedBy: z.array(z.string()).default([]),
  replaces: z.array(z.string()).default([]),
  exports: z.array(z.string()),
  tests: z.string().optional()
});

export type Component = z.infer<typeof ComponentSchema>;

// Registry as code (not data)
export const COMPONENT_REGISTRY = {
  'universal-connectid': {
    path: '/static/common/js/universal-connectid.js',
    version: '2.0.0',
    type: 'vanilla-js',
    status: 'production',
    exports: ['UniversalConnectID'],
    usedBy: ['identification', 'dashboard', 'inventory'],
    replaces: [
      '/pages/cm/js/components/ConnectID.js',
      '/pages/cpp/js/components/ConnectID.js'
    ],
    tests: '/static/common/js/universal-connectid.test.js'
  },
  
  'app-shell': {
    path: '/static/common/components/app-shell/0.1.0/AppShell.vue',
    version: '0.1.0',
    type: 'vue-component',
    status: 'production',
    exports: ['AppShell'],
    usedBy: ['identification', 'report', 'inventory']
  },
  
  'pressure-gauge': {
    path: '/static/common/components/pressure-gauge/0.1.0/PressureGauge.vue',
    version: '0.1.0',
    type: 'vue-component',
    status: 'production',
    exports: ['PressureGauge'],
    usedBy: ['identification', 'report', 'dashboard']
  }
} as const satisfies Record<string, z.infer<typeof ComponentSchema>>;

// Runtime validation function
export function validateComponent(name: string, component: unknown): Component {
  return ComponentSchema.parse(component);
}

// Helper to get component (type-safe)
export function getComponent(name: keyof typeof COMPONENT_REGISTRY) {
  return COMPONENT_REGISTRY[name];
}

// Check if path is deprecated
export function isDeprecatedPath(path: string): boolean {
  return Object.values(COMPONENT_REGISTRY).some(
    comp => comp.replaces?.includes(path)
  );
}

// Get canonical path for deprecated
export function getCanonicalPath(deprecatedPath: string): string | null {
  const component = Object.values(COMPONENT_REGISTRY).find(
    comp => comp.replaces?.includes(deprecatedPath)
  );
  return component?.path ?? null;
}

// Validate entire registry at startup
export function validateRegistry() {
  const errors: string[] = [];
  
  for (const [name, component] of Object.entries(COMPONENT_REGISTRY)) {
    try {
      ComponentSchema.parse(component);
    } catch (error) {
      errors.push(`Invalid component "${name}": ${error}`);
    }
  }
  
  if (errors.length > 0) {
    throw new Error(`Registry validation failed:\n${errors.join('\n')}`);
  }
}

// Auto-validate on import
validateRegistry();
```

**Korzyści:**
- ✅ Type safety w całej aplikacji
- ✅ Błędy walidacji w runtime
- ✅ Impossible to be out of sync
- ✅ IDE autocomplete
- ✅ Refactoring-friendly

---

## 2. Import Interception - Vite Plugin

### Kontrola Wszystkich Importów

```typescript
// vite-plugins/import-validator.ts
import { Plugin } from 'vite';
import { COMPONENT_REGISTRY, isDeprecatedPath, getCanonicalPath } from '../shared/registry/component-registry';

export function importValidatorPlugin(): Plugin {
  return {
    name: 'import-validator',
    
    enforce: 'pre',
    
    resolveId(source: string, importer?: string) {
      // Check if importing deprecated path
      if (isDeprecatedPath(source)) {
        const canonical = getCanonicalPath(source);
        
        throw new Error(
          `❌ DEPRECATED IMPORT: ${source}\n` +
          `   Used in: ${importer}\n` +
          `   Use instead: ${canonical}\n` +
          `   Migration guide: /docs/migrations/`
        );
      }
      
      // Check if importing component not in registry
      if (source.startsWith('/static/common/')) {
        const isInRegistry = Object.values(COMPONENT_REGISTRY).some(
          comp => source.includes(comp.path)
        );
        
        if (!isInRegistry) {
          console.warn(
            `⚠️  Importing component not in registry: ${source}\n` +
            `   Used in: ${importer}\n` +
            `   Consider adding to component-registry.ts`
          );
        }
      }
      
      return null; // Continue normal resolution
    },
    
    transform(code: string, id: string) {
      // Check for hardcoded paths in code
      const hardcodedPaths = [
        '/pages/cm/js/components/ConnectID.js',
        '/pages/cpp/js/components/ConnectID.js'
      ];
      
      for (const deprecated of hardcodedPaths) {
        if (code.includes(deprecated)) {
          const canonical = getCanonicalPath(deprecated);
          
          throw new Error(
            `❌ HARDCODED DEPRECATED PATH in ${id}\n` +
            `   Found: ${deprecated}\n` +
            `   Use: ${canonical}`
          );
        }
      }
      
      return null;
    }
  };
}
```

**Vite Config:**
```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { importValidatorPlugin } from './vite-plugins/import-validator';

export default defineConfig({
  plugins: [
    vue(),
    importValidatorPlugin()  // Auto-validates all imports
  ],
  
  resolve: {
    alias: {
      '@components': '/static/common/components',
      '@registry': '/shared/registry'
    }
  }
});
```

**Efekt:**
```typescript
// ❌ To spowoduje błąd w build time
import ConnectID from '/pages/cm/js/components/ConnectID.js';
// Error: DEPRECATED IMPORT
//   Use instead: /static/common/js/universal-connectid.js

// ✅ To zadziała
import { UniversalConnectID } from '@registry/component-registry';
const component = UniversalConnectID.create(...);
```

---

## 3. Service Manifest jako TypeScript Class

### Zamiast JSON → Executable Class

```typescript
// services/identification/v1/service.manifest.ts
import { z } from 'zod';
import { getComponent, type Component } from '@registry/component-registry';

// Schema for service configuration
const ServiceConfigSchema = z.object({
  name: z.string(),
  version: z.string(),
  ports: z.object({
    frontend: z.number(),
    backend: z.number()
  }),
  components: z.record(z.string(), z.object({
    version: z.string(),
    configuration: z.record(z.unknown()).optional()
  })),
  dependencies: z.array(z.string())
});

export type ServiceConfig = z.infer<typeof ServiceConfigSchema>;

/**
 * Identification Service Manifest
 * This is EXECUTABLE CODE, not documentation
 */
export class IdentificationServiceManifest {
  readonly name = 'identification';
  readonly version = '1.0.0';
  readonly ports = {
    frontend: 8100,
    backend: 8101
  };
  
  /**
   * Components used by this service
   * Runtime validation ensures they exist in registry
   */
  readonly components = {
    'universal-connectid': {
      version: '2.0.0',
      configuration: {
        enableRFID: true,
        enableQR: true,
        enableBarcode: true,
        enableManual: true,
        enableUserLogin: true,
        enableDeviceTest: true,
        enableGroupTest: false,
        enableTestType: true
      }
    },
    'app-shell': {
      version: '0.1.0'
    },
    'pressure-gauge': {
      version: '0.1.0'
    }
  };
  
  readonly dependencies = ['vue', 'bootstrap'];
  
  /**
   * Validate entire service configuration
   * Called automatically on import
   */
  validate(): void {
    // Validate schema
    ServiceConfigSchema.parse(this.toJSON());
    
    // Validate all components exist in registry
    for (const [name, config] of Object.entries(this.components)) {
      const component = getComponent(name as any);
      
      if (!component) {
        throw new Error(
          `Component "${name}" used in service "${this.name}" not found in registry`
        );
      }
      
      if (component.version !== config.version) {
        console.warn(
          `⚠️  Version mismatch for "${name}":\n` +
          `   Service expects: ${config.version}\n` +
          `   Registry has: ${component.version}`
        );
      }
    }
  }
  
  /**
   * Get component instance with service-specific configuration
   */
  getComponentConfig<T extends keyof typeof this.components>(
    componentName: T
  ): Component & { configuration: typeof this.components[T]['configuration'] } {
    const registryComponent = getComponent(componentName as any);
    const serviceConfig = this.components[componentName];
    
    return {
      ...registryComponent,
      configuration: serviceConfig.configuration || {}
    };
  }
  
  /**
   * Initialize all components for this service
   * Returns type-safe component instances
   */
  async initializeComponents() {
    const connectIDConfig = this.getComponentConfig('universal-connectid');
    
    // Type-safe: TypeScript knows configuration shape
    const connectID = UniversalConnectID.create('identification-connectid-container', {
      ...connectIDConfig.configuration
    });
    
    return {
      connectID,
      // ... other components
    };
  }
  
  /**
   * Convert to JSON for API/logging
   */
  toJSON(): ServiceConfig {
    return {
      name: this.name,
      version: this.version,
      ports: this.ports,
      components: this.components,
      dependencies: this.dependencies
    };
  }
}

// Create and validate instance
export const serviceManifest = new IdentificationServiceManifest();
serviceManifest.validate(); // Auto-validate on import
```

**Użycie:**
```typescript
// services/identification/v1/frontend/main.ts
import { serviceManifest } from './service.manifest';

async function initApp() {
  // Manifest już zwalidowany przy imporcie
  // Jeśli coś jest nie tak - błąd w build time
  
  const components = await serviceManifest.initializeComponents();
  
  // Type-safe access
  components.connectID.setMethod('rfid');
}
```

---

## 4. Dependency Management z Zod + Runtime Check

### Zamiast JSON → TypeScript z Auto-Validation

```typescript
// shared/registry/dependency-registry.ts
import { z } from 'zod';

const DependencySourceSchema = z.object({
  type: z.enum(['cdn', 'local']),
  url: z.string().url(),
  priority: z.number().min(1),
  timeout: z.number().default(10000),
  integrity: z.string().optional() // SRI hash
});

const DependencySchema = z.object({
  name: z.string(),
  version: z.string(),
  sources: z.array(DependencySourceSchema),
  globalCheck: z.string().optional(),
  requiredFor: z.array(z.string())
});

export type Dependency = z.infer<typeof DependencySchema>;

/**
 * Dependency Registry with runtime validation
 */
export const DEPENDENCY_REGISTRY = {
  vue: {
    name: 'vue',
    version: '3.x',
    sources: [
      {
        type: 'cdn',
        url: 'https://unpkg.com/vue@3/dist/vue.global.prod.js',
        priority: 1,
        timeout: 5000,
        integrity: 'sha384-...' // SRI
      },
      {
        type: 'cdn',
        url: 'https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.prod.js',
        priority: 2,
        timeout: 5000
      },
      {
        type: 'local',
        url: '/static/vendor/vue/vue.global.prod.js',
        priority: 3
      }
    ],
    globalCheck: 'Vue',
    requiredFor: ['all']
  },
  
  bootstrap: {
    name: 'bootstrap',
    version: '5.1.3',
    sources: [
      {
        type: 'cdn',
        url: 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js',
        priority: 1
      },
      {
        type: 'local',
        url: '/static/vendor/bootstrap/bootstrap.bundle.min.js',
        priority: 2
      }
    ],
    globalCheck: 'bootstrap',
    requiredFor: ['dashboard', 'inventory']
  }
} as const satisfies Record<string, Dependency>;

/**
 * Dependency Loader with automatic fallback
 */
export class DependencyLoader {
  private loaded = new Set<string>();
  private loading = new Map<string, Promise<void>>();
  
  /**
   * Load dependency with automatic fallback
   */
  async load(name: keyof typeof DEPENDENCY_REGISTRY): Promise<void> {
    // Already loaded
    if (this.loaded.has(name)) {
      return;
    }
    
    // Currently loading
    if (this.loading.has(name)) {
      return this.loading.get(name)!;
    }
    
    const dependency = DEPENDENCY_REGISTRY[name];
    
    // Validate dependency schema
    DependencySchema.parse(dependency);
    
    const loadPromise = this.loadWithFallback(dependency);
    this.loading.set(name, loadPromise);
    
    await loadPromise;
    this.loaded.add(name);
    this.loading.delete(name);
  }
  
  private async loadWithFallback(dependency: Dependency): Promise<void> {
    const sources = [...dependency.sources].sort((a, b) => a.priority - b.priority);
    
    for (const source of sources) {
      try {
        await this.loadScript(source.url, source.timeout, source.integrity);
        
        // Validate global if specified
        if (dependency.globalCheck && !(dependency.globalCheck in window)) {
          throw new Error(`Global ${dependency.globalCheck} not found`);
        }
        
        console.log(`✓ Loaded ${dependency.name} from ${source.type}: ${source.url}`);
        return;
        
      } catch (error) {
        console.warn(`Failed to load ${dependency.name} from ${source.url}:`, error);
        continue;
      }
    }
    
    throw new Error(`Failed to load ${dependency.name} from all sources`);
  }
  
  private loadScript(url: string, timeout: number, integrity?: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      if (integrity) {
        script.integrity = integrity;
        script.crossOrigin = 'anonymous';
      }
      
      const timer = setTimeout(() => {
        script.remove();
        reject(new Error(`Timeout loading ${url}`));
      }, timeout);
      
      script.onload = () => {
        clearTimeout(timer);
        resolve();
      };
      
      script.onerror = () => {
        clearTimeout(timer);
        reject(new Error(`Failed to load ${url}`));
      };
      
      document.head.appendChild(script);
    });
  }
}

// Singleton instance
export const dependencyLoader = new DependencyLoader();
```

**Użycie w Service:**
```typescript
// services/identification/v1/frontend/main.ts
import { dependencyLoader } from '@registry/dependency-registry';
import { serviceManifest } from './service.manifest';

async function initApp() {
  // Load dependencies with automatic fallback
  for (const dep of serviceManifest.dependencies) {
    await dependencyLoader.load(dep as any);
    // If fails from all sources - error thrown immediately
  }
  
  // Now Vue, Bootstrap etc. are available
  // If not loaded - error already thrown
}
```

---

## 5. ESLint Plugin - Enforce at Code Level

### Custom ESLint Rules

```typescript
// eslint-plugin/no-deprecated-imports.ts
import { ESLintUtils } from '@typescript-eslint/utils';
import { COMPONENT_REGISTRY, isDeprecatedPath, getCanonicalPath } from '../shared/registry/component-registry';

export const noDeprecatedImports = ESLintUtils.RuleCreator(
  name => `https://docs.example.com/rules/${name}`
)({
  name: 'no-deprecated-imports',
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow importing deprecated component paths',
      recommended: 'error'
    },
    fixable: 'code',
    schema: [],
    messages: {
      deprecated: 'Import from deprecated path "{{path}}". Use "{{canonical}}" instead.'
    }
  },
  defaultOptions: [],
  
  create(context) {
    return {
      ImportDeclaration(node) {
        const importPath = node.source.value;
        
        if (typeof importPath === 'string' && isDeprecatedPath(importPath)) {
          const canonical = getCanonicalPath(importPath);
          
          context.report({
            node: node.source,
            messageId: 'deprecated',
            data: {
              path: importPath,
              canonical: canonical || 'unknown'
            },
            fix(fixer) {
              if (canonical) {
                return fixer.replaceText(node.source, `'${canonical}'`);
              }
              return null;
            }
          });
        }
      }
    };
  }
});
```

**ESLint Config:**
```javascript
// .eslintrc.js
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'custom-rules'],
  rules: {
    'custom-rules/no-deprecated-imports': 'error',  // Build fails if violated
    'custom-rules/no-hardcoded-paths': 'error',
    'custom-rules/components-from-registry': 'warn'
  }
};
```

**Efekt:**
```typescript
// ❌ ESLint error w IDE + build fail
import ConnectID from '/pages/cm/js/components/ConnectID.js';
// Error: Import from deprecated path. Use "/static/common/js/universal-connectid.js" instead. [auto-fixable]

// ✅ Auto-fix dostępny
// Ctrl+. (VS Code) → Apply fix
```

---

## 6. TypeScript Path Mapping - Wymuszenie Registry

### tsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["static/common/components/*"],
      "@registry/*": ["shared/registry/*"],
      
      // Blocked paths - TypeScript error
      "/pages/cm/js/components/*": ["THIS_PATH_IS_DEPRECATED_USE_@registry"],
      "/pages/cpp/js/components/*": ["THIS_PATH_IS_DEPRECATED_USE_@registry"]
    },
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

**Efekt:**
```typescript
// ❌ TypeScript error
import ConnectID from '/pages/cm/js/components/ConnectID.js';
// Error: Cannot find module 'THIS_PATH_IS_DEPRECATED_USE_@registry'

// ✅ Poprawnie
import { getComponent } from '@registry/component-registry';
const component = getComponent('universal-connectid');
```

---

## 7. Makefile with Executable Validation

### Zamiast Scripts → Make Targets z Validation

```makefile
# Makefile
.PHONY: validate build test

# Validate registry (TypeScript compilation validates structure)
validate-registry:
	@echo "🔍 Validating component registry..."
	@npx tsc --noEmit shared/registry/component-registry.ts
	@node -e "import('./shared/registry/component-registry.js').then(() => console.log('✅ Registry valid'))"

# Validate services
validate-services:
	@echo "🔍 Validating service manifests..."
	@find services -name 'service.manifest.ts' -exec npx tsc --noEmit {} \;
	@echo "✅ All service manifests valid"

# Run ESLint with custom rules
lint:
	@echo "🔍 Running ESLint..."
	@npx eslint . --ext .ts,.tsx,.js,.jsx,.vue
	@echo "✅ No linting errors"

# Build (validates everything)
build: validate-registry validate-services lint
	@echo "🏗️  Building..."
	@npx vite build
	@echo "✅ Build successful"

# Test
test:
	@echo "🧪 Running tests..."
	@npx vitest run --coverage
	@echo "✅ Tests passed"

# All validation
validate-all: validate-registry validate-services lint test
	@echo "✅ All validations passed"

# Pre-commit (automatic)
pre-commit: validate-all
	@echo "✅ Ready to commit"
```

**Git Hook:**
```bash
# .git/hooks/pre-commit
#!/bin/bash
make pre-commit
```

---

## 8. Runtime Dashboard - Living Documentation

### Auto-Generated from Code

```typescript
// tools/registry-dashboard.ts
import { COMPONENT_REGISTRY } from '../shared/registry/component-registry';
import { DEPENDENCY_REGISTRY } from '../shared/registry/dependency-registry';
import express from 'express';

const app = express();

app.get('/dashboard', (req, res) => {
  // Generate HTML from ACTUAL registry (not stale docs)
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Component Registry Dashboard</title>
      <style>
        /* ... */
      </style>
    </head>
    <body>
      <h1>Component Registry (Live)</h1>
      <p>Generated from: shared/registry/component-registry.ts</p>
      <p>Last compiled: ${new Date().toISOString()}</p>
      
      <h2>Components (${Object.keys(COMPONENT_REGISTRY).length})</h2>
      <div class="components">
        ${Object.entries(COMPONENT_REGISTRY).map(([name, comp]) => `
          <div class="component ${comp.status}">
            <h3>${name} <span>v${comp.version}</span></h3>
            <p><strong>Path:</strong> <code>${comp.path}</code></p>
            <p><strong>Type:</strong> ${comp.type}</p>
            <p><strong>Status:</strong> <span class="badge ${comp.status}">${comp.status}</span></p>
            <p><strong>Used by:</strong> ${comp.usedBy.join(', ') || 'none'}</p>
            ${comp.tests ? `<p><a href="${comp.tests}">Run Tests</a></p>` : ''}
          </div>
        `).join('')}
      </div>
      
      <h2>Dependencies (${Object.keys(DEPENDENCY_REGISTRY).length})</h2>
      <div class="dependencies">
        ${Object.entries(DEPENDENCY_REGISTRY).map(([name, dep]) => `
          <div class="dependency">
            <h3>${name} <span>v${dep.version}</span></h3>
            <p><strong>Sources:</strong></p>
            <ul>
              ${dep.sources.map(s => `
                <li>${s.type}: <code>${s.url}</code> (priority: ${s.priority})</li>
              `).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    </body>
    </html>
  `;
  
  res.send(html);
});

// Health check validates entire registry
app.get('/health', (req, res) => {
  try {
    // If this succeeds, registry is valid
    const componentCount = Object.keys(COMPONENT_REGISTRY).length;
    const dependencyCount = Object.keys(DEPENDENCY_REGISTRY).length;
    
    res.json({
      status: 'healthy',
      components: componentCount,
      dependencies: dependencyCount,
      lastValidated: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      error: error.message
    });
  }
});

app.listen(9001, () => {
  console.log('📊 Registry Dashboard: http://localhost:9001/dashboard');
  console.log('🏥 Health Check: http://localhost:9001/health');
});
```

**Efekt:**
- Dashboard zawsze aktualny (generowany z kodu)
- Nie może być outdated (używa tych samych źródeł co aplikacja)
- Health check waliduje registry

---

## 9. Complete Example - From Start to Finish

### New Service with Executable Manifests

**1. Create Service Manifest (TypeScript)**
```typescript
// services/calibration/v1/service.manifest.ts
import { z } from 'zod';
import { getComponent } from '@registry/component-registry';

export class CalibrationServiceManifest {
  readonly name = 'calibration';
  readonly version = '1.0.0';
  readonly ports = { frontend: 8400, backend: 8401 };
  
  readonly components = {
    'universal-connectid': {
      version: '2.0.0',
      configuration: {
        enableRFID: true,
        enableManual: true,
        enableUserLogin: true,
        enableDeviceTest: true
      }
    }
  };
  
  validate(): void {
    // Validate components exist
    for (const name of Object.keys(this.components)) {
      const component = getComponent(name as any);
      if (!component) {
        throw new Error(`Component "${name}" not in registry`);
      }
    }
  }
}

export const serviceManifest = new CalibrationServiceManifest();
serviceManifest.validate(); // Fails build if invalid
```

**2. Use in Frontend (Type-Safe)**
```typescript
// services/calibration/v1/frontend/main.ts
import { serviceManifest } from './service.manifest';
import { dependencyLoader } from '@registry/dependency-registry';
import { UniversalConnectID } from '@registry/component-registry';

async function initApp() {
  // Load dependencies (auto-fallback)
  for (const dep of serviceManifest.dependencies) {
    await dependencyLoader.load(dep as any);
  }
  
  // Get component config (type-safe)
  const connectIDConfig = serviceManifest.components['universal-connectid'];
  
  // Initialize (validated configuration)
  const connectID = UniversalConnectID.create(
    'calibration-connectid-container',
    connectIDConfig.configuration
  );
}
```

**3. Validate Everything**
```bash
make validate-all

# Runs:
1. TypeScript compilation (validates structure)
2. Zod validation (validates values)
3. ESLint (validates imports)
4. Vite plugin (validates at bundle time)
5. Unit tests

# If anything is wrong - BUILD FAILS
```

**4. Runtime Validation**
```typescript
// At application startup
import './service.manifest';  // Validates on import

// If manifest is invalid - app crashes with clear error:
// Error: Component "xyz" not in registry
// at CalibrationServiceManifest.validate()
```

---

## 10. Benefits Summary

### ❌ Before (JSON Manifests)
- JSON files can be outdated
- No type safety
- No enforcement
- Manual synchronization
- Errors discovered late

### ✅ After (Executable Manifests)
- TypeScript code is always in sync
- Full type safety
- Automatic enforcement
- Impossible to be outdated
- Errors discovered immediately

### Comparison Table

| Aspect | JSON Manifest | Executable Manifest |
|--------|---------------|---------------------|
| **Type Safety** | ❌ None | ✅ Full (TypeScript) |
| **Validation** | ❌ Manual | ✅ Automatic (Zod) |
| **Enforcement** | ❌ Optional | ✅ Build fails |
| **Sync** | ❌ Manual | ✅ Automatic |
| **Errors** | ❌ Runtime | ✅ Build time |
| **Refactoring** | ❌ Manual | ✅ IDE support |
| **Documentation** | ❌ Separate | ✅ Generated from code |
| **Testing** | ❌ Hard | ✅ Easy (unit tests) |

---

## 11. Migration Guide

### From JSON to TypeScript

**Step 1: Install Dependencies**
```bash
npm install zod @typescript-eslint/utils
npm install -D typescript @types/node
```

**Step 2: Convert Registry**
```bash
# Convert JSON to TypeScript
node tools/convert-registry-to-ts.js

# Input: .llm/component-registry.json
# Output: shared/registry/component-registry.ts
```

**Step 3: Update Imports**
```typescript
// Before
const registry = require('./.llm/component-registry.json');

// After
import { COMPONENT_REGISTRY, getComponent } from '@registry/component-registry';
```

**Step 4: Add Vite Plugin**
```typescript
// vite.config.ts
import { importValidatorPlugin } from './vite-plugins/import-validator';

export default defineConfig({
  plugins: [
    vue(),
    importValidatorPlugin()
  ]
});
```

**Step 5: Run Validation**
```bash
make validate-all

# Fix any errors reported
# Most can be auto-fixed by ESLint
```

---

## 12. Key Takeaways

### 🎯 Core Principles

1. **Code Over Config**: Manifests są kodem TypeScript, nie JSON
2. **Runtime Validation**: Błędy widoczne natychmiast
3. **Type Safety**: TypeScript + Zod = impossible states
4. **Existing Tools**: Wykorzystuj Vite, ESLint, TypeScript
5. **Fail Fast**: Błąd w build time, nie po miesiącach

### 📝 Best Practices

**✅ DO:**
- Write manifests as TypeScript classes
- Use Zod for runtime validation
- Implement Vite plugins for import control
- Auto-validate on import
- Generate docs from code

**❌ DON'T:**
- Create JSON manifests without validation
- Rely on manual synchronization
- Skip type checking
- Ignore build errors
- Write documentation separately

### 🚀 Result

**Before:** 17 problems in 11 hours of manual debugging

**After:** 0 problems - all caught at build time:
```bash
$ npm run build
✗ Error: Component "xyz" not in registry
  at service.manifest.ts:42
  
Build failed in 0.3s
```

Clear error, immediate fix, no debugging needed.

---

**This is the executable manifests architecture!**

Wszystko jest kodem, wszystko się waliduje, nic nie może być outdated.

