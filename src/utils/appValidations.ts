const VALID_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const isEmailValid = (email: string) => {
  return VALID_EMAIL_REGEX.test(String(email).toLowerCase());
};

const cleanEmail = (email: string) => {
  return String(email).trim().toLowerCase();
};

export {
  isEmailValid,
  cleanEmail
}
