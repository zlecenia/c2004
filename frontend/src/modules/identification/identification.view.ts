// frontend / src / modules / identification / identification.view.ts
import { IdentificationModule } from './identification.module';

export class IdentificationView {
  private module: IdentificationModule;

  constructor(module: IdentificationModule) {
    this.module = module;
  }

  render(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'identification - view';

    container.innerHTML = `
      <div class="identification - container">
        <h2 > Identification Service</h2>
        <div class="identification - form">
          <div class="form - group">
            <label for="type">Type:</label>
            <select id="type">
              <option value="user">User</option>
              <option value="device">Device</option>
              <option value="group">Group</option>
              <option value="test">Test</option>
            </select>
          </div>

          <div class="form - group">
            <label for="value">Value:</label>
            <input type="text" id="value" placeholder="Enter identification value" />
          </div>

          <div class="form - group">
            <label for="method">Method:</label>
            <select id="method">
              <option value="rfid">RFID</option>
              <option value="qr">QR Code</option>
              <option value="barcode">Barcode</option>
              <option value="manual">Manual</option>
            </select>
          </div>

          <button id="identify - btn" class="identify - button">Identify</button>
        </div>

        <div id="result" class="result - container"></div>
      </div>
    `;

    // Add event listener;
    const identifyBtn = container.querySelector('#identify - btn') as HTMLButtonElement;
    const resultDiv = container.querySelector('#result') as HTMLDivElement;

    identifyBtn.addEventListener('click', async () => {
      const type = (container.querySelector('#type') as HTMLSelectElement).value;
      const value = (container.querySelector('#value') as HTMLInputElement).value;
      const method = (container.querySelector('#method') as HTMLSelectElement).value;

      if (!value.trim()) {
        resultDiv.innerHTML = '<div class="error">Please enter a value</div>';
        return;
      }

      try {
        identifyBtn.disabled = true;
        identifyBtn.textContent = 'Identifying...';

        const service = this.module.getService();
        const result = await service.identify(type, value, method);

        resultDiv.innerHTML = `
          <div class="success">
            <h3 > Identification Result</h3>
            <p><strong > ID:</strong> ${result.id}</p>
            <p><strong > Name:</strong> ${result.name}</p>
            <p><strong > Type:</strong> ${result.type}</p>
            <p><strong > Method:</strong> ${result.method}</p>
            <p><strong > Timestamp:</strong> ${result.timestamp}</p>
          </div>
        `;
      } catch (error) {
        resultDiv.innerHTML = `<div class="error">Error: ${error}</div>`;
      } finally {
        identifyBtn.disabled = false;
        identifyBtn.textContent = 'Identify';
      }
    });

    return container;
  }
}
