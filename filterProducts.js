
function renderProducts(products) {
  const productList = document.getElementById("productList");
  productList.innerHTML = ""; 
  
  products.map(product => {
    const card = document.createElement("div");
    card.classList.add("col-md-3", "mb-4");
    card.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${product.productName}</h5>
          <p class="card-text">Price: ${product.productPrice}</p>
          <p class="card-text">Quantity: ${product.productQuantity}</p>
                <button class= btn-primary> Add To Cart</button>
        </div>
      </div>
 
    `;
    
    productList.appendChild(card);
  });
}
renderProducts(cart[0]);
document.getElementById("searchInput").addEventListener("input", function() {
  const searchQuery = this.value.toLowerCase();
  const filteredProducts = cart[0].filter(product => 
    product.productName.toLowerCase().includes(searchQuery)
  );
  renderProducts(filteredProducts);
});
