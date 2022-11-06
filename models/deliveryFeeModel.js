const mongoose = require("mongoose");
const DeliveryFeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "يجب ان يحتوي النطاق علي اسم"],
    unique: true,
    trim: true,
  },
  value: {
    type: Number,
    required: [true, "يجب ان يحتوي النطاق علي سعر"],
  },
});

const DeliveryFee = mongoose.model("DeliveryFee", DeliveryFeeSchema);
module.exports = DeliveryFee;
