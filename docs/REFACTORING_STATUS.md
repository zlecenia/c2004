- **Styles (compact menu items)**
  - File: `frontend/src/components/connect-menu/menu.styles.ts`
  - Column items are now compact, horizontal (icon left, label right), reduced padding and min-height.
  - `menu.templates.ts` cleaned inline icon sizing.

- **Backend Pydantic v1 compatibility**
  - File: `backend/app/models/identification.py`
  - Replaced `field_validator`/`ConfigDict` with v1 `@validator`/`class Config` and adjusted validator signature.

# Refactoring Status (2025-10-14)

This document captures the current status of the ongoing frontend refactor (menus, routing, page managers) and the Menu & Routing Designer groundwork.

## Scope
- Menu system and routing integration across modules.
- Connect-Data and Connect-Reports content reload fixes and URL↔menu sync.
- Runtime dynamic pages registry (to support a Designer without rebuilds).

## Completed changes
- **MenuManager (Designer-ready and robust routing)**
  - File: `frontend/src/components/connect-menu/menu.manager.ts`
  - Added Designer APIs and persistence:
    - `getRegistrySnapshot()`, `updateModuleMenu()`, `updateMainNavigation()`, `setRouteMappings()`
    - localStorage: `menuDesigner:overrides`
    - Initialization loads overrides once (`overridesLoaded` guard)
  - URL segment builder prefers semantic fields `section | method | subsection | action | id`.
  - Skips columns with `contributesToRoute === false` when building URLs.
  - Emits `routeChanged` after URL updates; listens and syncs menus on popstate/routeChanged.

- **Menu configuration**
  - File: `frontend/src/components/connect-menu/menu.config.ts`
  - Connect-Reports (`connectReportsMenuConfig`):
    - Column `report-types`: executed | planned (removed export).
    - Column `view-options`: week | month | year | custom | planning (uses `method`).
    - Column `planning-options` (3rd column): initially hidden; `contributesToRoute: false`.
  - Connect-Data (`connectDataMenuConfig`): removed Export/Import/Sync from `actions-column`. `search` is default active.
  - Connect-Workshop (`connectWorkshopMenuConfig`): removed Export/Import/Sync from `actions-column` (now: search, new-request only).
  - Route defaults: `/connect-data` now normalizes to `/connect-data/dispositions/search`.

- **Connect-Reports view logic**
  - File: `frontend/src/modules/connect-reports/connect-reports.view.ts`
  - Column-aware updates:
    - `report-types` sets `currentSection` from `item.section`.
    - `view-options` sets `currentView` from `item.method || item.id`.
  - Initial menu sync from URL via `getMenuManager().updateMenuForRoute(...)`.
  - Intra-module router sync via `connectreports:update-state`.
  - `planning` view reveals 3rd column and does not reload main content (by design).

- **Connect-Reports page manager overlay (dynamic pages)**
  - File: `frontend/src/modules/connect-reports/pages/index.ts`
  - Checks `DynamicPagesRegistry` first; falls back to static pages.
  - `getAvailablePages()` merges static + dynamic keys.

- **Connect-Data view/state and page manager overlay**
  - File: `frontend/src/modules/connect-data/connect-filter.view.ts` (earlier refactor): initial URL state, router sync (`connectdata:update-state`) and column-aware handling.
  - File: `frontend/src/modules/connect-data/pages/index.ts` now overlays dynamic pages like Connect-Reports.

- **Main router updates**
  - File: `frontend/src/main.ts`
  - Correct intra-module updates for `connect-reports` (selector `.connect-reports-compact`) with `connectreports:update-state` payload `{ reportType, view }`.
  - Connect-Workshop: friendly URL aliases added.
    - URL → internal: `request|service|disposition` → `requests|services|dispositions`, `filter|create` → `search|new-request`.
    - Internal → URL: `requests|services|dispositions` → `request|service|disposition`, `search|new-request` → `filter|create`.
    - Defaults to `/connect-workshop/request/filter` when section/method missing.
  - Listens for `routeChanged` and normalizes module URLs (connect-data + workshop defaults present).

- **Dynamic Pages Registry**
  - File: `frontend/src/shared/dynamic-pages.registry.ts`
  - Runtime store for pages keyed by `module` + `pageKey` (`<section>-<view>`), with localStorage persistence.
  - APIs: `setPage`, `removePage`, `getPage`, `listPages`, `load()`.

- **Docs**
  - Files:
    - `docs/MENU_ROUTING.md` — connect-data normalization, connect-reports routing semantics, optional 3rd column notes.
    - `frontend/src/modules/connect-reports/README.md` — columns, URL shape, page keys, events.

- **TypeScript config**
  - File: `frontend/tsconfig.json`
  - Temporarily relaxed unused checks to unblock build while WIP pages exist:
    - `noUnusedLocals: false`, `noUnusedParameters: false`.

## In progress / planned
- **Menu & Routing Designer module** (`/menu-designer`)
  - New module with tree editor (menus, columns, items), route mappings editor, dynamic page editor with live preview.
  - Save to localStorage via `MenuManager` Designer APIs and `DynamicPagesRegistry`.
  - Add sidebar entry and route loader in `main.ts`.

- **Export/Import Designer state**
  - JSON export/import for menus, route mappings, dynamic pages.

- **Validation and Tests**
  - Validate collisions on renames (IDs/segments).
  - Unit tests for Designer persistence and overlay logic.

## How to verify (quick)
- Connect-Reports:
  - `/connect-reports/executed/week` → click `Planowane` → URL `/connect-reports/planned/week` and content `planned-week`.
  - Change view to `Miesiąc` → `planned-month` loads.
  - Select `Planowanie` (col 2) → 3rd column appears (`planning-options`); content stays (no reload).
- Connect-Data:
  - `/connect-data/services/import` → click objects/actions; URL segments reflect `section`/`method` and content reloads accordingly.
- Dynamic Pages:
  - Inject a page via `DynamicPagesRegistry.setPage('connect-reports','executed-week','<div>TEST</div>')` in console and reload the route → dynamic HTML should render.

## Known notes
- If you still see logs like `...-report-type-change`, hard-refresh to bypass cached bundle.
- Re-enable strict `noUnused*` once we stabilize modules or exclude specific legacy files.
