// frontend/src/modules/connect-config/pages/devices.page.ts
export class DevicesPage {
  
  static getContent(): string {
    return `
      <div class="config-page-content">
        <div class="config-header">
          <h2>📱 Konfiguracja Urządzeń</h2>
          <p class="config-description">Zarządzaj czytnikami RFID, QR i urządzeniami peryferyjnymi</p>
        </div>

        <div class="config-sections">
          <!-- RFID Readers -->
          <div class="config-section">
            <h3 class="section-title">
              <span class="section-icon">📡</span>
              Czytniki RFID
            </h3>
            
            <div class="devices-list">
              <div class="device-item">
                <div class="device-info">
                  <span class="device-name">🟢 RFID Reader #1</span>
                  <span class="device-status online">Online</span>
                </div>
                <div class="device-details">
                  <span class="device-detail">Port: COM3</span>
                  <span class="device-detail">Frequency: 13.56 MHz</span>
                  <span class="device-detail">Last Read: 2 min ago</span>
                </div>
                <div class="device-actions">
                  <button class="btn-icon" title="Test">🧪</button>
                  <button class="btn-icon" title="Settings">⚙️</button>
                  <button class="btn-icon" title="Restart">🔄</button>
                </div>
              </div>

              <div class="device-item">
                <div class="device-info">
                  <span class="device-name">🔴 RFID Reader #2</span>
                  <span class="device-status offline">Offline</span>
                </div>
                <div class="device-details">
                  <span class="device-detail">Port: COM4</span>
                  <span class="device-detail">Frequency: 13.56 MHz</span>
                  <span class="device-detail">Last Seen: 15 min ago</span>
                </div>
                <div class="device-actions">
                  <button class="btn-icon" title="Test">🧪</button>
                  <button class="btn-icon" title="Settings">⚙️</button>
                  <button class="btn-icon" title="Reconnect">🔌</button>
                </div>
              </div>
            </div>

            <button class="btn btn-add">➕ Dodaj Czytnik RFID</button>
          </div>

          <!-- Barcode Scanners -->
          <div class="config-section">
            <h3 class="section-title">
              <span class="section-icon">📊</span>
              Skanery Kodów Kreskowych
            </h3>
            
            <div class="devices-list">
              <div class="device-item">
                <div class="device-info">
                  <span class="device-name">🟢 Barcode Scanner #1</span>
                  <span class="device-status online">Online</span>
                </div>
                <div class="device-details">
                  <span class="device-detail">Type: USB HID</span>
                  <span class="device-detail">Vendor: Honeywell</span>
                  <span class="device-detail">Model: Voyager 1200g</span>
                </div>
                <div class="device-actions">
                  <button class="btn-icon" title="Test">🧪</button>
                  <button class="btn-icon" title="Settings">⚙️</button>
                  <button class="btn-icon" title="Calibrate">🎯</button>
                </div>
              </div>
            </div>

            <button class="btn btn-add">➕ Dodaj Skaner</button>
          </div>

          <!-- QR Code Readers -->
          <div class="config-section">
            <h3 class="section-title">
              <span class="section-icon">📷</span>
              Czytniki QR Code
            </h3>
            
            <div class="devices-list">
              <div class="device-item">
                <div class="device-info">
                  <span class="device-name">🟢 QR Camera #1</span>
                  <span class="device-status online">Online</span>
                </div>
                <div class="device-details">
                  <span class="device-detail">Device: Built-in Camera</span>
                  <span class="device-detail">Resolution: 1920x1080</span>
                  <span class="device-detail">FPS: 30</span>
                </div>
                <div class="device-actions">
                  <button class="btn-icon" title="Test">🧪</button>
                  <button class="btn-icon" title="Settings">⚙️</button>
                  <button class="btn-icon" title="Preview">👁️</button>
                </div>
              </div>
            </div>

            <button class="btn btn-add">➕ Dodaj Kamerę QR</button>
          </div>

          <!-- Printers -->
          <div class="config-section">
            <h3 class="section-title">
              <span class="section-icon">🖨️</span>
              Drukarki
            </h3>
            
            <div class="devices-list">
              <div class="device-item">
                <div class="device-info">
                  <span class="device-name">🟢 Label Printer</span>
                  <span class="device-status online">Online</span>
                </div>
                <div class="device-details">
                  <span class="device-detail">Type: Zebra ZD420</span>
                  <span class="device-detail">Connection: Network</span>
                  <span class="device-detail">IP: 192.168.1.100</span>
                </div>
                <div class="device-actions">
                  <button class="btn-icon" title="Test Print">🧪</button>
                  <button class="btn-icon" title="Settings">⚙️</button>
                  <button class="btn-icon" title="Queue">📄</button>
                </div>
              </div>
            </div>

            <button class="btn btn-add">➕ Dodaj Drukarkę</button>
          </div>
        </div>

        <div class="config-actions">
          <button class="btn btn-primary">💾 Zapisz Konfigurację</button>
          <button class="btn btn-secondary">🧪 Test Wszystkich Urządzeń</button>
          <button class="btn btn-danger">🔄 Odśwież Listę</button>
        </div>
      </div>
    `;
  }

  static getStyles(): string {
    return `
      .config-page-content {
        padding: 24px;
        max-width: 1400px;
        margin: 0 auto;
      }

      .config-header {
        margin-bottom: 32px;
        padding-bottom: 16px;
        border-bottom: 2px solid #e9ecef;
      }

      .config-header h2 {
        font-size: 28px;
        font-weight: 600;
        color: #2c3e50;
        margin: 0 0 8px 0;
      }

      .config-description {
        font-size: 14px;
        color: #6c757d;
        margin: 0;
      }

      .config-sections {
        display: flex;
        flex-direction: column;
        gap: 24px;
        margin-bottom: 32px;
      }

      .config-section {
        background: white;
        border: 1px solid #e9ecef;
        border-radius: 8px;
        padding: 24px;
      }

      .section-title {
        font-size: 18px;
        font-weight: 600;
        color: #2c3e50;
        margin: 0 0 20px 0;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .section-icon {
        font-size: 24px;
      }

      .devices-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-bottom: 16px;
      }

      .device-item {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 16px;
        background: #f8f9fa;
        border-radius: 6px;
        border: 1px solid #e9ecef;
      }

      .device-info {
        flex: 0 0 200px;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .device-name {
        font-weight: 600;
        font-size: 14px;
        color: #2c3e50;
      }

      .device-status {
        font-size: 12px;
        padding: 2px 8px;
        border-radius: 12px;
        display: inline-block;
        width: fit-content;
      }

      .device-status.online {
        background: #d4edda;
        color: #155724;
      }

      .device-status.offline {
        background: #f8d7da;
        color: #721c24;
      }

      .device-details {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
      }

      .device-detail {
        font-size: 13px;
        color: #6c757d;
        padding: 4px 12px;
        background: white;
        border-radius: 4px;
      }

      .device-actions {
        display: flex;
        gap: 8px;
      }

      .btn-icon {
        width: 36px;
        height: 36px;
        border: 1px solid #dee2e6;
        background: white;
        border-radius: 6px;
        cursor: pointer;
        font-size: 16px;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .btn-icon:hover {
        background: #667eea;
        border-color: #667eea;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(102, 126, 234, 0.2);
      }

      .btn-add {
        padding: 10px 16px;
        background: white;
        border: 2px dashed #dee2e6;
        border-radius: 6px;
        color: #6c757d;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s;
      }

      .btn-add:hover {
        border-color: #667eea;
        color: #667eea;
        background: #f8f9fa;
      }

      .config-actions {
        display: flex;
        gap: 12px;
        justify-content: flex-start;
        padding-top: 24px;
        border-top: 2px solid #e9ecef;
      }

      .btn {
        padding: 10px 20px;
        border: none;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
      }

      .btn-primary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }

      .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
      }

      .btn-secondary {
        background: #28a745;
        color: white;
      }

      .btn-secondary:hover {
        background: #218838;
      }

      .btn-danger {
        background: #6c757d;
        color: white;
      }

      .btn-danger:hover {
        background: #5a6268;
      }
    `;
  }
}
