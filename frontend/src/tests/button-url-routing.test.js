// Comprehensive Button URL Routing Tests
// Tests that every clickable button generates the correct URL path

class ButtonURLTester {
  constructor() {
    this.results = [];
    this.totalTests = 0;
    this.passedTests = 0;
    this.failedTests = 0;
  }

  // Test cases for all button URL mappings
  getButtonTestCases() {
    return [
      // ConnectID Button Tests
      {
        module: 'connect-id',
        testName: 'ConnectID - RFID Button',
        buttonSelector: '[data-method="rfid"]',
        expectedURL: '#/connect-id/user/rfid',
        setupURL: '#/connect-id/user'
      },
      {
        module: 'connect-id',
        testName: 'ConnectID - QR Button',
        buttonSelector: '[data-method="qr"]',
        expectedURL: '#/connect-id/user/qr',
        setupURL: '#/connect-id/user'
      },
      {
        module: 'connect-id',
        testName: 'ConnectID - Barcode Button',
        buttonSelector: '[data-method="barcode"]',
        expectedURL: '#/connect-id/user/barcode',
        setupURL: '#/connect-id/user'
      },
      {
        module: 'connect-id',
        testName: 'ConnectID - Manual Button',
        buttonSelector: '[data-method="manual"]',
        expectedURL: '#/connect-id/user/manual',
        setupURL: '#/connect-id/user'
      },

      // ConnectWorkshop Button Tests
      {
        module: 'connect-workshop',
        testName: 'ConnectWorkshop - Services Section',
        buttonSelector: '[data-section="services"]',
        expectedURL: '#/connect-workshop/services',
        setupURL: '#/connect-workshop'
      },
      {
        module: 'connect-workshop',
        testName: 'ConnectWorkshop - Transport Section',
        buttonSelector: '[data-section="transport"]',
        expectedURL: '#/connect-workshop/transport',
        setupURL: '#/connect-workshop'
      },
      {
        module: 'connect-workshop',
        testName: 'ConnectWorkshop - New Request Action',
        buttonSelector: '[data-action="new-request"]',
        expectedURL: '#/connect-workshop/requests/new-request',
        setupURL: '#/connect-workshop/requests'
      },
      {
        module: 'connect-workshop',
        testName: 'ConnectWorkshop - Export Action',
        buttonSelector: '[data-action="export"]',
        expectedURL: '#/connect-workshop/requests/export',
        setupURL: '#/connect-workshop/requests'
      },

      // ConnectConfig Button Tests
      {
        module: 'connect-config',
        testName: 'ConnectConfig - Devices Section',
        buttonSelector: '[data-section="devices"]',
        expectedURL: '#/connect-config/devices',
        setupURL: '#/connect-config'
      },
      {
        module: 'connect-config',
        testName: 'ConnectConfig - Network Section',
        buttonSelector: '[data-section="network"]',
        expectedURL: '#/connect-config/network',
        setupURL: '#/connect-config'
      },
      {
        module: 'connect-config',
        testName: 'ConnectConfig - RFID Subsection',
        buttonSelector: '[data-subsection="rfid"]',
        expectedURL: '#/connect-config/devices/rfid',
        setupURL: '#/connect-config/devices'
      },
      {
        module: 'connect-config',
        testName: 'ConnectConfig - QR Code Subsection',
        buttonSelector: '[data-subsection="qrcode"]',
        expectedURL: '#/connect-config/devices/qrcode',
        setupURL: '#/connect-config/devices'
      },

      // ConnectReports Button Tests
      {
        module: 'connect-reports',
        testName: 'ConnectReports - Executed Type',
        buttonSelector: '[data-type="executed"]',
        expectedURL: '#/connect-reports/executed',
        setupURL: '#/connect-reports'
      },
      {
        module: 'connect-reports',
        testName: 'ConnectReports - Planned Type',
        buttonSelector: '[data-type="planned"]',
        expectedURL: '#/connect-reports/planned',
        setupURL: '#/connect-reports'
      },
      {
        module: 'connect-reports',
        testName: 'ConnectReports - Analytics Type',
        buttonSelector: '[data-type="analytics"]',
        expectedURL: '#/connect-reports/analytics',
        setupURL: '#/connect-reports'
      },
      {
        module: 'connect-reports',
        testName: 'ConnectReports - Week View',
        buttonSelector: '[data-view="week"]',
        expectedURL: '#/connect-reports/planned/week',
        setupURL: '#/connect-reports/planned'
      },
      {
        module: 'connect-reports',
        testName: 'ConnectReports - Month View',
        buttonSelector: '[data-view="month"]',
        expectedURL: '#/connect-reports/planned/month',
        setupURL: '#/connect-reports/planned'
      },

      // ConnectTest Button Tests
      {
        module: 'connect-test',
        testName: 'ConnectTest - Identification Section',
        buttonSelector: '[data-section="identification"]',
        expectedURL: '#/connect-test/identification',
        setupURL: '#/connect-test'
      },
      {
        module: 'connect-test',
        testName: 'ConnectTest - Testing Section',
        buttonSelector: '[data-section="testing"]',
        expectedURL: '#/connect-test/testing',
        setupURL: '#/connect-test'
      }
    ];
  }

  // Run a single button test
  async runButtonTest(testCase) {
    console.log(`🧪 Testing button: ${testCase.testName}`);
    this.totalTests++;

    try {
      // Navigate to setup URL first
      window.location.hash = testCase.setupURL;
      await this.waitForModuleLoad(2000);

      // Find the button
      const button = document.querySelector(testCase.buttonSelector);
      if (!button) {
        throw new Error(`Button not found: ${testCase.buttonSelector}`);
      }

      // Store initial URL
      const initialURL = window.location.hash;
      
      // Click the button
      console.log(`🖱️ Clicking button: ${testCase.buttonSelector}`);
      button.click();
      
      // Wait for URL change
      await this.waitForURLChange(initialURL, 1000);
      
      // Check if URL matches expected
      const actualURL = window.location.hash;
      const urlMatches = actualURL === testCase.expectedURL;
      
      if (urlMatches) {
        this.passedTests++;
        console.log(`✅ ${testCase.testName}: PASSED`);
        console.log(`   Expected: ${testCase.expectedURL}`);
        console.log(`   Actual: ${actualURL}`);
      } else {
        this.failedTests++;
        console.log(`❌ ${testCase.testName}: FAILED`);
        console.log(`   Expected: ${testCase.expectedURL}`);
        console.log(`   Actual: ${actualURL}`);
      }

      this.results.push({
        name: testCase.testName,
        module: testCase.module,
        buttonSelector: testCase.buttonSelector,
        expectedURL: testCase.expectedURL,
        actualURL: actualURL,
        passed: urlMatches
      });

    } catch (error) {
      this.failedTests++;
      console.log(`❌ ${testCase.testName}: ERROR - ${error.message}`);
      this.results.push({
        name: testCase.testName,
        module: testCase.module,
        buttonSelector: testCase.buttonSelector,
        expectedURL: testCase.expectedURL,
        actualURL: window.location.hash,
        passed: false,
        error: error.message
      });
    }
  }

  // Wait for module to load
  async waitForModuleLoad(timeout = 2000) {
    return new Promise((resolve) => {
      const checkLoaded = () => {
        const moduleContainer = document.getElementById('module-container');
        if (moduleContainer && !moduleContainer.querySelector('.loading-container')) {
          resolve();
        } else if (timeout > 0) {
          timeout -= 100;
          setTimeout(checkLoaded, 100);
        } else {
          resolve(); // Timeout reached
        }
      };
      setTimeout(checkLoaded, 200); // Initial delay
    });
  }

  // Wait for URL to change
  async waitForURLChange(initialURL, timeout = 1000) {
    return new Promise((resolve) => {
      const checkURLChange = () => {
        if (window.location.hash !== initialURL) {
          resolve();
        } else if (timeout > 0) {
          timeout -= 50;
          setTimeout(checkURLChange, 50);
        } else {
          resolve(); // Timeout reached
        }
      };
      setTimeout(checkURLChange, 100); // Initial delay
    });
  }

  // Run all button tests
  async runAllButtonTests() {
    console.log('🚀 Starting Comprehensive Button URL Tests');
    console.log('='.repeat(60));

    const testCases = this.getButtonTestCases();
    
    for (const testCase of testCases) {
      await this.runButtonTest(testCase);
      await new Promise(resolve => setTimeout(resolve, 300)); // Delay between tests
    }

    this.printButtonTestSummary();
    return this.results;
  }

  // Test specific module buttons only
  async runModuleButtonTests(moduleName) {
    console.log(`🎯 Testing ${moduleName} buttons only`);
    const testCases = this.getButtonTestCases().filter(tc => tc.module === moduleName);
    
    for (const testCase of testCases) {
      await this.runButtonTest(testCase);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    this.printButtonTestSummary();
    return this.results;
  }

  // Print test summary
  printButtonTestSummary() {
    console.log('='.repeat(60));
    console.log('🔘 BUTTON URL ROUTING TEST SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total Button Tests: ${this.totalTests}`);
    console.log(`✅ Passed: ${this.passedTests}`);
    console.log(`❌ Failed: ${this.failedTests}`);
    console.log(`📈 Success Rate: ${((this.passedTests / this.totalTests) * 100).toFixed(1)}%`);
    
    // Group results by module
    const moduleResults = {};
    this.results.forEach(result => {
      if (!moduleResults[result.module]) {
        moduleResults[result.module] = { passed: 0, failed: 0, total: 0 };
      }
      moduleResults[result.module].total++;
      if (result.passed) {
        moduleResults[result.module].passed++;
      } else {
        moduleResults[result.module].failed++;
      }
    });

    console.log('\n📊 Results by Module:');
    Object.keys(moduleResults).forEach(module => {
      const stats = moduleResults[module];
      const rate = ((stats.passed / stats.total) * 100).toFixed(1);
      console.log(`   ${module}: ${stats.passed}/${stats.total} (${rate}%)`);
    });
    
    if (this.failedTests > 0) {
      console.log('\n❌ Failed Button Tests:');
      this.results.filter(r => !r.passed).forEach(result => {
        console.log(`   - ${result.name}`);
        console.log(`     Expected: ${result.expectedURL}`);
        console.log(`     Actual: ${result.actualURL}`);
        if (result.error) {
          console.log(`     Error: ${result.error}`);
        }
      });
    }

    console.log('\n🎯 Button URL test completed!');
  }

  // Generate HTML report for button tests
  generateButtonTestReport() {
    const moduleColors = {
      'connect-id': '#4f46e5',
      'connect-workshop': '#059669', 
      'connect-config': '#dc2626',
      'connect-reports': '#7c3aed',
      'connect-test': '#ea580c'
    };

    const reportHTML = `
      <div class="button-test-report">
        <h2>🔘 Button URL Routing Test Report</h2>
        
        <div class="test-stats">
          <div class="stat">
            <span class="stat-label">Total:</span>
            <span class="stat-value">${this.totalTests}</span>
          </div>
          <div class="stat passed">
            <span class="stat-label">Passed:</span>
            <span class="stat-value">${this.passedTests}</span>
          </div>
          <div class="stat failed">
            <span class="stat-label">Failed:</span>
            <span class="stat-value">${this.failedTests}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Success Rate:</span>
            <span class="stat-value">${((this.passedTests / this.totalTests) * 100).toFixed(1)}%</span>
          </div>
        </div>
        
        <div class="button-test-results">
          ${this.results.map(result => `
            <div class="button-test-result ${result.passed ? 'passed' : 'failed'}" 
                 style="border-left-color: ${moduleColors[result.module] || '#666'}">
              <div class="test-header">
                <span class="test-name">${result.name}</span>
                <span class="test-status">${result.passed ? '✅ PASSED' : '❌ FAILED'}</span>
              </div>
              <div class="test-details">
                <div class="test-module">Module: ${result.module}</div>
                <div class="test-button">Button: ${result.buttonSelector}</div>
                <div class="test-urls">
                  <div class="expected-url">Expected: ${result.expectedURL}</div>
                  <div class="actual-url">Actual: ${result.actualURL}</div>
                </div>
                ${result.error ? `<div class="test-error">Error: ${result.error}</div>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      
      <style>
        .button-test-report {
          padding: 20px;
          font-family: monospace;
          max-width: 1000px;
          margin: 20px auto;
        }
        .button-test-result {
          padding: 12px;
          margin-bottom: 8px;
          border-left: 4px solid #ddd;
          background: #f8f9fa;
          border-radius: 4px;
        }
        .button-test-result.passed {
          background: #f0f9f0;
        }
        .button-test-result.failed {
          background: #fdf2f2;
        }
        .test-header {
          display: flex;
          justify-content: space-between;
          font-weight: bold;
          margin-bottom: 8px;
        }
        .test-details {
          font-size: 12px;
          color: #666;
        }
        .test-details > div {
          margin: 2px 0;
        }
        .expected-url, .actual-url {
          font-family: 'Courier New', monospace;
          background: white;
          padding: 2px 4px;
          border-radius: 2px;
        }
        .test-error {
          color: #dc3545;
          font-weight: bold;
        }
      </style>
    `;
    
    return reportHTML;
  }
}

// Export for use
window.ButtonURLTester = ButtonURLTester;

// Quick test functions
window.testConnectReportsButtons = async () => {
  const tester = new ButtonURLTester();
  return await tester.runModuleButtonTests('connect-reports');
};

window.testAllButtons = async () => {
  const tester = new ButtonURLTester();
  return await tester.runAllButtons();
};

// Auto-run button tests when loaded
if (window.location.hash === '#/test-buttons') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      const tester = new ButtonURLTester();
      tester.runAllButtonTests();
    }, 1000);
  });
}
