import { Sequelize } from "sequelize-typescript";
import QuizQuestion from "../database/tasks/quizQuestions";
import { getQuistionsIdList } from "../utility/questionBank";
import QuizQuestionBank from "../database/tasks/quizQuestionBank";

export default async function calculateAnswerHandler(userSubmission: any) {

    const uuuid = crypto.randomUUID();
    console.log('UUUID->>', uuuid)

   await userSubmission.sort((a: any, b: any) => {
        return Number(a.questionId) - Number(b.questionId);
      });

    const questionsidlist = await getQuistionsIdList(userSubmission);

    const answer = await QuizQuestionBank.findAll({
        attributes: ['id', 'difficultly', 'answer', 'quiz_point'],
        where: {
            id: questionsidlist
        },
        raw: true, 
    });

    console.log('Answer->', answer, userSubmission)

    let totalPoint = 0

    for (let index = 0; index < userSubmission.length; index++) {
        const userAnswer = userSubmission[index];
        const dataBaseAnswer = answer[index];

        console.log({dataBaseAnswer})
        if(dataBaseAnswer === undefined) continue;

        if( userAnswer.answer ===  dataBaseAnswer.answer){
            console.log('উত্তর মিলেছে --->')
            totalPoint += dataBaseAnswer.quiz_point
        }
        
    }


    return {
        score: totalPoint
    }

    
}