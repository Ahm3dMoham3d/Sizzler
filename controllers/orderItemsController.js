// Model
const OrderItem = require("../models/orderItemsModel.js");
const APIfeatures = require("../utils/apiFeatures.js");
const mongoose = require("mongoose");

// CatchAsyncError
const catchAsync = require("../utils/catchAsync");
// Get all Categories
exports.getAllOrderItem = catchAsync(async (req, res, next) => {
  const features = new APIfeatures(OrderItem.find(), req.query)
    .filter()
    .limit()
    .sort();

  const orders = await features.query;
  res.status(200).json({
    resault: orders.length,
    data: orders,
  });
});

// Get one OrderItem
exports.getOneOrderItem = catchAsync(async (req, res, next) => {
  const order = await OrderItem.findById(req.params.id);
  res.status(200).json({
    data: order,
  });
});

// Add new OrderItem
exports.addOrderItem = catchAsync(async (req, res, next) => {
  const newOrderItem = await OrderItem.create(req.body);

  res.status(201).json({
    message: "تمت الاضافة بنجاح",
    items: newOrderItem,
  });
  // OrderItem.counterReset("orderNumber", function (err) {
  //   // If this is a referenced field, now all the counters are 0
  // });
});

// Update OrderItem
exports.updateOrderItem = catchAsync(async (req, res, next) => {
  const order = await OrderItem.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    message: "تم التعديل بنجاج",
    data: order,
  });
});

// Delete OrderItem
exports.deleteOrderItem = async (req, res) => {
  try {
    await OrderItem.findByIdAndDelete(req.params.id);
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
