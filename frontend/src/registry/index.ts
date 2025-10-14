// frontend/src/registry/index.ts
// Central registry exports

export * from './component.registry';
export * from './module.registry';
export * from './route.registry';

// Registry validation and utilities
export function validateAllRegistries(): boolean {
  try {
    // Import all registries to trigger validation
    require('./component.registry');
    require('./module.registry'); 
    require('./route.registry');
    
    return true;
  } catch (error) {
    console.error('❌ Registry validation failed:', error);
    return false;
  }
}

// Registry health check
export function registryHealthCheck(): Record<string, boolean> {
  const health: Record<string, boolean> = {};
  
  try {
    const { COMPONENT_REGISTRY } = require('./component.registry');
    health.components = Object.keys(COMPONENT_REGISTRY).length > 0;
  } catch {
    health.components = false;
  }
  
  try {
    const { MODULE_REGISTRY } = require('./module.registry');
    health.modules = Object.keys(MODULE_REGISTRY).length > 0;
  } catch {
    health.modules = false;
  }
  
  try {
    const { ROUTE_REGISTRY } = require('./route.registry');
    health.routes = Object.keys(ROUTE_REGISTRY).length > 0;
  } catch {
    health.routes = false;
  }
  
  return health;
}
