// frontend/src/core/router/router.ts
// Responsible for routing logic and URL handling

export interface Route {
  path: string;
  handler: () => void;
}

export class Router {
  private routes: Map<string, () => void> = new Map();
  private currentPath: string = '';

  /**
   * Register a route with its handler
   */
  register(path: string, handler: () => void): void {
    this.routes.set(path, handler);
  }

  /**
   * Start listening to route changes
   */
  start(): void {
    // Handle initial route
    this.handleRoute(window.location.pathname);

    // Listen to popstate (back/forward buttons)
    window.addEventListener('popstate', () => {
      this.handleRoute(window.location.pathname);
    });

    // Intercept link clicks
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href]') as HTMLAnchorElement;
      
      if (link && this.isInternalLink(link)) {
        e.preventDefault();
        this.navigateTo(link.pathname);
      }
    });
  }

  /**
   * Navigate to a specific path
   */
  navigateTo(path: string): void {
    if (path === this.currentPath) {
      return; // Already on this route
    }

    this.currentPath = path;
    window.history.pushState({}, '', path);
    this.handleRoute(path);
  }

  /**
   * Handle route change
   */
  private handleRoute(path: string): void {
    // Try exact match first
    const handler = this.routes.get(path);
    if (handler) {
      handler();
      return;
    }

    // Try pattern matching (simple implementation)
    for (const [routePath, routeHandler] of this.routes.entries()) {
      if (this.matchRoute(routePath, path)) {
        routeHandler();
        return;
      }
    }

    // No route found - try default or show error
    const defaultHandler = this.routes.get('*');
    if (defaultHandler) {
      defaultHandler();
    } else {
      console.warn(`No route handler found for: ${path}`);
    }
  }

  /**
   * Simple route matching (supports wildcards)
   */
  private matchRoute(pattern: string, path: string): boolean {
    if (pattern === '*') return true;
    if (pattern === path) return true;

    // Convert pattern to regex (simple implementation)
    const regexPattern = pattern
      .replace(/\*/g, '.*')
      .replace(/\//g, '\\/');
    
    const regex = new RegExp(`^${regexPattern}$`);
    return regex.test(path);
  }

  /**
   * Check if link is internal
   */
  private isInternalLink(link: HTMLAnchorElement): boolean {
    return link.origin === window.location.origin;
  }

  /**
   * Get current path
   */
  getCurrentPath(): string {
    return this.currentPath || window.location.pathname;
  }

  /**
   * Parse URL parameters
   */
  getParams(): URLSearchParams {
    return new URLSearchParams(window.location.search);
  }

  /**
   * Get hash from URL
   */
  getHash(): string {
    return window.location.hash.slice(1);
  }
}
