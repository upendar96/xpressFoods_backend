const express = require('express');
const dineController = require('../controllers/dineController');
const verifyToken = require('../middlewares/verifyToken');


const router = express.Router()

router.post('/add-dine', verifyToken, dineController.addDine);

router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.header('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});

router.delete('/:dineId', dineController.deleteDineById);


module.exports = router;