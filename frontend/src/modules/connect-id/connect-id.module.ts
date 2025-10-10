// frontend/src/modules/connect-id/connect-id.module.ts
import { Module, ModuleMetadata } from '../module.interface';
import { serviceManifest } from '../../config/service.manifest';
import { ConnectIdService } from './connect-id.service';

export class ConnectIdModule implements Module {
  readonly metadata: ModuleMetadata = {
    name: 'connect-id',
    version: '2.1.0',
    dependencies: ['universal-connectid'],
    routes: [
      { path: '/connect-id', component: 'ConnectIdView' }
    ]
  };
  
  private service: ConnectIdService | null = null;
  
  async initialize(): Promise<void> {
    console.log(`🔧 Initializing ${this.metadata.name} module...`);
    
    // Validate configuration exists
    const config = serviceManifest.getComponentConfig('connect-id');
    if (!config?.enabled) {
      console.warn(`Component ${this.metadata.name} is disabled`);
      return;
    }
    
    // Initialize service
    this.service = new ConnectIdService(config.configuration);
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
  
  getService(): ConnectIdService {
    if (!this.service) {
      throw new Error('ConnectId module not initialized');
    }
    return this.service;
  }
}
