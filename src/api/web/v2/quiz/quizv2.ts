import { Elysia } from 'elysia'
import { quizv2 } from '../../../../routes/v2/quizv2.router'

export const v2Apis = new Elysia({ prefix: '/api/web/v2' })
    .use(quizv2)
