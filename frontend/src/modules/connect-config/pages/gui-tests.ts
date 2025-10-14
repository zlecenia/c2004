// frontend/src/modules/connect-config/pages/gui-tests.ts

interface TestResult {
  testName: string;
  success: boolean;
  details: string;
  timestamp: number;
  url?: string;
  expectedUrl?: string;
}

interface TestSuite {
  name: string;
  results: TestResult[];
  totalTests: number;
  passedTests: number;
  failedTests: number;
}

export class ConnectConfigGUITests {
  private testResults: TestResult[] = [];
  private _testContainer: HTMLElement | null = null;
  private routeUpdateEvents: Array<{ route: string; timestamp: number }> = [];

  constructor() {
    this.setupRouteListener();
  }

  private setupRouteListener(): void {
    window.addEventListener('routeUpdated', (event: any) => {
      const { route, timestamp } = event.detail;
      this.routeUpdateEvents.push({ route, timestamp });
    });
  }

  public async runAllTests(menuController: any): Promise<TestSuite> {
    
    this.testResults = [];
    this.routeUpdateEvents = [];
    
    // Test 1: Menu Navigation Tests
    await this.testMenuNavigation(menuController);
    
    // Test 2: URL Update Tests
    await this.testURLUpdates(menuController);
    
    // Test 3: Browser Back/Forward Tests
    await this.testBrowserNavigation(menuController);
    
    // Test 4: Direct URL Navigation Tests
    await this.testDirectURLNavigation(menuController);
    
    const testSuite: TestSuite = {
      name: 'Connect Config Menu GUI Tests',
      results: this.testResults,
      totalTests: this.testResults.length,
      passedTests: this.testResults.filter(r => r.success).length,
      failedTests: this.testResults.filter(r => !r.success).length
    };
    
    this.displayTestResults(testSuite);
    return testSuite;
  }

  private async testMenuNavigation(menuController: any): Promise<void> {
    
    // Test clicking on different menu levels
    const testCases = [
      { level: 2, id: 'devices-category', name: 'Devices Category Click' },
      { level: 3, id: 'rfid-config', name: 'RFID Config Click' },
      { level: 3, id: 'users', name: 'Users Click' },
      { level: 3, id: 'qr-config', name: 'QR Config Click' }
    ];

    for (const testCase of testCases) {
      try {
        const initialRouteCount = this.routeUpdateEvents.length;
        
        // Simulate menu item click
        menuController.setActiveMenuItem('connect-config', 
          testCase.level === 3 ? this.getParentCategory(testCase.id) : testCase.id,
          testCase.level === 3 ? testCase.id : undefined
        );
        
        // Wait for DOM and route updates
        await this.wait(200);
        
        const routeUpdated = this.routeUpdateEvents.length > initialRouteCount;
        const currentActive = menuController.getCurrentActiveItem();
        
        const success = testCase.level === 3 ? 
          currentActive.level3 === testCase.id :
          currentActive.level2 === testCase.id;
        
        this.addTestResult({
          testName: `Menu Navigation - ${testCase.name}`,
          success: success && routeUpdated,
          details: success ? 
            `Successfully navigated to ${testCase.name}. Route updated: ${routeUpdated}` :
            `Failed to navigate to ${testCase.name}. Expected: ${testCase.id}, Got: ${JSON.stringify(currentActive)}`,
          timestamp: Date.now(),
          url: window.location.pathname
        });
        
      } catch (error) {
        this.addTestResult({
          testName: `Menu Navigation - ${testCase.name}`,
          success: false,
          details: `Error during navigation: ${error}`,
          timestamp: Date.now()
        });
      }
    }
  }

  private async testURLUpdates(menuController: any): Promise<void> {
    
    const urlTestCases = [
      { menuPath: ['connect-config', 'devices-category', 'rfid-config'], expectedUrl: '/connect-config/devices/rfid-config' },
      { menuPath: ['connect-config', 'devices-category', 'qr-config'], expectedUrl: '/connect-config/devices/qr-config' },
      { menuPath: ['connect-config', 'security-category', 'users'], expectedUrl: '/connect-config/security/users' },
      { menuPath: ['connect-config', 'devices-category', 'sensors'], expectedUrl: '/connect-config/devices/sensors' }
    ];

    for (const testCase of urlTestCases) {
      try {
        const _initialUrl = window.location.pathname;
        
        // Navigate to menu item
        menuController.setActiveMenuItem(testCase.menuPath[0], testCase.menuPath[1], testCase.menuPath[2]);
        
        // Wait for URL update
        await this.wait(300);
        
        const currentUrl = window.location.pathname;
        const urlMatches = currentUrl === testCase.expectedUrl;
        
        this.addTestResult({
          testName: `URL Update - ${testCase.menuPath.join(' > ')}`,
          success: urlMatches,
          details: urlMatches ? 
            `URL correctly updated to ${currentUrl}` :
            `URL mismatch. Expected: ${testCase.expectedUrl}, Got: ${currentUrl}`,
          timestamp: Date.now(),
          url: currentUrl,
          expectedUrl: testCase.expectedUrl
        });
        
      } catch (error) {
        this.addTestResult({
          testName: `URL Update - ${testCase.menuPath.join(' > ')}`,
          success: false,
          details: `Error during URL update test: ${error}`,
          timestamp: Date.now()
        });
      }
    }
  }

  private async testBrowserNavigation(menuController: any): Promise<void> {
    
    try {
      // Navigate through several pages to create history
      const navigationSequence = [
        ['connect-config', 'devices-category', 'rfid-config'],
        ['connect-config', 'security-category', 'users'],
        ['connect-config', 'devices-category', 'qr-config']
      ];
      
      for (const path of navigationSequence) {
        menuController.setActiveMenuItem(path[0], path[1], path[2]);
        await this.wait(200);
      }
      
      // Test browser back navigation
      const beforeBackUrl = window.location.pathname;
      window.history.back();
      await this.wait(300);
      
      const afterBackUrl = window.location.pathname;
      const backWorked = afterBackUrl !== beforeBackUrl;
      
      this.addTestResult({
        testName: 'Browser Back Navigation',
        success: backWorked,
        details: backWorked ? 
          `Browser back navigation worked. Changed from ${beforeBackUrl} to ${afterBackUrl}` :
          `Browser back navigation failed. URL remained: ${afterBackUrl}`,
        timestamp: Date.now(),
        url: afterBackUrl
      });
      
    } catch (error) {
      this.addTestResult({
        testName: 'Browser Back Navigation',
        success: false,
        details: `Error during browser navigation test: ${error}`,
        timestamp: Date.now()
      });
    }
  }

  private async testDirectURLNavigation(menuController: any): Promise<void> {
    
    const directUrlTests = [
      { url: '/connect-config/devices/barcode-config', expectedPage: 'barcode-config' },
      { url: '/connect-config/security/users', expectedPage: 'users' }
    ];

    for (const test of directUrlTests) {
      try {
        // Simulate direct URL navigation
        window.history.pushState({}, '', test.url);
        
        // Trigger route change handler
        window.dispatchEvent(new PopStateEvent('popstate'));
        
        await this.wait(300);
        
        const currentActive = menuController.getCurrentActiveItem();
        const correctPageActive = currentActive.level3 === test.expectedPage;
        
        this.addTestResult({
          testName: `Direct URL Navigation - ${test.url}`,
          success: correctPageActive,
          details: correctPageActive ? 
            `Direct URL navigation successful to ${test.expectedPage}` :
            `Direct URL navigation failed. Expected: ${test.expectedPage}, Got: ${currentActive.level3}`,
          timestamp: Date.now(),
          url: test.url
        });
        
      } catch (error) {
        this.addTestResult({
          testName: `Direct URL Navigation - ${test.url}`,
          success: false,
          details: `Error during direct URL navigation: ${error}`,
          timestamp: Date.now()
        });
      }
    }
  }

  private getParentCategory(itemId: string): string {
    const categoryMap: Record<string, string> = {
      'rfid-config': 'devices-category',
      'qr-config': 'devices-category',
      'barcode-config': 'devices-category',
      'sensors': 'devices-category',
      'users': 'security-category',
      'permissions': 'security-category',
      'backup': 'security-category'
    };
    return categoryMap[itemId] || 'system-category';
  }

  private addTestResult(result: TestResult): void {
    this.testResults.push(result);
  }

  private async wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private displayTestResults(testSuite: TestSuite): void {
    
    // Create visual test results display
    this.createTestResultsUI(testSuite);
  }

  private createTestResultsUI(testSuite: TestSuite): void {
    // Remove existing test results
    const existingResults = document.getElementById('gui-test-results');
    if (existingResults) {
      existingResults.remove();
    }

    const testResultsContainer = document.createElement('div');
    testResultsContainer.id = 'gui-test-results';
    testResultsContainer.style.cssText = `
      position: fixed;
      top: 20px;
      left: 20px;
      width: 400px;
      max-height: 500px;
      background: white;
      border: 2px solid #007bff;
      border-radius: 8px;
      padding: 15px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      font-family: monospace;
      font-size: 12px;
      overflow-y: auto;
      z-index: 10000;
    `;

    testResultsContainer.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <h3 style="margin: 0; color: #007bff;">🧪 GUI Test Results</h3>
        <button onclick="this.parentElement.parentElement.remove()" style="background: #dc3545; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer;">✕</button>
      </div>
      
      <div style="margin-bottom: 15px; padding: 10px; background: #f8f9fa; border-radius: 4px;">
        <div><strong>Total:</strong> ${testSuite.totalTests}</div>
        <div style="color: #28a745;"><strong>Passed:</strong> ${testSuite.passedTests}</div>
        <div style="color: #dc3545;"><strong>Failed:</strong> ${testSuite.failedTests}</div>
        <div><strong>Success Rate:</strong> ${((testSuite.passedTests / testSuite.totalTests) * 100).toFixed(1)}%</div>
      </div>
      
      <div style="max-height: 300px; overflow-y: auto;">
        ${testSuite.results.map(result => `
          <div style="margin-bottom: 8px; padding: 8px; border-left: 3px solid ${result.success ? '#28a745' : '#dc3545'}; background: ${result.success ? '#d4edda' : '#f8d7da'};">
            <div style="font-weight: bold; color: ${result.success ? '#155724' : '#721c24'};">
              ${result.success ? '✅' : '❌'} ${result.testName}
            </div>
            <div style="font-size: 10px; color: #666; margin-top: 4px;">
              ${result.details}
            </div>
            ${result.url ? `<div style="font-size: 9px; color: #888; margin-top: 2px;">URL: ${result.url}</div>` : ''}
          </div>
        `).join('')}
      </div>
    `;

    document.body.appendChild(testResultsContainer);
  }

  public getTestResults(): TestResult[] {
    return [...this.testResults];
  }

  public getRouteUpdateEvents(): Array<{ route: string; timestamp: number }> {
    return [...this.routeUpdateEvents];
  }
}
