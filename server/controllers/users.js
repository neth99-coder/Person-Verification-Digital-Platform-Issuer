const { User } = require("../models/user");
const { Type } = require("../models/type");
const mongoose = require("mongoose");
const express = require("express");

const getUsers = async (req, res) => {
  const userList = await User.find();
  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.send(userList);
};

const addUser = async (req, res) => {
  const doesExist = await User.findOne({ email: req.body.email });

  if (!doesExist) {
    const nic = req.files.nic_photo_id;
    const bc = req.files.bc_photo_id;
    const cc = req.files.cc_photo_id;

    const nic_type = nic != null ? nic.mimetype.split("/")[1] : "";
    const bc_type = bc != null ? bc.mimetype.split("/")[1] : "";
    const cc_type = cc != null ? cc.mimetype.split("/")[1] : "";

    const addedServices = [];
    req.body.account == "true" && addedServices.push("Bank Account Creation");
    req.body.loan == "true" && addedServices.push("Bank Loan Services");
    req.body.card == "true" && addedServices.push("Credit Card Services");

    if (nic != null) {
      nic.mv(
        `${__dirname}/../public/reg/${"nic_" + req.body.nic + "." + nic_type}`,
        (err) => {
          if (err) {
            console.error(err);
          }
        }
      );
    }

    if (bc != null) {
      bc.mv(
        `${__dirname}/../public/reg/${"bc_" + req.body.nic + "." + bc_type}`,
        (err) => {
          if (err) {
            console.error(err);
          }
        }
      );
    }

    if (cc != null) {
      cc.mv(
        `${__dirname}/../public/reg/${"cc_" + req.body.name + "." + cc_type}`,
        (err) => {
          if (err) {
            console.error(err);
          }
        }
      );
    }
    let user = null;
    if (cc == null) {
      user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        status: req.body.status,
        nationality: req.body.nationality,
        nic: req.body.nic,
        dob: req.body.dob,
        nic_photo_id: "nic_" + req.body.nic + "." + nic_type,
        bc_photo_id: "bc_" + req.body.nic + "." + bc_type,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        contact_number: req.body.contact_number,
        role: req.body.role,
        isAccepted: req.body.isAccepted,
      });
    } else {
      user = new User({
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        contact_number: req.body.contact_number,
        role: req.body.role,
        isAccepted: req.body.isAccepted,
        cc_photo_id: "cc_" + req.body.name + "." + cc_type,
        name: req.body.name,
        services: addedServices,
      });
    }

    user
      .save()
      .then((createdUser) => {
        res.status(201).json({ success: true });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
          success: false,
        });
      });
  } else {
    console.log("duplicate error");
    return res.status(201).json({
      error: "Duplicate Entry",
      success: false,
    });
  }
};

const updateUser = async (req, res) => {
  console.log(req.body);
  //const type = await Type.findById(req.body.type);
  // if (!type) {
  //   return res.status(400).send("Invalid type");
  // }

  if (!mongoose.isValidObjectId(req.params.id)) {
    console.log("invalid object id");
    return res.status(400).send("Invalid user Id");
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      isAccepted: req.body.isAccepted,
    },
    { new: true }
  );
  if (!user) {
    console.log("Updating error");
    return res.status(404).send("the user cannot be update");
  }
  res.send({ user: user, success: true });
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

const getPendingWalletUsers = async (req, res) => {
  const pendingList = await User.find({
    $and: [{ role: "wallet_owner" }, { isAccepted: "0" }],
  });
  if (!pendingList) {
    res.status(500).json({ success: false });
  }
  res.send(pendingList);
};

const getPendingBanks = async (req, res) => {
  const pendingList = await User.find({
    $and: [{ role: "bank" }, { isAccepted: "0" }],
  });
  if (!pendingList) {
    res.status(500).json({ success: false });
  }
  res.send(pendingList);
};

module.exports = {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  getPendingWalletUsers,
  getPendingBanks,
};
