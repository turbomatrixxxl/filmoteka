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
