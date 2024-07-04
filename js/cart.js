function renderCart() {
  const cartList = document.getElementById("cartList");
  cartList.innerHTML = "";

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  cartItems.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("card", "col-md-3", "mb-4");
    card.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${item.productName}</h5>
        <p class="card-text">Price: ₹${item.productPrice}</p>
        <p class="card-text">Quantity: ${item.productQuantity}</p>
        <button class="btn btn-danger delete">Remove</button>
      </div>
    `;


    const deleteButton = card.querySelector(".delete");
    deleteButton.addEventListener("click", function() {
      removeCartItem(item);
      renderCart();
    });

    cartList.appendChild(card);
  });
}

function removeCartItem(itemToRemove) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];


  cartItems = cartItems.filter(item => item.productName !== itemToRemove.productName);


  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}


renderCart();
