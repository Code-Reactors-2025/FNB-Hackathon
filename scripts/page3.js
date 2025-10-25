// Initialize Supabase client
const supabaseUrl = 'https://fvvjlaedmftclupcaeph.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2dmpsYWVkbWZ0Y2x1cGNhZXBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzMzU5NjIsImV4cCI6MjA3NjkxMTk2Mn0.Hxdw3BXV3DNoYUt0fY6gXdL4q-o4XnMLb7ACT4R5utQ';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);



// Password Validation Function
function isValidPassword(password) {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
  return regex.test(password);
}

async function checkEmail(email) {
  // 🔍 Step 1: Check if email exists
  const { data: existing, error: selectError } = await supabaseClient
    .from('user_emails')
    .select('*')
    .eq('email', email)
    .maybeSingle();

  if (selectError) {
    console.error('Error checking email:', selectError.message);
    alert('Error checking email');
    return false;
  }

  if (existing) {
    alert('This email is already registered. Please sign in.');
    return false; // stop here
  }
}






// Sign-Up Handler
document.getElementById('signUpForm').addEventListener('submit', async (e) => {
  e.preventDefault(); 

  const firstname = document.getElementById('firstname').value.trim();
  const lastname = document.getElementById('lastname').value.trim();
  const emailSignUp = document.getElementById('emailSignUp').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const passwordSignUp = document.getElementById('passwordSignUp').value;

  if (!isValidPassword(passwordSignUp)) {
    alert(
      "Password must be at least 8 characters long, include at least one uppercase letter, one number, and one special character."
    );
    return;
  }

  localStorage.setItem("signUpEmail", emailSignUp);

  const notOk = await checkEmail(emailSignUp);

  if (notOk) return;

  try {
    const { data, error } = await supabaseClient.auth.signUp({
      email: emailSignUp,
      password: passwordSignUp,
      options: {
        data: { firstname, lastname, phone },
        emailRedirectTo: 'https://code-reactors-2025.github.io/FNB-Hackathon/page5.html' // <-- after they verify
      }
    });

  if (error) {
  if (error.message.includes("User already registered")) {
    alert("You already have an account. Please log in instead.");
  } else {
    alert("Sign up failed: " + error.message);
  }
  return;
}

// Extra check: if no user object is returned, treat as already registered
if (!data.user) {
  // alert("You already have an account. Please log in instead.");
  return;
}

// Otherwise, success
alert("Sign-up successful! Please check your email for confirmation.");
signUpForm.reset();
    
  } catch (err) {
    console.error(err);
    // alert("Sign-up failed. Check console for details.")
  }

  
});

