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
          <button class="menu-item active" data-action="sync">
            <span class="menu-icon">🔄</span>
            <span class="menu-label">Sync</span>
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
        </div>

        <!-- Main Content -->
        <div class="main-content">
          <div class="content-body">
            <!-- Sync Action Content -->
            <div id="sync-content" class="action-content active">
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
                <h4>➕ Nowe Zgłoszenie</h4>
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
                <h4>🚚 Nowy Transport</h4>
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
                <h4>📦 Nowa Dyspozycja</h4>
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
                <h4>📥 Import Danych</h4>
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

            <!-- Services Section -->
            <div id="services-content" class="section-content">
              <div class="services-list">
                <div class="service-card">
                  <div class="card-header">
                    <span class="service-id">⚙️ SERV-001</span>
                    <span class="badge badge-active">Aktywny</span>
                  </div>
                  <div class="card-body">
                    <div class="info-line">
                      <span class="label">Urządzenie:</span>
                      <span class="value">PSS-7000 #12345</span>
                    </div>
                    <div class="info-line">
                      <span class="label">Technik:</span>
                      <span class="value">Jan Kowalski</span>
                    </div>
                    <div class="info-line">
                      <span class="label">Status:</span>
                      <span class="value">W trakcie</span>
                    </div>
                  </div>
                </div>
                <div class="service-card">
                  <div class="card-header">
                    <span class="service-id">⚙️ SERV-002</span>
                    <span class="badge badge-completed">Zakończony</span>
                  </div>
                  <div class="card-body">
                    <div class="info-line">
                      <span class="label">Urządzenie:</span>
                      <span class="value">PSS-5000 #67890</span>
                    </div>
                    <div class="info-line">
                      <span class="label">Technik:</span>
                      <span class="value">Anna Nowak</span>
                    </div>
                    <div class="info-line">
                      <span class="label">Status:</span>
                      <span class="value">Zakończony</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Requests Section -->
            <div id="requests-content" class="section-content active">
              <div class="filters-compact">
                <select id="status-filter" class="filter-select">
                  <option value="">Wszystkie</option>
                  <option value="pending">⏳ Pending</option>
                  <option value="processing">⚙️ Processing</option>
                  <option value="completed">✅ Completed</option>
                  <option value="cancelled">❌ Cancelled</option>
                </select>
                <input type="text" id="search-requests" class="filter-input" placeholder="Szukaj...">
              </div>
              
              <div class="requests-list" id="requests-list">
                <div class="request-card">
                  <div class="card-header">
                    <span class="request-id">#REQ-001</span>
                    <span class="badge badge-pending">⏳ Pending</span>
                  </div>
                  <div class="card-body">
                    <div class="info-line">
                      <span class="label">Urządzenie:</span>
                      <span class="value">PSS-7000 #12345</span>
                    </div>
                    <div class="info-line">
                      <span class="label">Typ:</span>
                      <span class="value">Konserwacja</span>
                    </div>
                    <div class="info-line">
                      <span class="label">Priorytet:</span>
                      <span class="value">🔴 Wysoki</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Transport Section -->
            <div id="transport-content" class="section-content">
              <div class="transport-list">
                <div class="transport-card">
                  <div class="card-header">
                    <span class="transport-id">🚚 TRANS-001</span>
                    <span class="badge badge-active">Aktywny</span>
                  </div>
                  <div class="card-body">
                    <div class="info-line">
                      <span class="label">Kierowca:</span>
                      <span class="value">Jan Kowalski</span>
                    </div>
                    <div class="info-line">
                      <span class="label">Urządzenia:</span>
                      <span class="value">12 szt.</span>
                    </div>
                    <div class="info-line">
                      <span class="label">Status:</span>
                      <span class="value">W drodze</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Dispositions Section -->
            <div id="dispositions-content" class="section-content">
              <div class="dispositions-list">
                <div class="disposition-card">
                  <div class="card-header">
                    <span class="disposition-id">📦 DISP-001</span>
                    <span class="badge badge-new">Nowy</span>
                  </div>
                  <div class="card-body">
                    <div class="info-line">
                      <span class="label">Typ:</span>
                      <span class="value">Przyjęcie</span>
                    </div>
                    <div class="info-line">
                      <span class="label">Data:</span>
                      <span class="value">2025-10-08</span>
                    </div>
                    <div class="info-line">
                      <span class="label">Ilość:</span>
                      <span class="value">5 urządzeń</span>
                    </div>
                  </div>
                </div>
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

          <div class="params-section">
            <h3 class="params-title">Statystyki</h3>
            <div class="param-item">
              <span class="param-label">Requests:</span>
              <span class="param-value">12</span>
            </div>
            <div class="param-item">
              <span class="param-label">Transport:</span>
              <span class="param-value">3</span>
            </div>
            <div class="param-item">
              <span class="param-label">Dyspozycje:</span>
              <span class="param-value">8</span>
            </div>
          </div>

          <div class="params-section">
            <h3 class="params-title">Szybkie akcje</h3>
            <button class="quick-action-btn" id="force-sync-btn">
              <span>🔄</span>
              <span>Force Sync</span>
            </button>
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
        padding: 10px 6px;
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

      .quick-action-btn {
        width: 100%;
        background: #3a3a3a;
        border: none;
        padding: 10px;
        margin-bottom: 6px;
        border-radius: 5px;
        cursor: pointer;
        color: #ccc;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        font-size: 11px;
        transition: all 0.2s;
      }

      .quick-action-btn:hover {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }

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
      .form-container h4 { margin: 0 0 20px 0; font-size: 14px; color: #333; font-weight: 600; }
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

    // Force sync button
    const forceSyncBtn = container.querySelector('#force-sync-btn');
    forceSyncBtn?.addEventListener('click', () => {
      this.forceSync(container);
    });
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

    // Update top-bar title
    const actionTitles: any = {
      'sync': 'Sync',
      'new-request': 'Nowe Zgłoszenie',
      'export': 'Eksport i Backup',
      'import': 'Import Danych'
    };

    const topBarTitle = document.getElementById('top-bar-section-title');
    if (topBarTitle) {
      topBarTitle.textContent = `ConnectWorkshop - ${actionTitles[action]}`;
    }

    // Update status
    const statusAction = container.querySelector('#status-action');
    if (statusAction) statusAction.textContent = actionTitles[action];

    switch (action) {
      case 'sync':
        this.showNotification('🔄 Tryb synchronizacji aktywny', 'info');
        break;
      case 'new-request':
        this.showNotification('➕ Formularz nowego zgłoszenia', 'info');
        break;
      case 'export':
        this.showNotification('📊 Eksport i backup danych', 'info');
        break;
      case 'import':
        this.showNotification('📥 Import danych do systemu', 'info');
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

  private showNotification(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    const container = document.getElementById('notification-container');
    if (!container) return;

    const colors = {
      success: '#4caf50',
      error: '#f44336',
      info: '#2196f3'
    };

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
      <div style="font-size: 12px; color: ${colors[type]}; font-weight: 600;">
        ${message}
      </div>
    `;
    
    container.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}
