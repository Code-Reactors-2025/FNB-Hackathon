 const fileUpload = document.getElementById('fileUpload');
        const preview = document.getElementById('preview');
        const plus = document.getElementById('plus');
        const uploadBtn = document.getElementById('uploadBtn');
        const nextBtn = document.getElementById('nextBtn');
        const skipBtn = document.getElementById('skipBtn');

        
        uploadBtn.addEventListener('click', () => fileUpload.click());

        
        fileUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
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

        
        skipBtn.addEventListener('click', () => {
        alert('Skipped! Proceeding to next page...');
        window.location.href = ""; 
        });

        
        nextBtn.addEventListener('click', () => {
        if (preview.src && preview.style.display === 'block') {
            alert('Profile picture uploaded! Proceeding to next page...');
        } else {
            alert('Proceeding without a profile picture...');
        }
        window.location.href = "#"; 
        });