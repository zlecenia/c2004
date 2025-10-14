// frontend/src/components/connect-menu/menu.config.ts

import { MenuConfiguration, MenuRegistry, RouteMenuMapping } from './menu.interfaces';

// Main navigation sidebar
export const mainNavigationConfig: MenuConfiguration = {
  id: 'main-navigation',
  type: 'sidebar',
  theme: 'dark',
  layout: 'normal',
  columns: [
    {
      id: 'main-menu',
      title: 'Główne menu',
      items: [
        {
          id: 'connect-id',
          label: 'Użytkownik',
          icon: '👤',
          module: 'connect-id',
          route: '/connect-id',
          action: 'navigate'
        },
        {
          id: 'connect-test',
          label: 'Testowanie',
          icon: '🧪',
          module: 'connect-test',
          route: '/connect-test',
          action: 'navigate'
        },
        {
          id: 'connect-reports',
          label: 'Raporty',
          icon: '📄',
          module: 'connect-reports',
          route: '/connect-reports',
          action: 'navigate'
        },
        {
          id: 'connect-manager',
          label: 'Manager',
          icon: '🎯',
          module: 'connect-manager',
          route: '/connect-manager',
          action: 'navigate'
        },
        {
          id: 'connect-workshop',
          label: 'Connect Workshop',
          icon: '🔧',
          module: 'connect-workshop',
          route: '/connect-workshop',
          action: 'navigate'
        },
        {
          id: 'connect-data',
          label: 'Connect Data',
          icon: '💾',
          module: 'connect-data',
          route: '/connect-data',
          action: 'navigate'
        },
        {
          id: 'connect-config',
          label: 'Connect Config',
          icon: '⚙️',
          module: 'connect-config',
          route: '/connect-config',
          action: 'navigate'
        },
        {
          id: 'menu-editor',
          label: 'Menu Editor',
          icon: '🎨',
          module: 'menu-editor',
          route: '/menu-editor',
          action: 'navigate'
        }
      ]
    }
  ]
};

// Connect Data module menu
export const connectDataMenuConfig: MenuConfiguration = {
  id: 'connect-data-menu',
  type: 'columns',
  theme: 'dark',
  layout: 'compact',
  columns: [
    {
      id: 'objects-column',
      title: 'Obiekty',
      width: '120px',
      items: [
        {
          id: 'requests',
          label: 'Zgłoszenia',
          icon: '📋',
          section: 'requests',
          action: 'section-change',
          active: true
        },
        {
          id: 'services',
          label: 'Serwisy',
          icon: '⚙️',
          section: 'services',
          action: 'section-change'
        },
        {
          id: 'transport',
          label: 'Transport',
          icon: '🔧',
          section: 'transport',
          action: 'section-change'
        },
        {
          id: 'dispositions',
          label: 'Dyspozycje',
          icon: '💿',
          section: 'dispositions',
          action: 'section-change'
        }
      ]
    },
    {
      id: 'actions-column',
      title: 'Akcje',
      width: '120px',
      items: [
        {
          id: 'search',
          label: 'Szukaj',
          icon: '🔍',
          method: 'search',
          action: 'method-change',
          active: true
        },
        {
          id: 'new-request',
          label: 'Dodaj',
          icon: '➕',
          method: 'add-new',
          action: 'method-change'
        }
      ]
    }
  ]
};

// Connect Reports module menu
export const connectReportsMenuConfig: MenuConfiguration = {
  id: 'connect-reports-menu',
  type: 'columns',
  theme: 'dark',
  layout: 'compact',
  columns: [
    {
      id: 'report-types',
      title: 'Raporty',
      width: '120px',
      items: [
        {
          id: 'executed',
          label: 'Wykonane',
          icon: '✅',
          section: 'executed',
          action: 'report-type-change',
          active: true
        },
        {
          id: 'planned',
          label: 'Planowane',
          icon: '📅',
          section: 'planned',
          action: 'report-type-change'
        }
      ]
    },
    {
      id: 'view-options',
      title: 'Widok',
      width: '140px',
      items: [
        {
          id: 'week',
          label: 'Tydzień',
          icon: '📅',
          method: 'week',
          action: 'view-change',
          active: true
        },
        {
          id: 'month',
          label: 'Miesiąc',
          icon: '📆',
          method: 'month',
          action: 'view-change'
        },
        {
          id: 'year',
          label: 'Kwartał',
          icon: '📊',
          method: 'year',
          action: 'view-change'
        },
        {
          id: 'custom',
          label: 'Filtruj',
          icon: '🔍',
          method: 'custom',
          action: 'view-change'
        }
      ]
    }
  ]
};

// Connect ID module menu (simplified: only Methods for User identification)  
export const connectIdMenuConfig: MenuConfiguration = {
  id: 'connect-id-menu',
  type: 'columns',
  theme: 'dark',
  layout: 'compact',
  columns: [
    {
      id: 'methods-column',
      title: 'Metoda identyfikacji',
      width: '180px',
      items: [
        {
          id: 'rfid',
          label: 'RFID',
          icon: '📡',
          method: 'rfid',
          action: 'method-change',
          active: true
        },
        {
          id: 'qr',
          label: 'QR Code',
          icon: '📱',
          method: 'qr',
          action: 'method-change'
        },
        {
          id: 'barcode',
          label: 'Barcode',
          icon: '📊',
          method: 'barcode', 
          action: 'method-change'
        },
        {
          id: 'manual',
          label: 'Ręcznie',
          icon: '⌨️',
          method: 'manual',
          action: 'method-change'
        },
        {
          id: 'list',
          label: 'Z listy',
          icon: '📋',
          method: 'list',
          action: 'method-change'
        }
      ]
    }
  ]
};

// Connect Test module menu (simplified: only Interface/Method selection)
export const connectTestMenuConfig: MenuConfiguration = {
  id: 'connect-test-menu',
  type: 'columns',
  theme: 'dark',
  layout: 'compact',
  columns: [
    {
      id: 'interface',
      title: 'Metoda testowania',
      width: '180px',
      items: [
        {
          id: 'rfid',
          label: 'RFID',
          icon: '📡',
          method: 'rfid',
          action: 'method-change',
          active: true
        },
        {
          id: 'qr',
          label: 'QR',
          icon: '📷',
          method: 'qr',
          action: 'method-change'
        },
        {
          id: 'barcode',
          label: 'Barcode',
          icon: '📊',
          method: 'barcode',
          action: 'method-change'
        },
        {
          id: 'search',
          label: 'Szukaj',
          icon: '🔍',
          method: 'search',
          action: 'method-change'
        }
      ]
    }
  ]
};

// Connect Manager module menu
export const connectManagerMenuConfig: MenuConfiguration = {
  id: 'connect-manager-menu',
  type: 'columns',
  theme: 'dark',
  layout: 'compact',
  columns: [
    {
      id: 'manager-sections-column',
      title: 'Manager',
      width: '120px',
      items: [
        {
          id: 'scenarios',
          label: 'Scenariusze',
          icon: '🧪',
          section: 'scenarios',
          action: 'section-change',
          active: true
        },
        {
          id: 'activities',
          label: 'Czynności',
          icon: '📝',
          section: 'activities',
          action: 'section-change'
        },
        {
          id: 'test-types',
          label: 'Rodzaj Testu',
          icon: '⏰',
          section: 'test-types',
          action: 'section-change'
        }
      ]
    },
    {
      id: 'manager-actions-column',
      title: 'Akcje',
      width: '140px',
      items: [
        {
          id: 'list',
          label: 'Lista',
          icon: '📋',
          method: 'list',
          action: 'method-change',
          active: true
        },
        {
          id: 'new',
          label: 'Nowy',
          icon: '➕',
          method: 'new',
          action: 'method-change'
        },
        {
          id: 'saved',
          label: 'Zapisane',
          icon: '💾',
          method: 'saved',
          action: 'method-change'
        }
      ]
    }
  ]
};

// Connect Workshop module menu
export const connectWorkshopMenuConfig: MenuConfiguration = {
  id: 'connect-workshop-menu',
  type: 'columns',
  theme: 'dark',
  layout: 'compact',
  columns: [
    {
      id: 'objects-column',
      title: 'Obiekty',
      width: '120px',
      items: [
        {
          id: 'requests',
          label: 'Zgłoszenia',
          icon: '📋',
          section: 'requests',
          action: 'section-change',
          active: true
        },
        {
          id: 'services',
          label: 'Serwisy',
          icon: '⚙️',
          section: 'services',
          action: 'section-change'
        },
        {
          id: 'transport',
          label: 'Transport',
          icon: '🚚',
          section: 'transport',
          action: 'section-change'
        },
        {
          id: 'dispositions',
          label: 'Dyspozycje',
          icon: '💿',
          section: 'dispositions',
          action: 'section-change'
        }
      ]
    },
    {
      id: 'actions-column',
      title: 'Akcje',
      width: '120px',
      items: [
        {
          id: 'search',
          label: 'Szukaj',
          icon: '🔍',
          method: 'search',
          action: 'method-change',
          active: true
        },
        {
          id: 'new-request',
          label: 'Dodaj',
          icon: '➕',
          method: 'new-request',
          action: 'method-change'
        }
      ]
    }
  ]
};

// Connect Config menu (3-level: Categories -> Subcategories -> Settings)
export const connectConfigMenuConfig: MenuConfiguration = {
  id: 'connect-config-menu',
  type: 'columns',
  theme: 'dark',
  layout: 'compact',
  columns: [
    {
      id: 'categories-column',
      title: 'Kategorie',
      width: '140px',
      items: [
        {
          id: 'system',
          label: 'System & Sieć',
          icon: '🖥️',
          section: 'system',
          action: 'section-change',
          active: true
        },
        {
          id: 'devices',
          label: 'Urządzenia',
          icon: '📱',
          section: 'devices',
          action: 'section-change'
        },
        {
          id: 'security',
          label: 'Bezpieczeństwo',
          icon: '🔒',
          section: 'security',
          action: 'section-change'
        }
      ]
    },
    {
      id: 'subcategories-column',
      title: 'Ustawienia',
      width: '160px',
      items: [
        // System category items
        {
          id: 'settings',
          label: 'Ustawienia',
          icon: '⚙️',
          section: 'system',
          subsection: 'settings',
          action: 'subsection-change',
          parentCategory: 'system'
        },
        {
          id: 'performance',
          label: 'Wydajność',
          icon: '⚡',
          section: 'system',
          subsection: 'performance',
          action: 'subsection-change',
          parentCategory: 'system'
        },
        {
          id: 'network',
          label: 'Sieć',
          icon: '🌐',
          section: 'system', 
          subsection: 'network',
          action: 'subsection-change',
          parentCategory: 'system'
        },
        {
          id: 'updates',
          label: 'Aktualizacje',
          icon: '🔄',
          section: 'system',
          subsection: 'updates', 
          action: 'subsection-change',
          parentCategory: 'system'
        },
        {
          id: 'monitoring',
          label: 'Monitoring',
          icon: '📊',
          section: 'system',
          subsection: 'monitoring',
          action: 'subsection-change',
          parentCategory: 'system'
        },
        {
          id: 'logs',
          label: 'Logi systemu',
          icon: '📋',
          section: 'system',
          subsection: 'logs',
          action: 'subsection-change',
          parentCategory: 'system'
        },
        {
          id: 'diagnostics',
          label: 'Diagnostyka',
          icon: '🔍',
          section: 'system',
          subsection: 'diagnostics',
          action: 'subsection-change',
          parentCategory: 'system'
        },
        {
          id: 'maintenance',
          label: 'Konserwacja',
          icon: '🔧',
          section: 'system',
          subsection: 'maintenance',
          action: 'subsection-change',
          parentCategory: 'system'
        },
        // Device category items
        {
          id: 'rfid-config',
          label: 'Konfiguracja RFID',
          icon: '📡',
          section: 'devices',
          subsection: 'rfid-config',
          action: 'subsection-change',
          parentCategory: 'devices'
        },
        {
          id: 'qr-config',
          label: 'Konfiguracja QR',
          icon: '📷',
          section: 'devices',
          subsection: 'qr-config',
          action: 'subsection-change',
          parentCategory: 'devices'
        },
        {
          id: 'barcode-config',
          label: 'Konfiguracja Barcode',
          icon: '📊',
          section: 'devices',
          subsection: 'barcode-config',
          action: 'subsection-change',
          parentCategory: 'devices'
        },
        {
          id: 'sensors',
          label: 'Czujniki',
          icon: '🌡️',
          section: 'devices',
          subsection: 'sensors',
          action: 'subsection-change',
          parentCategory: 'devices'
        },
        {
          id: 'io-ports',
          label: 'Porty I/O',
          icon: '🔌',
          section: 'devices',
          subsection: 'io-ports',
          action: 'subsection-change',
          parentCategory: 'devices'
        },
        {
          id: 'calibration',
          label: 'Kalibracja',
          icon: '⚖️',
          section: 'devices',
          subsection: 'calibration',
          action: 'subsection-change',
          parentCategory: 'devices'
        },
        {
          id: 'power',
          label: 'Zasilanie',
          icon: '🔋',
          section: 'devices',
          subsection: 'power',
          action: 'subsection-change',
          parentCategory: 'devices'
        },
        {
          id: 'storage',
          label: 'Pamięć',
          icon: '💾',
          section: 'devices',
          subsection: 'storage',
          action: 'subsection-change',
          parentCategory: 'devices'
        },
        // Security category items
        {
          id: 'security-settings',
          label: 'Ustawienia',
          icon: '🔐',
          section: 'security',
          subsection: 'settings',
          action: 'subsection-change',
          parentCategory: 'security'
        },
        {
          id: 'users',
          label: 'Użytkownicy',
          icon: '👥',
          section: 'security',
          subsection: 'users',
          action: 'subsection-change',
          parentCategory: 'security'
        },
        {
          id: 'permissions',
          label: 'Uprawnienia',
          icon: '🛡️',
          section: 'security',
          subsection: 'permissions',
          action: 'subsection-change',
          parentCategory: 'security'
        },
        {
          id: 'backup',
          label: 'Kopie bezpieczeństwa',
          icon: '💾',
          section: 'security',
          subsection: 'backup',
          action: 'subsection-change',
          parentCategory: 'security'
        },
        {
          id: 'reports',
          label: 'Raporty bezp.',
          icon: '📈',
          section: 'security',
          subsection: 'reports',
          action: 'subsection-change',
          parentCategory: 'security'
        },
        {
          id: 'labels',
          label: 'Etykiety',
          icon: '🏷️',
          section: 'security',
          subsection: 'labels',
          action: 'subsection-change',
          parentCategory: 'security'
        }
      ]
    }
  ]
};

// Menu registry
export const menuRegistry: MenuRegistry = {
  mainNavigation: mainNavigationConfig,
  moduleColumns: {
    'connect-id': connectIdMenuConfig,
    'connect-data': connectDataMenuConfig,
    'connect-reports': connectReportsMenuConfig,
    'connect-test': connectTestMenuConfig,
    'connect-manager': connectManagerMenuConfig,
    'connect-workshop': connectWorkshopMenuConfig,
    'connect-config': connectConfigMenuConfig
  },
  actionMenus: {}
};

// Route to menu mappings
export const routeMenuMappings: RouteMenuMapping[] = [
  {
    route: '/connect-id',
    menuId: 'connect-id-menu',
    activeItems: ['user', 'rfid']
  },
  {
    route: '/connect-data',
    menuId: 'connect-data-menu',
    activeItems: ['requests', 'search']
  },
  {
    route: '/connect-reports', 
    menuId: 'connect-reports-menu',
    activeItems: ['executed', 'week']
  },
  {
    route: '/connect-test',
    menuId: 'connect-test-menu', 
    activeItems: ['identification']
  },
  {
    route: '/connect-manager',
    menuId: 'connect-manager-menu',
    activeItems: ['scenarios', 'list']
  },
  {
    route: '/connect-config',
    menuId: 'connect-config-menu',
    activeItems: ['system', 'performance']
  },
  {
    route: '/connect-workshop',
    menuId: 'connect-workshop-menu',
    activeItems: ['requests', 'search']
  }
];
