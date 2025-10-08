// shared/types/common.types.ts
export type ServiceRole = 'operator' | 'manager' | 'admin' | 'configurator';

export interface User {
  id: string;
  username: string;
  email: string;
  role: ServiceRole;
  active: boolean;
  skills?: string[];
}

export interface Device {
  id: string;
  name: string;
  type: string;
  serial_number: string;
  status: 'active' | 'inactive' | 'maintenance' | 'retired';
  client_id?: string;
  location_id?: string;
  rfid_uid?: string;
}

export interface Protocol {
  id: string;
  device_id: string;
  component_id?: string;
  scenario_id?: string;
  type: 'service' | 'test_c20' | 'manual_test' | 'notes';
  status: 'planned' | 'in_progress' | 'completed' | 'failed';
  technician_id: string;
  scheduled_date: string;
  completed_date?: string;
  notes: string;
  results?: Record<string, any>;
}

export interface WorkshopRequest {
  id: string;
  device_id: string;
  type: 'maintenance' | 'repair' | 'calibration' | 'inspection';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  description: string;
  technician_id?: string;
  created_at: string;
  due_date?: string;
}

export interface Client {
  id: string;
  name: string;
  address: string;
  contact_person: string;
  email: string;
  phone: string;
  active: boolean;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}
