// frontend/src/modules/connect-reports/connect-reports.module.ts
import { Module, ModuleMetadata } from '../module.interface';

export class ConnectReportsModule implements Module {
  metadata: ModuleMetadata = {
    name: 'connect-reports',
    version: '1.0.0',
    dependencies: []
  };

  private element: HTMLElement | null = null;

  getName(): string {
    return 'connect-reports';
  }

  getDisplayName(): string {
    return '📊 ConnectReports';
  }

  getService(): any {
    return null; // No service needed for this module
  }

  async initialize(): Promise<void> {
    console.log('🔧 Initializing ConnectReports module...');
    console.log('✅ ConnectReports module initialized');
  }

  render(container: HTMLElement): void {
    // Dynamic import to avoid bundling issues
    import('./connect-reports.view').then(async ({ ConnectReportsView }) => {
      const view = new ConnectReportsView(this);
      const element = view.render();
      
      container.innerHTML = '';
      container.appendChild(element);
      
      this.element = element;
    }).catch(error => {
      console.error('Failed to load ConnectReports view:', error);
      container.innerHTML = `<div class="error">Failed to load ConnectReports view: ${error}</div>`;
    });
  }

  async destroy(): Promise<void> {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}
