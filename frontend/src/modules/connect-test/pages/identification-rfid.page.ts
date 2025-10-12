// frontend/src/modules/connect-test/pages/identification-rfid.page.ts
export class IdentificationRfidPage {
  
  static getContent(): string {
    return `
      <div class="page-content">
        <div class="page-header">
          <h2>🔍 Identyfikacja RFID</h2>
          <p>Testuj czytniki RFID i identyfikację tagów</p>
        </div>
        
        <div class="test-layout">
          <div class="reader-status">
            <div class="status-indicator active">📡</div>
            <div class="status-text">
              <strong>Czytnik RFID</strong>
              <span class="status-label success">🟢 Aktywny</span>
            </div>
          </div>
          
          <div class="scan-area">
            <div class="scan-animation">
              <div class="scan-pulse"></div>
              <div class="scan-icon">📡</div>
            </div>
            <p class="scan-instruction">Zbliż tag RFID do czytnika</p>
          </div>
          
          <div class="test-results">
            <h3>📊 Ostatnie odczyty</h3>
            <div class="result-list">
              <div class="result-item success">
                <div class="result-icon">✅</div>
                <div class="result-details">
                  <div class="result-uid">UID: A3:B4:C5:D6:E7:F8</div>
                  <div class="result-time">2025-10-11 12:15:30</div>
                  <div class="result-type">📋 User ID Card</div>
                </div>
              </div>
              
              <div class="result-item success">
                <div class="result-icon">✅</div>
                <div class="result-details">
                  <div class="result-uid">UID: 11:22:33:44:55:66</div>
                  <div class="result-time">2025-10-11 12:14:45</div>
                  <div class="result-type">🔧 Device Tag</div>
                </div>
              </div>
              
              <div class="result-item error">
                <div class="result-icon">❌</div>
                <div class="result-details">
                  <div class="result-uid">UID: Invalid read</div>
                  <div class="result-time">2025-10-11 12:13:20</div>
                  <div class="result-type">⚠️ Error</div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="test-controls">
            <button class="btn-test">🔄 Test Czytnika</button>
            <button class="btn-clear">🗑️ Wyczyść Historię</button>
          </div>
        </div>
      </div>
    `;
  }

  static getStyles(): string {
    return `
      .page-content { padding: 20px; max-width: 800px; margin: 0 auto; }
      .page-header h2 { color: #333; font-size: 24px; margin-bottom: 5px; }
      .test-layout { display: flex; flex-direction: column; gap: 20px; }
      .reader-status { display: flex; align-items: center; gap: 15px; padding: 20px; background: white; border-radius: 8px; }
      .status-indicator { font-size: 48px; }
      .status-text { flex: 1; }
      .status-label.success { color: #28a745; font-weight: 600; }
      .scan-area { background: white; padding: 60px; border-radius: 8px; text-align: center; }
      .scan-animation { position: relative; width: 120px; height: 120px; margin: 0 auto 20px; }
      .scan-pulse { position: absolute; width: 100%; height: 100%; border: 3px solid #007bff; border-radius: 50%; animation: pulse 2s infinite; }
      @keyframes pulse { 0%, 100% { transform: scale(0.8); opacity: 1; } 50% { transform: scale(1.2); opacity: 0.3; } }
      .scan-icon { font-size: 64px; line-height: 120px; }
      .scan-instruction { color: #666; font-size: 16px; }
      .test-results { background: white; padding: 20px; border-radius: 8px; }
      .test-results h3 { margin: 0 0 15px 0; font-size: 18px; }
      .result-list { display: flex; flex-direction: column; gap: 10px; }
      .result-item { display: flex; gap: 15px; padding: 15px; background: #f8f9fa; border-radius: 6px; }
      .result-item.success { border-left: 4px solid #28a745; }
      .result-item.error { border-left: 4px solid #dc3545; }
      .result-icon { font-size: 24px; }
      .result-uid { font-weight: 600; }
      .result-time { font-size: 12px; color: #666; }
      .test-controls { display: flex; gap: 10px; }
      .btn-test, .btn-clear { flex: 1; padding: 12px; border: none; border-radius: 6px; font-size: 14px; cursor: pointer; }
      .btn-test { background: #007bff; color: white; }
      .btn-clear { background: #6c757d; color: white; }
    `;
  }
}
