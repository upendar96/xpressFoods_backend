const User=require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const dotEnv = require('dotenv');

dotEnv.config();

const secretKey = process.env.WhatIsYourName1

exports.userRegister=async(req,res)=>{
    const{username,phonenumber,email,address,password}=req.body;
     try {
        const userEmail=await User.find({email});

        if(!userEmail){
            res.status(400).json("user email exited");
        }
        const hashedPassword=await bcrypt.hash(password,10);

        const newUser=new User({
            username,
            phonenumber,
            email,
            address,
            password:hashedPassword
        })

        newUser.save();
        res.status(200).json("register sucessfull")
        console.log("user registered");
     } catch (error) {
        res.status(400).json("registration failed")
        console.log(error);
     }
    
}
exports. userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user ||!(await bcrypt.compare(password,user.password))) {
            return res.status(404).json({ message: 'User not found' });
        }
        const userToken = jwt.sign({ userId: user._id }, secretKey, { expiresIn: "1h" })

        const userId = user._id;
        const userName=user.username;
        const userEmail=user.email;
        const userPhone=user.phonenumber;
        const userAddress=user.address;
       
        res.status(200).json({ success: "Login successful", userToken, userId,userName,userEmail,userPhone,userAddress })
       console.log(userToken);
        
        console.log(userId,userName,userEmail,userPhone,userAddress);

        
        
    } catch (error) {
        console.error('Error during user login:', error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}
exports.userEdit=async(req,res)=>{
   
    try {
        const {username,email,phonenumber,address}=req.body;
        const userId=req.params.userId;

     const update = {}; 
     if (username !== undefined)
     update.username = username;
      if (phonenumber !== undefined)
             update.phonenumber =phonenumber
            if(email!==undefined)
                update.email=email
            if(address!==undefined)
                update.address=address
    
        const user=await User.findByIdAndUpdate(userId,update,{new:true});
        res.status(200).json(user);
        console.log(user)
    } catch (error) {
        console.log(error);
    }
}






