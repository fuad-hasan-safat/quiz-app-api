import { dbConfig } from "./type";


const dbConfig: dbConfig = {
  db_host: process.env.DB_HOST || '',
  db_user: process.env.DB_USERNAME || '',
  db_pass: process.env.DB_PASSWORD || '',
  db_name: process.env.DB_DATABASE || '',
  db_port: process.env.DB_PORT || '',
  port: process.env.APP_PORT || '3306',
  pool_min: 1,
  pool_max: 10,
  pool_idle: 10000,
  pool_acquire: 10000,
  db_dialect: process.env.DB_DIALECT || 'mariadb',
};

export default dbConfig;