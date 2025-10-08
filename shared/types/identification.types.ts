// shared/types/identification.types.ts
export type IdentificationType = 'user' | 'device' | 'group' | 'test';
export type IdentificationMethod = 'rfid' | 'qr' | 'barcode' | 'manual';

export interface IdentificationRequest {
  type: IdentificationType;
  value: string;
  method: IdentificationMethod;
}

export interface IdentificationResponse {
  id: string;
  name: string;
  type: IdentificationType;
  method: IdentificationMethod;
  metadata: Record<string, any>;
  timestamp: string;
}

export interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy';
  service: string;
  version: string;
  timestamp: string;
  checks: Record<string, string>;
}

export interface ErrorResponse {
  error: string;
  detail?: string;
  timestamp: string;
}
