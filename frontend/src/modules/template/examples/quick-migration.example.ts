// frontend/src/modules/template/examples/quick-migration.example.ts

/**
 * Przykład szybkiej migracji istniejącego modułu na template base styles
 * 
 * Ten przykład pokazuje jak łatwo przenieść moduł z custom stylów na base template
 */

import { ModuleStyleHelper } from '../index';

// === PRZED MIGRACJĄ ===
class _OldModuleController {
  public getOldStyles(): string {
    return `
      /* Stare custom style - duplikacja w każdym module */
      .old-container {
        flex: 1;
        background: #f5f5f5;
        overflow-y: auto;
        padding: 20px;
      }
      
      .old-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 1px solid #e0e0e0;
      }
      
      .old-title {
        font-size: 24px;
        font-weight: 600;
        color: #333;
      }
      
      .old-button {
        padding: 8px 16px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      
      .old-form-group {
        margin-bottom: 15px;
      }
      
      .old-form-group label {
        display: block;
        font-weight: 500;
        margin-bottom: 5px;
      }
      
      .old-input {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
    `;
  }

  public renderOld(): string {
    return `
      <div class="old-container">
        <div class="old-header">
          <h1 class="old-title">My Module</h1>
          <button class="old-button">Save</button>
        </div>
        <div class="old-form-group">
          <label>Setting Name:</label>
          <input type="text" class="old-input" />
        </div>
      </div>
    `;
  }
}

// === PO MIGRACJI ===
class _NewModuleController {
  public getNewStyles(): string {
    // Używamy base styles + tylko rzeczywiście specyficzne style
    return ModuleStyleHelper
      .forStandardModule()  // Automatycznie dostajemy wszystkie base styles
      .addModuleStyles(`
        /* Tylko specyficzne style dla tego modułu */
        .special-feature-indicator {
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          color: white;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          display: inline-block;
        }
        
        .module-specific-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
      `)
      .generateStyles();
  }

  public renderNew(): string {
    // Używamy base classes zamiast custom
    return `
      <div class="module-container">           <!-- zamiast old-container -->
        <div class="module-wrapper">
          <div class="module-header">          <!-- zamiast old-header -->
            <div>
              <h1 class="module-title">🚀 My Module</h1> <!-- zamiast old-title -->
              <span class="special-feature-indicator">New Feature</span>
            </div>
            <div class="module-actions">
              <button class="btn btn-primary">💾 Save</button> <!-- zamiast old-button -->
              <button class="btn btn-secondary">Cancel</button>
            </div>
          </div>
          
          <div class="module-content">
            <div class="form-section">
              <h5>Configuration</h5>
              <div class="form-row">               <!-- automatyczny responsive grid -->
                <div class="form-group">          <!-- zamiast old-form-group -->
                  <label>Setting Name:</label>
                  <input type="text" class="form-input" placeholder="Enter name" /> <!-- zamiast old-input -->
                </div>
                <div class="form-group">
                  <label>Setting Type:</label>
                  <select class="form-select">    <!-- automatyczny styling -->
                    <option>Text</option>
                    <option>Number</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div class="module-specific-grid">    <!-- custom tylko gdzie potrzebne -->
              <div class="border rounded p-3">   <!-- utility classes -->
                <h6 class="text-primary">Status</h6>
                <p class="text-muted mb-0">System is running</p>
              </div>
            </div>
            
            <div class="form-actions">            <!-- automatyczny layout -->
              <button class="btn btn-success">✅ Apply Changes</button>
              <button class="btn btn-outline-primary">📄 Export Config</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

// === PORÓWNANIE WYNIKÓW ===

/**
 * Przed migracją:
 * - 800+ linii custom CSS w każdym module
 * - Duplikacja stylów across modules 
 * - Brak responsywności
 * - Inconsistent button/form styling
 * - Manual accessibility handling
 * 
 * Po migracji:
 * - 50-100 linii tylko specyficznych stylów
 * - Automatic responsive design
 * - Consistent UI across modules
 * - Built-in accessibility
 * - Easy maintenance (zmiana w jednym miejscu)
 */

// === HELPER FUNCTIONS FOR MIGRATION ===

/**
 * Szybka funkcja do conversion starych modułów
 */
export function migrateModuleToBaseStyles(
  moduleSpecificStyles: string = '',
  _includeResponsive: boolean = true
): string {
  return ModuleStyleHelper
    .forStandardModule()  // lub .forMobileModule(), .forDesktopModule()
    .addModuleStyles(moduleSpecificStyles)
    .generateStyles();
}

/**
 * Helper do sprawdzenia jakie base classes są dostępne
 */
export function getAvailableBaseClasses(): Record<string, string[]> {
  return {
    'Layout': [
      '.module-container', '.module-wrapper', '.module-header', 
      '.module-content', '.module-footer', '.module-title'
    ],
    'Forms': [
      '.form-section', '.form-row', '.form-group', '.form-input', 
      '.form-select', '.form-textarea', '.form-actions'
    ],
    'Buttons': [
      '.btn', '.btn-primary', '.btn-secondary', '.btn-success', 
      '.btn-danger', '.btn-warning', '.btn-info', '.btn-outline-primary'
    ],
    'Menu': [
      '.menu-container', '.menu-item', '.menu-item.active', '.menu-title'
    ],
    'Utilities': [
      '.text-center', '.d-flex', '.justify-content-between', 
      '.align-items-center', '.bg-light', '.border', '.rounded'
    ],
    'Status': [
      '.status-active', '.status-inactive', '.status-connected', 
      '.status-pending', '.text-success', '.text-danger'
    ]
  };
}

/**
 * Quick checklist for migration
 */
export function getMigrationChecklist(): string[] {
  return [
    '✅ Import ModuleStyleHelper from template module',
    '✅ Replace custom container styles with .module-container',
    '✅ Use .module-wrapper instead of custom padding containers', 
    '✅ Replace custom buttons with .btn .btn-* classes',
    '✅ Use .form-* classes for form elements',
    '✅ Replace custom grid/flex with .form-row and utility classes',
    '✅ Add only truly module-specific styles with addModuleStyles()',
    '✅ Test responsive behavior on different screen sizes',
    '✅ Remove old custom CSS that duplicates base functionality'
  ];
}
