import { supabase } from "./utils/supabaseClient.js";
import { signedIn } from "./utils/signedIn.js";

(async () => {
  const user = await signedIn();
  if (!user) return; // redirected if not logged in
  
  console.log("Welcome, ", user.currentUser.email);
})();











async function handlePostSignUp() {
  try {
    // Step 1: Get current session (after email verification)
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
      console.error("Error getting session:", sessionError.message);
      return;
    }

    if (!session) {
      console.log("User not signed in yet. Retrying in 1 second...");
      setTimeout(handlePostSignUp, 1000); // retry shortly
      return;
    }

    const email = session.user.email;
    console.log("User signed in automatically:", email);



    // Step 2: Insert email into user_emails table if not exists
    const { error: insertError } = await supabase
      .from('user_emails')
      .upsert([{ email }], { onConflict: 'email' });

    if (insertError) {
      if (insertError.code === "23505") { // duplicate
        console.log("Email already exists in table, skipping insert.");
      } else {
        console.error("Failed to insert email:", insertError.message);
      }
    } else {
      console.log("✅ Email successfully registered in table.");
    }

  } catch (err) {
    console.error("Unexpected error in post-signup flow:", err);
  }
}

// Save province to user's profile
async function saveUserProfile(province) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return;

  const userId = session.user.id;
  const email = session.user.email;

  const { error } = await supabase
    .from('profiles')
    .upsert([{ id: userId, email: email, province }]);

  if (error) {
    console.error("Failed to save profile:", error.message);
  } else {
    console.log("✅ User profile updated with province:", province);
  }
}


// Call function on page load
handlePostSignUp();


document.getElementById("community-form").addEventListener("submit", async (e) => {
  e.preventDefault(); // stop default submit

  const province = document.getElementById("province").value;

  if (!province) {
    alert("Please select a province.");
    return;
  }

  await saveUserProfile(province);

  window.location.href = "page6.html"
})