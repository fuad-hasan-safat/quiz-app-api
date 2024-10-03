import Elysia, { t } from "elysia";
import { jwtConfig } from "../../utility/jwt.config";
import { jwtAuthorizerMiddleware } from "../../middleware/authTokenMiddleWare";
import { registrationMiddleware } from "../../middleware/registrationMiddleware";


export const authTasks = new Elysia({name:'authTasks', prefix:'authTasks'})
.use(jwtConfig)
.derive(async({headers, jwt_auth})=>{
   const user = await jwtAuthorizerMiddleware(headers, jwt_auth)
   return user;
})
.post('/registration', async ({body, jwt_auth})=>{

    const data = await registrationMiddleware(body, jwt_auth)
    return data;
},{
    body: t.Object({
        name: t.String({minLength: 4}),
        mobile: t.String({minLength:11, maxLength: 11}),
        dateOfBirth: t.Date(),
        gender: t.Union([
            t.Literal("male"),
            t.Literal("female"),
            t.Literal("common")
        ]),
        address: t.Optional(t.String())
    })
})