@echo off
echo ========================================
echo JKC Bed Management Backend Setup
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo.
    echo Please download and install Node.js from:
    echo https://nodejs.org/
    echo.
    echo After installing Node.js, run this script again.
    pause
    exit /b 1
)

echo [INFO] Node.js is installed
node --version
echo.

REM Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed!
    pause
    exit /b 1
)

echo [INFO] npm is installed
npm --version
echo.

REM Check if .env file exists
if not exist .env (
    echo [WARNING] .env file not found!
    echo.
    echo Creating .env file from .env.example...
    if exist .env.example (
        copy .env.example .env
        echo.
        echo [ACTION REQUIRED] Please edit .env file and add your Supabase credentials:
        echo   - DB_USER
        echo   - DB_PASSWORD
        echo   - DB_HOST
        echo   - SUPABASE_URL
        echo   - SUPABASE_KEY
        echo.
        notepad .env
    ) else (
        echo [ERROR] .env.example not found! Cannot create .env file.
        pause
        exit /b 1
    )
)

echo ========================================
echo Installing Dependencies...
echo ========================================
echo.

call npm install

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Failed to install dependencies!
    pause
    exit /b 1
)

echo.
echo ========================================
echo Running Database Migrations...
echo ========================================
echo.

call npm run migrate

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Failed to run migrations!
    echo Please check your database connection in .env file.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Seeding Database...
echo ========================================
echo.

call npm run seed

if %errorlevel% neq 0 (
    echo.
    echo [WARNING] Failed to seed database!
    echo This might be okay if data already exists.
)

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Backend is ready to use!
echo.
echo To start the server, run:
echo   start.bat
echo.
echo Or manually run:
echo   npm start
echo.
pause

