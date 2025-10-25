document.addEventListener('DOMContentLoaded', () => {
  const darkModeToggle = document.getElementById('darkMode');

  // Load saved theme
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    darkModeToggle.checked = true;
  }

  // Toggle dark mode
  darkModeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });

  // Logout button
  document.querySelector('.logout-btn').addEventListener('click', () => {
    alert('You have been logged out.');
  });
});
