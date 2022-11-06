// Model
const MoneyIn = require("../models/moneyInModel");
const APIfeatures = require("../utils/apiFeatures.js");
const mongoose = require("mongoose");

// CatchAsyncError
const catchAsync = require("../utils/catchAsync");
// Get all Categories
exports.getAllMoneyIn = catchAsync(async (req, res, next) => {
  const features = new APIfeatures(MoneyIn.find(), req.query)
    .filter()
    .limit()
    .sort();

  const moneyIns = await features.query;
  res.status(200).json({
    resault: moneyIns.length,
    data: moneyIns,
  });
});

// Get one MoneyIn
exports.getOneMoneyIn = catchAsync(async (req, res, next) => {
  const moneyIn = await MoneyIn.findById(req.params.id);
  res.status(200).json({
    data: moneyIn,
  });
});

// Add new MoneyIn
exports.addMoneyIn = catchAsync(async (req, res, next) => {
  const newMoneyIn = await MoneyIn.create(req.body);

  res.status(201).json({
    message: "تمت الاضافة بنجاح",
    moneyIn: newMoneyIn,
  });
});

// Update MoneyIn
exports.updateMoneyIn = catchAsync(async (req, res, next) => {
  const moneyIn = await MoneyIn.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    message: "تم التعديل بنجاج",
    data: moneyIn,
  });
});

// Delete MoneyIn
exports.deleteMoneyIn = async (req, res) => {
  try {
    await MoneyIn.findByIdAndDelete(req.params.id);
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
