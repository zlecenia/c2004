// frontend/src/modules/connect-test/connect-test.templates.ts

export class ConnectTestTemplates {
  
  static getMainLayoutTemplate(): string {
    return `
      <div class="compact-layout">
        <!-- Column 1: Sections -->
        <div class="menu-column">
          <h3 class="column-title">Sekcje</h3>
          <button class="section-item active" data-section="identification">
            <span class="menu-icon">🔍</span>
            <span class="menu-label">Identyfikacja</span>
          </button>
          <button class="section-item" data-section="testing">
            <span class="menu-icon">🧪</span>
            <span class="menu-label">Testowanie</span>
          </button>
        </div>

        <!-- Column 2: Methods/Actions -->
        <div class="menu-column">
          <h3 class="column-title">Metody</h3>
          <button class="menu-item active" data-method="rfid">
            <span class="menu-icon">📱</span>
            <span class="menu-label">RFID</span>
          </button>
          <button class="menu-item" data-method="qr">
            <span class="menu-icon">📷</span>
            <span class="menu-label">QR</span>
          </button>
          <button class="menu-item" data-method="barcode">
            <span class="menu-icon">📊</span>
            <span class="menu-label">Barcode</span>
          </button>
          <button class="menu-item" data-method="manual">
            <span class="menu-icon">⌨️</span>
            <span class="menu-label">Manual</span>
          </button>
          <button class="menu-item" data-method="list">
            <span class="menu-icon">📋</span>
            <span class="menu-label">Lista</span>
          </button>
        </div>

        <!-- Main Content -->
        <div class="main-content">
          <div class="content-body">
            ${this.getContentSections()}
          </div>
        </div>
      </div>
    `;
  }

  private static getContentSections(): string {
    return `
      <!-- Identification Section -->
      <div id="identification-section" class="content-section active">
        ${this.getIdentificationContent()}
      </div>

      <!-- Testing Section -->
      <div id="testing-section" class="content-section">
        ${this.getTestingContent()}
      </div>
    `;
  }

  private static getIdentificationContent(): string {
    return `
      <div class="identification-content">
        <!-- RFID Method -->
        <div id="rfid-method" class="method-content active">
          <div class="identification-display">
            <div class="rfid-animation">
              <div class="rfid-waves">
                <div class="wave wave-1"></div>
                <div class="wave wave-2"></div>
                <div class="wave wave-3"></div>
              </div>
              <div class="rfid-icon">📱</div>
            </div>
            <h2>Zbliż kartę RFID</h2>
            <p>Przyłóż kartę do czytnika RFID aby zidentyfikować urządzenie...</p>
            <div class="status-indicator">
              <span class="status-dot"></span>
              <span>Gotowy do odczytu</span>
            </div>
          </div>
        </div>

        <!-- QR Method -->
        <div id="qr-method" class="method-content">
          <div class="identification-display">
            <div class="qr-scanner">
              <div class="scanner-frame">
                <div class="scanner-corner top-left"></div>
                <div class="scanner-corner top-right"></div>
                <div class="scanner-corner bottom-left"></div>
                <div class="scanner-corner bottom-right"></div>
                <div class="scanner-line"></div>
              </div>
              <div class="qr-icon">📷</div>
            </div>
            <h2>Zeskanuj kod QR</h2>
            <p>Skieruj kamerę na kod QR urządzenia...</p>
            <div class="status-indicator">
              <span class="status-dot"></span>
              <span>Skaner aktywny</span>
            </div>
          </div>
        </div>

        <!-- Barcode Method -->
        <div id="barcode-method" class="method-content">
          <div class="identification-display">
            <div class="barcode-scanner">
              <div class="scanner-beam"></div>
              <div class="barcode-icon">📊</div>
            </div>
            <h2>Zeskanuj kod kreskowy</h2>
            <p>Skieruj skaner na kod kreskowy urządzenia...</p>
            <div class="status-indicator">
              <span class="status-dot"></span>
              <span>Skaner gotowy</span>
            </div>
          </div>
        </div>

        <!-- Manual Method -->
        <div id="manual-method" class="method-content">
          <div class="identification-display">
            <div class="manual-input-container">
              <div class="input-icon">⌨️</div>
              <h2>Wprowadź kod ręcznie</h2>
              <div class="manual-input-section">
                <input type="text" id="manual-input" placeholder="Wprowadź numer seryjny urządzenia..." autocomplete="off">
                <button id="manual-submit" class="submit-btn">
                  ✓ Potwierdź
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- List Method -->
        <div id="list-method" class="method-content">
          <div class="device-list-container">
            <div class="list-header">
              <h2>📋 Lista urządzeń</h2>
              <div class="search-box">
                <input type="text" placeholder="Szukaj urządzenia..." id="device-search">
                <button class="search-btn">🔍</button>
              </div>
            </div>
            
            <div class="device-list">
              ${this.getDeviceListItems()}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private static getTestingContent(): string {
    return `
      <!-- Testing Calendar Container -->
      <div class="testing-calendar-container">
        <div class="calendar-header">
          <h2 class="calendar-title">📅 Kalendarz testowania</h2>
          <div class="calendar-nav">
            <button class="nav-btn" id="prev-month">‹ Poprzedni</button>
            <button class="nav-btn" id="next-month">Następny ›</button>
          </div>
        </div>

        <div class="calendar-grid">
          <div class="calendar-days-header">
            <div class="day-header">Pon</div>
            <div class="day-header">Wto</div>
            <div class="day-header">Śro</div>
            <div class="day-header">Czw</div>
            <div class="day-header">Pią</div>
            <div class="day-header">Sob</div>
            <div class="day-header">Nie</div>
          </div>
          <div class="calendar-days" id="calendar-days">
            <!-- Calendar days will be generated dynamically -->
          </div>
        </div>
      </div>

      <!-- Activity Navigation -->
      <div class="activity-navigation">
        <div class="activity-nav-header">
          <h3>🎯 Najbliższe czynności</h3>
          <div class="activity-counter">
            <span id="current-activity">1</span> z <span id="total-activities">3</span>
          </div>
        </div>

        <div class="activity-card">
          <div class="activity-header">
            <div class="activity-icon" id="activity-icon">🔋</div>
            <div class="activity-info">
              <h4 class="activity-title" id="activity-title">Test ciśnienia</h4>
              <p class="activity-time" id="activity-time">PSS-7000 #12345 • 10:00-10:30</p>
            </div>
            <div class="activity-status" id="activity-status">Oczekuje</div>
          </div>

          <div class="progress-bar">
            <div class="progress-fill" id="progress-fill"></div>
          </div>

          <div class="activity-controls">
            <button class="control-btn" id="prev-activity">‹ Poprzednia</button>
            <button class="control-btn primary" id="start-activity">▶️ Rozpocznij</button>
            <button class="control-btn" id="next-activity">Następna ›</button>
          </div>
        </div>

        <div class="queue-list">
          <h4 class="queue-title">📋 Kolejka czynności</h4>
          <div class="queue-item">
            <div class="queue-icon">💨</div>
            <div class="queue-details">
              <p class="queue-activity">Test przepływu</p>
              <p class="queue-device">PSS-5000 #67890</p>
            </div>
            <div class="queue-time">10:30-11:00</div>
          </div>
          <div class="queue-item">
            <div class="queue-icon">🔧</div>
            <div class="queue-details">
              <p class="queue-activity">Konserwacja</p>
              <p class="queue-device">PSS-3000 #11111</p>
            </div>
            <div class="queue-time">11:00-11:30</div>
          </div>
        </div>
      </div>
    `;
  }

  private static getDeviceListItems(): string {
    const devices = [
      { id: 'PSS-7000-12345', name: 'PSS-7000', serial: '#12345', type: 'Pressure Tester', status: 'active' },
      { id: 'PSS-5000-67890', name: 'PSS-5000', serial: '#67890', type: 'Flow Tester', status: 'maintenance' },
      { id: 'PSS-3000-11111', name: 'PSS-3000', serial: '#11111', type: 'Multi Tester', status: 'active' },
      { id: 'REG-001-22222', name: 'REG-001', serial: '#22222', type: 'Regulator', status: 'calibration' },
      { id: 'ZB-002-33333', name: 'ZB-002', serial: '#33333', type: 'Safety Valve', status: 'active' }
    ];

    return devices.map(device => `
      <div class="device-item" data-device-id="${device.id}">
        <div class="device-icon">
          ${this.getDeviceIcon(device.type)}
        </div>
        <div class="device-info">
          <div class="device-name">${device.name}</div>
          <div class="device-serial">${device.serial}</div>
          <div class="device-type">${device.type}</div>
        </div>
        <div class="device-status ${device.status}">
          ${this.getStatusLabel(device.status)}
        </div>
      </div>
    `).join('');
  }

  private static getDeviceIcon(type: string): string {
    const icons = {
      'Pressure Tester': '🔋',
      'Flow Tester': '💨',
      'Multi Tester': '🔧',
      'Regulator': '⚙️',
      'Safety Valve': '🛡️'
    };
    return icons[type as keyof typeof icons] || '📦';
  }

  private static getStatusLabel(status: string): string {
    const labels = {
      'active': '✅ Aktywny',
      'maintenance': '🔧 Konserwacja',
      'calibration': '⚖️ Kalibracja',
      'inactive': '❌ Nieaktywny'
    };
    return labels[status as keyof typeof labels] || status;
  }
}
