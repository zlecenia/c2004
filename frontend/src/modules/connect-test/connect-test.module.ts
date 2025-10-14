import { Module, ModuleMetadata } from '../module.interface';
import { ConnectTestService } from './connect-test.service';

export class ConnectTestModule implements Module {
  metadata: ModuleMetadata = {
    name: 'connect-test',
    version: '1.0.0',
    dependencies: []
  };

  private service: ConnectTestService;
  private element: HTMLElement | null = null;

  constructor() {
    this.service = new ConnectTestService();
  }

  getName(): string {
    return 'connect-test';
  }

  getDisplayName(): string {
    return '🧪 ConnectTest (New)';
  }

  getService(): ConnectTestService {
    return this.service;
  }

  async initialize(): Promise<void> {
    await this.service.initialize();
  }

  render(container: HTMLElement): void {
    // Dynamic import to avoid bundling issues
    import('./connect-test.view').then(async ({ ConnectTestView }) => {
      const view = new ConnectTestView(this);
      const element = view.render();
      
      container.innerHTML = '';
      container.appendChild(element);
      
      this.element = element;
    }).catch(error => {
      console.error('Failed to load ConnectTest view:', error);
      container.innerHTML = `<div class="error">Failed to load ConnectTest view: ${error}</div>`;
    });
  }

  async destroy(): Promise<void> {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
    this.service.destroy();
  }
}
