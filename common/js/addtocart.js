$(document).ready( 
    function(){
        
    }
)


cart=[]

function onLoadCart() {

    let endpoint = 'http://localhost:3000/#'
    $.ajax({
        type: 'GET',
        url: endpoint,
        contentType: 'application/json',
        dataType: 'json',
        success: function (result) {
            console.log('api requested successfully: ' + result.statusCode);
            let cartItem = result.data
            console.log(cartItem.length)
            var index;
            for (index = 0; index < cartItem.length; index++) {
                let item = cartItem[index]
                console.log(item.name + ":" + item.name)
                cart.push(
                    new CheckoutCoffee(

                        item.id,
                        item.name,
                        item.price,
                        item.img
                        
                    )
                )
                onUpdateUIAtPos(index);
            }

            $(".onButtonClick").click(function () {
                var buttonId = $(this).attr('id')
                let coffeeModel = findCoffeeModelById(buttonId)
                //ยิง post ตรงนี้
                
                console.log(coffeeModel)

            })
        }
    });
}






function updatecartui(Itemcart) {
    let data = Itemcart.id
    console.log("productList" + data)
    

    $('#first-coffee')
        .append(
            `<tr> <!--Table row-->
                <td> <!--Table data-->
                <div class="cart-info">
                <img src=${Itemcart.imgSrc}" >
                <div>
                <p>${Itemcart.name}</p>
                <small>${Itemcart.price} </small>
                <br>
                <a href="#"class="btn onButtonClick" id=${Itemcart.id}> Remove </a>           
            </div>
        </div>  
        </td>
                <td><input type ="number" value="1"</td>
                <td>150 Baht</td>                
        </tr>`
            
            
        );
}



//Models
class CheckoutCoffee {
    constructor(id, name, price, amount) {
        this.amount = amount;
        this.id = id;
        this.name = name;
        this.price = price;
    }
};
