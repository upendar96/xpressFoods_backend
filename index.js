const express = require("express");
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const vendorRoutes = require('./routes/vendorRoutes');
const bodyParser = require('body-parser');
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes=require('./routes/userRoutes')
const cartRoutes=require('./routes/cartRoutes');
const wishlistRoutes=require('./routes/wishlistRoutes');
const orderRoutes=require('./routes/orderRoutes')
const cors = require('cors');
const twilio = require('twilio');


const app = express()

const PORT = process.env.PORT || 8000;

dotEnv.config();
app.use(cors())


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully!"))
    .catch((error) => console.log(error))

app.use(bodyParser.json());
app.use('/vendor', vendorRoutes);
app.use('/firm', firmRoutes)
app.use('/product', productRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/user',userRoutes);
app.use('/cart',cartRoutes);
app.use('/wishlist',wishlistRoutes);
app.use('/order',orderRoutes);

const accountSid = 'AC96c3eab776ec711c4d03fd2300bb13f3'; // Replace with your Twilio account SID
const authToken = '9e0dffa689009663cc0080c2cc8f5771'; // Replace with your Twilio auth token
const client = new twilio(accountSid, authToken);

let otpStore = {}; // Store OTPs in a simple object for now

app.post('/send-otp', (req, res) => {
    const { phoneNumber } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[phoneNumber] = otp;
    
    client.messages.create({
        body: `Your OTP is ${otp}`,
        to: phoneNumber,
        from: '7396152896', // Replace with your Twilio phone number
    })
    .then((message) => {
        res.json({ message: 'OTP sent successfully', sid: message.sid });
    })
    .catch((error) => {
        res.status(500).json({ message: 'Failed to send OTP', error: error.message });
    });
});

app.post('/verify-otp', (req, res) => {
    const { phoneNumber, otp } = req.body;
    if (otpStore[phoneNumber] === otp) {
        res.json({ message: 'OTP verified successfully' });
    } else {
        res.status(400).json({ message: 'Invalid OTP' });
    }
});


app.listen(PORT, () => {
    console.log(`server started and running at ${PORT}`);
});

