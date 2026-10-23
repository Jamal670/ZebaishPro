/**
 * Shared authentication validation and formatting utilities
 * Recreated faithfully from original Zebaish auth components
 */

export function validateEmail(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return 'Email address is required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return 'Please enter a valid email address.';
  }
  return '';
}

export function validatePassword(value: string, minLength = 6): string {
  if (!value) return 'Password is required.';
  if (value.length < minLength) {
    return `Password must be at least ${minLength} characters long.`;
  }
  return '';
}

export function validateConfirmPassword(confirmVal: string, passwordVal: string): string {
  if (!confirmVal) return 'Please confirm your new password.';
  if (confirmVal !== passwordVal) return 'Passwords do not match.';
  return '';
}

export function validateRequired(value: string, fieldLabel: string): string {
  const trimmed = (value || '').trim();
  if (!trimmed) return `${fieldLabel} is required.`;
  return '';
}

export function validateCustomerPhone(phone: string): string {
  const trimmed = (phone || '').trim();
  if (!trimmed) return 'Phone number is required.';
  if (!/^[0-9+\-\s()]{7,20}$/.test(trimmed)) {
    return 'Please enter a valid phone number.';
  }
  return '';
}

export function validateSellerPhone(phone: string): string {
  const clean = getCleanPhoneDigits(phone);
  if (!clean || clean.length < 10) {
    return 'Please enter a valid 10-digit mobile number (+92 3XX XXXXXXX).';
  }
  return '';
}

/**
 * Formats raw numeric input into Pakistani CNIC format: XXXXX-XXXXXXX-X (max 13 digits)
 */
export function formatCnic(input: string): string {
  const digits = input.replace(/\D/g, '').slice(0, 13);
  if (digits.length <= 5) return digits;
  if (digits.length <= 12) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  return `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12)}`;
}

/**
 * Extracts clean 13-digit CNIC string without hyphens
 */
export function getCleanCnic(input: string): string {
  return input.replace(/\D/g, '').slice(0, 13);
}

/**
 * Formats phone input into +92 XXX XXXXXXX format
 */
export function formatPhone(input: string): string {
  let digits = input.replace(/\D/g, '');

  if (digits.startsWith('92')) {
    digits = digits.slice(2);
  } else if (digits.startsWith('0')) {
    digits = digits.slice(1);
  }

  digits = digits.slice(0, 10);

  if (digits.length === 0) return '+92 ';
  if (digits.length <= 3) return `+92 ${digits}`;
  return `+92 ${digits.slice(0, 3)} ${digits.slice(3)}`;
}

/**
 * Extracts 10-digit phone string after +92
 */
export function getCleanPhoneDigits(input: string): string {
  let digits = input.replace(/\D/g, '');
  if (digits.startsWith('92')) digits = digits.slice(2);
  else if (digits.startsWith('0')) digits = digits.slice(1);
  return digits.slice(0, 10);
}
