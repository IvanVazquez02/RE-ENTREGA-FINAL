
let cart = [];

function saveCartItems(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartItems() {
    const cartLoad = JSON.parse(localStorage.getItem('cart')) || [];
    return cartLoad;
}
