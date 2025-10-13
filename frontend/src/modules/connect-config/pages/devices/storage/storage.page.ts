// frontend/src/modules/connect-config/pages/devices/storage/storage.page.ts

export interface StorageData {
  autoCleanup: boolean;
  retentionDays: number;
  totalSpace: string;
  usedSpace: string;
  freeSpace: string;
}

export class StoragePage {
  private data: StorageData = {
    autoCleanup: true,
    retentionDays: 90,
    totalSpace: '32 GB',
    usedSpace: '18.5 GB (58%)',
    freeSpace: '13.5 GB'
  };

  constructor() {
    console.log('💾 StoragePage initialized');
  }

  public render(): string {
    return `
      <div id="storage-content" class="section-content">
        <div class="config-form">
          <h4>💾 Magazyn</h4>
          <div class="form-section">
            <h5>Storage Settings</h5>
            <div class="form-row">
              <div class="form-group">
                <label>Auto Cleanup:</label>
                <select class="form-select">
                  <option ${this.data.autoCleanup ? 'selected' : ''}>Enabled</option>
                  <option ${!this.data.autoCleanup ? 'selected' : ''}>Disabled</option>
                </select>
              </div>
              <div class="form-group">
                <label>Retention Days:</label>
                <input type="number" class="form-input" value="${this.data.retentionDays}" min="7" max="365" />
              </div>
            </div>
            <div class="storage-info">
              <div class="storage-item">
                <span class="storage-label">Total Space:</span>
                <span class="storage-value">${this.data.totalSpace}</span>
              </div>
              <div class="storage-item">
                <span class="storage-label">Used Space:</span>
                <span class="storage-value">${this.data.usedSpace}</span>
              </div>
              <div class="storage-item">
                <span class="storage-label">Free Space:</span>
                <span class="storage-value">${this.data.freeSpace}</span>
              </div>
            </div>
          </div>
          <div class="form-actions">
            <button class="btn-save">💾 Zapisz</button>
            <button class="btn-test">🗂️ Clean Storage</button>
          </div>
        </div>
      </div>
    `;
  }

  public setupEventListeners(container: HTMLElement): void {
    console.log('💾 StoragePage: Event listeners setup completed');
  }

  public getStyles(): string {
    return ``;
  }
}
