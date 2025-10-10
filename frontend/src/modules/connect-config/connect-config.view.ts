import { ConnectConfigModule } from './connect - config.module';
import { IconComponent } from '../../components / icon.component';
import { SystemCategoryComponent } from './system - category.component';
import { DevicesCategoryComponent } from './devices - category.component';
import { SecurityCategoryComponent } from './security - category.component';

export class ConnectConfigView {
  private currentCategory: string = 'system';
  private currentSection: string = 'system';
  private currentSubSection: string = '';
  private systemComponent: SystemCategoryComponent;
  private devicesComponent: DevicesCategoryComponent;
  private securityComponent: SecurityCategoryComponent;

  constructor(_module: ConnectConfigModule) {
    // module parameter used for future implementations
    this.systemComponent = new SystemCategoryComponent();
    this.devicesComponent = new DevicesCategoryComponent();
    this.securityComponent = new SecurityCategoryComponent();
  }

  render(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'connect - config - layout';

    // Update top - bar submenu;
    const submenu = document.getElementById('top - bar - submenu');
    if (submenu) submenu.textContent = '⚙️ Configuration Module';

    // Update top - bar section title;
    const sectionTitle = document.getElementById('top - bar - section - title');
    if (sectionTitle) sectionTitle.textContent = 'ConnectConfig - Konfiguracja Systemu';

    container.innerHTML = `
      <div class="config - layout">
        <!-- Column 1: Main Categories -->
        <div class="menu - column">
          <h3 class="column - title">Kategorie</h3>
          <button class="category - item active" data - category="system">
            <span class="menu - icon">${IconComponent.render('monitor', { size: 18 })}</span>
            <span class="menu - label">System & Sieć</span>
          </button>
          <button class="category - item" data - category="devices">
            <span class="menu - icon">${IconComponent.render('smartphone', { size: 18 })}</span>
            <span class="menu - label">Urządzenia</span>
          </button>
          <button class="category - item" data - category="security">
            <span class="menu - icon">${IconComponent.render('lock', { size: 18 })}</span>
            <span class="menu - label">Bezpieczeństwo</span>
          </button>
        </div>

        <!-- Column 2: Subcategories (shown based on category) -->
        <div class="menu - column" id="subcategory - column">
          <h3 class="column - title" id="subcategory - title">System & Sieć</h3>
          ${this.systemComponent.render()}
          ${this.devicesComponent.render()}
          ${this.securityComponent.render()}
        </div>

        <!-- Column 3: Main Content -->
        <div class="main - content">
          <div class="content - body">
            ${this.systemComponent.renderContent()}
            ${this.devicesComponent.renderContent()}
            ${this.securityComponent.renderContent()}

          </div>
        </div>

        <!-- Enhanced Status & Info Panel -->
        <div class="right - panel">

          <div class="info - section">
            <h3 class="status - title">ℹ️ Informacje</h3>
            <div class="info - item">
              <div class="info - label">Wersja systemu:</div>
              <div class="info - value">ConnectDisplay v2.0.4</div>
            </div>
            <div class="info - item">
              <div class="info - label">Ostatni backup:</div>
              <div class="info - value">2025 - 10 - 09 14:30</div>
            </div>
            <div class="info - item">
              <div class="info - label">Uptime:</div>
              <div class="info - value">2d 14h 23m</div>
            </div>
            <div class="info - item">
              <div class="info - label">Aktywni użytkownicy:</div>
              <div class="info - value">3 osoby</div>
            </div>
          </div>

        </div>
      </div>
    `;

    this.addStyles();
    this.setupEventListeners(container);
    return container;
  }

  private addStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      .connect - config - layout { height: 100%; overflow: hidden; }
      .config - layout { display: flex; height: 365px; background: #f5f5f5; }

      /* Component Styles */
      ${this.systemComponent.getStyles()}
      ${this.devicesComponent.getStyles()}
      ${this.securityComponent.getStyles()}

      .menu - column { width: 120px; background: #2a2a2a; padding: 8px; overflow - y: auto; flex - shrink: 0; border - right: 1px solid #1a1a1a; }
      .column - title { color: #FFF; font - size: 10px; font - weight: 600; text - transform: uppercase; margin: 0 0 8px 0; padding: 4px; text - align: center; background: #1a1a1a; border - radius: 3px; }
      .section - item { width: 100%; background: #3a3a3a; border: none; padding: 5px; margin - bottom: 4px; border - radius: 5px; cursor: pointer; display: flex; flex - direction: column; align - items: center; gap: 4px; transition: all 0.2s; color: #ccc; }
      .section - item:hover { background: #4a4a4a; color: white; }
      .section - item.active { background: linear - gradient(135deg, #28a745 0%, #20c997 100%); color: white; }

      /* Compact menu items (no icons) */
      .section - item.compact {
        padding: 4px 8px;
        margin - bottom: 2px;
        display: flex;
        align - items: center;
        justify - content: center;
        min - height: 28px;
      }
      .section - item.compact .menu - label {
        font - size: 11px;
        font - weight: 600;
        text - align: center;
        line - height: 1.2;
      }

      /* Category items */
      .category - item {
        width: 100%;
        background: #3a3a3a;
        border: none;
        padding: 3px 4px;
        margin - bottom: 4px;
        border - radius: 5px;
        cursor: pointer;
        display: flex;
        flex - direction: column;
        align - items: center;
        gap: 4px;
        transition: all 0.2s;
        color: #ccc;
      }
      .category - item:hover { background: #4a4a4a; color: white; }
      .category - item.active { background: linear - gradient(135deg, #007bff 0%, #0056b3 100%); color: white; }

      /* Subcategory groups */
      .subcategory - group { display: none; }
      .subcategory - group.active { display: block; }
      .menu - icon { font - size: 13px; }
      .menu - label { font - size: 12px; font - weight: 500; text - align: center; }
      .main - content { flex: 1; display: flex; flex - direction: row; background: white; overflow: hidden; }
      .content - body { flex: 1; max - width: 700px; padding: 10px; overflow - y: auto; border - right: 1px solid #e0e0e0; }
      .right - panel { width: 240px; background: #f8f9fa; padding: 12px; overflow - y: auto; flex - shrink: 0; border - left: 1px solid #e0e0e0; }

      .section - content { display: none; }
      .section - content.active { display: block; }

      .config - form { background: #f8f9fa; padding: 12px; border - radius: 8px; }
      .config - form h4 { margin: 0 0 12px 0; font - size: 14px; color: #333; font - weight: 600; }
      .form - section { margin - bottom: 15px; padding - bottom: 12px; border - bottom: 1px solid #e0e0e0; }
      .form - section:last - child { border - bottom: none; }
      .form - section h5 { margin: 0 0 10px 0; font - size: 12px; color: #333; font - weight: 600; }
      .form - row { display: flex; gap: 15px; flex - wrap: wrap; }
      .form - group { display: flex; flex - direction: column; gap: 4px; min - width: 150px; flex: 1; }
      .form - group label { font - size: 11px; color: #666; font - weight: 500; }
      .form - input, .form - select { padding: 6px 8px; border: 1px solid #ddd; border - radius: 4px; font - size: 11px; background: white; }
      .form - input:focus, .form - select:focus { outline: none; border - color: #007bff; }
      .form - actions { display: flex; gap: 8px; justify - content: flex - start; margin - top: 15px; }
      .btn - save, .btn - test, .btn - export, .btn - add, .btn - restart { padding: 6px 12px; border: none; border - radius: 4px; cursor: pointer; font - size: 11px; font - weight: 600; transition: all 0.2s; }
      .btn - save { background: #28a745; color: white; }
      .btn - test { background: #17a2b8; color: white; }
      .btn - export { background: #ffc107; color: #333; }
      .btn - add { background: #007bff; color: white; }
      .btn - restart { background: #dc3545; color: white; }

        .btn - save:hover,
        .btn - test:hover,
        .btn - export:hover,
        .btn - add:hover,
        .btn - restart:hover { transform: translateY(-1px); }

      /* Status badges */
      .status - badge { padding: 2px 6px; border - radius: 10px; font - size: 9px; font - weight: 600; }
      .status - badge.online { background: #d1e7dd; color: #0f5132; }
      .status - badge.offline { background: #f8d7da; color: #842029; }

      /* Action buttons */
      .btn - action { padding: 4px 6px; margin: 0 2px; background: #6c757d; color: white; border: none; border - radius: 3px; cursor: pointer; font - size: 10px; }
      .btn - action:hover { background: #5a6268; }

      /* Info Section */
      .info - section { margin - bottom: 15px; }
      .info - item { background: white; padding: 8px; margin - bottom: 4px; border - radius: 4px; border: 1px solid #e0e0e0; }
      .info - label { font - size: 9px; color: #666; font - weight: 500; text - transform: uppercase; }
      .info - value { font - size: 11px; color: #333; font - weight: 600; margin - top: 2px; }

      .status - section { margin - bottom: 15px; }
      .status - title { color: #333; font - size: 11px; font - weight: 600; margin: 0 0 10px 0; padding: 8px; background: #e9ecef; border - radius: 4px; text - align: center; }
    `;
    document.head.appendChild(style);
  }

  private setupEventListeners(container: HTMLElement): void {
    // // console
      
        .log('🔧 ConnectConfig: Setting up event listeners'); // Auto - commented by lint - fix // Auto - commented by lint - fix

    // Setup component event listeners
    this.systemComponent.setupEventListeners(container);
    this.devicesComponent.setupEventListeners(container);
    this.securityComponent.setupEventListeners(container);

    // Category navigation (Level 1);
    const categoryItems = container.querySelectorAll('[data - category]');
    // console
      .log(`🔧 ConnectConfig: Found ${categoryItems
      .length} category buttons`); // Auto - commented by lint - fix

    categoryItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const category = target.getAttribute('data - category');
        // // console
          
            .log(`🔧 ConnectConfig: Category clicked: ${category}`); // Auto - commented by lint - fix // Auto - commented by lint - fix;
        if (category) this.switchCategory(category, container);
      });
    });

    // Section navigation (Level 2);
    const sectionItems = container.querySelectorAll('[data - section]');
    // // console
      .log(`🔧 ConnectConfig: Found ${sectionItems
      .length} section buttons`); // Auto - commented by lint - fix // Auto - commented by lint - fix

    sectionItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const section = target.getAttribute('data - section');
        // // console
          
            .log(`🔧 ConnectConfig: Section clicked: ${section}`); // Auto - commented by lint - fix // Auto - commented by lint - fix;
        if (section) this.switchSection(section, container);
      });
    });

  }

  private switchCategory(category: string, container: HTMLElement): void {
    // // console
      
        .log(`🔧 ConnectConfig: Switching to category: ${category}`); // Auto - commented by lint - fix // Auto - commented by lint - fix
    this.currentCategory = category;

    // Update category active state
    container.querySelectorAll('[data - category]').forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data - category') === category) item.classList.add('active');
    });

    // Show / hide subcategory groups
    container.querySelectorAll('.subcategory - group').forEach(group => {
      group.classList.remove('active');
      (group as HTMLElement).style.display = 'none';
    });

    const activeGroup = container.querySelector(`#${category}-subcategories`);
    if (activeGroup) {
      activeGroup.classList.add('active');
      (activeGroup as HTMLElement).style.display = 'block';
    }

    // Update subcategory column title;
    const titles: any = {
      'system': 'System & Sieć',
      'devices': 'Urządzenia',
      'security': 'Bezpieczeństwo'
    };

    const subcategoryTitle = container.querySelector('#subcategory - title');
    if (subcategoryTitle) subcategoryTitle.textContent = titles[category];

    // Set default section for category and switch to it (only if not switching to specific section);
    if (this.currentSection === 'system' || !this.currentSection) {
      const defaultSections: any = {
        'system': 'system',
        'devices': 'rfid - config',
        'security': 'security'
      };

      const defaultSection = defaultSections[category];
      if (defaultSection) {
        this.switchSection(defaultSection, container);
      }
    }
  }

  private switchSection(section: string, container: HTMLElement): void {
    // // console
      
        .log(`🔧 ConnectConfig: Switching to section: ${section}`); // Auto - commented by lint - fix // Auto - commented by lint - fix
    this.currentSection = section;
    this.currentSubSection = ''; // Reset subsection

    // Update URL hash with section;
    const currentHash = window.location.hash.slice(2); // Remove '#/';
    const [moduleName] = currentHash.split('/');
    window.location.hash = `#/${moduleName}/${section}`;
    // // console
      .log(`🔧 ConnectConfig: Updated URL to: ${window
      .location
      .hash}`); // Auto - commented by lint - fix // Auto - commented by lint - fix

    // Determine which category this section belongs to and update category state;
    const sectionToCategory: any = {
      'system': 'system', 'network': 'system', 'performance': 'system', 'monitoring': 'system',
      'logs': 'system', 'updates': 'system', 'diagnostics': 'system', 'maintenance': 'system',
      'devices': 'devices', 'rfid - config': 'devices', 'qr - config': 'devices', 'barcode - config': 'devices',
      'sensors': 'devices', 'io - ports': 'devices', 'power': 'devices', 'storage': 'devices', 'calibration': 'devices',
      'security': 'security', 'users': 'security', 'permissions': 'security',
      'backup': 'security', 'labels': 'security', 'reports': 'security'
    };

    const categoryForSection = sectionToCategory[section];
    if (categoryForSection && categoryForSection !== this.currentCategory) {
      this.switchCategory(categoryForSection, container);
      return; // switchCategory will call switchSection again with proper setup
    }

    // Update section active state (only in the current category's subcategory group);
    const currentSubcategoryGroup = container.querySelector(`#${this.currentCategory}-subcategories`);
    if (currentSubcategoryGroup) {
      currentSubcategoryGroup.querySelectorAll('[data - section]').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data - section') === section) item.classList.add('active');
      });
    }

    // Hide all sections
    container.querySelectorAll('.section - content').forEach(content => {
      content.classList.remove('active');
    });

    // Show selected section;
    const activeContent = container.querySelector(`#${section}-content`);
    if (activeContent) {
      activeContent.classList.add('active');
    }

    // Update top - bar title;
    const titles: any = {
      'system': 'System',
      'network': 'Sieć',
      'performance': 'Wydajność',
      'monitoring': 'Monitoring',
      'logs': 'Logi Systemowe',
      'updates': 'Aktualizacje',
      'diagnostics': 'Diagnostyka',
      'maintenance': 'Konserwacja',
      'time - sync': 'Synchronizacja',
      'system - info': 'Info Systemu',
      'devices': 'Urządzenia',
      'rfid - config': 'RFID Reader',
      'qr - config': 'QR Scanner',
      'barcode - config': 'Barcode Scanner',
      'sensors': 'Sensory',
      'io - ports': 'Porty I / O',
      'power': 'Zasilanie',
      'storage': 'Magazyn',
      'calibration': 'Kalibracja',
      'hardware - test': 'Test Hardware',
      'security': 'Bezpieczeństwo',
      'users': 'Użytkownicy',
      'permissions': 'Uprawnienia',
      'backup': 'Backup',
      'labels': 'Etykiety',
      'reports': 'Raporty'
    };

    const topBarTitle = document.getElementById('top - bar - section - title');
    if (topBarTitle) topBarTitle.textContent = `ConnectConfig - ${titles[section]}`;
  }

  // Public method for URL routing support
  public setInitialSection(section: string): void {
    // // console
      
        .log(`🔧 ConnectConfig: Setting initial section from URL: ${section}`); // Auto - commented by lint - fix // Auto - commented by lint - fix;
    const container = document.querySelector('.connect - config - layout');
    if (container) {
      this.switchSection(section, container as HTMLElement);
    }
  }
}
