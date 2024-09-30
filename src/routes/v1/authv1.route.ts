import { Elysia, error, t } from "elysia";
import logmessage from "../../logs/writeLogfile";
import { jwtConfig } from "../../utility/jwt.config";
import UserModel from "../../models/User";
import { UniqueConstraintError } from "sequelize";
import LoginInfoModel from "../../models/userinfo";

export const authv1 = new Elysia({ prefix: "auth" })
    .use(jwtConfig)
    .derive(async ({ headers, jwt_auth }) => {
        console.log("Inside derive");
        // 1. Extract the 'Authorization' header from the incoming request
        const auth = headers["authorization"];

        // 2. Check if the 'Authorization' header contains a Bearer token
        //    If it starts with 'Bearer ', extract the token string after 'Bearer '
        //    Otherwise, set token to null indicating no valid token is present
        const token = auth && auth.startsWith("Bearer ") ? auth.slice(7) : null;

        // 3. If no token is found, return an object with user set to null
        if (!token) return { user: null };

        // 4. Verify the JWT token using the jwt_auth module
        //    This step authenticates the token and retrieves the user information
        const user = await jwt_auth.verify(token);

        // 5. Return an object containing the authenticated user information
        //    This will be available inside de request object
        return { user };
    })
    .get("/users", () => {
        const data = UserModel.findAll();
        console.log("response data ->", data);
        return data;
    }, {
        afterHandle(context) {
            const {
                request,
                headers,
            } = context;
            const currentDate = new Date();

            logmessage(
                `${currentDate.toDateString()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()} ${request.url} HOST:${headers.host} ${
                    headers["user-agent"]
                }`,
            );
        },
    })
    .post("/login", async ({ body: { phone, password }, jwt_auth }) => {
        const user = await UserModel.findOne({
            where: { phone },
        });

        if (user) {
            // Compare passwords
            const isPasswordValid = await Bun.password.verify(
                password,
                user.password,
            );
            if (!isPasswordValid) {
                return { error: "Invalid password." };
            }

          

            const info =  await LoginInfoModel.create({
                userid:  user.id,
                txt: 'efjhbwefhjbsljfhbjkshafhvasljfjawhvf'
            } as any)

            console.log({info})




            // Generate token
            const token = await jwt_auth.sign({ id: user.phone });
            return {
                message: "Login successful",
                token: token,
                user: user,
                info: info
            };
        } else {
            return {
                error: "No user found",
            };
        }
    }, {
        beforeHandle({ body: { phone, password } }) {
            if (!phone || !password) {
                return {
                    error: "Name and password are required.",
                };
            }
        },
        afterHandle({ body: { phone, password } }) {
        },
        error({ error }) {
            return {
                error: error.message,
            };
        },
        body: t.Object({
            phone: t.String(),
            password: t.String(),
        }),
    })
    .post("signup", async ({ body, jwt_auth }) => {
        const password = await Bun.password.hash(body.password, {
            algorithm: "bcrypt",
            cost: 10,
        });

        const myuuid = crypto.randomUUID();

        const newUser = await UserModel.create({
            id: myuuid,
            name: body.name,
            phone: body.phone,
            gender: body.gender,
            dob: body.dob,
            address: body.address,
            password: password,
        } as any);

        const token = await jwt_auth.sign({ id: body.phone });

        return {
            message: "Sign up sucesses",
            token: token,
            user: newUser,
        };
    }, {
        beforeHandle({ body: { name, phone, gender, address } }) {
            if (!name || !phone || !gender || !address) {
                return {
                    error: "Name, phone, address, dob and gender are required.",
                };
            }
        },

        body: t.Object({
            name: t.String({ minLength: 1, maxLength: 100 }),
            phone: t.String({ minLength: 11, maxLength: 11 }),
            gender: t.String({ minLength: 4, maxLength: 6 }),
            dob: t.Date(),
            address: t.String(),
            password: t.String({ minLength: 8, maxLength: 100 }),
        }),
     
    })
    .guard({
        beforeHandle({ user, set, headers }) {
            // Return will not allowed to move forward 🚫
            if (!user) return {
                message: 'You are not an authoriged user to access this api',
                do: 'Login and youe your secreat key'
            }
        },
    }, (app) =>
        // every chain method from this `guard` will will automatically be authorized
        app.get("/me", ({ user }) => {
            return { user };
        })
        .get("/private", ({ user }) => {
            return { private: true };
        })
        .post("/deleteMyAccount", async ({ body: { phone, password } }) => {
            
            const user = await UserModel.findOne({
                where: { phone },
            });
    
            if(!user){
                return{
                    error: "User not found"
                }
            }
            
            const deleted = await UserModel.destroy({
                where: {
                    id: user?.id
                },
            });
    
            if (deleted) {
                return {
                    message: "Account deleted successfully",
                };
            } else {
                return {
                    message: "Account not found",
                };
            }
    
        }, {
            beforeHandle({ body: { phone, password } }) {
                if (!phone || !password) {
                    return {
                        error: "Phone and Password are required.",
                    };
                }
            },
    
            body: t.Object({
                phone: t.String({ minLength: 11, maxLength: 11 }),
                password: t.String({ minLength: 8, maxLength: 100 }),
            }),
        })
        .put('/updateMe', async({body})=>{
            const [updatedRowsCount, updatedRows] = await UserModel.update(body,{

                where: { phone: body.phone },
                returning: true, // This option will return the updated rows
            });

            console.log({updatedRows})

            if(updatedRows){
                return{
                    message: "Account updated successfully",
                    row:[updatedRows, updatedRowsCount]
                }
            }else{
                return{
                    message: "Un able to update, please check your phone number",
                    row:[updatedRows, updatedRowsCount]
                }
            }

           
        
        },{
            body: t.Object({
                name: t.Optional(t.String({ minLength: 1, maxLength: 100 })), // Required
                phone: t.String({ minLength: 11, maxLength: 11 }), // Optional
                gender: t.Optional(t.String({ minLength: 4, maxLength: 6 })), // Optional
                dob: t.Optional(t.Date()), // Optional
                address: t.Optional(t.String()), // Optional
                password: t.Optional(t.String({ minLength: 8, maxLength: 100 })), // Required
            }),
        })
    
    )
   