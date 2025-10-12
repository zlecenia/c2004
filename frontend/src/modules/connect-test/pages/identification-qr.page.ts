// frontend/src/modules/connect-test/pages/identification-qr.page.ts
export class IdentificationQrPage {
  
  static getContent(): string {
    return `
      <div class="page-content">
        <div class="page-header">
          <h2>📱 Identyfikacja QR Code</h2>
          <p>Testuj skanery QR i identyfikację kodów QR</p>
        </div>
        
        <div class="test-layout">
          <div class="reader-status">
            <div class="status-indicator active">📷</div>
            <div class="status-text">
              <strong>Skaner QR</strong>
              <span class="status-label success">🟢 Aktywny</span>
            </div>
          </div>
          
          <div class="scan-area">
            <div class="scan-animation">
              <div class="scan-frame">
                <div class="scan-corner tl"></div>
                <div class="scan-corner tr"></div>
                <div class="scan-corner bl"></div>
                <div class="scan-corner br"></div>
                <div class="scan-line"></div>
              </div>
              <div class="scan-icon">📱</div>
            </div>
            <p class="scan-instruction">Zbliż kod QR do skanera</p>
          </div>
          
          <div class="test-results">
            <h3>📊 Ostatnie odczyty</h3>
            <div class="result-list">
              <div class="result-item success">
                <div class="result-icon">✅</div>
                <div class="result-details">
                  <div class="result-uid">QR: USER-2025-001234</div>
                  <div class="result-time">2025-10-11 12:15:30</div>
                  <div class="result-type">👤 User QR Code</div>
                </div>
              </div>
              
              <div class="result-item success">
                <div class="result-icon">✅</div>
                <div class="result-details">
                  <div class="result-uid">QR: DEVICE-PSS-7000</div>
                  <div class="result-time">2025-10-11 12:14:45</div>
                  <div class="result-type">🔧 Device QR</div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="test-controls">
            <button class="btn-test">🔄 Test Skanera</button>
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
      .scan-animation { position: relative; width: 150px; height: 150px; margin: 0 auto 20px; }
      .scan-frame { position: absolute; width: 100%; height: 100%; border: 2px solid #007bff; border-radius: 8px; }
      .scan-corner { position: absolute; width: 20px; height: 20px; border: 3px solid #28a745; }
      .scan-corner.tl { top: -3px; left: -3px; border-right: none; border-bottom: none; }
      .scan-corner.tr { top: -3px; right: -3px; border-left: none; border-bottom: none; }
      .scan-corner.bl { bottom: -3px; left: -3px; border-right: none; border-top: none; }
      .scan-corner.br { bottom: -3px; right: -3px; border-left: none; border-top: none; }
      .scan-line { position: absolute; top: 0; left: 0; right: 0; height: 2px; background: #28a745; animation: scanLine 2s infinite; }
      @keyframes scanLine { 0% { top: 0; } 100% { top: 100%; } }
      .scan-icon { font-size: 64px; line-height: 150px; position: relative; opacity: 0.3; }
      .scan-instruction { color: #666; font-size: 16px; }
      .test-results { background: white; padding: 20px; border-radius: 8px; }
      .test-results h3 { margin: 0 0 15px 0; font-size: 18px; }
      .result-list { display: flex; flex-direction: column; gap: 10px; }
      .result-item { display: flex; gap: 15px; padding: 15px; background: #f8f9fa; border-radius: 6px; }
      .result-item.success { border-left: 4px solid #28a745; }
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
