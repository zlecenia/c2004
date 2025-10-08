/**
 * ConnectId Component - Migrated from c2002
 * Universal Identification Interface
 * Version: 2.1.0 (Migrated with executable manifests)
 */

class ConnectIdModule {
  constructor(containerId, options = {}) {
    this.containerId = containerId;
    this.options = {
      enableRFID: true,
      enableQR: true,
      enableBarcode: true,
      enableManual: true,
      continuousMode: false,
      historyPersistence: true,
      keyboardShortcuts: true,
      ...options
    };
    
    this.identificationCallbacks = [];
    this.connectIDInstance = null;
    this.initialized = false;
    
    console.log('🔍 ConnectId component created v2.1.0');
  }

  /**
   * Initialize the component
   */
  async initialize() {
    try {
      const container = document.getElementById(this.containerId);
      if (!container) {
        throw new Error(`Container ${this.containerId} not found`);
      }

      // Load universal-connectid dependency if available
      if (typeof UniversalConnectID !== 'undefined') {
        this.connectIDInstance = new UniversalConnectID(this.containerId, this.options);
        this.connectIDInstance.onIdentification(this.handleIdentification.bind(this));
      } else {
        console.warn('UniversalConnectID not available, using fallback mode');
        this.setupFallbackMode(container);
      }

      this.initialized = true;
      console.log('✅ ConnectId component initialized');
      
      return this;
    } catch (error) {
      console.error('❌ ConnectId initialization failed:', error);
      throw error;
    }
  }

  /**
   * Setup fallback mode when UniversalConnectID is not available
   */
  setupFallbackMode(container) {
    container.innerHTML = `
      <div class="connectid-fallback">
        <div class="alert alert-info">
          <h4>🔍 ConnectID Fallback Mode</h4>
          <p>Simulation mode - use keyboard shortcuts:</p>
          <ul>
            <li><kbd>Ctrl+R</kbd> - Simulate RFID</li>
            <li><kbd>Ctrl+Q</kbd> - Simulate QR</li>
            <li><kbd>Ctrl+B</kbd> - Simulate Barcode</li>
          </ul>
          <button id="manual-demo" class="btn btn-primary">Manual Demo</button>
        </div>
      </div>
    `;

    // Setup manual demo
    const manualBtn = container.querySelector('#manual-demo');
    if (manualBtn) {
      manualBtn.addEventListener('click', () => {
        const demoData = {
          id: 'DEMO-' + Date.now(),
          type: 'device',
          method: 'manual',
          value: 'DEMO-DEVICE-001',
          metadata: { demo: true, fallback: true }
        };
        this.handleIdentification(demoData);
      });
    }

    // Setup keyboard shortcuts
    if (this.options.keyboardShortcuts) {
      this.setupKeyboardShortcuts();
    }
  }

  /**
   * Setup keyboard shortcuts for demo
   */
  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if (!e.ctrlKey) return;

      let demoData = null;
      
      switch (e.key.toLowerCase()) {
        case 'r':
          if (this.options.enableRFID) {
            e.preventDefault();
            demoData = {
              id: 'RFID-' + Date.now(),
              type: 'user',
              method: 'rfid',
              value: 'RFID-' + Math.random().toString(36).substr(2, 9),
              metadata: { demo: true, simulated: true }
            };
          }
          break;
        case 'q':
          if (this.options.enableQR) {
            e.preventDefault();
            demoData = {
              id: 'QR-' + Date.now(),
              type: 'device',
              method: 'qr',
              value: 'QR-' + Math.random().toString(36).substr(2, 9),
              metadata: { demo: true, simulated: true }
            };
          }
          break;
        case 'b':
          if (this.options.enableBarcode) {
            e.preventDefault();
            demoData = {
              id: 'BC-' + Date.now(),
              type: 'device',
              method: 'barcode',
              value: 'BC-' + Math.random().toString(36).substr(2, 9),
              metadata: { demo: true, simulated: true }
            };
          }
          break;
      }

      if (demoData) {
        this.handleIdentification(demoData);
      }
    });
  }

  /**
   * Handle identification events
   */
  handleIdentification(data) {
    console.log('🔍 ConnectId identification:', data);
    
    // Add timestamp if not present
    if (!data.timestamp) {
      data.timestamp = new Date();
    }

    // Notify all callbacks
    this.identificationCallbacks.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error('Identification callback error:', error);
      }
    });
  }

  /**
   * Register identification callback
   */
  onIdentification(callback) {
    if (typeof callback === 'function') {
      this.identificationCallbacks.push(callback);
    }
  }

  /**
   * Remove identification callback
   */
  offIdentification(callback) {
    const index = this.identificationCallbacks.indexOf(callback);
    if (index > -1) {
      this.identificationCallbacks.splice(index, 1);
    }
  }

  /**
   * Start scanning (if supported)
   */
  startScanning() {
    if (this.connectIDInstance && this.connectIDInstance.startScanning) {
      this.connectIDInstance.startScanning();
    } else {
      console.log('📡 Scanning started (simulation mode)');
    }
  }

  /**
   * Stop scanning (if supported)
   */
  stopScanning() {
    if (this.connectIDInstance && this.connectIDInstance.stopScanning) {
      this.connectIDInstance.stopScanning();
    } else {
      console.log('📡 Scanning stopped (simulation mode)');
    }
  }

  /**
   * Get component status
   */
  getStatus() {
    return {
      initialized: this.initialized,
      hasHardware: !!this.connectIDInstance,
      options: this.options,
      callbackCount: this.identificationCallbacks.length
    };
  }

  /**
   * Destroy the component
   */
  destroy() {
    // Clean up event listeners
    this.identificationCallbacks = [];
    
    // Destroy underlying component
    if (this.connectIDInstance && this.connectIDInstance.destroy) {
      this.connectIDInstance.destroy();
    }
    
    // Clear container
    const container = document.getElementById(this.containerId);
    if (container) {
      container.innerHTML = '';
    }
    
    this.initialized = false;
    console.log('🔧 ConnectId component destroyed');
  }
}

// Export for module system
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ConnectIdModule;
}

// Global export for browser
if (typeof window !== 'undefined') {
  window.ConnectIdModule = ConnectIdModule;
}

console.log('📦 ConnectId component loaded v2.1.0');
