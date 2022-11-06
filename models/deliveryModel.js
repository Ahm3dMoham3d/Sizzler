const mongoose = require("mongoose");
const DeliverySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "يجب ان يحتوي الطيار علي اسم"],
      unique: true,
    },
    inOrder: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      required: [true, "يجب ان يحتوي الطيار علي هاتف"],
    },
    lastMove: {
      type: Date,
    },
    enabled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Delivery = mongoose.model("Delivery", DeliverySchema);

module.exports = Delivery;
