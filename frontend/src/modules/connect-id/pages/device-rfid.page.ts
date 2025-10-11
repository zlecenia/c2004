// frontend/src/modules/connect-id/pages/device-rfid.page.ts
export class DeviceRfidPage {
  
  static getContent(): string {
    return `
      <div class="page-content">
        <div class="page-header">
          <h2>📱 Identyfikacja Urządzenia - RFID</h2>
          <p>Przyłóż kartę RFID urządzenia do czytnika</p>
        </div>
        
        <div class="identification-display">
          <div class="rfid-reader-area">
            <div class="reader-icon">📱📡</div>
            <div class="reader-status">Czytnik gotowy</div>
            <div class="reader-instruction">Przyłóż kartę RFID urządzenia</div>
          </div>
          
          <div class="device-inventory">
            <h3>Zarejestrowane urządzenia</h3>
            <div class="device-list">
              <div class="device-item">
                <span class="device-icon">💻</span>
                <div class="device-info">
                  <div class="device-name">Laptop Dell Precision</div>
                  <div class="device-code">DEV-RFID-001</div>
                  <div class="device-serial">SN: DL7890123</div>
                  <div class="device-user">Przypisany: Jan Kowalski</div>
                </div>
                <span class="device-status active">🟢 Aktywny</span>
              </div>
              
              <div class="device-item">
                <span class="device-icon">📱</span>
                <div class="device-info">
                  <div class="device-name">iPhone 14 Pro</div>
                  <div class="device-code">DEV-RFID-002</div>
                  <div class="device-serial">SN: IP4567890</div>
                  <div class="device-user">Przypisany: Anna Nowak</div>
                </div>
                <span class="device-status active">🟢 Aktywny</span>
              </div>
              
              <div class="device-item">
                <span class="device-icon">🖨️</span>
                <div class="device-info">
                  <div class="device-name">Drukarka HP LaserJet</div>
                  <div class="device-code">DEV-RFID-003</div>
                  <div class="device-serial">SN: HP1234567</div>
                  <div class="device-user">Biuro główne</div>
                </div>
                <span class="device-status maintenance">🟡 Konserwacja</span>
              </div>
              
              <div class="device-item">
                <span class="device-icon">📺</span>
                <div class="device-info">
                  <div class="device-name">Monitor Samsung 27"</div>
                  <div class="device-code">DEV-RFID-004</div>
                  <div class="device-serial">SN: SM9876543</div>
                  <div class="device-user">Sala konferencyjna</div>
                </div>
                <span class="device-status inactive">🔴 Nieaktywny</span>
              </div>
            </div>
          </div>
          
          <div class="scan-history">
            <h3>Historia skanów urządzeń</h3>
            <div class="history-item">
              <span class="time">10:40:22</span>
              <span class="type">RFID</span>
              <span class="value">DEV-RFID-001</span>
              <span class="status success">✅ Laptop Dell Precision - dostęp przyznany</span>
            </div>
            <div class="history-item">
              <span class="time">10:35:18</span>
              <span class="type">RFID</span>
              <span class="value">DEV-RFID-002</span>
              <span class="status success">✅ iPhone 14 Pro - zarejestrowany</span>
            </div>
            <div class="history-item">
              <span class="time">10:30:45</span>
              <span class="type">RFID</span>
              <span class="value">DEV-UNKNOWN</span>
              <span class="status error">❌ Nieznane urządzenie</span>
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

      .rfid-reader-area {
        background: linear-gradient(135deg, #607D8B, #455A64);
        color: white;
        padding: 40px;
        border-radius: 15px;
        text-align: center;
        margin-bottom: 30px;
        box-shadow: 0 4px 15px rgba(96, 125, 139, 0.3);
      }

      .reader-icon {
        font-size: 64px;
        margin-bottom: 15px;
        animation: pulse 2s infinite;
      }

      .reader-status {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
      }

      .reader-instruction {
        font-size: 16px;
        opacity: 0.9;
      }

      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
      }

      .device-inventory {
        margin-bottom: 30px;
      }

      .device-inventory h3 {
        color: #333;
        margin: 0 0 15px 0;
        font-size: 18px;
      }

      .device-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .device-item {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 15px;
        background: #f8f9fa;
        border: 1px solid #e9ecef;
        border-radius: 10px;
        transition: all 0.2s ease;
      }

      .device-item:hover {
        background: #e8f5e8;
        border-color: #4CAF50;
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

      .device-serial {
        font-family: monospace;
        color: #999;
        font-size: 11px;
        margin-bottom: 3px;
      }

      .device-user {
        color: #2196F3;
        font-size: 12px;
        font-weight: 500;
      }

      .device-status {
        font-weight: 500;
        font-size: 14px;
      }

      .device-status.active {
        color: #4CAF50;
      }

      .device-status.maintenance {
        color: #FF9800;
      }

      .device-status.inactive {
        color: #f44336;
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
        background: #607D8B;
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        min-width: 50px;
        text-align: center;
      }

      .history-item .value {
        font-family: monospace;
        background: #fff;
        padding: 4px 8px;
        border-radius: 4px;
        border: 1px solid #ddd;
        min-width: 120px;
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
