     function startApp() {
        window.location.href = "page2.html";
  }

  function goNext() {
  window.location.href = "page3.html";
}

document.getElementById('signupForm').addEventListener('submit', function(e) {
  e.preventDefault(); 

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  if (name && email) {
    alert(`Welcome, ${name}! Your account has been created.`);
    window.location.href = "page4.html";
  }
});
