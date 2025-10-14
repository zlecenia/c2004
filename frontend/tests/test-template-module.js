// frontend/tests/test-template-module.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function testTemplateModule() {
    console.log('🧪 Testing Template Module...');
    
    const results = [];
    const templateDir = path.join(__dirname, '../src/modules/template');
    
    // Test 1: Template module structure exists
    try {
        const templateExists = fs.existsSync(templateDir);
        if (templateExists) {
            results.push({ test: 'template module directory exists', passed: true });
        } else {
            results.push({ test: 'template module directory exists', passed: false });
        }
    } catch (error) {
        results.push({ test: 'template module directory exists', passed: false, error });
    }

    // Test 2: Required template files exist
    const requiredFiles = [
        'index.ts',
        'README.md',
        'styles/base-module.styles.ts',
        'styles/module-style-helper.ts'
    ];

    requiredFiles.forEach(file => {
        try {
            const filePath = path.join(templateDir, file);
            const exists = fs.existsSync(filePath);
            results.push({ 
                test: `${file} exists`, 
                passed: exists 
            });
        } catch (error) {
            results.push({ 
                test: `${file} exists`, 
                passed: false, 
                error 
            });
        }
    });

    // Test 3: BaseModuleStyles class structure
    try {
        const baseStylesPath = path.join(templateDir, 'styles/base-module.styles.ts');
        const content = fs.readFileSync(baseStylesPath, 'utf8');
        
        // Check for required methods
        const requiredMethods = [
            'getModuleContainerStyles',
            'getFormStyles', 
            'getButtonStyles',
            'getMenuStyles',
            'getUtilityStyles',
            'getAllBaseStyles'
        ];

        const hasAllMethods = requiredMethods.every(method => 
            content.includes(`public static ${method}()`)
        );
        
        results.push({ 
            test: 'BaseModuleStyles has required methods', 
            passed: hasAllMethods 
        });

        // Check for .module-container CSS
        const hasModuleContainer = content.includes('.module-container') && 
                                 content.includes('flex: 1') &&
                                 content.includes('background: #f5f5f5');
        
        results.push({ 
            test: '.module-container base styles defined', 
            passed: hasModuleContainer 
        });

    } catch (error) {
        results.push({ 
            test: 'BaseModuleStyles structure', 
            passed: false, 
            error 
        });
    }

    // Test 4: ModuleStyleHelper class structure  
    try {
        const helperPath = path.join(templateDir, 'styles/module-style-helper.ts');
        const content = fs.readFileSync(helperPath, 'utf8');
        
        const requiredMethods = [
            'addModuleStyles',
            'generateStyles', 
            'forStandardModule',
            'forMobileModule',
            'forDesktopModule'
        ];

        const hasAllMethods = requiredMethods.every(method => 
            content.includes(method)
        );
        
        results.push({ 
            test: 'ModuleStyleHelper has required methods', 
            passed: hasAllMethods 
        });

    } catch (error) {
        results.push({ 
            test: 'ModuleStyleHelper structure', 
            passed: false, 
            error 
        });
    }

    // Test 5: Template index.ts exports
    try {
        const indexPath = path.join(templateDir, 'index.ts');
        const content = fs.readFileSync(indexPath, 'utf8');
        
        const hasExports = content.includes('BaseModuleStyles') && 
                          content.includes('ModuleStyleHelper');
        
        results.push({ 
            test: 'template index.ts has proper exports', 
            passed: hasExports 
        });

    } catch (error) {
        results.push({ 
            test: 'template index.ts exports', 
            passed: false, 
            error 
        });
    }

    // Test 6: Example files exist and are valid
    try {
        const examplesDir = path.join(templateDir, 'examples');
        const exampleFiles = [
            'module-with-base-styles.example.ts',
            'quick-migration.example.ts'
        ];

        exampleFiles.forEach(file => {
            const filePath = path.join(examplesDir, file);
            const exists = fs.existsSync(filePath);
            results.push({ 
                test: `example ${file} exists`, 
                passed: exists 
            });
        });

    } catch (error) {
        results.push({ 
            test: 'example files exist', 
            passed: false, 
            error 
        });
    }

    // Test 7: CSS Classes availability test
    try {
        const baseStylesPath = path.join(templateDir, 'styles/base-module.styles.ts');
        const content = fs.readFileSync(baseStylesPath, 'utf8');
        
        const requiredCSSClasses = [
            '.module-container', 
            '.module-wrapper',
            '.module-header',
            '.form-section',
            '.form-row', 
            '.form-group',
            '.btn',
            '.btn-primary',
            '.menu-item',
            '.text-center',
            '.d-flex'
        ];

        const allClassesExist = requiredCSSClasses.every(cssClass => 
            content.includes(cssClass)
        );
        
        results.push({ 
            test: 'required CSS classes are defined', 
            passed: allClassesExist 
        });

    } catch (error) {
        results.push({ 
            test: 'CSS classes availability', 
            passed: false, 
            error 
        });
    }

    return results;
}

function testTemplateIntegration() {
    console.log('🧪 Testing Template Integration...');
    
    const results = [];
    
    // Test 1: Connect-config uses template styles
    try {
        const menuControllerPath = path.join(__dirname, '../src/modules/connect-config/pages/menu.controller.ts');
        const content = fs.readFileSync(menuControllerPath, 'utf8');
        
        const usesTemplate = content.includes('ModuleStyleHelper') ||
                           content.includes('../../template');
        
        results.push({ 
            test: 'connect-config integrates template styles', 
            passed: usesTemplate 
        });

    } catch (error) {
        results.push({ 
            test: 'connect-config template integration', 
            passed: false, 
            error 
        });
    }

    // Test 2: Main modules index exports template
    try {
        const modulesIndexPath = path.join(__dirname, '../src/modules/index.ts');
        const content = fs.readFileSync(modulesIndexPath, 'utf8');
        
        const exportsTemplate = content.includes("export * from './template'");
        
        results.push({ 
            test: 'modules index exports template', 
            passed: exportsTemplate 
        });

    } catch (error) {
        results.push({ 
            test: 'modules index template export', 
            passed: false, 
            error 
        });
    }

    return results;
}

function runTemplateTests() {
    console.log('\n🔍 Running test-template-module.js...');
    
    const moduleResults = testTemplateModule();
    const integrationResults = testTemplateIntegration();
    
    const allResults = [...moduleResults, ...integrationResults];
    
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
    
    console.log(`\n📊 Template Tests: ${passed} passed, ${total - passed} failed`);
    
    if (passed === total) {
        console.log('✅ All template tests passed!');
        return true;
    } else {
        console.log('❌ Some template tests failed!');
        return false;
    }
}

// Export for use in other test files
export {
    runTemplateTests,
    testTemplateModule,
    testTemplateIntegration
};

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    runTemplateTests();
}
