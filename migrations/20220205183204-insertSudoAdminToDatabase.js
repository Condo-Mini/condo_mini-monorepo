const md5 = require('md5');

const sudoAdminEmail = 'sudo.admin@condomini.com';

module.exports = {
  async up(db) {
    const usersCollection = db.collection('users');

    try {
      await usersCollection.insertOne({
        firstName: 'Sudo',
        lastName: 'Admin',
        profile: {
          email: sudoAdminEmail,
          password: md5('sudopwd'),
          permission: {
            role: 'sudo',
            level: '100',
          },
        },
      });
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  },

  async down(db) {
    const usersCollection = db.collection('users');

    try {
      await usersCollection.deleteOne({ 'profile.email': sudoAdminEmail });
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  },
};
