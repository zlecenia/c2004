// frontend/src/modules/connect-id/connect-id-refactored.view.ts - Refactored version
import { ConnectIdModule } from './connect-id.module';
import { ConnectIdTemplate } from './connect-id.template';
import { ConnectIdStyles } from './connect-id.styles';
import { ConnectIdHandlers } from './connect-id.handlers';

export class ConnectIdView {
  private module: ConnectIdModule;
  private handlers: ConnectIdHandlers;
  private container: HTMLElement | null = null;
  private stylesAdded: boolean = false;

  constructor(module: ConnectIdModule) {
    this.module = module;
    this.handlers = new ConnectIdHandlers();
  }

  render(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'connect-id-compact';

    // Update top-bar submenu
    this.updateTopBar();
    
    // Add styles to document head
    this.addStyles();

    // Set HTML content using template
    container.innerHTML = ConnectIdTemplate.render();

    // Store container reference
    this.container = container;

    // Initialize default state
    this.initializeDefaultState();

    return container;
  }

  private updateTopBar(): void {
    const submenu = document.getElementById('top-bar-submenu');
    if (submenu) submenu.textContent = '🔍 Universal Identification';

    const sectionTitle = document.getElementById('top-bar-section-title');
    if (sectionTitle) sectionTitle.textContent = 'ConnectID - Identyfikacja';
  }

  private addStyles(): void {
    if (this.stylesAdded) return;

    // Check if styles already exist
    if (document.getElementById('connect-id-styles')) return;

    const styleElement = document.createElement('style');
    styleElement.id = 'connect-id-styles';
    styleElement.textContent = ConnectIdStyles.getStyles();
    document.head.appendChild(styleElement);
    
    this.stylesAdded = true;
  }

  private initializeDefaultState(): void {
    // Set default method and type
    this.handlers.setType('device');
    
    // Show device identification by default
    const deviceIdentification = document.getElementById('device-identification');
    if (deviceIdentification) {
      deviceIdentification.style.display = 'block';
    }
  }

  // Public API methods
  public setType(type: 'user' | 'device' | 'group' | 'test'): void {
    this.handlers.setType(type);
  }

  public getCurrentMethod(): string {
    return this.handlers.getCurrentMethod();
  }

  public getCurrentType(): string {
    return this.handlers.getCurrentType();
  }

  // Cleanup method
  public destroy(): void {
    if (this.handlers) {
      this.handlers.cleanup();
    }
    
    // Remove styles if this is the only instance
    const styleElement = document.getElementById('connect-id-styles');
    if (styleElement) {
      styleElement.remove();
    }
    
    this.container = null;
  }

  // Method for handling URL parameters
  public handleUrlParams(params: URLSearchParams): void {
    const type = params.get('type');
    const method = params.get('method');

    if (type && ['user', 'device', 'group', 'test'].includes(type)) {
      this.setType(type as 'user' | 'device' | 'group' | 'test');
    }

    if (method) {
      // Trigger method change through UI
      const methodButton = document.querySelector(`[data-method="${method}"]`);
      if (methodButton) {
        (methodButton as HTMLElement).click();
      }
    }
  }

  // Health check method
  public healthCheck(): boolean {
    return this.container !== null && this.handlers !== null;
  }
}
