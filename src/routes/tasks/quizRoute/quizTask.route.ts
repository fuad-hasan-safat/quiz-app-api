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
        app.get("/questios", async ({ user }) => {
            console.log(user);

            const userdata = await findUserbyPhone(user.mobile);

            const data = await getQuizQuestionsMiddleware();

            return {
                questions: data,
                user: userdata
            };
        })
            .post("/submitAnswer", async ({body:{questionIdList, answerslist}, user}) => {
                const result = await calculateAnswerHandler(questionIdList, answerslist);
                const userdata = await findUserbyPhone(user.mobile) 
                return {
                    result,
                    userdata
                }
            },{
                body: t.Object({
                    questionIdList: t.Array(t.String()),
                    answerslist: t.Array(t.String())
                })
            }));
