import addressCreationTypeEnum from '../../../models/address/enums/addressCreationTypeEnum.js';
import { sanitizeZipCodeReplacementPattern } from '../../../constants/addressContants.js';
import { validateUniqueStreetNumberZipCodeIndex } from '../commonValidators.js';
import AddressModel from '../../../models/address/AddressModel.js';
import { validateStreetRequireness } from './validators.js';
import viacepService from '../../external/viacepService/index.js';
import BaseWorkflow from '../../BaseWorkflow.js';

export default class CreateByZipCodeWorkflow extends BaseWorkflow {
  _sanitizeZipCode = (zipCode) => zipCode.replace(sanitizeZipCodeReplacementPattern, '');

  format = (rawInput) => ({
    zipCode: this._sanitizeZipCode(rawInput.zipCode),
    loggedUser: rawInput.loggedUser,
    street: rawInput.street,
    number: rawInput.number,
    notes: rawInput.notes,
  });

  validate = (t) => t;

  _getUpdatableFields = (addressInfo) => {
    const defaultUpdatableFields = ['notes', 'number'];

    const manuallyCreatedFields = Object.entries(addressInfo)
      .filter(([, value]) => !value)
      .map(([key]) => key);

    return [...defaultUpdatableFields, ...manuallyCreatedFields];
  };

  process = async (input) => {
    const { loggedUser, street, number, zipCode, notes } = input;

    const addressInfo = await viacepService.workflows.getByZipCode({
      zipCode,
    });

    validateStreetRequireness({
      systemStreet: addressInfo.street,
      inputStreet: street,
    });

    await validateUniqueStreetNumberZipCodeIndex({
      street: addressInfo.street || street,
      number,
      zipCode,
    });

    const address = new AddressModel({
      ...addressInfo,
      updatableFields: this._getUpdatableFields(addressInfo),
      creationType: addressCreationTypeEnum.BY_ZIP_CODE,
      street: addressInfo.street || street,
      ...(notes ? { notes } : {}),
      createdBy: loggedUser.id,
      createdAt: new Date(),
      number,
    });

    await address.save();

    return address;
  };
}
