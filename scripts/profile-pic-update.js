import { supabase } from "./utils/supabaseClient.js";
import { signedIn } from "./utils/signedIn.js";
import { getUserInfo } from "./utils/getUserInfo.js";

(async () => {
  const user = await signedIn();
  if (!user) return;

  const userInfo = await getUserInfo();
  if (!userInfo) return;

  const userId = user.currentUser.id;


  document.querySelector(".username").textContent = `${userInfo.firstname} ${userInfo.lastname}`

  const fileUpload = document.getElementById('fileUpload');
  const preview = document.getElementById('preview');
  const plus = document.getElementById('plus');
  const uploadBtn = document.getElementById('uploadBtn');

  let selectedFile = null;

  // Select file and show preview
  fileUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    selectedFile = file;

    const reader = new FileReader();
    reader.onload = (event) => {
      preview.src = event.target.result;
      preview.style.display = 'block';
      plus.style.display = 'none';
      uploadBtn.classList.add('glow');
    };
    reader.readAsDataURL(file);
  });

  // Upload button click
  uploadBtn.addEventListener('click', async () => {
    if (!selectedFile) {
      fileUpload.click(); // open file picker if no file yet
      return;
    }

    try {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${userId}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, selectedFile, { cacheControl: '3600', upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;

      // Save URL in profiles table
      const { error: updateError } = await supabase
        .from('profiles')
        .upsert([{ id: userId, avatar_url: publicUrl }], { onConflict: 'id' });

      if (updateError) throw updateError;

      alert('Profile picture uploaded successfully!');
      window.location.href = "page12.html"; // redirect to next page
    } catch (err) {
      console.error('Upload error:', err.message);
      alert('Failed to upload profile picture. Try again.');
    }
  });
})();
