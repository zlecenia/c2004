// frontend/src/modules/connect-data/pages/dispositions-search.page.ts
export class DispositionsSearchPage {
  
  static getContent(): string {
    return `
      <div class="page-content">
        <div class="page-header">
          <h2>💿 Dyspozycje - Wyszukiwanie</h2>
          <p>Przeglądaj i zarządzaj dyspozycjami magazynowymi</p>
        </div>
        
        <div class="data-grid-container">
          <div class="grid-toolbar">
            <input type="text" class="search-input" placeholder="🔍 Szukaj dyspozycji...">
            <div class="filter-buttons">
              <button class="btn-filter">🎯 Filtry</button>
              <button class="btn-refresh">🔄 Odśwież</button>
            </div>
          </div>
          
          <table class="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Typ</th>
                <th>Magazyn</th>
                <th>Status</th>
                <th>Priorytet</th>
                <th>Data utworzenia</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#DSP-2025-001</td>
                <td>📦 Przyjęcie</td>
                <td>MAG-A1</td>
                <td><span class="badge success">Aktywna</span></td>
                <td><span class="priority high">Wysoki</span></td>
                <td>2025-10-11 08:30</td>
                <td>
                  <button class="btn-sm">👁️</button>
                  <button class="btn-sm">✏️</button>
                </td>
              </tr>
              <tr>
                <td>#DSP-2025-002</td>
                <td>📤 Wydanie</td>
                <td>MAG-B2</td>
                <td><span class="badge warning">W realizacji</span></td>
                <td><span class="priority normal">Normalny</span></td>
                <td>2025-10-11 09:15</td>
                <td>
                  <button class="btn-sm">👁️</button>
                  <button class="btn-sm">✏️</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  static getStyles(): string {
    return `
      .page-content { padding: 20px; height: 100%; }
      .page-header h2 { color: #333; font-size: 20px; margin-bottom: 5px; }
      .page-header p { color: #666; font-size: 14px; margin: 0 0 20px 0; }
      .data-grid-container { background: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
      .grid-toolbar { display: flex; justify-content: space-between; margin-bottom: 20px; gap: 15px; }
      .search-input { flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; }
      .filter-buttons { display: flex; gap: 10px; }
      .btn-filter, .btn-refresh { padding: 10px 20px; border: 1px solid #ddd; background: white; border-radius: 6px; cursor: pointer; }
      .data-table { width: 100%; border-collapse: collapse; }
      .data-table thead th { background: #f8f9fa; padding: 12px; text-align: left; font-weight: 600; border-bottom: 2px solid #e9ecef; }
      .data-table tbody td { padding: 12px; border-bottom: 1px solid #e9ecef; }
      .badge { padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 500; }
      .badge.success { background: #d4edda; color: #155724; }
      .badge.warning { background: #fff3cd; color: #856404; }
      .priority.high { color: #dc3545; font-weight: 600; }
      .priority.normal { color: #6c757d; }
      .btn-sm { padding: 6px 10px; border: none; background: #007bff; color: white; border-radius: 4px; cursor: pointer; margin: 0 2px; }
    `;
  }
}
