const express = require('express');
const { signup, login, logout, verifyToken } = require('../controllers/userController');
const {check} = require('express-validator');
const router = express.Router();

//SignUp
router.post('/signup', [
   //check("userFullName", "Full name should at least be 3 characters").isLength({min: 3}),
   check("email", "Email should be valid").isEmail(),
   //check("Password", "Password should at least be 6 characters").isLength({min: 4}),
] ,signup)

//Login
router.post('/login', login);

router.get('/verifyToken', verifyToken);

// router.post('/login', [
//    //check("userEmail", "Email should be valid").isEmail(),
//    //check("Password", "Password should at least be 6 characters").isLength({min: 6}),
// ] ,login)

//Logout
router.get('/logout', logout)

//Update Profile
router.put('/updateProfile/:id')

module.exports = router;