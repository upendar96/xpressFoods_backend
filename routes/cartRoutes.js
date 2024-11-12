const express = require('express');
const { addToCart, getUserCart, deleteCartById } = require('../controllers/cartController');
const router = express.Router();

router.post('/add', addToCart);
router.get('/:userId', getUserCart);
router.delete('/:productId',deleteCartById);


module.exports = router;