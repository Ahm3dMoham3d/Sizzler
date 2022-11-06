const AppError = require("../../utils/appError");
const inVaildID = (err) => {
  const message = `لم يتم العثور علي ${err.value} في قاعدة البيانات`;
  return new AppError(message, 400);
};
const duplicateKey = (err) => {
  const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  const message = `${value.replaceAll('"', "")} موجود بالفعل`;
  return new AppError(message, 400);
};

const vaildtionError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `${errors.join(" - ")}`;
  return new AppError(message, 400);
};
const JsonWebTokenError = (err) => {
  return new AppError("برجاء تسجيل الدخول مرة أخري", 400);
};
const productionError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(err.statusCode).json({
      status: "حدث خطأ",
      message: "حدث خطأ داخلي",
    });
  }
};

const developmentError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "حدث خطاً";
  if (process.env.NODE_ENV === "PROUDCTION") {
    if (err.name === "CastError") {
      err = inVaildID(err);
    }
    if (err.code === 11000) {
      err = duplicateKey(err);
    }
    if (err.name === "ValidationError") {
      err = vaildtionError(err);
    }
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      err = JsonWebTokenError(err);
    }

    productionError(err, res);
  } else if (process.env.NODE_ENV === "DEVELOPMENT") {
    developmentError(err, res);
  }
};
