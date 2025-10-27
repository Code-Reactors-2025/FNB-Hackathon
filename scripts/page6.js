import { supabase } from "./utils/supabaseClient.js";
import { signedIn } from "./utils/signedIn.js";

(async () => {
  const user = await signedIn();
  if (!user) return; // redirected if not logged in
  
  console.log("Welcome, ", user.currentUser.email);
})();




(async () => {
  const user = await signedIn();
  if (!user) return;

  const userId = user.currentUser.id;

  // 1. Fetch user profile
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.error("Error fetching profile:", error.message);
    return;
  }

  // 2. Loop through columns and apply unique logic
  // Loop through columns and handle each uniquely, stop at first missing

  // Helper function to check for meaningful values
  const hasValue = (value) =>
    value !== null &&
    value !== "" &&
    value.toString().trim() !== "" &&
    value.toString().toLowerCase() !== "null";


const columnOrder = [
  { name: "province", page: "page5.html" },
];

for (const col of columnOrder) {
  const value = profile[col.name];

  if (!hasValue(value)) {
    window.location.href = col.page; // go to first missing page
    break; // stop checking further columns
  }
}
})();





document.getElementById("group-form").addEventListener("submit", async (e) => {
  e.preventDefault(); // prevent default form submit

  const user = await signedIn();
  if (!user) return; // redirected if not logged in

  // collect all checked checkboxes
  const checkedBoxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked');
  const selectedGroups = Array.from(checkedBoxes).map(cb => cb.value);

  if (selectedGroups.length === 0) {
    alert("Please select at least one group.");
    return;
  }

  const userId = user.currentUser.id;

  // Save groups to the 'profiles' table (array column)
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
