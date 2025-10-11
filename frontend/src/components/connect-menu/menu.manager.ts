// frontend/src/components/connect-menu/menu.manager.ts

import { ConnectMenuComponent } from './connect-menu.component';
import { MenuConfiguration, MenuCallbacks, RouteMenuMapping } from './menu.interfaces';
import { menuRegistry, routeMenuMappings } from './menu.config';

export class MenuManager {
  private static instance: MenuManager | null = null;
  private activeMenus: Map<string, ConnectMenuComponent> = new Map();
  private routeMappings: RouteMenuMapping[] = routeMenuMappings;

  private constructor() {
    this.setupGlobalEventListeners();
  }

  /**
   * Singleton pattern
   */
  public static getInstance(): MenuManager {
    if (!MenuManager.instance) {
      MenuManager.instance = new MenuManager();
    }
    return MenuManager.instance;
  }

  /**
   * Create and render menu
   */
  public createMenu(
    menuId: string, 
    container: HTMLElement, 
    callbacks: MenuCallbacks = {}
  ): ConnectMenuComponent | null {
    // Find menu configuration
    const config = this.getMenuConfig(menuId);
    if (!config) {
      console.error(`Menu configuration not found for: ${menuId}`);
      return null;
    }

    // Create menu component
    const menuComponent = new ConnectMenuComponent(config, {
      ...callbacks,
      onItemClick: (data) => {
        // Call custom callback first
        if (callbacks.onItemClick) {
          callbacks.onItemClick(data);
        }
        // Handle global menu actions
        this.handleGlobalMenuAction(data);
      }
    });

    // Render menu
    menuComponent.render(container);

    // Store reference
    this.activeMenus.set(menuId, menuComponent);

    return menuComponent;
  }

  /**
   * Get menu configuration by ID
   */
  private getMenuConfig(menuId: string): MenuConfiguration | null {
    // Check main navigation
    if (menuId === 'main-navigation') {
      return menuRegistry.mainNavigation;
    }

    // Check module menus
    const moduleMenu = Object.values(menuRegistry.moduleColumns).find(
      config => config.id === menuId
    );
    if (moduleMenu) {
      return moduleMenu;
    }

    // Check action menus
    const actionMenu = Object.values(menuRegistry.actionMenus).find(
      config => config.id === menuId
    );
    if (actionMenu) {
      return actionMenu;
    }

    return null;
  }

  /**
   * Create menu for specific module
   */
  public createModuleMenu(
    moduleName: string,
    container: HTMLElement,
    callbacks: MenuCallbacks = {}
  ): ConnectMenuComponent | null {
    const config = menuRegistry.moduleColumns[moduleName];
    if (!config) {
      console.warn(`No menu configuration found for module: ${moduleName}`);
      return null;
    }

    return this.createMenu(config.id, container, callbacks);
  }

  /**
   * Update menu based on current route
   */
  public updateMenuForRoute(currentRoute: string): void {
    const mapping = this.routeMappings.find(map => 
      currentRoute.startsWith(map.route)
    );

    if (!mapping) return;

    const menu = this.activeMenus.get(mapping.menuId);
    if (!menu || !mapping.activeItems) return;

    // Update active items
    mapping.activeItems.forEach(itemId => {
      menu.updateActiveItem(itemId);
    });
  }

  /**
   * Handle global menu actions with 3-level navigation
   */
  private handleGlobalMenuAction(data: any): void {
    const { action, item, column } = data;

    // Update routing based on menu selection
    this.updateRoutingForMenuSelection(item, column);

    switch (action) {
      case 'navigate':
        if (item.module) {
          this.navigateToModule(item.module, item.route);
        }
        break;
      
      case 'section-change':
        // Handle 3-level navigation: update dependent columns and content
        this.handle3LevelNavigation(item, column, 'section');
        
        // Emit global section change event
        window.dispatchEvent(new CustomEvent('sectionChange', {
          detail: { 
            section: item.section, 
            module: item.module,
            column: column.id,
            combinations: this.calculateCombinations(column.id)
          }
        }));
        break;
      
      case 'method-change':
        // Handle method changes in 3-level navigation
        this.handle3LevelNavigation(item, column, 'method');
        
        // Emit global method change event  
        window.dispatchEvent(new CustomEvent('methodChange', {
          detail: { 
            method: item.id, 
            module: item.module,
            column: column.id,
            combinations: this.calculateCombinations(column.id)
          }
        }));
        break;

      default:
        // Handle generic actions with combinatorial content
        this.handle3LevelNavigation(item, column, 'action');
        
        // Emit generic menu action event
        window.dispatchEvent(new CustomEvent('menuAction', {
          detail: { 
            action, 
            item, 
            column: column.id,
            timestamp: Date.now(),
            combinations: this.calculateCombinations(column.id)
          }
        }));
        break;
    }
  }

  /**
   * Handle 3-level navigation logic
   */
  private handle3LevelNavigation(item: any, column: any, actionType: string): void {
    const menuId = this.findMenuIdByColumn(column.id);
    if (!menuId) return;

    const menu = this.activeMenus.get(menuId);
    if (!menu) return;

    // Get current menu configuration
    const config = menu.getConfig();
    
    // Calculate current selection state across all columns
    const currentSelection = this.getCurrentSelection(config);
    
    // Update the selection with new item
    currentSelection[column.id] = item.id;
    
    // Update content based on combinations
    this.updateCombinatorialContent(menuId, currentSelection);
    
    // Update dependent columns visibility/state
    this.updateDependentColumns(config, currentSelection);
    
    console.log(`🔧 3-Level Navigation: ${actionType} in ${column.id} -> ${item.id}`, currentSelection);
  }

  /**
   * Calculate combinations for current menu state
   */
  private calculateCombinations(columnId: string): number {
    const menuId = this.findMenuIdByColumn(columnId);
    if (!menuId) return 0;

    const menu = this.activeMenus.get(menuId);
    if (!menu) return 0;

    const config = menu.getConfig();
    let combinations = 1;

    // Calculate total combinations across all columns
    config.columns.forEach(column => {
      if (column.items && column.items.length > 0) {
        combinations *= column.items.length;
      }
    });

    return combinations;
  }

  /**
   * Get current selection state across all columns
   */
  private getCurrentSelection(config: any): Record<string, string> {
    const selection: Record<string, string> = {};
    
    config.columns.forEach((column: any) => {
      const activeItem = column.items.find((item: any) => item.active);
      if (activeItem) {
        selection[column.id] = activeItem.id;
      }
    });

    return selection;
  }

  /**
   * Update combinatorial content based on current selection
   */
  private updateCombinatorialContent(menuId: string, selection: Record<string, string>): void {
    // Emit event for content update
    window.dispatchEvent(new CustomEvent('menuContentUpdate', {
      detail: {
        menuId,
        selection,
        combinations: Object.keys(selection).length,
        timestamp: Date.now()
      }
    }));
  }

  /**
   * Update dependent columns based on selection
   */
  private updateDependentColumns(config: any, selection: Record<string, string>): void {
    // Logic for showing/hiding columns based on selection
    // For example, show column 3 only when column 1 and 2 are selected
    
    if (config.columns.length >= 3) {
      const hasColumn1Selection = config.columns[0] && selection[config.columns[0].id];
      const hasColumn2Selection = config.columns[1] && selection[config.columns[1].id];
      
      // Show/hide third column based on first two selections
      if (config.columns[2]) {
        const shouldShowColumn3 = hasColumn1Selection && hasColumn2Selection;
        config.columns[2].visible = shouldShowColumn3;
        
        // Update DOM
        const menu = this.activeMenus.get(config.id);
        if (menu) {
          menu.toggleColumn(config.columns[2].id, shouldShowColumn3);
        }
      }
    }
  }

  /**
   * Update routing based on menu selection
   */
  private updateRoutingForMenuSelection(item: any, column: any): void {
    const currentPath = window.location.pathname;
    const menuId = this.findMenuIdByColumn(column.id);
    
    if (menuId && item.section) {
      // Update URL to reflect current selection using clean path routing
      const pathSegments = currentPath.split('/').filter(Boolean);
      const basePath = `/${pathSegments[0] || ''}`; // Keep base module path
      const newPath = `${basePath}/${item.section}`;
      window.history.replaceState({}, '', newPath);
    }
  }

  /**
   * Find menu ID by column ID
   */
  private findMenuIdByColumn(columnId: string): string | null {
    for (const [menuId, menu] of this.activeMenus) {
      const config = menu.getConfig();
      const hasColumn = config.columns.some((col: any) => col.id === columnId);
      if (hasColumn) {
        return menuId;
      }
    }
    return null;
  }

  /**
   * Navigate to module
   */
  private navigateToModule(moduleName: string, route?: string): void {
    const targetRoute = route || `/${moduleName}`;
    
    // Update browser URL
    window.history.pushState({}, '', targetRoute);
    
    // Emit navigation event for main app
    window.dispatchEvent(new CustomEvent('moduleNavigation', {
      detail: { module: moduleName, route: targetRoute }
    }));

    // Update main navigation menu
    const mainMenu = this.activeMenus.get('main-navigation');
    if (mainMenu) {
      mainMenu.updateActiveItem(moduleName);
    }

    // Update route-based menus
    this.updateMenuForRoute(targetRoute);
  }

  /**
   * Get active menu component
   */
  public getMenu(menuId: string): ConnectMenuComponent | null {
    return this.activeMenus.get(menuId) || null;
  }

  /**
   * Destroy menu
   */
  public destroyMenu(menuId: string): void {
    const menu = this.activeMenus.get(menuId);
    if (menu) {
      menu.destroy();
      this.activeMenus.delete(menuId);
    }
  }

  /**
   * Destroy all menus
   */
  public destroyAllMenus(): void {
    this.activeMenus.forEach(menu => menu.destroy());
    this.activeMenus.clear();
  }

  /**
   * Setup global event listeners
   */
  private setupGlobalEventListeners(): void {
    // Listen for popstate (browser back/forward)
    window.addEventListener('popstate', () => {
      this.updateMenuForRoute(window.location.pathname);
    });

    // Listen for custom route changes
    window.addEventListener('routeChanged', (event: any) => {
      this.updateMenuForRoute(event.detail.route);
    });
  }

  /**
   * Register custom menu configuration
   */
  public registerMenu(menuId: string, config: MenuConfiguration): void {
    // Add to appropriate registry
    if (config.type === 'sidebar') {
      menuRegistry.mainNavigation = config;
    } else {
      menuRegistry.actionMenus[menuId] = config;
    }
  }

  /**
   * Register route mapping
   */
  public registerRouteMapping(mapping: RouteMenuMapping): void {
    this.routeMappings.push(mapping);
  }
}
