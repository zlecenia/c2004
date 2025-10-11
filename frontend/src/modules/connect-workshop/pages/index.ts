// frontend/src/modules/connect-workshop/pages/index.ts
import { RequestsSearchPage } from './requests-search.page';
import { RequestsNewRequestPage } from './requests-new-request.page';
import { ServicesSearchPage } from './services-search.page';
import { TransportSearchPage } from './transport-search.page';
import { DispositionsSearchPage } from './dispositions-search.page';

// Page registry for connect-workshop module  
export const ConnectWorkshopPages = {
  // Requests pages
  'requests-search': RequestsSearchPage,
  'requests-new-request': RequestsNewRequestPage,
  'requests-export': RequestsSearchPage, // Reuse search page for now
  'requests-import': RequestsSearchPage,
  'requests-sync': RequestsSearchPage,
  
  // Services pages
  'services-search': ServicesSearchPage,
  'services-new-request': ServicesSearchPage,
  'services-export': ServicesSearchPage,
  'services-import': ServicesSearchPage,
  'services-sync': ServicesSearchPage,
  
  // Transport pages
  'transport-search': TransportSearchPage,
  'transport-new-request': TransportSearchPage,
  'transport-export': TransportSearchPage,
  'transport-import': TransportSearchPage,
  'transport-sync': TransportSearchPage,
  
  // Dispositions pages
  'dispositions-search': DispositionsSearchPage,
  'dispositions-new-request': DispositionsSearchPage,
  'dispositions-export': DispositionsSearchPage,
  'dispositions-import': DispositionsSearchPage,
  'dispositions-sync': DispositionsSearchPage
};

// Page manager for connect-workshop
export class ConnectWorkshopPageManager {
  private currentPage: string = 'requests-search';
  private container: HTMLElement | null = null;

  constructor() {
    console.log('🔧 ConnectWorkshopPageManager initialized');
  }

  /**
   * Initialize page manager with container
   */
  initialize(container: HTMLElement): void {
    this.container = container;
    console.log('🔧 ConnectWorkshopPageManager container set');
  }

  /**
   * Load page based on section and method
   */
  loadPage(section: string, method: string): void {
    const pageKey = `${section}-${method}`;
    console.log(`🔧 ConnectWorkshopPageManager: Loading page ${pageKey}`);
    
    if (!this.container) {
      console.error('🔧 ConnectWorkshopPageManager: No container set');
      return;
    }

    const PageClass = ConnectWorkshopPages[pageKey as keyof typeof ConnectWorkshopPages];
    if (!PageClass) {
      console.warn(`🔧 ConnectWorkshopPageManager: Page ${pageKey} not found, using default`);
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

      console.log(`✅ ConnectWorkshopPageManager: Page ${pageKey} loaded successfully`);
    } catch (error) {
      console.error(`❌ ConnectWorkshopPageManager: Error loading page ${pageKey}:`, error);
      this.loadErrorPage(pageKey);
    }
  }

  /**
   * Load default page (requests-search)
   */
  private loadDefaultPage(): void {
    this.loadPage('requests', 'search');
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
    const existingStyle = document.getElementById(`connect-workshop-page-styles-${this.currentPage}`);
    if (existingStyle) {
      existingStyle.remove();
    }

    // Add new page styles
    const styleElement = document.createElement('style');
    styleElement.id = `connect-workshop-page-styles-${pageKey}`;
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
    return Object.keys(ConnectWorkshopPages);
  }

  /**
   * Check if page exists
   */
  pageExists(section: string, method: string): boolean {
    const pageKey = `${section}-${method}`;
    return pageKey in ConnectWorkshopPages;
  }
}

// Export page classes
export {
  RequestsSearchPage,
  RequestsNewRequestPage,
  ServicesSearchPage,
  TransportSearchPage,
  DispositionsSearchPage
};
