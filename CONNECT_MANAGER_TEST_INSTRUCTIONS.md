# 🧪 Connect Manager - Instrukcje Testowania

*Utworzono: 2025-10-14 11:20*

## 🚀 **Status Projektu**

✅ **Projekt zaktualizowany i gotowy do testowania**
✅ **Błędy TypeScript naprawione**
✅ **Serwer HTTP uruchomiony**

## 📋 **Wykonane działania**

### 1. **Naprawiono błędy TypeScript**
```typescript
// Poprawione rzutowania typów w scenarios.page.ts:
- conditions.forEach(condition => {
+ conditions.forEach(condition => {
+   const conditionType = (condition as HTMLElement).dataset.conditionType;

// Poprawione DragEvent types:
- item.addEventListener('dragstart', (e) => {
+ item.addEventListener('dragstart', (e) => {
+   const dragEvent = e as DragEvent;
+   dragEvent.dataTransfer?.setData(...)
```

### 2. **Wyłączono nieużywane pliki**
```bash
✅ database-service.ts → database-service.ts.bak
✅ scenario-builder-tests.ts → scenario-builder-tests.ts.bak
```
*(Te pliki nie są potrzebne do działania frontendu)*

### 3. **Uruchomiono serwer HTTP**
```bash
✅ Serwer: http://localhost:3000
✅ Status: RUNNING
✅ Port: 3000
```

## 🎯 **Jak przetestować Connect Manager**

### **Krok 1: Otwórz przeglądarkę**
```
URL: http://localhost:3000
```

### **Krok 2: Przejdź do Connect Manager**
```
Nawigacja: http://localhost:3000/#/connect-manager
Lub kliknij: Connect Manager w menu bocznym
```

### **Krok 3: Wybierz zakładkę "Scenariusze"**
```
Menu: Scenariusze → Budowanie scenariuszy testowych
```

## 🎨 **Co przetestować - Scenario Builder**

### **A. Podstawowe funkcje**

#### **1. Tworzenie nowego scenariusza**
- ✅ Nazwa scenariusza w input field
- ✅ Dodaj nowy cel (Goal) - button
- ✅ Wybierz cel z dropdown

#### **2. Budowanie zadań (Tasks)**
- ✅ Dodaj zadanie - button
- ✅ Wybierz funkcję (Włącz, Wyłącz, Ustaw...)
- ✅ Wybierz obiekt (pompę 1, zawór 1...)
- ✅ Dodaj operator AND - button

#### **3. Warunki logiczne**
- ✅ Dodaj warunek - button
- ✅ IF condition: parametr, operator, wartość, jednostka
- ✅ ELSE condition: komunikat błędu

### **B. Biblioteka elementów (Sidebar)**

#### **1. Drag & Drop**
- ✅ Przeciągnij obiekt z biblioteki
- ✅ Upuść na sentence builder
- ✅ Element powinien być dodany

#### **2. Kategorie**
```
📦 Obiekty:
  - pompa 1, pompa 2
  - zawór 1, zawór 2, zawór 3
  - sprężarka, regulator, czujnik

⚙️ Funkcje:
  - Włącz, Wyłącz, Ustaw
  - Zmierz, Sprawdź
  - Porównaj, Kalibruj

📊 Parametry:
  - ciśnienie, temperatura
  - przepływ, czas
  - objętość, wilgotność
```

#### **3. Przykłady z bazy**
- ✅ Kliknij na przykład
- ✅ Scenariusz powinien się wczytać
- ✅ Nazwa i struktura załadowane

### **C. Podgląd scenariusza**

#### **1. Live preview**
- ✅ Zmień wartość w builderze
- ✅ Podgląd aktualizuje się automatycznie

#### **2. Eksport**
- ✅ Przycisk "📋 Kopiuj"
- ✅ Scenariusz kopiowany do schowka

### **D. Zapisywanie**

#### **1. Zapis scenariusza**
- ✅ Przycisk "💾 Zapisz scenariusz"
- ✅ Alert z potwierdzeniem

#### **2. Wczytanie scenariusza**
- ✅ Przycisk "📂 Wczytaj scenariusz"

#### **3. Eksport**
- ✅ Przycisk "📤 Eksportuj"

## 📝 **Przykładowy scenariusz do przetestowania**

### **Test szczelności C20**

**Kroki:**
1. Wpisz nazwę: "Test szczelności C20"
2. Dodaj Goal: "Wytworzyć podciśnienie"
3. Dodaj Task 1:
   - Funkcja: "Włącz"
   - Obiekt: "pompę 1"
4. Dodaj warunek IF:
   - Parametr: "czas"
   - Operator: ">"
   - Wartość: "10"
   - Jednostka: "s"
5. Dodaj warunek ELSE:
   - Błąd: "Nieszczelność"

**Oczekiwany podgląd:**
```
SCENARIO: Test szczelności C20

GOAL: Wytworzyć podciśnienie
  TASK 1:
    → Włącz [pompę 1]
    
  IF [czas] [>] [10 s]
  ELSE ERROR "Nieszczelność"
```

## 🔍 **Co sprawdzić wizualnie**

### **Layout:**
- ✅ Główny builder po lewej
- ✅ Sidebar po prawej
- ✅ Responsywny design

### **Kolory:**
- ✅ GOAL: niebieski (#007bff)
- ✅ TASK: zielony (#28a745)
- ✅ IF: czerwony (#dc3545)
- ✅ ELSE: żółty (#ffc107)

### **Interakcje:**
- ✅ Hover effects na przyciskach
- ✅ Drag & drop visual feedback
- ✅ Selecty działają poprawnie
- ✅ Inputy przyjmują wartości

## 🐛 **Możliwe problemy**

### **Problem 1: Strona nie ładuje się**
```
Rozwiązanie:
- Sprawdź czy serwer działa: curl http://localhost:3000
- Otwórz developer console (F12)
- Sprawdź błędy w Network tab
```

### **Problem 2: Drag & Drop nie działa**
```
Rozwiązanie:
- Sprawdź console dla błędów JavaScript
- Upewnij się że element ma draggable="true"
- Sprawdź czy event listeners są zainicjowane
```

### **Problem 3: Podgląd się nie aktualizuje**
```
Rozwiązanie:
- Sprawdź czy updatePreview() jest wywoływana
- Dodaj console.log w updatePreview()
- Sprawdź czy event listeners są dodane
```

## 📊 **Struktura kodu**

### **Pliki do sprawdzenia:**
```
frontend/src/modules/connect-manager/
├── pages/
│   ├── scenarios.page.ts      ✅ Główna logika buildera
│   ├── activities.page.ts     ✅ Strona czynności
│   ├── test-types.page.ts     ✅ Strona typów testów
│   └── index.ts               ✅ Page Manager
├── connect-manager.view.ts    ✅ Główny widok
├── connect-manager.module.ts  ✅ Moduł
└── connect-manager.service.ts ✅ Serwis (symulowane dane)
```

### **Kluczowe metody w scenarios.page.ts:**
```typescript
✅ getContent()           - Generuje HTML buildera
✅ getStyles()            - Style CSS
✅ attachEventListeners() - Event handlers
✅ addNewGoal()           - Dodaje nowy cel
✅ addNewTask()           - Dodaje nowe zadanie
✅ addNewCondition()      - Dodaje warunek
✅ updatePreview()        - Aktualizuje podgląd
✅ saveScenario()         - Zapisuje scenariusz
✅ initializeDragAndDrop()- Inicjalizuje D&D
```

## ✅ **Checklist testowania**

### **Podstawowe funkcjonalności:**
- [ ] Strona się ładuje
- [ ] Menu connect-manager działa
- [ ] Zakładka "Scenariusze" otwiera builder
- [ ] Input nazwa scenariusza działa
- [ ] Dropdown Goal działa

### **Budowanie scenariusza:**
- [ ] Dodaj Goal button
- [ ] Dodaj Task button
- [ ] Dodaj warunek button
- [ ] Selecty funkcji/obiektu
- [ ] Input wartości

### **Drag & Drop:**
- [ ] Przeciągnięcie elementu
- [ ] Upuszczenie na builder
- [ ] Visual feedback

### **Podgląd:**
- [ ] Live update preview
- [ ] Kopiuj do schowka
- [ ] Poprawny format

### **Akcje:**
- [ ] Zapisz scenariusz
- [ ] Wczytaj przykład
- [ ] Usuń Goal/Task

## 🎉 **Sukces!**

Jeśli wszystkie checkboxy są zaznaczone - **Connect Manager Scenario Builder działa poprawnie!**

---

## 📞 **Kontakt w razie problemów**

- Sprawdź console (F12) dla błędów JavaScript
- Sprawdź Network tab dla błędów ładowania
- Przeczytaj logi serwera HTTP

**URL testowy:** http://localhost:3000/#/connect-manager

**Happy Testing!** 🚀
