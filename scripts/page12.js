import { supabase } from "./utils/supabaseClient.js";
import { signedIn } from "./utils/signedIn.js";

(async () => {
  const user = await signedIn();
  if (!user) return; // redirected if not logged in
  
  console.log("Welcome, ", user.currentUser.email);
})();


document.addEventListener('DOMContentLoaded', () => {
  const darkModeToggle = document.getElementById('darkMode');

  // Load saved theme
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    darkModeToggle.checked = true;
  }

  // Toggle dark mode
  darkModeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });
});



// Handle Sign Out

const signOutBtn = document.getElementById("logout");

signOutBtn.addEventListener("click", async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error signing out:", error.message);
    alert("Error signing out. Please try again.")
  } else {
    alert("Signed out successfully!");
    window.location.href = "page4"
  }
})






const clearLocalStorage = document.getElementById("clearLocalStorage");

clearLocalStorage.addEventListener("click", () => {
  localStorage.removeItem("userExists");
  localStorage.removeItem("page5Complete");
  localStorage.removeItem("page6Complete");
  localStorage.removeItem("page7Complete");
  localStorage.removeItem("page8Complete");
  localStorage.removeItem("page9Complete");
  localStorage.removeItem("page10Complete");
  alert("localStorage has been cleared");
})
