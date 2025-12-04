// ============================
// Global cart state
// ============================
let cart = [];
const cartKey = "hairTechniqueCart";

// ============================
// Cart functions
// ============================
function loadCart() {
    const stored = localStorage.getItem(cartKey);
    cart = stored ? JSON.parse(stored) : [];
}

function saveCart() {
    localStorage.setItem(cartKey, JSON.stringify(cart));
}

function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    saveCart();
    updateCartDisplay();
    alert(`${name} added to cart!`);
}

function removeFromCart(index) {
    if (!cart[index]) return;
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    saveCart();
    updateCartDisplay();
}

function clearCart() {
    cart = [];
    saveCart();
    updateCartDisplay();
    alert("Cart cleared!");
}

// ============================
// Cart display
// ============================
function updateCartDisplay() {
    const cartContainer = document.getElementById("cart-items");
    const subtotalEl = document.getElementById("subtotal");
    const vatEl = document.getElementById("vat");
    const totalEl = document.getElementById("total");

    if (!cartContainer) return;

    cartContainer.innerHTML = "";
    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    }

    let subtotal = 0;
    cart.forEach((item, i) => {
        const lineTotal = item.price * item.quantity;
        subtotal += lineTotal;

        const el = document.createElement("div");
        el.className = "cart-item";
        el.innerHTML = `
            <div><strong>${item.name}</strong> x${item.quantity}</div>
            <div>R${lineTotal.toFixed(2)} <button onclick="removeFromCart(${i})">&times;</button></div>
        `;
        cartContainer.appendChild(el);
    });

    const vat = subtotal * 0.15;
    const total = subtotal + vat;

    if (subtotalEl) subtotalEl.textContent = `R${subtotal.toFixed(2)}`;
    if (vatEl) vatEl.textContent = `R${vat.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `R${total.toFixed(2)}`;
}

// ============================
// Product buttons
// ============================
function initProductButtons() {
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', e => {
            const card = e.target.closest('.product-card');
            const name = card.querySelector('.product-name').textContent;
            const priceText = card.querySelector('.product-price').textContent.replace("R", "");
            const price = parseFloat(priceText);
            addToCart(name, price);
        });
    });
}

// ============================
// Initialization
// ============================
document.addEventListener("DOMContentLoaded", () => {
    loadCart();
    updateCartDisplay();
    initProductButtons();
});
