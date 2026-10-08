let products = JSON.parse(localStorage.getItem("products")) || defaultProducts;
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentFilter = "الكل";

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id) {
  let product = products.find(p => p.id === id);

  if (!product) {
    return;
  }

  let item = cart.find(p => p.id === id);

  if (item) {
    item.quantity++;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  saveCart();
  updateCartCount();

  alert("تمت إضافة المنتج إلى السلة");
}

function productCard(p) {
  return `
    <div class="food-card">

      <img src="${p.img}">

      <div class="card-body">

        <span class="badge">
          ${p.cat}
        </span>

        <h5 class="product-name">
          ${p.name}
        </h5>

        <p class="product-desc">
          ${p.desc || ""}
        </p>

        <div class="card-footer">

          <span class="price">
            ${p.price} جنيه
          </span>

          <button class="add-cart-btn" data-id="${p.id}">
            إضافة للسلة
          </button>

        </div>

      </div>

    </div>
  `;
}

function renderAll() {
  let filtered = products;

  if (currentFilter !== "الكل") {
    filtered = products.filter(p => p.cat === currentFilter);
  }

  let menuGrid = document.getElementById("menu-grid");

  menuGrid.innerHTML = filtered.map(productCard).join("");

  document.querySelectorAll(".add-cart-btn").forEach(button => {
    button.addEventListener("click", function() {
      addToCart(Number(button.dataset.id));
    });
  });
}

document.querySelectorAll(".filter-btn").forEach(button => {
  button.addEventListener("click", function() {

    currentFilter = button.dataset.category;

    document.querySelectorAll(".filter-btn").forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    renderAll();
  });
});

function updateCartCount() {
  let count = 0;

  cart.forEach(item => {
    count += item.quantity;
  });

  document.getElementById("cart-count").textContent = count;
}

renderAll();
updateCartCount();
