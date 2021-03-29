
const dialog = new mdc.dialog.MDCDialog(document.querySelector('.mdc-dialog'));
const dataTable = new mdc.dataTable.MDCDataTable(document.querySelector('.mdc-data-table'));


$(document).ready(function() {
    const textFields = [].map.call(document.querySelectorAll('.mdc-text-field'), function(el) {
        return new mdc.textField.MDCTextField(el);
    });

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
