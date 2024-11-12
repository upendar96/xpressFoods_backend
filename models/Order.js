
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [
    {
      productName: String,
      quantity: Number,
      price: Number
    }
  ],
  total: Number,
  date: { type: Date, default: Date.now },

  user:[{ userId:{
    type: mongoose.Schema.Types.ObjectId,
     ref: 'User'
}}]

  
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
