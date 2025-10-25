import { supabase } from "./utils/supabaseClient.js";
import { signedIn } from "./utils/signedIn.js";

(async () => {
  const user = await signedIn();
  if (!user) return; // redirected if not logged in
  
  console.log("Welcome, ", user.currentUser.email);
})();


/*================ page 7 ============*/
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');

if (noBtn && yesBtn) {
  noBtn.addEventListener('click', () => {
    localStorage.setItem('communityUpdates', 'no');
    noBtn.classList.add('selected');
    yesBtn.classList.remove('selected');
    window.location.href = 'page8.html';
  });

  yesBtn.addEventListener('click', () => {
    localStorage.setItem('communityUpdates', 'yes');
    yesBtn.classList.add('selected');
    noBtn.classList.remove('selected');
    window.location.href = 'page8.html';
  });
}
