document.getElementById('community-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const province = document.getElementById('province').value;
  if (province) {
    alert(`You selected: ${province}`);
    window.location.href = "page6.html";
  } else {
    alert('Please select a province before proceeding.');
  }
});





// Initialize Supabase client
const supabaseUrl = 'https://fvvjlaedmftclupcaeph.supabase.co';
const supabaseKey = 'YOUR_PUBLIC_ANON_KEY'; // never use service role here
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

async function registerEmailAfterVerification() {
  // Step 1: Check if user is authenticated
  const { data: { user }, error } = await supabaseClient.auth.getUser();

  if (error || !user) {
    console.warn("User not authenticated yet, waiting for verification...");
    // Try again after a short delay (Supabase may take a second to load session)
    setTimeout(registerEmailAfterVerification, 3000);
    return;
  }

  // Step 2: Add email to table
  const email = user.email;
  const { error: insertError } = await supabaseClient
    .from('user_emails')
    .insert([{ email }]);

  if (insertError) {
    if (insertError.code === "23505") {
      console.log("Email already exists — skipping insert.");
    } else {
      console.error("Insert failed:", insertError.message);
    }
    return;
  }

  console.log("✅ Email successfully registered:", email);
}

registerEmailAfterVerification();




























// // Initialize Supabase client
// const supabaseUrl = 'https://fvvjlaedmftclupcaeph.supabase.co';
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2dmpsYWVkbWZ0Y2x1cGNhZXBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzMzU5NjIsImV4cCI6MjA3NjkxMTk2Mn0.Hxdw3BXV3DNoYUt0fY6gXdL4q-o4XnMLb7ACT4R5utQ';
// const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);


// const emailSignUp = localStorage.getItem("signUpEmail");

// async function registerEmail(email) {
//   // 🆕 Step 2: Insert new email if not found
//   const { error: insertError } = await supabaseClient
//     .from('user_emails')
//     .insert([{ email }]);

//   if (insertError) {
//     console.error('Error adding email:', insertError.message);

//     // !Remove alert
//     alert('Failed to register email.');
//     return false;
//   }

//   // ! Remove alert
//   alert('Email registered successfully!');
//   return true;
// }

// registerEmail(emailSignUp);
