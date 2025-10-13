// frontend/src/modules/connect-config/pages/security/users/users.page.ts

export interface User {
  id: string;
  username: string;
  role: 'Administrator' | 'Operator' | 'Guest';
  status: 'Active' | 'Inactive';
  lastLogin: string;
}

export interface UsersData {
  users: User[];
}

export class UsersPage {
  private data: UsersData = {
    users: [
      { id: '1', username: 'admin', role: 'Administrator', status: 'Active', lastLogin: '2024-10-10 07:30' },
      { id: '2', username: 'operator1', role: 'Operator', status: 'Active', lastLogin: '2024-10-09 16:45' },
      { id: '3', username: 'guest', role: 'Guest', status: 'Inactive', lastLogin: 'Never' }
    ]
  };

  constructor() {
    console.log('👥 UsersPage initialized');
  }

  public render(): string {
    return `
      <div id="users-content" class="section-content">
        <div class="config-form">
          <h4>👥 Użytkownicy</h4>
          <div class="form-section">
            <h5>User Management</h5>
            <div class="users-table-container">
              <table class="config-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Last Login</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${this.data.users.map(user => `
                    <tr data-user-id="${user.id}">
                      <td>${user.username}</td>
                      <td>${user.role}</td>
                      <td><span class="status-badge ${user.status.toLowerCase()}">${user.status}</span></td>
                      <td>${user.lastLogin}</td>
                      <td>
                        <button class="btn-action edit-user" data-user-id="${user.id}">Edit</button>
                        <button class="btn-action delete-user" data-user-id="${user.id}">Delete</button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
          <div class="form-actions">
            <button class="btn-add" id="add-user">➕ Add User</button>
            <button class="btn-export" id="export-users">📤 Export Users</button>
          </div>
        </div>
      </div>
    `;
  }

  public setupEventListeners(container: HTMLElement): void {
    const addBtn = container.querySelector('#add-user') as HTMLButtonElement;
    const exportBtn = container.querySelector('#export-users') as HTMLButtonElement;
    const editButtons = container.querySelectorAll('.edit-user');
    const deleteButtons = container.querySelectorAll('.delete-user');

    if (addBtn) {
      addBtn.addEventListener('click', () => this.handleAddUser());
    }

    if (exportBtn) {
      exportBtn.addEventListener('click', () => this.handleExportUsers());
    }

    editButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const userId = (e.target as HTMLButtonElement).dataset.userId;
        if (userId) this.handleEditUser(userId);
      });
    });

    deleteButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const userId = (e.target as HTMLButtonElement).dataset.userId;
        if (userId) this.handleDeleteUser(userId);
      });
    });

    console.log('👥 UsersPage: Event listeners setup completed');
  }

  private handleAddUser(): void {
    console.log('👥 Adding new user...');
    this.showUserDialog();
  }

  private handleEditUser(userId: string): void {
    const user = this.data.users.find(u => u.id === userId);
    if (user) {
      console.log('👥 Editing user:', user);
      this.showUserDialog(user);
    }
  }

  private handleDeleteUser(userId: string): void {
    const user = this.data.users.find(u => u.id === userId);
    if (user && confirm(`Czy na pewno chcesz usunąć użytkownika "${user.username}"?`)) {
      this.data.users = this.data.users.filter(u => u.id !== userId);
      this.refreshUserTable();
      this.showNotification(`Użytkownik "${user.username}" został usunięty`, 'success');
    }
  }

  private handleExportUsers(): void {
    console.log('👥 Exporting users...');
    const csvContent = this.generateUsersCsv();
    this.downloadCsv(csvContent, 'users.csv');
    this.showNotification('Lista użytkowników została wyeksportowana', 'success');
  }

  private showUserDialog(user?: User): void {
    const isEdit = !!user;
    const title = isEdit ? 'Edytuj użytkownika' : 'Dodaj użytkownika';
    
    const dialog = document.createElement('div');
    dialog.className = 'user-dialog-overlay';
    dialog.innerHTML = `
      <div class="user-dialog">
        <h3>${title}</h3>
        <form class="user-form">
          <div class="form-group">
            <label>Username:</label>
            <input type="text" id="dialog-username" value="${user?.username || ''}" required />
          </div>
          <div class="form-group">
            <label>Role:</label>
            <select id="dialog-role" required>
              <option value="Administrator" ${user?.role === 'Administrator' ? 'selected' : ''}>Administrator</option>
              <option value="Operator" ${user?.role === 'Operator' ? 'selected' : ''}>Operator</option>
              <option value="Guest" ${user?.role === 'Guest' ? 'selected' : ''}>Guest</option>
            </select>
          </div>
          <div class="form-group">
            <label>Status:</label>
            <select id="dialog-status" required>
              <option value="Active" ${user?.status === 'Active' ? 'selected' : ''}>Active</option>
              <option value="Inactive" ${user?.status === 'Inactive' ? 'selected' : ''}>Inactive</option>
            </select>
          </div>
          <div class="dialog-actions">
            <button type="submit" class="btn-save">${isEdit ? 'Zapisz' : 'Dodaj'}</button>
            <button type="button" class="btn-cancel">Anuluj</button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(dialog);

    const form = dialog.querySelector('.user-form') as HTMLFormElement;
    const cancelBtn = dialog.querySelector('.btn-cancel') as HTMLButtonElement;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = (dialog.querySelector('#dialog-username') as HTMLInputElement).value;
      const role = (dialog.querySelector('#dialog-role') as HTMLSelectElement).value as User['role'];
      const status = (dialog.querySelector('#dialog-status') as HTMLSelectElement).value as User['status'];

      if (isEdit && user) {
        user.username = username;
        user.role = role;
        user.status = status;
        this.showNotification('Użytkownik został zaktualizowany', 'success');
      } else {
        const newUser: User = {
          id: Date.now().toString(),
          username,
          role,
          status,
          lastLogin: 'Never'
        };
        this.data.users.push(newUser);
        this.showNotification('Nowy użytkownik został dodany', 'success');
      }

      this.refreshUserTable();
      document.body.removeChild(dialog);
    });

    cancelBtn.addEventListener('click', () => {
      document.body.removeChild(dialog);
    });
  }

  private refreshUserTable(): void {
    const container = document.querySelector('#users-content');
    if (container) {
      container.innerHTML = this.render().replace('<div id="users-content" class="section-content">', '').replace('</div>', '');
      this.setupEventListeners(container.parentElement as HTMLElement);
    }
  }

  private generateUsersCsv(): string {
    const headers = ['Username', 'Role', 'Status', 'Last Login'];
    const rows = this.data.users.map(user => [
      user.username,
      user.role,
      user.status,
      user.lastLogin
    ]);

    return [headers, ...rows].map(row => row.join(',')).join('\\n');
  }

  private downloadCsv(content: string, filename: string): void {
    const blob = new Blob([content], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  private showNotification(message: string, type: 'success' | 'error' | 'info'): void {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed; top: 20px; right: 20px; padding: 12px 20px;
      border-radius: 4px; color: white; font-weight: 500; z-index: 1000;
      opacity: 0; transition: opacity 0.3s ease;
    `;

    switch (type) {
      case 'success': notification.style.backgroundColor = '#28a745'; break;
      case 'error': notification.style.backgroundColor = '#dc3545'; break;
      case 'info': notification.style.backgroundColor = '#17a2b8'; break;
    }

    document.body.appendChild(notification);
    setTimeout(() => notification.style.opacity = '1', 100);
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
  }

  public getData(): UsersData {
    return { ...this.data };
  }

  public setData(newData: Partial<UsersData>): void {
    this.data = { ...this.data, ...newData };
  }

  public getStyles(): string {
    return `
      /* Users Page Specific Styles */
      .users-table-container {
        max-height: 400px;
        overflow-y: auto;
        border: 1px solid #ddd;
        border-radius: 4px;
        margin-top: 10px;
      }

      .config-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 11px;
      }

      .config-table th,
      .config-table td {
        padding: 8px 12px;
        text-align: left;
        border-bottom: 1px solid #eee;
      }

      .config-table th {
        background: #f8f9fa;
        font-weight: 600;
        color: #333;
        position: sticky;
        top: 0;
        z-index: 10;
      }

      .config-table tbody tr:hover {
        background: #f8f9fa;
      }

      .status-badge {
        padding: 2px 8px;
        border-radius: 12px;
        font-size: 9px;
        font-weight: 600;
        text-transform: uppercase;
      }

      .status-badge.active {
        background: #d1e7dd;
        color: #0f5132;
      }

      .status-badge.inactive {
        background: #f8d7da;
        color: #721c24;
      }

      .btn-action {
        padding: 4px 8px;
        margin: 0 2px;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        font-size: 9px;
        font-weight: 500;
        color: white;
      }

      .edit-user {
        background: #007bff;
      }

      .delete-user {
        background: #dc3545;
      }

      /* User Dialog Styles */
      .user-dialog-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
      }

      .user-dialog {
        background: white;
        padding: 20px;
        border-radius: 8px;
        width: 400px;
        max-width: 90vw;
      }

      .user-dialog h3 {
        margin: 0 0 20px 0;
        color: #333;
      }

      .user-form .form-group {
        margin-bottom: 15px;
      }

      .user-form label {
        display: block;
        margin-bottom: 5px;
        font-weight: 500;
        color: #333;
      }

      .user-form input,
      .user-form select {
        width: 100%;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 12px;
      }

      .dialog-actions {
        display: flex;
        gap: 10px;
        justify-content: flex-end;
        margin-top: 20px;
      }

      .dialog-actions button {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
      }

      .btn-save {
        background: #28a745;
        color: white;
      }

      .btn-cancel {
        background: #6c757d;
        color: white;
      }
    `;
  }
}
