// frontend/src/modules/connect-id/connect-id.view.ts - Compact 1280x400px version
import { ConnectIdModule } from './connect-id.module';
import { VirtualKeyboard } from '../../components/virtual-keyboard.component';

export class ConnectIdView {
  private module: ConnectIdModule;
  private currentType: string = 'device';
  private currentMethod: string = 'rfid';
  private currentScenarioType: string = 'usage';
  private currentProtocol: string = 'service';
  private manualKeyboard: VirtualKeyboard | null = null;
  private passwordKeyboard: VirtualKeyboard | null = null;

  constructor(module: ConnectIdModule) {
    this.module = module;
  }

  render(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'connect-id-compact';
    
    // Update top-bar submenu
    const submenu = document.getElementById('top-bar-submenu');
    if (submenu) submenu.textContent = '🔍 Universal Identification';
    
    // Update top-bar section title
    const sectionTitle = document.getElementById('top-bar-section-title');
    if (sectionTitle) sectionTitle.textContent = 'ConnectID - Identyfikacja';
    
    container.innerHTML = `
      <div class="compact-layout">
        <!-- Column 1: Interface Method -->
        <div class="menu-column">
          <h3 class="column-title">Interfejs</h3>
          <button class="method-item active" data-method="rfid">
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
          <button class="method-item" data-method="list">
            <span class="menu-icon">📋</span>
            <span class="menu-label">Z listy</span>
          </button>
        </div>


        <!-- Column 3: Users (shown only for user type with list method) -->
        <div class="menu-column" id="users-column" style="display: none;">
          <h3 class="column-title">Użytkownicy</h3>
          <div class="users-list-menu">
            <div class="user-menu-item" data-user="jan.kowalski">
              <div class="user-info">
                <div class="user-name">Jan K.</div>
                <div class="user-role">Manager</div>
                <div class="user-last-login">10:30</div>
              </div>
            </div>
            <div class="user-menu-item" data-user="anna.nowak">
              <div class="user-info">
                <div class="user-name">Anna N.</div>
                <div class="user-role">Technik</div>
                <div class="user-last-login">09:15</div>
              </div>
            </div>
            <div class="user-menu-item" data-user="piotr.wisniewski">
              <div class="user-info">
                <div class="user-name">Piotr W.</div>
                <div class="user-role">Operator</div>
                <div class="user-last-login">08:45</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="main-content">
          <div class="content-body">
            
            <!-- User Login Form (shown when user is selected from menu) -->
            <div id="user-login-content" class="method-content" style="display: none;">
              <div class="user-login-form">
                                
                <div class="password-section">
                  <div class="password-input-group">
                    <input type="password" id="user-password-input" class="password-field" placeholder="••••••••">
                    <button id="user-login-submit" class="btn-login">🔓 Zaloguj</button>
                  </div>
                </div>

                <!-- Virtual Keyboard for Password -->
                <div id="password-keyboard-container"></div>
              </div>
            </div>
            <!-- RFID Panel -->
            <div id="rfid-content" class="method-content active">
              <div class="scan-prompt">
                <div class="scan-icon">📡</div>
                <p class="scan-text">Zbliż kartę RFID do czytnika</p>
                <p class="scan-hint">Lub naciśnij <kbd>Ctrl+R</kbd> dla demo</p>
              </div>
            </div>

            <!-- QR Panel -->
            <div id="qr-content" class="method-content">
              <div class="scan-prompt">
                <div class="scan-icon">📷</div>
                <p class="scan-text">Zeskanuj kod QR kamerą</p>
                <p class="scan-hint">Lub naciśnij <kbd>Ctrl+Q</kbd> dla demo</p>
              </div>
            </div>

            <!-- Barcode Panel -->
            <div id="barcode-content" class="method-content">
              <div class="scan-prompt">
                <div class="scan-icon">📊</div>
                <p class="scan-text">Zeskanuj kod kreskowy</p>
                <p class="scan-hint">Lub naciśnij <kbd>Ctrl+B</kbd> dla demo</p>
              </div>
            </div>

            <!-- Manual/Keyboard Panel -->
            <div id="manual-content" class="method-content">
              <div class="manual-input-compact">
                <input type="text" id="manual-code-input" class="code-input" placeholder="Wprowadź kod..." />
                <button id="manual-submit-btn" class="btn-submit">✓ Identyfikuj</button>
              </div>
              
              <!-- Virtual Keyboard -->
              <div id="manual-keyboard-container"></div>
            </div>

            <!-- List Panel -->
            <div id="list-content" class="method-content">
              <!-- User List -->
              <div id="user-list" class="list-type-content">
                <h4>Wybierz użytkownika:</h4>
                
                <!-- User Profiles -->
                <div class="user-card selectable" data-user="jan.kowalski">
                  <div class="user-avatar">👨‍💼</div>
                  <div class="user-details">
                    <div class="user-name">Jan Kowalski</div>
                    <div class="user-role">Manager</div>
                    <div class="user-meta">ID: JK001 | Ostatnio: 10:30</div>
                  </div>
                  <button class="btn-login-user" data-user="jan.kowalski">🔓 Zaloguj</button>
                </div>

                <div class="user-card selectable" data-user="anna.nowak">
                  <div class="user-avatar">👩‍🔧</div>
                  <div class="user-details">
                    <div class="user-name">Anna Nowak</div>
                    <div class="user-role">Technik</div>
                    <div class="user-meta">ID: AN002 | Ostatnio: 09:15</div>
                  </div>
                  <button class="btn-login-user" data-user="anna.nowak">🔓 Zaloguj</button>
                </div>

                <div class="user-card selectable" data-user="piotr.wisniewski">
                  <div class="user-avatar">👨‍🔧</div>
                  <div class="user-details">
                    <div class="user-name">Piotr Wiśniewski</div>
                    <div class="user-role">Operator</div>
                    <div class="user-meta">ID: PW003 | Ostatnio: 08:45</div>
                  </div>
                  <button class="btn-login-user" data-user="piotr.wisniewski">🔓 Zaloguj</button>
                </div>

                <div class="user-card selectable" data-user="katarzyna.kowalczyk">
                  <div class="user-avatar">👩‍💻</div>
                  <div class="user-details">
                    <div class="user-name">Katarzyna Kowalczyk</div>
                    <div class="user-role">Administrator</div>
                    <div class="user-meta">ID: KK004 | Ostatnio: 11:00</div>
                  </div>
                  <button class="btn-login-user" data-user="katarzyna.kowalczyk">🔓 Zaloguj</button>
                </div>

                <div class="user-card selectable" data-user="tomasz.nowicki">
                  <div class="user-avatar">👨‍🏭</div>
                  <div class="user-details">
                    <div class="user-name">Tomasz Nowicki</div>
                    <div class="user-role">Serwisant</div>
                    <div class="user-meta">ID: TN005 | Ostatnio: 14:20</div>
                  </div>
                  <button class="btn-login-user" data-user="tomasz.nowicki">🔓 Zaloguj</button>
                </div>
                
                <!-- Login Form -->
                <div id="login-form" class="login-form" style="display: none;">
                  <h4>Zaloguj się jako: <span id="selected-user"></span></h4>
                  <div class="password-input">
                    <input type="password" id="password-input" class="password-field" placeholder="Wprowadź hasło...">
                    <button id="password-submit" class="btn-submit">🔓 Zaloguj</button>
                  </div>
                  <div class="virtual-keyboard-login">
                    <div class="keyboard-row">
                      <button class="key-login" data-key="1">1</button>
                      <button class="key-login" data-key="2">2</button>
                      <button class="key-login" data-key="3">3</button>
                      <button class="key-login" data-key="4">4</button>
                      <button class="key-login" data-key="5">5</button>
                      <button class="key-login" data-key="6">6</button>
                      <button class="key-login" data-key="7">7</button>
                      <button class="key-login" data-key="8">8</button>
                      <button class="key-login" data-key="9">9</button>
                      <button class="key-login" data-key="0">0</button>
                    </div>
                    <div class="keyboard-row">
                      <button class="key-login" data-key="Q">Q</button>
                      <button class="key-login" data-key="W">W</button>
                      <button class="key-login" data-key="E">E</button>
                      <button class="key-login" data-key="R">R</button>
                      <button class="key-login" data-key="T">T</button>
                      <button class="key-login" data-key="Y">Y</button>
                      <button class="key-login" data-key="U">U</button>
                      <button class="key-login" data-key="I">I</button>
                      <button class="key-login" data-key="O">O</button>
                      <button class="key-login" data-key="P">P</button>
                    </div>
                    <div class="keyboard-row">
                      <button class="key-login" data-key="A">A</button>
                      <button class="key-login" data-key="S">S</button>
                      <button class="key-login" data-key="D">D</button>
                      <button class="key-login" data-key="F">F</button>
                      <button class="key-login" data-key="G">G</button>
                      <button class="key-login" data-key="H">H</button>
                      <button class="key-login" data-key="J">J</button>
                      <button class="key-login" data-key="K">K</button>
                      <button class="key-login" data-key="L">L</button>
                      <button class="key-login key-special" data-key="CLEAR">⌫</button>
                    </div>
                    <div class="keyboard-row">
                      <button class="key-login" data-key="Z">Z</button>
                      <button class="key-login" data-key="X">X</button>
                      <button class="key-login" data-key="C">C</button>
                      <button class="key-login" data-key="V">V</button>
                      <button class="key-login" data-key="B">B</button>
                      <button class="key-login" data-key="N">N</button>
                      <button class="key-login" data-key="M">M</button>
                      <button class="key-login key-wide" data-key="ENTER">🔓 LOGIN</button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Device List -->
              <div id="device-list" class="list-type-content">
                <h4>Wybierz urządzenie:</h4>
                <div class="device-card selectable">
                  <div class="device-icon">📱</div>
                  <div class="device-info">
                    <div class="device-name">PSS-7000 #12345</div>
                    <div class="device-meta">RFID: RF123456 | Status: Aktywny</div>
                  </div>
                  <button class="btn-select-device">Wybierz</button>
                </div>
                <div class="device-card selectable">
                  <div class="device-icon">📱</div>
                  <div class="device-info">
                    <div class="device-name">PSS-5000 #67890</div>
                    <div class="device-meta">RFID: RF789012 | Status: Aktywny</div>
                  </div>
                  <button class="btn-select-device">Wybierz</button>
                </div>
                <div class="device-card selectable">
                  <div class="device-icon">📱</div>
                  <div class="device-info">
                    <div class="device-name">PSS-3000 #11111</div>
                    <div class="device-meta">RFID: RF111111 | Status: Konserwacja</div>
                  </div>
                  <button class="btn-select-device">Wybierz</button>
                </div>
              </div>

              <!-- Test Protocols Content -->
              <div id="test-protocols" class="list-type-content">
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
            </div>
          </div>
        </div>

        <!-- Right Panel - Parameters -->
        <div class="right-panel">
          <div class="params-section">
            <h3 class="params-title">Parametry</h3>
            <div class="param-item">
              <span class="param-label">Ciśnienie:</span>
              <span class="param-value" id="pressure-value">-- mbar</span>
            </div>
            <div class="param-item">
              <span class="param-label">Status:</span>
              <span class="param-value" id="status-value">Oczekuje</span>
            </div>
            <div class="param-item">
              <span class="param-label">Typ:</span>
              <span class="param-value" id="type-value">Urządzenie</span>
            </div>
            <div class="param-item">
              <span class="param-label">Metoda:</span>
              <span class="param-value" id="method-value">RFID</span>
            </div>
          </div>

          <div class="params-section">
            <h3 class="params-title">Ostatni wynik</h3>
            <div id="last-result" class="last-result">
              <p class="no-result">Brak danych</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Notification Container -->
      <div id="notification-container" class="notification-container"></div>
    `;

    this.addStyles();
    this.setupEventListeners(container);
    this.initializeKeyboards();

    return container;
  }

  private addStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      .connect-id-compact {
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
        width: 120px;
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

      .menu-item, .method-item {
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
      }

      .menu-item:hover, .method-item:hover {
        background: #4a4a4a;
        color: white;
      }

      .menu-item.active, .method-item.active {
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
        padding: 15px;
        overflow-y: auto;
        position: relative;
      }

      .method-content {
        display: none;
      }

      .method-content.active {
        display: block;
      }

      .scan-prompt {
        text-align: center;
        padding: 40px 20px;
      }

      .scan-icon {
        font-size: 60px;
        margin-bottom: 15px;
      }

      .scan-text {
        font-size: 16px;
        font-weight: 500;
        color: #333;
        margin: 0 0 8px 0;
      }

      .scan-hint {
        font-size: 12px;
        color: #666;
        margin: 0;
      }

      .scan-hint kbd {
        background: #f0f0f0;
        padding: 2px 6px;
        border-radius: 3px;
        border: 1px solid #ccc;
        font-family: monospace;
        font-size: 11px;
      }

      /* Manual Input */
      .manual-input-compact {
        display: flex;
        gap: 10px;
        margin-bottom: 15px;
      }

      .code-input {
        flex: 1;
        padding: 10px;
        font-size: 16px;
        border: 2px solid #ddd;
        border-radius: 5px;
        outline: none;
      }

      .code-input:focus {
        border-color: #667eea;
      }

      .btn-submit {
        padding: 10px 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        transition: all 0.2s;
      }

      .btn-submit:hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
      }

      /* Virtual Keyboard */
      .virtual-keyboard-compact {
        max-width: 600px;
      }

      .keyboard-row {
        display: flex;
        gap: 4px;
        margin-bottom: 4px;
        justify-content: center;
      }

      .key {
        min-width: 45px;
        height: 40px;
        background: #f5f5f5;
        border: 1px solid #ddd;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        transition: all 0.1s;
        user-select: none;
      }

      .key:active {
        background: #667eea;
        color: white;
        transform: scale(0.95);
      }

      .key-special {
        background: #ffe5e5;
      }

      .key-wide {
        min-width: 95px;
        background: #e5f5e5;
      }

      /* Right Panel */
      .right-panel {
        width: 220px;
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

      .last-result {
        background: #3a3a3a;
        padding: 10px;
        border-radius: 4px;
        min-height: 80px;
      }

      .no-result {
        color: #666;
        font-size: 11px;
        text-align: center;
        margin: 30px 0;
      }

      .result-success {
        color: #4caf50;
      }

      .result-error {
        color: #f44336;
      }

      /* Notification */
      .notification-container {
        position: fixed;
        top: 45px;
        right: 10px;
        z-index: 1000;
        max-width: 300px;
      }

      .notification {
        background: white;
        padding: 12px;
        margin-bottom: 8px;
        border-radius: 5px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        animation: slideIn 0.3s;
      }

      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
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

      /* Device List */
      .device-list-select h4 { margin: 0 0 15px 0; font-size: 14px; color: #333; }
      .device-card { display: flex; align-items: center; gap: 10px; background: white; border: 1px solid #e0e0e0; border-radius: 6px; padding: 12px; margin-bottom: 8px; transition: all 0.2s; }
      .device-card:hover { border-color: #667eea; box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2); }
      .device-icon { font-size: 24px; }
      .device-info { flex: 1; }
      .device-name { font-size: 14px; font-weight: 600; color: #333; margin-bottom: 2px; }
      .device-meta { font-size: 11px; color: #666; }
      .btn-select-device { padding: 6px 12px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px; }

      /* User List */
      .user-card { display: flex; align-items: center; gap: 12px; background: white; border: 1px solid #e0e0e0; border-radius: 8px; padding: 14px; margin-bottom: 10px; transition: all 0.2s; cursor: pointer; }
      .user-card:hover { border-color: #28a745; box-shadow: 0 2px 12px rgba(40, 167, 69, 0.2); transform: translateY(-1px); }
      .user-card.selected { border-color: #28a745; background: #f8fff9; }
      .user-avatar { font-size: 28px; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; }
      .user-details { flex: 1; }
      .user-name { font-size: 15px; font-weight: 600; color: #333; margin-bottom: 3px; }
      .user-role { font-size: 12px; color: #28a745; font-weight: 600; margin-bottom: 2px; }
      .user-meta { font-size: 11px; color: #666; }
      .btn-login-user { padding: 8px 15px; background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600; transition: all 0.2s; }
      .btn-login-user:hover { transform: translateY(-1px); box-shadow: 0 2px 8px rgba(40, 167, 69, 0.3); }

      /* Scenario Type Items */
      .scenario-type-item { width: 100%; padding: 8px 4px; background: #3a3a3a; border: none; color: #ccc; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 3px; border-radius: 4px; margin-bottom: 3px; transition: all 0.2s; }
      .scenario-type-item:hover { background: #4a4a4a; color: white; }
      .scenario-type-item.active { background: linear-gradient(135deg, #dc3545 0%, #c82333 100%); color: white; }

      /* Protocol Items */
      .protocol-item { width: 100%; padding: 8px 4px; background: #3a3a3a; border: none; color: #ccc; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 3px; border-radius: 4px; margin-bottom: 3px; transition: all 0.2s; }
      .protocol-item:hover { background: #4a4a4a; color: white; }
      .protocol-item.active { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; }

      /* List Type Content */
      .list-type-content { display: none; }
      .list-type-content.active { display: block; }

      /* Login Form */
      .login-form { background: #f8f9fa; padding: 15px; border-radius: 8px; margin-top: 15px; }
      .login-form h4 { margin: 0 0 15px 0; font-size: 14px; color: #333; }
      .password-input { display: flex; gap: 10px; margin-bottom: 15px; }
      .password-field { flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; }
      .btn-login-user { padding: 6px 12px; background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px; }

      /* Virtual Keyboard for Login */
      .virtual-keyboard-login { max-width: 600px; }
      .key-login { min-width: 40px; height: 35px; background: #f5f5f5; border: 1px solid #ddd; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: 600; transition: all 0.1s; user-select: none; }
      .key-login:active { background: #28a745; color: white; transform: scale(0.95); }

      /* Protocol Forms */
      .protocol-content { display: none; }
      .protocol-content.active { display: block; }
      .protocol-form { background: #f8f9fa; padding: 20px; border-radius: 8px; }
      .protocol-form h4 { margin: 0 0 20px 0; font-size: 14px; color: #333; font-weight: 600; }
      .form-row { display: flex; gap: 15px; margin-bottom: 15px; }
      .form-group { flex: 1; }
      .form-group label { display: block; margin-bottom: 5px; font-size: 11px; font-weight: 600; color: #666; }
      .form-select, .form-textarea { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 12px; }
      .form-textarea { resize: vertical; font-family: inherit; }
      .btn-submit-protocol, .btn-start-c20, .btn-generate-report { width: 100%; padding: 12px; background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600; margin-top: 10px; }

      /* Progress Bar */
      .test-progress { margin: 15px 0; }
      .progress-header { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 12px; color: #666; }
      .progress-bar { background: #e9ecef; height: 8px; border-radius: 4px; overflow: hidden; }
      .progress-fill { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); height: 100%; transition: width 0.3s; }

      /* Users Column Styles */
      .users-list-menu { padding: 10px 0; }
      .user-menu-item { 
        display: flex; 
        align-items: center; 
        padding: 8px 12px; 
        margin-bottom: 6px; 
        background: white; 
        border: 1px solid #e0e0e0; 
        border-radius: 6px; 
        cursor: pointer; 
        transition: all 0.2s;
      }
      .user-menu-item:hover { background: #f0f8ff; border-color: #667eea; }
      .user-menu-item.selected { background: #667eea; color: white; }
      .user-avatar { 
        width: 32px; 
        height: 32px; 
        background: #667eea; 
        border-radius: 50%; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        margin-right: 10px; 
        font-size: 16px; 
        color: white;
      }
      .user-info { flex: 1; }
      .user-name { font-size: 11px; font-weight: 600; margin-bottom: 2px; }
      .user-role { font-size: 9px; color: #666; margin-bottom: 1px; }
      .user-last-login { font-size: 8px; color: #999; }

      /* User Login Form Styles */
      .user-login-form { 
        display: flex; 
        flex-direction: column; 
        align-items: center; 
        padding: 20px; 
        max-width: 400px; 
        margin: 0 auto;
      }
      .selected-user-info { 
        display: flex; 
        align-items: center; 
        margin-bottom: 30px; 
        padding: 20px; 
        background: #f8f9fa; 
        border-radius: 12px; 
        width: 100%;
      }
      .user-avatar-large { 
        width: 60px; 
        height: 60px; 
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
        border-radius: 50%; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        font-size: 24px; 
        margin-right: 20px;
        color: white;
      }
      .user-details h3 { margin: 0 0 5px 0; font-size: 18px; color: #333; }
      .user-details p { margin: 2px 0; font-size: 12px; color: #666; }

      .password-section { width: 100%; margin-bottom: 20px; }
      .password-section h4 { text-align: center; margin-bottom: 15px; font-size: 14px; color: #333; }
      .password-input-group { display: flex; gap: 10px; }
      .password-field { 
        flex: 1; 
        padding: 12px; 
        border: 2px solid #ddd; 
        border-radius: 6px; 
        font-size: 16px; 
        text-align: center; 
        letter-spacing: 3px;
      }
      .btn-login { 
        padding: 12px 20px; 
        background: linear-gradient(135deg, #28a745 0%, #20c997 100%); 
        color: white; 
        border: none; 
        border-radius: 6px; 
        cursor: pointer; 
        font-size: 12px; 
        font-weight: 600;
      }

      /* Virtual keyboards handled by VirtualKeyboard component */
    `;
    document.head.appendChild(style);
  }

  private setupEventListeners(container: HTMLElement): void {
    // Method selection
    const methodButtons = container.querySelectorAll('.method-item');
    methodButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const method = target.getAttribute('data-method');
        if (method) {
          this.switchMethod(method, container);
        }
      });
    });

    // Scenario type buttons
    const scenarioTypeButtons = container.querySelectorAll('.scenario-type-item');
    scenarioTypeButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const scenarioType = target.getAttribute('data-scenario-type');
        if (scenarioType) {
          this.switchScenarioType(scenarioType, container);
        }
      });
    });

    // Protocol buttons
    const protocolButtons = container.querySelectorAll('.protocol-item');
    protocolButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const protocol = target.getAttribute('data-protocol');
        if (protocol) {
          this.switchProtocol(protocol, container);
        }
      });
    });

    // Login user buttons
    const loginButtons = container.querySelectorAll('.btn-login-user');
    loginButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const user = target.getAttribute('data-user');
        if (user) {
          this.showLoginForm(user);
        }
      });
    });

    // Virtual keyboard for login
    const loginKeys = container.querySelectorAll('.key-login');
    const passwordInput = container.querySelector('#password-input') as HTMLInputElement;
    loginKeys.forEach(key => {
      key.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const keyValue = target.getAttribute('data-key');
        this.handleLoginKeyInput(keyValue, passwordInput);
      });
    });

    // Password submit
    const passwordSubmit = container.querySelector('#password-submit');
    passwordSubmit?.addEventListener('click', () => {
      if (passwordInput && passwordInput.value) {
        this.handleLogin(passwordInput.value);
      }
    });

    // User menu items (from users column)
    const userMenuItems = container.querySelectorAll('.user-menu-item');
    userMenuItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const userId = target.getAttribute('data-user');
        if (userId) this.showUserLoginForm(userId, container);
      });
    });

    // Password keyboard is handled by VirtualKeyboard component

    // User password submit button
    const userPasswordSubmit = container.querySelector('#user-login-submit');
    if (userPasswordSubmit) {
      userPasswordSubmit.addEventListener('click', () => {
        const input = container.querySelector('#user-password-input') as HTMLInputElement;
        if (input && input.value.trim()) {
          this.handleUserLogin(input.value);
        }
      });
    }

    // Manual keyboard is handled by VirtualKeyboard component

    // Manual submit
    const submitBtn = container.querySelector('#manual-submit-btn');
    const manualInput = container.querySelector('#manual-code-input') as HTMLInputElement;
    submitBtn?.addEventListener('click', () => {
      if (manualInput && manualInput.value) {
        this.handleManualSubmit(manualInput.value);
      }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey) {
        switch(e.key.toLowerCase()) {
          case 'r':
            e.preventDefault();
            this.simulateRFID();
            break;
          case 'q':
            e.preventDefault();
            this.simulateQR();
            break;
          case 'b':
            e.preventDefault();
            this.simulateBarcode();
            break;
          case 'm':
            e.preventDefault();
            this.switchMethod('manual', container);
            break;
        }
      }
    });
  }

  private switchType(type: string, container: HTMLElement): void {
    this.currentType = type;
    
    // Update menu
    container.querySelectorAll('.menu-item').forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-type') === type) {
        item.classList.add('active');
      }
    });

    // Update title in top-bar
    const titles = {
      'user': 'Użytkownik',
      'device': 'Urządzenia', 
      'test': 'Testu'
    };
    const topBarTitle = document.getElementById('top-bar-section-title');
    if (topBarTitle) {
      topBarTitle.textContent = `ConnectID - Identyfikacja ${titles[type as keyof typeof titles]} - ${this.currentMethod.toUpperCase()}`;
    }

    const typeValue = container.querySelector('#type-value');
    if (typeValue) {
      typeValue.textContent = titles[type as keyof typeof titles];
    }
  }

  private switchMethod(method: string, container: HTMLElement): void {
    this.currentMethod = method;

    // Update URL hash with method
    const currentHash = window.location.hash.slice(2); // Remove '#/'
    const [moduleName] = currentHash.split('/');
    window.location.hash = `#/${moduleName}/${method}`;

    // Update method menu
    container.querySelectorAll('.method-item').forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-method') === method) {
        item.classList.add('active');
      }
    });

    // Update content panels
    container.querySelectorAll('.method-content').forEach(panel => {
      panel.classList.remove('active');
    });
    const activePanel = container.querySelector(`#${method}-content`);
    if (activePanel) {
      activePanel.classList.add('active');
    }

    // Update columns visibility
    this.updateColumnsVisibility(container);

    // Update top-bar title
    this.updateTopBarTitle();

    const methodValue = container.querySelector('#method-value');
    if (methodValue) {
      methodValue.textContent = method.toUpperCase();
    }

    // Focus manual input if manual
    if (method === 'manual') {
      const input = container.querySelector('#manual-code-input') as HTMLInputElement;
      input?.focus();
    }
  }

  private switchScenarioType(scenarioType: string, container: HTMLElement): void {
    this.currentScenarioType = scenarioType;

    // Update scenario type menu active state
    container.querySelectorAll('.scenario-type-item').forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-scenario-type') === scenarioType) item.classList.add('active');
    });

    this.updateTopBarTitle();
  }

  private switchProtocol(protocol: string, container: HTMLElement): void {
    this.currentProtocol = protocol;

    // Update protocol menu active state
    container.querySelectorAll('.protocol-item').forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-protocol') === protocol) item.classList.add('active');
    });

    // Update protocol content if in test mode
    if (this.currentType === 'test' && this.currentMethod === 'list') {
      this.updateProtocolContent(container);
    }

    this.updateTopBarTitle();
  }

  private updateColumnsVisibility(container: HTMLElement): void {
    const usersColumn = container.querySelector('#users-column') as HTMLElement;
    const scenarioTypesColumn = container.querySelector('#scenario-types-column') as HTMLElement;
    const protocolsColumn = container.querySelector('#protocols-column') as HTMLElement;
    
    // Show users column only for user type with list method
    if (usersColumn) {
      if (this.currentType === 'user' && this.currentMethod === 'list') {
        usersColumn.style.display = 'block';
      } else {
        usersColumn.style.display = 'none';
      }
    }
    
    if (scenarioTypesColumn && protocolsColumn) {
      // Show scenario/protocol columns only for test type with list method
      if (this.currentType === 'test' && this.currentMethod === 'list') {
        scenarioTypesColumn.style.display = 'block';
        protocolsColumn.style.display = 'block';
      } else {
        scenarioTypesColumn.style.display = 'none';
        protocolsColumn.style.display = 'none';
      }
    }

    // Update list content based on type and method
    this.updateListContent(container);
  }

  private updateListContent(container: HTMLElement): void {
    const userList = container.querySelector('#user-list') as HTMLElement;
    const deviceList = container.querySelector('#device-list') as HTMLElement;
    const testProtocols = container.querySelector('#test-protocols') as HTMLElement;

    if (userList && deviceList && testProtocols) {
      // Hide all list types first
      userList.classList.remove('active');
      deviceList.classList.remove('active');
      testProtocols.classList.remove('active');

      // Show appropriate list based on current type
      if (this.currentMethod === 'list') {
        if (this.currentType === 'user') {
          userList.classList.add('active');
        } else if (this.currentType === 'device') {
          deviceList.classList.add('active');
        } else if (this.currentType === 'test') {
          testProtocols.classList.add('active');
          // Also update protocol content
          this.updateProtocolContent(container);
        }
      }
    }
  }

  private updateProtocolContent(container: HTMLElement): void {
    // Hide all protocol contents
    container.querySelectorAll('.protocol-content').forEach(content => {
      content.classList.remove('active');
    });

    // Show selected protocol content
    const activeProtocol = container.querySelector(`#${this.currentProtocol}-protocol`);
    if (activeProtocol) {
      activeProtocol.classList.add('active');
    }
  }

  private updateTopBarTitle(): void {
    const methodTitles: any = {
      'rfid': 'RFID',
      'qr': 'QR Code',
      'barcode': 'Barcode', 
      'manual': 'Keyboard',
      'list': 'Z listy'
    };

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
      let title = `ConnectID - Identyfikacja ${this.getTypeName()} - ${methodTitles[this.currentMethod]}`;
      
      // Add scenario type and protocol for test type with list method
      if (this.currentType === 'test' && this.currentMethod === 'list') {
        title += ` - ${scenarioTypeTitles[this.currentScenarioType]} - ${protocolTitles[this.currentProtocol]}`;
      }
      
      topBarTitle.textContent = title;
    }
  }

  private getTypeName(): string {
    const names = {
      'user': 'Użytkownik',
      'device': 'Urządzenia',
      'test': 'Testu'
    };
    return names[this.currentType as keyof typeof names] || 'Urządzenia';
  }

  // Virtual keyboard input handled by VirtualKeyboard component

  private handleManualIdentification(code: string): void {
    this.showNotification(`✓ Identyfikacja: ${code}`, 'success');
    this.updateLastResult(code, true);
  }

  private simulateRFID(): void {
    const code = `RFID-${Date.now().toString().slice(-6)}`;
    this.showNotification(`📡 RFID: ${code}`, 'success');
    this.updateLastResult(code, true);
  }

  private simulateQR(): void {
    const code = `QR-${Date.now().toString().slice(-6)}`;
    this.showNotification(`📷 QR Code: ${code}`, 'success');
    this.updateLastResult(code, true);
  }

  private simulateBarcode(): void {
    const code = `BAR-${Date.now().toString().slice(-6)}`;
    this.showNotification(`📊 Barcode: ${code}`, 'success');
    this.updateLastResult(code, true);
  }

  private showNotification(message: string, type: 'success' | 'error' = 'success'): void {
    const container = document.getElementById('notification-container');
    if (!container) return;

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
      <div style="font-size: 12px; color: ${type === 'success' ? '#4caf50' : '#f44336'}; font-weight: 600;">
        ${message}
      </div>
    `;
    
    container.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  private updateLastResult(code: string, success: boolean): void {
    const resultDiv = document.getElementById('last-result');
    if (!resultDiv) return;

    resultDiv.innerHTML = `
      <div class="${success ? 'result-success' : 'result-error'}" style="font-size: 11px;">
        <div style="margin-bottom: 4px;"><strong>Kod:</strong> ${code}</div>
        <div style="margin-bottom: 4px;"><strong>Typ:</strong> ${this.getTypeName()}</div>
        <div><strong>Status:</strong> ${success ? '✓ OK' : '✗ Błąd'}</div>
      </div>
    `;

    // Update status
    const statusValue = document.getElementById('status-value');
    if (statusValue) {
      statusValue.textContent = success ? '✓ Gotowy' : '✗ Błąd';
      statusValue.style.color = success ? '#4caf50' : '#f44336';
    }

    // Simulate pressure (random for demo)
    const pressureValue = document.getElementById('pressure-value');
    if (pressureValue) {
      const pressure = (Math.random() * 10 - 5).toFixed(1);
      pressureValue.textContent = `${pressure} mbar`;
    }
  }

  private showLoginForm(user: string): void {
    const loginForm = document.getElementById('login-form');
    const selectedUserSpan = document.getElementById('selected-user');
    const passwordInput = document.getElementById('password-input') as HTMLInputElement;
    
    if (loginForm && selectedUserSpan) {
      selectedUserSpan.textContent = user.replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase());
      loginForm.style.display = 'block';
      if (passwordInput) {
        passwordInput.value = '';
        passwordInput.focus();
      }
    }
  }

  private handleLoginKeyInput(key: string | null, input: HTMLInputElement): void {
    if (!key || !input) return;

    if (key === 'CLEAR') {
      input.value = '';
    } else if (key === 'ENTER') {
      if (input.value) {
        this.handleLogin(input.value);
      }
    } else {
      input.value += key;
    }
  }

  private handleLogin(password: string): void {
    const selectedUserSpan = document.getElementById('selected-user');
    const userName = selectedUserSpan?.textContent || 'Unknown';
    
    // Simple password validation (in real app, this would be secure)
    if (password.length >= 4) {
      this.showNotification(`✅ Zalogowano jako ${userName}`, 'success');
      this.updateLastResult(`LOGIN: ${userName}`, true);
      
      // Hide login form
      const loginForm = document.getElementById('login-form');
      if (loginForm) loginForm.style.display = 'none';
    } else {
      this.showNotification(`❌ Nieprawidłowe hasło`, 'error');
    }
  }

  // Public method to set initial type from main menu
  public setInitialType(type: string): void {
    this.currentType = type;
    
    // Find container from DOM
    const container = document.querySelector('.connect-id-compact');
    if (container) {
      this.updateColumnsVisibility(container as HTMLElement);
      this.updateTopBarTitle();
    }
  }

  private showUserLoginForm(userId: string, container: HTMLElement): void {
    // User data mapping
    const userData: any = {
      'jan.kowalski': { name: 'Jan Kowalski', role: 'Manager', lastLogin: '10:30' },
      'anna.nowak': { name: 'Anna Nowak', role: 'Technik', lastLogin: '09:15' },
      'piotr.wisniewski': { name: 'Piotr Wiśniewski', role: 'Operator', lastLogin: '08:45' }
    };

    const user = userData[userId];
    if (!user) return;

    // Update selected user in menu
    container.querySelectorAll('.user-menu-item').forEach(item => {
      item.classList.remove('selected');
    });
    const selectedItem = container.querySelector(`[data-user="${userId}"]`);
    if (selectedItem) {
      selectedItem.classList.add('selected');
    }

    // Update user details in login form
    const nameEl = container.querySelector('#login-user-name');
    const roleEl = container.querySelector('#login-user-role');
    const timeEl = container.querySelector('#login-user-time');
    
    if (nameEl) nameEl.textContent = user.name;
    if (roleEl) roleEl.textContent = user.role;
    if (timeEl) timeEl.textContent = user.lastLogin;

    // Hide other content and show login form
    container.querySelectorAll('.method-content').forEach(content => {
      (content as HTMLElement).style.display = 'none';
    });
    
    const loginContent = container.querySelector('#user-login-content') as HTMLElement;
    if (loginContent) {
      loginContent.style.display = 'block';
    }

    // Clear password field
    const passwordInput = container.querySelector('#user-password-input') as HTMLInputElement;
    if (passwordInput) {
      passwordInput.value = '';
      passwordInput.focus();
    }

    // Update top-bar title
    this.updateTopBarTitle();

    // Initialize password keyboard for this form
    this.initializePasswordKeyboard();
  }

  // Password keyboard input handled by VirtualKeyboard component

  private handleUserLogin(password: string): void {
    // Get user name from current login form
    const nameEl = document.querySelector('#login-user-name');
    const userName = nameEl?.textContent || 'Unknown';
    
    // Simple password validation (in real app, this would be secure)
    if (password.length >= 4) {
      this.showNotification(`✅ Zalogowano jako ${userName}`, 'success');
      this.updateLastResult(`LOGIN: ${userName}`, true);
      
      // Clear selection and hide login form
      const container = document.querySelector('.connect-id-compact') as HTMLElement;
      if (container) {
        container.querySelectorAll('.user-menu-item').forEach(item => {
          item.classList.remove('selected');
        });
        
        // Return to default content
        container.querySelectorAll('.method-content').forEach(content => {
          (content as HTMLElement).style.display = 'none';
        });
        
        const activeContent = container.querySelector(`#${this.currentMethod}-content`) as HTMLElement;
        if (activeContent) {
          activeContent.style.display = 'block';
        }
        
        // Clear password
        const passwordInput = container.querySelector('#user-password-input') as HTMLInputElement;
        if (passwordInput) {
          passwordInput.value = '';
        }
      }
    } else {
      this.showNotification(`❌ Nieprawidłowe hasło`, 'error');
    }
  }

  private initializeKeyboards(): void {
    // Initialize manual keyboard for code input
    setTimeout(() => {
      try {
        this.manualKeyboard = new VirtualKeyboard('manual-keyboard-container', {
          targetInputId: 'manual-code-input',
          layout: 'full',
          onEnter: (value: string) => {
            this.handleManualSubmit(value);
          },
          onKeyPress: (key: string, _value: string) => {
            if (key === 'CLEAR') {
              // Clear handled by component
            }
          }
        });
      } catch (error) {
        console.warn('Manual keyboard initialization failed:', error);
      }
    }, 100);
  }

  private initializePasswordKeyboard(): void {
    // Initialize password keyboard when user login form is shown
    setTimeout(() => {
      try {
        if (this.passwordKeyboard) {
          this.passwordKeyboard.destroy();
        }
        
        this.passwordKeyboard = new VirtualKeyboard('password-keyboard-container', {
          targetInputId: 'user-password-input',
          layout: 'password',
          onKeyPress: (key: string, _value: string) => {
            if (key === 'CANCEL') {
              this.cancelPasswordEntry();
            }
          }
        });
      } catch (error) {
        console.warn('Password keyboard initialization failed:', error);
      }
    }, 100);
  }

  private handleManualSubmit(value: string): void {
    if (value.trim()) {
      this.showNotification(`✅ Kod: ${value}`, 'success');
      this.updateLastResult(`MANUAL: ${value}`, true);
      
      // Clear input after successful submit
      if (this.manualKeyboard) {
        this.manualKeyboard.clear();
      }
    } else {
      this.showNotification(`❌ Wprowadź kod`, 'error');
    }
  }

  private cancelPasswordEntry(): void {
    // Hide login form and return to previous content
    const container = document.querySelector('.connect-id-compact') as HTMLElement;
    if (container) {
      container.querySelectorAll('.method-content').forEach(content => {
        (content as HTMLElement).style.display = 'none';
      });
      
      // Show appropriate content based on current method
      const activeContent = container.querySelector(`#${this.currentMethod}-content`) as HTMLElement;
      if (activeContent) {
        activeContent.style.display = 'block';
      }
      
      // Clear selection
      container.querySelectorAll('.user-menu-item').forEach(item => {
        item.classList.remove('selected');
      });
    }
  }
}
