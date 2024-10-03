import Elysia, { t } from "elysia";
import { jwtConfig } from "../../utility/jwt.config";
import { jwtAuthorizerMiddleware } from "../../middleware/authTokenMiddleWare";
import { registrationMiddleware } from "../../middleware/registrationMiddleware";
import QuizUserModel from "../../database/tasks/quizUser";
import { Sequelize } from "sequelize-typescript";
import QuizQuestion from "../../database/tasks/quizQuestions";


export const authTasks = new Elysia({name:'authTasks', prefix:'authTasks'})
.use(jwtConfig)
.derive(async({headers, jwt_auth})=>{
   const user = await jwtAuthorizerMiddleware(headers, jwt_auth)
   return user;
})
.post('/registration', async ({body, jwt_auth})=>{

    const data = await registrationMiddleware(body, jwt_auth)
    return data;
},{
    body: t.Object({
        name: t.String({minLength: 4}),
        mobile: t.String({minLength:11, maxLength: 11}),
        dateOfBirth: t.Date(),
        gender: t.Union([
            t.Literal("male"),
            t.Literal("female"),
            t.Literal("common")
        ]),
        address: t.Optional(t.String())
    })
})
.get('/quiz-questios', async()=>{
    const easyQuestions = await QuizQuestion.findAll({
        attributes: [
            'question_id',
            'question_title',
            'question_type',
            'question_option_1',
            'question_option_2',
            'question_option_3',
            'question_option_4'
        ],
        where: {
            question_type: 'easy'
        },
        order: Sequelize.literal('RAND()'),  // Randomize the order
        limit: 5  // Limit to 5 questions
    });
    const mediumQuestions = await QuizQuestion.findAll({
        attributes: [
            'question_id',
            'question_title',
            'question_type',
            'question_option_1',
            'question_option_2',
            'question_option_3',
            'question_option_4'
        ],
        where: {
            question_type: 'medium'
        },
        order: Sequelize.literal('RAND()'),  // Randomize the order
        limit: 5  // Limit to 5 questions
    });
    const hardQuestions = await QuizQuestion.findAll({
        attributes: [
            'question_id',
            'question_title',
            'question_type',
            'question_option_1',
            'question_option_2',
            'question_option_3',
            'question_option_4'
        ],
        where: {
            question_type: 'hard'
        },
        order: Sequelize.literal('RAND()'),  // Randomize the order
        limit: 5  // Limit to 5 questions
    });

    return {
        easy: easyQuestions,
        medium: mediumQuestions,
        hard: hardQuestions
    }
},{
    afterHandle({response}){
        console.log({response})
    },
    error({error}){
        return error.message
    }
})