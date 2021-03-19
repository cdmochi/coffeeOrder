const mongoose = require('mongoose')

const cartItemSchema = mongoose.Schema({
    name: String,
    des: String,
    price: Number,
    imgUrl: String
})

module.exports = mongoose.model('CartItem', cartItemSchema)
