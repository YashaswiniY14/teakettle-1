'use strict';



/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

// function toggleCard(card) {
//     const options = card.querySelector('.options');
//     if (!options.contains(event.target)) {
//         options.style.display = options.style.display === 'none' ? 'block' : 'none';
//       }
//     // options.style.display = options.style.display === 'none' ? 'block' : 'none';
//   }
//  

function updateQuantity(productId, change) {
    console.log("the update function")
    const quantityInput = document.querySelector(`input[data-product-id="${productId}"]`);
    const weightCell = quantityInput.closest('tr').querySelector('td:nth-child(2)'); // Assuming weight is in the second column
    let currentQuantity = parseInt(quantityInput.value);
    let newQuantity = currentQuantity + change;
    let selectedWeight = weightCell.textContent.trim();
    console.log(newQuantity);
    console.log(selectedWeight);
    console.log(productId);

    fetch('/cart/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            productId,
            newQuantity,
            selectedWeight
        }),
    })
    console.log("the update function")
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            if (newQuantity <= 0) {
                // Remove the entire row if the item was deleted
                const row = quantityInput.closest('tr');
                row.remove();
            } else {
                quantityInput.value = newQuantity;
            }
            updateCartDisplay(data.cart);
        } else {
            console.error('Failed to update cart:', data.message);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function updateCartDisplay(cart) {
    const tbody = document.querySelector('table tbody');
    const tfootTotal = document.querySelector('table tfoot td:last-child');
    
    // Clear existing rows
    tbody.innerHTML = '';
    
    if (cart.length === 0) {
        // If cart is empty, display a message
        tbody.innerHTML = '<tr><td colspan="5" class="text-center">Your cart is empty.</td></tr>';
        tfootTotal.textContent = '₹0.00';
    } else {
        // Add updated rows
        cart.forEach(item => {
            const row = `
                <tr>
                    <td>${item.productName}</td>
                    <td>${item.selectedWeight}</td>
                    <td>₹${Number(item.price).toFixed(2)}</td>
                    <td>
                        <div class="input-group input-group-sm" style="width: 100px;">
                            <button class="btn btn-outline-secondary" type="button" onclick="updateQuantity('${item.productId}', -1)">-</button>
                            <input type="text" class="form-control text-center" value="${item.quantity}" data-product-id="${item.productId}" readonly>
                            <button class="btn btn-outline-secondary" type="button" onclick="updateQuantity('${item.productId}', 1)">+</button>
                        </div>
                    </td>
                    <td>₹${(Number(item.price) * item.quantity).toFixed(2)}</td>
                </tr>
            `;
            tbody.insertAdjacentHTML('beforeend', row);
        });
        
        // Update total
        const total = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
        tfootTotal.textContent = `₹${total.toFixed(2)}`;
    }
}
