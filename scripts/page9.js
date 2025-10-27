import { supabase } from "./utils/supabaseClient.js";
import { signedIn } from "./utils/signedIn.js";

(async () => {
  const user = await signedIn();
  if (!user) return; // redirected if not logged in
  
  console.log("Welcome, ", user.currentUser.email);
})();


const page9Complete = localStorage.getItem("page9Complete");

if (page9Complete === "true") {
  window.location.href = "page11.html";
}


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
  { name: "groups", page: "page6.html" },
  { name: "receive_updates", page: "page7.html" },
];

for (const col of columnOrder) {
  const value = profile[col.name];

  if (!hasValue(value)) {
    window.location.href = col.page; // go to first missing page
    break; // stop checking further columns
  }
}
})();


document.getElementById("interestsAndActivities").addEventListener("submit", async (e) => {
  e.preventDefault(); // prevent default form submit

  const user = await signedIn();
  if (!user) return; // redirected if not logged in

  // collect all checked checkboxes
  const checkedBoxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked');
  const selectedGroups = Array.from(checkedBoxes).map(cb => cb.value);

  
  const next1 = document.getElementById('next1');
  const interests = document.querySelectorAll('.interest');

  if (selectedGroups.length === 0) {
    alert("Please select at least one group.");
    return;
  }

  const userId = user.currentUser.id;

  // Save groups to the 'profiles' table (array column)
  const { error } = await supabase
    .from('profiles')
    .upsert(
      [{ id: userId, interestsandactivities: selectedGroups }],
      { onConflict: 'id' }
    );

  if (error) {
    console.error("Failed to save groups:", error.message);
  } else {
    console.log("✅ Groups saved:", selectedGroups);
    // Redirect to next page
    localStorage.setItem("page9Complete", "true");
    window.location.href = "page10.html";
  }
});




const next1Btn = document.getElementById('next1');
const interests = document.querySelectorAll('.interest');

interests.forEach(cb => {
  cb.addEventListener('change', () => {
    const checked = [...interests].some(box => box.checked);
    next1Btn.classList.toggle('active', checked);
    next1Btn.disabled = !checked;
  });
});




