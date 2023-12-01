import { Router } from 'express'

import { authRouter } from './auth'
import { mealsRouter } from './meals'

export const appRouter = Router()

appRouter.use('/auth', authRouter)

//app.use(isAuthorizedMiddleware)

appRouter.use('/meals', mealsRouter)
