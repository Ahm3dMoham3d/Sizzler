// Model
const Inventory = require("../models/inventoryModel");
// CatchAsyncError
const catchAsync = require("../utils/catchAsync");
// Get all inventory
exports.getAllInventory = catchAsync(async (req, res, next) => {
  const inventory = await Inventory.find();
  res.status(200).json({
    resault: inventory.length,
    data: inventory,
  });
});

// Get one inventory
exports.getOneInventory = catchAsync(async (req, res, next) => {
  const inventory = await Inventory.findById(req.params.id);
  res.status(200).json({
    data: inventory,
  });
});

// Add new inventory
exports.addInventory = catchAsync(async (req, res, next) => {
  const newinventory = await Inventory.create(req.body);

  res.status(201).json({
    message: "تمت الاضافة بنجاح",
    inventory: newinventory,
  });
});

// Update inventory
exports.updateInventory = catchAsync(async (req, res, next) => {
  const inventory = await Inventory.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    message: "تم التعديل بنجاج",
    data: inventory,
  });
});

// Delete inventory
exports.deleteInventory = catchAsync(async (req, res, next) => {
  await Inventory.findByIdAndDelete(req.params.id);
  res.status(200).json({
    data: null,
  });
});

exports.updateInvetoryNumber = catchAsync(async (req, res, next) => {
  const inventory = await Inventory.findByIdAndUpdate(
    req.params.id,
    { $inc: { number: req.body.num } },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    message: "تم التعديل بنجاج",
    data: inventory,
  });
});
