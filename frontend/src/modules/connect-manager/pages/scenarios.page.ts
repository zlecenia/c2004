// frontend/src/modules/connect-manager/pages/scenarios.page.ts
export class ScenariosPage {
  private scenarioData: any = {
    name: 'Test szczelności C20',
    goals: []
  };

  static getContent(): string {
    return `
      <div class="page-content">
        <div class="page-header">
          <h2>🎯 Budowanie Scenariuszy Testowych</h2>
          <p>Twórz scenariusze testowe jako zdania logiczne z elementami Goal → Task → Function</p>
        </div>
        
        <div class="scenario-builder-layout">
          <div class="main-builder">
            <div class="scenario-name-input">
              <input type="text" id="scenario-name" placeholder="Nazwa scenariusza..." value="Test szczelności C20">
            </div>

            <div id="goals-container">
              <div class="goal-section" data-goal-id="goal1">
                <div class="goal-header">
                  <span class="goal-label">GOAL</span>
                  <select class="goal-select">
                    <option>Wytworzyć podciśnienie</option>
                    <option>Sprawdzić szczelność</option>
                    <option>Zmierzyć przepływ</option>
                    <option>Przetestować ciśnienie</option>
                    <option>Kalibrować urządzenie</option>
                  </select>
                  <button class="btn-delete" data-action="delete-goal">🗑️</button>
                </div>

                <div class="tasks-container">
                  <div class="task-container" data-task-id="task1">
                    <div class="task-header">
                      <span class="task-label">TASK 1</span>
                      <button class="btn-delete-small" data-action="delete-task">✕</button>
                    </div>
                    <div class="sentence-builder">
                      <div class="sentence-part">
                        <span class="sentence-text">Funkcja:</span>
                        <select class="function-select">
                          <option>Włącz</option>
                          <option>Wyłącz</option>
                          <option>Ustaw</option>
                          <option>Zmierz</option>
                          <option>Sprawdź</option>
                        </select>
                      </div>
                      <div class="sentence-part">
                        <span class="sentence-text">Obiekt:</span>
                        <select class="object-select">
                          <option>pompę 1</option>
                          <option>pompę 2</option>
                          <option>zawór 1</option>
                          <option>zawór 2</option>
                          <option>zawór 3</option>
                          <option>sprężarkę</option>
                          <option>regulator</option>
                        </select>
                      </div>
                      <div class="sentence-part">
                        <button class="btn-add-and">+ AND</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="conditions-container">
                  <div class="condition-group" data-condition-type="if">
                    <span class="condition-label">IF</span>
                    <div class="condition-builder">
                      <select class="param-select">
                        <option>czas</option>
                        <option>ciśnienie</option>
                        <option>temperatura</option>
                        <option>przepływ</option>
                        <option>objętość</option>
                      </select>
                      <select class="operator-select">
                        <option>></option>
                        <option><</option>
                        <option>=</option>
                        <option>>=</option>
                        <option><=</option>
                      </select>
                      <input type="text" class="value-input" value="10" size="5">
                      <select class="unit-select">
                        <option>s</option>
                        <option>min</option>
                        <option>mbar</option>
                        <option>bar</option>
                        <option>°C</option>
                        <option>l/min</option>
                      </select>
                      <span class="operator-text">TO</span>
                      <select class="result-select">
                        <option>niskie ciśnienie</option>
                        <option>wysokie ciśnienie</option>
                        <option>przepływ OK</option>
                        <option>temperatura OK</option>
                        <option>test zaliczony</option>
                      </select>
                    </div>
                  </div>

                  <div class="condition-group" data-condition-type="else">
                    <span class="condition-label error">ELSE</span>
                    <div class="condition-builder">
                      <span class="action-text">ERROR:</span>
                      <input type="text" class="error-message" value="Nieszczelność" size="20">
                    </div>
                  </div>
                </div>

                <div class="goal-actions">
                  <button class="btn-add-task">+ Dodaj zadanie</button>
                  <button class="btn-add-condition">+ Dodaj warunek</button>
                </div>
              </div>
            </div>

            <button class="btn-add-goal" id="add-goal-btn">+ Dodaj nowy cel (Goal)</button>

            <div class="preview-section">
              <div class="preview-header">
                <span class="preview-title">📝 Podgląd scenariusza</span>
                <button class="btn-copy">📋 Kopiuj</button>
              </div>
              <pre class="preview-code" id="scenario-preview">
SCENARIO: Test szczelności C20

GOAL: Wytworzyć podciśnienie
  TASK 1:
    → Włącz [pompę 1]
    
  IF [czas] [>] [10 s] TO [niskie ciśnienie]
  ELSE ERROR "Nieszczelność"
              </pre>
            </div>
          </div>

          <div class="sidebar">
            <div class="sidebar-section">
              <h3>📚 Biblioteka elementów</h3>
              
              <div class="element-library">
                <div class="library-category">
                  <h4>Obiekty</h4>
                  <div class="library-items">
                    <span class="library-item" draggable="true" data-type="object">pompa 1</span>
                    <span class="library-item" draggable="true" data-type="object">pompa 2</span>
                    <span class="library-item" draggable="true" data-type="object">zawór 1</span>
                    <span class="library-item" draggable="true" data-type="object">zawór 2</span>
                    <span class="library-item" draggable="true" data-type="object">zawór 3</span>
                    <span class="library-item" draggable="true" data-type="object">sprężarka</span>
                    <span class="library-item" draggable="true" data-type="object">regulator</span>
                    <span class="library-item" draggable="true" data-type="object">czujnik</span>
                  </div>
                </div>

                <div class="library-category">
                  <h4>Funkcje</h4>
                  <div class="library-items">
                    <span class="library-item" draggable="true" data-type="function">Włącz</span>
                    <span class="library-item" draggable="true" data-type="function">Wyłącz</span>
                    <span class="library-item" draggable="true" data-type="function">Ustaw</span>
                    <span class="library-item" draggable="true" data-type="function">Zmierz</span>
                    <span class="library-item" draggable="true" data-type="function">Sprawdź</span>
                    <span class="library-item" draggable="true" data-type="function">Porównaj</span>
                    <span class="library-item" draggable="true" data-type="function">Kalibruj</span>
                  </div>
                </div>

                <div class="library-category">
                  <h4>Parametry</h4>
                  <div class="library-items">
                    <span class="library-item" draggable="true" data-type="param">ciśnienie</span>
                    <span class="library-item" draggable="true" data-type="param">temperatura</span>
                    <span class="library-item" draggable="true" data-type="param">przepływ</span>
                    <span class="library-item" draggable="true" data-type="param">czas</span>
                    <span class="library-item" draggable="true" data-type="param">objętość</span>
                    <span class="library-item" draggable="true" data-type="param">wilgotność</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="sidebar-section">
              <h3>💡 Przykłady z bazy</h3>
              <div class="examples-list">
                <div class="example-item" data-example-id="1">
                  <strong>Test przepływu</strong>
                  <small>Włącz [pompę 2] → Zmierz [przepływ] > 100 l/min</small>
                </div>
                <div class="example-item" data-example-id="2">
                  <strong>Kontrola ciśnienia</strong>
                  <small>Ustaw [regulator] = 5 bar → Sprawdź [ciśnienie]</small>
                </div>
                <div class="example-item" data-example-id="3">
                  <strong>Test szczelności kompleksowy</strong>
                  <small>Włącz [zawór 1] AND [zawór 2] → IF [czas] > 60s THEN [ciśnienie] < 0.5 bar</small>
                </div>
                <div class="example-item" data-example-id="4">
                  <strong>Kalibracja czujnika</strong>
                  <small>Kalibruj [czujnik] → Sprawdź [dokładność] = ±0.1%</small>
                </div>
              </div>
            </div>

            <div class="sidebar-actions">
              <button class="btn-save-scenario">💾 Zapisz scenariusz</button>
              <button class="btn-load-scenario">📂 Wczytaj scenariusz</button>
              <button class="btn-export">📤 Eksportuj</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static getStyles(): string {
    return `
      .page-content { padding: 20px; height: 100%; overflow-y: auto; }
      .page-header { margin-bottom: 20px; }
      .page-header h2 { color: #333; font-size: 24px; margin-bottom: 5px; }
      .page-header p { color: #666; font-size: 14px; }
      
      .scenario-builder-layout {
        display: grid;
        grid-template-columns: 1fr 350px;
        gap: 20px;
        height: calc(100vh - 200px);
      }
      
      .main-builder {
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        overflow-y: auto;
      }
      
      .scenario-name-input {
        margin-bottom: 20px;
      }
      
      .scenario-name-input input {
        width: 100%;
        padding: 12px;
        font-size: 18px;
        font-weight: 600;
        border: 2px solid #e0e0e0;
        border-radius: 6px;
      }
      
      .goal-section {
        background: #f0f7ff;
        padding: 15px;
        border-radius: 8px;
        border: 2px solid #007bff;
        margin-bottom: 15px;
      }
      
      .goal-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 15px;
      }
      
      .goal-label {
        background: #007bff;
        color: white;
        padding: 4px 12px;
        border-radius: 4px;
        font-weight: 600;
        font-size: 12px;
      }
      
      .goal-select {
        flex: 1;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
        background: white;
      }
      
      .task-container {
        background: white;
        padding: 15px;
        border-radius: 6px;
        margin-bottom: 10px;
        border: 1px solid #e0e0e0;
      }
      
      .task-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      }
      
      .task-label {
        background: #28a745;
        color: white;
        padding: 3px 8px;
        border-radius: 3px;
        font-size: 11px;
        font-weight: 600;
      }
      
      .sentence-builder {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 10px;
        padding: 12px;
        background: #f8f9fa;
        border-radius: 6px;
        min-height: 45px;
      }
      
      .sentence-part {
        display: flex;
        align-items: center;
        gap: 5px;
      }
      
      .sentence-text {
        color: #666;
        font-size: 14px;
      }
      
      .function-select, .object-select, .param-select, .operator-select, .unit-select, .result-select {
        padding: 6px 10px;
        border: 2px solid #007bff;
        border-radius: 4px;
        background: white;
        color: #007bff;
        font-weight: 600;
        font-size: 14px;
      }
      
      .value-input {
        padding: 6px 10px;
        border: 2px solid #28a745;
        border-radius: 4px;
        background: white;
        color: #28a745;
        font-weight: 600;
        font-size: 14px;
        text-align: center;
      }
      
      .condition-group {
        background: #fff5f5;
        padding: 15px;
        border-radius: 6px;
        margin-top: 10px;
        border: 2px solid #dc3545;
      }
      
      .condition-label {
        background: #dc3545;
        color: white;
        padding: 3px 8px;
        border-radius: 3px;
        font-size: 11px;
        font-weight: 600;
        margin-bottom: 10px;
        display: inline-block;
      }
      
      .condition-label.error {
        background: #ffc107;
        color: #333;
      }
      
      .condition-builder {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
      }
      
      .operator-text {
        background: #ffc107;
        color: #333;
        padding: 4px 8px;
        border-radius: 4px;
        font-weight: 600;
        font-size: 12px;
      }
      
      .action-text {
        color: #dc3545;
        font-weight: 600;
      }
      
      .error-message {
        padding: 6px 10px;
        border: 2px solid #dc3545;
        border-radius: 4px;
        color: #dc3545;
        font-weight: 600;
      }
      
      .goal-actions {
        display: flex;
        gap: 10px;
        margin-top: 15px;
      }
      
      .btn-add-task, .btn-add-condition, .btn-add-goal {
        padding: 8px 16px;
        border: 2px dashed #007bff;
        background: white;
        color: #007bff;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
      }
      
      .btn-add-goal {
        width: 100%;
        padding: 12px;
        margin-top: 10px;
      }
      
      .btn-delete {
        padding: 6px 10px;
        background: #dc3545;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
      }
      
      .btn-delete-small {
        background: transparent;
        color: #dc3545;
        border: none;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
      }
      
      .btn-add-and {
        padding: 4px 8px;
        background: #ffc107;
        color: #333;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 600;
      }
      
      .preview-section {
        margin-top: 20px;
        padding: 15px;
        background: #f0f0f0;
        border-radius: 6px;
      }
      
      .preview-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      }
      
      .preview-title {
        font-size: 14px;
        font-weight: 600;
      }
      
      .btn-copy {
        padding: 4px 8px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
      }
      
      .preview-code {
        font-family: 'Courier New', monospace;
        font-size: 13px;
        line-height: 1.6;
        color: #333;
        white-space: pre-wrap;
        margin: 0;
      }
      
      .sidebar {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      
      .sidebar-section {
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }
      
      .sidebar-section h3 {
        font-size: 16px;
        margin-bottom: 15px;
        color: #333;
      }
      
      .element-library {
        display: flex;
        flex-direction: column;
        gap: 15px;
      }
      
      .library-category h4 {
        font-size: 12px;
        font-weight: 600;
        color: #666;
        text-transform: uppercase;
        margin-bottom: 8px;
      }
      
      .library-items {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      
      .library-item {
        padding: 6px 10px;
        background: #f8f9fa;
        border: 1px solid #dee2e6;
        border-radius: 4px;
        font-size: 13px;
        cursor: move;
        transition: all 0.2s;
      }
      
      .library-item:hover {
        border-color: #007bff;
        background: #e7f3ff;
      }
      
      .library-item.dragging {
        opacity: 0.5;
      }
      
      .examples-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      
      .example-item {
        padding: 10px;
        background: #f8f9fa;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s;
      }
      
      .example-item:hover {
        background: #e3f2fd;
        transform: translateX(5px);
      }
      
      .example-item strong {
        display: block;
        color: #333;
        font-size: 13px;
        margin-bottom: 4px;
      }
      
      .example-item small {
        color: #666;
        font-size: 11px;
        line-height: 1.4;
      }
      
      .sidebar-actions {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }
      
      .btn-save-scenario, .btn-load-scenario, .btn-export {
        padding: 10px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        transition: all 0.2s;
      }
      
      .btn-save-scenario {
        background: #28a745;
        color: white;
      }
      
      .btn-save-scenario:hover {
        background: #218838;
      }
      
      .btn-load-scenario {
        background: #007bff;
        color: white;
      }
      
      .btn-export {
        background: #6c757d;
        color: white;
      }
    `;
  }

  static attachEventListeners(): void {
    const container = document.querySelector('#connect-manager-content');
    if (!container) return;

    // Add Goal button
    container.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;

      if (target.id === 'add-goal-btn' || target.closest('#add-goal-btn')) {
        this.addNewGoal();
      }

      if (target.classList.contains('btn-add-task') || target.closest('.btn-add-task')) {
        const goalSection = target.closest('.goal-section');
        if (goalSection) {
          this.addNewTask(goalSection as HTMLElement);
        }
      }

      if (target.classList.contains('btn-add-condition') || target.closest('.btn-add-condition')) {
        const goalSection = target.closest('.goal-section');
        if (goalSection) {
          this.addNewCondition(goalSection as HTMLElement);
        }
      }

      if (target.classList.contains('btn-save-scenario') || target.closest('.btn-save-scenario')) {
        this.saveScenario();
      }

      if (target.classList.contains('example-item') || target.closest('.example-item')) {
        const example = target.closest('.example-item') as HTMLElement;
        const exampleId = example.dataset.exampleId;
        if (exampleId) {
          this.loadExample(exampleId);
        }
      }

      if (target.dataset.action === 'delete-goal') {
        const goalSection = target.closest('.goal-section');
        if (goalSection) {
          goalSection.remove();
          this.updatePreview();
        }
      }

      if (target.classList.contains('btn-copy')) {
        const previewText = document.getElementById('scenario-preview')?.textContent;
        if (previewText) {
          navigator.clipboard.writeText(previewText);
          alert('📋 Skopiowano do schowka!');
        }
      }
    });

    // Update preview on changes
    container.addEventListener('change', () => this.updatePreview());
    container.addEventListener('input', () => this.updatePreview());

    // Initialize drag and drop
    this.initializeDragAndDrop();
  }

  private static addNewGoal(): void {
    const goalsContainer = document.getElementById('goals-container');
    if (!goalsContainer) return;

    const goalId = `goal${Date.now()}`;
    const newGoal = document.createElement('div');
    newGoal.className = 'goal-section';
    newGoal.dataset.goalId = goalId;

    newGoal.innerHTML = `
      <div class="goal-header">
        <span class="goal-label">GOAL</span>
        <select class="goal-select">
          <option>Wytworzyć podciśnienie</option>
          <option>Sprawdzić szczelność</option>
          <option>Zmierzyć przepływ</option>
          <option>Przetestować ciśnienie</option>
          <option>Kalibrować urządzenie</option>
        </select>
        <button class="btn-delete" data-action="delete-goal">🗑️</button>
      </div>
      <div class="tasks-container"></div>
      <div class="conditions-container"></div>
      <div class="goal-actions">
        <button class="btn-add-task">+ Dodaj zadanie</button>
        <button class="btn-add-condition">+ Dodaj warunek</button>
      </div>
    `;

    goalsContainer.appendChild(newGoal);
    this.updatePreview();
  }

  private static addNewTask(goalSection: HTMLElement): void {
    const tasksContainer = goalSection.querySelector('.tasks-container');
    if (!tasksContainer) return;

    const taskId = `task${Date.now()}`;
    const taskNumber = tasksContainer.children.length + 1;

    const newTask = document.createElement('div');
    newTask.className = 'task-container';
    newTask.dataset.taskId = taskId;

    newTask.innerHTML = `
      <div class="task-header">
        <span class="task-label">TASK ${taskNumber}</span>
        <button class="btn-delete-small" data-action="delete-task">✕</button>
      </div>
      <div class="sentence-builder">
        <div class="sentence-part">
          <span class="sentence-text">Funkcja:</span>
          <select class="function-select">
            <option>Włącz</option>
            <option>Wyłącz</option>
            <option>Ustaw</option>
            <option>Zmierz</option>
            <option>Sprawdź</option>
          </select>
        </div>
        <div class="sentence-part">
          <span class="sentence-text">Obiekt:</span>
          <select class="object-select">
            <option>pompę 1</option>
            <option>pompę 2</option>
            <option>zawór 1</option>
            <option>zawór 2</option>
            <option>zawór 3</option>
          </select>
        </div>
      </div>
    `;

    tasksContainer.appendChild(newTask);
    this.updatePreview();
  }

  private static addNewCondition(goalSection: HTMLElement): void {
    const conditionsContainer = goalSection.querySelector('.conditions-container');
    if (!conditionsContainer) return;

    const newCondition = document.createElement('div');
    newCondition.className = 'condition-group';
    newCondition.dataset.conditionType = 'if';

    newCondition.innerHTML = `
      <span class="condition-label">IF</span>
      <div class="condition-builder">
        <select class="param-select">
          <option>czas</option>
          <option>ciśnienie</option>
          <option>temperatura</option>
        </select>
        <select class="operator-select">
          <option>></option>
          <option><</option>
          <option>=</option>
        </select>
        <input type="text" class="value-input" value="0" size="5">
        <select class="unit-select">
          <option>s</option>
          <option>mbar</option>
          <option>°C</option>
        </select>
      </div>
    `;

    conditionsContainer.appendChild(newCondition);
    this.updatePreview();
  }

  private static updatePreview(): void {
    const preview = document.getElementById('scenario-preview');
    if (!preview) return;

    const scenarioName = (document.getElementById('scenario-name') as HTMLInputElement)?.value || 'Bez nazwy';
    const goals = document.querySelectorAll('.goal-section');

    let previewText = `SCENARIO: ${scenarioName}\n\n`;

    goals.forEach((goal, goalIndex) => {
      const goalSelect = goal.querySelector('.goal-select') as HTMLSelectElement;
      if (goalSelect) {
        previewText += `GOAL: ${goalSelect.value}\n`;

        const tasks = goal.querySelectorAll('.task-container');
        tasks.forEach((task, taskIndex) => {
          previewText += `  TASK ${taskIndex + 1}:\n`;
          const functionSelect = task.querySelector('.function-select') as HTMLSelectElement;
          const objectSelect = task.querySelector('.object-select') as HTMLSelectElement;

          if (functionSelect && objectSelect) {
            previewText += `    → ${functionSelect.value} [${objectSelect.value}]\n`;
          }
        });

        const conditions = goal.querySelectorAll('.condition-group');
        conditions.forEach(condition => {
          const conditionType = (condition as HTMLElement).dataset.conditionType;
          if (conditionType === 'if') {
            const paramSelect = condition.querySelector('.param-select') as HTMLSelectElement;
            const operatorSelect = condition.querySelector('.operator-select') as HTMLSelectElement;
            const valueInput = condition.querySelector('.value-input') as HTMLInputElement;
            const unitSelect = condition.querySelector('.unit-select') as HTMLSelectElement;

            if (paramSelect && operatorSelect && valueInput && unitSelect) {
              previewText += `  IF [${paramSelect.value}] [${operatorSelect.value}] [${valueInput.value} ${unitSelect.value}]\n`;
            }
          } else if (conditionType === 'else') {
            const errorMessage = condition.querySelector('.error-message') as HTMLInputElement;
            if (errorMessage) {
              previewText += `  ELSE ERROR "${errorMessage.value}"\n`;
            }
          }
        });

        previewText += '\n';
      }
    });

    preview.textContent = previewText;
  }

  private static saveScenario(): void {
    const scenarioName = (document.getElementById('scenario-name') as HTMLInputElement)?.value;

    if (!scenarioName) {
      alert('❌ Podaj nazwę scenariusza!');
      return;
    }

    const scenarioData = {
      name: scenarioName,
      goals: this.collectScenarioData(),
      timestamp: new Date().toISOString()
    };

    console.log('Saving scenario:', scenarioData);

    // Here you would normally save to database
    alert('✅ Scenariusz został zapisany!');
  }

  private static collectScenarioData(): any[] {
    const goals: any[] = [];
    const goalSections = document.querySelectorAll('.goal-section');

    goalSections.forEach(goalSection => {
      const goalSelect = goalSection.querySelector('.goal-select') as HTMLSelectElement;

      if (goalSelect) {
        const goalData = {
          name: goalSelect.value,
          tasks: [] as any[],
          conditions: [] as any[]
        };

        // Collect tasks
        const tasks = goalSection.querySelectorAll('.task-container');
        tasks.forEach(task => {
          const functionSelect = task.querySelector('.function-select') as HTMLSelectElement;
          const objectSelect = task.querySelector('.object-select') as HTMLSelectElement;

          if (functionSelect && objectSelect) {
            goalData.tasks.push({
              function: functionSelect.value,
              object: objectSelect.value
            });
          }
        });

        // Collect conditions
        const conditions = goalSection.querySelectorAll('.condition-group');
        conditions.forEach(condition => {
          const conditionType = (condition as HTMLElement).dataset.conditionType;
          goalData.conditions.push({
            type: conditionType,
            // Add more condition data collection here
          });
        });

        goals.push(goalData);
      }
    });

    return goals;
  }

  private static loadExample(exampleId: string): void {
    // Example scenarios to load
    const examples: Record<string, any> = {
      '1': {
        name: 'Test przepływu',
        goals: [{
          name: 'Zmierzyć przepływ',
          tasks: [
            { function: 'Włącz', object: 'pompę 2' },
            { function: 'Zmierz', object: 'przepływ' }
          ]
        }]
      },
      '2': {
        name: 'Kontrola ciśnienia',
        goals: [{
          name: 'Przetestować ciśnienie',
          tasks: [
            { function: 'Ustaw', object: 'regulator' },
            { function: 'Sprawdź', object: 'ciśnienie' }
          ]
        }]
      }
    };

    const example = examples[exampleId];
    if (example) {
      // Load example into UI
      (document.getElementById('scenario-name') as HTMLInputElement).value = example.name;
      // Load more data...
      this.updatePreview();
      alert(`✅ Załadowano przykład: ${example.name}`);
    }
  }

  private static initializeDragAndDrop(): void {
    const libraryItems = document.querySelectorAll('.library-item');

    libraryItems.forEach(item => {
      item.addEventListener('dragstart', (e) => {
        const dragEvent = e as DragEvent;
        const target = dragEvent.target as HTMLElement;
        target.classList.add('dragging');
        dragEvent.dataTransfer?.setData('text/plain', target.textContent || '');
        dragEvent.dataTransfer?.setData('elementType', target.dataset.type || '');
      });

      item.addEventListener('dragend', (e) => {
        const dragEvent = e as DragEvent;
        const target = dragEvent.target as HTMLElement;
        target.classList.remove('dragging');
      });
    });

    // Add drop zones for sentence builders
    const sentenceBuilders = document.querySelectorAll('.sentence-builder');
    sentenceBuilders.forEach(builder => {
      builder.addEventListener('dragover', (e) => {
        e.preventDefault();
        builder.classList.add('drag-over');
      });

      builder.addEventListener('dragleave', () => {
        builder.classList.remove('drag-over');
      });

      builder.addEventListener('drop', (e) => {
        e.preventDefault();
        const dragEvent = e as DragEvent;
        builder.classList.remove('drag-over');

        const text = dragEvent.dataTransfer?.getData('text/plain');
        const type = dragEvent.dataTransfer?.getData('elementType');

        if (text && type) {
          // Handle drop based on element type
          console.log(`Dropped ${type}: ${text}`);
          this.updatePreview();
        }
      });
    });
  }
}
