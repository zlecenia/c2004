# Development Guide

## Quick Start

1. **Setup Environment**
   ```bash
   make env      # Create .env from template
   make install  # Install dependencies
   ```

2. **Validate Configuration**
   ```bash
   make validate # Validates TypeScript, Python, environment
   ```

3. **Start Development**
   ```bash
   make dev      # Starts all services with hot reload
   ```

4. **Access Services**
   - Frontend: http://localhost:8100
   - Backend API: http://localhost:8101/docs
   - Health Check: http://localhost:8101/api/v1/health

## Architecture

### Frontend (TypeScript + Zod)
- **Environment Validation**: All env vars validated at startup with Zod
- **Service Manifest**: Executable configuration that validates components
- **Module System**: Pluggable modules with dependency injection
- **Component Registry**: Centralized component management

### Backend (Python + Pydantic)
- **Settings Validation**: All configuration validated with Pydantic
- **API Endpoints**: FastAPI with automatic OpenAPI documentation
- **Health Checks**: Built-in health monitoring
- **Service Layer**: Clean separation of concerns

### Infrastructure (Docker + Make)
- **One-Command Operations**: Everything through Makefile
- **Health Checks**: Docker-native health monitoring
- **Volume Management**: Persistent data and development volumes

## Development Workflow

### Adding New Features

1. **Backend Changes**
   ```bash
   # 1. Add models in app/models/
   # 2. Add services in app/services/
   # 3. Add endpoints in app/api/v1/endpoints/
   # 4. Update router in app/api/v1/router.py
   
   make validate-backend  # Validate changes
   ```

2. **Frontend Changes**
   ```bash
   # 1. Update types in shared/types/
   # 2. Add services in src/modules/
   # 3. Update component registry if needed
   
   make validate-frontend # Validate changes
   ```

3. **Test Changes**
   ```bash
   make test          # Run all tests
   make test-identify # Test identification endpoint
   ```

### Module System

Adding a new module (e.g., calibration):

1. **Create Module Files**
   ```
   frontend/src/modules/calibration/
   ├── calibration.module.ts
   ├── calibration.service.ts
   └── calibration.view.ts
   ```

2. **Implement Module Interface**
   ```typescript
   export class CalibrationModule implements Module {
     readonly metadata: ModuleMetadata = {
       name: 'calibration',
       version: '1.0.0',
       dependencies: ['universal-connectid']
     };
     
     async initialize(): Promise<void> { /* ... */ }
   }
   ```

3. **Register Module**
   ```typescript
   // frontend/src/modules/index.ts
   export const MODULE_REGISTRY = {
     identification: IdentificationModule,
     calibration: CalibrationModule  // ← Add here
   };
   ```

4. **Validate**
   ```bash
   make validate  # Automatic validation
   ```

## Validation Strategy

### Environment Variables
- **Frontend**: Zod schemas validate at build time
- **Backend**: Pydantic models validate at startup
- **Docker**: Health checks validate at runtime

### Code Quality
- **TypeScript**: Strict mode with no-unused-locals
- **Python**: Pydantic validation with custom validators
- **Docker**: Multi-stage builds with validation steps

## Debugging

### Logs
```bash
make logs                    # All service logs
docker logs identification-backend  # Backend only
docker logs identification-frontend # Frontend only
```

### Health Checks
```bash
make health                  # Check all services
curl localhost:8101/api/v1/health  # Backend health
```

### Development Mode
```bash
# Hot reload enabled
make dev

# Individual services
cd frontend && npm run dev
cd backend && uvicorn app.main:app --reload
```

## Testing

### Manual Testing
```bash
make test-identify  # Test identification endpoint
make test-api      # Test all API endpoints
```

### Automated Testing
```bash
make test          # Run all tests
make test-backend  # Python tests only
make test-frontend # TypeScript tests only
```

## Deployment

### Development
```bash
make up     # Start with Docker Compose
make down   # Stop services
make restart # Restart services
```

### Production
```bash
make prod     # Start with Traefik proxy
make prod-down # Stop production services
```

## Troubleshooting

### Common Issues

1. **Environment Validation Failed**
   ```bash
   # Check .env file exists
   make env
   
   # Validate configuration
   make validate-env
   ```

2. **TypeScript Validation Failed**
   ```bash
   # Check TypeScript configuration
   make validate-frontend
   
   # Check specific files
   cd frontend && npx tsc --noEmit
   ```

3. **Python Validation Failed**
   ```bash
   # Check Python configuration
   make validate-backend
   
   # Check specific imports
   cd backend && python -c "from app.config.settings import settings"
   ```

4. **Service Won't Start**
   ```bash
   # Check health status
   make health
   
   # Check logs
   make logs
   
   # Restart services
   make restart
   ```
