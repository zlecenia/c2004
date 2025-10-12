// frontend/src/modules/connect-workshop/pages/requests-import.page.ts
export class RequestsImportPage {
  
  static getContent(): string {
    return `
      <div class="page-content">
        <div class="page-header">
          <h2>📥 Import Zgłoszeń</h2>
          <p>Importuj zgłoszenia z pliku lub systemu zewnętrznego</p>
        </div>
        
        <div class="form-container">
          <div class="form-group">
            <label>Źródło danych:</label>
            <select class="form-select">
              <option>📋 Plik CSV/Excel</option>
              <option>🔄 Fleet Manager</option>
              <option>📊 System zewnętrzny (API)</option>
              <option>💾 Kopia zapasowa</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>Wybierz plik:</label>
            <div class="file-upload-area">
              <input type="file" id="import-file" accept=".csv,.xlsx,.json" style="display: none;">
              <button class="btn-file-select" onclick="document.getElementById('import-file').click()">
                📎 Wybierz plik
              </button>
              <span class="file-name">Nie wybrano pliku</span>
            </div>
          </div>
          
          <div class="form-group">
            <label>Opcje importu:</label>
            <div class="checkbox-group">
              <label><input type="checkbox" checked> Zastąp istniejące dane</label>
              <label><input type="checkbox" checked> Utwórz kopię zapasową przed importem</label>
              <label><input type="checkbox"> Sprawdź duplikaty</label>
              <label><input type="checkbox"> Waliduj dane przed importem</label>
            </div>
          </div>
          
          <div class="import-preview" style="display: none;">
            <h4>🔍 Podgląd importu:</h4>
            <div class="preview-stats">
              <span>📊 Rekordy do zaimportowania: <strong>0</strong></span>
              <span>✅ Poprawne: <strong>0</strong></span>
              <span>⚠️ Wymagają uwagi: <strong>0</strong></span>
            </div>
          </div>
          
          <button class="btn-submit">📥 Importuj Dane</button>
        </div>
      </div>
    `;
  }

  static getStyles(): string {
    return `
      .page-content { padding: 20px; max-width: 800px; margin: 0 auto; }
      .page-header h2 { color: #333; font-size: 24px; margin-bottom: 5px; }
      .form-container { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
      .form-group { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
      .form-group label { font-size: 14px; font-weight: 600; color: #333; }
      .form-select { padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; }
      .file-upload-area { display: flex; align-items: center; gap: 15px; padding: 20px; border: 2px dashed #ddd; border-radius: 8px; background: #f8f9fa; }
      .btn-file-select { padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer; }
      .file-name { color: #666; font-size: 14px; }
      .checkbox-group { display: flex; flex-direction: column; gap: 10px; }
      .import-preview { margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 6px; }
      .preview-stats { display: flex; flex-direction: column; gap: 8px; margin-top: 10px; }
      .btn-submit { width: 100%; padding: 12px; background: #28a745; color: white; border: none; border-radius: 6px; font-size: 16px; cursor: pointer; margin-top: 20px; }
    `;
  }
}
