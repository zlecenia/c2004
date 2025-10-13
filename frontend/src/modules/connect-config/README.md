# Connect-Config

## Cel modułu
- Konfiguracja systemu: System/Urządzenia/Bezpieczeństwo, dedykowane 3‑poziomowe menu wewnętrzne.

## Kluczowe pliki
- `connect-config.view.ts` – widok i integracja z PageManager.
- `pages/index.ts` – `ConnectConfigPageManager` + rejestr stron.
- `pages/menu.structure.ts` – definicja trójpoziomowej struktury menu (poza centralnym ConnectMenu).
- `pages/menu.controller.ts` – renderer + logika aktywacji i przełączania poziomów.
- Komponenty kategorii: `pages/system/system-category.component.ts`, `pages/devices/devices-category.component.ts`, `pages/security/security-category.component.ts`.

## Routing i menu
- Działanie wewnątrz modułu (własne 3‑poziomowe menu), bazowy routing: `/connect-config`.
- Do włączenia centralnego menu modułowego można użyć `createModuleMenu('connect-config', ...)` (opcjonalnie).

## Rozszerzanie
- Dodaj Level 2 lub Level 3:
  1) Zaktualizuj `menu.structure.ts` (węzły, ikony, aktywność).
  2) Dodaj/rozszerz odpowiedni komponent kategorii.

## Linki
- `docs/MENU_ROUTING.md`
