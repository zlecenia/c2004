# backend/app/api/v1/endpoints/identification.py
from fastapi import APIRouter, HTTPException, Depends
from typing import List
import logging

from app.models.identification import (
    IdentificationRequest,
    IdentificationResponse,
    IdentificationType
)
from app.services.identification_service import IdentificationService
from app.api.dependencies import get_identification_service

router = APIRouter(prefix="/identification", tags=["identification"])
logger = logging.getLogger(__name__)

@router.post("/identify", response_model=IdentificationResponse)
async def identify(
    request: IdentificationRequest,
    service: IdentificationService = Depends(get_identification_service)
) -> IdentificationResponse:
    """
    Identify user, device, group, or test
    
    - **type**: Type of identification (user, device, group, test)
    - **value**: Identification value (RFID, QR code, barcode, or manual input)
    - **method**: Method used for identification (rfid, qr, barcode, manual)
    """
    try:
        logger.info(f"Identification request: type={request.type}, method={request.method}")
        
        result = await service.identify(
            type=request.type,
            value=request.value,
            method=request.method
        )
        
        logger.info(f"Identification successful: id={result.id}")
        return result
        
    except ValueError as e:
        logger.error(f"Validation error: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Identification failed: {e}")
        raise HTTPException(status_code=500, detail="Identification failed")

@router.get("/history", response_model=List[IdentificationResponse])
async def get_history(
    limit: int = 10,
    service: IdentificationService = Depends(get_identification_service)
) -> List[IdentificationResponse]:
    """Get identification history"""
    try:
        return await service.get_history(limit=limit)
    except Exception as e:
        logger.error(f"Failed to get history: {e}")
        raise HTTPException(status_code=500, detail="Failed to retrieve history")
