// frontend/src/modules/connect-manager/pages/activities.page.ts
export class ActivitiesPage {
  
  static getContent(): string {
    return `
      <div class="page-content">
        <div class="page-header">
          <h2>📝 Czynności</h2>
          <p>Zarządzaj definicjami czynności testowych</p>
        </div>
        
        <div class="activities-toolbar">
          <input type="text" class="search-input" placeholder="🔍 Szukaj czynności...">
          <button class="btn-add">➕ Dodaj czynność</button>
        </div>
        
        <div class="activities-table-container">
          <table class="activities-table">
            <thead>
              <tr>
                <th>Nazwa</th>
                <th>Opis</th>
                <th>Czas Trwania</th>
                <th>Kategoria</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>🔋 Sprawdzenie ciśnienia</td>
                <td>Pomiar ciśnienia roboczego urządzenia</td>
                <td>15 min</td>
                <td><span class="category-tag pressure">Ciśnienie</span></td>
                <td>
                  <button class="btn-action">✏️</button>
                  <button class="btn-action">🗑️</button>
                </td>
              </tr>
              <tr>
                <td>💨 Test przepływu</td>
                <td>Sprawdzenie przepływu powietrza</td>
                <td>20 min</td>
                <td><span class="category-tag flow">Przepływ</span></td>
                <td>
                  <button class="btn-action">✏️</button>
                  <button class="btn-action">🗑️</button>
                </td>
              </tr>
              <tr>
                <td>🔍 Test szczelności</td>
                <td>Kontrola szczelności połączeń</td>
                <td>25 min</td>
                <td><span class="category-tag safety">Bezpieczeństwo</span></td>
                <td>
                  <button class="btn-action">✏️</button>
                  <button class="btn-action">🗑️</button>
                </td>
              </tr>
              <tr>
                <td>👁️ Kontrola wizualna</td>
                <td>Przegląd zewnętrzny urządzenia</td>
                <td>10 min</td>
                <td><span class="category-tag visual">Wizualny</span></td>
                <td>
                  <button class="btn-action">✏️</button>
                  <button class="btn-action">🗑️</button>
                </td>
              </tr>
              <tr>
                <td>📊 Analiza wyników</td>
                <td>Weryfikacja i analiza danych testowych</td>
                <td>10 min</td>
                <td><span class="category-tag analysis">Analiza</span></td>
                <td>
                  <button class="btn-action">✏️</button>
                  <button class="btn-action">🗑️</button>
                </td>
              </tr>
              <tr>
                <td>📝 Dokumentacja</td>
                <td>Przygotowanie raportu testowego</td>
                <td>5 min</td>
                <td><span class="category-tag docs">Dokumentacja</span></td>
                <td>
                  <button class="btn-action">✏️</button>
                  <button class="btn-action">🗑️</button>
                </td>
              </tr>
              <tr>
                <td>⚙️ Konfiguracja parametrów</td>
                <td>Ustawienie parametrów testowych</td>
                <td>8 min</td>
                <td><span class="category-tag config">Konfiguracja</span></td>
                <td>
                  <button class="btn-action">✏️</button>
                  <button class="btn-action">🗑️</button>
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
      .page-content { padding: 20px; }
      .page-header h2 { color: #333; font-size: 24px; margin-bottom: 5px; }
      .activities-toolbar { display: flex; gap: 15px; margin: 20px 0; }
      .search-input { flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; }
      .btn-add { padding: 10px 20px; background: #28a745; color: white; border: none; border-radius: 6px; cursor: pointer; }
      .activities-table-container { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
      .activities-table { width: 100%; border-collapse: collapse; }
      .activities-table thead th { background: #f8f9fa; padding: 12px; text-align: left; font-weight: 600; border-bottom: 2px solid #e9ecef; }
      .activities-table tbody td { padding: 12px; border-bottom: 1px solid #e9ecef; }
      .activities-table tbody tr:hover { background: #f8f9fa; }
      .category-tag { padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 500; }
      .category-tag.pressure { background: #e3f2fd; color: #1976d2; }
      .category-tag.flow { background: #e1f5fe; color: #0277bd; }
      .category-tag.safety { background: #ffebee; color: #c62828; }
      .category-tag.visual { background: #f3e5f5; color: #7b1fa2; }
      .category-tag.analysis { background: #e8f5e9; color: #2e7d32; }
      .category-tag.docs { background: #fff3e0; color: #ef6c00; }
      .category-tag.config { background: #fce4ec; color: #c2185b; }
      .btn-action { padding: 6px 10px; margin: 0 2px; border: none; background: #007bff; color: white; border-radius: 4px; cursor: pointer; }
    `;
  }
}
