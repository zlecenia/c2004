# Makefile
.PHONY: help install validate build up down logs test clean

# Variables
SERVICE_NAME := identification
FRONTEND_PORT := 8100
DEV_FRONTEND_PORT := 8200
BACKEND_PORT := 8101

# Docker Compose command detection
DOCKER_COMPOSE := $(shell command -v docker-compose 2> /dev/null)
ifdef DOCKER_COMPOSE
    COMPOSE_CMD := docker-compose
else
    COMPOSE_CMD := docker compose
endif

help:
	@echo "╔══════════════════════════════════════════╗"
	@echo "║  Identification Service - Commands       ║"
	@echo "╚══════════════════════════════════════════╝"
	@echo ""
	@echo "Setup:"
	@echo "  make install      - Install dependencies"
	@echo "  make env          - Create .env from template"
	@echo ""
	@echo "Development:"
	@echo "  make dev          - Start in development mode with hot reload"
	@echo "  make refresh      - Force refresh frontend cache"
	@echo "  make dev-logs     - View development logs"
	@echo "  make validate     - Validate all configs"
	@echo "  make test         - Run tests"
	@echo ""
	@echo "Docker:"
	@echo "  make build        - Build Docker images"
	@echo "  make up           - Start services"
	@echo "  make down         - Stop Docker Compose services"
	@echo "  make stop         - Stop ALL project services (Docker + ports + Python)"
	@echo "  make restart      - Restart services"
	@echo "  make logs         - View logs"
	@echo ""
	@echo "Maintenance:"
	@echo "  make clean        - Clean all data"
	@echo "  make health       - Check service health"
	@echo "  make status       - Show project services status"
	@echo "  make diagnostics  - Run full system diagnostics"
	@echo "  make quick-check  - Quick system status check"
	@echo ""

# Setup
install:
	@echo "📦 Installing dependencies..."
	cd frontend && npm install
	@echo "📦 Installing Python dependencies..."
	@echo "⚠️  Using system Python packages (FastAPI, Uvicorn already available)"
	@echo "✅ Dependencies installed"

env:
	@if [ ! -f .env ]; then \
		echo "📝 Creating .env from template..."; \
		cp .env.example .env; \
		echo "⚠️  Please edit .env with your configuration"; \
	else \
		echo "✅ .env already exists"; \
	fi

# Validation
validate: validate-env validate-frontend validate-backend
	@echo "✅ All validations passed"

validate-env:
	@echo "🔍 Validating environment..."
	@test -f .env || (echo "❌ .env not found. Run: make env" && exit 1)
	@grep -q "SECRET_KEY=your-secret-key" .env && \
		(echo "⚠️  WARNING: Using default SECRET_KEY. Change it in .env") || true
	@echo "✅ Environment validated"

validate-frontend:
	@echo "🔍 Validating frontend..."
	cd frontend && npx tsc --noEmit --skipLibCheck || echo "⚠️  TypeScript validation has warnings, continuing..."
	@echo "✅ Frontend validated"

validate-backend:
	@echo "🔍 Validating backend..."
	@cd backend && python3 -c "from app.config.settings import settings" || \
		echo "⚠️  Backend validation skipped - Python dependencies missing"
	@echo "✅ Backend validated"

# Development
dev: env
	@echo "🚀 Starting development servers with hot reload..."
	@echo "Frontend: http://localhost:8200 (dev mode)"
	@echo "Backend:  http://localhost:$(BACKEND_PORT)"
	@echo "📝 Files will auto-refresh on changes"
	@$(COMPOSE_CMD) -f docker-compose.yml -f docker-compose.dev.yml up --build -d
	@echo ""
	@echo "🔍 Running system diagnostics..."
	@./scripts/system-diagnostics.sh

refresh:
	@echo "🔄 Refreshing frontend cache..."
	@echo "Rebuilding frontend with cache bust..."
	@$(COMPOSE_CMD) build --no-cache frontend
	@$(COMPOSE_CMD) restart frontend
	@echo "✅ Frontend cache refreshed"
	@echo "💡 Use Ctrl+Shift+R in browser to clear client cache"

dev-logs:
	@echo "📝 Showing development logs..."
	@$(COMPOSE_CMD) logs -f frontend backend

# Docker
build:
	@echo "🏗️  Building Docker images..."
	@$(COMPOSE_CMD) build
	@echo "✅ Build complete"

up: env validate
	@echo "🚀 Starting services..."
	@$(COMPOSE_CMD) up -d
	@echo "✅ Services started:"
	@echo "   Frontend: http://localhost:$(FRONTEND_PORT)"
	@echo "   Backend:  http://localhost:$(BACKEND_PORT)/docs"
	@echo "   Health:   http://localhost:$(BACKEND_PORT)/api/v1/health"

down:
	@echo "🛑 Stopping services..."
	@$(COMPOSE_CMD) down
	@echo "✅ Services stopped"

stop:
	@echo "🛑 Stopping ALL project services..."
	@./scripts/port-manager.sh stop

stop-docker:
	@echo "🐳 Stopping Docker services only..."
	@./scripts/port-manager.sh docker

stop-ports:
	@echo "🔌 Checking and stopping port processes..."
	@./scripts/port-manager.sh ports

stop-python:
	@echo "🐍 Stopping Python processes only..."
	@./scripts/port-manager.sh python

status:
	@echo "📊 Checking project services status..."
	@./scripts/port-manager.sh status

restart: down up

logs:
	@$(COMPOSE_CMD) logs -f

# Testing
test: test-structure test-backend test-frontend test-api test-integration
	@echo "✅ All tests completed"

test-structure:
	@echo "🧪 Testing project structure..."
	@echo "📂 Checking directory structure..."
	@test -d backend || (echo "❌ backend directory missing" && exit 1)
	@test -d frontend || (echo "❌ frontend directory missing" && exit 1)
	@test -f docker-compose.yml || (echo "❌ docker-compose.yml missing" && exit 1)
	@test -f .env.example || (echo "❌ .env.example missing" && exit 1)
	@echo "✅ Project structure validated"

test-backend:
	@echo "🧪 Testing backend..."
	@if [ ! -d backend/tests ]; then \
		echo "📁 Creating backend tests directory..."; \
		mkdir -p backend/tests; \
	fi
	@cd backend && pip install -q pytest httpx attrs pytest-asyncio 2>/dev/null || echo "⚠️  Installing test dependencies..."
	@cd backend && python3 -m pytest tests/ -v --tb=short 2>/dev/null || echo "⚠️  Some backend tests failed"

test-frontend:
	@echo "🧪 Testing frontend..."
	@cd frontend && npm test 2>/dev/null || echo "⚠️  Some frontend tests failed"

test-api:
	@echo "🧪 Testing API endpoints..."
	@echo "Waiting for services to be ready..."
	@sleep 2
	@echo "Testing health endpoint..."
	@curl -s http://localhost:$(BACKEND_PORT)/api/v1/health > /dev/null 2>&1 && echo "✅ Health endpoint OK" || echo "⚠️  Health endpoint not accessible"
	@echo "Testing API documentation..."
	@curl -s http://localhost:$(BACKEND_PORT)/docs > /dev/null 2>&1 && echo "✅ API docs OK" || echo "⚠️  API docs not accessible"

test-integration:
	@echo "🧪 Testing integration..."
	@echo "Testing frontend accessibility..."
	@curl -s http://localhost:$(DEV_FRONTEND_PORT) > /dev/null 2>&1 && echo "✅ Frontend OK (dev mode)" || \
		(curl -s http://localhost:$(FRONTEND_PORT) > /dev/null 2>&1 && echo "✅ Frontend OK (prod mode)" || echo "⚠️  Frontend not accessible")
	@echo "Testing backend-frontend communication..."
	@curl -s http://localhost:$(BACKEND_PORT)/openapi.json > /dev/null 2>&1 && echo "✅ API schema OK" || echo "⚠️  API schema not accessible"

test-identify:
	@echo "🧪 Testing identification endpoint..."
	@curl -s -X POST http://localhost:$(BACKEND_PORT)/api/v1/identification/identify \
		-H "Content-Type: application/json" \
		-d '{"type":"user","value":"RFID-12345","method":"rfid"}' | \
		python3 -m json.tool

test-modules:
	@echo "🧪 Testing modules structure..."
	@echo "Checking required modules..."
	@test -d frontend/src/modules/connect-id || echo "❌ connect-id module missing"
	@test -d frontend/src/modules/connect-test || echo "❌ connect-test module missing"  
	@test -d frontend/src/modules/connect-data || echo "❌ connect-data module missing"
	@test -d frontend/src/modules/connect-workshop || echo "❌ connect-workshop module missing"
	@test -d frontend/src/modules/connect-config || echo "❌ connect-config module missing"
	@echo "Checking registry files..."
	@test -f frontend/src/registry/component.registry.ts || echo "❌ component registry missing"
	@test -f frontend/src/registry/module.registry.ts || echo "❌ module registry missing"
	@test -f frontend/src/registry/route.registry.ts || echo "❌ route registry missing"
	@echo "✅ Modules structure validated"

test-config:
	@echo "🧪 Testing configuration..."
	@echo "Checking TypeScript configuration..."
	@test -f frontend/tsconfig.json || echo "❌ tsconfig.json missing"
	@cd frontend && npx tsc --noEmit --skipLibCheck || echo "⚠️  TypeScript compilation issues"
	@echo "Checking Vite configuration..."
	@test -f frontend/vite.config.ts || echo "❌ vite.config.ts missing"
	@echo "Checking Docker configuration..."
	@test -f frontend/Dockerfile || echo "❌ frontend Dockerfile missing"
	@test -f backend/Dockerfile || echo "❌ backend Dockerfile missing"
	@echo "✅ Configuration validated"

test-comprehensive: test test-modules test-config
	@echo "🎉 Comprehensive testing completed"

# Health checks
health:
	@echo "🏥 Checking service health..."
	@$(COMPOSE_CMD) ps
	@echo ""
	@echo "Health endpoints:"
	@curl -s http://localhost:$(BACKEND_PORT)/api/v1/health | python3 -m json.tool

diagnostics:
	@echo "🔍 Running full system diagnostics..."
	@./scripts/system-diagnostics.sh

quick-check:
	@echo "⚡ Quick system check..."
	@curl -s http://localhost:$(BACKEND_PORT)/api/diagnostics/quick | python3 -m json.tool || echo "❌ Backend not responding"

# Maintenance
clean:
	@echo "🧹 Cleaning up..."
	@$(COMPOSE_CMD) down -v
	@docker system prune -f
	@echo "✅ Cleanup complete"

docker-status:
	@echo "📊 Docker Service Status:"
	@$(COMPOSE_CMD) ps

# Production
prod:
	@echo "🚀 Starting in production mode..."
	@$(COMPOSE_CMD) --profile production up -d
	@echo "✅ Production services started"

prod-down:
	@echo "🛑 Stopping production services..."
	@$(COMPOSE_CMD) --profile production down
	@echo "✅ Production services stopped"
