import { Module, ModuleMetadata } from '../module.interface';
import { ConnectConfigService } from './connect-config.service';

export class ConnectConfigModule implements Module {
  metadata: ModuleMetadata = {
    name: 'connect-config',
    version: '1.0.0',
    dependencies: []
  };

  private service: ConnectConfigService;
  private element: HTMLElement | null = null;

  constructor() {
    this.service = new ConnectConfigService();
  }

  getName(): string {
    return 'connect-config';
  }

  getDisplayName(): string {
    return '⚙️ ConnectConfig';
  }

  getService(): ConnectConfigService {
    return this.service;
  }

  async initialize(): Promise<void> {
    await this.service.initialize();
  }

  render(container: HTMLElement): void {
    // Dynamic import to avoid bundling issues
    import('./connect-config.view').then(async ({ ConnectConfigView }) => {
      const view = new ConnectConfigView(this);
      const element = view.render();
      
      container.innerHTML = '';
      container.appendChild(element);
      
      this.element = element;
    }).catch(error => {
      console.error('Failed to load ConnectConfig view:', error);
      container.innerHTML = `<div class="error">Failed to load ConnectConfig view: ${error}</div>`;
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
