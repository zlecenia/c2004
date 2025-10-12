// frontend/src/modules/connect-reports/pages/index.ts
import { ExecutedWeekPage } from './executed-week.page';
import { ExecutedMonthPage } from './executed-month.page';
import { ExecutedYearPage } from './executed-year.page';
import { ExecutedCustomPage } from './executed-custom.page';
import { PlannedWeekPage } from './planned-week.page';
import { PlannedMonthPage } from './planned-month.page';
import { PlannedYearPage } from './planned-year.page';
import { PlannedCustomPage } from './planned-custom.page';
import { ExportWeekPage } from './export-week.page';
import { ExportMonthPage } from './export-month.page';
import { ExportYearPage } from './export-year.page';
import { ExportCustomPage } from './export-custom.page';

// Page registry for connect-reports module
export const ConnectReportsPages = {
  // Executed reports
  'executed-week': ExecutedWeekPage,
  'executed-month': ExecutedMonthPage,
  'executed-year': ExecutedYearPage,
  'executed-custom': ExecutedCustomPage,
  
  // Planned reports
  'planned-week': PlannedWeekPage,
  'planned-month': PlannedMonthPage,
  'planned-year': PlannedYearPage,
  'planned-custom': PlannedCustomPage,
  
  // Export reports
  'export-week': ExportWeekPage,
  'export-month': ExportMonthPage,
  'export-year': ExportYearPage,
  'export-custom': ExportCustomPage
};

// Page manager for connect-reports
export class ConnectReportsPageManager {
  private currentPage: string = 'executed-week';
  private container: HTMLElement | null = null;

  constructor() {
    console.log('📊 ConnectReportsPageManager initialized');
  }

  initialize(container: HTMLElement): void {
    this.container = container;
    console.log('📊 ConnectReportsPageManager container set');
  }

  loadPage(section: string, view: string): void {
    const pageKey = `${section}-${view}`;
    console.log(`📊 ConnectReports: Loading page ${pageKey}`);
    
    if (!this.container) {
      console.error('📊 ConnectReportsPageManager: No container set');
      return;
    }

    const PageClass = ConnectReportsPages[pageKey as keyof typeof ConnectReportsPages];
    if (!PageClass) {
      console.warn(`📊 ConnectReportsPageManager: Page ${pageKey} not found, using default`);
      this.loadDefaultPage();
      return;
    }

    try {
      const pageContent = PageClass.getContent();
      const pageStyles = PageClass.getStyles();

      this.container.innerHTML = pageContent;
      this.injectPageStyles(pageStyles, pageKey);
      this.currentPage = pageKey;

      console.log(`✅ ConnectReportsPageManager: Page ${pageKey} loaded successfully`);
    } catch (error) {
      console.error(`❌ ConnectReportsPageManager: Error loading page ${pageKey}:`, error);
      this.loadErrorPage(pageKey);
    }
  }

  private loadDefaultPage(): void {
    this.loadPage('executed', 'week');
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
    const existingStyle = document.getElementById(`connect-reports-page-styles-${this.currentPage}`);
    if (existingStyle) {
      existingStyle.remove();
    }

    const styleElement = document.createElement('style');
    styleElement.id = `connect-reports-page-styles-${pageKey}`;
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
  }

  getCurrentPage(): string {
    return this.currentPage;
  }

  getAvailablePages(): string[] {
    return Object.keys(ConnectReportsPages);
  }

  pageExists(section: string, view: string): boolean {
    const pageKey = `${section}-${view}`;
    return pageKey in ConnectReportsPages;
  }
}

// Export page classes
export {
  ExecutedWeekPage,
  ExecutedMonthPage,
  ExecutedYearPage,
  ExecutedCustomPage,
  PlannedWeekPage,
  PlannedMonthPage,
  PlannedYearPage,
  PlannedCustomPage,
  ExportWeekPage,
  ExportMonthPage,
  ExportYearPage,
  ExportCustomPage
};
