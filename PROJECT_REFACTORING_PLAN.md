# Plan Refaktoryzacji Projektu C2004

## 📊 Analiza Projektu

### Statystyki
- **Całkowita liczba plików TypeScript**: 172
- **Liczba modułów**: 10
- **Pliki CSS**: 3
- **Całkowita liczba linii kodu**: ~30,000

### ⚠️ KRYTYCZNE - Pliki wymagające natychmiastowej refaktoryzacji (>800 linii)

1. **`main.ts`** - **1,585 linii** ⚠️⚠️⚠️
   - Zawiera routing, inicjalizację, HTML templates, style CSS
   - Mix odpowiedzialności: routing, UI, module loading, event handling
   
2. **`connect-manager/pages/scenarios.page.ts`** - **1,008 linii** ⚠️⚠️
   - Monolityczna strona z HTML, CSS, logiką biznesową
   
3. **`menu-editor/menu-editor.view.ts`** - **909 linii** ⚠️⚠️
   - Duża klasa widoku z mieszanymi odpowiedzialnościami

### 🔍 Znalezione Duplikaty

#### Pliki Backup (do usunięcia)
```
frontend/src/modules/connect-workshop/connect-workshop.view.ts.backup
frontend/src/modules/connect-test/connect-test.view.ts.backup
frontend/src/modules/connect-manager/scenario-builder-tests.ts.bak
frontend/src/modules/connect-manager/connect-manager.view.ts.backup
frontend/src/modules/connect-manager/database-service.ts.bak
frontend/src/modules/connect-data/connect-filter.view.ts.backup
```

### 📁 Struktura Modułów

| Moduł | Rozmiar | Status |
|-------|---------|--------|
| connect-config | 488K | ✅ Dobra struktura 3-poziomowa |
| connect-manager | 212K | ⚠️ Wymaga refaktoryzacji |
| connect-test | 168K | ⚠️ Duplikaty stylów |
| connect-workshop | 172K | ⚠️ Duplikaty templates |
| connect-reports | 156K | ⚠️ Komponenty w module |
| connect-id | 152K | ⚠️ Duży service (736 linii) |
| connect-data | 100K | ✅ Względnie OK |
| template | 60K | ✅ OK |
| menu-editor | 36K | ⚠️ Duży view |
| identification | 20K | ❓ Przestarzały? |

---

## 🎯 PLAN REFAKTORYZACJI - PRIORYTET 1

### 1. Refaktoryzacja `main.ts` (1,585 → ~200 linii)

#### Problem
- Wszystko w jednym pliku: routing, inicjalizacja, HTML, CSS, event handlers
- Trudność w testowaniu i utrzymaniu
- Powtarzalny kod ładowania modułów

#### Rozwiązanie
Podzielić na:

```
src/
├── main.ts (tylko bootstrap)
├── core/
│   ├── app.initializer.ts
│   ├── router/
│   │   ├── router.ts
│   │   ├── route.handler.ts
│   │   └── route.registry.ts (już istnieje)
│   ├── module-loader/
│   │   ├── module-loader.ts
│   │   └── module-loader.interface.ts
│   └── ui/
│       ├── app-shell.ts
│       └── top-bar.ts
└── styles/
    ├── app-shell.css
    └── top-bar.css
```

**Akcje:**
```typescript
// main.ts (po refaktoryzacji - ~50 linii)
import { AppInitializer } from './core/app.initializer';
import './styles/app-shell.css';

const app = new AppInitializer();
app.start().catch(showErrorUI);
```

**Podział odpowiedzialności:**
- `app.initializer.ts` - inicjalizacja app, menu, module manager
- `router.ts` - routing logic
- `route.handler.ts` - obsługa zmian route
- `module-loader.ts` - ładowanie modułów
- `app-shell.ts` - struktura HTML
- `top-bar.ts` - logika top bar

---

### 2. Refaktoryzacja `scenarios.page.ts` (1,008 → ~300 linii)

#### Problem
- Jedna klasa zawiera: HTML template, CSS, logikę drag&drop, event handlers
- Trudność w testowaniu poszczególnych funkcji

#### Rozwiązanie
Podzielić na komponenty:

```
connect-manager/pages/scenarios/
├── scenarios.page.ts (główny orchestrator ~100 linii)
├── scenario-builder/
│   ├── scenario-builder.component.ts
│   ├── scenario-builder.template.ts
│   ├── scenario-builder.styles.ts
│   └── scenario-builder.types.ts
├── goal-section/
│   ├── goal-section.component.ts
│   └── goal-section.template.ts
├── task-builder/
│   ├── task-builder.component.ts
│   └── task-builder.template.ts
├── condition-builder/
│   ├── condition-builder.component.ts
│   └── condition-builder.template.ts
├── element-library/
│   ├── element-library.component.ts
│   └── drag-drop.handler.ts
└── preview/
    ├── scenario-preview.component.ts
    └── scenario-exporter.ts
```

**Benefits:**
- Każdy komponent ma swoją odpowiedzialność
- Łatwiejsze testowanie
- Możliwość reużycia komponentów
- Lepsza czytelność kodu

---

### 3. Refaktoryzacja `menu-editor.view.ts` (909 → ~250 linii)

#### Rozwiązanie
```
menu-editor/
├── menu-editor.view.ts (orchestrator ~80 linii)
├── components/
│   ├── menu-tree/
│   │   ├── menu-tree.component.ts
│   │   └── menu-tree.template.ts
│   ├── menu-form/
│   │   ├── menu-form.component.ts
│   │   └── menu-form.validator.ts
│   └── menu-preview/
│       ├── menu-preview.component.ts
│       └── menu-preview.styles.ts
├── services/
│   ├── menu-editor.service.ts
│   └── menu-storage.service.ts
└── types/
    └── menu-editor.types.ts
```

---

## 🎯 PRIORYTET 2 - Eliminacja Duplikatów

### 1. Usunięcie plików backup
```bash
# Do wykonania
rm frontend/src/modules/connect-workshop/connect-workshop.view.ts.backup
rm frontend/src/modules/connect-test/connect-test.view.ts.backup
rm frontend/src/modules/connect-manager/scenario-builder-tests.ts.bak
rm frontend/src/modules/connect-manager/connect-manager.view.ts.backup
rm frontend/src/modules/connect-manager/database-service.ts.bak
rm frontend/src/modules/connect-data/connect-filter.view.ts.backup
```

### 2. Zunifikowanie wzorców Page/View

**Problem:** Niektóre moduły używają `static getContent()`, inne `render()`

**Rozwiązanie:** Stworzyć wspólny interface:
```typescript
// shared/interfaces/page.interface.ts
export interface IPage {
  render(): string;
  getStyles(): string;
  setupEventListeners?(container: HTMLElement): void;
  destroy?(): void;
}

export interface IStaticPage {
  getContent(): string;
  getStyles(): string;
  attachEventListeners?(): void;
}
```

### 3. Zunifikowanie Service Pattern

**Znalezione wzorce:**
- `connect-id.service.ts` (736 linii) - za duży
- `connect-test.service.ts` (487 linii)
- `connect-manager.service.ts` (455 linii)
- `connect-workshop.service.ts` (423 linii)

**Rozwiązanie:**
Każdy duży service podzielić na:
```
services/
├── {module}.service.ts (główny - max 200 linii)
├── {module}-data.service.ts (API calls)
├── {module}-state.service.ts (state management)
└── {module}-validator.service.ts (validation logic)
```

---

## 🎯 PRIORYTET 3 - Stworzenie Shared Components

### Problem
Duplikacja kodu w różnych modułach:
- Formularze
- Tabele
- Przyciski
- Modale
- Notifications

### Rozwiązanie
```
shared/
├── components/
│   ├── forms/
│   │   ├── form-input.component.ts
│   │   ├── form-select.component.ts
│   │   └── form-validator.ts
│   ├── tables/
│   │   ├── data-table.component.ts
│   │   └── table-pagination.component.ts
│   ├── modals/
│   │   ├── modal.component.ts
│   │   └── modal.service.ts
│   ├── notifications/
│   │   ├── notification.component.ts
│   │   └── notification.service.ts
│   └── buttons/
│       └── button.component.ts
├── types/
│   ├── common.types.ts (już istnieje)
│   └── form.types.ts
└── utils/
    ├── dom.helpers.ts (już istnieje)
    ├── validation.helpers.ts
    └── format.helpers.ts
```

---

## 🎯 PRIORYTET 4 - Separacja HTML/CSS od TS

### Problem
HTML i CSS inline w plikach TypeScript - trudne do utrzymania

### Znalezione przypadki
- `main.ts` - 14x `innerHTML = \``
- Wszystkie pliki `.page.ts` - HTML w metodach
- Style CSS jako stringi w metodach `getStyles()`

### Rozwiązanie

#### Opcja A: Template Literals w osobnych plikach
```typescript
// {component}.template.ts
export const scenarioBuilderTemplate = `
  <div class="scenario-builder">
    <!-- HTML here -->
  </div>
`;

// {component}.styles.ts
export const scenarioBuilderStyles = `
  .scenario-builder {
    /* CSS here */
  }
`;
```

#### Opcja B: HTML Templates jako pliki (wymaga bundlera)
```typescript
import template from './scenario-builder.html';
import styles from './scenario-builder.css';
```

**Rekomendacja:** Opcja A (nie wymaga zmian w bundlerze)

---

## 🎯 PRIORYTET 5 - Optymalizacja Menu System

### Problem
- `menu.config.ts` (755 linii) - duży plik konfiguracyjny
- Brak lazy loadingu dla menu
- Duplikacja konfiguracji

### Rozwiązanie
```
components/connect-menu/
├── menu.manager.ts (główny - już istnieje)
├── configs/
│   ├── main-navigation.config.ts
│   ├── connect-id.config.ts
│   ├── connect-data.config.ts
│   ├── connect-config.config.ts
│   ├── connect-manager.config.ts
│   ├── connect-reports.config.ts
│   ├── connect-test.config.ts
│   └── connect-workshop.config.ts
├── menu.registry.ts (tylko rejestracja)
└── menu.interfaces.ts
```

**Benefits:**
- Każdy moduł zarządza swoim menu
- Lazy loading konfiguracji
- Łatwiejsze utrzymanie

---

## 🎯 PRIORYTET 6 - State Management

### Problem
Stan aplikacji rozproszony po różnych miejscach:
- Event listeners
- DOM manipulation
- Brak centralnego zarządzania stanem

### Rozwiązanie
Prosty Observable Pattern:

```typescript
// core/state/state.manager.ts
export class StateManager<T> {
  private state: T;
  private listeners: Set<(state: T) => void> = new Set();
  
  constructor(initialState: T) {
    this.state = initialState;
  }
  
  getState(): T {
    return this.state;
  }
  
  setState(newState: Partial<T>): void {
    this.state = { ...this.state, ...newState };
    this.notify();
  }
  
  subscribe(listener: (state: T) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
  
  private notify(): void {
    this.listeners.forEach(listener => listener(this.state));
  }
}

// Użycie w module
interface AppState {
  currentModule: string;
  currentUser: string | null;
  isLoading: boolean;
}

export const appState = new StateManager<AppState>({
  currentModule: '',
  currentUser: null,
  isLoading: false
});
```

---

## 🎯 PRIORYTET 7 - Testing Infrastructure

### Problem
Brak struktury testów, trudność w testowaniu

### Rozwiązanie
```
frontend/
├── src/
│   └── {każdy moduł}/
│       ├── {moduł}.test.ts
│       └── __mocks__/
└── tests/
    ├── unit/
    ├── integration/
    └── e2e/
```

**Framework:** Vitest (szybki, kompatybilny z TypeScript)

**Przykład:**
```typescript
// scenarios.page.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { ScenariosPage } from './scenarios.page';

describe('ScenariosPage', () => {
  let page: ScenariosPage;
  
  beforeEach(() => {
    page = new ScenariosPage();
  });
  
  it('should render scenario builder', () => {
    const html = page.render();
    expect(html).toContain('scenario-builder');
  });
  
  it('should add new goal', () => {
    // test logic
  });
});
```

---

## 🎯 PRIORYTET 8 - TypeScript Strict Mode

### Problem
Brak strict type checking

### Rozwiązanie
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

---

## 🎯 PRIORYTET 9 - Dokumentacja

### Potrzebna dokumentacja
```
docs/
├── ARCHITECTURE.md (ogólna architektura)
├── MODULES.md (opis każdego modułu)
├── API.md (już istnieje)
├── CONTRIBUTING.md (jak kontrybuować)
├── STYLE_GUIDE.md (zasady kodowania)
└── modules/
    ├── connect-id.md
    ├── connect-data.md
    ├── connect-manager.md
    └── ...
```

---

## 📋 HARMONOGRAM REFAKTORYZACJI

### Tydzień 1: Krytyczna refaktoryzacja
- [ ] Usunięcie plików backup
- [ ] Refaktoryzacja `main.ts` (1,585 → ~200 linii)
- [ ] Stworzenie `core/` struktury

### Tydzień 2: Scenarios & Menu Editor
- [ ] Refaktoryzacja `scenarios.page.ts` (1,008 → ~300 linii)
- [ ] Refaktoryzacja `menu-editor.view.ts` (909 → ~250 linii)

### Tydzień 3: Shared Components
- [ ] Stworzenie `shared/components/`
- [ ] Migracja duplikatów do shared

### Tydzień 4: Services
- [ ] Refaktoryzacja dużych services
- [ ] Podział na mniejsze moduły

### Tydzień 5: Menu System
- [ ] Podział `menu.config.ts`
- [ ] Implementacja lazy loading

### Tydzień 6: State Management
- [ ] Implementacja StateManager
- [ ] Migracja event listeners

### Tydzień 7: Testing
- [ ] Setup Vitest
- [ ] Testy dla core
- [ ] Testy dla shared components

### Tydzień 8: Documentation & Polish
- [ ] Dokumentacja
- [ ] TypeScript strict mode
- [ ] Code review & cleanup

---

## 🎨 PRZYKŁAD REFAKTORYZACJI - main.ts

### Przed (fragment z 1,585 linii)
```typescript
// main.ts - wszystko w jednym pliku
function initializeApp() {
  // 200 linii inicjalizacji
  // 300 linii routingu
  // 400 linii ładowania modułów
  // 500 linii event handlers
  // 200 linii HTML/CSS
}
```

### Po refaktoryzacji
```typescript
// main.ts (~50 linii)
import { AppInitializer } from './core/app.initializer';
import './styles/app-shell.css';

const app = new AppInitializer();
app.start().catch(showErrorUI);

// core/app.initializer.ts (~150 linii)
export class AppInitializer {
  constructor(
    private router = new Router(),
    private moduleLoader = new ModuleLoader(),
    private menuManager = new MenuManager()
  ) {}
  
  async start(): Promise<void> {
    await this.initializeServices();
    this.setupUI();
    this.router.start();
  }
}

// core/router/router.ts (~200 linii)
export class Router {
  // tylko logika routingu
}

// core/module-loader/module-loader.ts (~150 linii)
export class ModuleLoader {
  // tylko logika ładowania modułów
}

// core/ui/app-shell.ts (~100 linii)
export class AppShell {
  // tylko logika UI
}
```

---

## 📊 METRYKI SUKCESU

### Przed refaktoryzacją
- Największy plik: 1,585 linii
- Średnia wielkość modułu: ~500 linii
- Pliki backup: 6
- Duplikaty kodu: wysokie
- Pokrycie testami: 0%

### Cel po refaktoryzacji
- ✅ Żaden plik > 400 linii
- ✅ Średnia wielkość modułu: ~200 linii
- ✅ Pliki backup: 0
- ✅ Duplikaty kodu: minimalne (shared components)
- ✅ Pokrycie testami: >60%
- ✅ TypeScript strict mode: włączony
- ✅ Dokumentacja: kompletna

---

## 🚀 QUICK WINS (można zrobić od razu)

### 1. Usuń pliki backup (5 min)
```bash
find frontend/src -name "*.backup" -o -name "*.bak" | xargs rm
```

### 2. Dodaj .gitignore entries (2 min)
```
*.backup
*.bak
*~
```

### 3. Stwórz TODO.md w każdym module (30 min)
Dokumentuj co wymaga poprawy w każdym module

### 4. Dodaj ESLint rule dla max file length (5 min)
```json
{
  "rules": {
    "max-lines": ["warn", {
      "max": 400,
      "skipBlankLines": true,
      "skipComments": true
    }]
  }
}
```

### 5. Stwórz ARCHITECTURE.md (1h)
Podstawowy dokument architektury

---

## 🔥 NAJWAŻNIEJSZE ZASADY

1. **Single Responsibility Principle** - każda klasa/funkcja robi jedną rzecz
2. **DRY (Don't Repeat Yourself)** - eliminuj duplikaty
3. **Separacja odpowiedzialności** - HTML, CSS, TS w oddzielnych miejscach
4. **Max 400 linii na plik** - jeśli więcej, podziel
5. **Testy dla każdej nowej funkcji** - TDD approach
6. **Dokumentuj zmiany** - każda większa zmiana = update docs

---

## ✅ CHECKLIST PRZED MERGEM KAŻDEJ ZMIANY

- [ ] Plik < 400 linii
- [ ] Brak duplikatów kodu
- [ ] Testy napisane i przechodzą
- [ ] Dokumentacja zaktualizowana
- [ ] TypeScript errors = 0
- [ ] ESLint warnings zminimalizowane
- [ ] Code review wykonany

---

**Utworzono:** 2025-01-14
**Autor:** Cascade AI
**Status:** 🔴 DO IMPLEMENTACJI
