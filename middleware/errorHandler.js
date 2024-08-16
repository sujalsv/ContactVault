const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.status(statusCode).json({
        title: "Validation Failed",
        msg: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.status(statusCode).json({
        title: "Not Found",
        msg: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.UNAUTHORISED:
      res.status(statusCode).json({
        title: "Unauthorized",
        msg: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.status(statusCode).json({
        title: "Forbidden",
        msg: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.SERVER_ERROR:
      res.status(statusCode).json({
        title: "Server Error",
        msg: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      res.status(500).json({
        title: "Unknown Error",
        msg: err.message,
        stackTrace: err.stack,
      });
      break;
  }
};

module.exports = errorHandler;
