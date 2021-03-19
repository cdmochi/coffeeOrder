const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
let PORT = 3000

//MongoDB
const dbBucket = "mongodb+srv://pete:peterparker@chuanprojectcluster.07gng.mongodb.net/coffeeDB?retryWrites=true&w=majority"

const mongoose = require('mongoose')
mongoose.connect(dbBucket, { useUnifiedTopology: true, useNewUrlParser: true })

//Middlewares
var coffeeRouter = require('./routes/coffees')
var cartItemRouter = require('./routes/cartItems')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use('/coffees', coffeeRouter)
app.use('/cartItems', cartItemRouter)

app.get('/', (req,res) => {
    res.send('Database Connected Successfully at port ' + PORT)
})

app.listen(PORT, () => {
    console.log('server is listening at http://localhost:3000/')
})

