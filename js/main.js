
// Variables

carritoContenedor = document.getElementById("carritoContenedor");

//EventListener
document.addEventListener("DOMContentLoaded", (e) => {
    loadProducts();

    if (loadCartItems().length > 1) {
        carritoContenedor.textContent = loadCartItems().length;
    }
})


function loadProducts() {
    fetch('js/items.json')
        .then((response) => response.json())
        .then((data) => {
            const items = data;
            const container = document.querySelector("#container");
            if (container) {
                container.innerHTML = "";
                items.forEach((product) => {
                    container.innerHTML += createCardElement(product);
                });
                activateAllButtonsClick(items);
            } else {
                console.error("No se encontraron los elementos");
            }
        })
        .catch((error) => {
            console.error('Error al cargar productos', error);
        });
}


function createCardElement(product) {
    return `
        <div class="card col-3 fluid mb-5" style="width: 13rem;" id="card">
        <img src="${product.images}" class="card-img-top img-fluid img-thumbnail mt-3" alt="...">
        <div class="card-body">
            <div class="name"><p class="card-title">${product.name}</p></div>
            <div class="price"><p class="card-text">$ ${product.price}</p></div>
            <div class="buy mb-2 mt-3">
            <button class="btn btn-primary" id="${product.code}">Add to Cart</button>
            </div>
        </div>
        </div>`;
}


function activateAllButtonsClick(items) {
    const buttons = document.querySelectorAll("button.btn.btn-primary");

    for (let button of buttons) {
        button.addEventListener("click", (e) => {
            const chosenItems = items.find((product) => product.code === e.target.id);
            cart = loadCartItems();
            cart.push(chosenItems);
            saveCartItems(cart);
            carritoContenedor.textContent =cart.length;

            Swal.fire({
                icon: 'success',
                title: 'Agregado',
                text: `El producto ${chosenItems.name}  a sido agregado`,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
            });

        });
    }
}



