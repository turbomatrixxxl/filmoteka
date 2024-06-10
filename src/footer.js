const openButton = document.querySelector('.footer-modal-button');
const closeButton = document.querySelector('.footer-close-button');
const modal = document.querySelector('.modal');

openButton.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', e => {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
});
