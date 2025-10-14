# Connect-Test

## Cel modułu
- Interfejs testów (np. identyfikacja/testowanie komponentów), szablony + style wydzielone.

## Kluczowe pliki
- `connect-test.view.ts` – widok (layout, eventy, ładowanie treści).
- `connect-test.templates.ts` / `styles.ts` – szablony i style.
- `pages/` – strony częściowe, jeśli wymagane.

## Integracja z menu i routingiem
- Menu: `connect-test-menu` (`menu.config.ts`).
  - Kolumna `interface` z metodami: `rfid`, `qr`, `barcode`, `search` (akcja `method-change`).
- Routing: `/connect-test`.
- URL synchronizowany przy wyborze metody.

## Rozszerzanie
- Dodaj metodę: pozycja w `connectTestMenuConfig` + odpowiednia treść w widoku/stronie.

## Linki
- `docs/MENU_ROUTING.md`
