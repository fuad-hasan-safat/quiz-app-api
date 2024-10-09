import {Elysia, t} from "elysia";
import { getQuizQuestionsMiddleware } from "../../../middleware/getQuizQuistionsMiddleware";
import { jwtAuthorizerMiddleware } from "../../../middleware/authTokenMiddleWare";
import { jwtConfig } from "../../../utility/jwt.config";
import findUserbyPhone from "../../../middleware/findUserByPhone";
import calculateAnswerHandler from "../../../middleware/calculateAnswerHandler";

export const quizTaskRoute = new Elysia({ prefix: "quiz" })
    .use(jwtConfig)
    .derive(async ({ headers, jwt_auth }) => {
        const user = await jwtAuthorizerMiddleware(headers, jwt_auth);
        console.log("User === ", user);

        return user;
    }).guard({
        beforeHandle({ user, set, headers }) {
            if (!user) {
                return {
                    message:
                        "You are not an authoriged user to access this api",
                };
            }
        },
    }, (app) =>
        app.get("/start-quiz", async ({ user }) => {
            console.log(user);

            const userdata = await findUserbyPhone(user.mobile);

            const data = await getQuizQuestionsMiddleware(userdata);

            return {
                questions: data,
                user: userdata
            };
        })
            .post("/submit-answer", async ({body:{userSubmission, quizId}, user}) => {
                const userdata = await findUserbyPhone(user.mobile) 
                const result = await calculateAnswerHandler(userSubmission, quizId, userdata);
                return {
                    result,
                    userdata
                }
            },{
                body: t.Object({
                    quizId:t.String(),
                    userSubmission: t.Array(t.Object({
                        questionId: t.String(),
                        answer: t.String(),
                    }))
                })
            }));
