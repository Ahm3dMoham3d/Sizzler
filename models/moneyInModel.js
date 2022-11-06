const mongoose = require("mongoose");

const MoneyInSchema = new mongoose.Schema(
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
    customer: {
      type: mongoose.Schema.ObjectId,
      ref: "Customer",
    },
    amount: {
      type: Number,
      require: ["برجاء ادخال قيمة المورد"],
    },
  },
  { timestamps: true }
);

MoneyInSchema.pre(/^find/, function (next) {
  this.populate({
    path: "customer",
    select: "-__v",
  });
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
const MoneyIn = mongoose.model("MoneyIn", MoneyInSchema);
module.exports = MoneyIn;
