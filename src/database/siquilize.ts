import { Sequelize } from "sequelize-typescript";
import UserModel from "../models/User";
import LoginInfoModel from "../models/userinfo";
import QuizUserModel from "./tasks/quizUser";

import { Dialect} from "sequelize";
import dbConfig from "../utility/dbConfig";
import QuizQuestion from "./tasks/quizQuestions";


// Create a Sequelize instance with improved configuration
const sequelize = new Sequelize(dbConfig.db_name, dbConfig.db_user, dbConfig.db_pass, {
    host: dbConfig.db_host,
    dialect: dbConfig.db_dialect as Dialect,
    port: dbConfig.db_port as any,
    pool: {
        min: dbConfig.pool_min || 1,
        max: dbConfig.pool_max || 10,
        idle: dbConfig.pool_idle || 10000,
        acquire: dbConfig.pool_acquire || 10000,
    },
    models: [UserModel, LoginInfoModel, QuizUserModel, QuizQuestion],
   
});

export default  sequelize;

// Step 3: Sync the models with the database
