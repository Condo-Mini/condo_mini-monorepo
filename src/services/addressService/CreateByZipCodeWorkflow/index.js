import addressCreationTypeEnum from '../../../models/address/enums/addressCreationTypeEnum';
import { sanitizeZipCodeReplacementPattern } from '../../../constants/addressContants';
import { validateUniqueStreetNumberZipCodeIndex } from '../commonValidators';
import AddressModel from '../../../models/address/AddressModel';
import { validateStreetRequireness } from './validators';
import viacepService from '../../external/viacepService';
import BaseWorkflow from '../../BaseWorkflow';

export default class CreateByZipCodeWorkflow extends BaseWorkflow {
  _sanitizeZipCode = (zipCode) =>
    zipCode.replace(sanitizeZipCodeReplacementPattern, '');

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
      .filter(([_key, value]) => !value)
      .map(([key, _value]) => key);

    return [...defaultUpdatableFields, ...manuallyCreatedFields];
  };

  process = async (input) => {
    const { loggedUser, street, number, zipCode, notes } = input;
    const defaultUpdatableFields = ['notes', 'number'];

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
