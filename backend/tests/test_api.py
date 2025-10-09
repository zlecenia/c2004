# backend/tests/test_api.py
"""Tests for API endpoints"""
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


class TestHealthEndpoint:
    """Test health check endpoint"""
    
    def test_health_endpoint_exists(self):
        """Test that health endpoint exists and returns 200"""
        response = client.get("/api/v1/health")
        assert response.status_code == 200
    
    def test_health_endpoint_content(self):
        """Test health endpoint returns correct content"""
        response = client.get("/api/v1/health")
        data = response.json()
        
        assert "status" in data
        assert "service" in data
        assert "version" in data
        assert data["status"] == "healthy"
        assert data["service"] == "identification"


class TestIdentificationEndpoint:
    """Test identification endpoint"""
    
    def test_identification_endpoint_exists(self):
        """Test that identification endpoint exists"""
        response = client.post("/api/v1/identification/identify", 
                              json={"type": "user", "value": "test", "method": "manual"})
        assert response.status_code in [200, 422], "Endpoint should exist (200) or have validation errors (422)"
    
    def test_identification_with_valid_data(self):
        """Test identification endpoint with valid data"""
        test_data = {
            "type": "user",
            "value": "RFID-12345",
            "method": "rfid"
        }
        
        response = client.post("/api/v1/identification/identify", json=test_data)
        assert response.status_code == 200
        
        data = response.json()
        assert "id" in data
        assert "type" in data
        assert "method" in data
        assert data["type"] == "user"
        assert data["method"] == "rfid"
    
    def test_identification_invalid_method(self):
        """Test identification endpoint with invalid method"""
        test_data = {
            "type": "user",
            "value": "test",
            "method": "invalid_method"
        }
        
        response = client.post("/api/v1/identification/identify", json=test_data)
        assert response.status_code == 422, "Should return validation error for invalid method"


class TestApiStructure:
    """Test API structure and routes"""
    
    def test_root_redirect(self):
        """Test that root redirects to docs"""
        response = client.get("/", follow_redirects=False)
        assert response.status_code in [200, 307, 302], "Root should redirect or return docs"
    
    def test_docs_endpoint(self):
        """Test that docs endpoint exists"""
        response = client.get("/docs")
        assert response.status_code == 200, "Docs endpoint should be accessible"
    
    def test_openapi_endpoint(self):
        """Test that OpenAPI schema endpoint exists"""
        response = client.get("/openapi.json")
        assert response.status_code == 200, "OpenAPI schema should be accessible"
        
        data = response.json()
        assert "openapi" in data
        assert "info" in data
        assert data["info"]["title"] == "Identification Service"
