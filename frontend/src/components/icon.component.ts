// frontend/src/components/icon.component.ts - Professional SVG Icon System
import { 
  User, UserCircle, FlaskConical, ClipboardCheck, FileText, BarChart3, 
  Wrench, HardHat, Database, HardDrive, Settings, Sliders,
  Smartphone, CreditCard, QrCode, Barcode, ScanLine, Search, ScanSearch,
  CheckCircle, Check, Calendar, CalendarDays, CalendarRange, CalendarClock,
  AlertTriangle, AlertCircle, Shield, ShieldCheck, Lock, Key,
  Monitor, Network, Wifi, Globe, Save, Download, Upload,
  Edit, Trash2, Plus, X, Home, Menu, ArrowLeft, ArrowRight,
  Play, Pause, Stop, RefreshCw, Power, Eye, EyeOff, Bell
} from 'lucide';

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

const iconMap = {
  // Users & Authentication
  'user': User,
  'user-circle': UserCircle,
  'lock': Lock,
  'key': Key,
  
  // Testing & Lab
  'flask': FlaskConical,
  'clipboard-check': ClipboardCheck,
  'check-circle': CheckCircle,
  'check': Check,
  
  // Reports & Analytics
  'file-text': FileText,
  'bar-chart': BarChart3,
  'calendar': Calendar,
  'calendar-days': CalendarDays,
  
  // Workshop & Tools
  'wrench': Wrench,
  'hard-hat': HardHat,
  'settings': Settings,
  'sliders': Sliders,
  
  // Data & Storage
  'database': Database,
  'hard-drive': HardDrive,
  'save': Save,
  'download': Download,
  'upload': Upload,
  
  // Hardware & Devices
  'smartphone': Smartphone,
  'credit-card': CreditCard,
  'qr-code': QrCode,
  'barcode': Barcode,
  
  // Network & System
  'monitor': Monitor,
  'network': Network,
  'wifi': Wifi,
  'globe': Globe,
  
  // Navigation & UI
  'search': Search,
  'home': Home,
  'menu': Menu,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  
  // Actions
  'edit': Edit,
  'trash': Trash2,
  'plus': Plus,
  'x': X,
  'play': Play,
  'pause': Pause,
  'stop': Stop,
  
  // Status & Alerts
  'alert-triangle': AlertTriangle,
  'alert-circle': AlertCircle,
  'shield': Shield,
  'shield-check': ShieldCheck,
  
  // Utility
  'refresh': RefreshCw,
  'power': Power,
  'eye': Eye,
  'eye-off': EyeOff,
  'bell': Bell
};

export class IconComponent {
  static render(name: IconName, config: IconConfig = {}): string {
    const {
      size = 24,
      color = 'currentColor',
      strokeWidth = 2,
      className = ''
    } = config;
    
    const IconClass = iconMap[name];
    if (!IconClass) {
      console.warn(`Icon "${name}" not found, using default`);
      return `<span class="icon-missing ${className}">?</span>`;
    }
    
    // Create a temporary container to get SVG string
    const container = document.createElement('div');
    const icon = IconClass({
      size,
      color,
      strokeWidth,
      className: `icon icon-${name} ${className}`
    });
    
    container.appendChild(icon);
    return container.innerHTML;
  }
  
  static renderDOMElement(name: IconName, config: IconConfig = {}): SVGElement {
    const {
      size = 24,
      color = 'currentColor',
      strokeWidth = 2,
      className = ''
    } = config;
    
    const IconClass = iconMap[name];
    if (!IconClass) {
      console.warn(`Icon "${name}" not found, returning default element`);
      const span = document.createElement('span');
      span.className = `icon-missing ${className}`;
      span.textContent = '?';
      return span as any;
    }
    
    return IconClass({
      size,
      color,
      strokeWidth,
      className: `icon icon-${name} ${className}`
    });
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
    return Object.keys(iconMap) as IconName[];
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
