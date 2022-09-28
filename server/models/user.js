require("dotenv").config();
const config = require("config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  title: {},
  first_name: {
    type: String,
    required: function () {
      return this.role == "wallet_owner";
    },
    minlength: 2,
    maxlength: 50,
  },
  last_name: {
    type: String,
    required: function () {
      return this.role == "wallet_owner";
    },
    minlength: 2,
    maxlength: 50,
  },
  status: {
    type: String,
    required: function () {
      return this.role == "wallet_owner";
    },
    enum: ["Single", "Married", "Divorced", "Widowed"],
  },
  nationality: {
    type: String,
    required: function () {
      return this.role == "wallet_owner";
    },
    enum: ["Sinhalese", "Tamils", "Moor", "Burgher", "Malay", "Vedda"],
  },
  nic: {
    type: String,
    required: function () {
      return this.role == "wallet_owner";
    },
  },
  dob: {
    type: Date,
    required: function () {
      return this.role == "wallet_owner";
    },
  },
  nic_photo_id: {
    type: String,
    required: function () {
      return this.role == "wallet_owner";
    },
  },
  bc_photo_id: {
    type: String,
    required: function () {
      return this.role == "wallet_owner";
    },
  },
  cc_photo_id: {
    type: String,
    required: function () {
      return this.role == "bank";
    },
  },
  name: {
    type: String,
    required: function () {
      return this.role == "bank";
    },
    minlength: 2,
    maxlength: 50,
  },
  services:{
    type: [{type: String}],
    required:function () {
      return this.role == "bank";
    },
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024,
  },
  address: {
    type: String,
    required: function () {
      return this.role != "admin";
    },
    minlength: 5,
    maxlength: 1024,
  },
  contact_number: {
    type: String,
    required: function () {
      return this.role != "admin";
    },
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "wallet_owner", "bank"],
  },
  isAccepted: {
    type: String,
    required: function () {
      return this.role != "admin";
    },
    eunm: ["-1", "0", "1"],
    default: "0",
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: this.role,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

exports.User = mongoose.model("User", userSchema);
