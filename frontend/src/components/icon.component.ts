// frontend/src/components/icon.component.ts - Icon System with Emoji Fallback

// Emoji fallback mapping for when Lucide is not available
const emojiMap: Record<string, string> = {
  // Users & Authentication
  'user': '👤',
  'user-circle': '👤', 
  'lock': '🔒',
  'key': '🔑',
  
  // Testing & Lab
  'flask': '🧪',
  'clipboard-check': '📋',
  'check-circle': '✅',
  'check': '✓',
  
  // Reports & Analytics
  'file-text': '📄',
  'bar-chart': '📊',
  'calendar': '📅',
  'calendar-days': '📆',
  
  // Workshop & Tools
  'wrench': '🔧',
  'hard-hat': '⛑️',
  'settings': '⚙️',
  'sliders': '🎛️',
  
  // Data & Storage
  'database': '📊',
  'hard-drive': '💾',
  'save': '💾',
  'download': '⬇️',
  'upload': '⬆️',
  
  // Hardware & Devices
  'smartphone': '📱',
  'credit-card': '💳',
  'qr-code': '📄',
  'barcode': '📊',
  
  // Network & System
  'monitor': '🖥️',
  'network': '🌐',
  'wifi': '📶',
  'globe': '🌍',
  
  // Navigation & UI
  'search': '🔍',
  'home': '🏠',
  'menu': '☰',
  'arrow-left': '←',
  'arrow-right': '→',
  
  // Actions
  'edit': '✏️',
  'trash': '🗑️',
  'plus': '➕',
  'x': '❌',
  'play': '▶️',
  'pause': '⏸️',
  'stop': '⏹️',
  
  // Status & Alerts
  'alert-triangle': '⚠️',
  'alert-circle': '🔴',
  'shield': '🛡️',
  'shield-check': '✅',
  
  // Utility
  'refresh': '🔄',
  'power': '⚡',
  'eye': '👁️',
  'eye-off': '🙈',
  'bell': '🔔'
};

export type IconName = 
  // Users & Authentication
  | 'user' | 'user-circle' | 'lock' | 'key'
  // Testing & Lab
  | 'flask' | 'clipboard-check' | 'check-circle' | 'check'
  // Reports & Analytics  
  | 'file-text' | 'bar-chart' | 'calendar' | 'calendar-days'
  // Workshop & Tools
  | 'wrench' | 'hard-hat' | 'settings' | 'sliders'
  // Data & Storage
  | 'database' | 'hard-drive' | 'save' | 'download' | 'upload'
  // Hardware & Devices
  | 'smartphone' | 'credit-card' | 'qr-code' | 'barcode'
  // Network & System
  | 'monitor' | 'network' | 'wifi' | 'globe'
  // Navigation & UI
  | 'search' | 'home' | 'menu' | 'arrow-left' | 'arrow-right'
  // Actions
  | 'edit' | 'trash' | 'plus' | 'x' | 'play' | 'pause' | 'stop'
  // Status & Alerts
  | 'alert-triangle' | 'alert-circle' | 'shield' | 'shield-check'
  // Utility
  | 'refresh' | 'power' | 'eye' | 'eye-off' | 'bell';

export interface IconConfig {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

// No iconMap needed - using emoji fallback

export class IconComponent {
  static render(name: IconName, config: IconConfig = {}): string {
    const {
      size = 24,
      className = ''
    } = config;
    
    // Use emoji fallback for now (until Lucide is properly installed in Docker)
    const emoji = emojiMap[name];
    if (!emoji) {
      console.warn(`Icon "${name}" not found, using default`);
      return `<span class="icon-missing ${className}">?</span>`;
    }
    
    // Return emoji wrapped in span with appropriate styling
    return `<span class="icon icon-${name} ${className}" style="font-size: ${size}px;">${emoji}</span>`;
  }
  
  static renderDOMElement(name: IconName, config: IconConfig = {}): HTMLElement {
    const {
      size = 24,
      className = ''
    } = config;
    
    const emoji = emojiMap[name];
    const span = document.createElement('span');
    span.className = `icon icon-${name} ${className}`;
    span.style.fontSize = `${size}px`;
    
    if (!emoji) {
      console.warn(`Icon "${name}" not found, returning default element`);
      span.className = `icon-missing ${className}`;
      span.textContent = '?';
      return span;
    }
    
    span.textContent = emoji;
    return span;
  }
  
  // Helper method for menu icons with consistent styling
  static menuIcon(name: IconName, label: string): string {
    const icon = this.render(name, { size: 18, className: 'menu-icon' });
    return `
      ${icon}
      <span class="menu-label">${label}</span>
    `;
  }
  
  // Helper method for status icons with color coding
  static statusIcon(name: IconName, status: 'success' | 'warning' | 'error' | 'info' = 'info'): string {
    const colors = {
      success: '#28a745',
      warning: '#ffc107', 
      error: '#dc3545',
      info: '#17a2b8'
    };
    
    return this.render(name, { 
      size: 16, 
      color: colors[status], 
      className: `status-icon status-${status}` 
    });
  }
  
  // Get all available icons for development/debugging
  static getAvailableIcons(): IconName[] {
    return Object.keys(emojiMap) as IconName[];
  }
}

// CSS styles for icon system
export const IconStyles = `
  .icon {
    display: inline-block;
    vertical-align: middle;
    flex-shrink: 0;
  }
  
  .icon-missing {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background: #f8d7da;
    color: #721c24;
    border-radius: 4px;
    font-size: 12px;
    font-weight: bold;
  }
  
  .menu-icon {
    transition: all 0.2s ease;
  }
  
  .status-icon {
    margin-right: 4px;
  }
  
  .status-success { color: #28a745; }
  .status-warning { color: #ffc107; }
  .status-error { color: #dc3545; }
  .status-info { color: #17a2b8; }
`;
