// frontend/src/modules/connect-config/pages/devices/sensors/sensors.page.ts

export interface SensorsData {
  warningTemp: number;
  criticalTemp: number;
  sensors: Array<{
    name: string;
    value: string;
    status: 'normal' | 'warning' | 'critical';
  }>;
}

export class SensorsPage {
  private data: SensorsData = {
    warningTemp: 60,
    criticalTemp: 80,
    sensors: [
      { name: 'CPU Temperature', value: '45°C', status: 'normal' },
      { name: 'Board Temperature', value: '38°C', status: 'normal' },
      { name: 'Ambient Temperature', value: '22°C', status: 'normal' }
    ]
  };

  constructor() {
  }

  public render(): string {
    return `
      <div id="sensors-content" class="section-content">
        <div class="config-form">
          <h4>🌡️ Konfiguracja Sensorów</h4>
          <div class="form-section">
            <h5>Temperature Sensors</h5>
            <div class="form-row">
              <div class="form-group">
                <label>Warning Temp (°C):</label>
                <input type="number" class="form-input" id="warning-temp" value="${this.data.warningTemp}" min="30" max="100" />
              </div>
              <div class="form-group">
                <label>Critical Temp (°C):</label>
                <input type="number" class="form-input" id="critical-temp" value="${this.data.criticalTemp}" min="50" max="120" />
              </div>
            </div>
            <div class="sensor-grid">
              ${this.data.sensors.map(sensor => `
                <div class="sensor-item">
                  <span class="sensor-name">${sensor.name}</span>
                  <span class="sensor-value">${sensor.value}</span>
                  <span class="sensor-status ${sensor.status}">${this.getStatusText(sensor.status)}</span>
                </div>
              `).join('')}
            </div>
          </div>
          <div class="form-actions">
            <button class="btn-save" id="sensors-save">💾 Zapisz</button>
            <button class="btn-test" id="sensors-test">🌡️ Read Sensors</button>
          </div>
        </div>
      </div>
    `;
  }

  private getStatusText(status: string): string {
    switch (status) {
      case 'normal': return 'Normal';
      case 'warning': return 'Warning';
      case 'critical': return 'Critical';
      default: return 'Unknown';
    }
  }

  public setupEventListeners(container: HTMLElement): void {
    const saveBtn = container.querySelector('#sensors-save') as HTMLButtonElement;
    const testBtn = container.querySelector('#sensors-test') as HTMLButtonElement;

    if (saveBtn) saveBtn.addEventListener('click', () => this.handleSave());
    if (testBtn) testBtn.addEventListener('click', () => this.handleTest());

  }

  private handleSave(): void {
  }

  private handleTest(): void {
  }

  public getStyles(): string {
    return `
      .sensor-grid {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 10px;
      }
      
      .sensor-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px;
        background: white;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
      }
    `;
  }
}
