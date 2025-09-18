const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const Student = require('../models/Student');
const Fee = require('../models/Fee');
const Hostel = require('../models/Hostel');
const Library = require('../models/Library');
const Exam = require('../models/Exam');
const User = require('../models/User');
const Audit = require('../models/Audit');

async function createBackup() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for backup');
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = path.join(__dirname, '../backups');
    
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    const backup = {
      timestamp: new Date().toISOString(),
      students: await Student.find({}),
      fees: await Fee.find({}),
      hostels: await Hostel.find({}),
      library: await Library.find({}),
      exams: await Exam.find({}),
      users: await User.find({}).select('-password'),
      audits: await Audit.find({}).limit(1000).sort({ timestamp: -1 })
    };
    
    const filename = `backup_${timestamp}.json`;
    const filepath = path.join(backupDir, filename);
    
    fs.writeFileSync(filepath, JSON.stringify(backup, null, 2));
    
    console.log(`Backup created successfully: ${filename}`);
    console.log(`Total records backed up: ${Object.values(backup).reduce((sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0), 0)}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Backup failed:', error);
    process.exit(1);
  }
}

createBackup();