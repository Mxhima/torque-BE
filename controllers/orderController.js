const { request } = require("express");
const orderModel = require("../models/Orders");

//Get all cars
exports.getAllOrders =  (req, res) => {
 try {
    orderModel.find({}, (err, result) => {
    res.status(200).json(result);
  });
 }
 catch (err) {
  res.status(400).json(err);
 }
}

//Get orders specific for an Email
exports.getOrdersByEmail =  (req, res) => {
    try {
       orderModel.find({email: req.body.email}, (err, result) => {
       res.status(200).json(result);
     });
    }
    catch (err) {
     res.status(400).json(err);
    }
   }
//Add a order
exports.addOrder=  (req, res) => {
  const car = new orderModel({
    email: req.body.email,
    location: req.body.location,
    pickupDate: req.body.pickupDate,
    pickupTime: req.body.pickupTime,
    returnDate: req.body.returnDate,
    returnTime: req.body.returnTime,
    CarCategory: req.body.CarCategory,
  });

  car.save((err, car) => {
    if(err) {
        return res.status(400).json({message: err})
    }

    return res.status(200).json({ message: 'Order added successful!' });
})
 }
