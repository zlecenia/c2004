# Changelog

## [1.2.4] - 2025-10-09 (Simplified Architecture)

### 🧹 Simplified
- **Redis Removal** - Uproszczenie architektury dla lekkiej aplikacji
  - 🚫 Usunięcie Redis z docker-compose.yml i docker-compose.dev.yml
  - 🧠 Przejście na in-memory cache dla prostej aplikacji
  - 📦 Usunięcie redis z requirements.txt (zmniejszenie zależności)
  - 🔧 Aktualizacja diagnostyki na simple memory cache
  - 🎯 Usunięcie portu 6379 z port-manager i .env.example

### 🔧 Enhanced
- **Simplified Diagnostics** - Diagnostyka bez Redis
  - 📊 Cache status: "in_memory" zamiast Redis metrics
  - ⚡ Szybsza diagnostyka bez zewnętrznych zależności
  - 💾 Monitoring pamięci systemowej zamiast Redis memory
  - 🎯 Lepiej dopasowane do małych aplikacji

### 📦 Reduced Dependencies
- **Backend:** Usunięcie `redis==4.6.0` dependency
- **Docker:** Brak kontenera Redis (szybsze startowanie)
- **Ports:** Tylko niezbędne porty (8100, 8101, 3000)
- **Memory:** Mniejsze zużycie RAM bez Redis container

### 🚀 Performance
- **Faster Startup** - Brak oczekiwania na Redis container
- **Less Memory Usage** - Brak Redis daemon (>50MB oszczędności)
- **Simpler Architecture** - Łatwiejsze deployment i maintenance
- **Quick Development** - Szybsze `make dev` bez Redis dependencies

---

## [1.2.3] - 2025-10-09 (Advanced Service Management)

### ✨ Added
- **Advanced Service Management** - Kompletny system zatrzymywania usług
  - 🛑 `make stop` - zatrzymuje WSZYSTKIE usługi projektu
  - 🐳 `make stop-docker` - zatrzymuje tylko kontenery Docker
  - 🔌 `make stop-ports` - zatrzymuje procesy na portach projektu
  - 🐍 `make stop-python` - zatrzymuje procesy Python związane z projektem
  - 📊 `make status` - pokazuje status wszystkich usług

- **Port Management System** - Zarządzanie portami z .env
  - 📝 Rozszerzona konfiguracja portów w `.env.example`
  - 🔍 Automatyczne wykrywanie procesów na portach projektu
  - 🎯 Graceful shutdown z fallback na force kill
  - 📊 Szczegółowy status portów i procesów

- **Advanced Port Manager Script** - `scripts/port-manager.sh`
  - 🎨 Kolorowe output z emoji dla czytelności
  - 🔍 Wykrywanie procesów po PID i nazwie procesu
  - 🧹 Automatyczne czyszczenie zasobów (networks, temp files)
  - ⚡ Graceful shutdown z timeout przed force kill
  - 📋 Multiple operation modes (stop, status, ports, docker, python)

### 🔧 Enhanced
- **Makefile Commands** - Nowe komendy zarządzania
  - `make stop` - Complete project shutdown
  - `make status` - Project services overview  
  - `make docker-status` - Docker-specific status
  - Enhanced help menu with new commands

### 📦 Configuration
- **Extended .env Configuration** - Więcej portów do zarządzania
  ```env
  FRONTEND_PORT=8100
  BACKEND_PORT=8101
  REDIS_PORT=6379
  DEV_FRONTEND_PORT=3000
  TRAEFIK_PORT=80
  TRAEFIK_DASHBOARD_PORT=8080
  VITE_DEV_PORT=5173
  DOCS_PORT=8102
  METRICS_PORT=8103
  DEBUG_PORT=5678
  ```

### 🚀 Performance
- **Smart Process Detection** - Wykrywa procesy po wzorcach nazw
- **Resource Cleanup** - Automatyczne czyszczenie sieci i plików temp
- **Parallel Operations** - Równoczesne zatrzymywanie różnych typów usług

---

## [1.2.2] - 2025-10-09 (Diagnostics)

### ✨ Added
- **System Diagnostics** - Kompletny system diagnostyki połączeń
  - 🔍 Endpoint `/api/diagnostics` - pełna diagnostyka systemu
  - ⚡ Endpoint `/api/diagnostics/quick` - szybka kontrola zdrowia
  - 🖥️ Monitorowanie zasobów systemowych (CPU, RAM, Disk)
  - 🔴 Status Redis, Database, External Services
  - 📊 Rekomendacje systemowe na podstawie diagnostyki
  - 🐳 Status kontenerów Docker
  - 🌐 Test connectivity wszystkich serwisów

- **Diagnostic Script** - Automatyczny skrypt diagnostyczny
  - 🚀 Automatyczne uruchamianie po `make dev`
  - 🎨 Kolorowe output z emoji dla czytelności
  - ⏱️ Inteligentny retry mechanism
  - 📋 Szczegółowe raporty z rekomendacjami
  - 🔧 Integration z Makefile (`make diagnostics`, `make quick-check`)

- **Backend Dependencies** - Nowe zależności diagnostyczne
  - `redis==4.6.0` - Redis connectivity
  - `psutil==5.9.5` - System resources monitoring
  - `httpx==0.24.1` - HTTP async client for service checks

### 🚀 Performance
- **Real-time Monitoring** - Monitoring w czasie rzeczywistym
- **Async Diagnostics** - Równoległe testy wszystkich serwisów
- **Quick Health Checks** - Szybkie kontrole (<100ms)

### 📦 Integration
- **Make Dev Enhancement** - `make dev` teraz automatycznie uruchamia diagnostykę
- **Docker Integration** - Pełna integracja z kontenerami Docker
- **Service Discovery** - Automatyczne wykrywanie dostępnych serwisów

---

## [1.2.1] - 2025-10-09 (Hotfix)

### 🔧 Fixed
- **Docker Build Issues** - Naprawiono błędy TypeScript w kontenerze Docker
- **Icon System Fallback** - Dodano emoji fallback gdy Lucide nie jest dostępne
- **Development Server** - Uruchomiono dev server na porcie 3000 z hot reload
- **TypeScript Errors** - Naprawiono wszystkie błędy kompilacji TS
- **Unused Variables** - Usunieto nieużywane zmienne i importy

### 📦 Dependencies
- **Emoji Fallback System** - Graceful degradation gdy brakuje SVG ikon
- **Vite Hot Reload** - Development server działa poprawnie
- **TypeScript Fixes** - Wszystkie błędy kompilacji naprawione

### 🚀 Performance
- **Faster Development** - Hot reload bez problemów z zależnościami
- **Lightweight Icons** - Emoji jako backup dla SVG

---

## [1.2.0] - 2025-10-09

### ✨ Added
- **ConnectConfig Module** - Kompletna konfiguracja systemu
  - 🔧 Sekcja Urządzenia: Konfiguracja RFID, QR/Barcode, tabela urządzeń
  - 🔒 Sekcja Bezpieczeństwo: Uwierzytelnianie, szyfrowanie, uprawnienia użytkowników
  - 🌐 Sekcja Etykiety: System zarządzania tłumaczeniami (PL/EN/DE/FR)
  - 🏠 Sekcja System: Ustawienia RFID i bazy danych
  - 🌐 Sekcja Sieć: Konfiguracja IP, portów i CORS
  - 💾 Sekcja Backup: Import/eksport konfiguracji

- **Professional Icon System** - Lucide SVG Icons
  - 📦 Zainstalowano Lucide Icons (1400+ profesjonalnych ikon)
  - 🎨 Utworzono komponent IconComponent z TypeScript support
  - 🔄 Zastąpiono emoji ikonami SVG w głównym menu
  - 📏 Skalowalne ikony SVG (16px-64px bez utraty jakości)
  - 🎯 Mapowanie ikon dla różnych kontekstów (menu, status, akcje)

- **UI/UX Improvements**
  - 👥 Profile użytkowników w ConnectID z wirtualną klawiaturą
  - 🎯 Dynamiczne wyniki wyszukiwania w ConnectWorkshop
  - 🧪 Kompletne protokoły testowe w ConnectTest (6 typów testów)
  - 🔄 System routingu URL dla wszystkich modułów
  - 📊 Prawa kolumna z czujnikami ciśnienia w ConnectTest

- **Testing Infrastructure**
  - 🧪 Kompletne testy backend (structure, API, identification)
  - 🔧 Testy frontend (structure, modules, registry)
  - 📋 Makefile z targets: test, test-backend, test-frontend
  - ✅ Wszystkie testy przechodzą pomyślnie

### 🔧 Fixed
- 🔐 Naprawiono npm audit vulnerabilities (esbuild, vite)
- 🔄 Problem z podwójnym kliknięciem w ConnectConfig
- 📋 Problem z przełączaniem obiektów w ConnectData  
- 🎯 Problem z wyświetlaniem kolumny "Czynności" w ConnectTest
- 🔍 Problem z przełączaniem wyników wyszukiwania w ConnectWorkshop

### 🚀 Enhanced
- ⚡ Zaktualizowano Vite do v7.1.9 (breaking changes)
- 📦 Dodano nowe zależności: lucide (icons)
- 🧪 Rozszerzono system testów o pytest-asyncio, httpx, attrs
- 📝 Usprawnienie struktury testów frontend z custom test runner

### 🎨 UI/UX Changes
- 🖼️ Profesjonalne ikony SVG zamiast emoji
- 📱 Responsywne tabele konfiguracyjne
- 🎨 Kolorowe badge'y statusu (online/offline/granted/denied)
- 📏 Kompaktowy layout dla ekranów dotykowych 1280×400px
- 🌐 System językowy z obsługą 4 języków

### 📊 Configuration Management
- **Urządzenia**: Port szeregowy, Baud Rate, Timeout, Auto-detect
- **Kamery**: Urządzenie, rozdzielczość, jakość, auto-focus
- **Bezpieczeństwo**: Timeout sesji, długość hasła, próby logowania
- **Szyfrowanie**: AES-128/256, HTTPS, API Keys, JWT tokens
- **Uprawnienia**: Matryca uprawnień użytkowników (Manager/Technik/Operator)
- **Języki**: Edytowalna tabela etykiet z kategoriami

---

## [1.1.0] - 2025-10-08

### ✨ Added
- **Registry System** - Centralne zarządzanie modułami
  - `component.registry.ts` - Rejestr komponentów
  - `module.registry.ts` - Metadata modułów  
  - `route.registry.ts` - Definicje tras
  - `service.manifest.ts` - Konfiguracja serwisów

- **Module Architecture**
  - ConnectID: Identyfikacja użytkowników (user/device/group/test)
  - ConnectTest: System testowania z protokołami
  - ConnectData: Zarządzanie danymi obiektów
  - ConnectWorkshop: Zarządzanie zgłoszeniami serwisowymi
  - ConnectConfig: Konfiguracja systemu (w rozwoju)

### 🔧 Fixed
- Migracja z c2002 do c2004 z zachowaniem funkcjonalności
- Struktura katalogów frontend/backend
- System modułów z lazy loading

### 📦 Infrastructure  
- Docker Compose z Redis, FastAPI, Vite
- Makefile z automatyzacją (install, dev, test, clean)
- Environment configuration z walidacją
- Health checks dla wszystkich serwisów

---

## [1.0.0] - 2025-10-07

### 🎉 Initial Release
- **Backend**: FastAPI + Redis + SQLAlchemy
- **Frontend**: Vite + TypeScript + Modular Architecture
- **Docker**: Konteneryzacja z docker-compose
- **Testing**: Struktura testów backend i frontend
- **Deployment**: Makefile automation

### 🏗️ Architecture
- Modular frontend architecture
- RESTful API z FastAPI
- Redis caching layer
- PostgreSQL database support
- Health monitoring endpoints

### 📱 Modules
- Identification system base
- Basic routing and navigation  
- Component registry system
- Service configuration management

---

## Konwencje

### Semantic Versioning
- **MAJOR** - Breaking changes
- **MINOR** - New features (backward compatible) 
- **PATCH** - Bug fixes (backward compatible)

### Emoji Legend
- ✨ New features
- 🔧 Bug fixes  
- 🚀 Performance improvements
- 📦 Dependencies
- 🎨 UI/UX changes
- 🧪 Testing
- 📝 Documentation
- 🔐 Security
- 🌐 Internationalization
