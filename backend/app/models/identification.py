# backend/app/models/identification.py
from pydantic import BaseModel, Field, validator
from typing import Literal, Optional
from datetime import datetime
from enum import Enum

class IdentificationType(str, Enum):
    USER = "user"
    DEVICE = "device"
    GROUP = "group"
    TEST = "test"

class IdentificationMethod(str, Enum):
    RFID = "rfid"
    QR = "qr"
    BARCODE = "barcode"
    MANUAL = "manual"

class IdentificationRequest(BaseModel):
    """Request to identify an entity"""
    type: IdentificationType
    value: str = Field(..., min_length=1, max_length=100)
    method: IdentificationMethod

    @validator('value')
    def validate_value(cls, v, values):
        # Custom validation based on method (Pydantic v1 style: values contains already-validated fields)
        method = values.get('method')
        if method == IdentificationMethod.RFID and not v.startswith('RFID'):
            raise ValueError('RFID value must start with "RFID"')
        return v

    class Config:
        json_schema_extra = {
            "example": {
                "type": "user",
                "value": "RFID-12345",
                "method": "rfid"
            }
        }

class IdentificationResponse(BaseModel):
    """Response with identification result"""
    id: str
    name: str
    type: IdentificationType
    method: IdentificationMethod
    metadata: dict = Field(default_factory=dict)
    timestamp: datetime = Field(default_factory=datetime.now)

    class Config:
        json_schema_extra = {
            "example": {
                "id": "user-001",
                "name": "Jan K.",
                "type": "user",
                "method": "rfid",
                "metadata": {"role": "operator"},
                "timestamp": "2025-10-08T10:30:00"
            }
        }

class HealthCheckResponse(BaseModel):
    """Health check response"""
    status: Literal["healthy", "unhealthy"]
    service: str
    version: str
    timestamp: datetime = Field(default_factory=datetime.now)
    checks: dict = Field(default_factory=dict)

class ErrorResponse(BaseModel):
    """Error response"""
    error: str
    detail: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.now)
