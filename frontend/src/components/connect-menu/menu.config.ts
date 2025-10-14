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
          label: 'ConnectData',
          icon: '💾',
          module: 'connect-data',
          route: '/connect-data',
          action: 'navigate'
        },
        {
          id: 'connect-config',
          label: 'ConnectConfig',
          icon: '⚙️',
          module: 'connect-config',
          route: '/connect-config',
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
          action: 'section-change'
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
          action: 'section-change',
          active: true
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
          action: 'search'
        },
        {
          id: 'new-request',
          label: 'Dodaj',
          icon: '➕',
          action: 'add-new'
        },
        {
          id: 'export',
          label: 'Export',
          icon: '📊',
          action: 'export'
        },
        {
          id: 'import',
          label: 'Import',
          icon: '⬇️',
          action: 'import',
          active: true
        },
        {
          id: 'sync',
          label: 'Sync',
          icon: '🔄',
          action: 'sync'
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
        },
        {
          id: 'export',
          label: 'Export',
          icon: '💾',
          section: 'export',
          action: 'report-type-change'
        }
      ]
    },
    {
      id: 'view-options',
      title: 'Widok',
      width: '120px',
      // Make the column visible; MenuManager can still toggle a 3rd column dynamically
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
          label: 'Rok',
          icon: '🗓️',
          method: 'year',
          action: 'view-change'
        },
        {
          id: 'custom',
          label: 'Niestandardowy',
          icon: '🎛️',
          method: 'custom',
          action: 'view-change'
        },
        {
          id: 'planning',
          label: 'Planowanie',
          icon: '🗂️',
          method: 'planning',
          action: 'view-change'
        }
      ]
    },
    {
      id: 'planning-options',
      title: 'Planowanie',
      width: '160px',
      visible: false,
      // This column is auxiliary; it should not affect URL segments
      contributesToRoute: false as any,
      items: [
        { id: 'assign', label: 'Przydziel', icon: '📝', action: 'plan-assign' },
        { id: 'schedule', label: 'Harmonogram', icon: '📅', action: 'plan-schedule' },
        { id: 'resources', label: 'Zasoby', icon: '⚙️', action: 'plan-resources' }
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
      id: 'manager-sections',
      title: 'Manager',
      width: '120px',
      items: [
        {
          id: 'scenarios',
          label: 'Scenariusze',
          icon: '🧪',
          action: 'section-change',
          active: true
        },
        {
          id: 'activities',
          label: 'Czynności',
          icon: '📝',
          action: 'section-change'
        },
        {
          id: 'test-types',
          label: 'Rodzaj Testu',
          icon: '⏰',
          action: 'section-change'
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
        },
        {
          id: 'export',
          label: 'Export',
          icon: '📊',
          method: 'export',
          action: 'method-change'
        },
        {
          id: 'import',
          label: 'Import',
          icon: '⬇️',
          method: 'import',
          action: 'method-change'
        },
        {
          id: 'sync',
          label: 'Sync',
          icon: '🔄',
          method: 'sync',
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
    activeItems: ['dispositions', 'import']
  },
  {
    route: '/connect-reports', 
    menuId: 'connect-reports-menu',
    activeItems: ['executed']
  },
  {
    route: '/connect-test',
    menuId: 'connect-test-menu', 
    activeItems: ['identification']
  },
  {
    route: '/connect-manager',
    menuId: 'connect-manager-menu',
    activeItems: ['scenarios']
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
