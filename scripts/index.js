import { supabase } from "./utils/supabaseClient.js";
import { signedIn } from "./utils/signedIn.js";


const userExists = localStorage.getItem("userExists");

if (userExists === "true") {
  (async () => {
  const user = await signedIn();
  if (!user) return; // redirected if not logged in
  
  console.log("Welcome, ", user.currentUser.email);
})();
} 




function startApp() {
      window.location.href = "page2.html";
}


