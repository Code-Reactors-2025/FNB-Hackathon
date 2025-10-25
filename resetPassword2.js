import { supabase } from "./utils/supabaseClient.js";




function isValidPassword(password) {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
  return regex.test(password);
}

document.getElementById("resetPasswordBtn").addEventListener("click", async () => {
  const newPassword = document.getElementById("newPassword").value.trim();
  if (!newPassword) return alert("Enter a new password.");

  if (!isValidPassword(newPassword)) {
    alert(
      "Password must be at least 8 characters long, include at least one uppercase letter, one number, and one special character."
    );
    return;
  }


  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  });

  if (error) {
    console.error("Password update failed:", error.message);
    alert("Error updating password: " + error.message);
  } else {
    alert("Password updated successfully! You can now log in.");
    window.location.href = "page4.html"; // back to login
  }
});







