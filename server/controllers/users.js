const { User } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const transporter = require("../helpers/transporter");
var generator = require("generate-password");
const bcrypt = require("bcrypt");
const { has } = require("config");
const cloudinary = require("../helpers/cloudinary");

const updatePassword = async (req, res) => {
  //console.log(req.body);
  const user = await User.findOne({ email: req.body.email });
  console.log(user);
  if (!user) {
    res.status(500).json({ success: false });
    return;
  } else {
    bcrypt.compare(req.body.oldPassword, user.password, function (err, result) {
      if (err) {
        res.status(500).json({ success: false });
      }
      if (!result) {
        res.send({ success: false, message: "passwords do not match" });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.newPassword, salt, (err, hash) => {
            if (err) {
              res.status(500).json({ success: false });
            } else {
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
  const user = User.findOneAndUpdate(
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

const addUser = async (req, res,next) => {
  const doesExist = await User.findOne({ email: req.body.email });
  let result_bc = null;
  let result_cc = null;
  let result_nic = null;
  let result_pp = null;
  console.log("b4exist")
  if (!doesExist) {
    console.log("inside exist")
    const nic = req.body.nic_photo_id;
    const bc = req.body.bc_photo_id;
    const cc = req.body.cc_photo_id;
    const pp = req.body.photo_id;
    console.log("after get photo")
  //console.log(pp)

    // const nic_type = nic != null ? nic.mimetype.split("/")[1] : "";
    // const bc_type = bc != null ? bc.mimetype.split("/")[1] : "";
    // const cc_type = cc != null ? cc.mimetype.split("/")[1] : "";
    // const pp_type = pp != null ? pp.mimetype.split("/")[1] : "";

    const addedServices = [];
    req.body.account == "true" && addedServices.push("Bank Account Creation");
    req.body.loan == "true" && addedServices.push("Bank Loan Services");
    req.body.card == "true" && addedServices.push("Credit Card Services");  
    console.log("after services")
    if (nic != null) {
      console.log("Not here")
      try{
        result_nic = await cloudinary.uploader.upload(nic, {folder:"dwallet"})
      }catch(err){
        console.log(err)
        return res.status(201).json({
          error: "ERROR CLOUD", 
          success: false,
        });
      }
   
    
    }

    if (bc != null) {
      try{
        result_bc = await cloudinary.uploader.upload(bc, {folder:"dwallet"})
      }catch(err){
        console.log(err)
        return res.status(201).json({
          error: "ERROR CLOUD", 
          success: false,
        });
      }
      
    }

    if (cc != null) {
      console.log("cc")
      try{
        result_cc = await cloudinary.uploader.upload(cc, {folder:"dwallet"})
      }
      catch (err){
        console.log(err)
        return res.status(201).json({
          error: "ERROR CLOUD", 
          success: false,
        });
      }
    }
 
  
      if (pp != null) {
        try{
          result_pp = await cloudinary.uploader.upload(pp, {folder:"dwallet"})
        }catch(err){
          console.log(err)
        return res.status(201).json({
          man_error: "ERROR CLOUD", 
          success: false,
        });
        }
       
      }
    
    //console.log(result_bc, result_cc, result_pp)
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
        photo_id: {public_id: result_pp.public_id, url: result_pp.url},
        nic_photo_id: {public_id: result_nic.public_id, url: result_nic.url},
        bc_photo_id:  {public_id: result_bc.public_id, url: result_bc.url},
        email: req.body.email,
        // password: req.body.password,
        address: req.body.address,
        contact_number: req.body.contact_number,
        role: req.body.role,
        isAccepted: req.body.isAccepted,
        gender:req.body.gender,
      });
    } else {
      user = new User({
        email: req.body.email,
        // password: req.body.password,
        address: req.body.address,
        contact_number: req.body.contact_number,
        role: req.body.role,
        isAccepted: req.body.isAccepted,
        photo_id: {public_id: result_pp.public_id, url: result_pp.url},
        cc_photo_id: {public_id: result_cc.public_id, url: result_cc.url},
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
                  from: process.env.TRANSPORTER_USERNAME,
                  to: req.body.email,
                  subject:
                    "Temporary Password For Person Verification Digital Platform",
                  text: "Password: " + password,
                };
              } else {
                mailOptions = {
                  from: process.env.TRANSPORTER_USERNAME,
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
                from: process.env.TRANSPORTER_USERNAME,
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

const checkPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(500).json({ success: false });
    return;
  } else {
    bcrypt.compare(req.body.password, user.password, function (err, result) {
      if (err) {
        res.status(500).json({ success: false });
      }
      if (!result) {
        res.send({ success: false, message: "passwords do not match" });
      } else {
        res.send({ success: true });
      }
    });
  }
};

const addVerifierDid = (req, res) => {
  console.log(req.body);
  const user = User.findOneAndUpdate(
    { email: req.body.email },
    { public_key: req.body.public_key },
    function (err, doc) {
      if (err) return res.send(500, { error: err });
      return res.send("Succesfully added verifier DID.");
    }
  );
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
  checkPassword,
  addVerifierDid,
};
 