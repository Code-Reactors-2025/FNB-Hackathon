import { supabase } from "./utils/supabaseClient.js";
import { signedIn } from "./utils/signedIn.js";

(async () => {
  const user = await signedIn();
  if (!user) return; // redirected if not logged in
  
  console.log("Welcome, ", user.currentUser.email);
})();

const page5Complete = localStorage.getItem("page5Complete");

if (page5Complete === "true") {
  window.location.href = "page11.html"
}

// Handle post-signup logic
async function handlePostSignUp() {
  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
      console.error("Error getting session:", sessionError.message);
      return;
    }

    if (!session || !session.user) {
      console.log("User not signed in yet. Retrying in 1 second...");
      setTimeout(handlePostSignUp, 1000); // retry shortly
      return;
    }

    const userId = session.user.id;
    const email = session.user.email;

    if (!email) {
      console.error("No email found in session, cannot insert user email.");
      return;
    }

    console.log("User signed in automatically:", email);

    // Insert email into user_emails table if not exists
    const { error: insertError } = await supabase
      .from('user_emails')
      .upsert([{ email }], { onConflict: 'email' });

    if (insertError) {
      if (insertError.code === "23505") {
        console.log("Email already exists in table, skipping insert.");
      } else {
        console.error("Failed to insert email:", insertError.message);
      }
    } else {
      console.log("✅ Email successfully registered in table.");
    }

    // Optional: Ensure profile row exists with email
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert([{ id: userId, email }], { onConflict: 'id' });

    if (profileError) {
      console.error("Failed to ensure profile row:", profileError.message);
    } else {
      console.log("✅ Profile row exists with email:", email);
    }

  } catch (err) {
    console.error("Unexpected error in post-signup flow:", err);
  }
}

// Save province to user's profile
async function saveUserProfile(province) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session || !session.user) return;

  const userId = session.user.id;
  const email = session.user.email;

  const { error } = await supabase
    .from('profiles')
    .upsert(
      [{ id: userId, email, province }],
      { onConflict: 'id' }
    );

  if (error) {
    console.error("Failed to save profile:", error.message);
  } else {
    console.log("✅ User profile updated with province:", province);
  }
}

// Call function on page load
handlePostSignUp();

// Handle province form submission
document.getElementById("community-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const province = document.getElementById("province").value;

  if (!province) {
    alert("Please select a province.");
    return;
  }

  await saveUserProfile(province);

  localStorage.setItem("page5Complete", "true");
  window.location.href = "page6.html";
});
