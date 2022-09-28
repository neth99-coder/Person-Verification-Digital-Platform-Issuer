const { Type } = require("../models/type");
const mongoose = require("mongoose");
const express = require("express");

const getTypes = async (req, res) => {
  const typeList = await Type.find();
  if (!typeList) {
    res.status(500).json({ success: false });
  }
  res.send(typeList);
};

const addType = async (req, res) => {
  const type = new Type({ name: req.body.name });
  type
    .save()
    .then((createdType) => {
      res.status(201).json(createdType);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
};

module.exports = {
  getTypes,
  addType,
};
