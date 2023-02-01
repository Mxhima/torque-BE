const { request } = require("express");
const carModel = require("../models/Cars");

//Get all cars
exports.getAllCars =  (req, res) => {
 try {
  carModel.find({}, (err, result) => {
    res.status(200).json(result);
  });
 }
 catch (err) {
  res.status(400).json(err);
 }
}

//Add a car
exports.addCar =  (req, res) => {
  const car = new carModel({
    CarID: req.body.CarID,
    CarBrand: req.body.CarBrand,
    CarModel: req.body.CarModel,
    CarYear: req.body.CarYear,
    CarMileage: req.body.CarMileage,
    CarCategory: req.body.CarCategory,
    CarSeats: req.body.CarSeats,
  });

  car.save((err, car) => {
    if(err) {
        return res.status(400).json({message: err})
    }

    return res.status(200).json({ message: 'Car added successful!' });
})
 }
