export default {
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  subscription: {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  // TODO: Normalize address
  address: {
    street: {
      type: String,
    },
    number: {
      type: String,
    },
  },
};
