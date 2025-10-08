# API Documentation

## Overview

The Identification Service provides endpoints for identifying users, devices, groups, and test objects using various methods (RFID, QR codes, barcodes, or manual input).

## Base URL

- Development: `http://localhost:8101/api/v1`
- Production: `https://api.identification.yourdomain.com/api/v1`

## Authentication

Currently, no authentication is required. In production, you should implement proper authentication.

## Endpoints

### Health Check

#### GET /health

Check the health status of the service.

**Response:**
```json
{
  "status": "healthy",
  "service": "identification",
  "version": "1.0.0",
  "timestamp": "2025-10-08T10:30:00Z",
  "checks": {
    "database": "healthy",
    "cache": "healthy"
  }
}
```

### Identification

#### POST /identification/identify

Identify an entity using various methods.

**Request Body:**
```json
{
  "type": "user",
  "value": "RFID-12345",
  "method": "rfid"
}
```

**Parameters:**
- `type` (required): Type of identification (`user`, `device`, `group`, `test`)
- `value` (required): Identification value (1-100 characters)
- `method` (required): Method used (`rfid`, `qr`, `barcode`, `manual`)

**Response:**
```json
{
  "id": "user-001",
  "name": "Jan Kowalski",
  "type": "user",
  "method": "rfid",
  "metadata": {
    "role": "operator",
    "access_level": "standard",
    "last_seen": "2025-10-08T10:30:00"
  },
  "timestamp": "2025-10-08T10:30:00Z"
}
```

**Error Response:**
```json
{
  "error": "Validation error",
  "detail": "RFID value must start with 'RFID'",
  "timestamp": "2025-10-08T10:30:00Z"
}
```

#### GET /identification/history

Get identification history.

**Query Parameters:**
- `limit` (optional): Number of records to return (default: 10)

**Response:**
```json
[
  {
    "id": "user-001",
    "name": "Jan Kowalski",
    "type": "user",
    "method": "rfid",
    "metadata": {},
    "timestamp": "2025-10-08T10:30:00Z"
  }
]
```

## Error Codes

- `400 Bad Request`: Invalid request data or validation error
- `500 Internal Server Error`: Server error during processing

## Examples

### Identify User with RFID

```bash
curl -X POST http://localhost:8101/api/v1/identification/identify \
  -H "Content-Type: application/json" \
  -d '{
    "type": "user",
    "value": "RFID-12345",
    "method": "rfid"
  }'
```

### Get Recent History

```bash
curl http://localhost:8101/api/v1/identification/history?limit=5
```

### Health Check

```bash
curl http://localhost:8101/api/v1/health
```
