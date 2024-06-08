//PAGE CHANGER
document.addEventListener('DOMContentLoaded', function () {
  const paginationSection = document.querySelector('.pagination-section');
  const pageBtns = paginationSection.querySelectorAll('.page-btn');
  const paginationBtns = paginationSection.querySelectorAll(
    '.pagination-btns li'
  );
  const currentPage = 1;

  pageBtns.forEach(btn => {
    btn.addEventListener('click', event => {
      if (event.target.classList.contains('prev')) {
        currentPage -= 1;
        if (currentPage < 1) {
          currentPage = 1;
        }
      } else if (event.target.classList.contains('next')) {
        currentPage += 1;
        if (currentPage > paginationBtns.length - 2) {
          currentPage = paginationBtns.length - 2;
        }
      }
      updatePagination();
    });
  });

  function updatePagination() {
    const currentPageElement = paginationSection.querySelector(
      '.pagination-btns li.active'
    );
    const prevPageElement = paginationSection.querySelector(
      '.pagination-btns li.page:nth-child(' + (currentPage - 1) + ')'
    );
    const nextPageElement = paginationSection.querySelector(
      '.pagination-btns li.page:nth-child(' + (currentPage + 1) + ')'
    );

    if (currentPageElement !== null) {
      currentPageElement.classList.remove('active');
    }
    if (prevPageElement !== null) {
      prevPageElement.classList.remove('is-hidden');
      prevPageElement.classList.add('active');
    }
    if (nextPageElement !== null) {
      nextPageElement.classList.remove('active');
      nextPageElement.classList.add('is-hidden');
    }

    const firstVisiblePage = Math.max(1, currentPage - 2);
    const lastVisiblePage = Math.min(
      paginationBtns.length - 2,
      currentPage + 2
    );

    for (let i = firstVisiblePage; i <= lastVisiblePage; i++) {
      const page = paginationSection.querySelector(
        '.pagination-btns li.page:nth-child(' + i + ')'
      );
      page.classList.toggle('is-hidden', !page.classList.contains('page'));
    }

    const dots = paginationSection.querySelector('.pagination-btns li.dots');
    dots.classList.toggle(
      'is-hidden',
      !(
        (currentPage > firstVisiblePage && currentPage < lastVisiblePage) ||
        (currentPage === firstVisiblePage && firstVisiblePage > 1)
      )
    );
  }
});
