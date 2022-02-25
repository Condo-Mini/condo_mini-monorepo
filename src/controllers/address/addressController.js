import { validateExpressionPatternPolicy } from '../../helpers/regExHelper';
import { zipCodePattern, statePattern } from '../../constants/addressContants';
import userRoleEnum from '../../models/user/enums/userRoleEnum';
import addressService from '../../services/addressService';
import httpStatus from '../../constants/httpStatus';
import AddressDTO from './DTOs/AddressDTO';
import Controller from '../Controller';

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

  addressController.create = new Controller()
    .addStandardMiddlewares((req) => {
      req.permissionRole = userRoleEnum.GUARD;
    })
    .addPre((req) => {
      const { 
        body: { zipCode, state }, 
      } = req;
      
     validateExpressionPatternPolicy(zipCode, zipCodePattern);
     validateExpressionPatternPolicy(state, statePattern);
    })
    .setEndpoint(
      async(req) => {
        const {loggedUser, body } = req;

        const addressInfo = await addressService.workflows.create({
          loggedUser,
          ...body,
        });
        
        return addressInfo;
      },
      { successStatusCode: httpStatus.CREATED, DTOClass: AddressDTO }
    );

export default addressController;
