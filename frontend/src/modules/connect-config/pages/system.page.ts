// frontend/src/modules/connect-config/pages/system.page.ts
export class SystemPage {
  
  static getContent(): string {
    return `
      <div class="config-page-content">
        <div class="config-header">
          <h2>⚙️ Konfiguracja Systemu</h2>
          <p class="config-description">Zarządzaj ustawieniami systemowymi i globalnymi parametrami</p>
        </div>

        <div class="config-sections">
          <!-- General Settings -->
          <div class="config-section">
            <h3 class="section-title">
              <span class="section-icon">🔧</span>
              Ustawienia Ogólne
            </h3>
            
            <div class="setting-item">
              <label class="setting-label">
                Nazwa Systemu
                <span class="setting-hint">Widoczna nazwa aplikacji</span>
              </label>
              <input type="text" class="setting-input" value="Connect System 2004" />
            </div>

            <div class="setting-item">
              <label class="setting-label">
                Język Interfejsu
                <span class="setting-hint">Domyślny język aplikacji</span>
              </label>
              <select class="setting-input">
                <option value="pl" selected>Polski</option>
                <option value="en">English</option>
                <option value="de">Deutsch</option>
              </select>
            </div>

            <div class="setting-item">
              <label class="setting-label">
                Strefa Czasowa
                <span class="setting-hint">Wybierz lokalną strefę czasową</span>
              </label>
              <select class="setting-input">
                <option value="Europe/Warsaw" selected>Europe/Warsaw (UTC+1)</option>
                <option value="Europe/London">Europe/London (UTC+0)</option>
                <option value="America/New_York">America/New_York (UTC-5)</option>
              </select>
            </div>
          </div>

          <!-- Database Settings -->
          <div class="config-section">
            <h3 class="section-title">
              <span class="section-icon">🗄️</span>
              Baza Danych
            </h3>
            
            <div class="setting-item">
              <label class="setting-label">
                Host Bazy Danych
                <span class="setting-hint">Adres serwera PostgreSQL</span>
              </label>
              <input type="text" class="setting-input" value="localhost" />
            </div>

            <div class="setting-item">
              <label class="setting-label">
                Port
                <span class="setting-hint">Port połączenia</span>
              </label>
              <input type="number" class="setting-input" value="5432" />
            </div>

            <div class="setting-item">
              <label class="setting-label">
                Auto Backup
                <span class="setting-hint">Automatyczne kopie zapasowe</span>
              </label>
              <label class="toggle-switch">
                <input type="checkbox" checked />
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>

          <!-- Notification Settings -->
          <div class="config-section">
            <h3 class="section-title">
              <span class="section-icon">🔔</span>
              Powiadomienia
            </h3>
            
            <div class="setting-item">
              <label class="setting-label">
                Email Powiadomień
                <span class="setting-hint">Adres dla alertów systemowych</span>
              </label>
              <input type="email" class="setting-input" value="admin@system.local" />
            </div>

            <div class="setting-item">
              <label class="setting-label">
                Powiadomienia Desktop
                <span class="setting-hint">Wyświetl powiadomienia na pulpicie</span>
              </label>
              <label class="toggle-switch">
                <input type="checkbox" checked />
                <span class="toggle-slider"></span>
              </label>
            </div>

            <div class="setting-item">
              <label class="setting-label">
                Dźwięki Systemowe
                <span class="setting-hint">Odtwarzaj dźwięki przy alertach</span>
              </label>
              <label class="toggle-switch">
                <input type="checkbox" />
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div class="config-actions">
          <button class="btn btn-primary">💾 Zapisz Ustawienia</button>
          <button class="btn btn-secondary">🔄 Przywróć Domyślne</button>
          <button class="btn btn-danger">🧪 Test Konfiguracji</button>
        </div>
      </div>
    `;
  }

  static getStyles(): string {
    return `
      .config-page-content {
        padding: 24px;
        max-width: 1200px;
        margin: 0 auto;
      }

      .config-header {
        margin-bottom: 32px;
        padding-bottom: 16px;
        border-bottom: 2px solid #e9ecef;
      }

      .config-header h2 {
        font-size: 28px;
        font-weight: 600;
        color: #2c3e50;
        margin: 0 0 8px 0;
      }

      .config-description {
        font-size: 14px;
        color: #6c757d;
        margin: 0;
      }

      .config-sections {
        display: flex;
        flex-direction: column;
        gap: 24px;
        margin-bottom: 32px;
      }

      .config-section {
        background: white;
        border: 1px solid #e9ecef;
        border-radius: 8px;
        padding: 24px;
      }

      .section-title {
        font-size: 18px;
        font-weight: 600;
        color: #2c3e50;
        margin: 0 0 20px 0;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .section-icon {
        font-size: 24px;
      }

      .setting-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 0;
        border-bottom: 1px solid #f8f9fa;
      }

      .setting-item:last-child {
        border-bottom: none;
      }

      .setting-label {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .setting-hint {
        font-size: 12px;
        color: #6c757d;
        font-weight: normal;
      }

      .setting-input {
        width: 300px;
        padding: 8px 12px;
        border: 1px solid #dee2e6;
        border-radius: 4px;
        font-size: 14px;
      }

      .setting-input:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      }

      .toggle-switch {
        position: relative;
        display: inline-block;
        width: 50px;
        height: 24px;
      }

      .toggle-switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      .toggle-slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: 0.3s;
        border-radius: 24px;
      }

      .toggle-slider:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: 0.3s;
        border-radius: 50%;
      }

      .toggle-switch input:checked + .toggle-slider {
        background-color: #667eea;
      }

      .toggle-switch input:checked + .toggle-slider:before {
        transform: translateX(26px);
      }

      .config-actions {
        display: flex;
        gap: 12px;
        justify-content: flex-start;
        padding-top: 24px;
        border-top: 2px solid #e9ecef;
      }

      .btn {
        padding: 10px 20px;
        border: none;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
      }

      .btn-primary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }

      .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
      }

      .btn-secondary {
        background: #6c757d;
        color: white;
      }

      .btn-secondary:hover {
        background: #5a6268;
      }

      .btn-danger {
        background: #28a745;
        color: white;
      }

      .btn-danger:hover {
        background: #218838;
      }
    `;
  }
}
