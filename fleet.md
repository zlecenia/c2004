# 🔄 Plan Aktualizacji Projektu ConnectDisplay → Fleet Management System

## 📊 Analiza Obecnego Stanu vs. Docelowa Architektura

### ✅ Co już mamy (Działające)
1. **Frontend ConnectDisplay** z 4 modułami:
    - ConnectID (identyfikacja)
    - ConnectFilter (filtrowanie)
    - ConnectWorkshop (warsztat)
    - ConnectTest (testy)

2. **Backend podstawowy**:
    - FastAPI z endpointami identyfikacji
    - Pydantic models
    - Health checks

3. **Infrastruktura**:
    - Docker + docker-compose
    - Makefile z poleceniami
    - Konfiguracja Zod (frontend) + Pydantic (backend)

### ❌ Czego brakuje (Do zaimplementowania)

1. **Podział backend na 3 mikrousługi**:
    - Fleet Data Manager (FDM)
    - Fleet Workshop Manager (FWM)
    - Fleet Config Manager (FCM)

2. **Dodatkowe frontend clients**:
    - Connect Data Manager
    - Connect Workshop Manager
    - Connect Config Manager

3. **Shared components**:
    - Centralne typy TypeScript
    - Współdzielone komponenty UI
    - Universal ConnectID v2.0.0

4. **Dane z Excel**:
    - Migracja 17 plików Excel do systemu
    - Skrypty seed do bazy danych

---

## 🎯 Strategia Aktualizacji (Etapowa Migracja)

### Etap 1: Restrukturyzacja bez Breaking Changes (Tydzień 1)
**Cel**: Przenieść istniejący kod do nowej struktury bez zmiany funkcjonalności

```bash
# Nowa struktura katalogów
fleet-management-system/
├── services/
│   ├── backend/
│   │   └── fleet-data-manager/      # ← Obecny backend
│   └── frontend/
│       └── connect-display/         # ← Obecny frontend
├── shared/                          # ← Nowe
├── infrastructure/                  # ← Nowe
└── scripts/                         # ← Nowe (migracja Excel)
```

### Etap 2: Wydzielenie mikrousług (Tydzień 2-3)
**Cel**: Utworzyć FWM i FCM jako osobne usługi

### Etap 3: Dodatkowe frontend clients (Tydzień 4)
**Cel**: Stworzyć dedykowane interfejsy administracyjne

### Etap 4: Migracja danych (Tydzień 5)
**Cel**: Import danych z plików Excel

---

## 📝 Szczegółowy Plan Działania

### 🔧 ETAP 1: Restrukturyzacja (Priorytet: WYSOKI)

#### 1.1 Przygotowanie nowej struktury

```bash
# Utwórz nową strukturę
mkdir -p services/backend/fleet-data-manager
mkdir -p services/frontend/connect-display
mkdir -p shared/{types,components,utils}
mkdir -p infrastructure/{traefik,nginx,postgres}
mkdir -p scripts/migration
mkdir -p docs/architecture

# Przenieś istniejący kod
mv backend/* services/backend/fleet-data-manager/
mv frontend/* services/frontend/connect-display/
mv shared/* shared/ # (jeśli istnieje)
```

#### 1.2 Aktualizacja docker-compose.yml

**Obecny plik**: `docker-compose.yml` (single service)  
**Docelowy**: Pełna orkiestracja z wszystkimi usługami

```yaml
# docker-compose.yml - ZAKTUALIZOWANY
version: '3.8'

networks:
  fleet-network:
    driver: bridge

volumes:
  fdm-data:
  postgres-data:
  redis-data:

services:
  # ============================================
  # Infrastructure
  # ============================================
  
  postgres:
    image: postgres:15-alpine
    container_name: fleet-postgres
    environment:
      POSTGRES_USER: fleet_user
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-changeme}
      POSTGRES_DB: fleet_db
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./infrastructure/postgres/init.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - fleet-network
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U fleet_user"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: fleet-redis
    command: redis-server --appendonly yes --maxmemory 512mb
    volumes:
      - redis-data:/data
    networks:
      - fleet-network
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 3

  # ============================================
  # Backend Services
  # ============================================
  
  fleet-data-manager:
    build:
      context: ./services/backend/fleet-data-manager
      dockerfile: Dockerfile
    container_name: fdm-backend
    ports:
      - "8200:8000"
    environment:
      - SERVICE_NAME=fleet-data-manager
      - SERVICE_VERSION=1.0.0
      - DATABASE_URL=postgresql://fleet_user:${POSTGRES_PASSWORD:-changeme}@postgres:5432/fleet_db
      - REDIS_URL=redis://redis:6379/0
      - SECRET_KEY=${SECRET_KEY_FDM:-dev-secret-key-fdm}
      - CORS_ORIGINS=["http://localhost:8100","http://localhost:8110"]
    volumes:
      - ./services/backend/fleet-data-manager/app:/app/app
      - fdm-data:/data
    networks:
      - fleet-network
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/api/v1/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    restart: unless-stopped

  # ============================================
  # Frontend Services
  # ============================================
  
  connect-display:
    build:
      context: ./services/frontend/connect-display
      dockerfile: Dockerfile
    container_name: connect-display
    ports:
      - "8100:80"
    environment:
      - VITE_FDM_URL=http://fleet-data-manager:8000
      - VITE_CDN_URL=http://localhost:9000
    volumes:
      - ./services/frontend/connect-display/src:/app/src
    networks:
      - fleet-network
    depends_on:
      - fleet-data-manager
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:80/"]
      interval: 30s
      timeout: 10s
      retries: 3
    restart: unless-stopped

  # ============================================
  # CDN for Shared Components
  # ============================================
  
  cdn:
    image: nginx:alpine
    container_name: fleet-cdn
    ports:
      - "9000:80"
    volumes:
      - ./shared/components:/usr/share/nginx/html/components:ro
      - ./static:/usr/share/nginx/html/static:ro
      - ./infrastructure/nginx/cdn.conf:/etc/nginx/conf.d/default.conf:ro
    networks:
      - fleet-network
    restart: unless-stopped
```

#### 1.3 Aktualizacja Makefile

```makefile
# Makefile - ZAKTUALIZOWANY
.PHONY: help setup migrate build up down logs health

PROJECT_NAME := fleet-management-system

help:
	@echo "╔════════════════════════════════════════════╗"
	@echo "║  Fleet Management System                   ║"
	@echo "╚════════════════════════════════════════════╝"
	@echo ""
	@echo "📦 Setup:"
	@echo "  make setup          - Initial setup"
	@echo "  make migrate-structure - Migrate to new structure"
	@echo ""
	@echo "🐳 Docker:"
	@echo "  make build          - Build all services"
	@echo "  make up             - Start all services"
	@echo "  make down           - Stop all services"
	@echo "  make restart        - Restart all services"
	@echo ""
	@echo "📊 Services:"
	@echo "  make logs-fdm       - Fleet Data Manager logs"
	@echo "  make logs-display   - Connect Display logs"
	@echo ""
	@echo "🏥 Health:"
	@echo "  make health         - Check all services"
	@echo ""

setup:
	@echo "📦 Setting up Fleet Management System..."
	@./scripts/setup.sh

migrate-structure:
	@echo "🔄 Migrating to new structure..."
	@./scripts/migrate-structure.sh

build:
	@echo "🏗️  Building services..."
	@docker-compose build

up: build
	@echo "🚀 Starting services..."
	@docker-compose up -d
	@echo ""
	@echo "✅ Services started:"
	@echo "  Connect Display: http://localhost:8100"
	@echo "  FDM API:         http://localhost:8200/docs"
	@echo ""

down:
	@docker-compose down

restart: down up

logs-fdm:
	@docker-compose logs -f fleet-data-manager

logs-display:
	@docker-compose logs -f connect-display

health:
	@echo "🏥 Checking services..."
	@curl -s http://localhost:8200/api/v1/health | jq '.' || echo "❌ FDM unhealthy"
	@echo ""
	@docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
```

#### 1.4 Skrypt migracji struktury

```bash
#!/bin/bash
# scripts/migrate-structure.sh

echo "🔄 Migrating project structure..."

# Backup
echo "📦 Creating backup..."
tar -czf backup-$(date +%Y%m%d-%H%M%S).tar.gz backend/ frontend/

# Create new structure
echo "📁 Creating new directories..."
mkdir -p services/backend/fleet-data-manager
mkdir -p services/frontend/connect-display
mkdir -p shared/{types,components,utils}
mkdir -p infrastructure/{postgres,nginx,traefik}
mkdir -p scripts/migration

# Move backend
echo "🔧 Moving backend..."
if [ -d "backend" ]; then
    mv backend/* services/backend/fleet-data-manager/ 2>/dev/null || true
    # Aktualizuj import paths w Pythonie
    find services/backend/fleet-data-manager -name "*.py" -type f -exec sed -i 's/from app\./from app./g' {} \;
fi

# Move frontend
echo "🎨 Moving frontend..."
if [ -d "frontend" ]; then
    mv frontend/* services/frontend/connect-display/ 2>/dev/null || true
fi

# Move shared
echo "📦 Moving shared..."
if [ -d "shared" ]; then
    mv shared/* shared/ 2>/dev/null || true
fi

# Update package.json paths
echo "📝 Updating package.json..."
cd services/frontend/connect-display
if [ -f "package.json" ]; then
    # Paths are relative, should work without changes
    npm install
fi
cd ../../..

# Update docker-compose
echo "🐳 Updating docker-compose..."
cp docker-compose.yml docker-compose.yml.backup
cat > docker-compose.yml << 'EOF'
# (wstaw zaktualizowany docker-compose.yml z punktu 1.2)
EOF

# Create .env if not exists
if [ ! -f ".env" ]; then
    echo "📝 Creating .env..."
    cat > .env << 'EOF'
# Database
POSTGRES_PASSWORD=fleet_password_change_in_production

# Backend Services
SECRET_KEY_FDM=your-secret-key-fdm-change-in-production
SECRET_KEY_FWM=your-secret-key-fwm-change-in-production
SECRET_KEY_FCM=your-secret-key-fcm-change-in-production

# Ports
FRONTEND_PORT=8100
FDM_PORT=8200
FWM_PORT=8201
FCM_PORT=8202
EOF
fi

echo "✅ Migration complete!"
echo ""
echo "Next steps:"
echo "1. Review docker-compose.yml"
echo "2. Update .env with your settings"
echo "3. Run: make build"
echo "4. Run: make up"
```

---

### 🏗️ ETAP 2: Wydzielenie Fleet Workshop Manager (Priorytet: ŚREDNI)

#### 2.1 Utworzenie FWM jako osobnej usługi

```bash
# Struktura FWM
services/backend/fleet-workshop-manager/
├── app/
│   ├── config/
│   │   └── settings.py
│   ├── models/
│   │   ├── protocol.py          # Protokoły kontroli
│   │   ├── calendar.py          # Kalendarz
│   │   ├── workshop.py          # Warsztat
│   │   └── order.py             # Zamówienia
│   ├── services/
│   │   ├── protocol_service.py
│   │   ├── calendar_service.py
│   │   └── workshop_service.py
│   ├── api/
│   │   └── v1/
│   │       ├── endpoints/
│   │       │   ├── protocols.py
│   │       │   ├── calendar.py
│   │       │   ├── workshop.py
│   │       │   └── orders.py
│   │       └── router.py
│   └── main.py
├── Dockerfile
└── requirements.txt
```

#### 2.2 Modele dla FWM

```python
# services/backend/fleet-workshop-manager/app/models/protocol.py
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

class ProtocolType(str, Enum):
    SERVICE = "service"              # Serwis urządzenia/komponentu
    TEST_C20 = "test_c20"           # Test C20 (urządzenie/scenariusz)
    MANUAL_TEST = "manual_test"     # Test manualny
    NOTES = "notes"                 # Uwagi

class ProtocolStatus(str, Enum):
    PLANNED = "planned"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    FAILED = "failed"

class ProtocolBase(BaseModel):
    device_id: str
    component_id: Optional[str] = None
    scenario_id: Optional[str] = None
    type: ProtocolType
    status: ProtocolStatus = ProtocolStatus.PLANNED
    technician_id: str
    scheduled_date: datetime
    notes: str = ""

class ProtocolCreate(ProtocolBase):
    pass

class Protocol(ProtocolBase):
    id: str
    created_at: datetime = Field(default_factory=datetime.now)
    completed_at: Optional[datetime] = None
    results: dict = Field(default_factory=dict)
    
    class Config:
        schema_extra = {
            "example": {
                "id": "prot-001",
                "device_id": "dev-001",
                "component_id": "comp-001",
                "type": "service",
                "status": "completed",
                "technician_id": "user-001",
                "scheduled_date": "2025-10-08T10:00:00",
                "notes": "Wymiana uszczelki",
                "results": {"pressure_test": "passed"}
            }
        }
```

#### 2.3 Endpoints dla FWM

```python
# services/backend/fleet-workshop-manager/app/api/v1/endpoints/protocols.py
from fastapi import APIRouter, HTTPException, Depends
from typing import List
from app.models.protocol import Protocol, ProtocolCreate, ProtocolType
from app.services.protocol_service import ProtocolService

router = APIRouter(prefix="/protocols", tags=["protocols"])

@router.post("/create", response_model=Protocol)
async def create_protocol(
    protocol: ProtocolCreate,
    service: ProtocolService = Depends()
) -> Protocol:
    """
    Utwórz nowy protokół kontroli
    
    Typy protokołów:
    - **service**: Serwis urządzenia/komponentu
    - **test_c20**: Test C20 (urządzenie + scenariusz)
    - **manual_test**: Test manualny
    - **notes**: Uwagi
    """
    try:
        return await service.create_protocol(protocol)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/device/{device_id}", response_model=List[Protocol])
async def get_device_protocols(
    device_id: str,
    service: ProtocolService = Depends()
) -> List[Protocol]:
    """Pobierz wszystkie protokoły dla urządzenia"""
    return await service.get_device_protocols(device_id)

@router.post("/{protocol_id}/save")
async def save_protocol(
    protocol_id: str,
    user_id: str,
    service: ProtocolService = Depends()
):
    """
    Zapisz protokół (użytkownik)
    Odpowiada akcji: protokół kontroli: zapisz (użytkownik)
    """
    return await service.save_protocol(protocol_id, user_id)
```

#### 2.4 Dodanie FWM do docker-compose

```yaml
# Dodaj do docker-compose.yml

  fleet-workshop-manager:
    build:
      context: ./services/backend/fleet-workshop-manager
      dockerfile: Dockerfile
    container_name: fwm-backend
    ports:
      - "8201:8000"
    environment:
      - SERVICE_NAME=fleet-workshop-manager
      - SERVICE_VERSION=1.0.0
      - DATABASE_URL=postgresql://fleet_user:${POSTGRES_PASSWORD}@postgres:5432/fleet_db
      - REDIS_URL=redis://redis:6379/1
      - SECRET_KEY=${SECRET_KEY_FWM}
      - FDM_URL=http://fleet-data-manager:8000
    volumes:
      - ./services/backend/fleet-workshop-manager/app:/app/app
    networks:
      - fleet-network
    depends_on:
      postgres:
        condition: service_healthy
      fleet-data-manager:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/api/v1/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    restart: unless-stopped
```

---

### 🎨 ETAP 3: Fleet Config Manager (Priorytet: NISKI)

```bash
# Struktura FCM
services/backend/fleet-config-manager/
├── app/
│   ├── models/
│   │   ├── view_config.py       # Konfiguracja widoków
│   │   └── app_settings.py      # Ustawienia aplikacji
│   ├── api/
│   │   └── v1/
│   │       └── endpoints/
│   │           ├── views.py
│   │           └── settings.py
│   └── main.py
└── Dockerfile
```

---

### 📦 ETAP 4: Shared Components (Priorytet: WYSOKI)

#### 4.1 Shared Types

```typescript
// shared/types/common.types.ts
export type ServiceRole = 'operator' | 'manager' | 'admin' | 'configurator';

export interface User {
  id: string;
  username: string;
  email: string;
  role: ServiceRole;
  active: boolean;
}

export interface Device {
  id: string;
  name: string;
  type: string;
  serial_number: string;
  status: 'active' | 'inactive' | 'maintenance' | 'retired';
  client_id?: string;
  location_id?: string;
}

export interface Protocol {
  id: string;
  device_id: string;
  type: 'service' | 'test_c20' | 'manual_test' | 'notes';
  status: 'planned' | 'in_progress' | 'completed' | 'failed';
  technician_id: string;
  scheduled_date: string;
  notes: string;
}
```

#### 4.2 Universal ConnectID Component

```bash
# Struktura universal-connectid v2.0.0
shared/components/universal-connectid/
├── 2.0.0/
│   ├── UniversalConnectID.js
│   ├── UniversalConnectID.css
│   └── README.md
└── latest -> 2.0.0/
```

---

### 📊 ETAP 5: Migracja danych z Excel (Priorytet: ŚREDNI)

#### 5.1 Skrypt migracji

```python
# scripts/migration/migrate_excel.py
"""
Migracja danych z plików Excel do Fleet Management System
"""
import pandas as pd
from pathlib import Path
import httpx
import asyncio

class ExcelMigrator:
    def __init__(self, excel_dir: Path, fdm_url: str, fwm_url: str):
        self.excel_dir = excel_dir
        self.fdm_url = fdm_url
        self.fwm_url = fwm_url
    
    async def migrate_users(self):
        """Migruj użytkowników z testy_users.xlsx"""
        df = pd.read_excel(self.excel_dir / 'testy_users.xlsx')
        
        async with httpx.AsyncClient() as client:
            for _, row in df.iterrows():
                user_data = {
                    "username": row['username'],
                    "email": row['email'],
                    "role": row['role'],
                    "skills": row.get('skills', '').split(',')
                }
                
                response = await client.post(
                    f"{self.fdm_url}/api/v1/users",
                    json=user_data
                )
                
                if response.status_code == 200:
                    print(f"✅ User {user_data['username']} migrated")
                else:
                    print(f"❌ Failed: {user_data['username']}")
    
    async def migrate_devices(self):
        """Migruj urządzenia z bazydanych.xlsx"""
        df = pd.read_excel(self.excel_dir / 'bazydanych.xlsx', sheet_name='devices')
        
        async with httpx.AsyncClient() as client:
            for _, row in df.iterrows():
                device_data = {
                    "name": row['name'],
                    "type": row['type'],
                    "serial_number": row['serial_number'],
                    "status": row.get('status', 'active')
                }
                
                response = await client.post(
                    f"{self.fdm_url}/api/v1/devices",
                    json=device_data
                )
                
                if response.status_code == 200:
                    print(f"✅ Device {device_data['name']} migrated")
    
    async def migrate_all(self):
        print("🚀 Starting migration...")
        await self.migrate_users()
        await self.migrate_devices()
        print("✅ Migration complete!")

# Usage
if __name__ == '__main__':
    migrator = ExcelMigrator(
        excel_dir=Path('./excel_data'),
        fdm_url='http://localhost:8200',
        fwm_url='http://localhost:8201'
    )
    asyncio.run(migrator.migrate_all())
```

---

## 📋 Checklist Aktualizacji

### ✅ Faza 1: Restrukturyzacja (Tydzień 1)
- [ ] Utworzyć backup obecnego kodu
- [ ] Uruchomić `scripts/migrate-structure.sh`
- [ ] Zaktualizować docker-compose.yml
- [ ] Zaktualizować Makefile
- [ ] Przetestować `make build && make up`
- [ ] Zweryfikować działanie ConnectDisplay

### 🏗️ Faza 2: Fleet Workshop Manager (Tydzień 2)
- [ ] Utworzyć strukturę FWM
- [ ] Zaimplementować modele (Protocol, Calendar, Workshop)
- [ ] Utworzyć endpoints API
- [ ] Dodać FWM do docker-compose
- [ ] Zintegrować z FDM
- [ ] Testy integracyjne

### 🎨 Faza 3: Fleet Config Manager (Tydzień 3)
- [ ] Utworzyć strukturę FCM
- [ ] Zaimplementować modele (ViewConfig, AppSettings)
- [ ] Utworzyć endpoints API
- [ ] Dodać FCM do docker-compose

### 📦 Faza 4: Shared Components (Tydzień 4)
- [ ] Przenieść typy do shared/types
- [ ] Utworzyć shared/components
- [ ] Zaimplementować UniversalConnectID v2.0.0
- [ ] Skonfigurować CDN service
- [ ] Zaktualizować importy w ConnectDisplay

### 📊 Faza 5: Migracja Excel (Tydzień 5)
- [ ] Przygotować pliki Excel (17 plików)
- [ ] Napisać skrypty migracji
- [ ] Utworzyć seed data dla testów
- [ ] Uruchomić migrację użytkowników
- [ ] Uruchomić migrację urządzeń
- [ ] Zweryfikować dane w bazie

---

## 🚀 Quick Start - Co zrobić TERAZ

### 1. Backup i przygotowanie (5 min)

```bash
# Backup
tar -czf backup-$(date +%Y%m%d).tar.gz backend/ frontend/ docker-compose.yml

# Utwórz pliki pomocnicze
cat > scripts/setup.sh << 'EOF'
#!/bin/bash
echo "Setting up Fleet Management System..."
# (dodaj zawartość z punktu 1.4)
EOF

chmod +x scripts/setup.sh
```

### 2. Uruchom migrację struktury (10 min)

```bash
# Wykonaj migrację
./scripts/migrate-structure.sh

# Lub ręcznie:
mkdir -p services/{backend/fleet-data-manager,frontend/connect-display}
mv backend/* services/backend/fleet-data-manager/
mv frontend/* services/frontend/connect-display/
```

### 3. Zaktualizuj docker-compose (15 min)

```bash
# Użyj zaktualizowanego docker-compose.yml z punktu 1.2
# Dodaj PostgreSQL i Redis
# Zaktualizuj porty i networks
```

### 4. Test (10 min)

```bash
make build
make up
make health

# Sprawdź:
# - http://localhost:8100 (ConnectDisplay)
# - http://localhost:8200/docs (FDM API)
```

---

## 📈 Harmonogram Implementacji

| Tydzień | Faza | Zadania | Status |
|---------|------|---------|--------|
| **1** | Restrukturyzacja | Migracja struktury, PostgreSQL, Redis | 🔴 TODO |
| **2** | FWM Backend | Protokoły, kalendarz, warsztat | 🔴 TODO |
| **3** | FCM Backend | Konfiguracja widoków, ustawienia | 🔴 TODO |
| **4** | Shared Components | Typy, komponenty, CDN | 🔴 TODO |
| **5** | Migracja Excel | Import danych, seed | 🔴 TODO |
| **6** | Frontend Clients | Data/Workshop/Config Managers | 🔴 TODO |
| **7-8** | Testy i UAT | Integracja, wydajność, dokumentacja | 🔴 TODO |

---

## 🎯 Podsumowanie

### Co działa już teraz:
✅ ConnectDisplay z 4 modułami  
✅ Podstawowy backend FastAPI  
✅ Docker setup  
✅ Event listeners naprawione

### Co wymaga aktualizacji:
🔄 Struktura katalogów → mikrousługi  
🔄 Pojedynczy backend → 3 backend services  
🔄 Brak bazy danych → PostgreSQL + Redis  
🔄 Single frontend → 4 frontend clients  
🔄 Dane w Excel → Migration scripts

### Priorytet działań:
1. **TERAZ**: Restrukturyzacja (Etap 1) - **2-3 dni**
2. **NASTĘPNIE**: FWM backend (Etap 2) - **1 tydzień**
3. **PÓŹNIEJ**: FCM + Shared (Etap 3-4) - **1-2 tygodnie**
4. **NA KOŃCU**: Migracja Excel (Etap 5) - **1 tydzień**

---

**Rozpocznij od Etapu 1 i kontynuuj stopniowo. Każdy etap jest niezależny i można go testować osobno!** 🚀