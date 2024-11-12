const Order=require('../models/Order');
const User=require('../models/User');
const mongoose = require('mongoose');


exports. addOrder=async(req,res)=>{
    const { userId, items, total } = req.body; 
    try { const newOrder = new Order(
        {
         userId,
         items,
          total
         }
        ); 
    const savedOrder = await newOrder.save(); 
    res.status(201).json(savedOrder); 
} 
catch (error) 
{
     res.status(400).json({ error: error.message }); 
    } 
}

exports.getOrder = async (req, res) => {
     const { userId } = req.params;
      try { 
        // Convert userId to ObjectId 
        const user = await User.findById(new mongoose.Types.ObjectId(userId))
         if (user)
             { 
                const orders=await Order.find();
                res.status(200).json(orders);
                         console.log(orders)
                        } } catch (error) {
                             console.error(error); res.status(400).json({ error: error.message }); }
}