// frontend/src/modules/connect-config/pages/devices/power/power.page.ts

export interface PowerData {
  powerSaveMode: string;
  shutdownDelay: number;
  voltage: number;
  current: number;
  power: number;
}

export class PowerPage {
  private data: PowerData = {
    powerSaveMode: 'Enabled',
    shutdownDelay: 30,
    voltage: 12.3,
    current: 2.1,
    power: 25.8
  };

  constructor() {
  }

  public render(): string {
    return `
      <div id="power-content" class="section-content">
        <div class="config-form">
          <h4>🔋 Zasilanie</h4>
          <div class="form-section">
            <h5>Power Management</h5>
            <div class="form-row">
              <div class="form-group">
                <label>Power Save Mode:</label>
                <select class="form-select">
                  <option ${this.data.powerSaveMode === 'Disabled' ? 'selected' : ''}>Disabled</option>
                  <option ${this.data.powerSaveMode === 'Enabled' ? 'selected' : ''}>Enabled</option>
                  <option ${this.data.powerSaveMode === 'Aggressive' ? 'selected' : ''}>Aggressive</option>
                </select>
              </div>
              <div class="form-group">
                <label>Shutdown Delay (min):</label>
                <input type="number" class="form-input" value="${this.data.shutdownDelay}" min="5" max="120" />
              </div>
            </div>
            <div class="power-status">
              <div class="power-item">
                <span class="power-label">Voltage:</span>
                <span class="power-value">${this.data.voltage}V</span>
              </div>
              <div class="power-item">
                <span class="power-label">Current:</span>
                <span class="power-value">${this.data.current}A</span>
              </div>
              <div class="power-item">
                <span class="power-label">Power:</span>
                <span class="power-value">${this.data.power}W</span>
              </div>
            </div>
          </div>
          <div class="form-actions">
            <button class="btn-save">💾 Zapisz</button>
            <button class="btn-test">🔋 Test Power</button>
          </div>
        </div>
      </div>
    `;
  }

  public setupEventListeners(_container: HTMLElement): void {
  }

  public getStyles(): string {
    return `
      .power-status { display: flex; flex-direction: column; gap: 6px; margin-top: 10px; }
      .power-item { display: flex; justify-content: space-between; padding: 6px; background: #f8f9fa; border-radius: 3px; }
    `;
  }
}
