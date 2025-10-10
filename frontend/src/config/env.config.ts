// frontend/src/config/env.config.ts
import { z } from 'zod';

/**
 * Environment Configuration Schema
 * Validates all env vars at startup
 */
const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // API Configuration
  VITE_API_URL: z.string().url(),
  VITE_WS_URL: z.string().startsWith('ws://').or(z.string().startsWith('wss://')),
  VITE_CDN_URL: z.string().url(),
  
  // Logging
  VITE_LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  
  // Feature Flags
  VITE_ENABLE_RFID: z.string().transform(val => val === 'true').default('true'),
  VITE_ENABLE_QR: z.string().transform(val => val === 'true').default('true'),
  VITE_ENABLE_BARCODE: z.string().transform(val => val === 'true').default('true'),
  VITE_ENABLE_MANUAL: z.string().transform(val => val === 'true').default('true'),
});

export type Env = z.infer<typeof EnvSchema>;

/**
 * Validate and parse environment variables
 * Throws detailed error if validation fails
 */
function validateEnv(): Env {
  try {
    return EnvSchema.parse(import.meta.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.errors.map(err => 
        `❌ ${err.path.join('.')}: ${err.message}`
      );
      
      throw new Error(
        `Environment validation failed:\n${messages.join('\n')}\n\n` +
        `Check your .env file against .env.example`
      );
    }
    throw error;
  }
}

// Export validated config
export const env = validateEnv();

// Log configuration in development
if (env.NODE_ENV === 'development') {
  console.log('✅ Environment validated:', {
    NODE_ENV: env.NODE_ENV,
    API_URL: env.VITE_API_URL,
    WS_URL: env.VITE_WS_URL,
    LOG_LEVEL: env.VITE_LOG_LEVEL,
    features: {
      RFID: env.VITE_ENABLE_RFID,
      QR: env.VITE_ENABLE_QR,
      Barcode: env.VITE_ENABLE_BARCODE,
      Manual: env.VITE_ENABLE_MANUAL
    }
  });
}
