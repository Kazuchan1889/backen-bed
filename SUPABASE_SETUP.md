# Supabase Configuration

## Database Connection

Backend telah dikonfigurasi untuk menggunakan Supabase PostgreSQL database.

### Connection Details

- **Host**: `aws-1-ap-south-1.pooler.supabase.com`
- **Port**: `6543`
- **Database**: `postgres`
- **User**: `postgres.ypfmrmgckyyniqwzvjuo`
- **Supabase URL**: `https://ypfmrmgckyyniqwzvjuo.supabase.co`

### Environment Variables

File `.env` telah dibuat dengan konfigurasi berikut:

```env
DB_USER=postgres.ypfmrmgckyyniqwzvjuo
DB_PASSWORD=Diona188
DB_NAME=postgres
DB_HOST=aws-1-ap-south-1.pooler.supabase.com
DB_PORT=6543

SUPABASE_URL=https://ypfmrmgckyyniqwzvjuo.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZm1ybWdja3l5bmlxd3p2anVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3NTA4NjIsImV4cCI6MjA4MTMyNjg2Mn0.GEohcOCsrWs-L5J66hoFpxhG13v6AWFLdSckIBZUcqg

PORT=3001
NODE_ENV=development
```

### Files Modified

1. **config/database.js**
   - Added SSL configuration for Supabase connection
   - Updated default connection parameters

2. **models/index.js**
   - Added `dialectOptions` to Sequelize configuration to support SSL

3. **config/supabase.js** (New)
   - Created Supabase client for direct Supabase API usage if needed

### Database Tables

Migrations telah berhasil dijalankan dan membuat tabel-tabel berikut:

- `patients` - Data pasien
- `beds` - Data tempat tidur (53 beds)
- `nurses` - Data perawat
- `nurse_assignments` - Penugasan perawat ke tempat tidur

### Running the Application

1. Install dependencies:
```bash
npm install
```

2. Run migrations (sudah dilakukan):
```bash
npm run migrate
```

3. Run seeders (sudah dilakukan):
```bash
npm run seed
```

4. Start the server:
```bash
npm start
```

Server akan berjalan di `http://localhost:3001`

### API Endpoints

- `GET /api/health` - Health check
- `GET /api/beds` - Get all beds
- `GET /api/nurses` - Get all nurses
- `GET /api/nurse-assignments` - Get all nurse assignments

### Testing Connection

Test koneksi dengan curl:

```bash
curl http://localhost:3001/api/health
curl http://localhost:3001/api/beds
```

## Notes

- SSL connection diperlukan untuk koneksi ke Supabase
- Data sudah di-seed dengan 53 beds (lantai 2 dan 3)
- Semua tabel sudah dibuat dan siap digunakan

