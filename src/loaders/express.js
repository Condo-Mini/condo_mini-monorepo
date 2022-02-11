import bodyParser from 'body-parser';

export default {
  init(app) {
    app.use(bodyParser.json());
  },
};
