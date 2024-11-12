const mongoose=require("mongoose");
const Product = require("./Product");
const Schema = mongoose.Schema
const userSchema= new  mongoose.Schema({

    username:{
         type:String

    },
    phonenumber:{
        type:String
    },
    email:{
       type:String
    },
    password:{
       type:String
    },
    address:{
      type:String
    },
    cart: [{ productId: { type: Schema.Types.ObjectId, 
      ref: 'Product' },
       quantity: { type: Number, default: 1 } }],

    wishlist: [{ productId: { type: Schema.Types.ObjectId,
       ref: 'Product' }}],
       
    order: [{ orderId: { type: Schema.Types.ObjectId,
      ref: 'Order' }}],

      
      
})
const User= mongoose.model('user',userSchema);
module.exports=User;