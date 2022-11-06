const mongoose = require("mongoose");
const DiscountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "يجب ان يحتوي الخصم علي اسم"],
    unique: true,
    trim: true,
  },
  value: {
    type: Number,
    required: [true, "يجب ان يحتوي الخصم علي قيمة"],
  },
  unit: {
    type: String,
    enum: ["%", "fixed"],
    default: "%",
  },
  enabled: {
    type: Boolean,
    default: true,
  },
});

const Discount = mongoose.model("Discount", DiscountSchema);
module.exports = Discount;
