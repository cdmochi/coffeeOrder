
var admin = []
var currentUser = null
const dialog = new mdc.dialog.MDCDialog(document.querySelector('.mdc-dialog'));
const dataTable = new mdc.dataTable.MDCDataTable(document.querySelector('.mdc-data-table'));


$(document).ready(function() {

   
    

    
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

    dialog.open()
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
                
            }

            
        }
    });
}


function addNewCoffeeItem(coffeeItem) {
    let data = coffeeItem.id
    $('#container-admin')
        .append(
            ` <tr class="mdc-data-table__row">

            <th class="mdc-data-table__cell" scope="row">Esspresso</th>
            <td class="mdc-data-table__cell" scope="row"> A perfectly brewed coffee with<br> exquisite balance, and aroma.</br> </td>
            <th class="mdc-data-table__cell" scope="row">70</th>
            <!---td class="mdc-data-table__cell mdc-data-table__cell--numeric">70</td--->
            
            <td class="mdc-data-table__cell"><img src="common/images/Espresso.png" width = "55px" > </td>

            <td><div class="mdc-dialog__actions">
                <button type="button-delete" class="mdc-button mdc-dialog__button" onclick="Delete()">
                    <div class="mdc-button__ripple"></div>
                    <span class="mdc-button__label"scope="row">Delete</span>

                    
                </button>
            
            </td>

            <td><div class="mdc-dialog__actions">
                <button type="button-delete" class="mdc-button mdc-dialog__button" onclick="Edit()">
                    <div class="mdc-button__ripple"></div>
                    <span class="mdc-button__label"scope="row">Edit</span>

                    
                </button>
            
            </td>
            
        </tr>
                
            `
        );
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


function setOnItemDeleteListener() {
    $(".button-delete").click(function() {
        var buttonId = $(this).attr('id')
        let endpoint = `http://localhost:3000/adminItem/delete/${buttonId}`
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
