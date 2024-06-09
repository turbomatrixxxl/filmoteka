//PAGE CHANGER
document.addEventListener('DOMContentLoaded', function () {
  const paginationSection = document.querySelector('.pagination-section');
  const paginationBtns = paginationSection.querySelectorAll(
    '.pagination-btns li'
  );
  const paginationNumbers = paginationSection.querySelectorAll(
    '.pagination-btns li.page'
  );
  const prevButton = paginationSection.querySelector('.page-btn.prev');
  const nextButton = paginationSection.querySelector('.page-btn.next');
  let currentPage = 1;
  let totalPages = Math.ceil(paginationNumbers.length / 5);

  // Add event listeners to page numbers
  paginationNumbers.forEach(btn => {
    btn.addEventListener('click', event => {
      console.log('Page number clicked:', event.target.textContent);
      currentPage = parseInt(event.target.textContent, 10);
      updatePagination();
    });
  });

  // Add event listeners to next/prev buttons
  prevButton.addEventListener('click', event => {
    console.log('Prev button clicked');
    if (currentPage > 1) {
      currentPage -= 1;
    }
    updatePagination();
  });

  nextButton.addEventListener('click', event => {
    console.log('Next button clicked');
    if (currentPage < totalPages) {
      currentPage += 1;
    }
    updatePagination();
  });

  function updatePagination() {
    console.log('Current page:', currentPage);
    console.log('Total pages:', totalPages);
    // Hide all page numbers and then show them again
    paginationNumbers.forEach(page => {
      page.classList.add('is-hidden');
    });
    paginationNumbers.forEach(page => {
      if (page.classList.contains('page')) {
        page.classList.remove('is-hidden');
      }
    });

    // Update the active class
    paginationNumbers.forEach(page => {
      page.classList.remove('active');
      if (parseInt(page.textContent, 10) === currentPage) {
        page.classList.add('active');
      }
    });

    // Show the dots
    const dots = paginationSection.querySelector('.pagination-btns li.dots');
    if (dots) {
      dots.classList.toggle('is-hidden', false);
    }
  }
});
