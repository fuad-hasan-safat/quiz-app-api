import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
const poolConnection = mysql.createPool({
  host: "host",
  user: "user",
  database: "database",
  port: 3306,
  pool:{
    min: 0,
    max: 10
  }
});
export const dbConect = drizzle(poolConnection);