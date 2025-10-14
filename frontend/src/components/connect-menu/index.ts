// frontend/src/components/connect-menu/index.ts

import type { ConnectMenuComponent } from './connect-menu.component';
// Main components
export { ConnectMenuComponent } from './connect-menu.component';
export { MenuManager } from './menu.manager';

// Templates and styles
export { ConnectMenuTemplates } from './menu.templates';
export { ConnectMenuStyles } from './menu.styles';

// Interfaces and types
export * from './menu.interfaces';

// Configurations
export * from './menu.config';

// Convenience function to create and render a menu
import { MenuManager } from './menu.manager';
import { MenuCallbacks } from './menu.interfaces';

/**
 * Quick function to create a menu
 */
export function createMenu(
  menuId: string,
  container: HTMLElement,
  callbacks?: MenuCallbacks
): ConnectMenuComponent | null {
  const manager = MenuManager.getInstance();
  return manager.createMenu(menuId, container, callbacks);
}

/**
 * Quick function to create a module-specific menu
 */
export function createModuleMenu(
  moduleName: string,
  container: HTMLElement,
  callbacks?: MenuCallbacks
): ConnectMenuComponent | null {
  const manager = MenuManager.getInstance();
  return manager.createModuleMenu(moduleName, container, callbacks);
}

/**
 * Get the global menu manager instance
 */
export function getMenuManager(): MenuManager {
  return MenuManager.getInstance();
}
