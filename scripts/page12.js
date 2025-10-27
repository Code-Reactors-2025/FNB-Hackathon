import { supabase } from "./utils/supabaseClient.js";
import { signedIn } from "./utils/signedIn.js";

(async () => {
  const user = await signedIn();
  if (!user) return; // redirected if not logged in
  
  console.log("Welcome, ", user.currentUser.email);
})();



(async () => {
  const user = await signedIn();
  if (!user) return; // Redirected if not logged in

  const userId = user.currentUser.id;


  // === Setting Avatar ===
  // Fetch only the avatar_url column from the profiles table
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("avatar_url, province")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.error("Error fetching avatar:", error.message);
    return;
  }

  if (profile && profile.avatar_url) {
    const avatarImg = document.getElementById("avatarImg");
    if (avatarImg) {
      avatarImg.src = profile.avatar_url; // Direct URL from the table
    }
  }



  // Setting Names
  const { user_metadata } = user.currentUser;
  const firstName = user_metadata.firstname || "";
  const lastName = user_metadata.lastname || "";

  const username = document.getElementById('username');
  if (username) {
    username.textContent = `${firstName} ${lastName}`;
  }



  // Email and phone
  const authUser = user.currentUser;
  const email = authUser.email;
  const phone = authUser.user_metadata?.phone || ""; // Optional: fallback if phone not set

  // Example: inject into HTML
  const emailEl = document.getElementById("userEmail");
  const phoneEl = document.getElementById("userPhone");
  if (emailEl) emailEl.textContent = email;
  if (phoneEl) phoneEl.textContent = phone;



  // Location
  const locationEl = document.getElementById("userLocation");
  if (locationEl && profile?.province) locationEl.textContent = profile.province;

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
