import { interpolateTemplateStringWithArgs } from '../helpers/stringHelper';

const ERROR = {
  VALIDATION: {
    VALIDATION_ERROR: 'Validation error',
  },
  AUTH: {
    INVALID_EMAIL_OR_PASSWORD: 'Invalid email or password',
    AUTH_HEADER_IS_MISSING: 'Authentication header is missing',
    FORBIDDEN_ENDPOINT:
      'Logged user must have %s authorization level or higher to use this endpoint',
    FORBIDDEN_HIERARCHY:
      'Logged user can only modify users with authorization level lower than or equal to %s',
  },
  USER: {
    EMAIL_ALREADY_REGISTERED: 'Email is already registered',
    EMAIL_IS_NOT_REGISTERED: 'Email is not registered in the system',
    INVALID_PASSWORD: 'Invalid password',
    NOT_FOUND: 'Could not found a User with the id %s',
  },
  ADDRESS: {
    NOT_FOUND_WITH_ZIP_CODE: 'Address with zip code %s not found',
  },
  REGEX: {
    INVALID_EXPRESSION:
      'Expression %s does not match with the pattern policy %s',
  },
};

const templates = {
  ERROR,
};

export default {
  get: (errorPath, ...args) => {
    const paths = errorPath.split('.');
    const [messageType, entity, errorMessage] = paths;
    const template = templates[messageType][entity][errorMessage];

    const hasPlaceHolders = template.indexOf('%s') !== -1;

    return hasPlaceHolders
      ? interpolateTemplateStringWithArgs(template, ...args)
      : template;
  },
};
