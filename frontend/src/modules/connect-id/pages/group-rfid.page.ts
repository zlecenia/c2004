// frontend/src/modules/connect-id/pages/group-rfid.page.ts
export class GroupRfidPage {
  
  static getContent(): string {
    return `
      <div class="page-content">
        <div class="page-header">
          <h2>👥 Identyfikacja Grupy - RFID</h2>
          <p>Przyłóż kartę RFID reprezentującą grupę użytkowników</p>
        </div>
        
        <div class="identification-display">
          <div class="rfid-reader-area">
            <div class="reader-icon">👥📡</div>
            <div class="reader-status">Gotowy do odczytu grupy</div>
            <div class="reader-instruction">Przyłóż kartę grupową do czytnika RFID</div>
          </div>
          
          <div class="group-info-panel">
            <h3>Aktywne grupy</h3>
            <div class="group-card">
              <div class="group-header">
                <span class="group-icon">👨‍👩‍👧‍👦</span>
                <div class="group-details">
                  <div class="group-name">Zespół Administracyjny</div>
                  <div class="group-code">GRP-ADMIN-001</div>
                </div>
                <span class="group-count">4 członków</span>
              </div>
              <div class="group-members">
                <span class="member-avatar">👨‍💼</span>
                <span class="member-avatar">👩‍💼</span>
                <span class="member-avatar">👨‍💻</span>
                <span class="member-avatar">👩‍🔬</span>
              </div>
            </div>
            
            <div class="group-card">
              <div class="group-header">
                <span class="group-icon">🔧</span>
                <div class="group-details">
                  <div class="group-name">Zespół Techniczny</div>
                  <div class="group-code">GRP-TECH-002</div>
                </div>
                <span class="group-count">6 członków</span>
              </div>
              <div class="group-members">
                <span class="member-avatar">👨‍🔧</span>
                <span class="member-avatar">👩‍🔧</span>
                <span class="member-avatar">👨‍🏭</span>
                <span class="member-avatar">👩‍🏭</span>
                <span class="member-avatar">👨‍⚕️</span>
                <span class="member-avatar">👩‍⚕️</span>
              </div>
            </div>
            
            <div class="group-card">
              <div class="group-header">
                <span class="group-icon">🧪</span>
                <div class="group-details">
                  <div class="group-name">Zespół Kontroli Jakości</div>
                  <div class="group-code">GRP-QA-003</div>
                </div>
                <span class="group-count">3 członków</span>
              </div>
              <div class="group-members">
                <span class="member-avatar">👨‍🔬</span>
                <span class="member-avatar">👩‍🔬</span>
                <span class="member-avatar">👨‍⚕️</span>
              </div>
            </div>
          </div>
          
          <div class="group-history">
            <h3>Historia dostępu grupowego</h3>
            <div class="history-item">
              <span class="time">10:45:30</span>
              <span class="type">RFID</span>
              <span class="value">GRP-ADMIN-001</span>
              <span class="status success">✅ Zespół Administracyjny - dostęp przyznany</span>
            </div>
            <div class="history-item">
              <span class="time">10:42:15</span>
              <span class="type">RFID</span>
              <span class="value">GRP-TECH-002</span>
              <span class="status success">✅ Zespół Techniczny - dostęp przyznany</span>
            </div>
            <div class="history-item">
              <span class="time">10:38:08</span>
              <span class="type">RFID</span>
              <span class="value">GRP-UNKNOWN</span>
              <span class="status error">❌ Nieznana grupa</span>
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
        max-width: 900px;
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

      .rfid-reader-area {
        background: linear-gradient(135deg, #FF9800, #FF5722);
        color: white;
        padding: 40px;
        border-radius: 15px;
        text-align: center;
        margin-bottom: 30px;
        box-shadow: 0 4px 15px rgba(255, 152, 0, 0.3);
      }

      .reader-icon {
        font-size: 64px;
        margin-bottom: 15px;
        animation: pulse 2s infinite;
      }

      .reader-status {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
      }

      .reader-instruction {
        font-size: 16px;
        opacity: 0.9;
      }

      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
      }

      .group-info-panel {
        margin-bottom: 30px;
      }

      .group-info-panel h3 {
        color: #333;
        margin: 0 0 15px 0;
        font-size: 18px;
      }

      .group-card {
        background: #f8f9fa;
        border: 1px solid #e9ecef;
        border-radius: 10px;
        padding: 15px;
        margin-bottom: 15px;
        transition: all 0.2s ease;
      }

      .group-card:hover {
        background: #e3f2fd;
        border-color: #2196F3;
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(33, 150, 243, 0.2);
      }

      .group-header {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 10px;
      }

      .group-icon {
        font-size: 24px;
      }

      .group-details {
        flex: 1;
      }

      .group-name {
        font-weight: bold;
        color: #333;
        margin-bottom: 3px;
      }

      .group-code {
        font-family: monospace;
        color: #666;
        font-size: 12px;
      }

      .group-count {
        color: #2196F3;
        font-weight: 500;
        font-size: 14px;
      }

      .group-members {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }

      .member-avatar {
        font-size: 20px;
        background: #fff;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #e9ecef;
        transition: all 0.2s ease;
      }

      .member-avatar:hover {
        border-color: #2196F3;
        transform: scale(1.1);
      }

      .group-history h3 {
        color: #333;
        margin: 0 0 15px 0;
        font-size: 18px;
      }

      .history-item {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 12px;
        background: #f9f9f9;
        border-radius: 8px;
        margin-bottom: 8px;
        font-size: 14px;
      }

      .history-item .time {
        color: #666;
        font-family: monospace;
        min-width: 80px;
      }

      .history-item .type {
        background: #FF9800;
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        min-width: 50px;
        text-align: center;
      }

      .history-item .value {
        font-family: monospace;
        background: #fff;
        padding: 4px 8px;
        border-radius: 4px;
        border: 1px solid #ddd;
        min-width: 120px;
      }

      .history-item .status {
        flex: 1;
        font-weight: 500;
      }

      .history-item .status.success {
        color: #4CAF50;
      }

      .history-item .status.error {
        color: #f44336;
      }
    `;
  }
}
