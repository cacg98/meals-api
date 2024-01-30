import jwt from 'jsonwebtoken'
import { CustomError } from '../common/customError'

export function authorizationMiddleware(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) throw new CustomError('Missing required header: Authorization', 400)

  jwt.verify(token, process.env.TOKEN_SECRET, (err: any, res: any) => {
    if (err) throw new CustomError('Unauthorized', 401)
    req.id = res.data
    next()
  })
}