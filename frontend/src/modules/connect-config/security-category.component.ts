// frontend / src / modules / connect - config / security - category.component.ts

export interface SecurityCategoryData {
  sections: SecuritySection[];
}

export interface SecuritySection {
  id: string;
  name: string;
  icon?: string;
}

export class SecurityCategoryComponent {
  constructor() {}

  public render(): string {
    const sections = this.getSecuritySections();

    return `
      <div id="security - subcategories" class="subcategory - group" style="display: none;">
        ${sections.map(section => this.renderSection(section)).join('')}
      </div>
    `;
  }

  private renderSection(section: SecuritySection): string {
    const activeClass = section.id === 'security' ? ' active' : '';
    return `
      <button class="section - item compact${activeClass}" data - section="${section.id}">
        <span class="menu - label">${section.name}</span>
      </button>
    `;
  }

  public renderContent(): string {
    return `
      <!-- Security Section -->
      <div id="security - content" class="section - content">
        <div class="config - form">
          <h4>🔒 Bezpieczeństwo</h4>
          <div class="form - section">
            <h5 > Security Settings</h5>
            <div class="form - row">
              <div class="form - group">
                <label > Login Attempts:</label>
                <input type="number" class="form - input" value="3" min="1" max="10" />
              </div>
              <div class="form - group">
                <label > Session Timeout (min):</label>
                <input type="number" class="form - input" value="30" min="5" max="120" />
              </div>
            </div>
            <div class="form - row">
              <div class="form - group">
                <label > Password Policy:</label>
                <select class="form - select">
                  <option > Basic</option>
                  <option selected > Strong</option>
                  <option > Very Strong</option>
                </select>
              </div>
              <div class="form - group">
                <label > Two - Factor Auth:</label>
                <select class="form - select">
                  <option selected > Enabled</option>
                  <option > Disabled</option>
                </select>
              </div>
            </div>
          </div>
          <div class="form - actions">
            <button class="btn - save">💾 Zapisz</button>
            <button class="btn - test">🔒 Test Security</button>
          </div>
        </div>
      </div>

      <!-- Users Section -->
      <div id="users - content" class="section - content">
        <div class="config - form">
          <h4>👥 Użytkownicy</h4>
          <div class="form - section">
            <h5 > User Management</h5>
            <div class="users - table - container">
              <table class="config - table">
                <thead>
                  <tr>
                    <th > Username</th>
                    <th > Role</th>
                    <th > Status</th>
                    <th > Last Login</th>
                    <th > Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td > admin</td>
                    <td > Administrator</td>
                    <td><span class="status - badge online">Active</span></td>
                    <td > 2024 - 10 - 10 07:30</td>
                    <td>
                      <button class="btn - action">Edit</button>
                      <button class="btn - action">Delete</button>
                    </td>
                  </tr>
                  <tr>
                    <td > operator1</td>
                    <td > Operator</td>
                    <td><span class="status - badge online">Active</span></td>
                    <td > 2024 - 10 - 09 16:45</td>
                    <td>
                      <button class="btn - action">Edit</button>
                      <button class="btn - action">Delete</button>
                    </td>
                  </tr>
                  <tr>
                    <td > guest</td>
                    <td > Guest</td>
                    <td><span class="status - badge offline">Inactive</span></td>
                    <td > Never</td>
                    <td>
                      <button class="btn - action">Edit</button>
                      <button class="btn - action">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="form - actions">
            <button class="btn - add">➕ Add User</button>
            <button class="btn - export">📤 Export Users</button>
          </div>
        </div>
      </div>

      <!-- Permissions Section -->
      <div id="permissions - content" class="section - content">
        <div class="config - form">
          <h4>🔐 Uprawnienia</h4>
          <div class="form - section">
            <h5 > Role Permissions</h5>
            <div class="permissions - grid">
              <div class="permission - role">
                <h6 > Administrator</h6>
                <div class="permission - list">
                  <div class="permission - item">
                    <span > System Config</span>
                    <span class="permission granted">✅</span>
                  </div>
                  <div class="permission - item">
                    <span > User Management</span>
                    <span class="permission granted">✅</span>
                  </div>
                  <div class="permission - item">
                    <span > Device Control</span>
                    <span class="permission granted">✅</span>
                  </div>
                  <div class="permission - item">
                    <span > Reports Access</span>
                    <span class="permission granted">✅</span>
                  </div>
                </div>
              </div>
              <div class="permission - role">
                <h6 > Operator</h6>
                <div class="permission - list">
                  <div class="permission - item">
                    <span > System Config</span>
                    <span class="permission denied">❌</span>
                  </div>
                  <div class="permission - item">
                    <span > User Management</span>
                    <span class="permission denied">❌</span>
                  </div>
                  <div class="permission - item">
                    <span > Device Control</span>
                    <span class="permission granted">✅</span>
                  </div>
                  <div class="permission - item">
                    <span > Reports Access</span>
                    <span class="permission granted">✅</span>
                  </div>
                </div>
              </div>
              <div class="permission - role">
                <h6 > Guest</h6>
                <div class="permission - list">
                  <div class="permission - item">
                    <span > System Config</span>
                    <span class="permission denied">❌</span>
                  </div>
                  <div class="permission - item">
                    <span > User Management</span>
                    <span class="permission denied">❌</span>
                  </div>
                  <div class="permission - item">
                    <span > Device Control</span>
                    <span class="permission denied">❌</span>
                  </div>
                  <div class="permission - item">
                    <span > Reports Access</span>
                    <span class="permission granted">✅</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form - actions">
            <button class="btn - save">💾 Zapisz</button>
            <button class="btn - test">🔐 Test Permissions</button>
          </div>
        </div>
      </div>

      <!-- Backup Section -->
      <div id="backup - content" class="section - content">
        <div class="config - form">
          <h4>💾 Backup i Przywracanie</h4>
          <div class="form - section">
            <h5 > Backup Settings</h5>
            <div class="form - row">
              <div class="form - group">
                <label > Auto Backup:</label>
                <select class="form - select">
                  <option selected > Daily</option>
                  <option > Weekly</option>
                  <option > Monthly</option>
                  <option > Disabled</option>
                </select>
              </div>
              <div class="form - group">
                <label > Backup Time:</label>
                <input type="time" class="form - input" value="02:00" />
              </div>
            </div>
            <div class="form - row">
              <div class="form - group">
                <label > Retention (days):</label>
                <input type="number" class="form - input" value="30" min="1" max="365" />
              </div>
              <div class="form - group">
                <label > Compression:</label>
                <select class="form - select">
                  <option selected > Enabled</option>
                  <option > Disabled</option>
                </select>
              </div>
            </div>
            <div class="backup - status">
              <div class="backup - item">
                <span class="backup - label">Last Backup:</span>
                <span class="backup - value">2024 - 10 - 10 02:00</span>
              </div>
              <div class="backup - item">
                <span class="backup - label">Backup Size:</span>
                <span class="backup - value">245 MB</span>
              </div>
              <div class="backup - item">
                <span class="backup - label">Status:</span>
                <span class="backup - value success">Success</span>
              </div>
            </div>
          </div>
          <div class="form - actions">
            <button class="btn - save">💾 Zapisz</button>
            <button class="btn - test">🔄 Backup Now</button>
            <button class="btn - export">📥 Restore</button>
          </div>
        </div>
      </div>

      <!-- Labels Section -->
      <div id="labels - content" class="section - content">
        <div class="config - form">
          <h4>🏷️ Etykiety</h4>
          <div class="form - section">
            <h5 > Label Management</h5>
            <div class="labels - controls">
              <select class="form - select" id="language - select">
                <option selected > Polish</option>
                <option > English</option>
                <option > German</option>
              </select>
              <button class="btn - add">➕ Add Language</button>
            </div>
            <div class="labels - table - container">
              <table class="labels - table">
                <thead>
                  <tr>
                    <th > Key</th>
                    <th > Polish</th>
                    <th > English</th>
                    <th > Category</th>
                    <th > Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><input type="text" class="label - input key - input" value="login.title" readonly /></td>
                    <td><input type="text" class="label - input" value="Logowanie" /></td>
                    <td><input type="text" class="label - input" value="Login" /></td>
                    <td>
                      <select class="category - select">
                        <option selected > Authentication</option>
                        <option > Navigation</option>
                        <option > Forms</option>
                      </select>
                    </td>
                    <td>
                      <button class="btn - action save - label">💾</button>
                      <button class="btn - action delete - label">🗑️</button>
                    </td>
                  </tr>
                  <tr>
                    <td><input type="text" class="label - input key - input" value="menu.config" readonly /></td>
                    <td><input type="text" class="label - input" value="Konfiguracja" /></td>
                    <td><input type="text" class="label - input" value="Configuration" /></td>
                    <td>
                      <select class="category - select">
                        <option > Authentication</option>
                        <option selected > Navigation</option>
                        <option > Forms</option>
                      </select>
                    </td>
                    <td>
                      <button class="btn - action save - label">💾</button>
                      <button class="btn - action delete - label">🗑️</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="form - actions">
            <button class="btn - add">➕ Add Label</button>
            <button class="btn - export">📤 Export</button>
            <button class="btn - test">📥 Import</button>
          </div>
        </div>
      </div>

      <!-- Reports Section -->
      <div id="reports - content" class="section - content">
        <div class="config - form">
          <h4>📊 Raporty</h4>
          <div class="form - section">
            <h5 > Report Settings</h5>
            <div class="form - row">
              <div class="form - group">
                <label > Auto Reports:</label>
                <select class="form - select">
                  <option selected > Enabled</option>
                  <option > Disabled</option>
                </select>
              </div>
              <div class="form - group">
                <label > Report Frequency:</label>
                <select class="form - select">
                  <option > Daily</option>
                  <option selected > Weekly</option>
                  <option > Monthly</option>
                </select>
              </div>
            </div>
            <div class="form - row">
              <div class="form - group">
                <label > Email Recipients:</label>
                <textarea class="form - input" rows="3">admin@company.com
operator@company.com</textarea>
              </div>
              <div class="form - group">
                <label > Report Format:</label>
                <div class="checkbox - group">
                  <label><input type="checkbox" checked> PDF</label>
                  <label><input type="checkbox"> Excel</label>
                  <label><input type="checkbox"> CSV</label>
                </div>
              </div>
            </div>
          </div>
          <div class="form - actions">
            <button class="btn - save">💾 Zapisz</button>
            <button class="btn - test">📧 Send Test Report</button>
          </div>
        </div>
      </div>
    `;
  }

  private getSecuritySections(): SecuritySection[] {
    return [
      { id: 'security', name: 'Bezpieczeństwo' },
      { id: 'users', name: 'Użytkownicy' },
      { id: 'permissions', name: 'Uprawnienia' },
      { id: 'backup', name: 'Backup' },
      { id: 'labels', name: 'Etykiety' },
      { id: 'reports', name: 'Raporty' }
    ];
  }

  public setupEventListeners(container: HTMLElement): void {
    // Event listeners are handled by parent ConnectConfigView
    // // console
      
        .log('🔧 SecurityCategory: Event listeners setup completed'); // Auto - commented by lint - fix // Auto - commented by lint - fix
  }

  public getStyles(): string {
    return `
      /* Security Category Specific Styles */
      .permissions - grid {
        display: grid;
        grid - template - columns: repeat(auto - fit, minmax(200px, 1fr));
        gap: 15px;
        margin - top: 10px;
      }

      .permission - role {
        background: #f8f9fa;
        border: 1px solid #e0e0e0;
        border - radius: 6px;
        padding: 12px;
      }

      .permission - role h6 {
        margin: 0 0 10px 0;
        font - size: 12px;
        color: #333;
        font - weight: 600;
      }

      .permission - list {
        display: flex;
        flex - direction: column;
        gap: 6px;
      }

      .permission - item {
        display: flex;
        justify - content: space - between;
        align - items: center;
        padding: 4px 6px;
        background: white;
        border - radius: 3px;
        font - size: 10px;
      }

      .permission.granted {
        color: #28a745;
        font - size: 14px;
      }

      .permission.denied {
        color: #dc3545;
        font - size: 14px;
      }

      .backup - status {
        display: flex;
        flex - direction: column;
        gap: 6px;
        margin - top: 10px;
        padding: 10px;
        background: #f8f9fa;
        border - radius: 4px;
      }

      .backup - item {
        display: flex;
        justify - content: space - between;
        font - size: 11px;
      }

      .backup - label {
        color: #666;
        font - weight: 500;
      }

      .backup - value {
        color: #333;
        font - weight: 600;
      }

      .backup - value.success {
        color: #28a745;
      }

      .labels - controls {
        display: flex;
        gap: 10px;
        margin - bottom: 15px;
      }

      .labels - table - container {
        max - height: 300px;
        overflow - y: auto;
        border: 1px solid #ddd;
        border - radius: 4px;
      }

      .labels - table {
        width: 100%;
        border - collapse: collapse;
        font - size: 10px;
      }

      .labels - table th,
      .labels - table td {
        padding: 6px;
        border: 1px solid #ddd;
      }

      .labels - table th {
        background: #f8f9fa;
        font - weight: 600;
        color: #333;
        position: sticky;
        top: 0;
        z - index: 10;
      }

      .label - input {
        width: 100%;
        border: none;
        padding: 4px;
        font - size: 10px;
        background: transparent;
      }

      .key - input {
        background: #f8f9fa;
        color: #666;
      }

      .category - select {
        width: 100%;
        padding: 4px;
        font - size: 10px;
        border: 1px solid #ddd;
      }

      .save - label {
        background: #28a745;
      }

      .delete - label {
        background: #dc3545;
      }

      .users - table - container {
        max - height: 250px;
        overflow - y: auto;
        border: 1px solid #ddd;
        border - radius: 4px;
        margin - top: 10px;
      }
    `;
  }
}
