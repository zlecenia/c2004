#!/usr/bin/env node  
// frontend/tests/test-registry.js
import { readFileSync } from 'fs';

let testsPassed = 0;
let testsFailed = 0;

function test(description, testFn) {
  try {
    testFn();
    console.log(`  ✅ ${description}`);
    testsPassed++;
  } catch (error) {
    console.log(`  ❌ ${description}: ${error.message}`);
    testsFailed++;
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

console.log('🧪 Testing Registry System...\n');

// Test component registry
test('component.registry.ts structure', () => {
  const content = readFileSync('src/registry/component.registry.ts', 'utf8');
  assert(content.includes('COMPONENT_REGISTRY'), 'should export COMPONENT_REGISTRY');
  assert(content.includes('ComponentSchema'), 'should have ComponentSchema validation');
  assert(content.includes('getComponent'), 'should export getComponent function');
});

test('component registry has all modules', () => {
  const content = readFileSync('src/registry/component.registry.ts', 'utf8');
  const requiredComponents = [
    'connect-id',
    'connect-test',
    'connect-data',
    'connect-workshop',
    'connect-config'
  ];
  
  requiredComponents.forEach(component => {
    assert(content.includes(`'${component}':`), `Component registry should include ${component}`);
  });
});

// Test module registry  
test('module.registry.ts structure', () => {
  const content = readFileSync('src/registry/module.registry.ts', 'utf8');
  assert(content.includes('MODULE_REGISTRY'), 'should export MODULE_REGISTRY');
  assert(content.includes('ModuleSchema'), 'should have ModuleSchema validation');
  assert(content.includes('getModule'), 'should export getModule function');
});

test('module registry has proper module definitions', () => {
  const content = readFileSync('src/registry/module.registry.ts', 'utf8');
  
  // Check for required fields
  assert(content.includes('displayName'), 'modules should have displayName');
  assert(content.includes('version'), 'modules should have version');
  assert(content.includes('status'), 'modules should have status');
  assert(content.includes('features'), 'modules should have features');
});

// Test route registry
test('route.registry.ts structure', () => {
  const content = readFileSync('src/registry/route.registry.ts', 'utf8');
  assert(content.includes('ROUTE_REGISTRY'), 'should export ROUTE_REGISTRY');
  assert(content.includes('RouteDefinition'), 'should have RouteDefinition interface');
  assert(content.includes('getRoute'), 'should export getRoute function');
  assert(content.includes('buildUrl'), 'should export buildUrl function');
});

test('route registry has all module routes', () => {
  const content = readFileSync('src/registry/route.registry.ts', 'utf8');
  const requiredRoutes = [
    '/connect-id',
    '/connect-test', 
    '/connect-data',
    '/connect-workshop',
    '/connect-config'
  ];
  
  requiredRoutes.forEach(route => {
    assert(content.includes(`path: '${route}'`), `Route registry should include ${route}`);
  });
});

// Test service manifest
test('service.manifest.ts integration', () => {
  const content = readFileSync('src/config/service.manifest.ts', 'utf8');
  assert(content.includes('IdentificationServiceManifest'), 'should export service manifest');
  assert(content.includes('components'), 'should define components');
  assert(content.includes('modules'), 'should define modules list');
});

test('service manifest has all components configured', () => {
  const content = readFileSync('src/config/service.manifest.ts', 'utf8');
  const requiredComponents = [
    'connect-id',
    'connect-test',
    'connect-data',
    'connect-workshop',
    'connect-config'
  ];
  
  requiredComponents.forEach(component => {
    assert(content.includes(`'${component}':`), `Service manifest should configure ${component}`);
  });
});

// Test registry index
test('registry index.ts exports', () => {
  const content = readFileSync('src/registry/index.ts', 'utf8');
  assert(content.includes('export * from'), 'should re-export all registries');
  assert(content.includes('validateAllRegistries'), 'should export validation function');
  assert(content.includes('registryHealthCheck'), 'should export health check function');
});

// Test registry consistency
test('registries are consistent with modules', () => {
  const moduleIndex = readFileSync('src/modules/index.ts', 'utf8');
  const componentRegistry = readFileSync('src/registry/component.registry.ts', 'utf8');
  const serviceManifest = readFileSync('src/config/service.manifest.ts', 'utf8');
  
  const modules = ['connect-id', 'connect-test', 'connect-data', 'connect-workshop', 'connect-config'];
  
  modules.forEach(module => {
    assert(moduleIndex.includes(module), `Module index should include ${module}`);
    assert(componentRegistry.includes(module), `Component registry should include ${module}`);
    assert(serviceManifest.includes(module), `Service manifest should include ${module}`);
  });
});

// Summary
console.log(`\n📊 Registry Tests: ${testsPassed} passed, ${testsFailed} failed`);

if (testsFailed > 0) {
  process.exit(1);
} else {
  console.log('✅ All registry tests passed!');
  process.exit(0);
}
