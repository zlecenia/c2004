// frontend/src/core/__tests__/app-shell.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AppShell } from '../ui/app-shell';

describe('AppShell', () => {
  let appShell: AppShell;

  beforeEach(() => {
    appShell = new AppShell();
    document.body.innerHTML = '<div id="app"></div>';
  });

  describe('create()', () => {
    it('should create main app container', () => {
      const element = appShell.create();
      
      expect(element).toBeDefined();
      expect(element.className).toBe('main-app-container');
      expect(element.id).toBe('app');
    });

    it('should contain top bar', () => {
      const element = appShell.create();
      const topBar = element.querySelector('.top-bar');
      
      expect(topBar).toBeTruthy();
    });

    it('should contain app layout', () => {
      const element = appShell.create();
      const layout = element.querySelector('.app-layout');
      
      expect(layout).toBeTruthy();
    });

    it('should contain sidebar menu', () => {
      const element = appShell.create();
      const sidebar = element.querySelector('#sidebar-menu');
      
      expect(sidebar).toBeTruthy();
    });

    it('should contain module container', () => {
      const element = appShell.create();
      const container = element.querySelector('#module-container');
      
      expect(container).toBeTruthy();
    });

    it('should contain size toggle button', () => {
      const element = appShell.create();
      const button = element.querySelector('#toggle-size-btn');
      
      expect(button).toBeTruthy();
      expect(button?.textContent).toBe('1200×400');
    });
  });

  describe('updateTitle()', () => {
    it('should update top bar title', () => {
      appShell.create();
      document.body.appendChild(appShell.getContainer()!);
      
      appShell.updateTitle('Test Title');
      
      const title = document.getElementById('top-bar-section-title');
      expect(title?.textContent).toBe('Test Title');
    });
  });

  describe('updateSubmenu()', () => {
    it('should update submenu text', () => {
      appShell.create();
      document.body.appendChild(appShell.getContainer()!);
      
      appShell.updateSubmenu('Test Submenu');
      
      const submenu = document.getElementById('top-bar-submenu');
      expect(submenu?.textContent).toBe('Test Submenu');
    });
  });

  describe('updateUser()', () => {
    it('should update user name', () => {
      appShell.create();
      document.body.appendChild(appShell.getContainer()!);
      
      appShell.updateUser('John Doe');
      
      const user = document.getElementById('top-bar-user');
      expect(user?.textContent).toBe('John Doe');
    });
  });

  describe('showLoading()', () => {
    it('should show loading state', () => {
      appShell.create();
      document.body.appendChild(appShell.getContainer()!);
      
      appShell.showLoading('Loading test...');
      
      const container = appShell.getModuleContainer();
      expect(container?.innerHTML).toContain('Loading test...');
      expect(container?.innerHTML).toContain('spinner');
    });

    it('should use default message if none provided', () => {
      appShell.create();
      document.body.appendChild(appShell.getContainer()!);
      
      appShell.showLoading();
      
      const container = appShell.getModuleContainer();
      expect(container?.innerHTML).toContain('Loading...');
    });
  });

  describe('showError()', () => {
    it('should show error state', () => {
      appShell.create();
      document.body.appendChild(appShell.getContainer()!);
      
      appShell.showError('Test error');
      
      const container = appShell.getModuleContainer();
      expect(container?.innerHTML).toContain('Test error');
      expect(container?.innerHTML).toContain('Something went wrong');
    });

    it('should add retry button when onRetry provided', () => {
      appShell.create();
      document.body.appendChild(appShell.getContainer()!);
      
      const onRetry = vi.fn();
      appShell.showError('Test error', onRetry);
      
      const retryBtn = document.getElementById('error-retry');
      expect(retryBtn).toBeTruthy();
    });

    it('should call onRetry when retry button clicked', () => {
      appShell.create();
      document.body.appendChild(appShell.getContainer()!);
      
      const onRetry = vi.fn();
      appShell.showError('Test error', onRetry);
      
      const retryBtn = document.getElementById('error-retry');
      retryBtn?.click();
      
      expect(onRetry).toHaveBeenCalled();
    });
  });

  describe('clearContainer()', () => {
    it('should clear module container', () => {
      appShell.create();
      document.body.appendChild(appShell.getContainer()!);
      
      const container = appShell.getModuleContainer();
      if (container) container.innerHTML = '<div>Test content</div>';
      
      appShell.clearContainer();
      
      expect(container?.innerHTML).toBe('');
    });
  });

  describe('startClock()', () => {
    it('should update time element', () => {
      vi.useFakeTimers();
      appShell.create();
      document.body.appendChild(appShell.getContainer()!);
      
      appShell.startClock();
      
      const timeEl = document.getElementById('top-bar-time');
      expect(timeEl?.textContent).toMatch(/\d{2}:\d{2}/);
      
      vi.useRealTimers();
    });
  });

  describe('size toggle', () => {
    it('should toggle between fixed and responsive modes', () => {
      appShell.create();
      document.body.appendChild(appShell.getContainer()!);
      
      const button = document.getElementById('toggle-size-btn') as HTMLButtonElement;
      
      // Initially should be fixed-1200
      expect(document.body.classList.contains('fixed-1200')).toBe(true);
      
      // Click to toggle
      button?.click();
      expect(document.body.classList.contains('responsive-100')).toBe(true);
      expect(button?.textContent).toBe('1200×400');
      
      // Click again to toggle back
      button?.click();
      expect(document.body.classList.contains('fixed-1200')).toBe(true);
      expect(button?.textContent).toBe('100%');
    });

    it('should save size mode to localStorage', () => {
      appShell.create();
      document.body.appendChild(appShell.getContainer()!);
      
      const button = document.getElementById('toggle-size-btn');
      button?.click();
      
      expect(localStorage.setItem).toHaveBeenCalledWith('ui:sizeMode', 'responsive-100');
    });
  });
});
