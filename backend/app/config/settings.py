# backend/app/config/settings.py
try:
    from pydantic_settings import BaseSettings  # For Pydantic v2 setups
except ImportError:
    from pydantic import BaseSettings  # Fallback for Pydantic v1

from pydantic import Field, field_validator, ConfigDict
from typing import List, Optional
import secrets

class Settings(BaseSettings):
    """
    Application Settings with Pydantic validation
    """

    # Service
    SERVICE_NAME: str = "identification"
    SERVICE_VERSION: str = "1.0.0"

    # API
    API_HOST: str = "0.0.0.0"
    API_PORT: int = Field(default=8000, ge=1024, le=65535)
    API_WORKERS: int = Field(default=4, ge=1, le=16)
    API_RELOAD: bool = False

    # Database
    DATABASE_URL: str = "sqlite:///./identification.db"
    DATABASE_ECHO: bool = False

    # Security
    SECRET_KEY: str = Field(default_factory=lambda: secrets.token_urlsafe(32))
    CORS_ORIGINS: List[str] = ["http://localhost:8100"]

    # External Services
    REDIS_URL: Optional[str] = None
    SENTRY_DSN: Optional[str] = None

    # Feature Flags
    ENABLE_RFID: bool = True
    ENABLE_QR: bool = True
    ENABLE_BARCODE: bool = True
    ENABLE_MANUAL: bool = True

    @field_validator('SECRET_KEY')
    @classmethod
    def validate_secret_key(cls, v):
        if len(v) < 32:
            raise ValueError('SECRET_KEY must be at least 32 characters')
        return v

    @field_validator('CORS_ORIGINS', mode='before')
    @classmethod
    def parse_cors_origins(cls, v):
        if isinstance(v, str):
            import json
            return json.loads(v)
        return v

    model_config = ConfigDict(
        env_file=".env",
        case_sensitive=True
    )

# Create settings instance (validates on import)
try:
    settings = Settings()
    print(f"✅ Settings validated: {settings.SERVICE_NAME} v{settings.SERVICE_VERSION}")
except Exception as e:
    print(f"❌ Settings validation failed: {e}")
    raise

# Export for use in app
__all__ = ['settings']
