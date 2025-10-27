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
      .insert([{ email }], { onConflict: 'email' });

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

// Call function on page load
handlePostSignUp();