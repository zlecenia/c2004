// frontend/src/modules/connect-config/pages/devices/rfid-config/rfid-config.page.ts

export interface RfidConfigData {
  frequency: string;
  readDistance: number;
  status: 'online' | 'offline' | 'warning';
  lastRead: string;
  totalReads: number;
  successRate: number;
}

export class RfidConfigPage {
  private data: RfidConfigData = {
    frequency: '125',
    readDistance: 8,
    status: 'online',
    lastRead: '2 min ago',
    totalReads: 1234,
    successRate: 98.5
  };

  constructor() {
  }

  public render(): string {
    return `
      <div id="rfid-config-content" class="section-content">
        <div class="config-form">
          <h4>📡 Konfiguracja RFID Reader</h4>
          <div class="form-section">
            <h5>Reader Settings</h5>
            <div class="form-row">
              <div class="form-group">
                <label>Frequency (MHz):</label>
                <select class="form-select" id="rfid-frequency">
                  <option value="13.56">13.56</option>
                  <option value="125" selected>125</option>
                  <option value="868">868</option>
                </select>
              </div>
              <div class="form-group">
                <label>Read Distance (cm):</label>
                <input type="range" class="form-input" id="rfid-distance" value="${this.data.readDistance}" min="1" max="15" />
                <span class="range-value">${this.data.readDistance} cm</span>
              </div>
            </div>
            <div class="status-grid">
              <div class="status-card">
                <div class="status-header">
                  <span class="status-title">RFID Reader Status</span>
                  <span class="status-badge ${this.data.status}">${this.getStatusText()}</span>
                </div>
                <div class="status-details">
                  <div class="status-row">
                    <span>Last Read:</span>
                    <span>${this.data.lastRead}</span>
                  </div>
                  <div class="status-row">
                    <span>Total Reads:</span>
                    <span>${this.data.totalReads.toLocaleString()}</span>
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
            <button class="btn-save" id="rfid-save">💾 Zapisz</button>
            <button class="btn-test" id="rfid-test">📡 Test RFID</button>
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
    const saveBtn = container.querySelector('#rfid-save') as HTMLButtonElement;
    const testBtn = container.querySelector('#rfid-test') as HTMLButtonElement;
    const frequencySelect = container.querySelector('#rfid-frequency') as HTMLSelectElement;
    const distanceRange = container.querySelector('#rfid-distance') as HTMLInputElement;

    if (saveBtn) {
      saveBtn.addEventListener('click', () => this.handleSave());
    }

    if (testBtn) {
      testBtn.addEventListener('click', () => this.handleTest());
    }

    if (frequencySelect) {
      frequencySelect.addEventListener('change', (e) => {
        this.data.frequency = (e.target as HTMLSelectElement).value;
      });
    }

    if (distanceRange) {
      distanceRange.addEventListener('input', (e) => {
        const value = parseInt((e.target as HTMLInputElement).value);
        this.data.readDistance = value;
        this.updateRangeValue(value);
      });
    }

  }

  private updateRangeValue(value: number): void {
    const rangeValueSpan = document.querySelector('.range-value');
    if (rangeValueSpan) {
      rangeValueSpan.textContent = `${value} cm`;
    }
  }

  private handleSave(): void {
    // Here you would typically send data to backend
    this.showNotification('Konfiguracja RFID zapisana pomyślnie', 'success');
  }

  private handleTest(): void {
    this.showNotification('Test RFID w toku...', 'info');
    
    // Simulate test
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate
      if (success) {
        this.showNotification('Test RFID zakończony pomyślnie', 'success');
      } else {
        this.showNotification('Test RFID nieudany - sprawdź połączenie', 'error');
      }
    }, 2000);
  }

  private showNotification(message: string, type: 'success' | 'error' | 'info'): void {
    // Create notification element
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

    // Set background color based on type
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

    // Animate in
    setTimeout(() => {
      notification.style.opacity = '1';
    }, 100);

    // Remove after delay
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  public getData(): RfidConfigData {
    return { ...this.data };
  }

  public setData(newData: Partial<RfidConfigData>): void {
    this.data = { ...this.data, ...newData };
  }

  public getStyles(): string {
    return `
      /* RFID Config Page Specific Styles */
      #rfid-config-content {
        animation: fadeIn 0.3s ease;
      }

      .range-value {
        margin-left: 10px;
        font-size: 11px;
        color: #666;
        font-weight: 500;
      }

      .status-grid {
        margin-top: 15px;
      }

      .status-card {
        background: white;
        border: 1px solid #e0e0e0;
        border-radius: 6px;
        padding: 15px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      }

      .status-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
      }

      .status-title {
        font-size: 12px;
        font-weight: 600;
        color: #333;
      }

      .status-badge {
        padding: 3px 8px;
        border-radius: 12px;
        font-size: 10px;
        font-weight: 600;
        text-transform: uppercase;
      }

      .status-badge.online {
        background: #d1e7dd;
        color: #0f5132;
      }

      .status-badge.offline {
        background: #f8d7da;
        color: #721c24;
      }

      .status-badge.warning {
        background: #fff3cd;
        color: #856404;
      }

      .status-details {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .status-row {
        display: flex;
        justify-content: space-between;
        font-size: 11px;
      }

      .status-row span:first-child {
        color: #666;
      }

      .status-row span:last-child {
        color: #333;
        font-weight: 500;
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
  }
}
