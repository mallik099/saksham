const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB Atlas');

    // Clear existing users
    await User.deleteMany({});

    // Create demo users
    const users = [
      {
        name: 'Admin User',
        email: 'admin@campus.edu',
        password: 'admin123',
        role: 'admin',
        phone: '+91-9876543210'
      },
      {
        name: 'Staff User',
        email: 'staff@campus.edu',
        password: 'staff123',
        role: 'staff',
        phone: '+91-9876543211'
      },
      {
        name: 'Rahul Sharma',
        email: 'student@campus.edu',
        password: 'student123',
        role: 'student',
        phone: '+91-9876543212',
        studentId: '24STU0001'
      }
    ];

    for (const userData of users) {
      const user = new User(userData);
      await user.save();
      console.log(`Created user: ${user.email}`);
    }

    console.log('Demo users created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedUsers();