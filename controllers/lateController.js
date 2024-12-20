const Firm = require("../models/Firm");
const multer = require("multer");
const Late = require('../models/Late')
const path = require('path');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage: storage });

const addLate = async(req, res) => {
    try {
        const { productName, price, category, description } = req.body;
        const image = req.file ? req.file.filename : undefined;

        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);

        if (!firm) {
            return res.status(404).json({ error: "No firm found" });
        }

        const late = new Late({
            productName,
            price,
            category,
            description,
            image,
            firm: firm._id
        })

        const savedLate = await late.save();
        firm.late.push(savedLate);


        await firm.save()

        res.status(200).json(savedLate)

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }
}

const getLateByFirm = async(req, res) => {
    try {
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);

        if (!firm) {
            return res.status(404).json({ error: "No firm found" });
        }

        const restaurantName = firm.firmName;
        const late = await Late.find({ firm: firmId });

        res.status(200).json({ restaurantName, late });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }
}

const deleteLateById = async(req, res) => {
    try {
        const lateId = req.params.lateId;

        const deletedProduct = await Late.findByIdAndDelete(lateId);

        if (!deletedProduct) {
            return res.status(404).json({ error: "No product found" })
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }
}






  
module.exports = { addLate: [upload.single('image'), addLate], getLateByFirm, deleteLateById };