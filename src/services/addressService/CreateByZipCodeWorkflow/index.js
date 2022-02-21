import BaseWorkflow from '../../BaseWorkflow';
import viacepService from '../../external/viacepService';
import AddressModel from '../../../models/address/AddressModel';
import { validateUniqueStreetNumberZipCodeIndex } from '../commonValidators';
import { sanitizeZipCodeReplacementPattern } from '../../../constants/addressContants';
import AddressError from '../../../errors/AddressError';
import messages from '../../../messages';
import { validateStreetRequireness } from './validators';
import addressCreationTypeEnum from '../../../models/address/enums/addressCreationTypeEnum';

export default class CreateByZipCodeWorkflow extends BaseWorkflow {
  _sanitizeZipCode = (zipCode) =>
    zipCode.replace(sanitizeZipCodeReplacementPattern, '');

  format = (rawInput) => ({
    loggedUser: rawInput.loggedUser,
    street: rawInput.street,
    number: rawInput.number,
    zipCode: this._sanitizeZipCode(rawInput.zipCode),
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
      inputStreet: street,
      systemStreet: addressInfo.street,
    });

    const address = new AddressModel({
      number,
      ...addressInfo,
      createdAt: new Date(),
      createdBy: loggedUser.id,
      ...(notes ? { notes } : {}),
      ...(street ? { street } : {}),
      creationType: addressCreationTypeEnum.BY_ZIP_CODE,
      updatableFields: this._getUpdatableFields(addressInfo),
    });

    await address.save();

    return address;
  };
}
