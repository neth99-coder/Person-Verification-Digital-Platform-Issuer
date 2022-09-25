require("dotenv").config();
const config = require("config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  last_name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  bank_name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  status: {
    type: String,
    enum: ["Single", "Married", "Divorced"],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "person", "bank"],
  },
  isAccepted: {
    type: String,
    enum: ["-1", "0", "1"],
    default: "0",
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      role: this.role,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

exports.User = mongoose.model("User", userSchema);
