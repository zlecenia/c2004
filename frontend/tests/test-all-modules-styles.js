// frontend/tests/test-all-modules-styles.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getAllModules() {
    const modulesDir = path.join(__dirname, '../src/modules');
    return fs.readdirSync(modulesDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory() && dirent.name !== 'template')
        .map(dirent => dirent.name);
}

function testModuleForTemplateUsage(moduleName) {
    const results = [];
    const moduleDir = path.join(__dirname, '../src/modules', moduleName);
    
    try {
        // Test 1: Check if module has a main component/controller
        const possibleMainFiles = [
            `${moduleName}.module.ts`,
            `${moduleName}.component.ts`, 
            `${moduleName}.service.ts`,
            `${moduleName}.view.ts`,
            'index.ts'
        ];
        
        let mainFile = null;
        for (const file of possibleMainFiles) {
            const filePath = path.join(moduleDir, file);
            if (fs.existsSync(filePath)) {
                mainFile = filePath;
                break;
            }
        }
        
        if (mainFile) {
            results.push({ 
                test: `${moduleName} has main file`, 
                passed: true,
                file: path.basename(mainFile)
            });
            
            // Check if it can potentially use template styles
            const content = fs.readFileSync(mainFile, 'utf8');
            const hasGetStylesMethod = content.includes('getStyles()') || content.includes('getStyles(');
            
            results.push({ 
                test: `${moduleName} has getStyles method`, 
                passed: hasGetStylesMethod,
                canUseTemplate: hasGetStylesMethod
            });
            
            // Check if already uses template
            const usesTemplate = content.includes('ModuleStyleHelper') || 
                               content.includes('../template') ||
                               content.includes('BaseModuleStyles');
            
            results.push({ 
                test: `${moduleName} uses template styles`, 
                passed: usesTemplate,
                recommendation: !usesTemplate && hasGetStylesMethod ? 'Should migrate to template' : 'OK'
            });
            
        } else {
            results.push({ 
                test: `${moduleName} has main file`, 
                passed: false 
            });
        }
        
    } catch (error) {
        results.push({ 
            test: `${moduleName} module analysis`, 
            passed: false, 
            error: error.message 
        });
    }
    
    return results;
}

function analyzeStyleDuplication() {
    console.log('🧪 Analyzing Style Duplication Across Modules...');
    
    const results = [];
    const modules = getAllModules();
    const commonStylePatterns = [
        'background: #f5f5f5',
        'flex: 1',
        'padding: 8px 16px',
        'border-radius: 4px',
        'font-size: 14px',
        '.btn',
        'display: flex',
        'overflow-y: auto'
    ];
    
    const duplications = {};
    
    modules.forEach(moduleName => {
        const moduleDir = path.join(__dirname, '../src/modules', moduleName);
        
        try {
            // Recursively find all .ts and .js files
            const findFiles = (dir, extensions = ['.ts', '.js']) => {
                let files = [];
                const items = fs.readdirSync(dir, { withFileTypes: true });
                
                items.forEach(item => {
                    const fullPath = path.join(dir, item.name);
                    if (item.isDirectory()) {
                        files = files.concat(findFiles(fullPath, extensions));
                    } else if (extensions.some(ext => item.name.endsWith(ext))) {
                        files.push(fullPath);
                    }
                });
                
                return files;
            };
            
            const moduleFiles = findFiles(moduleDir);
            
            moduleFiles.forEach(filePath => {
                try {
                    const content = fs.readFileSync(filePath, 'utf8');
                    
                    commonStylePatterns.forEach(pattern => {
                        if (content.includes(pattern)) {
                            if (!duplications[pattern]) {
                                duplications[pattern] = [];
                            }
                            duplications[pattern].push({
                                module: moduleName,
                                file: path.relative(moduleDir, filePath)
                            });
                        }
                    });
                } catch (err) {
                    // Skip files that can't be read
                }
            });
            
        } catch (error) {
            // Skip modules that can't be analyzed
        }
    });
    
    // Analyze duplications
    Object.entries(duplications).forEach(([pattern, occurrences]) => {
        if (occurrences.length > 1) {
            results.push({
                test: `style pattern "${pattern}" not duplicated`,
                passed: false,
                pattern,
                occurrences: occurrences.length,
                modules: occurrences.map(o => o.module),
                recommendation: 'Should use template base styles'
            });
        } else {
            results.push({
                test: `style pattern "${pattern}" used appropriately`,
                passed: true,
                pattern
            });
        }
    });
    
    return results;
}

function testModulesForResponsiveness() {
    console.log('🧪 Testing Modules for Responsive Design...');
    
    const results = [];
    const modules = getAllModules();
    
    modules.forEach(moduleName => {
        try {
            const moduleDir = path.join(__dirname, '../src/modules', moduleName);
            
            // Find files with potential CSS
            const findStyleFiles = (dir) => {
                let files = [];
                const items = fs.readdirSync(dir, { withFileTypes: true });
                
                items.forEach(item => {
                    const fullPath = path.join(dir, item.name);
                    if (item.isDirectory()) {
                        files = files.concat(findStyleFiles(fullPath));
                    } else if (item.name.endsWith('.ts') || item.name.endsWith('.js')) {
                        files.push(fullPath);
                    }
                });
                
                return files;
            };
            
            const styleFiles = findStyleFiles(moduleDir);
            let hasResponsiveStyles = false;
            let hasHardcodedBreakpoints = false;
            
            styleFiles.forEach(filePath => {
                try {
                    const content = fs.readFileSync(filePath, 'utf8');
                    
                    if (content.includes('@media')) {
                        hasResponsiveStyles = true;
                        
                        // Check for hardcoded breakpoints vs template usage
                        if (content.includes('@media (max-width:') && 
                            !content.includes('ModuleStyleHelper')) {
                            hasHardcodedBreakpoints = true;
                        }
                    }
                } catch (err) {
                    // Skip unreadable files
                }
            });
            
            results.push({
                test: `${moduleName} has responsive styles`,
                passed: hasResponsiveStyles,
                module: moduleName
            });
            
            if (hasResponsiveStyles) {
                results.push({
                    test: `${moduleName} uses template responsive patterns`,
                    passed: !hasHardcodedBreakpoints,
                    module: moduleName,
                    recommendation: hasHardcodedBreakpoints ? 'Should use template responsive styles' : 'OK'
                });
            }
            
        } catch (error) {
            results.push({
                test: `${moduleName} responsive analysis`,
                passed: false,
                error: error.message
            });
        }
    });
    
    return results;
}

function runAllModulesStylesTests() {
    console.log('\n🔍 Running test-all-modules-styles.js...');
    
    const modules = getAllModules();
    console.log(`📦 Found ${modules.length} modules to test: ${modules.join(', ')}\n`);
    
    // Test each module individually
    const allResults = [];
    
    modules.forEach(moduleName => {
        console.log(`🔍 Testing ${moduleName} module...`);
        const moduleResults = testModuleForTemplateUsage(moduleName);
        allResults.push(...moduleResults);
    });
    
    // Test for style duplication
    const duplicationResults = analyzeStyleDuplication();
    allResults.push(...duplicationResults);
    
    // Test for responsive design
    const responsiveResults = testModulesForResponsiveness();
    allResults.push(...responsiveResults);
    
    // Print results
    console.log('\n📊 Module Style Analysis Results:');
    allResults.forEach(result => {
        const icon = result.passed ? '✅' : '❌';
        const info = result.file ? ` (${result.file})` : '';
        console.log(`  ${icon} ${result.test}${info}`);
        
        if (result.recommendation && result.recommendation !== 'OK') {
            console.log(`    💡 ${result.recommendation}`);
        }
        
        if (!result.passed && result.error) {
            console.log(`    Error: ${result.error}`);
        }
        
        if (result.occurrences > 1) {
            console.log(`    Found in ${result.occurrences} places: ${result.modules.join(', ')}`);
        }
    });
    
    const passed = allResults.filter(r => r.passed).length;
    const total = allResults.length;
    const migrationCandidates = allResults.filter(r => r.recommendation === 'Should migrate to template').length;
    
    console.log(`\n📊 All Modules Style Tests: ${passed} passed, ${total - passed} failed`);
    
    if (migrationCandidates > 0) {
        console.log(`💡 Found ${migrationCandidates} modules that could benefit from template migration`);
    }
    
    // Generate migration recommendations
    const modulesNeedingMigration = allResults
        .filter(r => r.recommendation === 'Should migrate to template')
        .map(r => r.test.split(' ')[0]);
    
    if (modulesNeedingMigration.length > 0) {
        console.log('\n🔄 Migration Recommendations:');
        [...new Set(modulesNeedingMigration)].forEach(module => {
            console.log(`  📦 ${module}: Import ModuleStyleHelper and replace custom styles`);
        });
    }
    
    if (passed === total) {
        console.log('✅ All modules style tests passed!');
        return true;
    } else {
        console.log('❌ Some modules style tests failed!');
        return false;
    }
}

// Export for use in other test files
export {
    runAllModulesStylesTests,
    testModuleForTemplateUsage,
    analyzeStyleDuplication,
    testModulesForResponsiveness,
    getAllModules
};

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    runAllModulesStylesTests();
}
