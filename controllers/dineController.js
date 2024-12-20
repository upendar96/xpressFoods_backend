const Dine = require('../models/Dine');
const Vendor = require('../models/Vendor');
const multer = require('multer');
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

const addDine = async(req, res) => {
    try {
        const { dineName, dinearea, dinecategory, dineregion, dineoffer } = req.body;

        const dineimage = req.file ? req.file.filename : undefined;

        const vendor = await Vendor.findById(req.vendorId);
        if (!vendor) {
            res.status(404).json({ message: "Vendor not found" })
        }

        

        const dine = new Dine({
            dineName,
            dinearea,
            dinecategory,
            dineregion,
            dineoffer,
            dineimage,
            vendor: vendor._id
        })

        const savedDine = await dine.save();

        const dineId = savedDine._id
        const vendorDineName = savedDine.dineName

        vendor.dine.push(savedDine)

        await vendor.save()



        return res.status(200).json({ message: 'Firm Added successfully ', dineId, vendorDineName });


    } catch (error) {
        console.error(error)
        res.status(500).json("intenal server error")
    }
}

const deleteDineById = async(req, res) => {
    try {
        const dineId = req.params.firmId;

        const deletedProduct = await Dine.findByIdAndDelete(dineId);

        if (!deletedProduct) {
            return res.status(404).json({ error: "No product found" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = { addDine: [upload.single('image'), addDine], deleteDineById }