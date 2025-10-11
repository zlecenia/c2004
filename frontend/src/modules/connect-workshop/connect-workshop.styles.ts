// frontend/src/modules/connect-workshop/connect-workshop.styles.ts

export class ConnectWorkshopStyles {
  static getStyles(): string {
    return `
      .connect-workshop-compact {
        height: 100%;
        overflow: hidden;
      }

      .compact-layout {
        display: flex;
        height: 365px;
        background: #f5f5f5;
      }

      /* Menu Columns */
      .menu-column {
        width: 100px;
        background: #2a2a2a;
        padding: 6px 4px;
        overflow-y: auto;  
        flex-shrink: 0;
        border-right: 1px solid #1a1a1a;
      }

      .column-title {
        color: #FFF;
        font-size: 9px;
        font-weight: 600;
        text-transform: uppercase;
        margin: 0 0 6px 0;
        padding: 4px;
        text-align: center;
        background: #1a1a1a;
        border-radius: 3px;
      }

      .menu-item, .section-item {
        width: 100%;
        background: #3a3a3a;
        border: none;
        padding: 3px 4px;
        margin-bottom: 4px;
        border-radius: 5px;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        transition: all 0.2s;
        color: #ccc;
        text-decoration: none;
        font-size: 8px;
        font-weight: 500;
      }

      .menu-item:hover, .section-item:hover {
        background: #4a4a4a;
        color: #fff;
      }

      .menu-item.active, .section-item.active {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }

      .menu-icon {
        color: inherit;
      }

      .menu-label {
        text-align: center;
        font-size: 8px;
        line-height: 1.2;
        word-wrap: break-word;
        max-width: 100%;
      }

      /* Main Content Area */
      .main-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        background: #fff;
        overflow: hidden;
      }

      .content-body {
        flex: 1;
        padding: 12px;
        overflow-y: auto;
        background: #f8f9fa;
      }

      /* Data Display Styles */
      .workshop-content {
        display: none;
      }

      .workshop-content.active {
        display: block;
      }

      .data-section {
        background: white;
        border-radius: 6px;
        padding: 16px;
        margin-bottom: 16px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }

      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
        padding-bottom: 8px;
        border-bottom: 1px solid #e9ecef;
      }

      .section-title {
        font-size: 14px;
        font-weight: 600;
        color: #2c3e50;
        margin: 0;
      }

      .section-subtitle {
        font-size: 11px;
        color: #6c757d;
        margin: 0;
      }

      .data-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 11px;
      }

      .data-table th {
        background: #f8f9fa;
        padding: 8px 6px;
        text-align: left;
        font-weight: 600;
        color: #495057;
        border-bottom: 2px solid #dee2e6;
        font-size: 10px;
      }

      .data-table td {
        padding: 6px;
        border-bottom: 1px solid #dee2e6;
        color: #212529;
      }

      .data-table tr:hover {
        background: #f8f9fa;
      }

      /* Buttons and Controls */
      .action-buttons {
        display: flex;
        gap: 8px;
        margin-bottom: 12px;
      }

      .btn {
        padding: 6px 12px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 11px;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 4px;
        transition: all 0.2s;
      }

      .btn-primary {
        background: #007bff;
        color: white;
      }

      .btn-primary:hover {
        background: #0056b3;
      }

      .btn-secondary {
        background: #6c757d;
        color: white;
      }

      .btn-secondary:hover {
        background: #545b62;
      }

      .btn-success {
        background: #28a745;
        color: white;
      }

      .btn-success:hover {
        background: #1e7e34;
      }

      .btn-warning {
        background: #ffc107;
        color: #212529;
      }

      .btn-warning:hover {
        background: #e0a800;
      }

      /* Forms */
      .form-group {
        margin-bottom: 12px;
      }

      .form-label {
        display: block;
        margin-bottom: 4px;
        font-weight: 500;
        color: #495057;
        font-size: 11px;
      }

      .form-control {
        width: 100%;
        padding: 6px 8px;
        border: 1px solid #ced4da;
        border-radius: 4px;
        font-size: 11px;
        color: #495057;
      }

      .form-control:focus {
        outline: none;
        border-color: #80bdff;
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
      }

      /* Status Badges */
      .badge {
        display: inline-block;
        padding: 2px 6px;
        font-size: 9px;
        font-weight: 500;
        border-radius: 3px;
        text-align: center;
      }

      .badge-pending { background: #fff3cd; color: #856404; }
      .badge-processing { background: #cce5ff; color: #004085; }
      .badge-active { background: #d1ecf1; color: #0c5460; }
      .badge-completed { background: #d1e7dd; color: #0f5132; }
    `;
  }
}
