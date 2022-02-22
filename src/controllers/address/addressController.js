import { zipCodePattern } from '../../constants/addressContants';
import httpStatus from '../../constants/httpStatus';
import { validateExpressionPatternPolicy } from '../../helpers/regExHelper';
import userRoleEnum from '../../models/user/enums/userRoleEnum';
import addressService from '../../services/addressService';
import Controller from '../Controller';
import AddressDTO from './DTOs/AddressDTO';

const addressController = {};

addressController.createByZipCode = new Controller()
  .addStandardMiddlewares((req) => {
    req.permissionRole = userRoleEnum.GUARD;
  })
  .addPre((req) => {
    const {
      body: { zipCode },
    } = req;

    validateExpressionPatternPolicy(zipCode, zipCodePattern);
    console.log(zipCode);
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
