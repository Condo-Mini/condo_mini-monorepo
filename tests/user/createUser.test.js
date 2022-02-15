import testFunctions from './testFunctions';
import httpStatus from '../../src/constants/httpStatus';
import authService from '../../src/services/authService';
import { createUserToDB } from '../helpers/userHelper';

describe('POST /user test suite', () => {
  const context = {};
  const baseRequestInfo = {
    url: 'http://localhost:3000/user',
    method: 'post',
  };

  before(async () => {
    context.sudoAdmin = await createUserToDB({
      firstName: 'Matheus',
      role: 'sudo',
    });
    context.sudoAdminAuthHeader = authService.sign({
      jwtPayload: {
        user: {
          id: context.sudoAdmin.id,
        },
      },
    });
  });

  describe('Failure cases', () => {});

  describe('Success cases', () => {
    it('Create', (done) => {
      const given = {
        ...baseRequestInfo,
      };
      const when = {
        authorization: context.sudoAdminAuthHeader,
      };
      const then = {
        expectedStatus: httpStatus.OK,
      };

      testFunctions.create.success({ given, when, then, done });
    });
  });
});
