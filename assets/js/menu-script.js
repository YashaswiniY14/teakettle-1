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

function toggleCard(event, card) {
    // Get all option sections in the menu
    const allOptions = document.querySelectorAll('.options');
  
    // Hide all other options
    allOptions.forEach(option => {
      if (option !== card.querySelector('.options')) {
        option.style.display = 'none';
      }
    });
  
    // Get the options section of the clicked card
    const options = card.querySelector('.options');
  
    // Toggle the display of the clicked card's options
    if (!options.contains(event.target)) {
        options.style.display = options.style.display === 'none' ? 'block' : 'none';
              }  
}

function updatePrice(select, productId) {
    const price = select.options[select.selectedIndex].text.split(' - ')[1];
    const button = document.querySelector(`button[data-product-id="${productId}"]`);
    button.setAttribute('data-product-price', price.replace('Rs. ', ''));
}

// function addToCart(productId) {
//     console.log(productId);
//     const weightSelect = document.getElementById('weight-select-' + productId);
//     const quantityInput = document.getElementById('quantity-' + productId);

//     const selectedWeight = weightSelect.options[weightSelect.selectedIndex].text; // The quantity + price
//     const price = weightSelect.value; // The selected price
//     const quantity = quantityInput.value;

//     // Create a cart object
//     const cartItem = {
//         productId,
//         selectedWeight,
//         price,
//         quantity
//     };
//     console.log(cartItem);
//     // Send the cart data to the backend via POST request
//     fetch('/cart/add', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(cartItem)
//     }).then(response => response.json())
//       .then(data => {
//         // Show success message or update cart UI
//         alert(data.message || "Added to cart!");
//       }).catch(error => {
//         console.error("Error:", error);
//       });
// }