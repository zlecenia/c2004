// frontend/src/modules/connect-workshop/pages/requests-search.page.ts
export class RequestsSearchPage {
  
  static getContent(): string {
    return `
      <div class="page-content">
        <div class="page-header">
          <h2>📋 Wyszukiwanie Zgłoszeń</h2>
          <p>Znajdź zgłoszenia według różnych kryteriów</p>
        </div>
        
        <div class="search-workshop-layout">
          <!-- Left Sidebar with Filters -->
          <div class="search-sidebar">
            <div class="search-input-row">
              <input type="text" id="workshop-search-input" class="search-input" placeholder="Szukaj w zgłoszeniach...">
              <button id="workshop-search-btn" class="btn-search">🔍</button>
            </div>
            
            <div class="search-filters">
              <div class="filter-group">
                <label class="filter-label">Status zgłoszenia:</label>
                <select class="filter-select">
                  <option>📋 Wszystkie zgłoszenia</option>
                  <option>⏳ Oczekujące</option>
                  <option>⚙️ W trakcie</option>
                  <option>✅ Zakończone</option>
                  <option>❌ Odrzucone</option>
                </select>
              </div>
              
              <div class="filter-group">
                <label class="filter-label">Okres czasowy:</label>
                <select class="filter-select">
                  <option>📅 Ostatni tydzień</option>
                  <option>📆 Ostatni miesiąc</option>
                  <option>🗓️ Ostatnie 3 miesiące</option>
                  <option>📅 Cały rok</option>
                </select>
              </div>
              
              <div class="filter-group">
                <label class="filter-label">Priorytet:</label>
                <select class="filter-select">
                  <option>🔥 Wszystkie priorytety</option>
                  <option>🔴 Wysoki</option>
                  <option>🟡 Średni</option>
                  <option>🟢 Niski</option>
                </select>
              </div>
              
              <div class="filter-actions">
                <button class="btn-filter-apply">✅ Zastosuj</button>
                <button class="btn-filter-clear">🗑️ Wyczyść</button>
              </div>
            </div>
          </div>

          <!-- Right Content Area with Results -->
          <div class="search-results">
            <div class="results-header">
              <h4>📋 Wyniki wyszukiwania zgłoszeń</h4>
              <div class="results-count">Znaleziono: <strong>23</strong> zgłoszeń</div>
            </div>
            
            <div class="results-table-container">
              <table class="results-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tytuł</th>
                    <th>Status</th>
                    <th>Priorytet</th>
                    <th>Data</th>
                    <th>Akcje</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#WS-001</td>
                    <td>Naprawa czujnika temperatury</td>
                    <td><span class="status-warning">⚙️ W trakcie</span></td>
                    <td><span class="priority-high">🔴 Wysoki</span></td>
                    <td>2025-10-09</td>
                    <td>
                      <button class="btn-action view">👁️</button>
                      <button class="btn-action edit">✏️</button>
                      <button class="btn-action close">✅</button>
                    </td>
                  </tr>
                  <tr>
                    <td>#WS-002</td>
                    <td>Kalibracja RFID readera</td>
                    <td><span class="status-success">✅ Zakończone</span></td>
                    <td><span class="priority-medium">🟡 Średni</span></td>
                    <td>2025-10-08</td>
                    <td>
                      <button class="btn-action view">👁️</button>
                      <button class="btn-action report">📄</button>
                    </td>
                  </tr>
                  <tr>
                    <td>#WS-003</td>
                    <td>Wymiana baterii w skanera</td>
                    <td><span class="status-pending">⏳ Oczekujące</span></td>
                    <td><span class="priority-low">🟢 Niski</span></td>
                    <td>2025-10-07</td>
                    <td>
                      <button class="btn-action view">👁️</button>
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

      .btn-search:hover {
        background: #0056b3;
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

      .btn-filter-apply:hover {
        background: #218838;
      }

      .btn-filter-clear {
        background: #6c757d;
        color: white;
      }

      .btn-filter-clear:hover {
        background: #5a6268;
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

      .results-count strong {
        color: #007bff;
        font-size: 16px;
      }

      .results-table-container {
        overflow-x: auto;
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

      .status-pending {
        color: #6c757d;
        font-weight: 500;
      }

      .priority-high {
        color: #dc3545;
        font-weight: 500;
      }

      .priority-medium {
        color: #ffc107;
        font-weight: 500;
      }

      .priority-low {
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

      .btn-action.view {
        background: #17a2b8;
      }

      .btn-action.edit {
        background: #ffc107;
      }

      .btn-action.close {
        background: #28a745;
      }

      .btn-action.report {
        background: #6c757d;
      }

      .btn-action.start {
        background: #28a745;
      }
    `;
  }
}
