import testFunctions from './testFunctions';
import httpStatus from '../../src/constants/httpStatus';

describe('POST /user test suite', () => {
  describe('Failure cases', () => {});

  describe('Success cases', () => {
    it('Create', (done) => {
      const given = {};
      const when = {};
      const then = {
        expectedStatus: httpStatus.OK,
      };

      testFunctions.create.success({ given, when, then, done });
    });
  });
});
