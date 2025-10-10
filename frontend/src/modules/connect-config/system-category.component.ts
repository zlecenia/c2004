// frontend / src / modules / connect - config / system - category.component.ts

export interface SystemCategoryData {
  sections: SystemSection[];
}

export interface SystemSection {
  id: string;
  name: string;
  icon?: string;
}

export class SystemCategoryComponent {
  constructor() {}

  public render(): string {
    const sections = this.getSystemSections();

    return `
      <div id="system - subcategories" class="subcategory - group active">
        ${sections.map(section => this.renderSection(section)).join('')}
      </div>
    `;
  }

  private renderSection(section: SystemSection): string {
    const activeClass = section.id === 'system' ? ' active' : '';
    return `
      <button class="section - item compact${activeClass}" data - section="${section.id}">
        <span class="menu - label">${section.name}</span>
      </button>
    `;
  }

  public renderContent(): string {
    return `
      <!-- System Section -->
      <div id="system - content" class="section - content active">
        <div class="config - form">
          <h4>🖥️ Konfiguracja Systemu</h4>
          <div class="form - section">
            <h5 > Podstawowe ustawienia</h5>
            <div class="form - row">
              <div class="form - group">
                <label > Nazwa systemu:</label>
                <input type="text" class="form - input" value="IdentificationSystem - C2004" />
              </div>
              <div class="form - group">
                <label > Język interfejsu:</label>
                <select class="form - select">
                  <option selected > Polski</option>
                  <option > English</option>
                  <option > Deutsch</option>
                </select>
              </div>
            </div>
            <div class="form - row">
              <div class="form - group">
                <label > Strefa czasowa:</label>
                <select class="form - select">
                  <option selected > Europe / Warsaw</option>
                  <option > Europe / London</option>
                  <option > UTC</option>
                </select>
              </div>
              <div class="form - group">
                <label > Auto - save interval (min):</label>
                <input type="number" class="form - input" value="5" min="1" max="60" />
              </div>
            </div>
          </div>
          <div class="form - actions">
            <button class="btn - save">💾 Zapisz</button>
            <button class="btn - test">🔍 Test połączenia</button>
          </div>
        </div>
      </div>

      <!-- Network Section -->
      <div id="network - content" class="section - content">
        <div class="config - form">
          <h4>🌐 Konfiguracja Sieci</h4>
          <div class="form - section">
            <h5 > Ustawienia sieciowe</h5>
            <div class="form - row">
              <div class="form - group">
                <label > IP Address:</label>
                <input type="text" class="form - input" value="192.168.1.100" />
              </div>
              <div class="form - group">
                <label > Subnet Mask:</label>
                <input type="text" class="form - input" value="255.255.255.0" />
              </div>
            </div>
            <div class="form - row">
              <div class="form - group">
                <label > Gateway:</label>
                <input type="text" class="form - input" value="192.168.1.1" />
              </div>
              <div class="form - group">
                <label > DNS Server:</label>
                <input type="text" class="form - input" value="8.8.8.8" />
              </div>
            </div>
            <div class="form - section">
              <h5 > WiFi Networks</h5>
              <div class="wifi - networks">
                <div class="wifi - item active">
                  <div class="wifi - info">
                    <span class="wifi - name">CompanyWiFi</span>
                    <span class="wifi - signal">Signal: Strong (95%)</span>
                  </div>
                  <button class="btn - connected">Connected</button>
                </div>
                <div class="wifi - item">
                  <div class="wifi - info">
                    <span class="wifi - name">GuestNetwork</span>
                    <span class="wifi - signal">Signal: Medium (65%)</span>
                  </div>
                  <button class="btn - connect">Connect</button>
                </div>
              </div>
            </div>
          </div>
          <div class="form - actions">
            <button class="btn - save">💾 Zapisz</button>
            <button class="btn - test">🌐 Test połączenia</button>
          </div>
        </div>
      </div>

      <!-- Performance Section -->
      <div id="performance - content" class="section - content">
        <div class="config - form">
          <h4>⚡ Wydajność</h4>
          <div class="form - section">
            <h5 > Performance Settings</h5>
            <div class="form - row">
              <div class="form - group">
                <label > CPU Priority:</label>
                <select class="form - select">
                  <option > Low</option>
                  <option selected > Normal</option>
                  <option > High</option>
                </select>
              </div>
              <div class="form - group">
                <label > Memory Cache (MB):</label>
                <input type="number" class="form - input" value="256" min="64" max="1024" />
              </div>
            </div>
          </div>
          <div class="form - actions">
            <button class="btn - save">💾 Zapisz</button>
            <button class="btn - test">📊 Test wydajności</button>
          </div>
        </div>
      </div>

      <!-- Monitoring Section -->
      <div id="monitoring - content" class="section - content">
        <div class="config - form">
          <h4>📊 Monitoring</h4>
          <div class="form - section">
            <h5 > System Monitoring</h5>
            <div class="form - row">
              <div class="form - group">
                <label > Enable Monitoring:</label>
                <select class="form - select">
                  <option selected > Enabled</option>
                  <option > Disabled</option>
                </select>
              </div>
              <div class="form - group">
                <label > Log Level:</label>
                <select class="form - select">
                  <option > Debug</option>
                  <option selected > Info</option>
                  <option > Warning</option>
                  <option > Error</option>
                </select>
              </div>
            </div>
          </div>
          <div class="form - actions">
            <button class="btn - save">💾 Zapisz</button>
            <button class="btn - test">📈 View Logs</button>
          </div>
        </div>
      </div>

      <!-- Logs Section -->
      <div id="logs - content" class="section - content">
        <div class="config - form">
          <h4>📝 Logi Systemowe</h4>
          <div class="form - section">
            <h5 > Log Settings</h5>
            <div class="form - row">
              <div class="form - group">
                <label > Max Log Size (MB):</label>
                <input type="number" class="form - input" value="100" min="10" max="1000" />
              </div>
              <div class="form - group">
                <label > Retention Days:</label>
                <input type="number" class="form - input" value="30" min="1" max="365" />
              </div>
            </div>
          </div>
          <div class="form - actions">
            <button class="btn - save">💾 Zapisz</button>
            <button class="btn - export">📤 Export Logs</button>
          </div>
        </div>
      </div>

      <!-- Updates Section -->
      <div id="updates - content" class="section - content">
        <div class="config - form">
          <h4>⬇️ Aktualizacje Systemu</h4>
          <div class="form - section">
            <h5 > Auto Updates</h5>
            <div class="form - row">
              <div class="form - group">
                <label > Auto Update:</label>
                <select class="form - select">
                  <option selected > Enabled</option>
                  <option > Disabled</option>
                </select>
              </div>
              <div class="form - group">
                <label > Check Interval:</label>
                <select class="form - select">
                  <option > Daily</option>
                  <option selected > Weekly</option>
                  <option > Monthly</option>
                </select>
              </div>
            </div>
          </div>
          <div class="form - actions">
            <button class="btn - save">💾 Zapisz</button>
            <button class="btn - test">🔍 Check Updates</button>
          </div>
        </div>
      </div>

      <!-- Diagnostics Section -->
      <div id="diagnostics - content" class="section - content">
        <div class="config - form">
          <h4>🔬 Diagnostyka Systemu</h4>
          <div class="form - section">
            <h5 > System Health Check</h5>
            <div class="diagnostic - grid">
              <div class="diagnostic - item">
                <span class="diagnostic - name">CPU Usage</span>
                <span class="diagnostic - status online">✅ Normal</span>
                <button class="diagnostic - btn">Check</button>
              </div>
              <div class="diagnostic - item">
                <span class="diagnostic - name">Memory Usage</span>
                <span class="diagnostic - status warning">⚠️ High</span>
                <button class="diagnostic - btn">Check</button>
              </div>
              <div class="diagnostic - item">
                <span class="diagnostic - name">Disk Space</span>
                <span class="diagnostic - status online">✅ OK</span>
                <button class="diagnostic - btn">Check</button>
              </div>
            </div>
          </div>
          <div class="form - actions">
            <button class="btn - test">🧪 Run Full Diagnostics</button>
            <button class="btn - export">📄 Export Report</button>
          </div>
        </div>
      </div>

      <!-- Maintenance Section -->
      <div id="maintenance - content" class="section - content">
        <div class="config - form">
          <h4>🔧 Konserwacja Systemu</h4>
          <div class="form - section">
            <h5 > Scheduled Maintenance</h5>
            <div class="form - row">
              <div class="form - group">
                <label > Maintenance Window:</label>
                <select class="form - select">
                  <option selected > 02:00 - 04:00</option>
                  <option > 03:00 - 05:00</option>
                  <option > 04:00 - 06:00</option>
                </select>
              </div>
              <div class="form - group">
                <label > Frequency:</label>
                <select class="form - select">
                  <option > Daily</option>
                  <option selected > Weekly</option>
                  <option > Monthly</option>
                </select>
              </div>
            </div>
          </div>
          <div class="form - actions">
            <button class="btn - save">💾 Zapisz</button>
            <button class="btn - test">🔧 Run Maintenance</button>
          </div>
        </div>
      </div>
    `;
  }

  private getSystemSections(): SystemSection[] {
    return [
      { id: 'system', name: 'System' },
      { id: 'network', name: 'Sieć' },
      { id: 'performance', name: 'Wydajność' },
      { id: 'monitoring', name: 'Monitoring' },
      { id: 'logs', name: 'Logi Systemowe' },
      { id: 'updates', name: 'Aktualizacje' },
      { id: 'diagnostics', name: 'Diagnostyka' },
      { id: 'maintenance', name: 'Konserwacja' }
    ];
  }

  public setupEventListeners(container: HTMLElement): void {
    // Event listeners are handled by parent ConnectConfigView
    // // console
      
        .log('🔧 SystemCategory: Event listeners setup completed'); // Auto - commented by lint - fix // Auto - commented by lint - fix
  }

  public getStyles(): string {
    return `
      /* System Category Specific Styles */
      .diagnostic - grid {
        display: flex;
        flex - direction: column;
        gap: 8px;
      }

      .diagnostic - item {
        display: flex;
        justify - content: space - between;
        align - items: center;
        padding: 8px;
        background: white;
        border: 1px solid #e0e0e0;
        border - radius: 4px;
      }

      .diagnostic - name {
        font - size: 11px;
        color: #333;
        font - weight: 500;
      }

      .diagnostic - status {
        font - size: 10px;
        font - weight: 600;
      }

      .diagnostic - status.online {
        color: #28a745;
      }

      .diagnostic - status.warning {
        color: #ffc107;
      }

      .diagnostic - btn {
        padding: 4px 8px;
        background: #6c757d;
        color: white;
        border: none;
        border - radius: 3px;
        cursor: pointer;
        font - size: 10px;
      }

      .wifi - networks {
        display: flex;
        flex - direction: column;
        gap: 8px;
      }

      .wifi - item {
        display: flex;
        justify - content: space - between;
        align - items: center;
        padding: 10px;
        background: white;
        border: 1px solid #e0e0e0;
        border - radius: 6px;
        transition: all 0.2s ease;
      }

      .wifi - item:hover {
        background: #f8f9fa;
        border - color: #6366f1;
      }

      .wifi - item.active {
        background: #e8f5e8;
        border - color: #28a745;
      }

      .wifi - info {
        display: flex;
        flex - direction: column;
        gap: 2px;
      }

      .wifi - name {
        font - size: 12px;
        font - weight: 600;
        color: #333;
      }

      .wifi - signal {
        font - size: 11px;
        color: #666;
      }

      .btn - connect,
      .btn - connected {
        padding: 4px 8px;
        border: none;
        border - radius: 4px;
        cursor: pointer;
        font - size: 10px;
        font - weight: 600;
      }

      .btn - connect {
        background: #007bff;
        color: white;
      }

      .btn - connected {
        background: #28a745;
        color: white;
        cursor: default;
      }
    `;
  }
}
