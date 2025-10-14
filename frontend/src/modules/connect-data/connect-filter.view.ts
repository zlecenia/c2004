// frontend/src/modules/connect-data/connect-filter.view.ts - Refactored with PageManager
import { ConnectFilterModule } from './connect-filter.module';
import { ConnectDataPageManager } from './pages';
import { createModuleMenu, getMenuManager } from '../../components/connect-menu';

export class ConnectDataView {
  private currentSection: string = 'requests';
  private currentMethod: string = 'search';
  private pageManager: ConnectDataPageManager;
  private routerListenerAttached: boolean = false;
  private boundUpdateState?: (ev: CustomEvent) => void;

  constructor(_module: ConnectFilterModule) {
    this.pageManager = new ConnectDataPageManager();
  }

  render(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'connect-data-compact';
    
    // Update top-bar submenu
    const submenu = document.getElementById('top-bar-submenu');
    if (submenu) submenu.textContent = '📊 Data Management & Analytics';
    
    // Update top-bar section title dynamically
    this.updateSectionTitle();
    
    // Create menu container and main content container
    container.innerHTML = `
      <div class="module-with-menu">
        <div class="connect-data-menu-container"></div>
        <div class="module-main-content" id="connect-data-content">
          <!-- Content will be loaded by PageManager -->
        </div>
      </div>
    `;
    // Initialize page manager
    const contentContainer = container.querySelector('#connect-data-content') as HTMLElement;
    if (contentContainer) {
      this.pageManager.initialize(contentContainer);
    }

    // Setup router sync to react on URL-driven state updates
    this.setupRouterSync();

    // Create module menu using MenuManager
    const menuContainer = container.querySelector('.connect-data-menu-container') as HTMLElement;
    if (menuContainer) {
      createModuleMenu('connect-data', menuContainer, {
        onItemClick: (data) => {
          const { item, column } = data;

          // Column 1: objects-column -> update only section
          if (column.id === 'objects-column' && item.section) {
            this.currentSection = item.section;
            this.updateSectionTitle();
          }

          // Column 2: actions-column -> update only method/action
          if (column.id === 'actions-column' && (item.action || (item as any).method)) {
            this.currentMethod = (item as any).method || item.action!;
            this.updateSectionTitle();
          }

          // Load the page for current selection
          this.loadCurrentPage();
        }
      });

      // Sync active states in menu with current URL on initial load
      try {
        const manager = getMenuManager();
        manager.updateMenuForRoute(window.location.pathname);
      } catch (e) {
        console.warn('ConnectData: unable to sync menu with route', e);
      }
    }

    // Add custom styles
    this.addCustomStyles();
    
    // Load initial page
    this.loadCurrentPage();
    
    return container;
  }

  /**
   * Load current page based on section and method
   */
  private loadCurrentPage(): void {
    this.pageManager.loadPage(this.currentSection, this.currentMethod);
  }

  /**
   * Public API used by main.ts to set initial state from URL
   */
  public setInitialSection(section: string): void {
    if (section && section !== this.currentSection) {
      this.currentSection = section;
      this.updateSectionTitle();
      this.loadCurrentPage();
    }
  }

  public setInitialMethod(method: string): void {
    if (method && method !== this.currentMethod) {
      this.currentMethod = method;
      this.updateSectionTitle();
      this.loadCurrentPage();
    }
  }

  /**
   * Listen to global router-driven updates within the same module
   */
  private setupRouterSync(): void {
    if (this.routerListenerAttached) return;
    this.boundUpdateState = ((ev: CustomEvent) => {
      const { section, method } = (ev.detail || {}) as { section?: string, method?: string };
      let changed = false;
      if (section && section !== this.currentSection) {
        this.currentSection = section;
        changed = true;
      }
      if (method && method !== this.currentMethod) {
        this.currentMethod = method;
        changed = true;
      }
      if (changed) {
        this.updateSectionTitle();
        this.loadCurrentPage();
      }
    }) as unknown as (ev: CustomEvent) => void;
    window.addEventListener('connectdata:update-state', this.boundUpdateState as unknown as EventListener);
    this.routerListenerAttached = true;
  }

  private addCustomStyles(): void {
    // Check if styles already added
    if (document.getElementById('connect-data-compact-styles')) {
      return;
    }

    const style = document.createElement('style');
    style.id = 'connect-data-compact-styles';
    style.textContent = this.getCompactStyles();
    document.head.appendChild(style);
  }
  
  private getCompactStyles(): string {
    return `
      .connect-data-compact {
        height: 100%;
        width: 100%;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      }

      .module-with-menu {
        display: flex;
        height: 100%;
        width: 100%;
      }
      
      .connect-data-menu-container {
        background-color: #2a2a2a;
        border-right: 1px solid #e9ecef;
        overflow-y: auto;
      }
      
      .module-main-content {
        flex: 1;
        overflow-y: auto;
        background: white;
      }
    `;
  }


  private updateSectionTitle(): void {
    const sectionTitle = document.getElementById('top-bar-section-title');
    if (sectionTitle) {
      const sectionName = this.getSectionDisplayName(this.currentSection);
      const methodName = this.getMethodDisplayName(this.currentMethod);
      sectionTitle.textContent = `ConnectData - ${sectionName} - ${methodName}`;
    }
  }

  private getSectionDisplayName(section: string): string {
    const names: Record<string, string> = {
      'requests': 'Zgłoszenia',
      'services': 'Serwisy', 
      'transport': 'Transport',
      'dispositions': 'Dyspozycje'
    };
    return names[section] || 'Nieznany';
  }

  private getMethodDisplayName(method: string): string {
    const names: Record<string, string> = {
      'search': 'Szukaj',
      'add-new': 'Dodaj',
      'export': 'Export',
      'import': 'Import',
      'sync': 'Sync'
    };
    return names[method] || 'Nieznana';
  }
}
