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
  - ConnectData: "📊 Data Management & Analytics"
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

### 2. ConnectData - Zarządzanie Danymi

**Struktura kolumn:**
```
Główne menu → Obiekty → Akcje → [Content] → [Params]
   120px       100px     100px      ~600px      200px
```

**Kolumna 1 - Obiekty:**
- 👥 Użytkownicy ✓
- 🧪 Scenariusze Testowe
- 📱 Urządzenia  
- 👥 Grupy
- 🏭 Magazyny
- 🏢 Klienci

**Kolumna 2 - Akcje:**
- 🔍 Szukaj ✓
- 🗑️ Wyczyść
- ➕ Dodaj
- ✏️ Edytuj
- ❌ Usuń
- 📊 Export

**Content (dynamiczny):**
- Tytuł z ikoną obiektu (np. "👥 Użytkownicy - Zarządzanie")
- Pole wyszukiwania (placeholder dostosowany do obiektu)
- Filtry specyficzne dla obiektu (np. role dla użytkowników)
- Lista wyników z akcjami w kartach (Edytuj, Profil)

**Parametry:**
- Znaleziono: X elementów
- Obiekt: Aktualnie wybrany
- Akcja: Aktualna operacja
- Szybkie Akcje (3 przyciski kontekstowe)

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
Główne menu → Sekcje → Interfejs*/Typ Sc.* → Protokoły* → [Content] → [Params/Sensory]
   120px         100px      100px           100px       ~500px       200px
   
*Kolumny zmieniają się dynamicznie:
- "Urządzenia": tylko Interfejs (1 dodatkowa kolumna)
- "Testowanie": Typ Scenariusza + Protokoły (2 dodatkowe kolumny)  
- "Raporty": brak dodatkowych kolumn
```

**Kolumna 1 - Sekcje:**
- 📱 Urządzenia ✓
- 🧪 Testowanie
- 📋 Raporty Urządzeń

**Kolumna 2A - Interfejs (tylko dla Urządzenia):**
- 📡 RFID
- 📷 QR
- 📊 Barcode
- ⌨️ Keyboard
- 📋 Z listy ✓ (domyślna)

**Kolumna 2B - Typ Scenariusza (tylko dla Testowanie):**
- 🔄 Po użyciu ✓ (domyślny)
- 📅 Po 6 miesiącach
- 📆 Roczny
- 🚨 Awaryjny
- 🛡️ Prewencyjny

**Kolumna 3 - Protokoły (tylko dla Testowanie):**
- 🔧 Serwis ✓ (urządzenie, komponent)
- 🧪 Scenariusz C20 (urządzenie, scenariusz)
- 📝 Uwagi (urządzenie)
- 📋 Stwórz Raport (użytkownik)

**Content (zależnie od sekcji):**
- **Urządzenia**: 5 różnych widoków (RFID/QR/Barcode/Manual/List), domyślnie "Z listy"
- **Testowanie**: Formularz protokołu + progress bar, domyślnie "Po użyciu + Serwis"
- **Raporty**: Historia raportów z statusami

**Right Panel (zależnie od sekcji):**
- **Urządzenia**: Parametry identyfikacji
- **Testowanie**: **Sensory Ciśnienia** (odczyt w czasie rzeczywistym)
  - 🔴 Ciśnienie Niskie: -- mbar
  - 🟡 Ciśnienie Średnie: -- mbar  
  - 🟢 Ciśnienie Wysokie: -- mbar
- **Raporty**: Statystyki raportów

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
  padding: 5px 6px;
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

**v1.9.0** - 2025-10-08
- ✅ ConnectWorkshop: Usunięto content-header, pełna kontrola przez top-bar-section-title
- 🔥 **REWOLUCJA GŁÓWNEGO MENU**: Usunięto ConnectID z głównego menu
- ✅ Przeniesiono opcje identyfikacji bezpośrednio do głównego menu:
  - 👤 **Użytkownik** (identyfikacja użytkowników)
  - 📱 **Urządzenie** (identyfikacja urządzeń) 
  - 🧪 **Typ Testu** (identyfikacja testów)
- ✅ Bezpośredni dostęp bez dodatkowego poziomu nawigacji
- ✅ Główne menu ma teraz 6 opcji zamiast 4
- ✅ ConnectID: Usunięto kolumnę "Identyfikacja" (redundantną z głównym menu)
- ✅ ConnectID: Szerokość kolumny Interfejs zwiększona do 120px

**v1.8.0** - 2025-10-08
- ✅ ConnectTest: Dodano kolumnę "Typ Scenariusza" przed kolumną "Protokoły"
- ✅ 5 typów scenariuszy: Po użyciu, Po 6 miesiącach, Roczny, Awaryjny, Prewencyjny
- ✅ Nowa struktura 3-kolumnowa dla sekcji "Testowanie"
- ✅ Top-bar title format: "ConnectTest - Testowanie - [Typ] - [Protokół]"
- ✅ Usunięto wszystkie nagłówki h3 z content-body we wszystkich modułach
- ✅ ConnectID: Usunięto content-header, pełna kontrola przez top-bar-section-title
- ✅ Kompletna kontrola tytułów przez top-bar-section-title we wszystkich modułach

**v1.7.0** - 2025-10-08
- ✅ ConnectTest: Dodano kolumnę "Protokoły" dla sekcji "Testowanie"
- ✅ 4 nowe protokoły: Serwis, Scenariusz C20, Uwagi, Stwórz Raport
- ✅ Sensory ciśnienia w czasie rzeczywistym (niskie, średnie, wysokie)
- ✅ Usunięto content-header z wszystkich sekcji (tytuły tylko w top-bar)
- ✅ Dynamiczne przełączanie kolumn i right panel
- ✅ Zapamiętywanie ostatnio wybranej opcji z trzeciej kolumny

**v1.6.0** - 2025-10-08
- ✅ ConnectFilter → ConnectData: Kompletna transformacja modułu
- ✅ Dodano kolumnę "Obiekty" (Użytkownicy, Scenariusze, Urządzenia, Grupy, Magazyny, Klienci)
- ✅ Rozszerzono kolumnę "Akcje" (Szukaj, Wyczyść, Dodaj, Edytuj, Usuń, Export)
- ✅ Dynamiczny content i tytuły w top-bar
- ✅ Przeniesienie content-header → top-bar-section-title dla wszystkich modułów
- ✅ Nowa struktura 2-kolumnowa z pełną funkcjonalnością CRUD

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

### 🏠 **Główne Menu (6 opcji bezpośrednio):**
| Opcja | Ikona | Typ | Status |
|-------|-------|-----|--------|
| **Użytkownik** | 👤 | ConnectID/user | ✅ Kompletny |
| **Urządzenie** | 📱 | ConnectID/device | ✅ Kompletny |  
| **Typ Testu** | 🧪 | ConnectID/test | ✅ Kompletny |
| **ConnectData** | 📊 | Connect-Filter | ✅ Kompletny |
| **Workshop** | 🔧 | Connect-Workshop | ✅ Kompletny |
| **ConnectTest** | 🧪 | Connect-Test | ✅ Kompletny |

### 🏗️ **Moduły z kolumnami:**
| Moduł | Kolumny | Submenu | Status |
|-------|---------|---------|--------|
| ConnectID | 1 (tylko Interfejs) | ✅ | ✅ Kompletny |
| ConnectData | 2 (Obiekty + Akcje) | ✅ | ✅ Kompletny |
| ConnectWorkshop | 2 (Akcje + Sekcje) | ✅ | ✅ Kompletny |
| ConnectTest | 1-3 (Sekcje + Interfejs*/Typ Sc.* + Protokoły*) | ✅ | ✅ Kompletny |

*Kolumny zmieniają się dynamicznie: "Interfejs" dla Urządzenia, "Typ Sc." + "Protokoły" dla Testowanie

**Wszystkie moduły gotowe do produkcji! 🎉**

---

**Maintained by**: Fleet Management Team  
**Last updated**: 2025-10-08 20:56  
**Screen Resolution**: 1200×400px  
**Test Report**: MENU_TEST_REPORT.md  
**Event Listener Audit**: EVENT_LISTENER_AUDIT.md
