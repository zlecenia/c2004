// frontend/src/modules/connect-reports/pages/executed-custom.page.ts
export class ExecutedCustomPage {
  
  static getContent(): string {
    return `
      <div class="page-content">
        <div class="page-header">
          <h2>✅ Raporty Wykonane - Niestandardowy zakres</h2>
          <p>Wybierz dowolny zakres dat do analizy</p>
        </div>
        
        <div class="date-range-selector">
          <div class="date-input">
            <label>Data od:</label>
            <input type="date" value="2025-01-01" class="input-date">
          </div>
          <div class="date-input">
            <label>Data do:</label>
            <input type="date" value="2025-10-11" class="input-date">
          </div>
          <button class="btn-generate">📊 Generuj raport</button>
        </div>
        
        <div class="custom-summary">
          <div class="summary-card">
            <div class="summary-value">847</div>
            <div class="summary-label">📋 Wszystkie raporty</div>
          </div>
          <div class="summary-card success">
            <div class="summary-value">812</div>
            <div class="summary-label">✅ Wykonane</div>
          </div>
          <div class="summary-card">
            <div class="summary-value">95.9%</div>
            <div class="summary-label">📊 Skuteczność</div>
          </div>
        </div>
        
        <div class="reports-table">
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Raport</th>
                <th>Typ</th>
                <th>Status</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2025-10-11</td>
                <td>🔧 Konserwacja #123</td>
                <td>Serwis</td>
                <td><span class="badge success">✅ Wykonane</span></td>
                <td><button class="btn-sm">👁️ Zobacz</button></td>
              </tr>
              <tr>
                <td>2025-10-10</td>
                <td>📊 Raport dzienny</td>
                <td>Raport</td>
                <td><span class="badge success">✅ Wykonane</span></td>
                <td><button class="btn-sm">👁️ Zobacz</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  static getStyles(): string {
    return `
      .page-content { padding: 20px; max-width: 1200px; margin: 0 auto; }
      .page-header h2 { color: #333; font-size: 24px; margin-bottom: 5px; }
      .date-range-selector { display: flex; gap: 15px; padding: 20px; background: white; border-radius: 8px; margin-bottom: 20px; align-items: flex-end; }
      .date-input { flex: 1; }
      .date-input label { display: block; margin-bottom: 5px; font-size: 13px; font-weight: 600; }
      .input-date { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; }
      .btn-generate { padding: 10px 24px; background: #28a745; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; }
      .custom-summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px; }
      .summary-card { background: white; padding: 20px; border-radius: 8px; text-align: center; }
      .summary-card.success { border-left: 4px solid #28a745; }
      .summary-value { font-size: 32px; font-weight: 700; }
      .summary-label { font-size: 13px; color: #666; }
      .reports-table { background: white; padding: 20px; border-radius: 8px; }
      table { width: 100%; border-collapse: collapse; }
      th { text-align: left; padding: 12px; background: #f8f9fa; border-bottom: 2px solid #dee2e6; }
      td { padding: 12px; border-bottom: 1px solid #dee2e6; }
      .badge { padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: 600; }
      .badge.success { background: #d4edda; color: #155724; }
      .btn-sm { padding: 6px 12px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; }
    `;
  }
}
