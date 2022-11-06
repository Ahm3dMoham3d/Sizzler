const mongoose = require("mongoose");
const ShiftSchema = new mongoose.Schema({
  cashier: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "يجب تسجيل دخول كاشير لانشاء الطلب"],
  },
  status: {
    type: Boolean,
    default: true,
  },
  startTime: {
    type: Date,
    default: Date.now,
  },
  endTime: {
    type: Date,
  },
  startMoney: {
    type: Number,
    required: [true, "برجاء ادخال العهدة"],
  },

  endMoney: {
    type: Number,
  },

  moneyShortage: {
    type: Number,
  },
});
ShiftSchema.pre(/^find/, function (next) {
  this.populate({
    path: "cashier",
    select: "-__v -passwordChangedAt",
  });
  next();
});
const Shift = mongoose.model("Shift", ShiftSchema);
module.exports = Shift;
