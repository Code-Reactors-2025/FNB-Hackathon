import { supabase } from "./utils/supabaseClient.js";
import { signedIn } from "./utils/signedIn.js";

(async () => {
  const user = await signedIn();
  if (!user) return; // redirected if not logged in
  
  console.log("Welcome, ", user.currentUser.email);
})();


document.getElementById('skipBtn').addEventListener('click', () => {
  window.location.href = 'page9.html';
});

document.getElementById('nextBtn').addEventListener('click', () => {
  window.location.href = 'page9.html';
});
