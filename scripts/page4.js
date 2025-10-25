import { supabase } from "./utils/supabaseClient.js";

const signInForm = document.getElementById("signInForm");

// Sign-In Handler
signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const emailSignIn = document.getElementById("emailSignIn").value.trim();
  const passwordSignIn = document.getElementById("passwordSignIn").value;

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
})