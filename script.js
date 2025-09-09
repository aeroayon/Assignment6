

document.addEventListener("DOMContentLoaded", () => {
  let cart = [];

  // ------------------ Spinner ------------------
  function showSpinner() {
    const plantsWrapper = document.querySelector(".plants");
    if (plantsWrapper) plantsWrapper.classList.add("loading");
  }

  function hideSpinner() {
    const plantsWrapper = document.querySelector(".plants");
    if (plantsWrapper) plantsWrapper.classList.remove("loading");
  }

  
  async function loadCategories() {
    try {
      const res = await fetch("https://openapi.programming-hero.com/api/categories");
      const data = await res.json();
      const list = document.getElementById("categories-list");
      if (!list) return;

      list.innerHTML = "";

      
      const allLi = document.createElement("li");
      allLi.textContent = "All Trees";
      allLi.classList.add("active");
      allLi.addEventListener("click", () => {
        document.querySelectorAll("#categories-list li").forEach(li => li.classList.remove("active"));
        allLi.classList.add("active");
        loadPlants();
      });
      list.appendChild(allLi);

      
      if (data.categories) {
        data.categories.forEach(cat => {
          const li = document.createElement("li");
          li.textContent = cat.category_name || "Unknown";
          li.addEventListener("click", () => {
            document.querySelectorAll("#categories-list li").forEach(li => li.classList.remove("active"));
            li.classList.add("active");
            loadPlantsByCategory(cat.id);
          });
          list.appendChild(li);
        });
      }

      
      loadPlants();
    } catch (err) {
      console.error("loadCategories failed:", err);
      loadPlants();
    }
  }

  
  async function loadPlants() {
    try {
      showSpinner();
      const res = await fetch("https://openapi.programming-hero.com/api/plants");
      const data = await res.json();
      displayPlants(data.plants || []);
    } catch (err) {
      console.error("loadPlants failed:", err);
    } finally {
      hideSpinner();
    }
  }

  
  async function loadPlantsByCategory(id) {
    try {
      showSpinner();
      const res = await fetch(`https://openapi.programming-hero.com/api/category/${id}`);
      const data = await res.json();
      displayPlants(data.plants || []);
    } catch (err) {
      console.error("loadPlantsByCategory failed:", err);
    } finally {
      hideSpinner();
    }
  }

  
  function displayPlants(plants) {
    const container = document.getElementById("plants-list");
    if (!container) return;
    container.innerHTML = "";

    if (!plants.length) {
      container.innerHTML = "<p>No plants found.</p>";
      return;
    }

    plants.forEach(plant => {
      const card = document.createElement("div");
      card.classList.add("plant-card");
      card.innerHTML = `
        <img src="${plant.image || "photos/placeholder.png"}" alt="${plant.name || "Plant"}">
        <h4 class="plant-name" style="cursor:pointer">${plant.name || "Unnamed"}</h4>
        <p>${(plant.description || "").slice(0, 60)}...</p>
        <span class="category-tag">${plant.category || ""}</span>
        <div class="price">৳${plant.price ?? 0}</div>
        <button class="btn-primary">Add to Cart</button>
      `;
      container.appendChild(card);

      
      const nameEl = card.querySelector(".plant-name");
      nameEl.addEventListener("click", () => openModal(plant));

     
      const btn = card.querySelector("button");
      btn.addEventListener("click", () => addToCart(plant.id, plant.name, Number(plant.price || 0)));
    });
  }

  
  function addToCart(id, name, price) {
    const existing = cart.find(i => i.id === id);
    if (existing) existing.qty += 1;
    else cart.push({ id, name, price, qty: 1 });
    renderCart();
  }

  function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    renderCart();
  }

  function renderCart() {
    const list = document.getElementById("cart-list");
    const totalEl = document.getElementById("cart-total");
    if (!list || !totalEl) return;

    list.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
      total += item.price * item.qty;
      const li = document.createElement("li");

      const info = document.createElement("div");
      info.className = "cart-item-info";
      info.innerHTML = `<div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-meta">৳${item.price} × ${item.qty}</div>`;

      const btn = document.createElement("button");
      btn.className = "remove-btn";
      btn.innerHTML = "✕";
      btn.addEventListener("click", () => removeFromCart(item.id));

      li.appendChild(info);
      li.appendChild(btn);
      list.appendChild(li);
    });

    totalEl.textContent = `৳${total}`;
  }

  
  const form = document.getElementById("tree-form");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      alert("Thank you for planting a tree! 🌱");
      e.target.reset();
    });
  }

  
  function openModal(plant) {
    document.getElementById("modal-img").src = plant.image || "photos/placeholder.png";
    document.getElementById("modal-name").textContent = plant.name || "Unknown";
    document.getElementById("modal-category").textContent = "Category: " + (plant.category || "Unknown");
    document.getElementById("modal-description").textContent = plant.description || "";
    document.getElementById("modal-price").textContent = "৳" + (plant.price ?? 0);
    document.getElementById("tree-modal").style.display = "block";
  }

  document.querySelector(".close-btn")?.addEventListener("click", () => {
    document.getElementById("tree-modal").style.display = "none";
  });

  window.addEventListener("click", e => {
    if (e.target.id === "tree-modal") {
      document.getElementById("tree-modal").style.display = "none";
    }
  });

  
  loadCategories();
});
