# 🔧 PLAN REFAKTORYZACJI - Sistema c2004

## 🎯 **Analiza obecnego stanu**

### **✅ Mocne strony:**
- Modularna architektura z osobnymi view/service/module
- Komponent VirtualKeyboard jako reużywalny element
- Spójny system notifikacji w right-panel
- Responsywny design dostosowany do 1280×400px
- Dynamiczne przełączanie danych między obiektami

### **⚠️ Problemy do rozwiązania:**

1. **Duplikacja kodu CSS**
   - Style notyfikacji powtarzane w każdym module
   - Podobne style dla .right-panel w różnych plikach
   - Animacje keyframes powielane

2. **Duplikacja logiki**
   - Metoda showNotification kopiowana w każdym module
   - Podobne handlery event listeners
   - Powtarzane wzorce aktualizacji danych

3. **Brak centralnej komunikacji**
   - Każdy moduł ma własny system notyfikacji
   - Brak globalnego event bus
   - Komunikacja między modułami przez window.dispatchEvent

4. **Inconsistent data management**
   - Dane hardcoded w każdym module
   - Brak centralnego store/service dla danych
   - Różne formaty danych w podobnych funkcjonalnościach

## 🚀 **Plan Refaktoryzacji - Etap 1 (Krytyczny)**

### **1.1 Globalny System Notyfikacji**
**Priorytet: WYSOKI**

```typescript
// Utworzenie: /frontend/src/services/notification.service.ts
export class NotificationService {
  private static instance: NotificationService;
  private container: HTMLElement | null = null;

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  show(message: string, type: NotificationType): void;
  initialize(containerId: string): void;
  private createNotification(message: string, type: NotificationType): void;
  private removeOldest(): void;
}
```

**Refaktor:**
- [ ] Utworzyć centralny NotificationService
- [ ] Zastąpić wszystkie lokalne showNotification() wywołaniami serwisu
- [ ] Przenieść CSS notyfikacji do globalnych styli
- [ ] Dodać konfigurację (max notifications, timeout, animacje)

### **1.2 Centralna Stylizacja**
**Priorytet: WYSOKI**

```scss
// Utworzenie: /frontend/src/styles/
├── globals.scss          # Zmienne globalne, kolory, fonts
├── components.scss       # Style komponentów (notifications, buttons, etc.)
├── layout.scss          # Layout (right-panel, top-bar, etc.)
├── animations.scss      # Wszystkie animacje keyframes
└── modules/            # Style specyficzne dla modułów
    ├── connect-id.scss
    ├── connect-data.scss
    └── connect-workshop.scss
```

**Refaktor:**
- [ ] Wyodrębnić wspólne CSS do globalnych plików
- [ ] Utworzyć zmienne SCSS dla kolorów i rozmiarów
- [ ] Ujednolicić naming convention dla klas CSS
- [ ] Optymalizować animacje (reduce motion support)

### **1.3 Event Bus System**
**Priorytet: ŚREDNI**

```typescript
// Utworzenie: /frontend/src/services/event-bus.service.ts
export class EventBus {
  private static instance: EventBus;
  private listeners: Map<string, Function[]> = new Map();

  static getInstance(): EventBus;
  on(event: string, callback: Function): void;
  emit(event: string, data?: any): void;
  off(event: string, callback: Function): void;
}

// Events:
// - 'notification:show' - Global notifications
// - 'module:changed' - Module switching
// - 'data:updated' - Data changes
// - 'search:performed' - Search actions
```

**Refaktor:**
- [ ] Zastąpić window.dispatchEvent systemem EventBus
- [ ] Ujednolicić komunikację między modułami
- [ ] Dodać typowanie dla eventów (TypeScript interfaces)

## 🔄 **Plan Refaktoryzacji - Etap 2 (Optymalizacja)**

### **2.1 Data Management Layer**
**Priorytet: ŚREDNI**

```typescript
// Utworzenie: /frontend/src/services/data.service.ts
export class DataService {
  private static instance: DataService;
  
  // Unified data for all modules
  getUserData(filters?: FilterOptions): Promise<UserData[]>;
  getDeviceData(filters?: FilterOptions): Promise<DeviceData[]>;
  getWorkshopData(section: string, filters?: FilterOptions): Promise<WorkshopData[]>;
  
  // Caching layer
  private cache: Map<string, CacheEntry> = new Map();
  private invalidateCache(key: string): void;
}
```

**Refaktor:**
- [ ] Centralizować dane z wszystkich modułów
- [ ] Dodać cache layer dla performance
- [ ] Ujednolicić formaty odpowiedzi API
- [ ] Dodać data validation i error handling

### **2.2 Component System**
**Priorytet: ŚREDNI**

```typescript
// Rozszerzenie: /frontend/src/components/
├── virtual-keyboard.component.ts  ✅ (już istnieje)
├── search-table.component.ts      # Reużywalne tabele wyszukiwania
├── filter-panel.component.ts      # Komponenty filtrowania
├── form-builder.component.ts      # Dynamiczny builder formularzy  
└── status-indicator.component.ts  # Wskaźniki statusu
```

**Refaktor:**
- [ ] Wyodrębnić powtarzalne UI patterns do komponentów
- [ ] Ujednolicić API komponentów (props, events, methods)
- [ ] Dodać dokumentację komponentów
- [ ] Utworzyć component registry/factory

### **2.3 Performance Optimizations**
**Priorytet: NISKI**

**Lazy Loading:**
- [ ] Ładowanie modułów na żądanie
- [ ] Code splitting dla różnych sekcji
- [ ] Optymalizacja bundli webpack/vite

**Memory Management:**
- [ ] Cleanup listeners przy zmianie modułów
- [ ] Garbage collection optimization
- [ ] Image lazy loading w tabelach

**Caching Strategy:**
- [ ] Service Worker dla offline capability
- [ ] LocalStorage/SessionStorage dla user preferences
- [ ] API response caching

## 📋 **Plan Refaktoryzacji - Etap 3 (Rozszerzenia)**

### **3.1 TypeScript Improvements**
**Priorytet: ŚREDNI**

- [ ] Dodać interfaces dla wszystkich data types
- [ ] Strict type checking (noImplicitAny, strictNullChecks)
- [ ] Generic types dla reużywalnych komponentów
- [ ] Error types i proper error handling

### **3.2 Testing Infrastructure**
**Priorytet: NISKI**

```
tests/
├── unit/              # Jest unit tests
├── integration/       # Component integration tests  
├── e2e/              # Playwright/Cypress end-to-end
└── fixtures/         # Test data i mocks
```

### **3.3 Developer Experience**
**Priorytet: NISKI**

- [ ] ESLint + Prettier configuration
- [ ] Pre-commit hooks (Husky)
- [ ] Component documentation (Storybook?)
- [ ] Development debugging tools

## ⚡ **Priorytetyzacja Refaktoryzacji**

### **🔥 WEEK 1 - Critical (Must have):**
1. GlobalNotificationService → Usunąć duplikację notyfikacji
2. CSS Centralization → Wyodrębnić wspólne style
3. EventBus → Ujednolicić komunikację

### **📈 WEEK 2 - Important (Should have):**
1. DataService → Centralizacja danych
2. Component System → Reużywalne komponenty
3. TypeScript interfaces → Lepsze typowanie

### **💡 WEEK 3+ - Nice to have (Could have):**
1. Performance optimizations
2. Testing infrastructure  
3. Developer tooling

## 🎯 **Kryteria sukcesu:**

- **DRY principle**: Eliminacja duplikacji kodu >80%
- **Performance**: Reduction czasu ładowania >20%
- **Maintainability**: Łatwiejsze dodawanie nowych features
- **Consistency**: Ujednolicone API i patterns
- **Developer Experience**: Szybsze development i debugging

## 📊 **Metryki do śledzenia:**

- Lines of code reduction
- Bundle size optimization  
- Performance metrics (FCP, LCP, FID)
- Developer velocity (features/week)
- Bug reduction rate
