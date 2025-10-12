// frontend/src/modules/connect-id/pages/index.ts - Page exports and manager
import { UserRfidPage } from './user-rfid.page';
import { UserManualPage } from './user-manual.page';
import { UserQrPage } from './user-qr.page';
import { UserListPage } from './user-list.page';
import { DeviceRfidPage } from './device-rfid.page';
import { DeviceQrPage } from './device-qr.page';
import { GroupRfidPage } from './group-rfid.page';
import { TestBarcodePage } from './test-barcode.page';

// Page registry for connect-id module (user identification only)
export const ConnectIdPages = {
  'rfid': UserRfidPage,
  'manual': UserManualPage,
  'qr': UserQrPage,
  'list': UserListPage,
  'barcode': UserRfidPage // Use RFID page as template for barcode
};

// Page manager for connect-id
export class ConnectIdPageManager {
  private currentPage: string = 'rfid';
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
   * Load page based on method
   */
  loadPage(method: string): void {
    console.log(`🔧 ConnectIdPageManager: Loading page for method ${method}`);
    
    if (!this.container) {
      console.error('🔧 ConnectIdPageManager: No container set');
      return;
    }

    const PageClass = ConnectIdPages[method as keyof typeof ConnectIdPages];
    if (!PageClass) {
      console.warn(`🔧 ConnectIdPageManager: Page ${method} not found, showing placeholder`);
      this.loadPlaceholderPage(method);
      return;
    }

    try {
      // Get page content and styles
      const pageContent = PageClass.getContent();
      const pageStyles = PageClass.getStyles();

      // Update container content
      this.container.innerHTML = pageContent;

      // Add page-specific styles
      this.injectPageStyles(pageStyles, method);

      // Update current page
      this.currentPage = method;

      console.log(`✅ ConnectIdPageManager: Page ${method} loaded successfully`);
    } catch (error) {
      console.error(`❌ ConnectIdPageManager: Error loading page ${method}:`, error);
      this.loadErrorPage(method);
    }
  }

  /**
   * Load default page (rfid)
   */
  private loadDefaultPage(): void {
    this.loadPage('rfid');
  }

  /**
   * Load placeholder page for non-existent pages
   */
  private loadPlaceholderPage(method: string): void {
    if (!this.container) return;
    
    const methodName = this.getDisplayName(method);
    
    this.container.innerHTML = `
      <div class="placeholder-page">
        <div class="placeholder-icon">🚧</div>
        <h2 class="placeholder-title">Strona w budowie</h2>
        <p class="placeholder-description">
          Metoda identyfikacji <strong>${methodName}</strong> 
          jest obecnie w fazie implementacji.
        </p>
        <div class="placeholder-info">
          <p>Ta funkcjonalność zostanie dodana w najbliższych aktualizacjach.</p>
          <p class="placeholder-hint">💡 Wybierz inną metodę z menu aby kontynuować.</p>
        </div>
      </div>
    `;
    
    this.injectPageStyles(this.getPlaceholderStyles(), 'placeholder');
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

  private getDisplayName(method: string): string {
    const names: Record<string, string> = {
      'rfid': 'RFID', 
      'qr': 'QR Code', 
      'barcode': 'Barcode', 
      'manual': 'Ręcznie', 
      'list': 'Z Listy'
    };
    return names[method] || method;
  }

  private getPlaceholderStyles(): string {
    return `
      .placeholder-page {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 400px;
        padding: 40px;
        text-align: center;
        background: linear-gradient(135deg, #f5f7fa 0%, #e3e9f0 100%);
        border-radius: 12px;
        margin: 20px;
      }
      .placeholder-icon {
        font-size: 80px;
        margin-bottom: 20px;
        animation: pulse 2s ease-in-out infinite;
      }
      @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.8; }
      }
      .placeholder-title {
        font-size: 28px;
        font-weight: 600;
        color: #2c3e50;
        margin: 0 0 16px 0;
      }
      .placeholder-description {
        font-size: 16px;
        color: #6c757d;
        margin: 0 0 24px 0;
        max-width: 500px;
      }
      .placeholder-description strong {
        color: #667eea;
        font-weight: 600;
      }
      .placeholder-info {
        background: white;
        padding: 24px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        max-width: 400px;
      }
      .placeholder-info p {
        margin: 0 0 12px 0;
        font-size: 14px;
        color: #495057;
        line-height: 1.6;
      }
      .placeholder-info p:last-child { margin: 0; }
      .placeholder-hint {
        padding-top: 12px;
        border-top: 1px solid #e9ecef;
        font-weight: 500;
        color: #667eea !important;
      }
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
  pageExists(method: string): boolean {
    return method in ConnectIdPages;
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
