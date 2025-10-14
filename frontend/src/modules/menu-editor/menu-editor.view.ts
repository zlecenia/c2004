// frontend/src/modules/menu-editor/menu-editor.view.ts

import { MenuEditorModule } from './menu-editor.module';
import { getMenuManager } from '../../components/connect-menu';
import { MenuConfiguration, MenuItem, MenuColumn, RouteMenuMapping } from '../../components/connect-menu/menu.interfaces';

export class MenuEditorView {
  private currentEditingModule: string | null = null;
  private currentConfig: MenuConfiguration | null = null;
  private routeMappings: RouteMenuMapping[] = [];

  constructor(_module: MenuEditorModule) {}

  render(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'menu-editor-container';
    
    // Update top-bar
    this.updateTopBar();
    
    // Load current configuration
    this.loadConfiguration();
    
    container.innerHTML = `
      <div class="menu-editor-layout">
        <!-- Left Panel: Module Selector -->
        <div class="editor-sidebar">
          <div class="sidebar-header">
          </div>
          
          <div class="module-list">
            <h3>Moduły</h3>
            <div id="module-selector">
              ${this.renderModuleList()}
            </div>
          </div>
          
          <div class="actions">
            <button id="save-config" class="btn-primary">💾 Zapisz zmiany</button>
            <button id="reset-config" class="btn-secondary">🔄 Reset do domyślnych</button>
            <button id="export-config" class="btn-secondary">📥 Eksportuj JSON</button>
            <button id="import-config" class="btn-secondary">📤 Importuj JSON</button>
          </div>
        </div>
        
        <!-- Main Panel: Menu Editor -->
        <div class="editor-main">
          <div class="editor-header">
            <h2 id="current-module-title">Wybierz moduł</h2>
            <div class="editor-tabs">
              <button class="tab-btn active" data-tab="structure">📋 Struktura</button>
              <button class="tab-btn" data-tab="routing">🔗 Routing</button>
              <button class="tab-btn" data-tab="preview">👁️ Podgląd</button>
            </div>
          </div>
          
          <div class="editor-content">
            <!-- Structure Tab -->
            <div id="structure-tab" class="tab-content active">
              <div id="menu-structure">
                <p class="empty-state">Wybierz moduł z listy po lewej</p>
              </div>
            </div>
            
            <!-- Routing Tab -->
            <div id="routing-tab" class="tab-content">
              <div id="routing-config">
                ${this.renderRoutingConfig()}
              </div>
            </div>
            
            <!-- Preview Tab -->
            <div id="preview-tab" class="tab-content">
              <div id="menu-preview">
                <div class="preview-container">
                  <h3>Podgląd menu</h3>
                  <div id="preview-render"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Right Panel: Properties Editor -->
        <div class="editor-properties">
          <div class="properties-header">
            <h3>Właściwości</h3>
          </div>
          <div id="properties-panel">
            <p class="empty-state">Wybierz element do edycji</p>
          </div>
        </div>
      </div>
    `;
    
    // Add styles
    this.addStyles();
    
    // Setup event listeners
    this.setupEventListeners(container);
    
    return container;
  }

  private updateTopBar(): void {
    const submenu = document.getElementById('top-bar-submenu');
    if (submenu) submenu.textContent = '🎨 Menu Editor';
    
    const sectionTitle = document.getElementById('top-bar-section-title');
    if (sectionTitle) sectionTitle.textContent = 'Wizualny Edytor Menu';
  }

  private loadConfiguration(): void {
    const menuManager = getMenuManager();
    const snapshot = menuManager.getRegistrySnapshot();
    this.routeMappings = snapshot.routeMappings;
  }

  private renderModuleList(): string {
    const modules = [
      { id: 'main-navigation', name: 'Główne Menu', icon: '🏠' },
      { id: 'connect-id', name: 'ConnectID', icon: '👤' },
      { id: 'connect-data', name: 'ConnectData', icon: '💾' },
      { id: 'connect-workshop', name: 'ConnectWorkshop', icon: '🔧' },
      { id: 'connect-reports', name: 'ConnectReports', icon: '📊' },
      { id: 'connect-test', name: 'ConnectTest', icon: '🧪' },
      { id: 'connect-manager', name: 'ConnectManager', icon: '🎯' },
      { id: 'connect-config', name: 'ConnectConfig', icon: '⚙️' }
    ];

    return modules.map(mod => `
      <div class="module-item" data-module="${mod.id}">
        <span class="module-icon">${mod.icon}</span>
        <span class="module-name">${mod.name}</span>
        <span class="edit-icon">✏️</span>
      </div>
    `).join('');
  }

  private renderRoutingConfig(): string {
    return `
      <div class="routing-table">
        <h3>Mapowanie Tras</h3>
        <table>
          <thead>
            <tr>
              <th>Route</th>
              <th>Menu ID</th>
              <th>Active Items</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody id="routing-table-body">
            ${this.routeMappings.map((mapping, idx) => `
              <tr data-index="${idx}">
                <td><input type="text" value="${mapping.route}" class="route-input"></td>
                <td><input type="text" value="${mapping.menuId}" class="menu-id-input"></td>
                <td><input type="text" value="${(mapping.activeItems || []).join(', ')}" class="active-items-input"></td>
                <td>
                  <button class="btn-icon delete-route" data-index="${idx}">🗑️</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <button id="add-route" class="btn-secondary">➕ Dodaj trasę</button>
      </div>
    `;
  }

  private renderMenuStructure(config: MenuConfiguration): string {
    return `
      <div class="menu-config">
        <div class="config-header">
          <h3>${config.id}</h3>
          <div class="config-meta">
            <span>Typ: ${config.type}</span>
            <span>Theme: ${config.theme || 'dark'}</span>
          </div>
        </div>
        
        <div class="columns-list">
          ${config.columns.map((col, colIdx) => this.renderColumn(col, colIdx)).join('')}
        </div>
        
        <button class="btn-secondary add-column">➕ Dodaj kolumnę</button>
      </div>
    `;
  }

  private renderColumn(column: MenuColumn, colIdx: number): string {
    return `
      <div class="column-card" data-col-index="${colIdx}">
        <div class="column-header">
          <div class="column-title">
            <span class="drag-handle">⋮⋮</span>
            <strong>${column.title}</strong>
            <span class="column-id">(${column.id})</span>
          </div>
          <div class="column-actions">
            <button class="btn-icon edit-column" data-col-index="${colIdx}">✏️</button>
            <button class="btn-icon delete-column" data-col-index="${colIdx}">🗑️</button>
          </div>
        </div>
        
        <div class="column-items">
          ${column.items.map((item, itemIdx) => this.renderMenuItem(item, colIdx, itemIdx)).join('')}
        </div>
        
        <button class="btn-sm add-item" data-col-index="${colIdx}">➕ Dodaj element</button>
      </div>
    `;
  }

  private renderMenuItem(item: MenuItem, colIdx: number, itemIdx: number): string {
    return `
      <div class="menu-item-card ${item.active ? 'active' : ''}" data-col-index="${colIdx}" data-item-index="${itemIdx}">
        <div class="item-icon">${item.icon}</div>
        <div class="item-content">
          <div class="item-label">${item.label}</div>
          <div class="item-meta">
            ${item.section ? `<span class="badge">section: ${item.section}</span>` : ''}
            ${item.method ? `<span class="badge">method: ${item.method}</span>` : ''}
            ${item.action ? `<span class="badge">action: ${item.action}</span>` : ''}
          </div>
        </div>
        <div class="item-actions">
          <button class="btn-icon edit-item">✏️</button>
          <button class="btn-icon delete-item">🗑️</button>
          <button class="btn-icon move-up" ${itemIdx === 0 ? 'disabled' : ''}>⬆️</button>
          <button class="btn-icon move-down">⬇️</button>
        </div>
      </div>
    `;
  }

  private setupEventListeners(container: HTMLElement): void {
    // Module selector
    container.querySelectorAll('.module-item').forEach(item => {
      item.addEventListener('click', () => {
        const moduleId = item.getAttribute('data-module');
        if (moduleId) {
          this.loadModule(moduleId, container);
        }
      });
    });

    // Tab switching
    container.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const tabName = target.getAttribute('data-tab');
        this.switchTab(tabName, container);
      });
    });

    // Save configuration
    const saveBtn = container.querySelector('#save-config');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => this.saveConfiguration());
    }

    // Reset configuration
    const resetBtn = container.querySelector('#reset-config');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.resetConfiguration());
    }

    // Export/Import
    const exportBtn = container.querySelector('#export-config');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => this.exportConfiguration());
    }

    const importBtn = container.querySelector('#import-config');
    if (importBtn) {
      importBtn.addEventListener('click', () => this.importConfiguration());
    }
  }

  private loadModule(moduleId: string, container: HTMLElement): void {
    this.currentEditingModule = moduleId;
    
    const menuManager = getMenuManager();
    const snapshot = menuManager.getRegistrySnapshot();
    
    let config: MenuConfiguration | null = null;
    if (moduleId === 'main-navigation') {
      config = snapshot.menuRegistry.mainNavigation;
    } else {
      config = snapshot.menuRegistry.moduleColumns[moduleId];
    }
    
    if (!config) {
      console.error(`No configuration found for ${moduleId}`);
      return;
    }
    
    this.currentConfig = config;
    
    // Update UI
    const titleEl = container.querySelector('#current-module-title');
    if (titleEl) titleEl.textContent = `Edycja: ${config.id}`;
    
    const structureEl = container.querySelector('#menu-structure');
    if (structureEl) {
      structureEl.innerHTML = this.renderMenuStructure(config);
      this.attachStructureListeners(structureEl as HTMLElement);
    }
    
    // Update preview
    this.updatePreview(container);
  }

  private attachStructureListeners(container: HTMLElement): void {
    // Edit column
    container.querySelectorAll('.edit-column').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const colIdx = parseInt((e.target as HTMLElement).getAttribute('data-col-index') || '0');
        this.editColumn(colIdx);
      });
    });

    // Delete column
    container.querySelectorAll('.delete-column').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const colIdx = parseInt((e.target as HTMLElement).getAttribute('data-col-index') || '0');
        this.deleteColumn(colIdx);
      });
    });

    // Edit item
    container.querySelectorAll('.edit-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const card = (e.target as HTMLElement).closest('.menu-item-card');
        if (card) {
          const colIdx = parseInt(card.getAttribute('data-col-index') || '0');
          const itemIdx = parseInt(card.getAttribute('data-item-index') || '0');
          this.editMenuItem(colIdx, itemIdx);
        }
      });
    });

    // Delete item
    container.querySelectorAll('.delete-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const card = (e.target as HTMLElement).closest('.menu-item-card');
        if (card) {
          const colIdx = parseInt(card.getAttribute('data-col-index') || '0');
          const itemIdx = parseInt(card.getAttribute('data-item-index') || '0');
          this.deleteMenuItem(colIdx, itemIdx);
        }
      });
    });

    // Move up
    container.querySelectorAll('.move-up').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const card = (e.target as HTMLElement).closest('.menu-item-card');
        if (card) {
          const colIdx = parseInt(card.getAttribute('data-col-index') || '0');
          const itemIdx = parseInt(card.getAttribute('data-item-index') || '0');
          this.moveMenuItemUp(colIdx, itemIdx);
        }
      });
    });

    // Move down
    container.querySelectorAll('.move-down').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const card = (e.target as HTMLElement).closest('.menu-item-card');
        if (card) {
          const colIdx = parseInt(card.getAttribute('data-col-index') || '0');
          const itemIdx = parseInt(card.getAttribute('data-item-index') || '0');
          this.moveMenuItemDown(colIdx, itemIdx);
        }
      });
    });

    // Add column
    const addColBtn = container.querySelector('.add-column');
    if (addColBtn) {
      addColBtn.addEventListener('click', () => this.addColumn());
    }

    // Add item
    container.querySelectorAll('.add-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const colIdx = parseInt((e.target as HTMLElement).getAttribute('data-col-index') || '0');
        this.addMenuItem(colIdx);
      });
    });
  }

  private editColumn(colIdx: number): void {
    if (!this.currentConfig) return;
    const column = this.currentConfig.columns[colIdx];
    
    const newTitle = prompt('Tytuł kolumny:', column.title);
    if (newTitle) {
      column.title = newTitle;
      this.markAsModified();
    }
  }

  private editMenuItem(colIdx: number, itemIdx: number): void {
    if (!this.currentConfig) return;
    const item = this.currentConfig.columns[colIdx].items[itemIdx];
    
    const newLabel = prompt('Label:', item.label);
    if (newLabel) {
      item.label = newLabel;
      this.markAsModified();
    }
  }

  private addColumn(): void {
    if (!this.currentConfig) return;
    
    const newColumn: MenuColumn = {
      id: `column-${Date.now()}`,
      title: 'Nowa kolumna',
      items: []
    };
    
    this.currentConfig.columns.push(newColumn);
    this.markAsModified();
    this.refreshStructure();
  }

  private addMenuItem(colIdx: number): void {
    if (!this.currentConfig) return;
    
    const newItem: MenuItem = {
      id: `item-${Date.now()}`,
      label: 'Nowy element',
      icon: '📄',
      action: 'custom-action'
    };
    
    this.currentConfig.columns[colIdx].items.push(newItem);
    this.markAsModified();
    this.refreshStructure();
  }

  private deleteColumn(colIdx: number): void {
    if (!this.currentConfig) return;
    if (colIdx < 0 || colIdx >= this.currentConfig.columns.length) return;
    this.currentConfig.columns.splice(colIdx, 1);
    this.markAsModified();
    this.refreshStructure();
  }

  private deleteMenuItem(colIdx: number, itemIdx: number): void {
    if (!this.currentConfig) return;
    const column = this.currentConfig.columns[colIdx];
    if (!column) return;
    if (itemIdx < 0 || itemIdx >= column.items.length) return;
    column.items.splice(itemIdx, 1);
    this.markAsModified();
    this.refreshStructure();
  }

  private moveMenuItemUp(colIdx: number, itemIdx: number): void {
    if (!this.currentConfig) return;
    const column = this.currentConfig.columns[colIdx];
    if (!column) return;
    if (itemIdx <= 0 || itemIdx >= column.items.length) return;
    const items = column.items;
    [items[itemIdx - 1], items[itemIdx]] = [items[itemIdx], items[itemIdx - 1]];
    this.markAsModified();
    this.refreshStructure();
  }

  private moveMenuItemDown(colIdx: number, itemIdx: number): void {
    if (!this.currentConfig) return;
    const column = this.currentConfig.columns[colIdx];
    if (!column) return;
    if (itemIdx < 0 || itemIdx >= column.items.length - 1) return;
    const items = column.items;
    [items[itemIdx], items[itemIdx + 1]] = [items[itemIdx + 1], items[itemIdx]];
    this.markAsModified();
    this.refreshStructure();
  }

  private switchTab(tabName: string | null, container: HTMLElement): void {
    if (!tabName) return;
    
    // Update tab buttons
    container.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-tab') === tabName) {
        btn.classList.add('active');
      }
    });
    
    // Update tab content
    container.querySelectorAll('.tab-content').forEach(content => {
      content.classList.remove('active');
    });
    
    const targetTab = container.querySelector(`#${tabName}-tab`);
    if (targetTab) {
      targetTab.classList.add('active');
    }
  }

  private updatePreview(container: HTMLElement): void {
    // Render live preview of menu
    const previewEl = container.querySelector('#preview-render');
    if (previewEl && this.currentConfig) {
      previewEl.innerHTML = '<p>Podgląd w czasie rzeczywistym (w budowie)</p>';
    }
  }

  private refreshStructure(): void {
    // Reload current module view
    const mainContainer = document.querySelector('.menu-editor-container');
    if (mainContainer && this.currentEditingModule) {
      this.loadModule(this.currentEditingModule, mainContainer as HTMLElement);
    }
  }

  private markAsModified(): void {
    console.log('Configuration modified');
  }

  private saveConfiguration(): void {
    if (!this.currentConfig || !this.currentEditingModule) {
      alert('Brak konfiguracji do zapisania');
      return;
    }
    
    const menuManager = getMenuManager();
    
    if (this.currentEditingModule === 'main-navigation') {
      menuManager.updateMainNavigation(this.currentConfig);
    } else {
      menuManager.updateModuleMenu(this.currentEditingModule, this.currentConfig);
    }
    
    alert('✅ Konfiguracja zapisana!');
  }

  private resetConfiguration(): void {
    if (confirm('Czy na pewno chcesz zresetować konfigurację do wartości domyślnych?')) {
      localStorage.removeItem('menuDesigner:overrides');
      location.reload();
    }
  }

  private exportConfiguration(): void {
    const menuManager = getMenuManager();
    const snapshot = menuManager.getRegistrySnapshot();
    
    const json = JSON.stringify(snapshot, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'menu-config.json';
    a.click();
    
    URL.revokeObjectURL(url);
  }

  private importConfiguration(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const config = JSON.parse(event.target?.result as string);
          // TODO: Validate and apply configuration
          console.log('Imported config:', config);
          alert('Import w budowie');
        } catch (error) {
          alert('Błąd podczas importu: ' + error);
        }
      };
      reader.readAsText(file);
    };
    
    input.click();
  }

  private addStyles(): void {
    if (document.getElementById('menu-editor-styles')) return;

    const style = document.createElement('style');
    style.id = 'menu-editor-styles';
    style.textContent = `
      .menu-editor-container {
        height: 100%;
        width: 100%;
        background: #f5f5f5;
        overflow: hidden;
      }

      .menu-editor-layout {
        display: grid;
        grid-template-columns: 250px 1fr 300px;
        height: 100%;
        gap: 1px;
        background: #ddd;
      }

      .editor-sidebar, .editor-main, .editor-properties {
        background: white;
        overflow-y: auto;
      }

      .editor-sidebar {
        padding: 15px;
        background: #2a2a2a;
        color: white;
      }

      .sidebar-header h2 {
        margin: 0 0 5px 0;
        font-size: 18px;
      }

      .sidebar-header p {
        margin: 0 0 20px 0;
        font-size: 12px;
        color: #aaa;
      }

      .module-list h3 {
        font-size: 14px;
        margin: 0 0 10px 0;
        color: #888;
      }

      .module-item {
        padding: 10px;
        margin-bottom: 5px;
        background: #333;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        transition: background 0.2s;
      }

      .module-item:hover {
        background: #444;
      }

      .module-icon {
        font-size: 20px;
      }

      .module-name {
        flex: 1;
        font-size: 13px;
      }

      .edit-icon {
        opacity: 0.5;
        font-size: 12px;
      }

      .actions {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .btn-primary, .btn-secondary, .btn-sm, .btn-icon {
        padding: 8px 12px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        transition: all 0.2s;
      }

      .btn-primary {
        background: #667eea;
        color: white;
      }

      .btn-primary:hover {
        background: #5568d3;
      }

      .btn-secondary {
        background: #444;
        color: white;
      }

      .btn-secondary:hover {
        background: #555;
      }

      .btn-icon {
        background: transparent;
        padding: 4px;
        font-size: 14px;
      }

      .btn-icon:hover {
        background: #f0f0f0;
      }

      .editor-main {
        padding: 20px;
      }

      .editor-header {
        margin-bottom: 20px;
        border-bottom: 2px solid #eee;
        padding-bottom: 15px;
      }

      .editor-header h2 {
        margin: 0 0 15px 0;
        font-size: 22px;
      }

      .editor-tabs {
        display: flex;
        gap: 10px;
      }

      .tab-btn {
        padding: 8px 16px;
        background: #f5f5f5;
        border: none;
        border-radius: 4px 4px 0 0;
        cursor: pointer;
        font-size: 13px;
        transition: all 0.2s;
      }

      .tab-btn.active {
        background: white;
        border-bottom: 2px solid #667eea;
      }

      .tab-content {
        display: none;
      }

      .tab-content.active {
        display: block;
      }

      .empty-state {
        text-align: center;
        color: #999;
        padding: 40px;
        font-size: 14px;
      }

      .column-card {
        background: #f9f9f9;
        border: 1px solid #ddd;
        border-radius: 6px;
        padding: 15px;
        margin-bottom: 15px;
      }

      .column-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd;
      }

      .column-title {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
      }

      .drag-handle {
        cursor: move;
        color: #999;
      }

      .column-id {
        font-size: 11px;
        color: #999;
      }

      .column-actions {
        display: flex;
        gap: 5px;
      }

      .menu-item-card {
        background: white;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        padding: 10px;
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
        transition: all 0.2s;
      }

      .menu-item-card:hover {
        border-color: #667eea;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }

      .menu-item-card.active {
        border-left: 3px solid #667eea;
      }

      .item-icon {
        font-size: 20px;
      }

      .item-content {
        flex: 1;
      }

      .item-label {
        font-size: 13px;
        font-weight: 500;
        margin-bottom: 4px;
      }

      .item-meta {
        display: flex;
        gap: 5px;
        flex-wrap: wrap;
      }

      .badge {
        font-size: 10px;
        padding: 2px 6px;
        background: #e0e0e0;
        border-radius: 3px;
        color: #666;
      }

      .item-actions {
        display: flex;
        gap: 3px;
      }

      .editor-properties {
        padding: 15px;
        background: #fafafa;
      }

      .properties-header h3 {
        margin: 0 0 15px 0;
        font-size: 14px;
        color: #333;
      }

      .routing-table {
        padding: 20px;
      }

      .routing-table table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 15px;
      }

      .routing-table th, .routing-table td {
        padding: 10px;
        text-align: left;
        border-bottom: 1px solid #ddd;
      }

      .routing-table th {
        background: #f5f5f5;
        font-size: 12px;
        font-weight: 600;
      }

      .routing-table input {
        width: 100%;
        padding: 6px;
        border: 1px solid #ddd;
        border-radius: 3px;
        font-size: 12px;
      }
    `;
    document.head.appendChild(style);
  }
}
