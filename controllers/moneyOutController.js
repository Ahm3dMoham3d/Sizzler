// Model
const MoneyOut = require("../models/moneyOutModel");
const APIfeatures = require("../utils/apiFeatures.js");
const mongoose = require("mongoose");

// CatchAsyncError
const catchAsync = require("../utils/catchAsync");
// Get all Categories
exports.getAllMoneyOut = catchAsync(async (req, res, next) => {
  const features = new APIfeatures(MoneyOut.find(), req.query)
    .filter()
    .limit()
    .sort();

  const moneyOuts = await features.query;
  res.status(200).json({
    resault: moneyOuts.length,
    data: moneyOuts,
  });
});

// Get one MoneyOut
exports.getOneMoneyOut = catchAsync(async (req, res, next) => {
  const moneyOut = await MoneyOut.findById(req.params.id);
  res.status(200).json({
    data: moneyOut,
  });
});

// Add new MoneyOut
exports.addMoneyOut = catchAsync(async (req, res, next) => {
  const newMoneyOut = await MoneyOut.create(req.body);

  res.status(201).json({
    message: "تمت الاضافة بنجاح",
    moneyOut: newMoneyOut,
  });
});

// Update MoneyOut
exports.updateMoneyOut = catchAsync(async (req, res, next) => {
  const moneyOut = await MoneyOut.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    message: "تم التعديل بنجاج",
    data: moneyOut,
  });
});

// Delete MoneyOut
exports.deleteMoneyOut = async (req, res) => {
  try {
    await MoneyOut.findByIdAndDelete(req.params.id);
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
