// frontend/src/modules/connect-config/pages/security/permissions/permissions.page.ts

export interface PermissionRole {
  name: string;
  permissions: Array<{name: string; granted: boolean}>;
}

export interface PermissionsData {
  roles: PermissionRole[];
}

export class PermissionsPage {
  private data: PermissionsData = {
    roles: [
      {
        name: 'Administrator',
        permissions: [
          {name: 'System Config', granted: true},
          {name: 'User Management', granted: true},
          {name: 'Device Control', granted: true},
          {name: 'Reports Access', granted: true}
        ]
      },
      {
        name: 'Operator',
        permissions: [
          {name: 'System Config', granted: false},
          {name: 'User Management', granted: false},
          {name: 'Device Control', granted: true},
          {name: 'Reports Access', granted: true}
        ]
      }
    ]
  };

  constructor() {
  }

  public render(): string {
    return `
      <div id="permissions-content" class="section-content">
        <div class="config-form">
          <h4>🔐 Uprawnienia</h4>
          <div class="form-section">
            <h5>Role Permissions</h5>
            <div class="permissions-grid">
              ${this.data.roles.map(role => `
                <div class="permission-role">
                  <h6>${role.name}</h6>
                  <div class="permission-list">
                    ${role.permissions.map(perm => `
                      <div class="permission-item">
                        <span>${perm.name}</span>
                        <span class="permission ${perm.granted ? 'granted' : 'denied'}">${perm.granted ? '✅' : '❌'}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
          <div class="form-actions">
            <button class="btn-save">💾 Zapisz</button>
            <button class="btn-test">🔐 Test Permissions</button>
          </div>
        </div>
      </div>
    `;
  }

  public setupEventListeners(_container: HTMLElement): void {
  }

  public getStyles(): string {
    return `
      .permissions-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 10px; }
      .permission-role { background: #f8f9fa; border: 1px solid #e0e0e0; border-radius: 6px; padding: 12px; }
    `;
  }
}
