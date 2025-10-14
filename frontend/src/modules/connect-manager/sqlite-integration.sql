-- frontend/src/modules/connect-manager/database/schema.sql
-- SQLite schema for Connect Manager Scenario Builder

-- Drop existing tables if they exist (for development)
DROP TABLE IF EXISTS scenario_condition_parameters;
DROP TABLE IF EXISTS scenario_task_parameters;
DROP TABLE IF EXISTS scenario_conditions;
DROP TABLE IF EXISTS scenario_tasks;
DROP TABLE IF EXISTS scenario_goals;
DROP TABLE IF EXISTS test_scenarios;
DROP TABLE IF EXISTS scenario_templates;
DROP TABLE IF EXISTS scenario_objects;
DROP TABLE IF EXISTS scenario_functions;
DROP TABLE IF EXISTS scenario_parameters;
DROP TABLE IF EXISTS scenario_units;
DROP TABLE IF EXISTS scenario_tags;
DROP TABLE IF EXISTS test_type_assignments;
DROP TABLE IF EXISTS activities;
DROP TABLE IF EXISTS activity_categories;

-- Activity categories
CREATE TABLE activity_categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    color TEXT,
    icon TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Activities
CREATE TABLE activities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    duration_minutes INTEGER NOT NULL DEFAULT 10,
    category_id INTEGER,
    is_active BOOLEAN DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES activity_categories(id)
);

-- Test scenarios main table
CREATE TABLE test_scenarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    author TEXT,
    version TEXT DEFAULT '1.0.0',
    is_template BOOLEAN DEFAULT 0,
    is_active BOOLEAN DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Scenario goals
CREATE TABLE scenario_goals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    scenario_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    order_index INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (scenario_id) REFERENCES test_scenarios(id) ON DELETE CASCADE
);

-- Scenario tasks
CREATE TABLE scenario_tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    goal_id INTEGER NOT NULL,
    function_id INTEGER NOT NULL,
    object_id INTEGER NOT NULL,
    order_index INTEGER NOT NULL DEFAULT 0,
    operator TEXT, -- 'AND', 'OR', NULL
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (goal_id) REFERENCES scenario_goals(id) ON DELETE CASCADE,
    FOREIGN KEY (function_id) REFERENCES scenario_functions(id),
    FOREIGN KEY (object_id) REFERENCES scenario_objects(id)
);

-- Scenario conditions
CREATE TABLE scenario_conditions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    goal_id INTEGER NOT NULL,
    condition_type TEXT NOT NULL CHECK (condition_type IN ('IF', 'ELSE', 'ELSEIF', 'WHILE')),
    order_index INTEGER NOT NULL DEFAULT 0,
    error_message TEXT,
    result_action TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (goal_id) REFERENCES scenario_goals(id) ON DELETE CASCADE
);

-- Condition parameters
CREATE TABLE scenario_condition_parameters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    condition_id INTEGER NOT NULL,
    parameter_id INTEGER,
    operator TEXT CHECK (operator IN ('>', '<', '=', '>=', '<=', '!=')),
    value REAL,
    unit_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (condition_id) REFERENCES scenario_conditions(id) ON DELETE CASCADE,
    FOREIGN KEY (parameter_id) REFERENCES scenario_parameters(id),
    FOREIGN KEY (unit_id) REFERENCES scenario_units(id)
);

-- Task parameters
CREATE TABLE scenario_task_parameters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_id INTEGER NOT NULL,
    parameter_id INTEGER NOT NULL,
    value REAL,
    unit_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES scenario_tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (parameter_id) REFERENCES scenario_parameters(id),
    FOREIGN KEY (unit_id) REFERENCES scenario_units(id)
);

-- Functions library
CREATE TABLE scenario_functions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    category TEXT CHECK (category IN ('action', 'measure', 'control', 'validate')),
    description TEXT,
    icon TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Objects library
CREATE TABLE scenario_objects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    type TEXT CHECK (type IN ('pump', 'valve', 'sensor', 'regulator', 'compressor', 'other')),
    description TEXT,
    icon TEXT,
    default_parameters TEXT, -- JSON array of parameter IDs
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Parameters library
CREATE TABLE scenario_parameters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    data_type TEXT CHECK (data_type IN ('number', 'text', 'boolean', 'datetime')),
    default_value TEXT,
    min_value REAL,
    max_value REAL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Units library
CREATE TABLE scenario_units (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    symbol TEXT NOT NULL UNIQUE,
    parameter_id INTEGER,
    conversion_factor REAL DEFAULT 1.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parameter_id) REFERENCES scenario_parameters(id)
);

-- Tags for scenarios
CREATE TABLE scenario_tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    scenario_id INTEGER NOT NULL,
    tag TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (scenario_id) REFERENCES test_scenarios(id) ON DELETE CASCADE,
    UNIQUE(scenario_id, tag)
);

-- Test type assignments
CREATE TABLE test_type_assignments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    device_id TEXT NOT NULL,
    scenario_id INTEGER NOT NULL,
    interval_type TEXT CHECK (interval_type IN ('daily', 'weekly', 'monthly', 'quarterly', 'yearly', 'after_use', 'custom')),
    interval_value INTEGER,
    last_performed TIMESTAMP,
    next_scheduled TIMESTAMP,
    is_active BOOLEAN DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (scenario_id) REFERENCES test_scenarios(id)
);

-- Scenario templates
CREATE TABLE scenario_templates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT,
    template_data TEXT NOT NULL, -- JSON structure
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_scenario_goals_scenario ON scenario_goals(scenario_id);
CREATE INDEX idx_scenario_tasks_goal ON scenario_tasks(goal_id);
CREATE INDEX idx_scenario_conditions_goal ON scenario_conditions(goal_id);
CREATE INDEX idx_scenario_tags_scenario ON scenario_tags(scenario_id);
CREATE INDEX idx_scenario_tags_tag ON scenario_tags(tag);
CREATE INDEX idx_test_type_assignments_device ON test_type_assignments(device_id);
CREATE INDEX idx_test_type_assignments_scenario ON test_type_assignments(scenario_id);
CREATE INDEX idx_activities_category ON activities(category_id);

-- Triggers for updated_at timestamps
CREATE TRIGGER update_test_scenarios_timestamp 
AFTER UPDATE ON test_scenarios
BEGIN
    UPDATE test_scenarios SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER update_activities_timestamp 
AFTER UPDATE ON activities
BEGIN
    UPDATE activities SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER update_test_type_assignments_timestamp 
AFTER UPDATE ON test_type_assignments
BEGIN
    UPDATE test_type_assignments SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- Insert default data

-- Activity categories
INSERT INTO activity_categories (name, color, icon) VALUES
    ('pressure', '#1976d2', '🌡️'),
    ('flow', '#0277bd', '💨'),
    ('safety', '#c62828', '🔒'),
    ('visual', '#7b1fa2', '👁️'),
    ('config', '#c2185b', '⚙️'),
    ('analysis', '#2e7d32', '📊'),
    ('docs', '#ef6c00', '📄');

-- Functions
INSERT INTO scenario_functions (name, category, description, icon) VALUES
    ('Włącz', 'action', 'Włączenie urządzenia', '▶️'),
    ('Wyłącz', 'action', 'Wyłączenie urządzenia', '⏹️'),
    ('Ustaw', 'control', 'Ustawienie parametru', '🎚️'),
    ('Zmierz', 'measure', 'Pomiar wartości', '📏'),
    ('Sprawdź', 'validate', 'Weryfikacja wartości', '✓'),
    ('Porównaj', 'validate', 'Porównanie wartości', '⚖️'),
    ('Kalibruj', 'control', 'Kalibracja urządzenia', '🎯'),
    ('Resetuj', 'action', 'Reset urządzenia', '🔄'),
    ('Zapisz', 'action', 'Zapisanie wartości', '💾'),
    ('Odczytaj', 'measure', 'Odczyt wartości', '📖');

-- Objects
INSERT INTO scenario_objects (name, type, description, icon) VALUES
    ('pompa 1', 'pump', 'Główna pompa systemu', '🔧'),
    ('pompa 2', 'pump', 'Zapasowa pompa', '🔧'),
    ('zawór 1', 'valve', 'Zawór wejściowy', '🚰'),
    ('zawór 2', 'valve', 'Zawór wyjściowy', '🚰'),
    ('zawór 3', 'valve', 'Zawór bezpieczeństwa', '🚰'),
    ('sprężarka', 'compressor', 'Główna sprężarka', '💨'),
    ('regulator', 'regulator', 'Regulator ciśnienia', '🎛️'),
    ('czujnik ciśnienia', 'sensor', 'Sensor ciśnienia', '📡'),
    ('czujnik temperatury', 'sensor', 'Sensor temperatury', '🌡️'),
    ('czujnik przepływu', 'sensor', 'Sensor przepływu', '📊');

-- Parameters
INSERT INTO scenario_parameters (name, data_type, min_value, max_value) VALUES
    ('ciśnienie', 'number', 0, 1000),
    ('temperatura', 'number', -50, 150),
    ('przepływ', 'number', 0, 500),
    ('czas', 'number', 0, 3600),
    ('objętość', 'number', 0, 1000),
    ('wilgotność', 'number', 0, 100),
    ('napięcie', 'number', 0, 400),
    ('prąd', 'number', 0, 100),
    ('moc', 'number', 0, 10000),
    ('częstotliwość', 'number', 0, 100);

-- Units
INSERT INTO scenario_units (name, symbol, parameter_id) VALUES
    ('milibar', 'mbar', 1),
    ('bar', 'bar', 1),
    ('pascal', 'Pa', 1),
    ('stopień Celsjusza', '°C', 2),
    ('stopień Fahrenheita', '°F', 2),
    ('kelwin', 'K', 2),
    ('litr na minutę', 'l/min', 3),
    ('metr sześcienny na godzinę', 'm³/h', 3),
    ('sekunda', 's', 4),
    ('minuta', 'min', 4),
    ('godzina', 'h', 4),
    ('litr', 'l', 5),
    ('metr sześcienny', 'm³', 5),
    ('procent', '%', 6),
    ('wolt', 'V', 7),
    ('amper', 'A', 8),
    ('wat', 'W', 9),
    ('kilowat', 'kW', 9),
    ('herc', 'Hz', 10);

-- Sample templates
INSERT INTO scenario_templates (name, description, category, template_data) VALUES
    ('Test przepływu podstawowy', 'Prosty test przepływu powietrza', 'przepływ',
     '{"goals":[{"name":"Zmierzyć przepływ","tasks":[{"function":"Włącz","object":"pompa 1"},{"function":"Zmierz","object":"przepływ"}],"conditions":[{"type":"IF","parameter":"przepływ","operator":">","value":100,"unit":"l/min","result":"Test OK"}]}]}'),
    
    ('Kontrola ciśnienia', 'Sprawdzenie i regulacja ciśnienia', 'ciśnienie',
     '{"goals":[{"name":"Przetestować ciśnienie","tasks":[{"function":"Ustaw","object":"regulator"},{"function":"Sprawdź","object":"ciśnienie"}],"conditions":[{"type":"IF","parameter":"ciśnienie","operator":"=","value":5,"unit":"bar","result":"Kalibracja OK"}]}]}'),
    
    ('Test szczelności kompleksowy', 'Zaawansowany test szczelności z wieloma warunkami', 'szczelność',
     '{"goals":[{"name":"Sprawdzić szczelność","tasks":[{"function":"Włącz","object":"zawór 1"},{"function":"Włącz","object":"zawór 2"}],"conditions":[{"type":"IF","parameter":"czas","operator":">","value":60,"unit":"s"},{"type":"IF","parameter":"ciśnienie","operator":"<","value":0.5,"unit":"bar","result":"Szczelność OK"},{"type":"ELSE","error":"Nieszczelność wykryta"}]}]}'),
    
    ('Kalibracja czujnika', 'Procedura kalibracji czujnika', 'kalibracja',
     '{"goals":[{"name":"Kalibrować czujnik","tasks":[{"function":"Kalibruj","object":"czujnik ciśnienia"},{"function":"Sprawdź","object":"czujnik ciśnienia"}],"conditions":[{"type":"IF","parameter":"dokładność","operator":"=","value":0.1,"unit":"%","result":"Kalibracja zakończona"}]}]}');

-- Sample test scenario
INSERT INTO test_scenarios (name, description, author) VALUES
    ('Test szczelności C20', 'Kompleksowy test szczelności dla urządzenia C20', 'admin');

-- Add goals to the sample scenario
INSERT INTO scenario_goals (scenario_id, name, description, order_index) VALUES
    (1, 'Wytworzyć podciśnienie', 'Utworzenie podciśnienia w systemie', 0),
    (1, 'Sprawdzić szczelność', 'Weryfikacja szczelności połączeń', 1);

-- Add tasks to goals
INSERT INTO scenario_tasks (goal_id, function_id, object_id, order_index, operator) VALUES
    (1, 1, 1, 0, NULL),  -- Włącz pompę 1
    (1, 1, 3, 1, 'AND'), -- Włącz zawór 1
    (1, 3, 7, 2, 'AND'); -- Ustaw regulator

-- Add conditions to goals
INSERT INTO scenario_conditions (goal_id, condition_type, order_index, result_action, error_message) VALUES
    (1, 'IF', 0, 'Niskie ciśnienie OK', NULL),
    (1, 'ELSE', 1, NULL, 'Nieszczelność wykryta');

-- Add parameters to conditions
INSERT INTO scenario_condition_parameters (condition_id, parameter_id, operator, value, unit_id) VALUES
    (1, 4, '>', 10, 9),  -- czas > 10s
    (1, 1, '>', 10, 1);  -- ciśnienie > 10 mbar

-- Add tags to the sample scenario
INSERT INTO scenario_tags (scenario_id, tag) VALUES
    (1, 'szczelność'),
    (1, 'C20'),
    (1, 'podstawowy');

-- Create a view for easy scenario overview
CREATE VIEW scenario_overview AS
SELECT 
    ts.id,
    ts.name,
    ts.description,
    ts.author,
    ts.version,
    ts.created_at,
    ts.updated_at,
    COUNT(DISTINCT sg.id) as goal_count,
    COUNT(DISTINCT st.id) as task_count,
    COUNT(DISTINCT sc.id) as condition_count,
    GROUP_CONCAT(DISTINCT stg.tag) as tags
FROM test_scenarios ts
LEFT JOIN scenario_goals sg ON ts.id = sg.scenario_id
LEFT JOIN scenario_tasks st ON sg.id = st.goal_id
LEFT JOIN scenario_conditions sc ON sg.id = sc.goal_id
LEFT JOIN scenario_tags stg ON ts.id = stg.scenario_id
GROUP BY ts.id;

-- Create a view for test assignments with details
CREATE VIEW test_assignment_details AS
SELECT 
    tta.id,
    tta.device_id,
    ts.name as scenario_name,
    ts.description as scenario_description,
    tta.interval_type,
    tta.interval_value,
    tta.last_performed,
    tta.next_scheduled,
    tta.is_active,
    CASE 
        WHEN tta.next_scheduled < CURRENT_TIMESTAMP THEN 'overdue'
        WHEN tta.next_scheduled < datetime('now', '+7 days') THEN 'upcoming'
        ELSE 'scheduled'
    END as status
FROM test_type_assignments tta
JOIN test_scenarios ts ON tta.scenario_id = ts.id
WHERE tta.is_active = 1;
