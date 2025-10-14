// frontend/src/core/module-loader/module-loader.ts
// Responsible for loading and initializing modules

export interface ModuleMetadata {
  name: string;
  path: string;
  initialized: boolean;
  instance?: any;
}

export class ModuleLoader {
  private modules: Map<string, ModuleMetadata> = new Map();
  private loadingPromises: Map<string, Promise<any>> = new Map();

  /**
   * Register a module
   */
  register(name: string, path: string): void {
    this.modules.set(name, {
      name,
      path,
      initialized: false
    });
  }

  /**
   * Load a module by name
   */
  async load(name: string): Promise<any> {
    const metadata = this.modules.get(name);
    if (!metadata) {
      throw new Error(`Module "${name}" is not registered`);
    }

    // Return cached instance if already initialized
    if (metadata.initialized && metadata.instance) {
      return metadata.instance;
    }

    // Return existing loading promise if in progress
    const existingPromise = this.loadingPromises.get(name);
    if (existingPromise) {
      return existingPromise;
    }

    // Start loading
    const loadPromise = this.loadModule(metadata);
    this.loadingPromises.set(name, loadPromise);

    try {
      const instance = await loadPromise;
      metadata.instance = instance;
      metadata.initialized = true;
      this.loadingPromises.delete(name);
      return instance;
    } catch (error) {
      this.loadingPromises.delete(name);
      throw error;
    }
  }

  /**
   * Load module implementation
   */
  private async loadModule(metadata: ModuleMetadata): Promise<any> {
    try {
      // Dynamic import
      const module = await import(/* @vite-ignore */ metadata.path);
      
      // Get module class or default export
      const ModuleClass = module.default || module[this.getModuleClassName(metadata.name)];
      
      if (!ModuleClass) {
        throw new Error(`Module "${metadata.name}" has no default export or matching class`);
      }

      // Instantiate if it's a class
      if (typeof ModuleClass === 'function') {
        return new ModuleClass();
      }

      return ModuleClass;
    } catch (error) {
      console.error(`Failed to load module "${metadata.name}":`, error);
      throw error;
    }
  }

  /**
   * Get expected class name from module name
   */
  private getModuleClassName(name: string): string {
    // Convert kebab-case or snake_case to PascalCase
    return name
      .split(/[-_]/)
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('') + 'Module';
  }

  /**
   * Check if module is loaded
   */
  isLoaded(name: string): boolean {
    const metadata = this.modules.get(name);
    return metadata?.initialized || false;
  }

  /**
   * Get module instance if loaded
   */
  getInstance(name: string): any | undefined {
    return this.modules.get(name)?.instance;
  }

  /**
   * Unload a module
   */
  unload(name: string): void {
    const metadata = this.modules.get(name);
    if (metadata) {
      // Call destroy if available
      if (metadata.instance?.destroy) {
        metadata.instance.destroy();
      }
      
      metadata.initialized = false;
      metadata.instance = undefined;
    }
  }

  /**
   * Get all registered modules
   */
  getRegisteredModules(): string[] {
    return Array.from(this.modules.keys());
  }

  /**
   * Get loading stats
   */
  getStats(): { total: number; loaded: number; loading: number } {
    const total = this.modules.size;
    const loaded = Array.from(this.modules.values()).filter(m => m.initialized).length;
    const loading = this.loadingPromises.size;
    
    return { total, loaded, loading };
  }
}
