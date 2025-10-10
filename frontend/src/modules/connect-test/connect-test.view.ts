import { ConnectTestModule } from './connect-test.module';
import { TestIntervalsComponent } from './test-intervals.component';

export class ConnectTestView {
  private currentSection: string = 'identification';
  private currentMethod: string = 'list';
  private currentScenarioType: string = 'usage';
  private currentTestType: string = '';
  private testIntervalsComponent: TestIntervalsComponent;

  constructor(_module: ConnectTestModule) {
    // module parameter used for future implementations
    this.testIntervalsComponent = new TestIntervalsComponent();
  }

  private updateNavigationURL(): void {
    console.log(`🔧 ConnectTest: Updating URL - section: ${this.currentSection}, method: ${this.currentMethod}, testType: ${this.currentTestType}`);
    
    // Build URL based on current navigation state
    let url = `connect-test`;
    
    if (this.currentSection === 'testing') {
      url += `/${this.currentSection}`;
      if (this.currentScenarioType) {
        url += `/${this.currentScenarioType}`;
      }
    } else {
      url += `/${this.currentSection}`;
      if (this.currentMethod) {
        url += `/${this.currentMethod}`;
      }
      // For identification section, also include test type if search method is selected
      if (this.currentSection === 'identification' && this.currentMethod === 'search' && this.currentTestType) {
        url += `/${this.currentTestType}`;
      }
    }
    
    // Update URL hash (proper SPA routing)
    window.location.hash = `#/${url}`;
    console.log(`🔧 ConnectTest: Updated URL to: ${window.location.hash}`);
    
    console.log(`🔗 Navigation URL updated: ${url}`);
  }

  render(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'connect-test-compact';
    
    // Update top-bar submenu
    const submenu = document.getElementById('top-bar-submenu');
    if (submenu) submenu.textContent = '🧪 Test Module';
    
    // Update top-bar section title
    const sectionTitle = document.getElementById('top-bar-section-title');
    if (sectionTitle) sectionTitle.textContent = 'ConnectTest - Urządzenia';
    
    container.innerHTML = `
      <div class="compact-layout">
       

        <!-- Column 2A: Interface (shown only for Identification) -->
        <div class="menu-column" id="interface-column" style="display: block;">
          <h3 class="column-title">Interfejs</h3>
          <button class="method-item compact" data-method="rfid">
            <span class="menu-icon">📡</span>
            <span class="menu-label">RFID</span>
          </button>
          <button class="method-item compact" data-method="qr">
            <span class="menu-icon">📷</span>
            <span class="menu-label">QR</span>
          </button>
          <button class="method-item compact" data-method="barcode">
            <span class="menu-icon">📊</span>
            <span class="menu-label">Barcode</span>
          </button>
          <button class="method-item compact" data-method="search">
            <span class="menu-icon">🔍</span>
            <span class="menu-label">Szukaj</span>
          </button>
        </div>

        <!-- Column 2B: Test Intervals Component -->
        ${this.testIntervalsComponent.render()}

        <!-- Column 2C: Scenario Types (shown only for Testing) -->
        <div class="menu-column" id="scenario-types-column" style="display: none;">
          <h3 class="column-title">Rodzaj testu</h3>
          <button class="scenario-type-item compact active" data-scenario-type="usage">
            <span class="menu-icon">🔄</span>
            <span class="menu-label">Po użyciu</span>
          </button>
          <button class="scenario-type-item compact" data-scenario-type="6months">
            <span class="menu-icon">📅</span>
            <span class="menu-label">Po 6 miesiącach</span>
          </button>
          <button class="scenario-type-item compact" data-scenario-type="yearly">
            <span class="menu-icon">📆</span>
            <span class="menu-label">Roczny</span>
          </button>
          
        </div>

        <div class="main-content">
          <div class="content-body">
            <!-- Identification Section -->
            <div id="identification-content" class="section-content active">
              
              <!-- RFID Method -->
              <div id="rfid-method" class="method-content">
                <div class="scan-area">
                  <div class="scan-icon">📡</div>
                  <p>Przyłóż kartę RFID do czytnika...</p>
                  <button class="btn-simulate" onclick="alert('Symulacja RFID: #RF123456')">Symuluj skan</button>
                </div>
                <div class="last-scan">
                  <strong>Ostatnie skanowanie:</strong> -
                </div>
              </div>

              <!-- QR Method -->
              <div id="qr-method" class="method-content">
                <div class="scan-area">
                  <div class="scan-icon">📷</div>
                  <p>Zeskanuj kod QR na urządzeniu...</p>
                  <button class="btn-simulate" onclick="alert('Symulacja QR: #QR789012')">Symuluj skan</button>
                </div>
                <div class="last-scan">
                  <strong>Ostatnie skanowanie:</strong> -
                </div>
              </div>

              <!-- Barcode Method -->
              <div id="barcode-method" class="method-content">
                <div class="scan-area">
                  <div class="scan-icon">📊</div>
                  <p>Zeskanuj kod kreskowy...</p>
                  <button class="btn-simulate" onclick="alert('Symulacja Barcode: #BC345678')">Symuluj skan</button>
                </div>
                <div class="last-scan">
                  <strong>Ostatnie skanowanie:</strong> -
                </div>
              </div>

              <!-- Search Method -->
              <div id="search-method" class="method-content">
                <div class="search-table-container">
                  <div class="search-header">
                    <h4>🔍 Wyszukaj urządzenie</h4>
                    <input type="text" class="search-input" placeholder="Wyszukaj urządzenie, typ, klienta..." />
                  </div>
                  <div class="device-search-table">
                    <table class="search-table">
                      <thead>
                        <tr>
                          <th>Urządzenie</th>
                          <th>Typ</th>
                          <th>Rodzaj</th>
                          <th>Klient</th>
                          <th>Status</th>
                          <th>Akcje</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="device-row" data-device-id="PSS-7000-12345">
                          <td>PSS-7000 #12345</td>
                          <td>Pompa próżniowa</td>
                          <td>Wysoka wydajność</td>
                          <td>Zakład A</td>
                          <td><span class="status-active">Aktywny</span></td>
                          <td><button class="btn-select-device-row">Wybierz</button></td>
                        </tr>
                        <tr class="device-row" data-device-id="PSS-5000-67890">
                          <td>PSS-5000 #67890</td>
                          <td>Pompa próżniowa</td>
                          <td>Średnia wydajność</td>
                          <td>Zakład B</td>
                          <td><span class="status-maintenance">Serwis</span></td>
                          <td><button class="btn-select-device-row">Wybierz</button></td>
                        </tr>
                        <tr class="device-row" data-device-id="PSS-3000-11111">
                          <td>PSS-3000 #11111</td>
                          <td>Pompa próżniowa</td>
                          <td>Niska wydajność</td>
                          <td>Zakład C</td>
                          <td><span class="status-active">Aktywny</span></td>
                          <td><button class="btn-select-device-row">Wybierz</button></td>
                        </tr>
                        <tr class="device-row" data-device-id="VAC-2000-22222">
                          <td>VAC-2000 #22222</td>
                          <td>Pompa rotacyjna</td>
                          <td>Przemysłowa</td>
                          <td>Zakład A</td>
                          <td><span class="status-active">Aktywny</span></td>
                          <td><button class="btn-select-device-row">Wybierz</button></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <!-- List Method -->
              <div id="list-method" class="method-content active">
                <div class="device-list-select">
                  <h4>Wybierz urządzenie z listy:</h4>
                  <div class="device-card selectable">
                    <div class="device-icon">📱</div>
                    <div class="device-info">
                      <div class="device-name">PSS-7000 #12345</div>
                      <div class="device-meta">RFID: RF123456</div>
                    </div>
                    <button class="btn-select-device">Wybierz</button>
                  </div>
                  <div class="device-card selectable">
                    <div class="device-icon">📱</div>
                    <div class="device-info">
                      <div class="device-name">PSS-5000 #67890</div>
                      <div class="device-meta">RFID: RF789012</div>
                    </div>
                    <button class="btn-select-device">Wybierz</button>
                  </div>
                  <div class="device-card selectable">
                    <div class="device-icon">📱</div>
                    <div class="device-info">
                      <div class="device-name">PSS-3000 #11111</div>
                      <div class="device-meta">RFID: RF111111</div>
                    </div>
                    <button class="btn-select-device">Wybierz</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Testing Section -->
            <div id="testing-content" class="section-content">
              <!-- Calendar View for Testing Activities -->
              <div class="testing-calendar-container">
                <!-- Calendar Header -->
                <div class="calendar-header">
                  <button class="btn-calendar-nav" id="prev-month">‹</button>
                  <h3 class="calendar-title" id="current-month">Październik 2024</h3>
                  <button class="btn-calendar-nav" id="next-month">›</button>
                </div>
                
                <!-- Calendar Grid -->
                <div class="calendar-grid">
                  <div class="calendar-weekdays">
                    <div class="weekday">Pn</div>
                    <div class="weekday">Wt</div>
                    <div class="weekday">Śr</div>
                    <div class="weekday">Cz</div>
                    <div class="weekday">Pt</div>
                    <div class="weekday">Sb</div>
                    <div class="weekday">Nd</div>
                  </div>
                  <div class="calendar-days" id="calendar-days">
                    <!-- Days will be populated dynamically -->
                  </div>
                </div>
                
                <!-- Activity Navigation -->
                <div class="activity-navigation">
                  <div class="current-activity">
                    <div class="activity-header">
                      <h4>📅 Dzisiejsze Czynności</h4>
                      <div class="activity-counter">
                        <span class="current-activity-num">1</span> z <span class="total-activities">3</span>
                      </div>
                    </div>
                    
                    <div class="activity-card active" id="current-activity-card">
                      <div class="activity-icon">🔋</div>
                      <div class="activity-details">
                        <div class="activity-title">Test ciśnienia - PSS-7000 #12345</div>
                        <div class="activity-time">10:00 - 10:30</div>
                        <div class="activity-status status-pending">Oczekuje</div>
                      </div>
                      <div class="activity-progress">
                        <div class="progress-bar">
                          <div class="progress-fill" style="width: 0%"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div class="activity-controls">
                      <button class="btn-activity-nav" id="prev-activity">‹ Poprzednia</button>
                      <button class="btn-start-activity">▶️ Rozpocznij</button>
                      <button class="btn-activity-nav" id="next-activity">Następna ›</button>
                    </div>
                  </div>
                  
                  <!-- Quick Activity List -->
                  <div class="activity-queue">
                    <h5>Kolejne czynności:</h5>
                    <div class="queue-item">
                      <span class="queue-time">10:30</span>
                      <span class="queue-activity">💨 Test przepływu</span>
                      <span class="queue-device">PSS-5000 #67890</span>
                    </div>
                    <div class="queue-item">
                      <span class="queue-time">11:00</span>
                      <span class="queue-activity">🔧 Konserwacja</span>
                      <span class="queue-device">PSS-3000 #11111</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

              <!-- Flow Test Protocol -->
              <div id="flow-test-protocol" class="protocol-content">
                <div class="protocol-form">
                  <h4>💨 Test przepływu</h4>
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
                      <label>Przepływ docelowy [l/min]:</label>
                      <input type="number" class="form-input" value="40" min="1" max="100" />
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Temperatura [°C]:</label>
                      <input type="number" class="form-input" value="20" min="0" max="100" />
                    </div>
                    <div class="form-group">
                      <label>Wilgotność [%]:</label>
                      <input type="number" class="form-input" value="45" min="0" max="100" />
                    </div>
                  </div>
                  <div class="test-status">Status: <span class="status-ready">Gotowy do testu</span></div>
                  <button class="btn-start-test">▶️ Rozpocznij Test Przepływu</button>
                </div>
              </div>

              <!-- Function Test Protocol -->
              <div id="function-test-protocol" class="protocol-content">
                <div class="protocol-form">
                  <h4>⚙️ Test funkcjonalny</h4>
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
                      <label>Typ testu funkcjonalnego:</label>
                      <select class="form-select">
                        <option>Test startów/zatrzymań</option>
                        <option>Test automatyki</option>
                        <option>Test zabezpieczeń</option>
                        <option>Test komunikacji</option>
                      </select>
                    </div>
                  </div>
                  <div class="function-checklist">
                    <h5>Lista kontrolna funkcji:</h5>
                    <label><input type="checkbox"> Start/Stop normalny</label>
                    <label><input type="checkbox"> Start/Stop awaryjny</label>
                    <label><input type="checkbox"> Sygnalizacja LED</label>
                    <label><input type="checkbox"> Komunikacja sieciowa</label>
                  </div>
                  <button class="btn-start-test">▶️ Rozpocznij Test Funkcjonalny</button>
                </div>
              </div>

              <!-- Visual Inspection Protocol -->
              <div id="visual-inspection-protocol" class="protocol-content">
                <div class="protocol-form">
                  <h4>👁️ Kontrola wizualna</h4>
                  <div class="form-group">
                    <label>Urządzenie:</label>
                    <select class="form-select">
                      <option>PSS-7000 #12345</option>
                      <option>PSS-5000 #67890</option>
                      <option>PSS-3000 #11111</option>
                    </select>
                  </div>
                  <div class="inspection-checklist">
                    <h5>Kontrola zewnętrzna:</h5>
                    <label><input type="checkbox"> Stan obudowy</label>
                    <label><input type="checkbox"> Połączenia elektryczne</label>
                    <label><input type="checkbox"> Połączenia mechaniczne</label>
                    <label><input type="checkbox"> Oznaczenia i tabliczki</label>
                    <label><input type="checkbox"> Czystość urządzenia</label>
                    
                    <h5>Kontrola wewnętrzna:</h5>
                    <label><input type="checkbox"> Stan komponentów</label>
                    <label><input type="checkbox"> Zużycie części</label>
                    <label><input type="checkbox"> Luzy mechaniczne</label>
                  </div>
                  <div class="form-group">
                    <label>Uwagi z kontroli:</label>
                    <textarea class="form-textarea" rows="3" placeholder="Opisz zauważone nieprawidłowości..."></textarea>
                  </div>
                  <button class="btn-submit-protocol">✅ Zakończ Kontrolę</button>
                </div>
              </div>

              <!-- Maintenance Protocol -->
              <div id="maintenance-protocol" class="protocol-content">
                <div class="protocol-form">
                  <h4>🔧 Konserwacja</h4>
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
                      <label>Typ konserwacji:</label>
                      <select class="form-select">
                        <option>Konserwacja planowa</option>
                        <option>Konserwacja prewencyjna</option>
                        <option>Naprawa awaryjna</option>
                      </select>
                    </div>
                  </div>
                  <div class="maintenance-checklist">
                    <h5>Czynności konserwacyjne:</h5>
                    <label><input type="checkbox"> Wymiana oleju</label>
                    <label><input type="checkbox"> Wymiana filtrów</label>
                    <label><input type="checkbox"> Czyszczenie komponentów</label>
                    <label><input type="checkbox"> Sprawdzenie połączeń</label>
                    <label><input type="checkbox"> Kalibracja czujników</label>
                  </div>
                  <div class="form-group">
                    <label>Opis wykonanych prac:</label>
                    <textarea class="form-textarea" rows="4" placeholder="Opisz wykonane czynności konserwacyjne..."></textarea>
                  </div>
                  <button class="btn-submit-protocol">💾 Zapisz Protokół Konserwacji</button>
                </div>
              </div>

              <!-- Calibration Protocol -->
              <div id="calibration-protocol" class="protocol-content">
                <div class="protocol-form">
                  <h4>📏 Kalibracja</h4>
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
                      <label>Komponent do kalibracji:</label>
                      <select class="form-select">
                        <option>Czujnik ciśnienia</option>
                        <option>Czujnik przepływu</option>
                        <option>Czujnik temperatury</option>
                        <option>Wszystkie czujniki</option>
                      </select>
                    </div>
                  </div>
                  <div class="calibration-values">
                    <h5>Wartości kalibracji:</h5>
                    <div class="form-row">
                      <div class="form-group">
                        <label>Wartość referencyjna:</label>
                        <input type="number" class="form-input" placeholder="0.00" step="0.01" />
                      </div>
                      <div class="form-group">
                        <label>Wartość zmierzona:</label>
                        <input type="number" class="form-input" placeholder="0.00" step="0.01" />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group">
                        <label>Odchyłka [%]:</label>
                        <input type="number" class="form-input" placeholder="0.00" step="0.01" readonly />
                      </div>
                      <div class="form-group">
                        <label>Status:</label>
                        <span class="calibration-status">Oczekuje pomiaru</span>
                      </div>
                    </div>
                  </div>
                  <button class="btn-start-calibration">📏 Rozpocznij Kalibrację</button>
                </div>
              </div>

              <!-- Service Protocol -->
              <div id="service-protocol" class="protocol-content">
                <div class="protocol-form">
                  <h4>🔧 Protokół Serwisu</h4>
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
                      <label>Komponent:</label>
                      <select class="form-select">
                        <option>Pompa główna</option>
                        <option>Zawór bezpieczeństwa</option>
                        <option>Czujnik ciśnienia</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <label>Opis czynności serwisowych:</label>
                    <textarea class="form-textarea" rows="4" placeholder="Opisz wykonane czynności..."></textarea>
                  </div>
                  <button class="btn-submit-protocol">💾 Zapisz Protokół Serwisu</button>
                </div>
              </div>

              <!-- Scenario C20 Protocol -->
              <div id="scenario-c20-protocol" class="protocol-content">
                <div class="protocol-form">
                  <h4>🧪 Protokół Scenariusz C20</h4>
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
                      <label>Scenariusz:</label>
                      <select class="form-select">
                        <option>Test ciśnienia wysokiego</option>
                        <option>Test przepływu</option>
                        <option>Test szczelności</option>
                      </select>
                    </div>
                  </div>
                  <div class="test-progress">
                    <div class="progress-header">
                      <span>Postęp testu C20...</span>
                      <span id="c20-progress-percent">0%</span>
                    </div>
                    <div class="progress-bar">
                      <div class="progress-fill" style="width: 0%"></div>
                    </div>
                  </div>
                  <button class="btn-start-c20">▶️ Rozpocznij Test C20</button>
                </div>
              </div>

              <!-- Notes Protocol -->
              <div id="notes-protocol" class="protocol-content">
                <div class="protocol-form">
                  <h4>📝 Protokół Uwag</h4>
                  <div class="form-group">
                    <label>Urządzenie:</label>
                    <select class="form-select">
                      <option>PSS-7000 #12345</option>
                      <option>PSS-5000 #67890</option>
                      <option>PSS-3000 #11111</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Uwagi i obserwacje:</label>
                    <textarea class="form-textarea" rows="6" placeholder="Wprowadź uwagi, obserwacje, zalecenia..."></textarea>
                  </div>
                  <button class="btn-submit-protocol">📝 Zapisz Uwagi</button>
                </div>
              </div>

              <!-- Create Report Protocol -->
              <div id="create-report-protocol" class="protocol-content">
                <div class="protocol-form">
                  <h4>📋 Stwórz Raport</h4>
                  <div class="form-group">
                    <label>Użytkownik odpowiedzialny:</label>
                    <select class="form-select">
                      <option>Jan Kowalski (Technik)</option>
                      <option>Anna Nowak (Manager)</option>
                      <option>Piotr Wiśniewski (Operator)</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Typ raportu:</label>
                    <select class="form-select">
                      <option>Raport okresowy</option>
                      <option>Raport serwisowy</option>
                      <option>Raport testowy</option>
                      <option>Raport awarii</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Podsumowanie:</label>
                    <textarea class="form-textarea" rows="4" placeholder="Krótkie podsumowanie raportu..."></textarea>
                  </div>
                  <button class="btn-generate-report">📊 Generuj Raport</button>
                </div>
              </div>
            </div>

            <!-- Reports Section -->
            <div id="reports-content" class="section-content">
              <div class="reports-list">
                <div class="report-card">
                  <div class="report-header">
                    <span class="report-date">2025-10-08 17:30</span>
                    <span class="report-status success">✅ Pozytywny</span>
                  </div>
                  <div class="report-device">PSS-7000 #12345</div>
                  <div class="report-tests">3 testy: Szczelność, Przepływ, Funkcjonalny</div>
                  <button class="btn-view-report">Pokaż szczegóły</button>
                </div>
                <div class="report-card">
                  <div class="report-header">
                    <span class="report-date">2025-10-08 16:15</span>
                    <span class="report-status error">❌ Negatywny</span>
                  </div>
                  <div class="report-device">PSS-5000 #67890</div>
                  <div class="report-tests">Test szczelności: Błąd</div>
                  <button class="btn-view-report">Pokaż szczegóły</button>
                </div>
              </div>
            </div>

            <!-- Debug Section -->
            <div id="debug-content" class="section-content">
              <div class="debug-console">
                <div class="console-output">
                  <div class="log-entry info">[18:15:00] System initialized</div>
                  <div class="log-entry success">[18:15:01] ✓ RFID reader connected</div>
                  <div class="log-entry success">[18:15:02] ✓ Database connected</div>
                  <div class="log-entry info">[18:15:03] Waiting for device...</div>
                </div>
                <div class="console-actions">
                  <button class="btn-console">Clear Console</button>
                  <button class="btn-console">Export Logs</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="right-panel">
          <!-- Identification Parameters -->
          <div id="identification-params" class="params-section">
            <h3 class="params-title">Status</h3>
            <div class="param-item">
              <span class="param-label">Aktywna sekcja:</span>
              <span class="param-value" id="active-section">Urządzenia</span>
            </div>
            <div class="param-item">
              <span class="param-label">Metoda:</span>
              <span class="param-value" id="active-method">Z listy</span>
            </div>
          </div>

          <!-- Testing Sensors -->
          <div id="testing-sensors" class="params-section" style="display: none;">
            <h3 class="params-title">Sensory Ciśnienia</h3>
            <div class="sensor-item low-pressure">
              <div class="sensor-icon">🔴</div>
              <div class="sensor-info">
                <span class="sensor-label">Ciśnienie Niskie</span>
                <span class="sensor-value" id="pressure-low">125.4 mbar</span>
                <span class="sensor-status">Normalny</span>
              </div>
            </div>
            <div class="sensor-item medium-pressure">
              <div class="sensor-icon">🟡</div>
              <div class="sensor-info">
                <span class="sensor-label">Ciśnienie Średnie</span>
                <span class="sensor-value" id="pressure-medium">298.7 mbar</span>
                <span class="sensor-status">Aktywny</span>
              </div>
            </div>
            <div class="sensor-item high-pressure">
              <div class="sensor-icon">🟢</div>
              <div class="sensor-info">
                <span class="sensor-label">Ciśnienie Wysokie</span>
                <span class="sensor-value" id="pressure-high">487.2 mbar</span>
                <span class="sensor-status">Ostrzeżenie</span>
              </div>
            </div>
            
            <h3 class="params-title">Status Urządzenia</h3>
            <div class="param-item">
              <span class="param-label">Typ urządzenia:</span>
              <span class="param-value" id="device-type">PSS-7000</span>
            </div>
            <div class="param-item">
              <span class="param-label">Serial:</span>
              <span class="param-value" id="device-serial">#12345</span>
            </div>
            <div class="param-item">
              <span class="param-label">Status:</span>
              <span class="param-value status-active" id="device-status">Aktywny</span>
            </div>
            <div class="param-item">
              <span class="param-label">Ostatni test:</span>
              <span class="param-value" id="last-test">2025-10-08 17:30</span>
            </div>
            <div class="param-item">
              <span class="param-label">Protokół:</span>
              <span class="param-value" id="active-protocol">Test ciśnienia</span>
            </div>
          </div>

          
        </div>
      </div>
    `;

    this.addStyles();
    this.setupEventListeners(container);
    return container;
  }

  private addStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      .connect-test-compact { height: 100%; overflow: hidden; }
      .compact-layout { display: flex; height: 365px; background: #f5f5f5; }
      .menu-column { width: 100px; background: #2a2a2a; padding: 6px 4px; overflow-y: auto; flex-shrink: 0; border-right: 1px solid #1a1a1a; }
      .column-title { color: #FFF; font-size: 9px; font-weight: 600; text-transform: uppercase; margin: 0 0 6px 0; padding: 4px; text-align: center; background: #1a1a1a; border-radius: 3px; }
      .menu-item { width: 100%; background: #3a3a3a; border: none; padding: 3px 4px; margin-bottom: 4px; border-radius: 5px; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 4px; transition: all 0.2s; color: #ccc; }
      .menu-icon { font-size: 18px; }
      .menu-label { font-size: 12px; font-weight: 500; text-align: center; }
      .menu-item:hover { background: #4a4a4a; color: white; }
      .menu-item.active { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
      .main-content { flex: 1; display: flex; flex-direction: column; background: white; overflow: hidden; }
      .content-body { flex: 1; padding: 15px; overflow-y: auto; }
      .right-panel { width: 200px; background: #2a2a2a; padding: 10px; overflow-y: auto; flex-shrink: 0; }
      .params-section { margin-bottom: 15px; }
      .params-title { color: #999; font-size: 11px; font-weight: 600; text-transform: uppercase; margin: 0 0 8px 0; }
      .param-item { background: #3a3a3a; padding: 8px; margin-bottom: 6px; border-radius: 4px; display: flex; flex-direction: column; gap: 4px; }
      .param-label { font-size: 10px; color: #999; }
      .param-value { font-size: 13px; color: #fff; font-weight: 600; }

      /* Section Content */
      .section-content { display: none; }
      .section-content.active { display: block; }
      .section-content h3 { margin: 0 0 15px 0; font-size: 14px; color: #333; }

      /* Method Content */
      .method-content { display: none; }
      .method-content.active { display: block; }
      
      /* Method Items - Compact */
      .method-item.compact { 
        width: 100%; 
        padding: 2px 4px; 
        background: #3a3a3a; 
        border: none; 
        color: #ccc; 
        cursor: pointer; 
        display: flex; 
        flex-direction: column; 
        align-items: center; 
        gap: 2px; 
        border-radius: 3px; 
        margin-bottom: 2px; 
        transition: all 0.2s; 
        min-height: 32px;
      }
      .method-item.compact:hover { background: #4a4a4a; color: white; }
      .method-item.compact.active { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
      .method-item.compact .menu-icon { font-size: 14px; }
      .method-item.compact .menu-label { font-size: 9px; font-weight: 600; text-align: center; line-height: 1.1; }

      /* Scenario Type Items - Compact */
      .scenario-type-item.compact { 
        width: 100%; 
        padding: 2px 4px; 
        background: #3a3a3a; 
        border: none; 
        color: #ccc; 
        cursor: pointer; 
        display: flex; 
        flex-direction: column; 
        align-items: center; 
        gap: 2px; 
        border-radius: 3px; 
        margin-bottom: 2px; 
        transition: all 0.2s; 
        min-height: 32px;
      }
      .scenario-type-item.compact:hover { background: #4a4a4a; color: white; }
      .scenario-type-item.compact.active { background: linear-gradient(135deg, #dc3545 0%, #c82333 100%); color: white; }
      .scenario-type-item.compact .menu-icon { font-size: 14px; }
      .scenario-type-item.compact .menu-label { font-size: 9px; font-weight: 600; text-align: center; line-height: 1.1; }
      
      /* Component Styles */
      ${this.testIntervalsComponent.getStyles()}

      /* Test Form */
      .test-form { background: #f8f9fa; padding: 15px; border-radius: 5px; }
      .form-group { margin-bottom: 15px; }
      .form-group label { display: block; margin-bottom: 5px; font-size: 11px; font-weight: 600; color: #666; }
      .form-select { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 12px; }
      .scan-area { text-align: center; padding: 30px; background: white; border: 2px dashed #ddd; border-radius: 5px; }
      .scan-icon { font-size: 48px; margin-bottom: 10px; }
      .scan-area p { margin: 0 0 15px 0; color: #666; font-size: 12px; }
      .btn-simulate { padding: 8px 16px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px; }
      .last-scan { margin-top: 15px; padding: 10px; background: #f8f9fa; border-radius: 4px; font-size: 11px; }
      
      /* Manual Input */
      .manual-input-area { background: #f8f9fa; padding: 20px; border-radius: 5px; }
      .manual-input-area label { display: block; margin-bottom: 10px; font-size: 12px; font-weight: 600; color: #333; }
      .manual-input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 12px; margin-bottom: 10px; }
      .btn-submit-manual { width: 100%; padding: 10px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: 600; }
      
      /* Device List Select */
      .device-list-select h4 { margin: 0 0 15px 0; font-size: 13px; color: #333; }
      .device-card.selectable { cursor: pointer; transition: all 0.2s; }
      .device-card.selectable:hover { border-color: #667eea; box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2); }
      .device-meta { font-size: 10px; color: #999; margin-top: 2px; }
      .btn-select-device { padding: 6px 12px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px; }

      /* Device List */
      .device-list { display: flex; flex-direction: column; gap: 10px; }
      .device-card { display: flex; align-items: center; gap: 12px; background: white; border: 1px solid #e0e0e0; border-radius: 6px; padding: 12px; }
      .device-icon { font-size: 32px; }
      .device-info { flex: 1; }
      .device-name { font-weight: 600; font-size: 12px; margin-bottom: 4px; }
      .device-status { font-size: 11px; color: #4caf50; }
      .btn-select { padding: 6px 12px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px; }

      /* Testing Section */
      .test-progress { background: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 15px; }
      .progress-header { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 12px; font-weight: 600; }
      .progress-bar { height: 8px; background: #e0e0e0; border-radius: 4px; overflow: hidden; }
      .progress-fill { height: 100%; background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); transition: width 0.3s; }
      .test-steps { margin-bottom: 15px; }
      .test-step { display: flex; align-items: center; gap: 10px; padding: 10px; background: white; border: 1px solid #e0e0e0; border-radius: 4px; margin-bottom: 8px; }
      .step-icon { font-size: 18px; }
      .step-name { flex: 1; font-size: 11px; font-weight: 500; }
      .step-status { font-size: 11px; color: #666; }
      .btn-start-test { width: 100%; padding: 10px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 12px; font-weight: 600; }

      /* Reports */
      .reports-list { display: flex; flex-direction: column; gap: 10px; }
      .report-card { background: white; border: 1px solid #e0e0e0; border-radius: 6px; padding: 12px; }
      .report-header { display: flex; justify-content: space-between; margin-bottom: 8px; }
      .report-date { font-size: 11px; color: #666; }
      .report-status { font-size: 11px; padding: 3px 8px; border-radius: 10px; }
      .report-status.success { background: #d1e7dd; color: #0f5132; }
      .report-status.error { background: #f8d7da; color: #842029; }
      .report-device { font-weight: 600; font-size: 12px; margin-bottom: 4px; }
      .report-tests { font-size: 11px; color: #666; margin-bottom: 10px; }
      .btn-view-report { padding: 6px 12px; background: #e0e0e0; border: none; border-radius: 4px; cursor: pointer; font-size: 11px; }

      /* Debug Console */
      .debug-console { background: #1e1e1e; border-radius: 5px; padding: 10px; }
      .console-output { background: #000; color: #0f0; font-family: 'Courier New', monospace; font-size: 10px; padding: 10px; border-radius: 4px; max-height: 200px; overflow-y: auto; margin-bottom: 10px; }
      .log-entry { margin-bottom: 4px; }
      .log-entry.info { color: #00bfff; }
      .log-entry.success { color: #0f0; }
      .log-entry.error { color: #f00; }
      .console-actions { display: flex; gap: 8px; }
      .btn-console { flex: 1; padding: 6px; background: #333; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px; }

      /* Protocol Content */
      .protocol-content { display: none; }
      .protocol-content.active { display: block; }
      .protocol-form { background: #f8f9fa; padding: 20px; border-radius: 8px; }
      .protocol-form h4 { margin: 0 0 20px 0; font-size: 14px; color: #333; font-weight: 600; }
      .form-row { display: flex; gap: 15px; margin-bottom: 15px; }
      .form-row .form-group { flex: 1; }
      .form-textarea { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 12px; font-family: inherit; resize: vertical; }
      .btn-submit-protocol, .btn-start-c20, .btn-generate-report, .btn-start-test, .btn-start-calibration { width: 100%; padding: 12px; background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600; margin-top: 10px; }
      
      /* Test Status Styles */
      .test-status { margin: 10px 0; font-weight: 600; }
      .status-ready { color: #28a745; }
      .status-running { color: #ffc107; }
      .status-complete { color: #17a2b8; }
      
      /* Checklists */
      .function-checklist, .inspection-checklist, .maintenance-checklist { margin: 15px 0; }
      .function-checklist h5, .inspection-checklist h5, .maintenance-checklist h5 { margin: 10px 0 8px 0; font-size: 12px; color: #666; font-weight: 600; }
      .function-checklist label, .inspection-checklist label, .maintenance-checklist label { display: block; margin: 5px 0; font-size: 11px; cursor: pointer; }
      .function-checklist input, .inspection-checklist input, .maintenance-checklist input { margin-right: 8px; }
      
      /* Calibration Values */
      .calibration-values { margin: 15px 0; }
      .calibration-status { font-weight: 600; color: #666; }

      /* Sensors */
      .sensor-item { display: flex; align-items: center; gap: 10px; background: #3a3a3a; padding: 10px; margin-bottom: 8px; border-radius: 6px; }
      .sensor-icon { font-size: 20px; }
      .sensor-info { flex: 1; }
      .sensor-label { display: block; font-size: 10px; color: #999; margin-bottom: 2px; }
      .sensor-value { display: block; font-size: 14px; color: #fff; font-weight: 600; margin-bottom: 2px; }
      .sensor-status { display: block; font-size: 9px; color: #bbb; }
      .low-pressure { border-left: 3px solid #dc3545; }
      .medium-pressure { border-left: 3px solid #ffc107; }
      .high-pressure { border-left: 3px solid #28a745; }
      .status-active { color: #28a745; }
      .status-warning { color: #ffc107; }
      .status-error { color: #dc3545; }
    `;
    document.head.appendChild(style);
  }

  private setupEventListeners(container: HTMLElement): void {
    // Section buttons
    const menuItems = container.querySelectorAll('[data-section]');
    menuItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const section = target.getAttribute('data-section');
        if (section) this.switchSection(section, container);
      });
    });

    // Method buttons (for Identification)
    const methodItems = container.querySelectorAll('[data-method]');
    methodItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const method = target.getAttribute('data-method');
        if (method) this.switchMethod(method, container);
      });
    });

    // Scenario type buttons (for Testing)
    const scenarioTypeItems = container.querySelectorAll('[data-scenario-type]');
    scenarioTypeItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const scenarioType = target.getAttribute('data-scenario-type');
        if (scenarioType) this.switchScenarioType(scenarioType, container);
      });
    });

    // Setup test intervals component event listeners
    this.testIntervalsComponent.setupEventListeners(container, this.switchTestType.bind(this));

    // Initialize default section state
    this.switchSection(this.currentSection, container);
    
    // Start pressure simulation for testing section
    this.startPressureSimulation();
  }

  private switchSection(section: string, container: HTMLElement): void {
    this.currentSection = section;

    // Update menu active state
    container.querySelectorAll('[data-section]').forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-section') === section) item.classList.add('active');
    });

    // Hide all sections
    container.querySelectorAll('.section-content').forEach(content => {
      content.classList.remove('active');
    });

    // Show selected section
    const activeContent = container.querySelector(`#${section}-content`);
    if (activeContent) {
      activeContent.classList.add('active');
    }

    // Show/hide columns based on section
    const interfaceColumn = container.querySelector('#interface-column') as HTMLElement;
    const scenarioTypesColumn = container.querySelector('#scenario-types-column') as HTMLElement;
    
    if (interfaceColumn && scenarioTypesColumn) {
      if (section === 'identification') {
        interfaceColumn.style.display = 'block';
        scenarioTypesColumn.style.display = 'none';
      } else if (section === 'testing') {
        interfaceColumn.style.display = 'none';
        scenarioTypesColumn.style.display = 'block';
      } else {
        interfaceColumn.style.display = 'none';
        scenarioTypesColumn.style.display = 'none';
      }
    }

    // Show/hide right panel sections
    const identificationParams = container.querySelector('#identification-params') as HTMLElement;
    const testingSensors = container.querySelector('#testing-sensors') as HTMLElement;  
    const reportsParams = container.querySelector('#reports-params') as HTMLElement;

    if (identificationParams && testingSensors && reportsParams) {
      identificationParams.style.display = section === 'identification' ? 'block' : 'none';
      testingSensors.style.display = section === 'testing' ? 'block' : 'none';
      reportsParams.style.display = section === 'reports' ? 'block' : 'none';
    }

    const titles: any = {
      'identification': 'Urządzenia',
      'testing': 'Testowanie',
      'reports': 'Raporty Urządzeń'
    };

    // Update title in top-bar
    const topBarTitle = document.getElementById('top-bar-section-title');
    if (topBarTitle) topBarTitle.textContent = `ConnectTest - ${titles[section]}`;

    // Update params
    const activeSection = container.querySelector('#active-section');
    if (activeSection) activeSection.textContent = titles[section];
    
    // Update navigation URL
    this.updateNavigationURL();
  }

  private switchMethod(method: string, container: HTMLElement): void {
    this.currentMethod = method;

    // Update method menu active state
    container.querySelectorAll('[data-method]').forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-method') === method) item.classList.add('active');
    });

    // Hide all method contents
    container.querySelectorAll('.method-content').forEach(content => {
      content.classList.remove('active');
    });

    // Show selected method
    const activeMethod = container.querySelector(`#${method}-method`);
    if (activeMethod) {
      activeMethod.classList.add('active');
    }

    // Show/Hide test types column based on method using component
    if (method === 'search') {
      this.testIntervalsComponent.show();
    } else {
      this.testIntervalsComponent.hide();
      this.currentTestType = ''; // Reset test type when not in search mode
    }

    // Update top-bar
    const methodTitles: any = {
      'rfid': 'RFID',
      'qr': 'QR Code', 
      'barcode': 'Barcode',
      'search': 'Szukaj',
      'manual': 'Keyboard',
      'list': 'Z listy'
    };

    const topBarTitle = document.getElementById('top-bar-section-title');
    if (topBarTitle) topBarTitle.textContent = `ConnectTest - Urządzenia - ${methodTitles[method]}`;

    // Update params
    const activeMethodParam = container.querySelector('#active-method');
    if (activeMethodParam) activeMethodParam.textContent = methodTitles[method];
    
    // Update navigation URL
    this.updateNavigationURL();
  }

  private switchTestType(testType: string, container: HTMLElement): void {
    this.currentTestType = testType;

    // Update test type menu active state using component
    this.testIntervalsComponent.setActive(testType);

    // Update top-bar title using component data
    const testTypeTitles = this.testIntervalsComponent.getTestTypeTitles();
    const topBarTitle = document.getElementById('top-bar-section-title');
    if (topBarTitle) {
      topBarTitle.textContent = `ConnectTest - Urządzenia - Szukaj - ${testTypeTitles[testType]}`;
    }

    // Update navigation URL
    this.updateNavigationURL();
  }

  private switchScenarioType(scenarioType: string, container: HTMLElement): void {
    this.currentScenarioType = scenarioType;

    // Update scenario type menu active state
    container.querySelectorAll('[data-scenario-type]').forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-scenario-type') === scenarioType) item.classList.add('active');
    });


    this.updateTestingTopBar();
    
    // Update navigation URL
    this.updateNavigationURL();
  }


  private updateTestingTopBar(): void {
    const scenarioTypeTitles: any = {
      'usage': 'Po użyciu',
      '6months': 'Po 6 miesiącach',
      'yearly': 'Roczny',
      'emergency': 'Awaryjny',
      'preventive': 'Prewencyjny'
    };

    const topBarTitle = document.getElementById('top-bar-section-title');
    if (topBarTitle) {
      topBarTitle.textContent = `ConnectTest - Testowanie - ${scenarioTypeTitles[this.currentScenarioType]}`;
    }
  }

  private startPressureSimulation(): void {
    setInterval(() => {
      // Simulate real-time pressure readings
      const lowPressure = (Math.random() * 100 + 50).toFixed(1);
      const mediumPressure = (Math.random() * 500 + 200).toFixed(1);
      const highPressure = (Math.random() * 1000 + 800).toFixed(1);

      const lowElement = document.getElementById('pressure-low');
      const mediumElement = document.getElementById('pressure-medium');
      const highElement = document.getElementById('pressure-high');

      if (lowElement) lowElement.textContent = `${lowPressure} mbar`;
      if (mediumElement) mediumElement.textContent = `${mediumPressure} mbar`;
      if (highElement) highElement.textContent = `${highPressure} mbar`;
    }, 2000);
  }

  // Public method for URL routing support
  public setInitialState(section: string, method: string = '', testType: string = '', scenarioType: string = ''): void {
    console.log(`🔧 ConnectTest: Setting initial state - section: ${section}, method: ${method}, testType: ${testType}, scenarioType: ${scenarioType}`);
    
    const container = document.querySelector('.connect-test-compact');
    if (!container) return;

    // Set current values
    this.currentSection = section;
    this.currentMethod = method || 'list';
    this.currentTestType = testType || '';
    this.currentScenarioType = scenarioType || 'usage';

    // Update section
    if (section) {
      this.switchSection(section, container as HTMLElement);
    }

    // Update method if provided
    if (method) {
      this.switchMethod(method, container as HTMLElement);
    }

    // Update test type if provided (for search method)
    if (testType && method === 'search') {
      this.switchTestType(testType, container as HTMLElement);
    }

    // Update scenario type if provided (for testing section)
    if (scenarioType && section === 'testing') {
      this.switchScenarioType(scenarioType, container as HTMLElement);
    }
  }
}
