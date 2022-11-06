// Model
const Category = require("../models/categoryModel");
const AppError = require("../utils/appError");
const APIfeatures = require("../utils/apiFeatures");
// CatchAsyncError
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const multerStorge = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (
    fs.existsSync(
      path.join("public/imgs/category", `category-${req.body.name}.jpeg`)
    )
  ) {
    console.log("skipped");
    cb(null, false);
    return;
  } else {
    cb(null, true);
  }
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("يجب ان يكون الملف صورة", 400), false);
  }
};
const upload = multer({
  storage: multerStorge,
  fileFilter: multerFilter,
});
exports.uploadImg = upload.single("photo");
exports.resizeImg = (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `category-${req.params.id}.jpeg`;

  sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/imgs/category/${req.file.filename}`);
  next();
};

// Get all Categories
exports.getAllCategory = catchAsync(async (req, res, next) => {
  const features = new APIfeatures(Category.find(), req.query)
    .filter()
    .limit()
    .sort()
    .limit();

  const categories = await features.query;
  const count = await Category.countDocuments(req.query);
  res.status(200).json({
    resault: categories.length,
    data: categories,
  });
});

// Get one Category
exports.getOneCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  res.status(200).json({
    data: category,
  });
});

// Add new Category
exports.addCategory = catchAsync(async (req, res, next) => {
  const newCategory = await Category.create(req.body);
  res.status(201).json({
    message: "تمت الاضافة بنجاح",
    category: newCategory,
  });
});

// Update Category
exports.updateCategory = catchAsync(async (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.filename;
  }

  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    message: "تم التعديل بنجاح",
    data: category,
  });
});

// Delete Category
exports.deleteCategory = catchAsync(async (req, res, next) => {
  await Category.findByIdAndDelete(req.params.id);
  res.status(200).json({
    data: null,
  });
});
