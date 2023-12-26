export const errorHandlerMiddleware = (err, req, res, next) => {
  res.status(err.statusCode).send({
    status: err.status,
    message: err.message,
    stack: err.stack
  })
}
