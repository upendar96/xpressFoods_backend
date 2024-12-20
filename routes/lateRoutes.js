const express = require('express');
const lateController = require("../controllers/lateController");

const router = express.Router();

router.post('/add-product/:firmId', lateController.addLate);
router.get('/:firmId/products',lateController.getLateByFirm);


router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.header('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});


router.delete('/:firmId', lateController.deleteLateById);

module.exports = router;