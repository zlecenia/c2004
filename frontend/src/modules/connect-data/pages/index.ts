// frontend/src/modules/connect-data/pages/index.ts
import { DispositionsSearchPage } from './dispositions-search.page';
import { DispositionsAddNewPage } from './dispositions-add-new.page';

// Page registry for connect-data module
export const ConnectDataPages = {
  // Dispositions pages
  'dispositions-search': DispositionsSearchPage,
  'dispositions-add-new': DispositionsAddNewPage,
  'dispositions-export': DispositionsSearchPage, // Reuse for now
  'dispositions-import': DispositionsSearchPage,
  'dispositions-sync': DispositionsSearchPage,
  
  // Requests pages (reuse dispositions for now)
  'requests-search': DispositionsSearchPage,
  'requests-add-new': DispositionsAddNewPage,
  'requests-export': DispositionsSearchPage,
  'requests-import': DispositionsSearchPage,
  'requests-sync': DispositionsSearchPage,
  
  // Services pages (reuse dispositions for now)
  'services-search': DispositionsSearchPage,
  'services-add-new': DispositionsAddNewPage,
  'services-export': DispositionsSearchPage,
  'services-import': DispositionsSearchPage,
  'services-sync': DispositionsSearchPage,
  
  // Transport pages (reuse dispositions for now)
  'transport-search': DispositionsSearchPage,
  'transport-add-new': DispositionsAddNewPage,
  'transport-export': DispositionsSearchPage,
  'transport-import': DispositionsSearchPage,
  'transport-sync': DispositionsSearchPage
};

// Page manager for connect-data
export class ConnectDataPageManager {
  private currentPage: string = 'dispositions-search';
  private container: HTMLElement | null = null;

  constructor() {
    console.log('📊 ConnectDataPageManager initialized');
  }

  initialize(container: HTMLElement): void {
    this.container = container;
    console.log('📊 ConnectDataPageManager container set');
  }

  loadPage(section: string, method: string): void {
    const pageKey = `${section}-${method}`;
    console.log(`📊 ConnectData: Loading page ${pageKey}`);
    
    if (!this.container) {
      console.error('📊 ConnectDataPageManager: No container set');
      return;
    }

    const PageClass = ConnectDataPages[pageKey as keyof typeof ConnectDataPages];
    if (!PageClass) {
      console.warn(`📊 ConnectDataPageManager: Page ${pageKey} not found, using default`);
      this.loadDefaultPage();
      return;
    }

    try {
      const pageContent = PageClass.getContent();
      const pageStyles = PageClass.getStyles();

      this.container.innerHTML = pageContent;
      this.injectPageStyles(pageStyles, pageKey);
      this.currentPage = pageKey;

      console.log(`✅ ConnectDataPageManager: Page ${pageKey} loaded successfully`);
    } catch (error) {
      console.error(`❌ ConnectDataPageManager: Error loading page ${pageKey}:`, error);
      this.loadErrorPage(pageKey);
    }
  }

  private loadDefaultPage(): void {
    this.loadPage('dispositions', 'search');
  }

  private loadErrorPage(pageKey: string): void {
    if (!this.container) return;
    
    this.container.innerHTML = `
      <div class="page-content">
        <div class="page-header">
          <h2>❌ Błąd ładowania strony</h2>
          <p>Nie można załadować strony: ${pageKey}</p>
        </div>
      </div>
    `;
  }

  private injectPageStyles(styles: string, pageKey: string): void {
    const existingStyle = document.getElementById(`connect-data-page-styles-${this.currentPage}`);
    if (existingStyle) {
      existingStyle.remove();
    }

    const styleElement = document.createElement('style');
    styleElement.id = `connect-data-page-styles-${pageKey}`;
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
  }

  getCurrentPage(): string {
    return this.currentPage;
  }

  getAvailablePages(): string[] {
    return Object.keys(ConnectDataPages);
  }

  pageExists(section: string, method: string): boolean {
    const pageKey = `${section}-${method}`;
    return pageKey in ConnectDataPages;
  }
}

// Export page classes
export {
  DispositionsSearchPage,
  DispositionsAddNewPage
};
