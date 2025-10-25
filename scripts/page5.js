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