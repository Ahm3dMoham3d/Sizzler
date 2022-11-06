// Model
const Delivery = require("../models/deliveryModel");
// CatchAsyncError
const catchAsync = require("../utils/catchAsync");
const APIfeatures = require("../utils/apiFeatures");
// Get all Delivery
exports.getAllDelivery = catchAsync(async (req, res, next) => {
  const features = new APIfeatures(Delivery.find(), req.query)
    .filter()
    .sort()
    .pagination();

  const delivery = await features.query;
  res.status(200).json({
    resault: delivery.length,
    data: delivery,
  });
});

// Get one Delivery
exports.getOneDelivery = catchAsync(async (req, res, next) => {
  const delivery = await Delivery.findById(req.params.id);
  res.status(200).json({
    data: delivery,
  });
});

// Add new Delivery
exports.addDelivery = catchAsync(async (req, res, next) => {
  const newDelivery = await Delivery.create(req.body);

  res.status(201).json({
    message: "تمت الاضافة بنجاح",
    delivery: newDelivery,
  });
});

// Update Delivery
exports.updateDelivery = catchAsync(async (req, res, next) => {
  const delivery = await Delivery.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    message: "تم التعديل بنجاج",
    data: delivery,
  });
});

// Delete Delivery
exports.deleteDelivery = catchAsync(async (req, res, next) => {
  await Delivery.findByIdAndDelete(req.params.id);
  res.status(400).json({
    data: null,
  });
});
