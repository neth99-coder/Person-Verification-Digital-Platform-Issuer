const { User } = require("../models/user");
const { Type } = require("../models/type");
const mongoose = require("mongoose");
const express = require("express");
const transporter = require("../helpers/transporter");
var generator = require("generate-password");
const bcrypt = require("bcrypt");
const { has } = require("config");


const updatePassword = async (req, res) => {
  console.log(req.body);
  const user =  await User.findOne({ email: req.body.email });
  console.log(user);
  if (!user) {
    res.status(500).json({ success: false });
    return;
  }else{
    bcrypt.compare(req.body.oldPassword, user.password, function(err, result) {
      if (err){
        res.status(500).json({ success: false });
      }
      if (!result) {
        res.send({success: false, message: 'passwords do not match'});
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.newPassword, salt, (err, hash) => {
            if (err){
              res.status(500).json({ success: false });
            }else{
              user.password = hash;
              user.save();
              res.send({ success: true });
            }
          });
      });
      }
    });
  }
  
};


const updateServices = (req, res) => {
  console.log(req.body);
  const user =  User.findOneAndUpdate(
    { email: req.body.email },
    { services: req.body.services },
    function (err, doc) {
      if (err) return res.send(500, { error: err });
      return res.send("Succesfully saved.");
    }
  );
};

const getUser = async (req, res) => {
  const user = await User.findOne({ email: req.query.email });
  console.log(user);
  if (!user) {
    res.status(500).json({ success: false });
    return;
  }
  res.send(user);
};

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

    //TODO: password ??????

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
  //console.log(req.body);

  const password = generator.generate({
    length: 10,
    numbers: true,
  });

  if (!mongoose.isValidObjectId(req.params.id)) {
    console.log("invalid object id");
    return res.status(400).send("Invalid user Id");
  }

  var hashed_password = "";
  await bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      User.findByIdAndUpdate(
        req.params.id,
        {
          isAccepted: req.body.isAccepted,
          password: hash,
        },
        { new: true }
      )
        .exec()
        .then((user) => {
          if (!user) {
            console.log("Updating error");
            return res.status(404).send("the user cannot be update");
          } else {
            let mailOptions = {};
            if (req.body.isAccepted === "1") {
              if (req.body.role === "wallet_owner") {
                mailOptions = {
                  from: "personverificationdigitalplatform1@hotmail.com",
                  to: req.body.email,
                  subject:
                    "Temporary Password For Person Verification Digital Platform",
                  text: "Password: " + password,
                };
              } else {
                mailOptions = {
                  from: "personverificationdigitalplatform1@hotmail.com",
                  to: req.body.email,
                  subject:
                    "Temporary Password For Person Verification Digital Platform",
                  text: "Password: " + password,
                };
                //TODO: QR Code
              }

              //console.log(password);
            } else {
              mailOptions = {
                from: "personverificationdigitalplatform1@hotmail.com",
                to: req.body.email,
                subject:
                  "Request Rejection For Person Verification Digital Platform",
                text: "Your registration request has been rejected",
              };
            }
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
                throw err;
              } else {
                console.log("Email sent: " + info.response);
                return resolve("Email Sent");
              }
            });
            res.send({ user: user, success: true });
          }
        });
    });
  });
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
  updatePassword,
  updateServices,
  getUser,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  getPendingWalletUsers,
  getPendingBanks,
};
