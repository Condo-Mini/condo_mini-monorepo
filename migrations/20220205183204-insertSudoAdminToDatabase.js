const md5 = require('md5');
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const sudoAdminEmail = 'sudo@condomini.com';

module.exports = {
  async up(db) {
    const usersCollection = db.collection('users');
    const now = new Date();

    try {
      await usersCollection.insertOne({
        _id: ObjectId('6202f57d9da0674ce45ae4e2'),
        firstName: 'Sudo',
        lastName: 'Admin',
        profile: {
          email: sudoAdminEmail,
          password: md5('sudopwd'),
          permission: {
            role: 'sudo',
            level: 1000,
          },
        },
        createdAt: now,
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
