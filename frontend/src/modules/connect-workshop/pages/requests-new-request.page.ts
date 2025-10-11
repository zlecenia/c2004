// frontend/src/modules/connect-workshop/pages/requests-new-request.page.ts
export class RequestsNewRequestPage {
  
  static getContent(): string {
    return `
      <div class="page-content">
        <div class="page-header">
          <h2>➕ Nowe Zgłoszenie</h2>
          <p>Utwórz nowe zgłoszenie serwisowe</p>
        </div>
        
        <div class="form-container">
          <div class="form-row">
            <div class="form-group">
              <label>Urządzenie:</label>
              <select class="form-select">
                <option>PSS-7000 #12345</option>
                <option>PSS-5000 #67890</option>
                <option>PSS-3000 #11111</option>
              </select>
            </div>
            <div class="form-group">
              <label>Typ zgłoszenia:</label>
              <select class="form-select">
                <option>🔧 Konserwacja</option>
                <option>⚡ Naprawa</option>
                <option>📋 Przegląd</option>
                <option>🔄 Kalibracja</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label>Priorytet:</label>
            <select class="form-select">
              <option>🔴 Wysoki</option>
              <option>🟡 Średni</option>
              <option>🟢 Niski</option>
            </select>
          </div>
          <div class="form-group">
            <label>Opis problemu:</label>
            <textarea class="form-textarea" rows="4" placeholder="Opisz szczegółowo problem z urządzeniem..."></textarea>
          </div>
          <button class="btn-submit">📝 Utwórz Zgłoszenie</button>
        </div>
      </div>
    `;
  }

  static getStyles(): string {
    return `
      .page-content {
        padding: 20px;
        max-width: 800px;
        margin: 0 auto;
      }

      .page-header {
        margin-bottom: 30px;
      }

      .page-header h2 {
        color: #333;
        margin: 0 0 5px 0;
        font-size: 24px;
      }

      .page-header p {
        color: #666;
        margin: 0;
        font-size: 14px;
      }

      .form-container {
        background: white;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }

      .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin-bottom: 20px;
      }

      .form-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .form-group label {
        font-size: 14px;
        font-weight: 600;
        color: #333;
      }

      .form-select,
      .form-input {
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 14px;
      }

      .form-textarea {
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 14px;
        resize: vertical;
        font-family: inherit;
      }

      .btn-submit {
        width: 100%;
        padding: 12px;
        background: #28a745;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        margin-top: 20px;
      }

      .btn-submit:hover {
        background: #218838;
      }
    `;
  }
}
