@echo off
echo ========================================
echo JKC Bed Management Backend - DEV MODE
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo Please run setup.bat first.
    pause
    exit /b 1
)

REM Check if node_modules exists
if not exist node_modules (
    echo [ERROR] Dependencies not installed!
    echo Please run setup.bat first.
    pause
    exit /b 1
)

REM Check if .env file exists
if not exist .env (
    echo [ERROR] .env file not found!
    echo Please run setup.bat first.
    pause
    exit /b 1
)

echo [INFO] Starting server in DEVELOPMENT mode with auto-reload...
echo.
echo Server will restart automatically when files change
echo Press Ctrl+C to stop the server
echo.
echo ========================================
echo.

npm run dev

