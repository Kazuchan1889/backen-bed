@echo off
title JKC Bed Management Backend - Quick Start
color 0A

:MENU
cls
echo ========================================
echo   JKC BED MANAGEMENT BACKEND
echo   Quick Start Menu
echo ========================================
echo.
echo Please select an option:
echo.
echo 1. First Time Setup (Install dependencies and setup database)
echo 2. Start Server (Production mode on port 3001)
echo 3. Start Server (Development mode with auto-reload)
echo 4. Stop Server
echo 5. Install Node.js (Requires Admin)
echo 6. Reset Database (Run migrations again)
echo 7. Seed Database (Add initial data)
echo 8. Check Status
echo 9. Exit
echo.
set /p choice="Enter your choice (1-9): "

if "%choice%"=="1" goto SETUP
if "%choice%"=="2" goto START
if "%choice%"=="3" goto DEV
if "%choice%"=="4" goto STOP
if "%choice%"=="5" goto INSTALL_NODE
if "%choice%"=="6" goto RESET_DB
if "%choice%"=="7" goto SEED
if "%choice%"=="8" goto STATUS
if "%choice%"=="9" goto EXIT

echo Invalid choice! Please try again.
timeout /t 2 >nul
goto MENU

:SETUP
cls
echo ========================================
echo Running First Time Setup...
echo ========================================
echo.
call setup.bat
pause
goto MENU

:START
cls
echo ========================================
echo Starting Server (Production Mode)...
echo ========================================
echo.
call start.bat
goto MENU

:DEV
cls
echo ========================================
echo Starting Server (Development Mode)...
echo ========================================
echo.
call start-dev.bat
goto MENU

:STOP
cls
echo ========================================
echo Stopping Server...
echo ========================================
echo.
call stop.bat
goto MENU

:INSTALL_NODE
cls
echo ========================================
echo Installing Node.js...
echo ========================================
echo.
echo This requires Administrator privileges.
echo.
pause
call install-nodejs.bat
pause
goto MENU

:RESET_DB
cls
echo ========================================
echo Resetting Database...
echo ========================================
echo.
echo [WARNING] This will reset all database tables!
echo.
set /p confirm="Are you sure? (yes/no): "
if /i "%confirm%"=="yes" (
    echo.
    echo Running migrations...
    call npm run migrate
    echo.
    echo Database reset complete!
) else (
    echo Operation cancelled.
)
pause
goto MENU

:SEED
cls
echo ========================================
echo Seeding Database...
echo ========================================
echo.
call npm run seed
pause
goto MENU

:STATUS
cls
echo ========================================
echo System Status Check
echo ========================================
echo.

REM Check Node.js
where node >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] Node.js: INSTALLED
    node --version
) else (
    echo [X] Node.js: NOT INSTALLED
)

echo.

REM Check npm
where npm >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] npm: INSTALLED
    npm --version
) else (
    echo [X] npm: NOT INSTALLED
)

echo.

REM Check dependencies
if exist node_modules (
    echo [OK] Dependencies: INSTALLED
) else (
    echo [X] Dependencies: NOT INSTALLED
)

echo.

REM Check .env
if exist .env (
    echo [OK] Configuration: FOUND (.env file exists)
) else (
    echo [X] Configuration: NOT FOUND (.env file missing)
)

echo.

REM Check if server is running
netstat -ano | findstr :3001 | findstr LISTENING >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] Server Status: RUNNING on port 3001
) else (
    echo [X] Server Status: NOT RUNNING
)

echo.
echo ========================================
pause
goto MENU

:EXIT
cls
echo.
echo Thank you for using JKC Bed Management Backend!
echo.
timeout /t 2 >nul
exit

