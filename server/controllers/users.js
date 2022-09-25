const { User } = require("../models/user");
const { Type } = require("../models/type");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const express = require("express");

// const findByEmail = async (req, res) => {
//   const user = await User.findOne({ email: req.body.email });
//   if (!user) {
//     res.status(500).json({ success: false });
//   }
//   res.send(user);
// };

const addUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  userPassword = await bcrypt.hash(req.body.password, salt);
  const user = new User({
    name: req.body.name,
    password: userPassword,
    email: req.body.email,
    role: req.body.role,
    isAccepted: req.body.isAccepted,
  });

  user
    .save()
    .then((createdUser) => {
      res.status(201).json(createdUser);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
};

const updateUser = async (req, res) => {
  const type = await Type.findById(req.body.type);
  if (!type) {
    return res.status(400).send("Invalid type");
  }

  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid user Id");
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      type: req.body.type,
    },
    { new: true }
  );
  if (!user) {
    return res.status(404).send("the user cannot be update");
  }
  res.send(user);
};

const deleteUser = async (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (user) {
        return res.status(200).json({
          success: true,
          message: "the user was deleted",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "user not found",
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        error: err,
      });
    });
};

module.exports = {
  addUser,
  updateUser,
  deleteUser,
};
