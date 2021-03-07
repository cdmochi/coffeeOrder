
var coffees = [];

//document ready
$(document).ready(function () {
    console.log('running');
    coffees.push(
        new Coffee("asdlfkajsdlfksjd","Capuchino", "Pretty Good.", 100, "https://www.starbucks.co.th/stb-media/2021/02/2-8-Mobile-app-Bev-Iced-Salted-Caramel-Cloud-Macchiato-600x600.png")
    );


    coffees.push(
        new Coffee("MOCK", "KUY", "description", 1212, "https://www.starbucks.co.th/stb-media/2021/02/2-8-Mobile-app-Bev-Iced-Salted-Caramel-Cloud-Macchiato-600x600.png")
    );

    coffees.push(
        new Coffee("MOCK", "KUYRAIWAISAS", "description", 1212, "https://www.starbucks.co.th/stb-media/2021/02/2-8-Mobile-app-Bev-Iced-Salted-Caramel-Cloud-Macchiato-600x600.png")
    );


    coffees.push(
        new Coffee("MOCK", "กาแฟเย็น", "description", 5000000, "https://www.starbucks.co.th/stb-media/2021/02/2-8-Mobile-app-Bev-Iced-Salted-Caramel-Cloud-Macchiato-600x600.png")
    );

    coffees.push(
        new Coffee("MOCK", "กาแฟเย็น", "description", 5000000, "https://www.starbucks.co.th/stb-media/2021/02/2-8-Mobile-app-Bev-Iced-Salted-Caramel-Cloud-Macchiato-600x600.png")
    );

    console.log("it's runnging");

    onUpdateUI();
});

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
