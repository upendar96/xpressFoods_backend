const mongoose = require('mongoose');

const riderSchema = new mongoose.Schema({
    ridername: {
        type: String,
        required: true
    },
    
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    PanNumber:{
        type:String,
        require:true
    },
    AadharNumber:{
        type:String,
        require:true
    },
    BankAccountNumber:{
        type:String,
        require:true
    },
    image: {
        type: String
    },
    DrivingLic:{
        type:String,
        require:true
    },
    RcNumber:{
        type:String,
        require:true
    },

});

const Rider = mongoose.model('Rider', riderSchema);

module.exports = Rider;