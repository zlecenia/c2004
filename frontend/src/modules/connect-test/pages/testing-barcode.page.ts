// frontend/src/modules/connect-test/pages/testing-barcode.page.ts
export class TestingBarcodePage {
  
  static getContent(): string {
    return `
      <div class="page-content">
        <div class="page-header">
          <h2>🧪 Testowanie Barcode</h2>
          <p>Wykonuj testy urządzeń identyfikowanych przez kod kreskowy</p>
        </div>
        
        <div class="test-layout">
          <div class="device-scan">
            <div class="scan-prompt">
              <div class="scan-icon">📊</div>
              <h3>Zeskanuj urządzenie</h3>
              <p>Zbliż kod kreskowy urządzenia do czytnika</p>
              <div class="barcode-example">
                <div class="barcode-bars">
                  <div class="bar"></div>
                  <div class="bar"></div>
                  <div class="bar wide"></div>
                  <div class="bar"></div>
                  <div class="bar wide"></div>
                  <div class="bar"></div>
                  <div class="bar"></div>
                  <div class="bar wide"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="device-info">
            <h3>🔧 Urządzenie testowe</h3>
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">Barcode:</span>
                <span class="info-value">PSS7000-12345</span>
              </div>
              <div class="info-item">
                <span class="info-label">Model:</span>
                <span class="info-value">PSS-7000</span>
              </div>
              <div class="info-item">
                <span class="info-label">Numer seryjny:</span>
                <span class="info-value">#12345</span>
              </div>
              <div class="info-item">
                <span class="info-label">Status:</span>
                <span class="info-value status-ready">✅ Gotowy do testu</span>
              </div>
            </div>
          </div>
          
          <div class="test-selector">
            <h3>📋 Wybierz test</h3>
            <div class="test-options">
              <div class="test-option">
                <input type="checkbox" id="test-pressure" checked>
                <label for="test-pressure">🔋 Test ciśnienia</label>
              </div>
              <div class="test-option">
                <input type="checkbox" id="test-flow">
                <label for="test-flow">💨 Test przepływu</label>
              </div>
              <div class="test-option">
                <input type="checkbox" id="test-function">
                <label for="test-function">⚙️ Test funkcjonalny</label>
              </div>
              <div class="test-option">
                <input type="checkbox" id="test-visual">
                <label for="test-visual">👁️ Test wizualny</label>
              </div>
              <div class="test-option">
                <input type="checkbox" id="test-maintenance">
                <label for="test-maintenance">🔧 Konserwacja</label>
              </div>
            </div>
          </div>
          
          <div class="test-actions">
            <button class="btn-start">▶️ Rozpocznij test</button>
            <button class="btn-history">📊 Historia testów</button>
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
      .device-scan { background: white; padding: 40px; border-radius: 8px; text-align: center; }
      .scan-prompt { display: flex; flex-direction: column; align-items: center; gap: 15px; }
      .scan-icon { font-size: 64px; }
      .scan-prompt h3 { margin: 0; font-size: 20px; }
      .scan-prompt p { margin: 0; color: #666; }
      .barcode-example { margin-top: 10px; }
      .barcode-bars { display: flex; gap: 5px; justify-content: center; }
      .bar { width: 3px; height: 40px; background: #333; }
      .bar.wide { width: 6px; }
      .device-info { background: white; padding: 20px; border-radius: 8px; }
      .device-info h3 { margin: 0 0 15px 0; font-size: 18px; }
      .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
      .info-item { display: flex; flex-direction: column; gap: 5px; }
      .info-label { font-size: 12px; color: #666; }
      .info-value { font-weight: 600; }
      .status-ready { color: #28a745; }
      .test-selector { background: white; padding: 20px; border-radius: 8px; }
      .test-selector h3 { margin: 0 0 15px 0; font-size: 18px; }
      .test-options { display: flex; flex-direction: column; gap: 12px; }
      .test-option { display: flex; align-items: center; gap: 10px; }
      .test-option input[type="checkbox"] { width: 20px; height: 20px; cursor: pointer; }
      .test-option label { cursor: pointer; font-size: 15px; }
      .test-actions { display: flex; gap: 10px; }
      .btn-start, .btn-history { flex: 1; padding: 14px; border: none; border-radius: 6px; font-size: 15px; font-weight: 600; cursor: pointer; }
      .btn-start { background: #28a745; color: white; }
      .btn-history { background: #007bff; color: white; }
    `;
  }
}
