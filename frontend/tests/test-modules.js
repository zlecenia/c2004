#!/usr/bin/env node
// frontend/tests/test-modules.js
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

console.log('🧪 Testing Modules Integration...\n');

// Test modules index
test('modules index.ts can be read', () => {
  const content = readFileSync('src/modules/index.ts', 'utf8');
  assert(content.includes('MODULE_REGISTRY'), 'modules index should contain MODULE_REGISTRY');
  assert(content.includes('ModuleManager'), 'modules index should contain ModuleManager');
});

test('MODULE_REGISTRY has required modules', () => {
  const content = readFileSync('src/modules/index.ts', 'utf8');
  const requiredModules = [
    'connect-id',
    'connect-test',
    'connect-data', 
    'connect-workshop',
    'connect-config'
  ];
  
  requiredModules.forEach(module => {
    assert(content.includes(`'${module}'`), `MODULE_REGISTRY should contain ${module}`);
  });
});

// Test main.ts integration
test('main.ts loads modules', () => {
  const content = readFileSync('src/main.ts', 'utf8');
  assert(content.includes('moduleManager'), 'main.ts should use moduleManager');
  assert(content.includes('loadModule'), 'main.ts should have loadModule function');
});

test('main.ts has navigation for all modules', () => {
  const content = readFileSync('src/main.ts', 'utf8');
  
  // Check that main.ts uses MenuManager for navigation
  assert(content.includes('MenuManager'), 'main.ts should use MenuManager');
  assert(content.includes('createMenu'), 'main.ts should use createMenu function');
  
  // Check menu configuration file has all required modules
  const menuConfigContent = readFileSync('src/components/connect-menu/menu.config.ts', 'utf8');
  const requiredModules = [
    'connect-id',
    'connect-test',
    'connect-reports',
    'connect-manager',
    'connect-workshop',
    'connect-data',
    'connect-config'
  ];
  
  requiredModules.forEach(module => {
    assert(menuConfigContent.includes(`'${module}'`), `Menu configuration should include ${module}`);
  });
});

// Test specific modules
test('connect-id module structure', () => {
  try {
    const moduleContent = readFileSync('src/modules/connect-id/connect-id.module.ts', 'utf8');
    assert(moduleContent.includes('ConnectIdModule'), 'connect-id should export ConnectIdModule');
    assert(moduleContent.includes('initialize'), 'connect-id should have initialize method');
  } catch (e) {
    // Try alternative path if main doesn't exist
    const altContent = readFileSync('src/modules/connect-id/connect-id.view.ts', 'utf8');
    assert(altContent.includes('ConnectIdView'), 'connect-id should have view component');
  }
});

test('connect-test module structure', () => {
  const moduleContent = readFileSync('src/modules/connect-test/connect-test.module.ts', 'utf8');
  assert(moduleContent.includes('ConnectTestModule'), 'connect-test should export ConnectTestModule');
  
  const viewContent = readFileSync('src/modules/connect-test/connect-test.view.ts', 'utf8');
  assert(viewContent.includes('ConnectTestView'), 'connect-test should export ConnectTestView');
});

test('connect-data module structure', () => {
  const moduleContent = readFileSync('src/modules/connect-data/connect-filter.module.ts', 'utf8');
  assert(moduleContent.includes('ConnectFilterModule'), 'connect-data should export ConnectFilterModule');
  
  const viewContent = readFileSync('src/modules/connect-data/connect-filter.view.ts', 'utf8');
  assert(viewContent.includes('ConnectDataView'), 'connect-data should export ConnectDataView');
});

test('connect-config module structure', () => {
  const moduleContent = readFileSync('src/modules/connect-config/connect-config.module.ts', 'utf8');
  assert(moduleContent.includes('ConnectConfigModule'), 'connect-config should export ConnectConfigModule');
  
  const viewContent = readFileSync('src/modules/connect-config/connect-config.view.ts', 'utf8');
  assert(viewContent.includes('ConnectConfigView'), 'connect-config should export ConnectConfigView');
});

// Test routing
test('modules have proper routing setup', () => {
  const mainContent = readFileSync('src/main.ts', 'utf8');
  
  // Check for path routing
  assert(mainContent.includes('window.history.pushState'), 'main.ts should implement path routing');
  assert(mainContent.includes('handlePathChange'), 'main.ts should handle path changes');
  
  // Check load functions exist
  const loadFunctions = [
    'loadConnectIdModule',
    'loadConnectTestModule', 
    'loadConnectDataModule',
    'loadConnectWorkshopModule',
    'loadConnectConfigModule'
  ];
  
  loadFunctions.forEach(fn => {
    assert(mainContent.includes(fn), `main.ts should have ${fn} function`);
  });
});

// Summary
console.log(`\n📊 Module Tests: ${testsPassed} passed, ${testsFailed} failed`);

if (testsFailed > 0) {
  process.exit(1);
} else {
  console.log('✅ All module tests passed!');
  process.exit(0);
}
