const body = document.body;

const darkThemeButton = document.querySelector('.checkbox');

const libraryButton = document.querySelector('.header-library-button');

const headerBottomButtonsContainer = document.querySelector(
  '.header-bottom-buttons-container'
);

const headerWatchedButton = document.querySelector('.header-watched-button');

const headerClearWatchedButton = document.querySelector(
  '.header-clear-watched-button'
);

export const headerQueuedButton = document.querySelector(
  '.header-queue-button'
);

const headerClearQueuedButton = document.querySelector(
  '.header-clear-queue-button'
);

libraryButton.addEventListener('click', ev => {
  headerBottomButtonsContainer.classList.toggle('is-hidden');
});

darkThemeButton.addEventListener('click', ev => {
  var isChecked = darkThemeButton.checked;

  if (isChecked) {
    body.style.backgroundColor = 'var(--gray)';
  } else {
    body.style.backgroundColor = 'var(--white)';
  }
});

headerWatchedButton.addEventListener('click', ev => {
  headerClearWatchedButton.classList.toggle('is-hidden');
  if (headerClearQueuedButton.classList.contains('is-hidden')) {
    return;
  } else {
    headerClearQueuedButton.classList.toggle('is-hidden');
  }
});

headerQueuedButton.addEventListener('click', ev => {
  headerClearQueuedButton.classList.toggle('is-hidden');
  if (headerClearWatchedButton.classList.contains('is-hidden')) {
    return;
  } else {
    headerClearWatchedButton.classList.toggle('is-hidden');
  }
});
