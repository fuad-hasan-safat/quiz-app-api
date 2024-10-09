import { Sequelize } from "sequelize-typescript";
import QuizQuestion from "../database/tasks/quizQuestions";
import { getQuistionsIdList } from "../utility/questionBank";
import QuizQuestionBank from "../database/tasks/quizQuestionBank";
import QuizListModel from "../database/tasks/quizList";
import QuizSubmitModel from "../database/tasks/submittedQuiz";

export default async function calculateAnswerHandler(
    userSubmission: any,
    quizId: any,
    userdata: any,
) {
    // const uuuid = crypto.randomUUID();
    // console.log('UUUID->>', uuuid)

    await userSubmission.sort((a: any, b: any) => {
        return Number(a.questionId) - Number(b.questionId);
    });

    const questionsidlist = await getQuistionsIdList(userSubmission);

    const answers = await QuizQuestionBank.findAll({
        attributes: ["id", "difficultly", "answer", "quiz_point", "title"],
        where: {
            id: questionsidlist,
        },
        raw: true,
    });

    console.log("Answer->", answers, userSubmission);

    let totalPoint = 0;
    const submitData: any[] = [];

    for (let index = 0; index < userSubmission.length; index++) {
        const userAnswer = userSubmission[index];
        const dataBaseAnswer = answers[index];

        console.log({ dataBaseAnswer });
        if (dataBaseAnswer === undefined) continue;

        if (userAnswer.answer === dataBaseAnswer.answer) {
            console.log("উত্তর মিলেছে --->");
            totalPoint += dataBaseAnswer.quiz_point;
        }

        submitData.push({
            quiz_id: quizId, 
            question: answers[index].title, 
            question_id: userAnswer.questionId, 
            quiz_user_mobile: userdata.mobile,
            answer: dataBaseAnswer.answer, 
            user_answer: userAnswer.answer, 
            createdAt: new Date(), 
            updatedAt: new Date(), 
        });
    }


    await QuizSubmitModel.bulkCreate(submitData);
    


    const data =  await QuizListModel.update(
        { obtained_marks: totalPoint }, 
        { where: { id: quizId, quiz_user_mobile: userdata.mobile } },
    );



    return {
        score: totalPoint,
    };
}
