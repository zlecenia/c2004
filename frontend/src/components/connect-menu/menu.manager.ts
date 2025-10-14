// frontend/src/components/connect-menu/menu.manager.ts

import { ConnectMenuComponent } from './connect-menu.component';
import { MenuConfiguration, MenuCallbacks, RouteMenuMapping, MenuItem, MenuColumn, MenuEventData } from './menu.interfaces';
import { menuRegistry, routeMenuMappings } from './menu.config';

export class MenuManager {
  private static instance: MenuManager | null = null;
  private activeMenus: Map<string, ConnectMenuComponent> = new Map();
  private routeMappings: RouteMenuMapping[] = routeMenuMappings;
  private overridesLoaded = false;

  private constructor() {
    this.setupGlobalEventListeners();
    this.loadOverridesFromStorage();
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
    const mapping = this.routeMappings.find(map => currentRoute.startsWith(map.route));
    if (!mapping) return;

    const menu = this.activeMenus.get(mapping.menuId);
    if (!menu) return;

    // Derive selection from URL path segments beyond the base route
    const base = mapping.route.endsWith('/') ? mapping.route.slice(0, -1) : mapping.route;
    let extra = currentRoute.startsWith(base) ? currentRoute.slice(base.length) : '';
    if (extra.startsWith('/')) extra = extra.slice(1);
    const segments = extra.split('/').filter(Boolean);

    const config = menu.getConfig();
    let matched = 0;
    config.columns.forEach((column: MenuColumn, index: number) => {
      const seg = segments[index];
      if (!seg) return;
      const found = column.items.find((it: MenuItem) =>
        it.id === seg || it.section === seg || it.method === seg || it.subsection === seg || it.action === seg
      );
      if (found) {
        menu.updateActiveItem(found.id, column.id);
        matched++;
      }
    });

    // Fallback to default mapping activeItems if URL doesn't specify enough segments
    if (matched === 0 && mapping.activeItems && mapping.activeItems.length) {
      mapping.activeItems.forEach(itemId => {
        menu.updateActiveItem(itemId);
      });
    }
  }

  /**
   * Handle global menu actions with 3-level navigation
   */
  private handleGlobalMenuAction(data: MenuEventData): void {
    const { action, item, column } = data;

    // Update routing based on current selection (section/method), reflected in URL
    const menuId = this.findMenuIdByColumn(column.id);

    switch (action) {
      case 'navigate':
        if (item.module) {
          this.navigateToModule(item.module, item.route);
        }
        break;
      
      case 'section-change':
        // Handle 3-level navigation: update dependent columns and content
        this.handle3LevelNavigation(item, column, 'section');
        if (menuId) this.updateUrlForSelection(menuId);
        
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
        if (menuId) this.updateUrlForSelection(menuId);
        
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
        if (menuId) this.updateUrlForSelection(menuId);
        
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
  private handle3LevelNavigation(item: MenuItem, column: MenuColumn, actionType: string): void {
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
  private getCurrentSelection(config: MenuConfiguration): Record<string, string> {
    const selection: Record<string, string> = {};
    
    config.columns.forEach((column: MenuColumn) => {
      const activeItem = column.items.find((item: MenuItem) => item.active);
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
  private updateDependentColumns(config: MenuConfiguration, selection: Record<string, string>): void {
    // Logic for showing/hiding columns based on selection
    // For example, show column 3 only when column 1 and 2 are selected
    
    if (config.columns.length >= 3) {
      const hasColumn1Selection = !!(config.columns[0] && selection[config.columns[0].id]);
      const hasColumn2Selection = !!(config.columns[1] && selection[config.columns[1].id]);
      
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
   * Update URL using current selection across columns for a given menu.
   * E.g., /connect-workshop/requests/search
   */
  private updateUrlForSelection(menuId: string): void {
    const mapping = this.routeMappings.find(m => m.menuId === menuId);
    if (!mapping) return;
    const menu = this.activeMenus.get(menuId);
    if (!menu) return;
    const config = menu.getConfig();
    const selection = this.getCurrentSelection(config);
    const segments: string[] = [];
    // Build semantic URL segments: prefer section/method/subsection/action over raw IDs
    config.columns.forEach((col: any) => {
      // Skip columns that should not contribute to the route
      if (col.contributesToRoute === false) return;
      const activeId = selection[col.id];
      if (!activeId) return;
      const item = (col.items || []).find((it: any) => it.id === activeId);
      if (!item) {
        segments.push(activeId);
        return;
      }
      const seg = item.section || item.method || item.subsection || item.action || item.id;
      segments.push(seg);
    });
    const base = mapping.route.endsWith('/') ? mapping.route.slice(0, -1) : mapping.route;
    const newPath = segments.length ? `${base}/${segments.join('/')}` : base;
    window.history.replaceState({}, '', newPath);
    // Notify listeners about route change
    window.dispatchEvent(new CustomEvent('routeChanged', { detail: { route: newPath } }));
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
   * DESIGNER API: get deep-cloned snapshot of registries and route mappings
   */
  public getRegistrySnapshot(): { menuRegistry: any; routeMappings: RouteMenuMapping[] } {
    return {
      menuRegistry: JSON.parse(JSON.stringify(menuRegistry)),
      routeMappings: JSON.parse(JSON.stringify(this.routeMappings))
    };
  }

  /**
   * DESIGNER API: update a module menu configuration at runtime
   */
  public updateModuleMenu(moduleName: string, config: MenuConfiguration): void {
    menuRegistry.moduleColumns[moduleName] = config;
    this.persistOverridesToStorage();
    window.dispatchEvent(new CustomEvent('menuRegistryUpdated', { detail: { moduleName } }));
  }

  /**
   * DESIGNER API: update main navigation configuration
   */
  public updateMainNavigation(config: MenuConfiguration): void {
    menuRegistry.mainNavigation = config;
    this.persistOverridesToStorage();
    window.dispatchEvent(new CustomEvent('menuRegistryUpdated', { detail: { menuId: 'main-navigation' } }));
  }

  /**
   * DESIGNER API: replace route mappings
   */
  public setRouteMappings(mappings: RouteMenuMapping[]): void {
    this.routeMappings = mappings.slice();
    this.persistOverridesToStorage();
    window.dispatchEvent(new CustomEvent('routeMappingsUpdated'));
  }

  /**
   * Persist overrides to localStorage (mainNavigation, moduleColumns, routeMappings)
   */
  private persistOverridesToStorage(): void {
    try {
      const data = {
        mainNavigation: menuRegistry.mainNavigation,
        moduleColumns: menuRegistry.moduleColumns,
        routeMappings: this.routeMappings
      };
      localStorage.setItem('menuDesigner:overrides', JSON.stringify(data));
    } catch (_) {
      // ignore
    }
  }

  /**
   * Load overrides from localStorage once per session
   */
  private loadOverridesFromStorage(): void {
    if (this.overridesLoaded) return;
    this.overridesLoaded = true;
    try {
      const raw = localStorage.getItem('menuDesigner:overrides');
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data.mainNavigation) menuRegistry.mainNavigation = data.mainNavigation;
      if (data.moduleColumns) menuRegistry.moduleColumns = data.moduleColumns;
      if (data.routeMappings) this.routeMappings = data.routeMappings;
    } catch (_) {
      // ignore
    }
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
