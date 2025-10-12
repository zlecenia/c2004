// frontend/src/modules/connect-data/connect-filter.view.ts - Refactored with PageManager
import { ConnectFilterModule } from './connect-filter.module';
import { ConnectDataPageManager } from './pages';
import { createModuleMenu } from '../../components/connect-menu';

export class ConnectDataView {
  private currentSection: string = 'dispositions';
  private currentMethod: string = 'search';
  private pageManager: ConnectDataPageManager;

  constructor(_module: ConnectFilterModule) {
    this.pageManager = new ConnectDataPageManager();
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
          <!-- Content will be loaded by PageManager -->
        </div>
      </div>
    `;
    
    // Initialize page manager
    const contentContainer = container.querySelector('#connect-data-content') as HTMLElement;
    if (contentContainer) {
      this.pageManager.initialize(contentContainer);
    }
    
    // Create module menu using MenuManager
    const menuContainer = container.querySelector('#connect-data-menu-container') as HTMLElement;
    if (menuContainer) {
      createModuleMenu('connect-data', menuContainer, {
        onItemClick: (data) => {
          const { item, column } = data;
          console.log(`📊 ConnectData Menu: Click on ${item.id} in column ${column.id}`);
          
          if (item.section) {
            this.currentSection = item.section;
            console.log(`📊 ConnectData: Section changed to ${this.currentSection}`);
            this.updateSectionTitle();
          }
          
          if (item.action) {
            this.currentMethod = item.action;
            console.log(`📊 ConnectData: Method changed to ${this.currentMethod}`);
            this.updateSectionTitle();
          }
          
          // Load the page for current selection
          this.loadCurrentPage();
        }
      });
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
    console.log(`📊 ConnectData: Loading page ${this.currentSection}-${this.currentMethod}`);
    this.pageManager.loadPage(this.currentSection, this.currentMethod);
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
      
      #connect-data-menu-container {
        width: 280px;
        background: #f8f9fa;
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
