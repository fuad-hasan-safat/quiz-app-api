import { Elysia } from 'elysia'
import { quizv1 } from '../../../../routes/v1/quizv1.router'

export const v1Apis = new Elysia({ prefix: '/api/web/v1' })
    .use(quizv1)
