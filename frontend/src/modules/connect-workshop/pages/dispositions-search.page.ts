// frontend/src/modules/connect-workshop/pages/dispositions-search.page.ts
export class DispositionsSearchPage {
  
  static getContent(): string {
    return `
      <div class="page-content">
        <div class="page-header">
          <h2>💿 Wyszukiwanie Dyspozycji</h2>
          <p>Zarządzanie dyspozycjami magazynowymi</p>
        </div>
        
        <div class="search-results">
          <div class="results-header">
            <h4>📋 Lista dyspozycji</h4>
            <div class="results-count">Znaleziono: <strong>12</strong> dyspozycji</div>
          </div>
          
          <div class="results-table-container">
            <table class="results-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tytuł</th>
                  <th>Status</th>
                  <th>Priorytet</th>
                  <th>Termin</th>
                  <th>Akcje</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#DSP-001</td>
                  <td>Wymiana baterii w czytniku RFID</td>
                  <td><span class="status-warning">⚙️ W realizacji</span></td>
                  <td><span class="priority-high">🟡 Wysoki</span></td>
                  <td>2025-10-10</td>
                  <td>
                    <button class="btn-action">👁️</button>
                    <button class="btn-action">✏️</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  static getStyles(): string {
    return `
      .page-content { padding: 20px; }
      .page-header h2 { color: #333; font-size: 20px; margin-bottom: 5px; }
      .results-table { width: 100%; border-collapse: collapse; }
      .results-table th { background: #f8f9fa; padding: 12px; text-align: left; }
      .results-table td { padding: 12px; border-bottom: 1px solid #e9ecef; }
      .btn-action { padding: 6px 10px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; margin: 0 2px; }
    `;
  }
}
