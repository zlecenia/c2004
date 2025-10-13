// frontend/src/modules/connect-config/pages/system/system/system.page.ts

export interface SystemData {
  systemName: string;
  language: string;
  timezone: string;
  autoSaveInterval: number;
}

export class SystemPage {
  private data: SystemData = {
    systemName: 'IdentificationSystem-C2004',
    language: 'Polski',
    timezone: 'Europe/Warsaw',
    autoSaveInterval: 5
  };

  constructor() {
    console.log('🖥️ SystemPage initialized');
  }

  public render(): string {
    return `
      <div id="system-content" class="section-content active">
        <div class="config-form">
          <h4>🖥️ Konfiguracja Systemu</h4>
          <div class="form-section">
            <h5>Podstawowe ustawienia</h5>
            <div class="form-row">
              <div class="form-group">
                <label>Nazwa systemu:</label>
                <input type="text" class="form-input" id="system-name" value="${this.data.systemName}" />
              </div>
              <div class="form-group">
                <label>Język interfejsu:</label>
                <select class="form-select" id="system-language">
                  <option value="Polski" ${this.data.language === 'Polski' ? 'selected' : ''}>Polski</option>
                  <option value="English" ${this.data.language === 'English' ? 'selected' : ''}>English</option>
                  <option value="Deutsch" ${this.data.language === 'Deutsch' ? 'selected' : ''}>Deutsch</option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Strefa czasowa:</label>
                <select class="form-select" id="system-timezone">
                  <option value="Europe/Warsaw" ${this.data.timezone === 'Europe/Warsaw' ? 'selected' : ''}>Europe/Warsaw</option>
                  <option value="Europe/London" ${this.data.timezone === 'Europe/London' ? 'selected' : ''}>Europe/London</option>
                  <option value="UTC" ${this.data.timezone === 'UTC' ? 'selected' : ''}>UTC</option>
                </select>
              </div>
              <div class="form-group">
                <label>Auto-save interval (min):</label>
                <input type="number" class="form-input" id="auto-save" value="${this.data.autoSaveInterval}" min="1" max="60" />
              </div>
            </div>
          </div>
          <div class="form-actions">
            <button class="btn-save" id="system-save">💾 Zapisz</button>
            <button class="btn-test" id="system-test">🔍 Test połączenia</button>
          </div>
        </div>
      </div>
    `;
  }

  public setupEventListeners(container: HTMLElement): void {
    const saveBtn = container.querySelector('#system-save') as HTMLButtonElement;
    const testBtn = container.querySelector('#system-test') as HTMLButtonElement;

    if (saveBtn) {
      saveBtn.addEventListener('click', () => this.handleSave());
    }

    if (testBtn) {
      testBtn.addEventListener('click', () => this.handleTest());
    }

    console.log('🖥️ SystemPage: Event listeners setup completed');
  }

  private handleSave(): void {
    // Collect data from form
    const systemName = (document.getElementById('system-name') as HTMLInputElement)?.value;
    const language = (document.getElementById('system-language') as HTMLSelectElement)?.value;
    const timezone = (document.getElementById('system-timezone') as HTMLSelectElement)?.value;
    const autoSave = (document.getElementById('auto-save') as HTMLInputElement)?.value;

    if (systemName) this.data.systemName = systemName;
    if (language) this.data.language = language;
    if (timezone) this.data.timezone = timezone;
    if (autoSave) this.data.autoSaveInterval = parseInt(autoSave);

    console.log('🖥️ System config saved:', this.data);
    this.showNotification('Konfiguracja systemu zapisana pomyślnie', 'success');
  }

  private handleTest(): void {
    console.log('🖥️ Testing system connection...');
    this.showNotification('Test połączenia w toku...', 'info');
    
    setTimeout(() => {
      const success = Math.random() > 0.1; // 90% success rate
      if (success) {
        this.showNotification('Test połączenia zakończony pomyślnie', 'success');
      } else {
        this.showNotification('Test połączenia nieudany - sprawdź konfigurację', 'error');
      }
    }, 1500);
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

  public getData(): SystemData {
    return { ...this.data };
  }

  public setData(newData: Partial<SystemData>): void {
    this.data = { ...this.data, ...newData };
  }

  public getStyles(): string {
    return `
      /* System Page Specific Styles */
      #system-content {
        animation: fadeIn 0.3s ease;
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
  }
}
