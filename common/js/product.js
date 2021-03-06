$(document).ready(function () {
    console.log('running');
    addNewCoffee("Caffein Crazy", "Aroma with 6 shots of dark coffee", 120,"");
})

function addNewCoffee(name, des, price, imgSrc) {
    $('#coffeeContainer')
        .append (
            `<div class="col-4">
                <img src="https://images.unsplash.com/photo-1522992319-0365e5f11656?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80">
                <h4> ${name}</h4>
                <p>${des}</p>
                <p>${price} Baht</p>
                <a href="#" class="btn"> Buy </a>
            </div>`
        );
}