export class CustomError extends Error {
  statusCode: any
  status: string
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode || 500
    this.status = statusCode < 500 ? "error" : "fail"

    Error.captureStackTrace(this, this.constructor)
  }
}
