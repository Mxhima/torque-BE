const express = require('express');
const { getAllOrders, addOrder, getOrdersByEmail } = require('../controllers/orderController');
const router = express.Router();

router.get('/all', getAllOrders);
router.get('/by-email', getOrdersByEmail);
router.post('/add', addOrder);

module.exports = router;
