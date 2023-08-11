let shoppingCart = [];

//EventListener
document.addEventListener("DOMContentLoaded", (e) => {
    shoppingCart = JSON.parse(localStorage.getItem('cart')) || [];
    renderCart();
})


document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        handleDeleteCard(e);
    }
});

class Calculator {
    calculateTotal(shoppingCart) {
        return shoppingCart.reduce((total, item) => total + (item?.price || 0), 0);
    }
}

function renderCart() {
    const tbody = document.getElementById('cartTable');
    tbody.innerHTML = '';

    shoppingCart.forEach((cartItem) => {
        tbody.innerHTML += returnTableInHTML(cartItem);
    });
    // Metodo que calcula el total
    const calculator = new Calculator();
    const total = calculator.calculateTotal(shoppingCart);

    const totalElement = document.getElementById('total');
    totalElement.textContent = `Total: $ ${total.toFixed(2)}`;
}

function returnTableInHTML(cartItem) {
    if (!cartItem || !cartItem.name || !cartItem.price || !cartItem.code) {
        return '';
    }

    return `
    <tr>
        <td>${cartItem.name}</td>
        <td>$ ${cartItem.price}</td>
        <td><button class="btn btn-danger btn-sm delete" data-code="${cartItem.code}">Delete</button></td>
    </tr>`;
}


function handleDeleteCard(e) {
    const code = e.target.dataset.code;

    const itemIndex = shoppingCart.findIndex((item) => item.code === code);

    if (itemIndex !== -1) {
        shoppingCart.splice(itemIndex, 1);
        saveCartItems(shoppingCart);
        renderCart();

        Swal.fire({
            icon: 'success',
            title: 'Item removido',
            text: 'El item fue removdo correctamente',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
        });
    }
}



//Compra Final 
const purchaseButton = document.getElementById('purchaseButton');
purchaseButton.addEventListener('click', handlePurchase);

function handlePurchase() {
    Swal.fire({
        icon: 'success',
        title: 'Compra Aprobada ',
        text: 'Muchas gracias por tu compra!',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
    }).then(() => {
        localStorage.removeItem('cart');
        shoppingCart.length = 0;
        renderCart();
    });
}




