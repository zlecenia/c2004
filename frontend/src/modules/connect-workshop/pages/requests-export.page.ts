// frontend/src/modules/connect-workshop/pages/requests-export.page.ts
export class RequestsExportPage {
  
  static getContent(): string {
    return `
      <div class="page-content">
        <div class="page-header">
          <h2>📊 Export Zgłoszeń</h2>
          <p>Eksportuj zgłoszenia do pliku lub utwórz kopię zapasową</p>
        </div>
        
        <div class="form-container">
          <div class="form-row">
            <div class="form-group">
              <label>Operacja:</label>
              <select class="form-select">
                <option>📊 Eksport do pliku</option>
                <option>💾 Backup systemu</option>
                <option>📋 Raport zbiorczy</option>
              </select>
            </div>
            <div class="form-group">
              <label>Format pliku:</label>
              <select class="form-select">
                <option>📄 CSV</option>
                <option>📗 Excel (XLSX)</option>
                <option>📋 JSON</option>
                <option>📄 PDF Report</option>
              </select>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label>Zakres dat:</label>
              <div class="date-range">
                <input type="date" class="form-input" value="2025-10-01">
                <span>do</span>
                <input type="date" class="form-input" value="2025-10-11">
              </div>
            </div>
          </div>
          
          <div class="form-group">
            <label>Opcje eksportu:</label>
            <div class="checkbox-group">
              <label><input type="checkbox" checked> Dołącz załączniki</label>
              <label><input type="checkbox" checked> Dołącz historię zmian</label>
              <label><input type="checkbox"> Kompresuj dane (ZIP)</label>
              <label><input type="checkbox"> Szyfruj eksport</label>
            </div>
          </div>
          
          <button class="btn-submit">💾 Wykonaj Export</button>
        </div>
      </div>
    `;
  }

  static getStyles(): string {
    return `
      .page-content { padding: 20px; max-width: 800px; margin: 0 auto; }
      .page-header h2 { color: #333; font-size: 24px; margin-bottom: 5px; }
      .page-header p { color: #666; font-size: 14px; margin: 0 0 30px 0; }
      .form-container { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
      .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
      .form-group { display: flex; flex-direction: column; gap: 8px; }
      .form-group label { font-size: 14px; font-weight: 600; color: #333; }
      .form-select, .form-input { padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; }
      .date-range { display: flex; align-items: center; gap: 10px; }
      .checkbox-group { display: flex; flex-direction: column; gap: 10px; }
      .checkbox-group label { font-weight: normal; }
      .btn-submit { width: 100%; padding: 12px; background: #007bff; color: white; border: none; border-radius: 6px; font-size: 16px; cursor: pointer; margin-top: 20px; }
      .btn-submit:hover { background: #0056b3; }
    `;
  }
}
