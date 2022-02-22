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

  validate = async (input) => {
    const { street, number, zipCode } = input;

    await validateUniqueStreetNumberZipCodeIndex({ street, number, zipCode });
  };

  _getUpdatableFields = (addressInfo) =>
    Object.entries(addressInfo)
      .filter(([_key, value]) => !value)
      .map(([key, _value]) => key);

  process = async (input) => {
    const { loggedUser, street, number, zipCode, notes } = input;

    const addressInfo = await viacepService.workflows.getByZipCode({
      zipCode,
    });

    validateStreetRequireness({
      systemStreet: addressInfo.street,
      inputStreet: street,
    });

    const address = new AddressModel({
      updatableFields: this._getUpdatableFields(addressInfo),
      creationType: addressCreationTypeEnum.BY_ZIP_CODE,
      ...(street ? { street } : {}),
      ...(notes ? { notes } : {}),
      createdBy: loggedUser.id,
      createdAt: new Date(),
      ...addressInfo,
      number,
    });

    await address.save();

    return address;
  };
}
