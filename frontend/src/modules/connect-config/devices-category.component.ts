// frontend/src/modules/connect-config/devices-category.component.ts

export interface DevicesCategoryData {
  sections: DevicesSection[];
}

export interface DevicesSection {
  id: string;
  name: string;
  icon?: string;
}

export class DevicesCategoryComponent {
  constructor() {}

  public render(): string {
    const sections = this.getDevicesSections();
    
    return `
      <div id="devices-subcategories" class="subcategory-group" style="display: none;">
        ${sections.map(section => this.renderSection(section)).join('')}
      </div>
    `;
  }

  private renderSection(section: DevicesSection): string {
    const activeClass = section.id === 'rfid-config' ? ' active' : '';
    return `
      <button class="section-item compact${activeClass}" data-section="${section.id}">
        <span class="menu-label">${section.name}</span>
      </button>
    `;
  }

  public renderContent(): string {
    return `
      <!-- RFID Config Section -->
      <div id="rfid-config-content" class="section-content">
        <div class="config-form">
          <h4>📡 Konfiguracja RFID Reader</h4>
          <div class="form-section">
            <h5>Reader Settings</h5>
            <div class="form-row">
              <div class="form-group">
                <label>Frequency (MHz):</label>
                <select class="form-select">
                  <option>13.56</option>
                  <option selected>125</option>
                  <option>868</option>
                </select>
              </div>
              <div class="form-group">
                <label>Read Distance (cm):</label>
                <input type="range" class="form-input" value="8" min="1" max="15" />
              </div>
            </div>
            <div class="status-grid">
              <div class="status-card">
                <div class="status-header">
                  <span class="status-title">RFID Reader Status</span>
                  <span class="status-badge online">Online</span>
                </div>
                <div class="status-details">
                  <div class="status-row">
                    <span>Last Read:</span>
                    <span>2 min ago</span>
                  </div>
                  <div class="status-row">
                    <span>Total Reads:</span>
                    <span>1,234</span>
                  </div>
                  <div class="status-row">
                    <span>Success Rate:</span>
                    <span>98.5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-actions">
            <button class="btn-save">💾 Zapisz</button>
            <button class="btn-test">📡 Test RFID</button>
          </div>
        </div>
      </div>

      <!-- QR Config Section -->
      <div id="qr-config-content" class="section-content">
        <div class="config-form">
          <h4>📷 Konfiguracja QR Scanner</h4>
          <div class="form-section">
            <h5>Camera Settings</h5>
            <div class="form-row">
              <div class="form-group">
                <label>Resolution:</label>
                <select class="form-select">
                  <option>640x480</option>
                  <option selected>1280x720</option>
                  <option>1920x1080</option>
                </select>
              </div>
              <div class="form-group">
                <label>Scan Timeout (ms):</label>
                <input type="number" class="form-input" value="3000" min="1000" max="10000" />
              </div>
            </div>
            <div class="status-grid">
              <div class="status-card">
                <div class="status-header">
                  <span class="status-title">QR Scanner Status</span>
                  <span class="status-badge online">Online</span>
                </div>
                <div class="status-details">
                  <div class="status-row">
                    <span>Camera:</span>
                    <span>Connected</span>
                  </div>
                  <div class="status-row">
                    <span>Last Scan:</span>
                    <span>5 min ago</span>
                  </div>
                  <div class="status-row">
                    <span>Success Rate:</span>
                    <span>96.2%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-actions">
            <button class="btn-save">💾 Zapisz</button>
            <button class="btn-test">📷 Test QR Scanner</button>
          </div>
        </div>
      </div>

      <!-- Barcode Config Section -->
      <div id="barcode-config-content" class="section-content">
        <div class="config-form">
          <h4>📊 Konfiguracja Barcode Scanner</h4>
          <div class="form-section">
            <h5>Scanner Settings</h5>
            <div class="form-row">
              <div class="form-group">
                <label>Barcode Types:</label>
                <div class="checkbox-group">
                  <label><input type="checkbox" checked> Code128</label>
                  <label><input type="checkbox" checked> EAN13</label>
                  <label><input type="checkbox"> QR Code</label>
                </div>
              </div>
              <div class="form-group">
                <label>Scan Sensitivity:</label>
                <input type="range" class="form-input" value="7" min="1" max="10" />
              </div>
            </div>
            <div class="status-grid">
              <div class="status-card">
                <div class="status-header">
                  <span class="status-title">Barcode Scanner Status</span>
                  <span class="status-badge warning">Warning</span>
                </div>
                <div class="status-details">
                  <div class="status-row">
                    <span>Device:</span>
                    <span>Connected</span>
                  </div>
                  <div class="status-row">
                    <span>Last Scan:</span>
                    <span>15 min ago</span>
                  </div>
                  <div class="status-row">
                    <span>Battery:</span>
                    <span>Low (23%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-actions">
            <button class="btn-save">💾 Zapisz</button>
            <button class="btn-test">📊 Test Barcode</button>
          </div>
        </div>
      </div>

      <!-- Sensors Section -->
      <div id="sensors-content" class="section-content">
        <div class="config-form">
          <h4>🌡️ Konfiguracja Sensorów</h4>
          <div class="form-section">
            <h5>Temperature Sensors</h5>
            <div class="form-row">
              <div class="form-group">
                <label>Warning Temp (°C):</label>
                <input type="number" class="form-input" value="60" min="30" max="100" />
              </div>
              <div class="form-group">
                <label>Critical Temp (°C):</label>
                <input type="number" class="form-input" value="80" min="50" max="120" />
              </div>
            </div>
            <div class="sensor-grid">
              <div class="sensor-item">
                <span class="sensor-name">CPU Temperature</span>
                <span class="sensor-value">45°C</span>
                <span class="sensor-status online">Normal</span>
              </div>
              <div class="sensor-item">
                <span class="sensor-name">Board Temperature</span>
                <span class="sensor-value">38°C</span>
                <span class="sensor-status online">Normal</span>
              </div>
              <div class="sensor-item">
                <span class="sensor-name">Ambient Temperature</span>
                <span class="sensor-value">22°C</span>
                <span class="sensor-status online">Normal</span>
              </div>
            </div>
          </div>
          <div class="form-actions">
            <button class="btn-save">💾 Zapisz</button>
            <button class="btn-test">🌡️ Read Sensors</button>
          </div>
        </div>
      </div>

      <!-- I/O Ports Section -->
      <div id="io-ports-content" class="section-content">
        <div class="config-form">
          <h4>🔌 Porty I/O</h4>
          <div class="form-section">
            <h5>Port Configuration</h5>
            <div class="ports-grid">
              <div class="port-item">
                <span class="port-name">GPIO 1</span>
                <select class="port-mode">
                  <option selected>Input</option>
                  <option>Output</option>
                </select>
                <span class="port-status online">Active</span>
              </div>
              <div class="port-item">
                <span class="port-name">GPIO 2</span>
                <select class="port-mode">
                  <option>Input</option>
                  <option selected>Output</option>
                </select>
                <span class="port-status offline">Inactive</span>
              </div>
              <div class="port-item">
                <span class="port-name">Serial Port</span>
                <select class="port-mode">
                  <option selected>9600 bps</option>
                  <option>19200 bps</option>
                  <option>115200 bps</option>
                </select>
                <span class="port-status online">Connected</span>
              </div>
            </div>
          </div>
          <div class="form-actions">
            <button class="btn-save">💾 Zapisz</button>
            <button class="btn-test">🔌 Test Ports</button>
          </div>
        </div>
      </div>

      <!-- Power Section -->
      <div id="power-content" class="section-content">
        <div class="config-form">
          <h4>🔋 Zasilanie</h4>
          <div class="form-section">
            <h5>Power Management</h5>
            <div class="form-row">
              <div class="form-group">
                <label>Power Save Mode:</label>
                <select class="form-select">
                  <option>Disabled</option>
                  <option selected>Enabled</option>
                  <option>Aggressive</option>
                </select>
              </div>
              <div class="form-group">
                <label>Shutdown Delay (min):</label>
                <input type="number" class="form-input" value="30" min="5" max="120" />
              </div>
            </div>
            <div class="power-status">
              <div class="power-item">
                <span class="power-label">Voltage:</span>
                <span class="power-value">12.3V</span>
              </div>
              <div class="power-item">
                <span class="power-label">Current:</span>
                <span class="power-value">2.1A</span>
              </div>
              <div class="power-item">
                <span class="power-label">Power:</span>
                <span class="power-value">25.8W</span>
              </div>
            </div>
          </div>
          <div class="form-actions">
            <button class="btn-save">💾 Zapisz</button>
            <button class="btn-test">🔋 Test Power</button>
          </div>
        </div>
      </div>

      <!-- Storage Section -->
      <div id="storage-content" class="section-content">
        <div class="config-form">
          <h4>💾 Magazyn</h4>
          <div class="form-section">
            <h5>Storage Settings</h5>
            <div class="form-row">
              <div class="form-group">
                <label>Auto Cleanup:</label>
                <select class="form-select">
                  <option selected>Enabled</option>
                  <option>Disabled</option>
                </select>
              </div>
              <div class="form-group">
                <label>Retention Days:</label>
                <input type="number" class="form-input" value="90" min="7" max="365" />
              </div>
            </div>
            <div class="storage-info">
              <div class="storage-item">
                <span class="storage-label">Total Space:</span>
                <span class="storage-value">32 GB</span>
              </div>
              <div class="storage-item">
                <span class="storage-label">Used Space:</span>
                <span class="storage-value">18.5 GB (58%)</span>
              </div>
              <div class="storage-item">
                <span class="storage-label">Free Space:</span>
                <span class="storage-value">13.5 GB</span>
              </div>
            </div>
          </div>
          <div class="form-actions">
            <button class="btn-save">💾 Zapisz</button>
            <button class="btn-test">🗂️ Clean Storage</button>
          </div>
        </div>
      </div>

      <!-- Calibration Section -->
      <div id="calibration-content" class="section-content">
        <div class="config-form">
          <h4>📏 Kalibracja</h4>
          <div class="form-section">
            <h5>Device Calibration</h5>
            <div class="calibration-grid">
              <div class="calibration-item">
                <span class="calibration-device">RFID Reader</span>
                <span class="calibration-status">Last: 2024-10-01</span>
                <button class="btn-calibrate">Calibrate</button>
              </div>
              <div class="calibration-item">
                <span class="calibration-device">QR Scanner</span>
                <span class="calibration-status">Last: 2024-09-28</span>
                <button class="btn-calibrate">Calibrate</button>
              </div>
              <div class="calibration-item">
                <span class="calibration-device">Temperature Sensor</span>
                <span class="calibration-status">Last: 2024-09-15</span>
                <button class="btn-calibrate">Calibrate</button>
              </div>
            </div>
          </div>
          <div class="form-actions">
            <button class="btn-test">📏 Calibrate All</button>
            <button class="btn-export">📄 Export Report</button>
          </div>
        </div>
      </div>
    `;
  }

  private getDevicesSections(): DevicesSection[] {
    return [
      { id: 'rfid-config', name: 'RFID Reader' },
      { id: 'qr-config', name: 'QR Scanner' },
      { id: 'barcode-config', name: 'Barcode Scanner' },
      { id: 'sensors', name: 'Sensory' },
      { id: 'io-ports', name: 'Porty I/O' },
      { id: 'power', name: 'Zasilanie' },
      { id: 'storage', name: 'Magazyn' },
      { id: 'calibration', name: 'Kalibracja' }
    ];
  }

  public setupEventListeners(container: HTMLElement): void {
    // Event listeners are handled by parent ConnectConfigView
    console.log('🔧 DevicesCategory: Event listeners setup completed');
  }

  public getStyles(): string {
    return `
      /* Devices Category Specific Styles */
      .sensor-grid, .ports-grid, .calibration-grid {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 10px;
      }
      
      .sensor-item, .port-item, .calibration-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px;
        background: white;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
      }
      
      .sensor-name, .port-name, .calibration-device {
        font-size: 11px;
        color: #333;
        font-weight: 500;
      }
      
      .sensor-value {
        font-size: 12px;
        color: #333;
        font-weight: 600;
      }
      
      .sensor-status, .port-status {
        font-size: 10px;
        font-weight: 600;
        padding: 2px 6px;
        border-radius: 8px;
      }
      
      .sensor-status.online, .port-status.online {
        background: #d1e7dd;
        color: #0f5132;
      }
      
      .port-status.offline {
        background: #f8d7da;
        color: #721c24;
      }
      
      .port-mode {
        padding: 4px 8px;
        border: 1px solid #ddd;
        border-radius: 3px;
        font-size: 10px;
      }
      
      .power-status, .storage-info {
        display: flex;
        flex-direction: column;
        gap: 6px;
        margin-top: 10px;
      }
      
      .power-item, .storage-item {
        display: flex;
        justify-content: space-between;
        padding: 6px;
        background: #f8f9fa;
        border-radius: 3px;
      }
      
      .power-label, .storage-label {
        font-size: 11px;
        color: #666;
      }
      
      .power-value, .storage-value {
        font-size: 11px;
        color: #333;
        font-weight: 600;
      }
      
      .calibration-status {
        font-size: 10px;
        color: #666;
      }
      
      .btn-calibrate {
        padding: 4px 8px;
        background: #17a2b8;
        color: white;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        font-size: 10px;
      }
      
      .checkbox-group {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      
      .checkbox-group label {
        font-size: 11px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
      }
    `;
  }
}
