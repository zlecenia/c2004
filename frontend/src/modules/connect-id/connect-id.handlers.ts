// frontend/src/modules/connect-id/connect-id.handlers.ts
import { VirtualKeyboard } from '../../components/virtual-keyboard.component';

export class ConnectIdHandlers {
  private currentType: string = 'device';
  private currentMethod: string = 'rfid';
  private manualKeyboard: VirtualKeyboard | null = null;
  private passwordKeyboard: VirtualKeyboard | null = null;

  constructor() {
    this.initializeHandlers();
  }

  private initializeHandlers(): void {
    // Method selection handlers
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      
      if (target.closest('.method-item')) {
        this.handleMethodClick(target.closest('.method-item') as HTMLElement);
      }
      
      if (target.closest('.user-menu-item')) {
        this.handleUserClick(target.closest('.user-menu-item') as HTMLElement);
      }
      
      if (target.closest('.device-card')) {
        this.handleDeviceCardClick(target.closest('.device-card') as HTMLElement);
      }
      
      // Button handlers
      if (target.id === 'btn-user-login') {
        this.handleUserLogin();
      }
      
      if (target.id === 'btn-cancel-login') {
        this.handleCancelLogin();
      }
      
      if (target.id === 'show-password-keyboard') {
        this.showPasswordKeyboard();
      }
      
      if (target.id === 'show-manual-keyboard') {
        this.showManualKeyboard();
      }
      
      if (target.id === 'btn-verify-manual') {
        this.handleManualVerify();
      }
      
      if (target.id === 'btn-clear-manual') {
        this.handleManualClear();
      }
      
      if (target.id === 'btn-device-action') {
        this.handleDeviceAction();
      }
      
      if (target.id === 'btn-cancel-scan') {
        this.handleCancelScan();
      }
      
      // Protocol buttons
      if (target.id === 'btn-save-protocol') {
        this.handleSaveProtocol();
      }
      
      if (target.id === 'btn-print-protocol') {
        this.handlePrintProtocol();
      }
      
      if (target.id === 'btn-new-identification') {
        this.handleNewIdentification();
      }
      
      // Step actions
      if (target.closest('.step-action')) {
        this.handleStepAction(target.closest('.step-action') as HTMLElement);
      }
    });
  }

  private handleMethodClick(element: HTMLElement): void {
    const method = element.dataset.method;
    if (!method) return;

    // Update active state
    document.querySelectorAll('.method-item').forEach(item => {
      item.classList.remove('active');
    });
    element.classList.add('active');

    this.currentMethod = method;
    this.updateInterfaceForMethod(method);
  }

  private updateInterfaceForMethod(method: string): void {
    // Hide all content sections
    this.hideAllSections();

    switch (method) {
      case 'rfid':
      case 'qr':
      case 'barcode':
        this.showScanningInterface(method);
        break;
      case 'manual':
        this.showManualEntry();
        break;
      case 'list':
        if (this.currentType === 'user') {
          this.showUsersColumn();
        } else {
          this.showDeviceIdentification();
        }
        break;
      default:
        this.showDeviceIdentification();
    }
  }

  private hideAllSections(): void {
    const sections = [
      'user-login-form',
      'device-identification', 
      'scanning-interface',
      'manual-entry',
      'protocol-screen'
    ];

    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.style.display = 'none';
      }
    });

    // Hide users column
    const usersColumn = document.getElementById('users-column');
    if (usersColumn) {
      usersColumn.style.display = 'none';
    }
  }

  private showScanningInterface(method: string): void {
    const scanningInterface = document.getElementById('scanning-interface');
    if (scanningInterface) {
      scanningInterface.style.display = 'block';
    }

    // Update scanning content based on method
    const title = document.getElementById('scanning-title');
    const instruction = document.getElementById('scanning-instruction');

    if (title && instruction) {
      switch (method) {
        case 'rfid':
          title.textContent = 'Skanowanie RFID';
          instruction.textContent = 'Zbliż kartę RFID do czytnika';
          break;
        case 'qr':
          title.textContent = 'Skanowanie QR Code';
          instruction.textContent = 'Skieruj kamerę na kod QR';
          break;
        case 'barcode':
          title.textContent = 'Skanowanie Barcode';
          instruction.textContent = 'Skieruj skaner na kod kreskowy';
          break;
      }
    }

    // Simulate scanning process
    this.simulateScanningProcess();
  }

  private showManualEntry(): void {
    const manualEntry = document.getElementById('manual-entry');
    if (manualEntry) {
      manualEntry.style.display = 'block';
    }

    // Focus on input
    const input = document.getElementById('manual-input') as HTMLInputElement;
    if (input) {
      setTimeout(() => input.focus(), 100);
    }
  }

  private showUsersColumn(): void {
    const usersColumn = document.getElementById('users-column');
    if (usersColumn) {
      usersColumn.style.display = 'block';
    }
  }

  private showDeviceIdentification(): void {
    const deviceIdentification = document.getElementById('device-identification');
    if (deviceIdentification) {
      deviceIdentification.style.display = 'block';
    }
  }

  private handleUserClick(element: HTMLElement): void {
    const userId = element.dataset.user;
    const fullName = element.dataset.fullname;
    
    if (!userId || !fullName) return;

    // Update active state
    document.querySelectorAll('.user-menu-item').forEach(item => {
      item.classList.remove('selected');
    });
    element.classList.add('selected');

    // Show login form
    this.showUserLoginForm(fullName);
  }

  private showUserLoginForm(userName: string): void {
    const loginForm = document.getElementById('user-login-form');
    const userNameElement = document.getElementById('selected-user-name');
    
    if (loginForm && userNameElement) {
      userNameElement.textContent = userName;
      this.hideAllSections();
      loginForm.style.display = 'block';
    }

    // Focus on password input
    const passwordInput = document.getElementById('user-password') as HTMLInputElement;
    if (passwordInput) {
      setTimeout(() => passwordInput.focus(), 100);
    }
  }

  private handleDeviceCardClick(element: HTMLElement): void {
    const deviceName = element.dataset.device;
    const serial = element.dataset.serial;
    
    if (!deviceName || !serial) return;

    this.showDeviceInfo(deviceName, serial);
  }

  private showDeviceInfo(deviceName: string, serial: string): void {
    const deviceInfoCard = document.getElementById('device-info-card');
    const deviceNameElement = document.getElementById('device-name');
    const deviceSerialElement = document.getElementById('device-serial');
    
    if (deviceInfoCard && deviceNameElement && deviceSerialElement) {
      deviceNameElement.textContent = deviceName;
      deviceSerialElement.textContent = `#${serial}`;
      deviceInfoCard.style.display = 'flex';
    }

    // Update status
    const statusElement = document.getElementById('device-status');
    if (statusElement) {
      statusElement.innerHTML = `
        <span class="status-text">Urządzenie zidentyfikowane</span>
        <div class="status-indicator"></div>
      `;
    }
  }

  private handleUserLogin(): void {
    const passwordInput = document.getElementById('user-password') as HTMLInputElement;
    const password = passwordInput?.value;
    
    if (!password) {
      this.showNotification('Wprowadź hasło', 'error');
      return;
    }

    // Simulate login process
    this.showNotification('Logowanie...', 'info');
    
    setTimeout(() => {
      this.showNotification('Zalogowano pomyślnie', 'success');
      this.showProtocolScreen('user');
    }, 1500);
  }

  private handleCancelLogin(): void {
    this.hideAllSections();
    this.showDeviceIdentification();
    
    // Clear password input
    const passwordInput = document.getElementById('user-password') as HTMLInputElement;
    if (passwordInput) {
      passwordInput.value = '';
    }
  }

  private showPasswordKeyboard(): void {
    const input = document.getElementById('user-password') as HTMLInputElement;
    if (!input) return;

    if (this.passwordKeyboard) {
      this.passwordKeyboard.destroy();
    }

    this.passwordKeyboard = new VirtualKeyboard('password-keyboard-container', {
      targetInputId: 'user-password',
      layout: 'password',
      onKeyPress: (key: string, _value: string) => {
        if (key === 'CANCEL') {
          this.handleCancelLogin();
        }
      }
    });
  }

  private showManualKeyboard(): void {
    const input = document.getElementById('manual-input') as HTMLInputElement;
    if (!input) return;

    if (this.manualKeyboard) {
      this.manualKeyboard.destroy();
    }

    this.manualKeyboard = new VirtualKeyboard('manual-keyboard-container', {
      targetInputId: 'manual-input',
      layout: 'full',
      onEnter: (_value: string) => {
        this.handleManualVerify();
      }
    });
  }

  private handleManualVerify(): void {
    const input = document.getElementById('manual-input') as HTMLInputElement;
    const value = input?.value?.trim();
    
    if (!value) {
      this.showNotification('Wprowadź identyfikator', 'error');
      return;
    }

    // Simulate verification
    this.showNotification('Weryfikacja...', 'info');
    
    setTimeout(() => {
      // Mock successful verification
      if (value.length >= 3) {
        this.showNotification('Identyfikacja pomyślna', 'success');
        this.showProtocolScreen('device', value);
      } else {
        this.showNotification('Nieprawidłowy identyfikator', 'error');
      }
    }, 1000);
  }

  private handleManualClear(): void {
    const input = document.getElementById('manual-input') as HTMLInputElement;
    if (input) {
      input.value = '';
      input.focus();
    }
  }

  private handleDeviceAction(): void {
    this.showNotification('Rozpoczynanie procesu...', 'info');
    this.showProtocolScreen('device');
  }

  private handleCancelScan(): void {
    this.hideAllSections();
    this.showDeviceIdentification();
    this.showNotification('Skanowanie anulowane', 'info');
  }

  private simulateScanningProcess(): void {
    // Simulate successful scan after 3 seconds
    setTimeout(() => {
      this.showNotification('Skanowanie zakończone pomyślnie', 'success');
      this.showProtocolScreen('device', 'PSS-7000 #12345');
    }, 3000);
  }

  private showProtocolScreen(type: string, identifier?: string): void {
    this.hideAllSections();
    
    const protocolScreen = document.getElementById('protocol-screen');
    if (protocolScreen) {
      protocolScreen.style.display = 'block';
    }

    // Update protocol details
    this.updateProtocolDetails(type, identifier);
  }

  private updateProtocolDetails(type: string, identifier?: string): void {
    const deviceElement = document.getElementById('protocol-device');
    const methodElement = document.getElementById('protocol-method');
    
    if (deviceElement && methodElement) {
      deviceElement.textContent = identifier || `${type.toUpperCase()}-001`;
      methodElement.textContent = this.currentMethod.toUpperCase();
    }

    // Update timestamp
    const dateElement = document.getElementById('protocol-date');
    if (dateElement) {
      dateElement.textContent = new Date().toLocaleString('pl-PL');
    }
  }

  private handleSaveProtocol(): void {
    this.showNotification('Protokół zapisany', 'success');
  }

  private handlePrintProtocol(): void {
    this.showNotification('Wysyłanie do drukarki...', 'info');
    setTimeout(() => {
      this.showNotification('Protokół wydrukowany', 'success');
    }, 1500);
  }

  private handleNewIdentification(): void {
    this.hideAllSections();
    this.showDeviceIdentification();
    
    // Reset form states
    this.resetForms();
  }

  private handleStepAction(element: HTMLElement): void {
    const action = element.dataset.action;
    
    switch (action) {
      case 'go-to-testing':
        window.location.hash = '#/connect-test';
        break;
      case 'go-to-data':
        window.location.hash = '#/connect-data';
        break;
      case 'save-history':
        this.showNotification('Zapisano w historii', 'success');
        break;
    }
  }

  private resetForms(): void {
    // Clear inputs
    const inputs = document.querySelectorAll('#user-password, #manual-input') as NodeListOf<HTMLInputElement>;
    inputs.forEach(input => {
      input.value = '';
    });

    // Reset active states
    document.querySelectorAll('.user-menu-item').forEach(item => {
      item.classList.remove('selected');
    });

    // Hide device info card
    const deviceInfoCard = document.getElementById('device-info-card');
    if (deviceInfoCard) {
      deviceInfoCard.style.display = 'none';
    }
  }

  private showNotification(message: string, type: 'success' | 'error' | 'info'): void {
    // Simple notification system
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 10px 16px;
      border-radius: 6px;
      color: white;
      font-size: 13px;
      font-weight: 500;
      z-index: 10000;
      animation: slideIn 0.3s ease;
      background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
    `;

    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease forwards';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  // Public methods for external control
  public setType(type: string): void {
    this.currentType = type;
    this.updateInterfaceForMethod(this.currentMethod);
  }

  public getCurrentMethod(): string {
    return this.currentMethod;
  }

  public getCurrentType(): string {
    return this.currentType;
  }

  public cleanup(): void {
    if (this.manualKeyboard) {
      this.manualKeyboard.destroy();
      this.manualKeyboard = null;
    }
    
    if (this.passwordKeyboard) {
      this.passwordKeyboard.destroy();
      this.passwordKeyboard = null;
    }
  }
}
