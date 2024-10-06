import { Sequelize } from "sequelize-typescript";
import sequelize from "../database/siquilize";
import QuizQuestion from "../database/tasks/quizQuestions";

export async function getQuizQuestionsMiddleware() {

    const t = await sequelize.transaction();

    try {
        console.log('Inside try question from database')

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
        console.log('Inside try question from database easy question')

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



        // Proceed with other operations
        await t.commit();
        t.afterCommit(()=>{
            console.log('after commit')
        })


        return {
            easy: easyQuestions,
            medium: mediumQuestions,
            hard: hardQuestions
        }

    } catch (error) {
        // await t.rollback();  // Rollback everything if something goes wrong

        return {
            error: 'Failed to complete operation'
        }

    }
}