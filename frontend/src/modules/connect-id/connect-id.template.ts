// frontend/src/modules/connect-id/connect-id.template.ts
import { IconComponent } from '../../components/icon.component';

export class ConnectIdTemplate {
  
  static render(): string {
    return `
      <div class="compact-layout">
        <!-- Column 1: Interface Method -->
        <div class="menu-column">
          <h3 class="column-title">Interfejs</h3>
          <button class="method-item active" data-method="rfid">
            <span class="menu-icon">${IconComponent.render('smartphone', { size: 18 })}</span>
            <span class="menu-label">RFID</span>
          </button>
          <button class="method-item" data-method="qr">
            <span class="menu-icon">${IconComponent.render('qr-code', { size: 18 })}</span>
            <span class="menu-label">QR</span>
          </button>
          <button class="method-item" data-method="barcode">
            <span class="menu-icon">${IconComponent.render('barcode', { size: 18 })}</span>
            <span class="menu-label">Barcode</span>
          </button>
          <button class="method-item" data-method="manual">
            <span class="menu-icon">${IconComponent.render('edit', { size: 18 })}</span>
            <span class="menu-label">Keyboard</span>
          </button>
          <button class="method-item" data-method="list">
            <span class="menu-icon">${IconComponent.render('clipboard-check', { size: 18 })}</span>
            <span class="menu-label">Z listy</span>
          </button>
        </div>

        <!-- Column 3: Users (shown only for user type with list method) -->
        <div class="menu-column users-column" id="users-column" style="display: none;">
          <h3 class="column-title">Użytkownicy</h3>
          <div class="users-list-menu">
            ${this.renderUsersList()}
          </div>
        </div>

        <!-- Main Content -->
        <div class="main-content">
          <div class="content-body">
            ${this.renderUserLoginForm()}
            ${this.renderDeviceIdentificationForm()}
            ${this.renderProtocolScreen()}
            ${this.renderScanningInterface()}
            ${this.renderManualEntryForm()}
          </div>
        </div>
      </div>
    `;
  }

  static renderUsersList(): string {
    const users = [
      { id: 'jan.kowalski', name: 'Jan K.', fullname: 'Jan Kowalski', role: 'Manager' },
      { id: 'anna.nowak', name: 'Anna N.', fullname: 'Anna Nowak', role: 'Technik' },
      { id: 'piotr.wisniewski', name: 'Piotr W.', fullname: 'Piotr Wiśniewski', role: 'Operator' },
      { id: 'katarzyna.kowalczyk', name: 'Katarzyna K.', fullname: 'Katarzyna Kowalczyk', role: 'Administrator' },
      { id: 'tomasz.nowicki', name: 'Tomasz N.', fullname: 'Tomasz Nowicki', role: 'Serwisant' }
    ];

    return users.map(user => `
      <div class="user-menu-item" data-user="${user.id}" data-fullname="${user.fullname}">
        <div class="user-info">
          <div class="user-name">${user.name}</div>
          <div class="user-role">${user.role}</div>
        </div>
      </div>
    `).join('');
  }

  static renderUserLoginForm(): string {
    return `
      <div class="user-login-form" id="user-login-form" style="display: none;">
        <div class="login-header">
          <div class="user-avatar">👤</div>
          <div class="user-details">
            <h3 class="selected-user-name" id="selected-user-name">Jan Kowalski</h3>
            <p class="user-role">Manager</p>
          </div>
        </div>
        
        <div class="login-content">
          <div class="password-section">
            <label for="user-password">Hasło użytkownika:</label>
            <div class="password-input-container">
              <input type="password" id="user-password" class="password-input" placeholder="Wprowadź hasło">
              <button class="show-keyboard-btn" id="show-password-keyboard">
                ${IconComponent.render('keyboard', { size: 16 })}
              </button>
            </div>
          </div>
          
          <div class="login-actions">
            <button class="btn-login" id="btn-user-login">Zaloguj</button>
            <button class="btn-cancel" id="btn-cancel-login">Anuluj</button>
          </div>
        </div>
      </div>
    `;
  }

  static renderDeviceIdentificationForm(): string {
    return `
      <div class="device-identification" id="device-identification">
        <div class="device-header">
          <h2>Identyfikacja Urządzenia</h2>
          <div class="device-status" id="device-status">
            <span class="status-text">Oczekiwanie na urządzenie...</span>
            <div class="status-indicator scanning"></div>
          </div>
        </div>

        <div class="device-info-card" id="device-info-card" style="display: none;">
          <div class="device-icon">${IconComponent.render('cpu', { size: 32 })}</div>
          <div class="device-details">
            <h3 class="device-name" id="device-name">PSS-7000</h3>
            <p class="device-serial" id="device-serial">#12345</p>
            <div class="device-badges">
              <span class="badge status-active" id="device-badge">Aktywne</span>
              <span class="badge type-pressure">Ciśnieniowe</span>
            </div>
          </div>
          
          <div class="device-actions">
            <button class="btn-action" id="btn-device-action">
              ${IconComponent.render('play', { size: 16 })}
              Rozpocznij
            </button>
          </div>
        </div>

        ${this.renderRecentDevices()}
      </div>
    `;
  }

  static renderRecentDevices(): string {
    return `
      <div class="recent-devices">
        <h4>Ostatnio używane urządzenia:</h4>
        <div class="devices-grid">
          <div class="device-card" data-device="PSS-7000" data-serial="12345">
            <div class="device-card-icon">${IconComponent.render('cpu', { size: 20 })}</div>
            <div class="device-card-info">
              <div class="device-card-name">PSS-7000</div>
              <div class="device-card-serial">#12345</div>
            </div>
          </div>
          <div class="device-card" data-device="PSS-5000" data-serial="67890">
            <div class="device-card-icon">${IconComponent.render('cpu', { size: 20 })}</div>
            <div class="device-card-info">
              <div class="device-card-name">PSS-5000</div>
              <div class="device-card-serial">#67890</div>
            </div>
          </div>
          <div class="device-card" data-device="PSS-3000" data-serial="11111">
            <div class="device-card-icon">${IconComponent.render('cpu', { size: 20 })}</div>
            <div class="device-card-info">
              <div class="device-card-name">PSS-3000</div>
              <div class="device-card-serial">#11111</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static renderProtocolScreen(): string {
    return `
      <div class="protocol-screen" id="protocol-screen" style="display: none;">
        <div class="protocol-header">
          <div class="protocol-info">
            <h2>Protokół Identyfikacji</h2>
            <div class="protocol-meta">
              <span class="protocol-date" id="protocol-date">2024-03-15 14:30</span>
              <span class="protocol-user" id="protocol-user">Jan Kowalski</span>
            </div>
          </div>
        </div>

        <div class="protocol-content">
          <div class="identification-result">
            <div class="result-icon success">✓</div>
            <div class="result-details">
              <h3 class="result-title">Identyfikacja zakończona pomyślnie</h3>
              <div class="result-info">
                <div class="info-row">
                  <span class="info-label">Urządzenie:</span>
                  <span class="info-value" id="protocol-device">PSS-7000 #12345</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Metoda:</span>
                  <span class="info-value" id="protocol-method">RFID</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Czas trwania:</span>
                  <span class="info-value">2.3s</span>
                </div>
              </div>
            </div>
          </div>

          ${this.renderNextSteps()}
        </div>

        <div class="protocol-actions">
          <button class="btn-protocol" id="btn-save-protocol">
            ${IconComponent.render('save', { size: 16 })}
            Zapisz protokół
          </button>
          <button class="btn-protocol" id="btn-print-protocol">
            ${IconComponent.render('printer', { size: 16 })}
            Drukuj
          </button>
          <button class="btn-protocol secondary" id="btn-new-identification">
            ${IconComponent.render('refresh-cw', { size: 16 })}
            Nowa identyfikacja
          </button>
        </div>
      </div>
    `;
  }

  static renderNextSteps(): string {
    return `
      <div class="next-steps">
        <h4>Następne kroki:</h4>
        <div class="steps-list">
          <div class="step-item">
            <div class="step-number">1</div>
            <div class="step-text">Przejdź do modułu Testowanie</div>
            <button class="step-action" data-action="go-to-testing">
              ${IconComponent.render('arrow-right', { size: 14 })}
            </button>
          </div>
          <div class="step-item">
            <div class="step-number">2</div>
            <div class="step-text">Przejdź do ConnectData</div>
            <button class="step-action" data-action="go-to-data">
              ${IconComponent.render('arrow-right', { size: 14 })}
            </button>
          </div>
          <div class="step-item">
            <div class="step-number">3</div>
            <div class="step-text">Zapisz w historii</div>
            <button class="step-action" data-action="save-history">
              ${IconComponent.render('archive', { size: 14 })}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  static renderScanningInterface(): string {
    return `
      <div class="scanning-interface" id="scanning-interface" style="display: none;">
        <div class="scanning-animation">
          <div class="scan-line"></div>
          <div class="scan-target">
            <div class="target-corners">
              <div class="corner top-left"></div>
              <div class="corner top-right"></div>
              <div class="corner bottom-left"></div>
              <div class="corner bottom-right"></div>
            </div>
          </div>
        </div>
        
        <div class="scanning-status">
          <h3 id="scanning-title">Skanowanie RFID</h3>
          <p id="scanning-instruction">Zbliż kartę RFID do czytnika</p>
          <div class="scanning-progress">
            <div class="progress-dots">
              <div class="dot active"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
          </div>
        </div>

        <div class="scanning-actions">
          <button class="btn-cancel-scan" id="btn-cancel-scan">
            ${IconComponent.render('x', { size: 16 })}
            Anuluj skanowanie
          </button>
        </div>
      </div>
    `;
  }

  static renderManualEntryForm(): string {
    return `
      <div class="manual-entry" id="manual-entry" style="display: none;">
        <div class="entry-header">
          <h2>Wprowadzenie ręczne</h2>
          <p class="entry-description">Wprowadź identyfikator urządzenia lub użytkownika</p>
        </div>

        <div class="entry-form">
          <div class="input-section">
            <label for="manual-input">Identyfikator:</label>
            <div class="input-container">
              <input type="text" id="manual-input" class="manual-input" placeholder="Wprowadź ID...">
              <button class="show-keyboard-btn" id="show-manual-keyboard">
                ${IconComponent.render('keyboard', { size: 16 })}
              </button>
            </div>
          </div>

          <div class="entry-actions">
            <button class="btn-verify" id="btn-verify-manual">
              ${IconComponent.render('search', { size: 16 })}
              Weryfikuj
            </button>
            <button class="btn-clear" id="btn-clear-manual">
              ${IconComponent.render('x', { size: 16 })}
              Wyczyść
            </button>
          </div>
        </div>
      </div>
    `;
  }
}
