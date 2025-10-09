import { ConnectConfigModule } from './connect-config.module';

export class ConnectConfigView {
  private currentSection: string = 'system';

  constructor(_module: ConnectConfigModule) {
    // module parameter used for future implementations
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
        <!-- Navigation Column -->
        <div class="menu-column">
          <h3 class="column-title">Konfiguracja</h3>
          <button class="section-item active" data-section="system">
            <span class="menu-icon">🖥️</span>
            <span class="menu-label">System</span>
          </button>
          <button class="section-item" data-section="network">
            <span class="menu-icon">🌐</span>
            <span class="menu-label">Sieć</span>
          </button>
          <button class="section-item" data-section="devices">
            <span class="menu-icon">📱</span>
            <span class="menu-label">Urządzenia</span>
          </button>
          <button class="section-item" data-section="security">
            <span class="menu-icon">🔒</span>
            <span class="menu-label">Bezpieczeństwo</span>
          </button>
          <button class="section-item" data-section="labels">
            <span class="menu-icon">🌐</span>
            <span class="menu-label">Etykiety</span>
          </button>
          <button class="section-item" data-section="backup">
            <span class="menu-icon">💾</span>
            <span class="menu-label">Backup</span>
          </button>
        </div>

        <!-- Main Content -->
        <div class="main-content">
          <div class="content-body">
            
            <!-- System Section -->
            <div id="system-content" class="section-content active">
              <div class="config-form">
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

          </div>
        </div>

        <!-- Status Panel -->
        <div class="right-panel">
          <div class="status-section">
            <h3 class="status-title">Status Systemu</h3>
            <div class="status-item">
              <span class="status-label">RFID:</span>
              <span class="status-value online">🟢 Online</span>
            </div>
            <div class="status-item">
              <span class="status-label">Database:</span>
              <span class="status-value online">🟢 Connected</span>
            </div>
            <div class="status-item">
              <span class="status-label">Cache:</span>
              <span class="status-value online">🟢 Active</span>
            </div>
            <div class="status-item">
              <span class="status-label">Network:</span>
              <span class="status-value online">🟢 Online</span>
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
      .menu-icon { font-size: 18px; }
      .menu-label { font-size: 12px; font-weight: 500; text-align: center; }
      .main-content { flex: 1; display: flex; flex-direction: column; background: white; overflow: hidden; }
      .content-body { flex: 1; padding: 10px; overflow-y: auto; }
      .right-panel { width: 200px; background: #2a2a2a; padding: 10px; overflow-y: auto; flex-shrink: 0; }
      
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
      .status-title { color: #999; font-size: 11px; font-weight: 600; text-transform: uppercase; margin: 0 0 10px 0; }
      .status-item { background: #3a3a3a; padding: 8px; margin-bottom: 6px; border-radius: 4px; display: flex; justify-content: space-between; align-items: center; }
      .status-label { font-size: 10px; color: #999; }
      .status-value { font-size: 11px; color: #fff; font-weight: 600; }
      .status-value.online { color: #28a745; }
      .status-value.offline { color: #dc3545; }
    `;
    document.head.appendChild(style);
  }

  private setupEventListeners(container: HTMLElement): void {
    // Section navigation
    const sectionItems = container.querySelectorAll('[data-section]');
    sectionItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const section = target.getAttribute('data-section');
        if (section) this.switchSection(section, container);
      });
    });
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

    // Update top-bar title
    const titles: any = {
      'system': 'System',
      'network': 'Sieć',
      'devices': 'Urządzenia',
      'security': 'Bezpieczeństwo',
      'labels': 'Etykiety',
      'backup': 'Backup'
    };

    const topBarTitle = document.getElementById('top-bar-section-title');
    if (topBarTitle) topBarTitle.textContent = `ConnectConfig - ${titles[section]}`;
  }
}
