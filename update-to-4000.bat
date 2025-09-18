@echo off
echo Updating all API URLs to port 4000...

powershell -Command "(Get-Content 'src\components\modules\StudentManagement.tsx') -replace 'localhost:3001', 'localhost:4000' | Set-Content 'src\components\modules\StudentManagement.tsx'"
powershell -Command "(Get-Content 'src\components\modules\FeeManagement.tsx') -replace 'localhost:3001', 'localhost:4000' | Set-Content 'src\components\modules\FeeManagement.tsx'"
powershell -Command "(Get-Content 'src\components\modules\HostelManagement.tsx') -replace 'localhost:3001', 'localhost:4000' | Set-Content 'src\components\modules\HostelManagement.tsx'"
powershell -Command "(Get-Content 'src\components\modules\LibraryManagement.tsx') -replace 'localhost:3001', 'localhost:4000' | Set-Content 'src\components\modules\LibraryManagement.tsx'"
powershell -Command "(Get-Content 'src\components\modules\ExamManagement.tsx') -replace 'localhost:3001', 'localhost:4000' | Set-Content 'src\components\modules\ExamManagement.tsx'"
powershell -Command "(Get-Content 'src\components\modules\AttendanceManagement.tsx') -replace 'localhost:3001', 'localhost:4000' | Set-Content 'src\components\modules\AttendanceManagement.tsx'"
powershell -Command "(Get-Content 'src\components\modules\TransportManagement.tsx') -replace 'localhost:3001', 'localhost:4000' | Set-Content 'src\components\modules\TransportManagement.tsx'"

echo All URLs updated to port 4000
echo Starting backend server...
cd backend
start "Backend Server" cmd /k "node server.js"
echo Backend started on http://localhost:4000
pause