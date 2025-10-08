// frontend/src/modules/connect-id/connect-id.view.ts
import { ConnectIdModule } from './connect-id.module';

export class ConnectIdView {
  private module: ConnectIdModule;

  constructor(module: ConnectIdModule) {
    this.module = module;
  }

  render(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'connect-id-page';
    
    container.innerHTML = `
      <div class="connect-id-container">
        <div class="header-section">
          <h1>🔍 ConnectID - Universal Identification</h1>
          <div class="header-actions">
            <button id="history-toggle" class="btn btn-outline-primary">
              📋 Historia identyfikacji
            </button>
            <button id="continuous-toggle" class="btn btn-outline-success">
              🔄 Tryb ciągły
            </button>
          </div>
        </div>

        <div class="main-content">
          <div class="left-panel">
            <div class="type-selector">
              <label for="identification-type">Typ identyfikacji:</label>
              <div class="type-radio-group">
                <label class="radio-option">
                  <input type="radio" name="identification-type" value="user">
                  <span>👤 Użytkownik (Login)</span>
                </label>
                <label class="radio-option">
                  <input type="radio" name="identification-type" value="device" checked>
                  <span>📱 Urządzenie (Test)</span>
                </label>
                <label class="radio-option">
                  <input type="radio" name="identification-type" value="test">
                  <span>🧪 Test (Kod testowy)</span>
                </label>
              </div>
            </div>

            <div id="test-type-selector" class="test-type-selector" style="display: block;">
              <label>Typ testu:</label>
              <div class="test-radio-group">
                <label class="radio-option">
                  <input type="radio" name="test-type" value="pressure">
                  <span>🔧 Szczelność</span>
                </label>
                <label class="radio-option">
                  <input type="radio" name="test-type" value="flow">
                  <span>🌊 Przepływ</span>
                </label>
                <label class="radio-option">
                  <input type="radio" name="test-type" value="function" checked>
                  <span>⚙️ Funkcyjny</span>
                </label>
                <label class="radio-option">
                  <input type="radio" name="test-type" value="visual">
                  <span>👁️ Wizualny</span>
                </label>
                <label class="radio-option">
                  <input type="radio" name="test-type" value="maintenance">
                  <span>🔩 Konserwacja</span>
                </label>
                <label class="radio-option">
                  <input type="radio" name="test-type" value="calibration">
                  <span>📏 Kalibracja</span>
                </label>
              </div>
            </div>

            <div class="method-tabs">
              <ul class="nav nav-tabs" role="tablist">
                <li class="nav-item">
                  <button class="nav-link active method-tab" data-method="rfid" type="button">
                    🏷 RFID
                  </button>
                </li>
                <li class="nav-item">
                  <button class="nav-link method-tab" data-method="qr" type="button">
                    📱 QR Code
                  </button>
                </li>
                <li class="nav-item">
                  <button class="nav-link method-tab" data-method="barcode" type="button">
                    📊 Barcode
                  </button>
                </li>
                <li class="nav-item">
                  <button class="nav-link method-tab" data-method="manual" type="button">
                    ⌨ Manual
                  </button>
                </li>
              </ul>
            </div>

            <div class="scan-panels">
              <div id="rfid-panel" class="scan-panel active">
                <div id="connectid-container" class="connectid-wrapper">
                  <!-- ConnectID component będzie tutaj załadowany -->
                </div>
                <div class="demo-info">
                  <p><strong>Demo:</strong> Naciśnij <kbd>Ctrl+R</kbd> aby symulować RFID</p>
                </div>
              </div>

              <div id="qr-panel" class="scan-panel">
                <div class="qr-scanner">
                  <div class="scanner-status">
                    <div class="status-indicator ready">🟢</div>
                    <span>📱 QR Code Scanner gotowy</span>
                  </div>
                  <div class="scan-info">
                    <p>Naciśnij <kbd>Ctrl+Q</kbd> aby symulować skanowanie QR</p>
                    <button id="qr-demo-btn" class="btn btn-primary">📱 Demo skanowania QR</button>
                  </div>
                </div>
              </div>

              <div id="manual-panel" class="scan-panel">
                <div class="manual-input">
                  <label for="manual-input">Wprowadź kod identyfikacyjny:</label>
                  <div class="input-group">
                    <input type="text" id="manual-input" class="form-control" placeholder="G1-001234">
                    <button id="manual-search-btn" class="btn btn-primary">🔍 Wyszukaj</button>
                  </div>
                  <button id="virtual-keyboard-btn" class="btn btn-outline-secondary mt-2">🖥️ Klawiatura wirtualna</button>
                </div>
                
                <!-- Virtual Keyboard -->
                <div id="virtual-keyboard" class="virtual-keyboard" style="display: none;">
                  <div class="keyboard-row">
                    <button class="key" data-key="1">1</button>
                    <button class="key" data-key="2">2</button>
                    <button class="key" data-key="3">3</button>
                    <button class="key" data-key="4">4</button>
                    <button class="key" data-key="5">5</button>
                    <button class="key" data-key="6">6</button>
                    <button class="key" data-key="7">7</button>
                    <button class="key" data-key="8">8</button>
                    <button class="key" data-key="9">9</button>
                    <button class="key" data-key="0">0</button>
                    <button class="key key-action" data-key="BACKSPACE">⌫</button>
                  </div>
                  <div class="keyboard-row">
                    <button class="key" data-key="Q">Q</button>
                    <button class="key" data-key="W">W</button>
                    <button class="key" data-key="E">E</button>
                    <button class="key" data-key="R">R</button>
                    <button class="key" data-key="T">T</button>
                    <button class="key" data-key="Y">Y</button>
                    <button class="key" data-key="U">U</button>
                    <button class="key" data-key="I">I</button>
                    <button class="key" data-key="O">O</button>
                    <button class="key" data-key="P">P</button>
                  </div>
                  <div class="keyboard-row">
                    <button class="key" data-key="A">A</button>
                    <button class="key" data-key="S">S</button>
                    <button class="key" data-key="D">D</button>
                    <button class="key" data-key="F">F</button>
                    <button class="key" data-key="G">G</button>
                    <button class="key" data-key="H">H</button>
                    <button class="key" data-key="J">J</button>
                    <button class="key" data-key="K">K</button>
                    <button class="key" data-key="L">L</button>
                    <button class="key" data-key="-">-</button>
                  </div>
                  <div class="keyboard-row">
                    <button class="key" data-key="Z">Z</button>
                    <button class="key" data-key="X">X</button>
                    <button class="key" data-key="C">C</button>
                    <button class="key" data-key="V">V</button>
                    <button class="key" data-key="B">B</button>
                    <button class="key" data-key="N">N</button>
                    <button class="key" data-key="M">M</button>
                    <button class="key key-wide" data-key="SPACE">Spacja</button>
                    <button class="key key-action" data-key="CLEAR">Wyczyść</button>
                  </div>
                </div>
              </div>

              <div id="barcode-panel" class="scan-panel">
                <div class="barcode-input">
                  <label for="barcode-input">Zeskanuj lub wprowadź kod kreskowy:</label>
                  <input type="text" id="barcode-input" class="form-control" placeholder="Zeskanuj kod kreskowy...">
                  <div class="barcode-info">
                    <p>📊 Skaner kodów kreskowych gotowy</p>
                    <p>Zeskanuj kod lub wprowadź go ręcznie i naciśnij Enter</p>
                    <p><strong>Demo:</strong> Naciśnij <kbd>Ctrl+B</kbd> aby symulować skanowanie</p>
                    <button id="barcode-demo-btn" class="btn btn-outline-primary mt-2">📊 Demo skanowania barcode</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="right-panel">
            <div class="recent-history">
              <div class="history-header">
                <h3>📋 Ostatnie identyfikacje</h3>
                <div class="identification-stats">
                  <span class="badge bg-success" id="success-count">0</span>
                  <button id="clear-history-btn" class="btn btn-sm btn-outline-danger">🗑️ Wyczyść</button>
                </div>
              </div>
              <div id="history-list" class="history-items">
                <!-- Historia będzie tutaj dynamicznie ładowana -->
              </div>
            </div>

            <div class="system-status">
              <div class="status-header">
                <h3>📡 Status systemów</h3>
                <button id="test-all-systems" class="btn btn-sm btn-outline-info">🧪 Test wszystkich</button>
              </div>
              <div class="status-items">
                <div class="status-item">
                  <span class="status-label">RFID Reader:</span>
                  <span class="status-value status-ok">✅ Gotowy</span>
                </div>
                <div class="status-item">
                  <span class="status-label">QR Camera:</span>
                  <span class="status-value status-ok">✅ Gotowy</span>
                </div>
                <div class="status-item">
                  <span class="status-label">Barcode Scanner:</span>
                  <span class="status-value status-ok">✅ Gotowy</span>
                </div>
                <div class="status-item">
                  <span class="status-label">Database:</span>
                  <span class="status-value status-ok">✅ Aktywna</span>
                </div>
              </div>
            </div>

            <div class="quick-actions">
              <h3>⚡ Szybkie akcje</h3>
              <div class="action-buttons">
                <button class="btn btn-sm btn-outline-primary" id="switch-rfid" title="Ctrl+R">
                  🏷 RFID
                </button>
                <button class="btn btn-sm btn-outline-primary" id="switch-qr" title="Ctrl+Q">
                  📱 QR
                </button>
                <button class="btn btn-sm btn-outline-primary" id="switch-barcode" title="Ctrl+B">
                  📊 Barcode
                </button>
                <button class="btn btn-sm btn-outline-primary" id="switch-manual" title="Ctrl+M">
                  ⌨ Manual
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Notification Container -->
        <div id="notification-container" class="notification-container">
          <!-- Notifications będą tutaj dynamicznie dodawane -->
        </div>

        <div id="result-modal" class="modal" tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">✅ Identyfikacja zakończona</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-body">
                <div id="result-content"></div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Zamknij</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Add CSS styles
    this.addStyles();

    // Setup event listeners
    this.setupEventListeners(container);

    return container;
  }

  private addStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      .connect-id-page {
        padding: 20px;
        max-width: 1400px;
        margin: 0 auto;
      }

      .connect-id-container {
        background: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      }

      .header-section {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .header-section h1 {
        margin: 0;
        font-size: 1.5rem;
      }

      .header-actions {
        display: flex;
        gap: 10px;
      }

      .main-content {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 20px;
        padding: 20px;
        min-height: 600px;
      }

      .type-selector {
        margin-bottom: 20px;
      }

      .type-selector label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
      }

      .type-radio-group, .test-radio-group {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        margin-bottom: 15px;
      }

      .radio-option {
        display: flex;
        align-items: center;
        padding: 8px 12px;
        border: 2px solid #e9ecef;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s;
        font-size: 0.9rem;
      }

      .radio-option:hover {
        border-color: #007bff;
        background: #f8f9fa;
      }

      .radio-option input[type="radio"] {
        margin-right: 8px;
      }

      .radio-option input[type="radio"]:checked + span {
        font-weight: bold;
        color: #007bff;
      }

      .test-type-selector {
        background: #fff3cd;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
        border: 1px solid #ffeaa7;
      }

      .test-type-selector label {
        font-weight: bold;
        color: #856404;
        margin-bottom: 10px;
      }

      .virtual-keyboard {
        background: white;
        border: 2px solid #007bff;
        border-radius: 8px;
        padding: 15px;
        margin-top: 15px;
      }

      .keyboard-row {
        display: flex;
        gap: 4px;
        margin-bottom: 4px;
        justify-content: center;
      }

      .key {
        padding: 8px 12px;
        border: 1px solid #dee2e6;
        background: white;
        border-radius: 4px;
        cursor: pointer;
        min-width: 40px;
        font-weight: 500;
        transition: all 0.1s;
      }

      .key:hover {
        background: #e9ecef;
      }

      .key:active {
        transform: scale(0.95);
        background: #007bff;
        color: white;
      }

      .key-action {
        background: #6c757d;
        color: white;
      }

      .key-wide {
        min-width: 80px;
      }

      .history-header, .status-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
      }

      .identification-stats {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .badge {
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 0.8rem;
        font-weight: bold;
      }

      .bg-success {
        background: #28a745;
        color: white;
      }

      .history-item {
        background: white;
        border-radius: 4px;
        padding: 12px;
        margin-bottom: 8px;
        border-left: 4px solid #28a745;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .history-icon {
        font-size: 1.2rem;
        width: 30px;
        text-align: center;
      }

      .history-content {
        flex: 1;
      }

      .history-title {
        font-weight: 500;
        margin-bottom: 2px;
      }

      .history-desc {
        font-size: 0.85rem;
        color: #6c757d;
      }

      .history-time {
        font-size: 0.8rem;
        color: #adb5bd;
      }

      .history-status {
        font-size: 1.1rem;
      }

      .history-status.success {
        color: #28a745;
      }

      .history-status.error {
        color: #dc3545;
      }

      .notification-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        pointer-events: none;
      }

      .notification {
        background: white;
        border-radius: 8px;
        padding: 12px 20px;
        margin-bottom: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        border-left: 4px solid #007bff;
        max-width: 350px;
        pointer-events: all;
        animation: slideIn 0.3s ease-out;
      }

      .notification.success {
        border-left-color: #28a745;
      }

      .notification.warning {
        border-left-color: #ffc107;
      }

      .notification.danger {
        border-left-color: #dc3545;
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

      .method-tabs .nav-tabs {
        margin-bottom: 20px;
      }

      .method-tabs .nav-link {
        border: 1px solid #dee2e6;
        background: #f8f9fa;
      }

      .method-tabs .nav-link.active {
        background: #007bff;
        color: white;
        border-color: #007bff;
      }

      .scan-panels {
        position: relative;
        min-height: 300px;
      }

      .scan-panel {
        display: none;
        padding: 20px;
        border: 2px dashed #e9ecef;
        border-radius: 8px;
        text-align: center;
      }

      .scan-panel.active {
        display: block;
      }

      .connectid-wrapper {
        min-height: 200px;
        background: #f8f9fa;
        border-radius: 4px;
        padding: 20px;
        margin-bottom: 20px;
      }

      .connectid-internal {
        text-align: center;
        padding: 30px 20px;
      }

      .scan-status {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        margin-bottom: 20px;
        font-size: 1.1rem;
        font-weight: 500;
      }

      .status-indicator {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        display: inline-block;
      }

      .status-indicator.ready {
        background: #28a745;
        box-shadow: 0 0 8px rgba(40, 167, 69, 0.5);
      }

      .scan-info p {
        margin-bottom: 15px;
        color: #6c757d;
      }

      .scanner-status {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        margin-bottom: 20px;
        font-size: 1.1rem;
        font-weight: 500;
      }

      .shortcuts {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        justify-content: center;
      }

      .shortcut {
        background: #e9ecef;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.8rem;
        color: #495057;
      }

      .demo-info {
        background: #fff3cd;
        border: 1px solid #ffeaa7;
        border-radius: 4px;
        padding: 10px;
        margin-top: 10px;
      }

      .manual-input .input-group {
        margin-top: 10px;
      }

      .right-panel {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .recent-history, .system-status, .quick-actions {
        background: #f8f9fa;
        border-radius: 8px;
        padding: 15px;
      }

      .recent-history h3, .system-status h3, .quick-actions h3 {
        margin: 0 0 15px 0;
        font-size: 1.1rem;
        color: #495057;
      }

      .history-items {
        max-height: 200px;
        overflow-y: auto;
      }

      .history-item {
        background: white;
        border-radius: 4px;
        padding: 8px 12px;
        margin-bottom: 8px;
        border-left: 4px solid #28a745;
        font-size: 0.9rem;
      }

      .history-item-meta {
        color: #6c757d;
        font-size: 0.8rem;
      }

      .status-items {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .status-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 4px 0;
      }

      .status-label {
        font-weight: 500;
      }

      .status-ok {
        color: #28a745;
      }

      .status-pending {
        color: #ffc107;
      }

      .action-buttons {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
      }

      .action-buttons .btn {
        font-size: 0.8rem;
        padding: 4px 8px;
      }

      @media (max-width: 768px) {
        .main-content {
          grid-template-columns: 1fr;
        }
        
        .header-section {
          flex-direction: column;
          gap: 10px;
          text-align: center;
        }
      }
    `;
    document.head.appendChild(style);
  }

  private setupEventListeners(container: HTMLElement): void {
    // Identification type radio buttons
    const typeRadios = container.querySelectorAll('input[name="identification-type"]');
    typeRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        if (target.checked) {
          this.module.getService().setIdentificationType(target.value as any);
        }
      });
    });

    // Test type radio buttons
    const testRadios = container.querySelectorAll('input[name="test-type"]');
    testRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        if (target.checked) {
          this.module.getService().setTestType(target.value as any);
        }
      });
    });

    // Method tab switching
    const methodTabs = container.querySelectorAll('.method-tab[data-method]');
    methodTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const method = target.getAttribute('data-method');
        this.switchToMethod(method, container);
      });
    });

    // Continuous mode toggle
    const continuousToggle = container.querySelector('#continuous-toggle');
    continuousToggle?.addEventListener('click', () => {
      this.toggleContinuousMode();
    });

    // Manual search
    const manualSearchBtn = container.querySelector('#manual-search-btn');
    const manualInput = container.querySelector('#manual-input') as HTMLInputElement;
    
    manualSearchBtn?.addEventListener('click', () => {
      const value = manualInput?.value.trim();
      if (value) {
        this.performManualSearch(value);
      }
    });

    manualInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const value = manualInput.value.trim();
        if (value) {
          this.performManualSearch(value);
        }
      }
    });

    // Barcode input
    const barcodeInput = container.querySelector('#barcode-input') as HTMLInputElement;
    barcodeInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const value = barcodeInput.value.trim();
        if (value) {
          this.performBarcodeSearch(value);
          barcodeInput.value = '';
        }
      }
    });

    // Virtual keyboard
    const keyboardBtn = container.querySelector('#virtual-keyboard-btn');
    keyboardBtn?.addEventListener('click', () => {
      this.toggleVirtualKeyboard();
    });

    // Virtual keyboard keys
    const keys = container.querySelectorAll('.key');
    keys.forEach(key => {
      key.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const keyValue = target.getAttribute('data-key');
        this.handleVirtualKeyInput(keyValue, manualInput);
      });
    });

    // Clear history
    const clearHistoryBtn = container.querySelector('#clear-history-btn');
    clearHistoryBtn?.addEventListener('click', () => {
      this.module.getService().clearHistory();
    });

    // Test all systems
    const testSystemsBtn = container.querySelector('#test-all-systems');
    testSystemsBtn?.addEventListener('click', () => {
      this.module.getService().testAllSystems();
    });

    // Quick action buttons
    const switchBtns = {
      'switch-rfid': 'rfid',
      'switch-qr': 'qr', 
      'switch-barcode': 'barcode',
      'switch-manual': 'manual'
    };

    Object.entries(switchBtns).forEach(([id, method]) => {
      const btn = container.querySelector(`#${id}`);
      btn?.addEventListener('click', () => {
        this.module.getService().switchToMethod(method as any);
      });
    });

    // Demo buttons
    const qrDemoBtn = container.querySelector('#qr-demo-btn');
    qrDemoBtn?.addEventListener('click', () => {
      this.simulateQRScan();
    });

    const barcodeDemoBtn = container.querySelector('#barcode-demo-btn');
    barcodeDemoBtn?.addEventListener('click', () => {
      this.simulateBarcodeScan();
    });

    // Listen for service events
    window.addEventListener('connectid:identification', (e: any) => {
      this.handleIdentificationResult(e.detail);
    });

    window.addEventListener('connectid:history-update', (e: any) => {
      this.updateHistoryDisplay(e.detail.history, e.detail.isEmpty, container);
    });

    window.addEventListener('connectid:stats-update', (e: any) => {
      this.updateStatsDisplay(e.detail.successCount, container);
    });

    window.addEventListener('connectid:notification', (e: any) => {
      this.showNotification(e.detail.message, e.detail.type);
    });

    window.addEventListener('connectid:type-changed', (e: any) => {
      this.updateTestSelectorVisibility(e.detail.showTestSelector, container);
    });

    window.addEventListener('connectid:keyboard-toggle', (e: any) => {
      this.updateVirtualKeyboard(e.detail.visible, container);
    });

    window.addEventListener('connectid:method-switch', (e: any) => {
      this.switchToMethod(e.detail.method, container);
    });

    // Initialize ConnectID component after DOM is ready
    setTimeout(() => this.initializeConnectID(), 100);
  }

  private async initializeConnectID(): Promise<void> {
    try {
      const service = this.module.getService();
      await service.initializeConnectID('connectid-container');
      console.log('✅ ConnectID component loaded in view');
    } catch (error) {
      console.warn('⚠️ ConnectID component not available:', error);
      // Show fallback UI
      this.showConnectIDFallback();
    }
  }

  private showConnectIDFallback(): void {
    const container = document.getElementById('connectid-container');
    if (container) {
      container.innerHTML = `
        <div class="alert alert-info">
          <h4>🔍 ConnectID Simulation Mode</h4>
          <p>Hardware components not available. Using keyboard simulation:</p>
          <ul>
            <li><kbd>Ctrl+R</kbd> - Simulate RFID scan</li>
            <li><kbd>Ctrl+Q</kbd> - Switch to QR mode</li>
            <li><kbd>Ctrl+B</kbd> - Switch to Barcode mode</li>
            <li><kbd>Ctrl+M</kbd> - Switch to Manual mode</li>
          </ul>
        </div>
      `;
    }
  }

  private switchToMethod(method: string | null, container: HTMLElement): void {
    if (!method) return;

    // Update active tab
    const tabs = container.querySelectorAll('.nav-link[data-method]');
    tabs.forEach(tab => tab.classList.remove('active'));
    container.querySelector(`[data-method="${method}"]`)?.classList.add('active');

    // Update active panel
    const panels = container.querySelectorAll('.scan-panel');
    panels.forEach(panel => panel.classList.remove('active'));
    container.querySelector(`#${method}-panel`)?.classList.add('active');

    console.log(`Switched to ${method} method`);
  }

  private toggleContinuousMode(): void {
    try {
      const service = this.module.getService();
      const isActive = service.toggleContinuousMode();
      
      const button = document.querySelector('#continuous-toggle');
      if (button) {
        button.textContent = isActive ? '⏸️ Stop Continuous' : '🔄 Tryb ciągły';
        button.className = isActive ? 'btn btn-warning' : 'btn btn-outline-success';
      }
    } catch (error) {
      console.error('Error toggling continuous mode:', error);
    }
  }

  private performManualSearch(value: string): void {
    const service = this.module.getService();
    service.handleManualIdentification(value);
    
    // Clear input
    const manualInput = document.getElementById('manual-input') as HTMLInputElement;
    if (manualInput) {
      manualInput.value = '';
    }
  }

  private performBarcodeSearch(value: string): void {
    const service = this.module.getService();
    service.handleBarcodeIdentification(value);
  }

  private toggleVirtualKeyboard(): void {
    const service = this.module.getService();
    service.toggleVirtualKeyboard();
  }

  private handleVirtualKeyInput(keyValue: string | null, input: HTMLInputElement): void {
    if (!input || !keyValue) return;
    
    let currentValue = input.value;
    
    switch (keyValue) {
      case 'BACKSPACE':
        input.value = currentValue.slice(0, -1);
        break;
      case 'CLEAR':
        input.value = '';
        break;
      case 'SPACE':
        input.value = currentValue + ' ';
        break;
      default:
        input.value = currentValue + keyValue;
        break;
    }
    
    // Focus input after key press
    input.focus();
    
    // Visual feedback
    const keyElement = document.querySelector(`[data-key="${keyValue}"]`);
    if (keyElement) {
      (keyElement as HTMLElement).style.transform = 'scale(0.95)';
      setTimeout(() => {
        (keyElement as HTMLElement).style.transform = '';
      }, 100);
    }
  }

  private updateTestSelectorVisibility(showTestSelector: boolean, container: HTMLElement): void {
    const testSelector = container.querySelector('#test-type-selector') as HTMLElement;
    if (testSelector) {
      testSelector.style.display = showTestSelector ? 'block' : 'none';
    }
  }

  private updateVirtualKeyboard(visible: boolean, container: HTMLElement): void {
    const keyboard = container.querySelector('#virtual-keyboard') as HTMLElement;
    const btn = container.querySelector('#virtual-keyboard-btn') as HTMLElement;
    
    if (keyboard && btn) {
      if (visible) {
        keyboard.style.display = 'block';
        btn.textContent = '🖥️ Ukryj klawiaturę';
      } else {
        keyboard.style.display = 'none';
        btn.textContent = '🖥️ Klawiatura wirtualna';
      }
    }
  }

  private updateStatsDisplay(successCount: number, container: HTMLElement): void {
    const successCountElement = container.querySelector('#success-count');
    if (successCountElement) {
      successCountElement.textContent = successCount.toString();
    }
  }

  private showNotification(message: string, type: 'info' | 'success' | 'warning' | 'danger' = 'info'): void {
    const container = document.getElementById('notification-container');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      ${message}
      <button type="button" class="btn-close" style="float: right; background: none; border: none; font-size: 1.2rem;">&times;</button>
    `;
    
    container.appendChild(notification);
    
    // Auto-remove after 5 seconds
    const removeNotification = () => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    };
    
    setTimeout(removeNotification, 5000);
    
    // Allow manual close
    const closeBtn = notification.querySelector('.btn-close');
    closeBtn?.addEventListener('click', removeNotification);
  }

  private handleIdentificationResult(data: any): void {
    // Show result modal
    this.showResultModal(data);
    
    // Update history display will be handled by the service event
  }

  private showResultModal(data: any): void {
    const modal = document.getElementById('result-modal');
    const content = document.getElementById('result-content');
    
    if (content) {
      content.innerHTML = `
        <div class="result-data">
          <p><strong>ID:</strong> ${data.id}</p>
          <p><strong>Typ:</strong> ${data.type}</p>
          <p><strong>Metoda:</strong> ${data.method}</p>
          <p><strong>Wartość:</strong> ${data.value}</p>
          <p><strong>Czas:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
        </div>
      `;
    }

    // Show modal using Bootstrap (if available) or simple display
    if (modal) {
      modal.style.display = 'block';
      modal.classList.add('show');
    }
  }

  private updateHistoryDisplay(history: any[], isEmpty: boolean, container: HTMLElement): void {
    const historyList = container.querySelector('#history-list');
    if (!historyList) return;

    if (isEmpty) {
      historyList.innerHTML = '<div class="text-center text-muted p-3">No identifications yet</div>';
      return;
    }

    historyList.innerHTML = history.map(item => `
      <div class="history-item">
        <div class="history-icon ${item.method}">
          ${item.icon}
        </div>
        <div class="history-content">
          <div class="history-title">
            ${item.title}
          </div>
          <div class="history-desc">
            ${item.description}
          </div>
          <div class="history-time">${item.timeAgo}</div>
        </div>
        <div class="history-status ${item.status}">
          ${item.status === 'success' ? '✅' : '❌'}
        </div>
      </div>
    `).join('');
  }

  /**
   * Simulate QR code scanning
   */
  private simulateQRScan(): void {
    const service = this.module.getService();
    const qrCodes = [
      'QR-G1-001567',
      'QR-PSS-007891', 
      'QR-SCOTT-002345',
      'QR-USER-KOWALSKI',
      'QR-GROUP-TECH01'
    ];
    
    const randomCode = qrCodes[Math.floor(Math.random() * qrCodes.length)];
    
    const identificationData = {
      method: 'qr' as const,
      code: randomCode,
      type: service.getIdentificationType(),
      data: {
        serial_number: randomCode,
        name: randomCode.replace('QR-', ''),
        device_type: 'QR Code Scan'
      }
    };
    
    // Switch to QR method and trigger identification event
    service.switchToMethod('qr');
    window.dispatchEvent(new CustomEvent('connectid:identification', {
      detail: identificationData
    }));
  }

  /**
   * Simulate barcode scanning
   */
  private simulateBarcodeScan(): void {
    const service = this.module.getService();
    const barcodes = [
      '1234567890123',
      '9876543210987',
      'BC-G1-445566',
      'BC-PSS-778899',
      'BC-MASK-112233'
    ];
    
    const randomCode = barcodes[Math.floor(Math.random() * barcodes.length)];
    
    const identificationData = {
      method: 'barcode' as const,
      code: randomCode,
      type: service.getIdentificationType(),
      data: {
        serial_number: randomCode,
        name: randomCode.includes('BC-') ? randomCode.replace('BC-', '') : randomCode,
        device_type: 'Barcode Scan'
      }
    };
    
    // Switch to barcode method and trigger identification event
    service.switchToMethod('barcode');
    window.dispatchEvent(new CustomEvent('connectid:identification', {
      detail: identificationData
    }));
  }
}
