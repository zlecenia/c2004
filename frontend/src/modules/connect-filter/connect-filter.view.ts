import { ConnectFilterModule } from './connect-filter.module';

export class ConnectDataView {
  private module: ConnectFilterModule;
  private currentObject: string = 'users';
  private currentAction: string = 'search';

  constructor(module: ConnectFilterModule) {
    this.module = module;
  }

  render(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'connect-data-compact';
    
    // Update top-bar submenu
    const submenu = document.getElementById('top-bar-submenu');
    if (submenu) submenu.textContent = '📊 Data Management & Analytics';
    
    // Update top-bar section title
    const sectionTitle = document.getElementById('top-bar-section-title');
    if (sectionTitle) sectionTitle.textContent = 'ConnectData - Użytkownicy - Szukaj';
    
    container.innerHTML = `
      <div class="compact-layout">
        <!-- Column 1: Objects -->
        <div class="menu-column">
          <h3 class="column-title">Obiekty</h3>
          <button class="object-item active" data-object="users">
            <span class="menu-icon">👥</span>
            <span class="menu-label">Użytkownicy</span>
          </button>
          <button class="object-item" data-object="test-scenarios">
            <span class="menu-icon">🧪</span>
            <span class="menu-label">Scenariusze</span>
          </button>
          <button class="object-item" data-object="devices">
            <span class="menu-icon">📱</span>
            <span class="menu-label">Urządzenia</span>
          </button>
          <button class="object-item" data-object="groups">
            <span class="menu-icon">👥</span>
            <span class="menu-label">Grupy</span>
          </button>
          <button class="object-item" data-object="warehouses">
            <span class="menu-icon">🏭</span>
            <span class="menu-label">Magazyny</span>
          </button>
          <button class="object-item" data-object="clients">
            <span class="menu-icon">🏢</span>
            <span class="menu-label">Klienci</span>
          </button>
        </div>

        <!-- Column 2: Actions -->
        <div class="menu-column">
          <h3 class="column-title">Akcje</h3>
          <button class="menu-item active" data-action="search">
            <span class="menu-icon">🔍</span>
            <span class="menu-label">Szukaj</span>
          </button>
          <button class="menu-item" data-action="add">
            <span class="menu-icon">➕</span>
            <span class="menu-label">Dodaj</span>
          </button>
          <button class="menu-item" data-action="edit">
            <span class="menu-icon">✏️</span>
            <span class="menu-label">Edytuj</span>
          </button>
          <button class="menu-item" data-action="export">
            <span class="menu-icon">📊</span>
            <span class="menu-label">Export</span>
          </button>
        </div>

        <div class="main-content">
          <div class="content-body">
            
            <!-- Search Content -->
            <div id="search-content" class="action-content active">
              <div class="search-compact">
                <input type="text" id="text-search" class="search-input" placeholder="Szukaj użytkowników...">
                <button id="search-btn" class="btn-search">🔍</button>
              </div>
              
              <div class="filters-compact">
                <select id="role-filter" class="filter-select">
                  <option value="">Wszystkie role</option>
                  <option value="admin">👑 Administrator</option>
                  <option value="manager">👔 Manager</option>
                  <option value="operator">👤 Operator</option>
                  <option value="technician">🔧 Technik</option>
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
                  <div class="card-icon">👤</div>
                  <div class="card-content">
                    <div class="card-title">Jan Kowalski</div>
                    <div class="card-info">Role: 👔 Manager | Status: ✅ Aktywny | Email: jan@fleet.local</div>
                  </div>
                  <div class="card-actions">
                    <button class="btn-card-action" title="Edytuj">✏️</button>
                    <button class="btn-card-action" title="Profil">👤</button>
                  </div>
                </div>
                <div class="result-card">
                  <div class="card-icon">👤</div>
                  <div class="card-content">
                    <div class="card-title">Anna Nowak</div>
                    <div class="card-info">Role: 🔧 Technik | Status: ✅ Aktywny | Email: anna@fleet.local</div>
                  </div>
                  <div class="card-actions">
                    <button class="btn-card-action" title="Edytuj">✏️</button>
                    <button class="btn-card-action" title="Profil">👤</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Add Content -->
            <div id="add-content" class="action-content">
              <div class="form-container">
                <h4>➕ Dodaj Nowy Użytkownik</h4>
                <div class="form-row">
                  <div class="form-group">
                    <label>Imię i nazwisko:</label>
                    <input type="text" class="form-input" placeholder="Jan Kowalski">
                  </div>
                  <div class="form-group">
                    <label>Email:</label>
                    <input type="email" class="form-input" placeholder="jan@fleet.local">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label>Rola:</label>
                    <select class="form-select">
                      <option>👑 Administrator</option>
                      <option>👔 Manager</option>
                      <option>👤 Operator</option>
                      <option>🔧 Technik</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Status:</label>
                    <select class="form-select">
                      <option>✅ Aktywny</option>
                      <option>❌ Nieaktywny</option>
                      <option>⏳ Oczekujący</option>
                    </select>
                  </div>
                </div>
                <button class="btn-submit">💾 Zapisz Użytkownika</button>
              </div>
            </div>

            <!-- Edit Content -->
            <div id="edit-content" class="action-content">
              <div class="form-container">
                <h4>✏️ Edytuj Użytkownika</h4>
                <div class="form-group">
                  <label>Wybierz użytkownika:</label>
                  <select class="form-select">
                    <option>👤 Jan Kowalski</option>
                    <option>👤 Anna Nowak</option>
                  </select>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label>Imię i nazwisko:</label>
                    <input type="text" class="form-input" value="Jan Kowalski">
                  </div>
                  <div class="form-group">
                    <label>Email:</label>
                    <input type="email" class="form-input" value="jan@fleet.local">
                  </div>
                </div>
                <button class="btn-submit">💾 Zapisz Zmiany</button>
              </div>
            </div>

            <!-- Delete Content -->
            <div id="delete-content" class="action-content">
              <div class="form-container">
                <h4>❌ Usuń Użytkownika</h4>
                <div class="delete-warning">
                  <p>⚠️ Operacja nieodwracalna!</p>
                  <select class="form-select">
                    <option>👤 Wybierz użytkownika...</option>
                    <option>👤 Jan Kowalski</option>
                    <option>👤 Anna Nowak</option>
                  </select>
                </div>
                <button class="btn-delete">🗑️ Usuń Trwale</button>
              </div>
            </div>

            <!-- Export Content -->
            <div id="export-content" class="action-content">
              <div class="form-container">
                <h4>📊 Eksport i Archiwizacja Danych</h4>
                <div class="form-row">
                  <div class="form-group">
                    <label>Operacja:</label>
                    <select class="form-select" id="export-operation">
                      <option value="export">📊 Eksport do pliku</option>
                      <option value="archive">📦 Archiwizacja danych</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Format/Nośnik:</label>
                    <select class="form-select">
                      <option>📄 CSV</option>
                      <option>📗 Excel</option>
                      <option>📋 JSON</option>
                      <option>💾 Lokalny dysk C:\</option>
                      <option>🖥️ Sieć LAN</option>
                      <option>☁️ Cloud Storage</option>
                      <option>💽 USB Drive</option>
                    </select>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label>Zakres danych:</label>
                    <select class="form-select">
                      <option>📊 Wszystkie dane</option>
                      <option>🔍 Wyniki wyszukiwania</option>
                      <option>📅 Ostatni miesiąc</option>
                      <option>📆 Ostatnie 3 miesiące</option>
                      <option>🗓️ Ostatnie 6 miesięcy</option>
                      <option>📅 Ostatni rok</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Okres (dla archiwizacji):</label>
                    <select class="form-select">
                      <option>🎯 Wybierz zakres dat</option>
                      <option>📅 Ostatni miesiąc</option>
                      <option>📆 Ostatnie 3 miesiące</option>
                      <option>🗓️ Ostatnie 6 miesięcy</option>
                      <option>📅 Ostatni rok</option>
                    </select>
                  </div>
                </div>
                <div class="archive-options">
                  <label><input type="checkbox" checked> Kompresuj dane (ZIP)</label>
                  <label><input type="checkbox"> Szyfruj archiwum</label>
                  <label><input type="checkbox"> Usuń oryginały po archiwizacji</label>
                  <label><input type="checkbox"> Weryfikuj integralność danych</label>
                </div>
                <button class="btn-submit">💾 Wykonaj Operację</button>
              </div>
            </div>

          </div>
        </div>

        <div class="right-panel">
          <div class="params-section">
            <h3 class="params-title">Statistyki</h3>
            <div class="param-item">
              <span class="param-label">Znaleziono:</span>
              <span class="param-value" id="results-count">2</span>
            </div>
            <div class="param-item">
              <span class="param-label">Obiekt:</span>
              <span class="param-value" id="selected-object">Użytkownicy</span>
            </div>
            <div class="param-item">
              <span class="param-label">Akcja:</span>
              <span class="param-value" id="selected-action">Szukaj</span>
            </div>
          </div>
          <div class="params-section">
            <h3 class="params-title">Szybkie Akcje</h3>
            <button class="quick-action-btn">➕ Nowy Użytkownik</button>
            <button class="quick-action-btn">📊 Eksportuj CSV</button>
            <button class="quick-action-btn">🔄 Odśwież Dane</button>
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
      
      /* Object Items */
      .object-item { width: 100%; background: #3a3a3a; border: none; padding: 8px 4px; margin-bottom: 3px; border-radius: 4px; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 3px; transition: all 0.2s; color: #ccc; }
      .object-item:hover { background: #4a4a4a; color: white; }
      .object-item.active { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; }
      
      /* Menu Items */
      .menu-item { width: 100%; background: #3a3a3a; border: none; padding: 10px 6px; margin-bottom: 4px; border-radius: 5px; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 4px; transition: all 0.2s; color: #ccc; }
      .menu-icon { font-size: 18px; }
      .menu-label { font-size: 10px; font-weight: 500; text-align: center; }
      .menu-item:hover { background: #4a4a4a; color: white; }
      .menu-item.active { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
      
      .main-content { flex: 1; display: flex; flex-direction: column; background: white; overflow: hidden; }
      .content-body { flex: 1; padding: 15px; overflow-y: auto; }
      
      .search-compact { display: flex; gap: 8px; margin-bottom: 10px; }
      .search-input { flex: 1; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 12px; }
      .btn-search { padding: 8px 12px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 4px; cursor: pointer; }
      .filters-compact { display: flex; gap: 8px; margin-bottom: 15px; }
      .filter-select { flex: 1; padding: 6px; border: 1px solid #ddd; border-radius: 4px; font-size: 11px; }
      .results-list { display: flex; flex-direction: column; gap: 8px; }
      .result-card { display: flex; gap: 10px; background: white; border: 1px solid #e0e0e0; border-radius: 6px; padding: 10px; transition: all 0.2s; align-items: center; }
      .result-card:hover { border-color: #28a745; box-shadow: 0 2px 8px rgba(40, 167, 69, 0.2); }
      .card-icon { font-size: 24px; }
      .card-content { flex: 1; }
      .card-title { font-weight: 600; font-size: 12px; margin-bottom: 4px; color: #333; }
      .card-info { font-size: 10px; color: #666; }
      .card-actions { display: flex; gap: 4px; }
      .btn-card-action { padding: 6px 8px; background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 4px; cursor: pointer; font-size: 12px; transition: all 0.2s; }
      .btn-card-action:hover { background: #e9ecef; border-color: #adb5bd; }
      
      .right-panel { width: 200px; background: #2a2a2a; padding: 10px; overflow-y: auto; }
      .params-section { margin-bottom: 15px; }
      .params-title { color: #FFF; font-size: 11px; font-weight: 600; text-transform: uppercase; margin: 0 0 8px 0; }
      .param-item { background: #3a3a3a; padding: 8px; margin-bottom: 6px; border-radius: 4px; display: flex; flex-direction: column; gap: 4px; }
      .param-label { font-size: 10px; color: #999; }
      .param-value { font-size: 13px; color: #fff; font-weight: 600; }
      .quick-action-btn { width: 100%; padding: 8px; background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; border: none; border-radius: 4px; cursor: pointer; margin-bottom: 6px; font-size: 10px; font-weight: 500; }

      /* Action Content */
      .action-content { display: none; }
      .action-content.active { display: block; }
      
      /* Form Styles */
      .form-container { background: #f8f9fa; padding: 20px; border-radius: 8px; }
      .form-container h4 { margin: 0 0 20px 0; font-size: 14px; color: #333; font-weight: 600; }
      .form-row { display: flex; gap: 15px; margin-bottom: 15px; }
      .form-group { flex: 1; }
      .form-group label { display: block; margin-bottom: 5px; font-size: 11px; font-weight: 600; color: #666; }
      .form-input, .form-select { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 12px; }
      .btn-submit { width: 100%; padding: 12px; background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600; }
      .btn-delete { width: 100%; padding: 12px; background: linear-gradient(135deg, #dc3545 0%, #c82333 100%); color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600; }
      .btn-archive { width: 100%; padding: 12px; background: linear-gradient(135deg, #17a2b8 0%, #138496 100%); color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600; }
      .delete-warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 6px; margin-bottom: 15px; }
      .delete-warning p { margin: 0 0 10px 0; color: #856404; font-weight: 600; }
      .archive-options { margin: 15px 0; }
      .archive-options label { display: block; margin-bottom: 8px; font-size: 12px; cursor: pointer; }
      .archive-options input[type="checkbox"] { margin-right: 8px; }
    `;
    document.head.appendChild(style);
  }

  private setupEventListeners(container: HTMLElement): void {
    // Object buttons
    const objectButtons = container.querySelectorAll('[data-object]');
    objectButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const object = target.getAttribute('data-object');
        if (object) this.switchObject(object, container);
      });
    });

    // Action buttons
    const actionButtons = container.querySelectorAll('[data-action]');
    actionButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const action = target.getAttribute('data-action');
        if (action) this.handleAction(action, container);
      });
    });
  }

  private switchObject(object: string, container: HTMLElement): void {
    this.currentObject = object;

    // Update object menu active state
    container.querySelectorAll('[data-object]').forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-object') === object) item.classList.add('active');
    });

    // Update title in top-bar
    const objectTitles: any = {
      'users': 'Użytkownicy',
      'test-scenarios': 'Scenariusze Testowe',
      'devices': 'Urządzenia', 
      'groups': 'Grupy',
      'warehouses': 'Magazyny',
      'clients': 'Klienci'
    };

    const actionTitles: any = {
      'search': 'Szukaj',
      'clear': 'Wyczyść',
      'add': 'Dodaj',
      'edit': 'Edytuj',
      'delete': 'Usuń',
      'export': 'Export'
    };

    const topBarTitle = document.getElementById('top-bar-section-title');
    if (topBarTitle) {
      topBarTitle.textContent = `ConnectData - ${objectTitles[object]} - ${actionTitles[this.currentAction]}`;
    }

    // Update params
    const selectedObject = container.querySelector('#selected-object');
    if (selectedObject) selectedObject.textContent = objectTitles[object];


    // Update search placeholder
    const searchInput = container.querySelector('#text-search') as HTMLInputElement;
    if (searchInput) {
      const placeholders: any = {
        'users': 'Szukaj użytkowników...',
        'test-scenarios': 'Szukaj scenariuszy testowych...',
        'devices': 'Szukaj urządzeń...',
        'groups': 'Szukaj grup...',
        'warehouses': 'Szukaj magazynów...',
        'clients': 'Szukaj klientów...'
      };
      searchInput.placeholder = placeholders[object];
    }
  }

  private handleAction(action: string, container: HTMLElement): void {
    this.currentAction = action;

    container.querySelectorAll('[data-action]').forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-action') === action) item.classList.add('active');
    });

    // Update top-bar title
    const objectTitles: any = {
      'users': 'Użytkownicy',
      'test-scenarios': 'Scenariusze Testowe',
      'devices': 'Urządzenia',
      'groups': 'Grupy', 
      'warehouses': 'Magazyny',
      'clients': 'Klienci'
    };

    const actionTitles: any = {
      'search': 'Szukaj',
      'add': 'Dodaj',
      'edit': 'Edytuj', 
      'export': 'Eksport i Archiwizacja'
    };

    const topBarTitle = document.getElementById('top-bar-section-title');
    if (topBarTitle) {
      topBarTitle.textContent = `ConnectData - ${objectTitles[this.currentObject]} - ${actionTitles[action]}`;
    }

    // Update params
    const selectedAction = container.querySelector('#selected-action');
    if (selectedAction) selectedAction.textContent = actionTitles[action];

    // Hide all action contents
    container.querySelectorAll('.action-content').forEach(content => {
      content.classList.remove('active');
    });

    // Show selected action content
    const activeContent = container.querySelector(`#${action}-content`);
    if (activeContent) {
      activeContent.classList.add('active');
    }

    const messages: any = {
      'search': '🔍 Wyszukiwanie...',
      'add': '➕ Dodawanie nowego rekordu...',
      'edit': '✏️ Edytowanie...',
      'export': '📊 Eksport i archiwizacja danych...'
    };
    console.log(messages[action]);
  }
}
