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
    path: '/static/common/components/connect-id/2.1.0/ConnectId.js',
    version: '2.1.0',
    type: 'vanilla',
    status: 'production',
    exports: ['ConnectIdModule'],
    dependencies: ['universal-connectid']
  },
  'connect-filter': {
    path: '/static/common/components/connect-filter/1.0.0/ConnectFilter.js',
    version: '1.0.0',
    type: 'vanilla',
    status: 'production',
    exports: ['ConnectFilterModule'],
    dependencies: []
  },
  'connect-workshop': {
    path: '/static/common/components/connect-workshop/1.0.0/ConnectWorkshop.js',
    version: '1.0.0',
    type: 'vanilla',
    status: 'production',
    exports: ['ConnectWorkshopModule'],
    dependencies: []
  }
} as const satisfies Record<string, Component>;

// Validate registry on import
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
