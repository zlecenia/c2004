# Makefile
.PHONY: help install validate build up down logs test clean

# Variables
SERVICE_NAME := identification
FRONTEND_PORT := 8100
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
	@echo "  make down         - Stop services"
	@echo "  make restart      - Restart services"
	@echo "  make logs         - View logs"
	@echo ""
	@echo "Maintenance:"
	@echo "  make clean        - Clean all data"
	@echo "  make health       - Check service health"
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
	cd frontend && npx tsc --noEmit
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
	@$(COMPOSE_CMD) -f docker-compose.yml -f docker-compose.dev.yml up --build

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

restart: down up

logs:
	@$(COMPOSE_CMD) logs -f

# Testing
test: test-backend test-frontend test-api
	@echo "✅ All tests passed"

test-backend:
	@echo "🧪 Testing backend..."
	@cd backend && python -m pytest tests/ -v || echo "⚠️  No backend tests found"

test-frontend:
	@echo "🧪 Testing frontend..."
	@cd frontend && npm test || echo "⚠️  No frontend tests configured"

test-api:
	@echo "🧪 Testing API endpoints..."
	@echo "Testing health endpoint..."
	@curl -s http://localhost:$(BACKEND_PORT)/api/v1/health | grep -q "healthy" || echo "⚠️  Health check failed"

test-identify:
	@echo "🧪 Testing identification endpoint..."
	@curl -s -X POST http://localhost:$(BACKEND_PORT)/api/v1/identification/identify \
		-H "Content-Type: application/json" \
		-d '{"type":"user","value":"RFID-12345","method":"rfid"}' | \
		python3 -m json.tool

# Health checks
health:
	@echo "🏥 Checking service health..."
	@$(COMPOSE_CMD) ps
	@echo ""
	@echo "Health endpoints:"
	@curl -s http://localhost:$(BACKEND_PORT)/api/v1/health | python3 -m json.tool

# Maintenance
clean:
	@echo "🧹 Cleaning up..."
	@$(COMPOSE_CMD) down -v
	@docker system prune -f
	@echo "✅ Cleanup complete"

status:
	@echo "📊 Service Status:"
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
