# JKC Bed Management Backend API

Backend API untuk sistem manajemen kasur JKC menggunakan Node.js, Express, dan Sequelize dengan PostgreSQL.

## Prerequisites

- Node.js (v16 atau lebih baru)
- PostgreSQL (v12 atau lebih baru)
- Database `JKC` sudah dibuat di PostgreSQL

## Setup

1. **Install dependencies:**
```bash
cd backend
npm install
```

2. **Setup environment variables:**
Buat file `.env` di folder `backend` dengan isi:
```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=JKC
DB_PASSWORD=Diona188
DB_PORT=5432
PORT=3001
NODE_ENV=development
```

3. **Initialize database:**
```bash
# Option 1: Menggunakan script init-db (recommended)
npm run init-db

# Option 2: Menggunakan migrations dan seeders
npm run migrate
npm run seed
```

4. **Jalankan server:**
```bash
# Development mode (dengan auto-reload)
npm run dev

# Production mode
npm start
```

Server akan berjalan di `http://localhost:3001`

## API Endpoints

### Beds

- `GET /api/beds` - Get all beds
  - Query params: `floor`, `room`, `status`
  - Example: `/api/beds?floor=2&status=available`

- `GET /api/beds/:id` - Get bed by ID
  - Example: `/api/beds/1`

- `POST /api/beds/:id/assign` - Assign patient to bed
  - Body: `{ name, age?, gender?, medicalRecord? }`

- `POST /api/beds/:id/release` - Release bed (set to available)

- `POST /api/beds/:id/repair` - Set bed to repair
  - Body: `{ repairNote? }`

- `POST /api/beds/:id/available` - Set bed to available (after repair)

- `GET /api/beds/stats/overview` - Get bed statistics
  - Query params: `floor` (optional)

### Health Check

- `GET /api/health` - Check API status

## Database Schema

### Beds Table
```sql
- id (INTEGER, PRIMARY KEY)
- status (ENUM: available, occupied, repair, maintenance)
- room (STRING)
- floor (INTEGER)
- patientId (INTEGER, FOREIGN KEY -> patients.id)
- assignedAt (DATE)
- repairNote (TEXT)
- createdAt, updatedAt
```

### Patients Table
```sql
- id (INTEGER, PRIMARY KEY, AUTO_INCREMENT)
- name (STRING, NOT NULL)
- age (INTEGER)
- gender (ENUM: male, female)
- medicalRecord (STRING)
- createdAt, updatedAt
```

## Testing API

Gunakan Postman, curl, atau browser untuk test:

```bash
# Get all beds
curl http://localhost:3001/api/beds

# Get beds on floor 2
curl http://localhost:3001/api/beds?floor=2

# Assign patient to bed 1
curl -X POST http://localhost:3001/api/beds/1/assign \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","age":45,"gender":"male","medicalRecord":"RM-001"}'

# Get statistics
curl http://localhost:3001/api/beds/stats/overview?floor=2
```

