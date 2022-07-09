export const baseRequest = ({ url, method, query, body }, { authorization }, { expectedStatus }, callback, done) => {
  if (!expectedStatus) {
    throw new Error('Status code not defined.');
  }

  agent[method](url)
    .query(query)
    .set('authorization', authorization)
    .set('Origin', 'localhost')
    .send(body)
    .expect(expectedStatus)
    .end(async (error, res) => {
      if (error) {
        done(error);
        return;
      }

      try {
        await callback(res);
        done();
      } catch (err) {
        done(err);
      }
    });
};
