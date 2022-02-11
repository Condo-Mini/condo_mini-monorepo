const md5 = require('md5');
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const adminEmail = 'admin@condomini.com';

module.exports = {
  async up(db) {
    const usersCollection = db.collection('users');
    const now = new Date();

    try {
      await usersCollection.insertOne({
        firstName: 'Admin',
        lastName: 'Admin',
        profile: {
          email: adminEmail,
          password: md5('adminpwd'),
          permission: {
            role: 'admin',
            level: 100,
          },
        },
        createdAt: now,
        createdBy: ObjectId('6202f57d9da0674ce45ae4e2'),
      });
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  },

  async down(db) {
    const usersCollection = db.collection('users');

    try {
      await usersCollection.deleteOne({ 'profile.email': adminEmail });
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  },
};
