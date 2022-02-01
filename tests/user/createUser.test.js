import messages from '../../src/messages';

describe('User', () => {
  it('Create', async () => {
    const dbName = process.env.TEST_DB_NAME || 'condominidb_test';

    console.log(messages);

    await mongoose.connect(`mongodb://localhost:27017/${dbName}`);
    await mongoose.connection.db.collection('users').find({});
  });
});
