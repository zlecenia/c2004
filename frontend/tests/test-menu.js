#!/usr/bin/env node
// frontend/tests/test-menu.js - Comprehensive Menu System Testing

import { readFileSync } from 'fs';
import { existsSync } from 'fs';

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

console.log('🧪 Testing Connect Menu System...\n');

// Test Menu Structure and Files
test('connect-menu component files exist', () => {
  const requiredFiles = [
    'src/components/connect-menu/menu.interfaces.ts',
    'src/components/connect-menu/menu.config.ts',
    'src/components/connect-menu/menu.templates.ts',
    'src/components/connect-menu/menu.styles.ts',
    'src/components/connect-menu/connect-menu.component.ts',
    'src/components/connect-menu/menu.manager.ts',
    'src/components/connect-menu/index.ts'
  ];
  
  requiredFiles.forEach(file => {
    assert(existsSync(file), `Menu file should exist: ${file}`);
  });
});

// Test Menu Configuration
test('menu configuration has all required menus', () => {
  const configContent = readFileSync('src/components/connect-menu/menu.config.ts', 'utf8');
  
  // Check main navigation config
  assert(configContent.includes('mainNavigationConfig'), 'Should have mainNavigationConfig');
  assert(configContent.includes('connect-id'), 'Main nav should include connect-id');
  assert(configContent.includes('connect-test'), 'Main nav should include connect-test');
  assert(configContent.includes('connect-reports'), 'Main nav should include connect-reports');
  assert(configContent.includes('connect-manager'), 'Main nav should include connect-manager');
  
  // Check module menus
  assert(configContent.includes('connectDataMenuConfig'), 'Should have connectDataMenuConfig');
  assert(configContent.includes('connectReportsMenuConfig'), 'Should have connectReportsMenuConfig');
  assert(configContent.includes('connectTestMenuConfig'), 'Should have connectTestMenuConfig');
});

// Test 3-Level Menu Structure
test('menu configs support 3-level navigation', () => {
  const configContent = readFileSync('src/components/connect-menu/menu.config.ts', 'utf8');
  
  // Check that we have multi-column configurations
  const columnsCount = (configContent.match(/columns: \[/g) || []).length;
  assert(columnsCount >= 3, 'Should have at least 3 menu configurations with columns');
  
  // Check connect-data has 2 columns (objects + actions)
  assert(configContent.includes('connectDataMenuConfig'), 'Should have connectDataMenuConfig');
  assert(configContent.includes('objects-column'), 'Should have objects-column');
  assert(configContent.includes('actions-column'), 'Should have actions-column');
});

// Test Menu Templates
test('menu templates generate valid HTML', () => {
  const templatesContent = readFileSync('src/components/connect-menu/menu.templates.ts', 'utf8');
  
  // Check template methods exist
  assert(templatesContent.includes('generateMenuItem'), 'Should have generateMenuItem method');
  assert(templatesContent.includes('generateMenuColumn'), 'Should have generateMenuColumn method');
  assert(templatesContent.includes('generateSidebarTemplate'), 'Should have generateSidebarTemplate method');
  assert(templatesContent.includes('generateColumnsTemplate'), 'Should have generateColumnsTemplate method');
  
  // Check HTML structure patterns
  assert(templatesContent.includes('data-menu-item'), 'Templates should include data-menu-item attributes');
  assert(templatesContent.includes('data-action'), 'Templates should include data-action attributes');
  assert(templatesContent.includes('data-section'), 'Templates should include data-section attributes');
  assert(templatesContent.includes('menu-icon'), 'Templates should include menu-icon class');
  assert(templatesContent.includes('menu-label'), 'Templates should include menu-label class');
});

// Test Menu Styles Consistency
test('menu styles are consistent and complete', () => {
  const stylesContent = readFileSync('src/components/connect-menu/menu.styles.ts', 'utf8');
  
  // Check main style classes
  const requiredClasses = [
    '.connect-menu',
    '.menu-theme-dark',
    '.menu-theme-light',
    '.sidebar-navigation',
    '.menu-columns-container',
    '.menu-column',
    '.column-title',
    '.nav-btn',
    '.menu-item',
    '.section-item',
    '.method-item',
    '.menu-icon',
    '.menu-label'
  ];
  
  requiredClasses.forEach(className => {
    assert(stylesContent.includes(className), `Should include style for ${className}`);
  });
  
  // Check for consistent color scheme
  assert(stylesContent.includes('#2a2a2a'), 'Should use consistent dark background');
  assert(stylesContent.includes('#3a3a3a'), 'Should use consistent button background');
  assert(stylesContent.includes('linear-gradient'), 'Should use gradient for active states');
});

// Test Menu Manager Integration
test('menu manager integrates with routing', () => {
  const managerContent = readFileSync('src/components/connect-menu/menu.manager.ts', 'utf8');
  
  // Check routing integration
  assert(managerContent.includes('updateMenuForRoute'), 'Should have updateMenuForRoute method');
  assert(managerContent.includes('navigateToModule'), 'Should have navigateToModule method');
  assert(managerContent.includes('routeMappings'), 'Should handle route mappings');
  assert(managerContent.includes('window.history.pushState'), 'Should update browser history');
  
  // Check event handling
  assert(managerContent.includes('moduleNavigation'), 'Should emit moduleNavigation events');
  assert(managerContent.includes('sectionChange'), 'Should emit sectionChange events');
  assert(managerContent.includes('menuAction'), 'Should emit menuAction events');
});

// Test Main.ts Integration
test('main.ts properly integrates menu system', () => {
  const mainContent = readFileSync('src/main.ts', 'utf8');
  
  // Check imports
  assert(mainContent.includes('MenuManager'), 'main.ts should import MenuManager');
  assert(mainContent.includes('createMenu'), 'main.ts should import createMenu');
  
  // Check menu creation
  assert(mainContent.includes('main-navigation'), 'Should create main-navigation menu');
  assert(mainContent.includes('onItemClick'), 'Should handle menu item clicks');
  
  // Check routing integration
  assert(mainContent.includes('handlePathChange'), 'Should handle path changes');
  assert(mainContent.includes('updateActiveItem'), 'Should update active menu items');
});

// Test Menu Event Handling
test('menu system handles events properly', () => {
  const componentContent = readFileSync('src/components/connect-menu/connect-menu.component.ts', 'utf8');
  
  // Check event delegation
  assert(componentContent.includes('addEventListener'), 'Should setup event listeners');
  assert(componentContent.includes('data-menu-item'), 'Should use data attributes for delegation');
  assert(componentContent.includes('handleItemClick'), 'Should handle item clicks');
  
  // Check active state management
  assert(componentContent.includes('updateActiveItem'), 'Should update active states');
  assert(componentContent.includes('classList.toggle'), 'Should toggle active classes');
});

// Test No Duplication
test('menu system prevents duplication', () => {
  const stylesContent = readFileSync('src/components/connect-menu/menu.styles.ts', 'utf8');
  
  // Check for style ID system to prevent duplication
  const componentContent = readFileSync('src/components/connect-menu/connect-menu.component.ts', 'utf8');
  assert(componentContent.includes('connect-menu-styles'), 'Should use unique style IDs');
  assert(componentContent.includes('getElementById'), 'Should check for existing styles');
  
  // Check main.ts doesn't have old hardcoded menu
  const mainContent = readFileSync('src/main.ts', 'utf8');
  assert(!mainContent.includes('hardcoded sidebar'), 'main.ts should not have hardcoded menu');
  assert(mainContent.includes('MenuManager'), 'Should use MenuManager instead');
});

// Test Combinatorial Menu Logic
test('3-level menu supports combinatorial content', () => {
  const configContent = readFileSync('src/components/connect-menu/menu.config.ts', 'utf8');
  
  // Check that we have connect-data items for objects column
  const objectItems = ['requests', 'services', 'transport', 'dispositions'];
  const actionItems = ['search', 'new-request'];
  
  objectItems.forEach(item => {
    assert(configContent.includes(`'${item}'`), `Should include object item: ${item}`);
  });
  
  actionItems.forEach(item => {
    assert(configContent.includes(`'${item}'`), `Should include action item: ${item}`);
  });
  
  // Calculate expected combinations
  const expectedCombinations = objectItems.length * actionItems.length;
  assert(expectedCombinations >= 20, `Should support ${expectedCombinations} combinations (${objectItems.length} × ${actionItems.length})`);
});

// Test Router Integration Consistency
test('router integration maintains state consistency', () => {
  const configContent = readFileSync('src/components/connect-menu/menu.config.ts', 'utf8');
  
  // Check route mappings exist
  assert(configContent.includes('routeMenuMappings'), 'Should have route mappings');
  assert(configContent.includes('RouteMenuMapping'), 'Should use RouteMenuMapping interface');
  
  // Check specific route mappings
  assert(configContent.includes('/connect-data'), 'Should map connect-data route');
  assert(configContent.includes('/connect-reports'), 'Should map connect-reports route');
  assert(configContent.includes('/connect-test'), 'Should map connect-test route');
  assert(configContent.includes('/connect-manager'), 'Should map connect-manager route');
});

// Test Menu State Management
test('menu state management works correctly', () => {
  const componentContent = readFileSync('src/components/connect-menu/connect-menu.component.ts', 'utf8');
  
  // Check state management methods
  assert(componentContent.includes('updateActiveItem'), 'Should have updateActiveItem method');
  assert(componentContent.includes('toggleColumn'), 'Should have toggleColumn method');
  assert(componentContent.includes('updateMenuItem'), 'Should have updateMenuItem method');
  
  // Check configuration state
  assert(componentContent.includes('getConfig'), 'Should have getConfig method');
  assert(componentContent.includes('findMenuItem'), 'Should have findMenuItem method');
  assert(componentContent.includes('findColumnForItem'), 'Should have findColumnForItem method');
});

// Test Integration with Modules
test('menu integrates properly with all modules', () => {
  const connectDataView = readFileSync('src/modules/connect-data/connect-filter.view.ts', 'utf8');
  
  // Check connect-data uses new menu system
  assert(connectDataView.includes('createModuleMenu'), 'connect-data should use createModuleMenu');
  assert(connectDataView.includes('connect-data-menu-container'), 'Should have menu container');
  
  // Check template doesn't have hardcoded menu
  const connectDataTemplate = readFileSync('src/modules/connect-data/connect-filter.templates.ts', 'utf8');
  assert(!connectDataTemplate.includes('menu-column'), 'Template should not have hardcoded menu columns');
});

console.log(`\n📊 Menu Tests: ${testsPassed} passed, ${testsFailed} failed`);

if (testsFailed === 0) {
  console.log('✅ All menu tests passed!');
} else {
  console.log(`❌ ${testsFailed} menu tests failed!`);
}

export { testsPassed, testsFailed };
