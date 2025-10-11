// frontend/src/components/icon.component.ts - Simplified Icon System

// Emoji fallback mapping (reliable and works everywhere)
const emojiMap: Record<string, string> = {
  // Users & Authentication  
  'user': '👤',
  'users': '👥', 
  'user-circle': '👤',
  'lock': '🔒',
  'key': '🔑',
  
  // Testing & Lab
  'flask': '🧪',
  'clipboard-check': '📋',
  'check-circle': '✅',
  'check': '✓',
  'activity': '📊',
  
  // Reports & Analytics
  'file-text': '📄',
  'bar-chart': '📊',
  'pie-chart': '📊',
  'calendar': '📅',
  'clock': '⏰',
  'alert-triangle': '⚠️',
  
  // Navigation & Interface
  'search': '🔍',
  'filter': '🔽',
  'download': '⬇️',
  'upload': '⬆️',
  'plus': '➕',
  'minus': '➖',
  'edit': '✏️',
  'trash': '🗑️',
  'x': '✖️',
  'list': '📋',
  
  // Technology & Devices
  'smartphone': '📱',
  'qr-code': '📱',
  'barcode': '📊',
  'cpu': '💻',
  'database': '💾',
  'settings': '⚙️',
  'wrench': '🔧',
  'hard-drive': '💿',
  
  // Communication
  'refresh': '🔄',
  'sync': '🔄',
  'arrow-right': '→',
  'arrow-left': '←',
  'chevron-right': '›',
  'chevron-left': '‹'
};

export interface IconOptions {
  size?: number;
  color?: string;
  className?: string;
}

export class IconComponent {
  static render(iconName: string, options: IconOptions = {}): string {
    const { size = 16, color = 'currentColor', className = '' } = options;
    
    // Get emoji from map
    const emoji = emojiMap[iconName] || '❓';
    
    return `<span class="icon ${className}" style="font-size: ${size}px; color: ${color};">${emoji}</span>`;
  }
  
  // Static method for getting just the emoji (for use in templates)
  static getEmoji(iconName: string): string {
    return emojiMap[iconName] || '❓';
  }
}
