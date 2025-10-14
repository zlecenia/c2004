// frontend/src/modules/template/examples/module-with-base-styles.example.ts

import { BaseModuleStyles } from '../styles/base-module.styles';
import { ModuleStyleHelper } from '../styles/module-style-helper';

/**
 * Example showing how to use template base styles in any module
 */

export class ExampleModuleWithBaseStyles {
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  /**
   * Render module using base template structure
   */
  public render(): string {
    return `
      <div class="module-container">
        <div class="module-wrapper">
          <div class="module-header">
            <div>
              <h1 class="module-title">🔧 Example Module</h1>
              <p class="module-subtitle">Using base template styles</p>
            </div>
            <div class="module-actions">
              <button class="btn btn-primary">Primary Action</button>
              <button class="btn btn-secondary">Secondary</button>
            </div>
          </div>

          <div class="module-content">
            <div class="form-section">
              <h5>Configuration Settings</h5>
              <div class="form-row">
                <div class="form-group">
                  <label>Setting Name:</label>
                  <input type="text" class="form-input" placeholder="Enter setting name" />
                </div>
                <div class="form-group">
                  <label>Setting Type:</label>
                  <select class="form-select">
                    <option>Text</option>
                    <option>Number</option>
                    <option>Boolean</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="form-section">
              <h5>Status Information</h5>
              <div class="d-flex justify-content-between align-items-center p-3 border rounded">
                <span>Connection Status:</span>
                <span class="status-connected">Connected</span>
              </div>
            </div>

            <div class="form-actions">
              <button class="btn btn-success">💾 Save Settings</button>
              <button class="btn btn-info">🔍 Test Connection</button>
              <button class="btn btn-outline-primary">📄 Export Config</button>
            </div>
          </div>

          <div class="module-footer">
            <span class="text-muted">Last updated: ${new Date().toLocaleDateString()}</span>
            <button class="btn btn-secondary">Help</button>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Example of using ModuleStyleHelper for custom module styles
   */
  public getStyles(): string {
    return ModuleStyleHelper
      .forStandardModule()
      .addModuleStyles(`
        /* Example Module Specific Styles */
        .example-specific-class {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
        }

        .custom-card {
          background: white;
          border: 1px solid #e9ecef;
          border-radius: 6px;
          padding: 15px;
          margin-bottom: 15px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
      `)
      .generateStyles();
  }

  /**
   * Example of using only specific base style sections
   */
  public getLightweightStyles(): string {
    const helper = new ModuleStyleHelper(false); // No responsive
    
    return helper
      .addModuleStyles(BaseModuleStyles.getModuleContainerStyles())
      .addModuleStyles(BaseModuleStyles.getButtonStyles())
      .addModuleStyles(`
        /* Minimal custom styles */
        .lightweight-container {
          padding: 10px;
          background: #f8f9fa;
        }
      `)
      .generateStyles();
  }

  /**
   * Setup event listeners with base button classes
   */
  public setupEventListeners(): void {
    // Base template provides consistent button styling
    const saveBtn = this.container.querySelector('.btn-success') as HTMLButtonElement;
    const testBtn = this.container.querySelector('.btn-info') as HTMLButtonElement;

    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        this.showNotification('Settings saved successfully!', 'success');
      });
    }

    if (testBtn) {
      testBtn.addEventListener('click', () => {
        this.showNotification('Testing connection...', 'info');
      });
    }
  }

  /**
   * Show notification using base utility styles
   */
  private showNotification(message: string, type: 'success' | 'error' | 'info'): void {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Using base utility classes
    notification.classList.add('d-flex', 'align-items-center', 'p-2', 'rounded', 'shadow');
    
    // Type-specific styling
    switch (type) {
      case 'success':
        notification.classList.add('bg-success', 'text-white');
        break;
      case 'error':
        notification.classList.add('bg-danger', 'text-white');  
        break;
      case 'info':
        notification.classList.add('bg-info', 'text-white');
        break;
    }

    notification.style.cssText += `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      min-width: 250px;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}

/**
 * Quick helper function for modules to get base styles
 */
export function getModuleBaseStyles(): string {
  return BaseModuleStyles.getAllBaseStyles();
}

/**
 * Helper to create a standard module style setup
 */
export function createStandardModuleStyles(moduleSpecificStyles: string = ''): string {
  return ModuleStyleHelper
    .forStandardModule()
    .addModuleStyles(moduleSpecificStyles)
    .generateStyles();
}
