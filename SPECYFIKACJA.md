

To provide an accurate and useful specification, I'll quickly inspect the key source files that define the menu system, page management, and how modules link menu selections to pages. This will ensure the document references actual symbols, file paths, and APIs. I'll open the following files in parallel:
- Menu system: menu.interfaces.ts, menu.manager.ts, menu.config.ts, connect-menu.component.ts, index.ts
- Connect-ID: connect-id.view.ts, pages/index.ts
- Main entry: main.ts
# Specyfikacja aktualnego rozwiązania (Frontend: Menu + Connect-ID + Routing)

Poniżej znajduje się zwarta specyfikacja aktualnej architektury, struktury menu, kluczowych klas/funkcji oraz instrukcja rozbudowy (linkowanie z menu do stron/pages). Odniesienia do plików podane są w nawiasach.

## Architektura i warstwy

- • **Menu (UI + zarządzanie)**
    - [ConnectMenuComponent](cci:2://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/connect-menu.component.ts:6:0-244:1) – renderowanie i obsługa zdarzeń (klików) menu [[frontend/src/components/connect-menu/connect-menu.component.ts](frontend/src/components/connect-menu/connect-menu.component.ts:0:0-0:0)].
    - [MenuManager](cci:2://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/menu.manager.ts:6:0-410:1) – singleton; tworzenie menu, globalna logika 3‑poziomowej nawigacji, integracja z routingiem [[frontend/src/components/connect-menu/menu.manager.ts](frontend/src/components/connect-menu/menu.manager.ts:0:0-0:0)].
    - Konfiguracje menu per moduł + nawigacja główna [[frontend/src/components/connect-menu/menu.config.ts](frontend/src/components/connect-menu/menu.config.ts:0:0-0:0)].
    - Typy i API [[frontend/src/components/connect-menu/menu.interfaces.ts](frontend/src/components/connect-menu/menu.interfaces.ts:0:0-0:0)].
    - Funkcje skrótowe: [createMenu](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/index.ts:21:0-31:1), [createModuleMenu](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/index.ts:33:0-43:1), [getMenuManager](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/index.ts:45:0-50:1) [[frontend/src/components/connect-menu/index.ts](frontend/src/components/connect-menu/index.ts:0:0-0:0)].

- • **Moduły (przykład: Connect-ID)**
    - Widok: [ConnectIdView](cci:2://file:///home/tom/github/zlecenia/c2004/frontend/src/modules/connect-id/connect-id.view.ts:7:0-497:1) – layout, integracja z MenuManager, ładowanie stron przez PageManager [[frontend/src/modules/connect-id/connect-id.view.ts](frontend/src/modules/connect-id/connect-id.view.ts:0:0-0:0)].
    - PageManager: [ConnectIdPageManager](cci:2://file:///home/tom/github/zlecenia/c2004/frontend/src/modules/connect-id/pages/index.ts:20:0-234:1) – rejestracja stron/metod, ładowanie HTML + styli [[frontend/src/modules/connect-id/pages/index.ts](frontend/src/modules/connect-id/pages/index.ts:0:0-0:0)].

- • **Routing aplikacji**
    - Inicjalizacja, nawigacja modułami i importy dynamiczne w [main.ts](frontend/src/main.ts:0:0-0:0) (pushState, obsługa URL, [loadModule(...)](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/main.ts:479:0-529:1)) [[frontend/src/main.ts](frontend/src/main.ts:0:0-0:0)].

---

## Struktura i kontrakty menu

- **Typy** ([menu.interfaces.ts](frontend/src/components/connect-menu/menu.interfaces.ts:0:0-0:0)):
    - **[MenuItem](cci:2://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/menu.interfaces.ts:2:0-16:1)**: `id`, `label`, `icon`, opcjonalnie: `action`, `module`, `section`, `method`, `subsection`, `route`, `active`, `disabled`, `className`.
    - **[MenuColumn](cci:2://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/menu.interfaces.ts:18:0-25:1)**: `id`, `title`, `items: MenuItem[]`, opcjonalnie `width`, `className`, `visible`.
    - **[MenuConfiguration](cci:2://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/menu.interfaces.ts:27:0-33:1)**: `id`, `type: 'sidebar' | 'columns' | 'horizontal'`, `columns: MenuColumn[]`, opcjonalnie `theme`, `layout`.
    - **[MenuCallbacks](cci:2://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/menu.interfaces.ts:44:0-48:1)**: [onItemClick](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/main.ts:328:4-342:5), `onColumnChange`, `onMenuReady`.
    - **[RouteMenuMapping](cci:2://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/menu.interfaces.ts:57:0-61:1)**: mapowanie ścieżki na `menuId` i aktywne elementy.

- **Konfiguracje** ([menu.config.ts](frontend/src/components/connect-menu/menu.config.ts:0:0-0:0)):
    - **Nawigacja główna**: `mainNavigationConfig` (sidebar z modułami: `connect-id`, `connect-test`, `connect-reports`, `connect-manager`, `connect-workshop`, `connect-data`, `connect-config`).
    - **Menu modułów**:
        - `connectIdMenuConfig` – 1 kolumna z metodami: `rfid`, `qr`, `barcode`, `manual`, `list`.
        - `connectDataMenuConfig`, `connectReportsMenuConfig`, `connectTestMenuConfig`, `connectManagerMenuConfig`, `connectWorkshopMenuConfig`, `connectConfigMenuConfig` – wzorce 2‑3 kolumn.
    - **`routeMenuMappings`** – aktywacja właściwych menu po wejściu na ścieżkę (np. `/connect-id` → `connect-id-menu`).

---

## Silnik menu – funkcje i cechy

- **[ConnectMenuComponent](cci:2://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/connect-menu.component.ts:6:0-244:1)** ([connect-menu.component.ts](frontend/src/components/connect-menu/connect-menu.component.ts:0:0-0:0)):
    - **[render(container)](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/modules/connect-id/connect-id.view.ts:27:2-85:3)** – generuje HTML (z `ConnectMenuTemplates`), dołącza style (`ConnectMenuStyles`), podłącza eventy.
    - **[setupEventListeners()](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/modules/connect-reports/month-view.component.ts:203:2-230:3)** – delegacja klików; odczyt `data-menu-item`; wywołanie [handleItemClick](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/connect-menu.component.ts:84:2-109:3).
    - **[handleItemClick(item, column, event)](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/connect-menu.component.ts:84:2-109:3)** – aktualizacja stanu aktywnego elementu, wywołanie [callbacks.onItemClick](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/main.ts:328:4-342:5), następnie akcje wbudowane.
    - **[handleBuiltInActions({ action, item })](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/connect-menu.component.ts:111:2-139:3)**:
        - `navigate` – `pushState`, wysyła `menuNavigation`.
        - `section-change` – wywołuje `onColumnChange`.
    - **[updateActiveItem(itemId, columnId?)](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/connect-menu.component.ts:141:2-168:3)** – aktualizuje stan/DOM.
    - **[toggleColumn(columnId, visible)](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/connect-menu.component.ts:170:2-187:3)** – ukrywa/pokazuje kolumny.
    - **[updateMenuItem(itemId, updates)](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/connect-menu.component.ts:189:2-203:3)**, **[getConfig()](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/connect-menu.component.ts:227:2-232:3)**, **[destroy()](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/connect-menu.component.ts:234:2-243:3)** – administracja komponentem.

- **[MenuManager](cci:2://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/menu.manager.ts:6:0-410:1)** ([menu.manager.ts](frontend/src/components/connect-menu/menu.manager.ts:0:0-0:0)):
    - **[getInstance()](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/menu.manager.ts:15:2-23:3)** – singleton.
    - **[createMenu(menuId, container, callbacks?)](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/index.ts:21:0-31:1)** – pobiera [MenuConfiguration](cci:2://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/menu.interfaces.ts:27:0-33:1), tworzy [ConnectMenuComponent](cci:2://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/connect-menu.component.ts:6:0-244:1), owija [onItemClick](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/main.ts:328:4-342:5) tak, aby wywołać też globalną logikę [handleGlobalMenuAction](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/menu.manager.ts:126:2-188:3).
    - **[createModuleMenu(moduleName, container, callbacks?)](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/index.ts:33:0-43:1)** – skrót dla konfiguracji modułu.
    - **[updateMenuForRoute(currentRoute)](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/menu.manager.ts:107:2-124:3)** – aktywuje elementy wg `routeMenuMappings`.
    - **[handleGlobalMenuAction(data)](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/menu.manager.ts:126:2-188:3)** – spójna obsługa:
        - `navigate` → [navigateToModule(...)](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/menu.manager.ts:327:2-349:3), zdarzenie `moduleNavigation`.
        - `section-change` → [handle3LevelNavigation(...)](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/menu.manager.ts:190:2-216:3), zdarzenie `sectionChange`.
        - `method-change` → [handle3LevelNavigation(...)](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/menu.manager.ts:190:2-216:3), zdarzenie `methodChange`.
        - inne → [handle3LevelNavigation(...)](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/menu.manager.ts:190:2-216:3), zdarzenie `menuAction`.
    - **[handle3LevelNavigation(item, column, actionType)](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/menu.manager.ts:190:2-216:3)** – wylicza selekcję kolumn, emituje `menuContentUpdate`, zarządza zależnościami (pokazywanie kolumn).
    - **[updateRoutingForMenuSelection(item, column)](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/menu.manager.ts:297:2-311:3)** – uaktualnia URL dla `section` (czysta ścieżka).
    - **[navigateToModule(moduleName, route?)](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/menu.manager.ts:327:2-349:3)** – `pushState`, zdarzenie `moduleNavigation`, synchronizacja menu głównego.
    - **API administracyjne**: [getMenu](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/menu.manager.ts:351:2-356:3), [destroyMenu](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/menu.manager.ts:358:2-367:3), [destroyAllMenus](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/menu.manager.ts:369:2-375:3), [registerMenu](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/menu.manager.ts:392:2-402:3), [registerRouteMapping](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/menu.manager.ts:404:2-409:3).

- **Funkcje skrótowe** ([components/connect-menu/index.ts](frontend/src/components/connect-menu/index.ts:0:0-0:0)):
    - **[createMenu(menuId, container, callbacks?)](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/index.ts:21:0-31:1)**
    - **[createModuleMenu(moduleName, container, callbacks?)](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/index.ts:33:0-43:1)**
    - **[getMenuManager()](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/index.ts:45:0-50:1)**

---

## Moduł Connect‑ID

- **[ConnectIdView](cci:2://file:///home/tom/github/zlecenia/c2004/frontend/src/modules/connect-id/connect-id.view.ts:7:0-497:1)** ([modules/connect-id/connect-id.view.ts](frontend/src/modules/connect-id/connect-id.view.ts:0:0-0:0)):
    - **Stan**: `currentMethod = 'rfid'`.
    - **Konstruktor**: inicjalizacja [ConnectIdEventHandlers](cci:2://file:///home/tom/github/zlecenia/c2004/frontend/src/modules/connect-id/connect-id.event-handlers.ts:3:0-296:1) (klawiatura wirtualna, powiadomienia), `ConnectIdNotifications`, [ConnectIdPageManager](cci:2://file:///home/tom/github/zlecenia/c2004/frontend/src/modules/connect-id/pages/index.ts:20:0-234:1).
    - **[render()](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/modules/connect-id/connect-id.view.ts:27:2-85:3)**:
        - Buduje layout: lewy panel na menu (`#connect-id-menu-container`), prawa część na treść (`#connect-id-content`).
        - Inicjalizuje [pageManager.initialize(contentContainer)](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/modules/connect-config/connect-config.service.ts:3:2-15:3).
        - Tworzy menu: [createModuleMenu('connect-id', menuContainer, { onItemClick })](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/index.ts:33:0-43:1).
            - W [onItemClick](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/main.ts:328:4-342:5): gdy `item.method`, ustawia `this.currentMethod`, odświeża top bar i ładuje stronę.
        - Dołącza style ([addCustomStyles()](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/modules/connect-id/connect-id.view.ts:119:2-129:3)).
        - Ładuje stronę startową ([loadCurrentPage()](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/modules/connect-id/connect-id.view.ts:87:2-93:3)).
        - Podłącza eventy wewnętrzne widoku: [eventHandlers.setupEventListeners(contentContainer)](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/modules/connect-reports/month-view.component.ts:203:2-230:3).
    - **[loadCurrentPage()](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/modules/connect-id/connect-id.view.ts:87:2-93:3)** → [pageManager.loadPage(this.currentMethod)](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/modules/connect-id/pages/index.ts:36:2-73:3).
    - **Publiczne API**:
        - **[switchMethod(method)](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/modules/connect-id/connect-id.view.ts:465:2-474:3)** – ustawia metodę i przeładowuje stronę.
        - **[getCurrentMethod()](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/modules/connect-id/connect-id.view.ts:481:2-484:3)**
        - **[setInitialMethod(method)](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/modules/connect-id/connect-id.view.ts:486:2-496:3)** – wywoływane z [main.ts](frontend/src/main.ts:0:0-0:0) po renderze.

- **[ConnectIdPageManager](cci:2://file:///home/tom/github/zlecenia/c2004/frontend/src/modules/connect-id/pages/index.ts:20:0-234:1)** i strony ([modules/connect-id/pages/index.ts](frontend/src/modules/connect-id/pages/index.ts:0:0-0:0)):
    - **Rejestr stron**: `ConnectIdPages` (klucz = metoda: `rfid`, `manual`, `qr`, `list`, `barcode`).
    - **[initialize(container)](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/modules/connect-config/connect-config.service.ts:3:2-15:3)** – podpięcie kontenera.
    - **[loadPage(method)](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/modules/connect-id/pages/index.ts:36:2-73:3)** – renderuje HTML danej strony (`PageClass.getContent()`), wstrzykuje style ([PageClass.getStyles()](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/modules/connect-reports/month-view.component.ts:258:2-457:3) → [injectPageStyles()](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/modules/connect-id/pages/index.ts:197:2-212:3)), obsługa placeholder/error.
    - **Dodatkowe**: [getCurrentPage()](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/modules/connect-id/pages/index.ts:214:2-219:3), [getAvailablePages()](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/modules/connect-id/pages/index.ts:221:2-226:3), [pageExists()](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/modules/connect-id/pages/index.ts:228:2-233:3).

---

## Integracja z routingiem i modułami ([frontend/src/main.ts](frontend/src/main.ts:0:0-0:0))

- **[initializeApp()](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/main.ts:263:0-279:1) → [createMainApplication()](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/main.ts:281:0-315:1)**
    - Tworzy szkielety UI (top bar, layout, kontener modułu).
    - **[setupNavigation()](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/main.ts:317:0-351:1)**:
        - [createMenu('main-navigation', navContainer, { onItemClick })](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/index.ts:21:0-31:1)
        - W [onItemClick](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/main.ts:328:4-342:5): `pushState(routePath)`, [loadModule(moduleName, ...)](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/main.ts:479:0-529:1).
        - `popstate` → [handlePathChange()](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/main.ts:353:0-409:1) – odczyt ścieżki i wczytanie modułu/stanu.
- **[loadModule(moduleName, moduleType?, method?)](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/main.ts:479:0-529:1)**
    - Importy dynamiczne, render widoków modułów, ustawienia wstępne (np. [ConnectIdView.setInitialMethod(method || 'rfid')](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/modules/connect-id/connect-id.view.ts:486:2-496:3)).
- **Aktualizacja stanu bez przeładowań**: [updateModuleState(...)](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/main.ts:412:0-478:1) emituje custom events dla istniejących widoków (np. `connectid:update-method`).

---

## Zdarzenia globalne i kontrakty

- **Z menu/managera**:
    - `menuNavigation` { route, module }
    - `moduleNavigation` { module, route }
    - `sectionChange` { section, module, column, combinations }
    - `methodChange` { method, module, column, combinations }
    - `menuAction` { action, item, column, timestamp, combinations }
    - `menuContentUpdate` { menuId, selection, combinations, timestamp }

- **Z modułów** (przykłady w [main.ts](frontend/src/main.ts:0:0-0:0)):
    - `connectid:dom-ready`
    - `connectid:update-method` { method }
    - Analogicznie dla innych modułów: `connectworkshop:update-state`, `connectconfig:update-state`, `connecttest:update-state`, `connectreports:update-state`.

---

## Instrukcja rozbudowy (jak dodawać nowe funkcje z linkowaniem z menu i kodem)

- **1) Nowa metoda identyfikacji w Connect‑ID (np. “face”)**
    - **Strona**:
        - Dodaj plik `frontend/src/modules/connect-id/pages/user-face.page.ts` z klasą ze statycznymi metodami:
            - `static getContent(): string`
            - `static getStyles(): string`
    - **Rejestracja strony**:
        - W [frontend/src/modules/connect-id/pages/index.ts](frontend/src/modules/connect-id/pages/index.ts:0:0-0:0) zaktualizuj `ConnectIdPages`, np.:
            - `'face': UserFacePage`
    - **Menu**:
        - W [frontend/src/components/connect-menu/menu.config.ts](frontend/src/components/connect-menu/menu.config.ts:0:0-0:0) w `connectIdMenuConfig.columns[0].items` dodaj:
            - `{ id: 'face', label: 'Face', icon: '🙂', method: 'face', action: 'method-change' }`
    - **Efekt**:
        - Klik w menu ustawi `currentMethod='face'` w [ConnectIdView](cci:2://file:///home/tom/github/zlecenia/c2004/frontend/src/modules/connect-id/connect-id.view.ts:7:0-497:1), co wywoła [pageManager.loadPage('face')](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/modules/connect-id/pages/index.ts:36:2-73:3) i załaduje nową stronę. Brak zmian w [main.ts](frontend/src/main.ts:0:0-0:0).

- **2) Nowa sekcja/kolumna w module 3‑poziomowym (np. Connect‑Config)**
    - **Menu**:
        - W `connectConfigMenuConfig.columns` dodaj nową kolumnę i elementy z akcjami `section-change`/`subsection-change`.
    - **Reakcja w widoku modułu**:
        - Nasłuchuj zdarzeń `sectionChange`/`menuAction` (lub własnych), aby załadować odpowiednią zawartość w kontenerze modułu.

- **3) Nowy moduł w aplikacji (np. “connect-logs”)**
    - **Menu główne**:
        - Dodaj pozycję do `mainNavigationConfig` (`id`, `label`, `icon`, `module`, `route`, `action: 'navigate'`).
    - **Widok modułu**:
        - Utwórz `connect-logs.module.ts`/`connect-logs.view.ts` (analogicznie do istniejących modułów).
        - Dodaj gałąź w [loadModule(...)](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/main.ts:479:0-529:1) w [main.ts](frontend/src/main.ts:0:0-0:0) – import dynamiczny, render widoku.
    - **Menu modułu (opcjonalnie)**:
        - Dodaj `connectLogsMenuConfig` i wpis w `menuRegistry.moduleColumns`.
        - Dodaj wpis w `routeMenuMappings`.

---

## Konwencje i dobre praktyki

- **Pola [MenuItem](cci:2://file:///home/tom/github/zlecenia/c2004/frontend/src/components/connect-menu/menu.interfaces.ts:2:0-16:1)**: używaj `action` zgodnie z semantyką:
    - `navigate` – zmiana modułu/ścieżki (wymaga `route`/`module`).
    - `section-change` – wybór sekcji (kolumna 1).
    - `method-change` – wybór metody (kolumna 2).
    - Inne specyficzne: `report-type-change`, `view-change`, `subsection-change`.
- **Style**: komponenty dołączają style dynamicznie (unikaj inline w nowych implementacjach; trzymaj się wzorca [getStyles()](cci:1://file:///home/tom/github/zlecenia/c2004/frontend/src/modules/connect-reports/month-view.component.ts:258:2-457:3)).
- **Typy/TS**: unikaj `any`; nieużywane parametry prefixuj `_`; dodawaj jawne typy zwrotne (przykład: [index.ts](frontend/src/modules/index.ts:0:0-0:0)).
- **Routing**: MenuManager aktualizuje URL dla `section`; dla metod logikę obsługuje widok (np. [ConnectIdView](cci:2://file:///home/tom/github/zlecenia/c2004/frontend/src/modules/connect-id/connect-id.view.ts:7:0-497:1)).

---

## Przykłady (skrócone)

- **Dodanie metody w Connect‑ID – wpis w menu** ([menu.config.ts](frontend/src/components/connect-menu/menu.config.ts:0:0-0:0)):
```ts
{ id: 'face', label: 'Face', icon: '🙂', method: 'face', action: 'method-change' }
```

- **Rejestracja strony** ([modules/connect-id/pages/index.ts](frontend/src/modules/connect-id/pages/index.ts:0:0-0:0)):
```ts
import { UserFacePage } from './user-face.page';
export const ConnectIdPages = {
  ...,
  face: UserFacePage
};
```

---

## Podsumowanie
- **Dostarczono specyfikację** aktualnego systemu: strukturę menu, kontrakty typów, kluczowe klasy/funkcje, przepływ zdarzeń oraz integrację z [main.ts](frontend/src/main.ts:0:0-0:0).
- **Dodano przewodnik rozbudowy**: jak dodać nowe metody/strony i moduły oraz jak je powiązać z menu.
- Jeśli chcesz, mogę przygotować szablon nowej strony (np. `user-face.page.ts`) i dopisać ją do konfiguracji menu.