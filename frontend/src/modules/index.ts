/**
 * Main modules export file
 * This file exports all available modules for easy importing
 */

// Export template module for base styles
export * from './template';

// Export module interfaces and types
export * from './module.interface';

import { Module } from './module.interface';
import { IdentificationModule } from './identification/identification.module';
import { ConnectIdModule } from './connect-id/connect-id.module';
import { ConnectFilterModule } from './connect-data/connect-filter.module';
import { ConnectWorkshopModule } from './connect-workshop/connect-workshop.module';
import { ConnectTestModule } from './connect-test/connect-test.module';
import { ConnectConfigModule } from './connect-config/connect-config.module';
import { ConnectReportsModule } from './connect-reports/connect-reports.module';
import { ConnectManagerModule } from './connect-manager/connect-manager.module';

export const MODULE_REGISTRY = {
  identification: IdentificationModule,
  'connect-id': ConnectIdModule,
  'connect-data': ConnectFilterModule,
  'connect-workshop': ConnectWorkshopModule,
  'connect-test': ConnectTestModule,
  'connect-config': ConnectConfigModule,
  'connect-reports': ConnectReportsModule,
  'connect-manager': ConnectManagerModule
} as const;

export class ModuleManager {
  private modules = new Map<string, Module>();
  private initialized = false;
  
  /**
   * Initialize all modules
   */
  async initializeAll(): Promise<void> {
    if (this.initialized) {
      throw new Error('Modules already initialized');
    }
    
    
    for (const [name, ModuleClass] of Object.entries(MODULE_REGISTRY)) {
      try {
        const module = new ModuleClass();
        await module.initialize();
        this.modules.set(name, module);
      } catch (error) {
        console.error(`❌ Failed to initialize module "${name}":`, error);
        throw error;
      }
    }
    
    this.initialized = true;
  }
  
  /**
   * Get module instance
   */
  getModule<T extends Module>(name: keyof typeof MODULE_REGISTRY): T {
    const module = this.modules.get(name);
    if (!module) {
      throw new Error(`Module "${name}" not found`);
    }
    return module as T;
  }
  
  /**
   * Health check all modules
   */
  async healthCheck(): Promise<Record<string, boolean>> {
    const health: Record<string, boolean> = {};
    
    for (const [name, module] of this.modules) {
      if (module.healthCheck) {
        health[name] = await module.healthCheck();
      } else {
        health[name] = true; // Assume healthy if no check
      }
    }
    
    return health;
  }
}

// Singleton
export const moduleManager = new ModuleManager();
