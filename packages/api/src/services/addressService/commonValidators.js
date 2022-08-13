import AddressError from '../../errors/AddressError.js';
import messages from '../../messages/index.js';
import AddressModel from '../../models/address/AddressModel.js';

export const validateUniqueStreetNumberZipCodeIndex = async ({ street, number, zipCode }) => {
  const isAddressAlreadyRegistered = await AddressModel.existsWith({
    street,
    number,
    zipCode,
  });

  if (isAddressAlreadyRegistered) {
    throw new AddressError({
      message: messages.get('ERROR.ADDRESS.ADDRESS_ALREADY_REGISTERED'),
    });
  }
};
