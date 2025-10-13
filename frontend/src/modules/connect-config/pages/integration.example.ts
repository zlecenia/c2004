// frontend/src/modules/connect-config/pages/integration.example.ts

/**
 * Example integration of the Connect Config menu with routing and GUI tests
 * This shows how to properly integrate the menu system into your application
 */

import { ConnectConfigMenuController } from './menu.controller';
import { ConnectConfigGUITests } from './gui-tests';

export class ConnectConfigIntegration {
  private menuController: ConnectConfigMenuController | null = null;
  private guiTests: ConnectConfigGUITests | null = null;
  private container: HTMLElement | null = null;

  constructor() {
    console.log('🔧 ConnectConfigIntegration initialized');
  }

  /**
   * Initialize the Connect Config system
   * @param containerId - ID of the container element
   * @param enableTests - Whether to enable GUI testing capabilities
   */
  public async initialize(containerId: string, enableTests: boolean = false): Promise<void> {
    try {
      // Find container element
      this.container = document.getElementById(containerId);
      if (!this.container) {
        throw new Error(`Container element with ID '${containerId}' not found`);
      }

      // Initialize menu controller
      this.menuController = new ConnectConfigMenuController(this.container);
      console.log('✅ Menu controller initialized');

      // Initialize GUI tests if enabled
      if (enableTests) {
        this.guiTests = new ConnectConfigGUITests();
        console.log('✅ GUI tests enabled');
        this.setupTestInterface();
      }

      // Setup global event listeners
      this.setupGlobalEventListeners();

      console.log('🚀 ConnectConfig integration completed successfully');

    } catch (error) {
      console.error('❌ Failed to initialize ConnectConfig:', error);
      throw error;
    }
  }

  /**
   * Navigate to a specific page programmatically
   */
  public navigateTo(category: string, page?: string): void {
    if (!this.menuController) {
      console.error('❌ Menu controller not initialized');
      return;
    }

    console.log(`🧭 Navigating to: ${category}${page ? ` > ${page}` : ''}`);
    
    // Map of category IDs
    const categoryMap: Record<string, string> = {
      'devices': 'devices-category',
      'security': 'security-category', 
      'system': 'system-category'
    };

    const categoryId = categoryMap[category];
    if (!categoryId) {
      console.error(`❌ Unknown category: ${category}`);
      return;
    }

    this.menuController.setActiveMenuItem('connect-config', categoryId, page);
  }

  /**
   * Get current navigation state
   */
  public getCurrentState(): { category: string; page: string; url: string } | null {
    if (!this.menuController) {
      return null;
    }

    const activeItem = this.menuController.getCurrentActiveItem();
    return {
      category: activeItem.level2,
      page: activeItem.level3,
      url: window.location.pathname
    };
  }

  /**
   * Run GUI tests to verify functionality
   */
  public async runTests(): Promise<any> {
    if (!this.guiTests || !this.menuController) {
      console.error('❌ Tests not available - initialize with enableTests: true');
      return null;
    }

    console.log('🧪 Running Connect Config GUI tests...');
    return await this.guiTests.runAllTests(this.menuController);
  }

  /**
   * Setup test interface for debugging
   */
  private setupTestInterface(): void {
    // Add test button to page
    const testButton = document.createElement('button');
    testButton.id = 'connect-config-test-btn';
    testButton.textContent = '🧪 Run Tests';
    testButton.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 10px 15px;
      background: #28a745;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 600;
      z-index: 10000;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    `;

    testButton.addEventListener('click', () => {
      this.runTests();
    });

    document.body.appendChild(testButton);

    // Add URL display
    const urlDisplay = document.createElement('div');
    urlDisplay.id = 'connect-config-url-display';
    urlDisplay.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 8px 12px;
      background: #17a2b8;
      color: white;
      font-size: 11px;
      font-family: monospace;
      border-radius: 4px;
      z-index: 9999;
    `;

    this.updateUrlDisplay(urlDisplay);
    document.body.appendChild(urlDisplay);

    // Update URL display on route changes
    window.addEventListener('routeUpdated', () => {
      this.updateUrlDisplay(urlDisplay);
    });
  }

  private updateUrlDisplay(element: HTMLElement): void {
    const state = this.getCurrentState();
    if (state) {
      element.textContent = `URL: ${state.url} | ${state.category} > ${state.page}`;
    }
  }

  /**
   * Setup global event listeners for the application
   */
  private setupGlobalEventListeners(): void {
    // Listen for route updates
    window.addEventListener('routeUpdated', (event: any) => {
      console.log('🔄 Route updated:', event.detail);
      
      // Emit custom event that other parts of the application can listen to
      window.dispatchEvent(new CustomEvent('connectConfigNavigated', {
        detail: {
          route: event.detail.route,
          state: this.getCurrentState(),
          timestamp: Date.now()
        }
      }));
    });

    // Handle browser refresh
    window.addEventListener('beforeunload', () => {
      const state = this.getCurrentState();
      if (state) {
        console.log('💾 Saving state before page unload:', state);
        localStorage.setItem('connectConfigLastState', JSON.stringify(state));
      }
    });

    // Restore state after page load
    window.addEventListener('load', () => {
      const savedState = localStorage.getItem('connectConfigLastState');
      if (savedState) {
        try {
          const state = JSON.parse(savedState);
          console.log('🔄 Restoring saved state:', state);
          // Note: The routing system will automatically handle URL-based restoration
        } catch (error) {
          console.warn('⚠️ Failed to restore saved state:', error);
        }
      }
    });
  }

  /**
   * Enable debug mode with additional logging
   */
  public enableDebugMode(): void {
    console.log('🐛 Debug mode enabled for ConnectConfig');
    
    // Override console.log to track all menu-related logs
    const originalLog = console.log;
    console.log = (...args) => {
      originalLog.apply(console, args);
      
      // Track navigation events
      const message = args.join(' ');
      if (message.includes('🖱️') || message.includes('🌐') || message.includes('🔄')) {
        this.logDebugEvent('NAVIGATION', message);
      }
    };
  }

  private logDebugEvent(category: string, message: string): void {
    const timestamp = new Date().toISOString();
    const debugLog = {
      timestamp,
      category,
      message,
      currentState: this.getCurrentState()
    };
    
    // Store in sessionStorage for debugging
    const logs = JSON.parse(sessionStorage.getItem('connectConfigDebugLogs') || '[]');
    logs.push(debugLog);
    
    // Keep only last 100 logs
    if (logs.length > 100) {
      logs.shift();
    }
    
    sessionStorage.setItem('connectConfigDebugLogs', JSON.stringify(logs));
  }

  /**
   * Get debug logs
   */
  public getDebugLogs(): any[] {
    return JSON.parse(sessionStorage.getItem('connectConfigDebugLogs') || '[]');
  }

  /**
   * Cleanup resources
   */
  public destroy(): void {
    // Remove test interface elements
    const testBtn = document.getElementById('connect-config-test-btn');
    const urlDisplay = document.getElementById('connect-config-url-display');
    
    if (testBtn) testBtn.remove();
    if (urlDisplay) urlDisplay.remove();

    // Clear debug logs
    sessionStorage.removeItem('connectConfigDebugLogs');
    localStorage.removeItem('connectConfigLastState');

    console.log('🧹 ConnectConfig integration cleaned up');
  }
}

// Example usage:
export async function initializeConnectConfig(containerId: string = 'connect-config-container'): Promise<ConnectConfigIntegration> {
  const integration = new ConnectConfigIntegration();
  
  try {
    // Initialize with tests enabled in development
    const isDevelopment = process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost';
    await integration.initialize(containerId, isDevelopment);
    
    // Enable debug mode in development
    if (isDevelopment) {
      integration.enableDebugMode();
    }
    
    return integration;
    
  } catch (error) {
    console.error('❌ Failed to initialize ConnectConfig:', error);
    throw error;
  }
}

// Export for global access
declare global {
  interface Window {
    connectConfig: ConnectConfigIntegration;
  }
}

// Auto-initialize on DOM ready (optional)
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      window.connectConfig = await initializeConnectConfig();
      console.log('🚀 ConnectConfig auto-initialized and available as window.connectConfig');
    } catch (error) {
      console.warn('⚠️ ConnectConfig auto-initialization failed:', error);
    }
  });
}
