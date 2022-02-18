const ERROR = {
  VALIDATION: {
    VALIDATION_ERROR: 'Validation error',
  },
  AUTH: {
    INVALID_EMAIL_OR_PASSWORD: 'Invalid email or password',
    AUTH_HEADER_IS_MISSING: 'Authentication header is missing',
    FORBIDDEN_ENDPOINT: (...args) =>
      `Logged user must have ${args[0]} authorization level or higher to use this endpoint`,
    FORBIDDEN_HIERARCHY: (...args) =>
      `Logged user can only modify users with authorization level lower than or equal to ${args[0]}`,
  },
  USER: {
    EMAIL_ALREADY_REGISTERED: 'Email is already registered',
    EMAIL_IS_NOT_REGISTERED: 'Email is not registered in the system',
    INVALID_PASSWORD: 'Invalid password',
    NOT_FOUNT: 'The user was not found',
  },
  ADDRESS: {
    NOT_FOUND_WITH_ZIP_CODE: 'Address with zip code %s not found',
  },
  REGEX: {
    INVALID_EXPRESSION:
      'Expression %s does not match with the pattern policy %s',
  },
};

export default {
  ERROR,
};
