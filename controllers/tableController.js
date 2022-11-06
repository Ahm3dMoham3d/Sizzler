// Model
const Table = require("../models/tableModel");
// CatchAsyncError
const catchAsync = require("../utils/catchAsync");
const APIfeatures = require("../utils/apiFeatures");
// Get all Table
exports.getAllTables = catchAsync(async (req, res, next) => {
  const features = new APIfeatures(Table.find(), req.query).filter().sort();

  const table = await features.query;

  res.status(200).json({
    resault: table.length,
    data: table,
  });
});

// Get one Table
exports.getOneTable = catchAsync(async (req, res, next) => {
  const table = await Table.findById(req.params.id);
  res.status(200).json({
    data: table,
  });
});

// Add new Table
exports.addTable = catchAsync(async (req, res, next) => {
  const newTable = await Table.create(req.body);

  res.status(201).json({
    message: "تمت الاضافة بنجاح",
    table: newTable,
  });
});

// Update Table
exports.updateTable = catchAsync(async (req, res, next) => {
  const table = await Table.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    message: "تم التعديل بنجاج",
    data: table,
  });
});

// Delete Table
exports.deleteTable = catchAsync(async (req, res, next) => {
  await Table.findByIdAndDelete(req.params.id);
  res.status(400).json({
    data: null,
  });
});
