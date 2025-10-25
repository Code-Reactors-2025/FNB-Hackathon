const bentoGrid = document.getElementById('bentoGrid');
const addTile = document.getElementById('addTile');

// ADD NEW SECTION
addTile.addEventListener('click', () => {
  const title = prompt("Enter category title:");
  const desc = prompt("Enter description for this section:");
  if (title) {
    const newItem = document.createElement('div');
    newItem.classList.add('grid-item', 'category');
    newItem.innerHTML = `
      <h3>${title}</h3>
      <p>${desc || 'No description provided.'}</p>
      <button class="delete-btn"><i class='bx bx-trash'></i></button>
    `;
    bentoGrid.insertBefore(newItem, addTile);
    attachDeleteHandler(newItem);
  }
});

// DELETE SECTION
function attachDeleteHandler(item) {
  const delBtn = item.querySelector('.delete-btn');
  delBtn.addEventListener('click', () => {
    item.remove();
  });
}

// Attach to initial tiles
document.querySelectorAll('.category').forEach(attachDeleteHandler);
