import { supabase } from "./utils/supabaseClient.js";
import { signedIn } from "./utils/signedIn.js";

(async () => {
  const user = await signedIn();
  if (!user) return; // redirected if not logged in
  
  console.log("Welcome, ", user.currentUser.email);
})();


// ==================== DASHBOARD SCRIPT ====================

// Grab elements
const bentoGrid = document.getElementById('bentoGrid');
const addTile = document.getElementById('addTile');
const menuToggle = document.getElementById('menuToggle');
const sideNav = document.getElementById('sideNav');
const container = document.querySelector('.container');

// Predefined sections to choose from
const predefinedSections = [
  {
    title: "Public Safety",
    desc: "Stay informed about local incidents, emergency alerts, and safety tips in your area.",
    link: "public.html"
  },
  {
    title: "Eco Hub",
    desc: "Find relative jobs matching your skillset, sell goods online, and volunteer in your community",
    link: "eco-hub.html"
  },
  {
    title: "Event Calendar",
    desc: "Browse and manage upcoming community events, workshops, and public gatherings in one place.",
    link: "events.html"
  },
  {
    title: "Community Group Chat",
    desc: "Join real-time conversations with neighbors, share updates, and build stronger local connections.",
    link: "community-chat.html"
  },
  {
    title: "Municipality Services",
    desc: "Access city services like load shedding and water shedding alerts, road maintenance requests with ease.",
    link: "municipality.html"
  }
];

// Color palette for new tiles
const colors = ['color-1', 'color-2', 'color-3', 'color-4', 'color-5'];
let colorIndex = 0;

// ==================== ADD TILE ====================
addTile.addEventListener('click', () => {
  const sectionTitles = predefinedSections.map((s, i) => `${i + 1}. ${s.title}`).join('\n');
  const choice = prompt(`Select a section to add:\n${sectionTitles}`);
  const index = parseInt(choice) - 1;

  if (!isNaN(index) && predefinedSections[index]) {
    const section = predefinedSections[index];

    const newItem = document.createElement('a');
    newItem.href = section.link;
    newItem.classList.add('grid-item', 'category', colors[colorIndex]);
    colorIndex = (colorIndex + 1) % colors.length;

    newItem.innerHTML = `
      <div class="item-header">
        <h3>${section.title}</h3>
        <button class="delete-btn" onclick="event.stopPropagation(); event.preventDefault();"><i class='bx bx-trash'></i></button>
      </div>
      <p>${section.desc}</p>
    `;

    bentoGrid.insertBefore(newItem, addTile);
    attachDeleteHandler(newItem);
  }
});

// ==================== DELETE TILE ====================
function attachDeleteHandler(item) {
  const delBtn = item.querySelector('.delete-btn');
  delBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    item.remove();
  });
}

// Attach delete handlers to initial tiles
document.querySelectorAll('.category').forEach(attachDeleteHandler);

// ==================== SIDE NAV TOGGLE ====================
document.addEventListener('DOMContentLoaded', () => {
  menuToggle.addEventListener('click', () => {
    sideNav.classList.add('active');
    container.classList.add('sidebar-open');
  });

  const sidebarClose = document.getElementById('sidebarClose');
  if (sidebarClose) {
    sidebarClose.addEventListener('click', () => {
      sideNav.classList.remove('active');
      container.classList.remove('sidebar-open');
    });
  }
});
