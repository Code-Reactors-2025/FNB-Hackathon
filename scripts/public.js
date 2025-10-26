// ==================== DASHBOARD SCRIPT ====================

// Grab elements
const bentoGrid = document.getElementById('bentoGrid');
const addTile = document.getElementById('addTile');
const menuToggle = document.getElementById('menuToggle');
const sideNav = document.getElementById('sideNav');
const container = document.querySelector('.container');

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
