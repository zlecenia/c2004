// frontend/src/main.ts

import { 
  createElement, 
  replaceContent, 
  createErrorContainer, 
  createLoadingContainer,
  createMainAppStructure,
  createButton
} from './utils/dom.helpers';
import './config/env.config'; // Validate environment on startup
import './config/service.manifest'; // Validate service manifest
import { moduleManager } from './modules';
import { MenuManager, createMenu } from './components/connect-menu';

// Add basic CSS for 1280×400px touchscreen
const style = document.createElement('style');
style.textContent = `
  * {
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #000;
    overflow: hidden;
    height: 400px;
    width: 1200px;
  }

  .main-app-container {
    width: 1200px;
    height: 400px;
    display: flex;
    flex-direction: column;
    background: #1a1a1a;
  }

  .top-bar {
    height: 35px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    flex-shrink: 0;
  }

  .top-bar-brand {
    font-size: 14px;
    font-weight: 600;
  }

  .top-bar-submenu {
    margin-left: 20px;
    font-size: 13px;
    font-weight: 500;
    opacity: 0.9;
  }

  .top-bar-section-title {
    flex: 1;
    margin-left: 15px;
    font-size: 12px;
    font-weight: 600;
    opacity: 0.95;
  }

  .top-bar-status {
    display: flex;
    gap: 12px;
    font-size: 11px;
  }

  .app-layout {
    display: flex;
    height: 365px;
    overflow: hidden;
  }

  /* Sidebar navigation styles moved to connect-menu component */

  .module-container {
    flex: 1;
    background: #f5f5f5;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .loading {
    text-align: center;
    padding: 40px;
    color: #666;
    font-size: 14px;
  }

  .error {
    background: #fee;
    border: 1px solid #fcc;
    padding: 12px;
    margin: 10px;
    border-radius: 5px;
    color: #c33;
    font-size: 12px;
  }

  /* Professional Loading States */
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 300px;
    text-align: center;
    padding: 40px;
  }

  .loading-spinner {
    margin-bottom: 20px;
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #6366f1;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .loading-text h3 {
    margin: 0 0 8px 0;
    font-size: 13px;
    color: #333;
    font-weight: 600;
  }

  .loading-text p {
    margin: 0;
    font-size: 14px;
    color: #666;
  }

  .loading-progress {
    width: 200px;
    margin-top: 20px;
  }

  .progress-bar {
    width: 100%;
    height: 4px;
    background: #e0e0e0;
    border-radius: 2px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #6366f1, #8b5cf6);
    width: 0%;
    transition: width 0.8s ease-out;
  }

  /* Professional Error States */
  .error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 300px;
    text-align: center;
    padding: 40px;
  }

  .error-icon {
    font-size: 48px;
    margin-bottom: 20px;
  }

  .error-content h3 {
    margin: 0 0 12px 0;
    font-size: 20px;
    color: #dc3545;
    font-weight: 600;
  }

  .error-message {
    margin: 0 0 20px 0;
    font-size: 14px;
    color: #666;
    max-width: 400px;
  }

  .error-actions {
    display: flex;
    gap: 12px;
  }

  .btn-retry, .btn-home {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    transition: all 0.2s ease;
  }

  .btn-retry {
    background: #6366f1;
    color: white;
  }

  .btn-retry:hover {
    background: #5856eb;
  }

  .btn-home {
    background: #6c757d;
    color: white;
  }

  .btn-home:hover {
    background: #5a6268;
  }

  /* Scrollbar styling */
  .module-container::-webkit-scrollbar {
    width: 6px;
  }

  .module-container::-webkit-scrollbar-track {
    background: #e0e0e0;
  }

  .module-container::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }

  .module-container::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  
  /* Icon styles - simplified emoji system */
  .icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    flex-shrink: 0;
  }
`;
document.head.appendChild(style);

// Track current module to prevent unnecessary re-renders
let currentModuleState = {
  moduleName: '',
  moduleType: '',
  method: ''
};

async function initializeApp() {
  try {
    
    // Initialize all modules
    await moduleManager.initializeAll();
    
    // Create main application with navigation
    createMainApplication();
    
    
  } catch (error) {
    console.error('❌ Failed to initialize application:', error);
    showErrorUI(error instanceof Error ? error : String(error));
  }
}

function createMainApplication(): void {
  const app = document.getElementById('app') || document.body;
  
  const mainContainer = createMainAppStructure();
  
  mainContainer.innerHTML = `
    <div class="top-bar">
      <div class="top-bar-brand">🚀 ConnectDisplay</div>
      <div class="top-bar-submenu" id="top-bar-submenu"></div>
      <div class="top-bar-section-title" id="top-bar-section-title"></div>
      <div class="top-bar-status">
        <span>📊 <span id="module-count">6</span></span>
        <span>✅</span>
        <span>🕒 <span id="load-time">${new Date().toLocaleTimeString()}</span></span>
      </div>
    </div>
    
    <div class="app-layout">
      <div id="main-navigation-container">
        <!-- Main navigation menu will be rendered here by MenuManager -->
      </div>
      
      <div class="module-container" id="module-container">
        <!-- Module content will be rendered here -->
      </div>
    </div>
  `;
  
  app.textContent = '';
  app.appendChild(mainContainer);
  
  // Setup navigation with new MenuManager
  setupNavigation();
}

function setupNavigation() {
  // Initialize MenuManager and create main navigation
  const navContainer = document.getElementById('main-navigation-container');
  
  if (!navContainer) {
    console.error('Main navigation container not found');
    return;
  }

  // Create main navigation menu
  createMenu('main-navigation', navContainer, {
    onItemClick: (data) => {
      const { item } = data;
      
      if (item.module) {
        // Use clean path routing instead of hash
        const routePath = item.route || `/${item.module}`;
        
        // Update browser history with clean path
        window.history.pushState({}, '', routePath);
        
        // Load module directly
        loadModule(item.module, '');
      }
    }
  });
  
  // Handle path change events (popstate for back/forward)
  (window as any).handlePathChangeRef = handlePathChange; // Store reference for temporary disabling
  window.addEventListener('popstate', handlePathChange);
  // Handle MenuManager-driven route updates (custom event)
  window.addEventListener('routeChanged', () => handlePathChange());
  
  // Load initial route from current path
  handlePathChange();
}

function handlePathChange() {
  const path = window.location.pathname;
  if (path && path !== '/') {
    const pathSegments = path.split('/').filter(segment => segment); // Remove empty segments
    let moduleName = pathSegments[0] || '';
    let moduleType = pathSegments[1] || '';
    let method = pathSegments[2] || '';

    // Normalize defaults for connect-workshop: ensure /section/method present
    if (moduleName === 'connect-workshop') {
      // If only module provided -> default to /requests/search
      if (!moduleType) {
        moduleType = 'requests';
        method = 'search';
        window.history.replaceState({}, '', `/${moduleName}/${moduleType}/${method}`);
      }
      // If section provided without method -> append /search
      else if (moduleType && !method) {
        method = 'search';
        window.history.replaceState({}, '', `/${moduleName}/${moduleType}/${method}`);
      }
    }
    // Normalize defaults for connect-data: ensure /section/action present
    else if (moduleName === 'connect-data') {
      // If only module provided -> default to /dispositions/import
      if (!moduleType) {
        moduleType = 'dispositions';
        method = 'import';
        window.history.replaceState({}, '', `/${moduleName}/${moduleType}/${method}`);
      }
      // If section provided without method -> append /import
      else if (moduleType && !method) {
        method = 'import';
        window.history.replaceState({}, '', `/${moduleName}/${moduleType}/${method}`);
      }
    }

    if (moduleName) {
      
      // Update active button based on path using MenuManager (sidebar)
      const menuManager = MenuManager.getInstance();
      const mainMenu = menuManager.getMenu('main-navigation');
      if (mainMenu) {
        mainMenu.updateActiveItem(moduleName);
      }
      
      // Check if we need to reload the module or just update state
      const sameModule = currentModuleState.moduleName === moduleName;
      const sameType = currentModuleState.moduleType === (moduleType || '');
      const sameMethod = currentModuleState.method === (method || '');
      
      if (sameModule && sameType && sameMethod) {
        return; // No change needed
      }
      
      // Update state
      currentModuleState = {
        moduleName: moduleName || '',
        moduleType: moduleType || '',
        method: method || ''
      };
      
      // Only reload if it's a different module
      if (!sameModule) {
        loadModule(moduleName, moduleType, method);
      } else {
        // Same module, just update internal state
        updateModuleState(moduleName, moduleType, method);
      }
    }
  } else {
    // Default to first module if no path
    const firstButton = document.querySelector('.nav-btn');
    if (firstButton) {
      const moduleName = firstButton.getAttribute('data-module');
      const moduleType = firstButton.getAttribute('data-type');
      if (moduleName) {
        const path = moduleType ? `/${moduleName}/${moduleType}` : `/${moduleName}`;
        window.history.replaceState({}, '', path);
        loadModule(moduleName, moduleType);
      }
    }
  }
}

// Update module state without re-rendering
function updateModuleState(moduleName: string, moduleType?: string | null, method?: string | null) {
  
  switch (moduleName) {
    case 'connect-id':
      // Try to find existing ConnectID view and update its state
      const connectIdElement = document.querySelector('.connect-id-compact');
      if (connectIdElement) {
        // Send message to ConnectID to update method
        const event = new CustomEvent('connectid:update-method', {
          detail: { method: method || 'rfid' }
        });
        window.dispatchEvent(event);
      }
      break;
    case 'connect-data':
      // Update ConnectData state directly when staying in the same module
      const dataElement = document.querySelector('.connect-data-compact');
      if (dataElement) {
        const event = new CustomEvent('connectdata:update-state', {
          detail: { section: moduleType, method: method }
        });
        window.dispatchEvent(event);
      }
      break;
      
    case 'connect-workshop':
      // Update ConnectWorkshop state directly
      const workshopElement = document.querySelector('.connect-workshop-compact');
      if (workshopElement) {
        const event = new CustomEvent('connectworkshop:update-state', {
          detail: { section: moduleType, action: method }
        });
        window.dispatchEvent(event);
      }
      break;
      
    case 'connect-config':
      // Update ConnectConfig state directly
      const configElement = document.querySelector('.connect-config-layout');
      if (configElement) {
        const event = new CustomEvent('connectconfig:update-state', {
          detail: { section: moduleType, subsection: method }
        });
        window.dispatchEvent(event);
      }
      break;
      
    case 'connect-test':
      // Update ConnectTest state directly
      const testElement = document.querySelector('.connect-test-compact');
      if (testElement) {
        const event = new CustomEvent('connecttest:update-state', {
          detail: { section: moduleType, method: method }
        });
        window.dispatchEvent(event);
      }
      break;
      
    case 'connect-reports':
      // Update ConnectReports state directly
      const reportsElement = document.querySelector('.connect-reports-compact');
      if (reportsElement) {
        const event = new CustomEvent('connectreports:update-state', {
          detail: { reportType: moduleType, view: method }
        });
        window.dispatchEvent(event);
      }
      break;
      
    default:
      // Fall back to full reload for unsupported modules
      loadModule(moduleName, moduleType, method);
  }
}

function loadModule(moduleName: string, moduleType?: string | null, method?: string | null) {
  const container = document.getElementById('module-container');
  if (!container) return;
  
  try {
    // Show professional loading state
    showLoadingState(container, moduleName);
    
    // Add performance timing
    const startTime = performance.now();
    
    switch (moduleName) {
      case 'connect-id':
        loadConnectIdModule(container, moduleType || 'user', method);
        break;
      case 'connect-test':
        // For test: moduleType could be section or method depending on URL structure
        loadConnectTestModule(container, moduleType, method);
        break;
      case 'connect-data':  // Renamed from connect-data
        loadConnectDataModule(container, moduleType, method);
        break;
      case 'connect-workshop':
        // For workshop: moduleType is section, method is action
        loadConnectWorkshopModule(container, moduleType, method);
        break;
      case 'connect-config':
        // For config: moduleType is section
        loadConnectConfigModule(container, moduleType);
        break;
      case 'connect-reports':
        // For reports: moduleType is report type, method is view
        loadConnectReportsModule(container, moduleType, method);
        break;
      case 'connect-manager':
        // For manager: moduleType is action
        loadConnectManagerModule(container, moduleType);
        break;
      default:
        container.innerHTML = `<div class="error">Unknown module: ${moduleName}</div>`;
    }
    
    // Track loading performance
    const loadTime = performance.now() - startTime;
    
  } catch (error) {
    showErrorState(container, moduleName, error instanceof Error ? error : String(error));
    console.error(`❌ Failed to load module ${moduleName}:`, error);
  }
}

// Professional loading state
function showLoadingState(container: HTMLElement, moduleName: string) {
  const moduleNames: Record<string, string> = {
    'connect-id': 'ConnectID',
    'connect-test': 'ConnectTest', 
    'connect-workshop': 'ConnectWorkshop',
    'connect-data': 'ConnectData',
    'connect-config': 'ConnectConfig',
    'connect-reports': 'ConnectReports',
    'connect-manager': 'ConnectManager'
  };
  
  const displayName = moduleNames[moduleName] || moduleName;
  
  container.innerHTML = `
    <div class="loading-container">
      <div class="loading-spinner">
        <div class="spinner"></div>
      </div>
      <div class="loading-text">
        <h3>Loading ${displayName}...</h3>
        <p>Preparing module components</p>
      </div>
      <div class="loading-progress">
        <div class="progress-bar">
          <div class="progress-fill"></div>
        </div>
      </div>
    </div>
  `;
  
  // Add loading animation
  setTimeout(() => {
    const progressFill = container.querySelector('.progress-fill') as HTMLElement;
    if (progressFill) {
      progressFill.style.width = '100%';
    }
  }, 100);
}

// Professional error state
function showErrorState(container: HTMLElement, moduleName: string, error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  container.innerHTML = `
    <div class="error-container">
      <div class="error-icon">⚠️</div>
      <div class="error-content">
        <h3>Failed to load ${moduleName}</h3>
        <p class="error-message">${message}</p>
        <div class="error-actions">
          <button class="btn-retry" onclick="window.location.reload()">🔄 Retry</button>
          <button class="btn-home" onclick="window.location.hash = '#/'">🏠 Home</button>
        </div>
      </div>
    </div>
  `;
}


function loadConnectIdModule(container: HTMLElement, _type: string = 'user', method?: string | null) {
  import('./modules/connect-id/connect-id.module').then(async () => {
    const module = moduleManager.getModule('connect-id');
    const { ConnectIdView } = await import('./modules/connect-id/connect-id.view');
    const view = new ConnectIdView(module as any);
    
    container.innerHTML = '';
    const viewElement = view.render();
    container.appendChild(viewElement);
    
    // Set the initial method directly after render
    setTimeout(() => {
      view.setInitialMethod(method || 'rfid');
      window.dispatchEvent(new CustomEvent('connectid:dom-ready'));
    }, 50);
  }).catch(error => {
    container.innerHTML = `<div class="error">Failed to load ConnectID module: ${error}</div>`;
  });
}

function loadConnectTestModule(container: HTMLElement, section?: string | null, params?: string | null) {
  import('./modules/connect-test/connect-test.module').then(async () => {
    const module = moduleManager.getModule('connect-test');
    const { ConnectTestView } = await import('./modules/connect-test/connect-test.view');
    const view = new ConnectTestView(module as any);
    
    container.innerHTML = '';
    const viewElement = view.render();
    container.appendChild(viewElement);
    
    // Set initial state from URL
    setTimeout(() => {
      if (section && (view as any).setInitialSection) {
        (view as any).setInitialSection(section);
      }
      if (params && (view as any).setInitialParams) {
        (view as any).setInitialParams(params);
      }
    }, 50);
    
  }).catch(error => {
    container.innerHTML = `<div class="error">Failed to load ConnectTest module: ${error}</div>`;
  });
}

function loadConnectDataModule(container: HTMLElement, section?: string | null, method?: string | null) {
  import('./modules/connect-data/connect-filter.module').then(async () => {
    const module = moduleManager.getModule('connect-data');
    const { ConnectDataView } = await import('./modules/connect-data/connect-filter.view');
    const view = new ConnectDataView(module as any);
    
    container.innerHTML = '';
    const viewElement = view.render();
    container.appendChild(viewElement);
    
    // Set initial section and method from URL
    setTimeout(() => {
      if (section && (view as any).setInitialSection) {
        (view as any).setInitialSection(section);
      }
      if (method && (view as any).setInitialMethod) {
        (view as any).setInitialMethod(method);
      }
    }, 50);

  }).catch(error => {
    container.innerHTML = `<div class="error">Failed to load ConnectData module: ${error}</div>`;
  });
}

function loadConnectWorkshopModule(container: HTMLElement, section?: string | null, action?: string | null) {
  import('./modules/connect-workshop/connect-workshop.module').then(async () => {
    const module = moduleManager.getModule('connect-workshop');
    const { ConnectWorkshopView } = await import('./modules/connect-workshop/connect-workshop.view');
    const view = new ConnectWorkshopView(module as any);
    
    container.innerHTML = '';
    const viewElement = view.render();
    container.appendChild(viewElement);
    
    // Set initial section and action from URL
    setTimeout(() => {
      if (section && (view as any).setInitialSection) {
        (view as any).setInitialSection(section);
      }
      if (action && (view as any).setInitialAction) {
        (view as any).setInitialAction(action);
      }
    }, 50);
    
  }).catch(error => {
    container.innerHTML = `<div class="error">Failed to load ConnectWorkshop module: ${error}</div>`;
  });
}

function loadConnectConfigModule(container: HTMLElement, section?: string | null) {
  import('./modules/connect-config/connect-config.module').then(async () => {
    const module = moduleManager.getModule('connect-config');
    const { ConnectConfigView } = await import('./modules/connect-config/connect-config.view');
    const view = new ConnectConfigView(module as any);
    
    container.innerHTML = '';
    const viewElement = view.render();
    container.appendChild(viewElement);
    
    // Set initial section from URL
    setTimeout(() => {
      if (section && (view as any).setInitialSection) {
        (view as any).setInitialSection(section);
      }
    }, 50);
    
  }).catch(error => {
    container.innerHTML = `<div class="error">Failed to load ConnectConfig module: ${error}</div>`;
  });
}

function loadConnectReportsModule(container: HTMLElement, reportType?: string | null, view?: string | null) {
  import('./modules/connect-reports/connect-reports.module').then(async () => {
    const module = moduleManager.getModule('connect-reports');
    const { ConnectReportsView } = await import('./modules/connect-reports/connect-reports.view');
    const reportView = new ConnectReportsView(module as any);
    
    container.innerHTML = '';
    const viewElement = reportView.render();
    container.appendChild(viewElement);
    
    // Set initial state from URL
    setTimeout(() => {
      if (reportType && (reportView as any).setInitialReportType) {
        (reportView as any).setInitialReportType(reportType);
      }
      if (view && (reportView as any).setInitialView) {
        (reportView as any).setInitialView(view);
      }
    }, 50);
    
  }).catch(error => {
    container.innerHTML = `<div class="error">Failed to load ConnectReports module: ${error}</div>`;
  });
}

function loadConnectManagerModule(container: HTMLElement, action?: string | null) {
  import('./modules/connect-manager/connect-manager.view').then(async ({ ConnectManagerView }) => {
    const view = new ConnectManagerView();
    
    container.innerHTML = '';
    const viewElement = view.render();
    container.appendChild(viewElement);
    
    // Set initial action from URL
    setTimeout(() => {
      if (action && (view as any).switchAction) {
        (view as any).switchAction(action, viewElement);
      }
    }, 50);
    
  }).catch(error => {
    container.innerHTML = `<div class="error">Failed to load ConnectManager module: ${error}</div>`;
  });
}

export function oldLoadConnectReportsModule(container: HTMLElement) {
  container.innerHTML = `
    <div class="reports-compact" style="height: 100%; overflow: hidden;">
      <div class="compact-layout" style="display: flex; height: 365px; background: #f5f5f5;">
        <!-- Column 1: Report Types -->
        <div class="menu-column" style="width: 120px; background: #2a2a2a; padding: 6px 4px; overflow-y: auto; flex-shrink: 0; border-right: 1px solid #1a1a1a;">
          <h3 class="column-title" style="color: #FFF; font-size: 9px; font-weight: 600; text-transform: uppercase; margin: 0 0 6px 0; padding: 4px; text-align: center; background: #1a1a1a; border-radius: 3px;">Raporty</h3>
          <button class="report-type-item active" data-type="executed" style="width: 100%; background: #3a3a3a; border: none; padding: 3px 4px; margin-bottom: 4px; border-radius: 5px; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 4px; transition: all 0.2s; color: #ccc;">
            <span class="menu-icon" style="font-size: 13px;">✅</span>
            <span class="menu-label" style="font-size: 10px; font-weight: 500;">Wykonane</span>
          </button>
          <button class="report-type-item" data-type="planned" style="width: 100%; background: #3a3a3a; border: none; padding: 3px 4px; margin-bottom: 4px; border-radius: 5px; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 4px; transition: all 0.2s; color: #ccc;">
            <span class="menu-icon" style="font-size: 13px;">📅</span>
            <span class="menu-label" style="font-size: 10px; font-weight: 500;">Planowane</span>
          </button>
        </div>

        <!-- Column 2: Calendar Options (shown only for planned) -->
        <div class="menu-column" id="calendar-column" style="width: 120px; background: #2a2a2a; padding: 6px 4px; overflow-y: auto; flex-shrink: 0; border-right: 1px solid #1a1a1a; display: none;">
          <h3 class="column-title" style="color: #FFF; font-size: 9px; font-weight: 600; text-transform: uppercase; margin: 0 0 6px 0; padding: 4px; text-align: center; background: #1a1a1a; border-radius: 3px;">Widok</h3>
          <button class="calendar-view-item active" data-view="week" style="width: 100%; background: #3a3a3a; border: none; padding: 3px 4px; margin-bottom: 3px; border-radius: 4px; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 3px; transition: all 0.2s; color: #ccc;">
            <span class="menu-icon" style="font-size: 13px;">📅</span>
            <span class="menu-label" style="font-size: 9px; font-weight: 500;">Tygodnie</span>
          </button>
          <button class="calendar-view-item" data-view="month" style="width: 100%; background: #3a3a3a; border: none; padding: 3px 4px; margin-bottom: 3px; border-radius: 4px; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 3px; transition: all 0.2s; color: #ccc;">
            <span class="menu-icon" style="font-size: 13px;">🗓️</span>
            <span class="menu-label" style="font-size: 9px; font-weight: 500;">Miesiące</span>
          </button>
          <button class="calendar-view-item" data-view="year" style="width: 100%; background: #3a3a3a; border: none; padding: 3px 4px; margin-bottom: 3px; border-radius: 4px; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 3px; transition: all 0.2s; color: #ccc;">
            <span class="menu-icon" style="font-size: 13px;">📆</span>
            <span class="menu-label" style="font-size: 9px; font-weight: 500;">Lata</span>
          </button>
        </div>

        <!-- Main Content -->
        <div class="main-content" style="flex: 1; display: flex; flex-direction: column; background: white; overflow: hidden;">
          <div class="content-body" style="flex: 1; padding: 15px; overflow-y: auto;">
            <!-- Executed Reports -->
            <div id="executed-content" class="report-content active">
              <div class="reports-table-container">
                <!-- Search and Filters -->
                <div class="reports-search-section" style="background: #f8f9fa; padding: 1px; border-radius: 8px; margin-bottom: 15px;">
                  <div class="search-row" style="display: flex; gap: 10px; margin-bottom: 10px;">
                    <input type="text" id="reports-search" placeholder="Szukaj po urządzeniu, dacie, operatorze..." style="flex: 1; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 12px;">
                    <button id="reports-search-btn" style="padding: 8px 15px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">🔍 Szukaj</button>
                  </div>
                  <div class="filters-row" style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <select id="status-filter" style="padding: 6px; border: 1px solid #ddd; border-radius: 4px; font-size: 11px;">
                      <option value="">Wszystkie statusy</option>
                      <option value="success">✅ Pozytywne</option>
                      <option value="error">❌ Negatywne</option>
                      <option value="warning">⚠️ Ostrzeżenia</option>
                    </select>
                    <select id="device-filter" style="padding: 6px; border: 1px solid #ddd; border-radius: 4px; font-size: 11px;">
                      <option value="">Wszystkie urządzenia</option>
                      <option value="pss-7000">PSS-7000</option>
                      <option value="pss-5000">PSS-5000</option>
                      <option value="pss-3000">PSS-3000</option>
                    </select>
                    <select id="test-type-filter" style="padding: 6px; border: 1px solid #ddd; border-radius: 4px; font-size: 11px;">
                      <option value="">Wszystkie testy</option>
                      <option value="szczelnosc">Szczelność</option>
                      <option value="przeplyw">Przepływ</option>
                      <option value="funkcjonalny">Funkcjonalny</option>
                      <option value="kalibracja">Kalibracja</option>
                    </select>
                    <select id="date-filter" style="padding: 6px; border: 1px solid #ddd; border-radius: 4px; font-size: 11px;">
                      <option value="">Wszystkie daty</option>
                      <option value="today">Dzisiaj</option>
                      <option value="week">Ostatni tydzień</option>
                      <option value="month">Ostatni miesiąc</option>
                      <option value="custom">Niestandardowy zakres</option>
                    </select>
                    <input type="date" id="date-from" style="padding: 6px; border: 1px solid #ddd; border-radius: 4px; font-size: 11px; display: none;">
                    <input type="date" id="date-to" style="padding: 6px; border: 1px solid #ddd; border-radius: 4px; font-size: 11px; display: none;">
                  </div>
                </div>

                <!-- Reports Table -->
                <div class="reports-table-wrapper" style="background: white; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                  <table class="reports-table" style="width: 100%; border-collapse: collapse;">
                    <thead style="background: #f8f9fa;">
                      <tr>
                        <th style="padding: 12px 8px; text-align: left; font-size: 11px; font-weight: 600; color: #666; border-bottom: 1px solid #e0e0e0; cursor: pointer;" data-sort="date">📅 Data/Czas ↕</th>
                        <th style="padding: 12px 8px; text-align: left; font-size: 11px; font-weight: 600; color: #666; border-bottom: 1px solid #e0e0e0; cursor: pointer;" data-sort="device">📱 Urządzenie ↕</th>
                        <th style="padding: 12px 8px; text-align: left; font-size: 11px; font-weight: 600; color: #666; border-bottom: 1px solid #e0e0e0; cursor: pointer;" data-sort="test">🧪 Testy ↕</th>
                        <th style="padding: 12px 8px; text-align: left; font-size: 11px; font-weight: 600; color: #666; border-bottom: 1px solid #e0e0e0; cursor: pointer;" data-sort="operator">👤 Operator ↕</th>
                        <th style="padding: 12px 8px; text-align: left; font-size: 11px; font-weight: 600; color: #666; border-bottom: 1px solid #e0e0e0; cursor: pointer;" data-sort="status">✅ Status ↕</th>
                        <th style="padding: 12px 8px; text-align: center; font-size: 11px; font-weight: 600; color: #666; border-bottom: 1px solid #e0e0e0;">⚙️ Akcje</th>
                      </tr>
                    </thead>
                    <tbody id="reports-table-body">
                      <tr style="border-bottom: 1px solid #f0f0f0;">
                        <td style="padding: 10px 8px; font-size: 11px;">2025-10-08 17:30</td>
                        <td style="padding: 10px 8px; font-size: 11px; font-weight: 600;">PSS-7000 #12345</td>
                        <td style="padding: 10px 8px; font-size: 11px;">Szczelność, Przepływ, Funkcjonalny</td>
                        <td style="padding: 10px 8px; font-size: 11px;">Jan K.</td>
                        <td style="padding: 10px 8px;"><span style="background: #d4edda; color: #155724; padding: 3px 8px; border-radius: 4px; font-size: 10px;">✅ Pozytywny</span></td>
                        <td style="padding: 10px 8px; text-align: center;">
                          <button style="padding: 4px 8px; background: #007bff; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 10px; margin-right: 4px;">👁️ Pokaż</button>
                          <button style="padding: 4px 8px; background: #28a745; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 10px; margin-right: 4px;">📄 PDF</button>
                          <button style="padding: 4px 8px; background: #6c757d; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 10px;">📧 Wyślij</button>
                        </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #f0f0f0;">
                        <td style="padding: 10px 8px; font-size: 11px;">2025-10-08 16:15</td>
                        <td style="padding: 10px 8px; font-size: 11px; font-weight: 600;">PSS-5000 #67890</td>
                        <td style="padding: 10px 8px; font-size: 11px;">Szczelność</td>
                        <td style="padding: 10px 8px; font-size: 11px;">Anna N.</td>
                        <td style="padding: 10px 8px;"><span style="background: #f8d7da; color: #721c24; padding: 3px 8px; border-radius: 4px; font-size: 10px;">❌ Negatywny</span></td>
                        <td style="padding: 10px 8px; text-align: center;">
                          <button style="padding: 4px 8px; background: #007bff; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 10px; margin-right: 4px;">👁️ Pokaż</button>
                          <button style="padding: 4px 8px; background: #28a745; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 10px; margin-right: 4px;">📄 PDF</button>
                          <button style="padding: 4px 8px; background: #6c757d; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 10px;">📧 Wyślij</button>
                        </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #f0f0f0;">
                        <td style="padding: 10px 8px; font-size: 11px;">2025-10-08 15:45</td>
                        <td style="padding: 10px 8px; font-size: 11px; font-weight: 600;">PSS-3000 #11111</td>
                        <td style="padding: 10px 8px; font-size: 11px;">Kalibracja, Przepływ</td>
                        <td style="padding: 10px 8px; font-size: 11px;">Piotr W.</td>
                        <td style="padding: 10px 8px;"><span style="background: #fff3cd; color: #856404; padding: 3px 8px; border-radius: 4px; font-size: 10px;">⚠️ Ostrzeżenie</span></td>
                        <td style="padding: 10px 8px; text-align: center;">
                          <button style="padding: 4px 8px; background: #007bff; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 10px; margin-right: 4px;">👁️ Pokaż</button>
                          <button style="padding: 4px 8px; background: #28a745; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 10px; margin-right: 4px;">📄 PDF</button>
                          <button style="padding: 4px 8px; background: #6c757d; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 10px;">📧 Wyślij</button>
                        </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #f0f0f0;">
                        <td style="padding: 10px 8px; font-size: 11px;">2025-10-08 14:20</td>
                        <td style="padding: 10px 8px; font-size: 11px; font-weight: 600;">PSS-7000 #54321</td>
                        <td style="padding: 10px 8px; font-size: 11px;">Funkcjonalny</td>
                        <td style="padding: 10px 8px; font-size: 11px;">Jan K.</td>
                        <td style="padding: 10px 8px;"><span style="background: #d4edda; color: #155724; padding: 3px 8px; border-radius: 4px; font-size: 10px;">✅ Pozytywny</span></td>
                        <td style="padding: 10px 8px; text-align: center;">
                          <button style="padding: 4px 8px; background: #007bff; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 10px; margin-right: 4px;">👁️ Pokaż</button>
                          <button style="padding: 4px 8px; background: #28a745; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 10px; margin-right: 4px;">📄 PDF</button>
                          <button style="padding: 4px 8px; background: #6c757d; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 10px;">📧 Wyślij</button>
                        </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #f0f0f0;">
                        <td style="padding: 10px 8px; font-size: 11px;">2025-10-08 13:10</td>
                        <td style="padding: 10px 8px; font-size: 11px; font-weight: 600;">PSS-5000 #98765</td>
                        <td style="padding: 10px 8px; font-size: 11px;">Szczelność, Kalibracja</td>
                        <td style="padding: 10px 8px; font-size: 11px;">Anna N.</td>
                        <td style="padding: 10px 8px;"><span style="background: #d4edda; color: #155724; padding: 3px 8px; border-radius: 4px; font-size: 10px;">✅ Pozytywny</span></td>
                        <td style="padding: 10px 8px; text-align: center;">
                          <button style="padding: 4px 8px; background: #007bff; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 10px; margin-right: 4px;">👁️ Pokaż</button>
                          <button style="padding: 4px 8px; background: #28a745; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 10px; margin-right: 4px;">📄 PDF</button>
                          <button style="padding: 4px 8px; background: #6c757d; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 10px;">📧 Wyślij</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- Pagination -->
                <div class="reports-pagination" style="display: flex; justify-content: between; align-items: center; margin-top: 15px; padding: 10px; background: #f8f9fa; border-radius: 6px;">
                  <div class="pagination-info" style="font-size: 11px; color: #666;">
                    Pokazano 1-5 z 47 raportów
                  </div>
                  <div class="pagination-controls" style="display: flex; gap: 5px;">
                    <button style="padding: 6px 10px; background: #6c757d; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 10px;" disabled>⬅️ Poprzednia</button>
                    <button style="padding: 6px 10px; background: #007bff; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 10px;">1</button>
                    <button style="padding: 6px 10px; background: #f8f9fa; color: #333; border: 1px solid #ddd; border-radius: 3px; cursor: pointer; font-size: 10px;">2</button>
                    <button style="padding: 6px 10px; background: #f8f9fa; color: #333; border: 1px solid #ddd; border-radius: 3px; cursor: pointer; font-size: 10px;">3</button>
                    <button style="padding: 6px 10px; background: #007bff; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 10px;">Następna ➡️</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Planned Reports -->
            <div id="planned-content" class="report-content">
              <!-- Weekly Calendar -->
              <div id="week-view" class="calendar-view active">
                <div class="calendar-header" style="text-align: center; margin-bottom: 15px;">
                  <h4 style="margin: 0; color: #333;">📅 Widok Tygodniowy - Październik 2025</h4>
                </div>
                <div class="week-calendar" style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; background: #f0f0f0; padding: 10px; border-radius: 8px; max-height: 280px; overflow-y: auto;">
                  <!-- Tydzień 1 -->
                  <div class="day-header" style="background: #667eea; color: white; padding: 8px; text-align: center; font-size: 11px; font-weight: 600;">Pon</div>
                  <div class="day-header" style="background: #667eea; color: white; padding: 8px; text-align: center; font-size: 11px; font-weight: 600;">Wt</div>
                  <div class="day-header" style="background: #667eea; color: white; padding: 8px; text-align: center; font-size: 11px; font-weight: 600;">Śr</div>
                  <div class="day-header" style="background: #667eea; color: white; padding: 8px; text-align: center; font-size: 11px; font-weight: 600;">Czw</div>
                  <div class="day-header" style="background: #667eea; color: white; padding: 8px; text-align: center; font-size: 11px; font-weight: 600;">Pt</div>
                  <div class="day-header" style="background: #667eea; color: white; padding: 8px; text-align: center; font-size: 11px; font-weight: 600;">Sob</div>
                  <div class="day-header" style="background: #667eea; color: white; padding: 8px; text-align: center; font-size: 11px; font-weight: 600;">Ndz</div>
                  
                  <div class="day-cell" style="background: white; padding: 6px; min-height: 50px; border: 1px solid #ddd; font-size: 10px;"><span style="font-weight: 600;">7</span></div>
                  <div class="day-cell" style="background: white; padding: 6px; min-height: 50px; border: 1px solid #ddd; font-size: 10px;"><span style="font-weight: 600;">8</span><br><span style="font-size: 8px; color: #28a745;">🔧 Serwis</span></div>
                  <div class="day-cell" style="background: white; padding: 6px; min-height: 50px; border: 1px solid #ddd; font-size: 10px;"><span style="font-weight: 600;">9</span></div>
                  <div class="day-cell" style="background: white; padding: 6px; min-height: 50px; border: 1px solid #ddd; font-size: 10px;"><span style="font-weight: 600;">10</span><br><span style="font-size: 8px; color: #dc3545;">🧪 Test</span></div>
                  <div class="day-cell" style="background: white; padding: 6px; min-height: 50px; border: 1px solid #ddd; font-size: 10px;"><span style="font-weight: 600;">11</span></div>
                  <div class="day-cell" style="background: white; padding: 6px; min-height: 50px; border: 1px solid #ddd; font-size: 10px;"><span style="font-weight: 600;">12</span></div>
                  <div class="day-cell" style="background: white; padding: 6px; min-height: 50px; border: 1px solid #ddd; font-size: 10px;"><span style="font-weight: 600;">13</span></div>
                  
                  <!-- Tydzień 2 -->
                  <div class="day-cell" style="background: white; padding: 6px; min-height: 50px; border: 1px solid #ddd; font-size: 10px;"><span style="font-weight: 600;">14</span><br><span style="font-size: 8px; color: #17a2b8;">📋 Raport</span></div>
                  <div class="day-cell" style="background: white; padding: 6px; min-height: 50px; border: 1px solid #ddd; font-size: 10px;"><span style="font-weight: 600;">15</span></div>
                  <div class="day-cell" style="background: white; padding: 6px; min-height: 50px; border: 1px solid #ddd; font-size: 10px;"><span style="font-weight: 600;">16</span><br><span style="font-size: 8px; color: #28a745;">🔧 Serwis</span></div>
                  <div class="day-cell" style="background: white; padding: 6px; min-height: 50px; border: 1px solid #ddd; font-size: 10px;"><span style="font-weight: 600;">17</span></div>
                  <div class="day-cell" style="background: white; padding: 6px; min-height: 50px; border: 1px solid #ddd; font-size: 10px;"><span style="font-weight: 600;">18</span><br><span style="font-size: 8px; color: #dc3545;">🧪 Test</span></div>
                  <div class="day-cell" style="background: white; padding: 6px; min-height: 50px; border: 1px solid #ddd; font-size: 10px;"><span style="font-weight: 600;">19</span></div>
                  <div class="day-cell" style="background: white; padding: 6px; min-height: 50px; border: 1px solid #ddd; font-size: 10px;"><span style="font-weight: 600;">20</span></div>
                  
                  <!-- Tydzień 3 -->
                  <div class="day-cell" style="background: white; padding: 6px; min-height: 50px; border: 1px solid #ddd; font-size: 10px;"><span style="font-weight: 600;">21</span></div>
                  <div class="day-cell" style="background: white; padding: 6px; min-height: 50px; border: 1px solid #ddd; font-size: 10px;"><span style="font-weight: 600;">22</span><br><span style="font-size: 8px; color: #28a745;">🔧 Serwis</span></div>
                  <div class="day-cell" style="background: white; padding: 6px; min-height: 50px; border: 1px solid #ddd; font-size: 10px;"><span style="font-weight: 600;">23</span></div>
                  <div class="day-cell" style="background: white; padding: 6px; min-height: 50px; border: 1px solid #ddd; font-size: 10px;"><span style="font-weight: 600;">24</span><br><span style="font-size: 8px; color: #dc3545;">🧪 Test</span></div>
                  <div class="day-cell" style="background: white; padding: 6px; min-height: 50px; border: 1px solid #ddd; font-size: 10px;"><span style="font-weight: 600;">25</span></div>
                  <div class="day-cell" style="background: white; padding: 6px; min-height: 50px; border: 1px solid #ddd; font-size: 10px;"><span style="font-weight: 600;">26</span></div>
                  <div class="day-cell" style="background: white; padding: 6px; min-height: 50px; border: 1px solid #ddd; font-size: 10px;"><span style="font-weight: 600;">27</span></div>
                  
                  <!-- Tydzień 4 -->
                  <div class="day-cell" style="background: white; padding: 6px; min-height: 50px; border: 1px solid #ddd; font-size: 10px;"><span style="font-weight: 600;">28</span><br><span style="font-size: 8px; color: #17a2b8;">📋 Raport</span></div>
                  <div class="day-cell" style="background: white; padding: 6px; min-height: 50px; border: 1px solid #ddd; font-size: 10px;"><span style="font-weight: 600;">29</span></div>
                  <div class="day-cell" style="background: white; padding: 6px; min-height: 50px; border: 1px solid #ddd; font-size: 10px;"><span style="font-weight: 600;">30</span><br><span style="font-size: 8px; color: #28a745;">🔧 Serwis</span></div>
                  <div class="day-cell" style="background: white; padding: 6px; min-height: 50px; border: 1px solid #ddd; font-size: 10px;"><span style="font-weight: 600;">31</span></div>
                  <div class="day-cell" style="background: #f8f9fa; padding: 6px; min-height: 50px; border: 1px solid #ddd; font-size: 10px; color: #999;"><span>1</span></div>
                  <div class="day-cell" style="background: #f8f9fa; padding: 6px; min-height: 50px; border: 1px solid #ddd; font-size: 10px; color: #999;"><span>2</span></div>
                  <div class="day-cell" style="background: #f8f9fa; padding: 6px; min-height: 50px; border: 1px solid #ddd; font-size: 10px; color: #999;"><span>3</span></div>
                </div>
              </div>

              <!-- Monthly Tables -->
              <div id="month-view" class="calendar-view">
                <div class="calendar-header" style="text-align: center; margin-bottom: 15px;">
                  <h4 style="margin: 0; color: #333;">🗓️ Widok 3 Miesięcy - 2025</h4>
                </div>
                
                <!-- Three Month Tables Container -->
                <div class="three-months-container" style="display: flex; gap: 8px; justify-content: space-between;">
                
                  <!-- Previous Month -->
                  <div class="month-table" style="flex: 1; background: white; border: 1px solid #e0e0e0; border-radius: 6px; overflow: hidden;">
                    <div class="month-header" style="background: #f8f9fa; padding: 8px; text-align: center; font-size: 11px; font-weight: 600; color: #666;">
                      ← Wrzesień 2025
                    </div>
                    <table style="width: 100%; border-collapse: collapse;">
                      <thead>
                        <tr style="background: #f1f3f4;">
                          <th style="padding: 4px; font-size: 9px; font-weight: 500; color: #666;">Pn</th>
                          <th style="padding: 4px; font-size: 9px; font-weight: 500; color: #666;">Wt</th>
                          <th style="padding: 4px; font-size: 9px; font-weight: 500; color: #666;">Śr</th>
                          <th style="padding: 4px; font-size: 9px; font-weight: 500; color: #666;">Cz</th>
                          <th style="padding: 4px; font-size: 9px; font-weight: 500; color: #666;">Pt</th>
                          <th style="padding: 4px; font-size: 9px; font-weight: 500; color: #666;">Sb</th>
                          <th style="padding: 4px; font-size: 9px; font-weight: 500; color: #666;">Nd</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">1</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">2</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">3</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">4</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">5</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">6</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">7</td>
                        </tr>
                        <tr>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">8</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">9</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; position: relative;">10<div style="width: 3px; height: 3px; background: #28a745; border-radius: 50%; position: absolute; top: 2px; right: 2px;"></div></td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">11</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">12</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">13</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">14</td>
                        </tr>
                        <tr>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">15</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">16</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">17</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; position: relative;">18<div style="width: 3px; height: 3px; background: #dc3545; border-radius: 50%; position: absolute; top: 2px; right: 2px;"></div></td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">19</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">20</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">21</td>
                        </tr>
                        <tr>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">22</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">23</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">24</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; position: relative;">25<div style="width: 3px; height: 3px; background: #17a2b8; border-radius: 50%; position: absolute; top: 2px; right: 2px;"></div></td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">26</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">27</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">28</td>
                        </tr>
                        <tr>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">29</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">30</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; border: none;"></td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; border: none;"></td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; border: none;"></td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; border: none;"></td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; border: none;"></td>
                        </tr>
                      </tbody>
                    </table>
                    <div style="padding: 4px; font-size: 8px; text-align: center; background: #f8f9fa; color: #666;">3 zaplanowane</div>
                  </div>

                  <!-- Current Month -->
                  <div class="month-table" style="flex: 1; background: white; border: 2px solid #28a745; border-radius: 6px; overflow: hidden;">
                    <div class="month-header" style="background: #28a745; padding: 8px; text-align: center; font-size: 11px; font-weight: 600; color: white;">
                      Październik 2025 (Aktualny)
                    </div>
                    <table style="width: 100%; border-collapse: collapse;">
                      <thead>
                        <tr style="background: #f1f3f4;">
                          <th style="padding: 4px; font-size: 9px; font-weight: 500; color: #666;">Pn</th>
                          <th style="padding: 4px; font-size: 9px; font-weight: 500; color: #666;">Wt</th>
                          <th style="padding: 4px; font-size: 9px; font-weight: 500; color: #666;">Śr</th>
                          <th style="padding: 4px; font-size: 9px; font-weight: 500; color: #666;">Cz</th>
                          <th style="padding: 4px; font-size: 9px; font-weight: 500; color: #666;">Pt</th>
                          <th style="padding: 4px; font-size: 9px; font-weight: 500; color: #666;">Sb</th>
                          <th style="padding: 4px; font-size: 9px; font-weight: 500; color: #666;">Nd</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #ccc;"></td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #ccc;"></td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; font-weight: 600;">1</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; position: relative; font-weight: 600;">2<div style="width: 3px; height: 3px; background: #28a745; border-radius: 50%; position: absolute; top: 2px; right: 2px;"></div></td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; font-weight: 600;">3</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; font-weight: 600;">4</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; font-weight: 600;">5</td>
                        </tr>
                        <tr>
                          <td style="padding: 3px; font-size: 8px; text-align: center; font-weight: 600;">6</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; font-weight: 600;">7</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; position: relative; font-weight: 600; background: #fff3cd;">8<div style="width: 3px; height: 3px; background: #28a745; border-radius: 50%; position: absolute; top: 2px; right: 2px;"></div></td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; font-weight: 600;">9</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; position: relative; font-weight: 600;">10<div style="width: 3px; height: 3px; background: #dc3545; border-radius: 50%; position: absolute; top: 2px; right: 2px;"></div></td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; font-weight: 600;">11</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; font-weight: 600;">12</td>
                        </tr>
                        <tr>
                          <td style="padding: 3px; font-size: 8px; text-align: center; font-weight: 600;">13</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; position: relative; font-weight: 600;">14<div style="width: 3px; height: 3px; background: #17a2b8; border-radius: 50%; position: absolute; top: 2px; right: 2px;"></div></td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; font-weight: 600;">15</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; position: relative; font-weight: 600;">16<div style="width: 3px; height: 3px; background: #28a745; border-radius: 50%; position: absolute; top: 2px; right: 2px;"></div></td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; font-weight: 600;">17</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; font-weight: 600;">18</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; font-weight: 600;">19</td>
                        </tr>
                        <tr>
                          <td style="padding: 3px; font-size: 8px; text-align: center; font-weight: 600;">20</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; font-weight: 600;">21</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; position: relative; font-weight: 600;">22<div style="width: 3px; height: 3px; background: #28a745; border-radius: 50%; position: absolute; top: 2px; right: 2px;"></div></td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; font-weight: 600;">23</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; position: relative; font-weight: 600;">24<div style="width: 3px; height: 3px; background: #dc3545; border-radius: 50%; position: absolute; top: 2px; right: 2px;"></div></td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; font-weight: 600;">25</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; font-weight: 600;">26</td>
                        </tr>
                        <tr>
                          <td style="padding: 3px; font-size: 8px; text-align: center; font-weight: 600;">27</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; position: relative; font-weight: 600;">28<div style="width: 3px; height: 3px; background: #17a2b8; border-radius: 50%; position: absolute; top: 2px; right: 2px;"></div></td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; font-weight: 600;">29</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; position: relative; font-weight: 600;">30<div style="width: 3px; height: 3px; background: #28a745; border-radius: 50%; position: absolute; top: 2px; right: 2px;"></div></td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; font-weight: 600;">31</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; border: none;"></td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; border: none;"></td>
                        </tr>
                      </tbody>
                    </table>
                    <div style="padding: 4px; font-size: 8px; text-align: center; background: #d4edda; color: #155724; font-weight: 600;">7 zaplanowanych</div>
                  </div>

                  <!-- Next Month -->
                  <div class="month-table" style="flex: 1; background: white; border: 1px solid #e0e0e0; border-radius: 6px; overflow: hidden;">
                    <div class="month-header" style="background: #f8f9fa; padding: 8px; text-align: center; font-size: 11px; font-weight: 600; color: #666;">
                      Listopad 2025 →
                    </div>
                    <table style="width: 100%; border-collapse: collapse;">
                      <thead>
                        <tr style="background: #f1f3f4;">
                          <th style="padding: 4px; font-size: 9px; font-weight: 500; color: #666;">Pn</th>
                          <th style="padding: 4px; font-size: 9px; font-weight: 500; color: #666;">Wt</th>
                          <th style="padding: 4px; font-size: 9px; font-weight: 500; color: #666;">Śr</th>
                          <th style="padding: 4px; font-size: 9px; font-weight: 500; color: #666;">Cz</th>
                          <th style="padding: 4px; font-size: 9px; font-weight: 500; color: #666;">Pt</th>
                          <th style="padding: 4px; font-size: 9px; font-weight: 500; color: #666;">Sb</th>
                          <th style="padding: 4px; font-size: 9px; font-weight: 500; color: #666;">Nd</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;"></td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;"></td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;"></td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;"></td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;"></td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">1</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">2</td>
                        </tr>
                        <tr>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">3</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">4</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; position: relative;">5<div style="width: 3px; height: 3px; background: #28a745; border-radius: 50%; position: absolute; top: 2px; right: 2px;"></div></td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">6</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">7</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">8</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">9</td>
                        </tr>
                        <tr>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">10</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">11</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; position: relative;">12<div style="width: 3px; height: 3px; background: #dc3545; border-radius: 50%; position: absolute; top: 2px; right: 2px;"></div></td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">13</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">14</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; position: relative;">15<div style="width: 3px; height: 3px; background: #17a2b8; border-radius: 50%; position: absolute; top: 2px; right: 2px;"></div></td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">16</td>
                        </tr>
                        <tr>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">17</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; position: relative;">18<div style="width: 3px; height: 3px; background: #28a745; border-radius: 50%; position: absolute; top: 2px; right: 2px;"></div></td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">19</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">20</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">21</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">22</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">23</td>
                        </tr>
                        <tr>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">24</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">25</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">26</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">27</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">28</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">29</td>
                          <td style="padding: 3px; font-size: 8px; text-align: center; color: #999;">30</td>
                        </tr>
                      </tbody>
                    </table>
                    <div style="padding: 4px; font-size: 8px; text-align: center; background: #f8f9fa; color: #666;">4 zaplanowane</div>
                  </div>
                  
                </div>
                
                <div style="margin-top: 10px; font-size: 10px; text-align: center;">
                  <span style="color: #28a745;">● Serwis</span> | 
                  <span style="color: #dc3545;">● Test</span> | 
                  <span style="color: #17a2b8;">● Raport</span>
                </div>
              </div>

              <!-- Yearly Calendar -->
              <div id="year-view" class="calendar-view">
                <div class="calendar-header" style="text-align: center; margin-bottom: 15px;">
                  <h4 style="margin: 0; color: #333;">📆 Widok Roczny - 2025</h4>
                </div>
                <div class="year-months-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; max-height: 280px; overflow-y: auto;">
                  <div class="month-mini-card" style="background: white; border: 1px solid #ddd; padding: 10px; text-align: center; border-radius: 6px;">
                    <div style="font-weight: 600; font-size: 11px; margin-bottom: 5px; color: #333;">Styczeń</div>
                    <div style="font-size: 9px; color: #28a745; margin-bottom: 3px;">5 zaplanowanych</div>
                    <div style="display: flex; justify-content: center; gap: 1px; flex-wrap: wrap;">
                      <div style="width: 4px; height: 4px; background: #28a745; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #dc3545; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #28a745; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #17a2b8; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #28a745; margin: 0.5px;"></div>
                    </div>
                  </div>
                  <div class="month-mini-card" style="background: white; border: 1px solid #ddd; padding: 10px; text-align: center; border-radius: 6px;">
                    <div style="font-weight: 600; font-size: 11px; margin-bottom: 5px; color: #333;">Luty</div>
                    <div style="font-size: 9px; color: #17a2b8; margin-bottom: 3px;">3 zaplanowane</div>
                    <div style="display: flex; justify-content: center; gap: 1px; flex-wrap: wrap;">
                      <div style="width: 4px; height: 4px; background: #dc3545; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #28a745; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #17a2b8; margin: 0.5px;"></div>
                    </div>
                  </div>
                  <div class="month-mini-card" style="background: white; border: 1px solid #ddd; padding: 10px; text-align: center; border-radius: 6px;">
                    <div style="font-weight: 600; font-size: 11px; margin-bottom: 5px; color: #333;">Marzec</div>
                    <div style="font-size: 9px; color: #28a745; margin-bottom: 3px;">7 zaplanowanych</div>
                    <div style="display: flex; justify-content: center; gap: 1px; flex-wrap: wrap;">
                      <div style="width: 4px; height: 4px; background: #28a745; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #28a745; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #dc3545; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #28a745; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #17a2b8; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #28a745; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #dc3545; margin: 0.5px;"></div>
                    </div>
                  </div>
                  <div class="month-mini-card" style="background: white; border: 1px solid #ddd; padding: 10px; text-align: center; border-radius: 6px;">
                    <div style="font-weight: 600; font-size: 11px; margin-bottom: 5px; color: #333;">Kwiecień</div>
                    <div style="font-size: 9px; color: #6c757d; margin-bottom: 3px;">2 zaplanowane</div>
                    <div style="display: flex; justify-content: center; gap: 1px; flex-wrap: wrap;">
                      <div style="width: 4px; height: 4px; background: #28a745; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #17a2b8; margin: 0.5px;"></div>
                    </div>
                  </div>
                  <div class="month-mini-card" style="background: white; border: 1px solid #ddd; padding: 10px; text-align: center; border-radius: 6px;">
                    <div style="font-weight: 600; font-size: 11px; margin-bottom: 5px; color: #333;">Maj</div>
                    <div style="font-size: 9px; color: #28a745; margin-bottom: 3px;">6 zaplanowanych</div>
                    <div style="display: flex; justify-content: center; gap: 1px; flex-wrap: wrap;">
                      <div style="width: 4px; height: 4px; background: #28a745; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #dc3545; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #28a745; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #28a745; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #17a2b8; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #28a745; margin: 0.5px;"></div>
                    </div>
                  </div>
                  <div class="month-mini-card" style="background: white; border: 1px solid #ddd; padding: 10px; text-align: center; border-radius: 6px;">
                    <div style="font-weight: 600; font-size: 11px; margin-bottom: 5px; color: #333;">Czerwiec</div>
                    <div style="font-size: 9px; color: #17a2b8; margin-bottom: 3px;">4 zaplanowane</div>
                    <div style="display: flex; justify-content: center; gap: 1px; flex-wrap: wrap;">
                      <div style="width: 4px; height: 4px; background: #dc3545; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #28a745; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #28a745; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #17a2b8; margin: 0.5px;"></div>
                    </div>
                  </div>
                  <div class="month-mini-card" style="background: white; border: 1px solid #ddd; padding: 10px; text-align: center; border-radius: 6px;">
                    <div style="font-weight: 600; font-size: 11px; margin-bottom: 5px; color: #333;">Lipiec</div>
                    <div style="font-size: 9px; color: #28a745; margin-bottom: 3px;">8 zaplanowanych</div>
                    <div style="display: flex; justify-content: center; gap: 1px; flex-wrap: wrap;">
                      <div style="width: 4px; height: 4px; background: #28a745; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #28a745; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #dc3545; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #28a745; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #28a745; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #17a2b8; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #28a745; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #dc3545; margin: 0.5px;"></div>
                    </div>
                  </div>
                  <div class="month-mini-card" style="background: white; border: 1px solid #ddd; padding: 10px; text-align: center; border-radius: 6px;">
                    <div style="font-weight: 600; font-size: 11px; margin-bottom: 5px; color: #333;">Sierpień</div>
                    <div style="font-size: 9px; color: #6c757d; margin-bottom: 3px;">3 zaplanowane</div>
                    <div style="display: flex; justify-content: center; gap: 1px; flex-wrap: wrap;">
                      <div style="width: 4px; height: 4px; background: #28a745; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #17a2b8; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #28a745; margin: 0.5px;"></div>
                    </div>
                  </div>
                  <div class="month-mini-card" style="background: white; border: 1px solid #ddd; padding: 10px; text-align: center; border-radius: 6px;">
                    <div style="font-weight: 600; font-size: 11px; margin-bottom: 5px; color: #333;">Wrzesień</div>
                    <div style="font-size: 9px; color: #28a745; margin-bottom: 3px;">5 zaplanowanych</div>
                    <div style="display: flex; justify-content: center; gap: 1px; flex-wrap: wrap;">
                      <div style="width: 4px; height: 4px; background: #dc3545; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #28a745; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #28a745; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #17a2b8; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #28a745; margin: 0.5px;"></div>
                    </div>
                  </div>
                  <div class="month-mini-card" style="background: white; border: 1px solid #ddd; padding: 10px; text-align: center; border-radius: 6px; border: 2px solid #667eea;">
                    <div style="font-weight: 600; font-size: 11px; margin-bottom: 5px; color: #667eea;">Październik</div>
                    <div style="font-size: 9px; color: #28a745; margin-bottom: 3px;">9 zaplanowanych</div>
                    <div style="display: flex; justify-content: center; gap: 1px; flex-wrap: wrap;">
                      <div style="width: 4px; height: 4px; background: #28a745; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #dc3545; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #28a745; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #28a745; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #17a2b8; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #28a745; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #dc3545; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #28a745; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #17a2b8; margin: 0.5px;"></div>
                    </div>
                  </div>
                  <div class="month-mini-card" style="background: white; border: 1px solid #ddd; padding: 10px; text-align: center; border-radius: 6px;">
                    <div style="font-weight: 600; font-size: 11px; margin-bottom: 5px; color: #333;">Listopad</div>
                    <div style="font-size: 9px; color: #17a2b8; margin-bottom: 3px;">4 zaplanowane</div>
                    <div style="display: flex; justify-content: center; gap: 1px; flex-wrap: wrap;">
                      <div style="width: 4px; height: 4px; background: #28a745; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #28a745; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #dc3545; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #17a2b8; margin: 0.5px;"></div>
                    </div>
                  </div>
                  <div class="month-mini-card" style="background: white; border: 1px solid #ddd; padding: 10px; text-align: center; border-radius: 6px;">
                    <div style="font-weight: 600; font-size: 11px; margin-bottom: 5px; color: #333;">Grudzień</div>
                    <div style="font-size: 9px; color: #6c757d; margin-bottom: 3px;">2 zaplanowane</div>
                    <div style="display: flex; justify-content: center; gap: 1px; flex-wrap: wrap;">
                      <div style="width: 4px; height: 4px; background: #28a745; margin: 0.5px;"></div>
                      <div style="width: 4px; height: 4px; background: #17a2b8; margin: 0.5px;"></div>
                    </div>
                  </div>
                </div>
                <div style="margin-top: 10px; font-size: 10px; text-align: center;">
                  <span style="color: #28a745;">● Serwis</span> | 
                  <span style="color: #dc3545;">● Test</span> | 
                  <span style="color: #17a2b8;">● Raport</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <style>
      .report-type-item:hover, .calendar-view-item:hover { background: #4a4a4a !important; color: white !important; }
      .report-type-item.active, .calendar-view-item.active { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important; color: white !important; }
      .report-content { display: none; }
      .report-content.active { display: block; }
      .calendar-view { display: none; }
      .calendar-view.active { display: block; }
    </style>
  `;
  
  // Update top-bar title
  const topBarTitle = document.getElementById('top-bar-section-title');
  if (topBarTitle) topBarTitle.textContent = 'Raporty - Wykonane';
  
  // Add event listeners
  const reportTypeButtons = container.querySelectorAll('.report-type-item');
  const calendarViewButtons = container.querySelectorAll('.calendar-view-item');
  const calendarColumn = container.querySelector('#calendar-column') as HTMLElement;
  
  reportTypeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLElement;
      const type = target.getAttribute('data-type');
      
      // Update active button
      reportTypeButtons.forEach(b => b.classList.remove('active'));
      target.classList.add('active');
      
      // Show/hide content
      container.querySelectorAll('.report-content').forEach(content => {
        content.classList.remove('active');
      });
      const activeContent = container.querySelector(`#${type}-content`);
      if (activeContent) activeContent.classList.add('active');
      
      // Show calendar column for planned
      if (calendarColumn) {
        calendarColumn.style.display = type === 'planned' ? 'block' : 'none';
      }
      
      // Update title
      const titles = { executed: 'Wykonane', planned: 'Planowane' };
      if (topBarTitle) topBarTitle.textContent = `Raporty - ${titles[type as keyof typeof titles]}`;
    });
  });
  
  calendarViewButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLElement;
      const view = target.getAttribute('data-view');
      
      // Update active button
      calendarViewButtons.forEach(b => b.classList.remove('active'));
      target.classList.add('active');
      
      // Show/hide calendar views
      container.querySelectorAll('.calendar-view').forEach(viewEl => {
        viewEl.classList.remove('active');
      });
      const activeView = container.querySelector(`#${view}-view`);
      if (activeView) activeView.classList.add('active');
    });
  });
  
}

function showErrorUI(error: unknown): void {
  const message = error instanceof Error ? error.message : String(error);
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error';
  errorDiv.innerHTML = `
    <h3>Application Failed to Start</h3>
    <p>${message}</p>
    <p>Check the console for more details.</p>
  `;
  
  const app = document.getElementById('app');
  if (app) {
    app.appendChild(errorDiv);
  } else {
    document.body.appendChild(errorDiv);
  }
}

// Start the application
initializeApp();
