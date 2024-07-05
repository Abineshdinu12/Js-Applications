document.addEventListener("DOMContentLoaded", function () {
  function renderCart() {
    const cartList = document.getElementById("cartList");
    if (!cartList) {
      console.error("cartList element not found.");
      return;
    }
    cartList.innerHTML = "";

    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    cartItems.forEach((item) => {
      const quantity = item.quantity || 1;
      const productPrice = item.productPrice;
      let totalPrice = productPrice * quantity;
      let discountPercentage = 0;
      let discountedPrice = totalPrice;
      let discountApplied = false;

      if (productPrice > 100) {
        discountPercentage = 10;
        const discountAmount = totalPrice * (discountPercentage / 100);
        discountedPrice = totalPrice - discountAmount;
        discountApplied = true;
      }

      item.totalPrice = totalPrice;
      item.discountedPrice = discountedPrice;
      item.discountApplied = discountApplied;
      item.discountPercentage = discountPercentage;

      const card = document.createElement("div");
      card.classList.add("card", "col-md-3", "mb-4");
      card.style.marginBottom = "20px";

      card.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${item.productName}</h5>
          <p class="card-text">
            Price: ₹${productPrice.toFixed(2)}
          </p>
          <div class="form-group">
            <label for="quantityInput${item.productName}">Quantity:</label>
            <input type="number" class="form-control quantity-input" id="quantityInput${
              item.productName
            }" value="${quantity}" min="1">
          </div>
          ${
            discountApplied
              ? `
            <p class="card-text">
              Discount: ${discountPercentage}%<br>
              Total Price : ₹${discountedPrice.toFixed(2)}
            </p>
            `
              : `
            <p class="card-text">Total: ₹${totalPrice.toFixed(2)}</p>
            `
          }
          <input type="checkbox" class="select-checkbox" data-product='${JSON.stringify(
            item
          )}'> Select to Buy
        </div>
      `;

      const quantityInput = card.querySelector(
        `#quantityInput${item.productName}`
      );
      quantityInput.addEventListener("change", function () {
        const newQuantity = parseInt(this.value);
        updateCartItemQuantity(item, newQuantity);
      });

      cartList.appendChild(card);
    });

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add(
      "fixed-bottom",
      "text-right",
      "mt-5",
      "bg-light"
    );

    const buyNowButton = document.createElement("button");
    buyNowButton.classList.add("btn", "btn-primary", "ml-2");
    buyNowButton.textContent = "Buy Selected Items";
    buyNowButton.addEventListener("click", function () {
      buySelectedItems();
    });
    buttonContainer.appendChild(buyNowButton);

    const removeButton = document.createElement("button");
    removeButton.classList.add("btn", "btn-danger", "ml-2");
    removeButton.textContent = "Remove Selected Items";
    removeButton.addEventListener("click", function () {
      removeSelectedItems();
    });
    buttonContainer.appendChild(removeButton);

    document.body.appendChild(buttonContainer);
  }

  function updateCartItemQuantity(itemToUpdate, newQuantity) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const indexToUpdate = cartItems.findIndex(
      (item) => item.productName === itemToUpdate.productName
    );
    if (indexToUpdate !== -1) {
      cartItems[indexToUpdate].quantity = newQuantity;
      cartItems[indexToUpdate].totalPrice =
        cartItems[indexToUpdate].productPrice * newQuantity;

      if (cartItems[indexToUpdate].productPrice > 100) {
        const discountAmount = cartItems[indexToUpdate].totalPrice * 0.1;
        cartItems[indexToUpdate].totalPriceAfterDiscount =
          cartItems[indexToUpdate].totalPrice - discountAmount;
        cartItems[indexToUpdate].discountApplied = true;
        cartItems[indexToUpdate].discountPercentage = 10;
      } else {
        cartItems[indexToUpdate].totalPriceAfterDiscount = null;
        cartItems[indexToUpdate].discountApplied = false;
        cartItems[indexToUpdate].discountPercentage = 0;
      }

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      renderCart();
    }
  }

  function buySelectedItems() {
    const selectCheckboxes = document.querySelectorAll(
      ".select-checkbox:checked"
    );
    if (selectCheckboxes.length === 0) {
      alert("Please select at least one item to buy.");
      return;
    }

    let selectedItems = [];
    selectCheckboxes.forEach((checkbox) => {
      const item = JSON.parse(checkbox.dataset.product);
      selectedItems.push(item);
    });

    console.log("Items to be added to orders:", selectedItems);

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    const timestamp = new Date().toISOString();

    selectedItems.forEach((item) => {
      let discountApplied = false;
      let totalPrice = item.productPrice * (item.quantity || 1);

      if (item.productPrice > 100) {
        const discountAmount = totalPrice * (10 / 100);
        totalPrice = totalPrice - discountAmount;
        discountApplied = true;
      }

      orders.push({
        productName: item.productName,
        productPrice: item.productPrice,
        quantity: item.quantity || 1,
        totalPrice: totalPrice,
        discountApplied: discountApplied,
        discountPercentage: discountApplied ? 10 : 0,
        timestamp: timestamp,
      });
    });

    localStorage.setItem("orders", JSON.stringify(orders));

    selectCheckboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    window.location.href = "orders.html";
  }

  function removeSelectedItems() {
    const selectCheckboxes = document.querySelectorAll(
      ".select-checkbox:checked"
    );
    if (selectCheckboxes.length === 0) {
      alert("Please select at least one item to remove.");
      return;
    }

    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const itemsToRemove = [];

    selectCheckboxes.forEach((checkbox) => {
      const product = JSON.parse(checkbox.getAttribute("data-product"));
      itemsToRemove.push(product);
    });

    cartItems = cartItems.filter((item) => {
      for (const selectedItem of itemsToRemove) {
        if (item.productName === selectedItem.productName) {
          return false;
        }
      }
      return true;
    });

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    renderCart();
  }

  renderCart();
});
