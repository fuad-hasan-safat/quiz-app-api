import { Sequelize } from "sequelize-typescript";
import sequelize from "../database/siquilize";
import QuizQuestion from "../database/tasks/quizQuestions";
import QuizQuestionBank from "../database/tasks/quizQuestionBank";
import QuizListModel from "../database/tasks/quizList";

export async function getQuizQuestionsMiddleware(userdata:any) {

    const t = await sequelize.transaction();

    try {
        console.log('Inside try question from database')

        const easyQuestions = await QuizQuestionBank.findAll({
            attributes: [
                'id',
                'title',
                'difficultly',
                'option_1',
                'option_2',
                'option_3',
                'option_4'
            ],
            where: {
                difficultly: 'easy'
            },
            raw: true,
            order: Sequelize.literal('RAND()'),  // Randomize the order
            limit: 5  // Limit to 5 questions
        });
        console.log('Inside try question from database easy question')

        const mediumQuestions = await QuizQuestionBank.findAll({
            attributes: [
                'id',
                'title',
                'difficultly',
                'option_1',
                'option_2',
                'option_3',
                'option_4'
            ],
            where: {
                difficultly: 'medium'
            },
            raw: true,
            order: Sequelize.literal('RAND()'),  // Randomize the order
            limit: 5  // Limit to 5 questions
        });
        const hardQuestions = await QuizQuestionBank.findAll({
            attributes: [
                'id',
                'title',
                'difficultly',
                'option_1',
                'option_2',
                'option_3',
                'option_4'
            ],
            where: {
                difficultly: 'hard'
            },
            raw: true,
            order: Sequelize.literal('RAND()'),  // Randomize the order
            limit: 5  // Limit to 5 questions
        });


        const quizId =  crypto.randomUUID();
        const totalQuestion = easyQuestions.length +  mediumQuestions.length + hardQuestions.length;

        const newQuiz = await QuizListModel.create({
            id: quizId,
            quiz_user_mobile: userdata.mobile,
            totat_question: totalQuestion
        })

        // Proceed with other operations
        await t.commit();
        t.afterCommit(()=>{
            console.log('after commit')
        })


        return {
            easy: easyQuestions,
            medium: mediumQuestions,
            hard: hardQuestions,
            quizId: quizId
        }

    } catch (error) {
        // await t.rollback();  // Rollback everything if something goes wrong

        return {
            error: 'Failed to complete operation'
        }

    }
}