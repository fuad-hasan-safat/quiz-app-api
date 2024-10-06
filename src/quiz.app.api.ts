import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
import { v1Apis } from "./api/web/v1/quiz/quizv1";
import { v2Apis } from "./api/web/v2/quiz/quizv2";
import sequelize from "./database/siquilize";
import {saveErrorMessage } from "./logs/writeLogfile";

const PORT = Bun.env.APP_PORT || 3000;

const app = new Elysia()
  .use(cors())
  .use(swagger())
  // .onError(({ error, code, headers, request }) => {
  //   const message = saveErrorMessage(headers, error, code, request);
  //   return message;
  // })
  .use(v1Apis)
  .use(v2Apis)
  .listen(PORT);

(async () => {
  try {
    await sequelize.authenticate();
    sequelize.sync({ force: false });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
