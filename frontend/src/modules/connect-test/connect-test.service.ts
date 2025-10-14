export interface TestDevice {
  id: string;
  serialNumber: string;
  type: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed' | 'warning';
  testType?: string;
  progress?: number;
  results?: TestResult;
  startTime?: Date;
  endTime?: Date;
}

export interface TestGroup {
  id: string;
  name: string;
  location: string;
  client: string;
  devices: TestDevice[];
  totalDevices: number;
  completedDevices: number;
  passedDevices: number;
  failedDevices: number;
  warningDevices: number;
  startTime?: Date;
  estimatedEndTime?: Date;
  status: 'idle' | 'running' | 'paused' | 'completed' | 'stopped';
}

export interface TestResult {
  testType: string;
  passed: boolean;
  pressure?: number;
  flow?: number;
  duration: number;
  steps: TestStep[];
  warnings: string[];
  errors: string[];
}

export interface TestStep {
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  pressure?: number;
  flow?: number;
  duration?: number;
}

export class ConnectTestService {
  private currentTest: TestDevice | null = null;
  private currentGroup: TestGroup | null = null;
  private testHistory: TestDevice[] = [];
  private groups: TestGroup[] = [];
  private testTypes = [
    { id: 'pressure', name: '🔧 Szczelność', description: 'Test szczelności maski' },
    { id: 'flow', name: '🌊 Przepływ', description: 'Test przepływu powietrza' },
    { id: 'function', name: '⚙️ Funkcyjny', description: 'Test funkcjonalny urządzenia' },
    { id: 'visual', name: '👁️ Wizualny', description: 'Kontrola wizualna' },
    { id: 'maintenance', name: '🔩 Konserwacja', description: 'Test konserwacyjny' },
    { id: 'calibration', name: '📏 Kalibracja', description: 'Kalibracja urządzenia' }
  ];

  constructor() {
    this.generateDemoData();
  }

  async initialize(): Promise<void> {
    
    // Initialize test system
    await this.initializeTestSystem();
    
    // Start periodic updates
    this.startPeriodicUpdates();
    
    // Dispatch ready event
    window.dispatchEvent(new CustomEvent('connecttest:ready', {
      detail: { service: this }
    }));
  }

  private async initializeTestSystem(): Promise<void> {
    // Simulate test system initialization
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  private startPeriodicUpdates(): void {
    setInterval(() => {
      if (this.currentTest && this.currentTest.status === 'in-progress') {
        this.updateTestProgress();
      }
      
      if (this.currentGroup && this.currentGroup.status === 'running') {
        this.updateGroupProgress();
      }
    }, 1000);
  }

  /**
   * Get available test types
   */
  getTestTypes() {
    return this.testTypes;
  }

  /**
   * Search for devices
   */
  async searchDevices(query: string, filters: {
    type?: string;
    status?: string;
  } = {}): Promise<TestDevice[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const devices = this.generateTestDevices(20);
    
    let filtered = devices;
    
    if (query) {
      filtered = filtered.filter(device => 
        device.serialNumber.toLowerCase().includes(query.toLowerCase()) ||
        device.type.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (filters.type) {
      filtered = filtered.filter(device => device.type === filters.type);
    }
    
    if (filters.status) {
      filtered = filtered.filter(device => device.status === filters.status);
    }
    
    return filtered;
  }

  /**
   * Get available test groups
   */
  getTestGroups(): TestGroup[] {
    return this.groups;
  }

  /**
   * Start single device test
   */
  async startDeviceTest(deviceId: string, testType: string): Promise<void> {
    const device = await this.findDevice(deviceId);
    if (!device) {
      throw new Error(`Device ${deviceId} not found`);
    }
    
    device.testType = testType;
    device.status = 'in-progress';
    device.startTime = new Date();
    device.progress = 0;
    device.results = this.initializeTestResult(testType);
    
    this.currentTest = device;
    
    
    // Dispatch test started event
    window.dispatchEvent(new CustomEvent('connecttest:test-started', {
      detail: { device, testType }
    }));
  }

  /**
   * Start group test
   */
  async startGroupTest(groupId: string, testType: string): Promise<void> {
    const group = this.groups.find(g => g.id === groupId);
    if (!group) {
      throw new Error(`Group ${groupId} not found`);
    }
    
    // Initialize all devices in group
    group.devices.forEach(device => {
      device.status = 'pending';
      device.testType = testType;
      device.progress = 0;
    });
    
    group.status = 'running';
    group.startTime = new Date();
    group.completedDevices = 0;
    group.passedDevices = 0;
    group.failedDevices = 0;
    group.warningDevices = 0;
    
    this.currentGroup = group;
    
    // Start first device
    if (group.devices.length > 0) {
      await this.startNextDeviceInGroup();
    }
    
    
    // Dispatch group test started event
    window.dispatchEvent(new CustomEvent('connecttest:group-test-started', {
      detail: { group, testType }
    }));
  }

  /**
   * Pause/Resume current test
   */
  pauseResumeTest(): void {
    if (this.currentTest) {
      // Handle single device test pause/resume
    }
    
    if (this.currentGroup) {
      if (this.currentGroup.status === 'running') {
        this.currentGroup.status = 'paused';
      } else if (this.currentGroup.status === 'paused') {
        this.currentGroup.status = 'running';
      }
      
      window.dispatchEvent(new CustomEvent('connecttest:group-status-changed', {
        detail: { group: this.currentGroup }
      }));
    }
  }

  /**
   * Stop current test
   */
  stopTest(): void {
    if (this.currentTest) {
      this.currentTest.status = 'failed';
      this.currentTest.endTime = new Date();
      this.testHistory.push({ ...this.currentTest });
      this.currentTest = null;
      
      
      window.dispatchEvent(new CustomEvent('connecttest:test-stopped', {
        detail: { reason: 'user_stopped' }
      }));
    }
    
    if (this.currentGroup) {
      this.currentGroup.status = 'stopped';
      
      window.dispatchEvent(new CustomEvent('connecttest:group-test-stopped', {
        detail: { group: this.currentGroup }
      }));
      
      this.currentGroup = null;
    }
  }

  /**
   * Skip current device in group test
   */
  skipCurrentDevice(): void {
    if (this.currentGroup && this.currentTest) {
      this.currentTest.status = 'failed';
      this.currentTest.endTime = new Date();
      this.currentGroup.completedDevices++;
      this.currentGroup.failedDevices++;
      
      
      // Start next device
      this.startNextDeviceInGroup();
    }
  }

  /**
   * Get current test status
   */
  getCurrentTest(): TestDevice | null {
    return this.currentTest;
  }

  /**
   * Get current group test status
   */
  getCurrentGroup(): TestGroup | null {
    return this.currentGroup;
  }

  /**
   * Get test history
   */
  getTestHistory(): TestDevice[] {
    return [...this.testHistory];
  }

  /**
   * Generate test report
   */
  async generateReport(type: 'device' | 'summary' | 'history', params: any): Promise<any> {
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      type,
      generatedAt: new Date(),
      data: type === 'device' ? this.testHistory.slice(-1) : this.testHistory.slice(-10)
    };
  }

  private async findDevice(deviceId: string): Promise<TestDevice | null> {
    const devices = await this.searchDevices('');
    return devices.find(d => d.id === deviceId) || null;
  }

  private async startNextDeviceInGroup(): Promise<void> {
    if (!this.currentGroup) return;
    
    const nextDevice = this.currentGroup.devices.find(d => d.status === 'pending');
    if (!nextDevice) {
      // All devices completed
      this.currentGroup.status = 'completed';
      this.currentTest = null;
      
      window.dispatchEvent(new CustomEvent('connecttest:group-test-completed', {
        detail: { group: this.currentGroup }
      }));
      
      return;
    }
    
    nextDevice.status = 'in-progress';
    nextDevice.startTime = new Date();
    nextDevice.progress = 0;
    nextDevice.results = this.initializeTestResult(nextDevice.testType || 'function');
    
    this.currentTest = nextDevice;
    
    window.dispatchEvent(new CustomEvent('connecttest:device-started', {
      detail: { device: nextDevice, group: this.currentGroup }
    }));
  }

  private updateTestProgress(): void {
    if (!this.currentTest || !this.currentTest.results) return;
    
    // Simulate test progress
    const progress = Math.min(this.currentTest.progress! + Math.random() * 5, 100);
    this.currentTest.progress = progress;
    
    // Update test steps
    const currentStep = this.currentTest.results.steps.find(s => s.status === 'running');
    if (currentStep) {
      currentStep.progress = Math.min(currentStep.progress + Math.random() * 10, 100);
      
      if (currentStep.progress >= 100) {
        currentStep.status = 'completed';
        
        // Start next step
        const nextStepIndex = this.currentTest.results.steps.indexOf(currentStep) + 1;
        if (nextStepIndex < this.currentTest.results.steps.length) {
          this.currentTest.results.steps[nextStepIndex].status = 'running';
        }
      }
    }
    
    // Complete test if all steps done
    if (progress >= 100 || this.currentTest.results.steps.every(s => s.status === 'completed')) {
      this.completeCurrentTest();
    }
    
    // Dispatch progress update
    window.dispatchEvent(new CustomEvent('connecttest:progress-update', {
      detail: { device: this.currentTest }
    }));
  }

  private updateGroupProgress(): void {
    if (!this.currentGroup) return;
    
    // Update group statistics
    const completed = this.currentGroup.devices.filter(d => d.status === 'completed' || d.status === 'failed' || d.status === 'warning').length;
    this.currentGroup.completedDevices = completed;
    
    // Estimate completion time
    if (this.currentGroup.startTime && completed > 0) {
      const elapsed = Date.now() - this.currentGroup.startTime.getTime();
      const avgTimePerDevice = elapsed / completed;
      const remaining = this.currentGroup.totalDevices - completed;
      this.currentGroup.estimatedEndTime = new Date(Date.now() + remaining * avgTimePerDevice);
    }
    
    window.dispatchEvent(new CustomEvent('connecttest:group-progress-update', {
      detail: { group: this.currentGroup }
    }));
  }

  private completeCurrentTest(): void {
    if (!this.currentTest) return;
    
    this.currentTest.status = Math.random() > 0.1 ? 'completed' : (Math.random() > 0.5 ? 'warning' : 'failed');
    this.currentTest.endTime = new Date();
    this.currentTest.progress = 100;
    
    // Add to history
    this.testHistory.push({ ...this.currentTest });
    
    // Update group stats if in group test
    if (this.currentGroup) {
      this.currentGroup.completedDevices++;
      if (this.currentTest.status === 'completed') this.currentGroup.passedDevices++;
      else if (this.currentTest.status === 'warning') this.currentGroup.warningDevices++;
      else this.currentGroup.failedDevices++;
      
      // Start next device in group
      setTimeout(() => this.startNextDeviceInGroup(), 2000);
    } else {
      this.currentTest = null;
    }
    
    window.dispatchEvent(new CustomEvent('connecttest:test-completed', {
      detail: { device: this.currentTest }
    }));
  }

  private initializeTestResult(testType: string): TestResult {
    const steps: TestStep[] = [
      { name: 'Inicjalizacja', status: 'running', progress: 0 },
      { name: 'Przygotowanie', status: 'pending', progress: 0 },
      { name: 'Stabilizacja', status: 'pending', progress: 0 },
      { name: 'Test główny', status: 'pending', progress: 0 },
      { name: 'Weryfikacja', status: 'pending', progress: 0 },
      { name: 'Finalizacja', status: 'pending', progress: 0 }
    ];
    
    return {
      testType,
      passed: false,
      duration: 0,
      steps,
      warnings: [],
      errors: []
    };
  }

  private generateDemoData(): void {
    // Generate demo groups
    this.groups = [
      {
        id: '1',
        name: 'STRAŻACY-WARSZAWA-01',
        location: 'JRG-1 Warszawa Śródmieście',
        client: 'Fire Department Warsaw',
        devices: this.generateTestDevices(25),
        totalDevices: 25,
        completedDevices: 0,
        passedDevices: 0,
        failedDevices: 0,
        warningDevices: 0,
        status: 'idle'
      },
      {
        id: '2',
        name: 'ACME-PRODUKCJA-HALA-A',
        location: 'ACME Hala Produkcyjna A',
        client: 'ACME Corporation',
        devices: this.generateTestDevices(42),
        totalDevices: 42,
        completedDevices: 15,
        passedDevices: 14,
        failedDevices: 0,
        warningDevices: 1,
        status: 'running'
      }
    ];
  }

  private generateTestDevices(count: number): TestDevice[] {
    const types = ['PP Mask G1', 'SCBA PSS-7000', 'NP Mask FPS', 'PP Mask Ultra Elite'];
    const statuses: TestDevice['status'][] = ['pending', 'completed', 'failed', 'warning'];
    
    return Array.from({ length: count }, (_, i) => ({
      id: `device-${i + 1}`,
      serialNumber: `G1-${String(i + 1001).padStart(6, '0')}`,
      type: types[i % types.length],
      status: i === 15 ? 'in-progress' : statuses[i % statuses.length]
    }));
  }

  destroy(): void {
    this.stopTest();
  }
}
