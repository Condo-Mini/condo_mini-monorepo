import httpStatus from '../../constants/httpStatus';
import userRoleEnum from '../../models/user/enums/userRoleEnum';
import addressService from '../../services/addressService';
import Controller from '../Controller';
import AddressDTO from './DTOs/AddressDTO';

const addressController = {};

addressController.createByZipCode = new Controller()
  .addStandardMiddlewares((req) => {
    req.permissionRole = userRoleEnum.GUARD;
  })
  .setEndpoint(
    async (req) => {
      const { loggedUser, body } = req;

      const addressInfo = await addressService.workflows.createByZipCode({
        loggedUser,
        ...body,
      });

      return addressInfo;
    },
    { successStatusCode: httpStatus.CREATED, DTOClass: AddressDTO }
  );

export default addressController;
