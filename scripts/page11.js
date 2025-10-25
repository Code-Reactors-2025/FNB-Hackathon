// ==================== DASHBOARD SCRIPT ====================

// Grab elements
const bentoGrid = document.getElementById('bentoGrid');
const addTile = document.getElementById('addTile');
const menuToggle = document.getElementById('menuToggle');
const sideNav = document.getElementById('sideNav');
const container = document.querySelector('.container');

// Predefined sections to choose from
const predefinedSections = [
  { title: "Fitness Tracker", desc: "Monitor your daily workouts and steps." },
  { title: "Finance", desc: "Keep track of your expenses and savings." },
  { title: "Reminders", desc: "Set up alerts for upcoming events or tasks." },
  { title: "Community Feed", desc: "See posts from nearby community members." },
  { title: "Calendar", desc: "View upcoming events at a glance." }
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

    const newItem = document.createElement('div');
    newItem.classList.add('grid-item', 'category', colors[colorIndex]);
    colorIndex = (colorIndex + 1) % colors.length;

    newItem.innerHTML = `
      <div class="item-header">
        <h3>${section.title}</h3>
        <button class="delete-btn"><i class='bx bx-trash'></i></button>
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
  delBtn.addEventListener('click', () => item.remove());
}

// Attach delete handlers to initial tiles
document.querySelectorAll('.category').forEach(attachDeleteHandler);

// ==================== SIDE NAV TOGGLE ====================
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const sidebarClose = document.getElementById('sidebarClose');
  const sideNav = document.getElementById('sideNav');
  const container = document.querySelector('.container');

  menuToggle.addEventListener('click', () => {
    sideNav.classList.add('active');
    container.classList.add('sidebar-open');
  });

  sidebarClose.addEventListener('click', () => {
    sideNav.classList.remove('active');
    container.classList.remove('sidebar-open');
  });
});

