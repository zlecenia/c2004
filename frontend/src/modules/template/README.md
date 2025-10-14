# Template Module - Base Styles & Components

Ten moduł zawiera bazowe style i komponenty używane we wszystkich modułach aplikacji, zapewniając spójność designu i redukcję duplikacji kodu.

## 📁 Struktura

```
frontend/src/modules/template/
├── styles/
│   ├── base-module.styles.ts     # Główne style bazowe
│   └── module-style-helper.ts    # Helper do zarządzania stylami
├── examples/
│   └── module-with-base-styles.example.ts  # Przykład użycia
├── index.ts                      # Eksporty modułu
└── README.md                     # Ta dokumentacja
```

## 🎨 BaseModuleStyles

Klasa zawierająca wszystkie bazowe style dla modułów:

### Główne sekcje stylów:

1. **Module Container Styles** - `.module-container`, `.module-wrapper`
2. **Form Styles** - `.form-section`, `.form-row`, `.form-group`, `.form-input`
3. **Button Styles** - `.btn`, `.btn-primary`, `.btn-save`, itp.
4. **Menu Styles** - `.menu-container`, `.menu-item`, `.menu-title`
5. **Utility Styles** - `.text-center`, `.d-flex`, `.bg-light`, itp.

### Przykład użycia:

```typescript
import { BaseModuleStyles } from '../template';

// Pobierz wszystkie bazowe style
const allStyles = BaseModuleStyles.getAllBaseStyles();

// Lub pobierz konkretną sekcję
const buttonStyles = BaseModuleStyles.getButtonStyles();
const formStyles = BaseModuleStyles.getFormStyles();
```

## 🛠️ ModuleStyleHelper

Helper class ułatwiający zarządzanie stylami w modułach:

```typescript
import { ModuleStyleHelper } from '../template';

// Utwórz helper dla standardowego modułu
const styleHelper = ModuleStyleHelper.forStandardModule();

// Dodaj style specyficzne dla modułu
const finalStyles = styleHelper
  .addModuleStyles(`
    .my-custom-class {
      background: #f0f0f0;
      padding: 10px;
    }
  `)
  .generateStyles();
```

## 📋 Klasy CSS do użycia

### Layout & Container
- `.module-container` - Główny kontener modułu
- `.module-wrapper` - Wrapper z paddingiem i shadow
- `.module-header` - Header z tytułem i akcjami
- `.module-content` - Główna zawartość
- `.module-footer` - Stopka modułu

### Formularze
- `.form-section` - Sekcja formularza
- `.form-row` - Wiersz z grid layout
- `.form-group` - Grupa input + label
- `.form-input` - Style dla inputów
- `.form-select` - Style dla select
- `.form-actions` - Kontener na przyciski

### Przyciski
- `.btn` - Bazowa klasa przycisku
- `.btn-primary`, `.btn-secondary` - Kolory
- `.btn-save`, `.btn-test`, `.btn-export` - Legacy classes
- `.btn-outline-primary` - Outline variant

### Menu & Navigation
- `.menu-container` - Kontener menu
- `.menu-item` - Element menu
- `.menu-item.active` - Aktywny element
- `.menu-title` - Tytuł sekcji menu

### Utility Classes
- **Text**: `.text-center`, `.text-muted`, `.text-primary`
- **Display**: `.d-none`, `.d-flex`, `.d-grid`
- **Flexbox**: `.justify-content-between`, `.align-items-center`
- **Spacing**: `.mt-1`, `.mb-2`, `.p-3`, `.gap-1`
- **Status**: `.status-active`, `.status-connected`, `.status-pending`

## 🚀 Integracja w Modułach

### 1. Import w module controller:

```typescript
import { ModuleStyleHelper } from '../../template';

class MyModuleController {
  public getStyles(): string {
    return ModuleStyleHelper
      .forStandardModule()
      .addModuleStyles(`
        /* Module-specific styles */
        .my-module-specific-class {
          /* ... */
        }
      `)
      .generateStyles();
  }
}
```

### 2. Użycie w HTML:

```html
<div class="module-container">
  <div class="module-wrapper">
    <div class="module-header">
      <h1 class="module-title">🔧 My Module</h1>
      <div class="module-actions">
        <button class="btn btn-primary">Action</button>
      </div>
    </div>

    <div class="module-content">
      <div class="form-section">
        <h5>Settings</h5>
        <div class="form-row">
          <div class="form-group">
            <label>Name:</label>
            <input type="text" class="form-input" />
          </div>
        </div>
        <div class="form-actions">
          <button class="btn btn-save">💾 Save</button>
        </div>
      </div>
    </div>
  </div>
</div>
```

## 🎯 Korzyści

1. **Spójność** - Wszystkie moduły mają jednolity wygląd
2. **Maintenance** - Zmiany w jednym miejscu wpływają na wszystkie moduły  
3. **Produktywność** - Szybsze tworzenie nowych modułów
4. **Responsive** - Automatyczne wsparcie dla urządzeń mobilnych
5. **Accessibility** - Zgodne z standardami dostępności

## 🔄 Migration Guide

Aby przenieść istniejący moduł na base styles:

1. Import `ModuleStyleHelper`
2. Zamień custom styles na base classes gdzie możliwe
3. Użyj `addModuleStyles()` dla specyficznych stylów
4. Testuj responsywność na różnych ekranach

Przykład przed/po:

**Przed:**
```typescript
public getStyles(): string {
  return `
    .my-container { background: #f5f5f5; padding: 20px; }
    .my-button { background: #007bff; color: white; padding: 8px 16px; }
  `;
}
```

**Po:**
```typescript
public getStyles(): string {
  return ModuleStyleHelper.forStandardModule()
    .addModuleStyles(`
      /* Only truly custom styles here */
      .my-special-feature { /* ... */ }
    `)
    .generateStyles();
}
```

```html
<!-- Użyj base classes zamiast custom -->
<div class="module-container"> <!-- zamiast .my-container -->
  <button class="btn btn-primary"> <!-- zamiast .my-button -->
```
