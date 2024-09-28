
import { Elysia, t } from "elysia";
import query from "../../database";
import logmessage from "../../logs/writeLogfile";
import { formatDate } from "../../utility/dateFormeter";

class User {
    name: string;
    phone: string;
    gender: string;
    constructor(
        name: string, phone: string, gender: string

    ) {
        this.name = name;
        this.phone = phone;
        this.gender = gender;
    }

    addNewUser() {

    }

    static async getAllUser() {
        const data = await new Promise((resolve, reject) => {
            query(`SELECT * from user`, (err: Error | null, data: any) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('Query executed successfully 1');
                    resolve(data);
                }
            });
        });
        return data;
    }
}

export const userv1 = new Elysia({ prefix: "/user" })
    
    .get("/users", () => {
        return User.getAllUser();
    }, {
        beforeHandle() {
            console.log('data is valid');
        },
        afterHandle(context) {
            const { path, query, response, request, headers , route, server, params, cookie} = context;
            console.log({ path, response, request, route, server, params, headers , cookie});
            const currentDate = new Date();
            console.log({currentDate})
            const simpleArray = (response as any[]).map(item => ({
                id: item.id,
                name: item.name,
                phone: item.phone,
                gender: item.gender
              }));
              
            logmessage(`${currentDate.toDateString()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()} ${request.url} HOST:${headers.host} ${headers["user-agent"]} ${JSON.stringify(simpleArray)}`);
        }
    }
       )
       .guard({
        body: t.Object({
            name: t.String(),
            phone: t.String(),
            gender: t.String()
        })
    })
    .post('/newuser', () => {

    }, {
        beforeHandle({ body: { name, phone, gender } }) {

            // Validate the request body
            if (!name || !phone || !gender) {
                return { error: "Name, phone, and gender are required." };
            }
        }
    })
    


