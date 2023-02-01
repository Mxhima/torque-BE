const mongoose = require('mongoose');

const CarSchema = mongoose.Schema({
  CarID: {
    type: Number,
    require: true,
    unique: true,
  },
  CarBrand: {
    type: String,
    require: true,
  },
  CarModel: {
    type: String,
    require: true,
  },
  CarYear: {
    type: String,
    require: true,
  },
  CarMileage: {
    type: Number,
    require: true,
  },
  CarCategory: {
    type: String,
    require: true,
  },
  CarSeats: {
    type: Number,
    require: true,
  }
});

const car = mongoose.model('car', CarSchema);
module.exports = car;
