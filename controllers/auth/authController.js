const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");
// CatchAsyncError
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");

const signToToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Add new User
exports.addUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    role: req.body.role,
    phone: req.body.phone,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
  });
  newUser.password = undefined;
  res.status(200).json({
    message: "تمت الاضافة بنجاح",
    user: newUser,
  });
});

exports.loginAdmin = catchAsync(async (req, res, next) => {
  const name = req.body.name;
  const password = req.body.password;

  if (!name || !password) {
    return next(new AppError("برجاء ادخال الاسم وكلمة المرور", 401));
  }

  const user = await User.findOne({ name }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("الاسم أو كلمة المرور غير صحيحة", 401));
  }
  if (user.role !== "admin") {
    return next(new AppError("يجب ان تكون مشرف للدخول", 401));
  }

  const token = signToToken(user._id);
  res.status(200).json({
    message: "تم تسجيل الدخول بنجاح",
    token,
  });
});

exports.loginUsers = catchAsync(async (req, res, next) => {
  const name = req.body.name;
  const password = req.body.password;

  if (!name || !password) {
    return next(new AppError("برجاء ادخال الاسم وكلمة المرور", 400));
  }

  const user = await User.findOne({ name }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("الاسم أو كلمة المرور غير صحيحة", 400));
  }

  const token = signToToken(user._id);
  res.status(200).json({
    message: "تم تسجيل الدخول بنجاح",
    token,
  });
});

exports.protectedRoute = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  console.log(token);
  if (!token) {
    return next(new AppError("يجب تسجيل الدخول", 401));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(new AppError("هذا المستخدم تم حذفه", 401));
  }
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("تم تغير كلمة مرور المستخدم الرجاء التسجيل مرة أخري", 401)
    );
  }
  req.user = freshUser;

  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("لا تمتلك الصالحية للدخول", 403));
    }
    next();
  };
};
