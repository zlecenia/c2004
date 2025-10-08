// frontend/src/main.ts
import './config/env.config'; // Validate environment on startup
import './config/service.manifest'; // Validate service manifest
import { moduleManager } from './modules';
import { serviceManifest } from './config/service.manifest';

// Add basic CSS
const style = document.createElement('style');
style.textContent = `
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f5f5f5;
  }
  
  .identification-container {
    max-width: 600px;
    margin: 0 auto;
    background: white;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
  
  .identification-container h2 {
    color: #333;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .identification-form {
    margin-bottom: 30px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
    color: #555;
  }
  
  .form-group input,
  .form-group select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    box-sizing: border-box;
  }
  
  .identify-button {
    width: 100%;
    padding: 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .identify-button:hover:not(:disabled) {
    background-color: #0056b3;
  }
  
  .identify-button:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
  
  .result-container {
    min-height: 50px;
  }
  
  .success {
    background-color: #d4edda;
    color: #155724;
    padding: 15px;
    border-radius: 4px;
    border: 1px solid #c3e6cb;
  }
  
  .success h3 {
    margin-top: 0;
    margin-bottom: 10px;
  }
  
  .success p {
    margin: 5px 0;
  }
  
  .error {
    background-color: #f8d7da;
    color: #721c24;
    padding: 15px;
    border-radius: 4px;
    border: 1px solid #f5c6cb;
  }

  /* New Main App Styles */
  .main-app-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .app-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 20px;
    text-align: center;
  }

  .app-header h1 {
    margin: 0 0 10px 0;
    font-size: 2rem;
  }

  .app-header p {
    margin: 0;
    opacity: 0.9;
  }

  .navigation-menu {
    background: #f8f9fa;
    padding: 10px 20px;
    border-bottom: 1px solid #dee2e6;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .nav-btn {
    padding: 10px 20px;
    border: 1px solid #dee2e6;
    background: white;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s;
  }

  .nav-btn:hover {
    background: #e9ecef;
    border-color: #adb5bd;
  }

  .nav-btn.active {
    background: #007bff;
    color: white;
    border-color: #007bff;
  }

  .module-container {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
  }

  .app-footer {
    background: #f8f9fa;
    border-top: 1px solid #dee2e6;
    padding: 10px 20px;
  }

  .status-info {
    display: flex;
    gap: 20px;
    font-size: 0.9rem;
    color: #6c757d;
  }

  .loading {
    text-align: center;
    padding: 40px;
    font-size: 1.1rem;
    color: #6c757d;
  }

  /* Demo styles */
  .connect-filter-demo,
  .connect-workshop-demo {
    max-width: 800px;
    margin: 0 auto;
  }

  .demo-features {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    margin: 20px 0;
  }

  .demo-config {
    background: #fff3cd;
    padding: 20px;
    border-radius: 8px;
    margin: 20px 0;
  }

  .demo-config pre {
    background: white;
    padding: 15px;
    border-radius: 4px;
    border: 1px solid #ffeaa7;
    max-height: 200px;
    overflow-y: auto;
  }

  .demo-test {
    background: #d4edda;
    padding: 20px;
    border-radius: 8px;
    margin: 20px 0;
  }

  .alert {
    padding: 15px;
    border-radius: 4px;
    margin: 15px 0;
  }

  .alert-success {
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }

  .alert-info {
    background: #d1ecf1;
    color: #0c5460;
    border: 1px solid #bee5eb;
  }

  .alert-danger {
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  }

  details {
    margin-top: 10px;
  }

  summary {
    cursor: pointer;
    font-weight: 500;
    padding: 5px;
    background: rgba(255,255,255,0.5);
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    .status-info {
      flex-direction: column;
      gap: 5px;
    }
    
    .navigation-menu {
      flex-direction: column;
    }
    
    .nav-btn {
      text-align: left;
    }
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
    <div class="app-header">
      <h1>🚀 Fleet Management System v2.0</h1>
      <p>Migrated Components from c2002 with Executable Manifests</p>
    </div>
    
    <div class="navigation-menu">
      <button class="nav-btn active" data-module="identification">
        🔍 Identification Service
      </button>
      <button class="nav-btn" data-module="connect-id">
        🏷 ConnectID (Migrated)
      </button>
      <button class="nav-btn" data-module="connect-filter">
        🔎 ConnectFilter (Migrated)
      </button>
      <button class="nav-btn" data-module="connect-workshop">
        🔧 ConnectWorkshop (Migrated)
      </button>
    </div>
    
    <div class="module-container" id="module-container">
      <!-- Module content will be rendered here -->
    </div>
    
    <div class="app-footer">
      <div class="status-info">
        <span>📊 Modules: <span id="module-count">4</span></span>
        <span>✅ Status: All modules loaded</span>
        <span>🕒 Loaded: <span id="load-time">${new Date().toLocaleTimeString()}</span></span>
      </div>
    </div>
  `;
  
  app.innerHTML = '';
  app.appendChild(mainContainer);
  
  // Setup navigation
  setupNavigation();
  
  // Load default module (identification)
  loadModule('identification');
}

function setupNavigation() {
  const navButtons = document.querySelectorAll('.nav-btn');
  
  navButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
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
      case 'identification':
        loadIdentificationModule(container);
        break;
      case 'connect-id':
        loadConnectIdModule(container);
        break;
      case 'connect-filter':
        loadConnectFilterModule(container);
        break;
      case 'connect-workshop':
        loadConnectWorkshopModule(container);
        break;
      default:
        container.innerHTML = `<div class="error">Unknown module: ${moduleName}</div>`;
    }
  } catch (error) {
    container.innerHTML = `<div class="error">Failed to load ${moduleName}: ${error}</div>`;
  }
}

function loadIdentificationModule(container: HTMLElement) {
  import('./modules/identification/identification.module').then(async () => {
    const module = moduleManager.getModule('identification');
    const { IdentificationView } = await import('./modules/identification/identification.view');
    const view = new IdentificationView(module as any);
    
    container.innerHTML = '';
    container.appendChild(view.render());
  }).catch(error => {
    container.innerHTML = `<div class="error">Failed to load Identification module: ${error}</div>`;
  });
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
  import('./modules/connect-filter/connect-filter.module').then(async () => {
    const module = moduleManager.getModule('connect-filter');
    const { ConnectFilterView } = await import('./modules/connect-filter/connect-filter.view');
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
  // Create simple demo view for ConnectWorkshop
  container.innerHTML = `
    <div class="connect-workshop-demo">
      <h2>🔧 ConnectWorkshop - Workshop Client</h2>
      <p><strong>Status:</strong> ✅ Successfully migrated from c2002</p>
      
      <div class="demo-features">
        <h3>📋 Migrated Features:</h3>
        <ul>
          <li>✅ Workshop request management</li>
          <li>✅ Transport list handling</li>
          <li>✅ Auto-sync with server</li>
          <li>✅ Real-time status updates</li>
          <li>✅ Multi-tab interface (requests, transport, dispositions, service)</li>
        </ul>
      </div>
      
      <div class="demo-config">
        <h3>⚙️ Current Configuration:</h3>
        <pre>${JSON.stringify(serviceManifest.getComponentConfig('connect-workshop'), null, 2)}</pre>
      </div>
      
      <div class="demo-test">
        <h3>🧪 Test Module:</h3>
        <button id="test-workshop" class="btn btn-primary">Test Workshop Functions</button>
        <button id="force-sync" class="btn btn-secondary">Force Sync</button>
        <div id="workshop-results" class="mt-3"></div>
      </div>
    </div>
  `;
  
  // Add test functionality
  const testBtn = container.querySelector('#test-workshop');
  const syncBtn = container.querySelector('#force-sync');
  const resultsDiv = container.querySelector('#workshop-results');
  
  testBtn?.addEventListener('click', async () => {
    const module = moduleManager.getModule('connect-workshop');
    const service = (module as any).getService();
    
    const requests = service.getRequests();
    const stats = service.getStatistics();
    
    if (resultsDiv) {
      resultsDiv.innerHTML = `
        <div class="alert alert-info">
          <h4>Workshop Data:</h4>
          <p><strong>Statistics:</strong> ${JSON.stringify(stats)}</p>
          <p><strong>Recent Requests:</strong> ${requests.length} items</p>
          <details>
            <summary>Show request data</summary>
            <pre>${JSON.stringify(requests, null, 2)}</pre>
          </details>
        </div>
      `;
    }
  });
  
  syncBtn?.addEventListener('click', async () => {
    const module = moduleManager.getModule('connect-workshop');
    const service = (module as any).getService();
    
    try {
      await service.forceSync();
      if (resultsDiv) {
        resultsDiv.innerHTML = `
          <div class="alert alert-success">
            <h4>Sync Completed!</h4>
            <p>Status: ${JSON.stringify(service.getSyncStatus())}</p>
          </div>
        `;
      }
    } catch (error) {
      if (resultsDiv) {
        resultsDiv.innerHTML = `
          <div class="alert alert-danger">
            <h4>Sync Failed</h4>
            <p>Error: ${error}</p>
          </div>
        `;
      }
    }
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
