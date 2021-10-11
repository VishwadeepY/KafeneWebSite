
const logout = () => {
    localStorage.clear();
    window.location.href = './index.html';
}

$(document).ready( () => {

$.get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders", (orderData) => {

const checkLogin = () => {
    if(!localStorage.getItem('login')) {
        window.location.href = "./index.html";
    }
}

class OrderCards {

    constructor(filterOrderData) {
        this.idnum = filterOrderData.id;
        this.customerName = filterOrderData.customerName;
        this.orderDate = filterOrderData.orderDate;
        this.amount = filterOrderData.amount;
        this.orderTime = filterOrderData.orderTime;
        this.orderStatus = filterOrderData.orderStatus;
    }

    printOrderCards() {
        return (`<tr>
        <td class="light"> ${this.idnum} </td>
        <td> ${this.customerName} </td>
        <td>${this.orderDate}<p class="light lightP">${this.orderTime}</p>
        </td>
        <td class="light">$${this.amount}</td>
        <td>${this.orderStatus}</td>
    </tr> `)
    }
}

let allContent = orderData;

let filteredContent = [];

const filterContent = () => {

    const newId = $('#new').prop('checked');
    const packedId = $('#packed').prop('checked');
    const intransitId = $('#intransit').prop('checked');
    const deliveredId = $('#delivered').prop('checked');
    filteredContent = [];

    if(allContent.length > 0) {
        filteredContent = allContent.filter((OrderCards) => {
            if (newId && OrderCards.orderStatus === 'New') return true
            if (packedId && OrderCards.orderStatus === 'Packed') return true
            if (deliveredId && OrderCards.orderStatus === 'Delivered') return true
            if (intransitId && OrderCards.orderStatus === 'InTransit') return true
            return false
        })
    
        renderUI(filteredContent);
    }


}


const renderUI = (args) => {

    $('#cards').html(" ");

    $('#count').html(args.length)

    let generateOrderCard = [];
    let htmlstr = " ";

    if(args.length > 0) {
        for (let i = 0; i < args.length; i++) {
    
            generateOrderCard [i] = new OrderCards(args[i]);
            htmlstr += generateOrderCard[i].printOrderCards();
        
        }
    $("#cards").html(htmlstr);
    }
}


checkLogin();

filterContent();

$('.checkBox').change(filterContent);


});

});