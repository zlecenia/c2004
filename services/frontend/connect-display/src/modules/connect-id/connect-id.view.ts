// frontend/src/modules/connect-id/connect-id.view.ts - Compact 1280x400px version
import { ConnectIdModule } from './connect-id.module';

export class ConnectIdView {
  private module: ConnectIdModule;
  private currentType: string = 'device';
  private currentMethod: string = 'rfid';

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
        <!-- Column 1: Identification Type -->
        <div class="menu-column">
          <h3 class="column-title">Identyfikacja</h3>
          <button class="menu-item" data-type="user">
            <span class="menu-icon">👤</span>
            <span class="menu-label">Użytkownik</span>
          </button>
          <button class="menu-item active" data-type="device">
            <span class="menu-icon">📱</span>
            <span class="menu-label">Urządzenia</span>
          </button>
          
        </div>

        <!-- Column 2: Interface Method -->
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
        </div>

        <!-- Main Content -->
        <div class="main-content">
          <div class="content-header">
            <h2 id="content-title">Identyfikacja Urządzenia - RFID</h2>
          </div>

          <div class="content-body">
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
              <div class="virtual-keyboard-compact">
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
                  <button class="key key-special" data-key="CLEAR">⌫</button>
                </div>
                <div class="keyboard-row">
                  <button class="key" data-key="Z">Z</button>
                  <button class="key" data-key="X">X</button>
                  <button class="key" data-key="C">C</button>
                  <button class="key" data-key="V">V</button>
                  <button class="key" data-key="B">B</button>
                  <button class="key" data-key="N">N</button>
                  <button class="key" data-key="M">M</button>
                  <button class="key" data-key="-">-</button>
                  <button class="key key-wide" data-key="ENTER">↵ ENTER</button>
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

      .menu-item, .method-item {
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

      .content-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 10px 15px;
        flex-shrink: 0;
      }

      .content-header h2 {
        margin: 0;
        font-size: 14px;
        font-weight: 600;
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
    `;
    document.head.appendChild(style);
  }

  private setupEventListeners(container: HTMLElement): void {
    // Type selection
    const typeButtons = container.querySelectorAll('.menu-item');
    typeButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const type = target.getAttribute('data-type');
        if (type) {
          this.switchType(type, container);
        }
      });
    });

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

    // Virtual keyboard
    const keys = container.querySelectorAll('.key');
    const manualInput = container.querySelector('#manual-code-input') as HTMLInputElement;
    keys.forEach(key => {
      key.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const keyValue = target.getAttribute('data-key');
        this.handleVirtualKeyInput(keyValue, manualInput);
      });
    });

    // Manual submit
    const submitBtn = container.querySelector('#manual-submit-btn');
    submitBtn?.addEventListener('click', () => {
      if (manualInput && manualInput.value) {
        this.handleManualIdentification(manualInput.value);
        manualInput.value = '';
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
      'user': 'Identyfikacja Użytkownika',
      'device': 'Identyfikacja Urządzenia',
      'test': 'Identyfikacja Testu'
    };
    const topBarTitle = document.getElementById('top-bar-section-title');
    if (topBarTitle) {
      topBarTitle.textContent = `${titles[type as keyof typeof titles]} - ${this.currentMethod.toUpperCase()}`;
    }

    const typeValue = container.querySelector('#type-value');
    if (typeValue) {
      typeValue.textContent = titles[type as keyof typeof titles].replace('Identyfikacja ', '');
    }
  }

  private switchMethod(method: string, container: HTMLElement): void {
    this.currentMethod = method;

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

    // Update title in top-bar
    const topBarTitle = document.getElementById('top-bar-section-title');
    if (topBarTitle) {
      topBarTitle.textContent = `Identyfikacja ${this.getTypeName()} - ${method.toUpperCase()}`;
    }

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

  private getTypeName(): string {
    const names = {
      'user': 'Użytkownik',
      'device': 'Urządzenia',
      'test': 'Testu'
    };
    return names[this.currentType as keyof typeof names] || 'Urządzenia';
  }

  private handleVirtualKeyInput(key: string | null, input: HTMLInputElement): void {
    if (!key || !input) return;

    if (key === 'CLEAR') {
      input.value = '';
    } else if (key === 'ENTER') {
      if (input.value) {
        this.handleManualIdentification(input.value);
        input.value = '';
      }
    } else {
      input.value += key;
    }
  }

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
}
