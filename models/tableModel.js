const mongoose = require("mongoose");
const TableSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "يجب أن تحتوي الطاولة علي اسم أو رقم"],
    unique: true,
    trim: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  hasOrder: {
    type: Boolean,
    default: false,
  },
  reservation: {
    type: String,
    default: "",
  },
});

const Table = mongoose.model("Table", TableSchema);
module.exports = Table;
