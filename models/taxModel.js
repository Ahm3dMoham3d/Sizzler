const mongoose = require("mongoose");
const TaxSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "يجب أن تحتوي الضريبة علي اسم"],
    unique: true,
    trim: true,
  },
  enabled: {
    type: Boolean,
    default: false,
  },
  value: {
    type: Number,
    required: [true, "يجب أن تحتوي الضريبة علي قيمة"],
  },
  unit: {
    type: String,
    enum: ["fixed", "%"],
    required: [true, "يجب أن تحتوي الضريبة علي وحدة"],
  },
});

const Tax = mongoose.model("Tax", TaxSchema);
module.exports = Tax;
