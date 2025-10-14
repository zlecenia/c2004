// frontend/src/modules/connect-config/pages/system/network/network.page.ts

export interface NetworkData {
  ipAddress: string;
  subnetMask: string;
  gateway: string;
  dnsServer: string;
  wifiNetworks: Array<{name: string; signal: string; connected: boolean}>;
}

export class NetworkPage {
  private data: NetworkData = {
    ipAddress: '192.168.1.100',
    subnetMask: '255.255.255.0',
    gateway: '192.168.1.1',
    dnsServer: '8.8.8.8',
    wifiNetworks: [
      {name: 'CompanyWiFi', signal: 'Strong (95%)', connected: true},
      {name: 'GuestNetwork', signal: 'Medium (65%)', connected: false}
    ]
  };

  constructor() {
  }

  public render(): string {
    return `
      <div id="network-content" class="section-content">
        <div class="config-form">
          <h4>🌐 Konfiguracja Sieci</h4>
          <div class="form-section">
            <h5>Ustawienia sieciowe</h5>
            <div class="form-row">
              <div class="form-group">
                <label>IP Address:</label>
                <input type="text" class="form-input" value="${this.data.ipAddress}" />
              </div>
              <div class="form-group">
                <label>Subnet Mask:</label>
                <input type="text" class="form-input" value="${this.data.subnetMask}" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Gateway:</label>
                <input type="text" class="form-input" value="${this.data.gateway}" />
              </div>
              <div class="form-group">
                <label>DNS Server:</label>
                <input type="text" class="form-input" value="${this.data.dnsServer}" />
              </div>
            </div>
            <div class="form-section">
              <h5>WiFi Networks</h5>
              <div class="wifi-networks">
                ${this.data.wifiNetworks.map(network => `
                  <div class="wifi-item ${network.connected ? 'active' : ''}">
                    <div class="wifi-info">
                      <span class="wifi-name">${network.name}</span>
                      <span class="wifi-signal">Signal: ${network.signal}</span>
                    </div>
                    <button class="btn-${network.connected ? 'connected' : 'connect'}">${network.connected ? 'Connected' : 'Connect'}</button>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
          <div class="form-actions">
            <button class="btn-save">💾 Zapisz</button>
            <button class="btn-test">🌐 Test połączenia</button>
          </div>
        </div>
      </div>
    `;
  }

  public setupEventListeners(_container: HTMLElement): void {
  }

  public getStyles(): string {
    return `
      .wifi-networks { display: flex; flex-direction: column; gap: 8px; }
      .wifi-item { display: flex; justify-content: space-between; align-items: center; padding: 10px; background: white; border: 1px solid #e0e0e0; border-radius: 6px; }
      .wifi-item.active { background: #e8f5e8; border-color: #28a745; }
    `;
  }
}
