import { ConnectFilterModule } from './connect-data.module';

export class ConnectFilterView {
  private module: ConnectFilterModule;
  private currentAction: string = 'search';

  constructor(module: ConnectFilterModule) {
    this.module = module;
  }

  render(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'connect-data-compact';
    
    // Update top-bar submenu
    const submenu = document.getElementById('top-bar-submenu');
    if (submenu) submenu.textContent = '🔎 Advanced Search & Filtering';
    
    // Update top-bar section title
    const sectionTitle = document.getElementById('top-bar-section-title');
    if (sectionTitle) sectionTitle.textContent = 'ConnectFilter - Szukaj';
    
    container.innerHTML = `
      <div class="compact-layout">
        <div class="menu-column">
          <h3 class="column-title">Akcje</h3>
          <button class="menu-item active" data-action="search">
            <span class="menu-icon">🔍</span>
            <span class="menu-label">Szukaj</span>
          </button>
          <button class="menu-item" data-action="clear">
            <span class="menu-icon">🗑️</span>
            <span class="menu-label">Wyczyść</span>
          </button>
          <button class="menu-item" data-action="export">
            <span class="menu-icon">📊</span>
            <span class="menu-label">Export</span>
          </button>
          <button class="menu-item" data-action="save">
            <span class="menu-icon">💾</span>
            <span class="menu-label">Zapisz Filtr</span>
          </button>
          <button class="menu-item" data-action="load">
            <span class="menu-icon">📂</span>
            <span class="menu-label">Wczytaj</span>
          </button>
        </div>

        <div class="main-content">
          <div class="content-header">
            <h2>Wyszukiwanie i filtrowanie</h2>
          </div>
          <div class="content-body">
            <div class="search-compact">
              <input type="text" id="text-search" class="search-input" placeholder="Szukaj urządzeń, użytkowników...">
              <button id="search-btn" class="btn-search">🔍</button>
            </div>
            
            <div class="filters-compact">
              <select id="type-filter" class="filter-select">
                <option value="">Wszystkie typy</option>
                <option value="device">📱 Urządzenie</option>
                <option value="user">👤 Użytkownik</option>
                <option value="group">📦 Grupa</option>
              </select>
              
              <select id="status-filter" class="filter-select">
                <option value="">Wszystkie statusy</option>
                <option value="active">✅ Aktywny</option>
                <option value="inactive">❌ Nieaktywny</option>
                <option value="pending">⏳ Oczekujący</option>
              </select>
            </div>

            <div class="results-list" id="results-list">
              <div class="result-card">
                <div class="card-icon">📱</div>
                <div class="card-content">
                  <div class="card-title">PSS-7000 #12345</div>
                  <div class="card-info">Status: ✅ Aktywny | Typ: Urządzenie</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="right-panel">
          <div class="params-section">
            <h3 class="params-title">Wyniki</h3>
            <div class="param-item">
              <span class="param-label">Znaleziono:</span>
              <span class="param-value" id="results-count">0</span>
            </div>
            <div class="param-item">
              <span class="param-label">Wybrany typ:</span>
              <span class="param-value" id="selected-type">Wszystkie</span>
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
      .connect-data-compact { height: 100%; overflow: hidden; }
      .compact-layout { display: flex; height: 365px; background: #f5f5f5; }
      .menu-column { width: 100px; background: #2a2a2a; padding: 6px 4px; overflow-y: auto; flex-shrink: 0; border-right: 1px solid #1a1a1a; }
      .column-title { color: #FFF; font-size: 9px; font-weight: 600; text-transform: uppercase; margin: 0 0 6px 0; padding: 4px; text-align: center; background: #1a1a1a; border-radius: 3px; }
      .menu-item { width: 100%; background: #3a3a3a; border: none; padding: 5px 6px; margin-bottom: 4px; border-radius: 5px; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 4px; transition: all 0.2s; color: #ccc; }
      .menu-icon { font-size: 18px; }
      .menu-label { font-size: 12px; font-weight: 500; text-align: center; }
      .menu-item:hover { background: #4a4a4a; color: white; }
      .menu-item.active { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
      .main-content { flex: 1; display: flex; flex-direction: column; background: white; overflow: hidden; }
      .content-header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 10px 15px; }
      .content-header h2 { margin: 0; font-size: 14px; font-weight: 600; }
      .content-body { flex: 1; padding: 10px; overflow-y: auto; }
      .search-compact { display: flex; gap: 8px; margin-bottom: 10px; }
      .search-input { flex: 1; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 12px; }
      .btn-search { padding: 8px 12px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 4px; cursor: pointer; }
      .filters-compact { display: flex; gap: 8px; margin-bottom: 15px; }
      .filter-select { flex: 1; padding: 6px; border: 1px solid #ddd; border-radius: 4px; font-size: 11px; }
      .results-list { display: flex; flex-direction: column; gap: 8px; }
      .result-card { display: flex; gap: 10px; background: white; border: 1px solid #e0e0e0; border-radius: 6px; padding: 10px; transition: all 0.2s; }
      .result-card:hover { border-color: #667eea; box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2); }
      .card-icon { font-size: 24px; }
      .card-content { flex: 1; }
      .card-title { font-weight: 600; font-size: 12px; margin-bottom: 4px; }
      .card-info { font-size: 10px; color: #666; }
      .right-panel { width: 200px; background: #2a2a2a; padding: 10px; overflow-y: auto; }
      .params-section { margin-bottom: 15px; }
      .params-title { color: #FFF; font-size: 11px; font-weight: 600; text-transform: uppercase; margin: 0 0 8px 0; }
      .param-item { background: #3a3a3a; padding: 8px; margin-bottom: 6px; border-radius: 4px; display: flex; flex-direction: column; gap: 4px; }
      .param-label { font-size: 10px; color: #999; }
      .param-value { font-size: 13px; color: #fff; font-weight: 600; }
    `;
    document.head.appendChild(style);
  }

  private setupEventListeners(container: HTMLElement): void {
    const actionButtons = container.querySelectorAll('[data-action]');
    actionButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const action = target.getAttribute('data-action');
        if (action) this.handleAction(action, container);
      });
    });
  }

  private handleAction(action: string, container: HTMLElement): void {
    container.querySelectorAll('[data-action]').forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-action') === action) item.classList.add('active');
    });

    // Update top-bar title
    const titles: any = {
      'search': 'ConnectFilter - Szukaj',
      'clear': 'ConnectFilter - Wyczyść',
      'export': 'ConnectFilter - Export',
      'save': 'ConnectFilter - Zapisz',
      'load': 'ConnectFilter - Wczytaj'
    };
    const topBarTitle = document.getElementById('top-bar-section-title');
    if (topBarTitle) {
      topBarTitle.textContent = titles[action] || 'ConnectFilter';
    }

    const messages: any = {
      'search': '🔍 Wyszukiwanie...',
      'clear': '🗑️ Czyszczenie filtrów...',
      'export': '📊 Eksportowanie wyników...',
      'save': '💾 Zapisywanie filtra...',
      'load': '📂 Wczytywanie filtra...'
    };
    console.log(messages[action]);
  }
}
