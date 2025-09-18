export const validateAdmissionForm = (data: any) => {
  const errors: string[] = [];
  
  if (!data.name?.trim()) errors.push('Name is required');
  if (!data.email?.trim()) errors.push('Email is required');
  if (!data.phone?.trim()) errors.push('Phone is required');
  if (!data.dob) errors.push('Date of birth is required');
  if (!data.course) errors.push('Course selection is required');
  
  if (data.email && !/\S+@\S+\.\S+/.test(data.email)) {
    errors.push('Invalid email format');
  }
  
  if (data.phone && !/^\+91-\d{10}$/.test(data.phone)) {
    errors.push('Phone must be in format +91-XXXXXXXXXX');
  }
  
  return { isValid: errors.length === 0, errors };
};

export const validateFeePayment = (amount: number, feeStructure: any) => {
  const errors: string[] = [];
  
  if (amount <= 0) errors.push('Amount must be greater than 0');
  if (amount > feeStructure.maxAmount) errors.push('Amount exceeds maximum fee limit');
  
  return { isValid: errors.length === 0, errors };
};

export const validateHostelAllocation = (roomId: string, capacity: number, occupied: number) => {
  const errors: string[] = [];
  
  if (occupied >= capacity) errors.push('Room is fully occupied');
  if (!roomId) errors.push('Room ID is required');
  
  return { isValid: errors.length === 0, errors };
};