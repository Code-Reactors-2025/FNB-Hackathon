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
