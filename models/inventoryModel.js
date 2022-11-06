const mongoose = require("mongoose");
const InventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "يجب ان يحتوي التصنيف علي اسم"],
    unique: true,
    trim: true,
  },
  number: {
    type: Number,
    required: [true, "يجب اضافة عدد أولي لعنصر المخزون"],
  },
});

const Inventory = mongoose.model("Inventory", InventorySchema);
module.exports = Inventory;
