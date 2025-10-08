# backend/app/api/dependencies.py
from app.services.identification_service import IdentificationService

# Global service instances
_identification_service = None

def get_identification_service() -> IdentificationService:
    """Dependency to get identification service instance"""
    global _identification_service
    if _identification_service is None:
        _identification_service = IdentificationService()
    return _identification_service
