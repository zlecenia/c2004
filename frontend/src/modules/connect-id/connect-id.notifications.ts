// frontend/src/modules/connect-id/connect-id.notifications.ts - Notification System

export class ConnectIdNotifications {
  private static notificationContainer: HTMLElement | null = null;

  static initializeNotificationContainer(): void {
    if (!this.notificationContainer) {
      this.notificationContainer = document.createElement('div');
      this.notificationContainer.className = 'notification-container';
      this.notificationContainer.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        pointer-events: none;
      `;
      document.body.appendChild(this.notificationContainer);
    }
  }

  static showNotification(message: string, type: string = 'info', duration: number = 3000): void {
    this.initializeNotificationContainer();
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
      background: ${this.getNotificationColor(type)};
      color: white;
      padding: 12px 20px;
      margin-bottom: 10px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 14px;
      font-weight: 500;
      max-width: 400px;
      word-wrap: break-word;
      transform: translateX(100%);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: auto;
      cursor: pointer;
      border-left: 4px solid ${this.getNotificationAccentColor(type)};
    `;
    
    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="font-size: 16px;">${this.getNotificationIcon(type)}</span>
        <span>${message}</span>
      </div>
    `;
    
    // Add to container
    if (this.notificationContainer) {
      this.notificationContainer.appendChild(notification);
    }
    
    // Animate in
    requestAnimationFrame(() => {
      notification.style.transform = 'translateX(0)';
    });
    
    // Click to dismiss
    notification.addEventListener('click', () => {
      this.dismissNotification(notification);
    });
    
    // Auto dismiss
    setTimeout(() => {
      this.dismissNotification(notification);
    }, duration);
  }

  private static dismissNotification(notification: HTMLElement): void {
    notification.style.transform = 'translateX(100%)';
    notification.style.opacity = '0';
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }

  private static getNotificationColor(type: string): string {
    const colors = {
      success: '#10B981', // Green
      error: '#EF4444',   // Red
      warning: '#F59E0B', // Yellow
      info: '#3B82F6',    // Blue
      default: '#6B7280'  // Gray
    };
    return colors[type as keyof typeof colors] || colors.default;
  }

  private static getNotificationAccentColor(type: string): string {
    const colors = {
      success: '#065F46', // Dark green
      error: '#7F1D1D',   // Dark red
      warning: '#78350F', // Dark yellow
      info: '#1E3A8A',    // Dark blue
      default: '#374151'  // Dark gray
    };
    return colors[type as keyof typeof colors] || colors.default;
  }

  private static getNotificationIcon(type: string): string {
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️',
      default: '📢'
    };
    return icons[type as keyof typeof icons] || icons.default;
  }

  // Utility methods for common notification types
  static showSuccess(message: string): void {
    this.showNotification(message, 'success');
  }

  static showError(message: string): void {
    this.showNotification(message, 'error', 4000); // Longer duration for errors
  }

  static showWarning(message: string): void {
    this.showNotification(message, 'warning');
  }

  static showInfo(message: string): void {
    this.showNotification(message, 'info');
  }
}
