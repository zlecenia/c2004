// frontend/src/modules/connect-workshop/pages/requests-sync.page.ts
export class RequestsSyncPage {
  
  static getContent(): string {
    return `
      <div class="page-content">
        <div class="page-header">
          <h2>🔄 Synchronizacja Zgłoszeń</h2>
          <p>Synchronizuj dane z systemami zewnętrznymi</p>
        </div>
        
        <div class="sync-container">
          <div class="sync-status-card">
            <h3>📊 Status synchronizacji</h3>
            <div class="status-grid">
              <div class="status-item">
                <span class="status-label">Ostatnia synchronizacja:</span>
                <span class="status-value">2025-10-11 12:00:15</span>
              </div>
              <div class="status-item">
                <span class="status-label">Status połączenia:</span>
                <span class="status-value success">✅ Połączony</span>
              </div>
              <div class="status-item">
                <span class="status-label">Zsynchronizowane rekordy:</span>
                <span class="status-value">1,247</span>
              </div>
              <div class="status-item">
                <span class="status-label">Oczekujące zmiany:</span>
                <span class="status-value warning">⚠️ 3 konflikty</span>
              </div>
            </div>
          </div>
          
          <div class="sync-options-card">
            <h3>⚙️ Opcje synchronizacji</h3>
            <div class="checkbox-group">
              <label><input type="checkbox" checked> Automatyczna synchronizacja co 5 minut</label>
              <label><input type="checkbox" checked> Synchronizuj tylko nowe rekordy</label>
              <label><input type="checkbox"> Synchronizuj załączniki</label>
              <label><input type="checkbox"> Powiadom o konfliktach</label>
            </div>
          </div>
          
          <div class="sync-systems-card">
            <h3>🔗 Połączone systemy</h3>
            <div class="systems-list">
              <div class="system-item">
                <span class="system-icon">🏭</span>
                <span class="system-name">Fleet Manager</span>
                <span class="system-status success">●</span>
              </div>
              <div class="system-item">
                <span class="system-icon">📊</span>
                <span class="system-name">ERP System</span>
                <span class="system-status success">●</span>
              </div>
              <div class="system-item">
                <span class="system-icon">☁️</span>
                <span class="system-name">Cloud Backup</span>
                <span class="system-status warning">●</span>
              </div>
            </div>
          </div>
          
          <div class="sync-actions">
            <button class="btn-sync-now">🔄 Synchronizuj Teraz</button>
            <button class="btn-resolve-conflicts">⚠️ Rozwiąż Konflikty (3)</button>
            <button class="btn-sync-history">📋 Historia Synchronizacji</button>
          </div>
        </div>
      </div>
    `;
  }

  static getStyles(): string {
    return `
      .page-content { padding: 20px; max-width: 900px; margin: 0 auto; }
      .page-header h2 { color: #333; font-size: 24px; margin-bottom: 5px; }
      .sync-container { display: flex; flex-direction: column; gap: 20px; }
      .sync-status-card, .sync-options-card, .sync-systems-card { background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
      .sync-status-card h3, .sync-options-card h3, .sync-systems-card h3 { margin: 0 0 15px 0; font-size: 18px; color: #333; }
      .status-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
      .status-item { display: flex; flex-direction: column; gap: 5px; }
      .status-label { font-size: 12px; color: #666; font-weight: 600; }
      .status-value { font-size: 16px; color: #333; }
      .status-value.success { color: #28a745; }
      .status-value.warning { color: #ffc107; }
      .checkbox-group { display: flex; flex-direction: column; gap: 12px; }
      .systems-list { display: flex; flex-direction: column; gap: 12px; }
      .system-item { display: flex; align-items: center; gap: 15px; padding: 12px; background: #f8f9fa; border-radius: 6px; }
      .system-icon { font-size: 24px; }
      .system-name { flex: 1; font-size: 14px; font-weight: 500; }
      .system-status { font-size: 20px; }
      .system-status.success { color: #28a745; }
      .system-status.warning { color: #ffc107; }
      .sync-actions { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
      .btn-sync-now, .btn-resolve-conflicts, .btn-sync-history { padding: 12px; border: none; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer; }
      .btn-sync-now { background: #007bff; color: white; }
      .btn-resolve-conflicts { background: #ffc107; color: #333; }
      .btn-sync-history { background: #6c757d; color: white; }
    `;
  }
}
