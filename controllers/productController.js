// Model
const Product = require("../models/productModel.js");
const APIfeatures = require("../utils/apiFeatures.js");
const Countfeatures = require("../utils/countFeatures.js");
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
      path.join("public/imgs/products", `products-${req.body.name}.jpeg`)
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

  req.file.filename = `products-${req.params.id}.jpeg`;

  sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/imgs/products/${req.file.filename}`);
  next();
};
// Get all products
exports.getAllProducts = catchAsync(async (req, res, next) => {
  const features = new APIfeatures(Product.find(), req.query)
    .filter()
    .sort()
    .pagination();

  const products = await features.query;
  const countfeatures = new Countfeatures(Product.countDocuments(), req.query)
    .filter()
    .sort();
  const count = await countfeatures.query;
  res.status(200).json({
    count: count,
    resault: products.length,
    data: products,
  });
});

// Text Search
exports.searchProducts = catchAsync(async (req, res, next) => {
  const features = new APIfeatures(
    Product.find({
      $text: { $search: `\"${req.query.search}\"` },
    }),
    req.query
  )
    .filter()
    .limit()
    .sort()
    .pagination();
  const product = await features.query;

  res.status(200).json({
    resault: product.length,
    data: product,
  });
});

// Get one product
exports.getOneProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  res.status(200).json({
    data: product,
  });
});

// Add new product
exports.addProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Product.create(req.body);
  const count = await Product.count();
  res.status(201).json({
    count: count,
    message: "تمت الاضافة بنجاح",
    product: newProduct,
  });
});

// Update product
exports.updateProduct = catchAsync(async (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.filename;
  }
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    message: "تم التعديل بنجاج",
    data: product,
  });
});

// Delete product
exports.deleteProduct = catchAsync(async (req, res, next) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(400).json({
    data: null,
  });
});

// Update product
