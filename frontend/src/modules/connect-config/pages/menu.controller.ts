// frontend/src/modules/connect-config/pages/menu.controller.ts

import { ConnectConfigMenuStructure } from './menu.structure';

// Import individual page components
// Devices pages
import { RfidConfigPage } from './devices/rfid-config';
import { QrConfigPage } from './devices/qr-config';
import { BarcodeConfigPage } from './devices/barcode-config';
import { SensorsPage } from './devices/sensors';
import { IoPortsPage } from './devices/io-ports';
import { PowerPage } from './devices/power';
import { StoragePage } from './devices/storage';
import { CalibrationPage } from './devices/calibration';

// Security pages
import { SecuritySettingsPage } from './security/security';
import { UsersPage } from './security/users';
import { PermissionsPage } from './security/permissions';
import { BackupPage } from './security/backup';

// System pages
import { SystemPage } from './system/system';
import { NetworkPage } from './system/network';

export class ConnectConfigMenuController {
  private readonly menuStructure: ConnectConfigMenuStructure;
  private currentLevel1Active: string = 'connect-config';
  private currentLevel2Active: string = 'system-category';
  private currentLevel3Active: string = 'system';

  // Page instances registry
  private readonly pageInstances: Map<string, any> = new Map();
  
  constructor(private readonly container: HTMLElement) {
    this.menuStructure = new ConnectConfigMenuStructure();
    this.initializePageInstances();
    this.initialize();
  }

  private initializePageInstances(): void {
    // Initialize devices page instances
    this.pageInstances.set('RfidConfigPage', new RfidConfigPage());
    this.pageInstances.set('QrConfigPage', new QrConfigPage());
    this.pageInstances.set('BarcodeConfigPage', new BarcodeConfigPage());
    this.pageInstances.set('SensorsPage', new SensorsPage());
    this.pageInstances.set('IoPortsPage', new IoPortsPage());
    this.pageInstances.set('PowerPage', new PowerPage());
    this.pageInstances.set('StoragePage', new StoragePage());
    this.pageInstances.set('CalibrationPage', new CalibrationPage());
    
    // Initialize security page instances
    this.pageInstances.set('SecuritySettingsPage', new SecuritySettingsPage());
    this.pageInstances.set('UsersPage', new UsersPage());
    this.pageInstances.set('PermissionsPage', new PermissionsPage());
    this.pageInstances.set('BackupPage', new BackupPage());
    
    // Initialize system page instances
    this.pageInstances.set('SystemPage', new SystemPage());
    this.pageInstances.set('NetworkPage', new NetworkPage());
    
    console.log('📄 Page instances initialized:', this.pageInstances.size);
  }

  private initialize(): void {
    this.setupRouting();
    this.render();
    this.setupEventListeners();
  }

  private setupRouting(): void {
    // Handle browser back/forward navigation
    window.addEventListener('popstate', () => {
      this.handleRouteChange();
    });

    // Handle initial route
    this.handleRouteChange();
  }

  private handleRouteChange(): void {
    const currentPath = window.location.pathname;
    const item = this.menuStructure.findItemByRoute(currentPath);
    
    if (item) {
      console.log('🔄 Route changed to:', currentPath, 'Item:', item.name);
      this.navigateToItem(item.id);
    } else {
      console.log('🔄 Route not found, using default:', currentPath);
    }
  }

  private updateURL(route: string): void {
    if (window.location.pathname !== route) {
      window.history.pushState({ route }, '', route);
      console.log('🌐 URL updated to:', route);
      
      // Dispatch custom event for testing purposes
      window.dispatchEvent(new CustomEvent('routeUpdated', { 
        detail: { route, timestamp: Date.now() } 
      }));
    }
  }

  private navigateToItem(itemId: string): void {
    const item = this.menuStructure.findItemById(itemId);
    if (!item) return;

    // Update active states based on the item hierarchy
    if (item.level === 3) {
      this.currentLevel3Active = item.id;
      this.currentLevel2Active = item.parentId || this.currentLevel2Active;
      
      const parent2 = this.menuStructure.findItemById(this.currentLevel2Active);
      if (parent2?.parentId) {
        this.currentLevel1Active = parent2.parentId;
      }
    } else if (item.level === 2) {
      this.currentLevel2Active = item.id;
      this.currentLevel1Active = item.parentId || this.currentLevel1Active;
      
      // Set first child as active level 3
      const firstChild = item.children?.[0];
      if (firstChild) {
        this.currentLevel3Active = firstChild.id;
      }
    }

    // Update menu structure
    this.menuStructure.setActiveItem(this.currentLevel3Active);
    
    // Update route if item has one
    if (item.route) {
      this.updateURL(item.route);
    }
    
    // Re-render
    this.render();
  }

  public render(): string {
    const menuHtml = `
      <div class="connect-config-menu-wrapper">
        <!-- Level 1 Menu -->
        <div class="menu-container level-1-container">
          <h3 class="menu-title">Connect Configuration</h3>
          ${this.menuStructure.renderLevel1Menu()}
        </div>

        <!-- Level 2 Menu -->
        <div class="menu-container level-2-container">
          ${this.renderLevel2MenuForCurrentLevel1()}
        </div>

        <!-- Level 3 Menu -->
        <div class="menu-container level-3-container">
          ${this.renderLevel3MenuForCurrentLevel2()}
        </div>

        <!-- Content Area -->
        <div class="content-area">
          <div class="content-header">
            ${this.renderBreadcrumb()}
          </div>
          <div class="content-body">
            ${this.renderCurrentContent()}
          </div>
        </div>
      </div>
    `;

    if (this.container) {
      this.container.innerHTML = menuHtml;
    }

    return menuHtml;
  }

  private renderLevel2MenuForCurrentLevel1(): string {
    return this.menuStructure.renderLevel2Menu(this.currentLevel1Active);
  }

  private renderLevel3MenuForCurrentLevel2(): string {
    return this.menuStructure.renderLevel3Menu(this.currentLevel2Active);
  }

  private renderBreadcrumb(): string {
    const level1Item = this.menuStructure.findItemById(this.currentLevel1Active);
    const level2Item = this.menuStructure.findItemById(this.currentLevel2Active);
    const level3Item = this.menuStructure.findItemById(this.currentLevel3Active);

    const breadcrumbItems = [
      level1Item ? `<span class="breadcrumb-item">${level1Item.name}</span>` : '',
      level2Item ? `<span class="breadcrumb-separator">></span><span class="breadcrumb-item">${level2Item.name}</span>` : '',
      level3Item ? `<span class="breadcrumb-separator">></span><span class="breadcrumb-item active">${level3Item.name}</span>` : ''
    ].filter(item => item !== '');

    return `
      <div class="breadcrumb">
        ${breadcrumbItems.join('')}
      </div>
    `;
  }

  private renderCurrentContent(): string {
    // Get current level 3 item to determine which page to render
    const currentItem = this.menuStructure.findItemById(this.currentLevel3Active);
    
    if (currentItem?.pageClass) {
      const pageInstance = this.pageInstances.get(currentItem.pageClass);
      if (pageInstance) {
        console.log('📄 Rendering page:', currentItem.pageClass, 'for item:', currentItem.name);
        return `
          <div class="page-wrapper">
            <div class="page-header">
              <h3>🔧 ${currentItem.name}</h3>
              <p class="page-path">Connect Config > ${this.getCurrentCategoryName()} > ${currentItem.name}</p>
            </div>
            <div class="page-content">
              ${pageInstance.render()}
            </div>
          </div>
        `;
      }
    }
    
    // Fallback - show message if no page found
    return `
      <div class="page-wrapper">
        <div class="page-header">
          <h3>⚠️ Page Not Found</h3>
          <p class="page-path">Connect Config > ${this.getCurrentCategoryName()}</p>
        </div>
        <div class="page-content">
          <div class="error-message">
            <p>The requested page could not be found.</p>
            <p>Current item: ${this.currentLevel3Active}</p>
            <p>Page class: ${currentItem?.pageClass || 'Not specified'}</p>
          </div>
        </div>
      </div>
    `;
  }

  private getCurrentCategoryName(): string {
    const categoryItem = this.menuStructure.findItemById(this.currentLevel2Active);
    return categoryItem?.name || 'Unknown Category';
  }

  private setupEventListeners(): void {
    if (!this.container) return;

    // Level 1 menu clicks
    const level1Items = this.container.querySelectorAll('.menu-item.level-1');
    level1Items.forEach(item => {
      item.addEventListener('click', (e) => {
        const menuId = (e.currentTarget as HTMLElement).dataset.menuId;
        if (menuId) {
          this.handleLevel1Click(menuId);
        }
      });
    });

    // Level 2 menu clicks
    const level2Items = this.container.querySelectorAll('.menu-item.level-2');
    level2Items.forEach(item => {
      item.addEventListener('click', (e) => {
        const menuId = (e.currentTarget as HTMLElement).dataset.menuId;
        if (menuId) {
          this.handleLevel2Click(menuId);
        }
      });
    });

    // Level 3 menu clicks
    const level3Items = this.container.querySelectorAll('.menu-item.level-3');
    level3Items.forEach(item => {
      item.addEventListener('click', (e) => {
        const menuId = (e.currentTarget as HTMLElement).dataset.menuId;
        if (menuId) {
          this.handleLevel3Click(menuId);
        }
      });
    });

    // Note: Individual page event listeners are setup in setupCurrentPageEventListeners()
  }

  private handleLevel1Click(menuId: string): void {
    console.log('🖱️ Level 1 clicked:', menuId);
    this.navigateToItem(menuId);
  }

  private handleLevel2Click(menuId: string): void {
    console.log('🖱️ Level 2 clicked:', menuId);
    this.navigateToItem(menuId);
  }

  private handleLevel3Click(menuId: string): void {
    console.log('🖱️ Level 3 clicked:', menuId);
    this.navigateToItem(menuId);
    
    // Setup event listeners for the current page
    this.setupCurrentPageEventListeners();
  }

  private setupCurrentPageEventListeners(): void {
    const currentItem = this.menuStructure.findItemById(this.currentLevel3Active);
    if (currentItem?.pageClass) {
      const pageInstance = this.pageInstances.get(currentItem.pageClass);
      if (pageInstance && pageInstance.setupEventListeners) {
        setTimeout(() => {
          pageInstance.setupEventListeners(this.container);
          console.log('🔧 Event listeners setup for page:', currentItem.pageClass);
        }, 100); // Small delay to ensure DOM is ready
      }
    }
  }

  private showContentSection(sectionId: string): void {
    // Hide all content sections
    const contentSections = this.container.querySelectorAll('.section-content');
    contentSections.forEach(section => {
      (section as HTMLElement).style.display = 'none';
    });

    // Show the selected content section
    const targetSection = this.container.querySelector(`#${sectionId}-content`);
    if (targetSection) {
      (targetSection as HTMLElement).style.display = 'block';
    }
  }

  private updateActiveStates(): void {
    // Update level 3 menu items
    const level3Items = this.container.querySelectorAll('.menu-item.level-3');
    level3Items.forEach(item => {
      const menuId = (item as HTMLElement).dataset.menuId;
      if (menuId === this.currentLevel3Active) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Update section items in category components
    const sectionItems = this.container.querySelectorAll('.section-item');
    sectionItems.forEach(item => {
      const sectionId = (item as HTMLElement).dataset.section;
      if (sectionId === this.currentLevel3Active) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  public getStyles(): string {
    const baseStyles = `
      /* Connect Config Menu Controller Styles */
      .connect-config-menu-wrapper {
        display: grid;
        grid-template-columns: 200px 180px 160px 1fr;
        grid-template-rows: auto 1fr;
        height: 100vh;
        gap: 1px;
        background: #e2e8f0;
      }

      .menu-container {
        background: white;
        border-right: 1px solid #e2e8f0;
        overflow-y: auto;
      }

      .level-1-container {
        grid-row: 1 / -1;
        background: #f8fafc;
      }

      .level-2-container {
        grid-row: 1 / -1;
        background: #ffffff;
      }

      .level-3-container {
        grid-row: 1 / -1;
        background: #f9fafb;
      }

      .content-area {
        grid-row: 1 / -1;
        background: white;
        display: flex;
        flex-direction: column;
      }

      .menu-title {
        padding: 15px;
        margin: 0;
        font-size: 14px;
        font-weight: 600;
        color: #374151;
        border-bottom: 1px solid #e5e7eb;
        background: #f3f4f6;
      }

      .content-header {
        padding: 15px 20px;
        border-bottom: 1px solid #e5e7eb;
        background: #f9fafb;
      }

      .content-body {
        flex: 1;
        padding: 20px;
        overflow-y: auto;
      }

      .breadcrumb {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
      }

      .breadcrumb-item {
        color: #6b7280;
      }

      .breadcrumb-item.active {
        color: #1f2937;
        font-weight: 600;
      }

      .breadcrumb-separator {
        color: #9ca3af;
      }

      .category-menu {
        margin-bottom: 20px;
      }

      .category-content {
        flex: 1;
      }

      /* Responsive design */
      @media (max-width: 1024px) {
        .connect-config-menu-wrapper {
          grid-template-columns: 150px 140px 120px 1fr;
        }
      }

      @media (max-width: 768px) {
        .connect-config-menu-wrapper {
          grid-template-columns: 1fr;
          grid-template-rows: auto auto auto 1fr;
        }

        .menu-container {
          border-right: none;
          border-bottom: 1px solid #e2e8f0;
        }

        .level-1-container,
        .level-2-container,
        .level-3-container {
          grid-row: auto;
        }
      }
    `;

    // Combine with menu structure styles and page-specific styles
    let allPageStyles = '';
    this.pageInstances.forEach((pageInstance) => {
      if (pageInstance.getStyles) {
        allPageStyles += pageInstance.getStyles() + '\n';
      }
    });

    return baseStyles + '\n' + 
           this.menuStructure.getMenuStyles() + '\n' + 
           allPageStyles;
  }

  // Public methods for external control
  public setActiveMenuItem(level1Id: string, level2Id?: string, level3Id?: string): void {
    this.currentLevel1Active = level1Id;
    
    if (level2Id) {
      this.currentLevel2Active = level2Id;
    }
    
    if (level3Id) {
      this.currentLevel3Active = level3Id;
    }

    this.menuStructure.setActiveItem(this.currentLevel3Active);
    this.render();
  }

  public getCurrentActiveItem(): { level1: string, level2: string, level3: string } {
    return {
      level1: this.currentLevel1Active,
      level2: this.currentLevel2Active,
      level3: this.currentLevel3Active
    };
  }
}
