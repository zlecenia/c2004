// frontend/src/modules/template/styles/base-module.styles.ts

/**
 * Base styles for all modules
 * These styles provide common styling patterns that are used across all modules
 */

export class BaseModuleStyles {
  /**
   * Get base module container styles
   */
  public static getModuleContainerStyles(): string {
    return `
      /* Base Module Container Styles */
      .module-container {
        flex: 1;
        background: #f5f5f5;
        overflow-y: auto;
        overflow-x: hidden;
        position: relative;
        min-height: 100vh;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      }

      .module-wrapper {
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;
      }

      .module-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0 20px 0;
        border-bottom: 2px solid #e9ecef;
        margin-bottom: 20px;
      }

      .module-title {
        font-size: 24px;
        font-weight: 600;
        color: #2c3e50;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .module-subtitle {
        font-size: 14px;
        color: #6c757d;
        margin: 5px 0 0 0;
        font-weight: normal;
      }

      .module-actions {
        display: flex;
        gap: 10px;
        align-items: center;
      }

      .module-content {
        flex: 1;
        min-height: 400px;
      }

      .module-footer {
        padding: 20px 0 0 0;
        border-top: 1px solid #e9ecef;
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    `;
  }

  /**
   * Get common form styles used across modules
   */
  public static getFormStyles(): string {
    return `
      /* Common Form Styles */
      .form-section {
        margin-bottom: 30px;
      }

      .form-section h5 {
        color: #495057;
        font-size: 16px;
        font-weight: 600;
        margin: 0 0 15px 0;
        padding-bottom: 8px;
        border-bottom: 1px solid #dee2e6;
      }

      .form-row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        margin-bottom: 20px;
      }

      .form-group {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .form-group label {
        font-weight: 500;
        color: #495057;
        font-size: 14px;
      }

      .form-input,
      .form-select,
      .form-textarea {
        padding: 8px 12px;
        border: 1px solid #ced4da;
        border-radius: 4px;
        font-size: 14px;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      }

      .form-input:focus,
      .form-select:focus,
      .form-textarea:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
      }

      .form-textarea {
        resize: vertical;
        min-height: 80px;
      }

      .form-actions {
        display: flex;
        gap: 10px;
        justify-content: flex-end;
        padding: 20px 0 0 0;
        border-top: 1px solid #e9ecef;
        margin-top: 20px;
      }
    `;
  }

  /**
   * Get common button styles
   */
  public static getButtonStyles(): string {
    return `
      /* Common Button Styles */
      .btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 8px 16px;
        font-size: 14px;
        font-weight: 500;
        text-align: center;
        text-decoration: none;
        vertical-align: middle;
        cursor: pointer;
        border: 1px solid transparent;
        border-radius: 4px;
        transition: all 0.15s ease-in-out;
        user-select: none;
      }

      .btn:disabled {
        opacity: 0.65;
        cursor: not-allowed;
      }

      .btn-primary {
        background-color: #007bff;
        border-color: #007bff;
        color: white;
      }

      .btn-primary:hover:not(:disabled) {
        background-color: #0056b3;
        border-color: #0056b3;
      }

      .btn-secondary {
        background-color: #6c757d;
        border-color: #6c757d;
        color: white;
      }

      .btn-secondary:hover:not(:disabled) {
        background-color: #545b62;
        border-color: #545b62;
      }

      .btn-success {
        background-color: #28a745;
        border-color: #28a745;
        color: white;
      }

      .btn-success:hover:not(:disabled) {
        background-color: #1e7e34;
        border-color: #1e7e34;
      }

      .btn-danger {
        background-color: #dc3545;
        border-color: #dc3545;
        color: white;
      }

      .btn-danger:hover:not(:disabled) {
        background-color: #bd2130;
        border-color: #bd2130;
      }

      .btn-warning {
        background-color: #ffc107;
        border-color: #ffc107;
        color: #212529;
      }

      .btn-warning:hover:not(:disabled) {
        background-color: #d39e00;
        border-color: #d39e00;
      }

      .btn-info {
        background-color: #17a2b8;
        border-color: #17a2b8;
        color: white;
      }

      .btn-info:hover:not(:disabled) {
        background-color: #117a8b;
        border-color: #117a8b;
      }

      .btn-outline-primary {
        color: #007bff;
        border-color: #007bff;
        background-color: transparent;
      }

      .btn-outline-primary:hover:not(:disabled) {
        background-color: #007bff;
        color: white;
      }

      /* Legacy button classes for backward compatibility */
      .btn-save {
        background-color: #28a745;
        border-color: #28a745;
        color: white;
      }

      .btn-save:hover:not(:disabled) {
        background-color: #1e7e34;
        border-color: #1e7e34;
      }

      .btn-test {
        background-color: #17a2b8;
        border-color: #17a2b8;
        color: white;
      }

      .btn-test:hover:not(:disabled) {
        background-color: #117a8b;
        border-color: #117a8b;
      }

      .btn-export {
        background-color: #6c757d;
        border-color: #6c757d;
        color: white;
      }

      .btn-export:hover:not(:disabled) {
        background-color: #545b62;
        border-color: #545b62;
      }

      .btn-connect,
      .btn-connected {
        background-color: #28a745;
        border-color: #28a745;
        color: white;
        font-size: 12px;
        padding: 4px 8px;
      }

      .btn-calibrate {
        background-color: #ffc107;
        border-color: #ffc107;
        color: #212529;
        font-size: 12px;
        padding: 4px 8px;
      }
    `;
  }

  /**
   * Get common menu/navigation styles
   */
  public static getMenuStyles(): string {
    return `
      /* Common Menu Styles */
      .menu-container {
        background: white;
        border-right: 1px solid #e9ecef;
        overflow-y: auto;
        overflow-x: hidden;
      }

      .menu-title {
        font-size: 16px;
        font-weight: 600;
        color: #495057;
        margin: 0 0 15px 0;
        padding: 15px 15px 0 15px;
      }

      .menu-item {
        display: block;
        width: 100%;
        padding: 10px 15px;
        color: #495057;
        text-decoration: none;
        border: none;
        background: none;
        text-align: left;
        cursor: pointer;
        transition: all 0.15s ease-in-out;
        border-left: 3px solid transparent;
        font-size: 14px;
      }

      .menu-item:hover {
        background-color: #f8f9fa;
        color: #007bff;
      }

      .menu-item.active {
        background-color: #e7f3ff;
        color: #007bff;
        border-left-color: #007bff;
        font-weight: 500;
      }

      .menu-separator {
        height: 1px;
        background-color: #e9ecef;
        margin: 10px 0;
      }
    `;
  }

  /**
   * Get common utility styles
   */
  public static getUtilityStyles(): string {
    return `
      /* Common Utility Styles */
      .text-center { text-align: center; }
      .text-left { text-align: left; }
      .text-right { text-align: right; }
      
      .text-muted { color: #6c757d; }
      .text-primary { color: #007bff; }
      .text-success { color: #28a745; }
      .text-danger { color: #dc3545; }
      .text-warning { color: #ffc107; }
      .text-info { color: #17a2b8; }
      
      .bg-light { background-color: #f8f9fa; }
      .bg-white { background-color: white; }
      
      .d-none { display: none; }
      .d-block { display: block; }
      .d-flex { display: flex; }
      .d-grid { display: grid; }
      
      .flex-column { flex-direction: column; }
      .flex-row { flex-direction: row; }
      .justify-content-between { justify-content: space-between; }
      .align-items-center { align-items: center; }
      .gap-1 { gap: 0.25rem; }
      .gap-2 { gap: 0.5rem; }
      .gap-3 { gap: 1rem; }
      
      .mt-1 { margin-top: 0.25rem; }
      .mt-2 { margin-top: 0.5rem; }
      .mt-3 { margin-top: 1rem; }
      .mb-1 { margin-bottom: 0.25rem; }
      .mb-2 { margin-bottom: 0.5rem; }
      .mb-3 { margin-bottom: 1rem; }
      .p-1 { padding: 0.25rem; }
      .p-2 { padding: 0.5rem; }
      .p-3 { padding: 1rem; }
      
      .border { border: 1px solid #dee2e6; }
      .border-bottom { border-bottom: 1px solid #dee2e6; }
      .rounded { border-radius: 0.375rem; }
      
      .shadow-sm { box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075); }
      .shadow { box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15); }
      
      /* Status indicators */
      .status-active { color: #28a745; }
      .status-inactive { color: #dc3545; }
      .status-pending { color: #ffc107; }
      .status-connected { color: #28a745; }
      .status-disconnected { color: #dc3545; }
    `;
  }

  /**
   * Get all base styles combined
   */
  public static getAllBaseStyles(): string {
    return [
      this.getModuleContainerStyles(),
      this.getFormStyles(),
      this.getButtonStyles(),
      this.getMenuStyles(),
      this.getUtilityStyles()
    ].join('\n');
  }

  /**
   * Get responsive styles for mobile/tablet support
   */
  public static getResponsiveStyles(): string {
    return `
      /* Responsive Styles */
      @media (max-width: 768px) {
        .module-wrapper {
          margin: 10px;
          padding: 15px;
          border-radius: 4px;
        }
        
        .module-header {
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
        }
        
        .module-actions {
          width: 100%;
          justify-content: flex-start;
        }
        
        .form-row {
          grid-template-columns: 1fr;
        }
        
        .form-actions {
          flex-direction: column;
          align-items: stretch;
        }
        
        .btn {
          width: 100%;
          justify-content: center;
        }
      }
      
      @media (max-width: 480px) {
        .module-container {
          padding: 0;
        }
        
        .module-wrapper {
          margin: 5px;
          padding: 10px;
          border-radius: 0;
        }
        
        .module-title {
          font-size: 20px;
        }
      }
    `;
  }
}
