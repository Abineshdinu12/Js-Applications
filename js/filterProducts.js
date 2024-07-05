function renderProducts(products) {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  products.forEach((product, index) => {
    const card = document.createElement("div");
    card.classList.add("col-md-3", "mb-4");
    
    const isInCart = cartItems.some(item => item.productName === product.productName);
    
    card.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${product.productName}</h5>
          <p class="card-text">Price: ₹${product.productPrice}</p>
          <button class="btn btn-primary addToCart" data-index="${index}" ${isInCart ? 'disabled' : ''}>
            ${isInCart ? 'Already in Cart' : 'Add To Cart'}
          </button>
        </div>
      </div>
    `;
    productList.appendChild(card);
  });

  const addToCartButtons = document.querySelectorAll(".addToCart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const index = parseInt(this.getAttribute("data-index"));
      const selectedProduct = products[index];
      addToCart(selectedProduct);
      navigateToCart();
    });
  });
}


function addToCart(product) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems.push(product);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
function navigateToCart() {
  window.location.href = "cart.html";
}

renderProducts(products);

document.getElementById("searchInput").addEventListener("input", function () {
  const searchQuery = this.value.trim().toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery)
  );
  renderProducts(filteredProducts);
});
