import { Request, Response, NextFunction } from 'express'
import { tryCatchFn } from '../common/utils'
import { CustomRequest } from '../common/interfaces/customRequest'
import * as authService from '../services/auth'

export const register = tryCatchFn( async (req: Request, res: Response, next: NextFunction) => {
    await authService.register(req.body)
    res.send({})
})

export const login = tryCatchFn( async (req: Request, res: Response, next: NextFunction) => {
    const tokens = await authService.login(req.body)
    res.send(tokens)
})

export const refreshToken = tryCatchFn( async (req: CustomRequest, res: Response, next: NextFunction) => {
    const tokens = await authService.refreshToken(req.id)
    res.send(tokens)
})
