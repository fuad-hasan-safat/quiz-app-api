import { Sequelize } from "sequelize-typescript";
import QuizQuestion from "../database/tasks/quizQuestions";

export default async function calculateAnswerHandler(questionsidlist: any, userAnswersList: any) {

    const results = await QuizQuestion.findAll({
        attributes: ['question_answer'],
        where: {
            question_id: questionsidlist
        },
        group: ['question_id'],
        order: Sequelize.literal(`FIELD(question_id, ${questionsidlist.map((id: any) => `'${id}'`).join(', ')})`)
    });
    const answers = results.map((result: any) => result.question_answer);

    const points = await QuizQuestion.findAll({
        attributes: ['question_point'],
        where: {
            question_id: questionsidlist
        },
        group: ['question_id'],
        order: Sequelize.literal(`FIELD(question_id, ${questionsidlist.map((id: any) => `'${id}'`).join(', ')})`)
    });
    const pointList = points.map((result: any) => result.question_point);


    let totalPoint = 0
    for(let i  = 0; i <  questionsidlist.length; i++){
        console.log(questionsidlist[i], answers[i], pointList[i])

        if(pointList[i] === undefined) continue;

        if(answers[i].trim() === userAnswersList[i].trim()){
            totalPoint += pointList[i]
        }
    }


    return {
        score: totalPoint
    }

    
}