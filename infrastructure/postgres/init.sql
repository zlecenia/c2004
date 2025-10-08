-- infrastructure/postgres/init.sql
-- Fleet Management System Database Schema

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'operator',
    active BOOLEAN DEFAULT true,
    skills TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Clients table
CREATE TABLE IF NOT EXISTS clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    address TEXT,
    contact_person VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Devices table
CREATE TABLE IF NOT EXISTS devices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    type VARCHAR(100) NOT NULL,
    serial_number VARCHAR(100) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    client_id UUID REFERENCES clients(id),
    location_id UUID,
    rfid_uid VARCHAR(50),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Protocols table
CREATE TABLE IF NOT EXISTS protocols (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
    component_id UUID,
    scenario_id UUID,
    type VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'planned',
    technician_id UUID REFERENCES users(id),
    scheduled_date TIMESTAMP WITH TIME ZONE NOT NULL,
    completed_date TIMESTAMP WITH TIME ZONE,
    notes TEXT DEFAULT '',
    results JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Workshop requests table
CREATE TABLE IF NOT EXISTS workshop_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL,
    priority VARCHAR(10) DEFAULT 'medium',
    status VARCHAR(20) DEFAULT 'pending',
    description TEXT NOT NULL,
    technician_id UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    due_date TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    metadata JSONB DEFAULT '{}'
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_devices_serial ON devices(serial_number);
CREATE INDEX IF NOT EXISTS idx_devices_rfid ON devices(rfid_uid);
CREATE INDEX IF NOT EXISTS idx_devices_status ON devices(status);
CREATE INDEX IF NOT EXISTS idx_protocols_device ON protocols(device_id);
CREATE INDEX IF NOT EXISTS idx_protocols_technician ON protocols(technician_id);
CREATE INDEX IF NOT EXISTS idx_protocols_status ON protocols(status);
CREATE INDEX IF NOT EXISTS idx_workshop_requests_device ON workshop_requests(device_id);
CREATE INDEX IF NOT EXISTS idx_workshop_requests_status ON workshop_requests(status);

-- Insert sample data
INSERT INTO users (username, email, role, skills) VALUES
('admin', 'admin@fleet.local', 'admin', ARRAY['management', 'configuration']),
('tech1', 'tech1@fleet.local', 'operator', ARRAY['maintenance', 'testing']),
('manager1', 'manager@fleet.local', 'manager', ARRAY['oversight', 'reporting'])
ON CONFLICT (username) DO NOTHING;

INSERT INTO clients (name, address, contact_person, email, phone) VALUES
('Test Client 1', 'ul. Testowa 1, 00-001 Warszawa', 'Jan Kowalski', 'jan@testclient1.pl', '+48123456789'),
('Test Client 2', 'ul. Próbna 2, 01-001 Kraków', 'Anna Nowak', 'anna@testclient2.pl', '+48987654321')
ON CONFLICT DO NOTHING;

-- Sample devices
INSERT INTO devices (name, type, serial_number, status, rfid_uid) VALUES
('PSS-7000 #12345', 'pressure_sensor', 'PSS7000-12345', 'active', 'RF123456'),
('PSS-5000 #67890', 'pressure_sensor', 'PSS5000-67890', 'active', 'RF789012'),
('PSS-3000 #11111', 'pressure_sensor', 'PSS3000-11111', 'maintenance', 'RF111111')
ON CONFLICT (serial_number) DO NOTHING;
