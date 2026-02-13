document.addEventListener("DOMContentLoaded", function () {
  const productsDiv = document.getElementById("products");
  const cartItemsUl = document.getElementById("cart-items");
  const cartTotalSpan = document.getElementById("cart-total");
  const clearCartBtn = document.getElementById("clear-cart");

  let cart = loadCart();

  //LocalStorage 
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function loadCart() {
    const text = localStorage.getItem("cart");
    if (text === null) return [];

    try {
      const data = JSON.parse(text);
      if (Array.isArray(data)) return data;
      return [];
    } catch (err) {
      return [];
    }
  }

  function findProductById(id) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) return products[i];
    }
    return null;
  }

  function addToCart(productId) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === productId) {
        cart[i].qty = cart[i].qty + 1;
        saveCart();
        renderCart();
        return;
      }
    }

    cart.push({ id: productId, qty: 1 });
    saveCart();
    renderCart();
  }

  function makeElement(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  }

  //Render Cart
  function renderCart() {
    if (!cartItemsUl || !cartTotalSpan) return;

    cartItemsUl.innerHTML = "";

    if (cart.length === 0) {
      const li = makeElement("li", "empty", "Kundvagnen är tom.");
      cartItemsUl.appendChild(li);
      cartTotalSpan.textContent = "0";
      return;
    }

    let total = 0;

    for (let i = 0; i < cart.length; i++) {
      const item = cart[i];
      const product = findProductById(item.id);
      if (!product) continue;

      const lineTotal = product.price * item.qty;
      total = total + lineTotal;

      const li = document.createElement("li");

      const leftText =
        product.name + " (" + product.price + " kr) x" + item.qty;
      const left = makeElement("span", "", leftText);

      const right = makeElement("strong", "", lineTotal + " kr");

      li.appendChild(left);
      li.appendChild(right);
      cartItemsUl.appendChild(li);
    }

    cartTotalSpan.textContent = String(total);
  }

  //Render Products 
  function createProductCard(p) {
    const card = makeElement("article", "product-card");

    const img = document.createElement("img");
    img.src = p.image;
    img.alt = p.name;

    const title = makeElement("h4", "", p.name);
    const desc = makeElement("p", "", p.description);

    const cat = makeElement("p", "category", "Kategori: " + p.category);

    const row = makeElement("div", "row");

    const price = makeElement("span", "price", p.price + " kr");

    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "Lägg i kundvagn";
    btn.addEventListener("click", function () {
      addToCart(p.id);
    });

    row.appendChild(price);
    row.appendChild(btn);

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(cat);
    card.appendChild(row);

    return card;
  }

  function renderProducts() {
    if (!productsDiv) return;

    productsDiv.innerHTML = "";

    for (let i = 0; i < products.length; i++) {
      const card = createProductCard(products[i]);
      productsDiv.appendChild(card);
    }
  }

  //Events
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", function () {
      cart = [];
      saveCart();
      renderCart();
    });
  }

  //Start
  renderProducts();
  renderCart();
});
