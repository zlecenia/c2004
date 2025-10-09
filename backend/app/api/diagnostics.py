# backend/app/api/diagnostics.py - System diagnostics endpoint
from fastapi import APIRouter, HTTPException
from typing import Dict, Any, List
import asyncio
import time
import redis
import psutil
import os
from datetime import datetime, timezone

router = APIRouter()

async def check_redis_connection() -> Dict[str, Any]:
    """Check Redis connection and performance"""
    try:
        import redis
        r = redis.Redis(host='redis', port=6379, db=0, decode_responses=True)
        
        # Test basic operations
        start_time = time.time()
        r.ping()
        ping_time = (time.time() - start_time) * 1000  # ms
        
        # Test set/get operation
        start_time = time.time()
        r.set("diagnostic_test", "ok", ex=60)
        test_value = r.get("diagnostic_test")
        operation_time = (time.time() - start_time) * 1000  # ms
        
        # Get Redis info
        info = r.info()
        
        return {
            "status": "healthy",
            "ping_time_ms": round(ping_time, 2),
            "operation_time_ms": round(operation_time, 2),
            "version": info.get("redis_version"),
            "uptime_seconds": info.get("uptime_in_seconds"),
            "connected_clients": info.get("connected_clients"),
            "used_memory_human": info.get("used_memory_human"),
            "total_connections_received": info.get("total_connections_received"),
            "keyspace": dict(info.get("keyspace", {}))
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "error": str(e),
            "error_type": type(e).__name__
        }

async def check_database_connection() -> Dict[str, Any]:
    """Check database connection (placeholder for PostgreSQL)"""
    try:
        # For now, simulate database check
        # In future, add real PostgreSQL connection test
        return {
            "status": "not_configured",
            "message": "Database not configured yet",
            "type": "postgresql"
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "error": str(e),
            "error_type": type(e).__name__
        }

def check_system_resources() -> Dict[str, Any]:
    """Check system resources (CPU, Memory, Disk)"""
    try:
        # CPU usage
        cpu_percent = psutil.cpu_percent(interval=1)
        
        # Memory usage
        memory = psutil.virtual_memory()
        
        # Disk usage
        disk = psutil.disk_usage('/')
        
        # Load average (Linux/Unix)
        try:
            load_avg = os.getloadavg()
        except:
            load_avg = None
        
        return {
            "status": "healthy",
            "cpu": {
                "usage_percent": cpu_percent,
                "count": psutil.cpu_count(),
                "load_average": load_avg
            },
            "memory": {
                "total_bytes": memory.total,
                "available_bytes": memory.available,
                "used_bytes": memory.used,
                "usage_percent": memory.percent,
                "total_human": f"{memory.total / 1024**3:.1f} GB",
                "available_human": f"{memory.available / 1024**3:.1f} GB"
            },
            "disk": {
                "total_bytes": disk.total,
                "free_bytes": disk.free,
                "used_bytes": disk.used,
                "usage_percent": (disk.used / disk.total) * 100,
                "total_human": f"{disk.total / 1024**3:.1f} GB",
                "free_human": f"{disk.free / 1024**3:.1f} GB"
            }
        }
    except Exception as e:
        return {
            "status": "error",
            "error": str(e),
            "error_type": type(e).__name__
        }

def check_environment() -> Dict[str, Any]:
    """Check environment configuration"""
    return {
        "python_version": os.sys.version,
        "environment": os.getenv("ENVIRONMENT", "unknown"),
        "debug_mode": os.getenv("DEBUG", "false").lower() == "true",
        "timezone": str(datetime.now(timezone.utc).astimezone().tzinfo),
        "container_id": os.getenv("HOSTNAME", "unknown")[:12],  # Docker container ID
        "working_directory": os.getcwd()
    }

async def check_external_services() -> Dict[str, List[Dict[str, Any]]]:
    """Check external service connectivity"""
    services = []
    
    # Test frontend connectivity (if running in Docker)
    try:
        import httpx
        async with httpx.AsyncClient() as client:
            response = await client.get("http://frontend:3000", timeout=5.0)
            services.append({
                "name": "frontend",
                "status": "healthy" if response.status_code == 200 else "unhealthy",
                "response_time_ms": response.elapsed.total_seconds() * 1000,
                "status_code": response.status_code
            })
    except Exception as e:
        services.append({
            "name": "frontend",
            "status": "unhealthy",
            "error": str(e),
            "error_type": type(e).__name__
        })
    
    # Add more external services as needed
    # services.append(await check_external_api())
    
    return {"external_services": services}

@router.get("/diagnostics")
async def get_full_diagnostics():
    """
    Comprehensive system diagnostics
    Returns health status of all system components
    """
    start_time = time.time()
    
    try:
        # Run all diagnostic checks concurrently
        redis_check, db_check, resources_check, external_check = await asyncio.gather(
            check_redis_connection(),
            check_database_connection(),
            asyncio.create_task(asyncio.to_thread(check_system_resources)),
            check_external_services(),
            return_exceptions=True
        )
        
        # Handle exceptions in concurrent execution
        for check_name, result in [("redis", redis_check), ("database", db_check), 
                                   ("resources", resources_check), ("external", external_check)]:
            if isinstance(result, Exception):
                result = {"status": "error", "error": str(result)}
        
        total_time = (time.time() - start_time) * 1000  # ms
        
        # Determine overall system status
        critical_services = [redis_check["status"], resources_check["status"]]
        overall_status = "healthy" if all(s in ["healthy", "not_configured"] for s in critical_services) else "degraded"
        
        diagnostics = {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "overall_status": overall_status,
            "diagnosis_time_ms": round(total_time, 2),
            "services": {
                "redis": redis_check,
                "database": db_check,
                "system_resources": resources_check,
                **external_check
            },
            "environment": check_environment(),
            "recommendations": generate_recommendations(redis_check, db_check, resources_check)
        }
        
        return diagnostics
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Diagnostics failed: {str(e)}"
        )

def generate_recommendations(redis_check: Dict, db_check: Dict, resources_check: Dict) -> List[str]:
    """Generate system recommendations based on diagnostic results"""
    recommendations = []
    
    # Redis recommendations
    if redis_check["status"] != "healthy":
        recommendations.append("🔴 Redis connection issues detected - check Redis container")
    elif redis_check.get("ping_time_ms", 0) > 100:
        recommendations.append("🟡 Redis response time is high - consider Redis optimization")
    
    # Resource recommendations
    if resources_check["status"] == "healthy":
        cpu_usage = resources_check["cpu"]["usage_percent"]
        memory_usage = resources_check["memory"]["usage_percent"]
        disk_usage = resources_check["disk"]["usage_percent"]
        
        if cpu_usage > 80:
            recommendations.append(f"🟡 High CPU usage ({cpu_usage}%) - consider scaling")
        if memory_usage > 85:
            recommendations.append(f"🟠 High memory usage ({memory_usage}%) - check for memory leaks")
        if disk_usage > 90:
            recommendations.append(f"🔴 Critical disk usage ({disk_usage}%) - cleanup required")
    
    # Database recommendations
    if db_check["status"] == "not_configured":
        recommendations.append("🔵 Database not configured - consider adding PostgreSQL for production")
    
    if not recommendations:
        recommendations.append("✅ All systems operating normally")
    
    return recommendations

@router.get("/diagnostics/quick")
async def get_quick_diagnostics():
    """
    Quick health check - faster response for monitoring
    """
    start_time = time.time()
    
    try:
        # Quick checks only
        redis_status = "healthy"
        try:
            r = redis.Redis(host='redis', port=6379, db=0, decode_responses=True)
            r.ping()
        except:
            redis_status = "unhealthy"
        
        cpu_percent = psutil.cpu_percent(interval=0.1)  # Quick CPU check
        memory_percent = psutil.virtual_memory().percent
        
        total_time = (time.time() - start_time) * 1000
        
        return {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "status": "healthy" if redis_status == "healthy" and cpu_percent < 90 and memory_percent < 90 else "degraded",
            "response_time_ms": round(total_time, 2),
            "services": {
                "redis": redis_status,
                "cpu_usage": f"{cpu_percent}%",
                "memory_usage": f"{memory_percent}%"
            }
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Quick diagnostics failed: {str(e)}"
        )
