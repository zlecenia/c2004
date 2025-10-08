# services/backend/fleet-workshop-manager/app/api/v1/endpoints/protocols.py
from fastapi import APIRouter, HTTPException, Depends, Query
from typing import List, Optional
from datetime import datetime

from app.models.protocol import Protocol, ProtocolCreate, ProtocolUpdate, ProtocolType, ProtocolStatus

router = APIRouter(prefix="/protocols", tags=["protocols"])

# Mock data for now
protocols_db: List[Protocol] = [
    Protocol(
        id="prot-001",
        device_id="dev-001",
        type=ProtocolType.SERVICE,
        status=ProtocolStatus.COMPLETED,
        technician_id="tech1",
        scheduled_date=datetime.now(),
        notes="Serwis standardowy",
        results={"pressure_test": "passed"}
    )
]

@router.post("/", response_model=Protocol)
async def create_protocol(protocol: ProtocolCreate) -> Protocol:
    """
    Utwórz nowy protokół kontroli
    
    Typy protokołów:
    - **service**: Serwis urządzenia/komponentu
    - **test_c20**: Test C20 (urządzenie + scenariusz)
    - **manual_test**: Test manualny
    - **notes**: Uwagi
    """
    new_protocol = Protocol(
        id=f"prot-{len(protocols_db) + 1:03d}",
        **protocol.dict()
    )
    protocols_db.append(new_protocol)
    return new_protocol

@router.get("/", response_model=List[Protocol])
async def get_protocols(
    device_id: Optional[str] = Query(None, description="Filter by device ID"),
    technician_id: Optional[str] = Query(None, description="Filter by technician ID"),
    status: Optional[ProtocolStatus] = Query(None, description="Filter by status"),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000)
) -> List[Protocol]:
    """Pobierz protokoły z opcjonalnymi filtrami"""
    filtered_protocols = protocols_db.copy()
    
    if device_id:
        filtered_protocols = [p for p in filtered_protocols if p.device_id == device_id]
    
    if technician_id:
        filtered_protocols = [p for p in filtered_protocols if p.technician_id == technician_id]
    
    if status:
        filtered_protocols = [p for p in filtered_protocols if p.status == status]
    
    return filtered_protocols[skip:skip + limit]

@router.get("/{protocol_id}", response_model=Protocol)
async def get_protocol(protocol_id: str) -> Protocol:
    """Pobierz protokół po ID"""
    protocol = next((p for p in protocols_db if p.id == protocol_id), None)
    if not protocol:
        raise HTTPException(status_code=404, detail="Protocol not found")
    return protocol

@router.put("/{protocol_id}", response_model=Protocol)
async def update_protocol(protocol_id: str, update: ProtocolUpdate) -> Protocol:
    """Aktualizuj protokół"""
    protocol = next((p for p in protocols_db if p.id == protocol_id), None)
    if not protocol:
        raise HTTPException(status_code=404, detail="Protocol not found")
    
    update_data = update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(protocol, field, value)
    
    return protocol

@router.post("/{protocol_id}/save")
async def save_protocol(protocol_id: str, user_id: str):
    """
    Zapisz protokół (użytkownik)
    Odpowiada akcji: protokół kontroli: zapisz (użytkownik)
    """
    protocol = next((p for p in protocols_db if p.id == protocol_id), None)
    if not protocol:
        raise HTTPException(status_code=404, detail="Protocol not found")
    
    # Update status to completed if it was in progress
    if protocol.status == ProtocolStatus.IN_PROGRESS:
        protocol.status = ProtocolStatus.COMPLETED
        protocol.completed_date = datetime.now()
    
    return {
        "success": True,
        "message": f"Protocol {protocol_id} saved by user {user_id}",
        "protocol": protocol
    }

@router.post("/{protocol_id}/start")
async def start_protocol(protocol_id: str, technician_id: str):
    """Rozpocznij wykonywanie protokołu"""
    protocol = next((p for p in protocols_db if p.id == protocol_id), None)
    if not protocol:
        raise HTTPException(status_code=404, detail="Protocol not found")
    
    if protocol.status != ProtocolStatus.PLANNED:
        raise HTTPException(
            status_code=400, 
            detail=f"Cannot start protocol in status: {protocol.status}"
        )
    
    protocol.status = ProtocolStatus.IN_PROGRESS
    protocol.technician_id = technician_id
    
    return {
        "success": True,
        "message": f"Protocol {protocol_id} started by {technician_id}",
        "protocol": protocol
    }

@router.delete("/{protocol_id}")
async def delete_protocol(protocol_id: str):
    """Usuń protokół"""
    global protocols_db
    protocol = next((p for p in protocols_db if p.id == protocol_id), None)
    if not protocol:
        raise HTTPException(status_code=404, detail="Protocol not found")
    
    protocols_db = [p for p in protocols_db if p.id != protocol_id]
    return {"success": True, "message": f"Protocol {protocol_id} deleted"}
