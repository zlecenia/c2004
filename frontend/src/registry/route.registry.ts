// frontend/src/registry/route.registry.ts

export interface RouteDefinition {
  path: string;
  module: string;
  displayName: string;
  icon?: string;
  params?: string[];
  children?: RouteDefinition[];
}

export const ROUTE_REGISTRY: Record<string, RouteDefinition> = {
  'connect-id': {
    path: '/connect-id',
    module: 'connect-id',
    displayName: 'Użytkownik',
    icon: '👤',
    params: ['type', 'method'],
    children: [
      {
        path: '/connect-id/user',
        module: 'connect-id',
        displayName: 'Identyfikacja Użytkownika',
        params: ['method']
      }
    ]
  },
  'connect-test': {
    path: '/connect-test',
    module: 'connect-test',
    displayName: 'Testowanie',
    icon: '🧪',
    params: ['method', 'section'],
    children: [
      {
        path: '/connect-test/rfid',
        module: 'connect-test',
        displayName: 'Test RFID'
      },
      {
        path: '/connect-test/search',
        module: 'connect-test',
        displayName: 'Wyszukiwanie Urządzeń'
      },
      {
        path: '/connect-test/list',
        module: 'connect-test',
        displayName: 'Lista Urządzeń'
      }
    ]
  },
  'connect-data': {
    path: '/connect-data',
    module: 'connect-data',
    displayName: 'ConnectData',
    icon: '📊',
    params: ['object', 'action'],
    children: [
      {
        path: '/connect-data/users',
        module: 'connect-data',
        displayName: 'Użytkownicy'
      },
      {
        path: '/connect-data/devices',
        module: 'connect-data',
        displayName: 'Urządzenia'
      },
      {
        path: '/connect-data/test-scenarios',
        module: 'connect-data',
        displayName: 'Scenariusze Testowe'
      },
      {
        path: '/connect-data/groups',
        module: 'connect-data',
        displayName: 'Grupy'
      },
      {
        path: '/connect-data/warehouses',
        module: 'connect-data',
        displayName: 'Magazyny'
      },
      {
        path: '/connect-data/clients',
        module: 'connect-data',
        displayName: 'Klienci'
      }
    ]
  },
  'connect-workshop': {
    path: '/connect-workshop',
    module: 'connect-workshop',
    displayName: 'ConnectWorkshop',
    icon: '🔧',
    params: ['section', 'action'],
    children: [
      {
        path: '/connect-workshop/requests',
        module: 'connect-workshop',
        displayName: 'Zgłoszenia'
      },
      {
        path: '/connect-workshop/services',
        module: 'connect-workshop',
        displayName: 'Serwisy'
      }
    ]
  },
  'connect-config': {
    path: '/connect-config',
    module: 'connect-config',
    displayName: 'ConnectConfig',
    icon: '⚙️',
    params: ['section'],
    children: [
      {
        path: '/connect-config/system',
        module: 'connect-config',
        displayName: 'Konfiguracja Systemu'
      },
      {
        path: '/connect-config/network',
        module: 'connect-config',
        displayName: 'Konfiguracja Sieci'
      },
      {
        path: '/connect-config/devices',
        module: 'connect-config',
        displayName: 'Konfiguracja Urządzeń'
      },
      {
        path: '/connect-config/security',
        module: 'connect-config',
        displayName: 'Bezpieczeństwo'
      },
      {
        path: '/connect-config/backup',
        module: 'connect-config',
        displayName: 'Backup i Przywracanie'
      }
    ]
  },
  'connect-reports': {
    path: '/connect-reports',
    module: 'connect-reports',
    displayName: 'Raporty',
    icon: '📋',
    params: ['type', 'period']
  },
  'connect-manager': {
    path: '/connect-manager',
    module: 'connect-manager',
    displayName: 'Manager',
    icon: '📋',
    params: ['action'],
    children: [
      {
        path: '/connect-manager/scenarios',
        module: 'connect-manager',
        displayName: 'Scenariusze Testu'
      },
      {
        path: '/connect-manager/activities',
        module: 'connect-manager',
        displayName: 'Czynności'
      },
      {
        path: '/connect-manager/test-types',
        module: 'connect-manager',
        displayName: 'Rodzaj Testu'
      }
    ]
  }
};

export function getRoute(path: string): RouteDefinition | undefined {
  return Object.values(ROUTE_REGISTRY).find(route =>
    route.path === path || route.children?.some(child => child.path === path)
  );
}

export function getRoutesByModule(moduleName: string): RouteDefinition[] {
  return Object.values(ROUTE_REGISTRY).filter(route => route.module === moduleName);
}

export function getAllRoutes(): RouteDefinition[] {
  return Object.values(ROUTE_REGISTRY);
}

export function buildUrl(routePath: string, params?: Record<string, string>): string {
  let url = `#${routePath}`;

  if (params) {
    const paramValues = Object.values(params).filter(Boolean);
    if (paramValues.length > 0) {
      url += '/' + paramValues.join('/');
    }
  }

  return url;
}
