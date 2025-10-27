import { supabase } from "./utils/supabaseClient.js";
import { signedIn } from "./utils/signedIn.js";

(async () => {
  const user = await signedIn();
  if (!user) return; // redirected if not logged in
  
  console.log("Welcome, ", user.currentUser.email);
})();




async function checkEmail(email) {
  const { data: existing, error: selectError } = await supabase
    .from('user_emails')
    .select('*')
    .eq('email', email)
    .maybeSingle();

  if (selectError) {
    console.error('Error checking email:', selectError.message);
    alert('Error checking email');
    return true; // stop the flow
  }

  if (!existing) {
    // alert('This email is already registered. Please sign in.');
    // window.location.href = "https://code-reactors-2025.github.io/FNB-Hackathon/page4.html";
    // return true; // stop the flow
    return;
  } 

  return false; // safe to continue
}







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

    const notOk = await checkEmail(email);

    if (notOk) return;

    // Step 2: Insert email into user_emails table if not exists
    const { error: insertError } = await supabaseClient
      .from('user_emails')
      .insert([{ email }]);

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