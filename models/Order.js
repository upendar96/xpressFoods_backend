
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  firmId: { type: mongoose.Schema.Types.ObjectId, ref: 'Firm' },
  items: [
    {
      productName: String,
      quantity: Number,
      price: Number
    }
  ],
  total: Number,
  orderStatus: { type: String, default: 'Pending' },
  date: { type: Date, default: Date.now },


  
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
