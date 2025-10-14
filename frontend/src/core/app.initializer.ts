// frontend/src/core/app.initializer.ts
// Main application initializer - orchestrates the startup process

import { AppShell } from './ui/app-shell';
import { Router } from './router/router';
import { ModuleLoader } from './module-loader/module-loader';
import { MenuManager, createModuleMenu } from '../components/connect-menu';

export class AppInitializer {
  private readonly appShell: AppShell;
  private readonly router: Router;
  private readonly moduleLoader: ModuleLoader;
  private menuManager: MenuManager | null = null;

  constructor() {
    this.appShell = new AppShell();
    this.router = new Router();
    this.moduleLoader = new ModuleLoader();
  }

  /**
   * Start the application
   */
  async start(): Promise<void> {
    try {
      console.log('🚀 Initializing C2004 Connect System...');

      // 1. Create and mount app shell
      this.mountAppShell();

      // 2. Initialize modules
      this.registerModules();

      // 3. Setup menu
      await this.setupMenu();

      // 4. Setup routing
      this.setupRouting();

      // 5. Start clock
      this.appShell.startClock();

      // 6. Load initial route
      this.loadInitialRoute();

      console.log('✅ Application initialized successfully');
    } catch (error) {
      console.error('❌ Application initialization failed:', error);
      this.appShell.showError(
        error instanceof Error ? error.message : 'Unknown error occurred',
        () => window.location.reload()
      );
      throw error;
    }
  }

  /**
   * Mount app shell to DOM
   */
  private mountAppShell(): void {
    const app = document.getElementById('app');
    if (!app) {
      throw new Error('App container not found');
    }

    const shellElement = this.appShell.create();
    app.textContent = '';
    app.appendChild(shellElement);
  }

  /**
   * Register all available modules
   */
  private registerModules(): void {
    // Register all modules from MODULE_REGISTRY with proper paths
    const modules = [
      { name: 'identification', path: '../modules/identification/identification.module' },
      { name: 'connect-id', path: '../modules/connect-id/connect-id.module' },
      { name: 'connect-data', path: '../modules/connect-data/connect-filter.module' },
      { name: 'connect-workshop', path: '../modules/connect-workshop/connect-workshop.module' },
      { name: 'connect-test', path: '../modules/connect-test/connect-test.module' },
      { name: 'connect-config', path: '../modules/connect-config/connect-config.module' },
      { name: 'connect-reports', path: '../modules/connect-reports/connect-reports.module' },
      { name: 'connect-manager', path: '../modules/connect-manager/connect-manager.module' },
      { name: 'menu-editor', path: '../modules/menu-editor/menu-editor.module' }
    ];
    
    modules.forEach(({ name, path }) => {
      this.moduleLoader.register(name, path);
    });

    console.log(`📦 Registered ${modules.length} modules`);
  }

  /**
   * Setup menu system
   */
  private async setupMenu(): Promise<void> {
    const sidebar = this.appShell.getSidebarMenu();
    if (!sidebar) {
      throw new Error('Sidebar menu container not found');
    }

    // Get MenuManager instance (singleton)
    this.menuManager = MenuManager.getInstance();
    
    // Create main navigation menu
    const menuComponent = createModuleMenu('main-navigation', sidebar, {
      onItemClick: (data) => {
        console.log('Menu item clicked:', data);
        // Navigation is handled by MenuManager via global events
      }
    });
    
    if (!menuComponent) {
      console.warn('Failed to create menu component');
    }

    // Note: MenuManager already sets up global event listeners (popstate, routeChanged)
    // and automatically updates URLs and triggers navigation
  }

  /**
   * Setup routing
   */
  private setupRouting(): void {
    // Register module routes
    this.router.register('/connect-id/*', () => this.loadModule('connect-id'));
    this.router.register('/connect-data/*', () => this.loadModule('connect-data'));
    this.router.register('/connect-workshop/*', () => this.loadModule('connect-workshop'));
    this.router.register('/connect-reports/*', () => this.loadModule('connect-reports'));
    this.router.register('/connect-test/*', () => this.loadModule('connect-test'));
    this.router.register('/connect-manager/*', () => this.loadModule('connect-manager'));
    this.router.register('/connect-config/*', () => this.loadModule('connect-config'));
    this.router.register('/menu-editor', () => this.loadModule('menu-editor'));

    // Default route
    this.router.register('/', () => {
      this.router.navigateTo('/connect-config/system/settings');
    });

    // 404 route
    this.router.register('*', () => {
      this.appShell.showError('Page not found', () => {
        this.router.navigateTo('/');
      });
    });

    // Start router
    this.router.start();
  }

  /**
   * Load initial route
   */
  private loadInitialRoute(): void {
    const path = this.router.getCurrentPath();
    if (path === '/' || path === '') {
      this.router.navigateTo('/connect-config/system/settings');
    }
  }

  /**
   * Handle navigation - route changes trigger module loading
   */
  private handleRouteChange(path: string): void {
    // Extract module name from path
    // e.g., /connect-config/system/settings -> connect-config
    const segments = path.split('/').filter(Boolean);
    if (segments.length > 0) {
      const moduleName = segments[0];
      this.loadModule(moduleName, path);
    }
  }

  /**
   * Load a specific module
   */
  private async loadModule(moduleName: string, fullPath?: string): Promise<void> {
    const container = this.appShell.getModuleContainer();
    if (!container) {
      console.error('Module container not found');
      return;
    }

    try {
      // Show loading state
      this.appShell.showLoading(`Loading ${moduleName}...`);
      
      // Update title
      this.appShell.updateTitle(this.getModuleTitle(moduleName));

      // Load module
      const moduleInstance = await this.moduleLoader.load(moduleName);

      // Initialize if not already initialized
      if (moduleInstance.initialize && !moduleInstance.initialized) {
        await moduleInstance.initialize();
        moduleInstance.initialized = true;
      }

      // Clear container and render module
      this.appShell.clearContainer();
      
      if (moduleInstance.render && typeof moduleInstance.render === 'function') {
        moduleInstance.render(container);
      } else {
        throw new Error(`Module "${moduleName}" has no render method`);
      }

      console.log(`✅ Module "${moduleName}" loaded for path: ${fullPath || 'default'}`);
    } catch (error) {
      console.error(`Failed to load module "${moduleName}":`, error);
      this.appShell.showError(
        `Failed to load module: ${moduleName}`,
        () => this.loadModule(moduleName, fullPath)
      );
    }
  }

  /**
   * Get user-friendly module title
   */
  private getModuleTitle(moduleName: string): string {
    const titles: Record<string, string> = {
      'connect-id': 'Identyfikacja',
      'connect-data': 'Dane Floty',
      'connect-workshop': 'Warsztat',
      'connect-reports': 'Raporty',
      'connect-test': 'Testy',
      'connect-manager': 'Zarządzanie',
      'connect-config': 'Konfiguracja',
      'menu-editor': 'Edytor Menu'
    };

    return titles[moduleName] || moduleName;
  }

  /**
   * Get router instance (for external access if needed)
   */
  getRouter(): Router {
    return this.router;
  }

  /**
   * Get module loader instance
   */
  getModuleLoader(): ModuleLoader {
    return this.moduleLoader;
  }

  /**
   * Get app shell instance
   */
  getAppShell(): AppShell {
    return this.appShell;
  }
}
