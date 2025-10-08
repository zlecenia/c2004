# services/backend/fleet-workshop-manager/app/models/protocol.py
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
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

class ProtocolUpdate(BaseModel):
    status: Optional[ProtocolStatus] = None
    notes: Optional[str] = None
    results: Optional[Dict[str, Any]] = None
    completed_date: Optional[datetime] = None

class Protocol(ProtocolBase):
    id: str
    created_at: datetime = Field(default_factory=datetime.now)
    completed_date: Optional[datetime] = None
    results: Dict[str, Any] = Field(default_factory=dict)
    
    class Config:
        schema_extra = {
            "example": {
                "id": "prot-001",
                "device_id": "dev-001",
                "component_id": "comp-001",
                "type": "service",
                "status": "completed",
                "technician_id": "user-001",
                "scheduled_date": "2025-10-08T10:00:00Z",
                "completed_date": "2025-10-08T11:30:00Z",
                "notes": "Wymiana uszczelki",
                "results": {"pressure_test": "passed", "leak_test": "passed"}
            }
        }
