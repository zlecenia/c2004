# backend/app/api/v1/router.py
from fastapi import APIRouter
from app.api.v1.endpoints import identification, health

api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(identification.router)
api_router.include_router(health.router)
