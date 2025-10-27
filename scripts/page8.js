import { supabase } from "./utils/supabaseClient.js";
import { signedIn } from "./utils/signedIn.js";


(async () => {
  const user = await signedIn();
  if (!user) return; // redirected if not logged in

  console.log("Welcome,", user.currentUser.email);

  const userId = user.currentUser.id;

  const fileUpload = document.getElementById('fileUpload');
  const preview = document.getElementById('preview');
  const plus = document.getElementById('plus');
  const uploadBtn = document.getElementById('uploadBtn');
  const nextBtn = document.getElementById('nextBtn');
  const skipBtn = document.getElementById('skipBtn');

  let selectedFile = null;


  // When a file is selected, show preview
  fileUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      selectedFile = file;
      const reader = new FileReader();
      reader.onload = (event) => {
        preview.src = event.target.result;
        preview.style.display = 'block';
        plus.style.display = 'none';
        nextBtn.style.display = 'inline-block';
        nextBtn.classList.add('glow');
      };
      reader.readAsDataURL(file);
    }
  });

  // Skip → go to next page
  skipBtn.addEventListener('click', () => {
    window.location.href = "page9.html";
  });

  // Upload file and save URL to DB
  nextBtn.addEventListener('click', async () => {
    if (!selectedFile) {
      window.location.href = "page9.html";
      return;
    }

    try {
      // Create a unique filename
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${userId}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload to Supabase Storage (create a bucket named "avatars" first!)
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, selectedFile, {
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadError) throw uploadError;

      console.log("Current auth.uid:", user.currentUser.id);


      // Get a public URL
      const { data: publicUrlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;

      // Save to user profile
      const { error: updateError } = await supabase
        .from('profiles')
        .upsert(
          [{ id: userId, avatar_url: publicUrl }],
          { onConflict: 'id' }
        );

      if (updateError) throw updateError;

      console.log("✅ Profile picture saved:", publicUrl);

      // Go to next page
      window.location.href = "page9.html";
    } catch (err) {
      console.error("❌ Error uploading profile picture:", err.message);
      alert("Failed to upload image. Please try again.");
    }
  });
})();





