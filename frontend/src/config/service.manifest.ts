// frontend/src/config/service.manifest.ts
import { z } from 'zod';
import { getComponent } from '../registry/component.registry';
import { env } from './env.config';

const ServiceManifestSchema = z.object({
  name: z.string(),
  version: z.string(),
  ports: z.object({
    frontend: z.number(),
    backend: z.number()
  }),
  components: z.record(z.string(), z.object({
    version: z.string(),
    enabled: z.boolean().default(true),
    configuration: z.record(z.unknown()).optional()
  })),
  modules: z.array(z.string())
});

export type ServiceManifest = z.infer<typeof ServiceManifestSchema>;

/**
 * Identification Service Manifest
 * Executable configuration - validates on import
 */
export class IdentificationServiceManifest {
  readonly name = 'identification';
  readonly version = '1.0.0';
  
  readonly ports = {
    frontend: 8100,
    backend: 8101
  };
  
  readonly components = {
    'universal-connectid': {
      version: '2.0.0',
      enabled: true,
      configuration: {
        enableRFID: env.VITE_ENABLE_RFID,
        enableQR: env.VITE_ENABLE_QR,
        enableBarcode: env.VITE_ENABLE_BARCODE,
        enableManual: env.VITE_ENABLE_MANUAL,
        debug: env.NODE_ENV === 'development'
      }
    },
    'app-shell': {
      version: '0.1.0',
      enabled: true
    },
    'connect-id': {
      version: '2.1.0',
      enabled: true,
      configuration: {
        enableRFID: env.VITE_ENABLE_RFID,
        enableQR: env.VITE_ENABLE_QR,
        enableBarcode: env.VITE_ENABLE_BARCODE,
        enableManual: env.VITE_ENABLE_MANUAL,
        continuousMode: false,
        historyPersistence: true,
        keyboardShortcuts: true
      }
    },
    'connect-test': {
      version: '1.0.0',
      enabled: true,
      configuration: {
        enableRFID: env.VITE_ENABLE_RFID,
        enableQR: env.VITE_ENABLE_QR,
        enableBarcode: env.VITE_ENABLE_BARCODE,
        enableSearch: true,
        autoLoadDevices: true
      }
    },
    'connect-data': {
      version: '1.0.0',
      enabled: true,
      configuration: {
        itemsPerPage: 20,
        enableAdvancedFilters: true,
        enableExport: true,
        dynamicTables: true
      }
    },
    'connect-workshop': {
      version: '1.0.0',
      enabled: true,
      configuration: {
        autoSync: true,
        syncInterval: 30000,
        enableNotifications: true
      }
    },
    'connect-config': {
      version: '1.0.0',
      enabled: true,
      configuration: {
        enableSystemConfig: true,
        enableNetworkConfig: true,
        enableBackup: true,
        validateConfiguration: true
      }
    }
  };
  
  readonly modules = ['identification', 'connect-id', 'connect-test', 'connect-data', 'connect-workshop', 'connect-config'];
  
  /**
   * Validate manifest structure and component availability
   */
  validate(): void {
    // Validate schema
    ServiceManifestSchema.parse(this.toJSON());
    
    // Validate components exist in registry
    for (const [name, config] of Object.entries(this.components)) {
      if (!config.enabled) continue;
      
      try {
        const component = getComponent(name as any);
        
        if (component.version !== config.version) {
          console.warn(
            `⚠️  Version mismatch for "${name}":\n` +
            `   Manifest expects: ${config.version}\n` +
            `   Registry has: ${component.version}`
          );
        }
      } catch (error) {
        throw new Error(
          `Component "${name}" used in manifest but not found in registry`
        );
      }
    }
  }
  
  /**
   * Get component configuration
   */
  getComponentConfig<T extends keyof typeof this.components>(name: T) {
    return this.components[name];
  }
  
  /**
   * Check if feature is enabled
   */
  isFeatureEnabled(feature: string): boolean {
    const config = this.components['universal-connectid']?.configuration;
    if (!config) return false;
    
    const key = `enable${feature}` as keyof typeof config;
    return config[key] === true;
  }
  
  toJSON(): ServiceManifest {
    return {
      name: this.name,
      version: this.version,
      ports: this.ports,
      components: this.components,
      modules: this.modules
    };
  }
}

// Create and validate instance
export const serviceManifest = new IdentificationServiceManifest();

try {
  serviceManifest.validate();
  console.log(`✅ Service manifest validated: ${serviceManifest.name} v${serviceManifest.version}`);
} catch (error) {
  console.error('❌ Service manifest validation failed:', error);
  throw error;
}
