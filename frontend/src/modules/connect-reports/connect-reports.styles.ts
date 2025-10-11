// frontend/src/modules/connect-reports/connect-reports.styles.ts

export class ConnectReportsStyles {
  static getStyles(): string {
    return `
      .connect-reports-layout { 
        height: 100%; 
        overflow: hidden; 
      }
      
      .reports-layout { 
        display: flex; 
        height: 365px; 
        background: #f5f5f5; 
      }
      
      .main-content { 
        flex: 1; 
      }

      /* Menu Column Styles */
      .menu-column {
        width: 120px;
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

      .menu-item {
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

      .menu-item:hover {
        background: #4a4a4a;
        color: #fff;
      }

      .menu-item.active {
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

      /* Content Area */
      .content-container {
        flex: 1;
        background: white;
        padding: 12px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }

      .content-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
        padding-bottom: 8px;
        border-bottom: 1px solid #e9ecef;
      }

      .content-title {
        font-size: 16px;
        font-weight: 600;
        color: #2c3e50;
        margin: 0;
      }

      .view-toggles {
        display: flex;
        gap: 4px;
      }

      .toggle-btn {
        padding: 4px 8px;
        border: 1px solid #ddd;
        background: white;
        border-radius: 4px;
        cursor: pointer;
        font-size: 11px;
        transition: all 0.2s;
      }

      .toggle-btn:hover {
        background: #f8f9fa;
      }

      .toggle-btn.active {
        background: #007bff;
        color: white;
        border-color: #007bff;
      }

      /* Reports Content */
      .reports-content {
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }

      .report-section {
        display: none;
      }

      .report-section.active {
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      /* Calendar Navigation */
      .calendar-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
        padding: 8px 12px;
        background: #f8f9fa;
        border-radius: 6px;
      }

      .nav-btn {
        background: #3a3a3a;
        border: 1px solid #ddd;
        padding: 4px 8px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        transition: all 0.2s;
      }

      .nav-btn:hover {
        background: #e9ecef;
      }

      .nav-title {
        font-size: 14px;
        font-weight: 600;
        color: #495057;
      }

      /* Calendar Grid */
      .calendar-grid {
        flex: 1;
        overflow: auto;
        border: 1px solid #dee2e6;
        border-radius: 6px;
        background: white;
      }

      .calendar-header {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        background: #f8f9fa;
        border-bottom: 1px solid #dee2e6;
      }

      .header-cell {
        padding: 8px 4px;
        text-align: center;
        font-size: 10px;
        font-weight: 600;
        color: #6c757d;
        border-right: 1px solid #dee2e6;
      }

      .header-cell:last-child {
        border-right: none;
      }

      .calendar-body {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
      }

      .calendar-day {
        min-height: 60px;
        border-right: 1px solid #dee2e6;
        border-bottom: 1px solid #dee2e6;
        padding: 4px;
        position: relative;
        background: white;
      }

      .calendar-day:last-child {
        border-right: none;
      }

      .day-number {
        font-size: 10px;
        font-weight: 600;
        color: #495057;
        margin-bottom: 2px;
      }

      .day-other-month {
        background: #f8f9fa;
        color: #adb5bd;
      }

      .day-today {
        background: #e3f2fd;
      }

      .day-today .day-number {
        color: #1976d2;
        font-weight: 700;
      }

      /* Tasks in calendar */
      .task-item {
        font-size: 8px;
        padding: 1px 3px;
        margin-bottom: 1px;
        border-radius: 2px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
      }

      .task-executed {
        background: #d1e7dd;
        color: #0f5132;
      }

      .task-pending {
        background: #fff3cd;
        color: #856404;
      }

      .task-overdue {
        background: #f8d7da;
        color: #721c24;
      }

      /* Statistics Panel */
      .stats-panel {
        background: white;
        border: 1px solid #dee2e6;
        border-radius: 6px;
        padding: 12px;
        margin-bottom: 12px;
      }

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 12px;
      }

      .stat-item {
        text-align: center;
        padding: 8px;
        background: #f8f9fa;
        border-radius: 4px;
      }

      .stat-number {
        font-size: 18px;
        font-weight: 700;
        color: #495057;
        margin-bottom: 4px;
      }

      .stat-label {
        font-size: 10px;
        color: #6c757d;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      /* Responsive */
      @media (max-width: 768px) {
        .reports-layout {
          flex-direction: column;
        }
        
        .menu-column {
          width: 100%;
          height: auto;
          display: flex;
          overflow-x: auto;
        }
        
        .stats-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    `;
  }
}
