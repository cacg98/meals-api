import { Router } from 'express'

import { mealsRouter } from './meals'

export const appRouter = Router()

appRouter.use('/meals', mealsRouter)
