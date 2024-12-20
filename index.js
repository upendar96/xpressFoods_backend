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
const riderRoutes=require('./routes/riderRoutes')
const dineRoutes=require('./routes/dineRoutes')
const lateRoutes=require('./routes/lateRoutes')
const ratingRoutes=require('./routes/ratingRoutes')
const cors = require('cors');



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
app.use('/rider',riderRoutes)
app.use('/dine',dineRoutes)
app.use('/late',lateRoutes)
app.use('/rating',ratingRoutes)


app.listen(PORT, () => {
    console.log(`server started and running at ${PORT}`);
});

