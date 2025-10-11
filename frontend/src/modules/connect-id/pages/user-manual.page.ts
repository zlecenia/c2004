// frontend/src/modules/connect-id/pages/user-manual.page.ts
export class UserManualPage {
  
  static getContent(): string {
    return `
      <div class="page-content">
        <div class="page-header">
          <h2>👤 Identyfikacja Użytkownika - Ręczne wprowadzanie</h2>
          <p>Wprowadź kod identyfikacyjny ręcznie za pomocą klawiatury</p>
        </div>
        
        <div class="identification-display">
          <div class="manual-input-container">
            <div class="input-icon">⌨️</div>
            <h3>Wprowadź kod identyfikacyjny</h3>
            <div class="manual-input-section">
              <input type="text" id="manual-input" placeholder="Wprowadź kod identyfikacyjny..." autocomplete="off">
              <button id="manual-submit" class="submit-btn">
                ✅ Potwierdź
              </button>
            </div>
            <div class="virtual-keyboard-manual" id="virtual-keyboard-manual">
              <!-- Virtual keyboard will be inserted here -->
            </div>
            
            <div class="input-suggestions">
              <h4>Ostatnio używane kody:</h4>
              <div class="suggestion-item" data-code="USR001">USR001 - Jan Kowalski</div>
              <div class="suggestion-item" data-code="USR002">USR002 - Anna Nowak</div>
              <div class="suggestion-item" data-code="USR003">USR003 - Piotr Wiśniewski</div>
            </div>
          </div>
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

      .page-header h2 {
        color: #333;
        margin: 0 0 10px 0;
        font-size: 24px;
      }

      .page-header p {
        color: #666;
        margin: 0 0 30px 0;
        font-size: 16px;
      }

      .manual-input-container {
        background: #f8f9fa;
        padding: 40px;
        border-radius: 15px;
        text-align: center;
        border: 2px solid #e9ecef;
      }

      .input-icon {
        font-size: 64px;
        margin-bottom: 20px;
      }

      .manual-input-container h3 {
        color: #333;
        margin: 0 0 25px 0;
        font-size: 20px;
      }

      .manual-input-section {
        display: flex;
        gap: 10px;
        justify-content: center;
        align-items: center;
        margin-bottom: 30px;
      }

      #manual-input {
        padding: 12px 20px;
        font-size: 18px;
        border: 2px solid #ddd;
        border-radius: 8px;
        width: 300px;
        text-align: center;
        font-family: monospace;
        text-transform: uppercase;
      }

      #manual-input:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 0 3px rgba(0,123,255,0.25);
      }

      .submit-btn {
        padding: 12px 25px;
        background: linear-gradient(135deg, #28a745, #20c997);
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .submit-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(40, 167, 69, 0.4);
      }

      .virtual-keyboard-manual {
        margin: 20px 0;
        min-height: 200px;
      }

      .input-suggestions {
        text-align: left;
        max-width: 400px;
        margin: 0 auto;
      }

      .input-suggestions h4 {
        color: #555;
        margin: 0 0 15px 0;
        font-size: 16px;
      }

      .suggestion-item {
        padding: 10px 12px;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 6px;
        margin-bottom: 5px;
        cursor: pointer;
        transition: all 0.2s ease;
        font-family: monospace;
      }

      .suggestion-item:hover {
        background: #e3f2fd;
        border-color: #1976d2;
        transform: translateX(5px);
      }
    `;
  }
}
