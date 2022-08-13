import axios from 'axios';
import { sanitizeZipCodeReplacementPattern, zipCodePattern } from '../../../../constants/addressContants.js';
import AddressError from '../../../../errors/AddressError.js';
import BaseError from '../../../../errors/BaseError.js';
import { validateExpressionPatternPolicy } from '../../../../helpers/regExHelper.js';
import messages from '../../../../messages/index.js';
import BaseWorkflow from '../../../BaseWorkflow.js';

export default class GetByZipCode extends BaseWorkflow {
  _sanitizeZipCode = (zipCode) => zipCode.replace(sanitizeZipCodeReplacementPattern, '');

  format = (rawInput) => ({
    zipCode: this._sanitizeZipCode(rawInput.zipCode),
  });

  validate = (input) => {
    const { zipCode } = input;

    validateExpressionPatternPolicy(zipCode, zipCodePattern);
  };

  _fetchFormattedAddressInfoFromZipCode = async (sanitizedZipCode) => {
    const { data: viacepResponse } = await axios
      .get(`https://viacep.com.br/ws/${sanitizedZipCode}/json`)
      .catch((error) => {
        throw new BaseError({
          message: `ViaCEP: ${error.message}`,
          statusCode: error.response.status,
        });
      });

    if (viacepResponse.erro) {
      throw new AddressError({
        message: messages.get('ERROR.ADDRESS.NOT_FOUND_WITH_ZIP_CODE', sanitizedZipCode),
      });
    }

    const { uf: state, localidade: city, logradouro: street, ddd: areaCode, complemento: details } = viacepResponse;

    return {
      state,
      city,
      street,
      areaCode,
      zipCode: sanitizedZipCode,
      ...(details ? { details } : {}),
    };
  };

  process = async (input) => {
    const { zipCode } = input;

    const addressInfo = await this._fetchFormattedAddressInfoFromZipCode(zipCode);

    return addressInfo;
  };
}
