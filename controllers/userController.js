const { request } = require("express");
const userModel = require("../models/Users");
const {validationResult} = require('express-validator');
const { findById, findByIdAndUpdate } = require("../models/Users");
const jwt = require("jsonwebtoken");


//Signup
exports.signup =  (req, res) => {
 const errors = validationResult(req)
 if(!errors.isEmpty()) {
   return res.status(400).json({
      error: errors.array()[0].msg
   })
 }
 const user = new userModel(req.body)
 user.save((err, user) =>{
   if(err) {
      return res.status(400).json({
         error: "Unable to add user"
      })
   }
   return res.json({
      message: "Success",
      user
   })
 })
}

//Update Profile
exports.updateProfile = (req, res) => {
   findByIdAndUpdate(req.params.id, {
      $set: {userFullName: req.body.userFullName, userEmail: req.body.userEmail, password: req.body.password}
   },
   {
      new: true
   },
   function(err, updatedProfile) {
      if (err) {
         res.send("Error updating profile");
      } else {
         res.json(updatedProfile);
      }
   }
   )
};

//Login
exports.login = (req, res) => {
   const {email, password} = req.body
   userModel.findOne({email}, (err, user) => {
      if (err || !user) {
         return res.status(400).json({
            error: "User was not found"
         })
      } 

      //Authenticate user
      if(!user.authenticate(password)) {
         return res.status(401).json({
            error: "Email and password do not match !"
         })
      }

      //Create a token
      const x = process.env.SECRET;
      const token = jwt.sign({_id: user._id}, process.env.SECRET)

      //Put token into cookie
      res.cookie('token', token, {expire: new Date() + 1})

      //Send response to frontend
      const {_id, name, email} = user
      return res.json({
         token,
         user: {
            _id,
            name,
            email
         }
      })
   })
}

//Logout

exports.logout = (req, res) => {
   res.clearCookie("token")
   res.json({
      message: "User logout successful"
   })
}


exports.verifyToken = (req, res, next) => {
   try {
      if (!req.headers.authorization) {
         return res.status(401).send("Unauthorized request");
       }
       let token = req.headers.authorization.split(" ")[1];
       if (token === "null") {
         return res.status(401).send("Unauthorized request");
       }
       let payload = jwt.verify(token, process.env.SECRET);
       if (!payload) {
         return res.status(401).send("Unauthorized request");
       }
       req.userId = payload._id;
       res.status(200).send("Authorized");
   } catch (err) {
      res.status(401).send("Unauthorized!")
   }
 }
