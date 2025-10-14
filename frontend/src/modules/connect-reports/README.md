# Connect-Reports

## Cel modułu
- Przegląd raportów wykonanych/planowanych, różne widoki (tydzień/miesiąc/rok).

## Kluczowe pliki
- `connect-reports.view.ts` – widok modułu (layout, PageManager, top-bar).
- `pages/` – strony/sekcje raportów (np. `executed`, `planned`, …).
- `week-view.component.ts`, `month-view.component.ts` – komponenty widoków kalendarzowych.
- `connect-reports.templates.ts` / `styles.ts` – szablony/styl.

## Integracja z menu i routingiem
- Menu: `connect-reports-menu` (`frontend/src/components/connect-menu/menu.config.ts`).
  - Kolumna „Raporty” (`report-types`): `executed`, `planned`, `export` — używa pola `section` (akcja `report-type-change`).
  - Kolumna „Widok” (`view-options`): `week`, `month`, `year`, `custom`, `planning` — używa pola `method` (akcja `view-change`). Widoczna domyślnie.
  - Kolumna „Planowanie” (`planning-options`): pomocnicza (nie wpływa na URL), pojawia się po wybraniu w kolumnie 2 pozycji „Planowanie”.
- Routing bazowy: `/connect-reports`.
- URL aktualizowany z wyboru w menu i ma postać: `/connect-reports/<section>/<view>`.

## Page Manager
- `ConnectReportsPageManager` (w `pages/`) – zarządza treścią i stylami dla sekcji/widoków.
- Klucze stron: `<section>-<view>`, np. `planned-month`, `executed-week`.

## Rozszerzanie
- Dodaj nowy typ raportu lub widok:
  1) Rozszerz konfigurację menu (`connectReportsMenuConfig`).
  2) Dodaj treść/komponent w `pages/` lub jako komponent widoku.

## Zdarzenia
- `routeChanged` (po zmianie URL przez MenuManager)
- `connectreports:update-state` (wewnątrz modułu — aktualizacja widoku po zmianie URL)
- `menuAction`, `menuContentUpdate`

## Linki
- `docs/MENU_ROUTING.md`
