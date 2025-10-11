// frontend/src/modules/connect-id/pages/device-qr.page.ts
export class DeviceQrPage {
  
  static getContent(): string {
    return `
      <div class="page-content">
        <div class="page-header">
          <h2>📱 Identyfikacja Urządzenia - QR Code</h2>
          <p>Zeskanuj kod QR urządzenia za pomocą kamery</p>
        </div>
        
        <div class="identification-display">
          <div class="qr-scanner-area">
            <div class="camera-preview">
              <div class="camera-icon">📷</div>
              <div class="scanner-status">Kamera gotowa</div>
              <div class="scanner-instruction">Umieść kod QR w ramce</div>
              <div class="scan-frame"></div>
            </div>
            
            <div class="scanner-controls">
              <button class="control-btn" id="start-camera">📹 Start kamery</button>
              <button class="control-btn" id="switch-camera">🔄 Przełącz kamerę</button>
              <button class="control-btn" id="toggle-flash">💡 Latarka</button>
            </div>
          </div>
          
          <div class="device-history">
            <h3>Ostatnio zeskanowane urządzenia</h3>
            <div class="device-item">
              <span class="device-icon">📱</span>
              <div class="device-info">
                <div class="device-name">iPhone 13 Pro</div>
                <div class="device-code">DEV-QR-001</div>
                <div class="device-time">10:32:15</div>
              </div>
              <span class="device-status success">✅ Aktywne</span>
            </div>
            <div class="device-item">
              <span class="device-icon">💻</span>
              <div class="device-info">
                <div class="device-name">MacBook Air M2</div>
                <div class="device-code">DEV-QR-002</div>
                <div class="device-time">10:28:33</div>
              </div>
              <span class="device-status success">✅ Aktywne</span>
            </div>
            <div class="device-item">
              <span class="device-icon">⌚</span>
              <div class="device-info">
                <div class="device-name">Apple Watch</div>
                <div class="device-code">DEV-QR-003</div>
                <div class="device-time">10:15:22</div>
              </div>
              <span class="device-status offline">⏸️ Nieaktywne</span>
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
        max-width: 800px;
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

      .qr-scanner-area {
        background: linear-gradient(135deg, #673AB7, #9C27B0);
        color: white;
        padding: 30px;
        border-radius: 15px;
        margin-bottom: 30px;
        text-align: center;
      }

      .camera-preview {
        background: rgba(255,255,255,0.1);
        border-radius: 10px;
        padding: 30px;
        margin-bottom: 20px;
        position: relative;
      }

      .camera-icon {
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

      .scan-frame {
        width: 200px;
        height: 200px;
        border: 3px dashed rgba(255,255,255,0.7);
        border-radius: 10px;
        margin: 0 auto;
        position: relative;
        animation: scanPulse 2s infinite;
      }

      @keyframes scanPulse {
        0% { border-color: rgba(255,255,255,0.7); }
        50% { border-color: rgba(255,255,255,1); }
        100% { border-color: rgba(255,255,255,0.7); }
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

      .device-history h3 {
        color: #333;
        margin: 0 0 15px 0;
        font-size: 18px;
      }

      .device-item {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 15px;
        background: #f9f9f9;
        border-radius: 10px;
        margin-bottom: 10px;
        transition: all 0.2s ease;
      }

      .device-item:hover {
        background: #f0f0f0;
        transform: translateX(5px);
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

      .device-code {
        font-family: monospace;
        color: #666;
        font-size: 12px;
        margin-bottom: 3px;
      }

      .device-time {
        color: #999;
        font-size: 12px;
      }

      .device-status.success {
        color: #4CAF50;
        font-weight: 500;
      }

      .device-status.offline {
        color: #ff9800;
        font-weight: 500;
      }
    `;
  }
}
