export interface Activity {
  id: string;
  name: string;
  description: string;
  duration: number;
  category: string;
}

export interface Scenario {
  id: string;
  name: string;
  activities: Activity[];
}

export interface TestTypeAssignment {
  id: string;
  deviceId: string;
  scenarioId: string;
  interval: string;
  testType: 'interval' | 'usage';
}

export class ConnectManagerService {
  private scenarios: Scenario[] = [
    {
      id: 'scenario-c20',
      name: 'Scenariusz C20',
      activities: [
        { id: 'act-1', name: 'Sprawdzenie ciśnienia wejściowego', description: 'Kontrola ciśnienia na wejściu systemu', duration: 15, category: 'pressure' },
        { id: 'act-2', name: 'Test szczelności', description: 'Sprawdzenie szczelności połączeń', duration: 20, category: 'safety' },
        { id: 'act-3', name: 'Kontrola wizualna', description: 'Wizualna inspekcja urządzenia', duration: 10, category: 'visual' }
      ]
    },
    {
      id: 'pressure-test',
      name: 'Test Ciśnienia',
      activities: [
        { id: 'act-4', name: 'Konfiguracja parametrów', description: 'Ustawienie parametrów testowych', duration: 5, category: 'config' },
        { id: 'act-5', name: 'Uruchomienie testu', description: 'Rozpoczęcie procedury testowej', duration: 30, category: 'pressure' }
      ]
    }
  ];

  private activities: Activity[] = [
    { id: 'act-1', name: 'Sprawdzenie ciśnienia wejściowego', description: 'Kontrola ciśnienia na wejściu systemu', duration: 15, category: 'pressure' },
    { id: 'act-2', name: 'Test szczelności', description: 'Sprawdzenie szczelności połączeń', duration: 20, category: 'safety' },
    { id: 'act-3', name: 'Kontrola wizualna', description: 'Wizualna inspekcja urządzenia', duration: 10, category: 'visual' },
    { id: 'act-4', name: 'Konfiguracja parametrów', description: 'Ustawienie parametrów testowych', duration: 5, category: 'config' },
    { id: 'act-5', name: 'Uruchomienie testu', description: 'Rozpoczęcie procedury testowej', duration: 30, category: 'pressure' }
  ];

  private testTypeAssignments: TestTypeAssignment[] = [
    { id: 'assign-1', deviceId: 'device-001', scenarioId: 'scenario-c20', interval: 'monthly', testType: 'interval' },
    { id: 'assign-2', deviceId: 'device-002', scenarioId: 'pressure-test', interval: 'usage', testType: 'usage' }
  ];

  getScenarios(): Promise<Scenario[]> {
    return Promise.resolve(this.scenarios);
  }

  getActivities(): Promise<Activity[]> {
    return Promise.resolve(this.activities);
  }

  getTestTypeAssignments(): Promise<TestTypeAssignment[]> {
    return Promise.resolve(this.testTypeAssignments);
  }

  addScenario(scenario: Omit<Scenario, 'id'>): Promise<Scenario> {
    const newScenario: Scenario = {
      ...scenario,
      id: `scenario-${Date.now()}`
    };
    this.scenarios.push(newScenario);
    return Promise.resolve(newScenario);
  }

  updateScenario(id: string, updates: Partial<Scenario>): Promise<Scenario> {
    const index = this.scenarios.findIndex(s => s.id === id);
    if (index !== -1) {
      this.scenarios[index] = { ...this.scenarios[index], ...updates };
      return Promise.resolve(this.scenarios[index]);
    }
    throw new Error('Scenario not found');
  }

  deleteScenario(id: string): Promise<void> {
    const index = this.scenarios.findIndex(s => s.id === id);
    if (index !== -1) {
      this.scenarios.splice(index, 1);
      return Promise.resolve();
    }
    throw new Error('Scenario not found');
  }

  addActivity(activity: Omit<Activity, 'id'>): Promise<Activity> {
    const newActivity: Activity = {
      ...activity,
      id: `act-${Date.now()}`
    };
    this.activities.push(newActivity);
    return Promise.resolve(newActivity);
  }

  updateActivity(id: string, updates: Partial<Activity>): Promise<Activity> {
    const index = this.activities.findIndex(a => a.id === id);
    if (index !== -1) {
      this.activities[index] = { ...this.activities[index], ...updates };
      return Promise.resolve(this.activities[index]);
    }
    throw new Error('Activity not found');
  }

  deleteActivity(id: string): Promise<void> {
    const index = this.activities.findIndex(a => a.id === id);
    if (index !== -1) {
      this.activities.splice(index, 1);
      return Promise.resolve();
    }
    throw new Error('Activity not found');
  }

  addTestTypeAssignment(assignment: Omit<TestTypeAssignment, 'id'>): Promise<TestTypeAssignment> {
    const newAssignment: TestTypeAssignment = {
      ...assignment,
      id: `assign-${Date.now()}`
    };
    this.testTypeAssignments.push(newAssignment);
    return Promise.resolve(newAssignment);
  }

  updateTestTypeAssignment(id: string, updates: Partial<TestTypeAssignment>): Promise<TestTypeAssignment> {
    const index = this.testTypeAssignments.findIndex(a => a.id === id);
    if (index !== -1) {
      this.testTypeAssignments[index] = { ...this.testTypeAssignments[index], ...updates };
      return Promise.resolve(this.testTypeAssignments[index]);
    }
    throw new Error('Assignment not found');
  }

  deleteTestTypeAssignment(id: string): Promise<void> {
    const index = this.testTypeAssignments.findIndex(a => a.id === id);
    if (index !== -1) {
      this.testTypeAssignments.splice(index, 1);
      return Promise.resolve();
    }
    throw new Error('Assignment not found');
  }
}
