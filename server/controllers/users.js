const {User} = require('../models/user');
const {Type} = require('../models/type');
const mongoose = require("mongoose");
const express = require('express');

const getUsers = async (req,res) => {
    const userList = await User.find();
    if(!userList){
        res.status(500).json({success: false})
    }
    res.send(userList);
}

const addUser = async (req,res) => {
    const user = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        type: req.body.type
    })

    user.save().then((createdUser => {
        res.status(201).json(createdUser)
    })).catch((err)=>{
        res.status(500).json({
            error: err,
            success: false
        })
    })
}

const updateUser = async (req,res) => {

    const type = await Type.findById(req.body.type);
    if(!type){
        return res.status(400).send('Invalid type')
    }

    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).send('Invalid user Id')
    }

    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            type: req.body.type
        },
        {new: true})
    if(!user){
        return res.status(404).send('the user cannot be update');
    }
    res.send(user);

}

const deleteUser = async (req,res)=>{
    User.findByIdAndRemove(req.params.id).then(user => {
        if(user){
            return res.status(200).json({
                success: true,
                message: 'the user was deleted'
            })
        }else{
            return res.status(404).json({
                success: false, message: "user not found"
            })
        }
    }).catch(err=>{
        return res.status(400).json({
            success: false, error: err
        })
    })
}

module.exports = {
    getUsers,
    addUser,
    updateUser,
    deleteUser
}


     