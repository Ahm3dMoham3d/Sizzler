const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "يجب ان يحتوي المستخدم علي اسم"],
    unique: true,
  },
  // email: {
  //   type: String,
  //   required: [true, "يجب ان يحتوي المستخدم علي حساب"],
  //   unique: true,
  //   lowercase: true,
  //   validate: [validator.isEmail, "برجاء ادخال حساب صحيح"],
  // },
  password: {
    type: String,
    required: [true, "يجب ان يحتوي المستخدم علي كلمة مرور"],
    minlength: 6,
    select: false,
  },
  // passwordConfirm: {
  //   type: String,
  //   required: [true, "برجاء قم بتأكيد كلمة المرور"],
  //   validate: {
  //     validator: function (el) {
  //       return el === this.password;
  //     },
  //     message: "كلمات المرور غير متشابهة",
  //   },
  // },
  phone: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "cashier"],
    default: "cashier",
  },
  passwordChangedAt: {
    type: Date,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  // this.passwordConfirm = undefined;
  next();
});

UserSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

UserSchema.methods.correctPassword = async function (
  userPassword,
  bcryptPassword
) {
  return await bcrypt.compare(userPassword, bcryptPassword);
};
UserSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
