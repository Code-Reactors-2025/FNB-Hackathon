import { supabase } from "./utils/supabaseClient.js";

const confirmEmail = document.getElementById("confirmEmail");

confirmEmail?.addEventListener("click", async () => {
  const email = document.getElementById("emailResetPassword").value.trim();
  if (!email) return alert("Please enter your email.");

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://code-reactors-2025.github.io/FNB-Hackathon/resetPassword2.html' // <-- page where user sets new password
  });

  if (error) {
    console.error("Error sending password reset:", error.message);
    alert("Error sending reset email: " + error.message);
  } else {
    alert("Password reset email sent! Check your inbox.");
  }
});