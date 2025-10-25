import { supabase } from "./utils/supabaseClient.js";


document.getElementById('group-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const group = document.getElementById('group').value;
  if (group) {
    alert(`You selected: ${group}`);
    window.location.href = "page7.html";
  } else {
    alert('Please select a group before proceeding.');
  }
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
    window.location.href = "https://code-reactors-2025.github.io/FNB-Hackathon/page4.html"
  }
})