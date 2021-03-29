
var admin = []
var currentUser = null
const dialog = new mdc.dialog.MDCDialog(document.querySelector('.mdc-dialog'));
const dataTable = new mdc.dataTable.MDCDataTable(document.querySelector('.mdc-data-table'));


$(document).ready(function() {
    const textFields = [].map.call(document.querySelectorAll('.mdc-text-field'), function(el) {
        return new mdc.textField.MDCTextField(el);
    });



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
    let endpoint = 'http://localhost:3000/adminItem'  
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
            for (index = 0; index < cartItem.length; index++) {
                let item = adminItem[index]
                admin.push(

                    new Coffee(
                        item._id,
                        item.name,
                        item.des,
                        item.price,
                        item.imgUrl
                        
                        
                    )
                )
                onUpdateUIAtPos(index)
            }

            updateCartTotals()
            console.log("result:" + JSON.stringify(adminItem))
            setOnItemDeleteListener()
            if(adminItem.length == 0) {
                $('#dvTotals').hide()
            }
        }
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
