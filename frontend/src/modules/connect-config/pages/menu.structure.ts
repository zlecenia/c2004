// frontend/src/modules/connect-config/pages/menu.structure.ts

export interface MenuItem {
  id: string;
  name: string;
  icon?: string;
  level: 1 | 2 | 3;
  parentId?: string;
  component?: any;
  pageClass?: string; // Class name for the page component
  route?: string; // URL route for this menu item
  children?: MenuItem[];
  active?: boolean;
}

export class ConnectConfigMenuStructure {
  private menuItems: MenuItem[] = [];

  constructor() {
    this.initializeMenuStructure();
  }

  private initializeMenuStructure(): void {
    this.menuItems = [
      // Level 1 - Main categories
      {
        id: 'connect-config',
        name: 'Connect Config',
        icon: '⚙️',
        level: 1,
        active: true,
        children: [
          // Level 2 - Category groups
          {
            id: 'system-category',
            name: 'System',
            icon: '🖥️',
            level: 2,
            parentId: 'connect-config',
            active: true,
            children: [
              // Level 3 - Specific sections
              { id: 'settings', name: 'Ustawienia', level: 3, parentId: 'system-category', active: true, route: '/connect-config/system/settings', pageClass: 'SystemSettingsPage' },
              { id: 'network', name: 'Sieć', level: 3, parentId: 'system-category', route: '/connect-config/system/network', pageClass: 'NetworkPage' },
              { id: 'performance', name: 'Wydajność', level: 3, parentId: 'system-category', route: '/connect-config/system/performance', pageClass: 'PerformancePage' },
              { id: 'monitoring', name: 'Monitoring', level: 3, parentId: 'system-category', route: '/connect-config/system/monitoring', pageClass: 'MonitoringPage' },
              { id: 'logs', name: 'Logi Systemowe', level: 3, parentId: 'system-category', route: '/connect-config/system/logs', pageClass: 'LogsPage' },
              { id: 'updates', name: 'Aktualizacje', level: 3, parentId: 'system-category', route: '/connect-config/system/updates', pageClass: 'UpdatesPage' },
              { id: 'diagnostics', name: 'Diagnostyka', level: 3, parentId: 'system-category', route: '/connect-config/system/diagnostics', pageClass: 'DiagnosticsPage' },
              { id: 'maintenance', name: 'Konserwacja', level: 3, parentId: 'system-category', route: '/connect-config/system/maintenance', pageClass: 'MaintenancePage' }
            ]
          },
          {
            id: 'devices-category',
            name: 'Devices',
            icon: '📡',
            level: 2,
            parentId: 'connect-config',
            children: [
              // Level 3 - Device specific sections
              { id: 'rfid-config', name: 'RFID Reader', level: 3, parentId: 'devices-category', route: '/connect-config/devices/rfid-config', pageClass: 'RfidConfigPage' },
              { id: 'qr-config', name: 'QR Scanner', level: 3, parentId: 'devices-category', route: '/connect-config/devices/qr-config', pageClass: 'QrConfigPage' },
              { id: 'barcode-config', name: 'Barcode Scanner', level: 3, parentId: 'devices-category', route: '/connect-config/devices/barcode-config', pageClass: 'BarcodeConfigPage' },
              { id: 'sensors', name: 'Sensory', level: 3, parentId: 'devices-category', route: '/connect-config/devices/sensors', pageClass: 'SensorsPage' },
              { id: 'io-ports', name: 'Porty I/O', level: 3, parentId: 'devices-category', route: '/connect-config/devices/io-ports', pageClass: 'IoPortsPage' },
              { id: 'power', name: 'Zasilanie', level: 3, parentId: 'devices-category', route: '/connect-config/devices/power', pageClass: 'PowerPage' },
              { id: 'storage', name: 'Magazyn', level: 3, parentId: 'devices-category', route: '/connect-config/devices/storage', pageClass: 'StoragePage' },
              { id: 'calibration', name: 'Kalibracja', level: 3, parentId: 'devices-category', route: '/connect-config/devices/calibration', pageClass: 'CalibrationPage' }
            ]
          },
          {
            id: 'security-category',
            name: 'Security',
            icon: '🔒',
            level: 2,
            parentId: 'connect-config',
            children: [
              // Level 3 - Security specific sections
              { id: 'security-settings', name: 'Ustawienia', level: 3, parentId: 'security-category', route: '/connect-config/security/settings', pageClass: 'SecuritySettingsPage' },
              { id: 'users', name: 'Użytkownicy', level: 3, parentId: 'security-category', route: '/connect-config/security/users', pageClass: 'UsersPage' },
              { id: 'permissions', name: 'Uprawnienia', level: 3, parentId: 'security-category', route: '/connect-config/security/permissions', pageClass: 'PermissionsPage' },
              { id: 'backup', name: 'Backup', level: 3, parentId: 'security-category', route: '/connect-config/security/backup', pageClass: 'BackupPage' },
              { id: 'labels', name: 'Etykiety', level: 3, parentId: 'security-category', route: '/connect-config/security/labels', pageClass: 'LabelsPage' },
              { id: 'reports', name: 'Raporty', level: 3, parentId: 'security-category', route: '/connect-config/security/reports', pageClass: 'ReportsPage' }
            ]
          }
        ]
      }
    ];
  }

  public getMenuStructure(): MenuItem[] {
    return this.menuItems;
  }

  public getLevel1Items(): MenuItem[] {
    return this.menuItems.filter(item => item.level === 1);
  }

  public getLevel2Items(parentId: string): MenuItem[] {
    const parent = this.findItemById(parentId);
    return parent?.children?.filter(item => item.level === 2) || [];
  }

  public getLevel3Items(parentId: string): MenuItem[] {
    const parent = this.findItemById(parentId);
    return parent?.children?.filter(item => item.level === 3) || [];
  }

  public findItemById(id: string): MenuItem | null {
    const findRecursive = (items: MenuItem[]): MenuItem | null => {
      for (const item of items) {
        if (item.id === id) {
          return item;
        }
        if (item.children) {
          const found = findRecursive(item.children);
          if (found) return found;
        }
      }
      return null;
    };

    return findRecursive(this.menuItems);
  }

  public setActiveItem(id: string): void {
    const resetActive = (items: MenuItem[]): void => {
      items.forEach(item => {
        item.active = false;
        if (item.children) {
          resetActive(item.children);
        }
      });
    };

    const setActive = (targetId: string): void => {
      const item = this.findItemById(targetId);
      if (item) {
        item.active = true;
        
        // Also activate parent items
        if (item.parentId) {
          setActive(item.parentId);
        }
      }
    };

    resetActive(this.menuItems);
    setActive(id);
  }

  public getRouteForItem(id: string): string | null {
    const item = this.findItemById(id);
    return item?.route || null;
  }

  public findItemByRoute(route: string): MenuItem | null {
    const findRecursive = (items: MenuItem[]): MenuItem | null => {
      for (const item of items) {
        if (item.route === route) {
          return item;
        }
        if (item.children) {
          const found = findRecursive(item.children);
          if (found) return found;
        }
      }
      return null;
    };

    return findRecursive(this.menuItems);
  }

  public renderLevel1Menu(): string {
    const level1Items = this.getLevel1Items();
    
    return `
      <div class="menu-level-1">
        ${level1Items.map(item => `
          <div class="menu-item level-1 ${item.active ? 'active' : ''}" data-menu-id="${item.id}">
            <span class="menu-icon">${item.icon || '📋'}</span>
            <span class="menu-label">${item.name}</span>
            <span class="menu-arrow">▼</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  public renderLevel2Menu(parentId: string): string {
    const level2Items = this.getLevel2Items(parentId);
    
    return `
      <div class="menu-level-2" data-parent="${parentId}">
        ${level2Items.map(item => `
          <div class="menu-item level-2 ${item.active ? 'active' : ''}" data-menu-id="${item.id}">
            <span class="menu-icon">${item.icon || '📄'}</span>
            <span class="menu-label">${item.name}</span>
            <span class="menu-arrow">▶</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  public renderLevel3Menu(parentId: string): string {
    const level3Items = this.getLevel3Items(parentId);
    
    return `
      <div class="menu-level-3" data-parent="${parentId}">
        ${level3Items.map(item => `
          <div class="menu-item level-3 ${item.active ? 'active' : ''}" data-menu-id="${item.id}">
            <span class="menu-label">${item.name}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  public getMenuStyles(): string {
    return `
      /* 3-Level Menu Structure Styles */
      .menu-level-1,
      .menu-level-2,
      .menu-level-3 {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .menu-item {
        display: flex;
        align-items: center;
        padding: 8px 12px;
        cursor: pointer;
        border-radius: 4px;
        transition: all 0.2s ease;
        font-size: 12px;
        color: #333;
      }

      .menu-item:hover {
        background: #f0f9ff;
        color: #0066cc;
      }

      .menu-item.active {
        background: #e6f3ff;
        color: #0066cc;
        font-weight: 600;
      }

      /* Level-specific styling */
      .menu-item.level-1 {
        background: #1e40af;
        color: white;
        font-weight: 600;
        font-size: 13px;
        padding: 10px 15px;
      }

      .menu-item.level-1:hover {
        background: #1d4ed8;
      }

      .menu-item.level-1.active {
        background: #2563eb;
      }

      .menu-item.level-2 {
        background: #f8fafc;
        border-left: 3px solid #e2e8f0;
        margin-left: 15px;
        font-weight: 500;
      }

      .menu-item.level-2.active {
        border-left-color: #0066cc;
        background: #e6f3ff;
      }

      .menu-item.level-3 {
        background: #ffffff;
        border-left: 2px solid #f1f5f9;
        margin-left: 30px;
        padding-left: 20px;
        font-size: 11px;
      }

      .menu-item.level-3.active {
        border-left-color: #0066cc;
        background: #f0f9ff;
      }

      /* Menu icons and arrows */
      .menu-icon {
        margin-right: 8px;
        font-size: 14px;
      }

      .menu-label {
        flex: 1;
      }

      .menu-arrow {
        margin-left: 8px;
        font-size: 10px;
        opacity: 0.7;
      }

      .menu-item.level-3 .menu-arrow {
        display: none;
      }

      /* Responsive behavior */
      @media (max-width: 768px) {
        .menu-item {
          padding: 6px 10px;
          font-size: 11px;
        }

        .menu-item.level-1 {
          font-size: 12px;
          padding: 8px 12px;
        }
      }
    `;
  }
}
