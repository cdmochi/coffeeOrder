const express = require('express')
const app = express()
const router = express.Router()
const mongoose = require('mongoose')
const Coffee = require('../model/Coffee')

router.get('/',async (req, res) => {
    const result = await Coffee.find()
    res.json(result)
})

router.get('/:id',(req, res) => {
    //get param
    const { id } = req.params
    const result = coffees.find( item => item.coffees.id == id)
    res.json(result)
})

router.post('/', async (req, res) => {
    const payload = req.body
    const coffee = new Coffee(payload)
    await coffee.save()
    res.status(201).end()
})

module.exports = router
