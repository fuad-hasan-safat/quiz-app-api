import sequelize from "../database/siquilize";
import QuizUserModel from "../database/tasks/quizUser";


export async function registrationMiddleware(body: any, jwt_auth: any) {
    const t = await sequelize.transaction();

    try {
        const user = await QuizUserModel.findOne({
            where: {
                quiz_user_mobile: body.mobile,
            }
        } as any);

        const token = await jwt_auth.sign({
            mobile: body.mobile
        });

        if (user) {
            return {
                error: `User already exist by mobile: ${body.mobile}`,
                token: token
            }
        }

        const newUser = await QuizUserModel.create({
            quiz_user_name: body.name,
            quiz_user_mobile: body.mobile,
            quiz_user_date_of_birth: body.dateOfBirth,
            quiz_user_gender: body.gender,
            quiz_user_address: body.address
        } as any);

        await t.commit();


        return {
            message: "Sign up sucesses",
            token: token,
            user: newUser,
        };

    } catch (error) {
        await t.rollback();
        return {
            error: 'Failed to complete operation'
        }

    }


}