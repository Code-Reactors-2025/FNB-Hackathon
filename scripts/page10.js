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


document.getElementById("next2").addEventListener("click", async (e) => {
  e.preventDefault(); // prevent default form submit

  const user = await signedIn();
  if (!user) return; // redirected if not logged in

  // collect all checked checkboxes
  const checkedBoxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked');
  const selectedGroups = Array.from(checkedBoxes).map(cb => cb.value);

  if (yesBtn.classList.contains("active") && selectedGroups.length === 0) {
    alert("Please select at least one group.");
    return;
  }

  const userId = user.currentUser.id;

  // Save groups to the 'profiles' table (array column)
  const { error } = await supabase
    .from('profiles')
    .upsert(
      [{ id: userId, community_contributions: selectedGroups }],
      { onConflict: 'id' }
    );

  if (error) {
    console.error("Failed to save groups:", error.message);
  } else {
    console.log("✅ Groups saved:", selectedGroups);
    // Redirect to next page
    window.location.href = "page11.html";
  }

  
});



