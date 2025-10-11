// frontend/src/modules/connect-manager/connect-manager.module.ts
import { Module, ModuleMetadata } from '../module.interface';

export class ConnectManagerModule implements Module {
  readonly metadata: ModuleMetadata = {
    name: 'connect-manager',
    version: '1.0.0',
    dependencies: [],
    routes: [
      { path: '/connect-manager', component: 'ConnectManagerView' }
    ]
  };

  private element: HTMLElement | null = null;
  
  getName(): string {
    return 'connect-manager';
  }

  getDisplayName(): string {
    return '🎯 Manager';
  }

  getService(): any {
    return null; // No service needed for this module
  }
  
  async initialize(): Promise<void> {
    console.log('🔧 Initializing ConnectManager module...');
    console.log('✅ Module "connect-manager" initialized');
  }

  render(container: HTMLElement): void {
    // Dynamic import to avoid bundling issues
    import('./connect-manager.view').then(async ({ ConnectManagerView }) => {
      const view = new ConnectManagerView(this);
      const element = view.render();
      
      container.innerHTML = '';
      container.appendChild(element);
      
      this.element = element;
    }).catch(error => {
      console.error('Failed to load ConnectManager view:', error);
      container.innerHTML = `<div class="error">Failed to load ConnectManager view: ${error}</div>`;
    });
  }
  
  async destroy(): Promise<void> {
    console.log('🔧 Destroying ConnectManager module...');
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
  
  async healthCheck(): Promise<boolean> {
    return true;
  }
}
