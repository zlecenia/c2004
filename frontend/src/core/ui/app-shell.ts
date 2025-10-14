// frontend/src/core/ui/app-shell.ts
// Responsible for creating and managing the main application shell structure

export class AppShell {
  private container: HTMLElement | null = null;

  /**
   * Create the main application shell HTML structure
   */
  create(): HTMLElement {
    const app = document.createElement('div');
    app.className = 'main-app-container';
    app.id = 'app';

    app.innerHTML = `
      <div class="top-bar">
        <div style="display: flex; align-items: center;">
          <span class="top-bar-brand" id="top-bar-brand">🔧 C2004 Connect System</span>
          <span class="top-bar-submenu" id="top-bar-submenu"></span>
        </div>
        <span class="top-bar-section-title" id="top-bar-section-title">Welcome</span>
        <div class="top-bar-status">
          <span id="top-bar-time">--:--</span>
          <span id="top-bar-user">User</span>
          <button id="toggle-size-btn" class="btn-toggle-size" title="Przełącz widok">1200×400</button>
        </div>
      </div>
      
      <div class="app-layout">
        <nav id="sidebar-menu"></nav>
        <div class="module-container" id="module-container">
          <div class="loading">Initializing...</div>
        </div>
      </div>
    `;

    this.container = app;
    this.setupSizeToggle();
    return app;
  }

  /**
   * Get the module container element
   */
  getModuleContainer(): HTMLElement | null {
    return document.getElementById('module-container');
  }

  /**
   * Get the sidebar menu element
   */
  getSidebarMenu(): HTMLElement | null {
    return document.getElementById('sidebar-menu');
  }

  /**
   * Update top bar title
   */
  updateTitle(title: string): void {
    const titleEl = document.getElementById('top-bar-section-title');
    if (titleEl) {
      titleEl.textContent = title;
    }
  }

  /**
   * Update top bar submenu
   */
  updateSubmenu(submenu: string): void {
    const submenuEl = document.getElementById('top-bar-submenu');
    if (submenuEl) {
      submenuEl.textContent = submenu;
    }
  }

  /**
   * Update top bar user
   */
  updateUser(userName: string): void {
    const userEl = document.getElementById('top-bar-user');
    if (userEl) {
      userEl.textContent = userName;
    }
  }

  /**
   * Start clock in top bar
   */
  startClock(): void {
    const updateTime = () => {
      const timeEl = document.getElementById('top-bar-time');
      if (timeEl) {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        timeEl.textContent = `${hours}:${minutes}`;
      }
    };

    updateTime(); // Initial update
    setInterval(updateTime, 1000); // Update every second
  }

  /**
   * Show loading state in module container
   */
  showLoading(message: string = 'Loading...'): void {
    const container = this.getModuleContainer();
    if (container) {
      container.innerHTML = `
        <div class="loading-container">
          <div class="loading-spinner">
            <div class="spinner"></div>
          </div>
          <div class="loading-text">
            <h3>${message}</h3>
            <p>Please wait...</p>
          </div>
        </div>
      `;
    }
  }

  /**
   * Show error state in module container
   */
  showError(error: string, onRetry?: () => void): void {
    const container = this.getModuleContainer();
    if (container) {
      container.innerHTML = `
        <div class="error-container">
          <div class="error-icon">⚠️</div>
          <div class="error-content">
            <h3>Something went wrong</h3>
            <p class="error-message">${error}</p>
          </div>
          <div class="error-actions">
            ${onRetry ? '<button class="btn-retry" id="error-retry">Try Again</button>' : ''}
            <button class="btn-home" id="error-home">Go Home</button>
          </div>
        </div>
      `;

      // Attach event listeners
      if (onRetry) {
        const retryBtn = container.querySelector('#error-retry');
        if (retryBtn) {
          retryBtn.addEventListener('click', onRetry);
        }
      }

      const homeBtn = container.querySelector('#error-home');
      if (homeBtn) {
        homeBtn.addEventListener('click', () => {
          window.location.href = '/';
        });
      }
    }
  }

  /**
   * Clear module container
   */
  clearContainer(): void {
    const container = this.getModuleContainer();
    if (container) {
      container.innerHTML = '';
    }
  }

  /**
   * Get the main container element
   */
  getContainer(): HTMLElement | null {
    return this.container;
  }

  /**
   * Setup size toggle functionality (1200×400 vs 100%)
   */
  private setupSizeToggle(): void {
    const sizeBtn = document.getElementById('toggle-size-btn') as HTMLButtonElement | null;
    if (!sizeBtn) return;

    // Apply size mode
    const applySizeMode = (mode: 'fixed-1200' | 'responsive-100') => {
      document.body.classList.remove('fixed-1200', 'responsive-100');
      document.body.classList.add(mode);
      if (sizeBtn) {
        sizeBtn.textContent = mode === 'fixed-1200' ? '100%' : '1200×400';
      }
      try {
        localStorage.setItem('ui:sizeMode', mode);
      } catch (e) {
        console.warn('Failed to save size mode to localStorage:', e);
      }
    };

    // Get saved mode
    const getSavedMode = (): 'fixed-1200' | 'responsive-100' => {
      try {
        const saved = localStorage.getItem('ui:sizeMode');
        return saved === 'responsive-100' ? 'responsive-100' : 'fixed-1200';
      } catch {
        return 'fixed-1200';
      }
    };

    // Apply saved mode on load
    applySizeMode(getSavedMode());

    // Toggle on button click
    sizeBtn.addEventListener('click', () => {
      const currentMode = document.body.classList.contains('fixed-1200') 
        ? 'fixed-1200' 
        : 'responsive-100';
      const nextMode = currentMode === 'fixed-1200' ? 'responsive-100' : 'fixed-1200';
      applySizeMode(nextMode);
    });
  }
}
