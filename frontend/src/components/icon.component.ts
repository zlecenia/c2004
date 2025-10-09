// frontend/src/components/icon.component.ts - Professional Icon System with Lucide Icons

import * as LucideIcons from 'lucide';

// Lucide Icon mapping - preferred icons
const lucideMap: Record<string, any> = {
  // Users & Authentication
  'user': LucideIcons.User,
  'user-circle': LucideIcons.UserCircle,
  'lock': LucideIcons.Lock,
  'key': LucideIcons.Key,
  
  // Testing & Lab
  'flask': LucideIcons.FlaskConical,
  'clipboard-check': LucideIcons.ClipboardCheck,
  'check-circle': LucideIcons.CheckCircle,
  'check': LucideIcons.Check,
  
  // Reports & Analytics
  'file-text': LucideIcons.FileText,
  'bar-chart': LucideIcons.BarChart3,
  'calendar': LucideIcons.Calendar,
  'calendar-days': LucideIcons.CalendarDays,
  
  // Workshop & Tools
  'wrench': LucideIcons.Wrench,
  'hard-hat': LucideIcons.HardHat,
  'settings': LucideIcons.Settings,
  'sliders': LucideIcons.Sliders,
  
  // Data & Storage
  'database': LucideIcons.Database,
  'hard-drive': LucideIcons.HardDrive,
  'save': LucideIcons.Save,
  'download': LucideIcons.Download,
  'upload': LucideIcons.Upload,
  
  // Hardware & Devices
  'smartphone': LucideIcons.Smartphone,
  'credit-card': LucideIcons.CreditCard,
  'qr-code': LucideIcons.QrCode,
  'barcode': LucideIcons.ScanLine,
  
  // Network & System
  'monitor': LucideIcons.Monitor,
  'network': LucideIcons.Network,
  'wifi': LucideIcons.Wifi,
  'globe': LucideIcons.Globe,
  
  // Navigation & UI
  'search': LucideIcons.Search,
  'home': LucideIcons.Home,
  'menu': LucideIcons.Menu,
  'arrow-left': LucideIcons.ArrowLeft,
  'arrow-right': LucideIcons.ArrowRight,
  
  // Actions
  'edit': LucideIcons.Edit,
  'trash': LucideIcons.Trash2,
  'plus': LucideIcons.Plus,
  'x': LucideIcons.X,
  'play': LucideIcons.Play,
  'pause': LucideIcons.Pause,
  'stop': LucideIcons.Square,
  
  // Status & Alerts
  'alert-triangle': LucideIcons.AlertTriangle,
  'alert-circle': LucideIcons.AlertCircle,
  'shield': LucideIcons.Shield,
  'shield-check': LucideIcons.ShieldCheck,
  
  // Utility
  'refresh': LucideIcons.RefreshCw,
  'power': LucideIcons.Power,
  'eye': LucideIcons.Eye,
  'eye-off': LucideIcons.EyeOff,
  'bell': LucideIcons.Bell
};

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
      color = 'currentColor',
      strokeWidth = 2,
      className = ''
    } = config;
    
    // Try Lucide icon first
    const LucideIcon = lucideMap[name];
    if (LucideIcon) {
      try {
        // Create Lucide icon element
        const iconElement = LucideIcon({
          size,
          color,
          strokeWidth,
          class: `lucide-icon icon-${name} ${className}`
        });
        
        // Convert to string if it's a DOM element
        if (iconElement instanceof HTMLElement) {
          return iconElement.outerHTML;
        }
        return iconElement;
      } catch (error) {
        console.warn(`Failed to render Lucide icon "${name}":`, error);
      }
    }
    
    // Fallback to emoji
    const emoji = emojiMap[name];
    if (emoji) {
      return `<span class="icon icon-emoji icon-${name} ${className}" style="font-size: ${size}px;">${emoji}</span>`;
    }
    
    // Last resort - missing icon
    console.warn(`Icon "${name}" not found in Lucide or emoji fallback`);
    return `<span class="icon-missing ${className}" style="font-size: ${size}px;">?</span>`;
  }
  
  static renderDOMElement(name: IconName, config: IconConfig = {}): HTMLElement {
    const {
      size = 24,
      color = 'currentColor',
      strokeWidth = 2,
      className = ''
    } = config;
    
    // Try Lucide icon first
    const LucideIcon = lucideMap[name];
    if (LucideIcon) {
      try {
        const iconElement = LucideIcon({
          size,
          color,
          strokeWidth,
          class: `lucide-icon icon-${name} ${className}`
        });
        
        if (iconElement instanceof HTMLElement) {
          return iconElement;
        }
        
        // If it's an SVG string, create element from it
        const wrapper = document.createElement('div');
        wrapper.innerHTML = iconElement;
        const svgElement = wrapper.querySelector('svg');
        if (svgElement) {
          svgElement.classList.add('lucide-icon', `icon-${name}`, ...className.split(' '));
          return svgElement;
        }
      } catch (error) {
        console.warn(`Failed to render Lucide DOM element "${name}":`, error);
      }
    }
    
    // Fallback to emoji
    const emoji = emojiMap[name];
    const span = document.createElement('span');
    span.className = `icon icon-emoji icon-${name} ${className}`;
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

// CSS styles for professional icon system
export const IconStyles = `
  /* Base icon styles */
  .icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    flex-shrink: 0;
  }
  
  /* Lucide SVG icons */
  .lucide-icon {
    display: inline-block;
    vertical-align: middle;
    flex-shrink: 0;
    stroke: currentColor;
    fill: none;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  
  /* Emoji fallback icons */
  .icon-emoji {
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    line-height: 1;
  }
  
  /* Missing icon fallback */
  .icon-missing {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
    border: 1px solid rgba(239, 68, 68, 0.2);
    border-radius: 4px;
    font-size: 12px;
    font-weight: bold;
    font-family: monospace;
  }
  
  /* Menu icon containers */
  .menu-icon {
    transition: all 0.2s ease;
    border-radius: 6px;
    padding: 2px;
  }
  
  .menu-icon:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  /* Status icons with semantic colors */
  .status-icon {
    margin-right: 6px;
  }
  
  .status-success { color: #10b981; }
  .status-warning { color: #f59e0b; }
  .status-error { color: #ef4444; }
  .status-info { color: #3b82f6; }
  
  /* Different icon sizes */
  .icon-xs { width: 16px; height: 16px; }
  .icon-sm { width: 20px; height: 20px; }
  .icon-md { width: 24px; height: 24px; }
  .icon-lg { width: 32px; height: 32px; }
  .icon-xl { width: 48px; height: 48px; }
  .icon-xxl { width: 64px; height: 64px; }
  
  /* Interactive states */
  .icon-button {
    cursor: pointer;
    transition: all 0.2s ease;
    border-radius: 6px;
    padding: 8px;
  }
  
  .icon-button:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-1px);
  }
  
  .icon-button:active {
    transform: translateY(0);
  }
  
  /* Animation utilities */
  @keyframes icon-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  .icon-loading {
    animation: icon-pulse 1.5s ease-in-out infinite;
  }
  
  @keyframes icon-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .icon-spinning {
    animation: icon-spin 1s linear infinite;
  }
`;
