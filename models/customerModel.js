const mongoose = require("mongoose");
const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "يجب ان يحتوي العميل علي اسم"],
  },
  phone: {
    type: String,
    required: [true, "يجب ان يحتوي العميل علي رقم هاتف"],
    unique: true,
  },
  address: {
    type: String,
    required: [true, "يجب ان يحتوي العميل علي عنوان"],
    trim: true,
  },
  place: {
    type: mongoose.Schema.ObjectId,
    ref: "DeliveryFee",
  },
  money: {
    type: Number,
    default: 0,
  },
});

CustomerSchema.pre(/^find/, function (next) {
  this.populate({
    path: "place",
    select: "-__v",
  });
  next();
});

const Customer = mongoose.model("Customer", CustomerSchema);
module.exports = Customer;
