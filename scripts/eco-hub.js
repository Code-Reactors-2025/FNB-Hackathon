import { supabase } from "./utils/supabaseClient.js";
import { signedIn } from "./utils/signedIn.js";
import { getUserInfo } from "./utils/getUserInfo.js";


(async () => {
  const user = await signedIn();
  if (!user) return; // redirected if not logged in
  
  const userInfo = await getUserInfo();
  if (!userInfo) return;

  document.getElementById("username").textContent = `${userInfo.firstname} ${userInfo.lastname}`;
  document.getElementById("avatarImg").src = userInfo.avatar_url;
})();




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


document.getElementById("skillSwapCard").addEventListener("click", () => {
  window.location.href = "skillswap.html"
})
