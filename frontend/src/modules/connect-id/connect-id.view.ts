// frontend/src/modules/connect-id/connect-id.view.ts - Refactored clean version
import { ConnectIdModule } from './connect-id.module';
import { ConnectIdTemplates } from './connect-id.templates';
import { ConnectIdEventHandlers } from './connect-id.event-handlers';
import { ConnectIdNotifications } from './connect-id.notifications';

export class ConnectIdView {
  private currentType: string = 'device';
  private currentMethod: string = 'rfid';
  private currentScenarioType: string = 'usage';
  private currentProtocol: string = 'service';
  private eventHandlers: ConnectIdEventHandlers;

  constructor(_module: ConnectIdModule) {
    // Initialize event handlers with callback methods
    this.eventHandlers = new ConnectIdEventHandlers(
      () => this.currentMethod,
      (method: string) => { this.currentMethod = method; },
      (message: string, type: string) => ConnectIdNotifications.showNotification(message, type)
    );
    
    // Initialize notification system
    ConnectIdNotifications.initializeNotificationContainer();
  }

  render(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'connect-id-compact';
    
    // Update top-bar elements
    this.updateTopBarElements();
    
    // Use template system for main layout
    container.innerHTML = ConnectIdTemplates.getMainLayoutTemplate();
    
    // Add custom styles
    this.addCustomStyles();
    
    // Setup event listeners using event handlers
    this.eventHandlers.setupEventListeners(container);
    
    // Set initial method from URL if available
    this.setInitialMethodFromURL(container);
    
    return container;
  }

  private updateTopBarElements(): void {
    // Update top-bar submenu
    const submenu = document.getElementById('top-bar-submenu');
    if (submenu) submenu.textContent = '🔍 Universal Identification';
    
    // Update top-bar section title
    const sectionTitle = document.getElementById('top-bar-section-title');
    if (sectionTitle) sectionTitle.textContent = 'ConnectID - Identyfikacja';
  }

  private setInitialMethodFromURL(container: HTMLElement): void {
    // Parse method from URL
    const path = window.location.pathname;
    const methodMatch = path.match(/\/connect-id\/([^\/]+)$/);
    
    if (methodMatch) {
      const method = methodMatch[1];
      console.log(`🔧 ConnectID: Setting initial method from URL: ${method}`);
      this.eventHandlers.switchToMethod(method, container);
    }
  }

  private addCustomStyles(): void {
    // Check if styles already added
    if (document.getElementById('connectid-compact-styles')) {
      return;
    }

    const style = document.createElement('style');
    style.id = 'connectid-compact-styles';
    style.textContent = this.getCompactStyles();
    document.head.appendChild(style);
  }

  private getCompactStyles(): string {
    return `
      .connect-id-compact {
        height: 100%;
        width: 100%;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      }

      .compact-layout {
        display: flex;
        height: 100%;
        background: #1a1a1a;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      }

      .menu-column {
        width: 120px;
        background: #2a2a2a;
        border-right: 1px solid #333;
        padding: 16px 8px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .column-title {
        font-size: 12px;
        font-weight: 600;
        color: #888;
        margin: 0 0 8px 8px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .method-item, .user-menu-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 8px;
        background: #3a3a3a;
        border: none;
        border-radius: 8px;
        color: #ccc;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 12px;
        text-align: left;
      }

      .method-item:hover, .user-menu-item:hover {
        background: #4a4a4a;
        color: #fff;
      }

      .method-item.active {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
      }

      .user-menu-item.selected {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }

      .menu-icon {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .menu-label {
        font-weight: 500;
        white-space: nowrap;
      }

      .main-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        background: #1a1a1a;
      }

      .content-body {
        flex: 1;
        padding: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .content-section {
        width: 100%;
        max-width: 400px;
      }

      .identification-display {
        text-align: center;
        color: #fff;
      }

      .identification-display h2 {
        font-size: 24px;
        font-weight: 600;
        margin: 16px 0 8px 0;
        color: #fff;
      }

      .identification-display p {
        font-size: 14px;
        color: #888;
        margin: 0 0 24px 0;
      }

      .status-indicator {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        font-size: 12px;
        color: #10B981;
      }

      .status-dot {
        width: 8px;
        height: 8px;
        background: #10B981;
        border-radius: 50%;
        animation: pulse 2s infinite;
      }

      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }

      /* RFID Animation */
      .rfid-animation {
        position: relative;
        margin: 0 auto 24px;
        width: 120px;
        height: 120px;
      }

      .rfid-waves {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .wave {
        position: absolute;
        border: 2px solid #667eea;
        border-radius: 50%;
        animation: wave-animation 2s infinite;
      }

      .wave-1 { width: 40px; height: 40px; margin: -20px; animation-delay: 0s; }
      .wave-2 { width: 80px; height: 80px; margin: -40px; animation-delay: 0.5s; }
      .wave-3 { width: 120px; height: 120px; margin: -60px; animation-delay: 1s; }

      @keyframes wave-animation {
        0% { opacity: 1; transform: scale(0.1); }
        50% { opacity: 0.5; }
        100% { opacity: 0; transform: scale(1); }
      }

      .rfid-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #667eea;
      }

      /* QR Scanner Animation */
      .qr-scanner {
        position: relative;
        margin: 0 auto 24px;
        width: 120px;
        height: 120px;
      }

      .scanner-frame {
        position: relative;
        width: 100%;
        height: 100%;
        border: 2px solid #667eea;
        border-radius: 8px;
      }

      .scanner-corner {
        position: absolute;
        width: 20px;
        height: 20px;
        border: 3px solid #10B981;
      }

      .scanner-corner.top-left { top: -3px; left: -3px; border-right: none; border-bottom: none; }
      .scanner-corner.top-right { top: -3px; right: -3px; border-left: none; border-bottom: none; }
      .scanner-corner.bottom-left { bottom: -3px; left: -3px; border-right: none; border-top: none; }
      .scanner-corner.bottom-right { bottom: -3px; right: -3px; border-left: none; border-top: none; }

      .scanner-line {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, transparent, #10B981, transparent);
        animation: scanner-line 2s infinite;
      }

      @keyframes scanner-line {
        0% { top: 0; }
        100% { top: calc(100% - 2px); }
      }

      .qr-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #667eea;
        opacity: 0.3;
      }

      /* Manual Input */
      .manual-input-section {
        display: flex;
        gap: 8px;
        margin: 24px 0;
      }

      .manual-input-section input {
        flex: 1;
        padding: 12px 16px;
        background: #2a2a2a;
        border: 1px solid #333;
        border-radius: 8px;
        color: #fff;
        font-size: 14px;
      }

      .manual-input-section input:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      }

      .submit-btn {
        padding: 12px 16px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: none;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: all 0.2s ease;
      }

      .submit-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
      }

      /* Login Form */
      .login-container {
        max-width: 400px;
        margin: 0 auto;
      }

      .login-header {
        text-align: center;
        margin-bottom: 32px;
      }

      .login-header h2 {
        font-size: 24px;
        font-weight: 600;
        margin: 0 0 8px 0;
        color: #fff;
      }

      .selected-user-info {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-top: 16px;
        padding: 12px;
        background: #2a2a2a;
        border-radius: 8px;
      }

      .password-section {
        display: flex;
        gap: 8px;
        margin-bottom: 24px;
      }

      .password-section input {
        flex: 1;
        padding: 12px 16px;
        background: #2a2a2a;
        border: 1px solid #333;
        border-radius: 8px;
        color: #fff;
        font-size: 14px;
      }

    `;
  }

  // Public method to switch method (called from external sources)
  switchMethod(method: string): void {
    const container = document.querySelector('.connect-id-compact') as HTMLElement;
    if (container) {
      this.eventHandlers.switchToMethod(method, container);
    }
  }

  // Getter for current method (for external access)
  getCurrentMethod(): string {
    return this.currentMethod;
  }
}
