const mongoose = require('mongoose');

// CUSTOMER SCHEMA
const CustomerSchema = mongoose.Schema({
    date : {
        type : Date,
        default : Date.now
    },
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('customers',CustomerSchema);
