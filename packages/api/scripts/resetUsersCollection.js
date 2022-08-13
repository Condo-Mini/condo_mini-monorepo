import mongoose from 'mongoose';
import Database from '../src/database';
import { ensureEnvironment } from '../src/helpers/databaseHelper';

try {
  ensureEnvironment({
    allowedEnvs: ['dev'],
    env: process.env.NODE_ENV,
  });
} catch (error) {
  console.log(error.message);

  process.exit(1);
}

Database.connect(process.env.DB_NAME)
  .then(async () => {
    const { db } = mongoose.connection;
    const defaultUsersEmails = [
      'sudo@condomini.com',
      'admin@condomini.com',
      'guard@condomini.com',
      'resident@condomini.com',
    ];

    db.collection('users')
      .deleteMany({ 'profile.email': { $nin: defaultUsersEmails } })
      .then(({ acknowledged, deletedCount }) => {
        console.log({ acknowledged, deletedCount });

        process.exit(0);
      });
  })
  .catch((error) => {
    console.log(error.message);

    process.exit(1);
  });
