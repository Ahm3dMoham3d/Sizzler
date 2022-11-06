// Model
const Tax = require("../models/taxModel");
// CatchAsyncError
const catchAsync = require("../utils/catchAsync");
const APIfeatures = require("../utils/apiFeatures");
// Get all Tax
exports.getAllTax = catchAsync(async (req, res, next) => {
  const features = new APIfeatures(Tax.find(), req.query)
    .filter()
    .sort()
    .pagination();

  const tax = await features.query;
  res.status(200).json({
    resault: tax.length,
    data: tax,
  });
});

// Get one Tax
exports.getOneTax = catchAsync(async (req, res, next) => {
  const tax = await Tax.findById(req.params.id);
  res.status(200).json({
    data: tax,
  });
});

// Add new Tax
exports.addTax = catchAsync(async (req, res, next) => {
  const newTax = await Tax.create(req.body);

  res.status(201).json({
    message: "تمت الاضافة بنجاح",
    tax: newTax,
  });
});

// Update Tax
exports.updateTax = catchAsync(async (req, res, next) => {
  const tax = await Tax.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    message: "تم التعديل بنجاج",
    data: tax,
  });
});

// Delete Tax
exports.deleteTax = catchAsync(async (req, res, next) => {
  await Tax.findByIdAndDelete(req.params.id);
  res.status(400).json({
    data: null,
  });
});
