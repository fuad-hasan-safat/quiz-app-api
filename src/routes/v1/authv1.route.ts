import { Elysia, t } from "elysia";
import query from "../../database";
import logmessage from "../../logs/writeLogfile";
import { jwtConfig } from "../../utility/jwt.config";
import { UserType } from "../../utility/interface";
import UserModel from "../../models/User";

class User {
    name: string;
    phone: string;
    gender: string;
    dob: string;
    address: string;
    password: string;

    constructor(
        name: string,
        phone: string,
        gender: string,
        dob: string,
        address: string,
        password: string,
    ) {
        this.name = name;
        this.phone = phone;
        this.gender = gender;
        this.dob = dob;
        this.address = address;
        this.password = password;
    }

    async addNewUser() {
        // const data = await new Promise((resolve, reject) => {
        //     const date = new Date();
        //     const sql =
        //         `INSERT INTO users (name, phone, gender, dob, address, password, createat, updateat) VALUES ('${this.name}', '${this.phone}', '${this.gender}', '${this.dob}', '${this.address}', '${this.password}', NOW(), NOW())`;

        //     query(sql, (err: Error | null, data: any) => {
        //         if (err) {
        //             reject(err);
        //         } else {
        //             resolve(data);
        //         }
        //     });
        // });
        // console.log("Database sql response ", data);

        // return data;


    }

    static async getAllUser() {
        const data = await new Promise((resolve, reject) => {
            query(`SELECT * from users`, (err: Error | null, data: any) => {
                if (err) {
                    console.log("Database error->", err);
                    reject(err);
                } else {
                    console.log("Query executed successfully 1");
                    resolve(data);
                }
            });
        });
        return data;
    }

    static async findUserByPhone(phone: string) {
        const sql = `SELECT * FROM users WHERE phone = '${phone}'`;
        console.log(sql);
        const data = await new Promise((resolve, reject) => {
            query(sql, (err: Error | null, data: UserType[]) => {
                if (err) {
                    console.log("Database error->", err);
                    reject(err);
                } else {
                    if (data.length > 0) {
                        resolve(data[0]); // Return the first user found
                    } else {
                        resolve(null); // No user found
                    }
                }
            });
        });

        return data;
    }
}

export const authv1 = new Elysia({ prefix: "auth" })
    .use(jwtConfig)
    .derive(async ({ headers, jwt_auth }) => {
        console.log('Inside derive')
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
        const data = User.getAllUser();
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
        const user: UserType | null = await User.findUserByPhone(phone) as
            | UserType
            | null;
        if (user) {
            // Compare passwords
            const isPasswordValid = await Bun.password.verify(
                password,
                user.password,
            );
            if (!isPasswordValid) {
                return { error: "Invalid password." };
            }

            // Generate token
            const token = await jwt_auth.sign({ id: user.phone });
            return {
                message: "Login successful",
                token: token,
                user: {
                    name: user.name,
                    phone: user.phone,
                    gender: user.gender,
                    address: user.address,
                    dob: user.dob,
                },
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
            password: password
        } as any);

        // const data = await user.addNewUser();
        // console.log("Query return data in main handler ", data);
        const token = await jwt_auth.sign({ id: body.phone });

        return {
            message: "Sign up sucesses",
            token: token,
            user: newUser
        };
    }, {
        beforeHandle({ body: { name, phone, gender, address } }) {
            if (!name || !phone || !gender || !address) {
                return {
                    error: "Name, phone, address, dob and gender are required.",
                };
            }
        },

        afterHandle({ error }) {
        },

        body: t.Object({
            name: t.String({ minLength: 1, maxLength: 100 }),
            phone: t.String({ minLength: 11, maxLength: 11 }),
            gender: t.String({ minLength: 4, maxLength: 6 }),
            dob: t.Date(),
            address: t.String(),
            password: t.String({ minLength: 8, maxLength: 100 }),
        }),

        error({ error, code, set, body }) {
            console.log("sign up error->", error.message);
            return {
                error: error.message,
            };
        },
    }).guard({
        beforeHandle({ user, set, headers }) {
          // Return will not allowed to move forward 🚫
          if (!user) return (set.status = "Unauthorized");
        },
      }, app =>
        // every chain method from this `guard` will will automatically be authorized
        app.get("/me", ({ user}) => {
           return { user }
        }))
        .get("/private", ({ user }) => {
           return { private: true }
        })  
