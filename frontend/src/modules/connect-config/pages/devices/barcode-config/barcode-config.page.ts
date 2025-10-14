// frontend/src/modules/connect-config/pages/devices/barcode-config/barcode-config.page.ts

export interface BarcodeConfigData {
  enabledTypes: string[];
  scanSensitivity: number;
  status: 'online' | 'offline' | 'warning';
  deviceStatus: string;
  lastScan: string;
  batteryLevel: number;
}

export class BarcodeConfigPage {
  private data: BarcodeConfigData = {
    enabledTypes: ['Code128', 'EAN13'],
    scanSensitivity: 7,
    status: 'warning',
    deviceStatus: 'Connected',
    lastScan: '15 min ago',
    batteryLevel: 23
  };

  constructor() {
  }

  public render(): string {
    return `
      <div id="barcode-config-content" class="section-content">
        <div class="config-form">
          <h4>📊 Konfiguracja Barcode Scanner</h4>
          <div class="form-section">
            <h5>Scanner Settings</h5>
            <div class="form-row">
              <div class="form-group">
                <label>Barcode Types:</label>
                <div class="checkbox-group">
                  <label><input type="checkbox" value="Code128" ${this.data.enabledTypes.includes('Code128') ? 'checked' : ''}> Code128</label>
                  <label><input type="checkbox" value="EAN13" ${this.data.enabledTypes.includes('EAN13') ? 'checked' : ''}> EAN13</label>
                  <label><input type="checkbox" value="QRCode" ${this.data.enabledTypes.includes('QRCode') ? 'checked' : ''}> QR Code</label>
                </div>
              </div>
              <div class="form-group">
                <label>Scan Sensitivity:</label>
                <input type="range" class="form-input" id="barcode-sensitivity" value="${this.data.scanSensitivity}" min="1" max="10" />
                <span class="range-value">${this.data.scanSensitivity}/10</span>
              </div>
            </div>
            <div class="status-grid">
              <div class="status-card">
                <div class="status-header">
                  <span class="status-title">Barcode Scanner Status</span>
                  <span class="status-badge ${this.data.status}">${this.getStatusText()}</span>
                </div>
                <div class="status-details">
                  <div class="status-row">
                    <span>Device:</span>
                    <span>${this.data.deviceStatus}</span>
                  </div>
                  <div class="status-row">
                    <span>Last Scan:</span>
                    <span>${this.data.lastScan}</span>
                  </div>
                  <div class="status-row">
                    <span>Battery:</span>
                    <span class="${this.data.batteryLevel < 30 ? 'low-battery' : ''}">${this.getBatteryText()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-actions">
            <button class="btn-save" id="barcode-save">💾 Zapisz</button>
            <button class="btn-test" id="barcode-test">📊 Test Barcode</button>
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

  private getBatteryText(): string {
    if (this.data.batteryLevel < 20) return `Critical (${this.data.batteryLevel}%)`;
    if (this.data.batteryLevel < 30) return `Low (${this.data.batteryLevel}%)`;
    return `${this.data.batteryLevel}%`;
  }

  public setupEventListeners(container: HTMLElement): void {
    const saveBtn = container.querySelector('#barcode-save') as HTMLButtonElement;
    const testBtn = container.querySelector('#barcode-test') as HTMLButtonElement;
    const sensitivityRange = container.querySelector('#barcode-sensitivity') as HTMLInputElement;
    const checkboxes = container.querySelectorAll('.checkbox-group input[type="checkbox"]');

    if (saveBtn) {
      saveBtn.addEventListener('click', () => this.handleSave());
    }

    if (testBtn) {
      testBtn.addEventListener('click', () => this.handleTest());
    }

    if (sensitivityRange) {
      sensitivityRange.addEventListener('input', (e) => {
        const value = parseInt((e.target as HTMLInputElement).value);
        this.data.scanSensitivity = value;
        this.updateRangeValue(value);
      });
    }

    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        const value = target.value;
        if (target.checked) {
          if (!this.data.enabledTypes.includes(value)) {
            this.data.enabledTypes.push(value);
          }
        } else {
          this.data.enabledTypes = this.data.enabledTypes.filter(type => type !== value);
        }
      });
    });

  }

  private updateRangeValue(value: number): void {
    const rangeValueSpan = document.querySelector('.range-value');
    if (rangeValueSpan) {
      rangeValueSpan.textContent = `${value}/10`;
    }
  }

  private handleSave(): void {
    this.showNotification('Konfiguracja Barcode Scanner zapisana pomyślnie', 'success');
  }

  private handleTest(): void {
    this.showNotification('Test Barcode Scanner w toku...', 'info');
    
    setTimeout(() => {
      const success = Math.random() > 0.25;
      if (success) {
        this.showNotification('Test Barcode Scanner zakończony pomyślnie', 'success');
      } else {
        this.showNotification('Test Barcode Scanner nieudany - sprawdź urządzenie', 'error');
      }
    }, 2000);
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
      case 'success': notification.style.backgroundColor = '#28a745'; break;
      case 'error': notification.style.backgroundColor = '#dc3545'; break;
      case 'info': notification.style.backgroundColor = '#17a2b8'; break;
    }

    document.body.appendChild(notification);
    setTimeout(() => notification.style.opacity = '1', 100);
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
  }

  public getData(): BarcodeConfigData {
    return { ...this.data };
  }

  public setData(newData: Partial<BarcodeConfigData>): void {
    this.data = { ...this.data, ...newData };
  }

  public getStyles(): string {
    return `
      /* Barcode Config Page Specific Styles */
      #barcode-config-content {
        animation: fadeIn 0.3s ease;
      }

      .checkbox-group {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .checkbox-group label {
        font-size: 11px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .low-battery {
        color: #dc3545 !important;
        font-weight: 600;
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
  }
}
