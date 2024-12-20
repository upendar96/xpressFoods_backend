const riderController = require('../controllers/riderController');
const express = require('express');

const router = express.Router();

router.post('/register',riderController.riderRegister);
router.post('/login', riderController.riderLogin);


module.exports = router;