// frontend/src/modules/connect-data/pages/dispositions-add-new.page.ts
export class DispositionsAddNewPage {
  
  static getContent(): string {
    return `
      <div class="page-content">
        <div class="page-header">
          <h2>➕ Nowa Dyspozycja</h2>
          <p>Utwórz nową dyspozycję magazynową</p>
        </div>
        
        <div class="form-container">
          <div class="form-row">
            <div class="form-group">
              <label>Typ dyspozycji:</label>
              <select class="form-select">
                <option>📦 Przyjęcie towaru</option>
                <option>📤 Wydanie towaru</option>
                <option>🔄 Przesunięcie międzymagazynowe</option>
                <option>📊 Inwentaryzacja</option>
              </select>
            </div>
            <div class="form-group">
              <label>Magazyn:</label>
              <select class="form-select">
                <option>MAG-A1 - Magazyn główny</option>
                <option>MAG-B2 - Magazyn pomocniczy</option>
                <option>MAG-C3 - Magazyn produkcyjny</option>
              </select>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label>Priorytet:</label>
              <select class="form-select">
                <option>🔴 Pilny</option>
                <option>🟡 Wysoki</option>
                <option selected>🟢 Normalny</option>
                <option>⚪ Niski</option>
              </select>
            </div>
            <div class="form-group">
              <label>Termin realizacji:</label>
              <input type="datetime-local" class="form-input" value="2025-10-11T14:00">
            </div>
          </div>
          
          <div class="form-group">
            <label>Opis dyspozycji:</label>
            <textarea class="form-textarea" rows="4" placeholder="Opisz szczegóły dyspozycji..."></textarea>
          </div>
          
          <button class="btn-submit">📝 Utwórz Dyspozycję</button>
        </div>
      </div>
    `;
  }

  static getStyles(): string {
    return `
      .page-content { padding: 20px; max-width: 800px; margin: 0 auto; }
      .page-header h2 { color: #333; font-size: 24px; margin-bottom: 5px; }
      .form-container { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
      .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
      .form-group { display: flex; flex-direction: column; gap: 8px; }
      .form-group label { font-size: 14px; font-weight: 600; color: #333; }
      .form-select, .form-input, .form-textarea { padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; }
      .form-textarea { resize: vertical; font-family: inherit; }
      .btn-submit { width: 100%; padding: 12px; background: #28a745; color: white; border: none; border-radius: 6px; font-size: 16px; cursor: pointer; margin-top: 20px; }
    `;
  }
}
