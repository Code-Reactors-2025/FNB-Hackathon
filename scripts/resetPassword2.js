import { supabase } from "./utils/supabaseClient.js";




// document.getElementById("resetPasswordBtn").addEventListener("click", async () => {
//   const newPassword = document.getElementById("newPassword").value.trim();
//   if (!newPassword) return alert("Enter a new password.");

//   const { data, error } = await supabase.auth.updateUser({
//     password: newPassword
//   });

//   if (error) {
//     console.error("Password update failed:", error.message);
//     alert("Error updating password: " + error.message);
//   } else {
//     alert("Password updated successfully! You can now log in.");
//     window.location.href = "page4.html"; // back to login
//   }
// });










// This reads the URL hash to extract the access token from Supabase recovery link
async function initRecoverySession() {
  const hash = window.location.hash.substring(1); // remove the '#' character
  const params = new URLSearchParams(hash);
  const access_token = params.get("access_token");
  const type = params.get("type");

  if (type !== "recovery" || !access_token) {
    alert("Invalid or expired recovery link.");
    return false;
  }

  // Set session with the access token from the link
  const { data, error } = await supabase.auth.setSession({
    access_token: access_token,
  });

  if (error) {
    console.error("Failed to set recovery session:", error.message);
    alert("Failed to initialize password reset session.");
    return false;
  }

  return true;
}

// Initialize session on page load
const sessionReady = await initRecoverySession();

if (sessionReady) {
  document.getElementById("resetPasswordBtn").addEventListener("click", async () => {
    const newPassword = document.getElementById("newPassword").value.trim();
    if (!newPassword) return alert("Enter a new password.");

    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      console.error("Password update failed:", error.message);
      alert("Error updating password: " + error.message);
    } else {
      alert("Password updated successfully! You can now log in.");
      window.location.href = "page4.html"; // redirect to login
    }
  });
}

