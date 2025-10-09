#!/usr/bin/env node
// frontend/tests/test-structure.js
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

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

console.log('🧪 Testing Frontend Structure...\n');

// Test required files exist
test('package.json exists', () => {
  assert(existsSync('package.json'), 'package.json should exist');
});

test('tsconfig.json exists', () => {
  assert(existsSync('tsconfig.json'), 'tsconfig.json should exist');
});

test('vite.config.ts exists', () => {
  assert(existsSync('vite.config.ts'), 'vite.config.ts should exist');
});

test('index.html exists', () => {
  assert(existsSync('index.html'), 'index.html should exist');
});

test('src directory exists', () => {
  assert(existsSync('src'), 'src directory should exist');
});

test('main.ts exists', () => {
  assert(existsSync('src/main.ts'), 'src/main.ts should exist');
});

// Test modules directory structure
test('modules directory exists', () => {
  assert(existsSync('src/modules'), 'modules directory should exist');
});

const requiredModules = [
  'connect-id',
  'connect-test', 
  'connect-data',
  'connect-workshop',
  'connect-config'
];

requiredModules.forEach(module => {
  test(`${module} module directory exists`, () => {
    assert(existsSync(`src/modules/${module}`), `${module} module directory should exist`);
  });
  
  test(`${module} module files exist`, () => {
    const moduleFiles = [
      `src/modules/${module}/${module.replace('connect-', 'connect-')}.module.ts`,
      `src/modules/${module}/${module.replace('connect-', 'connect-')}.view.ts`,
      `src/modules/${module}/${module.replace('connect-', 'connect-')}.service.ts`
    ];
    
    // Special case for connect-data (uses connect-filter files)
    if (module === 'connect-data') {
      const dataFiles = [
        'src/modules/connect-data/connect-filter.module.ts',
        'src/modules/connect-data/connect-filter.view.ts',
        'src/modules/connect-data/connect-filter.service.ts'
      ];
      dataFiles.forEach(file => {
        assert(existsSync(file), `${file} should exist`);
      });
    } else {
      // Check at least one main file exists for other modules
      const mainFile = `src/modules/${module}/${module}.module.ts`;
      if (!existsSync(mainFile)) {
        // Try alternative naming
        const altFile = `src/modules/${module}/${module.replace('connect-', '')}.module.ts`;
        assert(existsSync(altFile), `Module file should exist: ${mainFile} or ${altFile}`);
      }
    }
  });
});

// Test registry structure
test('registry directory exists', () => {
  assert(existsSync('src/registry'), 'registry directory should exist');
});

const registryFiles = [
  'src/registry/component.registry.ts',
  'src/registry/module.registry.ts',
  'src/registry/route.registry.ts',
  'src/registry/index.ts'
];

registryFiles.forEach(file => {
  test(`${file} exists`, () => {
    assert(existsSync(file), `${file} should exist`);
  });
});

// Test config structure
test('config directory exists', () => {
  assert(existsSync('src/config'), 'config directory should exist');
});

const configFiles = [
  'src/config/env.config.ts',
  'src/config/service.manifest.ts'
];

configFiles.forEach(file => {
  test(`${file} exists`, () => {
    assert(existsSync(file), `${file} should exist`);
  });
});

// Test package.json content
test('package.json has required scripts', () => {
  const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
  const requiredScripts = ['dev', 'build', 'test'];
  
  requiredScripts.forEach(script => {
    assert(packageJson.scripts && packageJson.scripts[script], `package.json should have ${script} script`);
  });
});

// Summary
console.log(`\n📊 Structure Tests: ${testsPassed} passed, ${testsFailed} failed`);

if (testsFailed > 0) {
  process.exit(1);
} else {
  console.log('✅ All structure tests passed!');
  process.exit(0);
}
