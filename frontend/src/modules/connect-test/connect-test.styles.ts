// frontend/src/modules/connect-test/connect-test.styles.ts

export class ConnectTestStyles {
  static getStyles(): string {
    return `
      .connect-test-compact { 
        height: 100%; 
        overflow: hidden; 
      }
      
      .compact-layout { 
        display: flex; 
        height: 365px; 
        background: #f5f5f5; 
      }
      
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

      /* Testing Calendar */
      .testing-calendar-container {
        background: white;
        border-radius: 8px;
        padding: 16px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }

      .calendar-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 1px solid #e9ecef;
      }

      .calendar-title {
        font-size: 18px;
        font-weight: 600;
        color: #2c3e50;
        margin: 0;
      }

      .calendar-nav {
        display: flex;
        gap: 8px;
      }

      .nav-btn {
        background: #3a3a3a;
        border: 1px solid #ddd;
        padding: 6px 12px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.2s;
      }

      .nav-btn:hover {
        background: #f8f9fa;
        border-color: #adb5bd;
      }

      .nav-btn:active {
        background: #e9ecef;
      }

      /* Calendar Grid */
      .calendar-grid {
        border: 1px solid #dee2e6;
        border-radius: 6px;
        overflow: hidden;
        background: white;
      }

      .calendar-days-header {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        background: #f8f9fa;
        border-bottom: 1px solid #dee2e6;
      }

      .day-header {
        padding: 12px 8px;
        text-align: center;
        font-size: 12px;
        font-weight: 600;
        color: #6c757d;
        border-right: 1px solid #dee2e6;
      }

      .day-header:last-child {
        border-right: none;
      }

      .calendar-days {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
      }

      .calendar-day {
        min-height: 80px;
        border-right: 1px solid #dee2e6;
        border-bottom: 1px solid #dee2e6;
        padding: 8px 4px;
        position: relative;
        background: white;
        cursor: pointer;
        transition: background-color 0.2s;
      }

      .calendar-day:hover {
        background: #f8f9fa;
      }

      .calendar-day:last-child {
        border-right: none;
      }

      .day-number {
        font-size: 14px;
        font-weight: 600;
        color: #495057;
        margin-bottom: 4px;
      }

      .day-other-month {
        background: #f8f9fa;
      }

      .day-other-month .day-number {
        color: #adb5bd;
      }

      .day-today {
        background: #e3f2fd;
      }

      .day-today .day-number {
        color: #1976d2;
        font-weight: 700;
      }

      .day-has-activities {
        background: #fff3e0;
      }

      .day-has-activities .day-number {
        color: #ef6c00;
      }

      /* Activity Navigation */
      .activity-navigation {
        background: white;
        border-radius: 8px;
        padding: 16px;
        margin-top: 16px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }

      .activity-nav-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      }

      .activity-counter {
        font-size: 14px;
        color: #6c757d;
        font-weight: 500;
      }

      .activity-card {
        background: #f8f9fa;
        border: 1px solid #dee2e6;
        border-radius: 6px;
        padding: 16px;
        margin-bottom: 16px;
      }

      .activity-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 12px;
      }

      .activity-icon {
        width: 40px;
        height: 40px;
        background: #667eea;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        color: white;
      }

      .activity-info {
        flex: 1;
      }

      .activity-title {
        font-size: 16px;
        font-weight: 600;
        color: #2c3e50;
        margin: 0 0 4px 0;
      }

      .activity-time {
        font-size: 12px;
        color: #6c757d;
        margin: 0;
      }

      .activity-status {
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 11px;
        font-weight: 500;
        background: #d1ecf1;
        color: #0c5460;
      }

      /* Progress Bar */
      .progress-bar {
        width: 100%;
        height: 8px;
        background: #e9ecef;
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 16px;
      }

      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #667eea, #764ba2);
        border-radius: 4px;
        transition: width 0.3s ease;
      }

      /* Activity Controls */
      .activity-controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .control-btn {
        padding: 8px 16px;
        border: 1px solid #ddd;
        background: white;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 500;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .control-btn:hover {
        background: #f8f9fa;
      }

      .control-btn.primary {
        background: #007bff;
        color: white;
        border-color: #007bff;
      }

      .control-btn.primary:hover {
        background: #0056b3;
      }

      /* Queue List */
      .queue-list {
        margin-top: 16px;
      }

      .queue-title {
        font-size: 14px;
        font-weight: 600;
        color: #495057;
        margin-bottom: 12px;
      }

      .queue-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px 12px;
        background: white;
        border: 1px solid #dee2e6;
        border-radius: 4px;
        margin-bottom: 6px;
      }

      .queue-icon {
        width: 24px;
        height: 24px;
        background: #6c757d;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: white;
      }

      .queue-details {
        flex: 1;
      }

      .queue-activity {
        font-size: 12px;
        font-weight: 500;
        color: #495057;
        margin: 0;
      }

      .queue-device {
        font-size: 10px;
        color: #6c757d;
        margin: 0;
      }

      .queue-time {
        font-size: 10px;
        color: #6c757d;
        font-weight: 500;
      }

      /* Status indicators */
      .status-success { color: #28a745; }
      .status-warning { color: #ffc107; }
      .status-error { color: #dc3545; }

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
        
        .calendar-days {
          grid-template-columns: repeat(7, 1fr);
        }
        
        .activity-controls {
          flex-direction: column;
          gap: 8px;
        }
      }
    `;
  }
}
