import { Elysia } from "elysia";
import { quizv1 } from "../../../../routes/v1/quizv1.router";
import { authv1 } from "../../../../routes/v1/authv1.route";
import { authTasks } from "../../../../routes/tasks/authTask.route";

export const v1Apis = new Elysia({ prefix: "/api/web/v1" })
    .use(quizv1)
    .use(authv1)
    .use(authTasks)
