const express = require('express');
const {requireSignin,userMiddleware} = require('../command-middleware');
const router = express.Router();
const { addItemToCart } = require('../controller/cart');
router.post('/user/cart/addtocart',requireSignin,userMiddleware,addItemToCart);

module.exports=router;