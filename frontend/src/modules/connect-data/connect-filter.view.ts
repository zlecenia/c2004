// frontend/src/modules/connect-data/connect-filter.view.ts - Refactored version
import { ConnectFilterModule } from './connect-filter.module';
import { ConnectFilterTemplates } from './connect-filter.templates';
import { ConnectFilterStyles } from './connect-filter.styles';

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
    
    // Use template system
    container.innerHTML = ConnectFilterTemplates.getMainLayoutTemplate();
    
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

  private showNotification(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info'): void {
    // Use console logging instead of right panel notifications
    console.log(`${type.toUpperCase()}: ${message}`);
  }
}
