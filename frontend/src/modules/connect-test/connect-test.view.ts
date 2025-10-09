import { ConnectTestModule } from './connect-test.module';

export class ConnectTestView {
  private module: ConnectTestModule;
  private currentSection: string = 'identification';
  private currentMethod: string = 'list';
  private currentProtocol: string = 'service';
  private currentScenarioType: string = 'usage';

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

        <!-- Column 2A: Interface (shown only for Identification) -->
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

        <!-- Column 2B: Scenario Types (shown only for Testing) -->
        <div class="menu-column" id="scenario-types-column" style="display: none;">
          <h3 class="column-title">Typ Scenariusza</h3>
          <button class="scenario-type-item active" data-scenario-type="usage">
            <span class="menu-icon">🔄</span>
            <span class="menu-label">Po użyciu</span>
          </button>
          <button class="scenario-type-item" data-scenario-type="6months">
            <span class="menu-icon">📅</span>
            <span class="menu-label">Po 6 miesiącach</span>
          </button>
          <button class="scenario-type-item" data-scenario-type="yearly">
            <span class="menu-icon">📆</span>
            <span class="menu-label">Roczny</span>
          </button>
          <button class="scenario-type-item" data-scenario-type="emergency">
            <span class="menu-icon">🚨</span>
            <span class="menu-label">Awaryjny</span>
          </button>
          <button class="scenario-type-item" data-scenario-type="preventive">
            <span class="menu-icon">🛡️</span>
            <span class="menu-label">Prewencyjny</span>
          </button>
        </div>

        <!-- Column 3: Protocols (shown only for Testing) -->
        <div class="menu-column" id="protocols-column" style="display: none;">
          <h3 class="column-title">Protokoły</h3>
          <button class="protocol-item active" data-protocol="service">
            <span class="menu-icon">🔧</span>
            <span class="menu-label">Serwis</span>
          </button>
          <button class="protocol-item" data-protocol="scenario-c20">
            <span class="menu-icon">🧪</span>
            <span class="menu-label">Scenariusz C20</span>
          </button>
          <button class="protocol-item" data-protocol="notes">
            <span class="menu-icon">📝</span>
            <span class="menu-label">Uwagi</span>
          </button>
          <button class="protocol-item" data-protocol="create-report">
            <span class="menu-icon">📋</span>
            <span class="menu-label">Stwórz Raport</span>
          </button>
        </div>

        <div class="main-content">
          <div class="content-body">
            <!-- Identification Section -->
            <div id="identification-content" class="section-content active">
              
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
              <!-- Service Protocol -->
              <div id="service-protocol" class="protocol-content active">
                <div class="protocol-form">
                  <h4>🔧 Protokół Serwisu</h4>
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
                      <label>Komponent:</label>
                      <select class="form-select">
                        <option>Pompa główna</option>
                        <option>Zawór bezpieczeństwa</option>
                        <option>Czujnik ciśnienia</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <label>Opis czynności serwisowych:</label>
                    <textarea class="form-textarea" rows="4" placeholder="Opisz wykonane czynności..."></textarea>
                  </div>
                  <button class="btn-submit-protocol">💾 Zapisz Protokół Serwisu</button>
                </div>
              </div>

              <!-- Scenario C20 Protocol -->
              <div id="scenario-c20-protocol" class="protocol-content">
                <div class="protocol-form">
                  <h4>🧪 Protokół Scenariusz C20</h4>
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
                      <label>Scenariusz:</label>
                      <select class="form-select">
                        <option>Test ciśnienia wysokiego</option>
                        <option>Test przepływu</option>
                        <option>Test szczelności</option>
                      </select>
                    </div>
                  </div>
                  <div class="test-progress">
                    <div class="progress-header">
                      <span>Postęp testu C20...</span>
                      <span id="c20-progress-percent">0%</span>
                    </div>
                    <div class="progress-bar">
                      <div class="progress-fill" style="width: 0%"></div>
                    </div>
                  </div>
                  <button class="btn-start-c20">▶️ Rozpocznij Test C20</button>
                </div>
              </div>

              <!-- Notes Protocol -->
              <div id="notes-protocol" class="protocol-content">
                <div class="protocol-form">
                  <h4>📝 Protokół Uwag</h4>
                  <div class="form-group">
                    <label>Urządzenie:</label>
                    <select class="form-select">
                      <option>PSS-7000 #12345</option>
                      <option>PSS-5000 #67890</option>
                      <option>PSS-3000 #11111</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Uwagi i obserwacje:</label>
                    <textarea class="form-textarea" rows="6" placeholder="Wprowadź uwagi, obserwacje, zalecenia..."></textarea>
                  </div>
                  <button class="btn-submit-protocol">📝 Zapisz Uwagi</button>
                </div>
              </div>

              <!-- Create Report Protocol -->
              <div id="create-report-protocol" class="protocol-content">
                <div class="protocol-form">
                  <h4>📋 Stwórz Raport</h4>
                  <div class="form-group">
                    <label>Użytkownik odpowiedzialny:</label>
                    <select class="form-select">
                      <option>Jan Kowalski (Technik)</option>
                      <option>Anna Nowak (Manager)</option>
                      <option>Piotr Wiśniewski (Operator)</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Typ raportu:</label>
                    <select class="form-select">
                      <option>Raport okresowy</option>
                      <option>Raport serwisowy</option>
                      <option>Raport testowy</option>
                      <option>Raport awarii</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Podsumowanie:</label>
                    <textarea class="form-textarea" rows="4" placeholder="Krótkie podsumowanie raportu..."></textarea>
                  </div>
                  <button class="btn-generate-report">📊 Generuj Raport</button>
                </div>
              </div>
            </div>

            <!-- Reports Section -->
            <div id="reports-content" class="section-content">
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
          <!-- Identification Parameters -->
          <div id="identification-params" class="params-section">
            <h3 class="params-title">Status</h3>
            <div class="param-item">
              <span class="param-label">Aktywna sekcja:</span>
              <span class="param-value" id="active-section">Urządzenia</span>
            </div>
            <div class="param-item">
              <span class="param-label">Metoda:</span>
              <span class="param-value" id="active-method">Z listy</span>
            </div>
          </div>

          <!-- Testing Sensors -->
          <div id="testing-sensors" class="params-section" style="display: none;">
            <h3 class="params-title">Sensory Ciśnienia</h3>
            <div class="sensor-item low-pressure">
              <div class="sensor-icon">🔴</div>
              <div class="sensor-info">
                <span class="sensor-label">Ciśnienie Niskie</span>
                <span class="sensor-value" id="pressure-low">-- mbar</span>
              </div>
            </div>
            <div class="sensor-item medium-pressure">
              <div class="sensor-icon">🟡</div>
              <div class="sensor-info">
                <span class="sensor-label">Ciśnienie Średnie</span>
                <span class="sensor-value" id="pressure-medium">-- mbar</span>
              </div>
            </div>
            <div class="sensor-item high-pressure">
              <div class="sensor-icon">🟢</div>
              <div class="sensor-info">
                <span class="sensor-label">Ciśnienie Wysokie</span>
                <span class="sensor-value" id="pressure-high">-- mbar</span>
              </div>
            </div>
            <div class="param-item">
              <span class="param-label">Protokół:</span>
              <span class="param-value" id="active-protocol">Serwis</span>
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
      .menu-label { font-size: 10px; font-weight: 500; text-align: center; }
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
      .method-item { width: 100%; padding: 8px 4px; background: #3a3a3a; border: none; color: #ccc; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 3px; border-radius: 4px; margin-bottom: 3px; transition: all 0.2s; }
      .method-item:hover { background: #4a4a4a; color: white; }
      .method-item.active { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }

      /* Scenario Type Items */
      .scenario-type-item { width: 100%; padding: 8px 4px; background: #3a3a3a; border: none; color: #ccc; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 3px; border-radius: 4px; margin-bottom: 3px; transition: all 0.2s; }
      .scenario-type-item:hover { background: #4a4a4a; color: white; }
      .scenario-type-item.active { background: linear-gradient(135deg, #dc3545 0%, #c82333 100%); color: white; }

      /* Protocol Items */
      .protocol-item { width: 100%; padding: 8px 4px; background: #3a3a3a; border: none; color: #ccc; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 3px; border-radius: 4px; margin-bottom: 3px; transition: all 0.2s; }
      .protocol-item:hover { background: #4a4a4a; color: white; }
      .protocol-item.active { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; }

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

      /* Protocol Content */
      .protocol-content { display: none; }
      .protocol-content.active { display: block; }
      .protocol-form { background: #f8f9fa; padding: 20px; border-radius: 8px; }
      .protocol-form h4 { margin: 0 0 20px 0; font-size: 14px; color: #333; font-weight: 600; }
      .form-row { display: flex; gap: 15px; margin-bottom: 15px; }
      .form-row .form-group { flex: 1; }
      .form-textarea { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 12px; font-family: inherit; resize: vertical; }
      .btn-submit-protocol, .btn-start-c20, .btn-generate-report { width: 100%; padding: 12px; background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600; margin-top: 10px; }

      /* Sensors */
      .sensor-item { display: flex; align-items: center; gap: 10px; background: #3a3a3a; padding: 10px; margin-bottom: 8px; border-radius: 6px; }
      .sensor-icon { font-size: 20px; }
      .sensor-info { flex: 1; }
      .sensor-label { display: block; font-size: 10px; color: #999; margin-bottom: 2px; }
      .sensor-value { font-size: 14px; color: #fff; font-weight: 600; }
      .low-pressure { border-left: 3px solid #dc3545; }
      .medium-pressure { border-left: 3px solid #ffc107; }
      .high-pressure { border-left: 3px solid #28a745; }
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

    // Scenario type buttons (for Testing)
    const scenarioTypeItems = container.querySelectorAll('[data-scenario-type]');
    scenarioTypeItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const scenarioType = target.getAttribute('data-scenario-type');
        if (scenarioType) this.switchScenarioType(scenarioType, container);
      });
    });

    // Protocol buttons (for Testing)
    const protocolItems = container.querySelectorAll('[data-protocol]');
    protocolItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const protocol = target.getAttribute('data-protocol');
        if (protocol) this.switchProtocol(protocol, container);
      });
    });

    // Start pressure simulation for testing section
    this.startPressureSimulation();
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

    // Show/hide columns based on section
    const interfaceColumn = container.querySelector('#interface-column') as HTMLElement;
    const scenarioTypesColumn = container.querySelector('#scenario-types-column') as HTMLElement;
    const protocolsColumn = container.querySelector('#protocols-column') as HTMLElement;
    
    if (interfaceColumn && scenarioTypesColumn && protocolsColumn) {
      if (section === 'identification') {
        interfaceColumn.style.display = 'block';
        scenarioTypesColumn.style.display = 'none';
        protocolsColumn.style.display = 'none';
      } else if (section === 'testing') {
        interfaceColumn.style.display = 'none';
        scenarioTypesColumn.style.display = 'block';
        protocolsColumn.style.display = 'block';
      } else {
        interfaceColumn.style.display = 'none';
        scenarioTypesColumn.style.display = 'none';
        protocolsColumn.style.display = 'none';
      }
    }

    // Show/hide right panel sections
    const identificationParams = container.querySelector('#identification-params') as HTMLElement;
    const testingSensors = container.querySelector('#testing-sensors') as HTMLElement;  
    const reportsParams = container.querySelector('#reports-params') as HTMLElement;

    if (identificationParams && testingSensors && reportsParams) {
      identificationParams.style.display = section === 'identification' ? 'block' : 'none';
      testingSensors.style.display = section === 'testing' ? 'block' : 'none';
      reportsParams.style.display = section === 'reports' ? 'block' : 'none';
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

    // Update top-bar
    const methodTitles: any = {
      'rfid': 'RFID',
      'qr': 'QR Code', 
      'barcode': 'Barcode',
      'manual': 'Keyboard',
      'list': 'Z listy'
    };

    const topBarTitle = document.getElementById('top-bar-section-title');
    if (topBarTitle) topBarTitle.textContent = `ConnectTest - Urządzenia - ${methodTitles[method]}`;

    // Update params
    const activeMethodParam = container.querySelector('#active-method');
    if (activeMethodParam) activeMethodParam.textContent = methodTitles[method];
  }

  private switchScenarioType(scenarioType: string, container: HTMLElement): void {
    this.currentScenarioType = scenarioType;

    // Update scenario type menu active state
    container.querySelectorAll('[data-scenario-type]').forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-scenario-type') === scenarioType) item.classList.add('active');
    });

    this.updateTestingTopBar();
  }

  private switchProtocol(protocol: string, container: HTMLElement): void {
    this.currentProtocol = protocol;

    // Update protocol menu active state
    container.querySelectorAll('[data-protocol]').forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-protocol') === protocol) item.classList.add('active');
    });

    // Hide all protocol contents
    container.querySelectorAll('.protocol-content').forEach(content => {
      content.classList.remove('active');
    });

    // Show selected protocol
    const activeProtocol = container.querySelector(`#${protocol}-protocol`);
    if (activeProtocol) {
      activeProtocol.classList.add('active');
    }

    this.updateTestingTopBar();

    // Update params
    const protocolTitles: any = {
      'service': 'Serwis',
      'scenario-c20': 'Scenariusz C20',
      'notes': 'Uwagi',
      'create-report': 'Stwórz Raport'
    };

    const activeProtocolParam = document.querySelector('#active-protocol');
    if (activeProtocolParam) activeProtocolParam.textContent = protocolTitles[protocol];
  }

  private updateTestingTopBar(): void {
    const scenarioTypeTitles: any = {
      'usage': 'Po użyciu',
      '6months': 'Po 6 miesiącach',
      'yearly': 'Roczny',
      'emergency': 'Awaryjny',
      'preventive': 'Prewencyjny'
    };

    const protocolTitles: any = {
      'service': 'Serwis',
      'scenario-c20': 'Scenariusz C20',
      'notes': 'Uwagi',
      'create-report': 'Stwórz Raport'
    };

    const topBarTitle = document.getElementById('top-bar-section-title');
    if (topBarTitle) {
      topBarTitle.textContent = `ConnectTest - Testowanie - ${scenarioTypeTitles[this.currentScenarioType]} - ${protocolTitles[this.currentProtocol]}`;
    }
  }

  private startPressureSimulation(): void {
    setInterval(() => {
      // Simulate real-time pressure readings
      const lowPressure = (Math.random() * 100 + 50).toFixed(1);
      const mediumPressure = (Math.random() * 500 + 200).toFixed(1);
      const highPressure = (Math.random() * 1000 + 800).toFixed(1);

      const lowElement = document.getElementById('pressure-low');
      const mediumElement = document.getElementById('pressure-medium');
      const highElement = document.getElementById('pressure-high');

      if (lowElement) lowElement.textContent = `${lowPressure} mbar`;
      if (mediumElement) mediumElement.textContent = `${mediumPressure} mbar`;
      if (highElement) highElement.textContent = `${highPressure} mbar`;
    }, 2000);
  }
}
