# 📋 Connect Manager - 3-kolumnowe Menu

*Data: 2025-10-14 13:20*

## 🎯 **Cel zmian**

Rozszerzenie menu Connect Manager z 1 kolumny na **3 kolumny** z pełną funkcjonalnością zarządzania scenariuszami:
- **Kolumna 1**: Sekcje (Scenariusze, Czynności, Rodzaj Testu)
- **Kolumna 2**: Akcje (Lista, Nowy, Zapisane)
- **Kolumna 3**: Elementy (dynamiczna lista scenariuszy)

## ✅ **Wykonane zmiany**

### **1. Menu Configuration (menu.config.ts)**

#### **Przed:**
```typescript
// 1 kolumna - tylko sekcje
columns: [
  {
    id: 'manager-sections',
    title: 'Manager',
    items: [
      { id: 'scenarios', label: 'Scenariusze', ... },
      { id: 'activities', label: 'Czynności', ... },
      { id: 'test-types', label: 'Rodzaj Testu', ... }
    ]
  }
]
```

#### **Po:**
```typescript
// 3 kolumny - sekcje + akcje + elementy
columns: [
  {
    id: 'manager-sections-column',
    title: 'Manager',
    width: '120px',
    items: [
      { id: 'scenarios', label: 'Scenariusze', section: 'scenarios', ... },
      { id: 'activities', label: 'Czynności', section: 'activities', ... },
      { id: 'test-types', label: 'Rodzaj Testu', section: 'test-types', ... }
    ]
  },
  {
    id: 'manager-actions-column',
    title: 'Akcje',
    width: '140px',
    items: [
      { id: 'list', label: 'Lista', method: 'list', active: true },
      { id: 'new', label: 'Nowy', method: 'new' },
      { id: 'saved', label: 'Zapisane', method: 'saved' }
    ]
  },
  {
    id: 'manager-items-column',
    title: 'Elementy',
    width: '200px',
    items: [
      { id: 'scenario-1', label: 'Test szczelności C20', ... },
      { id: 'scenario-2', label: 'Test przepływu', ... },
      { id: 'scenario-3', label: 'Kontrola ciśnienia', ... }
    ]
  }
]
```

### **2. View Updates (connect-manager.view.ts)**

#### **Nowe właściwości:**
```typescript
export class ConnectManagerView {
  private currentSection: string = 'scenarios';
  private currentMethod: string = 'list';      // ✅ NOWE
  private currentItemId: string = '';          // ✅ NOWE
  private service: ConnectManagerService;      // ✅ NOWE
```

#### **Obsługa 3 kolumn w onItemClick:**
```typescript
onItemClick: (data) => {
  const { item, column } = data;
  
  // Column 1: Sections (scenarios, activities, test-types)
  if (column.id === 'manager-sections-column' && item.section) {
    this.currentSection = item.section;
    this.currentMethod = 'list'; // Reset to list
    this.currentItemId = '';
  }
  // Column 2: Actions (list, new, saved)
  else if (column.id === 'manager-actions-column' && item.method) {
    this.currentMethod = item.method;
    this.currentItemId = '';
  }
  // Column 3: Items (scenario items)
  else if (column.id === 'manager-items-column') {
    this.currentItemId = item.id;
  }
  
  this.updateTopBarElements();
  this.loadCurrentPage();
}
```

#### **Dynamiczne ładowanie scenariuszy:**
```typescript
private async loadScenariosToMenu(): Promise<void> {
  const scenarios = await this.service.getTestScenarios();
  
  // Update the third column items dynamically
  const itemsColumn = document.querySelector('#manager-items-column');
  if (itemsColumn && scenarios.length > 0) {
    const itemsHTML = scenarios.map(scenario => `
      <button class="section-item" data-menu-item="${scenario.id}">
        <span class="menu-icon">📄</span>
        <span class="menu-label">${scenario.name}</span>
      </button>
    `).join('');
    
    itemsColumn.innerHTML = `
      <h3 class="column-title">Elementy</h3>
      ${itemsHTML}
    `;
  }
}
```

#### **Rozszerzony top bar:**
```typescript
private updateTopBarElements(): void {
  const sectionLabel = this.getSectionDisplayName(this.currentSection);
  const methodLabel = this.getMethodDisplayName(this.currentMethod);
  let title = `ConnectManager - ${sectionLabel} - ${methodLabel}`;
  if (this.currentItemId) {
    title += ` - ${this.currentItemId}`;
  }
  sectionTitle.textContent = title;
}
```

### **3. Route Mapping Update**

```typescript
{
  route: '/connect-manager',
  menuId: 'connect-manager-menu',
  activeItems: ['scenarios', 'list']  // ✅ 2 aktywne items (kolumna 1 + 2)
}
```

## 📊 **Struktura menu - Przed vs Po**

### **PRZED:**
```
┌─────────────────┐
│ Manager         │
├─────────────────┤
│ 🧪 Scenariusze  │
│ 📝 Czynności    │
│ ⏰ Rodzaj Testu │
└─────────────────┘
```

### **PO:**
```
┌──────────────┬──────────────┬────────────────────────┐
│ Manager      │ Akcje        │ Elementy               │
├──────────────┼──────────────┼────────────────────────┤
│ 🧪 Scenariusze│ 📋 Lista     │ 📄 Test szczelności C20│
│ 📝 Czynności │ ➕ Nowy      │ 📄 Test przepływu      │
│ ⏰ Rodzaj Testu│ 💾 Zapisane  │ 📄 Kontrola ciśnienia  │
└──────────────┴──────────────┴────────────────────────┘
```

## 🎨 **Funkcjonalność kolumn**

### **Kolumna 1: Sekcje (Manager)**
```
🧪 Scenariusze     - Budowanie scenariuszy testowych
📝 Czynności       - Zarządzanie czynnościami
⏰ Rodzaj Testu    - Typy testów
```

**Zachowanie:**
- Zmiana sekcji → Reset akcji do "Lista"
- Zmiana sekcji → Wyczyść wybrany element

### **Kolumna 2: Akcje**
```
📋 Lista      - Wyświetl wszystkie elementy
➕ Nowy       - Utwórz nowy element
💾 Zapisane   - Pokaż zapisane elementy
```

**Zachowanie:**
- Zmiana akcji → Wyczyść wybrany element
- "Nowy" → Otwiera builder/formularz
- "Zapisane" → Filtruje elementy

### **Kolumna 3: Elementy (dynamiczna)**
```
📄 Test szczelności C20
📄 Test przepływu
📄 Kontrola ciśnienia
... (więcej scenariuszy)
```

**Zachowanie:**
- Załadowane z `ConnectManagerService.getTestScenarios()`
- Aktualizowane po zapisaniu nowego scenariusza
- Kliknięcie → Otwiera szczegóły/edycję

## 🔄 **Interakcje użytkownika**

### **Scenariusz 1: Przeglądanie listy**
```
1. Kliknij: "Scenariusze" (kolumna 1)
   → Top bar: "ConnectManager - Scenariusze - Lista"
   
2. Kolumna 3 pokazuje: Lista wszystkich scenariuszy
   
3. Kliknij: "Test szczelności C20" (kolumna 3)
   → Top bar: "ConnectManager - Scenariusze - Lista - scenario-1"
   → Content: Wyświetla szczegóły scenariusza
```

### **Scenariusz 2: Tworzenie nowego**
```
1. Kliknij: "Scenariusze" (kolumna 1)
2. Kliknij: "Nowy" (kolumna 2)
   → Top bar: "ConnectManager - Scenariusze - Nowy"
   → Content: Otwiera Scenario Builder
   
3. Zbuduj scenariusz...
4. Kliknij: "💾 Zapisz scenariusz"
   → Scenariusz dodany do kolumny 3
   → Auto-refresh listy scenariuszy
```

### **Scenariusz 3: Filtrowanie zapisanych**
```
1. Kliknij: "Scenariusze" (kolumna 1)
2. Kliknij: "Zapisane" (kolumna 2)
   → Top bar: "ConnectManager - Scenariusze - Zapisane"
   → Kolumna 3: Tylko zapisane scenariusze
```

## 📝 **Mapowanie starego Sidebar do nowego menu**

### **Stare przyciski w Sidebar:**
```html
<div class="sidebar-actions">
  <button class="btn-save-scenario">💾 Zapisz scenariusz</button>
  <button class="btn-load-scenario">📂 Wczytaj scenariusz</button>
  <button class="btn-export">📤 Eksportuj</button>
</div>
```

### **Nowe kolumny menu:**
```
Kolumna 2 (Akcje):
├─ "Lista"     → Odpowiednik przycisk "📂 Wczytaj" (pokazuje listę)
├─ "Nowy"      → Tworzenie nowego scenariusza
└─ "Zapisane"  → Filtr zapisanych scenariuszy

Kolumna 3 (Elementy):
└─ Lista scenariuszy → Kliknięcie ładuje scenariusz do edycji

Przyciski w Builder:
├─ "💾 Zapisz" → Wywołuje this.saveScenario() + odświeża kolumnę 3
└─ "📤 Eksportuj" → Pozostaje w builderze
```

## 🎯 **Integracja z Scenario Builder**

### **Zapisywanie scenariusza:**
```typescript
// W scenarios.page.ts
static saveScenario(): void {
  const scenarioData = this.collectScenarioData();
  
  // Zapisz do serwisu
  service.saveTestScenario(scenarioData);
  
  // Odśwież menu (kolumna 3)
  const event = new CustomEvent('scenario-saved', {
    detail: { scenario: scenarioData }
  });
  window.dispatchEvent(event);
}
```

### **Nasłuchiwanie w view:**
```typescript
// W connect-manager.view.ts
window.addEventListener('scenario-saved', () => {
  this.loadScenariosToMenu(); // Odśwież kolumnę 3
});
```

## 🚀 **Jak przetestować**

### **1. Otwórz Connect Manager:**
```
URL: http://localhost:3000/#/connect-manager
```

### **2. Sprawdź 3 kolumny menu:**
```
✅ Kolumna 1: Manager (3 items)
✅ Kolumna 2: Akcje (3 items)
✅ Kolumna 3: Elementy (lista scenariuszy)
```

### **3. Test nawigacji:**
```
A) Kliknij "Scenariusze" → Top bar: "...Scenariusze - Lista"
B) Kliknij "Nowy" → Top bar: "...Scenariusze - Nowy"
C) Kliknij "scenario-1" → Top bar: "...Scenariusze - Lista - scenario-1"
```

### **4. Test scenariusza:**
```
1. Kliknij "Nowy"
2. Zbuduj scenariusz w builderze
3. Kliknij "💾 Zapisz scenariusz"
4. Sprawdź czy pojawił się w kolumnie 3
```

## 📊 **Korzyści refaktoryzacji**

### **✅ Lepsza organizacja:**
- Wyraźny podział: Sekcje → Akcje → Elementy
- Intuicyjna nawigacja hierarchiczna
- Consistent pattern z innymi modułami (workshop, data, reports)

### **✅ Więcej funkcjonalności:**
- Filtrowanie (Lista vs Zapisane)
- Szybki dostęp do wszystkich scenariuszy
- Dynamiczne aktualizacje listy

### **✅ Lepszy UX:**
- Wszystko widoczne w menu
- Nie trzeba szukać w builderze
- Breadcrumb w top bar (Sekcja - Akcja - Element)

## 🔧 **Pliki zmodyfikowane**

```
✅ frontend/src/components/connect-menu/menu.config.ts
   └─ Dodano 2 kolumny do connectManagerMenuConfig
   
✅ frontend/src/modules/connect-manager/connect-manager.view.ts
   └─ Dodano obsługę 3 kolumn
   └─ Dodano currentMethod i currentItemId
   └─ Dodano loadScenariosToMenu()
   
✅ frontend/src/components/connect-menu/menu.config.ts
   └─ Zaktualizowano route mapping (2 active items)
```

## ✅ **Status: GOTOWE DO TESTOWANIA**

**URL testowy:** http://localhost:3000/#/connect-manager

**Funkcjonalności:**
- ✅ 3-kolumnowe menu
- ✅ Dynamiczna lista scenariuszy
- ✅ Nawigacja między sekcjami/akcjami
- ✅ Top bar breadcrumb
- ✅ Integracja z service

**Kompilacja:** ✅ Clean (0 errors)

---

## 🎉 **Menu Connect Manager gotowe z 3 kolumnami!**

**Struktura:** Sekcje → Akcje → Elementy
**Szerokość:** 120px + 140px + 200px = 460px total
**Items:** 3 + 3 + dynamiczne (N scenariuszy)
