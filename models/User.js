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
       quantity: { type: Number, default: 1 },
        firmName:String }] ,
       

    wishlist: [{ productId: { type: Schema.Types.ObjectId,
       ref: 'Product' }}],
       
    order: [{
      items: [{
        
         productName: { type: String, required: true }, 
         quantity: { type: Number, required: true },
          price: { type: Number, required: true } 
    }],
       total: Number,
       date: { type: Date, default: Date.now },
     }],

      
      
})
const User= mongoose.model('user',userSchema);
module.exports=User;