document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    let cartItems = [];
    let cartTotalINR = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const pricePerKg = parseFloat(button.getAttribute('data-price'));
            const name = button.parentNode.querySelector('h2').textContent.trim();
            const quantity = prompt("How many kilograms would you like to buy?", "1");

            if (quantity !== null && !isNaN(quantity) && quantity > 0) {
                const totalItemPriceINR = pricePerKg * parseFloat(quantity);
                cartItems.push({ name: name, priceINR: totalItemPriceINR, quantity: parseFloat(quantity) });
                updateCart();
            } else {
                alert("Please enter a valid quantity.");
            }
        });
    });

    function updateCart() {
        cartItemsElement.innerHTML = '';
        cartTotalINR = 0;
        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('cart-item');
            li.innerHTML = `<span>${item.name} (${item.quantity} Kg)</span><span>₹${item.priceINR.toFixed(2)}</span>`;
            cartItemsElement.appendChild(li);
            cartTotalINR += item.priceINR;
        });
        cartTotalElement.textContent = cartTotalINR.toFixed(2);
    }

    document.getElementById('checkout').addEventListener('click', function() {
        if (cartTotalINR > 0) {
            alert(`Total amount to pay: ₹${cartTotalINR.toFixed(2)}`);
            cartItems = [];
            updateCart();
        } else {
            alert("Your cart is empty!");
        }
    });

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(loginForm);
            const username = formData.get('username');
            const password = formData.get('password');
            const dob = formData.get('dob');
            const phone = formData.get('phone');
            const address = formData.get('address');
            const email = formData.get('email');

            alert(`Logged in as ${username}\nDOB: ${dob}\nPhone: ${phone}\nAddress: ${address}\nEmail: ${email}`);
        });
    }
});