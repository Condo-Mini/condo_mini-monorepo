import dotenv from 'dotenv';

dotenv.config();

const { NODE_ENV, API_PORT, DB_PORT, DB_NAME, DB_HOST, JWT_SECRET } =
  process.env;

export default {
  nodeEnv: NODE_ENV,
  apiPort: API_PORT,
  dbPort: DB_PORT,
  dbName: DB_NAME,
  dbHost: DB_HOST,
  jwtSecret: JWT_SECRET,
};
