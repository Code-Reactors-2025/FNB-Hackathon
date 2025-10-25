document.getElementById('signinForm').addEventListener('submit', function(e) {
  e.preventDefault(); 

  const name = document.getElementById('name').value;
  const password = document.getElementById('password').value;

  if (name && password) {
    alert(`Welcome, ${name}! Your account has been signed in.`);
    window.location.href = "page5.html";
  }
});