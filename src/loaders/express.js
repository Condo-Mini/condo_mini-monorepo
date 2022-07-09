import bodyParser from 'body-parser';
import cors from 'cors';

export default {
  init(app) {
    app.use(bodyParser.json());
    app.use(cors());
  },
};
