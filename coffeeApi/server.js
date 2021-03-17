//expressJS
const express = require('express')
const app = express()
let PORT = 3000

//MongoDB
const dbBucket = "mongodb+srv://pete:peterparker@chuanprojectcluster.07gng.mongodb.net/coffeeDB?retryWrites=true&w=majority"

const mongoose = require('mongoose')
mongoose.connect(dbBucket, { useUnifiedTopology: true, useNewUrlParser: true })
//const db = mongoose.connection
//db.on('error', (error) => console.error(error))
//db.once('open', () => console.log('connected to database') )


//Middlewares
//var data = require('./model/coffees')
var coffeeRouter = require('./routes/coffees')
app.use(express.json())
app.use('/coffees', coffeeRouter)

app.get('/', (req,res) => {
    res.send('Database Connected Successfully at port ' + PORT)
})

app.listen(PORT, () => {
    console.log('server is listening at http://localhost:3000/')
})

