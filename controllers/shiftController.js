// Model
const Shift = require("../models/shiftModel");
// CatchAsyncError
const catchAsync = require("../utils/catchAsync");
const APIfeatures = require("../utils/apiFeatures");
// Get all Categories
exports.getAllShift = catchAsync(async (req, res, next) => {
  const features = new APIfeatures(Shift.find(), req.query)
    .filter()
    .sort()
    .pagination();

  const shift = await features.query;
  res.status(200).json({
    resault: shift.length,
    data: shift,
  });
});

// Get one Shift
exports.getOneShift = catchAsync(async (req, res, next) => {
  const shift = await Shift.findById(req.params.id);
  res.status(200).json({
    data: shift,
  });
});

// Add new Shift
exports.addShift = catchAsync(async (req, res, next) => {
  const newShift = await Shift.create(req.body);

  res.status(201).json({
    message: "تمت الاضافة بنجاح",
    shift: newShift,
  });
});

// Update Shift
exports.updateShift = catchAsync(async (req, res, next) => {
  const shift = await Shift.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    message: "تم التعديل بنجاج",
    data: shift,
  });
});

// Delete Shift
exports.deleteShift = catchAsync(async (req, res, next) => {
  await Shift.findByIdAndDelete(req.params.id);
  res.status(400).json({
    data: null,
  });
});
