# Connect-Workshop

## Cel modułu
- Praca warsztatowa na danych: Zgłoszenia, Serwisy, Transport, Dyspozycje.
- Dwukolumnowe menu (Obiekty × Akcje) i kombinacje stron (np. `requests-search`).

## Kluczowe pliki
- `connect-workshop.view.ts` – główny widok (layout, integracja z MenuManager i PageManager, top-bar).
- `pages/index.ts` – `ConnectWorkshopPageManager` + rejestr stron (`*-search`, `*-new-request`, `*-export`, …`).
- `connect-workshop.service.ts` – logika i synchronizacja danych (auto-sync).
- `connect-workshop.templates.ts` / `styles.ts` – styl/HTML dla widoku.

## Integracja z menu i routingiem
- Menu: `connect-workshop-menu` (`menu.config.ts`).
  - Kolumna 1: `objects-column` (`requests`, `services`, `transport`, `dispositions`).
  - Kolumna 2: `actions-column` (`search`, `new-request`, `export`, `import`, `sync`).
- Routing bazowy: `/connect-workshop` (mapowanie w `routeMenuMappings`).
- Normalizacja ścieżek (w `main.ts`):
  - `/connect-workshop` → `/connect-workshop/requests/search`
  - `/connect-workshop/requests` → `/connect-workshop/requests/search`
- URL jest aktualizowany na klik (MenuManager → `updateUrlForSelection`).

## Page Manager
- Klasa: `ConnectWorkshopPageManager` (`pages/index.ts`).
- API:
  - `initialize(container)`
  - `loadPage(section, method)` – renderuje stronę `<section>-<method>`.

## Zdarzenia
- `sectionChange`, `methodChange`, `menuAction`, `menuContentUpdate`, `routeChanged`.

## Rozszerzanie
- Dodanie nowej kombinacji:
  1) Dodaj stronę `pages/<section>-<action>.page.ts` z `getContent()`/`getStyles()`.
  2) Zarejestruj w `ConnectWorkshopPages` (`pages/index.ts`).
  3) Dodaj pozycję do odpowiedniej kolumny w `connectWorkshopMenuConfig`.

## Przydatne odnośniki
- `docs/MENU_ROUTING.md` – opis synchronizacji URL i menu.
