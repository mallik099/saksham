# College ERP Database Schema

## Overview
This document outlines the complete database schema for the College ERP system, designed to manage all aspects of college administration including academics, finances, infrastructure, and communication.

## Core Models

### 1. User Model
**Purpose**: Authentication and role management
- **Fields**: name, email, password, role, phone, studentId, isActive
- **Roles**: admin, staff, student
- **Features**: Password hashing, role-based access

### 2. Student Model
**Purpose**: Complete student information management
- **Fields**: studentId, personal info, course, department, academic info, guardian details, hostel info, library info, fee status
- **Features**: Auto-generated student ID, comprehensive profile management

### 3. Faculty Model
**Purpose**: Faculty and staff management
- **Fields**: employeeId, personal info, department, designation, qualification, salary, subjects
- **Features**: Auto-generated employee ID, subject assignment

### 4. Department Model
**Purpose**: Academic department organization
- **Fields**: code, name, hod, faculty, courses, budget
- **Features**: Department hierarchy, budget tracking

## Academic Models

### 5. Course Model
**Purpose**: Academic program management
- **Fields**: code, name, department, duration, seats, fee structure, subjects
- **Features**: Seat management, comprehensive fee structure

### 6. Subject Model
**Purpose**: Course curriculum management
- **Fields**: code, name, course, semester, credits, type, faculty, syllabus
- **Features**: Credit system, faculty assignment

### 7. Exam Model
**Purpose**: Examination management
- **Fields**: student, subject, exam details, marks, grade, GPA, attendance
- **Features**: Auto grade calculation, GPA computation

### 8. Assignment Model
**Purpose**: Assignment and submission tracking
- **Fields**: title, description, subject, faculty, due date, submissions, grading
- **Features**: File attachments, automated grading workflow

### 9. Attendance Model
**Purpose**: Student attendance tracking
- **Fields**: student, subject, date, status, marked by, remarks
- **Features**: Daily attendance, faculty marking

### 10. Timetable Model
**Purpose**: Class scheduling
- **Fields**: course, semester, day, time slot, subject, faculty, room
- **Features**: Conflict prevention, room allocation

## Financial Models

### 11. Fee Model
**Purpose**: Comprehensive fee management
- **Fields**: student, academic year, fee structure, payments, due dates, discounts
- **Features**: Multiple fee types, payment tracking, late fee calculation

## Infrastructure Models

### 12. Hostel Model
**Purpose**: Hostel accommodation management
- **Fields**: room details, capacity, occupancy, students, facilities, rent
- **Features**: Occupancy tracking, facility management

### 13. Transport Model
**Purpose**: College transportation management
- **Fields**: route details, driver info, vehicle details, stops, students
- **Features**: Route optimization, fare management

## Library Models

### 14. Library Model
**Purpose**: Book issue/return tracking
- **Fields**: student, book details, issue/due/return dates, fine calculation
- **Features**: Auto fine calculation, overdue tracking

### 15. Book Model
**Purpose**: Library inventory management
- **Fields**: ISBN, title, author, publisher, copies, location, price
- **Features**: Inventory tracking, location management

## Communication Models

### 16. Notice Model
**Purpose**: Announcements and notifications
- **Fields**: title, content, author, target audience, priority, attachments
- **Features**: Targeted messaging, read tracking

### 17. Complaint Model
**Purpose**: Grievance management
- **Fields**: complaint details, category, priority, status, resolution, feedback
- **Features**: Auto complaint ID, resolution tracking

## Event Models

### 18. Event Model
**Purpose**: College events and activities
- **Fields**: event details, type, organizer, venue, dates, registration, participants
- **Features**: Registration management, participant tracking

## System Models

### 19. Audit Model
**Purpose**: System activity logging
- **Fields**: user, action, resource, timestamp, details
- **Features**: Complete audit trail, security monitoring

## Key Features

### 1. Auto-Generated IDs
- Student ID: `{YY}STU{0001}`
- Employee ID: `{YY}FAC{0001}`
- Receipt Number: `RCP{YYYY}{000001}`
- Complaint ID: `CMP{YYYY}{0001}`

### 2. Relationships
- **One-to-Many**: Department → Faculty, Course → Students
- **Many-to-Many**: Faculty ↔ Subjects, Students ↔ Events
- **Referenced**: All models use ObjectId references for data integrity

### 3. Validation
- Email uniqueness across users
- Phone number format validation
- Grade and GPA auto-calculation
- Fee structure validation

### 4. Indexing
- Unique indexes on critical fields (email, studentId, employeeId)
- Compound indexes for attendance tracking
- Performance optimization for queries

### 5. Security Features
- Password hashing with bcrypt
- Role-based access control
- Audit logging for all operations
- Data validation and sanitization

## Usage Guidelines

1. **Data Integrity**: All foreign key relationships use ObjectId references
2. **Performance**: Proper indexing for frequently queried fields
3. **Scalability**: Modular design allows easy extension
4. **Security**: Built-in authentication and authorization
5. **Audit**: Complete activity tracking for compliance

This schema provides a solid foundation for a comprehensive college ERP system with room for future enhancements and customizations.