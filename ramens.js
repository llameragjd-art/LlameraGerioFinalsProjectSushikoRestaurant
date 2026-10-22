
const cart = [];

const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const emptyCart = document.getElementById("empty-cart");
const cartMessage = document.getElementById("cart-message");

// Add ramen to the cart
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }

        renderCart();
        cartMessage.textContent = name + " added to cart!";
    });
});

// Display items and calculate the total
function renderCart() {
    cartItems.replaceChildren();

    let total = 0;
    let quantity = 0;

    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        quantity += item.quantity;

        const li = document.createElement("li");
        li.textContent =
            `${item.name} — ₱${item.price} × ${item.quantity} = ₱${subtotal} `;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.type = "button";

        removeButton.addEventListener("click", () => {
            cart.splice(index, 1);
            renderCart();
            cartMessage.textContent = item.name + " removed.";
        });

        li.appendChild(removeButton);
        cartItems.appendChild(li);
    });

    cartTotal.textContent = total.toLocaleString("en-PH");
    emptyCart.hidden = cart.length > 0;

    document.getElementById("order-now").textContent =
        `Order Now (${quantity})`;
}

// Clear the cart
document.getElementById("clear-cart").addEventListener("click", () => {
    cart.length = 0;
    renderCart();
    cartMessage.textContent = "Cart cleared.";
});

// Place a demo order
document.getElementById("order-now").addEventListener("click", () => {
    if (cart.length === 0) {
        cartMessage.textContent = "Please add ramen to your cart first.";
        return;
    }

    const summary = cart.map(item =>
        `${item.name} x ${item.quantity} = ₱${item.price * item.quantity}`
    ).join("\n");

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    alert(
        "Your Sushiko Order\n\n" +
        summary +
        "\n\nTotal: ₱" + total.toLocaleString("en-PH") +
        "\n\nThank you for ordering!"
    );
});

renderCart();
