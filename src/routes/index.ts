import { Router } from 'express'

import { authorizationMiddleware } from '../middlewares/auth'

import { authRouter } from './auth'
import { mealsRouter } from './meals'
import { recordRouter } from './record'

export const appRouter = Router()

appRouter.use('/auth', authRouter)

appRouter.use(authorizationMiddleware)

appRouter.use('/meals', mealsRouter)
appRouter.use('/records', recordRouter)
