// frontend/src/components/connect-menu/menu.templates.ts

import { MenuConfiguration, MenuColumn, MenuItem } from './menu.interfaces';

export class ConnectMenuTemplates {

  /**
   * Generate menu item HTML
   */
  static generateMenuItem(item: MenuItem, columnId: string): string {
    const activeClass = item.active ? ' active' : '';
    const disabledClass = item.disabled ? ' disabled' : '';
    const customClass = item.className ? ` ${item.className}` : '';
    
    // Determine button class based on column type
    let buttonClass = 'menu-item';
    if (columnId === 'main-menu') {
      buttonClass = 'nav-btn';
    } else if (columnId.includes('section')) {
      buttonClass = 'section-item';
    } else if (columnId.includes('method') || columnId.includes('interface')) {
      buttonClass = 'method-item';
    }

    // Build data attributes
    const dataAttrs = [
      `data-menu-item="${item.id}"`,
      item.action ? `data-action="${item.action}"` : '',
      item.module ? `data-module="${item.module}"` : '',
      item.section ? `data-section="${item.section}"` : '',
      item.route ? `data-route="${item.route}"` : ''
    ].filter(Boolean).join(' ');

    return `
      <button class="${buttonClass}${activeClass}${disabledClass}${customClass}" ${dataAttrs}>
        <span class="menu-icon">
          <span class="icon">${item.icon}</span>
        </span>
        <span class="menu-label">${item.label}</span>
      </button>
    `;
  }

  /**
   * Generate menu column HTML
   */
  static generateMenuColumn(column: MenuColumn): string {
    // Build a single style attribute to avoid duplicates
    const inlineStyles: string[] = [];
    if (column.visible === false) inlineStyles.push('display: none;');
    if (column.width) inlineStyles.push(`width: ${column.width};`);
    const styleAttr = inlineStyles.length ? ` style="${inlineStyles.join(' ')}"` : '';
    const customClass = column.className ? ` ${column.className}` : '';

    const items = column.items
      .map(item => this.generateMenuItem(item, column.id))
      .join('\n');

    return `
      <div class="menu-column${customClass}" id="${column.id}-column"${styleAttr}>
        <h3 class="column-title">${column.title}</h3>
        ${items}
      </div>
    `;
  }

  /**
   * Generate sidebar navigation template
   */
  static generateSidebarTemplate(config: MenuConfiguration): string {
    const column = config.columns[0]; // Sidebar has only one column
    const items = column.items
      .map(item => this.generateMenuItem(item, column.id))
      .join('\n');

    return `
      <div class="sidebar-navigation" id="${config.id}">
        <h3 class="sidebar-title">${column.title}</h3>
        ${items}
      </div>
    `;
  }

  /**
   * Generate columns menu template
   */
  static generateColumnsTemplate(config: MenuConfiguration): string {
    const columns = config.columns
      .map(column => this.generateMenuColumn(column))
      .join('\n');

    return `
      <div class="menu-columns-container" id="${config.id}">
        ${columns}
      </div>
    `;
  }

  /**
   * Generate horizontal menu template
   */
  static generateHorizontalTemplate(config: MenuConfiguration): string {
    const items = config.columns.flatMap(column => column.items)
      .map(item => this.generateMenuItem(item, 'horizontal'))
      .join('\n');

    return `
      <div class="horizontal-menu" id="${config.id}">
        <div class="horizontal-menu-items">
          ${items}
        </div>
      </div>
    `;
  }

  /**
   * Main template generator - chooses appropriate template based on menu type
   */
  static generateMenuTemplate(config: MenuConfiguration): string {
    switch (config.type) {
      case 'sidebar':
        return this.generateSidebarTemplate(config);
      case 'columns':
        return this.generateColumnsTemplate(config);
      case 'horizontal':
        return this.generateHorizontalTemplate(config);
      default:
        throw new Error(`Unsupported menu type: ${config.type}`);
    }
  }

  /**
   * Generate menu container template with theme and layout classes
   */
  static generateMenuContainer(config: MenuConfiguration): string {
    const themeClass = config.theme ? ` menu-theme-${config.theme}` : '';
    const layoutClass = config.layout ? ` menu-layout-${config.layout}` : '';
    
    return `
      <div class="connect-menu${themeClass}${layoutClass}" data-menu-id="${config.id}">
        ${this.generateMenuTemplate(config)}
      </div>
    `;
  }
}
