import { ConnectTestModule } from './connect-test.module';

export class ConnectTestView {
  private module: ConnectTestModule;
  private currentSection: string = 'identification';

  constructor(module: ConnectTestModule) {
    this.module = module;
  }

  render(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'connect-test-compact';
    
    // Update top-bar submenu
    const submenu = document.getElementById('top-bar-submenu');
    if (submenu) submenu.textContent = '🧪 Test Module';
    
    container.innerHTML = `
      <div class="compact-layout">
        <div class="menu-column">
          <h3 class="column-title">Sekcje</h3>
          <button class="menu-item active" data-section="identification">
            <span class="menu-icon">🔍</span>
            <span class="menu-label">Identyfikacja</span>
          </button>
          <button class="menu-item" data-section="device-selection">
            <span class="menu-icon">📱</span>
            <span class="menu-label">Wybór Urządz.</span>
          </button>
          <button class="menu-item" data-section="testing">
            <span class="menu-icon">🧪</span>
            <span class="menu-label">Testowanie</span>
          </button>
          <button class="menu-item" data-section="reports">
            <span class="menu-icon">📋</span>
            <span class="menu-label">Raporty</span>
          </button>
          <button class="menu-item" data-section="debug">
            <span class="menu-icon">🔧</span>
            <span class="menu-label">Debug</span>
          </button>
        </div>

        <div class="main-content">
          <div class="content-header">
            <h2 id="content-title">ConnectTest - Identyfikacja</h2>
          </div>
          <div class="content-body" id="content-body">
            <div class="section-prompt">
              <p>Wybierz sekcję z menu po lewej</p>
            </div>
          </div>
        </div>

        <div class="right-panel">
          <div class="params-section">
            <h3 class="params-title">Status</h3>
            <div class="param-item">
              <span class="param-label">Aktywna sekcja:</span>
              <span class="param-value" id="active-section">Identyfikacja</span>
            </div>
          </div>
        </div>
      </div>
    `;

    this.addStyles();
    this.setupEventListeners(container);
    return container;
  }

  private addStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      .connect-test-compact { height: 100%; overflow: hidden; }
      .compact-layout { display: flex; height: 365px; background: #f5f5f5; }
      .menu-column { width: 100px; background: #2a2a2a; padding: 6px 4px; overflow-y: auto; flex-shrink: 0; border-right: 1px solid #1a1a1a; }
      .column-title { color: #FFF; font-size: 9px; font-weight: 600; text-transform: uppercase; margin: 0 0 6px 0; padding: 4px; text-align: center; background: #1a1a1a; border-radius: 3px; }
      .menu-item { width: 100%; background: #3a3a3a; border: none; padding: 10px 6px; margin-bottom: 4px; border-radius: 5px; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 4px; transition: all 0.2s; color: #ccc; }
      .menu-icon { font-size: 18px; }
      .menu-label { font-size: 10px; font-weight: 500; text-align: center; }
      .menu-item:hover { background: #4a4a4a; color: white; }
      .menu-item.active { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
      .main-content { flex: 1; display: flex; flex-direction: column; background: white; overflow: hidden; }
      .content-header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 10px 15px; flex-shrink: 0; }
      .content-header h2 { margin: 0; font-size: 14px; font-weight: 600; }
      .content-body { flex: 1; padding: 15px; overflow-y: auto; }
      .right-panel { width: 200px; background: #2a2a2a; padding: 10px; overflow-y: auto; flex-shrink: 0; }
      .params-section { margin-bottom: 15px; }
      .params-title { color: #999; font-size: 11px; font-weight: 600; text-transform: uppercase; margin: 0 0 8px 0; }
      .param-item { background: #3a3a3a; padding: 8px; margin-bottom: 6px; border-radius: 4px; display: flex; flex-direction: column; gap: 4px; }
      .param-label { font-size: 10px; color: #999; }
      .param-value { font-size: 13px; color: #fff; font-weight: 600; }
    `;
    document.head.appendChild(style);
  }

  private setupEventListeners(container: HTMLElement): void {
    const menuItems = container.querySelectorAll('[data-section]');
    menuItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const section = target.getAttribute('data-section');
        if (section) this.switchSection(section, container);
      });
    });
  }

  private switchSection(section: string, container: HTMLElement): void {
    container.querySelectorAll('[data-section]').forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-section') === section) item.classList.add('active');
    });

    const titles: any = {
      'identification': 'Identyfikacja',
      'device-selection': 'Wybór Urządzenia',
      'testing': 'Testowanie',
      'reports': 'Raporty Urządzeń',
      'debug': 'Debug'
    };

    const titleEl = container.querySelector('#content-title');
    if (titleEl) titleEl.textContent = `ConnectTest - ${titles[section]}`;

    const activeSection = container.querySelector('#active-section');
    if (activeSection) activeSection.textContent = titles[section];
  }
}
