export const isRequired = (value) => {
  return value !== null && value !== undefined && value !== "";
};

export const isPositiveNumber = (value) => {
  return !isNaN(value) && Number(value) > 0;
};

export const validateEmail = (email) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateQuantity = (qty) => {
  return Number(qty) > 0;
};
