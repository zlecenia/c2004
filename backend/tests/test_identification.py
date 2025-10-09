# backend/tests/test_identification.py  
"""Tests for identification functionality"""
import pytest
from fastapi.testclient import TestClient


class TestIdentificationService:
    """Test identification service functionality"""
    
    def test_user_identification_rfid(self, client: TestClient, sample_identification_data):
        """Test user identification via RFID"""
        response = client.post("/api/v1/identification/identify", json=sample_identification_data)
        assert response.status_code == 200
        
        data = response.json()
        assert "id" in data
        assert data["type"] == "user"
        assert data["method"] == "rfid"
    
    def test_device_identification_barcode(self, client: TestClient, sample_device_data):
        """Test device identification via barcode"""
        response = client.post("/api/v1/identification/identify", json=sample_device_data)
        assert response.status_code == 200
        
        data = response.json()
        assert "id" in data
        assert data["type"] == "device"
        assert data["method"] == "barcode"
    
    def test_identification_invalid_method(self, client: TestClient):
        """Test identification with invalid method"""
        invalid_data = {
            "type": "user",
            "value": "test",
            "method": "invalid"
        }
        
        response = client.post("/api/v1/identification/identify", json=invalid_data)
        assert response.status_code == 422
    
    def test_identification_missing_fields(self, client: TestClient):
        """Test identification with missing required fields"""
        incomplete_data = {
            "type": "user"
            # Missing value and method
        }
        
        response = client.post("/api/v1/identification/identify", json=incomplete_data)
        assert response.status_code == 422
    
    def test_identification_qr_code(self, client: TestClient):
        """Test QR code identification"""
        qr_data = {
            "type": "user", 
            "value": "QR-USER-67890",
            "method": "qr"
        }
        
        response = client.post("/api/v1/identification/identify", json=qr_data)
        assert response.status_code == 200
        
        data = response.json()
        assert data["method"] == "qr"
    
    def test_identification_manual_input(self, client: TestClient):
        """Test manual identification"""
        manual_data = {
            "type": "device",
            "value": "MANUAL-DEVICE-001", 
            "method": "manual"
        }
        
        response = client.post("/api/v1/identification/identify", json=manual_data)
        assert response.status_code == 200
        
        data = response.json()
        assert data["method"] == "manual"


class TestIdentificationTypes:
    """Test different identification types"""
    
    @pytest.mark.parametrize("id_type", ["user", "device", "group", "test"])
    def test_identification_types(self, client: TestClient, id_type):
        """Test all supported identification types"""
        test_data = {
            "type": id_type,
            "value": f"RFID-{id_type.upper()}-12345",
            "method": "rfid"
        }
        
        response = client.post("/api/v1/identification/identify", json=test_data)
        assert response.status_code == 200
        
        data = response.json()
        assert data["type"] == id_type
    
    @pytest.mark.parametrize("method", ["rfid", "qr", "barcode", "manual"])
    def test_identification_methods(self, client: TestClient, method):
        """Test all supported identification methods"""
        # Different methods have different value requirements
        value_map = {
            "rfid": "RFID-TEST-12345",
            "qr": "QR-TEST-12345", 
            "barcode": "BC-TEST-12345",
            "manual": "MANUAL-TEST-12345"
        }
        
        test_data = {
            "type": "user",
            "value": value_map[method],
            "method": method
        }
        
        response = client.post("/api/v1/identification/identify", json=test_data)
        assert response.status_code == 200
        
        data = response.json()
        assert data["method"] == method
