// frontend/src/modules/connect-workshop/connect-workshop.view.ts - Compact 1280x400px version
import { ConnectWorkshopModule } from './connect-workshop.module';
import { IconComponent } from '../../components/icon.component';

export class ConnectWorkshopView {
  private currentAction: string = 'sync';
  private currentSection: string = 'requests';

  constructor(_module: ConnectWorkshopModule) {
    // module parameter available for future use
  }

  render(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'connect-workshop-compact';
    
    // Update top-bar submenu
    const submenu = document.getElementById('top-bar-submenu');
    if (submenu) submenu.textContent = '🔧 Workshop Client';
    
    // Update top-bar section title
    const sectionTitle = document.getElementById('top-bar-section-title');
    if (sectionTitle) sectionTitle.textContent = 'ConnectWorkshop - Requests';
    
    container.innerHTML = `
      <div class="compact-layout">
        <!-- Column 1: Objects -->
        <div class="menu-column">
          <h3 class="column-title">Obiekty</h3>
          <button class="section-item active" data-section="requests">
            <span class="menu-icon">${IconComponent.render('clipboard-check', { size: 18 })}</span>
            <span class="menu-label">Zgłoszenia</span>
          </button>
          <button class="section-item" data-section="services">
            <span class="menu-icon">${IconComponent.render('settings', { size: 18 })}</span>
            <span class="menu-label">Serwisy</span>
          </button>
          <button class="section-item" data-section="transport">
            <span class="menu-icon">${IconComponent.render('wrench', { size: 18 })}</span>
            <span class="menu-label">Transport</span>
          </button>
          <button class="section-item" data-section="dispositions">
            <span class="menu-icon">${IconComponent.render('hard-drive', { size: 18 })}</span>
            <span class="menu-label">Dyspozycje</span>
          </button>
        </div>

        <!-- Column 2: Actions -->
        <div class="menu-column">
          <h3 class="column-title">Akcje</h3>
          <button class="menu-item active" data-action="search">
            <span class="menu-icon">${IconComponent.render('search', { size: 18 })}</span>
            <span class="menu-label">Szukaj</span>
          </button>
  
          <button class="menu-item" data-action="new-request">
            <span class="menu-icon">${IconComponent.render('plus', { size: 18 })}</span>
            <span class="menu-label">Dodaj</span>
          </button>
          <button class="menu-item" data-action="export">
            <span class="menu-icon">${IconComponent.render('bar-chart', { size: 18 })}</span>
            <span class="menu-label">Export</span>
          </button>
          <button class="menu-item" data-action="import">
            <span class="menu-icon">${IconComponent.render('download', { size: 18 })}</span>
            <span class="menu-label">Import</span>
          </button>
          <button class="menu-item" data-action="sync">
            <span class="menu-icon">${IconComponent.render('refresh', { size: 18 })}</span>
            <span class="menu-label">Sync</span>
          </button>
        </div>

        <!-- Main Content -->
        <div class="main-content">
          <div class="content-body">
            <!-- Search Action Content -->
            <div id="search-content" class="action-content active">
              <div class="search-workshop-layout">
                <!-- Left Sidebar with Filters -->
                <div class="search-sidebar">
                  <div class="search-input-row">
                    <input type="text" id="workshop-search-input" class="search-input" placeholder="Szukaj w zgłoszeniach...">
                    <button id="workshop-search-btn" class="btn-search">🔍</button>
                  </div>
                  
                  <div class="search-filters">
                    <div class="filter-group">
                      <label class="filter-label">Status zgłoszenia:</label>
                      <select class="filter-select">
                        <option>📋 Wszystkie zgłoszenia</option>
                        <option>⏳ Oczekujące</option>
                        <option>⚙️ W trakcie</option>
                        <option>✅ Zakończone</option>
                        <option>❌ Odrzucone</option>
                      </select>
                    </div>
                    
                    <div class="filter-group">
                      <label class="filter-label">Okres czasowy:</label>
                      <select class="filter-select">
                        <option>📅 Ostatni tydzień</option>
                        <option>📆 Ostatni miesiąc</option>
                        <option>🗓️ Ostatnie 3 miesiące</option>
                        <option>📅 Cały rok</option>
                      </select>
                    </div>
                    
                    <div class="filter-group">
                      <label class="filter-label">Priorytet:</label>
                      <select class="filter-select">
                        <option>🔥 Wszystkie priorytety</option>
                        <option>🔴 Wysoki</option>
                        <option>🟡 Średni</option>
                        <option>🟢 Niski</option>
                      </select>
                    </div>
                    
                    <div class="filter-actions">
                      <button class="btn-filter-apply">✅ Zastosuj</button>
                      <button class="btn-filter-clear">🗑️ Wyczyść</button>
                    </div>
                  </div>
                </div>

                <!-- Right Content Area with Results -->
                <div class="search-results">
                  <div class="results-header">
                    <h4>📋 Wyniki wyszukiwania zgłoszeń</h4>
                    <div class="results-count">Znaleziono: <strong>23</strong> zgłoszeń</div>
                  </div>
                  
                  <div class="results-table-container">
                    <table class="results-table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Tytuł</th>
                          <th>Status</th>
                          <th>Priorytet</th>
                          <th>Data</th>
                          <th>Akcje</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>#WS-001</td>
                          <td>Naprawa czujnika temperatury</td>
                          <td><span class="status-warning">⚙️ W trakcie</span></td>
                          <td><span class="priority-high">🔴 Wysoki</span></td>
                          <td>2025-10-09</td>
                          <td>
                            <button class="btn-action view">👁️</button>
                            <button class="btn-action edit">✏️</button>
                            <button class="btn-action close">✅</button>
                          </td>
                        </tr>
                        <tr>
                          <td>#WS-002</td>
                          <td>Kalibracja RFID readera</td>
                          <td><span class="status-success">✅ Zakończone</span></td>
                          <td><span class="priority-medium">🟡 Średni</span></td>
                          <td>2025-10-08</td>
                          <td>
                            <button class="btn-action view">👁️</button>
                            <button class="btn-action report">📄</button>
                          </td>
                        </tr>
                        <tr>
                          <td>#WS-003</td>
                          <td>Wymiana baterii w skanera</td>
                          <td><span class="status-pending">⏳ Oczekujące</span></td>
                          <td><span class="priority-low">🟢 Niski</span></td>
                          <td>2025-10-07</td>
                          <td>
                            <button class="btn-action view">👁️</button>
                            <button class="btn-action start">▶️</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <!-- Services Content -->
            <div id="services-content" class="action-content">
              <div class="search-workshop-layout">
                <!-- Left Sidebar with Filters -->
                <div class="search-sidebar">
                  <div class="search-input-row">
                    <input type="text" class="search-input" placeholder="Szukaj serwisów...">
                    <button class="btn-search">🔍</button>
                  </div>
                  
                  <div class="search-filters">
                    <div class="filter-group">
                      <label class="filter-label">Status serwisu:</label>
                      <select class="filter-select">
                        <option>🔧 Wszystkie serwisy</option>
                        <option>🟢 Aktywne</option>
                        <option>🔴 Nieaktywne</option>
                        <option>⚙️ W konserwacji</option>
                        <option>⚠️ Wymagają uwagi</option>
                      </select>
                    </div>
                    
                    <div class="filter-group">
                      <label class="filter-label">Typ serwisu:</label>
                      <select class="filter-select">
                        <option>🛠️ Wszystkie typy</option>
                        <option>📡 RFID Service</option>
                        <option>📷 QR Service</option>
                        <option>📊 Barcode Service</option>
                        <option>🌡️ Sensor Service</option>
                      </select>
                    </div>
                    
                    <div class="filter-group">
                      <label class="filter-label">Lokalizacja:</label>
                      <select class="filter-select">
                        <option>🏢 Wszystkie lokalizacje</option>
                        <option>🏭 Hala A</option>
                        <option>🏭 Hala B</option>
                        <option>🏢 Biuro</option>
                        <option>🚚 Magazyn</option>
                      </select>
                    </div>
                    
                    <div class="filter-actions">
                      <button class="btn-filter-apply">✅ Zastosuj</button>
                      <button class="btn-filter-clear">🗑️ Wyczyść</button>
                    </div>
                  </div>
                </div>

                <!-- Right Content Area with Results -->
                <div class="search-results">
                  <div class="results-header">
                    <h4>🔧 Lista serwisów</h4>
                    <div class="results-count">Znaleziono: <strong>15</strong> serwisów</div>
                  </div>
                  
                  <div class="results-table-container">
                    <table class="results-table">
                      <thead>
                        <tr>
                          <th>ID Serwisu</th>
                          <th>Nazwa</th>
                          <th>Typ</th>
                          <th>Status</th>
                          <th>Lokalizacja</th>
                          <th>Ostatnia aktywność</th>
                          <th>Akcje</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>#SRV-001</td>
                          <td>RFID Reader Service</td>
                          <td>📡 RFID</td>
                          <td><span class="status-success">🟢 Aktywny</span></td>
                          <td>Hala A</td>
                          <td>2025-10-10 06:30</td>
                          <td>
                            <button class="btn-action view">👁️</button>
                            <button class="btn-action restart">🔄</button>
                            <button class="btn-action stop">⏹️</button>
                          </td>
                        </tr>
                        <tr>
                          <td>#SRV-002</td>
                          <td>QR Scanner Service</td>
                          <td>📷 QR</td>
                          <td><span class="status-warning">⚙️ Konserwacja</span></td>
                          <td>Hala B</td>
                          <td>2025-10-09 18:45</td>
                          <td>
                            <button class="btn-action view">👁️</button>
                            <button class="btn-action config">⚙️</button>
                            <button class="btn-action start">▶️</button>
                          </td>
                        </tr>
                        <tr>
                          <td>#SRV-003</td>
                          <td>Temperature Monitor</td>
                          <td>🌡️ Sensor</td>
                          <td><span class="status-success">🟢 Aktywny</span></td>
                          <td>Magazyn</td>
                          <td>2025-10-10 06:25</td>
                          <td>
                            <button class="btn-action view">👁️</button>
                            <button class="btn-action alert">🔔</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <!-- Transport Content -->
            <div id="transport-content" class="action-content">
              <div class="search-workshop-layout">
                <!-- Left Sidebar with Filters -->
                <div class="search-sidebar">
                  <div class="search-input-row">
                    <input type="text" class="search-input" placeholder="Szukaj transportów...">
                    <button class="btn-search">🔍</button>
                  </div>
                  
                  <div class="search-filters">
                    <div class="filter-group">
                      <label class="filter-label">Status transportu:</label>
                      <select class="filter-select">
                        <option>🚚 Wszystkie transporty</option>
                        <option>📅 Zaplanowane</option>
                        <option>🚛 W drodze</option>
                        <option>✅ Dostarczone</option>
                        <option>⚠️ Opóźnione</option>
                        <option>❌ Anulowane</option>
                      </select>
                    </div>
                    
                    <div class="filter-group">
                      <label class="filter-label">Typ ładunku:</label>
                      <select class="filter-select">
                        <option>📦 Wszystkie typy</option>
                        <option>⚙️ Części zamienne</option>
                        <option>🔧 Narzędzia</option>
                        <option>📱 Elektronika</option>
                        <option>🧪 Materiały testowe</option>
                      </select>
                    </div>
                    
                    <div class="filter-group">
                      <label class="filter-label">Kierowca:</label>
                      <select class="filter-select">
                        <option>👤 Wszyscy kierowcy</option>
                        <option>Jan Kowalski</option>
                        <option>Anna Nowak</option>
                        <option>Piotr Wiśniewski</option>
                      </select>
                    </div>
                    
                    <div class="filter-actions">
                      <button class="btn-filter-apply">✅ Zastosuj</button>
                      <button class="btn-filter-clear">🗑️ Wyczyść</button>
                    </div>
                  </div>
                </div>

                <!-- Right Content Area with Results -->
                <div class="search-results">
                  <div class="results-header">
                    <h4>🚚 Lista transportów</h4>
                    <div class="results-count">Znaleziono: <strong>8</strong> transportów</div>
                  </div>
                  
                  <div class="results-table-container">
                    <table class="results-table">
                      <thead>
                        <tr>
                          <th>ID Transportu</th>
                          <th>Ładunek</th>
                          <th>Kierowca</th>
                          <th>Status</th>
                          <th>Data dostawy</th>
                          <th>Lokalizacja</th>
                          <th>Akcje</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>#TRP-001</td>
                          <td>⚙️ Części do RFID</td>
                          <td>Jan Kowalski</td>
                          <td><span class="status-warning">🚛 W drodze</span></td>
                          <td>2025-10-10</td>
                          <td>Warszawa → Kraków</td>
                          <td>
                            <button class="btn-action view">👁️</button>
                            <button class="btn-action track">📍</button>
                            <button class="btn-action contact">📞</button>
                          </td>
                        </tr>
                        <tr>
                          <td>#TRP-002</td>
                          <td>📱 Skanery QR</td>
                          <td>Anna Nowak</td>
                          <td><span class="status-success">✅ Dostarczone</span></td>
                          <td>2025-10-09</td>
                          <td>Gdańsk → Wrocław</td>
                          <td>
                            <button class="btn-action view">👁️</button>
                            <button class="btn-action receipt">🧾</button>
                          </td>
                        </tr>
                        <tr>
                          <td>#TRP-003</td>
                          <td>🧪 Materiały testowe</td>
                          <td>Piotr Wiśniewski</td>
                          <td><span class="status-pending">📅 Zaplanowane</span></td>
                          <td>2025-10-11</td>
                          <td>Poznań → Łódź</td>
                          <td>
                            <button class="btn-action view">👁️</button>
                            <button class="btn-action edit">✏️</button>
                            <button class="btn-action start">▶️</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <!-- Dispositions Content -->
            <div id="dispositions-content" class="action-content">
              <div class="search-workshop-layout">
                <!-- Left Sidebar with Filters -->
                <div class="search-sidebar">
                  <div class="search-input-row">
                    <input type="text" class="search-input" placeholder="Szukaj dyspozycji...">
                    <button class="btn-search">🔍</button>
                  </div>
                  
                  <div class="search-filters">
                    <div class="filter-group">
                      <label class="filter-label">Status dyspozycji:</label>
                      <select class="filter-select">
                        <option>📋 Wszystkie dyspozycje</option>
                        <option>🆕 Nowe</option>
                        <option>👀 Przeglądane</option>
                        <option>⚙️ W realizacji</option>
                        <option>✅ Zakończone</option>
                        <option>❌ Odrzucone</option>
                      </select>
                    </div>
                    
                    <div class="filter-group">
                      <label class="filter-label">Typ dyspozycji:</label>
                      <select class="filter-select">
                        <option>📝 Wszystkie typy</option>
                        <option>🔧 Naprawa</option>
                        <option>📊 Konserwacja</option>
                        <option>🔍 Inspekcja</option>
                        <option>⚠️ Awaria</option>
                        <option>🔄 Wymiana</option>
                      </select>
                    </div>
                    
                    <div class="filter-group">
                      <label class="filter-label">Priorytet:</label>
                      <select class="filter-select">
                        <option>🔥 Wszystkie priorytety</option>
                        <option>🔴 Krytyczny</option>
                        <option>🟡 Wysoki</option>
                        <option>🟢 Normalny</option>
                        <option>⚪ Niski</option>
                      </select>
                    </div>
                    
                    <div class="filter-actions">
                      <button class="btn-filter-apply">✅ Zastosuj</button>
                      <button class="btn-filter-clear">🗑️ Wyczyść</button>
                    </div>
                  </div>
                </div>

                <!-- Right Content Area with Results -->
                <div class="search-results">
                  <div class="results-header">
                    <h4>📋 Lista dyspozycji</h4>
                    <div class="results-count">Znaleziono: <strong>12</strong> dyspozycji</div>
                  </div>
                  
                  <div class="results-table-container">
                    <table class="results-table">
                      <thead>
                        <tr>
                          <th>ID Dyspozycji</th>
                          <th>Tytuł</th>
                          <th>Typ</th>
                          <th>Priorytet</th>
                          <th>Status</th>
                          <th>Wykonawca</th>
                          <th>Termin</th>
                          <th>Akcje</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>#DSP-001</td>
                          <td>Wymiana baterii w czytniku RFID</td>
                          <td>🔄 Wymiana</td>
                          <td><span class="priority-high">🟡 Wysoki</span></td>
                          <td><span class="status-warning">⚙️ W realizacji</span></td>
                          <td>Jan Kowalski</td>
                          <td>2025-10-10</td>
                          <td>
                            <button class="btn-action view">👁️</button>
                            <button class="btn-action edit">✏️</button>
                            <button class="btn-action complete">✅</button>
                          </td>
                        </tr>
                        <tr>
                          <td>#DSP-002</td>
                          <td>Inspekcja czujników temperatury</td>
                          <td>🔍 Inspekcja</td>
                          <td><span class="priority-medium">🟢 Normalny</span></td>
                          <td><span class="status-pending">🆕 Nowa</span></td>
                          <td>Anna Nowak</td>
                          <td>2025-10-12</td>
                          <td>
                            <button class="btn-action view">👁️</button>
                            <button class="btn-action assign">👤</button>
                            <button class="btn-action start">▶️</button>
                          </td>
                        </tr>
                        <tr>
                          <td>#DSP-003</td>
                          <td>Naprawa skanera QR #2</td>
                          <td>🔧 Naprawa</td>
                          <td><span class="priority-high">🔴 Krytyczny</span></td>
                          <td><span class="status-success">✅ Zakończone</span></td>
                          <td>Piotr Wiśniewski</td>
                          <td>2025-10-09</td>
                          <td>
                            <button class="btn-action view">👁️</button>
                            <button class="btn-action report">📄</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sync Action Content -->
            <div id="sync-content" class="action-content">
              <div class="sync-status">
                <div class="sync-info">
                  <div class="sync-item">
                    <span class="sync-label">Ostatnia synchronizacja:</span>
                    <span class="sync-value">2025-10-08 20:45</span>
                  </div>
                  <div class="sync-item">
                    <span class="sync-label">Status połączenia:</span>
                    <span class="sync-value">✅ Połączony</span>
                  </div>
                  <div class="sync-item">
                    <span class="sync-label">Oczekujące elementy:</span>  
                    <span class="sync-value">3</span>
                  </div>
                </div>
                <button class="btn-sync">🔄 Synchronizuj Teraz</button>
              </div>
            </div>

            <!-- New Request Action Content -->
            <div id="new-request-content" class="action-content">
              <div class="form-container">
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
                    <label>Typ zgłoszenia:</label>
                    <select class="form-select">
                      <option>🔧 Konserwacja</option>
                      <option>⚡ Naprawa</option>
                      <option>📋 Przegląd</option>
                      <option>🔄 Kalibracja</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label>Priorytet:</label>
                  <select class="form-select">
                    <option>🔴 Wysoki</option>
                    <option>🟡 Średni</option>
                    <option>🟢 Niski</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Opis problemu:</label>
                  <textarea class="form-textarea" rows="4" placeholder="Opisz szczegółowo problem z urządzeniem..."></textarea>
                </div>
                <button class="btn-submit">📝 Utwórz Zgłoszenie</button>
              </div>
            </div>

            <!-- New Transport Action Content -->
            <div id="new-transport-content" class="action-content">
              <div class="form-container">
                <div class="form-row">
                  <div class="form-group">
                    <label>Kierowca:</label>
                    <select class="form-select">
                      <option>👤 Jan Kowalski</option>
                      <option>👤 Anna Nowak</option>
                      <option>👤 Piotr Wiśniewski</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Pojazd:</label>
                    <select class="form-select">
                      <option>🚚 FLT-001 (Mercedes Sprinter)</option>
                      <option>🚚 FLT-002 (Ford Transit)</option>
                      <option>🚚 FLT-003 (Volkswagen Crafter)</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label>Typ transportu:</label>
                  <select class="form-select">
                    <option>📤 Odbiór z klienta</option>
                    <option>📥 Dostawa do klienta</option>
                    <option>🔄 Transfer między magazynami</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Uwagi do transportu:</label>
                  <textarea class="form-textarea" rows="3" placeholder="Dodatkowe informacje..."></textarea>
                </div>
                <button class="btn-submit">🚚 Utwórz Transport</button>
              </div>
            </div>

            <!-- New Disposition Action Content -->
            <div id="new-disposition-content" class="action-content">
              <div class="form-container">
                <div class="form-row">
                  <div class="form-group">
                    <label>Typ dyspozycji:</label>
                    <select class="form-select">
                      <option>📥 Przyjęcie urządzeń</option>
                      <option>📤 Wydanie urządzeń</option>
                      <option>🔄 Przekazanie między magazynami</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Magazyn:</label>
                    <select class="form-select">
                      <option>🏭 Magazyn Główny</option>
                      <option>🏪 Magazyn Serwisowy</option>
                      <option>📦 Magazyn Zapasów</option>
                    </select>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label>Odpowiedzialny:</label>
                    <select class="form-select">
                      <option>👤 Magazynier A</option>
                      <option>👤 Magazynier B</option>
                      <option>👤 Kierownik Magazynu</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Data planowana:</label>
                    <input type="date" class="form-input" value="2025-10-09">
                  </div>
                </div>
                <button class="btn-submit">📦 Utwórz Dyspozycję</button>
              </div>
            </div>

            <!-- Export Action Content -->
            <div id="export-content" class="action-content">
              <div class="form-container">
                <div class="form-row">
                  <div class="form-group">
                    <label>Operacja:</label>
                    <select class="form-select" id="export-operation">
                      <option value="export">📊 Eksport do pliku</option>
                      <option value="backup">💾 Backup systemu</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Typ danych:</label>
                    <select class="form-select">
                      <option>📋 Zgłoszenia</option>
                      <option>⚙️ Serwisy</option>
                      <option>🚚 Transport</option>
                      <option>📦 Dyspozycje</option>
                      <option>🗄️ Wszystkie dane</option>
                    </select>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label>Format/Lokalizacja:</label>
                    <select class="form-select">
                      <option>📄 CSV</option>
                      <option>📗 Excel</option>
                      <option>📋 JSON</option>
                      <option>💾 Backup Archive (.bak)</option>
                      <option>☁️ Cloud Backup</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Zakres dat:</label>
                    <div class="form-row">
                      <input type="date" class="form-input" value="2025-10-01">
                      <input type="date" class="form-input" value="2025-10-08">
                    </div>
                  </div>
                </div>
                <div class="backup-options">
                  <label><input type="checkbox" checked> Kompresuj dane</label>
                  <label><input type="checkbox"> Szyfruj backup</label>
                  <label><input type="checkbox"> Weryfikuj integralność</label>
                  <label><input type="checkbox"> Automatyczny backup co tydzień</label>
                </div>
                <button class="btn-submit">💾 Wykonaj Operację</button>
              </div>
            </div>

            <!-- Import Action Content -->
            <div id="import-content" class="action-content">
              <div class="form-container">
                <div class="form-group">
                  <label>Wybierz plik:</label>
                  <input type="file" class="form-input" accept=".csv,.xlsx,.json">
                </div>
                <div class="form-group">
                  <label>Typ importu:</label>
                  <select class="form-select">
                    <option>📋 Zgłoszenia z Fleet Manager</option>
                    <option>⚙️ Harmonogram serwisów</option>
                    <option>🚚 Plan transportu</option>
                    <option>📦 Lista dyspozycji</option>
                  </select>
                </div>
                <div class="import-options">
                  <label><input type="checkbox" checked> Zastąp istniejące dane</label>
                  <label><input type="checkbox"> Utwórz kopię zapasową</label>
                  <label><input type="checkbox"> Sprawdź duplikaty</label>
                </div>
                <button class="btn-submit">📥 Importuj Dane</button>
              </div>
            </div>



            <!-- Service Section -->
            <div id="service-content" class="section-content">
              <div class="service-info">
                <div class="config-list">
                  <div class="config-item">
                    <span class="config-label">Endpoint:</span>
                    <span class="config-value">http://api.workshop.local</span>
                  </div>
                  <div class="config-item">
                    <span class="config-label">Status:</span>
                    <span class="config-value">✅ Połączony</span>
                  </div>
                  <div class="config-item">
                    <span class="config-label">Ostatni sync:</span>
                    <span class="config-value" id="last-sync-time">teraz</span>
                  </div>
                </div>
                <button class="btn-test-connection">🔌 Test połączenia</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Notification Container -->
      <div id="notification-container" class="notification-container"></div>
    `;

    this.addStyles();
    this.setupEventListeners(container);

    return container;
  }

  private addStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      .connect-workshop-compact {
        height: 100%;
        overflow: hidden;
      }

      .compact-layout {
        display: flex;
        height: 365px;
        background: #f5f5f5;
      }

      /* Menu Columns */
      .menu-column {
        width: 100px;
        background: #2a2a2a;
        padding: 6px 4px;
        overflow-y: auto;
        flex-shrink: 0;
        border-right: 1px solid #1a1a1a;
      }

      .column-title {
        color: #FFF;
        font-size: 9px;
        font-weight: 600;
        text-transform: uppercase;
        margin: 0 0 6px 0;
        padding: 4px;
        text-align: center;
        background: #1a1a1a;
        border-radius: 3px;
      }

      .menu-item, .section-item {
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

      .menu-icon {
        font-size: 13px;
      }

      .menu-label {
        font-size: 12px;
        font-weight: 500;
        text-align: center;
      }

      .menu-item:hover, .section-item:hover {
        background: #4a4a4a;
        color: white;
      }

      .menu-item.active, .section-item.active {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }

      /* Main Content */
      .main-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        background: white;
        overflow: hidden;
      }


      .content-body {
        flex: 1;
        padding: 10px;
        overflow-y: auto;
        position: relative;
      }

      .section-content {
        display: none;
      }

      .section-content.active {
        display: block;
      }

      /* Filters */
      .filters-compact {
        display: flex;
        gap: 8px;
        margin-bottom: 10px;
      }

      .filter-select, .filter-input {
        padding: 6px 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 12px;
      }

      .filter-select {
        min-width: 120px;
      }

      .filter-input {
        flex: 1;
      }

      /* Cards */
      .request-card, .transport-card, .disposition-card {
        background: white;
        border: 1px solid #e0e0e0;
        border-radius: 6px;
        padding: 10px;
        margin-bottom: 8px;
        transition: all 0.2s;
      }

      .request-card:hover, .transport-card:hover, .disposition-card:hover {
        border-color: #667eea;
        box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2);
      }

      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
        padding-bottom: 6px;
        border-bottom: 1px solid #f0f0f0;
      }

      .request-id, .transport-id, .disposition-id {
        font-weight: 600;
        font-size: 12px;
        color: #333;
      }

      .badge {
        padding: 3px 8px;
        border-radius: 10px;
        font-size: 10px;
        font-weight: 600;
      }

      .badge-pending { background: #fff3cd; color: #856404; }
      .badge-processing { background: #cfe2ff; color: #084298; }
      .badge-completed { background: #d1e7dd; color: #0f5132; }
      .badge-cancelled { background: #f8d7da; color: #842029; }
      .badge-active { background: #d1ecf1; color: #0c5460; }
      .badge-new { background: #e7e7ff; color: #4a4aff; }

      .card-body {
        font-size: 11px;
      }

      .info-line {
        display: flex;
        justify-content: space-between;
        margin-bottom: 4px;
      }

      .info-line .label {
        color: #666;
      }

      .info-line .value {
        color: #333;
        font-weight: 500;
      }

      /* Service Section */
      .service-info {
        padding: 10px;
      }

      .service-info h3 {
        margin: 0 0 10px 0;
        font-size: 13px;
      }

      .config-list {
        background: #f8f9fa;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 10px;
      }

      .config-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 6px;
        font-size: 11px;
      }

      .config-label {
        color: #666;
      }

      .config-value {
        font-weight: 500;
        color: #333;
      }

      .btn-test-connection {
        width: 100%;
        padding: 8px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 600;
      }

      /* Content Layout Full Width */
      .main-content { flex: 1; }


      /* Quick action button removed - actions moved to main menu */

      /* Notification */
      .notification-container {
        position: fixed;
        top: 45px;
        right: 10px;
        z-index: 1000;
        max-width: 300px;
      }

      /* Scrollbars */
      .menu-column::-webkit-scrollbar,
      .content-body::-webkit-scrollbar {
        width: 4px;
      }

      .menu-column::-webkit-scrollbar-track {
        background: #1a1a1a;
      }

      .content-body::-webkit-scrollbar-track {
        background: #f0f0f0;
      }

      .menu-column::-webkit-scrollbar-thumb {
        background: #555;
        border-radius: 2px;
      }

      .content-body::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 2px;
      }

      /* Action Content */
      .action-content { display: none; }
      .action-content.active { display: block; }
      
      /* Form Styles */
      .form-container { background: #f8f9fa; padding: 20px; border-radius: 8px; }
      .form-row { display: flex; gap: 15px; margin-bottom: 15px; }
      .form-group { flex: 1; }
      .form-group label { display: block; margin-bottom: 5px; font-size: 11px; font-weight: 600; color: #666; }
      .form-input, .form-select, .form-textarea { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 12px; }
      .form-textarea { resize: vertical; font-family: inherit; }
      .btn-submit { width: 100%; padding: 12px; background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600; margin-top: 10px; }
      .btn-sync { width: 100%; padding: 12px; background: linear-gradient(135deg, #17a2b8 0%, #138496 100%); color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600; margin-top: 15px; }

      /* Sync Status */
      .sync-status { background: #f8f9fa; padding: 10px 20px; border-radius: 8px; }
      .sync-info { margin: 15px 0; }
      .sync-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e9ecef; }
      .sync-item:last-child { border-bottom: none; }
      .sync-label { font-size: 12px; color: #666; font-weight: 600; }
      .sync-value { font-size: 12px; color: #333; font-weight: 600; }

      /* Import Options */
      .import-options { margin: 15px 0; }
      .import-options label { display: block; margin-bottom: 8px; font-size: 12px; cursor: pointer; }
      .import-options input[type="checkbox"] { margin-right: 8px; }

      /* Backup Options */
      .backup-options { margin: 15px 0; }
      .backup-options label { display: block; margin-bottom: 8px; font-size: 12px; cursor: pointer; }
      .backup-options input[type="checkbox"] { margin-right: 8px; }

      /* Service Cards */
      .service-card { background: white; border: 1px solid #e0e0e0; border-radius: 6px; padding: 12px; margin-bottom: 10px; }
      .service-id { font-weight: 600; font-size: 12px; color: #333; }
      .badge-active { background: #d1ecf1; color: #0c5460; padding: 2px 8px; border-radius: 4px; font-size: 10px; }
      .badge-completed { background: #d4edda; color: #155724; padding: 2px 8px; border-radius: 4px; font-size: 10px; }

      /* Search Workshop Styles */
      .search-workshop-layout { display: flex; gap: 15px; padding: 10px; }
      .search-sidebar { 
        min-width: 240px; 
        background: #f8f9fa; 
        padding: 12px; 
        border-radius: 6px; 
        border: 1px solid #e0e0e0;
        height: fit-content;
      }
      .search-input-row { display: flex; gap: 6px; margin-bottom: 12px; }
      .search-input { flex: 1; padding: 6px 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 11px; }
      .btn-search { padding: 6px 12px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px; }
      
      .search-filters { display: flex; flex-direction: column; gap: 10px; }
      .filter-group { display: flex; flex-direction: column; gap: 3px; }
      .filter-label { font-size: 10px; font-weight: 600; color: #333; }
      .filter-select { padding: 5px 6px; border: 1px solid #ddd; border-radius: 3px; font-size: 10px; background: white; }
      
      .filter-actions { display: flex; gap: 6px; margin-top: 8px; }
      .btn-filter-apply { padding: 4px 10px; background: #28a745; color: white; border: none; border-radius: 3px; font-size: 9px; cursor: pointer; }
      .btn-filter-clear { padding: 4px 10px; background: #6c757d; color: white; border: none; border-radius: 3px; font-size: 9px; cursor: pointer; }
      
      .search-results { flex: 1; }
      .results-header { 
        display: flex; 
        justify-content: space-between; 
        align-items: center; 
        margin-bottom: 10px; 
        padding-bottom: 6px; 
        border-bottom: 1px solid #e0e0e0;
      }
      .results-header h4 { margin: 0; font-size: 14px; color: #333; }
      .results-count { font-size: 11px; color: #666; }
      
      .results-table-container { background: white; border-radius: 6px; border: 1px solid #e0e0e0; overflow: hidden; }
      .results-table { width: 100%; border-collapse: collapse; }
      .results-table th { background: #f8f9fa; padding: 6px 8px; text-align: left; font-size: 10px; font-weight: 600; border-bottom: 1px solid #e0e0e0; }
      .results-table td { padding: 6px 8px; font-size: 10px; border-bottom: 1px solid #f0f0f0; }
      .results-table tr:hover { background: #f8f9fa; }
      
      .priority-high { color: #dc3545; font-weight: 600; }
      .priority-medium { color: #ffc107; font-weight: 600; }
      .priority-low { color: #28a745; font-weight: 600; }
      .status-pending { color: #6c757d; font-weight: 600; }
      .status-warning { color: #ffc107; font-weight: 600; }
      
      /* Search Results */
      .search-results { max-height: 250px; overflow-y: auto; }
      .result-item { display: flex; align-items: center; padding: 12px; margin-bottom: 8px; background: white; border: 1px solid #e0e0e0; border-radius: 6px; cursor: pointer; transition: all 0.2s; }
      .result-item:hover { border-color: #667eea; background: #f8f9ff; }
      .result-icon { width: 30px; height: 30px; background: #667eea; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 14px; }
      .result-details { flex: 1; }
      .result-title { font-size: 12px; font-weight: 600; color: #333; margin-bottom: 3px; }
      .result-description { font-size: 10px; color: #666; margin-bottom: 2px; }
      .result-id { font-size: 9px; color: #999; font-weight: 600; }
      .result-status { padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: 600; }
      
      /* Badge Styles */
      .badge { padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: 600; text-align: center; }
      .badge-pending { background: #fff3cd; color: #856404; }
      .badge-active { background: #d1ecf1; color: #0c5460; }
      .badge-completed { background: #d1e7dd; color: #0f5132; }
    `;
    document.head.appendChild(style);
  }

  private setupEventListeners(container: HTMLElement): void {
    console.log('🔧 ConnectWorkshop: Setting up event listeners');
    
    // Actions
    const actionButtons = container.querySelectorAll('[data-action]');
    console.log(`🔧 ConnectWorkshop: Found ${actionButtons.length} action buttons`);
    
    actionButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const action = target.getAttribute('data-action');
        console.log(`🔧 ConnectWorkshop: Action clicked: ${action}`);
        if (action) {
          this.handleAction(action, container);
        }
      });
    });

    // Sections
    const sectionButtons = container.querySelectorAll('[data-section]');
    console.log(`🔧 ConnectWorkshop: Found ${sectionButtons.length} section buttons`);
    
    sectionButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const section = target.getAttribute('data-section');
        console.log(`🔧 ConnectWorkshop: Section clicked: ${section}`);
        if (section) {
          this.switchSection(section, container);
        }
      });
    });

    // Force sync functionality moved to Sync action in main menu
    
    // Initialize search results with default section (requests)
    this.updateSearchResults(container, this.currentSection);
  }

  // Public methods for URL routing support
  public setInitialSection(section: string): void {
    console.log(`🔧 ConnectWorkshop: Setting initial section from URL: ${section}`);
    this.currentSection = section;
    
    const container = document.querySelector('.connect-workshop-compact');
    if (container) {
      // Update UI without triggering URL change
      container.querySelectorAll('[data-section]').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === section) {
          item.classList.add('active');
        }
      });
      
      // Update content visibility
      container.querySelectorAll('.section-content').forEach(content => {
        content.classList.remove('active');
      });
      const activeContent = container.querySelector(`#${section}-content`);
      if (activeContent) {
        activeContent.classList.add('active');
      }
      
      this.updateActionFormsContext(container as HTMLElement, this.currentAction);
    }
  }

  public setInitialAction(action: string): void {
    console.log(`🔧 ConnectWorkshop: Setting initial action from URL: ${action}`);
    this.currentAction = action;
    
    const container = document.querySelector('.connect-workshop-compact');
    if (container) {
      // Update UI without triggering URL change
      container.querySelectorAll('[data-action]').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-action') === action) {
          item.classList.add('active');
        }
      });
      
      // Update action content visibility
      container.querySelectorAll('.action-content').forEach(content => {
        content.classList.remove('active');
      });
      const activeContent = container.querySelector(`#${action}-content`);
      if (activeContent) {
        activeContent.classList.add('active');
      }
      
      this.updateActionFormsContext(container as HTMLElement, action);
    }
  }

  private handleAction(action: string, container: HTMLElement): void {
    this.currentAction = action;

    // Update URL hash with action
    const currentHash = window.location.hash.slice(2); // Remove '#/'
    const [moduleName, section] = currentHash.split('/');
    const newSection = section || this.currentSection;
    window.location.hash = `#/${moduleName}/${newSection}/${action}`;
    console.log(`🔧 ConnectWorkshop: Updated URL to: ${window.location.hash}`);

    // Update active state
    container.querySelectorAll('[data-action]').forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-action') === action) {
        item.classList.add('active');
      }
    });

    // Hide all action contents
    container.querySelectorAll('.action-content').forEach(content => {
      content.classList.remove('active');
    });

    // Show selected action content
    const activeContent = container.querySelector(`#${action}-content`);
    if (activeContent) {
      activeContent.classList.add('active');
    }

    // Synchronize forms with current section context
    this.updateActionFormsContext(container, action);

    // Update top-bar title
    const sectionTitles: any = {
      'requests': 'Zgłoszenia',
      'services': 'Serwisy',
      'transport': 'Transport',
      'dispositions': 'Dyspozycje'
    };

    const actionTitles: any = {
      'search': 'Szukaj',
      'sync': 'Sync',
      'new-request': 'Nowe Zgłoszenie',
      'export': 'Eksport i Backup',
      'import': 'Import Danych'
    };

    const currentSectionName = sectionTitles[this.currentSection] || 'Obiekty';
    const topBarTitle = document.getElementById('top-bar-section-title');
    if (topBarTitle) {
      topBarTitle.textContent = `ConnectWorkshop - ${currentSectionName} - ${actionTitles[action]}`;
    }

    // Update status
    const statusAction = container.querySelector('#status-action');
    if (statusAction) statusAction.textContent = actionTitles[action];

    const sectionNames = sectionTitles[this.currentSection] || 'obiektów';
    switch (action) {
      case 'search':
        this.showNotification(`🔍 Wyszukiwanie w ${sectionNames}`, 'info');
        // Update search results when switching to search action
        this.updateSearchResults(container, this.currentSection);
        break;
      case 'sync':
        this.showNotification(`🔄 Synchronizacja ${sectionNames}`, 'info');
        break;
      case 'new-request':
        this.showNotification(`➕ Nowe zgłoszenie dla ${sectionNames}`, 'info');
        break;
      case 'export':
        this.showNotification(`📊 Eksport i backup ${sectionNames}`, 'info');
        break;
      case 'import':
        this.showNotification(`📥 Import ${sectionNames}`, 'info');
        break;
    }
  }

  private switchSection(section: string, container: HTMLElement): void {
    console.log(`🔧 ConnectWorkshop: Switching to section: ${section}`);
    this.currentSection = section;

    // Update URL hash with section
    const currentHash = window.location.hash.slice(2); // Remove '#/'
    const [moduleName] = currentHash.split('/');
    window.location.hash = `#/${moduleName}/${section}`;
    console.log(`🔧 ConnectWorkshop: Updated URL to: ${window.location.hash}`);

    // Update section menu
    container.querySelectorAll('[data-section]').forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-section') === section) {
        item.classList.add('active');
      }
    });

    // Update content
    container.querySelectorAll('.section-content').forEach(content => {
      content.classList.remove('active');
    });
    const activeContent = container.querySelector(`#${section}-content`);
    if (activeContent) {
      activeContent.classList.add('active');
    }

    // Synchronize forms with the new section context
    this.updateActionFormsContext(container, this.currentAction);

    // Update search results if current action is search
    if (this.currentAction === 'search') {
      this.updateSearchResults(container, section);
    }

    // Update title in top-bar
    const titles = {
      'requests': 'ConnectWorkshop - Zgłoszenia',
      'services': 'ConnectWorkshop - Serwisy',
      'transport': 'ConnectWorkshop - Transport',
      'dispositions': 'ConnectWorkshop - Dyspozycje'
    };
    const topBarTitle = document.getElementById('top-bar-section-title');
    if (topBarTitle) {
      topBarTitle.textContent = titles[section as keyof typeof titles] || 'ConnectWorkshop';
    }
  }

  private updateSearchResults(container: HTMLElement, section: string): void {
    const searchResults = container.querySelector('.search-results');
    if (!searchResults) {
      console.warn('Search results container not found');
      return;
    }
    
    console.log(`🔄 Updating search results for section: ${section}`);

    // Define different data sets for each section
    const sectionData: any = {
      'requests': [
        { icon: '📋', id: 'REQ-001', title: 'Awaria PSS-7000', desc: 'Urządzenie: PSS-7000 #12345', status: 'Otwarte', badge: 'badge-pending' },
        { icon: '📋', id: 'REQ-002', title: 'Kalibracja PSS-5000', desc: 'Urządzenie: PSS-5000 #67890', status: 'W trakcie', badge: 'badge-active' },
        { icon: '📋', id: 'REQ-003', title: 'Serwis PSS-3000', desc: 'Urządzenie: PSS-3000 #11111', status: 'Zakończone', badge: 'badge-completed' }
      ],
      'services': [
        { icon: '⚙️', id: 'SERV-001', title: 'Serwis okresowy', desc: 'Technik: Jan Kowalski', status: 'Aktywny', badge: 'badge-active' },
        { icon: '⚙️', id: 'SERV-002', title: 'Naprawa główna', desc: 'Technik: Anna Nowak', status: 'Zakończony', badge: 'badge-completed' },
        { icon: '⚙️', id: 'SERV-003', title: 'Konserwacja', desc: 'Technik: Piotr Wiśniewski', status: 'Zaplanowany', badge: 'badge-pending' }
      ],
      'transport': [
        { icon: '🚚', id: 'TRANS-001', title: 'Dostawa urządzeń', desc: 'Kierowca: Jan Kowalski', status: 'W drodze', badge: 'badge-active' },
        { icon: '🚚', id: 'TRANS-002', title: 'Odbiór z serwisu', desc: 'Kierowca: Anna Nowak', status: 'Zakończony', badge: 'badge-completed' },
        { icon: '🚚', id: 'TRANS-003', title: 'Transport awaryjny', desc: 'Kierowca: Piotr Wiśniewski', status: 'Zaplanowany', badge: 'badge-pending' }
      ],
      'dispositions': [
        { icon: '📦', id: 'DISP-001', title: 'Wydanie PSS-7000', desc: 'Magazyn A → Sekcja 1', status: 'Wydane', badge: 'badge-completed' },
        { icon: '📦', id: 'DISP-002', title: 'Przyjęcie PSS-5000', desc: 'Serwis → Magazyn B', status: 'W trakcie', badge: 'badge-active' },
        { icon: '📦', id: 'DISP-003', title: 'Transfer urządzeń', desc: 'Magazyn A → Magazyn B', status: 'Zaplanowane', badge: 'badge-pending' }
      ]
    };

    const data = sectionData[section] || sectionData['requests'];
    
    searchResults.innerHTML = data.map((item: any) => `
      <div class="result-item">
        <div class="result-icon">${item.icon}</div>
        <div class="result-details">
          <div class="result-title">${item.title}</div>
          <div class="result-description">${item.desc}</div>
          <span class="result-id">${item.id}</span>
        </div>
        <span class="badge ${item.badge}">${item.status}</span>
      </div>
    `).join('');
    
    console.log(`✅ Search results updated with ${data.length} items for ${section}`);
  }

  // Reserved for future use
  private forceSync(_container: HTMLElement): void {
    this.showNotification('🔄 Synchronizacja w trakcie...', 'info');
    
    // Simulate sync
    setTimeout(() => {
      const lastSyncEl = document.querySelector('#last-sync');
      const lastSyncTimeEl = document.querySelector('#last-sync-time');
      
      if (lastSyncEl) lastSyncEl.textContent = `teraz`;
      if (lastSyncTimeEl) lastSyncTimeEl.textContent = `teraz`;
      
      this.showNotification('✅ Synchronizacja zakończona', 'success');
    }, 1500);
  }

  private updateActionFormsContext(container: HTMLElement, _action: string): void {
    console.log(`🔧 ConnectWorkshop: Updating forms context for action: ${_action}, section: ${this.currentSection}`);
    const sectionTitles: any = {
      'requests': 'Zgłoszenia',
      'services': 'Serwisy',
      'transport': 'Transport',
      'dispositions': 'Dyspozycje'
    };

    const currentSectionName = sectionTitles[this.currentSection] || 'Obiekty';

    // Update form titles based on current section
    const newRequestTitle = container.querySelector('#new-request-content h4');
    if (newRequestTitle) newRequestTitle.textContent = `➕ Nowe Zgłoszenie - ${currentSectionName}`;

    const exportTitle = container.querySelector('#export-content h4');
    if (exportTitle) exportTitle.textContent = `📊 Eksport i Backup - ${currentSectionName}`;

    const importTitle = container.querySelector('#import-content h4');
    if (importTitle) importTitle.textContent = `📥 Import - ${currentSectionName}`;

    // Update form fields based on section type
    this.updateSectionForms(container, this.currentSection);
  }

  private updateSectionForms(container: HTMLElement, sectionType: string): void {
    // Update type options in export form based on current section
    const exportTypeSelect = container.querySelector('#export-content .form-select:nth-of-type(2)');
    if (exportTypeSelect) {
      const sectionOptions: any = {
        'requests': ['📋 Zgłoszenia', '🔧 Serwisy do zgłoszeń', '👤 Użytkownicy zgłoszeń'],
        'services': ['⚙️ Serwisy', '📋 Raporty serwisowe', '🔧 Historia napraw'],
        'transport': ['🚚 Transport', '📦 Paczki', '🗓️ Harmonogramy dostaw'],
        'dispositions': ['📦 Dyspozycje', '🏭 Lokalizacje', '📊 Statusy dyspozycji']
      };

      const options = sectionOptions[sectionType] || sectionOptions['requests'];
      exportTypeSelect.innerHTML = '';
      
      options.forEach((option: string) => {
        const optionElement = document.createElement('option');
        optionElement.textContent = option;
        exportTypeSelect.appendChild(optionElement);
      });
    }

    // Update import type options
    const importTypeSelect = container.querySelector('#import-content .form-select:nth-of-type(2)');
    if (importTypeSelect) {
      const importOptions: any = {
        'requests': ['📋 Zgłoszenia z Fleet Manager', '🔧 Dane serwisowe'],
        'services': ['⚙️ Harmonogram serwisów', '📊 Raporty serwisowe'],
        'transport': ['🚚 Plan transportu', '📦 Lista przesyłek'],
        'dispositions': ['📦 Lista dyspozycji', '🏭 Mapowanie lokalizacji']
      };

      const options = importOptions[sectionType] || importOptions['requests'];
      importTypeSelect.innerHTML = '';
      
      options.forEach((option: string) => {
        const optionElement = document.createElement('option');
        optionElement.textContent = option;
        importTypeSelect.appendChild(optionElement);
      });
    }
  }

  private showNotification(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info'): void {
    // Use console logging instead of right panel notifications
    console.log(`${type.toUpperCase()}: ${message}`);
  }
}
