import { supabase } from "./utils/supabaseClient.js";
import { signedIn } from "./utils/signedIn.js";

(async () => {
  const user = await signedIn();
  if (!user) return; // redirected if not logged in
  
  console.log("Welcome, ", user.currentUser.email);
})();


const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const extraOptions = document.getElementById('extraOptions');
    const next2 = document.getElementById('next2');
    const contributeBoxes = document.querySelectorAll('.contribute');

    yesBtn.addEventListener('click', () => {
    yesBtn.classList.add('active');
    noBtn.classList.remove('active');
    extraOptions.style.display = 'block';
    });

    noBtn.addEventListener('click', () => {
    noBtn.classList.add('active');
    yesBtn.classList.remove('active');
    extraOptions.style.display = 'none';
    next2.classList.add('active');
    next2.disabled = false;
    });

    contributeBoxes.forEach(cb => {
    cb.addEventListener('change', () => {
        const checked = [...contributeBoxes].some(box => box.checked);
        next2.classList.toggle('active', checked);
        next2.disabled = !checked;
    });
    });

    next2.addEventListener('click', () => {
    alert("Form complete! (Next steps go here)");
     window.location.href = "page11.html";
    });