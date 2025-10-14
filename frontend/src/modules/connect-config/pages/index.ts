// frontend/src/modules/connect-config/pages/index.ts
import { SystemPage } from './system.page';
import { DevicesPage } from './devices.page';
import { SecurityPage } from './security.page';
import { NetworkWrapperPage } from './system/network-wrapper.page';
import { PerformancePage } from './system/performance.page';
import { UpdatesPage } from './system/updates.page';

// New 3-level menu structure
export { ConnectConfigMenuStructure } from './menu.structure';
export type { MenuItem } from './menu.structure';
export { ConnectConfigMenuController } from './menu.controller';

// Category components
export * from './devices';
export * from './security';
export * from './system';

// Page registry for connect-config module
export const ConnectConfigPages = {
  'system': SystemPage,
  'devices': DevicesPage,
  'security': SecurityPage,
  'network': NetworkWrapperPage,
  'performance': PerformancePage,
  'updates': UpdatesPage
};

// Page manager for connect-config
export class ConnectConfigPageManager {
  private currentPage: string = 'system';
  private container: HTMLElement | null = null;

  constructor() {
    console.log('⚙️ ConnectConfigPageManager initialized');
  }

  initialize(container: HTMLElement): void {
    this.container = container;
    console.log('⚙️ ConnectConfigPageManager container set');
  }

  loadPage(section: string): void {
    console.log(`⚙️ ConnectConfig: Loading page ${section}`);
    
    if (!this.container) {
      console.error('⚙️ ConnectConfigPageManager: No container set');
      return;
    }

    const PageClass = ConnectConfigPages[section as keyof typeof ConnectConfigPages];
    if (!PageClass) {
      console.warn(`⚙️ ConnectConfigPageManager: Page ${section} not found, using default`);
      this.loadDefaultPage();
      return;
    }

    try {
      const pageContent = PageClass.getContent();
      const pageStyles = PageClass.getStyles();

      this.container.innerHTML = pageContent;
      this.injectPageStyles(pageStyles, section);
      this.currentPage = section;

      console.log(`✅ ConnectConfigPageManager: Page ${section} loaded successfully`);
    } catch (error) {
      console.error(`❌ ConnectConfigPageManager: Error loading page ${section}:`, error);
      this.loadErrorPage(section);
    }
  }

  private loadDefaultPage(): void {
    this.loadPage('system');
  }

  private loadErrorPage(section: string): void {
    if (!this.container) return;
    
    this.container.innerHTML = `
      <div class="page-content">
        <div class="page-header">
          <h2>❌ Błąd ładowania strony</h2>
          <p>Nie można załadować strony: ${section}</p>
        </div>
      </div>
    `;
  }

  private injectPageStyles(styles: string, section: string): void {
    // Remove old styles
    const existingStyle = document.getElementById(`connect-config-page-styles-${this.currentPage}`);
    if (existingStyle) {
      existingStyle.remove();
    }

    // Add new styles
    const styleElement = document.createElement('style');
    styleElement.id = `connect-config-page-styles-${section}`;
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
  }

  getCurrentPage(): string {
    return this.currentPage;
  }

  getAvailablePages(): string[] {
    return Object.keys(ConnectConfigPages);
  }

  pageExists(section: string): boolean {
    return section in ConnectConfigPages;
  }
}

// Enhanced page manager with 3-level menu support
export class ConnectConfigMenuPageManager extends ConnectConfigPageManager {
  private menuController: ConnectConfigMenuController | null = null;

  constructor() {
    super();
    console.log('⚙️ ConnectConfigMenuPageManager initialized with 3-level menu support');
  }

  initialize(container: HTMLElement): void {
    super.initialize(container);
    this.menuController = new ConnectConfigMenuController(container);
    console.log('⚙️ ConnectConfigMenuPageManager: 3-level menu controller initialized');
  }

  getMenuController(): ConnectConfigMenuController | null {
    return this.menuController;
  }

  setActiveMenuItem(level1Id: string, level2Id?: string, level3Id?: string): void {
    if (this.menuController) {
      this.menuController.setActiveMenuItem(level1Id, level2Id, level3Id);
    }
  }

  getCurrentActiveItem() {
    return this.menuController?.getCurrentActiveItem() || { level1: '', level2: '', level3: '' };
  }
}

// Import the menu controller for convenience
import { ConnectConfigMenuController } from './menu.controller';
