// frontend/tests/test-style-migration-guide.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateMigrationReport() {
    console.log('📋 Generating Style Migration Report...\n');
    
    const modulesDir = path.join(__dirname, '../src/modules');
    const modules = fs.readdirSync(modulesDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory() && dirent.name !== 'template')
        .map(dirent => dirent.name);

    const report = {
        summary: {
            totalModules: modules.length,
            migratedModules: 0,
            needMigration: 0,
            hasResponsive: 0
        },
        moduleDetails: [],
        recommendations: []
    };

    modules.forEach(moduleName => {
        const moduleDir = path.join(modulesDir, moduleName);
        const moduleReport = {
            name: moduleName,
            status: 'needs-analysis',
            hasGetStyles: false,
            usesTemplate: false,
            hasResponsive: false,
            duplicatedPatterns: [],
            priority: 'medium'
        };

        try {
            // Find main module file
            const possibleFiles = [
                `${moduleName}.module.ts`,
                `${moduleName}.component.ts`,
                `${moduleName}.view.ts`,
                'index.ts'
            ];

            let mainFilePath = null;
            for (const file of possibleFiles) {
                const filePath = path.join(moduleDir, file);
                if (fs.existsSync(filePath)) {
                    mainFilePath = filePath;
                    break;
                }
            }

            if (mainFilePath) {
                const content = fs.readFileSync(mainFilePath, 'utf8');
                
                moduleReport.hasGetStyles = content.includes('getStyles');
                moduleReport.usesTemplate = content.includes('ModuleStyleHelper') || 
                                          content.includes('BaseModuleStyles');

                if (moduleReport.usesTemplate) {
                    moduleReport.status = 'migrated';
                    report.summary.migratedModules++;
                } else if (moduleReport.hasGetStyles) {
                    moduleReport.status = 'ready-for-migration';
                    moduleReport.priority = 'high';
                    report.summary.needMigration++;
                } else {
                    moduleReport.status = 'needs-setup';
                    report.summary.needMigration++;
                }

                // Check for responsive styles
                if (content.includes('@media')) {
                    moduleReport.hasResponsive = true;
                    report.summary.hasResponsive++;
                }

                // Check for common duplicated patterns
                const patterns = [
                    'flex: 1',
                    'background: #f5f5f5', 
                    'display: flex',
                    'padding: 8px 16px',
                    'border-radius: 4px'
                ];

                patterns.forEach(pattern => {
                    if (content.includes(pattern)) {
                        moduleReport.duplicatedPatterns.push(pattern);
                    }
                });
            }

        } catch (error) {
            moduleReport.status = 'error';
            moduleReport.error = error.message;
        }

        report.moduleDetails.push(moduleReport);
    });

    // Generate recommendations
    report.recommendations = generateRecommendations(report);

    return report;
}

function generateRecommendations(report) {
    const recommendations = [];

    // High priority migrations
    const highPriorityModules = report.moduleDetails
        .filter(m => m.priority === 'high' && m.status === 'ready-for-migration');
    
    if (highPriorityModules.length > 0) {
        recommendations.push({
            type: 'migration',
            priority: 'high',
            title: 'Modules ready for immediate migration',
            modules: highPriorityModules.map(m => m.name),
            action: 'Import ModuleStyleHelper and replace getStyles() implementation',
            effort: 'Low (< 1 hour per module)'
        });
    }

    // Setup recommendations
    const needSetupModules = report.moduleDetails
        .filter(m => m.status === 'needs-setup');
    
    if (needSetupModules.length > 0) {
        recommendations.push({
            type: 'setup',
            priority: 'medium',
            title: 'Modules needing getStyles() method setup',
            modules: needSetupModules.map(m => m.name),
            action: 'Add getStyles() method using ModuleStyleHelper.forStandardModule()',
            effort: 'Medium (2-3 hours per module)'
        });
    }

    // Duplication cleanup
    const modulesWithDuplication = report.moduleDetails
        .filter(m => m.duplicatedPatterns.length > 0);

    if (modulesWithDuplication.length > 0) {
        recommendations.push({
            type: 'cleanup',
            priority: 'high',
            title: 'Style duplication cleanup',
            modules: modulesWithDuplication.map(m => m.name),
            action: 'Replace duplicated styles with template base classes',
            effort: 'Low (30 min per module)',
            savings: `Eliminate ${modulesWithDuplication.reduce((sum, m) => sum + m.duplicatedPatterns.length, 0)} duplicated style patterns`
        });
    }

    return recommendations;
}

function printMigrationReport(report) {
    console.log('📊 Style Migration Report');
    console.log('=' .repeat(50));
    
    console.log('\n📈 Summary:');
    console.log(`  📦 Total modules: ${report.summary.totalModules}`);
    console.log(`  ✅ Migrated to template: ${report.summary.migratedModules}`);
    console.log(`  🔄 Need migration: ${report.summary.needMigration}`);
    console.log(`  📱 Have responsive styles: ${report.summary.hasResponsive}`);

    console.log('\n📋 Module Status:');
    report.moduleDetails.forEach(module => {
        const statusIcon = {
            'migrated': '✅',
            'ready-for-migration': '🔄', 
            'needs-setup': '⚠️',
            'error': '❌'
        }[module.status] || '❓';
        
        const priorityIcon = module.priority === 'high' ? '🔴' : '🟡';
        
        console.log(`  ${statusIcon} ${priorityIcon} ${module.name}`);
        console.log(`      Status: ${module.status}`);
        if (module.duplicatedPatterns.length > 0) {
            console.log(`      Duplicated patterns: ${module.duplicatedPatterns.length}`);
        }
        if (module.hasResponsive) {
            console.log(`      Has responsive styles: ✅`);
        }
    });

    console.log('\n🎯 Recommendations:');
    report.recommendations.forEach((rec, index) => {
        console.log(`\n  ${index + 1}. ${rec.title} (${rec.priority} priority)`);
        console.log(`     📦 Modules: ${rec.modules.join(', ')}`);
        console.log(`     🔧 Action: ${rec.action}`);
        console.log(`     ⏱️ Effort: ${rec.effort}`);
        if (rec.savings) {
            console.log(`     💾 Savings: ${rec.savings}`);
        }
    });

    console.log('\n💡 Next Steps:');
    console.log('  1. Start with high-priority ready-for-migration modules');
    console.log('  2. Focus on style duplication cleanup for immediate wins');  
    console.log('  3. Add template integration to modules needing setup');
    console.log('  4. Verify responsive behavior after migration');
    
    console.log('\n📚 Migration Resources:');
    console.log('  📄 Template README: /src/modules/template/README.md');
    console.log('  🔧 Helper Examples: /src/modules/template/examples/');
    console.log('  ✅ Working Example: connect-config module');
}

function runStyleMigrationGuide() {
    console.log('\n🔍 Running test-style-migration-guide.js...');
    
    const report = generateMigrationReport();
    printMigrationReport(report);
    
    // Determine if migration is on track
    const migrationProgress = (report.summary.migratedModules / report.summary.totalModules) * 100;
    
    console.log('\n📊 Migration Progress:');
    console.log(`  Progress: ${migrationProgress.toFixed(1)}% (${report.summary.migratedModules}/${report.summary.totalModules} modules)`);
    
    if (migrationProgress >= 50) {
        console.log('  ✅ Migration is on track!');
        return true;
    } else {
        console.log('  🔄 Migration needs attention');
        return migrationProgress > 0; // Partial success if some progress made
    }
}

// Export for use in other test files
export {
    runStyleMigrationGuide,
    generateMigrationReport,
    printMigrationReport
};

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    runStyleMigrationGuide();
}
