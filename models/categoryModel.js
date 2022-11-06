const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "يجب ان يحتوي التصنيف علي اسم"],
    unique: true,
    trim: true,
  },
  image: {
    type: String,
    default: "default.jpg",
  },
  enabled: {
    type: Boolean,
    default: false,
  },
});

const Category = mongoose.model("Category", CategorySchema);
Category.watch().on("change", (data) => console.log(data));
module.exports = Category;
