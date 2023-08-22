import dayjs from 'dayjs';

export const nameValidator = (name: string): boolean => /[a-z-A-Z]/g.test(name);
export const emailValidator = (email: string): boolean =>
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email,
  );
export const lengthValidator = (pwd: string, len?: number): boolean =>
  pwd.length >= (len || 12);
export const containsNumberValidator = (pwd: string): boolean =>
  /[0-9]/g.test(pwd);
export const containsSymbolValidator = (pwd: string): boolean =>
  /[-!$%^&*()_+|~=`{}[\]:";'<>?,./]/g.test(pwd);
export const isValidPassword = (pwd: string): boolean =>
  lengthValidator(pwd) &&
  containsNumberValidator(pwd) &&
  containsSymbolValidator(pwd);
export const passwordConfirmationValidator = (
  pwd: string,
  confirmPwd: string,
): boolean => !!(pwd && pwd === confirmPwd);
export const phoneNumberValidator = (phoneNumber: string): boolean =>
  /^\d+$/.test(phoneNumber);
export const dateOfBirthValidator = (dob: Date): boolean => dob !== null;

export const emailValidationErrorText = (email: string) => {
  if (!email) {
    return 'Email cannot be empty';
  }
  if (!emailValidator(email)) {
    return 'Email provided is not valid';
  }

  return 'Email provided is not valid';
};

export const nameValidationErrorText = (name: string) => {
  if (!name) {
    return 'Name cannot be empty';
  }
  if (!nameValidator(name)) {
    return 'Must be a valid name';
  }

  return 'Must be a valid name';
};

export const zipCodeValidationErrorText = (zipCode: string, length: number) => {
  if (!zipCode) {
    return 'Zip code cannot be empty';
  }
  if (!lengthValidator(zipCode, length)) {
    return 'Zip code must be greater than 4 characters';
  }
  return 'Provide a valid zip code';
};

export const addressCodeValidationErrorText = (address: string) => {
  if (!address) {
    return 'Address cannot be empty';
  }
  return 'Provide a valid address';
};

export const phoneNumberValidationErrorText = (
  phoneNumber: string,
  length: number,
) => {
  if (!phoneNumber) {
    return 'Phone number cannot be empty';
  }
  if (!phoneNumberValidator(phoneNumber)) {
    return 'Please enter only digits';
  }
  if (!lengthValidator(phoneNumber, length)) {
    return 'Please enter a 10-digit phone number';
  }
  return 'Please provide a valid phone number';
};

export const countryValidationErrorText = (id: number) => {
  if (id < 1 || id === undefined) {
    return 'Select country';
  }
  return 'Select valid country';
};

export const stateValidationErrorText = (id: number) => {
  if (id < 1 || id === undefined) {
    return 'Select state';
  }
  return 'Select valid state';
};

export const dobValidation = (dateOfBirth: any, age: number) => {
  if (!dateOfBirth) {
    return 'Date of birth is required';
  }
  if (!isAboveAgeValidator(dateOfBirth, age)) {
    return `You must be above ${age} years`;
  }
  return null;
};

export const isAboveAgeValidator = (dateOfBirth: Date, age: number) => {
  const now = dayjs();
  if (now.diff(dateOfBirth, 'year') < age) {
    return false;
  }
  if (now.diff(dateOfBirth, 'year') === age) {
    if (now.isBefore(dateOfBirth, 'month')) {
      return false;
    }
    if (now.isSame(dateOfBirth, 'month')) {
      if (now.isBefore(dateOfBirth, 'date')) {
        return false;
      }
    }
  }
  return true;
};

export const emailPatternValidator =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

