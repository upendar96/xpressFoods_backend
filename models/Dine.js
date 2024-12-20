const mongoose = require('mongoose');
const dineSchema = new mongoose.Schema({
    dineName: {
        type: String,
        required: true,
        unique: true
    },
    dinearea: {
        type: String,
     
    },
    dinecategory: {
        type: [{
            type: String,
            enum: ['veg', 'non-veg']
        }]
    },
    dineregion: {
        type: [{
            type: String,
            enum: ['south-indian', 'north-indian', 'chinese', 'bakery']
        }]
    },
    dineoffer: {
        type: String,

    },
    dineimage: {
        type: String
    },
    vendor: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor'
    }],
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
   
});

const Dine = mongoose.model('Dine', dineSchema);

module.exports = Dine