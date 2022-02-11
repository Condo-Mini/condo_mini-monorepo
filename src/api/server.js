import loaders from '../loaders';

export default async (expressApp, port = 3000) => {
  loaders.mongoose.init();

  expressApp.listen(port);
};
