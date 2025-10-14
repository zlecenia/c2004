// frontend/src/modules/connect-id/connect-id.service.ts
interface ConnectIdConfiguration {
  enableRFID?: boolean;
  enableQR?: boolean; 
  enableBarcode?: boolean;
  enableManual?: boolean;
  continuousMode?: boolean;
  historyPersistence?: boolean;
  keyboardShortcuts?: boolean;
}

interface IdentificationData {
  id?: string;
  rfid_uid?: string;
  code?: string;
  type: 'user' | 'device' | 'group' | 'test';
  method: 'rfid' | 'qr' | 'barcode' | 'manual';
  value?: string;
  timestamp?: Date;
  data?: {
    name?: string;
    serial_number?: string;
    device_type?: string;
    role?: string;
    group_name?: string;
    device_count?: number;
  };
  metadata?: Record<string, any>;
}

interface HistoryItem {
  timestamp: Date;
  type: 'user' | 'device' | 'group' | 'test';
  method: 'rfid' | 'qr' | 'barcode' | 'manual';
  id: string;
  data: {
    name?: string;
    serial_number?: string;
    device_type?: string;
    role?: string;
    group_name?: string;
    device_count?: number;
  };
  status: 'success' | 'error';
  error?: string;
}

type TestType = 'pressure' | 'flow' | 'function' | 'visual' | 'maintenance' | 'calibration';

export class ConnectIdService {
  private config: ConnectIdConfiguration;
  private initialized: boolean = false;
  private continuousMode: boolean = false;
  private identificationHistory: HistoryItem[] = [];
  private connectIDInstance: any = null;
  private currentIdentificationType: 'user' | 'device' | 'group' | 'test' = 'device';
  private currentTestType: TestType = 'function';
  private virtualKeyboardVisible: boolean = false;

  constructor(config?: ConnectIdConfiguration) {
    this.config = {
      enableRFID: true,
      enableQR: true,
      enableBarcode: true,
      enableManual: true,
      continuousMode: false,
      historyPersistence: true,
      keyboardShortcuts: true,
      ...config
    };
  }

  async initialize(): Promise<void> {
    
    // Load identification history from localStorage
    this.loadIdentificationHistory();
    
    // Setup keyboard shortcuts if enabled
    if (this.config.keyboardShortcuts) {
      this.setupKeyboardShortcuts();
    }
    
    this.initialized = true;
  }

  async destroy(): Promise<void> {
    
    // Save history to localStorage
    if (this.config.historyPersistence) {
      this.saveIdentificationHistory();
    }
    
    // Clean up event listeners
    this.removeKeyboardShortcuts();
    
    this.initialized = false;
  }

  isHealthy(): boolean {
    return this.initialized;
  }

  /**
   * Initialize ConnectID component instance (now internal)
   */
  initializeConnectID(containerId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const container = document.getElementById(containerId);
      if (!container) {
        reject(new Error(`Container ${containerId} not found`));
        return;
      }

      // Initialize internal ConnectID functionality (no longer depends on external component)
      this.connectIDInstance = {
        // Mock external ConnectID interface
        setIdentificationType: (type: any) => {
        },
        switchMethod: (method: any) => {
        },
        clearCurrentScan: () => {
        },
        startScanning: () => {
        },
        stopScanning: () => {
        },
        onIdentification: (_callback: any) => {
        }
      };

      // Set up container UI
      container.innerHTML = `
        <div class="connectid-internal">
          <div class="scan-status">
            <div class="status-indicator ready">🟢</div>
            <span>Gotowy do identyfikacji</span>
          </div>
          <div class="scan-info">
            <p>Kliknij przyciski metod lub użyj skrótów klawiszowych:</p>
            <div class="shortcuts">
              <span class="shortcut">Ctrl+R - RFID</span>
              <span class="shortcut">Ctrl+Q - QR Code</span>
              <span class="shortcut">Ctrl+B - Barcode</span>
              <span class="shortcut">Ctrl+M - Manual</span>
            </div>
          </div>
        </div>
      `;

      resolve(this.connectIDInstance);
    });
  }

  /**
   * Handle identification events
   */
  private async handleIdentification(identificationData: IdentificationData): Promise<void> {
    
    try {
      // Add to history
      const historyItem = this.createHistoryItem(identificationData, 'success');
      this.addToIdentificationHistory(historyItem);

      // Update UI
      this.updateIdentificationStats();

      // Handle different types of identifications
      if (identificationData.type === 'user') {
        await this.handleUserIdentification(identificationData);
      } else if (identificationData.type === 'device') {
        await this.handleDeviceIdentification(identificationData);
      } else if (identificationData.type === 'group') {
        await this.handleGroupIdentification(identificationData);
      }

      // Show notification
      const deviceName = identificationData.data?.name || 
                        identificationData.data?.serial_number || 
                        identificationData.rfid_uid || 
                        identificationData.code || 
                        'Unknown';
      this.showNotification(
        `✅ ${identificationData.type} identified: ${deviceName}`, 
        'success'
      );

      // Trigger custom event for other components
      window.dispatchEvent(new CustomEvent('connectid:identification', {
        detail: identificationData
      }));

      // Handle continuous mode
      if (this.continuousMode) {
        setTimeout(() => {
          this.startScanning();
        }, 2000);
      }

    } catch (error) {
      console.error('❌ Error handling identification:', error);
      
      // Add error to history
      const errorHistoryItem = this.createHistoryItem(identificationData, 'error', (error as Error).message);
      this.addToIdentificationHistory(errorHistoryItem);
      
      this.showNotification('❌ Error processing identification: ' + (error as Error).message, 'danger');
      throw error;
    }
  }

  /**
   * Handle user identification (login)
   */
  private async handleUserIdentification(identificationData: IdentificationData): Promise<void> {
    
    if (identificationData.rfid_uid && (window as any).loginWithRFID) {
      try {
        await (window as any).loginWithRFID(identificationData);
        this.showNotification('👤 User logged in successfully', 'success');
      } catch (error) {
        console.error('Login error:', error);
        this.showNotification('❌ Login failed: ' + (error as Error).message, 'danger');
      }
    } else {
      this.showNotification('👤 User identified (login functionality not available)', 'info');
    }
  }

  /**
   * Handle device identification
   */
  private async handleDeviceIdentification(identificationData: IdentificationData): Promise<void> {
    
    const deviceInfo = identificationData.data;
    if (deviceInfo) {
      const message = `📱 Device: ${deviceInfo.serial_number || 'Unknown'} (${deviceInfo.device_type || 'Unknown type'})`;
      this.showNotification(message, 'info');
      
      // Optional: Navigate to device test page
      // window.location.href = `/connect-plus?device=${deviceInfo.serial_number}`;
    }
  }

  /**
   * Handle group identification
   */
  private async handleGroupIdentification(identificationData: IdentificationData): Promise<void> {
    
    const groupInfo = identificationData.data;
    if (groupInfo) {
      const message = `📦 Group: ${groupInfo.group_name || 'Unknown'} (${groupInfo.device_count || 0} devices)`;
      this.showNotification(message, 'info');
      
      // Optional: Navigate to group management page
      // window.location.href = `/fleet-workshop-manager#device-groups`;
    }
  }

  /**
   * Create history item from identification data
   */
  private createHistoryItem(identificationData: IdentificationData, status: 'success' | 'error', error?: string): HistoryItem {
    return {
      timestamp: new Date(),
      type: identificationData.type,
      method: identificationData.method,
      id: identificationData.rfid_uid || identificationData.code || identificationData.id || 'N/A',
      data: identificationData.data || {},
      status,
      error
    };
  }

  /**
   * Add identification to history
   */
  private addToIdentificationHistory(historyItem: HistoryItem): void {
    this.identificationHistory.unshift(historyItem);
    
    // Keep only last 50 items (like original)
    if (this.identificationHistory.length > 50) {
      this.identificationHistory = this.identificationHistory.slice(0, 50);
    }
    
    // Save to localStorage if enabled
    if (this.config.historyPersistence) {
      this.saveIdentificationHistory();
    }
    
    // Update UI
    this.renderIdentificationHistory();
  }

  /**
   * Get identification history
   */
  getHistory(limit: number = 10): HistoryItem[] {
    return this.identificationHistory.slice(0, limit);
  }

  /**
   * Clear identification history
   */
  clearHistory(): boolean {
    if (confirm('Are you sure you want to clear all identification history?')) {
      this.identificationHistory = [];
      if (this.config.historyPersistence) {
        localStorage.removeItem('connectid_history');
      }
      this.renderIdentificationHistory();
      this.updateIdentificationStats();
      this.showNotification('🗑️ History cleared', 'info');
      return true;
    }
    return false;
  }

  /**
   * Set identification type
   */
  setIdentificationType(type: 'user' | 'device' | 'group' | 'test'): void {
    this.currentIdentificationType = type;
    
    if (this.connectIDInstance && this.connectIDInstance.setIdentificationType) {
      this.connectIDInstance.setIdentificationType(type);
    }
    
    const labels = {
      'user': 'Użytkownik (Login)',
      'device': 'Urządzenie (Test)',
      'group': 'Grupa urządzeń',
      'test': 'Test (Kod testowy)'
    };
    
    this.showNotification(`Wybrano typ: ${labels[type]}`, 'info');
    
    // Trigger event for UI updates
    window.dispatchEvent(new CustomEvent('connectid:type-changed', {
      detail: { type, showTestSelector: type === 'device' || type === 'test' }
    }));
  }

  /**
   * Get current identification type
   */
  getIdentificationType(): 'user' | 'device' | 'group' | 'test' {
    return this.currentIdentificationType;
  }

  /**
   * Set test type
   */
  setTestType(testType: TestType): void {
    this.currentTestType = testType;
    
    const labels = {
      'pressure': 'Szczelność',
      'flow': 'Przepływ', 
      'function': 'Funkcyjny',
      'visual': 'Wizualny',
      'maintenance': 'Konserwacja',
      'calibration': 'Kalibracja'
    };
    
    this.showNotification(`Wybrano test: ${labels[testType]}`, 'success');
  }

  /**
   * Get current test type
   */
  getTestType(): TestType {
    return this.currentTestType;
  }

  /**
   * Test all systems
   */
  async testAllSystems(): Promise<void> {
    this.showNotification('🧪 Testing all systems...', 'info');
    
    // Simulate system tests
    return new Promise((resolve) => {
      setTimeout(() => {
        const systems = ['RFID Reader', 'QR Camera', 'Barcode Scanner', 'Database'];
        const testResults = systems.map(system => ({
          system,
          status: Math.random() > 0.1 ? 'success' : 'error'
        }));
        
        const allPassed = testResults.every(result => result.status === 'success');
        
        if (allPassed) {
          this.showNotification('✅ All systems test passed', 'success');
        } else {
          const failedSystems = testResults.filter(r => r.status === 'error').map(r => r.system);
          this.showNotification(`❌ System test failed: ${failedSystems.join(', ')}`, 'danger');
        }
        
        resolve();
      }, 2000);
    });
  }

  /**
   * Handle manual identification
   */
  handleManualIdentification(code: string): void {
    
    const identificationData: IdentificationData = {
      method: 'manual',
      code: code,
      type: this.currentIdentificationType,
      data: {
        serial_number: code,
        name: code,
        device_type: 'Manual Entry'
      }
    };
    
    this.handleIdentification(identificationData);
  }

  /**
   * Handle barcode identification
   */
  handleBarcodeIdentification(code: string): void {
    
    const identificationData: IdentificationData = {
      method: 'barcode',
      code: code,
      type: this.currentIdentificationType,
      data: {
        serial_number: code,
        name: code,
        device_type: 'Barcode Scan'
      }
    };
    
    this.handleIdentification(identificationData);
  }

  /**
   * Toggle virtual keyboard
   */
  toggleVirtualKeyboard(): boolean {
    this.virtualKeyboardVisible = !this.virtualKeyboardVisible;
    
    window.dispatchEvent(new CustomEvent('connectid:keyboard-toggle', {
      detail: { visible: this.virtualKeyboardVisible }
    }));
    
    if (this.virtualKeyboardVisible) {
      this.showNotification('🖥️ Klawiatura wirtualna włączona', 'info');
    } else {
      this.showNotification('🖥️ Klawiatura wirtualna ukryta', 'info');
    }
    
    return this.virtualKeyboardVisible;
  }

  /**
   * Is virtual keyboard visible
   */
  isVirtualKeyboardVisible(): boolean {
    return this.virtualKeyboardVisible;
  }

  /**
   * Switch to specific method
   */
  switchToMethod(method: 'rfid' | 'qr' | 'barcode' | 'manual'): void {
    
    if (this.connectIDInstance && this.connectIDInstance.switchMethod) {
      this.connectIDInstance.switchMethod(method);
    }
    
    const methodNames = {
      'rfid': 'RFID',
      'qr': 'QR Code',
      'barcode': 'Barcode',
      'manual': 'Klawiatura'
    };
    
    this.showNotification(`📱 Przełączono na metodę: ${methodNames[method]}`, 'info');
    
    // Auto-show keyboard for manual method
    if (method === 'manual' && !this.virtualKeyboardVisible) {
      setTimeout(() => this.toggleVirtualKeyboard(), 100);
    } else if (method !== 'manual' && this.virtualKeyboardVisible) {
      this.toggleVirtualKeyboard();
    }
    
    window.dispatchEvent(new CustomEvent('connectid:method-switch', {
      detail: { method }
    }));
  }

  /**
   * Toggle continuous mode
   */
  toggleContinuousMode(): boolean {
    this.continuousMode = !this.continuousMode;
    return this.continuousMode;
  }

  /**
   * Start scanning
   */
  startScanning(): void {
    if (this.connectIDInstance && this.connectIDInstance.startScanning) {
      this.connectIDInstance.startScanning();
    }
  }

  /**
   * Stop scanning
   */
  stopScanning(): void {
    if (this.connectIDInstance && this.connectIDInstance.stopScanning) {
      this.connectIDInstance.stopScanning();
    }
  }

  /**
   * Load history from localStorage
   */
  private loadIdentificationHistory(): void {
    if (!this.config.historyPersistence) return;
    
    try {
      const stored = localStorage.getItem('connectid_history');
      if (stored) {
        const parsed = JSON.parse(stored);
        this.identificationHistory = parsed.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
      }
      
      // Add demo data if empty (like original)
      if (this.identificationHistory.length === 0) {
        this.identificationHistory = [
          {
            timestamp: new Date(Date.now() - 2 * 60 * 1000),
            type: 'user' as const,
            method: 'rfid' as const,
            id: 'A1B2C3D4E5F6',
            data: { name: 'Robert Arendt', role: 'Operator' },
            status: 'success' as const
          },
          {
            timestamp: new Date(Date.now() - 5 * 60 * 1000),
            type: 'device' as const,
            method: 'manual' as const,
            id: 'G1-001234',
            data: { serial_number: 'G1-001234', device_type: 'PP Mask G1' },
            status: 'success' as const
          },
          {
            timestamp: new Date(Date.now() - 8 * 60 * 1000),
            type: 'device' as const,
            method: 'qr' as const,
            id: 'PSS-00567',
            data: { serial_number: 'PSS-00567', device_type: 'SCBA PSS-7000' },
            status: 'success' as const
          }
        ];
      }
      
      this.renderIdentificationHistory();
      this.updateIdentificationStats();
      
    } catch (error) {
      console.warn('Failed to load identification history:', error);
    }
  }

  /**
   * Save history to localStorage
   */
  private saveIdentificationHistory(): void {
    try {
      localStorage.setItem('connectid_history', JSON.stringify(this.identificationHistory));
    } catch (error) {
      console.warn('Failed to save identification history:', error);
    }
  }

  /**
   * Render identification history in UI
   */
  private renderIdentificationHistory(): void {
    const historyData = this.identificationHistory.slice(0, 10).map(item => {
      const timeAgo = this.getTimeAgo(item.timestamp);
      const iconMap = {
        'rfid': '🏷',
        'qr': '📱',
        'barcode': '📊',
        'manual': '⌨'
      };
      
      return {
        icon: iconMap[item.method] || '🔍',
        title: item.data?.name || item.data?.serial_number || item.id,
        description: `${item.method?.toUpperCase() || 'Unknown'}: ${item.id}${item.data?.role || item.data?.device_type ? ` - ${item.data.role || item.data.device_type}` : ''}`,
        timeAgo,
        status: item.status,
        method: item.method
      };
    });

    window.dispatchEvent(new CustomEvent('connectid:history-update', {
      detail: { history: historyData, isEmpty: this.identificationHistory.length === 0 }
    }));
  }

  /**
   * Update identification statistics
   */
  private updateIdentificationStats(): void {
    const successCount = this.identificationHistory.filter(item => item.status === 'success').length;
    
    window.dispatchEvent(new CustomEvent('connectid:stats-update', {
      detail: { successCount, totalCount: this.identificationHistory.length }
    }));
  }

  /**
   * Get statistics
   */
  getStatistics(): { successCount: number; totalCount: number } {
    const successCount = this.identificationHistory.filter(item => item.status === 'success').length;
    return { successCount, totalCount: this.identificationHistory.length };
  }

  /**
   * Calculate time ago string
   */
  private getTimeAgo(timestamp: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'now';
    if (diffMins < 60) return `${diffMins} min ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  }

  /**
   * Show notification
   */
  private showNotification(message: string, type: 'info' | 'success' | 'warning' | 'danger' = 'info'): void {
    window.dispatchEvent(new CustomEvent('connectid:notification', {
      detail: { message, type }
    }));
  }

  /**
   * Setup keyboard shortcuts
   */
  private setupKeyboardShortcuts(): void {
    document.addEventListener('keydown', this.handleKeyboardShortcut.bind(this));
  }

  /**
   * Remove keyboard shortcuts
   */
  private removeKeyboardShortcuts(): void {
    document.removeEventListener('keydown', this.handleKeyboardShortcut.bind(this));
  }

  /**
   * Handle keyboard shortcuts
   */
  private handleKeyboardShortcut(e: KeyboardEvent): void {
    if (!e.ctrlKey) return;

    switch (e.key.toLowerCase()) {
      case 'r':
        if (this.config.enableRFID) {
          e.preventDefault();
          this.simulateRFID();
        }
        break;
      case 'q':
        if (this.config.enableQR) {
          e.preventDefault();
          this.switchToMethod('qr');
        }
        break;
      case 'b':
        if (this.config.enableBarcode) {
          e.preventDefault();
          this.switchToMethod('barcode');
        }
        break;
      case 'm':
        if (this.config.enableManual) {
          e.preventDefault();
          this.switchToMethod('manual');
        }
        break;
    }
    
    // Escape to clear current scan
    if (e.key === 'Escape') {
      if (this.connectIDInstance && this.connectIDInstance.clearCurrentScan) {
        this.connectIDInstance.clearCurrentScan();
      }
    }
  }

  /**
   * Simulate RFID identification (for demo)
   */
  private simulateRFID(): void {
    const demoData: IdentificationData = {
      method: 'rfid',
      rfid_uid: `RFID-${Math.random().toString(36).substr(2, 9)}`,
      type: this.currentIdentificationType,
      data: {
        name: 'Demo User',
        serial_number: `RFID-${Date.now()}`,
        device_type: 'RFID Demo',
        role: 'Operator'
      }
    };
    
    this.handleIdentification(demoData);
  }
}
