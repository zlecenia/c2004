// frontend/src/components/connect-menu/menu.styles.ts

export class ConnectMenuStyles {
  static getStyles(): string {
    return `
      /* Base Menu Styles */
      .connect-menu {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        user-select: none;
      }

      /* Theme Variants */
      .menu-theme-dark {
        background: #2a2a2a;
        color: #ffffff;
      }

      .menu-theme-light {
        background: #f5f5f5;
        color: #333333;
      }

      /* Layout Variants */
      .menu-layout-compact .menu-column {
        padding: 6px 4px;
      }

      .menu-layout-normal .menu-column {
        padding: 10px 8px;
      }

      .menu-layout-spacious .menu-column {
        padding: 15px 12px;
      }

      /* Sidebar Navigation */
      .sidebar-navigation {
        width: 200px;
        background: #2a2a2a;
        padding: 12px 8px;
        border-right: 1px solid #3a3a3a;
        height: 100%;
        overflow-y: auto;
      }

      .sidebar-title {
        margin: 0 0 12px 0;
        font-size: 14px;
        font-weight: 600;
        color: #cccccc;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        padding: 0 8px;
      }

      /* Menu Columns Container */
      .menu-columns-container {
        display: flex;
        height: 100%;
        background: #f5f5f5;
      }

      /* Menu Column */
      .menu-column {
        width: 120px;
        background: #2a2a2a;
        padding: 6px 4px;
        border-right: 1px solid #3a3a3a;
        display: flex;
        flex-direction: column;
        min-height: 100%;
      }

      .menu-column:last-child {
        border-right: none;
      }

      .column-title {
        margin: 0 0 8px 0;
        font-size: 11px;
        font-weight: 600;
        color: #cccccc;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        padding: 4px 8px;
        text-align: center;
        border-bottom: 1px solid #3a3a3a;
      }

      /* Navigation Buttons (Sidebar) */
      .nav-btn {
        background: #3a3a3a;
        border: 1px solid #4a4a4a;
        color: #ffffff;
        padding: 12px 16px;
        margin-bottom: 4px;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 14px;
        width: 100%;
        text-align: left;
      }

      .nav-btn:hover {
        background: #4a4a4a;
        border-color: #5a5a5a;
        transform: translateY(-1px);
      }

      .nav-btn.active {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-color: #667eea;
        box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
      }

      .nav-btn .nav-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
      }

      .nav-btn .nav-text {
        flex: 1;
        font-weight: 500;
      }

      /* Menu Items (Columns) */
      .menu-item,
      .section-item,
      .method-item {
        background: #3a3a3a;
        border: 1px solid #4a4a4a;
        color: #ffffff;
        padding: 8px 6px;
        margin-bottom: 2px;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        font-size: 10px;
        width: 100%;
        min-height: 50px;
        justify-content: center;
        gap: 4px;
      }

      .menu-item:hover,
      .section-item:hover,
      .method-item:hover {
        background: #4a4a4a;
        border-color: #5a5a5a;
        transform: translateY(-1px);
      }

      .menu-item.active,
      .section-item.active,
      .method-item.active {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-color: #667eea;
        box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
      }

      .menu-item.disabled,
      .section-item.disabled,
      .method-item.disabled {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
      }

      /* Menu Icons */
      .menu-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 18px;
        font-size: 16px;
      }

      /* Menu Labels */
      .menu-label {
        font-weight: 500;
        line-height: 1.2;
        word-break: break-word;
        max-width: 100%;
      }

      /* Horizontal Menu */
      .horizontal-menu {
        width: 100%;
        background: #2a2a2a;
        border-bottom: 1px solid #3a3a3a;
        padding: 8px;
      }

      .horizontal-menu-items {
        display: flex;
        gap: 8px;
        align-items: center;
        flex-wrap: wrap;
      }

      .horizontal-menu .menu-item {
        flex-direction: row;
        gap: 8px;
        min-height: auto;
        padding: 8px 16px;
        font-size: 12px;
        width: auto;
      }

      /* Responsive adjustments */
      @media (max-width: 768px) {
        .menu-column {
          width: 100px;
          padding: 4px 2px;
        }

        .menu-item,
        .section-item,
        .method-item {
          padding: 6px 4px;
          font-size: 9px;
          min-height: 40px;
        }

        .column-title {
          font-size: 10px;
        }

        .sidebar-navigation {
          width: 180px;
        }
      }

      /* Animation for menu transitions */
      .menu-column {
        transition: all 0.3s ease;
      }

      .menu-column[style*="display: none"] {
        opacity: 0;
        transform: translateX(-10px);
      }

      .menu-column:not([style*="display: none"]) {
        opacity: 1;
        transform: translateX(0);
      }

      /* Focus styles for accessibility */
      .nav-btn:focus,
      .menu-item:focus,
      .section-item:focus,
      .method-item:focus {
        outline: 2px solid #667eea;
        outline-offset: 2px;
      }

      /* Custom scrollbar for sidebar */
      .sidebar-navigation::-webkit-scrollbar {
        width: 6px;
      }

      .sidebar-navigation::-webkit-scrollbar-track {
        background: #2a2a2a;
      }

      .sidebar-navigation::-webkit-scrollbar-thumb {
        background: #4a4a4a;
        border-radius: 3px;
      }

      .sidebar-navigation::-webkit-scrollbar-thumb:hover {
        background: #5a5a5a;
      }

      /* Module with menu layout */
      .module-with-menu {
        display: flex;
        height: 100%;
        width: 100%;
      }

      .module-main-content {
        flex: 1;
        overflow: auto;
      }

      /* Combinatorial content styles */
      .combinatorial-content {
        padding: 20px;
        background: #fff;
        border-radius: 8px;
        margin: 10px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }

      .content-header {
        border-bottom: 1px solid #eee;
        padding-bottom: 15px;
        margin-bottom: 20px;
      }

      .content-header h3 {
        margin: 0 0 10px 0;
        color: #333;
        font-size: 18px;
        font-weight: 600;
      }

      .combination-info {
        display: flex;
        gap: 15px;
        flex-wrap: wrap;
      }

      .combination-badge {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
      }

      .current-selection {
        color: #666;
        font-size: 13px;
        padding: 4px 0;
      }

      .data-grid, .form-container, .export-options, .import-wizard, .sync-status, .default-content {
        padding: 20px;
        border: 2px dashed #ddd;
        border-radius: 8px;
        text-align: center;
        color: #666;
        font-size: 14px;
        background: #f9f9f9;
      }
    `;
  }
}
