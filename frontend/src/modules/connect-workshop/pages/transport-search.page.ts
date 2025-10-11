// frontend/src/modules/connect-workshop/pages/transport-search.page.ts
export class TransportSearchPage {
  
  static getContent(): string {
    return `
      <div class="page-content">
        <div class="page-header">
          <h2>🚚 Wyszukiwanie Transportów</h2>
          <p>Zarządzanie transportami i dostawami</p>
        </div>
        
        <div class="search-workshop-layout">
          <div class="search-sidebar">
            <div class="search-input-row">
              <input type="text" class="search-input" placeholder="Szukaj transportów...">
              <button class="btn-search">🔍</button>
            </div>
            
            <div class="search-filters">
              <div class="filter-group">
                <label class="filter-label">Status transportu:</label>
                <select class="filter-select">
                  <option>🚚 Wszystkie transporty</option>
                  <option>📅 Zaplanowane</option>
                  <option>🚛 W drodze</option>
                  <option>✅ Dostarczone</option>
                  <option>⚠️ Opóźnione</option>
                  <option>❌ Anulowane</option>
                </select>
              </div>
              
              <div class="filter-group">
                <label class="filter-label">Typ ładunku:</label>
                <select class="filter-select">
                  <option>📦 Wszystkie typy</option>
                  <option>⚙️ Części zamienne</option>
                  <option>🔧 Narzędzia</option>
                  <option>📱 Elektronika</option>
                  <option>🧪 Materiały testowe</option>
                </select>
              </div>
              
              <div class="filter-group">
                <label class="filter-label">Kierowca:</label>
                <select class="filter-select">
                  <option>👤 Wszyscy kierowcy</option>
                  <option>Jan Kowalski</option>
                  <option>Anna Nowak</option>
                  <option>Piotr Wiśniewski</option>
                </select>
              </div>
              
              <div class="filter-actions">
                <button class="btn-filter-apply">✅ Zastosuj</button>
                <button class="btn-filter-clear">🗑️ Wyczyść</button>
              </div>
            </div>
          </div>

          <div class="search-results">
            <div class="results-header">
              <h4>🚚 Lista transportów</h4>
              <div class="results-count">Znaleziono: <strong>8</strong> transportów</div>
            </div>
            
            <div class="results-table-container">
              <table class="results-table">
                <thead>
                  <tr>
                    <th>ID Transportu</th>
                    <th>Ładunek</th>
                    <th>Kierowca</th>
                    <th>Status</th>
                    <th>Data dostawy</th>
                    <th>Lokalizacja</th>
                    <th>Akcje</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#TRP-001</td>
                    <td>⚙️ Części do RFID</td>
                    <td>Jan Kowalski</td>
                    <td><span class="status-warning">🚛 W drodze</span></td>
                    <td>2025-10-10</td>
                    <td>Warszawa → Kraków</td>
                    <td>
                      <button class="btn-action view">👁️</button>
                      <button class="btn-action track">📍</button>
                      <button class="btn-action contact">📞</button>
                    </td>
                  </tr>
                  <tr>
                    <td>#TRP-002</td>
                    <td>📱 Skanery QR</td>
                    <td>Anna Nowak</td>
                    <td><span class="status-success">✅ Dostarczone</span></td>
                    <td>2025-10-09</td>
                    <td>Gdańsk → Wrocław</td>
                    <td>
                      <button class="btn-action view">👁️</button>
                      <button class="btn-action receipt">🧾</button>
                    </td>
                  </tr>
                  <tr>
                    <td>#TRP-003</td>
                    <td>🧪 Materiały testowe</td>
                    <td>Piotr Wiśniewski</td>
                    <td><span class="status-pending">📅 Zaplanowane</span></td>
                    <td>2025-10-11</td>
                    <td>Poznań → Łódź</td>
                    <td>
                      <button class="btn-action view">👁️</button>
                      <button class="btn-action edit">✏️</button>
                      <button class="btn-action start">▶️</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static getStyles(): string {
    return `
      /* Shared styles with other search pages */
      .page-content {
        padding: 0;
        height: 100%;
      }

      .page-header {
        padding: 20px;
        background: #f8f9fa;
        border-bottom: 1px solid #e9ecef;
      }

      .page-header h2 {
        color: #333;
        margin: 0 0 5px 0;
        font-size: 20px;
      }

      .page-header p {
        color: #666;
        margin: 0;
        font-size: 14px;
      }

      .search-workshop-layout {
        display: flex;
        height: calc(100% - 80px);
      }

      .search-sidebar {
        width: 280px;
        background: #f8f9fa;
        border-right: 1px solid #e9ecef;
        padding: 20px;
        overflow-y: auto;
      }

      .search-results {
        flex: 1;
        padding: 20px;
        overflow-y: auto;
      }

      .results-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;
      }

      .results-table thead th {
        background: #f8f9fa;
        padding: 12px;
        text-align: left;
        font-weight: 600;
        border-bottom: 2px solid #e9ecef;
      }

      .results-table tbody td {
        padding: 12px;
        border-bottom: 1px solid #e9ecef;
      }

      .status-warning {
        color: #ffc107;
        font-weight: 500;
      }

      .status-success {
        color: #28a745;
        font-weight: 500;
      }

      .status-pending {
        color: #6c757d;
        font-weight: 500;
      }

      .btn-action {
        padding: 6px 10px;
        margin: 0 2px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
    `;
  }
}
