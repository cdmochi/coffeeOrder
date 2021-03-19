const express = require('express')
const CartItem = require('../model/CartItem')
const router = express.Router()

//CREATE READ UPDATE DELETE

//get all
router.get('/',async (req, res) => {
    let items = await CartItem.find()
    res.json({
        statusCode: 200,
        data: items
    })
})

//add item to cart
router.post('/', async (req, res) => {
    const payload = req.body
    console.log(`positing name ${payload.name}`)
    console.log(`positing des ${payload.des}`)
    console.log(`positing price ${payload.price}`)
    console.log(`positing imgURL ${payload.imgURL}`)
    const cartItem = new CartItem({
        name: payload.name,
        des: payload.des,
        price: payload.price,
        imgURL: payload.imgURL
    })
    await cartItem.save()
    res.status(201).send(cartItem)
})

//delete item from cart
router.delete('/delete/:id', async (req, res) => {
    let id = req.params.id
    console.log('Deleting Item as ID:' + id)
    var removeCallback = CartItem.findOneAndDelete({ _id: id}, res.body, function(err, data) {
        if(!err) {
            console.log("deleted")
            res.send({deleted: id })
        }
            
    })
        
})


//not finish
router.post('/update?:id', async (req, res) => {
    let id = req.params.id
    res.send(id)
    console.log("hehehehehe:" + id)
    //await CartItem.findByIdAndUpdate(id, { name: name },
        //function(err, docs) {
            //if(err) {
                //console.log(err)
            //} else {
                //console.log("Updated successful:",docs)
            //}
        //})
})

module.exports = router
