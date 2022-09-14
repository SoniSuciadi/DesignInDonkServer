function handleError(err, req, res, next) {
  let status = 500;
  let msg = "Internal Server Error";
  let error = {};
  console.log(err);
  switch (err.name) {
    case "Invalid credential":
      status = 401;
      msg = "Invalid Email or Password";
      break;
    case "Account not Active":
      status = 403;
      msg = "Check you email for activation accont";
      break;
    case "ValidationError":
      status = 400;
      msg = "Invalid input form";
      for (const key in err.errors) {
        error[key] = err.errors[key].message;
      }
      break;
    case "MongoServerError":
      status = 400;
      msg = "Invalid input form";
      for (const key in err.errors) {
        error[key] = err.errors[key].message;
      }
      break;
    case "Failed register":
      status = 400;
      msg = "Invalid input form";
      break;
    case "bad request":
      status = 401;
      msg = "Invalid input form";
      break;
    case "Unauthorized":
      status = 401;
      msg = "Unauthorized";
      break;
    case "Token Invalid":
      status = 401;
      msg = "Token Invalid";
      break;

    case "JsonWebTokenError":
      status = 401;
      msg = "Token Invalid";
      break;
    case "Data not found":
      status = 404;
      msg = "Data not found";
      break;
  }
  res.status(status).json({
    statusCode: status,
    msg,
    error,
  });
}
module.exports = handleError;
