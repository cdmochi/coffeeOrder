
var coffees = [];

//document ready
$(document).ready(function () {
    console.log('running');
    //request coffeesList
    onLoadCoffees();
    onUpdateUI();
});

function onLoadCoffees() {

    let endpoint = 'http://localhost:3000/coffees'
    $.ajax({
        type: 'GET',
        url: endpoint,
        contentType: 'application/json',
        dataType: 'json',
        success: function(result) {
            console.log('api requested successfully: ' + result.statusCode);
            let coffeeItem = result.data
            console.log(coffeeItem.length)
            var index;
            for (index = 0; index < coffeeItem.length; index++) {
                let item = coffeeItem[index]
                console.log(item.name +":"+ item.name)
                coffees.push(
                    new Coffee(
                        item._id,
                        item.name,
                        item.des,
                        item.price,
                        item.imgURL
                    )
                )
                onUpdateUIAtPos(index);
            }
        }
    });
}

function onUpdateUIAtPos(position) {
    let coffeeItem = coffees[position]
    addNewCoffeeItem(coffeeItem)
}


function onUpdateUI() {
    coffees.forEach(function (item) {
        addNewCoffeeItem(item);
    });
}

function addNewCoffeeItem(coffeeItem) {
    $('#coffeeContainer')
        .append(
            `<div class="col-4">
                <div>
                <img src=${coffeeItem.imgSrc}>
                <h4> ${coffeeItem.name}</h4>
                <p>${coffeeItem.description}</p>
                <p>${coffeeItem.price} Baht</p>
                </div>  
                <a href="#" class="btn" id=${coffeeItem.id}> Buy </a>

            </div>`
        );
}

//Models
class Coffee {
    constructor(id, name, description, price, imgSrc) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.imgSrc = imgSrc;
    }
};
