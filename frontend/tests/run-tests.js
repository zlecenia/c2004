#!/usr/bin/env node
// frontend/tests/run-tests.js
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const tests = [
  'test-structure.js',
  'test-modules.js',
  'test-registry.js',
  'test-project-analysis.js'
];

let passedTests = 0;
let totalTests = tests.length;

console.log('🧪 Running Frontend Tests...\n');

async function runTest(testFile) {
  return new Promise((resolve) => {
    console.log(`🔍 Running ${testFile}...`);
    
    const testPath = join(__dirname, testFile);
    const child = spawn('node', [testPath], { stdio: 'inherit' });
    
    child.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ ${testFile} passed\n`);
        passedTests++;
      } else {
        console.log(`❌ ${testFile} failed\n`);
      }
      resolve(code);
    });
  });
}

async function runAllTests() {
  for (const test of tests) {
    await runTest(test);
  }
  
  console.log(`📊 Test Results: ${passedTests}/${totalTests} passed`);
  
  if (passedTests === totalTests) {
    console.log('✅ All frontend tests passed!');
    process.exit(0);
  } else {
    console.log('❌ Some frontend tests failed');
    process.exit(1);
  }
}

runAllTests().catch(console.error);
