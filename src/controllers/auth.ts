import { tryCatchFn } from '../common/utils'
import * as authService from '../services/auth'

export const register = tryCatchFn( async (req, res, next) => {
    const newUser = await authService.register(req.body)
    res.send(newUser)
})

export const login = tryCatchFn( async (req, res, next) => {
    const tokens = await authService.login(req.body)
    res.send(tokens)
})
