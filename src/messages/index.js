const ERROR = {
  AUTH: {
    INVALID_EMAIL_OR_PASSWORD: 'Invalid email or password.',
    AUTH_HEADER_IS_MISSING: 'Authentication header is missing.',
    FORBIDDEN_ENDPOINT: (...args) =>
      `Logged user must have ${args[0]} authorization level or higher to use this endpoint.`,
    FORBIDDEN_HIERARCHY: (...args) =>
      `Logged user can only modify users with authorization level lower than or equal to ${args[0]}.`,
  },
  USER: {
    EMAIL_ALREADY_REGISTERED: 'Email is already registered.',
    EMAIL_IS_NOT_REGISTERED: 'Email is not registered in the system.',
    INVALID_PASSWORD: 'Invalid password.',
  },
};

export default {
  ERROR,
};
