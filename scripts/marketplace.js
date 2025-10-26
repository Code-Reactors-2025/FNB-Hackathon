document.addEventListener("DOMContentLoaded", () => {
  const sideNav = document.getElementById("sideNav");
  const menuToggle = document.getElementById("menuToggle");
  const sidebarClose = document.getElementById("sidebarClose");
  const categoryList = document.getElementById("categoryList");
  const itemContainer = document.getElementById("itemContainer");
  const searchInput = document.getElementById("searchInput");
  const addItemBtn = document.getElementById("addItemBtn");

  // Sample data
  const items = [
    { title: "Wooden Chair", price: "R450", category: "furniture", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600" },
    { title: "Smart TV", price: "R6500", category: "electronics", image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600" },
    { title: "Blue Denim Jacket", price: "R350", category: "clothing", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600" },
    { title: "Used Car", price: "R85 000", category: "vehicles", image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600" },
    { title: "Office Desk", price: "R1 200", category: "furniture", image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600" },
  ];

  // Display items
  function renderItems(filteredItems) {
    itemContainer.innerHTML = "";
    filteredItems.forEach(item => {
      const div = document.createElement("div");
      div.classList.add("item-card");
      div.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <div class="item-info">
          <h3>${item.title}</h3>
          <p>${item.price}</p>
        </div>`;
      itemContainer.appendChild(div);
    });
  }
  renderItems(items);

  // Sidebar toggle
  menuToggle.addEventListener("click", () => sideNav.classList.add("active"));
  sidebarClose.addEventListener("click", () => sideNav.classList.remove("active"));

  // Category filter
  categoryList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      document.querySelectorAll("#categoryList li").forEach(li => li.classList.remove("active"));
      e.target.classList.add("active");

      const category = e.target.getAttribute("data-category");
      const filtered = category === "all" ? items : items.filter(i => i.category === category);
      renderItems(filtered);
    }
  });

  // Search
  document.getElementById("searchBtn").addEventListener("click", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = items.filter(i => i.title.toLowerCase().includes(query));
    renderItems(filtered);
  });

  // Add new item
  addItemBtn.addEventListener("click", () => {
    const title = prompt("Enter item title:");
    const price = prompt("Enter price (e.g. R200):");
    const image = prompt("Enter image URL:");
    const category = prompt("Enter category (furniture/electronics/clothing/vehicles):");

    if (title && price && image && category) {
      items.push({ title, price, image, category });
      renderItems(items);
    }
  });
});
