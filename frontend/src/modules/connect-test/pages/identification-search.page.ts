// frontend/src/modules/connect-test/pages/identification-search.page.ts
export class IdentificationSearchPage {
  
  static getContent(): string {
    return `
      <div class="page-content">
        <div class="page-header">
          <h2>🔍 Wyszukiwanie identyfikatorów</h2>
          <p>Wyszukaj i przetestuj identyfikatory w bazie danych</p>
        </div>
        
        <div class="test-layout">
          <div class="search-section">
            <div class="search-bar">
              <input type="text" placeholder="Wpisz UID, kod QR lub barcode..." class="search-input">
              <button class="btn-search">🔍 Szukaj</button>
            </div>
            
            <div class="search-filters">
              <button class="filter-btn active">Wszystkie</button>
              <button class="filter-btn">RFID</button>
              <button class="filter-btn">QR Code</button>
              <button class="filter-btn">Barcode</button>
            </div>
          </div>
          
          <div class="search-results">
            <h3>📊 Wyniki wyszukiwania (12 znaleziono)</h3>
            <div class="result-list">
              <div class="result-item">
                <div class="result-icon">📡</div>
                <div class="result-details">
                  <div class="result-uid">RFID: A3:B4:C5:D6:E7:F8</div>
                  <div class="result-meta">
                    <span class="result-type">👤 User Card</span>
                    <span class="result-name">Jan Kowalski</span>
                  </div>
                  <div class="result-time">Ostatnie użycie: 2025-10-11 12:15</div>
                </div>
                <button class="btn-test-item">🧪 Testuj</button>
              </div>
              
              <div class="result-item">
                <div class="result-icon">📱</div>
                <div class="result-details">
                  <div class="result-uid">QR: DEVICE-PSS-7000</div>
                  <div class="result-meta">
                    <span class="result-type">🔧 Device Code</span>
                    <span class="result-name">PSS-7000 #12345</span>
                  </div>
                  <div class="result-time">Ostatnie użycie: 2025-10-11 11:30</div>
                </div>
                <button class="btn-test-item">🧪 Testuj</button>
              </div>
              
              <div class="result-item">
                <div class="result-icon">📊</div>
                <div class="result-details">
                  <div class="result-uid">Barcode: 5901234567890</div>
                  <div class="result-meta">
                    <span class="result-type">📦 Product</span>
                    <span class="result-name">Część zamienna X123</span>
                  </div>
                  <div class="result-time">Ostatnie użycie: 2025-10-10 16:45</div>
                </div>
                <button class="btn-test-item">🧪 Testuj</button>
              </div>
            </div>
          </div>
          
          <div class="pagination">
            <button class="btn-page">« Poprzednia</button>
            <span class="page-info">Strona 1 z 3</span>
            <button class="btn-page">Następna »</button>
          </div>
        </div>
      </div>
    `;
  }

  static getStyles(): string {
    return `
      .page-content { padding: 20px; max-width: 900px; margin: 0 auto; }
      .page-header h2 { color: #333; font-size: 24px; margin-bottom: 5px; }
      .test-layout { display: flex; flex-direction: column; gap: 20px; }
      .search-section { background: white; padding: 20px; border-radius: 8px; }
      .search-bar { display: flex; gap: 10px; margin-bottom: 15px; }
      .search-input { flex: 1; padding: 6px 6px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; }
      .btn-search { padding: 12px 24px; background: #007bff; color: white; border: none; border-radius: 6px; cursor: pointer; }
      .search-filters { display: flex; gap: 10px; }
      .filter-btn { padding: 8px 16px; background: #f8f9fa; border: 1px solid #ddd; border-radius: 6px; cursor: pointer; }
      .filter-btn.active { background: #007bff; color: white; border-color: #007bff; }
      .search-results { background: white; padding: 20px; border-radius: 8px; }
      .search-results h3 { margin: 0 0 15px 0; font-size: 18px; }
      .result-list { display: flex; flex-direction: column; gap: 15px; }
      .result-item { display: flex; align-items: center; gap: 15px; padding: 15px; background: #f8f9fa; border-radius: 6px; border-left: 4px solid #007bff; }
      .result-icon { font-size: 32px; }
      .result-details { flex: 1; }
      .result-uid { font-weight: 600; font-size: 15px; margin-bottom: 5px; }
      .result-meta { display: flex; gap: 15px; margin-bottom: 5px; }
      .result-type { font-size: 13px; color: #007bff; }
      .result-name { font-size: 13px; color: #666; }
      .result-time { font-size: 12px; color: #999; }
      .btn-test-item { padding: 8px 16px; background: #28a745; color: white; border: none; border-radius: 6px; cursor: pointer; }
      .pagination { display: flex; align-items: center; justify-content: center; gap: 20px; background: white; padding: 15px; border-radius: 8px; }
      .btn-page { padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 6px; cursor: pointer; }
      .page-info { color: #666; }
    `;
  }
}
