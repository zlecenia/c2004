# Development Guide

## 🚀 Quick Start

### Development Mode (Recommended)
```bash
# Start development servers with hot reload
make dev

# View development logs
make dev-logs

# Force refresh frontend cache
make refresh
```

### Production Mode
```bash
# Start production servers
make up

# Stop servers
make down

# Restart servers
make restart
```

## 🛠️ Development Commands

| Command | Description |
|---------|-------------|
| `make dev` | Start development mode with **hot reload** |
| `make refresh` | Force refresh frontend cache (clear build cache) |
| `make dev-logs` | View development logs (frontend + backend) |
| `make validate` | Validate all configurations |
| `make test` | Run all tests |

## 🔄 Hot Reload Development

### What is Hot Reload?
- **File changes** are automatically detected
- **Frontend rebuilds** instantly when you save files
- **Browser refreshes** automatically
- **No manual rebuild** needed

### Development Setup
```bash
# 1. Start development mode
make dev

# 2. Edit files in frontend/src/
# 3. Changes appear instantly in browser
# 4. No need to rebuild manually
```

### Ports
- **Frontend**: http://localhost:8200 (hot reload enabled - dev mode)
- **Frontend**: http://localhost:8100 (production mode)  
- **Backend**: http://localhost:8101 (auto-restart on changes)
- **HMR Port**: 24678 (Vite hot module replacement)

## 🔧 Cache Management

### Client-side Cache
```bash
# In browser: Clear cache with
Ctrl+Shift+R  # Hard refresh (Windows/Linux)
Cmd+Shift+R   # Hard refresh (Mac)
```

### Server-side Cache
```bash
# Force rebuild without cache
make refresh

# This rebuilds frontend with --no-cache flag
# Useful when dependencies change or cache is corrupted
```

### When to use `make refresh`
- ✅ Added new dependencies
- ✅ Cache seems corrupted
- ✅ Hot reload not working
- ✅ Mysterious build issues

## 📁 File Structure for Development

```
frontend/src/
├── modules/           # All UI modules
│   ├── connect-id/    # ConnectID module
│   ├── connect-data/ # ConnectFilter module
│   ├── connect-workshop/ # ConnectWorkshop module
│   ├── connect-test/   # ConnectTest module
│   └── identification/ # Basic identification
├── config/            # Configuration files
├── core/              # Core utilities
└── main.ts           # Application entry point
```

### Editing Files
1. **Edit any file** in `frontend/src/`
2. **Save the file** (Ctrl+S)
3. **Browser auto-refreshes** with changes
4. **No manual rebuild** needed

## 🐛 Debugging

### View Logs
```bash
# Development logs (both frontend + backend)
make dev-logs

# Production logs
make logs

# Specific service logs
docker-compose logs -f frontend
docker-compose logs -f backend
```

### Common Issues

**Hot reload not working?**
```bash
make refresh
# Then restart dev mode
make dev
```

**Cache issues?**
```bash
# Clear all caches and restart
make refresh
# Hard refresh in browser: Ctrl+Shift+R
```

**Port conflicts?**
```bash
# Check what's using ports
lsof -i :8100  # Frontend
lsof -i :8101  # Backend
lsof -i :24678 # HMR
```

## 🔄 Development Workflow

### Daily Development
```bash
# 1. Start development
make dev

# 2. Edit files in your IDE
# 3. Watch browser auto-refresh
# 4. Debug with browser dev tools
# 5. Check console logs for errors
```

### Adding New Features
```bash
# 1. Create/edit files in frontend/src/
# 2. Changes appear instantly
# 3. Test in browser
# 4. Commit when ready
```

### Before Committing
```bash
# Validate everything
make validate

# Run tests
make test

# Make sure production build works
make build
```

## 🚀 Production Deployment

```bash
# Build and start production
make up

# Check health
make health

# View status
make status
```

## 💡 Tips

- **Use hot reload** - saves tons of time
- **Check browser console** - all errors appear there
- **Use `make refresh`** when things break
- **Development logs** show detailed debug info
- **Hard refresh browser** to clear client cache
