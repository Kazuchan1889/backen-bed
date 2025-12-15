# JKC Bed Management Backend - Setup Guide

## 🚀 Quick Start (Recommended)

**Double-click `QUICK-START.bat`** untuk membuka menu interaktif dengan semua opsi!

## 📋 Prerequisites

- Windows 10/11
- Node.js 18.x atau lebih baru (akan diinstall otomatis jika belum ada)
- Koneksi internet
- Akses ke database Supabase

## 🎯 Step-by-Step Installation

### Option 1: Menggunakan QUICK-START.bat (Paling Mudah!)

1. **Double-click `QUICK-START.bat`**
2. Pilih menu:
   - Jika Node.js belum terinstall: Pilih opsi 5 (Install Node.js)
   - Jika sudah ada Node.js: Pilih opsi 1 (First Time Setup)
3. Edit file `.env` dengan kredensial Supabase Anda
4. Pilih opsi 2 untuk menjalankan server

### Option 2: Manual Step-by-Step

#### Step 1: Install Node.js (Jika Belum Ada)

**Cara 1 - Otomatis (Memerlukan Admin):**
```cmd
Right-click install-nodejs.bat > Run as Administrator
```

**Cara 2 - Manual:**
1. Download dari https://nodejs.org/
2. Install Node.js LTS version
3. Restart Command Prompt setelah instalasi

#### Step 2: Setup Backend

Double-click `setup.bat` atau run di Command Prompt:
```cmd
setup.bat
```

Script ini akan:
- ✅ Cek instalasi Node.js dan npm
- ✅ Membuat file `.env` dari template
- ✅ Install semua dependencies (npm packages)
- ✅ Menjalankan database migrations
- ✅ Seed database dengan data awal

#### Step 3: Konfigurasi Environment

Edit file `.env` dan isi dengan kredensial Supabase Anda:

```env
# Supabase Configuration
DB_USER=postgres.ypfmrmgckyyniqwzvjuo
DB_PASSWORD=your_password
DB_NAME=postgres
DB_HOST=aws-1-ap-south-1.pooler.supabase.com
DB_PORT=6543

# Supabase Client Configuration
SUPABASE_URL=https://ypfmrmgckyyniqwzvjuo.supabase.co
SUPABASE_KEY=your_supabase_anon_key

# Server Configuration
PORT=3001
NODE_ENV=development
```

#### Step 4: Jalankan Server

**Production Mode:**
```cmd
start.bat
```

**Development Mode (dengan auto-reload):**
```cmd
start-dev.bat
```

Server akan berjalan di `http://localhost:3001`

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `QUICK-START.bat` | **Menu interaktif untuk semua operasi** |
| `install-nodejs.bat` | Install Node.js secara otomatis (memerlukan Admin) |
| `setup.bat` | First-time setup (install dependencies, migrations, seeding) |
| `start.bat` | Start server dalam production mode |
| `start-dev.bat` | Start server dalam development mode (auto-reload) |
| `stop.bat` | Stop server yang sedang berjalan |

## 🔧 Manual npm Commands

Jika Anda prefer menggunakan npm commands:

```bash
# Install dependencies
npm install

# Run migrations
npm run migrate

# Seed database
npm run seed

# Start server (production)
npm start

# Start server (development with auto-reload)
npm run dev

# Initialize database
npm run init-db
```

## 🧪 Testing API

Setelah server berjalan, test endpoints:

```bash
# Health check
curl http://localhost:3001/api/health

# Get all beds
curl http://localhost:3001/api/beds

# Get nurses
curl http://localhost:3001/api/nurses
```

Atau buka di browser:
- http://localhost:3001/api/health
- http://localhost:3001/api/beds

## 🛠️ Troubleshooting

### Node.js tidak terdeteksi setelah instalasi

**Solusi:** Restart Command Prompt atau PC Anda setelah install Node.js

### Error "Cannot find module"

**Solusi:** Jalankan `setup.bat` lagi atau manual:
```cmd
npm install
```

### Database connection error

**Solusi:** 
1. Cek file `.env` sudah benar
2. Pastikan kredensial Supabase valid
3. Pastikan koneksi internet aktif

### Port 3001 sudah digunakan

**Solusi:** Stop server terlebih dahulu:
```cmd
stop.bat
```

Atau ubah PORT di file `.env`:
```env
PORT=3002
```

### Migration error

**Solusi:** Reset database:
```cmd
npm run migrate
```

## 📊 Database Structure

Setelah setup, database akan memiliki tabel:

- `patients` - Data pasien
- `beds` - Data tempat tidur (53 beds default)
- `nurses` - Data perawat
- `nurse_assignments` - Penugasan perawat

## 🌐 API Endpoints

### Beds
- `GET /api/beds` - Get all beds
- `GET /api/beds/:id` - Get bed by ID
- `POST /api/beds/:id/assign` - Assign patient to bed
- `POST /api/beds/:id/release` - Release bed
- `POST /api/beds/:id/repair` - Mark bed for repair
- `POST /api/beds/:id/available` - Mark bed as available

### Nurses
- `GET /api/nurses` - Get all nurses
- `GET /api/nurses/:id` - Get nurse by ID
- `POST /api/nurses` - Create new nurse
- `PUT /api/nurses/:id` - Update nurse
- `DELETE /api/nurses/:id` - Delete nurse

### Nurse Assignments
- `GET /api/nurse-assignments` - Get all assignments
- `POST /api/nurse-assignments` - Create assignment
- `PUT /api/nurse-assignments/:id/release` - Release assignment
- `DELETE /api/nurse-assignments/:id` - Delete assignment

## 🔐 Security Notes

- File `.env` tidak akan di-commit ke Git (sudah ada di `.gitignore`)
- Jangan share kredensial database Anda
- Gunakan `.env.example` sebagai template untuk tim Anda

## 📞 Support

Jika ada masalah:
1. Jalankan `QUICK-START.bat` > Pilih opsi 8 (Check Status)
2. Periksa output error di terminal
3. Pastikan semua prerequisites terpenuhi

## ✅ Checklist Setup

- [ ] Node.js terinstall (v18+)
- [ ] Dependencies terinstall (`node_modules` folder ada)
- [ ] File `.env` sudah dikonfigurasi
- [ ] Database migrations berhasil
- [ ] Database seeding berhasil
- [ ] Server berjalan di port 3001
- [ ] API health check OK (`http://localhost:3001/api/health`)

Selamat menggunakan JKC Bed Management Backend! 🎉

