import config from './config';
import { Pool } from 'pg';

export const Client = new Pool({
  host: config.HOST,
  port: parseInt(config.DB_PORT as string),
  database: config.NODE_ENV != 'dev' ? config.DB_TEST : config.DB_NAME,
  user: config.DB_USER,
  password: config.DB_PW,
});