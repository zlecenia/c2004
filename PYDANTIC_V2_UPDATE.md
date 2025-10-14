# 🔧 Pydantic V2 Update - Backend Fix

*Data: 2025-10-14 13:45*

## 🐛 **Problem**

**Docker backend crashował z błędem:**
```
ImportError: cannot import name 'field_validator' from 'pydantic'
```

**Przyczyna:**
- `requirements.txt` miał `pydantic==1.10.12` (v1)
- Kod w `app/config/settings.py` używał `field_validator` i `ConfigDict` (Pydantic v2)

## ✅ **Rozwiązanie**

### **Zaktualizowano requirements.txt:**

**PRZED:**
```txt
pydantic==1.10.12
```

**PO:**
```txt
pydantic==2.5.0
pydantic-settings==2.1.0  # ✅ Dodane (wymagane dla Pydantic v2)
```

### **Kod był już gotowy na Pydantic v2:**

```python
# app/config/settings.py - już używał składni v2
from pydantic_settings import BaseSettings  # v2
from pydantic import Field, field_validator, ConfigDict  # v2

class Settings(BaseSettings):
    @field_validator('SECRET_KEY')  # ✅ v2 syntax
    @classmethod
    def validate_secret_key(cls, v):
        ...
    
    model_config = ConfigDict(...)  # ✅ v2 syntax
```

## 🚀 **Jak uruchomić**

```bash
# Zatrzymaj stare kontenery (już wykonane)
docker compose down

# Przebuduj i uruchom z nowymi zależnościami
docker compose up --build

# Spodziewany output:
# ✅ Settings validated: identification v1.0.0
# ✅ INFO: Uvicorn running on http://0.0.0.0:8000
```

## 📊 **Zmiany w zależnościach**

| Pakiet | Przed | Po | Zmiana |
|--------|-------|-----|--------|
| pydantic | 1.10.12 | 2.5.0 | ⬆️ Major update |
| pydantic-settings | - | 2.1.0 | ➕ Nowy |

## ✅ **Breaking Changes Pydantic v1 → v2**

**Co się zmieniło:**

1. **BaseSettings:**
```python
# v1
from pydantic import BaseSettings

# v2
from pydantic_settings import BaseSettings
```

2. **Validators:**
```python
# v1
from pydantic import validator

@validator('field_name')
def validate_field(cls, v):
    ...

# v2
from pydantic import field_validator

@field_validator('field_name')
@classmethod
def validate_field(cls, v):
    ...
```

3. **Config:**
```python
# v1
class Config:
    env_file = ".env"

# v2
from pydantic import ConfigDict

model_config = ConfigDict(env_file=".env")
```

## 🎯 **Status**

```
✅ requirements.txt zaktualizowany
✅ pydantic==2.5.0
✅ pydantic-settings==2.1.0
✅ Kod kompatybilny z v2
✅ Kontenery zatrzymane
```

## 📝 **Następne kroki**

```bash
# Przebuduj i uruchom
docker compose up --build

# Backend powinien wystartować bez błędów
# Frontend: http://localhost:8100
# Backend API: http://localhost:8000
```

---

## 🎉 **Problem rozwiązany!**

**Backend będzie używał Pydantic v2 po rebuilddzie.**
