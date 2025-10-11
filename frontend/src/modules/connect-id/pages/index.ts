// frontend/src/modules/connect-id/pages/index.ts - Page exports and manager
import { UserRfidPage } from './user-rfid.page';
import { UserManualPage } from './user-manual.page';
import { UserQrPage } from './user-qr.page';
import { UserListPage } from './user-list.page';
import { DeviceRfidPage } from './device-rfid.page';
import { DeviceQrPage } from './device-qr.page';
import { GroupRfidPage } from './group-rfid.page';
import { TestBarcodePage } from './test-barcode.page';

// Page registry for connect-id module
export const ConnectIdPages = {
  // User identification pages
  'user-rfid': UserRfidPage,
  'user-manual': UserManualPage,
  'user-qr': UserQrPage,
  'user-list': UserListPage,
  
  // Device identification pages
  'device-rfid': DeviceRfidPage,
  'device-qr': DeviceQrPage,
  
  // Group identification pages
  'group-rfid': GroupRfidPage,
  
  // Test identification pages
  'test-barcode': TestBarcodePage
};

// Page manager for connect-id
export class ConnectIdPageManager {
  private currentPage: string = 'user-rfid';
  private container: HTMLElement | null = null;

  constructor() {
    console.log('🔧 ConnectIdPageManager initialized');
  }

  /**
   * Initialize page manager with container
   */
  initialize(container: HTMLElement): void {
    this.container = container;
    console.log('🔧 ConnectIdPageManager container set');
  }

  /**
   * Load page based on section and method
   */
  loadPage(section: string, method: string): void {
    const pageKey = `${section}-${method}`;
    console.log(`🔧 ConnectIdPageManager: Loading page ${pageKey}`);
    
    if (!this.container) {
      console.error('🔧 ConnectIdPageManager: No container set');
      return;
    }

    const PageClass = ConnectIdPages[pageKey as keyof typeof ConnectIdPages];
    if (!PageClass) {
      console.warn(`🔧 ConnectIdPageManager: Page ${pageKey} not found, using default`);
      this.loadDefaultPage();
      return;
    }

    try {
      // Get page content and styles
      const pageContent = PageClass.getContent();
      const pageStyles = PageClass.getStyles();

      // Update container content
      this.container.innerHTML = pageContent;

      // Add page-specific styles
      this.injectPageStyles(pageStyles, pageKey);

      // Update current page
      this.currentPage = pageKey;

      console.log(`✅ ConnectIdPageManager: Page ${pageKey} loaded successfully`);
    } catch (error) {
      console.error(`❌ ConnectIdPageManager: Error loading page ${pageKey}:`, error);
      this.loadErrorPage(pageKey);
    }
  }

  /**
   * Load default page (user-rfid)
   */
  private loadDefaultPage(): void {
    this.loadPage('user', 'rfid');
  }

  /**
   * Load error page
   */
  private loadErrorPage(pageKey: string): void {
    if (!this.container) return;
    
    this.container.innerHTML = `
      <div class="page-content">
        <div class="page-header">
          <h2>❌ Błąd ładowania strony</h2>
          <p>Nie można załadować strony: ${pageKey}</p>
        </div>
        <div class="error-content">
          <button onclick="location.reload()" class="retry-btn">🔄 Odśwież stronę</button>
        </div>
      </div>
    `;
  }

  /**
   * Inject page-specific styles
   */
  private injectPageStyles(styles: string, pageKey: string): void {
    // Remove previous page styles
    const existingStyle = document.getElementById(`connect-id-page-styles-${this.currentPage}`);
    if (existingStyle) {
      existingStyle.remove();
    }

    // Add new page styles
    const styleElement = document.createElement('style');
    styleElement.id = `connect-id-page-styles-${pageKey}`;
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
  }

  /**
   * Get current page
   */
  getCurrentPage(): string {
    return this.currentPage;
  }

  /**
   * Get available pages
   */
  getAvailablePages(): string[] {
    return Object.keys(ConnectIdPages);
  }

  /**
   * Check if page exists
   */
  pageExists(section: string, method: string): boolean {
    const pageKey = `${section}-${method}`;
    return pageKey in ConnectIdPages;
  }
}

// Export page classes for direct import if needed
export {
  UserRfidPage,
  UserManualPage,
  UserQrPage,
  UserListPage,
  DeviceRfidPage,
  DeviceQrPage,
  GroupRfidPage,
  TestBarcodePage
};
