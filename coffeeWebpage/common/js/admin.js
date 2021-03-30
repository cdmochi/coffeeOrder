var admin = []
var currentUser = null
const dialog = new mdc.dialog.MDCDialog(document.querySelector('.mdc-dialog'));
const dataTable = new mdc.dataTable.MDCDataTable(document.querySelector('.mdc-data-table'));



$(document).ready(function() {
    initFirebase()
    const textFields = [].map.call(document.querySelectorAll('.mdc-text-field'), function(el) {
        return new mdc.textField.MDCTextField(el);
    });

    onLoadCart()

    $('#btAdd').click(() => {
        if(currentUser == null) {
            dialog.open()
        } 
    })


    dialog.listen('MDCDialog:opened', () => {
        console.log("dialog opened")
        

    });

    dialog.listen('MDCDialog:closing', function() {
        console.log("dialog close")
    });

})


function addProduct() {
    console.log('dddddddddddddddddddddd')
}





function onLoadCart() {
    let endpoint = 'http://localhost:3000/coffees'  
    $.ajax({
        type: 'GET',
        url: endpoint,
        contentType: 'application/json',
        dataType: 'json',
        success: function (result) {
            console.log('api requested successfully: ' + result.statusCode);
            let adminItem = result.data
            console.log("before" + JSON.stringify(adminItem))
            var index;
            for (index = 0; index < adminItem.length; index++) {
                let item = adminItem[index]
                admin.push(
                    new Coffee(
                        item._id,
                        item.name,
                        item.des,
                        item.price,
                        item.imgURL
                    )
                )
                addNewCoffeeItem(admin[index])
            }
        }
    });
}

function onDeleteCoffeeRow(id) {
    console.log(id)
    let endpoint = `http://localhost:3000/coffees/delete/${id}`
    $.ajax({
        url: endpoint,
        type: 'DELETE',
        success: function(result) {
            console.log("deleted:" + JSON.stringify(result))
            location.reload()
        }
    })
}

function onEditCoffeeRow() {
    console.log("editing")
    $('#imgPickBt').click(function() {
    })
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

async function imgPick() {
    console.log('image picking')
    var metadata = {
        contentType: 'image/jpeg'
    };
    $('#file-input').trigger('click');
    var myFile = $('#file-input').prop('files');
    var ref = firebase.storage().ref();
    await ref.child(`latte-shit.jpg`).put(myFile, metadata).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    });

}

function addNewCoffeeItem(coffeeItem) {
    let data = coffeeItem.id
    console.log(JSON.stringify(coffeeItem))
    $('#container-admin')
        .append(
            `<tr class="mdc-data-table__row">

                <th class="mdc-data-table__cell" scope="row">${coffeeItem.name}</th>
                <td class="mdc-data-table__cell" scope="row">${coffeeItem.description}</br> </td>
                <th class="mdc-data-table__cell" scope="row">${coffeeItem.price}</th>
                <!---td class="mdc-data-table__cell mdc-data-table__cell--numeric">70</td--->

                <td class="mdc-data-table__cell"><img src=${coffeeItem.imgURL} width = "55px" > </td>

                    <td><div class="mdc-dialog__actions">
                        <button type="button-delete" class="mdc-button mdc-dialog__button" 
                        onclick="onDeleteCoffeeRow('${coffeeItem.id.replace(/\'/g, '"') } ')">
                            <div class="mdc-button__ripple"></div>
                            <span class="mdc-button__label"scope="row">Delete</span>

                            </button>

                            </td>

                            <td><div class="mdc-dialog__actions">
                                <button type="button-delete" class="mdc-button mdc-dialog__button" id = "onEditBt" onclick="onEditCoffeeRow()">
                                    <div class="mdc-button__ripple"></div>
                                    <span class="mdc-button__label"scope="row">Edit</span>
                                </button>

                            </td>

                            </tr>`);
                                }



                                function onUpdateUI() {
                                    coffees.forEach(function (item) {
                                        addNewCoffeeItem(item);
                                    });
                                }


                                function onAdd() {
                                    console.log(`Product Name is ${tvproduct.val()}`)
                                    console.log(`password is ${tvdes.val()}`)
                                    console.log(`password is ${tvprice.val()}`)
                                    console.log(`password is ${tvimage.val()}`)

                                    let uproducr = tvproduct.val()
                                    let udes = tvdes.val()
                                    let uPrice = tvprice.val()
                                    let uimg = tvimage.val()

                                }



                                function onLogout() {
                                    dialog.close() 


                                }

                                function onUpdateUIAtPos(position) {
                                    let adminItem = admin[position]
                                    updateCartUI(adminItem)
                                }

                                //Models
                                class Coffee {
                                    constructor(id, name, description, price, imgURL) {
                                        this.id = id;
                                        this.name = name;
                                        this.description = description;
                                        this.price = price;
                                        this.imgURL = imgURL;
                                    }
                                };
