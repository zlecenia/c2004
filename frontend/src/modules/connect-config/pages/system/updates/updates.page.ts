// frontend/src/modules/connect-config/pages/system/updates.page.ts

export class UpdatesPage {
  static getContent(): string {
    return `
      <div class="config-page-content">
        <div class="config-header">
          <h2>🔄 Aktualizacje Systemu</h2>
          <p class="config-description">Zarządzaj aktualizacjami oprogramowania i systemem</p>
        </div>

        <div class="config-sections">
          <!-- Current Version Info -->
          <div class="config-section">
            <h3 class="section-title">
              <span class="section-icon">📋</span>
              Informacje o Wersji
            </h3>
            
            <div class="version-info">
              <div class="version-card">
                <div class="version-label">Aktualna Wersja</div>
                <div class="version-number">v2.4.1</div>
                <div class="version-date">Wydano: 2024-10-01</div>
              </div>
              
              <div class="version-card">
                <div class="version-label">Status Systemu</div>
                <div class="version-status status-up-to-date">Aktualny</div>
                <div class="version-date">Sprawdzono: dziś o 14:30</div>
              </div>
              
              <div class="version-card">
                <div class="version-label">Następna Aktualizacja</div>
                <div class="version-number">v2.4.2</div>
                <div class="version-date">Dostępna: 2024-10-15</div>
              </div>
            </div>
          </div>

          <!-- Available Updates -->
          <div class="config-section">
            <h3 class="section-title">
              <span class="section-icon">⬇️</span>
              Dostępne Aktualizacje
            </h3>
            
            <div class="updates-list">
              <div class="update-item priority-high">
                <div class="update-info">
                  <div class="update-title">Aktualizacja Bezpieczeństwa v2.4.2</div>
                  <div class="update-description">Ważna aktualizacja bezpieczeństwa - zalecana natychmiastowa instalacja</div>
                  <div class="update-details">
                    <span class="update-size">📦 15.2 MB</span>
                    <span class="update-type">🔒 Security</span>
                    <span class="update-date">📅 2024-10-13</span>
                  </div>
                </div>
                <div class="update-actions">
                  <button class="btn-update btn-install">Zainstaluj</button>
                  <button class="btn-update btn-info">📄 Szczegóły</button>
                </div>
              </div>
              
              <div class="update-item priority-medium">
                <div class="update-info">
                  <div class="update-title">Feature Update v2.5.0</div>
                  <div class="update-description">Nowe funkcje i ulepszenia interfejsu użytkownika</div>
                  <div class="update-details">
                    <span class="update-size">📦 87.5 MB</span>
                    <span class="update-type">✨ Feature</span>
                    <span class="update-date">📅 2024-10-20</span>
                  </div>
                </div>
                <div class="update-actions">
                  <button class="btn-update btn-schedule">Zaplanuj</button>
                  <button class="btn-update btn-info">📄 Szczegóły</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Update Settings -->
          <div class="config-section">
            <h3 class="section-title">
              <span class="section-icon">⚙️</span>
              Ustawienia Aktualizacji
            </h3>
            
            <div class="setting-item">
              <label class="setting-label">
                Automatyczne Aktualizacje
                <span class="setting-hint">Automatycznie pobieraj i instaluj aktualizacje</span>
              </label>
              <select class="setting-select">
                <option value="disabled">Wyłączone</option>
                <option value="security" selected>Tylko bezpieczeństwa</option>
                <option value="all">Wszystkie aktualizacje</option>
              </select>
            </div>

            <div class="setting-item">
              <label class="setting-label">
                Harmonogram Aktualizacji
                <span class="setting-hint">Kiedy instalować aktualizacje</span>
              </label>
              <div class="schedule-settings">
                <select class="setting-select">
                  <option value="immediate">Natychmiast</option>
                  <option value="maintenance" selected>W oknie serwisowym</option>
                  <option value="manual">Ręcznie</option>
                </select>
                <input type="time" class="setting-input" value="02:00" />
              </div>
            </div>

            <div class="setting-item">
              <label class="setting-label">
                Powiadomienia o Aktualizacjach
                <span class="setting-hint">Otrzymuj powiadomienia o dostępnych aktualizacjach</span>
              </label>
              <label class="toggle-switch">
                <input type="checkbox" checked />
                <span class="toggle-slider"></span>
              </label>
            </div>

            <div class="setting-item">
              <label class="setting-label">
                Automatyczne Tworzenie Kopii Zapasowej
                <span class="setting-hint">Utwórz kopię przed aktualizacją</span>
              </label>
              <label class="toggle-switch">
                <input type="checkbox" checked />
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>

          <!-- Update History -->
          <div class="config-section">
            <h3 class="section-title">
              <span class="section-icon">📚</span>
              Historia Aktualizacji
            </h3>
            
            <div class="history-list">
              <div class="history-item">
                <div class="history-icon success">✅</div>
                <div class="history-info">
                  <div class="history-title">v2.4.1 - Aktualizacja Funkcji</div>
                  <div class="history-date">2024-10-01 02:15</div>
                </div>
                <div class="history-status">Sukces</div>
              </div>
              
              <div class="history-item">
                <div class="history-icon success">✅</div>
                <div class="history-info">
                  <div class="history-title">v2.4.0 - Aktualizacja Bezpieczeństwa</div>
                  <div class="history-date">2024-09-15 02:00</div>
                </div>
                <div class="history-status">Sukces</div>
              </div>
              
              <div class="history-item">
                <div class="history-icon warning">⚠️</div>
                <div class="history-info">
                  <div class="history-title">v2.3.9 - Patch</div>
                  <div class="history-date">2024-09-01 02:05</div>
                </div>
                <div class="history-status">Wymagał restart</div>
              </div>
            </div>
          </div>
        </div>

        <div class="config-actions">
          <button class="btn-save">💾 Zapisz ustawienia</button>
          <button class="btn-check-updates">🔍 Sprawdź aktualizacje</button>
          <button class="btn-backup">💾 Utwórz kopię zapasową</button>
        </div>
      </div>
    `;
  }

  static getStyles(): string {
    return `
      .version-info {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 15px;
        margin-bottom: 25px;
      }

      .version-card {
        background: white;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 20px;
        text-align: center;
      }

      .version-label {
        font-size: 12px;
        color: #666;
        margin-bottom: 8px;
        text-transform: uppercase;
        font-weight: 500;
      }

      .version-number {
        font-size: 28px;
        font-weight: 700;
        color: #007bff;
        margin-bottom: 5px;
      }

      .version-status {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 5px;
      }

      .status-up-to-date {
        color: #28a745;
      }

      .version-date {
        font-size: 12px;
        color: #888;
      }

      .updates-list {
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin-bottom: 25px;
      }

      .update-item {
        background: white;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }

      .update-item.priority-high {
        border-left: 4px solid #dc3545;
        background: #fff5f5;
      }

      .update-item.priority-medium {
        border-left: 4px solid #ffc107;
      }

      .update-info {
        flex: 1;
      }

      .update-title {
        font-size: 16px;
        font-weight: 600;
        color: #333;
        margin-bottom: 8px;
      }

      .update-description {
        color: #666;
        margin-bottom: 10px;
        line-height: 1.4;
      }

      .update-details {
        display: flex;
        gap: 15px;
        font-size: 12px;
        color: #888;
      }

      .update-actions {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-left: 20px;
      }

      .btn-update {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 500;
        transition: all 0.2s;
        white-space: nowrap;
      }

      .btn-install {
        background: #dc3545;
        color: white;
      }

      .btn-install:hover {
        background: #c82333;
      }

      .btn-schedule {
        background: #ffc107;
        color: #212529;
      }

      .btn-schedule:hover {
        background: #e0a800;
      }

      .btn-info {
        background: #6c757d;
        color: white;
      }

      .btn-info:hover {
        background: #5a6268;
      }

      .schedule-settings {
        display: flex;
        gap: 10px;
        align-items: center;
      }

      .history-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .history-item {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 15px;
        background: white;
        border: 1px solid #f0f0f0;
        border-radius: 8px;
      }

      .history-icon {
        font-size: 20px;
        width: 30px;
        text-align: center;
      }

      .history-info {
        flex: 1;
      }

      .history-title {
        font-weight: 500;
        color: #333;
        margin-bottom: 4px;
      }

      .history-date {
        font-size: 12px;
        color: #888;
      }

      .history-status {
        font-size: 12px;
        color: #28a745;
        font-weight: 500;
      }

      .btn-check-updates {
        background: #17a2b8;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.2s;
      }

      .btn-check-updates:hover {
        background: #138496;
      }

      .btn-backup {
        background: #6f42c1;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.2s;
      }

      .btn-backup:hover {
        background: #5a32a3;
      }
    `;
  }
}
