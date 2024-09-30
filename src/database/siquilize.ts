import { Sequelize } from "sequelize-typescript";
import UserModel from "../models/User";
import LoginInfoModel from "../models/userinfo";
import { Dialect} from "sequelize";

// Create a Sequelize instance with improved configuration
const sequelize = new Sequelize(Bun.env.DB_DATABASE ?? '', Bun.env.DB_USERNAME ??'root', Bun.env.DB_PASSWORD ??'', {
    host: Bun.env.DB_HOST ?? 'localhost',
    dialect: Bun.env.DB_DIALECT as Dialect ?? 'mariadb' as Dialect,
    port:Number( Bun.env.DB_PORT) ?? 3306,
    pool: {
        min: Bun.env.DB_MIN_POOL as any ?? 1,
        max: Bun.env.DB_MAX_POOL as any ?? 10,
        idle: Number(Bun.env.DB_IDLE_POOL) ?? 10000,
        acquire: Number(Bun.env.DB_AQUIRE_POOL) ?? 10000,
    },
    models: [UserModel, LoginInfoModel],
   
});

export default  sequelize;

// Step 3: Sync the models with the database
