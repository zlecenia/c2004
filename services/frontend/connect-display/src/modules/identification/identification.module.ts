// frontend/src/modules/identification/identification.module.ts
import { Module, ModuleMetadata } from '../module.interface';
import { serviceManifest } from '../../config/service.manifest';
import { IdentificationService } from './identification.service';

export class IdentificationModule implements Module {
  readonly metadata: ModuleMetadata = {
    name: 'identification',
    version: '1.0.0',
    dependencies: ['universal-connectid'],
    routes: [
      { path: '/', component: 'IdentificationView' }
    ]
  };
  
  private service: IdentificationService | null = null;
  
  async initialize(): Promise<void> {
    console.log(`🔧 Initializing ${this.metadata.name} module...`);
    
    // Validate configuration
    const config = serviceManifest.getComponentConfig('universal-connectid');
    if (!config.enabled) {
      throw new Error('universal-connectid component is disabled');
    }
    
    // Initialize service
    this.service = new IdentificationService(config.configuration);
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
  
  getService(): IdentificationService {
    if (!this.service) {
      throw new Error('Module not initialized');
    }
    return this.service;
  }
}
