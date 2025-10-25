// Initialize Supabase client
const supabaseUrl = 'https://fvvjlaedmftclupcaeph.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2dmpsYWVkbWZ0Y2x1cGNhZXBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzMzU5NjIsImV4cCI6MjA3NjkxMTk2Mn0.Hxdw3BXV3DNoYUt0fY6gXdL4q-o4XnMLb7ACT4R5utQ';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

async function handlePostSignUp() {
  try {
    // Step 1: Get current session (after email verification)
    const { data: { session }, error: sessionError } = await supabaseClient.auth.getSession();

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