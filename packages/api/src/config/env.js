import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: ['production', 'staging', 'test'].includes(process.env.NODE_ENV)
    ? path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`)
    : path.resolve(process.cwd(), '.env'),
});

const { PORT, DB_PORT, NODE_ENV, DB_HOST, DB_NAME, DB_ATLAS, DB_USER, DB_PASSWORD, JWT_SECRET } = process.env;

export default {
  apiPort: PORT,
  dbAtlas: DB_ATLAS,
  dbHost: DB_HOST,
  dbName: DB_NAME,
  dbPassword: DB_PASSWORD,
  dbPort: DB_PORT,
  dbUser: DB_USER,
  jwtSecret: JWT_SECRET,
  nodeEnv: NODE_ENV,
};
