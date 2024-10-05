import Elysia, { t } from "elysia";
import { registrationMiddleware } from "../../middleware/registrationMiddleware";
import { quizTaskRoute } from "./quizRoute/quizTask.route";


export const authTasks = new Elysia({ name: 'authTasks', prefix: 'authTasks' })
    .use(quizTaskRoute)
    .post('/registration', async ({ body, jwt_auth }) => {
        const data = await registrationMiddleware(body, jwt_auth)
        return data;
    }, {
        body: t.Object({
            name: t.String({ minLength: 4 }),
            mobile: t.String({ minLength: 11, maxLength: 11 }),
            gender: t.Union([
                t.Literal("male"),
                t.Literal("female"),
                t.Literal("common")
            ]),
            address: t.Optional(t.String()),
            dateOfBirth: t.Date(),
            
        })
    })
    