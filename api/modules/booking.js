const mongoose = require('mongoose')

const bookingschema = new mongoose.Schema({
    checkin:String,
    checkout:String,
    numberofguest:String,
    name:String,
    email:String,
    phonenumber:Number,
    price:Number,
})

module.exports = mongoose.model('booking',bookingschema)