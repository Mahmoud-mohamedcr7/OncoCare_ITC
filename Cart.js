function addToCart(id) {
  let p = products.find((x) => x.id === id);
  if (!p) return;
  let f = cart.find((x) => x.id === id);
  if (f) f.qty++;
  else cart.push({ ...p, qty: 1 });
  save();
  renderAll();

  Swal.fire({
    icon: "success",
    title: "تمت الإضافة للسلة",
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });
}

function changeQty(i, d) {
  cart[i].qty += d;
  if (cart[i].qty <= 0) cart.splice(i, 1);
  save();
  renderAll();
}

function removeFromCart(i) {
  cart.splice(i, 1);
  save();
  renderAll();
}

function renderCart() {
  let cartDiv = document.getElementById("cart-items");
  if (cartDiv) {
    if (cart.length === 0) {
      cartDiv.innerHTML =
        '<p class="text-center text-muted py-4 m-0">السلة فارغة <i class="bi bi-cart-x"></i></p>';
    } else {
      cartDiv.innerHTML = cart
        .map(
          (c, i) => `
        <div class="d-flex align-items-center justify-content-between border-bottom py-3">
          <div class="d-flex align-items-center gap-3">
            <img src="${c.img}" class="cart-img" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100'">
            <div>
              <h6 class="mb-0 fw-bold">${c.name}</h6>
              <small class="text-muted">${c.price} جنيه</small>
              <div class="mt-1">
                <button onclick="changeQty(${i}, -1)" class="btn btn-sm btn-outline-secondary px-2 py-0">-</button>
                <span class="mx-2">${c.qty}</span>
                <button onclick="changeQty(${i}, 1)" class="btn btn-sm btn-outline-secondary px-2 py-0">+</button>
              </div>
            </div>
          </div>
          <div class="text-end">
            <div class="fw-bold">${c.price * c.qty} جنيه</div>
            <button onclick="removeFromCart(${i})" class="btn btn-sm text-danger p-0 mt-1"><i class="bi bi-trash"></i></button>
          </div>
        </div>`,
        )
        .join("");
    }
  }

  let total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  let totalPriceEl = document.getElementById("total-price");
  if (totalPriceEl) totalPriceEl.innerText = total + " جنيه";

  let cartCountEl = document.getElementById("cart-count");
  if (cartCountEl) {
    cartCountEl.innerText = cart.reduce((s, c) => s + c.qty, 0);
  }
}

function placeOrder() {
  if (cart.length === 0) {
    return Swal.fire({
      icon: "info",
      title: "السلة فارغة!",
      text: "قم بإضافة بعض المنتجات أولاً لتأكيد الطلب",
      confirmButtonText: "حسناً",
      confirmButtonColor: "#0d6efd",
    });
  }

  let name = document.getElementById("c-name").value.trim();
  let phone = document.getElementById("c-phone").value.trim();
  let address = document.getElementById("c-address").value.trim();

  if (!name || !phone || !address) {
    return Swal.fire({
      icon: "warning",
      title: "بيانات التوصيل ناقصة",
      text: "يرجى إكمال جميع بيانات التوصيل قبل إرسال الطلب",
      confirmButtonText: "حسناً",
      confirmButtonColor: "#3085d6",
    });
  }

  let total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  orders.push({
    name,
    phone,
    address,
    items: [...cart],
    total,
    date: new Date().toLocaleString("ar-EG"),
  });

  cart = [];
  save();

  document.getElementById("c-name").value = "";
  document.getElementById("c-phone").value = "";
  document.getElementById("c-address").value = "";

  renderAll();

  Swal.fire({
    icon: "success",
    title: "تم استلام طلبك بنجاح",
    text: "سيتم التواصل معك قريباً لتأكيد التوصيل",
    confirmButtonText: "رائع!",
    confirmButtonColor: "#198754",
  });

  showPage("home");
}
