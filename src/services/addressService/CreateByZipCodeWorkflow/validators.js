import AddressError from '../../../errors/AddressError';
import messages from '../../../messages';

export const validateStreetRequireness = ({ inputStreet, systemStreet }) => {
  if (
    inputStreet &&
    systemStreet &&
    inputStreet.toLowerCase() !== systemStreet.toLowerCase()
  ) {
    throw new AddressError({
      message: messages.get('ERROR.ADDRESS.STREET_FROM_WRONG_ZIP_CODE'),
    });
  }

  if (!inputStreet && !systemStreet) {
    throw new AddressError({
      message: messages.get('ERROR.ADDRESS.ADDRESS_WITHOUT_STREET'),
    });
  }
};
