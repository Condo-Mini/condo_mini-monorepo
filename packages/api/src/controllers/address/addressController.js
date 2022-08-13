import userRoleEnum from '../../models/user/enums/userRoleEnum.js';
import addressService from '../../services/addressService/index.js';
import httpStatus from '../../constants/httpStatus.js';
import AddressDTO from './DTOs/AddressDTO.js';
import Controller from '../Controller.js';

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
