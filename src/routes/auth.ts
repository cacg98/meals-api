import { Router } from 'express'

import { authorizationMiddleware } from '../middlewares/auth'

import * as authController from '../controllers/auth'

export const authRouter = Router()

authRouter.get('/refresh-token', authorizationMiddleware, authController.refreshToken)
authRouter.post('/register', authController.register)
authRouter.post('/login', authController.login)
