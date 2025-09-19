export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  message?: string;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

export interface ValidationErrors {
  [key: string]: string;
}

export const validateForm = (data: Record<string, any>, rules: ValidationRules): ValidationErrors => {
  const errors: ValidationErrors = {};

  Object.keys(rules).forEach(field => {
    const value = data[field];
    const rule = rules[field];

    if (rule.required && (!value || value.toString().trim() === '')) {
      errors[field] = rule.message || `${field} is required`;
      return;
    }

    if (value && rule.minLength && value.toString().length < rule.minLength) {
      errors[field] = rule.message || `${field} must be at least ${rule.minLength} characters`;
      return;
    }

    if (value && rule.maxLength && value.toString().length > rule.maxLength) {
      errors[field] = rule.message || `${field} must not exceed ${rule.maxLength} characters`;
      return;
    }

    if (value && rule.pattern && !rule.pattern.test(value.toString())) {
      errors[field] = rule.message || `${field} format is invalid`;
      return;
    }
  });

  return errors;
};

export const commonRules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address'
  },
  phone: {
    required: true,
    pattern: /^[+]?[\d\s-()]{10,}$/,
    message: 'Please enter a valid phone number'
  },
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    message: 'Name must be between 2-50 characters'
  }
};