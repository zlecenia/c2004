// frontend/src/modules/connect-filter/connect-filter.module.ts
import { Module, ModuleMetadata } from '../module.interface';
import { serviceManifest } from '../../config/service.manifest';
import { ConnectFilterService } from './connect-filter.service';

export class ConnectFilterModule implements Module {
  readonly metadata: ModuleMetadata = {
    name: 'connect-filter',
    version: '1.0.0',
    dependencies: [],
    routes: [
      { path: '/connect-filter', component: 'ConnectFilterView' }
    ]
  };
  
  private service: ConnectFilterService | null = null;
  
  async initialize(): Promise<void> {
    console.log(`🔧 Initializing ${this.metadata.name} module...`);
    
    // Validate configuration exists
    const config = serviceManifest.getComponentConfig('connect-filter');
    if (!config?.enabled) {
      console.warn(`Component ${this.metadata.name} is disabled`);
      return;
    }
    
    // Initialize service
    this.service = new ConnectFilterService(config.configuration);
    await this.service.initialize();
    
    console.log(`✅ ${this.metadata.name} module initialized`);
  }
  
  async destroy(): Promise<void> {
    if (this.service) {
      await this.service.destroy();
      this.service = null;
    }
  }
  
  async healthCheck(): Promise<boolean> {
    return this.service?.isHealthy() ?? false;
  }
  
  getService(): ConnectFilterService {
    if (!this.service) {
      throw new Error('ConnectFilter module not initialized');
    }
    return this.service;
  }
}
