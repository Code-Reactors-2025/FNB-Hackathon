import { supabase } from "./utils/supabaseClient.js";
import { signedIn } from "./utils/signedIn.js";


document.getElementById("interestsAndActivities").addEventListener("submit", async (e) => {
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
      [{ id: userId, interestsAndActivities: selectedGroups }],
      { onConflict: 'id' }
    );

  if (error) {
    console.error("Failed to save groups:", error.message);
  } else {
    console.log("✅ Groups saved:", selectedGroups);
    // Redirect to next page
    window.location.href = "page10.html";
  }
});















// const next1 = document.getElementById('next1');
//         const interests = document.querySelectorAll('.interest');

//         interests.forEach(cb => {
//         cb.addEventListener('change', () => {
//             const checked = [...interests].some(box => box.checked);
//             next1.classList.toggle('active', checked);
//             next1.disabled = !checked;
//         });
//         });

//         next1.addEventListener('click', () => {
//         window.location.href = "page10.html"; 
//         });
