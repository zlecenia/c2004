// frontend/src/modules/connect-reports/connect-reports.view.ts - Refactored version
import { ConnectReportsModule } from './connect-reports.module';
import { ConnectReportsTemplates } from './connect-reports.templates';
import { ConnectReportsStyles } from './connect-reports.styles';
import { WeekViewComponent } from './week-view.component';
import { MonthViewComponent } from './month-view.component';

export class ConnectReportsView {
  private currentReportType: string = 'executed';
  private currentView: string = 'week';
  private currentMonth: Date = new Date();
  private weekViewComponent: WeekViewComponent;
  private monthViewComponent: MonthViewComponent;

  constructor(private module: ConnectReportsModule) {
    // module stored for future implementations
    this.weekViewComponent = new WeekViewComponent();
    this.monthViewComponent = new MonthViewComponent();
  }

  render(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'connect-reports-layout';
    
    // Update top-bar submenu
    const submenu = document.getElementById('top-bar-submenu');
    if (submenu) submenu.textContent = '📊 Reports Module';
    
    // Update top-bar section title
    const sectionTitle = document.getElementById('top-bar-section-title');
    if (sectionTitle) sectionTitle.textContent = 'ConnectReports - Wykonane';
    
    // Use template system
    container.innerHTML = ConnectReportsTemplates.getMainLayoutTemplate();
    
    // Template moved to connect-reports.templates.ts with emoji icons
    
    this.addStyles();
    this.setupEventListeners(container);
    return container;
  }

  private addStyles(): void {
    // Check if styles already added
    if (document.getElementById('connect-reports-styles')) {
      return;
    }

    const style = document.createElement('style');
    style.id = 'connect-reports-styles';
    style.textContent = ConnectReportsStyles.getStyles();
    document.head.appendChild(style);
  }

  private setupEventListeners(container: HTMLElement): void {
    // Report type buttons
    const reportTypeButtons = container.querySelectorAll('.report-type-item');
    reportTypeButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const reportType = target.getAttribute('data-type');
        this.handleReportTypeChange(reportType || 'executed');
      });
    });

    // View buttons
    const viewButtons = container.querySelectorAll('.view-item');
    viewButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const view = target.getAttribute('data-view');
        this.handleViewChange(view || 'week');
      });
    });
  }

  private handleReportTypeChange(reportType: string): void {
    this.currentReportType = reportType;
    this.updateActiveStates();
    this.updateContent();
  }

  private handleViewChange(view: string): void {
    this.currentView = view;
    this.updateActiveStates();
    this.updateContent();
  }

  private updateActiveStates(): void {
    // Update report type buttons
    const reportTypeButtons = document.querySelectorAll('.report-type-item');
    reportTypeButtons.forEach(button => {
      button.classList.toggle('active', button.getAttribute('data-type') === this.currentReportType);
    });

    // Update view buttons
    const viewButtons = document.querySelectorAll('.view-item');
    viewButtons.forEach(button => {
      button.classList.toggle('active', button.getAttribute('data-view') === this.currentView);
    });
  }

  private updateContent(): void {
    // Content updated based on current report type and view
    console.log(`ConnectReports: ${this.currentReportType} - ${this.currentView}`);
  }
}
