import UserModel from '../../src/models/UserModel';

describe('User', function () {
  this.timeout(40000);
  it('Create', async () => {
    const user = new UserModel({
      firstName: 'Apollo',
      lastName: 'Amaral',
      profile: {
        email: 'apollo@gmail.com',
        password: '318bcb4be908d0da6448a0db76908d78',
        role: 'resident',
        permission: {
          role: 'resident',
          level: 0,
        },
      },
      createdBy: '61f61062a6bb760a45752841',
    });

    await user.save();
  });
});
