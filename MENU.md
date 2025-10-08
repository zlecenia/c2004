# 📋 ConnectDisplay - Dokumentacja Systemu Menu

## 🎯 Architektura Menu dla Ekranu 1200×400px

### Layout Główny

```
┌─────────────────────────────────────────────────────────────────────────┐
│ Top Bar (35px) - 🚀 ConnectDisplay | 🔍 Submenu | Status                │
├──────────┬──────────┬──────────┬─────────────────────────┬──────────────┤
│ Główne   │ Kolumna 1│ Kolumna 2│  Główna zawartość       │  Parametry   │
│ menu     │          │          │                         │              │
│ (120px)  │ (100px)  │ (100px)  │  (~600px)               │  (200px)     │
├──────────┼──────────┼──────────┼─────────────────────────┼──────────────┤
│          │          │          │                         │              │
│ Moduły   │ Poziom 1 │ Poziom 2 │   Treść modułu          │  Parametry   │
│          │          │          │                         │  real-time   │
│          │          │          │                         │              │
└──────────┴──────────┴──────────┴─────────────────────────┴──────────────┘
```

## 📐 Wymiary i Struktura

### Top Bar (35px wysokości)
- **Lewa strona**: Nazwa systemu "🚀 ConnectDisplay"
- **Środek**: Dynamiczny submenu (zmienia się zależnie od aktywnego modułu)
  - ConnectID: "🔍 Universal Identification"
  - ConnectFilter: "🔎 Advanced Search & Filtering"
  - ConnectWorkshop: "🔧 Workshop Client"
  - ConnectTest: "🧪 Test Module"
- **Prawa strona**: Status (liczba modułów, status, czas)
- **Tło**: Gradient #667eea → #764ba2

### Sidebar Główny (120px szerokości)
- **Nagłówek**: "GŁÓWNE MENU" (uppercase, 9px font)
- **Przyciski modułów**: 
  - Ikona (16px emoji)
  - Nazwa (10px font)
  - Pionowy układ
  - Dark theme (#2a2a2a tło)

### Kolumny Menu (100px każda)
- **Format**: Elastyczny system kolumn
- **Nagłówek kolumny**: Uppercase, 9px, centered
- **Przyciski opcji**: Ikona + label, pionowo
- **Możliwość dodawania**: Kolejne kolumny po prawej

### Główna Zawartość (~680px)
- **Nagłówek**: Gradient, 14px font
- **Treść**: Scrollable, white background
- **Wysokość**: 365px (400px - 35px top bar)

### Panel Parametrów (200px)
- **Sekcje**: Parametry + Ostatni wynik
- **Tło**: Dark (#2a2a2a)
- **Parametry**: Real-time display

## 🏗️ Schemat Modułów

### 1. ConnectID - Identyfikacja Uniwersalna

**Struktura kolumn:**
```
Główne menu → Identyfikacja → Interfejs → [Content] → [Params]
   120px         100px          100px       ~680px      200px
```

**Kolumna 1 - Identyfikacja:**
- 👤 Użytkownika
- 📱 Urządzenia ✓
- 🧪 Testu

**Kolumna 2 - Interfejs:**
- 📡 RFID ✓
- 📷 QR
- 📊 Barcode
- ⌨️ Keyboard

**Content:**
- Obszar skanowania/wprowadzania
- Virtual keyboard (dla Manual)
- Demo shortcuts (Ctrl+R/Q/B/M)

**Parametry:**
- Ciśnienie: -- mbar
- Status: Oczekuje
- Typ: Urządzenie
- Metoda: RFID
- Ostatni wynik

---

### 2. ConnectFilter - Filtrowanie i Wyszukiwanie

**Struktura kolumn:**
```
Główne menu → Akcje → [Content] → [Params]
   120px       100px     ~880px      200px
```

**Kolumna 1 - Akcje:**
- 🔍 Szukaj ✓
- 🗑️ Wyczyść
- 📊 Export
- 💾 Zapisz Filtr
- 📂 Wczytaj

**Content:**
- Search input z przyciskiem
- Filtry kompaktowe (Typ, Status)
- Lista wyników z kartami
- Szczegóły wybranego elementu

**Parametry:**
- Znaleziono: X elementów
- Wybrany typ: --
- Status filtra: Aktywny
- Ostatnie wyszukiwanie

---

### 3. ConnectWorkshop - Warsztat i Testy

**Struktura kolumn:**
```
Główne menu → Akcje → Sekcje → [Content] → [Params]
   120px        100px    100px     ~680px      200px
```

**Kolumna 1 - Akcje:**
- 🔄 Sync ✓
- ➕ Zgłoszenie
- 🚚 Transport
- 📦 Dyspozycja

**Kolumna 2 - Sekcje:**
- 📋 Requests ✓
- 🚚 Transport
- 📦 Dispositions
- ⚙️ Service

**Content:**
- Lista requests z kartami
- Transport cards
- Disposition cards
- Service configuration

**Parametry:**
- Status Sync (połączenie, ostatni sync, oczekujące)
- Statystyki (Requests: 12, Transport: 3, Dyspozycje: 8)
- Szybkie akcje (Force Sync button)

---

### 4. ConnectTest - Moduł Testowy

**Struktura kolumn:**
```
Główne menu → Sekcje → Interfejs* → [Content] → [Params]
   120px         100px     100px        ~600px      200px
   
*Kolumna "Interfejs" pojawia się tylko dla sekcji "Urządzenia"
```

**Kolumna 1 - Sekcje:**
- 📱 Urządzenia ✓
- 🧪 Testowanie
- 📋 Raporty Urządzeń

**Kolumna 2 - Interfejs (tylko dla Urządzenia):**
- 📡 RFID
- 📷 QR
- 📊 Barcode
- ⌨️ Keyboard
- 📋 Z listy ✓ (domyślna)

**Content (zależnie od sekcji):**
- **Urządzenia**: 5 różnych widoków (RFID/QR/Barcode/Manual/List), domyślnie "Z listy"
- **Testowanie**: Progress bar + kroki testu
- **Raporty**: Historia raportów z statusami

**Parametry:**
- Aktywna sekcja: --
- Status: Oczekuje
- Ostatni test: --

---

## 🎨 Standardy Stylowania

### Kolory

**Dark Theme (Menu):**
- Tło główne: `#2a2a2a`
- Tło przycisku: `#3a3a3a`
- Hover: `#4a4a4a`
- Active: Gradient `#667eea → #764ba2`
- Tekst: `#ccc` (normal), `#fff` (active)
- Nagłówki: `#999`

**Light Theme (Content):**
- Tło: `#f5f5f5`
- Karty: `#ffffff`
- Ramki: `#e0e0e0`

### Typografia

**Nagłówki kolumn:**
- Font: 9px
- Weight: 600
- Transform: uppercase
- Color: #FFF (białe, zaktualizowane)

**Przyciski menu:**
- Ikona: 16-18px emoji
- Label: 10-11px
- Weight: 500

**Content headers:**
- Font: 14px
- Weight: 600
- Color: white (na gradiencie)

### Przyciski

**Format standardowy:**
```html
<button class="menu-item [active]" data-xxx="value">
  <span class="menu-icon">🎯</span>
  <span class="menu-label">Tekst</span>
</button>
```

**Stany:**
- Normal: #3a3a3a background
- Hover: #4a4a4a background
- Active: Gradient + cień
- Disabled: opacity 0.5

### Scrollbary

**Szerokość**: 4-6px
**Dark areas**: #555 thumb, #1a1a1a track
**Light areas**: #ccc thumb, #f0f0f0 track

---

## 🔧 Implementacja Nowego Modułu

### Krok 1: Struktura HTML

```html
<div class="compact-layout">
  <!-- Kolumna 1 -->
  <div class="menu-column">
    <h3 class="column-title">Nazwa Kolumny 1</h3>
    <button class="menu-item active" data-option="value1">
      <span class="menu-icon">🎯</span>
      <span class="menu-label">Opcja 1</span>
    </button>
    <!-- więcej opcji -->
  </div>

  <!-- Kolumna 2 -->
  <div class="menu-column">
    <h3 class="column-title">Nazwa Kolumny 2</h3>
    <!-- opcje -->
  </div>

  <!-- Główna zawartość -->
  <div class="main-content">
    <div class="content-header">
      <h2 id="content-title">Tytuł</h2>
    </div>
    <div class="content-body">
      <!-- Treść -->
    </div>
  </div>

  <!-- Panel parametrów -->
  <div class="right-panel">
    <div class="params-section">
      <h3 class="params-title">Parametry</h3>
      <!-- Parametry -->
    </div>
  </div>
</div>
```

### Krok 2: Style CSS

```css
.menu-column {
  width: 100px;
  background: #2a2a2a;
  padding: 6px 4px;
  overflow-y: auto;
  flex-shrink: 0;
  border-right: 1px solid #1a1a1a;
}

.column-title {
  color: #FFF;
  font-size: 9px;
  font-weight: 600;
  text-transform: uppercase;
  margin: 0 0 6px 0;
  padding: 4px;
  text-align: center;
  background: #1a1a1a;
  border-radius: 3px;
}

.menu-item {
  width: 100%;
  background: #3a3a3a;
  border: none;
  padding: 10px 6px;
  margin-bottom: 4px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  transition: all 0.2s;
  color: #ccc;
}

.menu-item:hover {
  background: #4a4a4a;
  color: white;
}

.menu-item.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}
```

### Krok 3: Aktualizacja Submenu

Każdy moduł powinien aktualizować submenu w top-bar:

```typescript
render(): HTMLElement {
  const container = document.createElement('div');
  container.className = 'module-name-compact';
  
  // Update top-bar submenu
  const submenu = document.getElementById('top-bar-submenu');
  if (submenu) submenu.textContent = '🔍 Module Title';
  
  container.innerHTML = `...`;
  // ...
}
```

### Krok 4: Event Listeners

```typescript
private setupEventListeners(container: HTMLElement): void {
  // Kolumna 1
  const column1Buttons = container.querySelectorAll('[data-option]');
  column1Buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLElement;
      const value = target.getAttribute('data-option');
      this.handleColumn1Change(value, container);
    });
  });

  // Kolumna 2
  const column2Buttons = container.querySelectorAll('[data-method]');
  column2Buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLElement;
      const value = target.getAttribute('data-method');
      this.handleColumn2Change(value, container);
    });
  });
}

private handleColumn1Change(value: string | null, container: HTMLElement): void {
  if (!value) return;
  
  // Update active state
  container.querySelectorAll('[data-option]').forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('data-option') === value) {
      item.classList.add('active');
    }
  });

  // Update content
  this.updateContent(value);
}
```

---

## 📱 Responsive & Touch

### Touch Optimization
- **Min button size**: 40×40px dla touch targets
- **Gap między przyciskami**: 4px minimum
- **Active feedback**: Scale 0.95 + color change

### Scrolling
- **Smooth scroll**: CSS scroll-behavior
- **Custom scrollbars**: Thin (4-6px) dla lepszej widoczności
- **Touch-friendly**: Większe obszary touch

---

## 🚀 Best Practices

### 1. Spójność
- Wszystkie moduły używają tego samego układu kolumn
- Jednolite ikony i kolory
- Standardowe wymiary (100px kolumny)

### 2. Hierarchia
- Sidebar → Kolumna 1 → Kolumna 2 → Content
- Od ogólnego do szczegółowego

### 3. Feedback
- Natychmiastowa reakcja na kliknięcie
- Animacje 0.2s dla smooth UX
- Notyfikacje dla ważnych akcji

### 4. Dostępność
- Keyboard shortcuts (Ctrl+...)
- Focus states
- Readable font sizes (min 9px)

### 5. Performance
- Lazy loading dla ciężkich komponentów
- Virtual scrolling dla długich list
- Debounce dla search inputs

---

## 📊 Przykład Kompletny: ConnectID

Pełny przykład znajduje się w:
`/frontend/src/modules/connect-id/connect-id.view.ts`

**Funkcjonalność:**
- 2 kolumny menu (Identyfikacja + Interfejs)
- 4 metody identyfikacji
- Virtual keyboard
- Real-time parametry
- Keyboard shortcuts
- Notyfikacje

**Kod referencyjny dla innych modułów!**

---

## 🔄 Aktualizacje

**v1.5.2** - 2025-10-08
- ✅ ConnectTest: Usunięto sekcję "Debug" z menu
- ✅ Domyślna metoda zmieniona na "📋 Z listy" (zamiast RFID)
- ✅ vite.config.ts: Dodano 'nvidia' do allowedHosts
- ✅ Uproszczono menu do 3 sekcji (Urządzenia, Testowanie, Raporty)

**v1.5.1** - 2025-10-08
- ✅ ConnectTest: Usunięto sekcję "Wybór Urządzenia" (duplikat funkcjonalności)
- ✅ Zmieniono nazwę sekcji "Identyfikacja" → "Urządzenia"
- ✅ Uproszczono menu do 4 sekcji (Urządzenia, Testowanie, Raporty, Debug)
- ✅ Ikona sekcji Urządzenia zmieniona na 📱

**v1.5.0** - 2025-10-08
- ✅ ConnectTest: Dodano dynamiczną kolumnę "Interfejs" dla Identyfikacji
- ✅ 5 metod identyfikacji: RFID, QR, Barcode, Keyboard, Z listy
- ✅ Każda metoda ma dedykowany widok z różną funkcjonalnością
- ✅ Kolumna "Interfejs" pokazuje się tylko dla sekcji Identyfikacja
- ✅ Pełna treść dla wszystkich 5 sekcji w ConnectTest

**v1.4.0** - 2025-10-08
- ✅ Naprawiono krytyczne błędy event listenerów
- ✅ main.ts: zmieniono e.target → e.currentTarget (navigation)
- ✅ connect-id.view.ts: zmieniono e.target → e.currentTarget (virtual keyboard)
- ✅ Utworzono EVENT_LISTENER_AUDIT.md - pełny audit
- ✅ Wszystkie 26 przycisków zweryfikowane i działają poprawnie

**v1.3.0** - 2025-10-08
- ✅ Dostosowano rozdzielczość do 1200×400px (z 1280×400px)
- ✅ Przeszły wszystkie testy funkcjonalności (26 przycisków)
- ✅ Utworzono raport testowy MENU_TEST_REPORT.md
- ✅ Zweryfikowano wszystkie event listenery i handlery

**v1.2.0** - 2025-10-08
- ✅ Dodano dynamiczne submenu w top-bar
- ✅ Zaktualizowano ConnectFilter z kolumną akcji
- ✅ Zmieniono kolor nagłówków kolumn na biały (#FFF)
- ✅ Wszystkie moduły zaktualizowane do nowego layoutu
- ✅ Kompletna dokumentacja dla 4 modułów

**v1.1.0** - 2025-10-08
- Dodano ConnectWorkshop z 2 kolumnami
- Dodano ConnectTest z 1 kolumną
- Sidebar główny z nagłówkiem "Główne menu"

**v1.0.0** - 2025-10-08
- Wersja początkowa systemu menu
- ConnectID jako przykład referencyjny
- Dokumentacja struktury i standardów

---

## 📊 Status Implementacji

| Moduł | Kolumny | Submenu | Status |
|-------|---------|---------|--------|
| ConnectID | 2 (Identyfikacja + Interfejs) | ✅ | ✅ Kompletny |
| ConnectFilter | 1 (Akcje) | ✅ | ✅ Kompletny |
| ConnectWorkshop | 2 (Akcje + Sekcje) | ✅ | ✅ Kompletny |
| ConnectTest | 1-2 (Sekcje + Interfejs*) | ✅ | ✅ Kompletny |

*Kolumna "Interfejs" pokazuje się dynamicznie tylko dla sekcji Urządzenia

**Wszystkie moduły gotowe do produkcji! 🎉**

---

**Maintained by**: Fleet Management Team  
**Last updated**: 2025-10-08 18:56  
**Screen Resolution**: 1200×400px  
**Test Report**: MENU_TEST_REPORT.md  
**Event Listener Audit**: EVENT_LISTENER_AUDIT.md
