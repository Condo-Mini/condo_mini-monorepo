import BaseWorkflow from '../../BaseWorkflow';
import viacepService from '../../external/viacepService';
import AddressModel from '../../../models/address/AddressModel';

export default class CreateByZipCodeWorkflow extends BaseWorkflow {
  format = (rawInput) => ({
    loggedUser: rawInput.loggedUser,
    zipCode: rawInput.zipCode,
    number: rawInput.number,
    details: rawInput.details,
    notes: rawInput.notes,
  });

  validate = (input) => {
    // TODO: validate zipcode number index
  };

  process = async (input) => {
    const { loggedUser, zipCode, number, details, notes } = input;

    const addressInfo = await viacepService.workflows.getByZipCode({
      zipCode,
    });

    const address = new AddressModel({
      ...addressInfo,
      number,
      notes,
      ...(details ? { details } : {}),
      createdBy: loggedUser.id,
      createdAt: new Date(),
    });

    await address.save();
    return address;
  };
}
