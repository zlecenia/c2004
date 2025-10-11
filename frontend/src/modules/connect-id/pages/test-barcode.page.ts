// frontend/src/modules/connect-id/pages/test-barcode.page.ts
export class TestBarcodePage {
  
  static getContent(): string {
    return `
      <div class="page-content">
        <div class="page-header">
          <h2>🧪 Test Identyfikacji - Barcode</h2>
          <p>Skanuj kody kreskowe na urządzeniach testowych</p>
        </div>
        
        <div class="identification-display">
          <div class="barcode-scanner-area">
            <div class="scanner-preview">
              <div class="scanner-icon">🧪📊</div>
              <div class="scanner-status">Scanner gotowy</div>
              <div class="scanner-instruction">Zeskanuj kod kreskowy urządzenia testowego</div>
              <div class="barcode-frame">
                <div class="scan-line"></div>
              </div>
            </div>
            
            <div class="scanner-controls">
              <button class="control-btn" id="start-scanner">📊 Start skanera</button>
              <button class="control-btn" id="manual-entry">⌨️ Wpisz ręcznie</button>
              <button class="control-btn" id="test-mode">🧪 Tryb testowy</button>
            </div>
          </div>
          
          <div class="test-devices-panel">
            <h3>Urządzenia testowe</h3>
            <div class="device-grid">
              <div class="test-device-card">
                <div class="device-header">
                  <span class="device-icon">🔋</span>
                  <div class="device-info">
                    <div class="device-name">PSS-7000 #12345</div>
                    <div class="device-barcode">BC-TST-001</div>
                  </div>
                  <span class="device-status online">🟢 Online</span>
                </div>
                <div class="device-details">
                  <div class="detail-item">
                    <span class="label">Typ:</span>
                    <span class="value">Pressure Sensor</span>
                  </div>
                  <div class="detail-item">
                    <span class="label">Ostatni test:</span>
                    <span class="value">10:30:15</span>
                  </div>
                </div>
              </div>
              
              <div class="test-device-card">
                <div class="device-header">
                  <span class="device-icon">💨</span>
                  <div class="device-info">
                    <div class="device-name">PSS-5000 #67890</div>
                    <div class="device-barcode">BC-TST-002</div>
                  </div>
                  <span class="device-status online">🟢 Online</span>
                </div>
                <div class="device-details">
                  <div class="detail-item">
                    <span class="label">Typ:</span>
                    <span class="value">Flow Sensor</span>
                  </div>
                  <div class="detail-item">
                    <span class="label">Ostatni test:</span>
                    <span class="value">10:25:42</span>
                  </div>
                </div>
              </div>
              
              <div class="test-device-card">
                <div class="device-header">
                  <span class="device-icon">🌡️</span>
                  <div class="device-info">
                    <div class="device-name">PSS-3000 #11111</div>
                    <div class="device-barcode">BC-TST-003</div>
                  </div>
                  <span class="device-status offline">🔴 Offline</span>
                </div>
                <div class="device-details">
                  <div class="detail-item">
                    <span class="label">Typ:</span>
                    <span class="value">Temperature Sensor</span>
                  </div>
                  <div class="detail-item">
                    <span class="label">Ostatni test:</span>
                    <span class="value">09:45:18</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="scan-history">
            <h3>Historia skanowania testowego</h3>
            <div class="history-item">
              <span class="time">10:30:15</span>
              <span class="type">BARCODE</span>
              <span class="value">BC-TST-001</span>
              <span class="status success">✅ PSS-7000 #12345 - Test pressure started</span>
            </div>
            <div class="history-item">
              <span class="time">10:25:42</span>
              <span class="type">BARCODE</span>
              <span class="value">BC-TST-002</span>
              <span class="status success">✅ PSS-5000 #67890 - Test flow completed</span>
            </div>
            <div class="history-item">
              <span class="time">10:18:33</span>
              <span class="type">BARCODE</span>
              <span class="value">BC-UNKNOWN</span>
              <span class="status error">❌ Nieznany kod kreskowy</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static getStyles(): string {
    return `
      .page-content {
        padding: 20px;
        max-width: 900px;
        margin: 0 auto;
      }

      .page-header h2 {
        color: #333;
        margin: 0 0 10px 0;
        font-size: 24px;
      }

      .page-header p {
        color: #666;
        margin: 0 0 30px 0;
        font-size: 16px;
      }

      .barcode-scanner-area {
        background: linear-gradient(135deg, #9C27B0, #E91E63);
        color: white;
        padding: 30px;
        border-radius: 15px;
        margin-bottom: 30px;
        text-align: center;
      }

      .scanner-preview {
        background: rgba(255,255,255,0.1);
        border-radius: 10px;
        padding: 30px;
        margin-bottom: 20px;
        position: relative;
      }

      .scanner-icon {
        font-size: 64px;
        margin-bottom: 15px;
      }

      .scanner-status {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
      }

      .scanner-instruction {
        font-size: 14px;
        opacity: 0.9;
        margin-bottom: 20px;
      }

      .barcode-frame {
        width: 250px;
        height: 100px;
        border: 2px dashed rgba(255,255,255,0.7);
        border-radius: 5px;
        margin: 0 auto;
        position: relative;
        overflow: hidden;
      }

      .scan-line {
        width: 2px;
        height: 100%;
        background: rgba(255,255,255,0.8);
        position: absolute;
        animation: scanLine 2s infinite;
      }

      @keyframes scanLine {
        0% { left: 0; }
        100% { left: 100%; }
      }

      .scanner-controls {
        display: flex;
        gap: 10px;
        justify-content: center;
        flex-wrap: wrap;
      }

      .control-btn {
        padding: 10px 15px;
        background: rgba(255,255,255,0.2);
        color: white;
        border: 1px solid rgba(255,255,255,0.3);
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.3s ease;
      }

      .control-btn:hover {
        background: rgba(255,255,255,0.3);
        transform: translateY(-2px);
      }

      .test-devices-panel {
        margin-bottom: 30px;
      }

      .test-devices-panel h3 {
        color: #333;
        margin: 0 0 15px 0;
        font-size: 18px;
      }

      .device-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 15px;
      }

      .test-device-card {
        background: #f8f9fa;
        border: 1px solid #e9ecef;
        border-radius: 10px;
        padding: 15px;
        transition: all 0.2s ease;
      }

      .test-device-card:hover {
        background: #fff3e0;
        border-color: #FF9800;
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(255, 152, 0, 0.2);
      }

      .device-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 10px;
      }

      .device-icon {
        font-size: 24px;
      }

      .device-info {
        flex: 1;
      }

      .device-name {
        font-weight: bold;
        color: #333;
        margin-bottom: 3px;
      }

      .device-barcode {
        font-family: monospace;
        color: #666;
        font-size: 12px;
      }

      .device-status.online {
        color: #4CAF50;
        font-weight: 500;
        font-size: 14px;
      }

      .device-status.offline {
        color: #f44336;
        font-weight: 500;
        font-size: 14px;
      }

      .device-details {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }

      .detail-item {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }

      .detail-item .label {
        color: #666;
        font-weight: 500;
      }

      .detail-item .value {
        color: #333;
      }

      .scan-history h3 {
        color: #333;
        margin: 0 0 15px 0;
        font-size: 18px;
      }

      .history-item {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 12px;
        background: #f9f9f9;
        border-radius: 8px;
        margin-bottom: 8px;
        font-size: 14px;
      }

      .history-item .time {
        color: #666;
        font-family: monospace;
        min-width: 80px;
      }

      .history-item .type {
        background: #9C27B0;
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        min-width: 70px;
        text-align: center;
      }

      .history-item .value {
        font-family: monospace;
        background: #fff;
        padding: 4px 8px;
        border-radius: 4px;
        border: 1px solid #ddd;
        min-width: 100px;
      }

      .history-item .status {
        flex: 1;
        font-weight: 500;
      }

      .history-item .status.success {
        color: #4CAF50;
      }

      .history-item .status.error {
        color: #f44336;
      }
    `;
  }
}
