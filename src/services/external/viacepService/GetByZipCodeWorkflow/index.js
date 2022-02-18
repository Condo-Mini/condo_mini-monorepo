import axios from 'axios';
import {
  sanitizeZipCodeReplacementPattern,
  zipCodePattern,
} from '../../../../constants/addressContants';
import AddressError from '../../../../errors/AddressError';
import BaseError from '../../../../errors/BaseError';
import { validateExpressionPatternPolicy } from '../../../../helpers/regExHelper';
import messages from '../../../../messages';
import BaseWorkflow from '../../../BaseWorkflow';

export default class GetByZipCode extends BaseWorkflow {
  format = (rawInput) => ({
    zipCode: rawInput.zipCode,
  });

  validate = (input) => {
    const { zipCode } = input;

    validateExpressionPatternPolicy(zipCode, zipCodePattern);
  };

  _sanitizeZipCode = (zipCode) =>
    zipCode.replace(sanitizeZipCodeReplacementPattern, '');

  _fetchFormattedAddressInfoFromZipCode = async (sanitizedZipCode) => {
    const { data: addressInfo } = await axios
      .get(`https://viacep.com.br/ws/${sanitizedZipCode}/json`)
      .catch((error) => {
        throw new BaseError({
          message: `ViaCEP: ${error.message}`,
          statusCode: error.response.status,
        });
      });

    if (addressInfo.erro) {
      throw new AddressError({
        message: messages.get(
          'ERROR.ADDRESS.NOT_FOUND_WITH_ZIP_CODE',
          sanitizedZipCode
        ),
      });
    }

    const {
      uf: state,
      localidade: city,
      logradouro: street,
      cep: zipCode,
      ddd: areaCode,
      complemento: details,
    } = addressInfo;

    return {
      state,
      city,
      street,
      zipCode,
      areaCode,
      ...(details ? { details } : {}),
    };
  };

  process = async (input) => {
    const { zipCode } = input;
    const sanitizedZipCode = this._sanitizeZipCode(zipCode);

    const addressInfo = await this._fetchFormattedAddressInfoFromZipCode(
      sanitizedZipCode
    );

    return addressInfo;
  };
}
