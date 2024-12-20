const Order = require('../models/Order');
const User = require('../models/User');
const Firm = require('../models/Firm');
const mongoose = require('mongoose');

exports.addOrder = async (req, res) => {
    const { userId, items, total } = req.body;
    const {firmId}=req.params.firmId;
   
   
    try {
        const newOrder = new Order({
            userId,
            firmId:new mongoose.Types.ObjectId(firmId),
            items,
            total
        });
        const savedOrder = await newOrder.save();
       
        res.status(201).json(savedOrder);
    
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error)
    }
}


exports.getOrder = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (user) {
            const orders = await Order.find({ userId }); // Ensure it filters by userId
            res.status(200).json(orders);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error)
    }
}

exports.currentVendor = async (req, res) => {
    try {
        const { firmId } = req.params.firmId;
        const orders = await Order.find({ firmId:firmId} );
        res.status(200).json(orders);
        console.log(orders)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders' });
        console.log(error)
    }
}

exports.allVendor = async (req, res) => {
    try {
        const { firmId } = req.params;
        const orders = await Order.find({ firmId });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch order history' });
    }
}
