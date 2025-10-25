import { supabase } from "./utils/supabaseClient.js";
import { signedIn } from "./utils/signedIn.js";

(async () => {
  const user = await signedIn();
  if (!user) return; // redirected if not logged in
  
  console.log("Welcome, ", user.currentUser.email);
})();


const next1 = document.getElementById('next1');
        const interests = document.querySelectorAll('.interest');

        interests.forEach(cb => {
        cb.addEventListener('change', () => {
            const checked = [...interests].some(box => box.checked);
            next1.classList.toggle('active', checked);
            next1.disabled = !checked;
        });
        });

        next1.addEventListener('click', () => {
        window.location.href = "page10.html"; 
        });
