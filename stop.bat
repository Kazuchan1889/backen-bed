@echo off
echo ========================================
echo Stop JKC Bed Management Backend Server
echo ========================================
echo.

echo [INFO] Searching for running Node.js processes...
echo.

REM Find and kill node processes running on port 3001
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3001 ^| findstr LISTENING') do (
    echo Found process on port 3001 with PID: %%a
    taskkill /F /PID %%a
    echo Process terminated.
    echo.
)

REM Also kill all node.exe processes (optional, can be removed if too aggressive)
echo [INFO] Stopping all Node.js processes...
taskkill /F /IM node.exe 2>nul

if %errorlevel% equ 0 (
    echo [SUCCESS] All Node.js processes stopped!
) else (
    echo [INFO] No Node.js processes were running.
)

echo.
pause

