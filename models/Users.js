import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: [true, "please provide name"],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: "string",
    required: [true, "please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "please provide a valid email",
    },
    unique: true,
  },
  password: {
    type: "string",
    required: [true, "please provide password"],
    minlength: 6,
    select: false,
  },
  lastName: {
    type: "string",
    required: [true, "please provide name"],
    trim: true,
    maxlength: 20,
    default: "lastName",
  },
  location: {
    type: "string",
    maxlength: 20,
    default: "my city",
  },
});
UserSchema.pre("save", async function () {
  // findOne returns everything except password
  // during update save() triggers this method so if i don't use the below code error will occur because
  // password is not returned b/c select: false in the schema
  if (!this.isModified("password")) return;
  console.log(this.password);
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});
UserSchema.methods.createJWT = function () {
  // console.log(this);
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};
UserSchema.methods.checkPassword = async function (providedPassword) {
  const isCorrect = await bcryptjs.compare(providedPassword, this.password);
  return isCorrect;
};
export default mongoose.model("User", UserSchema);
