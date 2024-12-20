const express = require('express');
const { addOrder, getOrder, currentVendor, allVendor } = require('../controllers/orderController');
const router = express.Router();

router.post('/add/:firmId',addOrder);
router.get('/:userId',getOrder);
router.get('/current/:firmId',currentVendor);
router.get('/firmId',allVendor);

module.exports = router;