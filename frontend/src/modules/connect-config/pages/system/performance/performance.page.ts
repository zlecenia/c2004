// frontend/src/modules/connect-config/pages/system/performance.page.ts

export class PerformancePage {
  static getContent(): string {
    return `
      <div class="config-page-content">
        <div class="config-header">
          <h2>⚡ Wydajność Systemu</h2>
          <p class="config-description">Monitorowanie i optymalizacja wydajności systemu</p>
        </div>

        <div class="config-sections">
          <!-- Performance Monitoring -->
          <div class="config-section">
            <h3 class="section-title">
              <span class="section-icon">📊</span>
              Monitoring Wydajności
            </h3>
            
            <div class="performance-metrics">
              <div class="metric-card">
                <div class="metric-label">CPU Usage</div>
                <div class="metric-value">45%</div>
                <div class="metric-bar">
                  <div class="metric-progress"></div>
                </div>
              </div>
              
              <div class="metric-card">
                <div class="metric-label">Memory Usage</div>
                <div class="metric-value">62%</div>
                <div class="metric-bar">
                  <div class="metric-progress"></div>
                </div>
              </div>
              
              <div class="metric-card">
                <div class="metric-label">Disk Usage</div>
                <div class="metric-value">28%</div>
                <div class="metric-bar">
                  <div class="metric-progress"></div>
                </div>
              </div>
              
              <div class="metric-card">
                <div class="metric-label">Network I/O</div>
                <div class="metric-value">15 MB/s</div>
                <div class="metric-bar">
                  <div class="metric-progress"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Performance Settings -->
          <div class="config-section">
            <h3 class="section-title">
              <span class="section-icon">⚙️</span>
              Ustawienia Wydajności
            </h3>
            
            <div class="setting-item">
              <label class="setting-label">
                Priorytet Procesów
                <span class="setting-hint">Ustaw priorytet wykonywania procesów</span>
              </label>
              <select class="setting-select">
                <option value="low">Niski</option>
                <option value="normal" selected>Normalny</option>
                <option value="high">Wysoki</option>
                <option value="realtime">Czasu rzeczywistego</option>
              </select>
            </div>

            <div class="setting-item">
              <label class="setting-label">
                Cache Settings
                <span class="setting-hint">Konfiguracja pamięci cache</span>
              </label>
              <div class="setting-row">
                <input type="number" class="setting-input" value="256" min="64" max="1024" />
                <span class="setting-unit">MB</span>
              </div>
            </div>

            <div class="setting-item">
              <label class="setting-label">
                Auto Optimization
                <span class="setting-hint">Automatyczna optymalizacja systemu</span>
              </label>
              <label class="toggle-switch">
                <input type="checkbox" checked />
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>

          <!-- Process Management -->
          <div class="config-section">
            <h3 class="section-title">
              <span class="section-icon">🔄</span>
              Zarządzanie Procesami
            </h3>
            
            <div class="process-list">
              <div class="process-header">
                <span>Process</span>
                <span>CPU %</span>
                <span>Memory</span>
                <span>Actions</span>
              </div>
              
              <div class="process-item">
                <span class="process-name">Connect Service</span>
                <span class="process-cpu">15%</span>
                <span class="process-memory">128 MB</span>
                <div class="process-actions">
                  <button class="btn-process btn-restart">↻</button>
                  <button class="btn-process btn-priority">⚡</button>
                </div>
              </div>
              
              <div class="process-item">
                <span class="process-name">Database Service</span>
                <span class="process-cpu">8%</span>
                <span class="process-memory">256 MB</span>
                <div class="process-actions">
                  <button class="btn-process btn-restart">↻</button>
                  <button class="btn-process btn-priority">⚡</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="config-actions">
          <button class="btn-save">💾 Zapisz ustawienia</button>
          <button class="btn-optimize">⚡ Optymalizuj teraz</button>
          <button class="btn-reset">🔄 Reset do domyślnych</button>
        </div>
      </div>
    `;
  }

  static getStyles(): string {
    return `
      .performance-metrics {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
        margin-bottom: 25px;
      }

      .metric-card {
        background: white;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 15px;
        text-align: center;
      }

      .metric-label {
        font-size: 12px;
        color: #666;
        margin-bottom: 5px;
        text-transform: uppercase;
      }

      .metric-value {
        font-size: 24px;
        font-weight: 600;
        color: #333;
        margin-bottom: 10px;
      }

      .metric-bar {
        height: 6px;
        background: #f0f0f0;
        border-radius: 3px;
        overflow: hidden;
      }

      .metric-progress {
        height: 100%;
        background: linear-gradient(90deg, #28a745, #20c997);
        transition: width 0.3s ease;
      }

      .process-list {
        background: white;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        overflow: hidden;
      }

      .process-header {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr;
        gap: 15px;
        padding: 12px 15px;
        background: #f8f9fa;
        font-weight: 600;
        color: #666;
        font-size: 12px;
        text-transform: uppercase;
      }

      .process-item {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr;
        gap: 15px;
        padding: 12px 15px;
        border-top: 1px solid #f0f0f0;
        align-items: center;
      }

      .process-item:hover {
        background: #f8f9fa;
      }

      .process-name {
        font-weight: 500;
        color: #333;
      }

      .process-cpu,
      .process-memory {
        color: #666;
        font-family: monospace;
      }

      .process-actions {
        display: flex;
        gap: 5px;
      }

      .btn-process {
        padding: 4px 8px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        transition: all 0.2s;
      }

      .btn-restart {
        background: #ffc107;
        color: #212529;
      }

      .btn-restart:hover {
        background: #e0a800;
      }

      .btn-priority {
        background: #17a2b8;
        color: white;
      }

      .btn-priority:hover {
        background: #138496;
      }

      .btn-optimize {
        background: #28a745;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.2s;
      }

      .btn-optimize:hover {
        background: #218838;
      }
    `;
  }
}
