var coffees = [];


//document ready
$(document).ready(function () {
    console.log('running');
    onLoadCoffees();
    // onUpdateUI();
});

function onLoadCoffees() {

    let endpoint = 'http://localhost:3000/coffees'
    $.ajax({
        type: 'GET',
        url: endpoint,
        contentType: 'application/json',
        dataType: 'json',
        success: function (result) {
            console.log('api requested successfully: ' + result.statusCode);
            let coffeeItem = result.data
            console.log(coffeeItem.length)
            var index;
            for (index = 0; index < coffeeItem.length; index++) {
                let item = coffeeItem[index]
                console.log(item.name + ":" + item.name)
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

            $(".onButtonClick").click(function () {
                var buttonId = $(this).attr('id')
                let coffeeModel = findCoffeeModelById(buttonId)
                //ยิง post ตรงนี้
                
                console.log(coffeeModel)

            })
        }
    });
}

var itemBox = null

function findCoffeeModelById(id) {
    var i
    for(i = 0; i < coffees.length; i++) {
        let item = coffees[i]
        let itemId = item.id
        console.log("this is id" + itemId)
        if (itemId == id) {
            return item
        }
    }
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
    let data = coffeeItem.id
    console.log("กูมีค่า่" + data)
    $('#coffeeContainer')
        .append(
            `<div class="col-4">
                <div>
                <img src=${coffeeItem.imgSrc}>
                <h4> ${coffeeItem.name}</h4>
                <p>${coffeeItem.description}</p>
                <p>${coffeeItem.price} Baht</p>
                </div>  
                <button href="#" class="btn onButtonClick" id=${coffeeItem.id}> Buy </button>
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
