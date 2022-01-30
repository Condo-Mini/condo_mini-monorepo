const ERROR = {
  AUTH: {
    INVALID_EMAIL_OR_PASSWORD: 'Invalid email or password.',
    AUTH_HEADER_IS_MISSING: 'Authentication header is missing.',
    FORBIDDEN_ACTION:
      'Logged user does not have the authorization to execute this action.',
  },
  USER: {
    EMAIL_ALREADY_REGISTERED: 'Email is already registered.',
    EMAIL_IS_NOT_REGISTERED: 'Email is not registeredin the system.',
    INVALID_PASSWORD: 'Invalid password.',
  },
};

export default {
  ERROR,
};
