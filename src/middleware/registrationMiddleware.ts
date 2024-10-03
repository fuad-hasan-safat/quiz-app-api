import QuizUserModel from "../database/tasks/quizUser";


export async function registrationMiddleware(body: any, jwt_auth: any) {
    const newUser = await QuizUserModel.create({
        quiz_user_name: body.name,
        quiz_user_mobile: body.mobile,
        quiz_user_date_of_birth: body.dateOfBirth,
        quiz_user_gender:  body.gender,
        quiz_user_address:body.address
    } as any);

    const token = await jwt_auth.sign({ 
        mobile: body.mobile ,
        name: body.name
    });
    return {
        message: "Sign up sucesses",
        token: token,
        user: newUser,
    };
}