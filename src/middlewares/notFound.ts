import { CustomError } from "../common/customError"

export const notFoundMiddleware = (req, res) => {
    throw new CustomError('Path not found', 404)
}