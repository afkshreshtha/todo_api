class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
  }
}

export const errorMiddleWare = (err, req, res, next) => {
  err.message = err.message || 'Internal server error'
  err.statusCode = err.statusCode || 'Internal server error'
  return res.status(err.statusCode).json({
    success: true,
    message: err.message,
  })
}

export default ErrorHandler
