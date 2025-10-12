// frontend/src/modules/connect-test/pages/identification-barcode.page.ts
export class IdentificationBarcodePage {
  
  static getContent(): string {
    return `
      <div class="page-content">
        <div class="page-header">
          <h2>📊 Identyfikacja Barcode</h2>
          <p>Testuj czytniki kodów kreskowych</p>
        </div>
        
        <div class="test-layout">
          <div class="reader-status">
            <div class="status-indicator active">📊</div>
            <div class="status-text">
              <strong>Czytnik Barcode</strong>
              <span class="status-label success">🟢 Aktywny</span>
            </div>
          </div>
          
          <div class="scan-area">
            <div class="scan-animation">
              <div class="barcode-display">
                <div class="barcode-bar"></div>
                <div class="barcode-bar"></div>
                <div class="barcode-bar wide"></div>
                <div class="barcode-bar"></div>
                <div class="barcode-bar wide"></div>
                <div class="barcode-bar"></div>
                <div class="barcode-bar"></div>
                <div class="barcode-bar wide"></div>
              </div>
              <div class="scan-laser"></div>
            </div>
            <p class="scan-instruction">Zeskanuj kod kreskowy</p>
          </div>
          
          <div class="test-results">
            <h3>📊 Ostatnie odczyty</h3>
            <div class="result-list">
              <div class="result-item success">
                <div class="result-icon">✅</div>
                <div class="result-details">
                  <div class="result-uid">Barcode: 5901234567890</div>
                  <div class="result-time">2025-10-11 12:15:30</div>
                  <div class="result-type">📦 Product EAN-13</div>
                </div>
              </div>
              
              <div class="result-item success">
                <div class="result-icon">✅</div>
                <div class="result-details">
                  <div class="result-uid">Barcode: PSS7000-12345</div>
                  <div class="result-time">2025-10-11 12:14:45</div>
                  <div class="result-type">🔧 Device Code-128</div>
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
      .scan-animation { position: relative; width: 200px; height: 120px; margin: 0 auto 20px; }
      .barcode-display { display: flex; gap: 8px; align-items: center; justify-content: center; height: 80px; }
      .barcode-bar { width: 4px; height: 60px; background: #333; }
      .barcode-bar.wide { width: 8px; }
      .scan-laser { position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, #dc3545, transparent); animation: scanLaser 2s infinite; }
      @keyframes scanLaser { 0% { top: 0; } 100% { top: 100%; } }
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
