// frontend/src/modules/connect-manager/pages/scenarios.page.ts
export class ScenariosPage {
  private static readonly scenarios = [
    {
      id: 'scenario-1',
      name: 'C20 - Ciśnienie',
      activities: [
        { id: 'act-1', name: '🔋 Test ciśnienia', duration: '15 min' },
        { id: 'act-2', name: '📊 Analiza wyników', duration: '10 min' },
        { id: 'act-3', name: '📝 Dokumentacja', duration: '5 min' }
      ]
    },
    {
      id: 'scenario-2', 
      name: 'Flow Test',
      activities: [
        { id: 'act-4', name: '💨 Test przepływu', duration: '20 min' },
        { id: 'act-5', name: '🔍 Kontrola szczelności', duration: '15 min' }
      ]
    }
  ];

  static getContent(): string {
    return `
      <div class="page-content">
        <div class="page-header">
          <h2>🧪 Scenariusze Testów</h2>
          <p>Zarządzaj scenariuszami testów z drag&drop</p>
        </div>
        
        <div class="scenarios-grid" id="scenarios-grid">
          ${this.renderScenarios()}
          <div class="scenario-card new" id="add-scenario-card">
            <div class="new-scenario-placeholder">
              <span class="plus-icon">➕</span>
              <span>Dodaj nowy scenariusz</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private static renderScenarios(): string {
    return this.scenarios.map(scenario => `
      <div class="scenario-card" data-scenario-id="${scenario.id}">
        <div class="scenario-header">
          <h3>${scenario.name}</h3>
          <div class="scenario-actions">
            <button class="btn-icon edit-scenario" data-scenario-id="${scenario.id}">✏️</button>
            <button class="btn-icon delete-scenario" data-scenario-id="${scenario.id}">🗑️</button>
          </div>
        </div>
        <div class="activity-blocks" data-scenario-id="${scenario.id}">
          ${scenario.activities.map(activity => `
            <div class="activity-block" draggable="true" data-activity-id="${activity.id}">
              <span class="drag-handle">⋮⋮</span>
              <span class="activity-name">${activity.name}</span>
              <span class="activity-duration">${activity.duration}</span>
              <button class="activity-delete" data-activity-id="${activity.id}">✕</button>
            </div>
          `).join('')}
        </div>
        <button class="btn-add-activity" data-scenario-id="${scenario.id}">➕ Dodaj czynność</button>
      </div>
    `).join('');
  }

  static getStyles(): string {
    return `
      .page-content { padding: 20px; }
      .page-header h2 { color: #333; font-size: 24px; margin-bottom: 5px; }
      .scenarios-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 20px; }
      .scenario-card { background: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); position: relative; }
      .scenario-card.new { display: flex; align-items: center; justify-content: center; min-height: 200px; cursor: pointer; border: 2px dashed #ddd; background: #f8f9fa; }
      .scenario-card.new:hover { border-color: #007bff; background: #e7f3ff; }
      .new-scenario-placeholder { display: flex; flex-direction: column; align-items: center; gap: 10px; color: #666; }
      .plus-icon { font-size: 48px; }
      .scenario-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
      .scenario-header h3 { margin: 0; font-size: 18px; }
      .scenario-actions { display: flex; gap: 8px; }
      .btn-icon { padding: 6px 10px; border: none; background: #f8f9fa; border-radius: 4px; cursor: pointer; transition: all 0.2s; }
      .btn-icon:hover { background: #e9ecef; }
      .edit-scenario:hover { background: #e7f3ff; color: #007bff; }
      .delete-scenario:hover { background: #ffe6e6; color: #dc3545; }
      .activity-blocks { display: flex; flex-direction: column; gap: 10px; margin-bottom: 15px; min-height: 60px; }
      .activity-blocks.drag-over { background: #e7f3ff; border: 2px dashed #007bff; border-radius: 6px; }
      .activity-block { display: flex; align-items: center; gap: 10px; padding: 12px; background: #f8f9fa; border-radius: 6px; cursor: move; transition: all 0.2s; position: relative; }
      .activity-block:hover { background: #e9ecef; }
      .activity-block.dragging { opacity: 0.5; transform: rotate(5deg); }
      .activity-block.drag-over { border-top: 3px solid #007bff; }
      .drag-handle { color: #999; cursor: grab; user-select: none; }
      .drag-handle:active { cursor: grabbing; }
      .activity-name { flex: 1; font-weight: 500; }
      .activity-duration { font-size: 12px; color: #666; }
      .activity-delete { background: none; border: none; color: #dc3545; cursor: pointer; opacity: 0; transition: opacity 0.2s; padding: 2px; }
      .activity-block:hover .activity-delete { opacity: 1; }
      .activity-delete:hover { background: #ffe6e6; border-radius: 50%; }
      .btn-add-activity { width: 100%; padding: 10px; border: 1px dashed #ddd; background: white; border-radius: 6px; cursor: pointer; color: #666; transition: all 0.2s; }
      .btn-add-activity:hover { background: #f8f9fa; border-color: #007bff; color: #007bff; }
      
      /* Modal styles for add/edit forms */
      .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; align-items: center; justify-content: center; }
      .modal-content { background: white; border-radius: 8px; padding: 20px; max-width: 500px; width: 90%; }
      .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
      .modal-title { margin: 0; font-size: 20px; }
      .modal-close { background: none; border: none; font-size: 24px; cursor: pointer; color: #666; }
      .form-group { margin-bottom: 15px; }
      .form-group label { display: block; margin-bottom: 5px; font-weight: 500; }
      .form-group input { width: 100%; padding: 8px 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; }
      .form-actions { display: flex; gap: 10px; justify-content: flex-end; }
      .btn-primary { background: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; }
      .btn-secondary { background: #6c757d; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; }
    `;
  }

  static setupEventListeners(): void {
    // Setup event listeners after DOM is loaded
    setTimeout(() => this.initializeEventListeners(), 100);
  }

  private static initializeEventListeners(): void {
    // Add scenario button
    const addScenarioCard = document.getElementById('add-scenario-card');
    if (addScenarioCard) {
      addScenarioCard.addEventListener('click', () => this.showAddScenarioModal());
    }

    // Add activity buttons
    document.querySelectorAll('.btn-add-activity').forEach(button => {
      button.addEventListener('click', (e) => {
        const scenarioId = (e.target as HTMLElement).dataset.scenarioId;
        if (scenarioId) {
          this.showAddActivityModal(scenarioId);
        }
      });
    });

    // Edit scenario buttons
    document.querySelectorAll('.edit-scenario').forEach(button => {
      button.addEventListener('click', (e) => {
        const scenarioId = (e.target as HTMLElement).dataset.scenarioId;
        if (scenarioId) {
          this.showEditScenarioModal(scenarioId);
        }
      });
    });

    // Delete scenario buttons
    document.querySelectorAll('.delete-scenario').forEach(button => {
      button.addEventListener('click', (e) => {
        const scenarioId = (e.target as HTMLElement).dataset.scenarioId;
        if (scenarioId && confirm('Czy na pewno chcesz usunąć ten scenariusz?')) {
          this.deleteScenario(scenarioId);
        }
      });
    });

    // Delete activity buttons
    document.querySelectorAll('.activity-delete').forEach(button => {
      button.addEventListener('click', (e) => {
        const activityId = (e.target as HTMLElement).dataset.activityId;
        if (activityId && confirm('Czy na pewno chcesz usunąć tę czynność?')) {
          this.deleteActivity(activityId);
        }
      });
    });

    // Setup drag and drop
    this.setupDragAndDrop();
  }

  private static setupDragAndDrop(): void {
    const activityBlocks = document.querySelectorAll('.activity-block');
    const activityContainers = document.querySelectorAll('.activity-blocks');

    // Setup draggable items
    activityBlocks.forEach(block => {
      block.addEventListener('dragstart', (e: Event) => {
        const dragEvent = e as DragEvent;
        (e.target as HTMLElement).classList.add('dragging');
        if (dragEvent.dataTransfer) {
          dragEvent.dataTransfer.effectAllowed = 'move';
          dragEvent.dataTransfer.setData('text/html', (e.target as HTMLElement).outerHTML);
          dragEvent.dataTransfer.setData('text/plain', (e.target as HTMLElement).dataset.activityId || '');
        }
      });

      block.addEventListener('dragend', (e: Event) => {
        (e.target as HTMLElement).classList.remove('dragging');
      });
    });

    // Setup drop zones
    activityContainers.forEach(container => {
      container.addEventListener('dragover', (e: Event) => {
        const dragEvent = e as DragEvent;
        e.preventDefault();
        if (dragEvent.dataTransfer) {
          dragEvent.dataTransfer.dropEffect = 'move';
        }
        
        const dragging = document.querySelector('.dragging');
        const afterElement = this.getDragAfterElement(container as HTMLElement, dragEvent.clientY);
        
        if (afterElement == null && dragging) {
          container.appendChild(dragging);
        } else if (afterElement && dragging) {
          container.insertBefore(dragging, afterElement);
        }
      });

      container.addEventListener('dragenter', (e: Event) => {
        e.preventDefault();
        (e.target as HTMLElement).classList.add('drag-over');
      });

      container.addEventListener('dragleave', (e: Event) => {
        const mouseEvent = e as MouseEvent;
        if (!(e.target as HTMLElement).contains(mouseEvent.relatedTarget as Node)) {
          (e.target as HTMLElement).classList.remove('drag-over');
        }
      });

      container.addEventListener('drop', (e: Event) => {
        const dragEvent = e as DragEvent;
        e.preventDefault();
        (e.target as HTMLElement).classList.remove('drag-over');
        
        if (dragEvent.dataTransfer) {
          const activityId = dragEvent.dataTransfer.getData('text/plain');
          const newScenarioId = (e.target as HTMLElement).dataset.scenarioId;
          
          if (activityId && newScenarioId) {
            this.moveActivity(activityId, newScenarioId);
          }
        }
      });
    });
  }

  private static getDragAfterElement(container: HTMLElement, y: number): Element | null {
    const draggableElements = [...container.querySelectorAll('.activity-block:not(.dragging)')];
    
    type ClosestElement = {
      offset: number;
      element: Element | null;
    };
    
    return draggableElements.reduce((closest: ClosestElement, child: Element): ClosestElement => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY, element: null }).element;
  }

  private static showAddScenarioModal(): void {
    this.showModal('Dodaj nowy scenariusz', `
      <div class="form-group">
        <label for="scenario-name">Nazwa scenariusza:</label>
        <input type="text" id="scenario-name" placeholder="Wprowadź nazwę scenariusza" />
      </div>
    `, () => {
      const nameInput = document.getElementById('scenario-name') as HTMLInputElement;
      if (nameInput.value.trim()) {
        this.addScenario(nameInput.value.trim());
        this.closeModal();
      }
    });
  }

  private static showEditScenarioModal(scenarioId: string): void {
    const scenario = this.scenarios.find(s => s.id === scenarioId);
    if (!scenario) return;

    this.showModal('Edytuj scenariusz', `
      <div class="form-group">
        <label for="scenario-name">Nazwa scenariusza:</label>
        <input type="text" id="scenario-name" value="${scenario.name}" />
      </div>
    `, () => {
      const nameInput = document.getElementById('scenario-name') as HTMLInputElement;
      if (nameInput.value.trim()) {
        this.editScenario(scenarioId, nameInput.value.trim());
        this.closeModal();
      }
    });
  }

  private static showAddActivityModal(scenarioId: string): void {
    this.showModal('Dodaj nową czynność', `
      <div class="form-group">
        <label for="activity-name">Nazwa czynności:</label>
        <input type="text" id="activity-name" placeholder="Wprowadź nazwę czynności" />
      </div>
      <div class="form-group">
        <label for="activity-duration">Czas trwania:</label>
        <input type="text" id="activity-duration" placeholder="np. 15 min" />
      </div>
    `, () => {
      const nameInput = document.getElementById('activity-name') as HTMLInputElement;
      const durationInput = document.getElementById('activity-duration') as HTMLInputElement;
      
      if (nameInput.value.trim() && durationInput.value.trim()) {
        this.addActivity(scenarioId, nameInput.value.trim(), durationInput.value.trim());
        this.closeModal();
      }
    });
  }

  private static showModal(title: string, content: string, onSave: () => void): void {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">${title}</h3>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          ${content}
        </div>
        <div class="form-actions">
          <button class="btn-secondary modal-cancel">Anuluj</button>
          <button class="btn-primary modal-save">Zapisz</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Event listeners
    modal.querySelector('.modal-close')?.addEventListener('click', () => this.closeModal());
    modal.querySelector('.modal-cancel')?.addEventListener('click', () => this.closeModal());
    modal.querySelector('.modal-save')?.addEventListener('click', onSave);
    
    // Close on overlay click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) this.closeModal();
    });
  }

  private static closeModal(): void {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
      modal.remove();
    }
  }

  // Data manipulation methods
  private static addScenario(name: string): void {
    const newScenario = {
      id: `scenario-${Date.now()}`,
      name: name,
      activities: []
    };
    this.scenarios.push(newScenario);
    this.refreshScenarios();
  }

  private static editScenario(scenarioId: string, newName: string): void {
    const scenario = this.scenarios.find(s => s.id === scenarioId);
    if (scenario) {
      scenario.name = newName;
      this.refreshScenarios();
    }
  }

  private static deleteScenario(scenarioId: string): void {
    const index = this.scenarios.findIndex(s => s.id === scenarioId);
    if (index !== -1) {
      this.scenarios.splice(index, 1);
      this.refreshScenarios();
    }
  }

  private static addActivity(scenarioId: string, name: string, duration: string): void {
    const scenario = this.scenarios.find(s => s.id === scenarioId);
    if (scenario) {
      const newActivity = {
        id: `act-${Date.now()}`,
        name: name,
        duration: duration
      };
      scenario.activities.push(newActivity);
      this.refreshScenarios();
    }
  }

  private static deleteActivity(activityId: string): void {
    for (const scenario of this.scenarios) {
      const index = scenario.activities.findIndex(a => a.id === activityId);
      if (index !== -1) {
        scenario.activities.splice(index, 1);
        this.refreshScenarios();
        break;
      }
    }
  }

  private static moveActivity(activityId: string, newScenarioId: string): void {
    // Find and remove activity from current scenario
    let activity = null;
    for (const scenario of this.scenarios) {
      const index = scenario.activities.findIndex(a => a.id === activityId);
      if (index !== -1) {
        activity = scenario.activities.splice(index, 1)[0];
        break;
      }
    }

    // Add to new scenario
    if (activity) {
      const newScenario = this.scenarios.find(s => s.id === newScenarioId);
      if (newScenario) {
        newScenario.activities.push(activity);
        this.refreshScenarios();
      }
    }
  }

  private static refreshScenarios(): void {
    const grid = document.getElementById('scenarios-grid');
    if (grid) {
      const addCard = document.getElementById('add-scenario-card');
      grid.innerHTML = this.renderScenarios();
      if (addCard) {
        grid.appendChild(addCard);
      }
      this.initializeEventListeners();
    }
  }
}
