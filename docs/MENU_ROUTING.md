# MENU Routing and Synchronization

This document describes how the URL path is synchronized with the menu selection and how default selections are applied, with examples from Connect Workshop and Connect ID.

## Overview

- **Menu system** is configured in `frontend/src/components/connect-menu/menu.config.ts` and rendered by `ConnectMenuComponent`.
- **MenuManager** (`frontend/src/components/connect-menu/menu.manager.ts`) is responsible for:
  - Creating menus (`createMenu` / `createModuleMenu`).
  - Handling global actions and 3-level navigation.
  - Synchronizing active items based on URL (`updateMenuForRoute`).
  - Reflecting current selection back into URL on user interaction.
- **Routing** in `frontend/src/main.ts` normalizes some module URLs and triggers initial module load.

## URL → Menu synchronization

- When a menu is active, `MenuManager.updateMenuForRoute(currentRoute)` parses path segments beyond the module base route and applies active states per column.
- Logic:
  - Find mapping for the route in `routeMenuMappings`.
  - Parse remaining segments into a list.
  - For each column in the menu configuration, try to match an item using `id`, `section`, `method`, `subsection` or `action`.
  - Call `menu.updateActiveItem(found.id, column.id)` for matched columns.
  - If nothing matches, fall back to `activeItems` defined in the mapping (defaults).

## Menu → URL synchronization

- On `section-change`, `method-change` and generic `menuAction`, `MenuManager` builds a URL from the current selection and updates the browser URL via `replaceState`.
- `updateUrlForSelection(menuId)` builds the URL as:
  - `base = mapping.route`
  - `segments = selection from each column (first column item ID/section, second column method, etc.)`
  - New URL = `base/segments.join('/')`
- After updating the URL, a `routeChanged` event is emitted with `{ route: newPath }`.

## Normalization of URLs (Connect Workshop)

- In `frontend/src/main.ts`, `handlePathChange()` normalizes incomplete routes for Connect Workshop:
  - `/connect-workshop` → `/connect-workshop/requests/search`
  - `/connect-workshop/requests` → `/connect-workshop/requests/search`
- This ensures both columns are selected and the "Szukaj" item is active.

## Normalization of URLs (Connect Data)

- In `frontend/src/main.ts`, `handlePathChange()` also normalizes incomplete routes for Connect Data:
  - `/connect-data` → `/connect-data/dispositions/import`
  - `/connect-data/<section>` → `/connect-data/<section>/import`
- This keeps section and action present in the URL and allows content to load deterministically.

## Initial activation in module views

- After creating a module menu with `createModuleMenu`, call `getMenuManager().updateMenuForRoute(window.location.pathname)` to apply active states corresponding to the current URL.
- This is implemented in `ConnectWorkshopView` (`frontend/src/modules/connect-workshop/connect-workshop.view.ts`).
- The same pattern is used by:
  - `ConnectDataView` (`frontend/src/modules/connect-data/connect-filter.view.ts`)
  - `ConnectReportsView` (`frontend/src/modules/connect-reports/connect-reports.view.ts`)

## Sidebar active state fix

- `ConnectMenuComponent.updateActiveItem` supports both column-wrapped menus and sidebars (which don’t use `#<columnId>-column`). For sidebars, it now scopes the active toggle to the sidebar root container.

## Extending the system

1. **Add a new method/section**:
   - Add a `MenuItem` to the appropriate column in `menu.config.ts`.
   - Update your PageManager or View to handle the new selection.

   - Add a button to `mainNavigationConfig` with `module` and `route`.
   - Add a `routeMenuMappings` entry.
   - Implement the module view and loading branch in `main.ts` (`loadModule`).

3. **Default selections**:
  - For modules needing default method/section, normalize the path in `handlePathChange()`.
  - Optionally set defaults in `routeMenuMappings.activeItems`.

## Connect Reports specifics

- Route shape: `/connect-reports/<section>/<view>`
  - `<section>` comes from the first column (Report types): `executed | planned | export`.
  - `<view>` comes from the second column (View options): `week | month | year | custom`.
- Menu config: `frontend/src/components/connect-menu/menu.config.ts`
  - Column `report-types`: items use `section`.
  - Column `view-options`: items expose `method` to ensure URL uses semantic segment (e.g., `month`), not generic `action`.
- View handling: `frontend/src/modules/connect-reports/connect-reports.view.ts`
  - Uses column-aware updates: first column sets `currentSection`, second sets `currentView`.
  - Listens to `connectreports:update-state` to update content on intra-module URL changes.
- Page manager keys: `section-view` (e.g., `planned-month`). See `frontend/src/modules/connect-reports/pages/index.ts` for the registry.

### Adding a 3rd column (optional)

- If a third-level refinement (e.g., filters for planning) is needed, add a third column to `connectReportsMenuConfig` and rely on `MenuManager.updateDependentColumns()` to toggle it when appropriate.
- Example (conceptual):
  - Column 1: `report-types` (executed/planned/export)
  - Column 2: `view-options` (week/month/year/custom)
  - Column 3: `planning-filters` (only visible when `planned` is active)
- To make column 3 visible conditionally for `planned` only, either:
  - Implement a small hook in `ConnectReportsView` to call `getMenuManager().getMenu('connect-reports-menu')?.toggleColumn('planning-filters', isPlanned)`, or
  - Extend `MenuManager.updateDependentColumns()` with simple rules for `connect-reports-menu`.

## Events

- `routeChanged` — emitted after `MenuManager` updates URL to reflect selection changes.
- `menuContentUpdate`, `sectionChange`, `methodChange`, `menuAction` — emitted during menu interactions.

## Files touched

- `frontend/src/components/connect-menu/connect-menu.component.ts` — sidebar active-state fix.
- `frontend/src/components/connect-menu/menu.manager.ts` — bidirectional URL sync.
- `frontend/src/components/connect-menu/menu.config.ts` — Connect Data and Connect Reports columns, URL-semantic segments.
- `frontend/src/modules/connect-workshop/connect-workshop.view.ts` — initial URL → menu sync.
- `frontend/src/modules/connect-data/connect-filter.view.ts` — URL↔menu sync, intra-module updates.
- `frontend/src/modules/connect-reports/connect-reports.view.ts` — URL↔menu sync, intra-module updates.
- `frontend/src/main.ts` — connect-workshop and connect-data URL normalization, intra-module state updates for multiple modules.
