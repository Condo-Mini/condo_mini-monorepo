import { expect } from 'chai';
import { baseRequest } from '../helpers/testRequestsHelper';

const baseUserRequest = ({ given, when, then, assertCallback, done }) => {
  baseRequest(
    {
      url: given.url,
      method: given.method,
      query: given.query,
      body: given.body,
    },
    {
      authorization: when.authorization,
    },
    {
      expectedStatus: then.expectedStatus,
    },
    assertCallback,
    done
  );
};

export default {
  create: {
    success: async ({ given, when, then, done }) => {
      const assertCallback = (res) => {
        expect(res.body).to.equal({});
      };

      done();
      // baseUserRequest({ given, when, then, assertCallback, done });
    },
  },
};
