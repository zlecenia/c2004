// frontend/src/modules/connect-manager/pages/test-types.page.ts
export class TestTypesPage {
  
  static getContent(): string {
    return `
      <div class="page-content">
        <div class="page-header">
          <h2>⏰ Rodzaj Testu</h2>
          <p>Przypisz urządzenia do interwałów testowych</p>
        </div>
        
        <div class="test-types-layout">
          <div class="assignment-form">
            <h3>➕ Nowe Przypisanie</h3>
            <div class="form-group">
              <label>Urządzenie:</label>
              <select class="form-select">
                <option>REG-001 - Regulator ciśnienia</option>
                <option>ZB-002 - Zbiornik powietrza</option>
                <option>PF-003 - Filtr powietrza</option>
                <option>PSS-7000 #12345</option>
                <option>PSS-5000 #67890</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>Scenariusz + Interwał:</label>
              <select class="form-select">
                <option>C20 - Po użyciu</option>
                <option>C20 - Co miesiąc</option>
                <option>C20 - Co 6 miesięcy</option>
                <option>Flow Test - Co 3 miesiące</option>
                <option>Przegląd - Co rok</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>Rodzaj testu:</label>
              <div class="radio-group">
                <label>
                  <input type="radio" name="test-type" value="interval" checked>
                  <span>Według interwału</span>
                </label>
                <label>
                  <input type="radio" name="test-type" value="after-use">
                  <span>Po każdym użyciu</span>
                </label>
              </div>
            </div>
            
            <div class="form-actions">
              <button class="btn-save">💾 Zapisz</button>
              <button class="btn-reset">🔄 Reset</button>
            </div>
          </div>
          
          <div class="current-assignments">
            <h3>📋 Aktualne Przypisania</h3>
            <div class="assignments-list">
              <div class="assignment-item">
                <div class="assignment-info">
                  <strong>REG-001</strong> - Regulator ciśnienia
                  <div class="assignment-details">
                    <span class="scenario-name">🧪 C20</span>
                    <span class="interval">⏰ Co miesiąc</span>
                  </div>
                </div>
                <div class="assignment-actions">
                  <button class="btn-sm">✏️</button>
                  <button class="btn-sm">🗑️</button>
                </div>
              </div>
              
              <div class="assignment-item">
                <div class="assignment-info">
                  <strong>PSS-7000 #12345</strong>
                  <div class="assignment-details">
                    <span class="scenario-name">🧪 Flow Test</span>
                    <span class="interval">⏰ Co 3 miesiące</span>
                  </div>
                </div>
                <div class="assignment-actions">
                  <button class="btn-sm">✏️</button>
                  <button class="btn-sm">🗑️</button>
                </div>
              </div>
              
              <div class="assignment-item">
                <div class="assignment-info">
                  <strong>ZB-002</strong> - Zbiornik powietrza
                  <div class="assignment-details">
                    <span class="scenario-name">🧪 Przegląd</span>
                    <span class="interval">⏰ Co rok</span>
                  </div>
                </div>
                <div class="assignment-actions">
                  <button class="btn-sm">✏️</button>
                  <button class="btn-sm">🗑️</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static getStyles(): string {
    return `
      .page-content { padding: 20px; }
      .page-header h2 { color: #333; font-size: 24px; margin-bottom: 5px; }
      .test-types-layout { display: grid; grid-template-columns: 400px 1fr; gap: 20px; }
      .assignment-form, .current-assignments { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
      .assignment-form h3, .current-assignments h3 { margin: 0 0 20px 0; font-size: 18px; }
      .form-group { margin-bottom: 20px; }
      .form-group label { display: block; margin-bottom: 8px; font-weight: 600; color: #333; }
      .form-select { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; }
      .radio-group { display: flex; flex-direction: column; gap: 10px; }
      .radio-group label { display: flex; align-items: center; gap: 8px; font-weight: normal; cursor: pointer; }
      .form-actions { display: flex; gap: 10px; }
      .btn-save, .btn-reset { flex: 1; padding: 10px; border: none; border-radius: 6px; cursor: pointer; }
      .btn-save { background: #28a745; color: white; }
      .btn-reset { background: #6c757d; color: white; }
      .assignments-list { display: flex; flex-direction: column; gap: 15px; }
      .assignment-item { display: flex; justify-content: space-between; align-items: center; padding: 15px; background: #f8f9fa; border-radius: 6px; }
      .assignment-info { flex: 1; }
      .assignment-info strong { display: block; margin-bottom: 5px; }
      .assignment-details { display: flex; gap: 15px; font-size: 13px; color: #666; margin-top: 5px; }
      .scenario-name { font-weight: 600; }
      .assignment-actions { display: flex; gap: 8px; }
      .btn-sm { padding: 6px 10px; border: none; background: #007bff; color: white; border-radius: 4px; cursor: pointer; }
    `;
  }
}
