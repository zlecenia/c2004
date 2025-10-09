// frontend/src/main.ts
import './config/env.config'; // Validate environment on startup
import './config/service.manifest'; // Validate service manifest
import { moduleManager } from './modules';

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

  .sidebar-navigation {
    width: 120px;
    background: #2a2a2a;
    display: flex;
    flex-direction: column;
    padding: 4px;
    gap: 2px;
    box-shadow: 2px 0 4px rgba(0,0,0,0.2);
    flex-shrink: 0;
  }

  .sidebar-title {
    color: #FFF;
    font-size: 9px;
    font-weight: 600;
    text-transform: uppercase;
    margin: 0 0 6px 0;
    padding: 4px;
    text-align: center;
    background: #1a1a1a;
    border-radius: 3px;
  }

  .nav-btn {
    background: #3a3a3a;
    border: none;
    padding: 5px 6px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 12px;
    transition: all 0.2s;
    text-align: center;
    color: #ccc;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    user-select: none;
  }

  .nav-icon {
    font-size: 16px;
  }

  .nav-text {
    font-size: 10px;
    font-weight: 500;
  }

  .nav-btn:hover {
    background: #4a4a4a;
    color: white;
  }

  .nav-btn.active {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 2px 6px rgba(102, 126, 234, 0.4);
  }

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
`;
document.head.appendChild(style);

async function initializeApp() {
  try {
    console.log('🚀 Starting Fleet Management System with migrated components...');
    
    // Initialize all modules
    await moduleManager.initializeAll();
    
    // Create main application with navigation
    createMainApplication();
    
    console.log('✅ Application initialized successfully');
    
  } catch (error) {
    console.error('❌ Failed to initialize application:', error);
    showErrorUI(error);
  }
}

function createMainApplication() {
  const app = document.getElementById('app') || document.body;
  
  const mainContainer = document.createElement('div');
  mainContainer.className = 'main-app-container';
  
  mainContainer.innerHTML = `
    <div class="top-bar">
      <div class="top-bar-brand">🚀 ConnectDisplay</div>
      <div class="top-bar-submenu" id="top-bar-submenu"></div>
      <div class="top-bar-section-title" id="top-bar-section-title"></div>
      <div class="top-bar-status">
        <span>📊 <span id="module-count">4</span></span>
        <span>✅</span>
        <span>🕒 <span id="load-time">${new Date().toLocaleTimeString()}</span></span>
      </div>
    </div>
    
    <div class="app-layout">
      <div class="sidebar-navigation">
        <h3 class="sidebar-title">Główne menu</h3>
        <button class="nav-btn active" data-module="connect-id">
          <span class="nav-icon">🏷</span>
          <span class="nav-text">ConnectID</span>
        </button>
        <button class="nav-btn" data-module="connect-data">
          <span class="nav-icon">🔎</span>
          <span class="nav-text">ConnectFilter</span>
        </button>
        <button class="nav-btn" data-module="connect-workshop">
          <span class="nav-icon">🔧</span>
          <span class="nav-text">Workshop</span>
        </button>
        <button class="nav-btn" data-module="connect-test">
          <span class="nav-icon">🧪</span>
          <span class="nav-text">ConnectTest</span>
        </button>
      </div>
      
      <div class="module-container" id="module-container">
        <!-- Module content will be rendered here -->
      </div>
    </div>
  `;
  
  app.innerHTML = '';
  app.appendChild(mainContainer);
  
  // Setup navigation
  setupNavigation();
  
  // Load default module (connect-id)
  loadModule('connect-id');
}

function setupNavigation() {
  const navButtons = document.querySelectorAll('.nav-btn');
  
  navButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLElement;
      const moduleName = target.getAttribute('data-module');
      
      if (moduleName) {
        // Update active button
        navButtons.forEach(btn => btn.classList.remove('active'));
        target.classList.add('active');
        
        // Load module
        loadModule(moduleName);
      }
    });
  });
}

function loadModule(moduleName: string) {
  const container = document.getElementById('module-container');
  if (!container) return;
  
  try {
    // Clear container
    container.innerHTML = '<div class="loading">Loading module...</div>';
    
    switch (moduleName) {
      case 'connect-id':
        loadConnectIdModule(container);
        break;
      case 'connect-data':
        loadConnectFilterModule(container);
        break;
      case 'connect-workshop':
        loadConnectWorkshopModule(container);
        break;
      case 'connect-test':
        loadConnectTestModule(container);
        break;
      default:
        container.innerHTML = `<div class="error">Unknown module: ${moduleName}</div>`;
    }
  } catch (error) {
    container.innerHTML = `<div class="error">Failed to load ${moduleName}: ${error}</div>`;
  }
}


function loadConnectIdModule(container: HTMLElement) {
  import('./modules/connect-id/connect-id.module').then(async () => {
    const module = moduleManager.getModule('connect-id');
    const { ConnectIdView } = await import('./modules/connect-id/connect-id.view');
    const view = new ConnectIdView(module as any);
    
    container.innerHTML = '';
    const viewElement = view.render();
    container.appendChild(viewElement);
    
    // Trigger initialization after DOM is in place
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('connectid:dom-ready'));
    }, 50);
  }).catch(error => {
    container.innerHTML = `<div class="error">Failed to load ConnectID module: ${error}</div>`;
  });
}

function loadConnectFilterModule(container: HTMLElement) {
  import('./modules/connect-data/connect-data.module').then(async () => {
    const module = moduleManager.getModule('connect-data');
    const { ConnectFilterView } = await import('./modules/connect-data/connect-data.view');
    const view = new ConnectFilterView(module as any);
    
    container.innerHTML = '';
    const viewElement = view.render();
    container.appendChild(viewElement);
    
    console.log('✅ ConnectFilter view loaded with full functionality');
  }).catch(error => {
    container.innerHTML = `<div class="error">Failed to load ConnectFilter module: ${error}</div>`;
  });
}

function loadConnectWorkshopModule(container: HTMLElement) {
  import('./modules/connect-workshop/connect-workshop.module').then(async () => {
    const module = moduleManager.getModule('connect-workshop');
    const { ConnectWorkshopView } = await import('./modules/connect-workshop/connect-workshop.view');
    const view = new ConnectWorkshopView(module as any);
    
    container.innerHTML = '';
    const viewElement = view.render();
    container.appendChild(viewElement);
    
    console.log('✅ ConnectWorkshop view loaded with full functionality');
  }).catch(error => {
    container.innerHTML = `<div class="error">Failed to load ConnectWorkshop module: ${error}</div>`;
  });
}

function loadConnectTestModule(container: HTMLElement) {
  import('./modules/connect-test/connect-test.module').then(async () => {
    const module = moduleManager.getModule('connect-test');
    const { ConnectTestView } = await import('./modules/connect-test/connect-test.view');
    const view = new ConnectTestView(module as any);
    
    container.innerHTML = '';
    const viewElement = view.render();
    container.appendChild(viewElement);
    
    console.log('✅ ConnectTest view loaded with full functionality');
  }).catch(error => {
    container.innerHTML = `<div class="error">Failed to load ConnectTest module: ${error}</div>`;
  });
}

function showErrorUI(error: any) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error';
  errorDiv.innerHTML = `
    <h3>Application Failed to Start</h3>
    <p>${error}</p>
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
