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
const headerLibraryButton = document.querySelector('.library-button');
const headerWatchedButton = document.querySelector('.watched-button');
const headerQueueButton = document.querySelector('.queue-button');
const headerIconTitle = document.querySelector('.icon-title-div');
function isMobile() {
  return window.innerWidth <= 768;
}

headerLibraryButton.addEventListener('click', function (e) {
  headerQueueButton.classList.remove('is-hidden');
  headerWatchedButton.classList.remove('is-hidden');
});
function updateMargin() {
  if (!isMobile()) {
    //Reseteaza daca pagina are width mai mare de 768px
    headerIconTitle.style.marginBottom = '16px';
  }
}
headerLibraryButton.addEventListener('click', function () {
  // Check if the device is mobile
  if (isMobile()) {
    // Change the margin-bottom of the target element
    headerIconTitle.style.marginBottom = '74px'; // New margin-bottom  for mobile
  }
});

// Add a resize event listener to the window
window.addEventListener('resize', updateMargin);

updateMargin();
