// function navigateTo(path) {
//   // Add a new entry to the history and update the URL
//   history.pushState(null, null, path);
//   // Update the content dynamically based on the selected path
//   updateContent('./index.html');
// }

window.addEventListener('keyup', event => {
  if (event.key === 'Escape') {
    if (modalWindow.classList.contains('is-hidden')) {
      return;
    }
    modalWindow.classList.add('is-hidden');
  }
});

// Local storage functions
const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const remove = key => {
  try {
    const serializedState = localStorage.removeItem(key);
    return serializedState === null
      ? undefined
      : JSON.stringify(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

// HEADER
// Descris în documentație
// import SimpleLightbox from 'simplelightbox';
// // Import suplimentar de stil
// import 'simplelightbox/dist/simple-lightbox.min.css';

// import axios from 'axios';

var _ = require('lodash');

const fetch = require('node-fetch');

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

const headerQueuedButton = document.querySelector('.header-queue-button');

const headerClearQueuedButton = document.querySelector(
  '.header-clear-queue-button'
);

const headerInput = document.querySelector('.search-form-input');
// console.log(headerInput);

let searchText = null;

// searchText = headerInput.value.replace(/ /g, '%20');
// console.log(searchText);

const headerSearchBtn = document.querySelector('.search-form-button');
// console.log(headerSearchBtn);

const headerFormErrorMessage = document.querySelector('.header__error');

let page = 1;

const heroList = document.querySelector('.gallery');

const noImageUrl =
  'https://lascrucesfilmfest.com/wp-content/uploads/2018/01/no-poster-available.jpg';

// const url =
//   `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`;

// const url =
//   `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`;

// const url = 'https://api.themoviedb.org/3/keyword/keyword_id';

const trendingMoviesUrl = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${page}`;

const genresApiUrl = `https://api.themoviedb.org/3/genre/movie/list?language=en&page=${page}`;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDA4MGZmMTg0Y2FiZWJkZjFiNDJlYWE4OGZiNTczOCIsInN1YiI6IjY2NjAyNTUwN2MwMjgyZWYzMDRmNjAxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-GiosJEhvb8JZPRVsDWYKnyMuBuXM_jJXaHMa3NkslY',
  },
};

// modal const
const modalWindow = document.querySelector('.modal-window');
console.log(modalWindow);
const modalImage = document.querySelector('.modal-img');
// console.log(modalImage.getAttribute('src'));
const modalTitle = document.querySelector('.modal-title');
const modalVote = document.querySelector('.modal-vote');
const modalVotes = document.querySelector('.modal-votes');
const modalPopularity = document.querySelector('.modal-popularity-result');
const modalOrigTitle = document.querySelector('.modal-original-title-result');
const modalGenre = document.querySelector('.modal-genre-result');
const modalDescription = document.querySelector('.modal-movie-description');
const modalCloseBtn = document.querySelector('.modal-close-button');
modalCloseBtn.addEventListener('click', () => {
  modalWindow.classList.toggle('is-hidden');
});

function isHidden(params) {
  params.classList.add('is-hidden');
}

function remHidden(params) {
  params.classList.remove('is-hidden');
}

function addRemButtons(params, id, addBtn, remBtn) {
  let status = load(`${params}`);
  console.log(status);
  if (status.includes(id)) {
    isHidden(addBtn);
    remHidden(remBtn);
  } else {
    isHidden(remBtn);
    remHidden(addBtn);
  }
}

// Watch buttons
// remove('watched');
// remove('queued');
const modalAddToWatchBtn = document.querySelector('.modal-add-to-watched-btn');
const modalRemFromWatchBtn = document.querySelector('.remove-from-watched');

isHidden(modalRemFromWatchBtn);

modalAddToWatchBtn.addEventListener('click', ev => {
  let id = modalImage.getAttribute('id');
  // console.log(id);

  let watched = load('watched');
  // console.log(watched);

  if (watched === undefined || watched.length === 0) {
    save('watched', [id]);
  } else {
    const tru = watched.includes(id);

    if (!tru) {
      watched.push(id);
      save('watched', watched);
      // console.log('it dont has');
    } else {
      console.log('it has');
    }
  }

  isHidden(modalAddToWatchBtn);
  remHidden(modalRemFromWatchBtn);
});

modalRemFromWatchBtn.addEventListener('click', ev => {
  let id = modalImage.getAttribute('id');
  // console.log(id);

  let watched = load('watched');
  // console.log(watched);

  let watchedd = watched.filter(x => x !== id);
  // console.log(watchedd);

  save('watched', watchedd);

  isHidden(modalRemFromWatchBtn);
  remHidden(modalAddToWatchBtn);
});

// Queue buttons
const modalAddToQueueBtn = document.querySelector('.modal-add-to-queue-btn');
const modalRemFromQueueBtn = document.querySelector('.remove-from-queue-btn');

isHidden(modalRemFromQueueBtn);

modalAddToQueueBtn.addEventListener('click', ev => {
  let id = modalImage.getAttribute('id');
  console.log(id);

  let queued = load('queued');
  console.log(queued);

  if (queued === undefined || queued.length === 0) {
    save('queued', [id]);
  } else {
    const tru = queued.includes(id);

    if (!tru) {
      queued.push(id);
      console.log(queued);
      save('queued', queued);
      console.log('it dont has');
    } else {
      console.log('it has');
    }
  }

  isHidden(modalAddToQueueBtn);
  remHidden(modalRemFromQueueBtn);
});

modalRemFromQueueBtn.addEventListener('click', ev => {
  let id = modalImage.getAttribute('id');
  console.log(id);

  let queued = load('queued');
  console.log(queued);

  let queuedd = queued.filter(x => x !== id);
  console.log(queuedd);
  save('queued', queuedd);

  isHidden(modalRemFromQueueBtn);
  remHidden(modalAddToQueueBtn);
});

headerSearchBtn.addEventListener('click', ev => {
  ev.preventDefault();

  headerSearchBtn.disabled = true;
  console.log(headerInput.value);

  headerInput.addEventListener('change', ev => {
    headerSearchBtn.disabled = false;
    console.log('change');
  });

  headerInput.addEventListener('input', ev => {
    if (headerInput.value.length === 0) {
      headerFormErrorMessage.style.display = 'none';
    }
    return;
  });

  searchText = headerInput.value.replace(/ /g, '%20');
  // console.log(searchText);

  let findUrl = `https://api.themoviedb.org/3/search/movie?query=${searchText}&include_adult=true&language=en-US&page=${page}`;
  // console.log(findUrl);

  heroList.innerHTML = null;

  fetch(findUrl, options)
    .then(res => res.json())
    .then(res => {
      // console.log(findUrl);
      console.log(res);
      console.log(res.results);
      const movies = res.results;
      if (movies.length === 0) {
        headerFormErrorMessage.style.display = 'block';

        fetch(trendingMoviesUrl, options)
          .then(res => res.json())
          .then(res => {
            // console.log(res);
            // console.log(res.results);
            const movies = res.results;
            movies.map(element => {
              renderCards(element);
            });

            const heroImagesLink =
              document.querySelectorAll('.hero-cards-link');
            // console.log(heroImagesLink);

            heroImagesLink.forEach(link => {
              const linkImage = link.querySelector('.hero-cards-image');
              // console.log(linkImage);

              link.addEventListener('click', ev => {
                ev.preventDefault();

                // console.log(ev.target);
                const currentLink = ev.currentTarget;
                console.log(currentLink);

                const linkSrc = currentLink.href;
                // console.log(linkSrc);
                modalImage.setAttribute('src', linkSrc);

                const linkId = currentLink.getAttribute('id');
                modalImage.setAttribute('id', linkId);

                addRemButtons(
                  'queued',
                  linkId,
                  modalAddToQueueBtn,
                  modalRemFromQueueBtn
                );

                addRemButtons(
                  'watched',
                  linkId,
                  modalAddToWatchBtn,
                  modalRemFromWatchBtn
                );

                const linkTitle = currentLink.getAttribute('title');
                // console.log(linkTitle);
                modalTitle.textContent = linkTitle;

                const linkVote = currentLink.getAttribute('vote');
                // console.log(linkVote);
                modalVote.textContent = linkVote;

                const linkVotes = currentLink.getAttribute('votes');
                // console.log(linkVotes);
                modalVotes.textContent = linkVotes;

                const linkPopurarity = currentLink.getAttribute('popularity');
                // console.log(linkPopurarity);
                modalPopularity.textContent = linkPopurarity;

                const linkOrigTitle =
                  currentLink.getAttribute('original_title');
                // console.log(linkOrigTitle);
                modalOrigTitle.textContent = linkOrigTitle;

                const linkDescription = currentLink.getAttribute('description');
                // console.log(linkDescription);
                modalDescription.textContent = linkDescription;

                const genres = currentLink.getAttribute('genres');
                // console.log(genres);
                modalGenre.textContent = genres;

                modalWindow.classList.toggle('is-hidden');

                // heroModalCloseBtn.addEventListener('click', () => {
                //   heroModalCardContainer.classList.toggle('is-hidden');
                // });

                // console.log(linkImage.src);
                // console.log(link.href);

                // linkImage.src = link.href;

                // setting the modal window gallery using the SimpleLightbox library and adding "alt" caption title on bottom with 250 ms delay
                // let gallery = new SimpleLightbox(`.gallery a`, {
                //   captionsData: 'src',
                //   captionDelay: 250,
                //   captionPosition: 'outside',
                //   alertError: false,
                //   captionHTML: false,
                // });
                // console.dir(gallery);
                // console.log(gallery.elements);
                // console.log(gallery.options);
              });
            });
          })
          .catch(err => console.error('error:' + err));
      } else {
        headerFormErrorMessage.style.display = 'none';
      }

      movies.map(element => {
        renderCards(element);
      });

      const heroImagesLink = document.querySelectorAll('.hero-cards-link');
      // console.log(heroImagesLink);

      heroImagesLink.forEach(link => {
        // const linkImage = link.querySelector('.hero-cards-image');
        // console.log(linkImage);

        link.addEventListener('click', ev => {
          ev.preventDefault();

          // console.log(ev.target);
          const currentLink = ev.currentTarget;
          console.log(currentLink);

          const linkId = currentLink.getAttribute('id');
          modalImage.setAttribute('id', linkId);

          addRemButtons(
            'queued',
            linkId,
            modalAddToQueueBtn,
            modalRemFromQueueBtn
          );

          addRemButtons(
            'watched',
            linkId,
            modalAddToWatchBtn,
            modalRemFromWatchBtn
          );

          if (currentLink.href === noImageUrl) {
            modalImage.setAttribute('src', noImageUrl);

            const linkTitle = currentLink.getAttribute('title');
            // console.log(linkTitle);
            modalTitle.textContent = linkTitle;

            const linkVote = currentLink.getAttribute('vote');
            // console.log(linkVote);
            modalVote.textContent = linkVote;

            const linkVotes = currentLink.getAttribute('votes');
            // console.log(linkVotes);
            modalVotes.textContent = linkVotes;

            const linkPopurarity = currentLink.getAttribute('popularity');
            // console.log(linkPopurarity);
            modalPopularity.textContent = linkPopurarity;

            const linkOrigTitle = currentLink.getAttribute('original_title');
            // console.log(linkOrigTitle);
            modalOrigTitle.textContent = linkOrigTitle;

            const linkDescription = currentLink.getAttribute('description');
            // console.log(linkDescription);
            modalDescription.textContent = linkDescription;

            const genres = currentLink.getAttribute('genres');
            // console.log(genres);
            modalGenre.textContent = genres;

            modalWindow.classList.remove('is-hidden');
          } else {
            const linkSrc = currentLink.href;
            // console.log(linkSrc);
            modalImage.setAttribute('src', linkSrc);

            const linkId = currentLink.getAttribute('id');
            modalImage.setAttribute('id', linkId);

            addRemButtons(
              'queued',
              linkId,
              modalAddToQueueBtn,
              modalRemFromQueueBtn
            );

            addRemButtons(
              'watched',
              linkId,
              modalAddToWatchBtn,
              modalRemFromWatchBtn
            );

            const linkTitle = currentLink.getAttribute('title');
            // console.log(linkTitle);
            modalTitle.textContent = linkTitle;

            const linkVote = currentLink.getAttribute('vote');
            // console.log(linkVote);
            modalVote.textContent = linkVote;

            const linkVotes = currentLink.getAttribute('votes');
            // console.log(linkVotes);
            modalVotes.textContent = linkVotes;

            const linkPopurarity = currentLink.getAttribute('popularity');
            // console.log(linkPopurarity);
            modalPopularity.textContent = linkPopurarity;

            const linkOrigTitle = currentLink.getAttribute('original_title');
            // console.log(linkOrigTitle);
            modalOrigTitle.textContent = linkOrigTitle;

            const linkDescription = currentLink.getAttribute('description');
            // console.log(linkDescription);
            modalDescription.textContent = linkDescription;

            const genres = currentLink.getAttribute('genres');
            // console.log(genres);
            modalGenre.textContent = genres;

            modalWindow.classList.remove('is-hidden');
          }
          // heroModalCloseBtn.addEventListener('click', () => {
          //   heroModalCardContainer.classList.toggle('is-hidden');
          // });

          // console.log(linkImage.src);
          // console.log(link.href);

          // linkImage.src = link.href;

          // setting the modal window gallery using the SimpleLightbox library and adding "alt" caption title on bottom with 250 ms delay
          // let gallery = new SimpleLightbox(`.gallery a`, {
          //   captionsData: 'src',
          //   captionDelay: 250,
          //   captionPosition: 'outside',
          //   alertError: false,
          //   captionHTML: false,
          // });
          // console.dir(gallery);
          // console.log(gallery.elements);
          // console.log(gallery.options);
        });
      });
    })
    .catch(err => console.error('error:' + err));
});

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

// HERO

fetch(trendingMoviesUrl, options)
  .then(res => res.json())
  .then(res => {
    // console.log(res);
    console.log(res.results);
    const movies = res.results;
    movies.map(element => {
      renderCards(element);
    });

    const heroImagesLink = document.querySelectorAll('.hero-cards-link');
    // console.log(heroImagesLink);

    heroImagesLink.forEach(link => {
      // const linkImage = link.querySelector('.hero-cards-image');
      // console.log(linkImage);

      link.addEventListener('click', ev => {
        ev.preventDefault();

        // console.log(ev.target);
        const currentLink = ev.currentTarget;
        // console.log(currentLink);

        const linkSrc = currentLink.href;
        // console.log(linkSrc);
        modalImage.setAttribute('src', linkSrc);

        const linkId = currentLink.getAttribute('id');
        modalImage.setAttribute('id', linkId);

        addRemButtons(
          'queued',
          linkId,
          modalAddToQueueBtn,
          modalRemFromQueueBtn
        );

        addRemButtons(
          'watched',
          linkId,
          modalAddToWatchBtn,
          modalRemFromWatchBtn
        );

        const linkTitle = currentLink.getAttribute('title');
        // console.log(linkTitle);
        modalTitle.textContent = linkTitle;

        const linkVote = currentLink.getAttribute('vote');
        // console.log(linkVote);
        modalVote.textContent = linkVote;

        const linkVotes = currentLink.getAttribute('votes');
        // console.log(linkVotes);
        modalVotes.textContent = linkVotes;

        const linkPopurarity = currentLink.getAttribute('popularity');
        // console.log(linkPopurarity);
        modalPopularity.textContent = linkPopurarity;

        const linkOrigTitle = currentLink.getAttribute('original_title');
        // console.log(linkOrigTitle);
        modalOrigTitle.textContent = linkOrigTitle;

        const linkDescription = currentLink.getAttribute('description');
        // console.log(linkDescription);
        modalDescription.textContent = linkDescription;

        const genres = currentLink.getAttribute('genres');
        // console.log(genres);
        modalGenre.textContent = genres;

        modalWindow.classList.toggle('is-hidden');

        // console.log(linkImage.src);
        // console.log(link.href);

        // linkImage.src = link.href;

        // setting the modal window gallery using the SimpleLightbox library and adding "alt" caption title on bottom with 250 ms delay
        // let gallery = new SimpleLightbox(`.gallery a`, {
        //   captionsData: 'src',
        //   captionDelay: 250,
        //   captionPosition: 'outside',
        //   alertError: false,
        //   captionHTML: false,
        // });
        // console.dir(gallery);
        // console.log(gallery.elements);
        // console.log(gallery.options);
      });
    });
  })
  .catch(err => console.error('error:' + err));

function renderCards(params) {
  const heroCardListItem = document.createElement('div');
  heroCardListItem.setAttribute('class', 'movie-card item');
  heroCardListItem.setAttribute('data-movie-id', `${params.id}`);
  heroList.append(heroCardListItem);

  const heroLink = document.createElement('a');
  if (params.backdrop_path === null) {
    heroLink.setAttribute(
      'href',
      'https://lascrucesfilmfest.com/wp-content/uploads/2018/01/no-poster-available.jpg'
    );
  } else {
    heroLink.setAttribute(
      'href',
      `https://image.tmdb.org/t/p/original/${params.poster_path}`
    );
  }

  const genresArr = params.genre_ids;
  // console.log(genresArr.length);
  let genres = [];

  genresArr.forEach(element => {
    fetch(genresApiUrl, options)
      .then(res => res.json())
      .then(res => {
        res.genres.map(x => {
          if (x.id === element) {
            genres.push(x.name);
            heroLink.setAttribute('genres', genres);
          }
        });
      })
      .catch(err => console.error('error:' + err));
  });

  heroLink.setAttribute('genres', genres);

  heroLink.setAttribute('class', `hero-cards-link`);
  heroLink.setAttribute('title', `${params.title}`);
  heroLink.setAttribute('vote', `${params.vote_average}`);
  heroLink.setAttribute('votes', `${params.vote_count}`);
  heroLink.setAttribute('popularity', `${params.popularity}`);
  heroLink.setAttribute('original_title', `${params.original_title}`);
  heroLink.setAttribute('description', `${params.overview}`);
  heroLink.setAttribute('id', params.id);

  heroCardListItem.append(heroLink);

  const img = document.createElement('img');
  if (params.backdrop_path === null) {
    img.setAttribute(
      'src',
      'https://lascrucesfilmfest.com/wp-content/uploads/2018/01/no-poster-available.jpg'
    );
  } else {
    img.setAttribute(
      'src',
      `https://image.tmdb.org/t/p/original/${params.backdrop_path}`
    );
  }
  img.setAttribute('class', `hero-cards-image`);
  img.setAttribute('alt', `${params.media_type}`);
  img.setAttribute('loading', `lazy`);
  img.setAttribute('id', params.id);

  // console.log(img);

  heroLink.append(img);

  const heroCardDetails = document.createElement('div');
  heroCardDetails.setAttribute('class', 'hero-movie-details-container');
  heroCardDetails.setAttribute('data-movie-id', `${params.id}`);

  heroCardListItem.append(heroCardDetails);

  const heroMovieTitle = document.createElement('h3');
  heroMovieTitle.setAttribute('class', 'hero-movie-title');
  heroMovieTitle.textContent = `${params.title}`;

  heroCardDetails.append(heroMovieTitle);

  const heroMovieGenresList = document.createElement('ul');
  heroMovieGenresList.setAttribute('class', 'hero-movie-genres-list');

  let movieGenres = params.genre_ids;
  // console.log(movieGenres);

  if (movieGenres.length > 3) {
    // console.log(movieGenres.length);
    movieGenres = movieGenres.slice(0, 2);
    // console.log(movieGenres);

    movieGenres.forEach(element => {
      // console.log(element);
      const heroMovieGenresListItem = document.createElement('li');
      heroMovieGenresListItem.setAttribute(
        'class',
        'hero-movie-genres-list-item'
      );

      fetch(genresApiUrl, options)
        .then(res => res.json())
        .then(res => {
          res.genres.map(x => {
            if (x.id === element) {
              heroMovieGenresListItem.textContent = `${x.name},`;
            }
          });
        })
        .catch(err => console.error('error:' + err));

      heroMovieGenresList.append(heroMovieGenresListItem);
    });

    const heroGenresOther = document.createElement('li');
    heroGenresOther.setAttribute('class', 'hero-movie-genres-list-item');
    heroGenresOther.textContent = 'Otherr';
    heroMovieGenresList.append(heroGenresOther);
  } else {
    if (movieGenres.length === 0) {
      const heroGenresOther = document.createElement('li');
      heroGenresOther.setAttribute('class', 'hero-movie-genres-list-item');
      heroGenresOther.textContent = 'Otherr';
      heroMovieGenresList.append(heroGenresOther);
    }
    movieGenres.forEach(element => {
      // console.log(element);
      const heroMovieGenresListItem = document.createElement('li');
      heroMovieGenresListItem.setAttribute(
        'class',
        'hero-movie-genres-list-item'
      );

      fetch(genresApiUrl, options)
        .then(res => res.json())
        .then(res => {
          res.genres.map(x => {
            if (x.id === element) {
              heroMovieGenresListItem.textContent = `${x.name},`;
            }
          });
        })
        .catch(err => console.error('error:' + err));

      heroMovieGenresList.append(heroMovieGenresListItem);
    });
  }

  setTimeout(heroCommaRemove, 2000);

  function heroCommaRemove() {
    let heroLastItem = heroMovieGenresList.lastChild;
    // console.log(heroLastItem);
    // console.log(heroLastItem.textContent);

    let heroLastChild = heroLastItem.textContent;

    heroLastItem.textContent = heroLastChild.slice(0, -1);
  }

  const date = params.release_date;
  const year = date.slice(0, 4);
  const yearCard = document.createElement('span');
  yearCard.setAttribute('class', 'hero-year-span');
  yearCard.textContent = `| ` + year;
  // heroCardDetails.append(yearCard);

  // console.log(params.vote_count);
  const votes = document.createElement('span');
  votes.setAttribute('class', 'hero-votes-span');
  votes.textContent = params.vote_average;
  // heroCardDetails.append(votes);

  const heroMovieDetailsContainer = document.createElement('div');
  heroMovieDetailsContainer.setAttribute('class', 'hero-details-container');
  heroCardDetails.append(heroMovieDetailsContainer);
  heroMovieDetailsContainer.append(heroMovieGenresList, yearCard, votes);
}

// // Lightbox modal

// // div container central
// const heroModalCentralContainer = document.querySelector('.sl-image');
// console.log(heroModalCentralContainer);

// const heroModalImg = heroModalCentralContainer.querySelector('img');
// console.log(heroModalImg);

// PAGE-CHANGER

// PAGE-UP
const pageUp = document.querySelector('.page-up');
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};
function scrollFunction() {
  if (document.documentElement.scrollTop > 700) {
    // console.log(document.body.scrollTop);
    // console.log(document.documentElement.scrollTop);
    // console.log(document.documentElement);
    pageUp.style.display = 'flex';
  } else {
    pageUp.style.display = 'none';
  }
}

// When the user clicks on the button, scroll to the top of the document
pageUp.addEventListener('click', () => {
  document.documentElement.scrollTop = 0;
});

// FOOTER
