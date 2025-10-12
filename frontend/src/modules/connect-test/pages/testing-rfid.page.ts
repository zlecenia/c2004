// frontend/src/modules/connect-test/pages/testing-rfid.page.ts
export class TestingRfidPage {
  
  static getContent(): string {
    return `
      <div class="page-content">
        <div class="page-header">
          <h2>🧪 Testowanie RFID</h2>
          <p>Wykonaj kompleksowe testy systemu RFID</p>
        </div>
        
        <div class="test-suite">
          <div class="test-category">
            <h3>📊 Testy funkcjonalne</h3>
            <div class="test-list">
              <div class="test-item">
                <div class="test-name">
                  <span class="test-icon">📡</span>
                  <span>Test zasięgu czytnika</span>
                </div>
                <div class="test-status pending">⏳ Oczekujący</div>
                <button class="btn-run">▶️ Uruchom</button>
              </div>
              
              <div class="test-item">
                <div class="test-name">
                  <span class="test-icon">⚡</span>
                  <span>Test szybkości odczytu</span>
                </div>
                <div class="test-status success">✅ Zaliczony</div>
                <button class="btn-run">🔄 Powtórz</button>
              </div>
              
              <div class="test-item">
                <div class="test-name">
                  <span class="test-icon">🔋</span>
                  <span>Test mocy sygnału</span>
                </div>
                <div class="test-status success">✅ Zaliczony</div>
                <button class="btn-run">🔄 Powtórz</button>
              </div>
            </div>
          </div>
          
          <div class="test-category">
            <h3>🛡️ Testy niezawodności</h3>
            <div class="test-list">
              <div class="test-item">
                <div class="test-name">
                  <span class="test-icon">🔄</span>
                  <span>Test wielokrotnego odczytu</span>
                </div>
                <div class="test-status running">🔵 W trakcie</div>
                <button class="btn-run" disabled>⏸️ Wstrzymaj</button>
              </div>
              
              <div class="test-item">
                <div class="test-name">
                  <span class="test-icon">🌐</span>
                  <span>Test interferencji</span>
                </div>
                <div class="test-status pending">⏳ Oczekujący</div>
                <button class="btn-run">▶️ Uruchom</button>
              </div>
              
              <div class="test-item">
                <div class="test-name">
                  <span class="test-icon">⚠️</span>
                  <span>Test obsługi błędów</span>
                </div>
                <div class="test-status failed">❌ Nie zaliczony</div>
                <button class="btn-run">🔄 Powtórz</button>
              </div>
            </div>
          </div>
          
          <div class="test-summary">
            <h3>📈 Podsumowanie testów</h3>
            <div class="summary-stats">
              <div class="stat-item">
                <div class="stat-value">5/6</div>
                <div class="stat-label">Zaliczone</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">83%</div>
                <div class="stat-label">Skuteczność</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">1</div>
                <div class="stat-label">W trakcie</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static getStyles(): string {
    return `
      .page-content { padding: 20px; }
      .page-header h2 { color: #333; font-size: 24px; margin-bottom: 5px; }
      .test-suite { display: flex; flex-direction: column; gap: 20px; }
      .test-category { background: white; padding: 20px; border-radius: 8px; }
      .test-category h3 { margin: 0 0 15px 0; font-size: 18px; }
      .test-list { display: flex; flex-direction: column; gap: 10px; }
      .test-item { display: flex; align-items: center; gap: 15px; padding: 15px; background: #f8f9fa; border-radius: 6px; }
      .test-name { flex: 1; display: flex; align-items: center; gap: 10px; font-weight: 500; }
      .test-icon { font-size: 20px; }
      .test-status { padding: 6px 12px; border-radius: 12px; font-size: 13px; font-weight: 600; }
      .test-status.pending { background: #ffc107; color: #333; }
      .test-status.success { background: #28a745; color: white; }
      .test-status.running { background: #007bff; color: white; }
      .test-status.failed { background: #dc3545; color: white; }
      .btn-run { padding: 8px 16px; border: none; background: #007bff; color: white; border-radius: 6px; cursor: pointer; }
      .btn-run:disabled { background: #6c757d; cursor: not-allowed; }
      .test-summary { background: white; padding: 20px; border-radius: 8px; }
      .summary-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: 15px; }
      .stat-item { text-align: center; padding: 15px; background: #f8f9fa; border-radius: 6px; }
      .stat-value { font-size: 32px; font-weight: 700; color: #333; }
      .stat-label { font-size: 14px; color: #666; margin-top: 5px; }
    `;
  }
}
