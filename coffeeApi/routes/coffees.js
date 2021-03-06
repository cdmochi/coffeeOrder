
const express = require('express')
const router = express.Router()

app.get('/coffees',(req, res) => {
    res.json(coffees)
})

app.get('/coffees/:id',(req, res) => {
    //get param
    const { id } = req.params
    const result = coffees.find( item => item.coffees.id == id)
    res.json(result)

})

router.exports


