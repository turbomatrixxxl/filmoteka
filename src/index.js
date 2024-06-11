//Scroll button
const scrollToTopButton = document.getElementById('scrollToTopButton');

// Show the button when the user scrolls down 100px from the top
window.onscroll = function () {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    scrollToTopButton.parentElement.style.display = 'block';
  } else {
    scrollToTopButton.parentElement.style.display = 'none';
  }
};

// Scroll to the top of the document when the button is clicked
scrollToTopButton.addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
///////////////

//Library button
const libraryButton = document.querySelector('.library-button');
const watchedButton = document.querySelector('.watched-button');
const queueButton = document.querySelector('.queue-button');
const iconTitle = document.querySelector('.icon-title-div');
function isMobile() {
  return window.innerWidth <= 768;
}

libraryButton.addEventListener('click', function (e) {
  queueButton.classList.remove('is-hidden');
  watchedButton.classList.remove('is-hidden');
});
function updateMargin() {
  if (!isMobile()) {
    //Reseteaza daca pagina are width mai mare de 768px
    iconTitle.style.marginBottom = '16px';
  }
}
libraryButton.addEventListener('click', function () {
  // Check if the device is mobile
  if (isMobile()) {
    // Change the margin-bottom of the target element
    iconTitle.style.marginBottom = '74px'; // New margin-bottom  for mobile
  }
});

// Add a resize event listener to the window
window.addEventListener('resize', updateMargin);

updateMargin();
