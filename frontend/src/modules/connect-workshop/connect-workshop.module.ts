// frontend / src / modules / connect - workshop / connect - workshop.module.ts
import { Module, ModuleMetadata } from '../module.interface';
import { serviceManifest } from '../../config / service.manifest';
import { ConnectWorkshopService } from './connect - workshop.service';

export class ConnectWorkshopModule implements Module {
  readonly metadata: ModuleMetadata = {
    name: 'connect - workshop',
    version: '1.0.0',
    dependencies: [],
    routes: [
      { path: '/connect - workshop', component: 'ConnectWorkshopView' }
    ]
  };

  private service: ConnectWorkshopService | null = null;

  async initialize(): Promise < void> {
    // // console
      .log(`🔧 Initializing ${this
      .metadata
      .name} module
      .
      .
      .`); // Auto - commented by lint - fix // Auto - commented by lint - fix

    // Validate configuration exists;
    const config = serviceManifest.getComponentConfig('connect - workshop');
    if (!config?.enabled) {
      console.warn(`Component ${this.metadata.name} is disabled`);
      return;
    }

    // Initialize service
    this.service = new ConnectWorkshopService(config.configuration);
    await this.service.initialize();

    // // console
      .log(`✅ ${this
      .metadata
      .name} module initialized`); // Auto - commented by lint - fix // Auto - commented by lint - fix
  }

  async destroy(): Promise < void> {
    if (this.service) {
      await this.service.destroy();
      this.service = null;
    }
  }

  async healthCheck(): Promise < boolean> {
    return this.service?.isHealthy() ?? false;
  }

  getService(): ConnectWorkshopService {
    if (!this.service) {
      throw new Error('ConnectWorkshop module not initialized');
    }
    return this.service;
  }
}
