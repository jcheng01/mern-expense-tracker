const errorHandler = (error, req, res, next) => {
  if (error) {
    const statusCode = error.statusCode || 500;
    const message = error.error || "An unexpected error occurred";
    res.status(statusCode).json({
      status: "error",
      statusCode,
      message,
    });
  } else {
    next();
  }
};

module.exports = errorHandler;
