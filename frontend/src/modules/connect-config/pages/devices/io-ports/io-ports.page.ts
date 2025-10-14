// frontend/src/modules/connect-config/pages/devices/io-ports/io-ports.page.ts

export interface IoPortsData {
  ports: Array<{name: string; mode: string; status: string}>;
}

export class IoPortsPage {
  private data: IoPortsData = {
    ports: [
      {name: 'GPIO 1', mode: 'Input', status: 'Active'},
      {name: 'GPIO 2', mode: 'Output', status: 'Inactive'},
      {name: 'Serial Port', mode: '9600 bps', status: 'Connected'}
    ]
  };

  constructor() {
  }

  public render(): string {
    return `
      <div id="io-ports-content" class="section-content">
        <div class="config-form">
          <h4>🔌 Porty I/O</h4>
          <div class="form-section">
            <h5>Port Configuration</h5>
            <div class="ports-grid">
              ${this.data.ports.map(port => `
                <div class="port-item">
                  <span class="port-name">${port.name}</span>
                  <select class="port-mode">
                    <option ${port.mode === 'Input' ? 'selected' : ''}>Input</option>
                    <option ${port.mode === 'Output' ? 'selected' : ''}>Output</option>
                  </select>
                  <span class="port-status ${port.status.toLowerCase()}">${port.status}</span>
                </div>
              `).join('')}
            </div>
          </div>
          <div class="form-actions">
            <button class="btn-save">💾 Zapisz</button>
            <button class="btn-test">🔌 Test Ports</button>
          </div>
        </div>
      </div>
    `;
  }

  public setupEventListeners(_container: HTMLElement): void {
  }

  public getStyles(): string {
    return `
      .ports-grid { display: flex; flex-direction: column; gap: 8px; margin-top: 10px; }
      .port-item { display: flex; justify-content: space-between; align-items: center; padding: 8px; background: white; border: 1px solid #e0e0e0; border-radius: 4px; }
    `;
  }
}
