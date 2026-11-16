/* =====================================
   CAFE DE CHAO - JAVASCRIPT
===================================== */


/* =====================================
   1. MOBILE NAVIGATION
===================================== */

const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

if (navToggle && nav) {

    navToggle.addEventListener("click", () => {

        const isOpen = nav.classList.toggle("nav-visible");

        navToggle.setAttribute("aria-expanded", isOpen);

        navToggle.textContent = isOpen ? "×" : "☰";

    });

}


/* =====================================
   2. FOOTER YEAR
===================================== */

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}


/* =====================================
   3. SHOPPING CART STORAGE
===================================== */

let cart = [];

try {

    cart = JSON.parse(localStorage.getItem("cafeDeChaoCart")) || [];

    if (!Array.isArray(cart)) {
        cart = [];
    }

} catch (error) {

    cart = [];

}


/* =====================================
   4. SAVE CART
===================================== */

function saveCart() {

    localStorage.setItem(
        "cafeDeChaoCart",
        JSON.stringify(cart)
    );

}


/* =====================================
   5. ADD PRODUCTS TO CART
===================================== */

const addButtons = document.querySelectorAll(".add-to-cart");

addButtons.forEach(button => {

    button.addEventListener("click", () => {

        const id = button.dataset.id;

        const name = button.dataset.name;

        const price = Number(button.dataset.price);

        if (!id || !name || !Number.isFinite(price) || price <= 0) {
            return;
        }

        const existingProduct = cart.find(
            item => item.id === id
        );

        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({

                id: id,

                name: name,

                price: price,

                quantity: 1

            });

        }

        saveCart();

        updateCart();

        const originalText = button.textContent;

        button.textContent = "Added ✓";

        setTimeout(() => {

            button.textContent = originalText;

        }, 1000);

    });

});


/* =====================================
   6. UPDATE CART DISPLAY
===================================== */

function updateCart() {

    const cartItems = document.querySelector(".cart-items");

    const cartTotal = document.getElementById("cart-total");

    const cartCounts = document.querySelectorAll(".cart-count");

    if (!cartItems || !cartTotal) return;

    let total = 0;

    let totalQuantity = 0;

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your bag is empty.
                <br>
                Add something delicious!
            </p>
        `;

    }

    cart.forEach(item => {

        total += item.price * item.quantity;

        totalQuantity += item.quantity;

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        const details = document.createElement("div");

        const productName = document.createElement("h4");

        productName.textContent = item.name;

        const productPrice = document.createElement("p");

        productPrice.textContent =
            `Rs ${item.price * item.quantity}`;

        details.append(productName, productPrice);

        const controls = document.createElement("div");

        controls.className = "quantity-controls";

        const decrease = document.createElement("button");

        decrease.textContent = "−";

        decrease.setAttribute("aria-label", `Decrease ${item.name}`);

        decrease.addEventListener("click", () => {

            changeQuantity(item.id, -1);

        });

        const quantity = document.createElement("span");

        quantity.textContent = item.quantity;

        const increase = document.createElement("button");

        increase.textContent = "+";

        increase.setAttribute("aria-label", `Increase ${item.name}`);

        increase.addEventListener("click", () => {

            changeQuantity(item.id, 1);

        });

        controls.append(decrease, quantity, increase);

        cartItem.append(details, controls);

        cartItems.appendChild(cartItem);

    });

    cartTotal.textContent = total.toLocaleString("en-PK");

    cartCounts.forEach(element => {

        element.textContent = totalQuantity;

    });

}


/* =====================================
   7. CHANGE PRODUCT QUANTITY
===================================== */

function changeQuantity(id, change) {

    const product = cart.find(item => item.id === id);

    if (!product) return;

    product.quantity += change;

    if (product.quantity <= 0) {

        cart = cart.filter(item => item.id !== id);

    }

    saveCart();

    updateCart();

}


/* =====================================
   8. OPEN SHOPPING CART
===================================== */

const cartOpenButtons = document.querySelectorAll(".cart-open");

cartOpenButtons.forEach(button => {

    button.addEventListener("click", () => {

        document.body.classList.add("cart-opened");

        const panel = document.querySelector(".cart-panel");

        if (panel) {
            panel.setAttribute("aria-hidden", "false");
        }

    });

});


/* =====================================
   9. CLOSE SHOPPING CART
===================================== */

const cartClose = document.querySelector(".cart-close");

const cartBackdrop = document.querySelector(".cart-backdrop");

function closeCart() {

    document.body.classList.remove("cart-opened");

    const panel = document.querySelector(".cart-panel");

    if (panel) {
        panel.setAttribute("aria-hidden", "true");
    }

}

if (cartClose) {

    cartClose.addEventListener("click", closeCart);

}

if (cartBackdrop) {

    cartBackdrop.addEventListener("click", closeCart);

}

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeCart();

    }

});


/* =====================================
   10. MENU CATEGORY FILTERING
===================================== */

const filterButtons = document.querySelectorAll(".filter-btn");

const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const category = button.dataset.category;

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        productCards.forEach(card => {

            const productCategory = card.dataset.category;

            if (
                category === "all" ||
                category === productCategory
            ) {

                card.classList.remove("hide");

            } else {

                card.classList.add("hide");

            }

        });

    });

});


/* =====================================
   11. DEMO CHECKOUT
===================================== */

const checkoutButton = document.querySelector(".checkout-btn");

if (checkoutButton) {

    checkoutButton.addEventListener("click", () => {

        if (cart.length === 0) {

            alert("Your shopping bag is empty!");

            return;

        }

        const orderTotal = cart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        const orderSummary = cart.map(item => {

            return `${item.name} x ${item.quantity}`;

        }).join("\n");

        const confirmation = confirm(

            "CAFE DE CHAO - ORDER CONFIRMATION\n\n" +

            orderSummary +

            "\n\nTotal: Rs " +

            orderTotal.toLocaleString("en-PK") +

            "\n\nConfirm this demo order?"

        );

        if (confirmation) {

            const order = {

                orderId: "CD" + Date.now(),

                items: cart,

                total: orderTotal,

                date: new Date().toISOString()

            };

            let previousOrders = [];

            try {

                previousOrders = JSON.parse(
                    localStorage.getItem("cafeDeChaoOrders")
                ) || [];

                if (!Array.isArray(previousOrders)) {
                    previousOrders = [];
                }

            } catch (error) {

                previousOrders = [];

            }

            previousOrders.push(order);

            localStorage.setItem(
                "cafeDeChaoOrders",
                JSON.stringify(previousOrders)
            );

            cart = [];

            saveCart();

            updateCart();

            closeCart();

            alert(
                "Thank you for choosing Cafe de Chao!\n\n" +
                "Your demo order ID is: " + order.orderId
            );

        }

    });

}


/* =====================================
   12. INITIALIZE WEBSITE
===================================== */

updateCart();

console.log("Cafe de Chao website initialized successfully!");