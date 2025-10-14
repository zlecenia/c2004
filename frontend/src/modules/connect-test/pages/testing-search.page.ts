// frontend/src/modules/connect-test/pages/testing-search.page.ts
export class TestingSearchPage {
  
  static getContent(): string {
    return `
      <div class="page-content">
        <div class="page-header">
          <h2>🔍 Wyszukiwanie testów</h2>
          <p>Wyszukaj urządzenia i wykonaj testy</p>
        </div>
        
        <div class="test-layout">
          <div class="search-section">
            <div class="search-bar">
              <input type="text" placeholder="Wpisz model, numer seryjny lub typ urządzenia..." class="search-input">
              <button class="btn-search">🔍 Szukaj</button>
            </div>
            
            <div class="search-filters">
              <button class="filter-btn active">Wszystkie</button>
              <button class="filter-btn">PSS</button>
              <button class="filter-btn">Regulator</button>
              <button class="filter-btn">Zbiornik</button>
              <button class="filter-btn">Przepływomierz</button>
            </div>
          </div>
          
          <div class="search-results">
            <h3>🔧 Urządzenia gotowe do testowania (24 znaleziono)</h3>
            <div class="result-list">
              <div class="result-item">
                <div class="device-icon">🔋</div>
                <div class="device-details">
                  <div class="device-name">PSS-7000 #12345</div>
                  <div class="device-meta">
                    <span class="device-type">Aparat powietrzny ciśnieniowy</span>
                    <span class="device-status status-ok">✅ Sprawny</span>
                  </div>
                  <div class="device-tests">
                    <span class="test-badge">🔋 Ciśnienie</span>
                    <span class="test-badge">💨 Przepływ</span>
                    <span class="test-badge">⚙️ Funkcjonalny</span>
                  </div>
                  <div class="device-info-line">Ostatni test: 2025-09-15 | Następny: 2025-10-15</div>
                </div>
                <div class="device-actions">
                  <button class="btn-test-device">🧪 Testuj</button>
                  <button class="btn-details">📋 Szczegóły</button>
                </div>
              </div>
              
              <div class="result-item">
                <div class="device-icon">🗜️</div>
                <div class="device-details">
                  <div class="device-name">REG-001 #67890</div>
                  <div class="device-meta">
                    <span class="device-type">Regulator ciśnienia</span>
                    <span class="device-status status-warning">⚠️ Wymaga testu</span>
                  </div>
                  <div class="device-tests">
                    <span class="test-badge">🔋 Ciśnienie</span>
                    <span class="test-badge">⚙️ Funkcjonalny</span>
                  </div>
                  <div class="device-info-line">Ostatni test: 2025-08-10 | Następny: 2025-10-10 (przeterminowany)</div>
                </div>
                <div class="device-actions">
                  <button class="btn-test-device priority">🧪 Testuj natychmiast</button>
                  <button class="btn-details">📋 Szczegóły</button>
                </div>
              </div>
              
              <div class="result-item">
                <div class="device-icon">⚗️</div>
                <div class="device-details">
                  <div class="device-name">ZB-002 #11111</div>
                  <div class="device-meta">
                    <span class="device-type">Zbiornik powietrza</span>
                    <span class="device-status status-ok">✅ Sprawny</span>
                  </div>
                  <div class="device-tests">
                    <span class="test-badge">🔋 Ciśnienie</span>
                    <span class="test-badge">👁️ Wizualny</span>
                  </div>
                  <div class="device-info-line">Ostatni test: 2025-10-01 | Następny: 2025-11-01</div>
                </div>
                <div class="device-actions">
                  <button class="btn-test-device">🧪 Testuj</button>
                  <button class="btn-details">📋 Szczegóły</button>
                </div>
              </div>
            </div>
          </div>
          
          <div class="pagination">
            <button class="btn-page">« Poprzednia</button>
            <span class="page-info">Strona 1 z 6</span>
            <button class="btn-page">Następna »</button>
          </div>
        </div>
      </div>
    `;
  }

  static getStyles(): string {
    return `
      .page-content { padding: 20px; max-width: 1000px; margin: 0 auto; }
      .page-header h2 { color: #333; font-size: 24px; margin-bottom: 5px; }
      .test-layout { display: flex; flex-direction: column; gap: 20px; }
      .search-section { background: white; padding: 20px; border-radius: 8px; }
      .search-bar { display: flex; gap: 10px; margin-bottom: 15px; }
      .search-input { flex: 1; padding: 6px 6px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; }
      .btn-search { padding: 12px 24px; background: #007bff; color: white; border: none; border-radius: 6px; cursor: pointer; }
      .search-filters { display: flex; gap: 10px; flex-wrap: wrap; }
      .filter-btn { padding: 8px 16px; background: #f8f9fa; border: 1px solid #ddd; border-radius: 6px; cursor: pointer; font-size: 13px; }
      .filter-btn.active { background: #007bff; color: white; border-color: #007bff; }
      .search-results { background: white; padding: 20px; border-radius: 8px; }
      .search-results h3 { margin: 0 0 15px 0; font-size: 18px; }
      .result-list { display: flex; flex-direction: column; gap: 15px; }
      .result-item { display: flex; align-items: center; gap: 15px; padding: 20px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #007bff; }
      .device-icon { font-size: 40px; }
      .device-details { flex: 1; }
      .device-name { font-weight: 600; font-size: 16px; margin-bottom: 5px; }
      .device-meta { display: flex; gap: 15px; margin-bottom: 8px; align-items: center; }
      .device-type { font-size: 13px; color: #666; }
      .device-status { font-size: 12px; font-weight: 600; }
      .status-ok { color: #28a745; }
      .status-warning { color: #ffc107; }
      .device-tests { display: flex; gap: 8px; margin-bottom: 8px; flex-wrap: wrap; }
      .test-badge { padding: 4px 10px; background: white; border: 1px solid #ddd; border-radius: 4px; font-size: 12px; }
      .device-info-line { font-size: 12px; color: #999; }
      .device-actions { display: flex; flex-direction: column; gap: 8px; }
      .btn-test-device, .btn-details { padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer; font-size: 13px; white-space: nowrap; }
      .btn-test-device { background: #28a745; color: white; font-weight: 600; }
      .btn-test-device.priority { background: #dc3545; animation: pulse 1.5s infinite; }
      @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
      .btn-details { background: #6c757d; color: white; }
      .pagination { display: flex; align-items: center; justify-content: center; gap: 20px; background: white; padding: 15px; border-radius: 8px; }
      .btn-page { padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 6px; cursor: pointer; }
      .page-info { color: #666; }
    `;
  }
}
