// frontend/src/modules/connect-id/connect-id.styles.ts

export class ConnectIdStyles {
  static getStyles(): string {
    return `
      .connect-id-compact {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background: #f8f9fa;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      /* Compact Layout */
      .compact-layout {
        display: flex;
        height: 100%;
        gap: 1px;
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

      /* Menu Items */
      .method-item, .user-menu-item {
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
      }

      .menu-icon {
        font-size: 13px;
      }

      .menu-label {
        font-size: 12px;
        font-weight: 500;
        text-align: center;
      }

      .method-item:hover, .user-menu-item:hover {
        background: #4a4a4a;
        color: white;
      }

      .method-item.active {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }

      /* Users Column */
      .users-column {
        display: none;
        width: 150px;
      }

      .users-column.show {
        display: block;
      }

      .user-menu-item {
        flex-direction: row;
        justify-content: flex-start;
        padding: 8px;
        text-align: left;
      }

      .user-info {
        flex: 1;
      }

      .user-name {
        font-size: 11px;
        font-weight: 600;
        margin-bottom: 2px;
      }

      .user-role {
        font-size: 9px;
        opacity: 0.7;
      }

      .user-menu-item.selected {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }

      /* Main Content */
      .main-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        background: white;
        overflow: hidden;
      }

      .content-body {
        flex: 1;
        padding: 20px;
        overflow-y: auto;
      }

      /* User Login Form */
      .user-login-form {
        max-width: 400px;
        margin: 0 auto;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        overflow: hidden;
      }

      .login-header {
        display: flex;
        align-items: center;
        padding: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }

      .user-avatar {
        font-size: 32px;
        margin-right: 15px;
      }

      .selected-user-name {
        margin: 0 0 5px 0;
        font-size: 18px;
        font-weight: 600;
      }

      .user-role {
        margin: 0;
        font-size: 13px;
        opacity: 0.9;
      }

      .login-content {
        padding: 20px;
      }

      .password-section {
        margin-bottom: 20px;
      }

      .password-section label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
        color: #333;
      }

      .password-input-container {
        display: flex;
        gap: 8px;
      }

      .password-input {
        flex: 1;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 13px;
      }

      .show-keyboard-btn {
        padding: 10px 12px;
        border: 1px solid #ddd;
        background: #f8f9fa;
        border-radius: 4px;
        cursor: pointer;
        color: #666;
      }

      .show-keyboard-btn:hover {
        background: #e9ecef;
      }

      .login-actions {
        display: flex;
        gap: 10px;
      }

      .btn-login, .btn-cancel {
        flex: 1;
        padding: 12px;
        border: none;
        border-radius: 4px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
      }

      .btn-login {
        background: #28a745;
        color: white;
      }

      .btn-login:hover {
        background: #218838;
      }

      .btn-cancel {
        background: #6c757d;
        color: white;
      }

      .btn-cancel:hover {
        background: #5a6268;
      }

      /* Device Identification */
      .device-identification {
        max-width: 600px;
        margin: 0 auto;
      }

      .device-header {
        text-align: center;
        margin-bottom: 30px;
      }

      .device-header h2 {
        margin: 0 0 10px 0;
        color: #333;
        font-size: 24px;
        font-weight: 600;
      }

      .device-status {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
      }

      .status-text {
        font-size: 13px;
        color: #666;
      }

      .status-indicator {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #28a745;
      }

      .status-indicator.scanning {
        background: #ffc107;
        animation: pulse 1.5s infinite;
      }

      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
      }

      /* Device Info Card */
      .device-info-card {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 20px;
        background: white;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        margin-bottom: 20px;
      }

      .device-icon {
        color: #667eea;
      }

      .device-details {
        flex: 1;
      }

      .device-name {
        margin: 0 0 5px 0;
        font-size: 18px;
        font-weight: 600;
        color: #333;
      }

      .device-serial {
        margin: 0 0 10px 0;
        font-size: 13px;
        color: #666;
      }

      .device-badges {
        display: flex;
        gap: 5px;
      }

      .badge {
        padding: 2px 6px;
        border-radius: 10px;
        font-size: 10px;
        font-weight: 500;
      }

      .status-active {
        background: #d4edda;
        color: #155724;
      }

      .type-pressure {
        background: #d1ecf1;
        color: #0c5460;
      }

      .btn-action {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 10px 15px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-weight: 500;
      }

      .btn-action:hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
      }

      /* Recent Devices */
      .recent-devices h4 {
        margin: 0 0 15px 0;
        font-size: 13px;
        color: #333;
        font-weight: 600;
      }

      .devices-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 10px;
      }

      .device-card {
        padding: 12px;
        background: #f8f9fa;
        border: 1px solid #e0e0e0;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s;
        text-align: center;
      }

      .device-card:hover {
        background: #e9ecef;
        transform: translateY(-1px);
      }

      .device-card-icon {
        margin-bottom: 6px;
        color: #667eea;
      }

      .device-card-name {
        font-size: 11px;
        font-weight: 600;
        color: #333;
        margin-bottom: 2px;
      }

      .device-card-serial {
        font-size: 10px;
        color: #666;
      }

      /* Protocol Screen */
      .protocol-screen {
        max-width: 600px;
        margin: 0 auto;
      }

      .protocol-header {
        text-align: center;
        margin-bottom: 30px;
      }

      .protocol-info h2 {
        margin: 0 0 10px 0;
        color: #333;
        font-size: 24px;
        font-weight: 600;
      }

      .protocol-meta {
        display: flex;
        justify-content: center;
        gap: 20px;
        color: #666;
        font-size: 13px;
      }

      .identification-result {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 20px;
        background: #d4edda;
        border: 1px solid #c3e6cb;
        border-radius: 8px;
        margin-bottom: 20px;
      }

      .result-icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        font-weight: bold;
      }

      .result-icon.success {
        background: #28a745;
        color: white;
      }

      .result-title {
        margin: 0 0 10px 0;
        color: #155724;
        font-size: 16px;
        font-weight: 600;
      }

      .info-row {
        display: flex;
        margin-bottom: 5px;
      }

      .info-label {
        min-width: 80px;
        font-weight: 500;
        color: #155724;
      }

      .info-value {
        color: #155724;
      }

      /* Next Steps */
      .next-steps h4 {
        margin: 0 0 15px 0;
        color: #333;
        font-size: 13px;
        font-weight: 600;
      }

      .steps-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .step-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        background: #f8f9fa;
        border-radius: 6px;
      }

      .step-number {
        width: 24px;
        height: 24px;
        background: #667eea;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        font-weight: 600;
      }

      .step-text {
        flex: 1;
        font-size: 13px;
        color: #333;
      }

      .step-action {
        padding: 6px 8px;
        background: #667eea;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }

      .protocol-actions {
        display: flex;
        gap: 10px;
        margin-top: 30px;
      }

      .btn-protocol {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 12px 16px;
        background: #667eea;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 500;
      }

      .btn-protocol.secondary {
        background: #6c757d;
      }

      .btn-protocol:hover {
        transform: translateY(-1px);
      }

      /* Scanning Interface */
      .scanning-interface {
        text-align: center;
        max-width: 400px;
        margin: 0 auto;
        padding: 40px 20px;
      }

      .scanning-animation {
        position: relative;
        width: 200px;
        height: 200px;
        margin: 0 auto 30px;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        overflow: hidden;
      }

      .scan-target {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 120px;
        height: 120px;
      }

      .target-corners {
        position: relative;
        width: 100%;
        height: 100%;
      }

      .corner {
        position: absolute;
        width: 20px;
        height: 20px;
        border: 3px solid #667eea;
      }

      .corner.top-left {
        top: 0;
        left: 0;
        border-right: none;
        border-bottom: none;
      }

      .corner.top-right {
        top: 0;
        right: 0;
        border-left: none;
        border-bottom: none;
      }

      .corner.bottom-left {
        bottom: 0;
        left: 0;
        border-right: none;
        border-top: none;
      }

      .corner.bottom-right {
        bottom: 0;
        right: 0;
        border-left: none;
        border-top: none;
      }

      .scan-line {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, transparent 0%, #667eea 50%, transparent 100%);
        animation: scan 2s linear infinite;
      }

      @keyframes scan {
        0% { top: 0; }
        100% { top: calc(100% - 2px); }
      }

      #scanning-title {
        margin: 0 0 10px 0;
        color: #333;
        font-size: 18px;
        font-weight: 600;
      }

      #scanning-instruction {
        margin: 0 0 20px 0;
        color: #666;
        font-size: 13px;
      }

      .progress-dots {
        display: flex;
        justify-content: center;
        gap: 8px;
        margin-bottom: 30px;
      }

      .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #e0e0e0;
        animation: dotPulse 1.5s infinite;
      }

      .dot.active {
        background: #667eea;
      }

      .dot:nth-child(2) {
        animation-delay: 0.5s;
      }

      .dot:nth-child(3) {
        animation-delay: 1s;
      }

      @keyframes dotPulse {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 1; }
      }

      .btn-cancel-scan {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 10px 16px;
        background: #dc3545;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        margin: 0 auto;
      }

      /* Manual Entry */
      .manual-entry {
        max-width: 400px;
        margin: 0 auto;
      }

      .entry-header {
        text-align: center;
        margin-bottom: 30px;
      }

      .entry-header h2 {
        margin: 0 0 10px 0;
        color: #333;
        font-size: 20px;
        font-weight: 600;
      }

      .entry-description {
        margin: 0;
        color: #666;
        font-size: 13px;
      }

      .input-section {
        margin-bottom: 20px;
      }

      .input-section label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
        color: #333;
      }

      .input-container {
        display: flex;
        gap: 8px;
      }

      .manual-input {
        flex: 1;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 13px;
      }

      .manual-input:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
      }

      .entry-actions {
        display: flex;
        gap: 10px;
      }

      .btn-verify, .btn-clear {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 12px 16px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 500;
      }

      .btn-verify {
        background: #28a745;
        color: white;
        flex: 1;
      }

      .btn-verify:hover {
        background: #218838;
      }

      .btn-clear {
        background: #6c757d;
        color: white;
      }

      .btn-clear:hover {
        background: #5a6268;
      }

      /* Responsive */
      @media (max-width: 768px) {
        .compact-layout {
          flex-direction: column;
        }
        
        .menu-column {
          width: 100%;
          height: auto;
          flex-direction: row;
          overflow-x: auto;
        }
        
        .method-item {
          min-width: 80px;
          flex-shrink: 0;
        }
      }
    `;
  }
}
