// frontend/src/components/icon.component.ts - Professional Icon System with Lucide Icons

// Try different import approaches for Lucide  
let LucideIcons: any = null;

// Method 1: Try dynamic import with individual icons
const importLucideIcon = async (iconName: string) => {
  try {
    // Import individual icons from lucide (more reliable than * import)
    const iconModule = await import(`lucide/dist/esm/icons/${iconName.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())}.js`);
    return iconModule.default;
  } catch (error) {
    console.warn(`Failed to import Lucide icon ${iconName}:`, error);
    return null;
  }
};

// Method 2: Try direct Lucide library import
try {
  // Import Lucide factory function
  import('lucide').then((lucide) => {
    LucideIcons = lucide;
    console.log('✅ Lucide library loaded successfully');
  }).catch((error) => {
    console.warn('❌ Failed to load Lucide library:', error);
  });
} catch (error) {
  console.warn('❌ Lucide import failed:', error);
}

// Lucide Icon mapping - preferred icons (safe initialization)
const lucideMap: Record<string, any> = {};

if (LucideIcons) {
  // Users & Authentication
  lucideMap['user'] = LucideIcons.User;
  lucideMap['user-circle'] = LucideIcons.UserCircle;
  lucideMap['lock'] = LucideIcons.Lock;
  lucideMap['key'] = LucideIcons.Key;
  
  // Testing & Lab
  lucideMap['flask'] = LucideIcons.FlaskConical;
  lucideMap['clipboard-check'] = LucideIcons.ClipboardCheck;
  lucideMap['check-circle'] = LucideIcons.CheckCircle;
  lucideMap['check'] = LucideIcons.Check;
  
  // Reports & Analytics
  lucideMap['file-text'] = LucideIcons.FileText;
  lucideMap['bar-chart'] = LucideIcons.BarChart3;
  lucideMap['calendar'] = LucideIcons.Calendar;
  lucideMap['calendar-days'] = LucideIcons.CalendarDays;
  
  // Workshop & Tools
  lucideMap['wrench'] = LucideIcons.Wrench;
  lucideMap['hard-hat'] = LucideIcons.HardHat;
  lucideMap['settings'] = LucideIcons.Settings;
  lucideMap['sliders'] = LucideIcons.Sliders;
  
  // Data & Storage
  lucideMap['database'] = LucideIcons.Database;
  lucideMap['hard-drive'] = LucideIcons.HardDrive;
  lucideMap['save'] = LucideIcons.Save;
  lucideMap['download'] = LucideIcons.Download;
  lucideMap['upload'] = LucideIcons.Upload;
  
  // Hardware & Devices
  lucideMap['smartphone'] = LucideIcons.Smartphone;
  lucideMap['credit-card'] = LucideIcons.CreditCard;
  lucideMap['qr-code'] = LucideIcons.QrCode;
  lucideMap['barcode'] = LucideIcons.ScanLine;
  
  // Network & System
  lucideMap['monitor'] = LucideIcons.Monitor;
  lucideMap['network'] = LucideIcons.Network;
  lucideMap['wifi'] = LucideIcons.Wifi;
  lucideMap['globe'] = LucideIcons.Globe;
  
  // Navigation & UI
  lucideMap['search'] = LucideIcons.Search;
  lucideMap['home'] = LucideIcons.Home;
  lucideMap['menu'] = LucideIcons.Menu;
  lucideMap['arrow-left'] = LucideIcons.ArrowLeft;
  lucideMap['arrow-right'] = LucideIcons.ArrowRight;
  
  // Actions
  lucideMap['edit'] = LucideIcons.Edit;
  lucideMap['trash'] = LucideIcons.Trash2;
  lucideMap['plus'] = LucideIcons.Plus;
  lucideMap['x'] = LucideIcons.X;
  lucideMap['play'] = LucideIcons.Play;
  lucideMap['pause'] = LucideIcons.Pause;
  lucideMap['stop'] = LucideIcons.Square;
  
  // Status & Alerts
  lucideMap['alert-triangle'] = LucideIcons.AlertTriangle;
  lucideMap['alert-circle'] = LucideIcons.AlertCircle;
  lucideMap['shield'] = LucideIcons.Shield;
  lucideMap['shield-check'] = LucideIcons.ShieldCheck;
  
  // Utility
  lucideMap['refresh'] = LucideIcons.RefreshCw;
  lucideMap['power'] = LucideIcons.Power;
  lucideMap['eye'] = LucideIcons.Eye;
  lucideMap['eye-off'] = LucideIcons.EyeOff;
  lucideMap['bell'] = LucideIcons.Bell;
  
  console.log('✅ Lucide icons loaded successfully');
} else {
  console.warn('⚠️ Lucide icons not available, using emoji fallback');
}

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
    
    // Try to render Lucide icon first (async fallback to emoji)
    this.tryRenderLucideIcon(name, { size, color, strokeWidth, className }).then((lucideIcon) => {
      if (lucideIcon) {
        // Replace emoji with Lucide icon when loaded
        const elements = document.querySelectorAll(`.icon-${name}`);
        elements.forEach(el => {
          if (el.textContent && el.textContent.length === 1) { // It's an emoji
            el.innerHTML = lucideIcon;
            el.classList.add('lucide-loaded');
          }
        });
      }
    });
    
    // Return emoji immediately (will be replaced by Lucide when loaded)
    const emoji = emojiMap[name];
    if (emoji) {
      return `<span class="icon icon-emoji icon-${name} ${className}" style="font-size: ${size}px;" data-lucide="${name}">${emoji}</span>`;
    }
    
    // Last resort - missing icon
    console.warn(`Icon "${name}" not found in emoji fallback`);
    return `<span class="icon-missing ${className}" style="font-size: ${size}px;">?</span>`;
  }

  // Async method to try loading Lucide icon
  private static async tryRenderLucideIcon(name: IconName, config: any): Promise<string | null> {
    try {
      const lucideIcon = await importLucideIcon(name);
      if (lucideIcon && typeof lucideIcon === 'function') {
        // Create SVG string
        const svgElement = lucideIcon({
          size: config.size,
          color: config.color,
          strokeWidth: config.strokeWidth,
          class: `lucide-icon icon-${name} ${config.className}`
        });
        
        if (typeof svgElement === 'string') {
          return svgElement;
        } else if (svgElement instanceof Element) {
          return svgElement.outerHTML;
        }
      }
    } catch (error) {
      console.warn(`Failed to render Lucide icon "${name}":`, error);
    }
    return null;
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
