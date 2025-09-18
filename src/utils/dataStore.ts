// Single Source of Truth - Centralized data management
class DataStore {
  private static instance: DataStore;
  
  static getInstance(): DataStore {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore();
    }
    return DataStore.instance;
  }

  // Student data management
  getStudents() {
    return JSON.parse(localStorage.getItem('students') || '[]');
  }

  updateStudent(studentId: string, data: any) {
    const students = this.getStudents();
    const index = students.findIndex((s: any) => s.id === studentId);
    if (index !== -1) {
      students[index] = { ...students[index], ...data };
      localStorage.setItem('students', JSON.stringify(students));
      this.notifyDataChange('student', studentId, data);
    }
  }

  // Fee data management
  getFees() {
    return JSON.parse(localStorage.getItem('fees') || '[]');
  }

  updateFee(feeId: string, data: any) {
    const fees = this.getFees();
    const index = fees.findIndex((f: any) => f.id === feeId);
    if (index !== -1) {
      fees[index] = { ...fees[index], ...data };
      localStorage.setItem('fees', JSON.stringify(fees));
      this.notifyDataChange('fee', feeId, data);
    }
  }

  // Hostel data management
  getHostelRooms() {
    return JSON.parse(localStorage.getItem('hostelRooms') || '[]');
  }

  updateHostelRoom(roomId: string, data: any) {
    const rooms = this.getHostelRooms();
    const index = rooms.findIndex((r: any) => r.id === roomId);
    if (index !== -1) {
      rooms[index] = { ...rooms[index], ...data };
      localStorage.setItem('hostelRooms', JSON.stringify(rooms));
      this.notifyDataChange('hostelRoom', roomId, data);
    }
  }

  // Real-time data update notification
  private notifyDataChange(type: string, id: string, data: any) {
    const event = new CustomEvent('dataUpdate', {
      detail: { type, id, data, timestamp: new Date().toISOString() }
    });
    window.dispatchEvent(event);
  }

  // Backup functionality
  createBackup() {
    const backup = {
      timestamp: new Date().toISOString(),
      students: this.getStudents(),
      fees: this.getFees(),
      hostelRooms: this.getHostelRooms(),
    };
    
    localStorage.setItem(`backup_${Date.now()}`, JSON.stringify(backup));
    console.log('Backup created:', backup.timestamp);
  }
}

export const dataStore = DataStore.getInstance();