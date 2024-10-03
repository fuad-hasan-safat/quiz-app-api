import { Sequelize } from "sequelize-typescript";
import UserModel from "../models/User";
import LoginInfoModel from "../models/userinfo";
import QuizUserModel from "./tasks/quizUser";

// Create a Sequelize instance with improved configuration
const sequelize = new Sequelize('play_quiz_cms', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    port:3306,
    pool: {
        min: 1,
        max: 10,
        idle: 10000,
        acquire: 10000,
    },
    models: [UserModel, LoginInfoModel, QuizUserModel],
   
});

export default  sequelize;

// Step 3: Sync the models with the database
