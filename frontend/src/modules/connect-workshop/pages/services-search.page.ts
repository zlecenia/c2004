// frontend/src/modules/connect-workshop/pages/services-search.page.ts
export class ServicesSearchPage {
  
  static getContent(): string {
    return `
      <div class="page-content">
        <div class="page-header">
          <h2>⚙️ Wyszukiwanie Serwisów</h2>
          <p>Znajdź serwisy według różnych kryteriów</p>
        </div>
        
        <div class="search-workshop-layout">
          <div class="search-sidebar">
            <div class="search-input-row">
              <input type="text" class="search-input" placeholder="Szukaj serwisów...">
              <button class="btn-search">🔍</button>
            </div>
            
            <div class="search-filters">
              <div class="filter-group">
                <label class="filter-label">Status serwisu:</label>
                <select class="filter-select">
                  <option>🔧 Wszystkie serwisy</option>
                  <option>🟢 Aktywne</option>
                  <option>🔴 Nieaktywne</option>
                  <option>⚙️ W konserwacji</option>
                  <option>⚠️ Wymagają uwagi</option>
                </select>
              </div>
              
              <div class="filter-group">
                <label class="filter-label">Typ serwisu:</label>
                <select class="filter-select">
                  <option>🛠️ Wszystkie typy</option>
                  <option>📡 RFID Service</option>
                  <option>📷 QR Service</option>
                  <option>📊 Barcode Service</option>
                  <option>🌡️ Sensor Service</option>
                </select>
              </div>
              
              <div class="filter-group">
                <label class="filter-label">Lokalizacja:</label>
                <select class="filter-select">
                  <option>🏢 Wszystkie lokalizacje</option>
                  <option>🏭 Hala A</option>
                  <option>🏭 Hala B</option>
                  <option>🏢 Biuro</option>
                  <option>🚚 Magazyn</option>
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
              <h4>🔧 Lista serwisów</h4>
              <div class="results-count">Znaleziono: <strong>15</strong> serwisów</div>
            </div>
            
            <div class="results-table-container">
              <table class="results-table">
                <thead>
                  <tr>
                    <th>ID Serwisu</th>
                    <th>Nazwa</th>
                    <th>Typ</th>
                    <th>Status</th>
                    <th>Lokalizacja</th>
                    <th>Ostatnia aktywność</th>
                    <th>Akcje</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#SRV-001</td>
                    <td>RFID Reader Service</td>
                    <td>📡 RFID</td>
                    <td><span class="status-success">🟢 Aktywny</span></td>
                    <td>Hala A</td>
                    <td>2025-10-10 06:30</td>
                    <td>
                      <button class="btn-action view">👁️</button>
                      <button class="btn-action restart">🔄</button>
                      <button class="btn-action stop">⏹️</button>
                    </td>
                  </tr>
                  <tr>
                    <td>#SRV-002</td>
                    <td>QR Scanner Service</td>
                    <td>📷 QR</td>
                    <td><span class="status-warning">⚙️ Konserwacja</span></td>
                    <td>Hala B</td>
                    <td>2025-10-09 18:45</td>
                    <td>
                      <button class="btn-action view">👁️</button>
                      <button class="btn-action config">⚙️</button>
                      <button class="btn-action start">▶️</button>
                    </td>
                  </tr>
                  <tr>
                    <td>#SRV-003</td>
                    <td>Temperature Monitor</td>
                    <td>🌡️ Sensor</td>
                    <td><span class="status-success">🟢 Aktywny</span></td>
                    <td>Magazyn</td>
                    <td>2025-10-10 06:25</td>
                    <td>
                      <button class="btn-action view">👁️</button>
                      <button class="btn-action alert">🔔</button>
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
      /* Reuse styles from requests-search.page.ts */
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

      .search-input-row {
        display: flex;
        gap: 8px;
        margin-bottom: 20px;
      }

      .search-input {
        flex: 1;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 14px;
      }

      .btn-search {
        padding: 10px 16px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 16px;
      }

      .search-filters {
        display: flex;
        flex-direction: column;
        gap: 15px;
      }

      .filter-group {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .filter-label {
        font-size: 12px;
        font-weight: 600;
        color: #666;
        text-transform: uppercase;
      }

      .filter-select {
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 14px;
        background: white;
      }

      .filter-actions {
        display: flex;
        gap: 8px;
        margin-top: 10px;
      }

      .btn-filter-apply,
      .btn-filter-clear {
        flex: 1;
        padding: 10px;
        border: none;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
      }

      .btn-filter-apply {
        background: #28a745;
        color: white;
      }

      .btn-filter-clear {
        background: #6c757d;
        color: white;
      }

      .search-results {
        flex: 1;
        padding: 20px;
        overflow-y: auto;
      }

      .results-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        padding-bottom: 15px;
        border-bottom: 2px solid #e9ecef;
      }

      .results-header h4 {
        margin: 0;
        color: #333;
        font-size: 18px;
      }

      .results-count {
        color: #666;
        font-size: 14px;
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
        color: #333;
        border-bottom: 2px solid #e9ecef;
      }

      .results-table tbody td {
        padding: 12px;
        border-bottom: 1px solid #e9ecef;
      }

      .results-table tbody tr:hover {
        background: #f8f9fa;
      }

      .status-warning {
        color: #ffc107;
        font-weight: 500;
      }

      .status-success {
        color: #28a745;
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
        font-size: 14px;
      }

      .btn-action:hover {
        background: #0056b3;
      }
    `;
  }
}
