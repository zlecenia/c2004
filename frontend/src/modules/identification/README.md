# Identification (Core)

## Cel modułu
- Podstawowy moduł identyfikacyjny (warstwa bazowa dla systemu), inicjalizowany na starcie.

## Kluczowe pliki
- `identification.module.ts` – inicjalizacja modułu.
- `identification.service.ts` – serwis i konfiguracja (enableRFID/QR/Barcode/Manual, debug).
- `identification.view.ts` – podstawowy widok.

## Integracja
- Moduł bazowy, bez dedykowanego menu modułowego; integruje się z pozostałymi modułami.

## Zdarzenia
- Logi inicjalizacji i konfiguracji (widoczne w konsoli podczas startu aplikacji).
