@echo off
echo Updating all API URLs to port 3001...

powershell -Command "(Get-Content 'src\components\modules\StudentManagement.tsx') -replace 'localhost:5001', 'localhost:3001' | Set-Content 'src\components\modules\StudentManagement.tsx'"
powershell -Command "(Get-Content 'src\components\modules\FeeManagement.tsx') -replace 'localhost:5001', 'localhost:3001' | Set-Content 'src\components\modules\FeeManagement.tsx'"
powershell -Command "(Get-Content 'src\components\modules\HostelManagement.tsx') -replace 'localhost:5001', 'localhost:3001' | Set-Content 'src\components\modules\HostelManagement.tsx'"
powershell -Command "(Get-Content 'src\components\modules\LibraryManagement.tsx') -replace 'localhost:5001', 'localhost:3001' | Set-Content 'src\components\modules\LibraryManagement.tsx'"
powershell -Command "(Get-Content 'src\components\modules\ExamManagement.tsx') -replace 'localhost:5001', 'localhost:3001' | Set-Content 'src\components\modules\ExamManagement.tsx'"
powershell -Command "(Get-Content 'src\components\modules\AttendanceManagement.tsx') -replace 'localhost:5001', 'localhost:3001' | Set-Content 'src\components\modules\AttendanceManagement.tsx'"
powershell -Command "(Get-Content 'src\components\modules\TransportManagement.tsx') -replace 'localhost:5001', 'localhost:3001' | Set-Content 'src\components\modules\TransportManagement.tsx'"
powershell -Command "(Get-Content 'start-erp.bat') -replace 'localhost:5001', 'localhost:3001' | Set-Content 'start-erp.bat'"

echo All API URLs updated to port 3001
echo Now run: npm start in backend folder
pause