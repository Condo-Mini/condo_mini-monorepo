import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: ['prod', 'staging', 'test'].includes(process.env.NODE_ENV)
    ? path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`)
    : path.resolve(process.cwd(), '.env'),
});

const { PORT, DB_PORT, NODE_ENV, DB_HOST, DB_NAME, DB_ATLAS, DB_USER, DB_PASSWORD, JWT_SECRET } = process.env;

export default {
  apiPort: PORT,
  dbPort: DB_PORT,
  nodeEnv: NODE_ENV,
  dbHost: DB_HOST,
  dbName: DB_NAME,
  dbAtlas: DB_ATLAS,
  dbUser: DB_USER,
  dbPassword: DB_PASSWORD,
  jwtSecret: JWT_SECRET,
};
