// frontend/src/modules/connect-id/connect-id.templates.ts - HTML Templates
import { IconComponent } from '../../components/icon.component';

export class ConnectIdTemplates {
  
  static getMainLayoutTemplate(): string {
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
            ${this.getUsersListTemplate()}
          </div>
        </div>

        <!-- Main Content -->
        <div class="main-content">
          <div class="content-body">
            ${this.getContentTemplates()}
          </div>
        </div>
      </div>
    `;
  }

  private static getUsersListTemplate(): string {
    const users = [
      { id: 'jan.kowalski', name: 'Jan K.', role: 'Manager', fullname: 'Jan Kowalski' },
      { id: 'anna.nowak', name: 'Anna N.', role: 'Technik', fullname: 'Anna Nowak' },
      { id: 'piotr.wisniewski', name: 'Piotr W.', role: 'Operator', fullname: 'Piotr Wiśniewski' },
      { id: 'katarzyna.kowalczyk', name: 'Katarzyna K.', role: 'Administrator', fullname: 'Katarzyna Kowalczyk' },
      { id: 'tomasz.nowicki', name: 'Tomasz N.', role: 'Serwisant', fullname: 'Tomasz Nowicki' }
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

  private static getContentTemplates(): string {
    return `
      <!-- User Login Form -->
      <div id="user-login-content" class="content-section" style="display: none;">
        <div class="login-container">
          <div class="login-header">
            <h2>Logowanie użytkownika</h2>
            <p>Wprowadź hasło aby zalogować się jako:</p>
            <div class="selected-user-info">
              <span id="selected-user-name">-</span>
              <small id="selected-user-role">-</small>
            </div>
          </div>
          
          <div class="password-section">
            <input type="password" id="password-input" placeholder="Hasło..." autocomplete="off">
            <button id="password-submit" class="submit-btn">
              ${IconComponent.render('lock', { size: 16 })}
              Zaloguj
            </button>
          </div>

          <div class="virtual-keyboard-container">
            <div id="virtual-keyboard"></div>
          </div>
        </div>
      </div>

      <!-- RFID Content -->
      <div id="rfid-content" class="content-section active-method">
        <div class="identification-display">
          <div class="rfid-animation">
            <div class="rfid-waves">
              <div class="wave wave-1"></div>
              <div class="wave wave-2"></div>
              <div class="wave wave-3"></div>
            </div>
            <div class="rfid-icon">
              ${IconComponent.render('smartphone', { size: 48 })}
            </div>
          </div>
          <h2>Zbliż kartę RFID</h2>
          <p>Przyłóż kartę do czytnika RFID...</p>
          <div class="status-indicator">
            <span class="status-dot"></span>
            <span>Gotowy do odczytu</span>
          </div>
        </div>
      </div>

      <!-- QR Content -->
      <div id="qr-content" class="content-section" style="display: none;">
        <div class="identification-display">
          <div class="qr-scanner">
            <div class="scanner-frame">
              <div class="scanner-corner top-left"></div>
              <div class="scanner-corner top-right"></div>
              <div class="scanner-corner bottom-left"></div>
              <div class="scanner-corner bottom-right"></div>
              <div class="scanner-line"></div>
            </div>
            <div class="qr-icon">
              ${IconComponent.render('qr-code', { size: 64 })}
            </div>
          </div>
          <h2>Zeskanuj kod QR</h2>
          <p>Skieruj kamerę na kod QR...</p>
          <div class="status-indicator">
            <span class="status-dot"></span>
            <span>Skaner aktywny</span>
          </div>
        </div>
      </div>

      <!-- Barcode Content -->
      <div id="barcode-content" class="content-section" style="display: none;">
        <div class="identification-display">
          <div class="barcode-scanner">
            <div class="scanner-beam"></div>
            <div class="barcode-icon">
              ${IconComponent.render('barcode', { size: 64 })}
            </div>
          </div>
          <h2>Zeskanuj kod kreskowy</h2>
          <p>Skieruj skaner na kod kreskowy...</p>
          <div class="status-indicator">
            <span class="status-dot"></span>
            <span>Skaner gotowy</span>
          </div>
        </div>
      </div>

      <!-- Manual Input Content -->
      <div id="manual-content" class="content-section" style="display: none;">
        <div class="identification-display">
          <div class="manual-input-container">
            <div class="input-icon">
              ${IconComponent.render('edit', { size: 48 })}
            </div>
            <h2>Wprowadź kod ręcznie</h2>
            <div class="manual-input-section">
              <input type="text" id="manual-input" placeholder="Wprowadź kod identyfikacyjny..." autocomplete="off">
              <button id="manual-submit" class="submit-btn">
                ${IconComponent.render('check', { size: 16 })}
                Potwierdź
              </button>
            </div>
            <div class="virtual-keyboard-manual" id="virtual-keyboard-manual">
              <!-- Virtual keyboard will be inserted here -->
            </div>
          </div>
        </div>
      </div>

      <!-- List Content -->
      <div id="list-content" class="content-section" style="display: none;">
        <div class="identification-display">
          <div class="list-container">
            <div class="list-icon">
              ${IconComponent.render('clipboard-check', { size: 48 })}
            </div>
            <h2>Wybierz z listy</h2>
            <p>Wybierz użytkownika z listy w lewej kolumnie</p>
          </div>
        </div>
      </div>
    `;
  }

}
