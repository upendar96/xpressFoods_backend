const ratingController = require('../controllers/ratingContoller');
const express = require('express');

const router = express.Router();

router.post('/:id/rate',ratingController.rating);



module.exports = router;