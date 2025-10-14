// frontend/src/modules/connect-manager/pages/index.ts
import { ScenariosPage } from './scenarios.page';
import { ActivitiesPage } from './activities.page';
import { TestTypesPage } from './test-types.page';

// Page registry for connect-manager module
export const ConnectManagerPages = {
  'scenarios': ScenariosPage,
  'activities': ActivitiesPage,
  'test-types': TestTypesPage
};

// Page manager for connect-manager
export class ConnectManagerPageManager {
  private currentPage: string = 'scenarios';
  private container: HTMLElement | null = null;

  constructor() {
  }

  initialize(container: HTMLElement): void {
    this.container = container;
  }

  loadPage(section: string): void {
    
    if (!this.container) {
      console.error('⚙️ ConnectManagerPageManager: No container set');
      return;
    }

    const PageClass = ConnectManagerPages[section as keyof typeof ConnectManagerPages];
    if (!PageClass) {
      console.warn(`⚙️ ConnectManagerPageManager: Page ${section} not found, using default`);
      this.loadDefaultPage();
      return;
    }

    try {
      const pageContent = PageClass.getContent();
      const pageStyles = PageClass.getStyles();

      this.container.innerHTML = pageContent;
      this.injectPageStyles(pageStyles, section);
      this.currentPage = section;

      // Setup event listeners for pages that support it
      if ('setupEventListeners' in PageClass && typeof PageClass.setupEventListeners === 'function') {
        PageClass.setupEventListeners();
      }

    } catch (error) {
      console.error(`❌ ConnectManagerPageManager: Error loading page ${section}:`, error);
      this.loadErrorPage(section);
    }
  }

  private loadDefaultPage(): void {
    this.loadPage('scenarios');
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
    const existingStyle = document.getElementById(`connect-manager-page-styles-${this.currentPage}`);
    if (existingStyle) {
      existingStyle.remove();
    }

    const styleElement = document.createElement('style');
    styleElement.id = `connect-manager-page-styles-${section}`;
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
  }

  getCurrentPage(): string {
    return this.currentPage;
  }

  getAvailablePages(): string[] {
    return Object.keys(ConnectManagerPages);
  }

  pageExists(section: string): boolean {
    return section in ConnectManagerPages;
  }
}

// Export page classes
export {
  ScenariosPage,
  ActivitiesPage,
  TestTypesPage
};
