// frontend/src/modules/connect-test/pages/index.ts
import { IdentificationRfidPage } from './identification-rfid.page';
import { IdentificationQrPage } from './identification-qr.page';
import { IdentificationBarcodePage } from './identification-barcode.page';
import { IdentificationSearchPage } from './identification-search.page';
import { TestingRfidPage } from './testing-rfid.page';
import { TestingQrPage } from './testing-qr.page';
import { TestingBarcodePage } from './testing-barcode.page';
import { TestingSearchPage } from './testing-search.page';

// Page registry for connect-test module (identification/testing combined)
export const ConnectTestPages = {
  'rfid': IdentificationRfidPage,
  'qr': IdentificationQrPage,
  'barcode': IdentificationBarcodePage,
  'search': IdentificationSearchPage
};

// Page manager for connect-test
export class ConnectTestPageManager {
  private currentPage: string = 'rfid';
  private container: HTMLElement | null = null;

  constructor() {
    console.log('🧪 ConnectTestPageManager initialized');
  }

  initialize(container: HTMLElement): void {
    this.container = container;
    console.log('🧪 ConnectTestPageManager container set');
  }

  loadPage(method: string): void {
    console.log(`🧪 ConnectTest: Loading page for method ${method}`);
    
    if (!this.container) {
      console.error('🧪 ConnectTestPageManager: No container set');
      return;
    }

    const PageClass = ConnectTestPages[method as keyof typeof ConnectTestPages];
    if (!PageClass) {
      console.warn(`🧪 ConnectTestPageManager: Page ${method} not found, using default`);
      this.loadDefaultPage();
      return;
    }

    try {
      const pageContent = PageClass.getContent();
      const pageStyles = PageClass.getStyles();

      this.container.innerHTML = pageContent;
      this.injectPageStyles(pageStyles, method);
      this.currentPage = method;

      console.log(`✅ ConnectTestPageManager: Page ${method} loaded successfully`);
    } catch (error) {
      console.error(`❌ ConnectTestPageManager: Error loading page ${method}:`, error);
      this.loadErrorPage(method);
    }
  }

  private loadDefaultPage(): void {
    this.loadPage('rfid');
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
    const existingStyle = document.getElementById(`connect-test-page-styles-${this.currentPage}`);
    if (existingStyle) {
      existingStyle.remove();
    }

    const styleElement = document.createElement('style');
    styleElement.id = `connect-test-page-styles-${pageKey}`;
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
  }

  getCurrentPage(): string {
    return this.currentPage;
  }

  getAvailablePages(): string[] {
    return Object.keys(ConnectTestPages);
  }

  pageExists(method: string): boolean {
    return method in ConnectTestPages;
  }
}

// Export page classes
export {
  IdentificationRfidPage,
  IdentificationQrPage,
  IdentificationBarcodePage,
  IdentificationSearchPage,
  TestingRfidPage,
  TestingQrPage,
  TestingBarcodePage,
  TestingSearchPage
};
