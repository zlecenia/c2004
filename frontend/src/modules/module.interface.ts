// frontend / src / modules / module.interface.ts
import { z } from 'zod';

export const ModuleMetadataSchema = z.object({
  name: z.string(),
  version: z.string(),
  dependencies: z.array(z.string()).default([]),
  routes: z.array(z.object({
    path: z.string(),
    component: z.string()
  })).optional()
});

export type ModuleMetadata = z.infer < typeof ModuleMetadataSchema>;

export interface Module {
  metadata: ModuleMetadata;
  initialize(): Promise < void>;
  destroy?(): Promise < void>;
  healthCheck?(): Promise < boolean>;
}
