function renderCart() {
  const cartList = document.getElementById("cartList");
  cartList.innerHTML = "";

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  cartItems.forEach((item) => {
    const quantity = item.quantity || 1;

    const card = document.createElement("div");
    card.classList.add("card", "col-md-3", "mb-4");

    const totalPrice = item.productPrice * quantity;

    card.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${item.productName}</h5>
        <p class="card-text">Price: ₹${item.productPrice}</p>
        <div class="form-group">
          <label for="quantityInput${item.productName}">Quantity:</label>
          <input type="number" class="form-control quantity-input" id="quantityInput${item.productName}" value="${quantity}" min="1">
        </div>
        <p class="card-text">Total: ₹${totalPrice}</p>
        <button class="btn btn-danger delete">Remove</button>
      </div>
    `;

    const quantityInput = card.querySelector(
      `#quantityInput${item.productName}`
    );
    quantityInput.addEventListener("change", function () {
      const newQuantity = parseInt(this.value);
      updateCartItemQuantity(item, newQuantity);
    });

    const deleteButton = card.querySelector(".delete");
    deleteButton.addEventListener("click", function () {
      removeCartItem(item);
      renderCart();
    });

    cartList.appendChild(card);
  });
}

function updateCartItemQuantity(itemToUpdate, newQuantity) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const indexToUpdate = cartItems.findIndex(
    (item) => item.productName === itemToUpdate.productName
  );
  if (indexToUpdate !== -1) {
    cartItems[indexToUpdate].quantity = newQuantity;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    renderCart();
  }
}

function removeCartItem(itemToRemove) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems = cartItems.filter(
    (item) => item.productName !== itemToRemove.productName
  );
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  renderCart();
}

renderCart();
