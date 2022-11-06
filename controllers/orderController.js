// Model
const Order = require("../models/orderModel.js");
const APIfeatures = require("../utils/apiFeatures.js");
const mongoose = require("mongoose");

// CatchAsyncError
const catchAsync = require("../utils/catchAsync");
// Get all Categories
exports.getAllOrder = catchAsync(async (req, res, next) => {
  const features = new APIfeatures(Order.find(), req.query)
    .filter()
    .limit()
    .sort();

  const orders = await features.query;
  res.status(200).json({
    resault: orders.length,
    data: orders,
  });
});

// Get one Order
exports.getOneOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  res.status(200).json({
    data: order,
  });
});

// Add new Order
exports.addOrder = catchAsync(async (req, res, next) => {
  const newOrder = await Order.create(req.body);

  res.status(201).json({
    message: "تمت الاضافة بنجاح",
    order: newOrder,
  });
  // Order.counterReset("orderNumber", function (err) {
  //   // If this is a referenced field, now all the counters are 0
  // });
});

// Update Order
exports.updateOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    message: "تم التعديل بنجاج",
    data: order,
  });
});

// Delete Order
exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(400).json({
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      message: "حدث خطا برجاء المحاولة مرة أخري",
      err: err,
    });
  }
};
