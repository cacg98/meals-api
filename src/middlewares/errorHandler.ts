export const errorHandlerMiddleware = (err, req, res, next) => {
  res.status(err.statusCode || err.response?.status || 500).send({
    status: err.status,
    message: err.message,
    stack: err.stack
  })
}
