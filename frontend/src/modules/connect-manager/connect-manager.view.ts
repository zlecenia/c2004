import { IconComponent } from '../../components/icon.component';

export class ConnectManagerView {
  private currentAction = 'scenarios';

  render(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'connect-manager-container';
    
    container.innerHTML = `
      <div class="connect-manager-layout">
        <!-- Left Column - Navigation Menu -->
        <div class="menu-column">
          <h3 class="column-title">Manager</h3>
          
          <button class="menu-item active" data-action="scenarios">
            <span class="menu-icon">🧪</span>
            <span class="menu-label">Scenariusze</span>
          </button>
          <button class="menu-item" data-action="activities">
            <span class="menu-icon">📝</span>
            <span class="menu-label">Czynności</span>
          </button>
          <button class="menu-item" data-action="test-types">
            <span class="menu-icon">⏰</span>
            <span class="menu-label">Rodzaj Testu</span>
          </button>
        </div>

        <!-- Right Panel - Content -->
        <div class="main-content">
          <!-- Scenarios Content -->
          <div id="scenarios-content" class="action-content active">
            <div class="content-header">
              <h4>📋 Zarządzanie Scenariuszami Testów</h4>
              <button class="btn-add">+ Nowy Scenariusz</button>
            </div>
            
            <div class="scenarios-grid">
              <div class="scenario-card">
                <div class="scenario-header">
                  <h5>Scenariusz C20</h5>
                  <div class="scenario-actions">
                    <button class="btn-edit">✏️</button>
                    <button class="btn-delete">🗑️</button>
                  </div>
                </div>
                <div class="scenario-activities">
                  <div class="activity-block" draggable="true">
                    <span class="activity-handle">⋮⋮</span>
                    <span class="activity-name">Sprawdzenie ciśnienia wejściowego</span>
                  </div>
                  <div class="activity-block" draggable="true">
                    <span class="activity-handle">⋮⋮</span>
                    <span class="activity-name">Test szczelności</span>
                  </div>
                  <div class="activity-block" draggable="true">
                    <span class="activity-handle">⋮⋮</span>
                    <span class="activity-name">Kontrola wizualna</span>
                  </div>
                </div>
                <button class="btn-add-activity">+ Dodaj Czynność</button>
              </div>
              
              <div class="scenario-card">
                <div class="scenario-header">
                  <h5>Test Ciśnienia</h5>
                  <div class="scenario-actions">
                    <button class="btn-edit">✏️</button>
                    <button class="btn-delete">🗑️</button>
                  </div>
                </div>
                <div class="scenario-activities">
                  <div class="activity-block" draggable="true">
                    <span class="activity-handle">⋮⋮</span>
                    <span class="activity-name">Konfiguracja parametrów</span>
                  </div>
                  <div class="activity-block" draggable="true">
                    <span class="activity-handle">⋮⋮</span>
                    <span class="activity-name">Uruchomienie testu</span>
                  </div>
                </div>
                <button class="btn-add-activity">+ Dodaj Czynność</button>
              </div>
            </div>
          </div>

          <!-- Activities Content -->
          <div id="activities-content" class="action-content">
            <div class="content-header">
              <h4>📝 Zarządzanie Czynnościami</h4>
              <button class="btn-add">+ Nowa Czynność</button>
            </div>
            
            <div class="activities-table">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Nazwa Czynności</th>
                    <th>Opis</th>
                    <th>Czas Trwania</th>
                    <th>Kategoria</th>
                    <th>Akcje</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Sprawdzenie ciśnienia wejściowego</strong></td>
                    <td>Kontrola ciśnienia na wejściu systemu</td>
                    <td>15 min</td>
                    <td><span class="category-tag pressure">Ciśnienie</span></td>
                    <td>
                      <button class="btn-table-edit">✏️</button>
                      <button class="btn-table-delete">🗑️</button>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Test szczelności</strong></td>
                    <td>Sprawdzenie szczelności połączeń</td>
                    <td>20 min</td>
                    <td><span class="category-tag safety">Bezpieczeństwo</span></td>
                    <td>
                      <button class="btn-table-edit">✏️</button>
                      <button class="btn-table-delete">🗑️</button>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Kontrola wizualna</strong></td>
                    <td>Wizualna inspekcja urządzenia</td>
                    <td>10 min</td>
                    <td><span class="category-tag visual">Wizualna</span></td>
                    <td>
                      <button class="btn-table-edit">✏️</button>
                      <button class="btn-table-delete">🗑️</button>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Konfiguracja parametrów</strong></td>
                    <td>Ustawienie parametrów testowych</td>
                    <td>5 min</td>
                    <td><span class="category-tag config">Konfiguracja</span></td>
                    <td>
                      <button class="btn-table-edit">✏️</button>
                      <button class="btn-table-delete">🗑️</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Test Types Content -->
          <div id="test-types-content" class="action-content">
            <div class="content-header">
              <h4>⏰ Formularz Rodzaju Testu</h4>
            </div>
            
            <div class="test-type-form">
              <div class="form-section">
                <h5>Przypisz Urządzenie</h5>
                <div class="form-group">
                  <label>Wybierz urządzenie:</label>
                  <select class="form-select">
                    <option value="">-- Wybierz urządzenie --</option>
                    <option value="device-001">Regulator ciśnienia REG-001</option>
                    <option value="device-002">Zawór bezpieczeństwa ZB-002</option>
                    <option value="device-003">Przepływomierz PF-003</option>
                    <option value="device-004">Manometr MN-004</option>
                    <option value="device-005">Reduktor ciśnienia RC-005</option>
                  </select>
                </div>
              </div>

              <div class="form-section">
                <h5>Przypisz Interwał do Scenariusza</h5>
                <div class="form-group">
                  <label>Wybierz scenariusz:</label>
                  <select class="form-select">
                    <option value="">-- Wybierz scenariusz --</option>
                    <option value="scenario-c20">Scenariusz C20</option>
                    <option value="pressure-test">Test ciśnienia</option>
                    <option value="flow-test">Test przepływu</option>
                    <option value="function-test">Test funkcjonalny</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Interwał testowania:</label>
                  <select class="form-select">
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

              <div class="form-section">
                <h5>Rodzaj Testu</h5>
                <div class="form-group">
                  <label>Typ interwału:</label>
                  <div class="radio-group">
                    <label class="radio-option">
                      <input type="radio" name="test-type" value="interval" checked>
                      <span>Według interwału czasowego</span>
                    </label>
                    <label class="radio-option">
                      <input type="radio" name="test-type" value="usage">
                      <span>Po użyciu</span>
                    </label>
                  </div>
                </div>
              </div>

              <div class="assignments-preview">
                <h5>Aktualne Przypisania</h5>
                <div class="assignment-list">
                  <div class="assignment-item">
                    <div class="assignment-info">
                      <span class="device-name">📊 Regulator ciśnienia REG-001</span>
                      <span class="scenario-name">🧪 Scenariusz C20</span>
                      <span class="interval-name">⏰ Po miesiącu</span>
                    </div>
                    <div class="assignment-actions">
                      <button class="btn-assignment-edit">✏️</button>
                      <button class="btn-assignment-delete">🗑️</button>
                    </div>
                  </div>
                  <div class="assignment-item">
                    <div class="assignment-info">
                      <span class="device-name">📊 Zawór bezpieczeństwa ZB-002</span>
                      <span class="scenario-name">🔋 Test ciśnienia</span>
                      <span class="interval-name">⏰ Po użyciu</span>
                    </div>
                    <div class="assignment-actions">
                      <button class="btn-assignment-edit">✏️</button>
                      <button class="btn-assignment-delete">🗑️</button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-actions">
                <button class="btn-submit">💾 Zapisz Przypisanie</button>
                <button class="btn-reset">🔄 Resetuj</button>
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
      /* Connect Manager Layout */
      .connect-manager-container { height: 100vh; overflow: hidden; }
      .connect-manager-layout { display: flex; height: 365px; background: #f5f5f5; }
      
      /* Menu Column - Standard Dark Style */
      .menu-column { width: 120px; background: #2a2a2a; padding: 6px 4px; overflow-y: auto; flex-shrink: 0; border-right: 1px solid #1a1a1a; }
      .column-title { color: #FFF; font-size: 9px; font-weight: 600; text-transform: uppercase; margin: 0 0 6px 0; padding: 4px; text-align: center; background: #1a1a1a; border-radius: 3px; }
      
      .menu-item { width: 100%; background: #3a3a3a; border: none; padding: 3px 4px; margin-bottom: 4px; border-radius: 5px; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 4px; transition: all 0.2s; color: #ccc; }
      .menu-item:hover { background: #4a4a4a; color: white; }
      .menu-item.active { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; box-shadow: 0 2px 6px rgba(102, 126, 234, 0.4); }
      .menu-icon { font-size: 13px; }
      .menu-label { font-size: 10px; font-weight: 500; text-align: center; line-height: 1.2; }
      
      /* Main Content */
      .main-content { flex: 1; overflow-y: auto; }
      .action-content { display: none; padding: 20px; }
      .action-content.active { display: block; }
      
      .content-header { display: flex; justify-content: between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid #e0e0e0; padding-bottom: 15px; }
      .content-header h4 { margin: 0; font-size: 13px; color: #333; }
      .btn-add { background: #28a745; color: white; border: none; border-radius: 4px; padding: 8px 16px; cursor: pointer; font-size: 12px; font-weight: 600; }
      .btn-add:hover { background: #218838; }
      
      /* Scenarios Grid */
      .scenarios-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
      .scenario-card { background: white; border: 1px solid #e0e0e0; border-radius: 8px; padding: 16px; }
      .scenario-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
      .scenario-header h5 { margin: 0; font-size: 14px; color: #333; }
      .scenario-actions { display: flex; gap: 6px; }
      .btn-edit, .btn-delete { background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 3px; padding: 4px 6px; cursor: pointer; font-size: 10px; }
      .btn-edit:hover { background: #007bff; color: white; }
      .btn-delete:hover { background: #dc3545; color: white; }
      
      .scenario-activities { margin-bottom: 12px; }
      .activity-block { display: flex; align-items: center; gap: 8px; background: #f8f9fa; border: 1px solid #e0e0e0; border-radius: 4px; padding: 8px; margin-bottom: 6px; cursor: move; transition: all 0.2s; }
      .activity-block:hover { border-color: #667eea; box-shadow: 0 2px 4px rgba(102, 126, 234, 0.2); }
      .activity-block.dragging { opacity: 0.5; transform: rotate(1deg); }
      .activity-handle { color: #666; cursor: grab; font-weight: bold; }
      .activity-handle:active { cursor: grabbing; }
      .activity-name { flex: 1; font-size: 11px; font-weight: 500; }
      
      .btn-add-activity { width: 100%; background: #17a2b8; color: white; border: none; border-radius: 4px; padding: 6px; cursor: pointer; font-size: 11px; }
      .btn-add-activity:hover { background: #138496; }
      
      /* Activities Table */
      .activities-table { background: white; border-radius: 8px; overflow: hidden; }
      .data-table { width: 100%; border-collapse: collapse; }
      .data-table th { background: #f8f9fa; padding: 12px; text-align: left; font-size: 12px; font-weight: 600; color: #333; border-bottom: 1px solid #e0e0e0; }
      .data-table td { padding: 12px; font-size: 11px; border-bottom: 1px solid #f0f0f0; }
      .data-table tbody tr:hover { background: #f8f9fa; }
      
      .category-tag { padding: 2px 8px; border-radius: 12px; font-size: 10px; font-weight: 500; }
      .category-tag.pressure { background: #fff3cd; color: #856404; }
      .category-tag.safety { background: #d4edda; color: #155724; }
      .category-tag.visual { background: #d1ecf1; color: #0c5460; }
      .category-tag.config { background: #f8d7da; color: #721c24; }
      
      .btn-table-edit, .btn-table-delete { background: none; border: none; cursor: pointer; padding: 4px; margin: 0 2px; }
      .btn-table-edit:hover { color: #007bff; }
      .btn-table-delete:hover { color: #dc3545; }
      
      /* Test Type Form */
      .test-type-form { background: white; border-radius: 8px; padding: 20px; }
      .form-section { margin-bottom: 25px; padding-bottom: 20px; border-bottom: 1px solid #f0f0f0; }
      .form-section:last-child { border-bottom: none; }
      .form-section h5 { margin: 0 0 15px 0; font-size: 14px; color: #333; font-weight: 600; }
      
      .form-group { margin-bottom: 15px; }
      .form-group label { display: block; margin-bottom: 6px; font-size: 12px; font-weight: 500; color: #555; }
      .form-select { width: 100%; padding: 8px 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 12px; }
      .form-select:focus { border-color: #667eea; outline: none; box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2); }
      
      .radio-group { display: flex; gap: 20px; }
      .radio-option { display: flex; align-items: center; gap: 6px; font-size: 12px; cursor: pointer; }
      .radio-option input[type="radio"] { margin: 0; }
      
      .assignments-preview { margin-top: 20px; }
      .assignment-list { margin-top: 10px; }
      .assignment-item { display: flex; justify-content: space-between; align-items: center; background: #f8f9fa; border: 1px solid #e0e0e0; border-radius: 6px; padding: 12px; margin-bottom: 8px; }
      .assignment-info { display: flex; flex-direction: column; gap: 4px; }
      .device-name, .scenario-name, .interval-name { font-size: 11px; }
      .device-name { font-weight: 600; color: #333; }
      .scenario-name { color: #666; }
      .interval-name { color: #666; }
      .assignment-actions { display: flex; gap: 4px; }
      .btn-assignment-edit, .btn-assignment-delete { background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 3px; padding: 4px 6px; cursor: pointer; font-size: 10px; }
      .btn-assignment-edit:hover { background: #007bff; color: white; }
      .btn-assignment-delete:hover { background: #dc3545; color: white; }
      
      .form-actions { display: flex; gap: 10px; margin-top: 20px; }
      .btn-submit { background: #28a745; color: white; border: none; border-radius: 4px; padding: 10px 20px; cursor: pointer; font-size: 12px; font-weight: 600; }
      .btn-submit:hover { background: #218838; }
      .btn-reset { background: #6c757d; color: white; border: none; border-radius: 4px; padding: 10px 20px; cursor: pointer; font-size: 12px; font-weight: 600; }
      .btn-reset:hover { background: #5a6268; }
    `;
    
    document.head.appendChild(style);
  }

  private setupEventListeners(container: HTMLElement): void {
    // Menu navigation
    const menuItems = container.querySelectorAll('[data-action]');
    menuItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const action = target.getAttribute('data-action');
        if (action) this.switchAction(action, container);
      });
    });

    // Setup drag and drop for scenario activities
    this.setupDragDrop(container);
  }

  private switchAction(action: string, container: HTMLElement): void {
    this.currentAction = action;

    // Update menu active state
    container.querySelectorAll('[data-action]').forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-action') === action) item.classList.add('active');
    });

    // Hide all content sections
    container.querySelectorAll('.action-content').forEach(content => {
      content.classList.remove('active');
    });

    // Show selected content
    const activeContent = container.querySelector(`#${action}-content`);
    if (activeContent) {
      activeContent.classList.add('active');
    }
  }

  private setupDragDrop(container: HTMLElement): void {
    // Setup drag and drop for activity blocks
    container.addEventListener('dragstart', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('activity-block')) {
        target.classList.add('dragging');
        if (e.dataTransfer) {
          e.dataTransfer.effectAllowed = 'move';
          e.dataTransfer.setData('text/html', target.outerHTML);
        }
      }
    });

    container.addEventListener('dragend', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('activity-block')) {
        target.classList.remove('dragging');
      }
    });

    container.addEventListener('dragover', (e) => {
      e.preventDefault();
      const scenarioActivities = container.querySelector('.scenario-activities');
      if (scenarioActivities && scenarioActivities.contains(e.target as Node)) {
        e.dataTransfer!.dropEffect = 'move';
      }
    });

    container.addEventListener('drop', (e) => {
      e.preventDefault();
      const scenarioActivities = (e.target as HTMLElement).closest('.scenario-activities');
      if (scenarioActivities) {
        const draggingElement = container.querySelector('.dragging');
        if (draggingElement && e.target !== draggingElement) {
          const targetElement = (e.target as HTMLElement).closest('.activity-block');
          if (targetElement) {
            scenarioActivities.insertBefore(draggingElement, targetElement.nextSibling);
          }
        }
      }
    });
  }
}
