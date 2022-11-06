const mongoose = require("mongoose");
const AddOneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "يجب ان تحتوي الاضافة علي اسم"],
    unique: true,
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "يجب ان تحتوي الاضافة علي سعر"],
  },
  enabled: {
    type: Boolean,
    default: true,
  },
});

const AddOne = mongoose.model("AddOne", AddOneSchema);
module.exports = AddOne;
