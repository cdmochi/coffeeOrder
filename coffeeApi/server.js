const express = require('express')
const mongoose = require('mongoose')
const app = express()
let port = 3000

//const db = mongoose.connection
//db.on('error', (error) => console.error(error))
//db.once('open', () => console.log('connected to database') )

var data = require('./model/coffees')

//if request empty received then send 'hello World"
app.get('/', (req,res) => {
    res.send('Hello World')
})

app.get('/coffees', (req, res) => {
    res.json(data.findAll())
})

app.get('/coffees/:id', (req,res) => {
    var id = req.params.id
    res.json(data.findById(id))
})

app.post('/coffees', (req, res) => {
    const payload = req.body
    res.json(payload)
})

app.listen(port, () => {
    console.log('เซิฟเปิดแล้วจ้าาา เร่เข้ามา')
})

