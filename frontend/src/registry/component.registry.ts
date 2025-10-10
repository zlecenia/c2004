// frontend/src/registry/component.registry.ts
import { z } from 'zod';

const ComponentSchema = z.object({
  path: z.string().startsWith('/'),
  version: z.string().regex(/^\d+\.\d+\.\d+$/),
  type: z.enum(['vue', 'react', 'vanilla']),
  status: z.enum(['production', 'beta', 'deprecated']),
  exports: z.array(z.string()),
  dependencies: z.array(z.string()).default([]),
});

export type Component = z.infer<typeof ComponentSchema>;

export const COMPONENT_REGISTRY = {
  'universal-connectid': {
    path: '/static/common/js/universal-connectid.js',
    version: '2.0.0',
    type: 'vanilla',
    status: 'production',
    exports: ['UniversalConnectID'],
    dependencies: []
  },
  'app-shell': {
    path: '/static/common/components/app-shell/0.1.0/AppShell.vue',
    version: '0.1.0',
    type: 'vue',
    status: 'production',
    exports: ['AppShell'],
    dependencies: ['vue']
  },
  'connect-id': {
    path: '/src/modules/connect-id/connect-id.module.ts',
    version: '2.1.0',
    type: 'vanilla',
    status: 'production',
    exports: ['ConnectIdModule', 'ConnectIdView', 'ConnectIdService'],
    dependencies: ['universal-connectid']
  },
  'connect-test': {
    path: '/src/modules/connect-test/connect-test.module.ts',
    version: '1.0.0',
    type: 'vanilla',
    status: 'production',
    exports: ['ConnectTestModule', 'ConnectTestView', 'ConnectTestService'],
    dependencies: []
  },
  'connect-data': {
    path: '/src/modules/connect-data/connect-filter.module.ts',
    version: '1.0.0',
    type: 'vanilla',
    status: 'production',
    exports: ['ConnectFilterModule', 'ConnectDataView', 'ConnectFilterService'],
    dependencies: []
  },
  'connect-workshop': {
    path: '/src/modules/connect-workshop/connect-workshop.module.ts',
    version: '1.0.0',
    type: 'vanilla',
    status: 'production',
    exports: ['ConnectWorkshopModule', 'ConnectWorkshopView', 'ConnectWorkshopService'],
    dependencies: []
  },
  'connect-config': {
    path: '/src/modules/connect-config/connect-config.module.ts',
    version: '1.0.0',
    type: 'vanilla',
    status: 'production',
    exports: ['ConnectConfigModule', 'ConnectConfigView', 'ConnectConfigService'],
    dependencies: []
  },
  'identification': {
    path: '/src/modules/identification/identification.module.ts',
    version: '1.0.0',
    type: 'vanilla',
    status: 'beta',
    exports: ['IdentificationModule'],
    dependencies: []
  },
  'connect-manager': {
    path: '/src/modules/connect-manager/connect-manager.view.ts',
    version: '1.0.0',
    type: 'vanilla',
    status: 'production',
    exports: ['ConnectManagerView', 'ConnectManagerService'],
    dependencies: []
  },
  'connect-reports': {
    path: '/src/modules/connect-reports/connect-reports.view.ts',
    version: '1.0.0',
    type: 'vanilla',
    status: 'production',
    exports: ['ConnectReportsView', 'ConnectReportsService'],
    dependencies: []
  }
} as const satisfies Record<string, Component>;

// Validate registry on import;
for (const [name, component] of Object.entries(COMPONENT_REGISTRY)) {
  try {
    ComponentSchema.parse(component);
  } catch (error) {
    throw new Error(`Invalid component "${name}": ${error}`);
  }
}

export function getComponent(name: keyof typeof COMPONENT_REGISTRY): Component {
  return COMPONENT_REGISTRY[name];
}
