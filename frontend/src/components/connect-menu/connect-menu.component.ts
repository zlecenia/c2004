// frontend/src/components/connect-menu/connect-menu.component.ts

import { MenuConfiguration, MenuItem, MenuColumn, MenuCallbacks, MenuEventData } from './menu.interfaces';
import { ConnectMenuTemplates } from './menu.templates';
import { ConnectMenuStyles } from './menu.styles';

export class ConnectMenuComponent {
  private container: HTMLElement | null = null;
  private config: MenuConfiguration;
  private callbacks: MenuCallbacks;
  private isInitialized: boolean = false;

  constructor(config: MenuConfiguration, callbacks: MenuCallbacks = {}) {
    this.config = config;
    this.callbacks = callbacks;
  }

  /**
   * Render menu to container
   */
  render(containerElement: HTMLElement): void {
    this.container = containerElement;
    
    // Add styles if not already added
    this.addStyles();
    
    // Generate and insert HTML
    containerElement.innerHTML = ConnectMenuTemplates.generateMenuContainer(this.config);
    
    // Setup event listeners
    this.setupEventListeners();
    
    // Mark as initialized
    this.isInitialized = true;
    
    // Call ready callback
    if (this.callbacks.onMenuReady) {
      this.callbacks.onMenuReady(this.config.id);
    }
  }

  /**
   * Add menu styles to document
   */
  private addStyles(): void {
    const styleId = 'connect-menu-styles';
    if (document.getElementById(styleId)) {
      return;
    }

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = ConnectMenuStyles.getStyles();
    document.head.appendChild(style);
  }

  /**
   * Setup event listeners for menu items
   */
  private setupEventListeners(): void {
    if (!this.container) return;

    // Use event delegation for better performance
    this.container.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const button = target.closest('[data-menu-item]') as HTMLElement;
      
      if (!button) return;

      event.preventDefault();
      event.stopPropagation();

      // Get menu item data
      const itemId = button.getAttribute('data-menu-item');
      const item = this.findMenuItem(itemId || '');
      const column = this.findColumnForItem(itemId || '');
      
      if (!item || !column) return;

      // Handle item click
      this.handleItemClick(item, column, event);
    });
  }

  /**
   * Handle menu item click
   */
  private handleItemClick(item: MenuItem, column: MenuColumn, event: Event): void {
    // Skip if disabled
    if (item.disabled) return;

    // Update active states
    this.updateActiveItem(item.id, column.id);

    // Prepare event data
    const eventData: MenuEventData = {
      action: item.action || 'click',
      item,
      column,
      event
    };

    // Call item click callback
    if (this.callbacks.onItemClick) {
      this.callbacks.onItemClick(eventData);
    }

    // Handle built-in actions
    this.handleBuiltInActions(eventData);
  }

  /**
   * Handle built-in menu actions
   */
  private handleBuiltInActions(eventData: MenuEventData): void {
    const { action, item } = eventData;

    switch (action) {
      case 'navigate':
        if (item.route) {
          // Update URL without page reload
          window.history.pushState({}, '', item.route);
          // Dispatch custom navigation event
          window.dispatchEvent(new CustomEvent('menuNavigation', { 
            detail: { route: item.route, module: item.module } 
          }));
        }
        break;
      
      case 'section-change':
        if (this.callbacks.onColumnChange) {
          this.callbacks.onColumnChange(eventData.column.id);
        }
        break;

      default:
        // Custom actions handled by callbacks
        break;
    }
  }

  /**
   * Update active item state
   */
  public updateActiveItem(itemId: string, columnId?: string): void {
    if (!this.container) return;

    // Find the column to update
    const targetColumn = columnId ? 
      this.config.columns.find(col => col.id === columnId) :
      this.findColumnForItem(itemId);

    if (!targetColumn) return;

    // Update config
    targetColumn.items.forEach(item => {
      item.active = item.id === itemId;
    });

    // Update DOM
    const columnElement = this.container.querySelector(`#${targetColumn.id}-column`);
    if (columnElement) {
      const buttons = columnElement.querySelectorAll('[data-menu-item]');
      buttons.forEach(button => {
        const buttonItemId = button.getAttribute('data-menu-item');
        button.classList.toggle('active', buttonItemId === itemId);
      });
    }
  }

  /**
   * Show/hide menu column
   */
  public toggleColumn(columnId: string, visible: boolean): void {
    if (!this.container) return;

    const column = this.config.columns.find(col => col.id === columnId);
    if (!column) return;

    // Update config
    column.visible = visible;

    // Update DOM
    const columnElement = this.container.querySelector(`#${columnId}-column`);
    if (columnElement) {
      (columnElement as HTMLElement).style.display = visible ? 'flex' : 'none';
    }
  }

  /**
   * Update menu item
   */
  public updateMenuItem(itemId: string, updates: Partial<MenuItem>): void {
    const item = this.findMenuItem(itemId);
    if (!item) return;

    // Update config
    Object.assign(item, updates);

    // Re-render if needed
    if (this.isInitialized && this.container) {
      this.render(this.container);
    }
  }

  /**
   * Find menu item by ID
   */
  private findMenuItem(itemId: string): MenuItem | null {
    for (const column of this.config.columns) {
      const item = column.items.find(item => item.id === itemId);
      if (item) return item;
    }
    return null;
  }

  /**
   * Find column containing specific item
   */
  private findColumnForItem(itemId: string): MenuColumn | null {
    for (const column of this.config.columns) {
      const hasItem = column.items.some(item => item.id === itemId);
      if (hasItem) return column;
    }
    return null;
  }

  /**
   * Get current menu configuration
   */
  public getConfig(): MenuConfiguration {
    return { ...this.config };
  }

  /**
   * Destroy menu and cleanup
   */
  public destroy(): void {
    if (this.container) {
      this.container.innerHTML = '';
      this.container = null;
    }
    this.isInitialized = false;
  }
}
