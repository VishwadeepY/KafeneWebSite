
const logout = () => {
    localStorage.clear();
    window.location.href = './index.html';
}

$(document).ready(() => {

$.get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products", (productData) => {


const checkLogin = () => {
    if(!localStorage.getItem('login')) {
        window.location.href = "./index.html";
    }
}

class ProductCards {

    constructor(filterProductData) {
        this.idnum = filterProductData.id;
        this.productName = filterProductData.medicineName;
        this.productBrand = filterProductData.medicineBrand;
        this.expiryDate = filterProductData.expiryDate;
        this.unitPrice = filterProductData.unitPrice;
        this.stock = filterProductData.stock;
    }
    printProductCards() {
        return (`<tr>
        <td class="light"> ${this.idnum} </td>
        <td> ${this.productName} </td>
        <td class="light"> ${this.productBrand} </td>
        <td> ${this.expiryDate} </td>
        <td class="light">$${this.unitPrice}</td>
        <td class="light">${this.stock}</td>
    </tr>`)
    }
}

let allContent = productData;
let filteredContent = [];


const filterContent = () => {
    
    const expired = $('#expired').prop('checked');
    const lowStock = $('#low-stock').prop('checked');

    filteredContent = [];

    if(allContent.length > 0) {
        filteredContent = allContent.filter((ProductCards) => {
            if(expired) return (new Date() > new Date(ProductCards.expiryDate));
            return true;
        });
        filteredContent = filteredContent.filter((ProductCards) => {
            if(lowStock) return (ProductCards.stock < 100);
            return true;
        });

        renderUI(filteredContent);
    }


}

const renderUI = (args) => {
    $('#cards').html(" ");
    $('#count').html(args.length)
    let generateProductCard = [];
    let htmlstr = " ";

    if(args.length > 0) {
        for (let i = 0; i < args.length; i++) {
    
            generateProductCard [i] = new ProductCards(args[i]);
            htmlstr += generateProductCard[i].printProductCards();
        
        }
    $("#cards").html(htmlstr);
    }
}

checkLogin();

filterContent();

$('.checkBox').change(filterContent);

});

});