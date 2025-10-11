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
  
  async initialize(): Promise<void> {
    console.log('🔧 Initializing ConnectManager module...');
    // Minimal initialization - view handles its own setup
  }
  
  async destroy(): Promise<void> {
    console.log('🔧 Destroying ConnectManager module...');
  }
  
  async healthCheck(): Promise<boolean> {
    return true;
  }
}
