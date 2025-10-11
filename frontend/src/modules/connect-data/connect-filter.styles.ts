// frontend/src/modules/connect-data/connect-filter.styles.ts

export class ConnectFilterStyles {
  static getStyles(): string {
    return `
      .connect-data-compact { 
        height: 100%; 
        overflow: hidden; 
      }
      
      .compact-layout { 
        display: flex; 
        height: 365px; 
        background: #f5f5f5; 
      }

      /* Menu Column Styles */
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

      .menu-item, .object-item, .action-item {
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

      .menu-item:hover, .object-item:hover, .action-item:hover {
        background: #4a4a4a;
        color: #fff;
      }

      .menu-item.active, .object-item.active, .action-item.active {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }

      .menu-icon {
        color: inherit;
        font-size: 14px;
      }

      .menu-label {
        text-align: center;
        font-size: 8px;
        line-height: 1.2;
        word-wrap: break-word;
        max-width: 100%;
      }

      /* Main Content */
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

      /* Data Content */
      .data-content {
        display: none;
      }

      .data-content.active {
        display: block;
      }

      .content-section {
        background: white;
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 16px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }

      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 1px solid #e9ecef;
      }

      .section-title {
        font-size: 18px;
        font-weight: 600;
        color: #2c3e50;
        margin: 0;
      }

      .section-subtitle {
        font-size: 12px;
        color: #6c757d;
        margin: 4px 0 0 0;
      }

      /* Search Form */
      .search-form {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .search-row {
        display: flex;
        gap: 12px;
        align-items: end;
      }

      .form-group {
        flex: 1;
      }

      .form-label {
        display: block;
        margin-bottom: 6px;
        font-weight: 500;
        color: #495057;
        font-size: 12px;
      }

      .form-control {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid #ced4da;
        border-radius: 4px;
        font-size: 12px;
        color: #495057;
        transition: border-color 0.2s;
      }

      .form-control:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.25);
      }

      .btn {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 6px;
        transition: all 0.2s;
        text-decoration: none;
      }

      .btn-primary {
        background: #667eea;
        color: white;
      }

      .btn-primary:hover {
        background: #5a67d8;
        transform: translateY(-1px);
      }

      .btn-secondary {
        background: #6c757d;
        color: white;
      }

      .btn-secondary:hover {
        background: #545b62;
      }

      /* Results */
      .results-section {
        margin-top: 16px;
      }

      .results-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
      }

      .results-count {
        font-size: 12px;
        color: #6c757d;
      }

      .results-table {
        width: 100%;
        border-collapse: collapse;
        background: white;
        border-radius: 6px;
        overflow: hidden;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      }

      .results-table th {
        background: #f8f9fa;
        padding: 12px 8px;
        text-align: left;
        font-weight: 600;
        color: #495057;
        border-bottom: 2px solid #dee2e6;
        font-size: 11px;
      }

      .results-table td {
        padding: 10px 8px;
        border-bottom: 1px solid #dee2e6;
        color: #212529;
        font-size: 11px;
      }

      .results-table tr:hover {
        background: #f8f9fa;
      }

      /* Status badges */
      .badge {
        display: inline-block;
        padding: 3px 8px;
        font-size: 10px;
        font-weight: 500;
        border-radius: 12px;
        text-align: center;
      }

      .badge-active { background: #d1e7dd; color: #0f5132; }
      .badge-inactive { background: #f8d7da; color: #721c24; }
      .badge-pending { background: #fff3cd; color: #856404; }
      .badge-maintenance { background: #cce5ff; color: #004085; }

      /* Action buttons */
      .action-buttons {
        display: flex;
        gap: 8px;
        margin-top: 16px;
      }

      .btn-sm {
        padding: 4px 8px;
        font-size: 10px;
      }

      /* Responsive */
      @media (max-width: 768px) {
        .compact-layout {
          flex-direction: column;
        }
        
        .menu-column {
          width: 100%;
          height: auto;
          display: flex;
          overflow-x: auto;
        }
        
        .search-row {
          flex-direction: column;
          align-items: stretch;
        }
        
        .results-table {
          font-size: 10px;
        }
      }
    `;
  }
}
