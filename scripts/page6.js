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