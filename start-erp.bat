@echo off
echo Starting CampusFlow ERP System...
echo.

echo Installing backend dependencies...
cd backend
call npm install
echo.

echo Starting backend server...
start "Backend Server" cmd /k "npm start"
echo Backend server starting on http://localhost:3001
echo.

echo Installing frontend dependencies...
cd ..
call npm install
echo.

echo Starting frontend development server...
start "Frontend Server" cmd /k "npm run dev"
echo Frontend server starting on http://localhost:5173
echo.

echo.
echo ========================================
echo CampusFlow ERP System is starting...
echo ========================================
echo.
echo Backend: http://localhost:3001
echo Frontend: http://localhost:5173
echo.
echo Demo Credentials:
echo Admin: admin@example.com / Admin@123
echo Faculty: faculty@example.com / Faculty@123
echo Staff: staff@example.com / Staff@123
echo Student: student@example.com / Student@123
echo.
echo Press any key to exit...
pause