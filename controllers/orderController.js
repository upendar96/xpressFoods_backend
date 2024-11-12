const Order=require('../models/Order');
const User=require('../models/User');


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

exports.getOrder=async(req,res)=>{
    const {userId}=req.params.userId;
    try {
        const user=await User.findById(userId).populate('order')
        res.status(201).json(user); 
        console.log(user);
    } catch (error) {
        console.log(error)
    }
}