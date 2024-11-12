const express = require('express');
const { addOrder, getOrder } = require('../controllers/orderController');
const router = express.Router();

router.post('/add',addOrder);
router.get('/:userId',getOrder);


module.exports = router;