const mongoose = require("mongoose");

const MoneyOutSchema = new mongoose.Schema(
  {
    cashier: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "يجب تسجيل دخول كاشير لانشاء الطلب"],
    },
    shift: {
      type: mongoose.Schema.ObjectId,
      ref: "Shift",
    },
    reason: {
      type: String,
      require: ["برجاء ادخال  سبب السحب"],
    },
    amount: {
      type: Number,
      require: ["برجاء ادخال قيمة الخارج"],
    },
  },
  { timestamps: true }
);

MoneyOutSchema.pre(/^find/, function (next) {
  this.populate({
    path: "cashier",
    select: "-__v -passwordChangedAt",
  });
  this.populate({
    path: "shift",
    select: "-__v",
  });
  next();
});
const MoneyOut = mongoose.model("MoneyOut", MoneyOutSchema);
module.exports = MoneyOut;
