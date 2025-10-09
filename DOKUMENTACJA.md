# 📋 DOKUMENTACJA SYSTEMU - c2004

## ✅ Status Implementacji (Stan: 2025-10-08)

### 🎯 **Ukończone zadania:**

1. **✅ System Notyfikacji w Right-Panel**
   - Notyfikacje pojawiają się w right-panel na górze
   - Maksymalnie 2 notyfikacje jednocześnie
   - Auto-znikanie po 4 sekundach
   - Kliknięcie aby zamknąć
   - Animacje slideIn/slideOut

2. **✅ Komponent VirtualKeyboard**
   - Reużywalny komponent klawiatury
   - 3 layouty: full, numeric, password
   - Zintegrowany w ConnectID (Manual + Password)

3. **✅ Przełączanie obiektów w modułach**
   - ConnectData: Dynamiczna zmiana danych w tabeli przy zmianie objektu
   - ConnectWorkshop: Kontekstowa zmiana danych przy zmianie sekcji

4. **✅ Formularze ConnectData**
   - Naprawione formularze Dodaj/Edytuj po usunięciu h4
   - Dynamiczne pola zależne od typu obiektu

5. **✅ 3-miesięczny widok kalendarza**
   - Raporty > Planowane > Miesiące
   - Poprzedni, aktualny, przyszły miesiąc w tabelach

6. **✅ UI Cleanup**
   - Usunięto duplikaty "Szybkie Akcje" z right-panel
   - Wszystkie akcje są teraz w dedykowanej kolumnie

## 🏗️ **Architektura Systemu**

### **Struktura modułów:**
```
frontend/src/
├── main.ts                          # Główny router i layout
├── components/
│   └── virtual-keyboard.component.ts # Reużywalny komponent klawiatury
└── modules/
    ├── connect-id/                  # System identyfikacji
    │   ├── connect-id.view.ts      # UI + VirtualKeyboard
    │   ├── connect-id.service.ts   # Logika biznesowa
    │   └── connect-id.module.ts    # Konfiguracja modułu
    ├── connect-data/              # Zarządzanie danymi
    │   └── connect-data.view.ts  # UI z dynamicznym przełączaniem
    ├── connect-workshop/            # Warsztat serwisowy
    │   └── connect-workshop.view.ts # UI z kontekstowymi danymi
    └── connect-test/                # System testowania
        └── connect-test.view.ts    # UI testów
```

### **System Notyfikacji:**
- **Lokalizacja**: Right-panel, górna część
- **Limit**: Maksymalnie 2 notyfikacje
- **Czas**: Auto-znikanie po 4 sekundach
- **Interakcja**: Kliknięcie aby zamknąć
- **Typy**: success, error, info, warning
- **Animacje**: slideInRight/slideOutRight

### **VirtualKeyboard Component:**
- **3 layouty**: full (pełna), numeric (cyfry), password (hasło)
- **Callbacks**: onKeyPress, onEnter
- **Metody**: setValue(), getValue(), clear(), focus(), destroy()
- **Użycie**: ConnectID Manual + Password input

## 📊 **Funkcjonalności Modułów**

### **🔌 ConnectID - System Identyfikacji**
- **Metody**: RFID, QR Code, Barcode, Manual/Keyboard
- **Typy**: User, Device, Group, Test
- **Klawiatura**: VirtualKeyboard w Manual i Password
- **Historia**: Rich history display z ikonami i statusem
- **Notyfikacje**: Toast notifications w right-panel

### **📊 ConnectData - Zarządzanie Danymi**
- **Obiekty**: Użytkownicy, Urządzenia, Scenariusze, Grupy, Magazyny, Klienci
- **Akcje**: Szukaj, Dodaj, Edytuj, Export, Import, Sync
- **Przełączanie**: Dynamiczna zmiana danych w tabeli przy zmianie objektu
- **Formularze**: Kontekstowe pola zależne od typu obiektu

### **🔧 ConnectWorkshop - Warsztat**
- **Sekcje**: Zgłoszenia, Serwisy, Transport, Dyspozycje
- **Akcje**: Szukaj, Zgłoszenie, Export, Import, Sync
- **Dane**: Kontekstowa zmiana wyników przy zmianie sekcji
- **Synchronizacja**: Status i kontrola sync

### **🧪 ConnectTest - System Testów**
- **Typy testów**: Pressure, Flow, Function, Visual, Maintenance, Calibration
- **Protokoły**: Service, Usage, Maintenance
- **Scenariusze**: Predefiniowane i niestandardowe

### **📋 Raporty - System Raportowania**
- **Wykonane**: Tabela z wyszukiwaniem i filtrami
- **Planowane**: 
  - Tygodnie: Kalendarz tygodniowy
  - Miesiące: 3 tabele (poprzedni, aktualny, przyszły)
  - Lata: Grid miesięcy z miniaturami

## 🎨 **Design System**

### **Kolory:**
- **Tło główne**: #2a2a2a (dark)
- **Akcenty**: #28a745 (success), #dc3545 (error), #17a2b8 (info), #ffc107 (warning)
- **Gradienty**: #667eea → #764ba2 (top-bar)

### **Typografia:**
- **Nagłówki**: 11-14px, font-weight: 600
- **Tekst główny**: 10-12px
- **Małe elementy**: 8-9px

### **Layout:**
- **Top-bar**: 35px wysokość
- **Sidebar główny**: 120px szerokość
- **Kolumny menu**: 100px każda
- **Right-panel**: 200px szerokość
- **Główna zawartość**: Elastyczna (~600-680px)

## 🔄 **System Responsywności**

Wszystkie moduły dostosowują się do rozmiaru 1280×400px z elastycznym layoutem:
- Menu kolumny mogą być ukryte/pokazane
- Zawartość główna skaluje się dynamicznie
- Right-panel może być zwinięty

## 📝 **Konwencje Kodowe**

### **Nazewnictwo:**
- **Klasy**: PascalCase (ConnectIdView)
- **Metody**: camelCase (showNotification)
- **CSS**: kebab-case (right-notification)
- **IDs**: kebab-case (right-panel-notifications)

### **Struktura plików:**
- **view.ts**: Logika UI i renderowanie
- **service.ts**: Logika biznesowa i API
- **module.ts**: Konfiguracja i dependency injection

### **Event handling:**
- **Event listeners**: W setupEventListeners()
- **Custom events**: window.dispatchEvent dla komunikacji między modułami
- **Callbacks**: W komponentach reużywalnych (VirtualKeyboard)
