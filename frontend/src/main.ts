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
    padding: 10px 6px;
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
        <span>📊 <span id="module-count">6</span></span>
        <span>✅</span>
        <span>🕒 <span id="load-time">${new Date().toLocaleTimeString()}</span></span>
      </div>
    </div>
    
    <div class="app-layout">
      <div class="sidebar-navigation">
        <h3 class="sidebar-title">Główne menu</h3>
        <button class="nav-btn active" data-module="connect-id" data-type="user">
          <span class="nav-icon">👤</span>
          <span class="nav-text">Użytkownik</span>
        </button>
        <button class="nav-btn" data-module="connect-id" data-type="device">
          <span class="nav-icon">📱</span>
          <span class="nav-text">Urządzenie</span>
        </button>
        <button class="nav-btn" data-module="connect-id" data-type="test">
          <span class="nav-icon">🧪</span>
          <span class="nav-text">Typ Testu</span>
        </button>
        <button class="nav-btn" data-module="connect-filter">
          <span class="nav-icon">📊</span>
          <span class="nav-text">ConnectData</span>
        </button>
        <button class="nav-btn" data-module="connect-workshop">
          <span class="nav-icon">🔧</span>
          <span class="nav-text">ConnectWorkshop</span>
        </button>
        <button class="nav-btn" data-module="connect-reports">
          <span class="nav-icon">📋</span>
          <span class="nav-text">Raporty</span>
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
  
  // Load default module (connect-id with user type)
  loadModule('connect-id', 'user');
}

function setupNavigation() {
  const navButtons = document.querySelectorAll('.nav-btn');
  
  navButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLElement;
      const moduleName = target.getAttribute('data-module');
      const moduleType = target.getAttribute('data-type');
      
      if (moduleName) {
        // Update active button
        navButtons.forEach(btn => btn.classList.remove('active'));
        target.classList.add('active');
        
        // Load module with type
        loadModule(moduleName, moduleType);
      }
    });
  });
}

function loadModule(moduleName: string, moduleType?: string | null) {
  const container = document.getElementById('module-container');
  if (!container) return;
  
  try {
    // Clear container
    container.innerHTML = '<div class="loading">Loading module...</div>';
    
    switch (moduleName) {
      case 'connect-id':
        loadConnectIdModule(container, moduleType || 'user');
        break;
      case 'connect-filter':
        loadConnectDataModule(container);
        break;
      case 'connect-workshop':
        loadConnectWorkshopModule(container);
        break;
      case 'connect-reports':
        loadConnectReportsModule(container);
        break;
      default:
        container.innerHTML = `<div class="error">Unknown module: ${moduleName}</div>`;
    }
  } catch (error) {
    container.innerHTML = `<div class="error">Failed to load ${moduleName}: ${error}</div>`;
  }
}


function loadConnectIdModule(container: HTMLElement, type: string = 'user') {
  import('./modules/connect-id/connect-id.module').then(async () => {
    const module = moduleManager.getModule('connect-id');
    const { ConnectIdView } = await import('./modules/connect-id/connect-id.view');
    const view = new ConnectIdView(module as any);
    
    container.innerHTML = '';
    const viewElement = view.render();
    container.appendChild(viewElement);
    
    // Set the type directly after render
    setTimeout(() => {
      view.setInitialType(type);
      window.dispatchEvent(new CustomEvent('connectid:dom-ready'));
    }, 50);
  }).catch(error => {
    container.innerHTML = `<div class="error">Failed to load ConnectID module: ${error}</div>`;
  });
}

function loadConnectDataModule(container: HTMLElement) {
  import('./modules/connect-filter/connect-filter.module').then(async () => {
    const module = moduleManager.getModule('connect-filter');
    const { ConnectDataView } = await import('./modules/connect-filter/connect-filter.view');
    const view = new ConnectDataView(module as any);
    
    container.innerHTML = '';
    const viewElement = view.render();
    container.appendChild(viewElement);
    
    console.log('✅ ConnectData view loaded with full functionality');
  }).catch(error => {
    container.innerHTML = `<div class="error">Failed to load ConnectData module: ${error}</div>`;
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

function loadConnectReportsModule(container: HTMLElement) {
  container.innerHTML = `
    <div class="reports-compact" style="height: 100%; overflow: hidden;">
      <div class="compact-layout" style="display: flex; height: 365px; background: #f5f5f5;">
        <!-- Column 1: Report Types -->
        <div class="menu-column" style="width: 120px; background: #2a2a2a; padding: 6px 4px; overflow-y: auto; flex-shrink: 0; border-right: 1px solid #1a1a1a;">
          <h3 class="column-title" style="color: #FFF; font-size: 9px; font-weight: 600; text-transform: uppercase; margin: 0 0 6px 0; padding: 4px; text-align: center; background: #1a1a1a; border-radius: 3px;">Raporty</h3>
          <button class="report-type-item active" data-type="executed" style="width: 100%; background: #3a3a3a; border: none; padding: 10px 6px; margin-bottom: 4px; border-radius: 5px; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 4px; transition: all 0.2s; color: #ccc;">
            <span class="menu-icon" style="font-size: 18px;">✅</span>
            <span class="menu-label" style="font-size: 10px; font-weight: 500;">Wykonane</span>
          </button>
          <button class="report-type-item" data-type="planned" style="width: 100%; background: #3a3a3a; border: none; padding: 10px 6px; margin-bottom: 4px; border-radius: 5px; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 4px; transition: all 0.2s; color: #ccc;">
            <span class="menu-icon" style="font-size: 18px;">📅</span>
            <span class="menu-label" style="font-size: 10px; font-weight: 500;">Planowane</span>
          </button>
        </div>

        <!-- Column 2: Calendar Options (shown only for planned) -->
        <div class="menu-column" id="calendar-column" style="width: 120px; background: #2a2a2a; padding: 6px 4px; overflow-y: auto; flex-shrink: 0; border-right: 1px solid #1a1a1a; display: none;">
          <h3 class="column-title" style="color: #FFF; font-size: 9px; font-weight: 600; text-transform: uppercase; margin: 0 0 6px 0; padding: 4px; text-align: center; background: #1a1a1a; border-radius: 3px;">Widok</h3>
          <button class="calendar-view-item active" data-view="week" style="width: 100%; background: #3a3a3a; border: none; padding: 8px 4px; margin-bottom: 3px; border-radius: 4px; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 3px; transition: all 0.2s; color: #ccc;">
            <span class="menu-icon" style="font-size: 16px;">📅</span>
            <span class="menu-label" style="font-size: 9px; font-weight: 500;">Tygodnie</span>
          </button>
          <button class="calendar-view-item" data-view="month" style="width: 100%; background: #3a3a3a; border: none; padding: 8px 4px; margin-bottom: 3px; border-radius: 4px; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 3px; transition: all 0.2s; color: #ccc;">
            <span class="menu-icon" style="font-size: 16px;">🗓️</span>
            <span class="menu-label" style="font-size: 9px; font-weight: 500;">Miesiące</span>
          </button>
          <button class="calendar-view-item" data-view="year" style="width: 100%; background: #3a3a3a; border: none; padding: 8px 4px; margin-bottom: 3px; border-radius: 4px; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 3px; transition: all 0.2s; color: #ccc;">
            <span class="menu-icon" style="font-size: 16px;">📆</span>
            <span class="menu-label" style="font-size: 9px; font-weight: 500;">Lata</span>
          </button>
        </div>

        <!-- Main Content -->
        <div class="main-content" style="flex: 1; display: flex; flex-direction: column; background: white; overflow: hidden;">
          <div class="content-body" style="flex: 1; padding: 15px; overflow-y: auto;">
            <!-- Executed Reports -->
            <div id="executed-content" class="report-content active">
              <div class="reports-list">
                <div class="report-card" style="background: white; border: 1px solid #e0e0e0; border-radius: 8px; padding: 15px; margin-bottom: 10px;">
                  <div class="report-header" style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span class="report-date" style="font-size: 12px; color: #666;">2025-10-08 17:30</span>
                    <span class="report-status success" style="background: #d4edda; color: #155724; padding: 2px 8px; border-radius: 4px; font-size: 11px;">✅ Pozytywny</span>
                  </div>
                  <div class="report-device" style="font-weight: 600; margin-bottom: 5px;">PSS-7000 #12345</div>
                  <div class="report-tests" style="font-size: 12px; color: #666; margin-bottom: 10px;">3 testy: Szczelność, Przepływ, Funkcjonalny</div>
                  <button class="btn-view-report" style="padding: 6px 12px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">Pokaż szczegóły</button>
                </div>
                <div class="report-card" style="background: white; border: 1px solid #e0e0e0; border-radius: 8px; padding: 15px; margin-bottom: 10px;">
                  <div class="report-header" style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span class="report-date" style="font-size: 12px; color: #666;">2025-10-08 16:15</span>
                    <span class="report-status error" style="background: #f8d7da; color: #721c24; padding: 2px 8px; border-radius: 4px; font-size: 11px;">❌ Negatywny</span>
                  </div>
                  <div class="report-device" style="font-weight: 600; margin-bottom: 5px;">PSS-5000 #67890</div>
                  <div class="report-tests" style="font-size: 12px; color: #666; margin-bottom: 10px;">Test szczelności: Błąd</div>
                  <button class="btn-view-report" style="padding: 6px 12px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">Pokaż szczegóły</button>
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

              <!-- Monthly Calendar -->
              <div id="month-view" class="calendar-view">
                <div class="calendar-header" style="text-align: center; margin-bottom: 15px;">
                  <h4 style="margin: 0; color: #333;">🗓️ Widok Miesięczny - Październik 2025</h4>
                </div>
                <div class="month-full-calendar" style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 1px; background: #f0f0f0; padding: 8px; border-radius: 8px; max-height: 280px; overflow-y: auto;">
                  <!-- Nagłówki dni -->
                  <div class="day-header" style="background: #667eea; color: white; padding: 6px; text-align: center; font-size: 10px; font-weight: 600;">Pon</div>
                  <div class="day-header" style="background: #667eea; color: white; padding: 6px; text-align: center; font-size: 10px; font-weight: 600;">Wt</div>
                  <div class="day-header" style="background: #667eea; color: white; padding: 6px; text-align: center; font-size: 10px; font-weight: 600;">Śr</div>
                  <div class="day-header" style="background: #667eea; color: white; padding: 6px; text-align: center; font-size: 10px; font-weight: 600;">Czw</div>
                  <div class="day-header" style="background: #667eea; color: white; padding: 6px; text-align: center; font-size: 10px; font-weight: 600;">Pt</div>
                  <div class="day-header" style="background: #667eea; color: white; padding: 6px; text-align: center; font-size: 10px; font-weight: 600;">Sob</div>
                  <div class="day-header" style="background: #667eea; color: white; padding: 6px; text-align: center; font-size: 10px; font-weight: 600;">Ndz</div>
                  
                  <!-- Puste komórki na początku miesiąca -->
                  <div style="background: #f8f9fa; padding: 4px; min-height: 35px; border: 1px solid #ddd;"></div>
                  <div style="background: #f8f9fa; padding: 4px; min-height: 35px; border: 1px solid #ddd;"></div>
                  
                  <!-- Październik 2025 -->
                  <div style="background: white; padding: 4px; min-height: 35px; border: 1px solid #ddd; font-size: 9px; position: relative;"><span style="font-weight: 600;">1</span></div>
                  <div style="background: white; padding: 4px; min-height: 35px; border: 1px solid #ddd; font-size: 9px;"><span style="font-weight: 600;">2</span><div style="width: 6px; height: 6px; background: #28a745; border-radius: 50%; margin-top: 2px;"></div></div>
                  <div style="background: white; padding: 4px; min-height: 35px; border: 1px solid #ddd; font-size: 9px;"><span style="font-weight: 600;">3</span></div>
                  <div style="background: white; padding: 4px; min-height: 35px; border: 1px solid #ddd; font-size: 9px;"><span style="font-weight: 600;">4</span></div>
                  <div style="background: white; padding: 4px; min-height: 35px; border: 1px solid #ddd; font-size: 9px;"><span style="font-weight: 600;">5</span></div>
                  
                  <div style="background: white; padding: 4px; min-height: 35px; border: 1px solid #ddd; font-size: 9px;"><span style="font-weight: 600;">6</span></div>
                  <div style="background: white; padding: 4px; min-height: 35px; border: 1px solid #ddd; font-size: 9px;"><span style="font-weight: 600;">7</span></div>
                  <div style="background: white; padding: 4px; min-height: 35px; border: 1px solid #ddd; font-size: 9px;"><span style="font-weight: 600;">8</span><div style="width: 6px; height: 6px; background: #28a745; border-radius: 50%; margin-top: 2px;"></div></div>
                  <div style="background: white; padding: 4px; min-height: 35px; border: 1px solid #ddd; font-size: 9px;"><span style="font-weight: 600;">9</span></div>
                  <div style="background: white; padding: 4px; min-height: 35px; border: 1px solid #ddd; font-size: 9px;"><span style="font-weight: 600;">10</span><div style="width: 6px; height: 6px; background: #dc3545; border-radius: 50%; margin-top: 2px;"></div></div>
                  <div style="background: white; padding: 4px; min-height: 35px; border: 1px solid #ddd; font-size: 9px;"><span style="font-weight: 600;">11</span></div>
                  <div style="background: white; padding: 4px; min-height: 35px; border: 1px solid #ddd; font-size: 9px;"><span style="font-weight: 600;">12</span></div>
                  
                  <div style="background: white; padding: 4px; min-height: 35px; border: 1px solid #ddd; font-size: 9px;"><span style="font-weight: 600;">13</span></div>
                  <div style="background: white; padding: 4px; min-height: 35px; border: 1px solid #ddd; font-size: 9px;"><span style="font-weight: 600;">14</span><div style="width: 6px; height: 6px; background: #17a2b8; border-radius: 50%; margin-top: 2px;"></div></div>
                  <div style="background: white; padding: 4px; min-height: 35px; border: 1px solid #ddd; font-size: 9px;"><span style="font-weight: 600;">15</span></div>
                  <div style="background: white; padding: 4px; min-height: 35px; border: 1px solid #ddd; font-size: 9px;"><span style="font-weight: 600;">16</span><div style="width: 6px; height: 6px; background: #28a745; border-radius: 50%; margin-top: 2px;"></div></div>
                  <div style="background: white; padding: 4px; min-height: 35px; border: 1px solid #ddd; font-size: 9px;"><span style="font-weight: 600;">17</span></div>
                  <div style="background: white; padding: 4px; min-height: 35px; border: 1px solid #ddd; font-size: 9px;"><span style="font-weight: 600;">18</span><div style="width: 6px; height: 6px; background: #dc3545; border-radius: 50%; margin-top: 2px;"></div></div>
                  <div style="background: white; padding: 4px; min-height: 35px; border: 1px solid #ddd; font-size: 9px;"><span style="font-weight: 600;">19</span></div>
                  
                  <div style="background: white; padding: 4px; min-height: 35px; border: 1px solid #ddd; font-size: 9px;"><span style="font-weight: 600;">20</span></div>
                  <div style="background: white; padding: 4px; min-height: 35px; border: 1px solid #ddd; font-size: 9px;"><span style="font-weight: 600;">21</span></div>
                  <div style="background: white; padding: 4px; min-height: 35px; border: 1px solid #ddd; font-size: 9px;"><span style="font-weight: 600;">22</span><div style="width: 6px; height: 6px; background: #28a745; border-radius: 50%; margin-top: 2px;"></div></div>
                  <div style="background: white; padding: 4px; min-height: 35px; border: 1px solid #ddd; font-size: 9px;"><span style="font-weight: 600;">23</span></div>
                  <div style="background: white; padding: 4px; min-height: 35px; border: 1px solid #ddd; font-size: 9px;"><span style="font-weight: 600;">24</span><div style="width: 6px; height: 6px; background: #dc3545; border-radius: 50%; margin-top: 2px;"></div></div>
                  <div style="background: white; padding: 4px; min-height: 35px; border: 1px solid #ddd; font-size: 9px;"><span style="font-weight: 600;">25</span></div>
                  <div style="background: white; padding: 4px; min-height: 35px; border: 1px solid #ddd; font-size: 9px;"><span style="font-weight: 600;">26</span></div>
                  
                  <div style="background: white; padding: 4px; min-height: 35px; border: 1px solid #ddd; font-size: 9px;"><span style="font-weight: 600;">27</span></div>
                  <div style="background: white; padding: 4px; min-height: 35px; border: 1px solid #ddd; font-size: 9px;"><span style="font-weight: 600;">28</span><div style="width: 6px; height: 6px; background: #17a2b8; border-radius: 50%; margin-top: 2px;"></div></div>
                  <div style="background: white; padding: 4px; min-height: 35px; border: 1px solid #ddd; font-size: 9px;"><span style="font-weight: 600;">29</span></div>
                  <div style="background: white; padding: 4px; min-height: 35px; border: 1px solid #ddd; font-size: 9px;"><span style="font-weight: 600;">30</span><div style="width: 6px; height: 6px; background: #28a745; border-radius: 50%; margin-top: 2px;"></div></div>
                  <div style="background: white; padding: 4px; min-height: 35px; border: 1px solid #ddd; font-size: 9px;"><span style="font-weight: 600;">31</span></div>
                  <div style="background: #f8f9fa; padding: 4px; min-height: 35px; border: 1px solid #ddd;"></div>
                  <div style="background: #f8f9fa; padding: 4px; min-height: 35px; border: 1px solid #ddd;"></div>
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
  const calendarColumn = container.querySelector('#calendar-column');
  
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
  
  console.log('✅ Reports view loaded with calendar functionality');
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
