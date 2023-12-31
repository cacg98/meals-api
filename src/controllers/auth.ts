import { Request, Response, NextFunction } from 'express'
import { tryCatchFn } from '../common/utils'
import * as authService from '../services/auth'

export const register = tryCatchFn( async (req: Request, res: Response, next: NextFunction) => {
    const newUser = await authService.register(req.body)
    res.send(newUser)
})

export const login = tryCatchFn( async (req: Request, res: Response, next: NextFunction) => {
    const tokens = await authService.login(req.body)
    res.send(tokens)
})

export const refreshToken = tryCatchFn( async (req, res: Response, next: NextFunction) => {
    const tokens = await authService.refreshToken(req.id)
    res.send(tokens)
})
