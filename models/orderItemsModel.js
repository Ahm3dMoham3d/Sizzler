const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.ObjectId,
      ref: "Order",
    },
    items: [
      {
        _id: {
          select: false,
        },
        product: {
          type: String,
        },
        category: {
          type: String,
        },
        price: {
          type: Number,
        },
        qty: {
          type: Number,
          default: 1,
        },
        dis: {
          type: Number,
          default: 0,
        },

        comment: {
          type: String,
        },
        addOnes: [
          {
            name: {
              type: String,
            },
            price: {
              type: Number,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

OrderItemSchema.pre(/^find/, function (next) {
  this.populate({
    path: "order",
    select: "-__v",
  });
  next();
});
const OrderItem = mongoose.model("OrderItem", OrderItemSchema);
module.exports = OrderItem;
