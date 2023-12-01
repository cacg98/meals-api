export const errorHandlerMiddleware = (err, req, res, next) => {
  err.status = err.status || "fail";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).send({
    status: err.status,
    message: err.message,
    stack: err.stack
  });
}