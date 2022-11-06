// Model
const Order = require("../models/orderModel.js");
const OrderItem = require("../models/orderItemsModel");
const Delivery = require("../models/deliveryModel");
const MoneyIn = require("../models/moneyInModel.js");
const APIfeatures = require("../utils/apiFeatures.js");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
// CatchAsyncError
const catchAsync = require("../utils/catchAsync");

exports.getByType = catchAsync(async (req, res, next) => {
  const byType = await Order.aggregate([
    {
      $match: { shift: ObjectId(req.query.shift) },
    },

    {
      $group: {
        _id: "$orderType",
        myCount: { $sum: 1 },
        totalItemsPrice: { $sum: "$totalItemsPrice" },
        tax: { $sum: "$tax" },
        service: { $sum: "$service" },
        deliveryFee: { $sum: "$deilveryFee" },
        discount: { $sum: "$discount" },
        totalPrice: { $sum: "$totalPrice" },
      },
    },
  ]);

  const later = await Order.aggregate([
    {
      $match: { shift: ObjectId(req.query.shift), payBy: "أجل" },
    },

    {
      $group: {
        _id: "$orderType",
        myCount: { $sum: 1 },
        totalItemsPrice: { $sum: "$totalItemsPrice" },
        tax: { $sum: "$tax" },
        service: { $sum: "$service" },
        deliveryFee: { $sum: "$deilveryFee" },
        discount: { $sum: "$discount" },
        totalPrice: { $sum: "$totalPrice" },
      },
    },
  ]);

  const backOrder = await Order.aggregate([
    {
      $match: { shift: ObjectId(req.query.shift), isCanceld: true },
    },

    {
      $group: {
        _id: "$isCanceld",
        myCount: { $sum: 1 },
        totalItemsPrice: { $sum: "$totalItemsPrice" },

        tax: { $sum: "$tax" },
        service: { $sum: "$service" },
        deliveryFee: { $sum: "$deilveryFee" },
        discount: { $sum: "$discount" },
        totalPrice: { $sum: "$totalPrice" },
      },
    },
  ]);

  const byDelivery = await Order.aggregate([
    {
      $match: { shift: ObjectId(req.query.shift), orderType: "دليفيري" },
    },

    {
      $group: {
        _id: "$delivery",
        myCount: { $sum: 1 },
        totalItemsPrice: { $sum: "$totalItemsPrice" },
        tax: { $sum: "$tax" },
        service: { $sum: "$service" },
        deliveryFee: { $sum: "$deilveryFee" },
        discount: { $sum: "$discount" },
        totalPrice: { $sum: "$totalPrice" },
      },
    },

    {
      $lookup: {
        from: Delivery.collection.name,
        localField: "_id",
        foreignField: "_id",
        as: "delivery_name",
      },
    },
  ]);

  const moneyIn = await MoneyIn.aggregate([
    {
      $match: { shift: ObjectId(req.query.shift) },
    },

    {
      $group: {
        _id: "$cashier",
        myCount: { $sum: 1 },
        amount: { $sum: "$amount" },
      },
    },
  ]);

  const byAll = await Order.aggregate([
    {
      $match: { shift: ObjectId(req.query.shift) },
    },

    {
      $group: {
        _id: "$cashier",
        myCount: { $sum: 1 },
        totalItemsPrice: { $sum: "$totalItemsPrice" },
        tax: { $sum: "$tax" },
        service: { $sum: "$service" },
        deliveryFee: { $sum: "$deilveryFee" },
        discount: { $sum: "$discount" },
        totalPrice: { $sum: "$totalPrice" },
      },
    },
  ]);

  res.status(200).json({
    byType: byType,
    later: later,
    backOrder: backOrder,
    byDelivery: byDelivery,
    moneyIn: moneyIn,
    byAll: byAll,
  });
});

exports.getSellsWeekly = catchAsync(async (req, res, next) => {
  const currentYear = new Date().getFullYear();
  var start = new Date(currentYear, 0, 1);

  var end = new Date(currentYear, 11, 31);
  const selles = await Order.aggregate([
    {
      $match: { createdAt: { $gte: start, $lte: end } },
    },
    {
      $project: {
        dayOfWeek: { $dayOfWeek: "$createdAt" },
        totalPrice: 1,
      },
    },

    {
      $group: {
        _id: { dayOfWeek: "$dayOfWeek" },
        count: { $sum: "$totalPrice" },
      },
    },
  ]);

  res.status(200).json({
    data: selles,
  });
});

exports.getSellsMonthly = catchAsync(async (req, res, next) => {
  const currentYear = new Date().getFullYear();
  var start = new Date(currentYear, 0, 1);

  var end = new Date(currentYear, 11, 31);

  const selles = await Order.aggregate([
    {
      $match: { createdAt: { $gte: start, $lte: end } },
    },
    {
      $project: {
        month: { $month: "$createdAt" },
        totalPrice: 1,
      },
    },

    {
      $group: {
        _id: { month: "$month" },
        count: { $sum: "$totalPrice" },
      },
    },
  ]);

  res.status(200).json({
    data: selles,
  });
});

exports.getSellsYearly = catchAsync(async (req, res, next) => {
  const selles = await Order.aggregate([
    {
      $project: {
        year: { $year: "$createdAt" },
        totalPrice: 1,
      },
    },

    {
      $group: {
        _id: { year: "$year" },
        count: { $sum: "$totalPrice" },
      },
    },
  ]);

  res.status(200).json({
    data: selles,
  });
});

exports.getProductsSalesDaily = catchAsync(async (req, res, next) => {
  var start = new Date();
  start.setHours(0, 0, 0, 0);

  var end = new Date();
  end.setHours(23, 59, 59, 999);
  const itemsSelledDaily = await OrderItem.aggregate([
    {
      $match: { createdAt: { $gte: start, $lt: end } },
    },
    {
      $project: {
        order: "$order",
        items: "$items",
      },
    },
    {
      $unwind: "$items",
    },
    {
      $group: {
        _id: "$items.product",
        count: {
          $sum: "$items.qty",
        },
      },
    },
  ]);

  res.status(200).json({
    count: itemsSelledDaily.length,
    data: itemsSelledDaily,
  });
});

exports.getProductsSales = catchAsync(async (req, res, next) => {
  const itemsSelledDaily = await OrderItem.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(req.query.from),
          $lte: new Date(req.query.to),
        },
      },
    },
    {
      $project: {
        order: "$order",
        items: "$items",
      },
    },
    {
      $unwind: "$items",
    },
    {
      $group: {
        _id: "$items.product",
        count: {
          $sum: "$items.qty",
        },
      },
    },
  ]);

  res.status(200).json({
    data: itemsSelledDaily,
  });
  console.log(req.query);
});
