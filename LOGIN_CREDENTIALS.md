# CampusFlow - Login Credentials

## Demo Login Credentials

### Admin User
- **Email:** `admin@campus.edu`
- **Password:** `admin123`
- **Access:** Administrative dashboard with student details, fee collection, and hostel occupancy views

### Staff User  
- **Email:** `staff@campus.edu`
- **Password:** `staff123`
- **Access:** Student admission, hostel allocation, library management, exam registration

### Student User
- **Email:** `student@campus.edu` 
- **Password:** `student123`
- **Access:** Student dashboard, profile, fee payment, exam registration
- **Student Details:** Rahul Sharma, Roll No: 21CSE001, Class: CSE-A, Section: A

## Features by Role

### Student Features
- ✅ View personal dashboard with fee status, hostel room, attendance
- ✅ Fee payment reminders and holiday notifications
- ✅ Access to fee payment and exam registration only
- ✅ Profile management

### Staff Features  
- ✅ Manage student admissions
- ✅ Hostel room allocations
- ✅ Library management
- ✅ Exam registration approvals
- ✅ Department-level dashboard

### Admin Features
- ✅ Complete institutional dashboard
- ✅ Clickable cards for detailed views:
  - **Total Students:** Search and view all student details
  - **Fee Collection:** View payment history with amounts and dates
  - **Hostel Occupancy:** Room-wise occupancy details
- ✅ Indian currency (₹) and phone format (+91)
- ✅ Profile management only (no access to other forms)

## Technical Features
- ✅ Role-based access control (RBAC)
- ✅ Protected routes with JWT simulation
- ✅ Responsive design for mobile and desktop
- ✅ Indian locale formatting (₹, +91 phone format)
- ✅ Loading states and error handling
- ✅ Real-time dashboard updates

## Getting Started
1. Run `npm run dev` to start the development server
2. Open `http://localhost:3000`
3. Use any of the credentials above to login
4. Explore role-based features