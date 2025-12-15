@echo off
echo ========================================
echo Node.js Installation Script
echo ========================================
echo.

REM Check if running as administrator
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] This script requires Administrator privileges!
    echo.
    echo Please right-click this file and select "Run as administrator"
    pause
    exit /b 1
)

REM Check if Node.js is already installed
where node >nul 2>nul
if %errorlevel% equ 0 (
    echo [INFO] Node.js is already installed!
    node --version
    npm --version
    echo.
    echo You can proceed to run setup.bat
    pause
    exit /b 0
)

echo [INFO] Checking for package managers...
echo.

REM Check if winget is available (Windows 10/11)
where winget >nul 2>nul
if %errorlevel% equ 0 (
    echo [INFO] Found winget! Installing Node.js...
    echo.
    winget install OpenJS.NodeJS.LTS -e --silent
    
    if %errorlevel% equ 0 (
        echo.
        echo [SUCCESS] Node.js installed successfully!
        echo.
        echo Please close this window and open a new Command Prompt
        echo Then run setup.bat to continue.
        pause
        exit /b 0
    ) else (
        echo [ERROR] Failed to install Node.js using winget
    )
)

REM Check if chocolatey is available
where choco >nul 2>nul
if %errorlevel% equ 0 (
    echo [INFO] Found Chocolatey! Installing Node.js...
    echo.
    choco install nodejs-lts -y
    
    if %errorlevel% equ 0 (
        echo.
        echo [SUCCESS] Node.js installed successfully!
        echo.
        echo Please close this window and open a new Command Prompt
        echo Then run setup.bat to continue.
        pause
        exit /b 0
    ) else (
        echo [ERROR] Failed to install Node.js using Chocolatey
    )
)

REM Manual installation instructions
echo ========================================
echo Manual Installation Required
echo ========================================
echo.
echo No package manager found. Please install Node.js manually:
echo.
echo 1. Visit: https://nodejs.org/
echo 2. Download the LTS (Long Term Support) version
echo 3. Run the installer
echo 4. After installation, run setup.bat
echo.
echo Opening Node.js website...
start https://nodejs.org/

pause

