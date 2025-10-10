// frontend/src/registry/module.registry.ts
import { z } from 'zod';

const ModuleSchema = z.object({
  name: z.string(),
  displayName: z.string(),
  version: z.string().regex(/^\d+\.\d+\.\d+$/),
  status: z.enum(['production', 'beta', 'deprecated']),
  path: z.string(),
  icon: z.string().optional(),
  dependencies: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  route: z.string().optional()
});

export type ModuleDefinition = z.infer<typeof ModuleSchema>;

export const MODULE_REGISTRY = {
  'identification': {
    name: 'identification',
    displayName: 'Identification Base',
    version: '1.0.0',
    status: 'beta',
    path: '/src/modules/identification',
    dependencies: [],
    features: ['legacy-support']
  },
  'connect-id': {
    name: 'connect-id',
    displayName: 'ConnectID',
    version: '2.1.0',
    status: 'production',
    path: '/src/modules/connect-id',
    icon: '👤',
    dependencies: ['universal-connectid'],
    features: ['rfid', 'qr-code', 'barcode', 'manual-input', 'user-management'],
    route: '/connect-id'
  },
  'connect-test': {
    name: 'connect-test',
    displayName: 'ConnectTest',
    version: '1.0.0',
    status: 'production',
    path: '/src/modules/connect-test',
    icon: '🧪',
    dependencies: [],
    features: ['device-testing', 'test-protocols', 'device-search', 'test-scenarios'],
    route: '/connect-test'
  },
  'connect-data': {
    name: 'connect-data',
    displayName: 'ConnectData',
    version: '1.0.0',
    status: 'production',
    path: '/src/modules/connect-data',
    icon: '📊',
    dependencies: [],
    features: ['data-management', 'search', 'export', 'import', 'dynamic-tables'],
    route: '/connect-data'
  },
  'connect-workshop': {
    name: 'connect-workshop',
    displayName: 'ConnectWorkshop',
    version: '1.0.0',
    status: 'production',
    path: '/src/modules/connect-workshop',
    icon: '🔧',
    dependencies: [],
    features: ['workshop-management', 'sync', 'notifications'],
    route: '/connect-workshop'
  },
  'connect-config': {
    name: 'connect-config',
    displayName: 'ConnectConfig',
    version: '1.0.0',  
    status: 'production',
    path: '/src/modules/connect-config',
    icon: '⚙️',
    dependencies: [],
    features: ['system-config', 'network-config', 'backup', 'import-export'],
    route: '/connect-config'
  },
  'connect-reports': {
    name: 'connect-reports',
    displayName: 'ConnectReports',
    version: '1.0.0',
    status: 'production', 
    path: '/src/modules/connect-reports',
    icon: '📋',
    dependencies: [],
    features: ['reports', 'analytics', 'data-export', 'filters'],
    route: '/connect-reports'
  },
  'connect-manager': {
    name: 'connect-manager',
    displayName: 'ConnectManager',
    version: '1.0.0',
    status: 'production',
    path: '/src/modules/connect-manager',
    icon: '📋',
    dependencies: [],
    features: ['scenario-management', 'activity-management', 'test-assignment', 'drag-drop'],
    route: '/connect-manager'
  }
} as const satisfies Record<string, ModuleDefinition>;

// Validate registry on import
for (const [name, module] of Object.entries(MODULE_REGISTRY)) {
  try {
    ModuleSchema.parse(module);
  } catch (error) {
    throw new Error(`Invalid module "${name}": ${error}`);
  }
}

export function getModule(name: keyof typeof MODULE_REGISTRY): ModuleDefinition {
  return MODULE_REGISTRY[name];
}

export function getAllModules(): ModuleDefinition[] {
  return Object.values(MODULE_REGISTRY);
}

export function getModulesByFeature(feature: string): ModuleDefinition[] {
  return Object.values(MODULE_REGISTRY).filter((module: ModuleDefinition) => 
    module.features && module.features.includes(feature)
  );  
}

export function getModulesByStatus(status: 'production' | 'beta' | 'deprecated'): ModuleDefinition[] {
  return Object.values(MODULE_REGISTRY).filter(module => 
    module.status === status
  );
}
