import { Sequelize } from "sequelize-typescript";
import UserModel from "../models/User";

// Create a Sequelize instance with improved configuration
const sequelize = new Sequelize('myPractice', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    pool: {
        min: 1,
        max: 10,
        idle: 10000,
        acquire: 10000,
    },
    models: [UserModel],
   
});

export default  sequelize;

// Step 3: Sync the models with the database
