// frontend/src/modules/template/styles/module-style-helper.ts

import { BaseModuleStyles } from './base-module.styles';

/**
 * Helper class for managing module styles
 * Provides easy methods for modules to include base styles and add their own
 */
export class ModuleStyleHelper {
  private moduleSpecificStyles: string = '';
  private includeResponsive: boolean = true;

  /**
   * Create a new style helper instance
   * @param includeResponsive - Whether to include responsive styles (default: true)
   */
  constructor(includeResponsive: boolean = true) {
    this.includeResponsive = includeResponsive;
  }

  /**
   * Add module-specific styles
   * @param styles - CSS styles specific to the module
   */
  public addModuleStyles(styles: string): ModuleStyleHelper {
    this.moduleSpecificStyles += '\n' + styles;
    return this;
  }

  /**
   * Add multiple style sections
   * @param styleSections - Array of CSS style strings
   */
  public addMultipleStyles(styleSections: string[]): ModuleStyleHelper {
    this.moduleSpecificStyles += '\n' + styleSections.join('\n');
    return this;
  }

  /**
   * Generate complete CSS styles for the module
   * Includes base styles + module-specific styles
   */
  public generateStyles(): string {
    const baseStyles = BaseModuleStyles.getAllBaseStyles();
    const responsiveStyles = this.includeResponsive ? BaseModuleStyles.getResponsiveStyles() : '';
    
    return [
      '/* === BASE MODULE STYLES === */',
      baseStyles,
      responsiveStyles,
      '/* === MODULE SPECIFIC STYLES === */',
      this.moduleSpecificStyles
    ].filter(style => style.trim()).join('\n');
  }

  /**
   * Get only base styles without module-specific ones
   */
  public getBaseStyles(): string {
    return BaseModuleStyles.getAllBaseStyles();
  }

  /**
   * Get a specific section of base styles
   */
  public getBaseStyleSection(section: 'container' | 'forms' | 'buttons' | 'menu' | 'utility'): string {
    switch (section) {
      case 'container':
        return BaseModuleStyles.getModuleContainerStyles();
      case 'forms':
        return BaseModuleStyles.getFormStyles();
      case 'buttons':
        return BaseModuleStyles.getButtonStyles();
      case 'menu':
        return BaseModuleStyles.getMenuStyles();
      case 'utility':
        return BaseModuleStyles.getUtilityStyles();
      default:
        return '';
    }
  }

  /**
   * Create a style helper with commonly used patterns
   */
  public static forStandardModule(): ModuleStyleHelper {
    return new ModuleStyleHelper(true);
  }

  /**
   * Create a style helper for mobile-first modules
   */
  public static forMobileModule(): ModuleStyleHelper {
    return new ModuleStyleHelper(true);
  }

  /**
   * Create a style helper for desktop-only modules
   */
  public static forDesktopModule(): ModuleStyleHelper {
    return new ModuleStyleHelper(false);
  }

  /**
   * Generate inline style tag with all styles
   * Useful for components that inject styles directly
   */
  public generateInlineStyleTag(): string {
    return `<style>${this.generateStyles()}</style>`;
  }

  /**
   * Reset module-specific styles
   */
  public resetModuleStyles(): ModuleStyleHelper {
    this.moduleSpecificStyles = '';
    return this;
  }
}
