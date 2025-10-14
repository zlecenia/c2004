# Connect-ID

## Cel modułu
- Identyfikacja użytkownika/urządzenia metodami: RFID, QR, Barcode, Ręcznie, Lista.
- Modularny widok z PageManagerem i integracją z centralnym systemem menu.

## Kluczowe pliki
- `connect-id.view.ts` – główny widok (layout, integracja z MenuManager, top-bar, ładowanie stron przez PageManager).
- `pages/index.ts` – rejestr stron i `ConnectIdPageManager` (render treści + style per-strona).
- `connect-id.service.ts` – warstwa usługowa (logika identyfikacji, konfiguracja).
- `connect-id.notifications.ts` – powiadomienia (toast).
- `connect-id.event-handlers.ts` – obsługa zdarzeń w obrębie widoku.

## Integracja z menu i routingiem
- Menu: `connect-id-menu` (konfiguracja: `frontend/src/components/connect-menu/menu.config.ts`).
  - Kolumna „Metoda identyfikacji”: `rfid`, `qr`, `barcode`, `manual`, `list` (akcja `method-change`).
- Routing bazowy: `/connect-id` (mapowanie w `routeMenuMappings`).
- URL jest synchronizowany z wyborem w menu (MenuManager emituje `routeChanged`).

## Page Manager
- Klasa: `ConnectIdPageManager` (`modules/connect-id/pages/index.ts`).
- API:
  - `initialize(container)` – ustawia kontener treści.
  - `loadPage(method)` – ładuje stronę (HTML + `getStyles()`), wstrzykuje style.
  - `pageExists(method)`, `getAvailablePages()`.

## Publiczne API widoku
- `setInitialMethod(method: string)` – ustawienie metody po renderze (wywoływane z `main.ts`).
- `switchMethod(method: string)` – zmiana metody + przeładowanie strony.

## Zdarzenia
- Globalne: `methodChange`, `menuAction`, `menuContentUpdate`, `routeChanged`.
- Modułowe: `connectid:dom-ready` (po inicjalizacji widoku).

## Rozszerzanie
- Dodanie nowej metody (np. `face`):
  1) Dodaj stronę w `modules/connect-id/pages/<nazwa>.page.ts` z `static getContent()` i `static getStyles()`.
  2) Zarejestruj w `ConnectIdPages` (`pages/index.ts`).
  3) Dodaj pozycję do `connectIdMenuConfig` (akcja `method-change`).

## Przydatne odnośniki
- `frontend/src/components/connect-menu/` – system menu.
- `docs/MENU_ROUTING.md` – synchronizacja URL ↔ menu.
