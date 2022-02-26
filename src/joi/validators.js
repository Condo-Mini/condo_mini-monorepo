import { zipCodePattern } from '../constants/addressContants';
import { isString } from '../helpers/typeHelper';

export const idValidator = {
  type: 'id',
  errorMessage: 'Invalid Id',
  isValid: (value) => isString(value) && /^[a-fA-F0-9]{24}$/.test(value),
};

export const zipCodeValidator = {
  type: 'zipCode',
  errorMessage: 'Invalid Zip Code',
  isValid: (value) => isString(value) && zipCodePattern.test(value),
};
