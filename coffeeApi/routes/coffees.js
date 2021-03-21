const express = require('express')
const app = express()
const router = express.Router()
const mongoose = require('mongoose')
const Coffee = require('../model/Coffee')

router.get('/',async (req,res) => {
    const result = await Coffee.find()
    res.json( {
        statusCode: 200,
        data: result 
    })
})

router.get('/:id',(req, res) => {
    //get param
    const { id } = req.params
    const result = coffees.find( item => item.coffees.id == id)
    res.json(result)
})

router.post('/', async (req, res) => {
    const payload = req.body
    const coffee = new Coffee({
        name: payload.name,
        des: payload.des,
        price: payload.price,
        imgURL: payload.imgURL
    })
    await coffee.save()
    res.status(201).send(coffee)
})

module.exports = router
