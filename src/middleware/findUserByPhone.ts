import { attribute } from "@sequelize/core/types/expression-builders/attribute";
import sequelize from "../database/siquilize";
import QuizUserModel from "../database/tasks/quizUser";

export default async function findUserbyPhone(mobile: any) {
    const t = await sequelize.transaction();

    try {
        const user = await QuizUserModel.findOne({
            attributes:[
                'quiz_user_name',
                'quiz_user_mobile',
                'quiz_user_gender',
                'quiz_user_date_of_birth'

            ],
            where: {
                quiz_user_mobile: mobile,
            },
        } as any);

        await t.commit();

        if (user) {
            return user;
        }

        return {
            error: `No user found with ${mobile}`,
        };
    } catch (error) {
        await t.rollback();
    }
}
