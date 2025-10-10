import { ConnectFilterModule } from './connect - data.module';
import { IconComponent } from '../../components / icon.component';

export class ConnectDataView {
  // private module: ConnectFilterModule; // Reserved for future use
  private currentObject: string = 'users';
  private currentAction: string = 'search';

  constructor(_module: ConnectFilterModule) {
    // Module parameter reserved for future use
  }

  render(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'connect - data - compact';

    // Update top - bar submenu;
    const submenu = document.getElementById('top - bar - submenu');
    if (submenu) submenu.textContent = '📊 Data Management & Analytics';

    // Update top - bar section title;
    const sectionTitle = document.getElementById('top - bar - section - title');
    if (sectionTitle) sectionTitle.textContent = 'ConnectData - Użytkownicy - Szukaj';

    container.innerHTML = `
      <div class="compact - layout">
        <!-- Column 1: Objects -->
        <div class="menu - column">
          <h3 class="column - title">Obiekty</h3>
          <button class="object - item active" data - object="users">
            <span class="menu - icon">${IconComponent.render('user', { size: 18 })}</span>
            <span class="menu - label">Użytkownicy</span>
          </button>
          <button class="object - item" data - object="test - scenarios">
            <span class="menu - icon">${IconComponent.render('flask', { size: 18 })}</span>
            <span class="menu - label">Scenariusze</span>
          </button>
          <button class="object - item" data - object="devices">
            <span class="menu - icon">${IconComponent.render('smartphone', { size: 18 })}</span>
            <span class="menu - label">Urządzenia</span>
          </button>
          <button class="object - item" data - object="groups">
            <span class="menu - icon">${IconComponent.render('user - circle', { size: 18 })}</span>
            <span class="menu - label">Grupy</span>
          </button>
          <button class="object - item" data - object="warehouses">
            <span class="menu - icon">${IconComponent.render('hard - drive', { size: 18 })}</span>
            <span class="menu - label">Magazyny</span>
          </button>
          <button class="object - item" data - object="clients">
            <span class="menu - icon">${IconComponent.render('monitor', { size: 18 })}</span>
            <span class="menu - label">Klienci</span>
          </button>
        </div>

        <!-- Column 2: Actions -->
        <div class="menu - column">
          <h3 class="column - title">Akcje</h3>
          <button class="menu - item active" data - action="search">
            <span class="menu - icon">${IconComponent.render('search', { size: 18 })}</span>
            <span class="menu - label">Szukaj</span>
          </button>
          <button class="menu - item" data - action="add">
            <span class="menu - icon">${IconComponent.render('plus', { size: 18 })}</span>
            <span class="menu - label">Dodaj</span>
          </button>
          <button class="menu - item" data - action="edit">
            <span class="menu - icon">${IconComponent.render('edit', { size: 18 })}</span>
            <span class="menu - label">Edytuj</span>
          </button>
          <button class="menu - item" data - action="export">
            <span class="menu - icon">${IconComponent.render('bar - chart', { size: 18 })}</span>
            <span class="menu - label">Export</span>
          </button>
          <button class="menu - item" data - action="import">
            <span class="menu - icon">${IconComponent.render('download', { size: 18 })}</span>
            <span class="menu - label">Import</span>
          </button>
          <button class="menu - item" data - action="sync">
            <span class="menu - icon">${IconComponent.render('refresh', { size: 18 })}</span>
            <span class="menu - label">Sync</span>
          </button>
          <button class="menu - item" data - action="activities">
            <span class="menu - icon">${IconComponent.render('list', { size: 18 })}</span>
            <span class="menu - label">Czynności</span>
          </button>
          <button class="menu - item" data - action="test - types">
            <span class="menu - icon">${IconComponent.render('clock', { size: 18 })}</span>
            <span class="menu - label">Rodzaj Testu</span>
          </button>
        </div>

        <div class="main - content">
          <div class="content - body">

            <!-- Search Content -->
            <div id="search - content" class="action - content active">
              <div class="search - compact">
                <input type="text" id="text - search" class="search - input" placeholder="Szukaj użytkowników...">
                <button id="search - btn" class="btn - search">🔍</button>
              </div>

              <div class="filters - compact">
                <select id="role - filter" class="filter - select">
                  <option value="">Wszystkie role</option>
                  <option value="admin">👑 Administrator</option>
                  <option value="manager">👔 Manager</option>
                  <option value="operator">👤 Operator</option>
                  <option value="technician">🔧 Technik</option>
                </select>

                <select id="status - filter" class="filter - select">
                  <option value="">Wszystkie statusy</option>
                  <option value="active">✅ Aktywny</option>
                  <option value="inactive">❌ Nieaktywny</option>
                  <option value="pending">⏳ Oczekujący</option>
                </select>
              </div>

              <div class="results - list" id="results - list">
                <div class="result - card">
                  <div class="card - icon">👤</div>
                  <div class="card - content">
                    <div class="card - title">Jan Kowalski</div>
                    <div class="card - info">Role: 👔 Manager | Status: ✅ Aktywny | Email: jan@fleet.local</div>
                  </div>
                  <div class="card - actions">
                    <button class="btn - card - action" title="Edytuj">✏️</button>
                    <button class="btn - card - action" title="Profil">👤</button>
                  </div>
                </div>
                <div class="result - card">
                  <div class="card - icon">👤</div>
                  <div class="card - content">
                    <div class="card - title">Anna Nowak</div>
                    <div class="card - info">Role: 🔧 Technik | Status: ✅ Aktywny | Email: anna@fleet.local</div>
                  </div>
                  <div class="card - actions">
                    <button class="btn - card - action" title="Edytuj">✏️</button>
                    <button class="btn - card - action" title="Profil">👤</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Add Content -->
            <div id="add - content" class="action - content">
              <div class="form - container">
                <div class="form - row">
                  <div class="form - group">
                    <label > Imię i nazwisko:</label>
                    <input type="text" class="form - input" placeholder="Jan Kowalski">
                  </div>
                  <div class="form - group">
                    <label > Email:</label>
                    <input type="email" class="form - input" placeholder="jan@fleet.local">
                  </div>
                </div>
                <div class="form - row">
                  <div class="form - group">
                    <label > Rola:</label>
                    <select class="form - select">
                      <option>👑 Administrator</option>
                      <option>👔 Manager</option>
                      <option>👤 Operator</option>
                      <option>🔧 Technik</option>
                    </select>
                  </div>
                  <div class="form - group">
                    <label > Status:</label>
                    <select class="form - select">
                      <option>✅ Aktywny</option>
                      <option>❌ Nieaktywny</option>
                      <option>⏳ Oczekujący</option>
                    </select>
                  </div>
                </div>
                <button class="btn - submit">💾 Zapisz Użytkownika</button>
              </div>
            </div>

            <!-- Edit Content -->
            <div id="edit - content" class="action - content">
              <div class="form - container">
                <div class="form - group">
                  <label > Wybierz użytkownika:</label>
                  <select class="form - select">
                    <option>👤 Jan Kowalski</option>
                    <option>👤 Anna Nowak</option>
                  </select>
                </div>
                <div class="form - row">
                  <div class="form - group">
                    <label > Imię i nazwisko:</label>
                    <input type="text" class="form - input" value="Jan Kowalski">
                  </div>
                  <div class="form - group">
                    <label > Email:</label>
                    <input type="email" class="form - input" value="jan@fleet.local">
                  </div>
                </div>
                <button class="btn - submit">💾 Zapisz Zmiany</button>
              </div>
            </div>

            <!-- Delete Content -->
            <div id="delete - content" class="action - content">
              <div class="form - container">
                <div class="delete - warning">
                  <p>⚠️ Operacja nieodwracalna!</p>
                  <select class="form - select">
                    <option>👤 Wybierz użytkownika...</option>
                    <option>👤 Jan Kowalski</option>
                    <option>👤 Anna Nowak</option>
                  </select>
                </div>
                <button class="btn - delete">🗑️ Usuń Trwale</button>
              </div>
            </div>

            <!-- Export Content -->
            <div id="export - content" class="action - content">
              <div class="form - container">
                <div class="form - row">
                  <div class="form - group">
                    <label > Operacja:</label>
                    <select class="form - select" id="export - operation">
                      <option value="export">📊 Eksport do pliku</option>
                      <option value="archive">📦 Archiwizacja danych</option>
                    </select>
                  </div>
                  <div class="form - group">
                    <label > Format / Nośnik:</label>
                    <select class="form - select">
                      <option>📄 CSV</option>
                      <option>📗 Excel</option>
                      <option>📋 JSON</option>
                      <option>💾 Lokalny dysk C:\</option>
                      <option>🖥️ Sieć LAN</option>
                      <option>☁️ Cloud Storage</option>
                      <option>💽 USB Drive</option>
                    </select>
                  </div>
                </div>
                <div class="form - row">
                  <div class="form - group">
                    <label > Zakres danych:</label>
                    <select class="form - select">
                      <option>📊 Wszystkie dane</option>
                      <option>🔍 Wyniki wyszukiwania</option>
                      <option>📅 Ostatni miesiąc</option>
                      <option>📆 Ostatnie 3 miesiące</option>
                      <option>🗓️ Ostatnie 6 miesięcy</option>
                      <option>📅 Ostatni rok</option>
                    </select>
                  </div>
                  <div class="form - group">
                    <label > Okres (dla archiwizacji):</label>
                    <select class="form - select">
                      <option>🎯 Wybierz zakres dat</option>
                      <option>📅 Ostatni miesiąc</option>
                      <option>📆 Ostatnie 3 miesiące</option>
                      <option>🗓️ Ostatnie 6 miesięcy</option>
                      <option>📅 Ostatni rok</option>
                    </select>
                  </div>
                </div>
                <div class="archive - options">
                  <label><input type="checkbox" checked> Kompresuj dane (ZIP)</label>
                  <label><input type="checkbox"> Szyfruj archiwum</label>
                  <label><input type="checkbox"> Usuń oryginały po archiwizacji</label>
                  <label><input type="checkbox"> Weryfikuj integralność danych</label>
                </div>
                <button class="btn - submit">💾 Wykonaj Operację</button>
              </div>
            </div>

            <!-- Import Content -->
            <div id="import - content" class="action - content">
              <div class="form - container">
                <div class="form - row">
                  <div class="form - group">
                    <label > Wybierz plik:</label>
                    <input type="file" class="form - input" accept=".csv,.xlsx,.json,.xml">
                  </div>
                  <div class="form - group">
                    <label > Typ importu:</label>
                    <select class="form - select">
                      <option>👤 Użytkownicy z systemu HR</option>
                      <option>📱 Urządzenia z Fleet Manager</option>
                      <option>🧪 Scenariusze testowe</option>
                      <option>👥 Grupy i uprawnienia</option>
                      <option>🏭 Lokalizacje magazynów</option>
                      <option>🏢 Dane klientów</option>
                    </select>
                  </div>
                </div>
                <div class="form - group">
                  <label > Format pliku:</label>
                  <select class="form - select">
                    <option>📄 CSV (rozdzielane przecinkami)</option>
                    <option>📗 Excel (XLSX)</option>
                    <option>📋 JSON</option>
                    <option>📄 XML</option>
                    <option>🗄️ SQL dump</option>
                  </select>
                </div>
                <div class="import - options">
                  <label><input type="checkbox" checked> Zastąp istniejące dane</label>
                  <label><input type="checkbox"> Utwórz kopię zapasową przed importem</label>
                  <label><input type="checkbox"> Sprawdź duplikaty</label>
                  <label><input type="checkbox"> Waliduj dane przed importem</label>
                </div>
                <button class="btn - submit">📥 Importuj Dane</button>
              </div>
            </div>

            <!-- Activities Content -->
            <div id="activities - content" class="action - content">
              <div class="form - container">
                <h4>🔧 Zarządzanie Czynnościami</h4>
                <div class="form - row">
                  <div class="form - group">
                    <label > Wybierz scenariusz:</label>
                    <select class="form - select">
                      <option value="">-- Wybierz scenariusz --</option>
                      <option value="scenario - c20">Scenariusz C20</option>
                      <option value="pressure - test">Test ciśnienia</option>
                      <option value="flow - test">Test przepływu</option>
                      <option value="function - test">Test funkcjonalny</option>
                      <option value="visual - inspection">Kontrola wizualna</option>
                      <option value="maintenance">Konserwacja</option>
                      <option value="calibration">Kalibracja</option>
                    </select>
                  </div>
                </div>
                <div class="activities - list">
                  <div class="activity - item" draggable="true">
                    <span class="activity - handle">⋮⋮</span>
                    <span class="activity - name">Sprawdzenie ciśnienia wejściowego</span>
                    <div class="activity - actions">
                      <button class="btn - activity - edit">✏️</button>
                      <button class="btn - activity - delete">🗑️</button>
                    </div>
                  </div>
                  <div class="activity - item" draggable="true">
                    <span class="activity - handle">⋮⋮</span>
                    <span class="activity - name">Test szczelności</span>
                    <div class="activity - actions">
                      <button class="btn - activity - edit">✏️</button>
                      <button class="btn - activity - delete">🗑️</button>
                    </div>
                  </div>
                  <div class="activity - item" draggable="true">
                    <span class="activity - handle">⋮⋮</span>
                    <span class="activity - name">Kontrola wizualna</span>
                    <div class="activity - actions">
                      <button class="btn - activity - edit">✏️</button>
                      <button class="btn - activity - delete">🗑️</button>
                    </div>
                  </div>
                </div>
                <button class="btn - submit">+ Dodaj Nową Czynność</button>
              </div>
            </div>

            <!-- Test Types Content -->
            <div id="test - types - content" class="action - content">
              <div class="form - container">
                <h4>⏰ Rodzaj Testu - Interwały</h4>
                <div class="form - row">
                  <div class="form - group">
                    <label > Przypisz Urządzenie:</label>
                    <select class="form - select">
                      <option value="">-- Wybierz urządzenie --</option>
                      <option value="device - 001">Regulator ciśnienia REG - 001</option>
                      <option value="device - 002">Zawór bezpieczeństwa ZB - 002</option>
                      <option value="device - 003">Przepływomierz PF - 003</option>
                      <option value="device - 004">Manometr MN - 004</option>
                      <option value="device - 005">Reduktor ciśnienia RC - 005</option>
                    </select>
                  </div>
                </div>
                <div class="form - row">
                  <div class="form - group">
                    <label > Przypisz interwał do scenariusza:</label>
                    <select class="form - select">
                      <option value="">-- Wybierz interwał --</option>
                      <option value="usage">Po użyciu</option>
                      <option value="monthly">Po miesiącu</option>
                      <option value="6months">Po 6 miesiącach</option>
                      <option value="yearly">Roczny</option>
                      <option value="emergency">Awaryjny</option>
                      <option value="preventive">Prewencyjny</option>
                    </select>
                  </div>
                </div>
                <div class="assignments - list">
                  <div class="assignment - item">
                    <div class="assignment - info">
                      <span class="device - name">📊 Regulator ciśnienia REG - 001</span>
                      <span class="interval - name">⏰ Po użyciu</span>
                    </div>
                    <div class="assignment - actions">
                      <button class="btn - assignment - edit">✏️</button>
                      <button class="btn - assignment - delete">🗑️</button>
                    </div>
                  </div>
                  <div class="assignment - item">
                    <div class="assignment - info">
                      <span class="device - name">📊 Zawór bezpieczeństwa ZB - 002</span>
                      <span class="interval - name">⏰ Po miesiącu</span>
                    </div>
                    <div class="assignment - actions">
                      <button class="btn - assignment - edit">✏️</button>
                      <button class="btn - assignment - delete">🗑️</button>
                    </div>
                  </div>
                </div>
                <button class="btn - submit">+ Przypisz Nowe</button>
              </div>
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
      .connect - data - compact { height: 100%; overflow: hidden; }
      .compact - layout { display: flex; height: 365px; background: #f5f5f5; }
      .menu - column { width: 100px; background: #2a2a2a; padding: 6px 4px; overflow - y: auto; flex - shrink: 0; border - right: 1px solid #1a1a1a; }
      .column - title { color: #FFF; font - size: 9px; font - weight: 600; text - transform: uppercase; margin: 0 0 6px 0; padding: 4px; text - align: center; background: #1a1a1a; border - radius: 3px; }

      /* Object Items */
      .object - item { width: 100%; background: #3a3a3a; border: none; padding: 3px 4px; margin - bottom: 3px; border - radius: 4px; cursor: pointer; display: flex; flex - direction: column; align - items: center; gap: 3px; transition: all 0.2s; color: #ccc; }
      .object - item:hover { background: #4a4a4a; color: white; }
      .object - item.active { background: linear - gradient(135deg, #28a745 0%, #20c997 100%); color: white; }

      /* Menu Items */
      .menu - item { width: 100%; background: #3a3a3a; border: none; padding: 3px 4px; margin - bottom: 4px; border - radius: 5px; cursor: pointer; display: flex; flex - direction: column; align - items: center; gap: 4px; transition: all 0.2s; color: #ccc; }
      .menu - icon { font - size: 13px; }
      .menu - label { font - size: 12px; font - weight: 500; text - align: center; }
      .menu - item:hover { background: #4a4a4a; color: white; }
      .menu - item.active { background: linear - gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }

      .main - content { flex: 1; display: flex; flex - direction: column; background: white; overflow: hidden; }
      .content - body { flex: 1; padding: 15px; overflow - y: auto; }

      .search - compact { display: flex; gap: 8px; margin - bottom: 10px; }
      .search - input { flex: 1; padding: 8px; border: 1px solid #ddd; border - radius: 4px; font - size: 12px; }

          
            .btn - search { padding: 8px 12px; background: linear - gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border - radius: 4px; cursor: pointer; }
      .filters - compact { display: flex; gap: 8px; margin - bottom: 15px; }
      .filter - select { flex: 1; padding: 6px; border: 1px solid #ddd; border - radius: 4px; font - size: 11px; }
      .results - list { display: flex; flex - direction: column; gap: 8px; }
      .result - card { display: flex; gap: 10px; background: white; border: 1px solid #e0e0e0; border - radius: 6px; padding: 10px; transition: all 0.2s; align - items: center; }
      .result - card:hover { border - color: #28a745; box - shadow: 0 2px 8px rgba(40, 167, 69, 0.2); }
      .card - icon { font - size: 24px; }
      .card - content { flex: 1; }
      .card - title { font - weight: 600; font - size: 12px; margin - bottom: 4px; color: #333; }
      .card - info { font - size: 10px; color: #666; }
      .card - actions { display: flex; gap: 4px; }
      .btn - card - action { padding: 6px 8px; background: #f8f9fa; border: 1px solid #dee2e6; border - radius: 4px; cursor: pointer; font - size: 12px; transition: all 0.2s; }
      .btn - card - action:hover { background: #e9ecef; border - color: #adb5bd; }

      /* Content Layout Full Width */
      .main - content { flex: 1; }
      /* Quick action buttons removed - actions moved to main menu */

      /* Action Content */
      .action - content { display: none; }
      .action - content.active { display: block; }

      /* Form Styles */
      .form - container { background: #f8f9fa; padding: 12px; border - radius: 6px; }
      .form - row { display: flex; gap: 10px; margin - bottom: 10px; }
      .form - group { flex: 1; }
      .form - group label { display: block; margin - bottom: 3px; font - size: 10px; font - weight: 600; color: #666; }
      .form - input, .form - select { width: 100%; padding: 6px; border: 1px solid #ddd; border - radius: 3px; font - size: 11px; }

          
            .btn - submit { width: 100%; padding: 8px; background: linear - gradient(135deg, #28a745 0%, #20c997 100%); color: white; border: none; border - radius: 4px; cursor: pointer; font - size: 11px; font - weight: 600; }

          
            .btn - delete { width: 100%; padding: 8px; background: linear - gradient(135deg, #dc3545 0%, #c82333 100%); color: white; border: none; border - radius: 4px; cursor: pointer; font - size: 11px; font - weight: 600; }

          
            .btn - archive { width: 100%; padding: 8px; background: linear - gradient(135deg, #17a2b8 0%, #138496 100%); color: white; border: none; border - radius: 4px; cursor: pointer; font - size: 11px; font - weight: 600; }
      .delete - warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 10px; border - radius: 4px; margin - bottom: 10px; }
      .delete - warning p { margin: 0 0 6px 0; color: #856404; font - weight: 600; }
      .archive - options { margin: 10px 0; }
      .archive - options label { display: block; margin - bottom: 6px; font - size: 11px; cursor: pointer; }
      .archive - options input[type="checkbox"] { margin - right: 6px; }

      /* Activities Styles */
      .activities - list { margin: 15px 0; }
      .activity - item { display: flex; align - items: center; gap: 10px; background: white; border: 1px solid #e0e0e0; border - radius: 6px; padding: 8px; margin - bottom: 8px; cursor: move; transition: all 0.2s; }
      .activity - item:hover { border - color: #667eea; box - shadow: 0 2px 8px rgba(102, 126, 234, 0.2); }
      .activity - item.dragging { opacity: 0.5; transform: rotate(2deg); }
      .activity - handle { color: #666; cursor: grab; font - weight: bold; }
      .activity - handle:active { cursor: grabbing; }
      .activity - name { flex: 1; font - size: 12px; font - weight: 500; }
      .activity - actions { display: flex; gap: 4px; }
      .btn - activity - edit, .btn - activity - delete { padding: 4px 6px; background: #f8f9fa; border: 1px solid #dee2e6; border - radius: 3px; cursor: pointer; font - size: 10px; transition: all 0.2s; }
      .btn - activity - edit:hover { background: #007bff; color: white; }
      .btn - activity - delete:hover { background: #dc3545; color: white; }

      /* Test Types Assignment Styles */
      .assignments - list { margin: 15px 0; }
      .assignment - item { display: flex; align - items: center; justify - content: space - between; background: white; border: 1px solid #e0e0e0; border - radius: 6px; padding: 10px; margin - bottom: 8px; transition: all 0.2s; }
      .assignment - item:hover { border - color: #28a745; box - shadow: 0 2px 8px rgba(40, 167, 69, 0.2); }
      .assignment - info { display: flex; flex - direction: column; gap: 4px; }
      .device - name, .interval - name { font - size: 11px; }
      .device - name { font - weight: 600; color: #333; }
      .interval - name { color: #666; }
      .assignment - actions { display: flex; gap: 4px; }
      .btn - assignment - edit, .btn - assignment - delete { padding: 4px 6px; background: #f8f9fa; border: 1px solid #dee2e6; border - radius: 3px; cursor: pointer; font - size: 10px; transition: all 0.2s; }
      .btn - assignment - edit:hover { background: #007bff; color: white; }
      .btn - assignment - delete:hover { background: #dc3545; color: white; }

      /* Import Options */
      .import - options { margin: 10px 0; }
      .import - options label { display: block; margin - bottom: 6px; font - size: 11px; cursor: pointer; }
      .import - options input[type="checkbox"] { margin - right: 6px; }

      /* Sync Styles */
      .sync - data - container { padding: 12px; }
      .sync - status - header { display: flex; justify - content: space - between; align - items: center; margin - bottom: 12px; }
      .sync - status - header h4 { margin: 0; font - size: 13px; color: #333; }
      .sync - indicator { display: flex; align - items: center; gap: 6px; }
      .sync - dot { width: 6px; height: 6px; background: #28a745; border - radius: 50%; }
      .sync - status - text { font - size: 11px; color: #28a745; font - weight: 600; }
      .sync - info - grid { display: grid; grid - template - columns: 1fr 1fr; gap: 8px; margin - bottom: 12px; }
      .sync - info - item { display: flex; justify - content: space - between; padding: 6px 8px; background: #f8f9fa; border - radius: 3px; }
      .sync - label { font - size: 10px; color: #666; font - weight: 600; }
      .sync - value { font - size: 10px; color: #333; font - weight: 600; }
      .sync - options { margin - bottom: 12px; }
      .sync - option - row { display: flex; gap: 20px; margin - bottom: 8px; }
      .sync - option - row label { font - size: 12px; cursor: pointer; }
      .sync - option - row input[type="checkbox"] { margin - right: 6px; }
      .sync - buttons { display: flex; gap: 10px; }

          
            .btn - sync - now { flex: 1; padding: 12px; background: linear - gradient(135deg, #17a2b8 0%, #138496 100%); color: white; border: none; border - radius: 6px; cursor: pointer; font - size: 12px; font - weight: 600; }

          
            .btn - sync - schedule { flex: 1; padding: 12px; background: linear - gradient(135deg, #6c757d 0%, #5a6268 100%); color: white; border: none; border - radius: 6px; cursor: pointer; font - size: 12px; font - weight: 600; }
    `;
    document.head.appendChild(style);
  }

  private setupEventListeners(container: HTMLElement): void {
    // Object buttons;
    const objectButtons = container.querySelectorAll('[data - object]');
    objectButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const object = target.getAttribute('data - object');
        if (object) this.switchObject(object, container);
      });
    });

    // Action buttons;
    const actionButtons = container.querySelectorAll('[data - action]');
    actionButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const action = target.getAttribute('data - action');
        if (action) this.handleAction(action, container);
      });
    });

    // Setup drag and drop for activities
    this.setupActivitiesDragDrop(container);
  }

  private setupActivitiesDragDrop(container: HTMLElement): void {
    // Use event delegation to handle dynamically added activities
    container.addEventListener('dragstart', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('activity - item')) {
        target.classList.add('dragging');
        if (e.dataTransfer) {
          e.dataTransfer.effectAllowed = 'move';
          e.dataTransfer.setData('text / html', target.outerHTML);
        }
      }
    });

    container.addEventListener('dragend', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('activity - item')) {
        target.classList.remove('dragging');
      }
    });

    container.addEventListener('dragover', (e) => {
      e.preventDefault();
      const activitiesList = container.querySelector('.activities - list');
      if (activitiesList && activitiesList.contains(e.target as Node)) {
        e.dataTransfer!.dropEffect = 'move';
      }
    });

    container.addEventListener('drop', (e) => {
      e.preventDefault();
      const activitiesList = container.querySelector('.activities - list');
      if (activitiesList && activitiesList.contains(e.target as Node)) {
        const draggingElement = container.querySelector('.dragging');
        if (draggingElement && e.target !== draggingElement) {
          const targetElement = (e.target as HTMLElement).closest('.activity - item');
          if (targetElement) {
            activitiesList.insertBefore(draggingElement, targetElement.nextSibling);
          }
        }
      }
    });

    // Make activity items draggable
    container.addEventListener('DOMNodeInserted', () => {
      const activityItems = container.querySelectorAll('.activity - item');
      activityItems.forEach(item => {
        (item as HTMLElement).draggable = true;
      });
    });
  }

  private switchObject(object: string, container: HTMLElement): void {
    this.currentObject = object;

    // Update object menu active state
    container.querySelectorAll('[data - object]').forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data - object') === object) item.classList.add('active');
    });

    // Update title in top - bar;
    const objectTitles: any = {
      'users': 'Użytkownicy',
      'test - scenarios': 'Scenariusze Testowe',
      'devices': 'Urządzenia',
      'groups': 'Grupy',
      'warehouses': 'Magazyny',
      'clients': 'Klienci'
    };

    const actionTitles: any = {
      'search': 'Szukaj',
      'clear': 'Wyczyść',
      'add': 'Dodaj',
      'edit': 'Edytuj',
      'delete': 'Usuń',
      'export': 'Export'
    };

    const topBarTitle = document.getElementById('top - bar - section - title');
    if (topBarTitle) {
      topBarTitle.textContent = `ConnectData - ${objectTitles[object]} - ${actionTitles[this.currentAction]}`;
    }

    // Update params;
    const selectedObject = container.querySelector('#selected - object');
    if (selectedObject) selectedObject.textContent = objectTitles[object];

    // Synchronize forms with the new object context
    this.updateActionFormsContext(container, this.currentAction);

    // Update search results if current action is search;
    if (this.currentAction === 'search') {
      this.updateSearchResults(container, object);
      this.updateResultsList(container, object);
      this.showNotification(`🔍 Wyszukiwanie w ${objectTitles[object]}`, 'info');
    }

    // Update search placeholder;
    const searchInput = container.querySelector('#text - search') as HTMLInputElement;
    if (searchInput) {
      const placeholders: any = {
        'users': 'Szukaj użytkowników...',
        'test - scenarios': 'Szukaj scenariuszy testowych...',
        'devices': 'Szukaj urządzeń...',
        'groups': 'Szukaj grup...',
        'warehouses': 'Szukaj magazynów...',
        'clients': 'Szukaj klientów...'
      };
      searchInput.placeholder = placeholders[object];
    }
  }

  private handleAction(action: string, container: HTMLElement): void {
    this.currentAction = action;

    container.querySelectorAll('[data - action]').forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data - action') === action) item.classList.add('active');
    });

    // Update top - bar title;
    const objectTitles: any = {
      'users': 'Użytkownicy',
      'test - scenarios': 'Scenariusze Testowe',
      'devices': 'Urządzenia',
      'groups': 'Grupy',
      'warehouses': 'Magazyny',
      'clients': 'Klienci'
    };

    const actionTitles: any = {
      'search': 'Szukaj',
      'add': 'Dodaj',
      'edit': 'Edytuj',
      'export': 'Eksport i Archiwizacja',
      'import': 'Import Danych',
      'sync': 'Synchronizacja',
      'activities': 'Zarządzanie Czynnościami',
      'test - types': 'Rodzaj Testu - Interwały'
    };

    const topBarTitle = document.getElementById('top - bar - section - title');
    if (topBarTitle) {
      topBarTitle.textContent = `ConnectData - ${objectTitles[this.currentObject]} - ${actionTitles[action]}`;
    }

    // Update params;
    const selectedAction = container.querySelector('#selected - action');
    if (selectedAction) selectedAction.textContent = actionTitles[action];

    // Hide all action contents
    container.querySelectorAll('.action - content').forEach(content => {
      content.classList.remove('active');
    });

    // Show selected action content;
    const activeContent = container.querySelector(`#${action}-content`);
    if (activeContent) {
      activeContent.classList.add('active');
    }

    // Update forms with current object context
    this.updateActionFormsContext(container, action);

    const objectNames = objectTitles[this.currentObject] || 'dane';
    const messages: any = {
      'search': `🔍 Wyszukiwanie w ${objectNames}...`,
      'add': `➕ Dodawanie nowego rekordu do ${objectNames}...`,
      'edit': `✏️ Edytowanie ${objectNames}...`,
      'export': `📊 Eksport i archiwizacja ${objectNames}...`,
      'import': `📥 Import ${objectNames} do systemu...`,
      'sync': `🔄 Synchronizacja ${objectNames}...`
    };
    // // // console
      .log(messages[action]); // Auto - commented by lint - fix // Auto - commented by lint - fix // Auto - commented by lint - fix
  }

  private updateActionFormsContext(container: HTMLElement, _action: string): void {
    const objectTitles: any = {
      'users': 'Użytkownika',
      'test - scenarios': 'Scenariusz Testowy',
      'devices': 'Urządzenie',
      'groups': 'Grupę',
      'warehouses': 'Magazyn',
      'clients': 'Klienta'
    };

    const objectContext = objectTitles[this.currentObject] || 'Element';

    // Update form titles based on current object;
    const addTitle = container.querySelector('#add - content h4');
    if (addTitle) addTitle.textContent = `➕ Dodaj Nový ${objectContext}`;

    const editTitle = container.querySelector('#edit - content h4');
    if (editTitle) editTitle.textContent = `✏️ Edytuj ${objectContext}`;

    const exportTitle = container.querySelector('#export - content h4');
    if (exportTitle) exportTitle
      .textContent = `📊 Eksport i Archiwizacja: ${objectTitles[this
      .currentObject] || 'Dane'}`;

    // Update search placeholders and labels;
    const searchInput = container.querySelector('#text - search') as HTMLInputElement;
    if (searchInput) {
      const searchPlaceholders: any = {
        'users': 'Szukaj użytkowników...',
        'test - scenarios': 'Szukaj scenariuszy testowych...',
        'devices': 'Szukaj urządzeń...',
        'groups': 'Szukaj grup...',
        'warehouses': 'Szukaj magazynów...',
        'clients': 'Szukaj klientów...'
      };
      searchInput.placeholder = searchPlaceholders[this.currentObject] || 'Szukaj...';
    }

    // Update form fields based on object type
    this.updateFormFields(container, this.currentObject);
  }

  private updateFormFields(container: HTMLElement, objectType: string): void {
    const addForm = container.querySelector('#add - content .form - container');
    const editForm = container.querySelector('#edit - content .form - container');

    if (addForm || editForm) {
      // Define fields for each object type;
      const objectFields: any = {
        'users': [
          { label: 'Imię i nazwisko', type: 'text', placeholder: 'Jan Kowalski' },
          { label: 'Email', type: 'email', placeholder: 'jan@fleet.local' },
          { label: 'Rola', type: 'select', options: ['👔 Manager', '👤 Operator', '🔧 Technik'] },
          { label: 'Status', type: 'select', options: ['✅ Aktywny', '❌ Nieaktywny', '⏳ Oczekujący'] }
        ],
        'devices': [
          { label: 'Nazwa urządzenia', type: 'text', placeholder: 'PSS - 7000 #12345' },
          { label: 'Typ urządzenia', type: 'select', options: ['📱 PSS - 7000', '📱 PSS - 5000', '📱 PSS - 3000'] },
          { label: 'Numer seryjny', type: 'text', placeholder: '#12345' },
          { label: 'Status', type: 'select', options: ['✅ Aktywny', '🔧 Konserwacja', '❌ Nieaktywny'] }
        ],
        'groups': [
          { label: 'Nazwa grupy', type: 'text', placeholder: 'Grupa Serwisowa A' },
          { label: 'Opis', type: 'textarea', placeholder: 'Opis grupy...' },
          { label: 'Typ grupy', type: 'select', options: ['👥 Użytkownicy', '📱 Urządzenia', '🏭 Lokalizacje'] },
          { label: 'Status', type: 'select', options: ['✅ Aktywna', '❌ Nieaktywna'] }
        ]
      };

      const fields = objectFields[objectType] || objectFields['users'];

      // Update both add and edit forms
      [addForm, editForm].forEach(form => {
        if (form) {
          const formRows = form.querySelectorAll('.form - row, .form - group');
          formRows.forEach(row => {
            if (!row.querySelector('h4') && !row.querySelector('button')) {
              row.remove();
            }
          });

          // Add new fields based on object type at the beginning of form
          fields.forEach((field: any, _index: number) => {
            const formGroup = document.createElement('div');
            formGroup.className = 'form - group';

            let fieldHtml = `<label>${field.label}:</label>`;

            if (field.type === 'select') {
              fieldHtml += `<select class="form - select">`;
              field.options.forEach((option: string) => {
                fieldHtml += `<option>${option}</option>`;
              });
              fieldHtml += `</select>`;
            } else if (field.type === 'textarea') {
              fieldHtml += `<textarea class="form - textarea" rows="3" placeholder="${field.placeholder}"></textarea>`;
            } else {
              fieldHtml += `<input type="${field.type}" class="form - input" placeholder="${field.placeholder}">`;
            }

            formGroup.innerHTML = fieldHtml;

            // Find submit button and insert before it;
            const submitBtn = form.querySelector('.btn - submit');
            if (submitBtn) {
              form.insertBefore(formGroup, submitBtn);
            } else {
              form.appendChild(formGroup);
            }
          });
        }
      });
    }
  }

  private updateResultsList(container: HTMLElement, objectType: string): void {
    const resultsList = container.querySelector('#results - list');
    if (!resultsList) return;

    // Define different table data for each object type;
    const objectTableData: any = {
      'users': [
        {
          icon: '👤',
          title: 'Jan Kowalski',
          info: 'Role: 👔 Manager | Status: ✅ Aktywny | Email: jan@fleet.local'
        },
        {
          icon: '👤',
          title: 'Anna Nowak',
          info: 'Role: 🔧 Technik | Status: ✅ Aktywny | Email: anna@fleet.local'
        },
        {
          icon: '👤',
          title: 'Piotr Wiśniewski',
          info: 'Role: 👤 Operator | Status: ⏳ Oczekujący | Email: piotr@fleet.local'
        }
      ],
      'devices': [
        {
          icon: '📱',
          title: 'PSS - 7000 #12345',
          info: 'Sekcja: A | Status: ✅ Aktywny | Ostatni test: 2025 - 10 - 08 17:30'
        },
        {
          icon: '📱',
          title: 'PSS - 5000 #67890',
          info: 'Sekcja: B | Status: ⚠️ Serwis | Ostatni test: 2025 - 10 - 07 14:20'
        },
        {
          icon: '📱',
          title: 'PSS - 3000 #11111',
          info: 'Sekcja: C | Status: ❌ Nieaktywny | Ostatni test: 2025 - 10 - 06 09:15'
        }
      ],
      'test - scenarios': [
        {
          icon: '🧪',
          title: 'Szczelność standardowa',
          info: 'Ciśnienie: 300 bar | Czas: 5 min | Status: ✅ Aktywny'
        },
        {
          icon: '🧪',
          title: 'Przepływ funkcjonalny',
          info: 'Przepływ: 40 l / min | Temperatura: 20°C | Status: ✅ Aktywny'
        },
        {
          icon: '🧪',
          title: 'Test szczelności wysokiej',
          info: 'Ciśnienie: 500 bar | Czas: 10 min | Status: ⚠️ Wersja robocza'
        }
      ],
      'groups': [
        {
          icon: '👥',
          title: 'Grupa Serwisowa A',
          info: 'Członkowie: 5 | Sekcja: A | Status: ✅ Aktywna'
        },
        {
          icon: '👥',
          title: 'Grupa Operatorska B',
          info: 'Członkowie: 8 | Sekcja: B | Status: ✅ Aktywna'
        },
        {
          icon: '👥',
          title: 'Administratorzy',
          info: 'Członkowie: 3 | Sekcja: Wszystkie | Status: ✅ Aktywna'
        }
      ],
      'warehouses': [
        {
          icon: '🏭',
          title: 'Magazyn Główny A',
          info: 'Lokalizacja: Warszawa | Urządzenia: 150 | Status: ✅ Aktywny'
        },
        {
          icon: '🏭',
          title: 'Magazyn Serwisowy B',
          info: 'Lokalizacja: Kraków | Urządzenia: 45 | Status: ✅ Aktywny'
        },
        {
          icon: '🏭',
          title: 'Magazyn Rezerwowy C',
          info: 'Lokalizacja: Gdańsk | Urządzenia: 25 | Status: ⚠️ Konserwacja'
        }
      ],
      'clients': [
        {
          icon: '🏢',
          title: 'PGNiG SA',
          info: 'Kontakt: biuro@pgnig.pl | Urządzenia: 50 | Status: ✅ Aktywny'
        },
        {
          icon: '🏢',
          title: 'Orlen SA',
          info: 'Kontakt: info@orlen.pl | Urządzenia: 75 | Status: ✅ Aktywny'
        },
        {
          icon: '🏢',
          title: 'Gaz - System SA',
          info: 'Kontakt: kontakt@gaz - system.pl | Urządzenia: 30 | Status: ❌ Nieaktywny'
        }
      ]
    };

    const data = objectTableData[objectType] || objectTableData['users'];

    resultsList.innerHTML = data.map((item: any) => `
      <div class="result - card">
        <div class="card - icon">${item.icon}</div>
        <div class="card - content">
          <div class="card - title">${item.title}</div>
          <div class="card - info">${item.info}</div>
        </div>
        <div class="card - actions">
          <button class="btn - card - action" title="Edytuj">✏️</button>
          <button class="btn - card - action" title="Profil">👁️</button>
        </div>
      </div>
    `).join('');

    // Update filters based on object type
    this.updateFiltersForObject(container, objectType);
  }

  private updateFiltersForObject(container: HTMLElement, objectType: string): void {
    const roleFilter = container.querySelector('#role - filter') as HTMLSelectElement;
    const statusFilter = container.querySelector('#status - filter') as HTMLSelectElement;

    if (!roleFilter || !statusFilter) return;

    // Update role filter options based on object type;
    const roleOptions: any = {
      'users': `
        <option value="">Wszystkie role</option>
        <option value="admin">👑 Administrator</option>
        <option value="manager">👔 Manager</option>
        <option value="operator">👤 Operator</option>
        <option value="technician">🔧 Technik</option>
      `,
      'devices': `
        <option value="">Wszystkie typy</option>
        <option value="pss - 7000">📱 PSS - 7000</option>
        <option value="pss - 5000">📱 PSS - 5000</option>
        <option value="pss - 3000">📱 PSS - 3000</option>
        <option value="vac - series">🔧 VAC Series</option>
      `,
      'test - scenarios': `
        <option value="">Wszystkie kategorie</option>
        <option value="pressure">🔋 Ciśnienie</option>
        <option value="flow">💨 Przepływ</option>
        <option value="function">⚙️ Funkcjonalny</option>
        <option value="calibration">📏 Kalibracja</option>
      `,
      'groups': `
        <option value="">Wszystkie typy grup</option>
        <option value="service">🔧 Serwisowe</option>
        <option value="operator">👤 Operatorskie</option>
        <option value="admin">👑 Administracyjne</option>
        <option value="guest">👥 Gości</option>
      `,
      'warehouses': `
        <option value="">Wszystkie typy</option>
        <option value="main">🏭 Główne</option>
        <option value="service">🔧 Serwisowe</option>
        <option value="backup">💾 Rezerwowe</option>
        <option value="client">🏢 Klienckie</option>
      `,
      'clients': `
        <option value="">Wszystkie sektory</option>
        <option value="energy">⚡ Energetyczny</option>
        <option value="oil - gas">🛢️ Naftowo - gazowy</option>
        <option value="chemical">🧪 Chemiczny</option>
        <option value="industrial">🏭 Przemysłowy</option>
      `
    };

    roleFilter.innerHTML = roleOptions[objectType] || roleOptions['users'];
  }

  private updateSearchResults(container: HTMLElement, objectType: string): void {
    const searchResults = container.querySelector('.search - results');
    if (!searchResults) return;

    // Define different data sets for each object type;
    const objectData: any = {
      'users': [
        { icon: '👤', id: 'USER - 001', title: 'Jan Kowalski', desc: 'Manager, jan@fleet.local', status: 'Aktywny', badge: 'badge - active' },
        { icon: '👤', id: 'USER - 002', title: 'Anna Nowak', desc: 'Operator, anna@fleet.local', status: 'Aktywny', badge: 'badge - active' },
        { icon: '👤', id: 'USER - 003', title: 'Piotr Wiśniewski', desc: 'Technik, piotr@fleet.local', status: 'Nieaktywny', badge: 'badge - inactive' }
      ],
      'devices': [
        { icon: '📱', id: 'DEV - 001', title: 'PSS - 7000 #12345', desc: 'Sekcja A, ostatni test: 2025 - 10 - 08', status: 'Aktywny', badge: 'badge - active' },
        { icon: '📱', id: 'DEV - 002', title: 'PSS - 5000 #67890', desc: 'Sekcja B, ostatni test: 2025 - 10 - 07', status: 'Konserwacja', badge: 'badge - warning' },
        { icon: '📱', id: 'DEV - 003', title: 'PSS - 3000 #11111', desc: 'Magazyn, ostatni test: 2025 - 10 - 06', status: 'Nieaktywny', badge: 'badge - inactive' }
      ],
      'test - scenarios': [
        { icon: '🧪', id: 'TEST - 001', title: 'Szczelność standardowa', desc: 'Ciśnienie: 300 bar, czas: 5 min', status: 'Aktywny', badge: 'badge - active' },
        { icon: '🧪', id: 'TEST - 002', title: 'Przepływ funkcjonalny', desc: 'Przepływ: 40 l / min, temperatura: 20°C', status: 'Aktywny', badge: 'badge - active' },
        { icon: '🧪', id: 'TEST - 003', title: 'Kalibracja czujników', desc: 'Wszystkie czujniki, pełny zakres', status: 'Wersja robocza', badge: 'badge - warning' }
      ],
      'groups': [
        { icon: '👥', id: 'GRP - 001', title: 'Grupa Serwisowa A', desc: '5 użytkowników, Sekcja A', status: 'Aktywna', badge: 'badge - active' },
        { icon: '👥', id: 'GRP - 002', title: 'Grupa Operatorska B', desc: '8 użytkowników, Sekcja B', status: 'Aktywna', badge: 'badge - active' },
        { icon: '👥', id: 'GRP - 003', title: 'Administratorzy', desc: '3 użytkowników, Wszystkie sekcje', status: 'Aktywna', badge: 'badge - active' }
      ],
      'warehouses': [
        { icon: '🏭', id: 'WH - 001', title: 'Magazyn Główny A', desc: 'Lokalizacja: Warszawa, 150 urządzeń', status: 'Aktywny', badge: 'badge - active' },
        { icon: '🏭', id: 'WH - 002', title: 'Magazyn Serwisowy B', desc: 'Lokalizacja: Kraków, 45 urządzeń', status: 'Aktywny', badge: 'badge - active' },
        { icon: '🏭', id: 'WH - 003', title: 'Magazyn Rezerwowy C', desc: 'Lokalizacja: Gdańsk, 25 urządzeń', status: 'Konserwacja', badge: 'badge - warning' }
      ],
      'clients': [
        { icon: '🏢', id: 'CLI - 001', title: 'PGNiG SA', desc: 'Kontakt: biuro@pgnig.pl, 50 urządzeń', status: 'Aktywny', badge: 'badge - active' },
        { icon: '🏢', id: 'CLI - 002', title: 'Orlen SA', desc: 'Kontakt: info@orlen.pl, 75 urządzeń', status: 'Aktywny', badge: 'badge - active' },
        { icon: '🏢', id: 'CLI - 003', title: 'Gaz - System SA', desc: 'Kontakt: kontakt@gaz - system.pl, 30 urządzeń', status: 'Nieaktywny', badge: 'badge - inactive' }
      ]
    };

    const data = objectData[objectType] || objectData['users'];

    searchResults.innerHTML = data.map((item: any) => `
      <div class="card">
        <div class="card - icon">${item.icon}</div>
        <div class="card - content">
          <div class="card - title">${item.title}</div>
          <div class="card - description">${item.desc}</div>
          <span class="card - id">${item.id}</span>
        </div>
        <div class="card - actions">
          <span class="badge ${item.badge}">${item.status}</span>
          <button class="btn - card - action" title="Zobacz">👁️</button>
          <button class="btn - card - action" title="Edytuj">✏️</button>
        </div>
      </div>
    `).join('');
  }

  private showNotification(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info'): void {
    // Use console logging instead of right panel notifications
    // // console
      .log(`${type
      .toUpperCase()}: ${message}`); // Auto - commented by lint - fix // Auto - commented by lint - fix
  }
}
