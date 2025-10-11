// frontend/src/modules/connect-id/pages/user-qr.page.ts
export class UserQrPage {
  
  static getContent(): string {
    return `
      <div class="page-content">
        <div class="page-header">
          <h2>👤 Identyfikacja Użytkownika - QR Code</h2>
          <p>Zeskanuj kod QR użytkownika za pomocą kamery</p>
        </div>
        
        <div class="identification-display">
          <div class="qr-scanner-area">
            <div class="camera-preview">
              <div class="camera-icon">👤📱</div>
              <div class="scanner-status">Gotowy do skanowania</div>
              <div class="scanner-instruction">Pokaż kod QR użytkownika do kamery</div>
              <div class="scan-frame"></div>
            </div>
            
            <div class="scanner-controls">
              <button class="control-btn" id="start-camera">📹 Start kamery</button>
              <button class="control-btn" id="switch-camera">🔄 Przełącz kamerę</button>
              <button class="control-btn" id="toggle-flash">💡 Latarka</button>
            </div>
          </div>
          
          <div class="user-history">
            <h3>Historia skanów użytkowników</h3>
            <div class="user-item">
              <span class="user-avatar">👨‍💼</span>
              <div class="user-info">
                <div class="user-name">Jan Kowalski</div>
                <div class="user-code">QR-USR-001</div>
                <div class="user-role">Administrator</div>
                <div class="user-time">10:35:12</div>
              </div>
              <span class="user-status success">✅ Zalogowany</span>
            </div>
            <div class="user-item">
              <span class="user-avatar">👩‍🔬</span>
              <div class="user-info">
                <div class="user-name">Anna Nowak</div>
                <div class="user-code">QR-USR-002</div>
                <div class="user-role">Technik</div>
                <div class="user-time">10:30:45</div>
              </div>
              <span class="user-status success">✅ Zalogowany</span>
            </div>
            <div class="user-item">
              <span class="user-avatar">👨‍🔧</span>
              <div class="user-info">
                <div class="user-name">Piotr Wiśniewski</div>
                <div class="user-code">QR-USR-003</div>
                <div class="user-role">Operator</div>
                <div class="user-time">10:25:18</div>
              </div>
              <span class="user-status offline">⏸️ Wylogowany</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static getStyles(): string {
    return `
      .page-content {
        padding: 20px;
        max-width: 800px;
        margin: 0 auto;
      }

      .page-header h2 {
        color: #333;
        margin: 0 0 10px 0;
        font-size: 24px;
      }

      .page-header p {
        color: #666;
        margin: 0 0 30px 0;
        font-size: 16px;
      }

      .qr-scanner-area {
        background: linear-gradient(135deg, #2196F3, #21CBF3);
        color: white;
        padding: 30px;
        border-radius: 15px;
        margin-bottom: 30px;
        text-align: center;
      }

      .camera-preview {
        background: rgba(255,255,255,0.1);
        border-radius: 10px;
        padding: 30px;
        margin-bottom: 20px;
        position: relative;
      }

      .camera-icon {
        font-size: 64px;
        margin-bottom: 15px;
      }

      .scanner-status {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
      }

      .scanner-instruction {
        font-size: 14px;
        opacity: 0.9;
        margin-bottom: 20px;
      }

      .scan-frame {
        width: 200px;
        height: 200px;
        border: 3px dashed rgba(255,255,255,0.7);
        border-radius: 10px;
        margin: 0 auto;
        position: relative;
        animation: scanPulse 2s infinite;
      }

      @keyframes scanPulse {
        0% { border-color: rgba(255,255,255,0.7); }
        50% { border-color: rgba(255,255,255,1); }
        100% { border-color: rgba(255,255,255,0.7); }
      }

      .scanner-controls {
        display: flex;
        gap: 10px;
        justify-content: center;
        flex-wrap: wrap;
      }

      .control-btn {
        padding: 10px 15px;
        background: rgba(255,255,255,0.2);
        color: white;
        border: 1px solid rgba(255,255,255,0.3);
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.3s ease;
      }

      .control-btn:hover {
        background: rgba(255,255,255,0.3);
        transform: translateY(-2px);
      }

      .user-history h3 {
        color: #333;
        margin: 0 0 15px 0;
        font-size: 18px;
      }

      .user-item {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 15px;
        background: #f9f9f9;
        border-radius: 10px;
        margin-bottom: 10px;
        transition: all 0.2s ease;
      }

      .user-item:hover {
        background: #f0f0f0;
        transform: translateX(5px);
      }

      .user-avatar {
        font-size: 24px;
      }

      .user-info {
        flex: 1;
      }

      .user-name {
        font-weight: bold;
        color: #333;
        margin-bottom: 3px;
      }

      .user-code {
        font-family: monospace;
        color: #666;
        font-size: 12px;
        margin-bottom: 3px;
      }

      .user-role {
        color: #2196F3;
        font-size: 12px;
        font-weight: 500;
        margin-bottom: 3px;
      }

      .user-time {
        color: #999;
        font-size: 12px;
      }

      .user-status.success {
        color: #4CAF50;
        font-weight: 500;
      }

      .user-status.offline {
        color: #ff9800;
        font-weight: 500;
      }
    `;
  }
}
