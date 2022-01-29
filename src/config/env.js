import dotenv from 'dotenv';

dotenv.config()

const {
  NODE_ENV,
  PORT,
  DB_PORT,
  DB_NAME,
  DB_HOST
} = process.env

export default {
  nodeEnv: NODE_ENV,
  port: PORT,
  dbPort: DB_PORT,
  dbName: DB_NAME,
  dbHost: DB_HOST
}