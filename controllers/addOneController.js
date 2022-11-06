// Model
const AddOne = require("../models/addOneModel");
// CatchAsyncError
const catchAsync = require("../utils/catchAsync");
const APIfeatures = require("../utils/apiFeatures");
const Countfeatures = require("../utils/countFeatures");
// Get all Categories
exports.getAllAddOne = catchAsync(async (req, res, next) => {
  const features = new APIfeatures(AddOne.find(), req.query)
    .filter()
    .limit()
    .sort()
    .pagination();

  const addOnes = await features.query;
  const countfeatures = new Countfeatures(AddOne.countDocuments(), req.query)
    .filter()
    .sort();
  const count = await countfeatures.query;
  res.status(200).json({
    count: count,
    resault: addOnes.length,
    data: addOnes,
  });
});

// Get one AddOne
exports.getOneAddOne = catchAsync(async (req, res, next) => {
  const addOne = await AddOne.findById(req.params.id);
  res.status(200).json({
    data: addOne,
  });
});

// Add new AddOne
exports.addAddOne = catchAsync(async (req, res, next) => {
  const newAddOne = await AddOne.create(req.body);

  res.status(201).json({
    message: "تمت الاضافة بنجاح",
    addOne: newAddOne,
  });
});

// Update AddOne
exports.updateAddOne = catchAsync(async (req, res, next) => {
  const addOne = await AddOne.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    message: "تم التعديل بنجاج",
    data: addOne,
  });
});

// Delete AddOne
exports.deleteAddOne = catchAsync(async (req, res, next) => {
  await AddOne.findByIdAndDelete(req.params.id);
  res.status(400).json({
    data: null,
  });
});
