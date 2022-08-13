import loaders from '../loaders/index.js';

export default async (expressApp, port = 3000) => {
  loaders.mongoose.init();

  expressApp.listen(port);
};
