const mongoose = require('mongoose')

const placeschema = new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    title:String,
    address:String,
    photos:[String],
    description:String,
    perks:[String],
    extrainfo:String,
    checkin:String,
    checkout:String,
    maxguests:String,
    price:String,
})



module.exports = mongoose.model('places',placeschema)