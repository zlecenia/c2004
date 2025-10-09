// frontend/src/modules/connect-workshop/connect-workshop.view.ts - Compact 1280x400px version
import { ConnectWorkshopModule } from './connect-workshop.module';

export class ConnectWorkshopView {
  private module: ConnectWorkshopModule;
  private currentAction: string = 'sync';
  private currentSection: string = 'requests';

  constructor(module: ConnectWorkshopModule) {
    this.module = module;
  }

  render(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'connect-workshop-compact';
    
    // Update top-bar submenu
    const submenu = document.getElementById('top-bar-submenu');
    if (submenu) submenu.textContent = '🔧 Workshop Client';
    
    // Update top-bar section title
    const sectionTitle = document.getElementById('top-bar-section-title');
    if (sectionTitle) sectionTitle.textContent = 'ConnectWorkshop - Requests';
    
    container.innerHTML = `
      <div class="compact-layout">
        <!-- Column 1: Objects -->
        <div class="menu-column">
          <h3 class="column-title">Obiekty</h3>
          <button class="section-item active" data-section="requests">
            <span class="menu-icon">📋</span>
            <span class="menu-label">Zgłoszenia</span>
          </button>
          <button class="section-item" data-section="services">
            <span class="menu-icon">⚙️</span>
            <span class="menu-label">Serwisy</span>
          </button>
          <button class="section-item" data-section="transport">
            <span class="menu-icon">🚚</span>
            <span class="menu-label">Transport</span>
          </button>
          <button class="section-item" data-section="dispositions">
            <span class="menu-icon">📦</span>
            <span class="menu-label">Dyspozycje</span>
          </button>
        </div>

        <!-- Column 2: Actions -->
        <div class="menu-column">
          <h3 class="column-title">Akcje</h3>
          <button class="menu-item active" data-action="search">
            <span class="menu-icon">🔍</span>
            <span class="menu-label">Szukaj</span>
          </button>
          <button class="menu-item" data-action="new-request">
            <span class="menu-icon">➕</span>
            <span class="menu-label">Zgłoszenie</span>
          </button>
          <button class="menu-item" data-action="export">
            <span class="menu-icon">📊</span>
            <span class="menu-label">Export</span>
          </button>
          <button class="menu-item" data-action="import">
            <span class="menu-icon">📥</span>
            <span class="menu-label">Import</span>
          </button>
          <button class="menu-item" data-action="sync">
            <span class="menu-icon">🔄</span>
            <span class="menu-label">Sync</span>
          </button>
        </div>

        <!-- Main Content -->
        <div class="main-content">
          <div class="content-body">
            <!-- Search Action Content -->
            <div id="search-content" class="action-content active">
              <div class="search-workshop">
                <div class="search-input-row">
                  <input type="text" id="workshop-search-input" class="search-input" placeholder="Szukaj w zgłoszeniach...">
                  <button id="workshop-search-btn" class="btn-search">🔍</button>
                </div>
                
                <div class="search-filters">
                  <select class="filter-select">
                    <option>📋 Wszystkie zgłoszenia</option>
                    <option>⏳ Oczekujące</option>
                    <option>⚙️ W trakcie</option>
                    <option>✅ Zakończone</option>
                  </select>
                  <select class="filter-select">
                    <option>📅 Ostatni tydzień</option>
                    <option>📆 Ostatni miesiąc</option>
                    <option>🗓️ Ostatnie 3 miesiące</option>
                    <option>📅 Cały rok</option>
                  </select>
                </div>

                <div class="search-results">
                  <!-- Results will be dynamically updated based on selected section -->
                </div>
              </div>
            </div>

            <!-- Sync Action Content -->
            <div id="sync-content" class="action-content">
              <div class="sync-status">
                <div class="sync-info">
                  <div class="sync-item">
                    <span class="sync-label">Ostatnia synchronizacja:</span>
                    <span class="sync-value">2025-10-08 20:45</span>
                  </div>
                  <div class="sync-item">
                    <span class="sync-label">Status połączenia:</span>
                    <span class="sync-value">✅ Połączony</span>
                  </div>
                  <div class="sync-item">
                    <span class="sync-label">Oczekujące elementy:</span>  
                    <span class="sync-value">3</span>
                  </div>
                </div>
                <button class="btn-sync">🔄 Synchronizuj Teraz</button>
              </div>
            </div>

            <!-- New Request Action Content -->
            <div id="new-request-content" class="action-content">
              <div class="form-container">
                <div class="form-row">
                  <div class="form-group">
                    <label>Urządzenie:</label>
                    <select class="form-select">
                      <option>PSS-7000 #12345</option>
                      <option>PSS-5000 #67890</option>
                      <option>PSS-3000 #11111</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Typ zgłoszenia:</label>
                    <select class="form-select">
                      <option>🔧 Konserwacja</option>
                      <option>⚡ Naprawa</option>
                      <option>📋 Przegląd</option>
                      <option>🔄 Kalibracja</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label>Priorytet:</label>
                  <select class="form-select">
                    <option>🔴 Wysoki</option>
                    <option>🟡 Średni</option>
                    <option>🟢 Niski</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Opis problemu:</label>
                  <textarea class="form-textarea" rows="4" placeholder="Opisz szczegółowo problem z urządzeniem..."></textarea>
                </div>
                <button class="btn-submit">📝 Utwórz Zgłoszenie</button>
              </div>
            </div>

            <!-- New Transport Action Content -->
            <div id="new-transport-content" class="action-content">
              <div class="form-container">
                <div class="form-row">
                  <div class="form-group">
                    <label>Kierowca:</label>
                    <select class="form-select">
                      <option>👤 Jan Kowalski</option>
                      <option>👤 Anna Nowak</option>
                      <option>👤 Piotr Wiśniewski</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Pojazd:</label>
                    <select class="form-select">
                      <option>🚚 FLT-001 (Mercedes Sprinter)</option>
                      <option>🚚 FLT-002 (Ford Transit)</option>
                      <option>🚚 FLT-003 (Volkswagen Crafter)</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label>Typ transportu:</label>
                  <select class="form-select">
                    <option>📤 Odbiór z klienta</option>
                    <option>📥 Dostawa do klienta</option>
                    <option>🔄 Transfer między magazynami</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Uwagi do transportu:</label>
                  <textarea class="form-textarea" rows="3" placeholder="Dodatkowe informacje..."></textarea>
                </div>
                <button class="btn-submit">🚚 Utwórz Transport</button>
              </div>
            </div>

            <!-- New Disposition Action Content -->
            <div id="new-disposition-content" class="action-content">
              <div class="form-container">
                <div class="form-row">
                  <div class="form-group">
                    <label>Typ dyspozycji:</label>
                    <select class="form-select">
                      <option>📥 Przyjęcie urządzeń</option>
                      <option>📤 Wydanie urządzeń</option>
                      <option>🔄 Przekazanie między magazynami</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Magazyn:</label>
                    <select class="form-select">
                      <option>🏭 Magazyn Główny</option>
                      <option>🏪 Magazyn Serwisowy</option>
                      <option>📦 Magazyn Zapasów</option>
                    </select>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label>Odpowiedzialny:</label>
                    <select class="form-select">
                      <option>👤 Magazynier A</option>
                      <option>👤 Magazynier B</option>
                      <option>👤 Kierownik Magazynu</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Data planowana:</label>
                    <input type="date" class="form-input" value="2025-10-09">
                  </div>
                </div>
                <button class="btn-submit">📦 Utwórz Dyspozycję</button>
              </div>
            </div>

            <!-- Export Action Content -->
            <div id="export-content" class="action-content">
              <div class="form-container">
                <div class="form-row">
                  <div class="form-group">
                    <label>Operacja:</label>
                    <select class="form-select" id="export-operation">
                      <option value="export">📊 Eksport do pliku</option>
                      <option value="backup">💾 Backup systemu</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Typ danych:</label>
                    <select class="form-select">
                      <option>📋 Zgłoszenia</option>
                      <option>⚙️ Serwisy</option>
                      <option>🚚 Transport</option>
                      <option>📦 Dyspozycje</option>
                      <option>🗄️ Wszystkie dane</option>
                    </select>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label>Format/Lokalizacja:</label>
                    <select class="form-select">
                      <option>📄 CSV</option>
                      <option>📗 Excel</option>
                      <option>📋 JSON</option>
                      <option>💾 Backup Archive (.bak)</option>
                      <option>☁️ Cloud Backup</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Zakres dat:</label>
                    <div class="form-row">
                      <input type="date" class="form-input" value="2025-10-01">
                      <input type="date" class="form-input" value="2025-10-08">
                    </div>
                  </div>
                </div>
                <div class="backup-options">
                  <label><input type="checkbox" checked> Kompresuj dane</label>
                  <label><input type="checkbox"> Szyfruj backup</label>
                  <label><input type="checkbox"> Weryfikuj integralność</label>
                  <label><input type="checkbox"> Automatyczny backup co tydzień</label>
                </div>
                <button class="btn-submit">💾 Wykonaj Operację</button>
              </div>
            </div>

            <!-- Import Action Content -->
            <div id="import-content" class="action-content">
              <div class="form-container">
                <div class="form-group">
                  <label>Wybierz plik:</label>
                  <input type="file" class="form-input" accept=".csv,.xlsx,.json">
                </div>
                <div class="form-group">
                  <label>Typ importu:</label>
                  <select class="form-select">
                    <option>📋 Zgłoszenia z Fleet Manager</option>
                    <option>⚙️ Harmonogram serwisów</option>
                    <option>🚚 Plan transportu</option>
                    <option>📦 Lista dyspozycji</option>
                  </select>
                </div>
                <div class="import-options">
                  <label><input type="checkbox" checked> Zastąp istniejące dane</label>
                  <label><input type="checkbox"> Utwórz kopię zapasową</label>
                  <label><input type="checkbox"> Sprawdź duplikaty</label>
                </div>
                <button class="btn-submit">📥 Importuj Dane</button>
              </div>
            </div>



            <!-- Service Section -->
            <div id="service-content" class="section-content">
              <div class="service-info">
                <div class="config-list">
                  <div class="config-item">
                    <span class="config-label">Endpoint:</span>
                    <span class="config-value">http://api.workshop.local</span>
                  </div>
                  <div class="config-item">
                    <span class="config-label">Status:</span>
                    <span class="config-value">✅ Połączony</span>
                  </div>
                  <div class="config-item">
                    <span class="config-label">Ostatni sync:</span>
                    <span class="config-value" id="last-sync-time">teraz</span>
                  </div>
                </div>
                <button class="btn-test-connection">🔌 Test połączenia</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Panel - Parameters -->
        <div class="right-panel">
          <!-- Notification Panel -->
          <div id="right-panel-notifications" class="notifications-panel"></div>
          
          <div class="params-section">
            <h3 class="params-title">Status Sync</h3>
            <div class="param-item">
              <span class="param-label">Połączenie:</span>
              <span class="param-value" id="connection-status">✅ Aktywne</span>
            </div>
            <div class="param-item">
              <span class="param-label">Ostatni sync:</span>
              <span class="param-value" id="last-sync">teraz</span>
            </div>
            <div class="param-item">
              <span class="param-label">Oczekujące:</span>
              <span class="param-value" id="pending-count">0</span>
            </div>
          </div>

        </div>
      </div>

      <!-- Notification Container -->
      <div id="notification-container" class="notification-container"></div>
    `;

    this.addStyles();
    this.setupEventListeners(container);

    return container;
  }

  private addStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      .connect-workshop-compact {
        height: 100%;
        overflow: hidden;
      }

      .compact-layout {
        display: flex;
        height: 365px;
        background: #f5f5f5;
      }

      /* Menu Columns */
      .menu-column {
        width: 100px;
        background: #2a2a2a;
        padding: 6px 4px;
        overflow-y: auto;
        flex-shrink: 0;
        border-right: 1px solid #1a1a1a;
      }

      .column-title {
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

      .menu-item, .section-item {
        width: 100%;
        background: #3a3a3a;
        border: none;
        padding: 5px 6px;
        margin-bottom: 4px;
        border-radius: 5px;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        transition: all 0.2s;
        color: #ccc;
      }

      .menu-icon {
        font-size: 18px;
      }

      .menu-label {
        font-size: 10px;
        font-weight: 500;
        text-align: center;
      }

      .menu-item:hover, .section-item:hover {
        background: #4a4a4a;
        color: white;
      }

      .menu-item.active, .section-item.active {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }

      /* Main Content */
      .main-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        background: white;
        overflow: hidden;
      }


      .content-body {
        flex: 1;
        padding: 10px;
        overflow-y: auto;
        position: relative;
      }

      .section-content {
        display: none;
      }

      .section-content.active {
        display: block;
      }

      /* Filters */
      .filters-compact {
        display: flex;
        gap: 8px;
        margin-bottom: 10px;
      }

      .filter-select, .filter-input {
        padding: 6px 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 12px;
      }

      .filter-select {
        min-width: 120px;
      }

      .filter-input {
        flex: 1;
      }

      /* Cards */
      .request-card, .transport-card, .disposition-card {
        background: white;
        border: 1px solid #e0e0e0;
        border-radius: 6px;
        padding: 10px;
        margin-bottom: 8px;
        transition: all 0.2s;
      }

      .request-card:hover, .transport-card:hover, .disposition-card:hover {
        border-color: #667eea;
        box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2);
      }

      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
        padding-bottom: 6px;
        border-bottom: 1px solid #f0f0f0;
      }

      .request-id, .transport-id, .disposition-id {
        font-weight: 600;
        font-size: 12px;
        color: #333;
      }

      .badge {
        padding: 3px 8px;
        border-radius: 10px;
        font-size: 10px;
        font-weight: 600;
      }

      .badge-pending { background: #fff3cd; color: #856404; }
      .badge-processing { background: #cfe2ff; color: #084298; }
      .badge-completed { background: #d1e7dd; color: #0f5132; }
      .badge-cancelled { background: #f8d7da; color: #842029; }
      .badge-active { background: #d1ecf1; color: #0c5460; }
      .badge-new { background: #e7e7ff; color: #4a4aff; }

      .card-body {
        font-size: 11px;
      }

      .info-line {
        display: flex;
        justify-content: space-between;
        margin-bottom: 4px;
      }

      .info-line .label {
        color: #666;
      }

      .info-line .value {
        color: #333;
        font-weight: 500;
      }

      /* Service Section */
      .service-info {
        padding: 10px;
      }

      .service-info h3 {
        margin: 0 0 10px 0;
        font-size: 13px;
      }

      .config-list {
        background: #f8f9fa;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 10px;
      }

      .config-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 6px;
        font-size: 11px;
      }

      .config-label {
        color: #666;
      }

      .config-value {
        font-weight: 500;
        color: #333;
      }

      .btn-test-connection {
        width: 100%;
        padding: 8px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 600;
      }

      /* Right Panel */
      .right-panel {
        width: 200px;
        background: #2a2a2a;
        padding: 10px;
        overflow-y: auto;
        flex-shrink: 0;
      }

      /* Notifications in Right Panel */
      .notifications-panel { margin-bottom: 10px; }
      .right-notification { 
        background: #4a4a4a; 
        border-left: 3px solid #28a745; 
        padding: 8px 10px; 
        margin-bottom: 6px; 
        border-radius: 4px; 
        font-size: 10px; 
        color: white; 
        animation: slideInRight 0.3s ease;
        cursor: pointer;
        transition: all 0.3s;
      }
      .right-notification.success { border-left-color: #28a745; }
      .right-notification.error { border-left-color: #dc3545; }
      .right-notification.info { border-left-color: #17a2b8; }
      .right-notification.warning { border-left-color: #ffc107; }
      .right-notification:hover { background: #5a5a5a; }
      .right-notification.removing { 
        animation: slideOutRight 0.3s ease;
        transform: translateX(100%);
        opacity: 0;
      }
      
      @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      
      @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }

      .params-section {
        margin-bottom: 15px;
      }

      .params-title {
        color: #999;
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        margin: 0 0 8px 0;
      }

      .param-item {
        background: #3a3a3a;
        padding: 8px;
        margin-bottom: 6px;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .param-label {
        font-size: 10px;
        color: #999;
      }

      .param-value {
        font-size: 13px;
        color: #fff;
        font-weight: 600;
      }

      /* Quick action button removed - actions moved to main menu */

      /* Notification */
      .notification-container {
        position: fixed;
        top: 45px;
        right: 10px;
        z-index: 1000;
        max-width: 300px;
      }

      /* Scrollbars */
      .menu-column::-webkit-scrollbar,
      .content-body::-webkit-scrollbar,
      .right-panel::-webkit-scrollbar {
        width: 4px;
      }

      .menu-column::-webkit-scrollbar-track,
      .right-panel::-webkit-scrollbar-track {
        background: #1a1a1a;
      }

      .content-body::-webkit-scrollbar-track {
        background: #f0f0f0;
      }

      .menu-column::-webkit-scrollbar-thumb,
      .right-panel::-webkit-scrollbar-thumb {
        background: #555;
        border-radius: 2px;
      }

      .content-body::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 2px;
      }

      /* Action Content */
      .action-content { display: none; }
      .action-content.active { display: block; }
      
      /* Form Styles */
      .form-container { background: #f8f9fa; padding: 20px; border-radius: 8px; }
      .form-row { display: flex; gap: 15px; margin-bottom: 15px; }
      .form-group { flex: 1; }
      .form-group label { display: block; margin-bottom: 5px; font-size: 11px; font-weight: 600; color: #666; }
      .form-input, .form-select, .form-textarea { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 12px; }
      .form-textarea { resize: vertical; font-family: inherit; }
      .btn-submit { width: 100%; padding: 12px; background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600; margin-top: 10px; }
      .btn-sync { width: 100%; padding: 12px; background: linear-gradient(135deg, #17a2b8 0%, #138496 100%); color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600; margin-top: 15px; }

      /* Sync Status */
      .sync-status { background: #f8f9fa; padding: 10px 20px; border-radius: 8px; }
      .sync-info { margin: 15px 0; }
      .sync-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e9ecef; }
      .sync-item:last-child { border-bottom: none; }
      .sync-label { font-size: 12px; color: #666; font-weight: 600; }
      .sync-value { font-size: 12px; color: #333; font-weight: 600; }

      /* Import Options */
      .import-options { margin: 15px 0; }
      .import-options label { display: block; margin-bottom: 8px; font-size: 12px; cursor: pointer; }
      .import-options input[type="checkbox"] { margin-right: 8px; }

      /* Backup Options */
      .backup-options { margin: 15px 0; }
      .backup-options label { display: block; margin-bottom: 8px; font-size: 12px; cursor: pointer; }
      .backup-options input[type="checkbox"] { margin-right: 8px; }

      /* Service Cards */
      .service-card { background: white; border: 1px solid #e0e0e0; border-radius: 6px; padding: 12px; margin-bottom: 10px; }
      .service-id { font-weight: 600; font-size: 12px; color: #333; }
      .badge-active { background: #d1ecf1; color: #0c5460; padding: 2px 8px; border-radius: 4px; font-size: 10px; }
      .badge-completed { background: #d4edda; color: #155724; padding: 2px 8px; border-radius: 4px; font-size: 10px; }

      /* Search Workshop Styles */
      .search-workshop { padding: 20px; }
      .search-input-row { display: flex; gap: 10px; margin-bottom: 15px; }
      .search-input { flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 12px; }
      .btn-search { padding: 10px 15px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; }
      .search-filters { display: flex; gap: 10px; margin-bottom: 20px; }
      .filter-select { padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 11px; background: white; }
      
      /* Search Results */
      .search-results { max-height: 250px; overflow-y: auto; }
      .result-item { display: flex; align-items: center; padding: 12px; margin-bottom: 8px; background: white; border: 1px solid #e0e0e0; border-radius: 6px; cursor: pointer; transition: all 0.2s; }
      .result-item:hover { border-color: #667eea; background: #f8f9ff; }
      .result-icon { width: 30px; height: 30px; background: #667eea; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 14px; }
      .result-details { flex: 1; }
      .result-title { font-size: 12px; font-weight: 600; color: #333; margin-bottom: 3px; }
      .result-description { font-size: 10px; color: #666; margin-bottom: 2px; }
      .result-id { font-size: 9px; color: #999; font-weight: 600; }
      .result-status { padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: 600; }
      
      /* Badge Styles */
      .badge { padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: 600; text-align: center; }
      .badge-pending { background: #fff3cd; color: #856404; }
      .badge-active { background: #d1ecf1; color: #0c5460; }
      .badge-completed { background: #d1e7dd; color: #0f5132; }
    `;
    document.head.appendChild(style);
  }

  private setupEventListeners(container: HTMLElement): void {
    // Actions
    const actionButtons = container.querySelectorAll('[data-action]');
    actionButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const action = target.getAttribute('data-action');
        if (action) {
          this.handleAction(action, container);
        }
      });
    });

    // Sections
    const sectionButtons = container.querySelectorAll('[data-section]');
    sectionButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const section = target.getAttribute('data-section');
        if (section) {
          this.switchSection(section, container);
        }
      });
    });

    // Force sync functionality moved to Sync action in main menu
    
    // Initialize search results with default section (requests)
    this.updateSearchResults(container, this.currentSection);
  }

  private handleAction(action: string, container: HTMLElement): void {
    this.currentAction = action;

    // Update active state
    container.querySelectorAll('[data-action]').forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-action') === action) {
        item.classList.add('active');
      }
    });

    // Hide all action contents
    container.querySelectorAll('.action-content').forEach(content => {
      content.classList.remove('active');
    });

    // Show selected action content
    const activeContent = container.querySelector(`#${action}-content`);
    if (activeContent) {
      activeContent.classList.add('active');
    }

    // Synchronize forms with current section context
    this.updateActionFormsContext(container, action);

    // Update top-bar title
    const sectionTitles: any = {
      'requests': 'Zgłoszenia',
      'services': 'Serwisy',
      'transport': 'Transport',
      'dispositions': 'Dyspozycje'
    };

    const actionTitles: any = {
      'search': 'Szukaj',
      'sync': 'Sync',
      'new-request': 'Nowe Zgłoszenie',
      'export': 'Eksport i Backup',
      'import': 'Import Danych'
    };

    const currentSectionName = sectionTitles[this.currentSection] || 'Obiekty';
    const topBarTitle = document.getElementById('top-bar-section-title');
    if (topBarTitle) {
      topBarTitle.textContent = `ConnectWorkshop - ${currentSectionName} - ${actionTitles[action]}`;
    }

    // Update status
    const statusAction = container.querySelector('#status-action');
    if (statusAction) statusAction.textContent = actionTitles[action];

    const sectionNames = sectionTitles[this.currentSection] || 'obiektów';
    switch (action) {
      case 'search':
        this.showNotification(`🔍 Wyszukiwanie w ${sectionNames}`, 'info');
        // Update search results when switching to search action
        this.updateSearchResults(container, this.currentSection);
        break;
      case 'sync':
        this.showNotification(`🔄 Synchronizacja ${sectionNames}`, 'info');
        break;
      case 'new-request':
        this.showNotification(`➕ Nowe zgłoszenie dla ${sectionNames}`, 'info');
        break;
      case 'export':
        this.showNotification(`📊 Eksport i backup ${sectionNames}`, 'info');
        break;
      case 'import':
        this.showNotification(`📥 Import ${sectionNames}`, 'info');
        break;
    }
  }

  private switchSection(section: string, container: HTMLElement): void {
    this.currentSection = section;

    // Update section menu
    container.querySelectorAll('[data-section]').forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-section') === section) {
        item.classList.add('active');
      }
    });

    // Update content
    container.querySelectorAll('.section-content').forEach(content => {
      content.classList.remove('active');
    });
    const activeContent = container.querySelector(`#${section}-content`);
    if (activeContent) {
      activeContent.classList.add('active');
    }

    // Synchronize forms with the new section context
    this.updateActionFormsContext(container, this.currentAction);

    // Update search results if current action is search
    if (this.currentAction === 'search') {
      this.updateSearchResults(container, section);
    }

    // Update title in top-bar
    const titles = {
      'requests': 'ConnectWorkshop - Zgłoszenia',
      'services': 'ConnectWorkshop - Serwisy',
      'transport': 'ConnectWorkshop - Transport',
      'dispositions': 'ConnectWorkshop - Dyspozycje'
    };
    const topBarTitle = document.getElementById('top-bar-section-title');
    if (topBarTitle) {
      topBarTitle.textContent = titles[section as keyof typeof titles] || 'ConnectWorkshop';
    }
  }

  private updateSearchResults(container: HTMLElement, section: string): void {
    const searchResults = container.querySelector('.search-results');
    if (!searchResults) {
      console.warn('Search results container not found');
      return;
    }
    
    console.log(`🔄 Updating search results for section: ${section}`);

    // Define different data sets for each section
    const sectionData: any = {
      'requests': [
        { icon: '📋', id: 'REQ-001', title: 'Awaria PSS-7000', desc: 'Urządzenie: PSS-7000 #12345', status: 'Otwarte', badge: 'badge-pending' },
        { icon: '📋', id: 'REQ-002', title: 'Kalibracja PSS-5000', desc: 'Urządzenie: PSS-5000 #67890', status: 'W trakcie', badge: 'badge-active' },
        { icon: '📋', id: 'REQ-003', title: 'Serwis PSS-3000', desc: 'Urządzenie: PSS-3000 #11111', status: 'Zakończone', badge: 'badge-completed' }
      ],
      'services': [
        { icon: '⚙️', id: 'SERV-001', title: 'Serwis okresowy', desc: 'Technik: Jan Kowalski', status: 'Aktywny', badge: 'badge-active' },
        { icon: '⚙️', id: 'SERV-002', title: 'Naprawa główna', desc: 'Technik: Anna Nowak', status: 'Zakończony', badge: 'badge-completed' },
        { icon: '⚙️', id: 'SERV-003', title: 'Konserwacja', desc: 'Technik: Piotr Wiśniewski', status: 'Zaplanowany', badge: 'badge-pending' }
      ],
      'transport': [
        { icon: '🚚', id: 'TRANS-001', title: 'Dostawa urządzeń', desc: 'Kierowca: Jan Kowalski', status: 'W drodze', badge: 'badge-active' },
        { icon: '🚚', id: 'TRANS-002', title: 'Odbiór z serwisu', desc: 'Kierowca: Anna Nowak', status: 'Zakończony', badge: 'badge-completed' },
        { icon: '🚚', id: 'TRANS-003', title: 'Transport awaryjny', desc: 'Kierowca: Piotr Wiśniewski', status: 'Zaplanowany', badge: 'badge-pending' }
      ],
      'dispositions': [
        { icon: '📦', id: 'DISP-001', title: 'Wydanie PSS-7000', desc: 'Magazyn A → Sekcja 1', status: 'Wydane', badge: 'badge-completed' },
        { icon: '📦', id: 'DISP-002', title: 'Przyjęcie PSS-5000', desc: 'Serwis → Magazyn B', status: 'W trakcie', badge: 'badge-active' },
        { icon: '📦', id: 'DISP-003', title: 'Transfer urządzeń', desc: 'Magazyn A → Magazyn B', status: 'Zaplanowane', badge: 'badge-pending' }
      ]
    };

    const data = sectionData[section] || sectionData['requests'];
    
    searchResults.innerHTML = data.map((item: any) => `
      <div class="result-item">
        <div class="result-icon">${item.icon}</div>
        <div class="result-details">
          <div class="result-title">${item.title}</div>
          <div class="result-description">${item.desc}</div>
          <span class="result-id">${item.id}</span>
        </div>
        <span class="badge ${item.badge}">${item.status}</span>
      </div>
    `).join('');
    
    console.log(`✅ Search results updated with ${data.length} items for ${section}`);
  }

  private forceSync(container: HTMLElement): void {
    this.showNotification('🔄 Synchronizacja w trakcie...', 'info');
    
    // Simulate sync
    setTimeout(() => {
      const lastSyncEl = container.querySelector('#last-sync');
      const lastSyncTimeEl = container.querySelector('#last-sync-time');
      const now = new Date().toLocaleTimeString();
      
      if (lastSyncEl) lastSyncEl.textContent = `teraz`;
      if (lastSyncTimeEl) lastSyncTimeEl.textContent = `teraz`;
      
      this.showNotification('✅ Synchronizacja zakończona', 'success');
    }, 1500);
  }

  private updateActionFormsContext(container: HTMLElement, action: string): void {
    const sectionTitles: any = {
      'requests': 'Zgłoszenia',
      'services': 'Serwisy',
      'transport': 'Transport',
      'dispositions': 'Dyspozycje'
    };

    const currentSectionName = sectionTitles[this.currentSection] || 'Obiekty';

    // Update form titles based on current section
    const newRequestTitle = container.querySelector('#new-request-content h4');
    if (newRequestTitle) newRequestTitle.textContent = `➕ Nowe Zgłoszenie - ${currentSectionName}`;

    const exportTitle = container.querySelector('#export-content h4');
    if (exportTitle) exportTitle.textContent = `📊 Eksport i Backup - ${currentSectionName}`;

    const importTitle = container.querySelector('#import-content h4');
    if (importTitle) importTitle.textContent = `📥 Import - ${currentSectionName}`;

    // Update form fields based on section type
    this.updateSectionForms(container, this.currentSection);
  }

  private updateSectionForms(container: HTMLElement, sectionType: string): void {
    // Update type options in export form based on current section
    const exportTypeSelect = container.querySelector('#export-content .form-select:nth-of-type(2)');
    if (exportTypeSelect) {
      const sectionOptions: any = {
        'requests': ['📋 Zgłoszenia', '🔧 Serwisy do zgłoszeń', '👤 Użytkownicy zgłoszeń'],
        'services': ['⚙️ Serwisy', '📋 Raporty serwisowe', '🔧 Historia napraw'],
        'transport': ['🚚 Transport', '📦 Paczki', '🗓️ Harmonogramy dostaw'],
        'dispositions': ['📦 Dyspozycje', '🏭 Lokalizacje', '📊 Statusy dyspozycji']
      };

      const options = sectionOptions[sectionType] || sectionOptions['requests'];
      exportTypeSelect.innerHTML = '';
      
      options.forEach((option: string) => {
        const optionElement = document.createElement('option');
        optionElement.textContent = option;
        exportTypeSelect.appendChild(optionElement);
      });
    }

    // Update import type options
    const importTypeSelect = container.querySelector('#import-content .form-select:nth-of-type(2)');
    if (importTypeSelect) {
      const importOptions: any = {
        'requests': ['📋 Zgłoszenia z Fleet Manager', '🔧 Dane serwisowe'],
        'services': ['⚙️ Harmonogram serwisów', '📊 Raporty serwisowe'],
        'transport': ['🚚 Plan transportu', '📦 Lista przesyłek'],
        'dispositions': ['📦 Lista dyspozycji', '🏭 Mapowanie lokalizacji']
      };

      const options = importOptions[sectionType] || importOptions['requests'];
      importTypeSelect.innerHTML = '';
      
      options.forEach((option: string) => {
        const optionElement = document.createElement('option');
        optionElement.textContent = option;
        importTypeSelect.appendChild(optionElement);
      });
    }
  }

  private showNotification(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info'): void {
    const notificationsPanel = document.getElementById('right-panel-notifications');
    if (!notificationsPanel) return;

    // Limit to max 2 notifications
    const existing = notificationsPanel.querySelectorAll('.right-notification');
    if (existing.length >= 2) {
      // Remove oldest notification
      const oldest = existing[0];
      oldest.classList.add('removing');
      setTimeout(() => oldest.remove(), 300);
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `right-notification ${type}`;
    notification.textContent = message;

    // Add click to dismiss
    notification.addEventListener('click', () => {
      notification.classList.add('removing');
      setTimeout(() => notification.remove(), 300);
    });

    // Auto-remove after 4 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.classList.add('removing');
        setTimeout(() => notification.remove(), 300);
      }
    }, 4000);

    notificationsPanel.appendChild(notification);
  }
}
