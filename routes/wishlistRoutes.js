const express = require('express');
const wishlistController  = require('../controllers/wishlistController');
const router = express.Router();

router.post('/add', wishlistController.addTowishlist);
router.get('/:userId', wishlistController.getUserwishlist);

module.exports = router;
