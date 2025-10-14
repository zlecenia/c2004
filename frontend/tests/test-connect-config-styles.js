// frontend/tests/test-connect-config-styles.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function testConnectConfigStyles() {
    console.log('🧪 Testing Connect Config Styles Integration...');
    
    const results = [];
    const connectConfigDir = path.join(__dirname, '../src/modules/connect-config');
    
    // Test 1: Menu controller uses ModuleStyleHelper
    try {
        const menuControllerPath = path.join(connectConfigDir, 'pages/menu.controller.ts');
        const content = fs.readFileSync(menuControllerPath, 'utf8');
        
        const usesStyleHelper = content.includes('ModuleStyleHelper');
        const importsTemplate = content.includes('../../template') || content.includes('../template');
        
        results.push({ 
            test: 'menu controller uses ModuleStyleHelper', 
            passed: usesStyleHelper 
        });
        
        results.push({ 
            test: 'menu controller imports template module', 
            passed: importsTemplate 
        });

        // Check if getStyles method uses the helper properly
        const hasProperStyleGeneration = content.includes('.forStandardModule()') &&
                                       content.includes('.addModuleStyles(') &&
                                       content.includes('.generateStyles()');
        
        results.push({ 
            test: 'getStyles method uses helper pattern', 
            passed: hasProperStyleGeneration 
        });

    } catch (error) {
        results.push({ 
            test: 'menu controller style integration', 
            passed: false, 
            error 
        });
    }

    // Test 2: Individual pages can use base styles
    try {
        const pagesDir = path.join(connectConfigDir, 'pages');
        const devicePagesDir = path.join(pagesDir, 'devices');
        
        // Check some individual page files
        const pageDirs = fs.readdirSync(devicePagesDir, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);
        
        let pagesWithStyles = 0;
        let totalPages = 0;
        
        pageDirs.forEach(pageDir => {
            try {
                const pageFile = path.join(devicePagesDir, pageDir, `${pageDir}.page.ts`);
                if (fs.existsSync(pageFile)) {
                    const content = fs.readFileSync(pageFile, 'utf8');
                    totalPages++;
                    
                    // Check if page has getStyles method
                    if (content.includes('getStyles()')) {
                        pagesWithStyles++;
                    }
                }
            } catch (err) {
                // Skip this page
            }
        });
        
        results.push({ 
            test: `individual pages have getStyles method (${pagesWithStyles}/${totalPages})`, 
            passed: totalPages > 0 && pagesWithStyles > 0 
        });

    } catch (error) {
        results.push({ 
            test: 'individual pages style structure', 
            passed: false, 
            error 
        });
    }

    // Test 3: Demo file exists and works
    try {
        const demoPath = path.join(connectConfigDir, 'pages/demo-with-tests.html');
        const exists = fs.existsSync(demoPath);
        
        if (exists) {
            const content = fs.readFileSync(demoPath, 'utf8');
            // Demo can use either template classes or mock classes for testing
            const hasMenuStructure = content.includes('connect-config-menu-wrapper') ||
                                    content.includes('module-container') ||
                                    content.includes('connect-config-container') ||
                                    content.includes('grid-template-columns');
            
            results.push({ 
                test: 'demo file exists', 
                passed: true 
            });
            
            results.push({ 
                test: 'demo file uses proper CSS classes', 
                passed: hasMenuStructure 
            });
        } else {
            results.push({ 
                test: 'demo file exists', 
                passed: false 
            });
        }

    } catch (error) {
        results.push({ 
            test: 'demo file structure', 
            passed: false, 
            error 
        });
    }

    // Test 4: Menu structure supports template integration
    try {
        const menuStructurePath = path.join(connectConfigDir, 'pages/menu.structure.ts');
        const content = fs.readFileSync(menuStructurePath, 'utf8');
        
        // Check if it has pageClass mapping for individual pages
        const hasPageClassMapping = content.includes('pageClass') &&
                                  content.includes('RfidConfigPage') &&
                                  content.includes('UsersPage');
        
        results.push({ 
            test: 'menu structure has pageClass mapping', 
            passed: hasPageClassMapping 
        });

    } catch (error) {
        results.push({ 
            test: 'menu structure template support', 
            passed: false, 
            error 
        });
    }

    return results;
}

function testStyleConsistency() {
    console.log('🧪 Testing Style Consistency Across Modules...');
    
    const results = [];
    
    // Test 1: Check for legacy custom styles that should be replaced
    try {
        const connectConfigDir = path.join(__dirname, '../src/modules/connect-config');
        const pagesDir = path.join(connectConfigDir, 'pages');
        
        // Read menu controller to check for old style patterns
        const menuControllerPath = path.join(pagesDir, 'menu.controller.ts');
        const content = fs.readFileSync(menuControllerPath, 'utf8');
        
        // Check that it doesn't use old hardcoded styles for basic elements
        const hasLegacyButtonStyles = content.includes('background: #007bff') && 
                                    !content.includes('ModuleStyleHelper');
        const hasLegacyContainerStyles = content.includes('flex: 1') && 
                                       content.includes('background: #f5f5f5') &&
                                       !content.includes('ModuleStyleHelper');
        
        results.push({ 
            test: 'menu controller avoids legacy button styles', 
            passed: !hasLegacyButtonStyles 
        });
        
        results.push({ 
            test: 'menu controller uses template for container styles', 
            passed: !hasLegacyContainerStyles || content.includes('ModuleStyleHelper') 
        });

    } catch (error) {
        results.push({ 
            test: 'legacy style check', 
            passed: false, 
            error 
        });
    }

    // Test 2: Check that CSS classes follow base template naming
    try {
        const templateStylesPath = path.join(__dirname, '../src/modules/template/styles/base-module.styles.ts');
        const templateContent = fs.readFileSync(templateStylesPath, 'utf8');
        
        // Extract CSS class names from template
        const baseClasses = [
            'module-container',
            'module-wrapper', 
            'module-header',
            'form-section',
            'btn-primary'
        ];
        
        const allClassesInTemplate = baseClasses.every(cssClass => 
            templateContent.includes(`.${cssClass}`)
        );
        
        results.push({ 
            test: 'template defines standard CSS classes', 
            passed: allClassesInTemplate 
        });

    } catch (error) {
        results.push({ 
            test: 'template CSS class definitions', 
            passed: false, 
            error 
        });
    }

    return results;
}

function testResponsiveStyles() {
    console.log('🧪 Testing Responsive Design Support...');
    
    const results = [];
    
    try {
        const templateStylesPath = path.join(__dirname, '../src/modules/template/styles/base-module.styles.ts');
        const content = fs.readFileSync(templateStylesPath, 'utf8');
        
        // Check for responsive breakpoints
        const hasResponsiveStyles = content.includes('@media (max-width: 768px)') ||
                                  content.includes('@media (max-width: 480px)');
        
        results.push({ 
            test: 'template includes responsive breakpoints', 
            passed: hasResponsiveStyles 
        });
        
        // Check for mobile-first utilities
        const hasMobileUtilities = content.includes('grid-template-columns: 1fr') &&
                                 content.includes('flex-direction: column');
        
        results.push({ 
            test: 'template includes mobile utilities', 
            passed: hasMobileUtilities 
        });

    } catch (error) {
        results.push({ 
            test: 'responsive styles check', 
            passed: false, 
            error 
        });
    }

    return results;
}

function runConnectConfigStyleTests() {
    console.log('\n🔍 Running test-connect-config-styles.js...');
    
    const styleResults = testConnectConfigStyles();
    const consistencyResults = testStyleConsistency();
    const responsiveResults = testResponsiveStyles();
    
    const allResults = [...styleResults, ...consistencyResults, ...responsiveResults];
    
    // Print results
    allResults.forEach(result => {
        const icon = result.passed ? '✅' : '❌';
        console.log(`  ${icon} ${result.test}`);
        if (!result.passed && result.error) {
            console.log(`    Error: ${result.error.message || result.error}`);
        }
    });
    
    const passed = allResults.filter(r => r.passed).length;
    const total = allResults.length;
    
    console.log(`\n📊 Connect Config Style Tests: ${passed} passed, ${total - passed} failed`);
    
    if (passed === total) {
        console.log('✅ All connect-config style tests passed!');
        return true;
    } else {
        console.log('❌ Some connect-config style tests failed!');
        return false;
    }
}

// Export for use in other test files
export {
    runConnectConfigStyleTests,
    testConnectConfigStyles,
    testStyleConsistency,
    testResponsiveStyles
};

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    runConnectConfigStyleTests();
}
