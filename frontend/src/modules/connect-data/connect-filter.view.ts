// frontend/src/modules/connect-data/connect-filter.view.ts - Refactored version
import { ConnectFilterModule } from './connect-filter.module';
import { ConnectFilterTemplates } from './connect-filter.templates';
import { ConnectFilterStyles } from './connect-filter.styles';
import { createModuleMenu } from '../../components/connect-menu';

export class ConnectDataView {
  // private module: ConnectFilterModule; // Reserved for future use
  private currentObject: string = 'users';
  private currentAction: string = 'search';

  constructor(_module: ConnectFilterModule) {
    // Module parameter reserved for future use
  }

  render(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'connect-data-compact';
    
    // Update top-bar submenu
    const submenu = document.getElementById('top-bar-submenu');
    if (submenu) submenu.textContent = '📊 Data Management & Analytics';
    
    // Update top-bar section title
    const sectionTitle = document.getElementById('top-bar-section-title');
    if (sectionTitle) sectionTitle.textContent = 'ConnectData - Użytkownicy - Szukaj';
    
    // Create menu container and main content container
    container.innerHTML = `
      <div class="module-with-menu">
        <div id="connect-data-menu-container"></div>
        <div class="module-main-content" id="connect-data-content">
          ${ConnectFilterTemplates.getMainLayoutTemplate()}
        </div>
      </div>
    `;
    
    // Create module menu using MenuManager
    const menuContainer = container.querySelector('#connect-data-menu-container') as HTMLElement;
    if (menuContainer) {
      createModuleMenu('connect-data', menuContainer, {
        onItemClick: (data) => {
          const { item, column } = data;
          console.log(`🔧 ConnectData Menu: ${item.action} - ${item.id} in column ${column.id}`);
          
          if (item.section) {
            this.currentObject = item.section;
            this.updateSectionTitle();
            this.updateCombinatorialContent();
          }
          
          if (item.action) {
            this.currentAction = item.action;
            this.updateSectionTitle();
            this.updateCombinatorialContent();
          }
        }
      });
    }

    // Listen for menu content updates
    this.setupMenuEventListeners();
    
    this.addStyles();
    this.setupEventListeners(container);
    return container;
  }

  private addStyles(): void {
    // Check if styles already added
    if (document.getElementById('connect-filter-styles')) {
      return;
    }

    const style = document.createElement('style');
    style.id = 'connect-filter-styles';
    style.textContent = ConnectFilterStyles.getStyles();
    document.head.appendChild(style);
  }

  private setupEventListeners(container: HTMLElement): void {
    // Object buttons
    const objectItems = container.querySelectorAll('.object-item');
    objectItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const object = target.getAttribute('data-object');
        this.handleObjectClick(object || 'users');
      });
    });

    // Action buttons  
    const actionItems = container.querySelectorAll('.action-item');
    actionItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const action = target.getAttribute('data-action');
        this.handleActionClick(action || 'search');
      });
    });
  }

  private handleObjectClick(object: string): void {
    this.currentObject = object;
    this.updateActiveStates();
    this.updateContent();
  }

  private handleActionClick(action: string): void {
    this.currentAction = action;
    this.updateActiveStates();
    this.updateContent();
  }

  private updateActiveStates(): void {
    // Update object buttons
    const objectItems = document.querySelectorAll('.object-item');
    objectItems.forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-object') === this.currentObject);
    });

    // Update action buttons
    const actionItems = document.querySelectorAll('.action-item');
    actionItems.forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-action') === this.currentAction);
    });
  }

  private updateContent(): void {
    // Content updated based on current object and action selection
    console.log(`ConnectData: ${this.currentObject} - ${this.currentAction}`);
  }

  private updateSectionTitle(): void {
    const sectionTitle = document.getElementById('top-bar-section-title');
    if (sectionTitle) {
      const objectName = this.getObjectDisplayName(this.currentObject);
      const actionName = this.getActionDisplayName(this.currentAction);
      sectionTitle.textContent = `ConnectData - ${objectName} - ${actionName}`;
    }
  }

  private getObjectDisplayName(object: string): string {
    const names: Record<string, string> = {
      'requests': 'Zgłoszenia',
      'services': 'Serwisy', 
      'transport': 'Transport',
      'dispositions': 'Dyspozycje',
      'users': 'Użytkownicy'
    };
    return names[object] || 'Nieznany';
  }

  private getActionDisplayName(action: string): string {
    const names: Record<string, string> = {
      'search': 'Szukaj',
      'add-new': 'Dodaj',
      'export': 'Export',
      'import': 'Import',
      'sync': 'Sync'
    };
    return names[action] || 'Nieznana';
  }

  private setupMenuEventListeners(): void {
    // Listen for combinatorial content updates from MenuManager
    window.addEventListener('menuContentUpdate', (event: any) => {
      const { menuId, selection, combinations } = event.detail;
      
      if (menuId === 'connect-data-menu') {
        console.log(`🔧 ConnectData: Menu content update - ${combinations} combinations`, selection);
        this.handleMenuContentUpdate(selection, combinations);
      }
    });

    // Listen for section changes
    window.addEventListener('sectionChange', (event: any) => {
      const { section, column, combinations } = event.detail;
      
      if (section && column === 'objects-column') {
        console.log(`🔧 ConnectData: Section changed to ${section} (${combinations} combinations)`);
        this.currentObject = section;
        this.updateSectionTitle();
        this.updateCombinatorialContent();
      }
    });

    // Listen for action changes
    window.addEventListener('menuAction', (event: any) => {
      const { action, item, column, combinations } = event.detail;
      
      if (column === 'actions-column') {
        console.log(`🔧 ConnectData: Action ${action} selected (${combinations} combinations)`);
        this.currentAction = item.id;
        this.updateSectionTitle();
        this.updateCombinatorialContent();
      }
    });
  }

  private handleMenuContentUpdate(selection: Record<string, string>, combinations: number): void {
    // Update current state based on selection
    if (selection['objects-column']) {
      this.currentObject = selection['objects-column'];
    }
    
    if (selection['actions-column']) {
      this.currentAction = selection['actions-column'];
    }

    // Generate combinatorial content
    this.generateCombinatorialContent(combinations, selection);
  }

  private updateCombinatorialContent(): void {
    // Calculate current combinations
    const objectsCount = 4; // requests, services, transport, dispositions
    const actionsCount = 5; // search, add-new, export, import, sync
    const combinations = objectsCount * actionsCount;

    const selection = {
      'objects-column': this.currentObject,
      'actions-column': this.currentAction
    };

    this.generateCombinatorialContent(combinations, selection);
  }

  private generateCombinatorialContent(totalCombinations: number, selection: Record<string, string>): void {
    const contentContainer = document.getElementById('connect-data-content');
    if (!contentContainer) return;

    const objectName = this.getObjectDisplayName(this.currentObject);
    const actionName = this.getActionDisplayName(this.currentAction);

    // Generate content based on current combination
    const contentHtml = `
      <div class="combinatorial-content">
        <div class="content-header">
          <h3>${objectName} - ${actionName}</h3>
          <div class="combination-info">
            <span class="combination-badge">${totalCombinations} kombinacji dostępnych</span>
            <span class="current-selection">Wybrano: ${this.currentObject} + ${this.currentAction}</span>
          </div>
        </div>
        <div class="content-body">
          ${this.getContentForCombination(this.currentObject, this.currentAction)}
        </div>
      </div>
    `;

    // Update main content
    const mainContent = contentContainer.querySelector('.main-content .content-body');
    if (mainContent) {
      mainContent.innerHTML = contentHtml;
    }

    console.log(`📊 Generated content for: ${this.currentObject} + ${this.currentAction} (${totalCombinations} total combinations)`);
  }

  private getContentForCombination(object: string, action: string): string {
    // Generate specific content based on object + action combination
    const combinations: Record<string, Record<string, string>> = {
      'requests': {
        'search': '<div class="data-grid">🔍 Wyszukiwanie zgłoszeń...</div>',
        'add-new': '<div class="form-container">➕ Formularz nowego zgłoszenia</div>',
        'export': '<div class="export-options">📊 Opcje eksportu zgłoszeń</div>',
        'import': '<div class="import-wizard">⬇️ Kreator importu zgłoszeń</div>',
        'sync': '<div class="sync-status">🔄 Synchronizacja zgłoszeń</div>'
      },
      'services': {
        'search': '<div class="data-grid">🔍 Wyszukiwanie serwisów...</div>',
        'add-new': '<div class="form-container">➕ Formularz nowego serwisu</div>',
        'export': '<div class="export-options">📊 Opcje eksportu serwisów</div>',
        'import': '<div class="import-wizard">⬇️ Kreator importu serwisów</div>',
        'sync': '<div class="sync-status">🔄 Synchronizacja serwisów</div>'
      },
      'transport': {
        'search': '<div class="data-grid">🔍 Wyszukiwanie transportu...</div>',
        'add-new': '<div class="form-container">➕ Formularz nowego transportu</div>',
        'export': '<div class="export-options">📊 Opcje eksportu transportu</div>',
        'import': '<div class="import-wizard">⬇️ Kreator importu transportu</div>',
        'sync': '<div class="sync-status">🔄 Synchronizacja transportu</div>'
      },
      'dispositions': {
        'search': '<div class="data-grid">🔍 Wyszukiwanie dyspozycji...</div>',
        'add-new': '<div class="form-container">➕ Formularz nowej dyspozycji</div>',
        'export': '<div class="export-options">📊 Opcje eksportu dyspozycji</div>',
        'import': '<div class="import-wizard">⬇️ Kreator importu dyspozycji</div>',
        'sync': '<div class="sync-status">🔄 Synchronizacja dyspozycji</div>'
      }
    };

    return combinations[object]?.[action] || 
           `<div class="default-content">📄 Treść dla: ${object} + ${action}</div>`;
  }

  private showNotification(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info'): void {
    // Use console logging instead of right panel notifications
    console.log(`${type.toUpperCase()}: ${message}`);
  }
}
