import { ConnectTestModule } from './connect-test.module';

export class ConnectTestView {
  private module: ConnectTestModule;
  private currentSection: string = 'identification';
  private currentMethod: string = 'list';

  constructor(module: ConnectTestModule) {
    this.module = module;
  }

  render(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'connect-test-compact';
    
    // Update top-bar submenu
    const submenu = document.getElementById('top-bar-submenu');
    if (submenu) submenu.textContent = '🧪 Test Module';
    
    // Update top-bar section title
    const sectionTitle = document.getElementById('top-bar-section-title');
    if (sectionTitle) sectionTitle.textContent = 'ConnectTest - Urządzenia';
    
    container.innerHTML = `
      <div class="compact-layout">
        <div class="menu-column">
          <h3 class="column-title">Sekcje</h3>
          <button class="menu-item active" data-section="identification">
            <span class="menu-icon">📱</span>
            <span class="menu-label">Urządzenia</span>
          </button>
          <button class="menu-item" data-section="testing">
            <span class="menu-icon">🧪</span>
            <span class="menu-label">Testowanie</span>
          </button>
          <button class="menu-item" data-section="reports">
            <span class="menu-icon">📋</span>
            <span class="menu-label">Raporty</span>
          </button>
        </div>

        <!-- Column 2: Interface (shown only for Identification) -->
        <div class="menu-column" id="interface-column" style="display: block;">
          <h3 class="column-title">Interfejs</h3>
          <button class="method-item" data-method="rfid">
            <span class="menu-icon">📡</span>
            <span class="menu-label">RFID</span>
          </button>
          <button class="method-item" data-method="qr">
            <span class="menu-icon">📷</span>
            <span class="menu-label">QR</span>
          </button>
          <button class="method-item" data-method="barcode">
            <span class="menu-icon">📊</span>
            <span class="menu-label">Barcode</span>
          </button>
          <button class="method-item" data-method="manual">
            <span class="menu-icon">⌨️</span>
            <span class="menu-label">Keyboard</span>
          </button>
          <button class="method-item active" data-method="list">
            <span class="menu-icon">📋</span>
            <span class="menu-label">Z listy</span>
          </button>
        </div>

        <div class="main-content">
          <div class="content-body">
            <!-- Identification Section -->
            <div id="identification-content" class="section-content active">
              <h3 id="identification-title">📱 Urządzenia - Z listy</h3>
              
              <!-- RFID Method -->
              <div id="rfid-method" class="method-content">
                <div class="scan-area">
                  <div class="scan-icon">📡</div>
                  <p>Przyłóż kartę RFID do czytnika...</p>
                  <button class="btn-simulate" onclick="alert('Symulacja RFID: #RF123456')">Symuluj skan</button>
                </div>
                <div class="last-scan">
                  <strong>Ostatnie skanowanie:</strong> -
                </div>
              </div>

              <!-- QR Method -->
              <div id="qr-method" class="method-content">
                <div class="scan-area">
                  <div class="scan-icon">📷</div>
                  <p>Zeskanuj kod QR na urządzeniu...</p>
                  <button class="btn-simulate" onclick="alert('Symulacja QR: #QR789012')">Symuluj skan</button>
                </div>
                <div class="last-scan">
                  <strong>Ostatnie skanowanie:</strong> -
                </div>
              </div>

              <!-- Barcode Method -->
              <div id="barcode-method" class="method-content">
                <div class="scan-area">
                  <div class="scan-icon">📊</div>
                  <p>Zeskanuj kod kreskowy...</p>
                  <button class="btn-simulate" onclick="alert('Symulacja Barcode: #BC345678')">Symuluj skan</button>
                </div>
                <div class="last-scan">
                  <strong>Ostatnie skanowanie:</strong> -
                </div>
              </div>

              <!-- Manual Method -->
              <div id="manual-method" class="method-content">
                <div class="manual-input-area">
                  <label>Wprowadź kod urządzenia:</label>
                  <input type="text" class="manual-input" placeholder="Wpisz kod..." />
                  <button class="btn-submit-manual">Zatwierdź</button>
                </div>
              </div>

              <!-- List Method -->
              <div id="list-method" class="method-content active">
                <div class="device-list-select">
                  <h4>Wybierz urządzenie z listy:</h4>
                  <div class="device-card selectable">
                    <div class="device-icon">📱</div>
                    <div class="device-info">
                      <div class="device-name">PSS-7000 #12345</div>
                      <div class="device-meta">RFID: RF123456</div>
                    </div>
                    <button class="btn-select-device">Wybierz</button>
                  </div>
                  <div class="device-card selectable">
                    <div class="device-icon">📱</div>
                    <div class="device-info">
                      <div class="device-name">PSS-5000 #67890</div>
                      <div class="device-meta">RFID: RF789012</div>
                    </div>
                    <button class="btn-select-device">Wybierz</button>
                  </div>
                  <div class="device-card selectable">
                    <div class="device-icon">📱</div>
                    <div class="device-info">
                      <div class="device-name">PSS-3000 #11111</div>
                      <div class="device-meta">RFID: RF111111</div>
                    </div>
                    <button class="btn-select-device">Wybierz</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Testing Section -->
            <div id="testing-content" class="section-content">
              <h3>🧪 Testowanie</h3>
              <div class="test-progress">
                <div class="progress-header">
                  <span>Test w trakcie...</span>
                  <span id="progress-percent">0%</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" style="width: 0%"></div>
                </div>
              </div>
              <div class="test-steps">
                <div class="test-step">
                  <span class="step-icon">⏳</span>
                  <span class="step-name">Test szczelności</span>
                  <span class="step-status">Oczekuje</span>
                </div>
                <div class="test-step">
                  <span class="step-icon">⏳</span>
                  <span class="step-name">Test przepływu</span>
                  <span class="step-status">Oczekuje</span>
                </div>
                <div class="test-step">
                  <span class="step-icon">⏳</span>
                  <span class="step-name">Test funkcjonalny</span>
                  <span class="step-status">Oczekuje</span>
                </div>
              </div>
              <button class="btn-start-test">▶️ Rozpocznij Test</button>
            </div>

            <!-- Reports Section -->
            <div id="reports-content" class="section-content">
              <h3>📋 Raporty Urządzeń</h3>
              <div class="reports-list">
                <div class="report-card">
                  <div class="report-header">
                    <span class="report-date">2025-10-08 17:30</span>
                    <span class="report-status success">✅ Pozytywny</span>
                  </div>
                  <div class="report-device">PSS-7000 #12345</div>
                  <div class="report-tests">3 testy: Szczelność, Przepływ, Funkcjonalny</div>
                  <button class="btn-view-report">Pokaż szczegóły</button>
                </div>
                <div class="report-card">
                  <div class="report-header">
                    <span class="report-date">2025-10-08 16:15</span>
                    <span class="report-status error">❌ Negatywny</span>
                  </div>
                  <div class="report-device">PSS-5000 #67890</div>
                  <div class="report-tests">Test szczelności: Błąd</div>
                  <button class="btn-view-report">Pokaż szczegóły</button>
                </div>
              </div>
            </div>

            <!-- Debug Section -->
            <div id="debug-content" class="section-content">
              <h3>🔧 Debug</h3>
              <div class="debug-console">
                <div class="console-output">
                  <div class="log-entry info">[18:15:00] System initialized</div>
                  <div class="log-entry success">[18:15:01] ✓ RFID reader connected</div>
                  <div class="log-entry success">[18:15:02] ✓ Database connected</div>
                  <div class="log-entry info">[18:15:03] Waiting for device...</div>
                </div>
                <div class="console-actions">
                  <button class="btn-console">Clear Console</button>
                  <button class="btn-console">Export Logs</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="right-panel">
          <div class="params-section">
            <h3 class="params-title">Status</h3>
            <div class="param-item">
              <span class="param-label">Aktywna sekcja:</span>
              <span class="param-value" id="active-section">Urządzenia</span>
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
      .menu-item { width: 100%; background: #3a3a3a; border: none; padding: 5px 6px; margin-bottom: 4px; border-radius: 5px; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 4px; transition: all 0.2s; color: #ccc; }
      .menu-icon { font-size: 18px; }
      .menu-label { font-size: 12px;; font-weight: 500; text-align: center; }
      .menu-item:hover { background: #4a4a4a; color: white; }
      .menu-item.active { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
      .main-content { flex: 1; display: flex; flex-direction: column; background: white; overflow: hidden; }
      .content-body { flex: 1; padding: 15px; overflow-y: auto; }
      .right-panel { width: 200px; background: #2a2a2a; padding: 10px; overflow-y: auto; flex-shrink: 0; }
      .params-section { margin-bottom: 15px; }
      .params-title { color: #999; font-size: 11px; font-weight: 600; text-transform: uppercase; margin: 0 0 8px 0; }
      .param-item { background: #3a3a3a; padding: 8px; margin-bottom: 6px; border-radius: 4px; display: flex; flex-direction: column; gap: 4px; }
      .param-label { font-size: 10px; color: #999; }
      .param-value { font-size: 13px; color: #fff; font-weight: 600; }

      /* Section Content */
      .section-content { display: none; }
      .section-content.active { display: block; }
      .section-content h3 { margin: 0 0 15px 0; font-size: 14px; color: #333; }

      /* Method Content */
      .method-content { display: none; }
      .method-content.active { display: block; }
      
      /* Method Items */
      .method-item { width: 100%; padding: 10px; background: #3a3a3a; border: none; color: white; cursor: pointer; display: flex; align-items: center; gap: 10px; border-radius: 4px; margin-bottom: 6px; transition: all 0.2s; }
      .method-item:hover { background: #4a4a4a; }
      .method-item.active { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }

      /* Test Form */
      .test-form { background: #f8f9fa; padding: 15px; border-radius: 5px; }
      .form-group { margin-bottom: 15px; }
      .form-group label { display: block; margin-bottom: 5px; font-size: 11px; font-weight: 600; color: #666; }
      .form-select { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 12px; }
      .scan-area { text-align: center; padding: 30px; background: white; border: 2px dashed #ddd; border-radius: 5px; }
      .scan-icon { font-size: 48px; margin-bottom: 10px; }
      .scan-area p { margin: 0 0 15px 0; color: #666; font-size: 12px; }
      .btn-simulate { padding: 8px 16px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px; }
      .last-scan { margin-top: 15px; padding: 10px; background: #f8f9fa; border-radius: 4px; font-size: 11px; }
      
      /* Manual Input */
      .manual-input-area { background: #f8f9fa; padding: 20px; border-radius: 5px; }
      .manual-input-area label { display: block; margin-bottom: 10px; font-size: 12px; font-weight: 600; color: #333; }
      .manual-input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 12px; margin-bottom: 10px; }
      .btn-submit-manual { width: 100%; padding: 10px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: 600; }
      
      /* Device List Select */
      .device-list-select h4 { margin: 0 0 15px 0; font-size: 13px; color: #333; }
      .device-card.selectable { cursor: pointer; transition: all 0.2s; }
      .device-card.selectable:hover { border-color: #667eea; box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2); }
      .device-meta { font-size: 10px; color: #999; margin-top: 2px; }
      .btn-select-device { padding: 6px 12px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px; }

      /* Device List */
      .device-list { display: flex; flex-direction: column; gap: 10px; }
      .device-card { display: flex; align-items: center; gap: 12px; background: white; border: 1px solid #e0e0e0; border-radius: 6px; padding: 12px; }
      .device-icon { font-size: 32px; }
      .device-info { flex: 1; }
      .device-name { font-weight: 600; font-size: 12px; margin-bottom: 4px; }
      .device-status { font-size: 11px; color: #4caf50; }
      .btn-select { padding: 6px 12px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px; }

      /* Testing Section */
      .test-progress { background: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 15px; }
      .progress-header { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 12px; font-weight: 600; }
      .progress-bar { height: 8px; background: #e0e0e0; border-radius: 4px; overflow: hidden; }
      .progress-fill { height: 100%; background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); transition: width 0.3s; }
      .test-steps { margin-bottom: 15px; }
      .test-step { display: flex; align-items: center; gap: 10px; padding: 10px; background: white; border: 1px solid #e0e0e0; border-radius: 4px; margin-bottom: 8px; }
      .step-icon { font-size: 18px; }
      .step-name { flex: 1; font-size: 11px; font-weight: 500; }
      .step-status { font-size: 11px; color: #666; }
      .btn-start-test { width: 100%; padding: 10px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 12px; font-weight: 600; }

      /* Reports */
      .reports-list { display: flex; flex-direction: column; gap: 10px; }
      .report-card { background: white; border: 1px solid #e0e0e0; border-radius: 6px; padding: 12px; }
      .report-header { display: flex; justify-content: space-between; margin-bottom: 8px; }
      .report-date { font-size: 11px; color: #666; }
      .report-status { font-size: 11px; padding: 3px 8px; border-radius: 10px; }
      .report-status.success { background: #d1e7dd; color: #0f5132; }
      .report-status.error { background: #f8d7da; color: #842029; }
      .report-device { font-weight: 600; font-size: 12px; margin-bottom: 4px; }
      .report-tests { font-size: 11px; color: #666; margin-bottom: 10px; }
      .btn-view-report { padding: 6px 12px; background: #e0e0e0; border: none; border-radius: 4px; cursor: pointer; font-size: 11px; }

      /* Debug Console */
      .debug-console { background: #1e1e1e; border-radius: 5px; padding: 10px; }
      .console-output { background: #000; color: #0f0; font-family: 'Courier New', monospace; font-size: 10px; padding: 10px; border-radius: 4px; max-height: 200px; overflow-y: auto; margin-bottom: 10px; }
      .log-entry { margin-bottom: 4px; }
      .log-entry.info { color: #00bfff; }
      .log-entry.success { color: #0f0; }
      .log-entry.error { color: #f00; }
      .console-actions { display: flex; gap: 8px; }
      .btn-console { flex: 1; padding: 6px; background: #333; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px; }
    `;
    document.head.appendChild(style);
  }

  private setupEventListeners(container: HTMLElement): void {
    // Section buttons
    const menuItems = container.querySelectorAll('[data-section]');
    menuItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const section = target.getAttribute('data-section');
        if (section) this.switchSection(section, container);
      });
    });

    // Method buttons (for Identification)
    const methodItems = container.querySelectorAll('[data-method]');
    methodItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const method = target.getAttribute('data-method');
        if (method) this.switchMethod(method, container);
      });
    });
  }

  private switchSection(section: string, container: HTMLElement): void {
    this.currentSection = section;

    // Update menu active state
    container.querySelectorAll('[data-section]').forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-section') === section) item.classList.add('active');
    });

    // Hide all sections
    container.querySelectorAll('.section-content').forEach(content => {
      content.classList.remove('active');
    });

    // Show selected section
    const activeContent = container.querySelector(`#${section}-content`);
    if (activeContent) {
      activeContent.classList.add('active');
    }

    // Show/hide Interface column (only for Identification)
    const interfaceColumn = container.querySelector('#interface-column') as HTMLElement;
    if (interfaceColumn) {
      if (section === 'identification') {
        interfaceColumn.style.display = 'block';
      } else {
        interfaceColumn.style.display = 'none';
      }
    }

    const titles: any = {
      'identification': 'Urządzenia',
      'testing': 'Testowanie',
      'reports': 'Raporty Urządzeń'
    };

    // Update title in top-bar
    const topBarTitle = document.getElementById('top-bar-section-title');
    if (topBarTitle) topBarTitle.textContent = `ConnectTest - ${titles[section]}`;

    // Update params
    const activeSection = container.querySelector('#active-section');
    if (activeSection) activeSection.textContent = titles[section];
  }

  private switchMethod(method: string, container: HTMLElement): void {
    this.currentMethod = method;

    // Update method menu active state
    container.querySelectorAll('[data-method]').forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-method') === method) item.classList.add('active');
    });

    // Hide all method contents
    container.querySelectorAll('.method-content').forEach(content => {
      content.classList.remove('active');
    });

    // Show selected method
    const activeMethod = container.querySelector(`#${method}-method`);
    if (activeMethod) {
      activeMethod.classList.add('active');
    }

    // Update identification title
    const methodTitles: any = {
      'rfid': 'RFID',
      'qr': 'QR Code',
      'barcode': 'Barcode',
      'manual': 'Keyboard',
      'list': 'Z listy'
    };

    const idTitle = container.querySelector('#identification-title');
    if (idTitle) {
      idTitle.textContent = `📱 Urządzenia - ${methodTitles[method]}`;
    }
  }
}
