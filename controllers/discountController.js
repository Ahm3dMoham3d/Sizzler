// Model
const Discount = require("../models/discountModel");
// CatchAsyncError
const catchAsync = require("../utils/catchAsync");
const APIfeatures = require("../utils/apiFeatures");
// Get all Discounts
exports.getAllDiscount = catchAsync(async (req, res, next) => {
  const features = new APIfeatures(Discount.find(), req.query).filter().sort();

  const discount = await features.query;
  res.status(200).json({
    resault: discount.length,
    data: discount,
  });
});

// Get one Discount
exports.getOneDiscount = catchAsync(async (req, res, next) => {
  const discount = await Discount.findById(req.params.id);
  res.status(200).json({
    data: discount,
  });
});

// Add new Discount
exports.addDiscount = catchAsync(async (req, res, next) => {
  const newDiscount = await Discount.create(req.body);

  res.status(201).json({
    message: "تمت الاضافة بنجاح",
    discount: newDiscount,
  });
});

// Update Discount
exports.updateDiscount = catchAsync(async (req, res, next) => {
  const discount = await Discount.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    message: "تم التعديل بنجاج",
    data: discount,
  });
});

// Delete Discount
exports.deleteDiscount = catchAsync(async (req, res, next) => {
  await Discount.findByIdAndDelete(req.params.id);
  res.status(400).json({
    data: null,
  });
});
