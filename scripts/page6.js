import { supabase } from "./utils/supabaseClient.js";
import { signedIn } from "./utils/signedIn.js";

(async () => {
  const user = await signedIn();
  if (!user) return; // redirected if not logged in
  
  console.log("Welcome, ", user.currentUser.email);
})();




document.getElementById("group-form").addEventListener("submit", async (e) => {
  e.preventDefault(); // stop default submit

  const user = await signedIn();
  if (!user) return;

  const select = document.getElementById("group");
  const selectedGroups = Array.from(select.selectedOptions).map(opt => opt.value);

  if (selectedGroups.length === 0) {
    alert("Please select at least one group.");
    return;
  }

  const userId = user.currentUser.id;

  // Save groups to your 'profiles' table (as an array column)
  const { error } = await supabase
    .from('profiles')
    .upsert(
      [{ id: userId, groups: selectedGroups }], 
      { onConflict: 'id' }
    );

  if (error) {
    console.error("Failed to save groups:", error.message);
  } else {
    console.log("✅ Groups saved:", selectedGroups);
    // Redirect to next page
    window.location.href = "page7.html";
  }
});





