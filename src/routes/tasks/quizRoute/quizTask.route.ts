import Elysia from "elysia";
import { getQuizQuestionsMiddleware } from "../../../middleware/getQuizQuistionsMiddleware";
import { jwtAuthorizerMiddleware } from "../../../middleware/authTokenMiddleWare";
import { jwtConfig } from "../../../utility/jwt.config";

export const quizTaskRoute = new Elysia({ prefix: 'quiz' })
.use(jwtConfig)
.derive(async ({ headers, jwt_auth }) => {
    const user = await jwtAuthorizerMiddleware(headers, jwt_auth)
    console.log('User === ',user)
    return user;
}).guard({
    beforeHandle({ user, set, headers }) {
        if (!user) return {
            message: 'You are not an authoriged user to access this api',
        }
    },

}, (app) =>
    app.get('/questios', async ({}) => {

        const data = await getQuizQuestionsMiddleware();

        return data;
    })
)