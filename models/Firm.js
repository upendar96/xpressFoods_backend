const mongoose = require('mongoose');
const firmSchema = new mongoose.Schema({
    firmName: {
        type: String,
        required: true,
        unique: true
    },
    area: {
        type: String,
        required: true,
    },
    category: {
        type: [{
            type: String,
            enum: ['veg', 'non-veg']
        }]
    },
    region: {
        type: [{
            type: String,
            enum: ['south-indian', 'north-indian', 'chinese', 'bakery']
        }]
    },
    offer: {
        type: String,

    },
    image: {
        type: String
    },
    rating: { type: Number, default: 0 }, 
    numberOfRatings: { type: Number, default: 0},
    vendor: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor'
    }],
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    late: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Late'
    }],
    order: [{

        items: [{
          
           productName: { type: String, required: true }, 
           quantity: { type: Number, required: true },
            price: { type: Number, required: true } 
      }],
         total: Number,
         date: { type: Date, default: Date.now },
       }],
});

const Firm = mongoose.model('Firm', firmSchema);

module.exports = Firm