// frontend/src/modules/connect-config/pages/devices/qr-config/qr-config.page.ts

export interface QrConfigData {
  resolution: string;
  scanTimeout: number;
  status: 'online' | 'offline' | 'warning';
  cameraStatus: string;
  lastScan: string;
  successRate: number;
}

export class QrConfigPage {
  private data: QrConfigData = {
    resolution: '1280x720',
    scanTimeout: 3000,
    status: 'online',
    cameraStatus: 'Connected',
    lastScan: '5 min ago',
    successRate: 96.2
  };

  constructor() {
  }

  public render(): string {
    return `
      <div id="qr-config-content" class="section-content">
        <div class="config-form">
          <h4>📷 Konfiguracja QR Scanner</h4>
          <div class="form-section">
            <h5>Camera Settings</h5>
            <div class="form-row">
              <div class="form-group">
                <label>Resolution:</label>
                <select class="form-select" id="qr-resolution">
                  <option value="640x480">640x480</option>
                  <option value="1280x720" selected>1280x720</option>
                  <option value="1920x1080">1920x1080</option>
                </select>
              </div>
              <div class="form-group">
                <label>Scan Timeout (ms):</label>
                <input type="number" class="form-input" id="qr-timeout" value="${this.data.scanTimeout}" min="1000" max="10000" />
              </div>
            </div>
            <div class="status-grid">
              <div class="status-card">
                <div class="status-header">
                  <span class="status-title">QR Scanner Status</span>
                  <span class="status-badge ${this.data.status}">${this.getStatusText()}</span>
                </div>
                <div class="status-details">
                  <div class="status-row">
                    <span>Camera:</span>
                    <span>${this.data.cameraStatus}</span>
                  </div>
                  <div class="status-row">
                    <span>Last Scan:</span>
                    <span>${this.data.lastScan}</span>
                  </div>
                  <div class="status-row">
                    <span>Success Rate:</span>
                    <span>${this.data.successRate}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-actions">
            <button class="btn-save" id="qr-save">💾 Zapisz</button>
            <button class="btn-test" id="qr-test">📷 Test QR Scanner</button>
          </div>
        </div>
      </div>
    `;
  }

  private getStatusText(): string {
    switch (this.data.status) {
      case 'online': return 'Online';
      case 'offline': return 'Offline';
      case 'warning': return 'Warning';
      default: return 'Unknown';
    }
  }

  public setupEventListeners(container: HTMLElement): void {
    const saveBtn = container.querySelector('#qr-save') as HTMLButtonElement;
    const testBtn = container.querySelector('#qr-test') as HTMLButtonElement;
    const resolutionSelect = container.querySelector('#qr-resolution') as HTMLSelectElement;
    const timeoutInput = container.querySelector('#qr-timeout') as HTMLInputElement;

    if (saveBtn) {
      saveBtn.addEventListener('click', () => this.handleSave());
    }

    if (testBtn) {
      testBtn.addEventListener('click', () => this.handleTest());
    }

    if (resolutionSelect) {
      resolutionSelect.addEventListener('change', (e) => {
        this.data.resolution = (e.target as HTMLSelectElement).value;
      });
    }

    if (timeoutInput) {
      timeoutInput.addEventListener('input', (e) => {
        this.data.scanTimeout = parseInt((e.target as HTMLInputElement).value);
      });
    }

  }

  private handleSave(): void {
    this.showNotification('Konfiguracja QR Scanner zapisana pomyślnie', 'success');
  }

  private handleTest(): void {
    this.showNotification('Test QR Scanner w toku...', 'info');
    
    setTimeout(() => {
      const success = Math.random() > 0.15; // 85% success rate
      if (success) {
        this.showNotification('Test QR Scanner zakończony pomyślnie', 'success');
      } else {
        this.showNotification('Test QR Scanner nieudany - sprawdź kamerę', 'error');
      }
    }, 2500);
  }

  private showNotification(message: string, type: 'success' | 'error' | 'info'): void {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 20px;
      border-radius: 4px;
      color: white;
      font-weight: 500;
      z-index: 1000;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;

    switch (type) {
      case 'success':
        notification.style.backgroundColor = '#28a745';
        break;
      case 'error':
        notification.style.backgroundColor = '#dc3545';
        break;
      case 'info':
        notification.style.backgroundColor = '#17a2b8';
        break;
    }

    document.body.appendChild(notification);
    setTimeout(() => notification.style.opacity = '1', 100);
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
  }

  public getData(): QrConfigData {
    return { ...this.data };
  }

  public setData(newData: Partial<QrConfigData>): void {
    this.data = { ...this.data, ...newData };
  }

  public getStyles(): string {
    return `
      /* QR Config Page Specific Styles */
      #qr-config-content {
        animation: fadeIn 0.3s ease;
      }

      #qr-timeout {
        width: 100px;
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
  }
}
