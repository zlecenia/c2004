import { ConnectConfigModule } from './connect-config.module';
import { IconComponent } from '../../components/icon.component';
import { SystemCategoryComponent } from './system-category.component';
import { DevicesCategoryComponent } from './devices-category.component';
import { SecurityCategoryComponent } from './security-category.component';

export class ConnectConfigView {
  private currentCategory: string = 'system';
  private currentSection: string = 'system';
  private currentSubSection: string = '';
  private systemComponent: SystemCategoryComponent;
  private devicesComponent: DevicesCategoryComponent;
  private securityComponent: SecurityCategoryComponent;

  constructor(_module: ConnectConfigModule) {
    // module parameter used for future implementations
    this.systemComponent = new SystemCategoryComponent();
    this.devicesComponent = new DevicesCategoryComponent();
    this.securityComponent = new SecurityCategoryComponent();
  }

  render(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'connect-config-layout';
    
    // Update top-bar submenu
    const submenu = document.getElementById('top-bar-submenu');
    if (submenu) submenu.textContent = '⚙️ Configuration Module';
    
    // Update top-bar section title
    const sectionTitle = document.getElementById('top-bar-section-title');
    if (sectionTitle) sectionTitle.textContent = 'ConnectConfig - Konfiguracja Systemu';
    
    container.innerHTML = `
      <div class="config-layout">
        <!-- Column 1: Main Categories -->
        <div class="menu-column">
          <h3 class="column-title">Kategorie</h3>
          <button class="category-item active" data-category="system">
            <span class="menu-icon">${IconComponent.render('monitor', { size: 18 })}</span>
            <span class="menu-label">System & Sieć</span>
          </button>
          <button class="category-item" data-category="devices">
            <span class="menu-icon">${IconComponent.render('smartphone', { size: 18 })}</span>
            <span class="menu-label">Urządzenia</span>
          </button>
          <button class="category-item" data-category="security">
            <span class="menu-icon">${IconComponent.render('lock', { size: 18 })}</span>
            <span class="menu-label">Bezpieczeństwo</span>
          </button>
        </div>

        <!-- Column 2: Subcategories (shown based on category) -->
        <div class="menu-column" id="subcategory-column">
          <h3 class="column-title" id="subcategory-title">System & Sieć</h3>
          ${this.systemComponent.render()}
          ${this.devicesComponent.render()}
          ${this.securityComponent.render()}
        </div>


        <!-- Column 3: Main Content -->
        <div class="main-content">
          <div class="content-body">
            ${this.systemComponent.renderContent()}
            ${this.devicesComponent.renderContent()}
            ${this.securityComponent.renderContent()}
                <div class="form-section">
                  <h5>RFID Settings</h5>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Status RFID:</label>
                      <select class="form-select">
                        <option selected>Włączony</option>
                        <option>Wyłączony</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Port:</label>
                      <input type="text" class="form-input" value="COM1" />
                    </div>
                    <div class="form-group">
                      <label>Baud Rate:</label>
                      <select class="form-select">
                        <option>4800</option>
                        <option selected>9600</option>
                        <option>19200</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="form-section">
                  <h5>Database Settings</h5>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Host:</label>
                      <input type="text" class="form-input" value="localhost" />
                    </div>
                    <div class="form-group">
                      <label>Port:</label>
                      <input type="number" class="form-input" value="5432" />
                    </div>
                    <div class="form-group">
                      <label>Database:</label>
                      <input type="text" class="form-input" value="identification" />
                    </div>
                  </div>
                </div>

                <div class="form-actions">
                  <button class="btn-save">💾 Zapisz Konfigurację</button>
                  <button class="btn-test">🧪 Testuj Połączenie</button>
                </div>
              </div>
            </div>

            <!-- Network Section -->
            <div id="network-content" class="section-content">
              <div class="config-form">
                <div class="form-section">
                  <h5>Network Settings</h5>
                  <div class="form-row">
                    <div class="form-group">
                      <label>IP Address:</label>
                      <input type="text" class="form-input" value="192.168.188.212" />
                    </div>
                    <div class="form-group">
                      <label>Frontend Port:</label>
                      <input type="number" class="form-input" value="8200" />
                    </div>
                    <div class="form-group">
                      <label>Backend Port:</label>
                      <input type="number" class="form-input" value="8101" />
                    </div>
                  </div>
                </div>

                <div class="form-section">
                  <h5>CORS Origins</h5>
                  <div class="cors-list">
                    <div class="cors-item">
                      <input type="text" class="form-input" value="http://localhost:8100" />
                      <button class="btn-remove">❌</button>
                    </div>
                    <div class="cors-item">
                      <input type="text" class="form-input" value="http://192.168.188.212:8200" />
                      <button class="btn-remove">❌</button>
                    </div>
                  </div>
                  <button class="btn-add-cors">➕ Dodaj Origin</button>
                </div>

                <div class="form-actions">
                  <button class="btn-save">💾 Zapisz Sieć</button>
                  <button class="btn-restart">🔄 Restart Serwisów</button>
                </div>
              </div>
            </div>

            <!-- Devices Section -->
            <div id="devices-content" class="section-content">
              <div class="config-form">
                <h4>🔧 Konfiguracja Urządzeń</h4>
                
                <div class="form-section">
                  <h5>Ustawienia RFID</h5>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Port szeregowy:</label>
                      <select class="form-select">
                        <option>COM1</option>
                        <option>COM2</option>
                        <option selected>COM3</option>
                        <option>USB0</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Baud Rate:</label>
                      <select class="form-select">
                        <option>9600</option>
                        <option>19200</option>
                        <option selected>115200</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Timeout (ms):</label>
                      <input type="number" class="form-input" value="5000" min="1000" max="30000" />
                    </div>
                    <div class="form-group">
                      <label>Auto-detect:</label>
                      <select class="form-select">
                        <option selected>Enabled</option>
                        <option>Disabled</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="form-section">
                  <h5>Ustawienia Kamer QR/Barcode</h5>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Urządzenie kamery:</label>
                      <select class="form-select">
                        <option selected>/dev/video0</option>
                        <option>/dev/video1</option>
                        <option>Brak</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Rozdzielczość:</label>
                      <select class="form-select">
                        <option>640x480</option>
                        <option selected>1280x720</option>
                        <option>1920x1080</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Jakość skanowania:</label>
                      <select class="form-select">
                        <option>Niska</option>
                        <option selected>Średnia</option>
                        <option>Wysoka</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Auto-focus:</label>
                      <select class="form-select">
                        <option selected>Enabled</option>
                        <option>Disabled</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="form-section">
                  <h5>Registered Devices</h5>
                  <div class="devices-table">
                    <table class="config-table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Nazwa</th>
                          <th>Typ</th>
                          <th>Status</th>
                          <th>Ostatnia aktywność</th>
                          <th>Akcje</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>PSS-7000-001</td>
                          <td>Pompa Próżniowa #1</td>
                          <td>PSS-7000</td>
                          <td><span class="status-badge online">🟢 Online</span></td>
                          <td>2025-10-09 10:30</td>
                          <td>
                            <button class="btn-action">✏️</button>
                            <button class="btn-action">🗑️</button>
                          </td>
                        </tr>
                        <tr>
                          <td>PSS-5000-002</td>
                          <td>Pompa Próżniowa #2</td>
                          <td>PSS-5000</td>
                          <td><span class="status-badge offline">🔴 Offline</span></td>
                          <td>2025-10-08 16:45</td>
                          <td>
                            <button class="btn-action">✏️</button>
                            <button class="btn-action">🗑️</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <button class="btn-add">➕ Dodaj Urządzenie</button>
                </div>

                <div class="form-actions">
                  <button class="btn-save">💾 Zapisz Konfigurację Urządzeń</button>
                  <button class="btn-test">🧪 Test Urządzeń</button>
                </div>
              </div>
            </div>

            <!-- Security Section -->
            <div id="security-content" class="section-content">
              <div class="config-form">
                <h4>🔒 Ustawienia Bezpieczeństwa</h4>
                
                <div class="form-section">
                  <h5>Uwierzytelnianie</h5>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Wymagane logowanie:</label>
                      <select class="form-select">
                        <option selected>Tak</option>
                        <option>Nie</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Timeout sesji (min):</label>
                      <input type="number" class="form-input" value="30" min="5" max="480" />
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Min. długość hasła:</label>
                      <input type="number" class="form-input" value="4" min="1" max="20" />
                    </div>
                    <div class="form-group">
                      <label>Maksymalne próby logowania:</label>
                      <input type="number" class="form-input" value="3" min="1" max="10" />
                    </div>
                  </div>
                </div>

                <div class="form-section">
                  <h5>Szyfrowanie i Protokoły</h5>
                  <div class="form-row">
                    <div class="form-group">
                      <label>HTTPS wymagane:</label>
                      <select class="form-select">
                        <option>Tak</option>
                        <option selected>Nie (Rozwój)</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>API Key wymagane:</label>
                      <select class="form-select">
                        <option selected>Tak</option>
                        <option>Nie</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Poziom szyfrowania:</label>
                      <select class="form-select">
                        <option>AES-128</option>
                        <option selected>AES-256</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Token JWT (godz):</label>
                      <input type="number" class="form-input" value="24" min="1" max="168" />
                    </div>
                  </div>
                </div>

                <div class="form-section">
                  <h5>Uprawnienia Użytkowników</h5>
                  <div class="permissions-table">
                    <table class="config-table">
                      <thead>
                        <tr>
                          <th>Użytkownik</th>
                          <th>Rola</th>
                          <th>Identyfikacja</th>
                          <th>Testowanie</th>
                          <th>Konfiguracja</th>
                          <th>Raporty</th>
                          <th>Akcje</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Jan Kowalski</td>
                          <td>Manager</td>
                          <td><span class="permission granted">✅</span></td>
                          <td><span class="permission granted">✅</span></td>
                          <td><span class="permission granted">✅</span></td>
                          <td><span class="permission granted">✅</span></td>
                          <td><button class="btn-action">✏️</button></td>
                        </tr>
                        <tr>
                          <td>Anna Nowak</td>
                          <td>Technik</td>
                          <td><span class="permission granted">✅</span></td>
                          <td><span class="permission granted">✅</span></td>
                          <td><span class="permission denied">❌</span></td>
                          <td><span class="permission granted">✅</span></td>
                          <td><button class="btn-action">✏️</button></td>
                        </tr>
                        <tr>
                          <td>Piotr Wiśniewski</td>
                          <td>Operator</td>
                          <td><span class="permission granted">✅</span></td>
                          <td><span class="permission granted">✅</span></td>
                          <td><span class="permission denied">❌</span></td>
                          <td><span class="permission denied">❌</span></td>
                          <td><button class="btn-action">✏️</button></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div class="form-actions">
                  <button class="btn-save">💾 Zapisz Ustawienia Bezpieczeństwa</button>
                  <button class="btn-test">🧪 Test Uprawnień</button>
                </div>
              </div>
            </div>

            <!-- Labels/Translations Section -->
            <div id="labels-content" class="section-content">
              <div class="config-form">
                <h4>🌐 Zarządzanie Etykietami i Tłumaczeniami</h4>
                
                <div class="form-section">
                  <h5>Ustawienia Językowe</h5>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Język domyślny:</label>
                      <select class="form-select" id="default-language">
                        <option value="pl" selected>Polski</option>
                        <option value="en">English</option>
                        <option value="de">Deutsch</option>
                        <option value="fr">Français</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Dostępne języki:</label>
                      <div class="language-checkboxes">
                        <label><input type="checkbox" checked> 🇵🇱 Polski</label>
                        <label><input type="checkbox" checked> 🇺🇸 English</label>
                        <label><input type="checkbox"> 🇩🇪 Deutsch</label>
                        <label><input type="checkbox"> 🇫🇷 Français</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="form-section">
                  <h5>Tabela Etykiet</h5>
                  <div class="labels-controls">
                    <button class="btn-add" id="add-label">➕ Dodaj Etykietę</button>
                    <button class="btn-import">📥 Importuj Etykiety</button>
                    <button class="btn-export">📤 Eksportuj Etykiety</button>
                  </div>
                  
                  <div class="labels-table-container">
                    <table class="labels-table" id="labels-table">
                      <thead>
                        <tr>
                          <th>Klucz</th>
                          <th>🇵🇱 Polski</th>
                          <th>🇺🇸 English</th>
                          <th>🇩🇪 Deutsch</th>
                          <th>🇫🇷 Français</th>
                          <th>Kategoria</th>
                          <th>Akcje</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><input type="text" value="menu.identification" class="label-input key-input" readonly /></td>
                          <td><input type="text" value="Identyfikacja" class="label-input" /></td>
                          <td><input type="text" value="Identification" class="label-input" /></td>
                          <td><input type="text" value="Identifikation" class="label-input" /></td>
                          <td><input type="text" value="Identification" class="label-input" /></td>
                          <td>
                            <select class="category-select">
                              <option selected>Menu</option>
                              <option>Buttons</option>
                              <option>Messages</option>
                              <option>Errors</option>
                            </select>
                          </td>
                          <td>
                            <button class="btn-action save-label">💾</button>
                            <button class="btn-action delete-label">🗑️</button>
                          </td>
                        </tr>
                        <tr>
                          <td><input type="text" value="menu.testing" class="label-input key-input" readonly /></td>
                          <td><input type="text" value="Testowanie" class="label-input" /></td>
                          <td><input type="text" value="Testing" class="label-input" /></td>
                          <td><input type="text" value="Testen" class="label-input" /></td>
                          <td><input type="text" value="Test" class="label-input" /></td>
                          <td>
                            <select class="category-select">
                              <option selected>Menu</option>
                              <option>Buttons</option>
                              <option>Messages</option>
                              <option>Errors</option>
                            </select>
                          </td>
                          <td>
                            <button class="btn-action save-label">💾</button>
                            <button class="btn-action delete-label">🗑️</button>
                          </td>
                        </tr>
                        <tr>
                          <td><input type="text" value="button.save" class="label-input key-input" readonly /></td>
                          <td><input type="text" value="Zapisz" class="label-input" /></td>
                          <td><input type="text" value="Save" class="label-input" /></td>
                          <td><input type="text" value="Speichern" class="label-input" /></td>
                          <td><input type="text" value="Enregistrer" class="label-input" /></td>
                          <td>
                            <select class="category-select">
                              <option>Menu</option>
                              <option selected>Buttons</option>
                              <option>Messages</option>
                              <option>Errors</option>
                            </select>
                          </td>
                          <td>
                            <button class="btn-action save-label">💾</button>
                            <button class="btn-action delete-label">🗑️</button>
                          </td>
                        </tr>
                        <tr>
                          <td><input type="text" value="message.success" class="label-input key-input" readonly /></td>
                          <td><input type="text" value="Operacja zakończona pomyślnie" class="label-input" /></td>
                          <td><input type="text" value="Operation completed successfully" class="label-input" /></td>
                          <td><input type="text" value="Vorgang erfolgreich abgeschlossen" class="label-input" /></td>
                          <td><input type="text" value="Opération terminée avec succès" class="label-input" /></td>
                          <td>
                            <select class="category-select">
                              <option>Menu</option>
                              <option>Buttons</option>
                              <option selected>Messages</option>
                              <option>Errors</option>
                            </select>
                          </td>
                          <td>
                            <button class="btn-action save-label">💾</button>
                            <button class="btn-action delete-label">🗑️</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div class="form-actions">
                  <button class="btn-save">💾 Zapisz Wszystkie Etykiety</button>
                  <button class="btn-test">🧪 Podgląd Tłumaczeń</button>
                </div>
              </div>
            </div>

            <div id="backup-content" class="section-content">
              <div class="config-form">
                <div class="backup-actions">
                  <button class="btn-export">📤 Eksportuj Konfigurację</button>
                  <button class="btn-import">📥 Importuj Konfigurację</button>
                  <input type="file" id="config-file" accept=".json" style="display: none;" />
                </div>
              </div>
            </div>

            <!-- Device RFID Subsection -->
            <div id="devices-rfid-content" class="section-content">
              <div class="config-form">
                <h4>📡 Konfiguracja RFID</h4>
                
                <div class="form-section">
                  <h5>Port Komunikacyjny</h5>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Port szeregowy:</label>
                      <select class="form-select">
                        <option>/dev/ttyUSB0</option>
                        <option selected>/dev/ttyUSB1</option>
                        <option>/dev/ttyACM0</option>
                        <option>COM3</option>
                        <option>COM4</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Baud Rate:</label>
                      <select class="form-select">
                        <option>9600</option>
                        <option>19200</option>
                        <option>57600</option>
                        <option selected>115200</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Data Bits:</label>
                      <select class="form-select">
                        <option>7</option>
                        <option selected>8</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Stop Bits:</label>
                      <select class="form-select">
                        <option selected>1</option>
                        <option>2</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="form-section">
                  <h5>Protokół i Timing</h5>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Protokół:</label>
                      <select class="form-select">
                        <option selected>ISO14443A</option>
                        <option>ISO14443B</option>
                        <option>ISO15693</option>
                        <option>MIFARE</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Read Timeout (ms):</label>
                      <input type="number" class="form-input" value="3000" min="500" max="10000" />
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Polling Interval (ms):</label>
                      <input type="number" class="form-input" value="100" min="50" max="1000" />
                    </div>
                    <div class="form-group">
                      <label>Auto-detect Mode:</label>
                      <select class="form-select">
                        <option selected>Enabled</option>
                        <option>Disabled</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="form-actions">
                  <button class="btn-test">🧪 Test Connection</button>
                  <button class="btn-save">💾 Zapisz</button>
                  <button class="btn-restart">🔄 Restart Service</button>
                </div>
              </div>
            </div>

            <!-- Device QR Code Subsection -->
            <div id="devices-qrcode-content" class="section-content">
              <div class="config-form">
                <h4>📷 Konfiguracja QR Code</h4>
                
                <div class="form-section">
                  <h5>Urządzenie Kamery</h5>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Device Path:</label>
                      <select class="form-select">
                        <option selected>/dev/video0</option>
                        <option>/dev/video1</option>
                        <option>/dev/video2</option>
                        <option>Auto-detect</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Rozdzielczość:</label>
                      <select class="form-select">
                        <option>320x240</option>
                        <option selected>640x480</option>
                        <option>800x600</option>
                        <option>1280x720</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Frame Rate (FPS):</label>
                      <select class="form-select">
                        <option>15</option>
                        <option selected>30</option>
                        <option>60</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Format:</label>
                      <select class="form-select">
                        <option selected>MJPEG</option>
                        <option>YUYV</option>
                        <option>H264</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="form-section">
                  <h5>Skanowanie i Dekodowanie</h5>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Scan Timeout (ms):</label>
                      <input type="number" class="form-input" value="5000" min="1000" max="15000" />
                    </div>
                    <div class="form-group">
                      <label>Min. Code Size:</label>
                      <input type="number" class="form-input" value="10" min="5" max="50" />
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Auto-focus:</label>
                      <select class="form-select">
                        <option selected>Enabled</option>
                        <option>Disabled</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Image Enhancement:</label>
                      <select class="form-select">
                        <option selected>Auto</option>
                        <option>High Contrast</option>
                        <option>Low Light</option>
                        <option>Disabled</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="form-actions">
                  <button class="btn-test">📷 Test Camera</button>
                  <button class="btn-save">💾 Zapisz</button>
                  <button class="btn-restart">🔄 Restart Service</button>
                </div>
              </div>
            </div>

            <!-- Device Barcode Subsection -->
            <div id="devices-barcode-content" class="section-content">
              <div class="config-form">
                <h4>📊 Konfiguracja Barcode</h4>
                
                <div class="form-section">
                  <h5>Supported Formats</h5>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Code 128:</label>
                      <select class="form-select">
                        <option selected>Enabled</option>
                        <option>Disabled</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Code 39:</label>
                      <select class="form-select">
                        <option selected>Enabled</option>
                        <option>Disabled</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                      <label>EAN-13:</label>
                      <select class="form-select">
                        <option selected>Enabled</option>
                        <option>Disabled</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>EAN-8:</label>
                      <select class="form-select">
                        <option selected>Enabled</option>
                        <option>Disabled</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="form-section">
                  <h5>Dekodowanie</h5>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Scan Timeout (ms):</label>
                      <input type="number" class="form-input" value="4000" min="1000" max="10000" />
                    </div>
                    <div class="form-group">
                      <label>Min. Bar Width:</label>
                      <input type="number" class="form-input" value="2" min="1" max="10" />
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Multi-scan:</label>
                      <select class="form-select">
                        <option>Enabled</option>
                        <option selected>Disabled</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Beep na sukces:</label>
                      <select class="form-select">
                        <option selected>Enabled</option>
                        <option>Disabled</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="form-actions">
                  <button class="btn-test">📊 Test Scanner</button>
                  <button class="btn-save">💾 Zapisz</button>
                  <button class="btn-restart">🔄 Restart Service</button>
                </div>
              </div>
            </div>

            <!-- Device Status Overview -->
            <div id="devices-status-content" class="section-content">
              <div class="config-form">
                <h4>✅ Status Wszystkich Urządzeń</h4>
                
                <div class="form-section">
                  <h5>RFID Status</h5>
                  <div class="status-grid">
                    <div class="status-card">
                      <div class="status-header">
                        <span class="status-title">📡 RFID Reader</span>
                        <span class="status-badge online">🟢 Online</span>
                      </div>
                      <div class="status-details">
                        <div class="status-row">
                          <span>Port:</span>
                          <span>/dev/ttyUSB1</span>
                        </div>
                        <div class="status-row">
                          <span>Protokół:</span>
                          <span>ISO14443A</span>
                        </div>
                        <div class="status-row">
                          <span>Ostatni odczyt:</span>
                          <span>2 min temu</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="form-section">
                  <h5>QR Code Status</h5>
                  <div class="status-grid">
                    <div class="status-card">
                      <div class="status-header">
                        <span class="status-title">📷 QR Camera</span>
                        <span class="status-badge online">🟢 Online</span>
                      </div>
                      <div class="status-details">
                        <div class="status-row">
                          <span>Device:</span>
                          <span>/dev/video0</span>
                        </div>
                        <div class="status-row">
                          <span>Rozdzielczość:</span>
                          <span>640x480</span>
                        </div>
                        <div class="status-row">
                          <span>Ostatnie skanowanie:</span>
                          <span>5 min temu</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="form-section">
                  <h5>Barcode Status</h5>
                  <div class="status-grid">
                    <div class="status-card">
                      <div class="status-header">
                        <span class="status-title">📊 Barcode Scanner</span>
                        <span class="status-badge warning">🟡 Ostrzeżenie</span>
                      </div>
                      <div class="status-details">
                        <div class="status-row">
                          <span>Format:</span>
                          <span>Code128, EAN-13</span>
                        </div>
                        <div class="status-row">
                          <span>Problem:</span>
                          <span>Słaba jakość obrazu</span>
                        </div>
                        <div class="status-row">
                          <span>Ostatni scan:</span>
                          <span>10 min temu</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="form-actions">
                  <button class="btn-test">🔄 Refresh Status</button>
                  <button class="btn-restart">🧪 Test All Devices</button>
                </div>
              </div>
            </div>

            <!-- Printer Configuration -->
            <div id="devices-printer-content" class="section-content">
              <div class="config-form">
                <h4>🖨️ Konfiguracja Drukarki</h4>
                
                <div class="form-section">
                  <h5>Połączenie</h5>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Model:</label>
                      <select class="form-select">
                        <option selected>Zebra ZD420</option>
                        <option>Brother QL-820NWB</option>
                        <option>DYMO LabelWriter 450</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Port:</label>
                      <input type="text" class="form-input" value="192.168.1.100:9100" />
                    </div>
                  </div>
                </div>

                <div class="form-section">
                  <h5>Ustawienia Druku</h5>
                  <div class="form-row">
                    <div class="form-group">
                      <label>DPI:</label>
                      <select class="form-select">
                        <option>203</option>
                        <option selected>300</option>
                        <option>600</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Szerokość etykiety (mm):</label>
                      <input type="number" class="form-input" value="50" />
                    </div>
                  </div>
                </div>

                <div class="form-actions">
                  <button class="btn-test">🧪 Test Print</button>
                  <button class="btn-save">💾 Zapisz</button>
                </div>
              </div>
            </div>

            <!-- Display Configuration -->
            <div id="devices-display-content" class="section-content">
              <div class="config-form">
                <h4>🖥️ Konfiguracja Wyświetlacza</h4>
                
                <div class="form-section">
                  <h5>Rozdzielczość i Częstotliwość</h5>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Rozdzielczość:</label>
                      <select class="form-select">
                        <option>1920x1080</option>
                        <option selected>1280x800</option>
                        <option>1024x768</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Częstotliwość odświeżania:</label>
                      <select class="form-select">
                        <option selected>60Hz</option>
                        <option>75Hz</option>
                        <option>144Hz</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="form-section">
                  <h5>Wygaszacz Ekranu</h5>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Timeout (min):</label>
                      <input type="number" class="form-input" value="10" min="1" max="60" />
                    </div>
                    <div class="form-group">
                      <label>Jasność (%): </label>
                      <input type="range" class="form-input" value="80" min="10" max="100" />
                    </div>
                  </div>
                </div>

                <div class="form-actions">
                  <button class="btn-test">🔆 Test Display</button>
                  <button class="btn-save">💾 Zapisz</button>
                </div>
              </div>
            </div>

            <!-- Audio System Configuration -->
            <div id="devices-audio-content" class="section-content">
              <div class="config-form">
                <h4>🔊 System Audio</h4>
                
                <div class="form-section">
                  <h5>Ustawienia Dźwięku</h5>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Głośność Master:</label>
                      <input type="range" class="form-input" value="75" min="0" max="100" />
                    </div>
                    <div class="form-group">
                      <label>Dźwięk powiadomień:</label>
                      <select class="form-select">
                        <option selected>Enabled</option>
                        <option>Disabled</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="status-card offline">
                  <div class="status-header">
                    <span class="status-title">⚠️ Audio System Offline</span>
                    <span class="status-badge offline">Offline</span>
                  </div>
                  <div class="status-details">
                    <div class="status-row">
                      <span>Last Seen:</span>
                      <span>15 min ago</span>
                    </div>
                    <div class="status-row">
                      <span>Error Code:</span>
                      <span>AUDIO_DEVICE_NOT_FOUND</span>
                    </div>
                  </div>
                </div>

                <div class="form-actions">
                  <button class="btn-restart">🔄 Restart Audio Service</button>
                  <button class="btn-test">🎵 Test Sound</button>
                </div>
              </div>
            </div>

            <!-- Ethernet Configuration -->
            <div id="devices-ethernet-content" class="section-content">
              <div class="config-form">
                <h4>🌐 Konfiguracja Ethernet</h4>
                
                <div class="form-section">
                  <h5>Ustawienia Sieciowe</h5>
                  <div class="form-row">
                    <div class="form-group">
                      <label>IP Address:</label>
                      <input type="text" class="form-input" value="192.168.1.50" />
                    </div>
                    <div class="form-group">
                      <label>Subnet Mask:</label>
                      <input type="text" class="form-input" value="255.255.255.0" />
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Gateway:</label>
                      <input type="text" class="form-input" value="192.168.1.1" />
                    </div>
                    <div class="form-group">
                      <label>DNS Server:</label>
                      <input type="text" class="form-input" value="8.8.8.8" />
                    </div>
                  </div>
                </div>

                <div class="form-actions">
                  <button class="btn-test">🔗 Test Connection</button>
                  <button class="btn-save">💾 Apply Settings</button>
                  <button class="btn-restart">🔄 Restart Network</button>
                </div>
              </div>
            </div>

            <!-- WiFi Configuration -->
            <div id="devices-wifi-content" class="section-content">
              <div class="config-form">
                <h4>📶 Konfiguracja WiFi</h4>
                
                <div class="form-section">
                  <h5>Dostępne Sieci</h5>
                  <div class="wifi-networks">
                    <div class="wifi-item">
                      <span class="wifi-name">🏢 Office-Network</span>
                      <span class="wifi-signal">📶 85%</span>
                      <button class="btn-connect">Connect</button>
                    </div>
                    <div class="wifi-item active">
                      <span class="wifi-name">🔐 Secure-WiFi</span>
                      <span class="wifi-signal">📶 60%</span>
                      <button class="btn-connected">Connected</button>
                    </div>
                  </div>
                </div>

                <div class="form-actions">
                  <button class="btn-test">🔍 Scan Networks</button>
                  <button class="btn-restart">🔄 Reset WiFi</button>
                </div>
              </div>
            </div>

            <!-- Serial Port Configuration -->
            <div id="devices-serial-content" class="section-content">
              <div class="config-form">
                <h4>🔌 Port Szeregowy</h4>
                
                <div class="form-section">
                  <h5>Konfiguracja COM</h5>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Port:</label>
                      <select class="form-select">
                        <option selected>COM1</option>
                        <option>COM2</option>
                        <option>COM3</option>
                        <option>/dev/ttyUSB0</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Baud Rate:</label>
                      <select class="form-select">
                        <option>9600</option>
                        <option selected>115200</option>
                        <option>230400</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Data Bits:</label>
                      <select class="form-select">
                        <option selected>8</option>
                        <option>7</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Stop Bits:</label>
                      <select class="form-select">
                        <option selected>1</option>
                        <option>2</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="form-actions">
                  <button class="btn-test">📡 Test Connection</button>
                  <button class="btn-save">💾 Apply Settings</button>
                </div>
              </div>
            </div>

            <!-- Diagnostics -->
            <div id="devices-diagnostics-content" class="section-content">
              <div class="config-form">
                <h4>🔬 Diagnostyka Systemowa</h4>
                
                <div class="form-section">
                  <h5>Testy Sprzętowe</h5>
                  <div class="diagnostic-grid">
                    <div class="diagnostic-item">
                      <span class="diagnostic-name">RFID Reader Test</span>
                      <span class="diagnostic-status online">✅ Pass</span>
                      <button class="diagnostic-btn">Run</button>
                    </div>
                    <div class="diagnostic-item">
                      <span class="diagnostic-name">QR Camera Test</span>
                      <span class="diagnostic-status online">✅ Pass</span>
                      <button class="diagnostic-btn">Run</button>
                    </div>
                    <div class="diagnostic-item">
                      <span class="diagnostic-name">Barcode Scanner</span>
                      <span class="diagnostic-status warning">⚠️ Warning</span>
                      <button class="diagnostic-btn">Run</button>
                    </div>
                    <div class="diagnostic-item">
                      <span class="diagnostic-name">Network Connectivity</span>
                      <span class="diagnostic-status online">✅ Pass</span>
                      <button class="diagnostic-btn">Run</button>
                    </div>
                    <div class="diagnostic-item">
                      <span class="diagnostic-name">Audio System</span>
                      <span class="diagnostic-status offline">❌ Fail</span>
                      <button class="diagnostic-btn">Run</button>
                    </div>
                    <div class="diagnostic-item">
                      <span class="diagnostic-name">Display Output</span>
                      <span class="diagnostic-status online">✅ Pass</span>
                      <button class="diagnostic-btn">Run</button>
                    </div>
                  </div>
                </div>

                <div class="form-actions">
                  <button class="btn-test">🧪 Run All Tests</button>
                  <button class="btn-export">📄 Export Report</button>
                  <button class="btn-restart">🔄 Reset All Devices</button>
                </div>
              </div>
            </div>

            <!-- Calibration -->
            <div id="devices-calibration-content" class="section-content">
              <div class="config-form">
                <h4>⚙️ Kalibracja Urządzeń</h4>
                
                <div class="form-section">
                  <h5>Kalibracja RFID</h5>
                  <div class="calibration-item">
                    <div class="calibration-info">
                      <span class="calibration-name">📡 RFID Reader Sensitivity</span>
                      <span class="calibration-status">Last: 2025-10-05</span>
                    </div>
                    <button class="btn-calibrate">🎯 Calibrate</button>
                  </div>
                </div>

                <div class="form-section">
                  <h5>Kalibracja QR/Barcode</h5>
                  <div class="calibration-item">
                    <div class="calibration-info">
                      <span class="calibration-name">📷 QR Camera Focus</span>
                      <span class="calibration-status">Last: 2025-10-07</span>
                    </div>
                    <button class="btn-calibrate">🎯 Calibrate</button>
                  </div>
                  <div class="calibration-item">
                    <div class="calibration-info">
                      <span class="calibration-name">📊 Barcode Decoder</span>
                      <span class="calibration-status">Last: 2025-10-08</span>
                    </div>
                    <button class="btn-calibrate">🎯 Calibrate</button>
                  </div>
                </div>

                <div class="form-section">
                  <h5>Kalibracja Wyświetlacza</h5>
                  <div class="calibration-item">
                    <div class="calibration-info">
                      <span class="calibration-name">🖥️ Color Calibration</span>
                      <span class="calibration-status">Last: Never</span>
                    </div>
                    <button class="btn-calibrate warning">⚠️ Calibrate</button>
                  </div>
                </div>

                <div class="form-actions">
                  <button class="btn-test">🎯 Auto-Calibrate All</button>
                  <button class="btn-export">📋 Calibration Report</button>
                </div>
              </div>
            </div>

            <!-- Performance Section -->
            <div id="performance-content" class="section-content">
              <div class="config-form">
                <h4>📊 Konfiguracja Wydajności</h4>
                <div class="form-section">
                  <h5>CPU & Memory</h5>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Max CPU Usage (%):</label>
                      <input type="range" class="form-input" value="80" min="50" max="100" />
                    </div>
                    <div class="form-group">
                      <label>Memory Limit (MB):</label>
                      <input type="number" class="form-input" value="512" min="256" max="2048" />
                    </div>
                  </div>
                </div>
                <div class="form-actions">
                  <button class="btn-save">💾 Zapisz</button>
                  <button class="btn-test">📊 Monitor Wydajności</button>
                </div>
              </div>
            </div>

            <!-- Monitoring Section -->
            <div id="monitoring-content" class="section-content">
              <div class="config-form">
                <h4>👁️ System Monitoring</h4>
                <div class="form-section">
                  <h5>Monitoring Settings</h5>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Log Level:</label>
                      <select class="form-select">
                        <option>ERROR</option>
                        <option selected>WARNING</option>
                        <option>INFO</option>
                        <option>DEBUG</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Refresh Interval (s):</label>
                      <input type="number" class="form-input" value="30" min="5" max="300" />
                    </div>
                  </div>
                </div>
                <div class="form-actions">
                  <button class="btn-save">💾 Zapisz</button>
                  <button class="btn-test">📈 View Logs</button>
                </div>
              </div>
            </div>

            <!-- Logs Section -->
            <div id="logs-content" class="section-content">
              <div class="config-form">
                <h4>📄 Zarządzanie Logami</h4>
                <div class="form-section">
                  <h5>Log Rotation</h5>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Max File Size (MB):</label>
                      <input type="number" class="form-input" value="10" min="1" max="100" />
                    </div>
                    <div class="form-group">
                      <label>Max Files Count:</label>
                      <input type="number" class="form-input" value="5" min="1" max="20" />
                    </div>
                  </div>
                </div>
                <div class="form-actions">
                  <button class="btn-save">💾 Zapisz</button>
                  <button class="btn-export">📤 Export Logs</button>
                </div>
              </div>
            </div>

            <!-- Updates Section -->
            <div id="updates-content" class="section-content">
              <div class="config-form">
                <h4>⬇️ Aktualizacje Systemu</h4>
                <div class="form-section">
                  <h5>Auto Updates</h5>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Auto Update:</label>
                      <select class="form-select">
                        <option selected>Enabled</option>
                        <option>Disabled</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Check Interval:</label>
                      <select class="form-select">
                        <option>Daily</option>
                        <option selected>Weekly</option>
                        <option>Monthly</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="form-actions">
                  <button class="btn-save">💾 Zapisz</button>
                  <button class="btn-test">🔍 Check Updates</button>
                </div>
              </div>
            </div>

            <!-- Diagnostics Section -->
            <div id="diagnostics-content" class="section-content">
              <div class="config-form">
                <h4>🔬 Diagnostyka Systemu</h4>
                <div class="form-section">
                  <h5>System Health Check</h5>
                  <div class="diagnostic-grid">
                    <div class="diagnostic-item">
                      <span class="diagnostic-name">CPU Usage</span>
                      <span class="diagnostic-status online">✅ Normal</span>
                      <button class="diagnostic-btn">Check</button>
                    </div>
                    <div class="diagnostic-item">
                      <span class="diagnostic-name">Memory Usage</span>
                      <span class="diagnostic-status warning">⚠️ High</span>
                      <button class="diagnostic-btn">Check</button>
                    </div>
                    <div class="diagnostic-item">
                      <span class="diagnostic-name">Disk Space</span>
                      <span class="diagnostic-status online">✅ OK</span>
                      <button class="diagnostic-btn">Check</button>
                    </div>
                  </div>
                </div>
                <div class="form-actions">
                  <button class="btn-test">🧪 Run Full Diagnostics</button>
                  <button class="btn-export">📄 Export Report</button>
                </div>
              </div>
            </div>

            <!-- Maintenance Section -->
            <div id="maintenance-content" class="section-content">
              <div class="config-form">
                <h4>🔧 Konserwacja Systemu</h4>
                <div class="form-section">
                  <h5>Scheduled Maintenance</h5>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Maintenance Window:</label>
                      <select class="form-select">
                        <option selected>02:00 - 04:00</option>
                        <option>03:00 - 05:00</option>
                        <option>04:00 - 06:00</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Frequency:</label>
                      <select class="form-select">
                        <option>Daily</option>
                        <option selected>Weekly</option>
                        <option>Monthly</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="form-actions">
                  <button class="btn-save">💾 Zapisz</button>
                  <button class="btn-test">🔧 Run Maintenance</button>
                </div>
              </div>
            </div>

            <!-- RFID Config Section -->
            <div id="rfid-config-content" class="section-content">
              <div class="config-form">
                <h4>📡 Konfiguracja RFID Reader</h4>
                <div class="form-section">
                  <h5>Reader Settings</h5>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Frequency (MHz):</label>
                      <select class="form-select">
                        <option>13.56</option>
                        <option selected>125</option>
                        <option>868</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Read Distance (cm):</label>
                      <input type="range" class="form-input" value="8" min="1" max="15" />
                    </div>
                  </div>
                </div>
                <div class="form-actions">
                  <button class="btn-save">💾 Zapisz</button>
                  <button class="btn-test">📡 Test RFID</button>
                </div>
              </div>
            </div>

            <!-- QR Config Section -->
            <div id="qr-config-content" class="section-content">
              <div class="config-form">
                <h4>📷 Konfiguracja QR Scanner</h4>
                <div class="form-section">
                  <h5>Camera Settings</h5>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Resolution:</label>
                      <select class="form-select">
                        <option>640x480</option>
                        <option selected>1280x720</option>
                        <option>1920x1080</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Scan Timeout (ms):</label>
                      <input type="number" class="form-input" value="3000" min="1000" max="10000" />
                    </div>
                  </div>
                </div>
                <div class="form-actions">
                  <button class="btn-save">💾 Zapisz</button>
                  <button class="btn-test">📷 Test QR Scanner</button>
                </div>
              </div>
            </div>

            <!-- Barcode Config Section -->
            <div id="barcode-config-content" class="section-content">
              <div class="config-form">
                <h4>📊 Konfiguracja Barcode Scanner</h4>
                <div class="form-section">
                  <h5>Scanner Settings</h5>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Barcode Types:</label>
                      <div class="checkbox-group">
                        <label><input type="checkbox" checked> Code128</label>
                        <label><input type="checkbox" checked> EAN13</label>
                        <label><input type="checkbox"> QR Code</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-actions">
                  <button class="btn-save">💾 Zapisz</button>
                  <button class="btn-test">📊 Test Barcode</button>
                </div>
              </div>
            </div>

            <!-- Sensors Section -->
            <div id="sensors-content" class="section-content">
              <div class="config-form">
                <h4>🌡️ Konfiguracja Sensorów</h4>
                <div class="form-section">
                  <h5>Temperature Sensors</h5>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Warning Temp (°C):</label>
                      <input type="number" class="form-input" value="60" min="30" max="100" />
                    </div>
                    <div class="form-group">
                      <label>Critical Temp (°C):</label>
                      <input type="number" class="form-input" value="80" min="50" max="120" />
                    </div>
                  </div>
                </div>
                <div class="form-actions">
                  <button class="btn-save">💾 Zapisz</button>
                  <button class="btn-test">🌡️ Read Sensors</button>
                </div>
              </div>
            </div>

            <!-- IO Ports Section -->
            <div id="io-ports-content" class="section-content">
              <div class="config-form">
                <h4>🔌 Konfiguracja Portów I/O</h4>
                <div class="form-section">
                  <h5>Digital I/O</h5>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Input Ports:</label>
                      <input type="number" class="form-input" value="8" min="1" max="16" />
                    </div>
                    <div class="form-group">
                      <label>Output Ports:</label>
                      <input type="number" class="form-input" value="4" min="1" max="8" />
                    </div>
                  </div>
                </div>
                <div class="form-actions">
                  <button class="btn-save">💾 Zapisz</button>
                  <button class="btn-test">🔌 Test I/O</button>
                </div>
              </div>
            </div>

            <!-- Power Section -->
            <div id="power-content" class="section-content">
              <div class="config-form">
                <h4>🔋 Zarządzanie Zasilaniem</h4>
                <div class="form-section">
                  <h5>Power Management</h5>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Power Mode:</label>
                      <select class="form-select">
                        <option selected>Performance</option>
                        <option>Balanced</option>
                        <option>Power Save</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Sleep Timeout (min):</label>
                      <input type="number" class="form-input" value="30" min="5" max="120" />
                    </div>
                  </div>
                </div>
                <div class="form-actions">
                  <button class="btn-save">💾 Zapisz</button>
                  <button class="btn-test">⚡ Power Status</button>
                </div>
              </div>
            </div>

            <!-- Storage Section -->
            <div id="storage-content" class="section-content">
              <div class="config-form">
                <h4>💾 Zarządzanie Magazynem</h4>
                <div class="form-section">
                  <h5>Storage Settings</h5>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Data Retention (days):</label>
                      <input type="number" class="form-input" value="90" min="7" max="365" />
                    </div>
                    <div class="form-group">
                      <label>Auto Cleanup:</label>
                      <select class="form-select">
                        <option selected>Enabled</option>
                        <option>Disabled</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="form-actions">
                  <button class="btn-save">💾 Zapisz</button>
                  <button class="btn-test">💾 Storage Info</button>
                </div>
              </div>
            </div>

            <!-- Users Section -->
            <div id="users-content" class="section-content">
              <div class="config-form">
                <h4>👥 Zarządzanie Użytkownikami</h4>
                <div class="form-section">
                  <h5>User Settings</h5>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Max Users:</label>
                      <input type="number" class="form-input" value="50" min="1" max="1000" />
                    </div>
                    <div class="form-group">
                      <label>Session Timeout (min):</label>
                      <input type="number" class="form-input" value="120" min="15" max="480" />
                    </div>
                  </div>
                </div>
                <div class="form-actions">
                  <button class="btn-save">💾 Zapisz</button>
                  <button class="btn-test">👥 Manage Users</button>
                </div>
              </div>
            </div>

            <!-- Permissions Section -->
            <div id="permissions-content" class="section-content">
              <div class="config-form">
                <h4>🔑 Zarządzanie Uprawnieniami</h4>
                <div class="form-section">
                  <h5>Access Control</h5>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Default Role:</label>
                      <select class="form-select">
                        <option>Admin</option>
                        <option selected>User</option>
                        <option>Guest</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Require Auth:</label>
                      <select class="form-select">
                        <option selected>Yes</option>
                        <option>No</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="form-actions">
                  <button class="btn-save">💾 Zapisz</button>
                  <button class="btn-test">🔑 Test Permissions</button>
                </div>
              </div>
            </div>

            <!-- Reports Section -->
            <div id="reports-content" class="section-content">
              <div class="config-form">
                <h4>📄 Konfiguracja Raportów</h4>
                <div class="form-section">
                  <h5>Report Settings</h5>
                  <div class="form-row">
                    <div class="form-group">
                      <label>Auto Generate:</label>
                      <select class="form-select">
                        <option selected>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                        <option>Disabled</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Report Format:</label>
                      <select class="form-select">
                        <option>PDF</option>
                        <option selected>Excel</option>
                        <option>CSV</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="form-actions">
                  <button class="btn-save">💾 Zapisz</button>
                  <button class="btn-export">📄 Generate Report</button>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- Enhanced Status & Info Panel -->
        <div class="right-panel">

          <div class="info-section">
            <h3 class="status-title">ℹ️ Informacje</h3>
            <div class="info-item">
              <div class="info-label">Wersja systemu:</div>
              <div class="info-value">ConnectDisplay v2.0.4</div>
            </div>
            <div class="info-item">
              <div class="info-label">Ostatni backup:</div>
              <div class="info-value">2025-10-09 14:30</div>
            </div>
            <div class="info-item">
              <div class="info-label">Uptime:</div>
              <div class="info-value">2d 14h 23m</div>
            </div>
            <div class="info-item">
              <div class="info-label">Aktywni użytkownicy:</div>
              <div class="info-value">3 osoby</div>
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
      .connect-config-layout { height: 100%; overflow: hidden; }
      .config-layout { display: flex; height: 365px; background: #f5f5f5; }
      .menu-column { width: 120px; background: #2a2a2a; padding: 8px; overflow-y: auto; flex-shrink: 0; border-right: 1px solid #1a1a1a; }
      .column-title { color: #FFF; font-size: 10px; font-weight: 600; text-transform: uppercase; margin: 0 0 8px 0; padding: 4px; text-align: center; background: #1a1a1a; border-radius: 3px; }
      .section-item { width: 100%; background: #3a3a3a; border: none; padding: 5px; margin-bottom: 4px; border-radius: 5px; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 4px; transition: all 0.2s; color: #ccc; }
      .section-item:hover { background: #4a4a4a; color: white; }
      .section-item.active { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; }
      
      /* Compact menu items (no icons) */
      .section-item.compact { 
        padding: 4px 8px; 
        margin-bottom: 2px; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        min-height: 28px;
      }
      .section-item.compact .menu-label { 
        font-size: 11px; 
        font-weight: 600; 
        text-align: center; 
        line-height: 1.2;
      }
      
      /* Category items */
      .category-item { 
        width: 100%; 
        background: #3a3a3a; 
        border: none; 
        padding: 3px 4px; 
        margin-bottom: 4px; 
        border-radius: 5px; 
        cursor: pointer; 
        display: flex; 
        flex-direction: column; 
        align-items: center; 
        gap: 4px; 
        transition: all 0.2s; 
        color: #ccc; 
      }
      .category-item:hover { background: #4a4a4a; color: white; }
      .category-item.active { background: linear-gradient(135deg, #007bff 0%, #0056b3 100%); color: white; }
      
      /* Subcategory groups */
      .subcategory-group { display: none; }
      .subcategory-group.active { display: block; }
      .menu-icon { font-size: 18px; }
      .menu-label { font-size: 12px; font-weight: 500; text-align: center; }
      .main-content { flex: 1; display: flex; flex-direction: row; background: white; overflow: hidden; }
      .content-body { flex: 1; max-width: 700px; padding: 10px; overflow-y: auto; border-right: 1px solid #e0e0e0; }
      .right-panel { width: 240px; background: #f8f9fa; padding: 12px; overflow-y: auto; flex-shrink: 0; border-left: 1px solid #e0e0e0; }
      
      .section-content { display: none; }
      .section-content.active { display: block; }
      
      .config-form { background: #f8f9fa; padding: 12px; border-radius: 8px; }
      .config-form h4 { margin: 0 0 12px 0; font-size: 14px; color: #333; font-weight: 600; }
      .form-section { margin-bottom: 15px; padding-bottom: 12px; border-bottom: 1px solid #e0e0e0; }
      .form-section h5 { margin: 0 0 15px 0; font-size: 13px; color: #666; font-weight: 600; }
      .form-row { display: flex; gap: 15px; margin-bottom: 15px; }
      .form-group { flex: 1; }
      .form-group label { display: block; margin-bottom: 5px; font-size: 11px; font-weight: 600; color: #666; }
      .form-input, .form-select { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 12px; }
      .form-actions { display: flex; gap: 10px; margin-top: 20px; }
      .btn-save, .btn-test, .btn-restart, .btn-export, .btn-import { padding: 10px 15px; border: none; border-radius: 5px; cursor: pointer; font-size: 12px; font-weight: 600; }
      .btn-save { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; }
      .btn-test { background: linear-gradient(135deg, #007bff 0%, #0056b3 100%); color: white; }
      .btn-restart { background: linear-gradient(135deg, #ffc107 0%, #e0a800 100%); color: white; }
      .btn-export, .btn-import { background: linear-gradient(135deg, #6c757d 0%, #5a6268 100%); color: white; }
      
      .cors-list { margin-bottom: 10px; }
      .cors-item { display: flex; gap: 8px; margin-bottom: 8px; align-items: center; }
      .btn-remove { padding: 4px 8px; background: #dc3545; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 10px; }
      .btn-add-cors { padding: 6px 12px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px; }
      
      .backup-actions { display: flex; flex-direction: column; gap: 10px; align-items: flex-start; }
      
      /* Enhanced Device Groups Styling */
      .device-group { margin-bottom: 12px; }
      .group-label { 
        color: #aaa; 
        font-size: 9px; 
        font-weight: 700; 
        text-transform: uppercase; 
        margin: 0 0 6px 0; 
        padding: 4px 6px; 
        background: rgba(255, 255, 255, 0.05); 
        border-radius: 3px; 
        text-align: center;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .subsection-item { 
        width: 100%; 
        background: #3a3a3a; 
        border: none; 
        padding: 8px 6px; 
        margin-bottom: 3px; 
        border-radius: 6px; 
        cursor: pointer; 
        display: flex; 
        align-items: center; 
        gap: 8px; 
        transition: all 0.3s ease; 
        color: #ccc; 
        position: relative;
        overflow: hidden;
      }
      
      .subsection-item:hover { 
        background: #4a4a4a; 
        color: white; 
        transform: translateX(2px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      }
      
      .subsection-item.active { 
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); 
        color: white; 
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
      }
      
      .subsection-item .menu-icon { 
        flex-shrink: 0; 
        width: 20px; 
        height: 20px; 
        display: flex; 
        align-items: center; 
        justify-content: center;
      }
      
      .subsection-item .menu-label { 
        flex: 1; 
        font-size: 11px; 
        font-weight: 600; 
        text-align: left;
        line-height: 1.2;
      }
      
      .device-status, .device-count { 
        flex-shrink: 0; 
        font-size: 10px; 
        font-weight: 700; 
        padding: 2px 6px; 
        border-radius: 10px; 
        min-width: 16px; 
        text-align: center;
      }
      
      .device-status.online { 
        background: rgba(40, 167, 69, 0.2); 
        color: #28a745; 
        border: 1px solid rgba(40, 167, 69, 0.3);
      }
      
      .device-status.warning { 
        background: rgba(255, 193, 7, 0.2); 
        color: #ffc107; 
        border: 1px solid rgba(255, 193, 7, 0.3);
      }
      
      .device-status.offline { 
        background: rgba(220, 53, 69, 0.2); 
        color: #dc3545; 
        border: 1px solid rgba(220, 53, 69, 0.3);
      }
      
      .device-count { 
        background: rgba(108, 117, 125, 0.2); 
        color: #6c757d; 
        border: 1px solid rgba(108, 117, 125, 0.3);
      }
      
      /* Enhanced Column Title */
      .column-title { 
        color: #FFF; 
        font-size: 11px; 
        font-weight: 700; 
        text-transform: uppercase; 
        margin: 0 0 12px 0; 
        padding: 8px; 
        text-align: center; 
        background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%); 
        border-radius: 6px; 
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      }
      
      /* Tables */
      .config-table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 11px; }
      .config-table th, .config-table td { padding: 8px; border: 1px solid #ddd; text-align: left; }
      .config-table th { background: #f5f5f5; font-weight: 600; color: #333; }
      .config-table tbody tr:nth-child(even) { background: #f9f9f9; }
      .config-table tbody tr:hover { background: #f0f8ff; }
      
      /* Status badges */
      .status-badge { padding: 2px 6px; border-radius: 10px; font-size: 9px; font-weight: 600; }
      .status-badge.online { background: #d1e7dd; color: #0f5132; }
      .status-badge.offline { background: #f8d7da; color: #842029; }
      
      /* Permission badges */
      .permission { font-size: 14px; }
      .permission.granted { color: #28a745; }
      .permission.denied { color: #dc3545; }
      
      /* Action buttons */
      .btn-action { padding: 4px 6px; margin: 0 2px; background: #6c757d; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 10px; }
      .btn-action:hover { background: #5a6268; }
      .btn-add { padding: 6px 12px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px; margin-top: 10px; }
      
      /* Language settings */
      .language-checkboxes { display: flex; flex-direction: column; gap: 5px; }
      .language-checkboxes label { font-size: 11px; cursor: pointer; }
      
      /* Labels table */
      .labels-controls { display: flex; gap: 10px; margin-bottom: 15px; }
      .labels-table-container { max-height: 300px; overflow-y: auto; border: 1px solid #ddd; border-radius: 4px; }
      .labels-table { width: 100%; border-collapse: collapse; font-size: 10px; }
      .labels-table th, .labels-table td { padding: 6px; border: 1px solid #ddd; }
      .labels-table th { background: #f8f9fa; font-weight: 600; color: #333; position: sticky; top: 0; z-index: 10; }
      .label-input { width: 100%; border: none; padding: 4px; font-size: 10px; background: transparent; }
      .key-input { background: #f8f9fa; color: #666; }
      .category-select { width: 100%; padding: 4px; font-size: 10px; border: 1px solid #ddd; }
      .save-label { background: #28a745; }
      .delete-label { background: #dc3545; }
      
      .status-section { margin-bottom: 15px; }
      .status-title { color: #333; font-size: 11px; font-weight: 600; margin: 0 0 10px 0; padding: 8px; background: #e9ecef; border-radius: 4px; text-align: center; }
      .status-item { background: white; padding: 8px; margin-bottom: 6px; border-radius: 4px; display: flex; justify-content: space-between; align-items: center; border: 1px solid #e0e0e0; }
      .status-label { font-size: 10px; color: #666; font-weight: 500; }
      .status-value { font-size: 11px; color: #333; font-weight: 600; }
      .status-value.online { color: #28a745; }
      .status-value.offline { color: #dc3545; }

      /* Info Section */
      .info-section { margin-bottom: 15px; }
      .info-item { background: white; padding: 8px; margin-bottom: 4px; border-radius: 4px; border: 1px solid #e0e0e0; }
      .info-label { font-size: 9px; color: #666; font-weight: 500; text-transform: uppercase; }
      .info-value { font-size: 11px; color: #333; font-weight: 600; margin-top: 2px; }

      /* Quick Actions */
      .quick-actions { margin-bottom: 15px; }
      .quick-btn { width: 100%; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; border: none; padding: 8px 12px; margin-bottom: 4px; border-radius: 4px; cursor: pointer; font-size: 10px; font-weight: 600; transition: all 0.2s ease; }
      .quick-btn:hover { transform: translateY(-1px); box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3); }

      /* Recent Changes */
      .recent-changes { margin-bottom: 15px; }
      .change-item { background: white; padding: 8px; margin-bottom: 4px; border-radius: 4px; border: 1px solid #e0e0e0; }
      .change-time { font-size: 9px; color: #666; font-weight: 600; }
      .change-desc { font-size: 10px; color: #333; margin-top: 2px; }

      /* Status cards for device subsections */
      .status-grid { display: flex; flex-direction: column; gap: 10px; }
      .status-card { background: #f8f9fa; border: 1px solid #e0e0e0; border-radius: 8px; padding: 12px; }
      .status-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
      .status-title { font-size: 13px; font-weight: 600; color: #333; }
      .status-badge { padding: 4px 8px; border-radius: 12px; font-size: 10px; font-weight: 600; }
      .status-badge.online { background: #d1e7dd; color: #0f5132; }
      .status-badge.warning { background: #fff3cd; color: #856404; }
      .status-badge.offline { background: #f8d7da; color: #721c24; }
      .status-details { display: flex; flex-direction: column; gap: 6px; }
      .status-row { display: flex; justify-content: space-between; font-size: 12px; }
      .status-row span:first-child { color: #666; font-weight: 500; }
      .status-row span:last-child { color: #333; font-weight: 600; }
      
      /* WiFi Networks Styling */
      .wifi-networks { display: flex; flex-direction: column; gap: 8px; }
      .wifi-item { 
        display: flex; 
        justify-content: space-between; 
        align-items: center; 
        padding: 10px; 
        background: white; 
        border: 1px solid #e0e0e0; 
        border-radius: 6px; 
        transition: all 0.2s ease;
      }
      .wifi-item:hover { background: #f8f9fa; border-color: #6366f1; }
      .wifi-item.active { background: #e8f5e8; border-color: #28a745; }
      .wifi-name { font-size: 12px; font-weight: 600; color: #333; }
      .wifi-signal { font-size: 11px; color: #666; }
      .btn-connect, .btn-connected { 
        padding: 4px 8px; 
        border: none; 
        border-radius: 4px; 
        cursor: pointer; 
        font-size: 10px; 
        font-weight: 600;
      }
      .btn-connect { background: #007bff; color: white; }
      .btn-connected { background: #28a745; color: white; cursor: default; }
      
      /* Diagnostics Grid */
      .diagnostic-grid { display: flex; flex-direction: column; gap: 8px; }
      .diagnostic-item { 
        display: flex; 
        justify-content: space-between; 
        align-items: center; 
        padding: 10px; 
        background: white; 
        border: 1px solid #e0e0e0; 
        border-radius: 6px;
      }
      .diagnostic-name { font-size: 12px; font-weight: 600; color: #333; flex: 1; }
      .diagnostic-status { font-size: 11px; font-weight: 600; margin-right: 10px; }
      .diagnostic-status.online { color: #28a745; }
      .diagnostic-status.warning { color: #ffc107; }
      .diagnostic-status.offline { color: #dc3545; }
      .diagnostic-btn { 
        padding: 4px 8px; 
        background: #6c757d; 
        color: white; 
        border: none; 
        border-radius: 4px; 
        cursor: pointer; 
        font-size: 10px; 
        font-weight: 600;
      }
      .diagnostic-btn:hover { background: #5a6268; }
      
      /* Calibration Styling */
      .calibration-item { 
        display: flex; 
        justify-content: space-between; 
        align-items: center; 
        padding: 12px; 
        background: white; 
        border: 1px solid #e0e0e0; 
        border-radius: 6px; 
        margin-bottom: 8px;
      }
      .calibration-info { flex: 1; display: flex; flex-direction: column; gap: 4px; }
      .calibration-name { font-size: 12px; font-weight: 600; color: #333; }
      .calibration-status { font-size: 10px; color: #666; }
      .btn-calibrate { 
        padding: 6px 12px; 
        background: #6366f1; 
        color: white; 
        border: none; 
        border-radius: 4px; 
        cursor: pointer; 
        font-size: 10px; 
        font-weight: 600; 
        transition: all 0.2s ease;
      }
      .btn-calibrate:hover { background: #4f46e5; transform: translateY(-1px); }
      .btn-calibrate.warning { background: #ffc107; color: #333; }
      .btn-calibrate.warning:hover { background: #e0a800; }
      
      /* Checkbox groups */
      .checkbox-group { display: flex; flex-direction: column; gap: 8px; }
      .checkbox-group label { display: flex; align-items: center; gap: 8px; font-size: 12px; cursor: pointer; }
      .checkbox-group input[type="checkbox"] { margin: 0; }
    `;
    document.head.appendChild(style);
  }

  private setupEventListeners(container: HTMLElement): void {
    console.log('🔧 ConnectConfig: Setting up event listeners');
    
    // Category navigation (Level 1)
    const categoryItems = container.querySelectorAll('[data-category]');
    console.log(`🔧 ConnectConfig: Found ${categoryItems.length} category buttons`);
    
    categoryItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const category = target.getAttribute('data-category');
        console.log(`🔧 ConnectConfig: Category clicked: ${category}`);
        if (category) this.switchCategory(category, container);
      });
    });
    
    // Section navigation (Level 2)
    const sectionItems = container.querySelectorAll('[data-section]');
    console.log(`🔧 ConnectConfig: Found ${sectionItems.length} section buttons`);
    
    sectionItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const section = target.getAttribute('data-section');
        console.log(`🔧 ConnectConfig: Section clicked: ${section}`);
        if (section) this.switchSection(section, container);
      });
    });

  }

  private switchCategory(category: string, container: HTMLElement): void {
    console.log(`🔧 ConnectConfig: Switching to category: ${category}`);
    this.currentCategory = category;
    
    // Update category active state
    container.querySelectorAll('[data-category]').forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-category') === category) item.classList.add('active');
    });

    // Show/hide subcategory groups
    container.querySelectorAll('.subcategory-group').forEach(group => {
      group.classList.remove('active');
      (group as HTMLElement).style.display = 'none';
    });
    
    const activeGroup = container.querySelector(`#${category}-subcategories`);
    if (activeGroup) {
      activeGroup.classList.add('active');
      (activeGroup as HTMLElement).style.display = 'block';
    }

    // Update subcategory column title
    const titles: any = {
      'system': 'System & Sieć',
      'devices': 'Urządzenia',
      'security': 'Bezpieczeństwo'
    };
    
    const subcategoryTitle = container.querySelector('#subcategory-title');
    if (subcategoryTitle) subcategoryTitle.textContent = titles[category];

    // Set default section for category and switch to it (only if not switching to specific section)
    if (this.currentSection === 'system' || !this.currentSection) {
      const defaultSections: any = {
        'system': 'system',
        'devices': 'rfid-config', 
        'security': 'security'
      };
      
      const defaultSection = defaultSections[category];
      if (defaultSection) {
        this.switchSection(defaultSection, container);
      }
    }
  }

  private switchSection(section: string, container: HTMLElement): void {
    console.log(`🔧 ConnectConfig: Switching to section: ${section}`);
    this.currentSection = section;
    this.currentSubSection = ''; // Reset subsection

    // Update URL hash with section
    const currentHash = window.location.hash.slice(2); // Remove '#/'
    const [moduleName] = currentHash.split('/');
    window.location.hash = `#/${moduleName}/${section}`;
    console.log(`🔧 ConnectConfig: Updated URL to: ${window.location.hash}`);

    // Determine which category this section belongs to and update category state
    const sectionToCategory: any = {
      'system': 'system', 'network': 'system', 'performance': 'system', 'monitoring': 'system',
      'logs': 'system', 'updates': 'system', 'diagnostics': 'system', 'maintenance': 'system',
      'devices': 'devices', 'rfid-config': 'devices', 'qr-config': 'devices', 'barcode-config': 'devices',
      'sensors': 'devices', 'io-ports': 'devices', 'power': 'devices', 'storage': 'devices', 'calibration': 'devices',
      'security': 'security', 'users': 'security', 'permissions': 'security', 
      'backup': 'security', 'labels': 'security', 'reports': 'security'
    };
    
    const categoryForSection = sectionToCategory[section];
    if (categoryForSection && categoryForSection !== this.currentCategory) {
      this.switchCategory(categoryForSection, container);
      return; // switchCategory will call switchSection again with proper setup
    }

    // Update section active state (only in the current category's subcategory group)
    const currentSubcategoryGroup = container.querySelector(`#${this.currentCategory}-subcategories`);
    if (currentSubcategoryGroup) {
      currentSubcategoryGroup.querySelectorAll('[data-section]').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === section) item.classList.add('active');
      });
    }

    // Hide all sections
    container.querySelectorAll('.section-content').forEach(content => {
      content.classList.remove('active');
    });

    // Show selected section
    const activeContent = container.querySelector(`#${section}-content`);
    if (activeContent) {
      activeContent.classList.add('active');
    }

    // Update top-bar title
    const titles: any = {
      'system': 'System',
      'network': 'Sieć', 
      'performance': 'Wydajność',
      'monitoring': 'Monitoring',
      'logs': 'Logi Systemowe',
      'updates': 'Aktualizacje',
      'diagnostics': 'Diagnostyka',
      'maintenance': 'Konserwacja',
      'time-sync': 'Synchronizacja',
      'system-info': 'Info Systemu',
      'devices': 'Urządzenia',
      'rfid-config': 'RFID Reader',
      'qr-config': 'QR Scanner',
      'barcode-config': 'Barcode Scanner',
      'sensors': 'Sensory',
      'io-ports': 'Porty I/O',
      'power': 'Zasilanie',
      'storage': 'Magazyn',
      'calibration': 'Kalibracja',
      'hardware-test': 'Test Hardware',
      'security': 'Bezpieczeństwo',
      'users': 'Użytkownicy',
      'permissions': 'Uprawnienia',
      'backup': 'Backup',
      'labels': 'Etykiety',
      'reports': 'Raporty'
    };

    const topBarTitle = document.getElementById('top-bar-section-title');
    if (topBarTitle) topBarTitle.textContent = `ConnectConfig - ${titles[section]}`;
  }


  // Public method for URL routing support
  public setInitialSection(section: string): void {
    console.log(`🔧 ConnectConfig: Setting initial section from URL: ${section}`);
    const container = document.querySelector('.connect-config-layout');
    if (container) {
      this.switchSection(section, container as HTMLElement);
    }
  }
}
