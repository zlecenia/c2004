# Connect-Manager

## Cel modułu
- Zarządzanie: Scenariusze Testu, Czynności, Rodzaj Testu. UI z drag&drop i tabelami.

## Kluczowe pliki
- `connect-manager.view.ts` – widok (layout, eventy, sekcje).
- `connect-manager.service.ts` – interfejsy danych, logika scenariuszy/czynności.
- `pages/` – podstrony/sekcje menadżera.

## Integracja z menu i routingiem
- Menu: `connect-manager-menu` (`menu.config.ts`) – kolumna z `scenarios`, `activities`, `test-types` (akcja `section-change`).
- Routing: `/connect-manager`.

## Rozszerzanie
- Dodaj sekcję:
  1) Pozycja w `connectManagerMenuConfig`.
  2) Implementacja treści w widoku/serwisie/podstronach.

## Linki
- `docs/MENU_ROUTING.md`
