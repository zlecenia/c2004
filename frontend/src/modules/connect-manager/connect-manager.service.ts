// frontend/src/modules/connect-manager/connect-manager.service.ts

// Interfaces for scenario builder
export interface ScenarioFunction {
  id: string;
  name: string;
  category: 'action' | 'measure' | 'control' | 'validate';
}

export interface ScenarioObject {
  id: string;
  name: string;
  type: 'pump' | 'valve' | 'sensor' | 'regulator' | 'compressor';
  parameters?: string[];
}

export interface ScenarioParameter {
  id: string;
  name: string;
  unit: string;
  min?: number;
  max?: number;
  defaultValue?: number;
}

export interface ScenarioTask {
  id: string;
  function: string;
  object: string;
  parameters?: { [key: string]: any };
  operators?: string[];
}

export interface ScenarioCondition {
  id: string;
  type: 'if' | 'else' | 'elseif' | 'while';
  parameter?: string;
  operator?: string;
  value?: any;
  unit?: string;
  result?: string;
  errorMessage?: string;
}

export interface ScenarioGoal {
  id: string;
  name: string;
  description?: string;
  tasks: ScenarioTask[];
  conditions: ScenarioCondition[];
}

export interface TestScenario {
  id: string;
  name: string;
  description?: string;
  goals: ScenarioGoal[];
  createdAt: string;
  updatedAt: string;
  author?: string;
  tags?: string[];
}

// Previous interfaces
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
  // Scenario builder data - simulating SQLite database
  private testScenarios: TestScenario[] = [
    {
      id: 'scenario-1',
      name: 'Test szczelności C20',
      description: 'Kompleksowy test szczelności dla urządzenia C20',
      goals: [
        {
          id: 'goal-1',
          name: 'Wytworzyć podciśnienie',
          tasks: [
            {
              id: 'task-1',
              function: 'Włącz',
              object: 'pompa 1',
              operators: ['AND']
            },
            {
              id: 'task-2',
              function: 'Włącz',
              object: 'zawór 1',
              operators: ['AND']
            },
            {
              id: 'task-3',
              function: 'Ustaw',
              object: 'ciśnienie',
              parameters: { value: 10, unit: 'mbar' }
            }
          ],
          conditions: [
            {
              id: 'cond-1',
              type: 'if',
              parameter: 'czas',
              operator: '>',
              value: 10,
              unit: 's',
              result: 'niskie ciśnienie > 10 mbar'
            },
            {
              id: 'cond-2',
              type: 'else',
              errorMessage: 'Nieszczelność'
            }
          ]
        }
      ],
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
      tags: ['szczelność', 'C20', 'podstawowy']
    },
    {
      id: 'scenario-2',
      name: 'Test przepływu',
      description: 'Test przepływu powietrza',
      goals: [
        {
          id: 'goal-2',
          name: 'Zmierzyć przepływ',
          tasks: [
            {
              id: 'task-4',
              function: 'Włącz',
              object: 'pompa 2'
            },
            {
              id: 'task-5',
              function: 'Zmierz',
              object: 'przepływ',
              parameters: { expectedValue: 100, unit: 'l/min' }
            }
          ],
          conditions: [
            {
              id: 'cond-3',
              type: 'if',
              parameter: 'przepływ',
              operator: '>',
              value: 100,
              unit: 'l/min',
              result: 'Test zaliczony'
            }
          ]
        }
      ],
      createdAt: '2024-01-14T09:00:00Z',
      updatedAt: '2024-01-14T09:00:00Z',
      tags: ['przepływ', 'wydajność']
    }
  ];

  // Library elements
  private scenarioFunctions: ScenarioFunction[] = [
    { id: 'func-1', name: 'Włącz', category: 'action' },
    { id: 'func-2', name: 'Wyłącz', category: 'action' },
    { id: 'func-3', name: 'Ustaw', category: 'control' },
    { id: 'func-4', name: 'Zmierz', category: 'measure' },
    { id: 'func-5', name: 'Sprawdź', category: 'validate' },
    { id: 'func-6', name: 'Porównaj', category: 'validate' },
    { id: 'func-7', name: 'Kalibruj', category: 'control' }
  ];

  private scenarioObjects: ScenarioObject[] = [
    { id: 'obj-1', name: 'pompa 1', type: 'pump' },
    { id: 'obj-2', name: 'pompa 2', type: 'pump' },
    { id: 'obj-3', name: 'zawór 1', type: 'valve' },
    { id: 'obj-4', name: 'zawór 2', type: 'valve' },
    { id: 'obj-5', name: 'zawór 3', type: 'valve' },
    { id: 'obj-6', name: 'sprężarka', type: 'compressor' },
    { id: 'obj-7', name: 'regulator', type: 'regulator' },
    { id: 'obj-8', name: 'czujnik ciśnienia', type: 'sensor', parameters: ['ciśnienie'] },
    { id: 'obj-9', name: 'czujnik temperatury', type: 'sensor', parameters: ['temperatura'] },
    { id: 'obj-10', name: 'czujnik przepływu', type: 'sensor', parameters: ['przepływ'] }
  ];

  private scenarioParameters: ScenarioParameter[] = [
    { id: 'param-1', name: 'ciśnienie', unit: 'mbar', min: 0, max: 1000 },
    { id: 'param-2', name: 'temperatura', unit: '°C', min: -50, max: 150 },
    { id: 'param-3', name: 'przepływ', unit: 'l/min', min: 0, max: 500 },
    { id: 'param-4', name: 'czas', unit: 's', min: 0, max: 3600 },
    { id: 'param-5', name: 'objętość', unit: 'l', min: 0, max: 1000 },
    { id: 'param-6', name: 'wilgotność', unit: '%', min: 0, max: 100 }
  ];

  // Previous data
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

  // Test Scenario methods
  getTestScenarios(): Promise<TestScenario[]> {
    return Promise.resolve(this.testScenarios);
  }

  getTestScenarioById(id: string): Promise<TestScenario | undefined> {
    const scenario = this.testScenarios.find(s => s.id === id);
    return Promise.resolve(scenario);
  }

  searchTestScenarios(query: string): Promise<TestScenario[]> {
    const lowercaseQuery = query.toLowerCase();
    const results = this.testScenarios.filter(scenario =>
      scenario.name.toLowerCase().includes(lowercaseQuery) ||
      scenario.description?.toLowerCase().includes(lowercaseQuery) ||
      scenario.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
    return Promise.resolve(results);
  }

  saveTestScenario(scenario: Omit<TestScenario, 'id' | 'createdAt' | 'updatedAt'>): Promise<TestScenario> {
    const newScenario: TestScenario = {
      ...scenario,
      id: `scenario-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.testScenarios.push(newScenario);
    return Promise.resolve(newScenario);
  }

  updateTestScenario(id: string, updates: Partial<TestScenario>): Promise<TestScenario> {
    const index = this.testScenarios.findIndex(s => s.id === id);
    if (index !== -1) {
      this.testScenarios[index] = {
        ...this.testScenarios[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      return Promise.resolve(this.testScenarios[index]);
    }
    throw new Error('Test scenario not found');
  }

  deleteTestScenario(id: string): Promise<void> {
    const index = this.testScenarios.findIndex(s => s.id === id);
    if (index !== -1) {
      this.testScenarios.splice(index, 1);
      return Promise.resolve();
    }
    throw new Error('Test scenario not found');
  }

  // Library methods
  getScenarioFunctions(): Promise<ScenarioFunction[]> {
    return Promise.resolve(this.scenarioFunctions);
  }

  getScenarioObjects(): Promise<ScenarioObject[]> {
    return Promise.resolve(this.scenarioObjects);
  }

  getScenarioParameters(): Promise<ScenarioParameter[]> {
    return Promise.resolve(this.scenarioParameters);
  }

  // Example templates
  getScenarioTemplates(): Promise<any[]> {
    const templates = [
      {
        id: 'template-1',
        name: 'Test przepływu podstawowy',
        description: 'Włącz [pompę] → Zmierz [przepływ] > wartość graniczna',
        category: 'przepływ'
      },
      {
        id: 'template-2',
        name: 'Kontrola ciśnienia',
        description: 'Ustaw [regulator] = wartość → Sprawdź [ciśnienie]',
        category: 'ciśnienie'
      },
      {
        id: 'template-3',
        name: 'Test szczelności kompleksowy',
        description: 'Włącz [zawór 1] AND [zawór 2] → IF [czas] > 60s THEN [ciśnienie] < 0.5 bar',
        category: 'szczelność'
      },
      {
        id: 'template-4',
        name: 'Kalibracja czujnika',
        description: 'Kalibruj [czujnik] → Sprawdź [dokładność] = ±0.1%',
        category: 'kalibracja'
      }
    ];
    return Promise.resolve(templates);
  }

  // Export/Import scenarios
  exportScenario(id: string): Promise<string> {
    const scenario = this.testScenarios.find(s => s.id === id);
    if (scenario) {
      return Promise.resolve(JSON.stringify(scenario, null, 2));
    }
    throw new Error('Scenario not found');
  }

  importScenario(jsonData: string): Promise<TestScenario> {
    try {
      const scenario = JSON.parse(jsonData);
      return this.saveTestScenario(scenario);
    } catch (error) {
      throw new Error('Invalid scenario data');
    }
  }

  // Previous methods (kept for compatibility)
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
