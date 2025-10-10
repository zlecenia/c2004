/// <reference types="vite / client" />

interface ImportMetaEnv {
  readonly NODE_ENV: string
  readonly VITE_API_URL: string
  readonly VITE_WS_URL: string
  readonly VITE_CDN_URL: string
  readonly VITE_LOG_LEVEL: string
  readonly VITE_ENABLE_RFID: string
  readonly VITE_ENABLE_QR: string
  readonly VITE_ENABLE_BARCODE: string
  readonly VITE_ENABLE_MANUAL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
