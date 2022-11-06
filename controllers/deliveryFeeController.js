// Model
const DeliveryFee = require("../models/deliveryFeeModel");
// CatchAsyncError
const catchAsync = require("../utils/catchAsync");
// Get all DeliveryFee
exports.getAllDeliveryFee = catchAsync(async (req, res, next) => {
  const deliveryFee = await DeliveryFee.find();
  res.status(200).json({
    resault: deliveryFee.length,
    data: deliveryFee,
  });
});

// Get one DeliveryFee
exports.getOneDeliveryFee = catchAsync(async (req, res, next) => {
  const deliveryFee = await DeliveryFee.findById(req.params.id);
  res.status(200).json({
    data: deliveryFee,
  });
});

// Add new DeliveryFee
exports.addDeliveryFee = catchAsync(async (req, res, next) => {
  const newDeliveryFee = await DeliveryFee.create(req.body);

  res.status(201).json({
    message: "تمت الاضافة بنجاح",
    deliveryFee: newDeliveryFee,
  });
});

// Update DeliveryFee
exports.updateDeliveryFee = catchAsync(async (req, res, next) => {
  const deliveryFee = await DeliveryFee.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    message: "تم التعديل بنجاج",
    data: deliveryFee,
  });
});

// Delete DeliveryFee
exports.deleteDeliveryFee = catchAsync(async (req, res, next) => {
  await DeliveryFee.findByIdAndDelete(req.params.id);
  res.status(400).json({
    data: null,
  });
});
