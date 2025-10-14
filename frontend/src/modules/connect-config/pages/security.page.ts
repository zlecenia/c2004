// frontend/src/modules/connect-config/pages/security.page.ts
export class SecurityPage {
  
  static getContent(): string {
    return `
      <div class="config-page-content">
        <div class="config-header">
          <h2>🔒 Konfiguracja Bezpieczeństwa</h2>
          <p class="config-description">Zarządzaj uprawnieniami, rolami i polityką bezpieczeństwa</p>
        </div>

        <div class="config-sections">
          <!-- Authentication -->
          <div class="config-section">
            <h3 class="section-title">
              <span class="section-icon">🔐</span>
              Uwierzytelnianie
            </h3>
            
            <div class="setting-item">
              <label class="setting-label">
                Metoda Uwierzytelniania
                <span class="setting-hint">Wybierz sposób logowania użytkowników</span>
              </label>
              <select class="setting-input">
                <option value="rfid" selected>RFID Card</option>
                <option value="qr">QR Code</option>
                <option value="password">Password</option>
                <option value="multi">Multi-Factor (RFID + PIN)</option>
              </select>
            </div>

            <div class="setting-item">
              <label class="setting-label">
                Timeout Sesji (minuty)
                <span class="setting-hint">Auto-logout po okresie nieaktywności</span>
              </label>
              <input type="number" class="setting-input" value="30" min="5" max="480" />
            </div>

            <div class="setting-item">
              <label class="setting-label">
                Maksymalna Liczba Prób Logowania
                <span class="setting-hint">Blokada konta po niepowodzeniach</span>
              </label>
              <input type="number" class="setting-input" value="3" min="1" max="10" />
            </div>

            <div class="setting-item">
              <label class="setting-label">
                Wymuszaj Silne Hasła
                <span class="setting-hint">Min. 8 znaków, wielkie/małe litery, cyfry</span>
              </label>
              <label class="toggle-switch">
                <input type="checkbox" checked />
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>

          <!-- User Roles -->
          <div class="config-section">
            <h3 class="section-title">
              <span class="section-icon">👥</span>
              Role Użytkowników
            </h3>
            
            <div class="roles-list">
              <div class="role-item">
                <div class="role-info">
                  <span class="role-name">👑 Administrator</span>
                  <span class="role-users">3 użytkowników</span>
                </div>
                <div class="role-permissions">
                  <span class="permission-badge">✅ Pełny dostęp</span>
                  <span class="permission-badge">✅ Zarządzanie użytkownikami</span>
                  <span class="permission-badge">✅ Konfiguracja systemu</span>
                </div>
                <div class="role-actions">
                  <button class="btn-icon" title="Edit">✏️</button>
                </div>
              </div>

              <div class="role-item">
                <div class="role-info">
                  <span class="role-name">🔧 Technik</span>
                  <span class="role-users">8 użytkowników</span>
                </div>
                <div class="role-permissions">
                  <span class="permission-badge">✅ Testowanie urządzeń</span>
                  <span class="permission-badge">✅ Przeglądanie raportów</span>
                  <span class="permission-badge">❌ Konfiguracja systemu</span>
                </div>
                <div class="role-actions">
                  <button class="btn-icon" title="Edit">✏️</button>
                  <button class="btn-icon" title="Delete">🗑️</button>
                </div>
              </div>

              <div class="role-item">
                <div class="role-info">
                  <span class="role-name">👤 Operator</span>
                  <span class="role-users">15 użytkowników</span>
                </div>
                <div class="role-permissions">
                  <span class="permission-badge">✅ Identyfikacja urządzeń</span>
                  <span class="permission-badge">✅ Podstawowe raporty</span>
                  <span class="permission-badge">❌ Modyfikacja danych</span>
                </div>
                <div class="role-actions">
                  <button class="btn-icon" title="Edit">✏️</button>
                  <button class="btn-icon" title="Delete">🗑️</button>
                </div>
              </div>
            </div>

            <button class="btn btn-add">➕ Dodaj Nową Rolę</button>
          </div>

          <!-- Access Control -->
          <div class="config-section">
            <h3 class="section-title">
              <span class="section-icon">🚪</span>
              Kontrola Dostępu
            </h3>
            
            <div class="access-rules">
              <div class="access-rule">
                <div class="rule-info">
                  <span class="rule-name">Dostęp do Modułu Connect-Test</span>
                  <span class="rule-type">Module Access</span>
                </div>
                <div class="rule-allowed">
                  <span class="allowed-badge">✅ Administrator</span>
                  <span class="allowed-badge">✅ Technik</span>
                  <span class="allowed-badge">❌ Operator</span>
                </div>
              </div>

              <div class="access-rule">
                <div class="rule-info">
                  <span class="rule-name">Modyfikacja Konfiguracji Urządzeń</span>
                  <span class="rule-type">Device Configuration</span>
                </div>
                <div class="rule-allowed">
                  <span class="allowed-badge">✅ Administrator</span>
                  <span class="allowed-badge">❌ Technik</span>
                  <span class="allowed-badge">❌ Operator</span>
                </div>
              </div>

              <div class="access-rule">
                <div class="rule-info">
                  <span class="rule-name">Export Danych</span>
                  <span class="rule-type">Data Export</span>
                </div>
                <div class="rule-allowed">
                  <span class="allowed-badge">✅ Administrator</span>
                  <span class="allowed-badge">✅ Technik</span>
                  <span class="allowed-badge">❌ Operator</span>
                </div>
              </div>
            </div>

            <button class="btn btn-add">➕ Dodaj Regułę Dostępu</button>
          </div>

          <!-- Audit Log -->
          <div class="config-section">
            <h3 class="section-title">
              <span class="section-icon">📋</span>
              Logi Audytu
            </h3>
            
            <div class="setting-item">
              <label class="setting-label">
                Włącz Logowanie Audytu
                <span class="setting-hint">Rejestruj wszystkie akcje użytkowników</span>
              </label>
              <label class="toggle-switch">
                <input type="checkbox" checked />
                <span class="toggle-slider"></span>
              </label>
            </div>

            <div class="setting-item">
              <label class="setting-label">
                Okres Przechowywania Logów (dni)
                <span class="setting-hint">Automatyczne usuwanie starych logów</span>
              </label>
              <input type="number" class="setting-input" value="90" min="7" max="365" />
            </div>

            <div class="setting-item">
              <label class="setting-label">
                Loguj Nieudane Próby Logowania
                <span class="setting-hint">Monitoruj próby nieautoryzowanego dostępu</span>
              </label>
              <label class="toggle-switch">
                <input type="checkbox" checked />
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div class="config-actions">
          <button class="btn btn-primary">💾 Zapisz Ustawienia Bezpieczeństwa</button>
          <button class="btn btn-secondary">📊 Podgląd Logów Audytu</button>
          <button class="btn btn-danger">🔄 Przywróć Domyślne</button>
        </div>
      </div>
    `;
  }

  static getStyles(): string {
    return `
      /* Reuse common styles from system.page.ts */
      .config-page-content {
        padding: 24px;
        max-width: 1400px;
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

      /* Roles List */
      .roles-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-bottom: 16px;
      }

      .role-item {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 16px;
        background: #f8f9fa;
        border-radius: 6px;
        border: 1px solid #e9ecef;
      }

      .role-info {
        flex: 0 0 200px;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .role-name {
        font-weight: 600;
        font-size: 14px;
        color: #2c3e50;
      }

      .role-users {
        font-size: 12px;
        color: #6c757d;
      }

      .role-permissions {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .permission-badge {
        font-size: 12px;
        padding: 4px 12px;
        border-radius: 12px;
        background: white;
        border: 1px solid #e9ecef;
      }

      .role-actions {
        display: flex;
        gap: 8px;
      }

      /* Access Rules */
      .access-rules {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 16px;
      }

      .access-rule {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 6px 6px;
        background: #f8f9fa;
        border-radius: 6px;
        border: 1px solid #e9ecef;
      }

      .rule-info {
        flex: 0 0 300px;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .rule-name {
        font-weight: 600;
        font-size: 13px;
        color: #2c3e50;
      }

      .rule-type {
        font-size: 11px;
        color: #6c757d;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .rule-allowed {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .allowed-badge {
        font-size: 12px;
        padding: 4px 12px;
        border-radius: 12px;
        background: white;
        border: 1px solid #e9ecef;
      }

      /* Common elements */
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

      .btn-icon {
        width: 36px;
        height: 36px;
        border: 1px solid #dee2e6;
        background: white;
        border-radius: 6px;
        cursor: pointer;
        font-size: 16px;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .btn-icon:hover {
        background: #667eea;
        border-color: #667eea;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(102, 126, 234, 0.2);
      }

      .btn-add {
        padding: 10px 16px;
        background: white;
        border: 2px dashed #dee2e6;
        border-radius: 6px;
        color: #6c757d;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s;
      }

      .btn-add:hover {
        border-color: #667eea;
        color: #667eea;
        background: #f8f9fa;
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
        background: #17a2b8;
        color: white;
      }

      .btn-secondary:hover {
        background: #138496;
      }

      .btn-danger {
        background: #6c757d;
        color: white;
      }

      .btn-danger:hover {
        background: #5a6268;
      }
    `;
  }
}
