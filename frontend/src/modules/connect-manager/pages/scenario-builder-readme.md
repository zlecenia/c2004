# Connect Manager - Scenario Builder

## 📋 Opis modułu

Moduł **Connect Manager** z funkcjonalnością budowania scenariuszy testowych jako zdań logicznych. Umożliwia tworzenie złożonych scenariuszy testowych w strukturze hierarchicznej Goal → Task → Function.

## 🏗️ Struktura scenariusza

```
SCENARIO: [Nazwa scenariusza]
  └── GOAL: [Cel testu]
      ├── TASK 1: [Zadanie]
      │   ├── Function: [Akcja]
      │   ├── Object: [Obiekt]
      │   └── Parameters: [Parametry]
      ├── TASK 2: [...]
      └── CONDITIONS:
          ├── IF [warunek] THEN [rezultat]
          └── ELSE [akcja alternatywna]
```

## 🎯 Hierarchia elementów

### 1. **Goal (Cel)**
Główny cel testu, np.:
- Wytworzyć podciśnienie
- Sprawdzić szczelność
- Zmierzyć przepływ
- Przetestować ciśnienie
- Kalibrować urządzenie

### 2. **Task (Zadanie)**
Konkretne działanie do wykonania:
- Składa się z: Function + Object + Parameters
- Może zawierać operatory logiczne (AND, OR)
- Przykład: `Włącz [pompę 1] AND Włącz [zawór 1]`

### 3. **Function (Funkcja)**
Akcje do wykonania:
- **action**: Włącz, Wyłącz
- **control**: Ustaw, Kalibruj
- **measure**: Zmierz
- **validate**: Sprawdź, Porównaj

### 4. **Object (Obiekt)**
Elementy systemu:
- **pump**: pompa 1, pompa 2
- **valve**: zawór 1, zawór 2, zawór 3
- **sensor**: czujnik ciśnienia, czujnik temperatury
- **regulator**: regulator
- **compressor**: sprężarka

### 5. **Parameters (Parametry)**
Wartości pomiarowe:
- ciśnienie (mbar, bar)
- temperatura (°C)
- przepływ (l/min)
- czas (s, min)
- objętość (l)
- wilgotność (%)

## 💻 Implementacja

### Struktura plików
```
frontend/src/modules/connect-manager/
├── connect-manager.module.ts    # Moduł główny
├── connect-manager.service.ts   # Serwis z logiką biznesową
├── connect-manager.view.ts      # Widok główny
├── pages/
│   ├── index.ts                # Page Manager
│   ├── scenarios.page.ts       # Strona budowania scenariuszy
│   ├── activities.page.ts      # Strona czynności
│   └── test-types.page.ts      # Strona typów testów
└── README.md
```

### Serwis - Główne metody

```typescript
// Scenariusze testowe
getTestScenarios(): Promise<TestScenario[]>
saveTestScenario(scenario): Promise<TestScenario>
updateTestScenario(id, updates): Promise<TestScenario>
deleteTestScenario(id): Promise<void>

// Elementy biblioteki
getScenarioFunctions(): Promise<ScenarioFunction[]>
getScenarioObjects(): Promise<ScenarioObject[]>
getScenarioParameters(): Promise<ScenarioParameter[]>

// Szablony
getScenarioTemplates(): Promise<any[]>

// Import/Export
exportScenario(id): Promise<string>
importScenario(jsonData): Promise<TestScenario>
```

## 🎨 Interfejs użytkownika

### Główne funkcjonalności:

1. **Budowanie zdań logicznych**
   - Drag & Drop elementów z biblioteki
   - Selecty z opcjami wyboru
   - Inputy dla wartości parametrów

2. **Biblioteka elementów**
   - Obiekty (pompy, zawory, czujniki)
   - Funkcje (akcje, pomiary, kontrola)
   - Parametry (jednostki, zakresy)

3. **Przykłady z bazy**
   - Gotowe scenariusze
   - Możliwość wczytania i modyfikacji
   - Szablony do wykorzystania

4. **Podgląd scenariusza**
   - Generowanie kodu tekstowego
   - Eksport do pliku
   - Kopiowanie do schowka

## 🔧 Przykładowe scenariusze

### Test szczelności
```
SCENARIO: Test szczelności C20
  GOAL: Wytworzyć podciśnienie
    TASK 1: Włącz [pompę 1] AND Włącz [zawór 1] AND Ustaw [ciśnienie] = 10 mbar
    IF [czas] > 10s TO [niskie ciśnienie] > 10 mbar
    ELSE ERROR "Nieszczelność"
```

### Test przepływu
```
SCENARIO: Test przepływu
  GOAL: Zmierzyć przepływ
    TASK 1: Włącz [pompę 2]
    TASK 2: Zmierz [przepływ]
    IF [przepływ] > 100 l/min
    THEN "Test zaliczony"
    ELSE ERROR "Przepływ poniżej normy"
```

### Kontrola ciśnienia
```
SCENARIO: Kontrola ciśnienia
  GOAL: Przetestować ciśnienie
    TASK 1: Ustaw [regulator] = 5 bar
    TASK 2: Sprawdź [ciśnienie]
    IF [ciśnienie] = 5 bar ± 0.1
    THEN "Kalibracja poprawna"
    ELSE "Wymagana rekalibracja"
```

## 🚀 Uruchomienie

1. Import modułu w aplikacji:
```typescript
import { ConnectManagerModule } from './modules/connect-manager';
```

2. Rejestracja modułu:
```typescript
const connectManager = new ConnectManagerModule();
await connectManager.initialize();
```

3. Routing:
```
/connect-manager          - Strona główna
/connect-manager#scenarios - Budowanie scenariuszy
/connect-manager#activities - Zarządzanie czynnościami
/connect-manager#test-types - Typy testów
```

## 🗄️ Baza danych

Moduł symuluje bazę SQLite z następującymi tabelami:

- `test_scenarios` - scenariusze testowe
- `scenario_goals` - cele scenariuszy
- `scenario_tasks` - zadania w celach
- `scenario_conditions` - warunki logiczne
- `scenario_functions` - funkcje dostępne
- `scenario_objects` - obiekty systemowe
- `scenario_parameters` - parametry pomiarowe

## 📦 Zależności

- TypeScript
- Drag & Drop API
- Clipboard API
- JSON Export/Import

## 🔄 Planowane rozszerzenia

1. **Walidacja scenariuszy**
   - Sprawdzanie poprawności składni
   - Weryfikacja zakresów parametrów
   - Ostrzeżenia o konfliktach

2. **Historia zmian**
   - Śledzenie modyfikacji
   - Możliwość cofania zmian
   - Wersjonowanie scenariuszy

3. **Współpraca**
   - Udostępnianie scenariuszy
   - Komentarze i notatki
   - Prawa dostępu

4. **Integracja z systemami**
   - Eksport do formatów przemysłowych
   - API REST dla zewnętrznych systemów
   - Webhooks dla zdarzeń

## 📝 Licencja

Moduł jest częścią systemu webGUI i podlega licencji projektu.
