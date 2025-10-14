# Connect-Data (ConnectFilter)

## Cel modułu
- Operacje na danych (Zgłoszenia/Serwisy/Transport/Dyspozycje) + akcje (Szukaj/Dodaj/Export/Import/Sync).

## Kluczowe pliki
- `connect-filter.view.ts` – widok (layout, eventy, integracja menu jeśli używane wewnętrznie).
- `connect-filter.service.ts` – logika filtrowania/danych.
- `connect-filter.templates.ts` / `styles.ts` – szablony i style.

## Integracja z menu i routingiem
- Menu: `connect-data-menu` (`menu.config.ts`).
  - Kolumna `objects-column`: `requests`, `services`, `transport`, `dispositions` (akcja `section-change`).
  - Kolumna `actions-column`: `search`, `new-request`, `export`, `import`, `sync`.
- Routing: `/connect-data`.

## Rozszerzanie
- Dodaj nową akcję lub obiekt:
  1) Pozycja w `connectDataMenuConfig`.
  2) Obsługa akcji w widoku/serwisie.

## Linki
- `docs/MENU_ROUTING.md`
