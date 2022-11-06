// Model
const Customer = require("../models/customerModel");
// CatchAsyncError
const catchAsync = require("../utils/catchAsync");
const APIfeatures = require("../utils/apiFeatures.js");
const Countfeatures = require("../utils/countFeatures.js");
// Get all Customer
exports.getAllCustomer = catchAsync(async (req, res, next) => {
  const features = new APIfeatures(Customer.find(), req.query)
    .filter()
    .sort()
    .pagination();

  const customer = await features.query;
  const countfeatures = new Countfeatures(Customer.countDocuments(), req.query)
    .filter()
    .sort();
  const count = await countfeatures.query;
  res.status(200).json({
    count: count,
    resault: customer.length,
    data: customer,
  });
});

// Get one Customer
exports.getOneCustomer = catchAsync(async (req, res, next) => {
  const customer = await Customer.findById(req.params.id);
  res.status(200).json({
    data: customer,
  });
});

// Add new Customer
exports.addCustomer = catchAsync(async (req, res, next) => {
  const newCustomer = await Customer.create(req.body);

  res.status(201).json({
    message: "تمت الاضافة بنجاح",
    customer: newCustomer,
  });
});

// Update Customer
exports.updateCustomer = catchAsync(async (req, res, next) => {
  const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    message: "تم التعديل بنجاج",
    data: customer,
  });
});

// Update Customer Amount
exports.updateCustomerAmount = catchAsync(async (req, res, next) => {
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { $inc: { money: req.body.amount } },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    message: "تم التعديل بنجاج",
    data: customer,
  });
});

// Delete Customer
exports.deleteCustomer = catchAsync(async (req, res, next) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.status(400).json({
    data: null,
  });
});
