const Rider = require('../models/Rider');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotEnv = require('dotenv');
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
dotEnv.config();

const secretKey = process.env.WhatIsYourName2



const riderRegister = async(req, res) => {
    const { ridername, email, password,PanNumber,AadharNumber,BankAccountNumber,DrivingLic,RcNumber} = req.body;
    const image = req.file ? req.file.filename : undefined;
    try {
        const riderEmail = await Rider.findOne({ email });
        if (riderEmail) {
            return res.status(400).json("Email already taken");
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const rider = new Rider({
            ridername,
            email,
            password: hashedPassword,
            PanNumber,
            AadharNumber,
            BankAccountNumber,
            image,
            DrivingLic,
            RcNumber
        });
        await rider.save();

        res.status(201).json({ message: "rider registered successfully" });
        console.log('registered')

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }

}


const riderLogin = async(req, res) => {
    const { email, password } = req.body;
    try {
        const rider = await Rider.findOne({ email });
        if (!rider || !(await bcrypt.compare(password, rider.password))) {
            return res.status(401).json({ error: "Invalid username or password" })
        }
        const riderToken = jwt.sign({ riderId: rider._id }, secretKey, { expiresIn: "1h" })

        const riderId = rider._id;

        res.status(200).json({ success: "Login successful", riderToken, riderId })
        console.log(email, "this is token", riderToken);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }

}




module.exports = { riderRegister: [upload.single('image'), riderRegister], riderLogin }