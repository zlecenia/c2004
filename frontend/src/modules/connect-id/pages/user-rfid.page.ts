// frontend/src/modules/connect-id/pages/user-rfid.page.ts
export class UserRfidPage {
  
  static getContent(): string {
    return `
      <div class="page-content">
        <div class="page-header">
          <h2>👤 Identyfikacja Użytkownika - RFID</h2>
          <p>Przyłóż kartę RFID do czytnika</p>
        </div>
        
        <div class="identification-display">
          <div class="rfid-reader-area">
            <div class="reader-icon">📡</div>
            <div class="reader-status">Gotowy do odczytu</div>
            <div class="reader-instruction">Przyłóż kartę do czytnika RFID</div>
          </div>
          
          <div class="scan-history">
            <h3>Historia skanów</h3>
            <div class="history-item">
              <span class="time">10:30:15</span>
              <span class="type">RFID</span>
              <span class="value">A1B2C3D4</span>
              <span class="status success">✅ Zidentyfikowano: Jan Kowalski</span>
            </div>
            <div class="history-item">
              <span class="time">10:28:42</span>
              <span class="type">RFID</span>
              <span class="value">E5F6G7H8</span>
              <span class="status success">✅ Zidentyfikowano: Anna Nowak</span>
            </div>
            <div class="history-item">
              <span class="time">10:25:11</span>
              <span class="type">RFID</span>
              <span class="value">I9J0K1L2</span>
              <span class="status error">❌ Nieznana karta</span>
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

      .rfid-reader-area {
        background: linear-gradient(135deg, #4CAF50, #45a049);
        color: white;
        padding: 40px;
        border-radius: 15px;
        text-align: center;
        margin-bottom: 30px;
        box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
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
        background: #2196F3;
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
