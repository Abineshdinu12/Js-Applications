// orders.html

document.addEventListener("DOMContentLoaded", function () {
  function renderOrders() {
    const orderList = document.getElementById("orderList");
    if (!orderList) {
      console.error("orderList element not found.");
      return;
    }
    orderList.innerHTML = "";
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    if (orders.length === 0) {
      const noOrdersMessage = document.createElement("p");
      noOrdersMessage.textContent = "You have no orders.";
      orderList.appendChild(noOrdersMessage);
      return;
    }

    orders.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("card", "col-md-3", "mb-4");


      const discountApplied = item.discountApplied || false;


      let totalPriceDisplay = `₹${item.totalPrice.toFixed(2)}`;


      const date = new Date(item.timestamp); 
      const formattedDate = `${date.toLocaleDateString()}`;

      card.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${item.productName}</h5>
          <p class="card-text">
            Price: ₹${item.productPrice.toFixed(2)}
          </p>
          <p class="card-text">
            Quantity: ${item.quantity}
          </p>
          ${
            discountApplied
              ? `<p class="card-text">Discount: ${item.discountPercentage}%<br>Total Price: ${totalPriceDisplay}</p>`
              : ""
          }
          <p class="card-text">
            Date: ${formattedDate}
          </p>
        </div>
      `;

      orderList.appendChild(card);
    });
  }

  renderOrders();
});
