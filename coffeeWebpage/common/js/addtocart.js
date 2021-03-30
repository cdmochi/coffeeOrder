var cart = []
var currentUser = null

const dialog = new mdc.dialog.MDCDialog(document.querySelector('.mdc-dialog'));
const emailTv = $('#tvEmail')
const passwordTv = $('#tvPassword')

$(document).ready(function(){
    const textFields = [].map.call(document.querySelectorAll('.mdc-text-field'), function(el) {
        return new mdc.textField.MDCTextField(el);
    });
    initFirebase()
    onLoadCart()


    $('#btCheckout').click(() => {
        if(currentUser == null) {
            dialog.open()
        } 
    })

    //listening for dialog open
    dialog.listen('MDCDialog:opened', () => {
        console.log("dialog opened")
    });

    dialog.listen('MDCDialog:closing', function() {
        console.log("dialog close")
    });
})


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
                        item.amount,
                        item.userId
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




function onLogin() {
    console.log(`email is ${emailTv.val()}`)
    console.log(`password is ${passwordTv.val()}`)
    let uEmail = emailTv.val()
    let uPass = passwordTv.val()
    if(uEmail && uPass) {
        firebase.auth().signInWithEmailAndPassword(uEmail, uPass)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                console.log(`login user: ${JSON.stringify(user)}`)
                console.log('USER:login with id ' + user.uid)
                currentUser = { userId: user.uid }
                console.log('USER:login with id ' + JSON.stringify(currentUser))
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    }
}

function onLogout() {
    dialog.close() 


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
        totalPrice+= (item.price * item.amount)
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

function initFirebase() {
    var firebaseConfig = {
        apiKey: "AIzaSyCE2-mRjHHuoBXuorKp9ObOgn28V9ObXTE",
        authDomain: "fir-example-db91b.firebaseapp.com",
        databaseURL: "https://fir-example-db91b.firebaseio.com",
        projectId: "fir-example-db91b",
        storageBucket: "fir-example-db91b.appspot.com",
        messagingSenderId: "74233054384",
        appId: "1:74233054384:web:f395be37217b03d4162775",
        measurementId: "G-R7M8ML9S4Q"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
}

//Models
class CheckoutCoffee {
    constructor(id, name, des,price,imgSrc ,amount,userId) {
        this.id = id;
        this.name = name;
        this.des = des;
        this.price = price;
        this.imgSrc = imgSrc;
        this.amount = amount;
        this.userId = userId
    }
};
