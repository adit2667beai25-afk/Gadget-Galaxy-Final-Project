// DARK MODE

function toggleTheme() {

  document.body.classList.toggle("dark");
}

// SEARCH

document.addEventListener("keyup", function(e){

  if(e.target.id === "search") {

    let value =
      e.target.value.toLowerCase();

    let products =
      document.querySelectorAll(".product-card");

    products.forEach(function(product){

      let text =
        product.innerText.toLowerCase();

      if(text.includes(value)) {

        product.style.display = "block";
      }

      else {

        product.style.display = "none";
      }

    });

  }

});

// FILTER

function filterProducts(category) {

  let products =
    document.querySelectorAll(".product-card");

  products.forEach(function(product){

    if(category === "all") {

      product.style.display = "block";
    }

    else if(
      product.dataset.category === category
    ) {

      product.style.display = "block";
    }

    else {

      product.style.display = "none";
    }

  });

}

// ======================
// CART SYSTEM
// ======================

// LOAD CART

let cart =
  JSON.parse(localStorage.getItem("cart")) || [];

// UPDATE COUNTER

function updateCartCount() {

  let count =
    document.getElementById("cartCount");

  if(count) {

    count.innerText = cart.length;
  }

}

updateCartCount();

// ADD TO CART

document.addEventListener("click", function(e){

  if(e.target.classList.contains("buyBtn")) {

    let product = {

      name:
        e.target.dataset.name,

      price:
        e.target.dataset.price,

      image:
        e.target.dataset.image

    };

    // PUSH PRODUCT

    cart.push(product);

    // SAVE

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    // UPDATE UI

    updateCartCount();

    alert(product.name + " Added To Cart");

  }

});

// DISPLAY CART

function displayCart() {

  let cartItems =
    document.getElementById("cartItems");

  if(!cartItems) return;

  let output = "";

  let totalPrice = 0;

  // EMPTY

  if(cart.length === 0) {

    cartItems.innerHTML = `

      <h3 class="text-center text-danger">

        Your cart is empty

      </h3>

    `;
    
    return;
  }
  // HIDE EMPTY MESSAGE

let emptyMessage =
  document.getElementById("emptyMessage");

if(emptyMessage) {

  if(cart.length > 0) {

    emptyMessage.style.display = "none";
  }

  else {

    emptyMessage.style.display = "block";
  }

}

  // LOOP

  cart.forEach(function(product, index){

    totalPrice += Number(product.price);

    output += `

      <div class="cart-item row align-items-center">

        <div class="col-md-3">

          <img
            src="${product.image}"
            class="img-fluid"
          >

        </div>

        <div class="col-md-6">

          <h4>${product.name}</h4>

          <p>${product.price}₸</p>

        </div>

        <div class="col-md-3">

          <button
            class="btn btn-danger"
            onclick="removeItem(${index})"
          >

            Remove

          </button>

        </div>

      </div>

    `;
  });

  cartItems.innerHTML = output;

  // TOTALS

  let totalItems =
    document.getElementById("totalItems");

  let totalPriceElement =
    document.getElementById("totalPrice");

  if(totalItems) {

    totalItems.innerText = cart.length;
  }

  if(totalPriceElement) {

    totalPriceElement.innerText =
      totalPrice + "₸";
  }

}

displayCart();

// REMOVE ITEM

function removeItem(index) {

  cart.splice(index, 1);

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  displayCart();

  updateCartCount();
}

// CLEAR CART

function clearCart() {

  cart = [];

  localStorage.removeItem("cart");

  displayCart();

  updateCartCount();
}


// FORM VALIDATION

let form =
  document.getElementById("contactForm");

if(form) {

  form.addEventListener("submit", function(e){

    e.preventDefault();

    let name =
      document.getElementById("name").value;

    let email =
      document.getElementById("email").value;

    let password =
      document.getElementById("password").value;

    if(name === "") {

      alert("Name Required");

      return;
    }

    if(!email.includes("@")) {

      alert("Invalid Email");

      return;
    }

    if(password.length < 6) {

      alert("Password Too Short");

      return;
    }

    alert("Form Submitted");

  });

}