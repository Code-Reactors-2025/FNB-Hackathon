import { supabase } from "./utils/supabaseClient.js";
import { signedIn } from "./utils/signedIn.js";

(async () => {
  const user = await signedIn();
  if (!user) return; // redirected if not logged in
  
  console.log("Welcome, ", user.currentUser.email);
})();


const page7Complete = localStorage.getItem("page7Complete");

if (page7Complete === "true") {
  window.location.href = "page11.html"
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
];

for (const col of columnOrder) {
  const value = profile[col.name];

  if (!hasValue(value)) {
    window.location.href = col.page; // go to first missing page
    break; // stop checking further columns
  }
}
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
      localStorage.setItem("page7Complete", "true");
      window.location.href = "page8.html"; // adjust if needed
    }
  };

  noBtn.addEventListener("click", () => saveChoice("No"));
  yesBtn.addEventListener("click", () => saveChoice("Yes"));
})();












