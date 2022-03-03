import { zipCodePattern } from '../constants/addressContants';
import { isString } from '../helpers/typeHelper';

export const id = (value) => isString(value) && /^[a-fA-F0-9]{24}$/.test(value);

export const zipCode = (value) => isString(value) && zipCodePattern.test(value);
