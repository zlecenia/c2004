# services/backend/fleet-workshop-manager/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from app.api.v1.endpoints import protocols

# Get service info from environment
SERVICE_NAME = os.getenv("SERVICE_NAME", "fleet-workshop-manager")
SERVICE_VERSION = os.getenv("SERVICE_VERSION", "1.0.0")

app = FastAPI(
    title="Fleet Workshop Manager",
    description="Workshop and protocol management for Fleet Management System",
    version=SERVICE_VERSION,
    openapi_url=f"/api/v1/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8100",  # ConnectDisplay
        "http://localhost:8110",  # Data Manager UI
        "http://localhost:8111",  # Workshop Manager UI
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(protocols.router, prefix="/api/v1")

@app.get("/api/v1/health")
async def health_check():
    """Health check endpoint"""
    return {
        "service": SERVICE_NAME,
        "version": SERVICE_VERSION,
        "status": "healthy",
        "message": "Fleet Workshop Manager is running"
    }

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "service": SERVICE_NAME,
        "version": SERVICE_VERSION,
        "message": "Fleet Workshop Manager API",
        "docs": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
