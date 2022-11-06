const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "يجب ان يحتوي المنتج علي اسم"],
      unique: true,
    },

    sizes: [
      {
        size: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
    },
    image: {
      type: String,
      default: "default.jpg",
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    recipe: [
      {
        inv: {
          type: mongoose.Schema.ObjectId,
          ref: "Inventory",
        },
        qty: {
          type: Number,
          required: [true, "يجب ان يحتوي علي كمية"],
        },
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
ProductSchema.pre("save", function (next) {
  this.populate({
    path: "category",
    select: "name , enabled",
  });
  this.populate({
    path: "recipe.name",
    select: "-__v",
  });
  next();
});
ProductSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
    select: "name , enabled",
  });
  this.populate({
    path: "recipe.inv",
    select: "-__v -number",
  });
  next();
});
ProductSchema.index({ name: "text", name: "text" });
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
