import { supabase } from "./utils/supabaseClient.js";

const signInForm = document.getElementById("signInForm");




async function checkEmail(email) {
  const { data: existing, error: selectError } = await supabaseClient
    .from('user_emails')
    .select('*')
    .eq('email', email)
    .maybeSingle();

  if (selectError) {
    console.error('Error checking email:', selectError.message);
    alert('Error checking email');
    return true; // stop the flow
  }

  if (existing) {
    alert('This email is already registered. Please sign in.');
    window.location.href = "https://code-reactors-2025.github.io/FNB-Hackathon/page4.html";
    return true; // stop the flow
  } else {
    alert("This email is not registered. Please Sign Up instead");
    window.location.href = "page3.html"
  }

  return false; // safe to continue
}

// Sign-In Handler
signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const emailSignIn = document.getElementById("emailSignIn").value.trim();
  const passwordSignIn = document.getElementById("passwordSignIn").value;


  const ok = await checkEmail(emailSignIn);

  if (ok) return;

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: emailSignIn,
      password: passwordSignIn,
    });

    if (error) {
      alert(`Error: ${error.message}`);
      return;
    }

    alert(`Sign-in successful! Welcome back.`);
    window.location.href = "page11.html"
  } catch (err) {
    console.error(err);
    alert("Sign-in failed. Check console for details.")
  }

  localStorage.setItem("userExists", "true");
})