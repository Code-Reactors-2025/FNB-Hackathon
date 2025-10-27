import { supabase } from "./utils/supabaseClient.js";
import { signedIn } from "./utils/signedIn.js";

(async () => {
  const user = await signedIn();
  if (!user) return; // redirected if not logged in
  
  console.log("Welcome, ", user.currentUser.email);
})();


/*================ page 7 ============*/
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');




(async () => {
  const user = await signedIn();
  if (!user) return; // redirected if not logged in

  console.log("Welcome to Page 7,", user.currentUser.email);

  const userId = user.currentUser.id;

  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");

  const saveChoice = async (choice) => {
    // Update the 'profiles' table with the user's choice
    const { error } = await supabase
      .from('profiles')
      .upsert(
        [{ id: userId, receive_updates: choice }], // 'receive_updates' column should be of type TEXT
        { onConflict: 'id' }
      );

    if (error) {
      console.error("Failed to save choice:", error.message);
      alert("Failed to save your choice. Please try again.");
    } else {
      console.log(`✅ Choice saved: ${choice}`);
      // Redirect to next page
      window.location.href = "page8.html"; // adjust if needed
    }
  };

  noBtn.addEventListener("click", () => saveChoice("No"));
  yesBtn.addEventListener("click", () => saveChoice("Yes"));
})();












