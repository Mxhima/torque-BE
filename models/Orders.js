const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema ({
  email: {
    type: String,
    require: true
  },
  location: {
    type: String,
    require: true,
  },
  
  pickupDate: {
    type: String,
    require: true,
  },
  pickupTime: {
    type: String,
    require: true,
  },
  returnDate: {
    type: String,
    require: true,
  },
  returnTime: {
    type: String,
    require: true,
  },
  carCategory: {
    type: Number,
    require: true,
  },
})
const order = mongoose.model('orders', OrderSchema);
module.exports = order;
