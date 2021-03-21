var cart = []
$(document).ready( 
    function(){
        onLoadCart()
            
    }
)

function onLoadCart() {
    let endpoint = 'http://localhost:3000/cartItems'  
    $.ajax({
        type: 'GET',
        url: endpoint,
        contentType: 'application/json',
        dataType: 'json',
        success: function (result) {
            console.log('api requested successfully: ' + result.statusCode);
            let cartItem = result.data
            console.log("before" + JSON.stringify(cartItem))
            var index;
            for (index = 0; index < cartItem.length; index++) {
                let item = cartItem[index]
                cart.push(
                    new CheckoutCoffee(
                        item._id,
                        item.name,
                        item.des,
                        item.price,
                        item.imgUrl,
                        item.amount
                    )
                )
                onUpdateUIAtPos(index)
            }
            updateCartTotals()
            console.log("result:" + JSON.stringify(cart))
            setOnItemDeleteListener()
            if(cart.length == 0) {
                $('#dvTotals').hide()
            }
        }
    });
}

function setOnItemDeleteListener() {
    $(".onButtonClick").click(function() {
        var buttonId = $(this).attr('id')
        let endpoint = `http://localhost:3000/cartItems/delete/${buttonId}`
        $.ajax({
            url: endpoint,
            type: 'DELETE',
            success: function(result) {
                console.log("deleted:" + JSON.stringify(result))
            }

        })

    })
}

function onUpdateUIAtPos(position) {
    let cartItem = cart[position]
    updateCartUI(cartItem)
}

function updateCartTotals() {
    var totalItem = 0
    var totalPrice = 0
    for(i = 0; i < cart.length; i++) {
        let item = cart[i]
        totalItem++
        totalPrice +=   (item.price * item.amount)
    }
    $('#tdTotalItem').text(totalItem.toString() + " Item")
    $('#tdTotalPrice').text(totalPrice.toString() + " Bath")
}

function updateCartUI(itemcart) {
    console.log("imgSrc is " + itemcart.imgSrc)
    console.log(itemcart.amount)
    $('#first-coffee')
        .append(
            `<tr> <!--Table row-->
                <td> <!--Table data-->
                    <div class="cart-info">
                        <img src= ${itemcart.imgSrc} >
                        <div>
                            <p> ${itemcart.name}</p>
                            <small>Price: ${itemcart.price} Baht </small>
                            <br>
                            <a id=${itemcart.id} class="onButtonClick" href=""> Remove</a>
                        </div>
                    </div>

                </td>
                <td><input type="number" value="${itemcart.amount}" readonly></td>
                <td>${itemcart.amount * itemcart.price} Baht</td>
            </tr>`
        )
}

//Models
class CheckoutCoffee {
    constructor(id, name, des,price,imgSrc ,amount) {
        this.id = id;
        this.name = name;
        this.des = des;
        this.price = price;
        this.imgSrc = imgSrc;
        this.amount = amount;
    }
};
