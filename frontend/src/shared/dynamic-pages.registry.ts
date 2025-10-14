// frontend/src/shared/dynamic-pages.registry.ts

/**
 * DynamicPagesRegistry allows runtime-defined pages (HTML strings) to be used
 * instead of static page classes in PageManagers. This enables the Menu & Routing
 * Designer to add/edit/remove pages without rebuilding the app.
 */
export class DynamicPagesRegistry {
  // Map of module -> pageKey -> HTML content
  private static pages: Record<string, Record<string, string>> = {};

  /**
   * Set or update a dynamic page for a specific module
   * @param moduleName e.g., 'connect-data' | 'connect-reports'
   * @param pageKey e.g., 'services-import' or 'planned-month'
   * @param html HTML content to render inside module main content
   */
  static setPage(moduleName: string, pageKey: string, html: string): void {
    if (!this.pages[moduleName]) this.pages[moduleName] = {};
    this.pages[moduleName][pageKey] = html;
    this.persist();
  }

  /** Remove a dynamic page */
  static removePage(moduleName: string, pageKey: string): void {
    if (this.pages[moduleName]) {
      delete this.pages[moduleName][pageKey];
      this.persist();
    }
  }

  /** Get dynamic page HTML if present */
  static getPage(moduleName: string, pageKey: string): string | null {
    return (this.pages[moduleName] && this.pages[moduleName][pageKey]) || null;
  }

  /** Get all dynamic pages for a module */
  static listPages(moduleName: string): Record<string, string> {
    return { ...(this.pages[moduleName] || {}) };
  }

  /** Load from localStorage on startup */
  static load(): void {
    try {
      const raw = localStorage.getItem('dynamicPagesRegistry');
      if (raw) {
        this.pages = JSON.parse(raw);
      }
    } catch (_) {
      // ignore
    }
  }

  private static persist(): void {
    try {
      localStorage.setItem('dynamicPagesRegistry', JSON.stringify(this.pages));
    } catch (_) {
      // ignore
    }
  }
}

// Load immediately
DynamicPagesRegistry.load();
