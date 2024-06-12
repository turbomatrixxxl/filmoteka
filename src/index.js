// FOOTER MODAL
const footerOpenButton = document.querySelector('.footer-modal-button');
const footerCloseButton = document.querySelector('.footer-close-button');
const modal = document.querySelector('.modal');

footerOpenButton.addEventListener('click', () => {
  modal.style.display = 'block';
});

footerCloseButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', e => {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
});
