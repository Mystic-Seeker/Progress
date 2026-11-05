@echo off
title Share Weekly Tracker on Phone
cd /d "%~dp0"

echo ==========================================================
echo    WEEKLY PROGRESS TRACKER - OPEN ON SMARTPHONE
echo ==========================================================
echo.
echo Make sure your phone and computer are on the same Wi-Fi!
echo.
powershell -Command "$ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -notlike '127.*' -and $_.IPAddress -notlike '169.254.*' } | Select-Object -First 1).IPAddress; Write-Host '>>> Type this exact link on your phone browser: http://'$ip':8000' -ForegroundColor Green"
echo.
echo Instructions:
echo  1. On your iPhone: open Safari, type the link above, tap Share -> 'Add to Home Screen'.
echo  2. On your Android: open Chrome, type the link above, tap Menu (3 dots) -> 'Install App' or 'Add to Home screen'.
echo.
echo Press Ctrl + C to stop the server when you are done.
echo ==========================================================
echo.
python -m http.server 8000
pause
