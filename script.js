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
    window.location.href = "page5.html";
  }
});

document.getElementById('signinForm').addEventListener('submit', function(e) {
  e.preventDefault(); 

  const name = document.getElementById('name').value;
  const password = document.getElementById('password').value;

  if (name && password) {
    alert(`Welcome, ${name}! Your account has been signed in.`);
    window.location.href = "page5.html";
  }
});

document.getElementById('community-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const province = document.getElementById('province').value;
  if (province) {
    alert(`You selected: ${province}`);
    window.location.href = "page6.html";
  } else {
    alert('Please select a province before proceeding.');
  }
});

document.getElementById('group-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const group = document.getElementById('group').value;
  if (group) {
    alert(`You selected: ${group}`);
    window.location.href = "page7.html";
  } else {
    alert('Please select a group before proceeding.');
  }
});

document.getElementById('yesBtn').addEventListener('click', () => {
  localStorage.setItem('communityUpdates', 'yes');
  highlightSelection('yesBtn');
});

document.getElementById('noBtn').addEventListener('click', () => {
  localStorage.setItem('communityUpdates', 'no');
  highlightSelection('noBtn');
});

document.getElementById('nextBtn').addEventListener('click', () => {
  const choice = localStorage.getItem('communityUpdates');
  if (choice) {
    console.log(`User selected: ${choice}`);
    window.location.href = 'page8.html'; // or your next page
  } else {
    alert('Please select Yes or No before proceeding.');
  }
});

function highlightSelection(selectedId) {
  document.getElementById('yesBtn').classList.remove('selected');
  document.getElementById('noBtn').classList.remove('selected');
  document.getElementById(selectedId).classList.add('selected');
}


