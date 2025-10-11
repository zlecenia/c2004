// frontend/src/components/connect-menu/menu.interfaces.ts

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  action?: string;
  module?: string;
  section?: string;
  method?: string;
  subsection?: string;
  parentCategory?: string;
  route?: string;
  active?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface MenuColumn {
  id: string;
  title: string;
  items: MenuItem[];
  width?: string;
  className?: string;
  visible?: boolean;
}

export interface MenuConfiguration {
  id: string;
  type: 'sidebar' | 'columns' | 'horizontal';
  columns: MenuColumn[];
  theme?: 'dark' | 'light' | 'auto';
  layout?: 'compact' | 'normal' | 'spacious';
}

export interface MenuEventData {
  action: string;
  item: MenuItem;
  column: MenuColumn;
  event: Event;
}

export type MenuEventHandler = (data: MenuEventData) => void;

export interface MenuCallbacks {
  onItemClick?: MenuEventHandler;
  onColumnChange?: (columnId: string) => void;
  onMenuReady?: (menuId: string) => void;
}

// Predefined menu configurations for common patterns
export interface MenuRegistry {
  mainNavigation: MenuConfiguration;
  moduleColumns: Record<string, MenuConfiguration>;
  actionMenus: Record<string, MenuConfiguration>;
}

export interface RouteMenuMapping {
  route: string;
  menuId: string;
  activeItems?: string[];
}
