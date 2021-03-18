const express = require('express')
const CartItem = require('../model/CartItem')
const router = express.Router()

router.get('/',async (req, res) => {
    let items = await CartItem.find()
    res.json({
        statusCode: 200,
        data: items
    })
})

router.post('/', async (req, res) => {
    const payload = req.body
    const cartItem = new CartItem({
        name: payload.name,
        des: payload.des,
        price: payload.price,
        imgURL: payload.imgURL
    })
    await cartItem.save()
    res.status(201).send(cartItem)
})

router.delete('/delete?:id', async (req, res) => {
    let id = req.params.id
    console.log('Deleting Item as ID:' + id)
    await CartItem.findByIdAndDelete(id)
})

module.exports = router
