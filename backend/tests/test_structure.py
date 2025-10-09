# backend/tests/test_structure.py
"""Tests for backend structure and configuration"""
import pytest
import os
import json
from pathlib import Path


class TestBackendStructure:
    """Test backend directory structure and files"""
    
    def test_app_directory_exists(self):
        """Test that app directory exists"""
        assert os.path.exists("app"), "app directory should exist"
    
    def test_required_modules_exist(self):
        """Test that required modules exist"""
        required_modules = [
            "app/__init__.py",
            "app/main.py",
            "app/config/settings.py",
            "app/api/v1/endpoints/identification.py",
            "app/services/identification_service.py"
        ]
        
        for module in required_modules:
            assert os.path.exists(module), f"Required module {module} should exist"
    
    def test_config_structure(self):
        """Test configuration structure"""
        config_files = [
            "app/config/__init__.py",
            "app/config/settings.py"
        ]
        
        for config_file in config_files:
            assert os.path.exists(config_file), f"Config file {config_file} should exist"
    
    def test_api_structure(self):
        """Test API structure"""
        api_files = [
            "app/api/__init__.py",
            "app/api/v1/__init__.py",
            "app/api/v1/endpoints/identification.py"
        ]
        
        for api_file in api_files:
            assert os.path.exists(api_file), f"API file {api_file} should exist"
    
    def test_requirements_file(self):
        """Test requirements.txt exists and has content"""
        assert os.path.exists("requirements.txt"), "requirements.txt should exist"
        
        with open("requirements.txt", "r") as f:
            content = f.read()
            assert "fastapi" in content, "requirements.txt should contain fastapi"
            assert "uvicorn" in content, "requirements.txt should contain uvicorn"


class TestSettings:
    """Test settings configuration"""
    
    def test_settings_import(self):
        """Test that settings can be imported"""
        try:
            from app.config.settings import settings
            assert settings is not None, "Settings should be importable"
        except ImportError as e:
            pytest.fail(f"Failed to import settings: {e}")
    
    def test_settings_attributes(self):
        """Test that settings has required attributes"""
        from app.config.settings import settings
        
        required_attrs = [
            "SERVICE_NAME",
            "SERVICE_VERSION", 
            "API_HOST",
            "API_PORT"
        ]
        
        for attr in required_attrs:
            assert hasattr(settings, attr), f"Settings should have {attr} attribute"


class TestMainApp:
    """Test main application"""
    
    def test_main_app_import(self):
        """Test that main app can be imported"""
        try:
            from app.main import app
            assert app is not None, "Main app should be importable"
        except ImportError as e:
            pytest.fail(f"Failed to import main app: {e}")
    
    def test_fastapi_instance(self):
        """Test that app is FastAPI instance"""
        from app.main import app
        from fastapi import FastAPI
        
        assert isinstance(app, FastAPI), "app should be FastAPI instance"


class TestServices:
    """Test services structure"""
    
    def test_identification_service_exists(self):
        """Test that identification service exists"""
        service_file = "app/services/identification_service.py"
        assert os.path.exists(service_file), f"Service file {service_file} should exist"
    
    def test_identification_service_import(self):
        """Test that identification service can be imported"""
        try:
            from app.services.identification_service import IdentificationService
            assert IdentificationService is not None, "IdentificationService should be importable"
        except ImportError as e:
            pytest.fail(f"Failed to import IdentificationService: {e}")
