@echo off
echo Starting CampusFlow ERP on port 8000...

cd backend
start "Backend" cmd /k "set PORT=8000 && node server.js"
echo Backend starting on http://localhost:8000

cd ..
timeout /t 3 /nobreak > nul
start "Frontend" cmd /k "npm run dev"
echo Frontend starting on http://localhost:5173

echo.
echo Open http://localhost:5173 in your browser
echo Demo credentials:
echo Admin: admin@example.com / Admin@123
echo Student: student@example.com / Student@123
pause