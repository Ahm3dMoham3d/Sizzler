const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const OrderSchema = new mongoose.Schema(
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
    delivery: {
      type: mongoose.Schema.ObjectId,
      ref: "Delivery",
    },
    table: {
      type: mongoose.Schema.ObjectId,
      ref: "Table",
    },
    customer: {
      type: mongoose.Schema.ObjectId,
      ref: "Customer",
    },
    laterCustomer: {
      type: mongoose.Schema.ObjectId,
      ref: "Customer",
    },
    address: {
      type: String,
    },
    place: {
      type: String,
    },
    orderNumber: {
      type: Number,
    },
    status: {
      type: Boolean,
      default: false,
    },
    discount: {
      type: Number,
      default: 0,
    },
    deilveryFee: {
      type: Number,
    },
    tax: {
      type: Number,
    },
    service: {
      type: Number,
    },
    orderType: {
      type: String,
      enum: ["تيك أواي", "صالة", "دليفيري"],
      required: true,
    },
    payBy: {
      type: String,
      enum: ["كاش", "أجل", "فيزا"],
      required: true,
    },
    totalItemsPrice: {
      type: Number,
    },

    totalPrice: {
      type: Number,
    },
    comments: {
      type: String,
    },
    withOutService: {
      type: Boolean,
      default: false,
    },

    withOutDeliver: {
      type: Boolean,
      default: false,
    },
    isCanceld: {
      type: Boolean,
      default: false,
    },
    whyCanceld: {
      type: String,
    },
    printTime: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

OrderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "cashier",
    select: "-__v -passwordChangedAt",
  });
  this.populate({
    path: "shift",
    select: "-__v",
  });
  this.populate({
    path: "customer",
    select: "-__v -address -place",
  });
  this.populate({
    path: "laterCustomer",
    select: "-__v -address -place",
  });
  this.populate({
    path: "table",
    select: "-__v",
  });
  this.populate({
    path: "delivery",
    select: "-__v",
  });
  next();
});

OrderSchema.pre("save", function (next) {
  this.populate({
    path: "cashier",
    select: "-__v -passwordChangedAt",
  });
  this.populate({
    path: "shift",
    select: "-__v",
  });
  this.populate({
    path: "customer",
    select: "-__v -address -place",
  });
  this.populate({
    path: "laterCustomer",
    select: "-__v -address -place",
  });
  this.populate({
    path: "table",
    select: "-__v",
  });
  this.populate({
    path: "delivery",
    select: "-__v",
  });
  next();
});

OrderSchema.plugin(AutoIncrement, { inc_field: "orderNumber" });
const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
