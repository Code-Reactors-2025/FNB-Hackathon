import { supabase } from "./utils/supabaseClient.js";
import { signedIn } from "./utils/signedIn.js";

(async () => {
  const user = await signedIn();
  if (!user) return; // redirected if not logged in
  
  console.log("Welcome, ", user.currentUser.email);
})();




document.getElementById('group-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const group = document.getElementById('group').value;
  if (group) {
    alert(`You selected: ${group}`);
    window.location.href = "page7.html";
  } else {
    alert('Please select a group before proceeding.');
  }
});





