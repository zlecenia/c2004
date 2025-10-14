// frontend/src/modules/connect-config/pages/example.usage.ts

/**
 * Example usage of the 3-level Connect Config menu structure
 * 
 * This file shows how to use the new menu system that was created from
 * the moved category components.
 */

import { ConnectConfigMenuPageManager } from './index';

// Example 1: Basic initialization
export function initializeConnectConfigMenu(containerId: string): ConnectConfigMenuPageManager {
  const container = document.getElementById(containerId);
  if (!container) {
    throw new Error(`Container with id '${containerId}' not found`);
  }

  const pageManager = new ConnectConfigMenuPageManager();
  pageManager.initialize(container);
  
  return pageManager;
}

// Example 2: Setting active menu items programmatically
export function navigateToSpecificSection() {
  const pageManager = initializeConnectConfigMenu('connect-config-container');
  
  // Navigate to Security > Users section
  pageManager.setActiveMenuItem('connect-config', 'security-category', 'users');
  
  // Or navigate to Devices > RFID Config section
  pageManager.setActiveMenuItem('connect-config', 'devices-category', 'rfid-config');
}

// Example 3: Getting current active item
export function getCurrentNavigation() {
  const pageManager = initializeConnectConfigMenu('connect-config-container');
  const currentItem = pageManager.getCurrentActiveItem();
  
  console.log('Current navigation:', {
    category: currentItem.level1,     // 'connect-config'
    section: currentItem.level2,      // 'system-category', 'devices-category', or 'security-category'
    subsection: currentItem.level3    // specific subsection like 'users', 'rfid-config', etc.
  });
  
  return currentItem;
}

// Example 4: Complete HTML setup
export function createConnectConfigHTML(): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Connect Config - 3-Level Menu</title>
      <style>
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        #connect-config-container {
          width: 100%;
          height: 100vh;
        }
      </style>
    </head>
    <body>
      <div id="connect-config-container">
        <!-- The menu controller will render its content here -->
      </div>
      
      <script>
        // Initialize the 3-level menu
        import('./example.usage.js').then(module => {
          const pageManager = module.initializeConnectConfigMenu('connect-config-container');
          console.log('Connect Config menu initialized successfully');
        });
      </script>
    </body>
    </html>
  `;
}

/**
 * Menu Structure Overview:
 * 
 * Level 1: Connect Config (main category)
 * │
 * ├── Level 2: System Category
 * │   ├── Level 3: System
 * │   ├── Level 3: Sieć (Network)
 * │   ├── Level 3: Wydajność (Performance)
 * │   ├── Level 3: Monitoring
 * │   ├── Level 3: Logi Systemowe (System Logs)
 * │   ├── Level 3: Aktualizacje (Updates)
 * │   ├── Level 3: Diagnostyka (Diagnostics)
 * │   └── Level 3: Konserwacja (Maintenance)
 * │
 * ├── Level 2: Devices Category
 * │   ├── Level 3: RFID Reader
 * │   ├── Level 3: QR Scanner
 * │   ├── Level 3: Barcode Scanner
 * │   ├── Level 3: Sensory (Sensors)
 * │   ├── Level 3: Porty I/O (I/O Ports)
 * │   ├── Level 3: Zasilanie (Power)
 * │   ├── Level 3: Magazyn (Storage)
 * │   └── Level 3: Kalibracja (Calibration)
 * │
 * └── Level 2: Security Category
 *     ├── Level 3: Bezpieczeństwo (Security)
 *     ├── Level 3: Użytkownicy (Users)
 *     ├── Level 3: Uprawnienia (Permissions)
 *     ├── Level 3: Backup
 *     ├── Level 3: Etykiety (Labels)
 *     └── Level 3: Raporty (Reports)
 */

// Example 5: Event handling for menu interactions
export function setupCustomEventHandlers(pageManager: ConnectConfigMenuPageManager) {
  const menuController = pageManager.getMenuController();
  
  if (menuController) {
    // You can add custom event listeners or override behavior here
    console.log('Menu controller available for custom event handling');

    // Example: Listen for section changes
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      
      if (target.classList.contains('section-item')) {
        const sectionId = target.dataset.section;
        console.log(`Section clicked: ${sectionId}`);
        
        // Custom handling for specific sections
        if (sectionId === 'backup') {
          console.log('Backup section accessed - could trigger backup status check');
        } else if (sectionId === 'rfid-config') {
          console.log('RFID config accessed - could check RFID device status');
        }
      }
    });
  }
}
