// Model
const User = require("../models/userModel");
// CatchAsyncError
const catchAsync = require("../utils/catchAsync");
const APIfeatures = require("../utils/apiFeatures");
// Get all Categories
exports.getAllUser = catchAsync(async (req, res, next) => {
  const features = new APIfeatures(User.find(), req.query)
    .filter()
    .limit()
    .sort();

  const users = await features.query;
  res.status(200).json({
    resault: users.length,
    data: users,
  });
});

// Get one User
exports.getOneUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    data: user,
  });
});

// Update User
exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (req.body.name) {
    user.name = req.body.name;
  }
  if (req.body.password) {
    user.password = req.body.password;
  }

  if (req.body.passwordConfirm) {
    user.passwordConfirm = req.body.passwordConfirm;
  }

  await user.save();
  res.status(200).json({
    message: `تم تعديل ${user.name} بنجاح`,
  });
});

// Delete User
exports.deleteUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    data: "تم الحذف بنجاح",
  });
});
