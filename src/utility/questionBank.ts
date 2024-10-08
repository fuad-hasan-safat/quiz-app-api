export async function getQuistionsIdList(userSubmission:any) {

    console.log(userSubmission)
    const questionsIdList = userSubmission.map((submission: any) => submission.questionId)

    return  questionsIdList;

    
}