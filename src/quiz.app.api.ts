import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from '@elysiajs/cors';
import { v1Apis } from "./api/web/v1/quiz/quizv1";
import { v2Apis } from "./api/web/v2/quiz/quizv2";


const app = new Elysia()
.use(cors())
.use(swagger())
.onError(({ error, code }) => { 
  if (code === 'NOT_FOUND') return {
    messege: 'Your requested path  is not found',
  }

}) 
.use(v1Apis)
.use(v2Apis)
.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
